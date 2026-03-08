import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Search, BookOpen, Users, Banknote,
  GraduationCap, ChevronRight, Shield, Train, FileText, Building2,
  Landmark, Briefcase, CalendarClock, AlertCircle, Flame, X,
  ExternalLink, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/hooks/useLanguage';
import { governmentExamCategories } from '@/data/government-exams-data';
import { governmentExams } from '@/components/GovernmentJobs/governmentExamsData';
import { cn } from '@/lib/utils';

type CategoryFilter = 'all' | 'defence' | 'railway' | 'ssc' | 'banking' | 'state' | 'central';
type StatusFilter = 'all' | 'open' | 'upcoming' | 'closed';
type SortOption = 'salary-high' | 'salary-low' | 'deadline' | 'name';

const categoryMeta: Record<string, { emoji: string; color: string; border: string; label: string; labelTa: string }> = {
  defence: { emoji: '🛡️', color: 'from-amber-500 to-yellow-600', border: 'border-amber-300', label: 'Defence', labelTa: 'பாதுகாப்பு' },
  railway: { emoji: '🚂', color: 'from-red-500 to-rose-600', border: 'border-red-300', label: 'Railway', labelTa: 'ரயில்வே' },
  ssc: { emoji: '📋', color: 'from-blue-500 to-indigo-600', border: 'border-blue-300', label: 'SSC', labelTa: 'SSC' },
  banking: { emoji: '🏦', color: 'from-emerald-500 to-green-600', border: 'border-emerald-300', label: 'Banking', labelTa: 'வங்கி' },
  state: { emoji: '🏛️', color: 'from-teal-500 to-cyan-600', border: 'border-teal-300', label: 'TN State', labelTa: 'தமிழ்நாடு' },
  central: { emoji: '🏢', color: 'from-purple-500 to-violet-600', border: 'border-purple-300', label: 'Central', labelTa: 'மத்திய அரசு' },
};

