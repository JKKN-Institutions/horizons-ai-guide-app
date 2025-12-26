import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Search, Filter, ChevronLeft, ChevronRight, Check, X,
  Clock, Eye, Bookmark, BookmarkCheck, Lightbulb, RotateCcw,
  GraduationCap, Trophy, Target, Timer, Languages, ChevronDown,
  Download, Loader2
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
import { generatePYQPDF } from '@/components/PYQ';

const PYQPractice = () => {
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
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<string[]>([]);
  const [language, setLanguage] = useState<'en' | 'ta'>('en');
  const [showHint, setShowHint] = useState(false);
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [downloadingExamId, setDownloadingExamId] = useState<string | null>(null);

  // Handle PDF download
  const handleDownloadPDF = async (exam: PYQExam, year?: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    
    setDownloadingExamId(exam.id);
    toast.loading('Generating PDF...', { id: 'pdf-download' });
    
    try {
      // Small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const questions = pyqQuestions.filter(q => {
        const matchesExam = q.examId === exam.id;
        const matchesYear = year ? q.year === year : true;
        return matchesExam && matchesYear;
      });
      
      if (questions.length === 0) {
        toast.error('No questions found for this exam', { id: 'pdf-download' });
        return;
      }
      
      generatePYQPDF({ exam, questions, year });
      
      toast.success(`Download complete! ${questions.length} questions`, { id: 'pdf-download' });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF', { id: 'pdf-download' });
    } finally {
      setDownloadingExamId(null);
    }
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

  const toggleBookmark = (qId: string) => {
    setBookmarkedQuestions(prev => 
      prev.includes(qId) ? prev.filter(id => id !== qId) : [...prev, qId]
    );
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

  if (!isPracticeMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        {/* Header */}
        <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/career-assessment/colleges" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
              </Link>
              <h1 className="text-xl font-bold text-foreground">PYQ Practice</h1>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
              >
                <Languages className="w-4 h-4 mr-2" />
                {language === 'en' ? 'தமிழ்' : 'English'}
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-3xl p-8 text-primary-foreground mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <BookOpen className="w-6 h-6" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-2">
                {language === 'en' ? 'Previous Year Questions Practice' : 'முந்தைய ஆண்டு கேள்விகள் பயிற்சி'}
              </h2>
              <p className="text-primary-foreground/80 text-lg">
                {language === 'en' 
                  ? 'Practice with real exam questions from 50+ competitive exams'
                  : '50+ போட்டித் தேர்வுகளின் உண்மையான கேள்விகளுடன் பயிற்சி செய்யுங்கள்'}
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: language === 'en' ? 'Total Questions' : 'மொத்த கேள்விகள்', value: pyqQuestions.length, icon: Target, color: 'text-blue-600' },
              { label: language === 'en' ? 'Exams Covered' : 'தேர்வுகள்', value: pyqExams.length, icon: GraduationCap, color: 'text-purple-600' },
              { label: language === 'en' ? 'Categories' : 'வகைகள்', value: pyqCategories.length, icon: BookOpen, color: 'text-emerald-600' },
              { label: language === 'en' ? 'Bookmarked' : 'புக்மார்க்', value: bookmarkedQuestions.length, icon: Bookmark, color: 'text-rose-600' },
            ].map((stat, index) => (
              <Card key={index} className="border-none shadow-md">
                <CardContent className="p-4 text-center">
                  <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters */}
          <Card className="mb-8 border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">{language === 'en' ? 'Filter Questions' : 'கேள்விகளை வடிகட்டு'}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={(val) => {
                  setSelectedCategory(val);
                  setSelectedExam('all');
                  setSelectedSubject('all');
                }}>
                  <SelectTrigger>
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
                  <SelectTrigger>
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
                  <SelectTrigger>
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
                  <SelectTrigger>
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
                  <SelectTrigger>
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
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder={language === 'en' ? 'Search topics...' : 'தலைப்புகளை தேடு...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  {language === 'en' 
                    ? `${filteredQuestions.length} questions found`
                    : `${filteredQuestions.length} கேள்விகள் கண்டுபிடிக்கப்பட்டன`}
                </p>
                <Button 
                  onClick={() => setIsPracticeMode(true)} 
                  disabled={filteredQuestions.length === 0}
                  className="bg-gradient-to-r from-primary to-primary/80"
                >
                  <Target className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Start Practice' : 'பயிற்சி தொடங்கு'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Exam Selection */}
          <h3 className="font-semibold mb-4">{language === 'en' ? 'Popular Exams' : 'பிரபலமான தேர்வுகள்'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {pyqExams.filter(e => e.isPopular).slice(0, 8).map(exam => {
              const examQuestions = pyqQuestions.filter(q => q.examId === exam.id).length;
              const isDownloading = downloadingExamId === exam.id;
              return (
                <Card 
                  key={exam.id}
                  className="hover:shadow-lg transition-all hover:scale-[1.01] border-none shadow-md overflow-hidden"
                >
                  <CardContent className="p-4">
                    <div 
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedExam(exam.id);
                        setSelectedCategory(exam.category);
                        setIsPracticeMode(true);
                      }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <GraduationCap className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm line-clamp-1">
                            {language === 'en' ? exam.name.en : exam.name.ta}
                          </h4>
                          <p className="text-xs text-muted-foreground">{examQuestions} questions</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">
                          {exam.difficultyLevel}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {exam.duration} min
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-3 border-t border-border">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs"
                        onClick={() => {
                          setSelectedExam(exam.id);
                          setSelectedCategory(exam.category);
                          setIsPracticeMode(true);
                        }}
                      >
                        <Target className="w-3 h-3 mr-1" />
                        Practice
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex-1 text-xs"
                        onClick={(e) => handleDownloadPDF(exam, undefined, e)}
                        disabled={isDownloading}
                      >
                        {isDownloading ? (
                          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                        ) : (
                          <Download className="w-3 h-3 mr-1" />
                        )}
                        {isDownloading ? 'Generating...' : 'Download'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  // Practice Mode UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsPracticeMode(false)}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {language === 'en' ? 'Back to Filters' : 'வடிப்பான்களுக்கு திரும்பு'}
            </Button>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <Trophy className="w-3 h-3" />
                {accuracy}%
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Check className="w-3 h-3 text-emerald-600" />
                {correctAnswers}/{Object.keys(answeredQuestions).length}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
              >
                <Languages className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-card border-b border-border px-4 py-2">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
            <span>{language === 'en' ? 'Progress' : 'முன்னேற்றம்'}</span>
            <span>{currentQuestionIndex + 1} / {totalQuestions}</span>
          </div>
          <Progress value={((currentQuestionIndex + 1) / totalQuestions) * 100} className="h-2" />
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {filteredQuestions.length === 0 ? (
          <Card className="border-none shadow-md">
            <CardContent className="p-8 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">
                {language === 'en' ? 'No questions found' : 'கேள்விகள் கிடைக்கவில்லை'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {language === 'en' 
                  ? 'Try adjusting your filters to find questions'
                  : 'கேள்விகளைக் கண்டறிய உங்கள் வடிகட்டிகளை சரிசெய்யுங்கள்'}
              </p>
              <Button onClick={() => setIsPracticeMode(false)}>
                {language === 'en' ? 'Adjust Filters' : 'வடிகட்டிகளை மாற்று'}
              </Button>
            </CardContent>
          </Card>
        ) : currentQuestion && (
          <>
            {/* Question Card */}
            <Card className="border-none shadow-lg mb-6">
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
                    {bookmarkedQuestions.includes(currentQuestion.id) ? (
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
                      >
                        <Lightbulb className="w-4 h-4 mr-2" />
                        {language === 'en' ? 'Show Hint' : 'குறிப்பு காட்டு'}
                      </Button>
                      <Button
                        onClick={handleSubmitAnswer}
                        disabled={!selectedAnswer}
                        className="flex-1 bg-gradient-to-r from-primary to-primary/80"
                      >
                        {language === 'en' ? 'Submit Answer' : 'பதிலை சமர்ப்பி'}
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={handleNextQuestion}
                      disabled={currentQuestionIndex >= totalQuestions - 1}
                      className="flex-1 bg-gradient-to-r from-primary to-primary/80"
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
              <Card className="border-none shadow-md mb-6 border-l-4 border-l-amber-500">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    <h4 className="font-semibold">{language === 'en' ? 'Hints' : 'குறிப்புகள்'}</h4>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {currentQuestion.hints.map((hint, idx) => (
                      <li key={idx}>{hint}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Solution Section */}
            {showSolution && (
              <Card className="border-none shadow-md mb-6 border-l-4 border-l-emerald-500">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Check className="w-5 h-5 text-emerald-600" />
                    {language === 'en' ? 'Solution' : 'தீர்வு'}
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    {language === 'en' ? currentQuestion.solution.en : currentQuestion.solution.ta}
                  </p>

                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <ChevronDown className="w-4 h-4" />
                        {language === 'en' ? 'More Details' : 'மேலும் விவரங்கள்'}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-4 space-y-4">
                      <div>
                        <h5 className="font-medium text-sm mb-2">{language === 'en' ? 'Concepts Tested' : 'சோதிக்கப்பட்ட கருத்துக்கள்'}</h5>
                        <div className="flex flex-wrap gap-2">
                          {currentQuestion.conceptsTested.map((concept, idx) => (
                            <Badge key={idx} variant="secondary">{concept}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm mb-2">{language === 'en' ? 'Common Mistakes' : 'பொதுவான தவறுகள்'}</h5>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {currentQuestion.commonMistakes.map((mistake, idx) => (
                            <li key={idx}>{mistake}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Accuracy: {currentQuestion.statistics.correctPercentage}%</span>
                        <span>Avg. Time: {currentQuestion.statistics.averageTime}s</span>
                        <span>Attempts: {currentQuestion.statistics.totalAttempts.toLocaleString()}</span>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                {language === 'en' ? 'Previous' : 'முந்தைய'}
              </Button>
              
              <span className="text-sm text-muted-foreground">
                {currentQuestionIndex + 1} of {totalQuestions}
              </span>

              <Button
                variant="outline"
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex >= totalQuestions - 1}
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
