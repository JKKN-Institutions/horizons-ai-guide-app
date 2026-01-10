import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Calendar, IndianRupee, Clock, Users, 
  ExternalLink, ChevronDown, ChevronUp, CheckCircle2, 
  AlertCircle, Timer, Bookmark, Shield, Building2, 
  Train, FileText, Landmark, MapPin, GraduationCap,
  Briefcase, X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { governmentExams, categoryInfo } from './governmentExamsData';
import { GovernmentExam, CategoryType, SalaryRangeType, StatusType } from './types';

const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

export const GovernmentJobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [selectedSalary, setSelectedSalary] = useState<SalaryRangeType>('all');
  const [selectedStatus, setSelectedStatus] = useState<StatusType>('all');
  const [selectedAge, setSelectedAge] = useState<string>('all');
  const [expandedExam, setExpandedExam] = useState<string | null>(null);
  const [savedExams, setSavedExams] = useState<string[]>(() => {
    const stored = localStorage.getItem('govtJobs_saved');
    return stored ? JSON.parse(stored) : [];
  });

  const toggleSave = (examId: string) => {
    setSavedExams(prev => {
      const updated = prev.includes(examId) 
        ? prev.filter(id => id !== examId)
        : [...prev, examId];
      localStorage.setItem('govtJobs_saved', JSON.stringify(updated));
      return updated;
    });
  };

  const filteredExams = useMemo(() => {
    return governmentExams.filter(exam => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          exam.name.toLowerCase().includes(query) ||
          exam.nameTamil.includes(query) ||
          exam.description.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && exam.category !== selectedCategory) return false;

      // Status filter
      if (selectedStatus !== 'all' && exam.applicationStatus !== selectedStatus) return false;

      // Salary filter
      if (selectedSalary !== 'all') {
        if (selectedSalary === '15k-25k' && (exam.salaryMin < 15000 || exam.salaryMin > 25000)) return false;
        if (selectedSalary === '25k-40k' && (exam.salaryMin < 25000 || exam.salaryMin > 40000)) return false;
        if (selectedSalary === '40k+' && exam.salaryMin < 40000) return false;
      }

      // Age filter
      if (selectedAge !== 'all') {
        const age = parseInt(selectedAge);
        if (age < exam.ageMin || age > exam.ageMax) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedSalary, selectedStatus, selectedAge]);

  const examsByCategory = useMemo(() => {
    const grouped: Record<string, GovernmentExam[]> = {};
    filteredExams.forEach(exam => {
      if (!grouped[exam.category]) grouped[exam.category] = [];
      grouped[exam.category].push(exam);
    });
    return grouped;
  }, [filteredExams]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-green-100 text-green-700 border-green-300">🟢 Apply Now</Badge>;
      case 'upcoming':
        return <Badge className="bg-amber-100 text-amber-700 border-amber-300">🟡 Upcoming</Badge>;
      case 'closed':
        return <Badge className="bg-red-100 text-red-700 border-red-300">🔴 Closed</Badge>;
      default:
        return null;
    }
  };

  const formatSalary = (min: number, max: number) => {
    const formatNum = (n: number) => {
      if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
      if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
      return `₹${n}`;
    };
    return `${formatNum(min)} - ${formatNum(max)}`;
  };

  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedSalary !== 'all',
    selectedStatus !== 'all',
    selectedAge !== 'all'
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedSalary('all');
    setSelectedStatus('all');
    setSelectedAge('all');
    setSearchQuery('');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'defence': return Shield;
      case 'railway': return Train;
      case 'ssc': return FileText;
      case 'banking': return Landmark;
      case 'state': return MapPin;
      case 'central': return Building2;
      default: return Briefcase;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full mb-4">
          <span className="text-2xl">🏛️</span>
          <span className="font-semibold text-amber-800">For 12th Pass Students Only</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Government Jobs & Exams
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover government job opportunities that require only 12th Pass qualification. 
          No graduation needed!
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 text-center">
          <div className="text-2xl font-bold text-green-700">{governmentExams.length}</div>
          <div className="text-xs text-green-600">Total Exams</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200 text-center">
          <div className="text-2xl font-bold text-blue-700">
            {governmentExams.filter(e => e.applicationStatus === 'open').length}
          </div>
          <div className="text-xs text-blue-600">Open Now</div>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200 text-center">
          <div className="text-2xl font-bold text-amber-700">
            {governmentExams.filter(e => e.applicationStatus === 'upcoming').length}
          </div>
          <div className="text-xs text-amber-600">Upcoming</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-200 text-center">
          <div className="text-2xl font-bold text-purple-700">{savedExams.length}</div>
          <div className="text-xs text-purple-600">Saved</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search exams (e.g., NDA, Railway, SSC)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="bg-primary text-primary-foreground ml-1">{activeFiltersCount}</Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="flex items-center justify-between">
                Filter Exams
                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-destructive">
                    <X className="h-4 w-4 mr-1" /> Clear All
                  </Button>
                )}
              </SheetTitle>
            </SheetHeader>
            
            <ScrollArea className="h-[calc(100vh-150px)] mt-6">
              <div className="space-y-6 pr-4">
                {/* Category Filter */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Briefcase className="h-4 w-4" /> Category
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === 'all'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      All Categories
                    </button>
                    {Object.entries(categoryInfo).map(([key, info]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedCategory(key as CategoryType)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                          selectedCategory === key
                            ? `bg-gradient-to-r ${info.color} text-white`
                            : `${info.bgColor} hover:opacity-80`
                        }`}
                      >
                        <span>{info.emoji}</span>
                        <span className="truncate">{info.label.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Salary Filter */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <IndianRupee className="h-4 w-4" /> Salary Range
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'all', label: 'All' },
                      { id: '15k-25k', label: '₹15K-25K' },
                      { id: '25k-40k', label: '₹25K-40K' },
                      { id: '40k+', label: '₹40K+' },
                    ].map(option => (
                      <button
                        key={option.id}
                        onClick={() => setSelectedSalary(option.id as SalaryRangeType)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedSalary === option.id
                            ? 'bg-green-600 text-white'
                            : 'bg-green-50 text-green-700 hover:bg-green-100'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" /> Application Status
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'all', label: 'All', color: 'bg-gray-100 text-gray-700' },
                      { id: 'open', label: '🟢 Open', color: 'bg-green-100 text-green-700' },
                      { id: 'upcoming', label: '🟡 Upcoming', color: 'bg-amber-100 text-amber-700' },
                      { id: 'closed', label: '🔴 Closed', color: 'bg-red-100 text-red-700' },
                    ].map(option => (
                      <button
                        key={option.id}
                        onClick={() => setSelectedStatus(option.id as StatusType)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedStatus === option.id
                            ? 'ring-2 ring-primary ring-offset-2'
                            : ''
                        } ${option.color}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Age Filter */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4" /> Your Age
                  </h4>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={() => setSelectedAge('all')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedAge === 'all'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      All
                    </button>
                    {[17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map(age => (
                      <button
                        key={age}
                        onClick={() => setSelectedAge(age.toString())}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedAge === age.toString()
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        {age}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedCategory !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              {categoryInfo[selectedCategory].emoji} {categoryInfo[selectedCategory].label}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
            </Badge>
          )}
          {selectedSalary !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              💰 {selectedSalary}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedSalary('all')} />
            </Badge>
          )}
          {selectedStatus !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              {selectedStatus === 'open' ? '🟢' : selectedStatus === 'upcoming' ? '🟡' : '🔴'} {selectedStatus}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedStatus('all')} />
            </Badge>
          )}
          {selectedAge !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              👤 Age {selectedAge}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedAge('all')} />
            </Badge>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredExams.length} of {governmentExams.length} exams
      </div>

      {/* Exams List by Category */}
      <motion.div 
        className="space-y-8"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {Object.entries(examsByCategory).map(([category, exams]) => {
          const info = categoryInfo[category as keyof typeof categoryInfo];
          const CategoryIcon = getCategoryIcon(category);
          
          return (
            <motion.div key={category} variants={itemVariants}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-xl bg-gradient-to-br ${info.color} text-white`}>
                  <CategoryIcon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                  {info.emoji} {info.label}
                </h3>
                <Badge variant="outline" className="ml-auto">{exams.length} exams</Badge>
              </div>
              
              <div className="grid gap-4">
                {exams.map((exam) => (
                  <Card 
                    key={exam.id}
                    className={`${info.bgColor} ${info.borderColor} border-2 hover:shadow-lg transition-all duration-300`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <CardTitle className="text-lg flex items-center gap-2 flex-wrap">
                            {exam.name}
                            {getStatusBadge(exam.applicationStatus)}
                          </CardTitle>
                          <p className="text-sm text-gray-500 mt-1">{exam.nameTamil}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleSave(exam.id)}
                          className={savedExams.includes(exam.id) ? 'text-amber-500' : 'text-gray-400'}
                        >
                          <Bookmark className={`h-5 w-5 ${savedExams.includes(exam.id) ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{exam.description}</p>
                      
                      {/* Key Info Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        <div className="bg-white/70 rounded-lg p-2 text-center">
                          <GraduationCap className="h-4 w-4 mx-auto mb-1 text-green-600" />
                          <div className="text-xs font-semibold text-green-700">{exam.qualification}</div>
                          <div className="text-[10px] text-gray-500">Qualification</div>
                        </div>
                        <div className="bg-white/70 rounded-lg p-2 text-center">
                          <Users className="h-4 w-4 mx-auto mb-1 text-blue-600" />
                          <div className="text-xs font-semibold text-blue-700">{exam.ageMin}-{exam.ageMax} yrs</div>
                          <div className="text-[10px] text-gray-500">Age Limit</div>
                        </div>
                        <div className="bg-white/70 rounded-lg p-2 text-center">
                          <IndianRupee className="h-4 w-4 mx-auto mb-1 text-amber-600" />
                          <div className="text-xs font-semibold text-amber-700">{formatSalary(exam.salaryMin, exam.salaryMax)}</div>
                          <div className="text-[10px] text-gray-500">Salary Range</div>
                        </div>
                        <div className="bg-white/70 rounded-lg p-2 text-center">
                          <Calendar className="h-4 w-4 mx-auto mb-1 text-purple-600" />
                          <div className="text-xs font-semibold text-purple-700">
                            {exam.nextExamDate 
                              ? new Date(exam.nextExamDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
                              : 'TBA'}
                          </div>
                          <div className="text-[10px] text-gray-500">Next Exam</div>
                        </div>
                      </div>

                      {/* Expandable Details */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedExam(expandedExam === exam.id ? null : exam.id)}
                        className="w-full justify-between text-gray-600"
                      >
                        {expandedExam === exam.id ? 'Hide Details' : 'View Details'}
                        {expandedExam === exam.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>

                      <AnimatePresence>
                        {expandedExam === exam.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 space-y-4 border-t mt-2">
                              {/* Exam Pattern */}
                              <div>
                                <h5 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                  <FileText className="h-4 w-4" /> Exam Pattern
                                </h5>
                                <p className="text-sm text-gray-600 bg-white/50 p-2 rounded-lg">
                                  {exam.examPattern}
                                </p>
                              </div>

                              {/* Selection Process */}
                              <div>
                                <h5 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                  <CheckCircle2 className="h-4 w-4" /> Selection Process
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                  {exam.selectionProcess.map((step, i) => (
                                    <Badge key={i} variant="outline" className="bg-white/50">
                                      {i + 1}. {step}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              {/* Posts */}
                              {exam.posts && (
                                <div>
                                  <h5 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                    <Briefcase className="h-4 w-4" /> Available Posts
                                  </h5>
                                  <div className="flex flex-wrap gap-2">
                                    {exam.posts.map((post, i) => (
                                      <Badge key={i} className="bg-white/70 text-gray-700">
                                        {post}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Apply Button */}
                              <Button
                                className={`w-full bg-gradient-to-r ${info.color} text-white hover:opacity-90`}
                                onClick={() => window.open(exam.applyLink, '_blank')}
                                disabled={exam.applicationStatus === 'closed'}
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                {exam.applicationStatus === 'closed' 
                                  ? 'Applications Closed' 
                                  : exam.applicationStatus === 'upcoming'
                                    ? 'Visit Official Website'
                                    : 'Apply Now'}
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* No Results */}
      {filteredExams.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No exams found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your filters or search query</p>
          <Button onClick={clearFilters}>Clear All Filters</Button>
        </div>
      )}
    </div>
  );
};

export default GovernmentJobs;