const formatSalary = (min: number, max: number) => {
  const fmt = (n: number) => n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${(n / 1000).toFixed(0)}K`;
  return `${fmt(min)} - ${fmt(max)}`;
};

const GovernmentExams = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isTamil = language === 'ta';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('deadline');

  // Deadline alerts - open exams with dates
  const upcomingDeadlines = useMemo(() => {
    return governmentExams
      .filter(e => e.applicationStatus === 'open' && e.nextExamDate)
      .sort((a, b) => new Date(a.nextExamDate!).getTime() - new Date(b.nextExamDate!).getTime())
      .slice(0, 5);
  }, []);

  // Filtered and sorted exams
  const filteredExams = useMemo(() => {
    let exams = [...governmentExams];

    if (selectedCategory !== 'all') {
      exams = exams.filter(e => e.category === selectedCategory);
    }
    if (selectedStatus !== 'all') {
      exams = exams.filter(e => e.applicationStatus === selectedStatus);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      exams = exams.filter(e =>
        e.name.toLowerCase().includes(q) ||
        e.nameTamil.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        (e.posts && e.posts.some(p => p.toLowerCase().includes(q)))
      );
    }

    switch (sortBy) {
      case 'salary-high':
        exams.sort((a, b) => b.salaryMax - a.salaryMax);
        break;
      case 'salary-low':
        exams.sort((a, b) => a.salaryMin - b.salaryMin);
        break;
      case 'deadline':
        exams.sort((a, b) => {
          if (!a.nextExamDate && !b.nextExamDate) return 0;
          if (!a.nextExamDate) return 1;
          if (!b.nextExamDate) return -1;
          return new Date(a.nextExamDate).getTime() - new Date(b.nextExamDate).getTime();
        });
        break;
      case 'name':
        exams.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return exams;
  }, [selectedCategory, selectedStatus, searchQuery, sortBy]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: governmentExams.length };
    governmentExams.forEach(e => {
      counts[e.category] = (counts[e.category] || 0) + 1;
    });
    return counts;
  }, []);

  const openCount = governmentExams.filter(e => e.applicationStatus === 'open').length;
  const upcomingCount = governmentExams.filter(e => e.applicationStatus === 'upcoming').length;

  const getStatusBadge = (status: string) => {
    if (status === 'open') return <Badge className="bg-emerald-100 text-emerald-700 text-[10px] border-0 gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />{isTamil ? 'திறந்தது' : 'Open'}</Badge>;
    if (status === 'upcoming') return <Badge className="bg-amber-100 text-amber-700 text-[10px] border-0 gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />{isTamil ? 'வரவிருக்கிறது' : 'Upcoming'}</Badge>;
    return <Badge className="bg-gray-100 text-gray-500 text-[10px] border-0 gap-1"><span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" />{isTamil ? 'மூடப்பட்டது' : 'Closed'}</Badge>;
  };

  const findDetailedExam = (examId: string) => {
    for (const cat of governmentExamCategories) {
      const found = cat.exams.find(e => e.id === examId);
      if (found) return { categoryId: cat.id, examId: found.id };
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* ═══ HERO HEADER ═══ */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/4" />
        </div>

        <div className="container mx-auto px-4 pt-5 pb-8 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white/80 hover:text-white hover:bg-white/10 h-9 w-9">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                {isTamil ? 'அரசு தேர்வுகள் & வேலைகள்' : 'Government Exams & Jobs'}
              </h1>
              <p className="text-white/70 text-xs mt-0.5">
                {isTamil ? '12ஆம் வகுப்பு தேர்ச்சி — பட்டம் தேவையில்லை' : '12th Pass — No Degree Required'}
              </p>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-300" />
            <Input
              placeholder={isTamil ? 'தேர்வுகள், பதவிகள் தேடுங்கள்...' : 'Search exams, posts, departments...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl focus:bg-white/15 focus:border-white/40"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2.5 mt-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10">
              <BookOpen className="h-4 w-4 mx-auto mb-1 text-indigo-200" />
              <div className="text-lg font-bold">{governmentExams.length}</div>
              <div className="text-[10px] text-white/60">{isTamil ? 'மொத்தம்' : 'Total Exams'}</div>
            </div>
            <div className="bg-emerald-500/20 backdrop-blur-sm rounded-xl p-3 text-center border border-emerald-400/20">
              <Flame className="h-4 w-4 mx-auto mb-1 text-emerald-300" />
              <div className="text-lg font-bold text-emerald-200">{openCount}</div>
              <div className="text-[10px] text-emerald-300/70">{isTamil ? 'திறந்தது' : 'Open Now'}</div>
            </div>
            <div className="bg-amber-500/20 backdrop-blur-sm rounded-xl p-3 text-center border border-amber-400/20">
              <CalendarClock className="h-4 w-4 mx-auto mb-1 text-amber-300" />
              <div className="text-lg font-bold text-amber-200">{upcomingCount}</div>
              <div className="text-[10px] text-amber-300/70">{isTamil ? 'வரவிருக்கிறது' : 'Upcoming'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        {/* ═══ DEADLINE ALERTS ═══ */}
        {upcomingDeadlines.length > 0 && (
          <div className="-mt-4 mb-5">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                  <AlertCircle className="h-3.5 w-3.5 text-white" />
                </div>
                <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
                  {isTamil ? '🔴 விண்ணப்பிக்க நேரம்!' : '🔴 Applications Open — Apply Now!'}
                </h3>
              </div>
              <div className="space-y-2">
                {upcomingDeadlines.slice(0, 3).map((exam) => {
                  const meta = categoryMeta[exam.category];
                  const examDate = new Date(exam.nextExamDate!);
                  const daysLeft = Math.ceil((examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                  return (
                    <div
                      key={exam.id}
                      className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-xl px-3 py-2.5 border border-emerald-100 dark:border-emerald-800 cursor-pointer hover:shadow-sm transition-all"
                      onClick={() => window.open(exam.applyLink, '_blank')}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <span className="text-base flex-shrink-0">{meta?.emoji}</span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">{exam.name}</p>
                          <p className="text-[10px] text-gray-500">{formatSalary(exam.salaryMin, exam.salaryMax)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {daysLeft > 0 ? (
                          <Badge className={cn("text-[10px] border-0", daysLeft <= 15 ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700")}>
                            {daysLeft}d left
                          </Badge>
                        ) : (
                          <Badge className="bg-emerald-100 text-emerald-700 text-[10px] border-0">Active</Badge>
                        )}
                        <ExternalLink className="h-3 w-3 text-gray-400" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ═══ CATEGORY PILLS ═══ */}
        <div className="mb-4">
          <div className="overflow-x-auto pb-2 -mx-1 px-1">
            <div className="flex gap-2 min-w-max">
              <button
                onClick={() => setSelectedCategory('all')}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border",
                  selectedCategory === 'all'
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200"
                    : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:border-indigo-300 hover:bg-indigo-50"
                )}
              >
                📋 {isTamil ? 'அனைத்தும்' : 'All'}
                <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full", selectedCategory === 'all' ? "bg-white/20" : "bg-gray-100 dark:bg-slate-700 text-gray-500")}>
                  {categoryCounts.all}
                </span>
              </button>
              {Object.entries(categoryMeta).map(([key, meta]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key as CategoryFilter)}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border",
                    selectedCategory === key
                      ? `bg-gradient-to-r ${meta.color} text-white border-transparent shadow-lg`
                      : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:border-gray-300"
                  )}
                >
                  {meta.emoji} {isTamil ? meta.labelTa : meta.label}
                  <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full", selectedCategory === key ? "bg-white/20" : "bg-gray-100 dark:bg-slate-700 text-gray-500")}>
                    {categoryCounts[key] || 0}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ FILTER BAR ═══ */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex gap-1.5">
            {([
              { key: 'all' as StatusFilter, label: isTamil ? 'அனைத்தும்' : 'All' },
              { key: 'open' as StatusFilter, label: isTamil ? 'திறந்தது' : 'Open' },
              { key: 'upcoming' as StatusFilter, label: isTamil ? 'வரும்' : 'Upcoming' },
            ] as const).map(s => (
              <button
                key={s.key}
                onClick={() => setSelectedStatus(s.key)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all border",
                  selectedStatus === s.key
                    ? "bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 border-gray-800 dark:border-gray-200"
                    : "bg-white dark:bg-slate-800 text-gray-500 border-gray-200 dark:border-slate-700 hover:bg-gray-50"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-xs bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-gray-600 dark:text-gray-300 focus:ring-1 focus:ring-indigo-400 outline-none"
          >
            <option value="deadline">{isTamil ? 'தேதி' : 'By Date'}</option>
            <option value="salary-high">{isTamil ? 'அதிக சம்பளம்' : 'Salary ↓'}</option>
            <option value="salary-low">{isTamil ? 'குறைந்த சம்பளம்' : 'Salary ↑'}</option>
            <option value="name">{isTamil ? 'பெயர்' : 'A-Z'}</option>
          </select>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
          {isTamil
            ? `${governmentExams.length} இல் ${filteredExams.length} தேர்வுகள்`
            : `${filteredExams.length} of ${governmentExams.length} exams`}
        </p>

        {/* ═══ EXAM CARDS ═══ */}
        {filteredExams.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">{isTamil ? 'தேர்வுகள் கிடைக்கவில்லை' : 'No exams found'}</p>
            <p className="text-xs text-gray-400 mt-1">{isTamil ? 'வேறு வடிகட்டியை முயற்சிக்கவும்' : 'Try different filters or search terms'}</p>
            <Button variant="link" className="text-indigo-600 text-sm mt-3" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedStatus('all'); }}>
              {isTamil ? 'அனைத்தும் காட்டு' : 'Show all exams'}
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {filteredExams.map((exam, index) => {
              const meta = categoryMeta[exam.category];
              const detailedMatch = findDetailedExam(exam.id);
              const examDate = exam.nextExamDate ? new Date(exam.nextExamDate) : null;
              const daysLeft = examDate ? Math.ceil((examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : null;

              return (
                <motion.div
                  key={exam.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.03, 0.3) }}
                >
                  <Card className={cn(
                    "overflow-hidden border-l-4 hover:shadow-lg transition-all duration-200 bg-white dark:bg-slate-800",
                    meta?.border || 'border-gray-300'
                  )}>
                    <CardContent className="p-4">
                      {/* Icon + Name + Status */}
                      <div className="flex items-start gap-3">
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg flex-shrink-0 bg-gradient-to-br shadow-sm", meta?.color)}>
                          {meta?.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-bold text-sm text-gray-800 dark:text-gray-100">{exam.name}</h3>
                            {getStatusBadge(exam.applicationStatus)}
                          </div>
                          <p className="text-[11px] text-gray-400 mt-0.5">{exam.nameTamil}</p>
                        </div>
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-2 text-center">
                          <Banknote className="w-3.5 h-3.5 mx-auto text-emerald-600 mb-0.5" />
                          <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300">{formatSalary(exam.salaryMin, exam.salaryMax)}</div>
                          <div className="text-[9px] text-emerald-500/70">{isTamil ? 'சம்பளம்' : 'Salary'}</div>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2 text-center">
                          <Users className="w-3.5 h-3.5 mx-auto text-blue-600 mb-0.5" />
                          <div className="text-[10px] font-bold text-blue-700 dark:text-blue-300">{exam.ageMin}–{exam.ageMax} {isTamil ? 'வயது' : 'yrs'}</div>
                          <div className="text-[9px] text-blue-500/70">{isTamil ? 'வயது' : 'Age'}</div>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-2 text-center">
                          <GraduationCap className="w-3.5 h-3.5 mx-auto text-purple-600 mb-0.5" />
                          <div className="text-[10px] font-bold text-purple-700 dark:text-purple-300">{exam.qualification}</div>
                          <div className="text-[9px] text-purple-500/70">{isTamil ? 'தகுதி' : 'Qualification'}</div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2.5 leading-relaxed">{exam.description}</p>

                      {/* Posts */}
                      {exam.posts && exam.posts.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {exam.posts.slice(0, 4).map((post, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300">
                              {post}
                            </span>
                          ))}
                          {exam.posts.length > 4 && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-500">
                              +{exam.posts.length - 4}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Date + Pattern */}
                      <div className="flex items-center gap-3 mt-3 flex-wrap">
                        {examDate && (
                          <div className="flex items-center gap-1.5 text-[11px]">
                            <CalendarClock className="w-3.5 h-3.5 text-amber-500" />
                            <span className="text-gray-500 dark:text-gray-400">
                              {examDate.toLocaleDateString(isTamil ? 'ta-IN' : 'en-IN', { month: 'short', year: 'numeric' })}
                            </span>
                            {daysLeft !== null && daysLeft > 0 && (
                              <Badge className={cn("text-[9px] border-0 ml-1", daysLeft <= 15 ? "bg-red-100 text-red-600" : daysLeft <= 30 ? "bg-amber-100 text-amber-600" : "bg-gray-100 text-gray-500")}>
                                {daysLeft}d
                              </Badge>
                            )}
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-[11px] text-gray-400">
                          <FileText className="w-3 h-3" />
                          <span>{exam.examPattern}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-3">
                        {detailedMatch && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-xs h-9 rounded-xl border-indigo-200 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-900/30"
                            onClick={() => navigate(`/government-exams/${detailedMatch.categoryId}/${detailedMatch.examId}`)}
                          >
                            <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                            {isTamil ? 'பாடத்திட்டம் & PYQ' : 'Syllabus & PYQ'}
                          </Button>
                        )}
                        <Button
                          size="sm"
                          className={cn(
                            "flex-1 text-xs h-9 rounded-xl text-white",
                            exam.applicationStatus === 'open'
                              ? "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
                              : exam.applicationStatus === 'upcoming'
                                ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          )}
                          onClick={() => exam.applicationStatus !== 'closed' && window.open(exam.applyLink, '_blank')}
                          disabled={exam.applicationStatus === 'closed'}
                        >
                          <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                          {exam.applicationStatus === 'open'
                            ? (isTamil ? 'விண்ணப்பிக்க' : 'Apply Now')
                            : exam.applicationStatus === 'upcoming'
                              ? (isTamil ? 'அதிகாரப்பூர்வ தளம்' : 'Official Site')
                              : (isTamil ? 'மூடப்பட்டது' : 'Closed')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ═══ STUDY RESOURCES ═══ */}
        <div className="mt-8 mb-4">
          <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-3">
            {isTamil ? '📚 படிப்பு வளங்கள்' : '📚 Study Resources by Category'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {governmentExamCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={cn(
                    "cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:scale-[1.02]",
                    category.borderColor, category.bgColor, "dark:bg-slate-800/50"
                  )}
                  onClick={() => navigate(`/government-exams/${category.id}`)}
                >
                  <CardContent className="p-4 text-center">
                    <div className={cn("text-3xl mb-2 w-12 h-12 mx-auto rounded-xl flex items-center justify-center bg-gradient-to-br text-white shadow-md", category.color)}>
                      {category.icon}
                    </div>
                    <h4 className="font-bold text-xs text-gray-800 dark:text-gray-100">
                      {isTamil ? category.nameTamil : category.name}
                    </h4>
                    <p className="text-[10px] text-gray-500 mt-1">
                      {category.exams.length} {isTamil ? 'தேர்வுகள்' : 'exams'} • {isTamil ? 'PYQ' : 'Syllabus & PYQ'}
                    </p>
                    <div className="flex items-center justify-center gap-1 mt-2 text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
                      {isTamil ? 'படிக்க தொடங்கு' : 'Start Studying'}
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ═══ TIPS & DISCLAIMER ═══ */}
        <div className="mt-6 space-y-3">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4">
            <h4 className="text-xs font-bold text-indigo-800 dark:text-indigo-200 mb-2 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5" /> {isTamil ? 'படிப்பு உதவிக்குறிப்புகள்' : 'Preparation Tips'}
            </h4>
            <div className="space-y-1.5">
              {(isTamil ? [
                '✅ முதலில் பாடத்திட்டத்தை முழுமையாகப் படிக்கவும்',
                '✅ தினமும் 2 மணி நேரம் ஒதுக்கவும்',
                '✅ முந்தைய ஆண்டு வினாத்தாள்களைத் தீர்க்கவும்',
                '✅ மாக் டெஸ்ட்களை தவறாமல் எழுதுங்கள்'
              ] : [
                '✅ Start with the complete syllabus — know what to study',
                '✅ Dedicate at least 2 hours daily for preparation',
                '✅ Solve previous year question papers regularly',
                '✅ Take mock tests to improve time management'
              ]).map((tip, i) => (
                <p key={i} className="text-[11px] text-indigo-700/80 dark:text-indigo-300/80">{tip}</p>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 text-center">
            <p className="text-[11px] text-amber-700 dark:text-amber-300">
              💡 {isTamil
                ? 'தேதிகள் மாறலாம். அதிகாரப்பூர்வ இணையதளங்களில் சரிபார்க்கவும்.'
                : 'Dates may change. Always verify from official government websites.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentExams;
