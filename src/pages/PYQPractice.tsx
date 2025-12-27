import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Search, Filter, ChevronLeft, ChevronRight, Check, X,
  Clock, Eye, Bookmark, BookmarkCheck, Lightbulb, RotateCcw,
  GraduationCap, Trophy, Target, Timer, Languages, ChevronDown,
  Download, Loader2, Play
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from 'sonner';
import { 
  pyqCategories, 
  pyqExams, 
  pyqQuestions,
  getQuestionsByExam,
  type PYQQuestion,
  type PYQExam
} from '@/data/pyq-database';
import { generatePYQPDF, generateBookmarkedPDF, YearSelectionDialog, MockTest, MockTestConfigDialog, MockTestLeaderboard } from '@/components/PYQ';
import { usePYQBookmarks } from '@/hooks/usePYQBookmarks';

const PYQPractice = () => {
  // Persistent bookmarks from localStorage
  const { bookmarkedQuestions, toggleBookmark, isBookmarked, bookmarkCount } = usePYQBookmarks();
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedExam, setSelectedExam] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Practice states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, string>>({});
  const [language, setLanguage] = useState<'en' | 'ta'>('en');
  const [showHint, setShowHint] = useState(false);
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [downloadingExamId, setDownloadingExamId] = useState<string | null>(null);
  const [yearDialogOpen, setYearDialogOpen] = useState(false);
  const [selectedExamForDownload, setSelectedExamForDownload] = useState<PYQExam | null>(null);
  
  // Mock test states
  const [mockTestConfigOpen, setMockTestConfigOpen] = useState(false);
  const [selectedExamForMockTest, setSelectedExamForMockTest] = useState<PYQExam | null>(null);
  const [isMockTestMode, setIsMockTestMode] = useState(false);
  const [mockTestQuestions, setMockTestQuestions] = useState<PYQQuestion[]>([]);
  const [mockTestDuration, setMockTestDuration] = useState(60);

  // Open year selection dialog
  const handleOpenYearDialog = (exam: PYQExam, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setSelectedExamForDownload(exam);
    setYearDialogOpen(true);
  };

  // Handle PDF download with selected years
  const handleDownloadPDF = async (exam: PYQExam, selectedYears: number[]) => {
    setDownloadingExamId(exam.id);
    toast.loading('Generating PDF...', { id: 'pdf-download' });
    
    try {
      // Small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const questions = pyqQuestions.filter(q => {
        const matchesExam = q.examId === exam.id;
        const matchesYear = selectedYears.includes(q.year);
        return matchesExam && matchesYear;
      });
      
      if (questions.length === 0) {
        toast.error('No questions found for selected years', { id: 'pdf-download' });
        return;
      }
      
      // Generate PDF with year range in filename
      const yearLabel = selectedYears.length === 1 
        ? selectedYears[0].toString()
        : `${Math.min(...selectedYears)}-${Math.max(...selectedYears)}`;
      
      generatePYQPDF({ exam, questions, year: selectedYears.length === 1 ? selectedYears[0] : undefined });
      
      toast.success(`Download complete! ${questions.length} questions from ${selectedYears.length} year(s)`, { id: 'pdf-download' });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF', { id: 'pdf-download' });
    } finally {
      setDownloadingExamId(null);
    }
  };

  // Open mock test config dialog
  const handleOpenMockTestConfig = (exam: PYQExam, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setSelectedExamForMockTest(exam);
    setMockTestConfigOpen(true);
  };

  // Start mock test
  const handleStartMockTest = (questions: PYQQuestion[], duration: number) => {
    setMockTestQuestions(questions);
    setMockTestDuration(duration);
    setIsMockTestMode(true);
  };

  // Exit mock test
  const handleExitMockTest = () => {
    setIsMockTestMode(false);
    setMockTestQuestions([]);
    setSelectedExamForMockTest(null);
  };

  // Get available exams based on selected category
  const availableExams = useMemo(() => {
    if (selectedCategory === 'all') return pyqExams;
    return pyqExams.filter(exam => exam.category === selectedCategory);
  }, [selectedCategory]);

  // Get available years based on selected exam
  const availableYears = useMemo(() => {
    if (selectedExam === 'all') {
      const allYears = new Set<number>();
      pyqExams.forEach(exam => exam.years.forEach(y => allYears.add(y)));
      return Array.from(allYears).sort((a, b) => b - a);
    }
    const exam = pyqExams.find(e => e.id === selectedExam);
    return exam ? exam.years.sort((a, b) => b - a) : [];
  }, [selectedExam]);

  // Get available subjects based on selected exam
  const availableSubjects = useMemo(() => {
    if (selectedExam === 'all') {
      const allSubjects = new Set<string>();
      pyqQuestions.forEach(q => allSubjects.add(q.subject));
      return Array.from(allSubjects).sort();
    }
    const examQuestions = pyqQuestions.filter(q => q.examId === selectedExam);
    const subjects = new Set<string>();
    examQuestions.forEach(q => subjects.add(q.subject));
    return Array.from(subjects).sort();
  }, [selectedExam]);

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return pyqQuestions.filter(q => {
      const matchesCategory = selectedCategory === 'all' || 
        pyqExams.find(e => e.id === q.examId)?.category === selectedCategory;
      const matchesExam = selectedExam === 'all' || q.examId === selectedExam;
      const matchesYear = selectedYear === 'all' || q.year.toString() === selectedYear;
      const matchesSubject = selectedSubject === 'all' || q.subject === selectedSubject;
      const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
      const matchesSearch = searchQuery === '' || 
        q.question.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.subtopic.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesExam && matchesYear && matchesSubject && matchesDifficulty && matchesSearch;
    });
  }, [selectedCategory, selectedExam, selectedYear, selectedSubject, selectedDifficulty, searchQuery]);

  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const totalQuestions = filteredQuestions.length;

  // Statistics
  const correctAnswers = Object.entries(answeredQuestions).filter(([qId, ans]) => {
    const q = pyqQuestions.find(q => q.id === qId);
    return q && q.correctAnswer === ans;
  }).length;

  const accuracy = Object.keys(answeredQuestions).length > 0 
    ? Math.round((correctAnswers / Object.keys(answeredQuestions).length) * 100)
    : 0;

  const handleAnswerSelect = (optionId: string) => {
    if (showSolution) return;
    setSelectedAnswer(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || !currentQuestion) return;
    
    setAnsweredQuestions(prev => ({
      ...prev,
      [currentQuestion.id]: selectedAnswer
    }));
    setShowSolution(true);

    if (selectedAnswer === currentQuestion.correctAnswer) {
      toast.success('Correct Answer! 🎉');
    } else {
      toast.error('Incorrect. Check the solution below.');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowSolution(false);
      setShowHint(false);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(null);
      setShowSolution(false);
      setShowHint(false);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowSolution(false);
    setShowHint(false);
    setAnsweredQuestions({});
    toast.success('Practice reset successfully!');
  };


  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Moderate': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getOptionStyle = (optionId: string) => {
    if (!showSolution) {
      return selectedAnswer === optionId 
        ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
        : 'border-border hover:border-primary/50 hover:bg-muted/50';
    }
    
    if (currentQuestion?.correctAnswer === optionId) {
      return 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200';
    }
    
    if (selectedAnswer === optionId && selectedAnswer !== currentQuestion?.correctAnswer) {
      return 'border-red-500 bg-red-50 ring-2 ring-red-200';
    }
    
    return 'border-border opacity-50';
  };

  // Mock Test Mode
  if (isMockTestMode && selectedExamForMockTest && mockTestQuestions.length > 0) {
    return (
      <MockTest
        exam={selectedExamForMockTest}
        questions={mockTestQuestions}
        onExit={handleExitMockTest}
      />
    );
  }

  if (!isPracticeMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/40 to-amber-50/30 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-emerald-200/40 to-teal-200/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-orange-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-br from-teal-200/30 to-emerald-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Header */}
        <header className="bg-white/70 backdrop-blur-xl border-b border-emerald-100/50 sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/career-assessment/colleges" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 group">
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back</span>
              </Link>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">PYQ Practice</h1>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
                className="border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300"
              >
                <Languages className="w-4 h-4 mr-2 text-emerald-600" />
                <span className="font-medium">{language === 'en' ? 'தமிழ்' : 'English'}</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
          {/* Hero Section */}
          <div className="relative rounded-3xl overflow-hidden mb-10 shadow-2xl shadow-emerald-900/20">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700" />
            
            {/* Decorative Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-amber-400/20 to-transparent rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
              <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-white/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
              {/* Grid Pattern */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            </div>
            
            {/* Content */}
            <div className="relative z-10 p-8 md:p-10">
              <div className="flex items-start justify-between flex-wrap gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="p-3.5 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
                      <BookOpen className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-amber-400 text-amber-900 border-0 font-semibold px-3 py-1 shadow-lg">
                        <Trophy className="w-3.5 h-3.5 mr-1.5" />
                        50+ Exams
                      </Badge>
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                    {language === 'en' ? 'Previous Year Questions Practice' : 'முந்தைய ஆண்டு கேள்விகள் பயிற்சி'}
                  </h2>
                  <p className="text-emerald-100 text-lg max-w-xl leading-relaxed">
                    {language === 'en' 
                      ? 'Master competitive exams with real questions, detailed solutions & smart analytics'
                      : '50+ போட்டித் தேர்வுகளின் உண்மையான கேள்விகளுடன் பயிற்சி செய்யுங்கள்'}
                  </p>
                </div>
                
                {/* Quick Action */}
                <div className="flex items-center gap-3">
                  <Button 
                    size="lg" 
                    className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
                    onClick={() => {
                      setCurrentQuestionIndex(0);
                      setIsPracticeMode(true);
                    }}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Practice
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
            {[
              { label: language === 'en' ? 'Total Questions' : 'மொத்த கேள்விகள்', value: pyqQuestions.length, icon: Target, gradient: 'from-blue-500 to-indigo-600', bgGradient: 'from-blue-50 to-indigo-50', borderColor: 'border-blue-200', action: null },
              { label: language === 'en' ? 'Exams Covered' : 'தேர்வுகள்', value: pyqExams.length, icon: GraduationCap, gradient: 'from-purple-500 to-violet-600', bgGradient: 'from-purple-50 to-violet-50', borderColor: 'border-purple-200', action: null },
              { label: language === 'en' ? 'Categories' : 'வகைகள்', value: pyqCategories.length, icon: BookOpen, gradient: 'from-emerald-500 to-teal-600', bgGradient: 'from-emerald-50 to-teal-50', borderColor: 'border-emerald-200', action: null },
              { label: language === 'en' ? 'Bookmarked' : 'புக்மார்க்', value: bookmarkCount, icon: Bookmark, gradient: 'from-rose-500 to-pink-600', bgGradient: 'from-rose-50 to-pink-50', borderColor: 'border-rose-200', action: 'export' },
            ].map((stat, index) => (
              <Card 
                key={index} 
                className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${stat.bgGradient}`}
              >
                {/* Decorative corner */}
                <div className={`absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-full opacity-20 blur-xl`} />
                
                <CardContent className="p-5 text-center relative">
                  <div className={`w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  {stat.action === 'export' && bookmarkCount > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 text-xs h-8 border-rose-200 hover:bg-rose-50 hover:border-rose-300 text-rose-600"
                      onClick={() => {
                        const bookmarked = pyqQuestions.filter(q => isBookmarked(q.id));
                        if (bookmarked.length > 0) {
                          toast.loading('Generating bookmarked PDF...', { id: 'bookmark-pdf' });
                          setTimeout(() => {
                            generateBookmarkedPDF({ questions: bookmarked });
                            toast.success(`Downloaded ${bookmarked.length} bookmarked questions!`, { id: 'bookmark-pdf' });
                          }, 500);
                        }
                      }}
                    >
                      <Download className="w-3.5 h-3.5 mr-1.5" />
                      Export PDF
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mock Test Leaderboard */}
          <div className="mb-10">
            <MockTestLeaderboard language={language} />
          </div>

          {/* Filters */}
          <Card className="mb-10 border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
            {/* Filter Header */}
            <div className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow">
                  <Filter className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-foreground">{language === 'en' ? 'Filter Questions' : 'கேள்விகளை வடிகட்டு'}</h3>
                <Badge variant="secondary" className="ml-2 bg-emerald-100 text-emerald-700">
                  {filteredQuestions.length} results
                </Badge>
              </div>
            </div>
            <CardContent className="p-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={(val) => {
                  setSelectedCategory(val);
                  setSelectedExam('all');
                  setSelectedSubject('all');
                }}>
                  <SelectTrigger className="bg-white border-gray-200 hover:border-emerald-300 focus:border-emerald-500 transition-colors">
                    <SelectValue placeholder={language === 'en' ? 'Select Category' : 'வகையை தேர்ந்தெடு'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{language === 'en' ? 'All Categories' : 'அனைத்து வகைகள்'}</SelectItem>
                    {pyqCategories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.icon} {language === 'en' ? cat.name.en : cat.name.ta}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Exam Filter */}
                <Select value={selectedExam} onValueChange={(val) => {
                  setSelectedExam(val);
                  setSelectedSubject('all');
                }}>
                  <SelectTrigger className="bg-white border-gray-200 hover:border-emerald-300 focus:border-emerald-500 transition-colors">
                    <SelectValue placeholder={language === 'en' ? 'Select Exam' : 'தேர்வை தேர்ந்தெடு'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{language === 'en' ? 'All Exams' : 'அனைத்து தேர்வுகள்'}</SelectItem>
                    {availableExams.map(exam => (
                      <SelectItem key={exam.id} value={exam.id}>
                        {language === 'en' ? exam.name.en : exam.name.ta}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Year Filter */}
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="bg-white border-gray-200 hover:border-emerald-300 focus:border-emerald-500 transition-colors">
                    <SelectValue placeholder={language === 'en' ? 'Select Year' : 'ஆண்டை தேர்ந்தெடு'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{language === 'en' ? 'All Years' : 'அனைத்து ஆண்டுகள்'}</SelectItem>
                    {availableYears.map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Subject Filter */}
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="bg-white border-gray-200 hover:border-emerald-300 focus:border-emerald-500 transition-colors">
                    <SelectValue placeholder={language === 'en' ? 'Select Subject' : 'பாடத்தை தேர்ந்தெடு'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{language === 'en' ? 'All Subjects' : 'அனைத்து பாடங்கள்'}</SelectItem>
                    {availableSubjects.map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Difficulty Filter */}
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="bg-white border-gray-200 hover:border-emerald-300 focus:border-emerald-500 transition-colors">
                    <SelectValue placeholder={language === 'en' ? 'Select Difficulty' : 'கடினத்தை தேர்ந்தெடு'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{language === 'en' ? 'All Levels' : 'அனைத்து நிலைகள்'}</SelectItem>
                    <SelectItem value="Easy">{language === 'en' ? 'Easy' : 'எளிது'}</SelectItem>
                    <SelectItem value="Moderate">{language === 'en' ? 'Moderate' : 'மிதமான'}</SelectItem>
                    <SelectItem value="Hard">{language === 'en' ? 'Hard' : 'கடினம்'}</SelectItem>
                  </SelectContent>
                </Select>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                  <Input
                    placeholder={language === 'en' ? 'Search topics...' : 'தலைப்புகளை தேடு...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white border-gray-200 hover:border-emerald-300 focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>
            </CardContent>
            
            {/* Filter Footer */}
            <div className="bg-gradient-to-r from-slate-50 to-gray-50 border-t border-gray-100 px-6 py-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground font-medium">
                  {language === 'en' 
                    ? `${filteredQuestions.length} questions found`
                    : `${filteredQuestions.length} கேள்விகள் கண்டுபிடிக்கப்பட்டன`}
                </p>
                <Button 
                  onClick={() => setIsPracticeMode(true)} 
                  disabled={filteredQuestions.length === 0}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Target className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Start Practice' : 'பயிற்சி தொடங்கு'}
                </Button>
              </div>
            </div>
          </Card>

          {/* Quick Exam Selection */}
          <div className="flex items-center gap-3 mb-6 mt-10">
            <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg shadow">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground">{language === 'en' ? 'Popular Exams' : 'பிரபலமான தேர்வுகள்'}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {pyqExams.filter(e => e.isPopular).slice(0, 8).map((exam, idx) => {
              const examQuestions = pyqQuestions.filter(q => q.examId === exam.id).length;
              const isDownloading = downloadingExamId === exam.id;
              const gradientColors = [
                'from-blue-500 to-indigo-600',
                'from-purple-500 to-violet-600',
                'from-emerald-500 to-teal-600',
                'from-rose-500 to-pink-600',
                'from-amber-500 to-orange-600',
                'from-cyan-500 to-blue-600',
                'from-green-500 to-emerald-600',
                'from-fuchsia-500 to-purple-600',
              ];
              const gradient = gradientColors[idx % gradientColors.length];
              
              return (
                <Card 
                  key={exam.id}
                  className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white"
                >
                  {/* Decorative gradient top */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradient}`} />
                  
                  {/* Glow effect on hover */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />
                  
                  <CardContent className="p-5 relative">
                    <div 
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedExam(exam.id);
                        setSelectedCategory(exam.category);
                        setIsPracticeMode(true);
                      }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 bg-gradient-to-br ${gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-base text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                            {language === 'en' ? exam.name.en : exam.name.ta}
                          </h4>
                          <p className="text-sm text-muted-foreground">{examQuestions} questions</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <Badge 
                          className={`text-xs font-medium ${
                            exam.difficultyLevel === 'Moderate' 
                              ? 'bg-amber-100 text-amber-700 border-amber-200' 
                              : exam.difficultyLevel === 'Hard'
                              ? 'bg-red-100 text-red-700 border-red-200'
                              : 'bg-emerald-100 text-emerald-700 border-emerald-200'
                          }`}
                        >
                          {exam.difficultyLevel}
                        </Badge>
                        <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700">
                          <Clock className="w-3 h-3 mr-1" />
                          {exam.duration} min
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs font-medium border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700"
                        onClick={() => {
                          setSelectedExam(exam.id);
                          setSelectedCategory(exam.category);
                          setIsPracticeMode(true);
                        }}
                      >
                        <Target className="w-3.5 h-3.5 mr-1.5" />
                        Practice
                      </Button>
                      <Button
                        size="sm"
                        className={`flex-1 text-xs font-medium bg-gradient-to-r ${gradient} hover:opacity-90`}
                        onClick={(e) => handleOpenMockTestConfig(exam, e)}
                      >
                        <Play className="w-3.5 h-3.5 mr-1.5" />
                        Mock Test
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="text-xs px-3 bg-slate-100 hover:bg-slate-200"
                        onClick={(e) => handleOpenYearDialog(exam, e)}
                        disabled={isDownloading}
                      >
                        {isDownloading ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Download className="w-3.5 h-3.5" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </main>

        {/* Year Selection Dialog */}
        <YearSelectionDialog
          open={yearDialogOpen}
          onOpenChange={setYearDialogOpen}
          exam={selectedExamForDownload}
          onDownload={handleDownloadPDF}
        />

        {/* Mock Test Config Dialog */}
        <MockTestConfigDialog
          open={mockTestConfigOpen}
          onOpenChange={setMockTestConfigOpen}
          exam={selectedExamForMockTest}
          onStartTest={handleStartMockTest}
        />
      </div>
    );
  }

  // Practice Mode UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/40 to-amber-50/30 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-emerald-200/30 to-teal-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-gradient-to-br from-amber-200/20 to-orange-200/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-emerald-100/50 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsPracticeMode(false)}
              className="hover:bg-emerald-50 group"
            >
              <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-0.5 transition-transform" />
              {language === 'en' ? 'Back to Filters' : 'வடிப்பான்களுக்கு திரும்பு'}
            </Button>
            
            <div className="flex items-center gap-2">
              <Badge className="gap-1.5 bg-amber-100 text-amber-700 border-amber-200">
                <Trophy className="w-3.5 h-3.5" />
                {accuracy}%
              </Badge>
              <Badge className="gap-1.5 bg-emerald-100 text-emerald-700 border-emerald-200">
                <Check className="w-3.5 h-3.5" />
                {correctAnswers}/{Object.keys(answeredQuestions).length}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
                className="border-emerald-200 hover:bg-emerald-50"
              >
                <Languages className="w-4 h-4 text-emerald-600" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleReset}
                className="border-rose-200 hover:bg-rose-50"
              >
                <RotateCcw className="w-4 h-4 text-rose-600" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-emerald-100/50 px-4 py-3">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span className="font-medium">{language === 'en' ? 'Progress' : 'முன்னேற்றம்'}</span>
            <span className="font-semibold text-emerald-700">{currentQuestionIndex + 1} / {totalQuestions}</span>
          </div>
          <div className="relative h-3 bg-emerald-100 rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 max-w-4xl relative z-10">
        {filteredQuestions.length === 0 ? (
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {language === 'en' ? 'No questions found' : 'கேள்விகள் கிடைக்கவில்லை'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {language === 'en' 
                  ? 'Try adjusting your filters to find questions'
                  : 'கேள்விகளைக் கண்டறிய உங்கள் வடிகட்டிகளை சரிசெய்யுங்கள்'}
              </p>
              <Button 
                onClick={() => setIsPracticeMode(false)}
                className="bg-gradient-to-r from-emerald-600 to-teal-600"
              >
                {language === 'en' ? 'Adjust Filters' : 'வடிகட்டிகளை மாற்று'}
              </Button>
            </CardContent>
          </Card>
        ) : currentQuestion && (
          <>
            {/* Question Card */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm mb-6 overflow-hidden">
              {/* Gradient top bar */}
              <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
              
              <CardContent className="p-6">
                {/* Question Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{currentQuestion.examId.replace(/_/g, ' ')}</Badge>
                    <Badge variant="outline">{currentQuestion.year}</Badge>
                    <Badge variant="outline">{currentQuestion.subject}</Badge>
                    <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
                      {currentQuestion.difficulty}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleBookmark(currentQuestion.id)}
                  >
                    {isBookmarked(currentQuestion.id) ? (
                      <BookmarkCheck className="w-5 h-5 text-primary fill-primary" />
                    ) : (
                      <Bookmark className="w-5 h-5" />
                    )}
                  </Button>
                </div>

                {/* Topic & Subtopic */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <span>{currentQuestion.topic}</span>
                  <ChevronRight className="w-4 h-4" />
                  <span>{currentQuestion.subtopic}</span>
                </div>

                {/* Question Text */}
                <div className="mb-6">
                  <p className="text-lg font-medium leading-relaxed">
                    {language === 'en' ? currentQuestion.question.en : currentQuestion.question.ta}
                  </p>
                </div>

                {/* Options */}
                <div className="space-y-3 mb-6">
                  {(language === 'en' ? currentQuestion.options.en : currentQuestion.options.ta).map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswerSelect(option.id)}
                      disabled={showSolution}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${getOptionStyle(option.id)}`}
                    >
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        showSolution && currentQuestion.correctAnswer === option.id
                          ? 'bg-emerald-500 text-white'
                          : showSolution && selectedAnswer === option.id && selectedAnswer !== currentQuestion.correctAnswer
                          ? 'bg-red-500 text-white'
                          : selectedAnswer === option.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}>
                        {option.id}
                      </span>
                      <span className="flex-1">{option.text}</span>
                      {showSolution && currentQuestion.correctAnswer === option.id && (
                        <Check className="w-5 h-5 text-emerald-600" />
                      )}
                      {showSolution && selectedAnswer === option.id && selectedAnswer !== currentQuestion.correctAnswer && (
                        <X className="w-5 h-5 text-red-600" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Marks Info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    +{currentQuestion.marks} marks
                  </span>
                  <span className="flex items-center gap-1 text-red-500">
                    -{currentQuestion.negativeMarks} negative
                  </span>
                  <span className="flex items-center gap-1">
                    <Timer className="w-4 h-4" />
                    ~{Math.round(currentQuestion.timeRecommended / 60)} min
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  {!showSolution ? (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => setShowHint(true)}
                        disabled={showHint}
                        className="border-amber-200 hover:bg-amber-50 hover:border-amber-300 text-amber-700"
                      >
                        <Lightbulb className="w-4 h-4 mr-2" />
                        {language === 'en' ? 'Show Hint' : 'குறிப்பு காட்டு'}
                      </Button>
                      <Button
                        onClick={handleSubmitAnswer}
                        disabled={!selectedAnswer}
                        className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {language === 'en' ? 'Submit Answer' : 'பதிலை சமர்ப்பி'}
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={handleNextQuestion}
                      disabled={currentQuestionIndex >= totalQuestions - 1}
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {language === 'en' ? 'Next Question' : 'அடுத்த கேள்வி'}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Hint Section */}
            {showHint && !showSolution && (
              <Card className="border-0 shadow-xl bg-gradient-to-br from-amber-50 to-orange-50 mb-6 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-amber-400 to-orange-400" />
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Lightbulb className="w-5 h-5 text-amber-600" />
                    </div>
                    <h4 className="font-semibold text-amber-900">{language === 'en' ? 'Hints' : 'குறிப்புகள்'}</h4>
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 text-amber-800">
                    {currentQuestion.hints.map((hint, idx) => (
                      <li key={idx}>{hint}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Solution Section */}
            {showSolution && (
              <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-50 to-teal-50 mb-6 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <Check className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="text-emerald-900">{language === 'en' ? 'Solution' : 'தீர்வு'}</span>
                  </h4>
                  <p className="text-emerald-800 mb-4 leading-relaxed">
                    {language === 'en' ? currentQuestion.solution.en : currentQuestion.solution.ta}
                  </p>

                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="gap-2 text-emerald-700 hover:bg-emerald-100">
                        <ChevronDown className="w-4 h-4" />
                        {language === 'en' ? 'More Details' : 'மேலும் விவரங்கள்'}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-4 space-y-4">
                      <div className="bg-white/60 rounded-xl p-4">
                        <h5 className="font-medium text-sm mb-2 text-emerald-900">{language === 'en' ? 'Concepts Tested' : 'சோதிக்கப்பட்ட கருத்துக்கள்'}</h5>
                        <div className="flex flex-wrap gap-2">
                          {currentQuestion.conceptsTested.map((concept, idx) => (
                            <Badge key={idx} className="bg-emerald-100 text-emerald-700 border-emerald-200">{concept}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="bg-white/60 rounded-xl p-4">
                        <h5 className="font-medium text-sm mb-2 text-emerald-900">{language === 'en' ? 'Common Mistakes' : 'பொதுவான தவறுகள்'}</h5>
                        <ul className="list-disc list-inside text-sm text-emerald-700">
                          {currentQuestion.commonMistakes.map((mistake, idx) => (
                            <li key={idx}>{mistake}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-emerald-700 bg-white/60 rounded-xl p-3">
                        <span className="flex items-center gap-1.5">
                          <Target className="w-4 h-4" />
                          Accuracy: {currentQuestion.statistics.correctPercentage}%
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          Avg. Time: {currentQuestion.statistics.averageTime}s
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Eye className="w-4 h-4" />
                          Attempts: {currentQuestion.statistics.totalAttempts.toLocaleString()}
                        </span>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <Button
                variant="outline"
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                className="border-gray-200 hover:bg-gray-50 hover:border-gray-300"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                {language === 'en' ? 'Previous' : 'முந்தைய'}
              </Button>
              
              <span className="text-sm text-muted-foreground font-medium bg-slate-100 px-4 py-2 rounded-full">
                {currentQuestionIndex + 1} of {totalQuestions}
              </span>

              <Button
                variant="outline"
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex >= totalQuestions - 1}
                className="border-gray-200 hover:bg-gray-50 hover:border-gray-300"
              >
                {language === 'en' ? 'Next' : 'அடுத்து'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default PYQPractice;
