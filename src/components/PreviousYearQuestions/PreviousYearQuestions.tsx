import { useState, useMemo } from 'react';
import { SubjectWeightageView } from './SubjectWeightageView';
import { 
  BookOpen, Search, Download, Filter, FileText, 
  GraduationCap, Calendar, Star, ChevronRight, ChevronDown,
  Clock, Bookmark, BookmarkCheck, Sparkles, SortAsc, 
  Eye, TrendingUp, X, ArrowRight, Flame, Target,
  Languages, BarChart3
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { TopicWiseView } from './TopicWiseView';

// ---------- DATA ----------

interface QuestionPaper {
  id: number;
  exam: string;
  year: number;
  session: string;
  subjects: string[];
  downloads: number;
  rating: number;
  category: string;
  subcategory: string;
  isNew: boolean;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Very Hard';
  questions: number;
  duration: string;
  language: string[];
  solved?: boolean;
  trending?: boolean;
}

interface CategoryNode {
  id: string;
  label: string;
  icon: string;
  color: string;
  children: { id: string; label: string }[];
}

interface ExamSubjectMap {
  exam: string;
  subcategory: string;
  subjects: string[];
}

const examSubjectDirectory: Record<string, ExamSubjectMap[]> = {
  engineering: [
    { exam: 'JEE Main', subcategory: 'jee-main', subjects: ['Physics', 'Chemistry', 'Mathematics'] },
    { exam: 'JEE Advanced', subcategory: 'jee-advanced', subjects: ['Physics', 'Chemistry', 'Mathematics'] },
    { exam: 'BITSAT', subcategory: 'bitsat', subjects: ['Physics', 'Chemistry', 'Mathematics', 'English Proficiency', 'Logical Reasoning'] },
    { exam: 'VITEEE', subcategory: 'viteee', subjects: ['Physics', 'Chemistry', 'Mathematics', 'Aptitude', 'English'] },
    { exam: 'SRMJEEE', subcategory: 'srmjeee', subjects: ['Physics', 'Chemistry', 'Mathematics'] },
    { exam: 'TNEA / Anna Univ', subcategory: 'tnea', subjects: ['Physics', 'Chemistry', 'Mathematics'] },
    { exam: 'MHT CET', subcategory: 'mht-cet', subjects: ['Mathematics', 'Physics', 'Chemistry'] },
    { exam: 'COMEDK', subcategory: 'comedk', subjects: ['Physics', 'Chemistry', 'Mathematics'] },
    { exam: 'WB JEE', subcategory: 'wb-jee', subjects: ['Physics', 'Chemistry', 'Mathematics'] },
    { exam: 'KCET', subcategory: 'kcet', subjects: ['Physics', 'Chemistry', 'Mathematics'] },
    { exam: 'AP EAPCET', subcategory: 'ap-eapcet', subjects: ['Physics', 'Chemistry', 'Mathematics'] },
    { exam: 'TS EAMCET', subcategory: 'ts-eamcet', subjects: ['Physics', 'Chemistry', 'Mathematics'] },
    { exam: 'IAT (IISER)', subcategory: 'iat-iiser', subjects: ['Chemistry', 'Physics', 'Mathematics', 'Biology'] },
  ],
  medical: [
    { exam: 'NEET UG', subcategory: 'neet-ug', subjects: ['Physics', 'Chemistry', 'Biology'] },
    { exam: 'NEET PG', subcategory: 'neet-pg', subjects: ['Anatomy', 'Physiology', 'Biochemistry', 'Pharmacology', 'Pathology', 'Microbiology', 'Medicine', 'Surgery', 'Social & Preventive Medicine', 'Forensic Medicine', 'Obstetrics & Gynaecology', 'Dermatology & Venereology', 'Pediatrics', 'Orthopedics', 'Ophthalmology', 'ENT', 'Anaesthesia', 'Radiology', 'Psychiatry'] },
    { exam: 'AIIMS (old)', subcategory: 'aiims', subjects: ['Physics', 'Chemistry', 'Biology', 'GK'] },
    { exam: 'Nursing', subcategory: 'nursing', subjects: ['Physics', 'Chemistry', 'Biology', 'English'] },
    { exam: 'Pharmacy', subcategory: 'pharmacy', subjects: ['Physics', 'Chemistry', 'Biology/Maths'] },
  ],
  management: [
    { exam: 'CAT', subcategory: 'cat', subjects: ['VARC', 'DILR', 'Quantitative Aptitude'] },
    { exam: 'XAT', subcategory: 'xat', subjects: ['Verbal', 'Quantitative', 'Decision Making'] },
    { exam: 'MAT', subcategory: 'mat', subjects: ['Language', 'Maths', 'Data Analysis', 'Reasoning', 'GK'] },
    { exam: 'TANCET MBA', subcategory: 'tancet-mba', subjects: ['Verbal', 'Quantitative', 'Analytical'] },
    { exam: 'SNAP', subcategory: 'snap', subjects: ['English', 'Quantitative', 'Analytical', 'GK'] },
  ],
  law: [
    { exam: 'CLAT', subcategory: 'clat', subjects: ['English', 'Legal Reasoning', 'GK', 'Quantitative', 'Logical'] },
    { exam: 'AILET', subcategory: 'ailet', subjects: ['English', 'Legal Aptitude', 'GK', 'Reasoning'] },
    { exam: 'TNNLU', subcategory: 'tnnlu', subjects: ['English', 'Legal Reasoning', 'GK'] },
  ],
  civil: [
    { exam: 'UPSC Prelims', subcategory: 'upsc-prelims', subjects: ['General Studies', 'CSAT'] },
    { exam: 'UPSC Mains', subcategory: 'upsc-mains', subjects: ['GS I', 'GS II', 'GS III', 'GS IV', 'Essay', 'Optional'] },
    { exam: 'TNPSC Group 1', subcategory: 'tnpsc-group1', subjects: ['GS', 'Aptitude', 'Tamil'] },
    { exam: 'TNPSC Group 2/2A', subcategory: 'tnpsc-group2', subjects: ['GS', 'Tamil', 'Aptitude'] },
    { exam: 'TNPSC Group 4', subcategory: 'tnpsc-group4', subjects: ['GS', 'Tamil', 'Aptitude'] },
  ],
  banking: [
    { exam: 'SBI PO', subcategory: 'sbi-po', subjects: ['Reasoning', 'Quantitative', 'English', 'Banking'] },
    { exam: 'IBPS PO', subcategory: 'ibps-po', subjects: ['Reasoning', 'Quantitative', 'English'] },
    { exam: 'IBPS Clerk', subcategory: 'ibps-clerk', subjects: ['Reasoning', 'Quantitative', 'English'] },
    { exam: 'SSC CGL', subcategory: 'ssc-cgl', subjects: ['Reasoning', 'Quantitative', 'English', 'GK'] },
    { exam: 'SSC CHSL', subcategory: 'ssc-chsl', subjects: ['Reasoning', 'Quantitative', 'English', 'GK'] },
    { exam: 'RRB NTPC', subcategory: 'rrb-ntpc', subjects: ['Maths', 'Reasoning', 'GK'] },
  ],
  defence: [
    { exam: 'NDA', subcategory: 'nda', subjects: ['Maths', 'GAT'] },
    { exam: 'CDS', subcategory: 'cds', subjects: ['English', 'GK', 'Maths'] },
    { exam: 'AFCAT', subcategory: 'afcat', subjects: ['Verbal', 'Numerical', 'Reasoning', 'Military Aptitude'] },
  ],
  university: [
    { exam: 'TANCET MCA', subcategory: 'tancet-mca', subjects: ['Maths', 'Analytical', 'Computer'] },
    { exam: 'TANCET M.E', subcategory: 'tancet-me', subjects: ['Engineering Maths', 'Core Subject'] },
    { exam: 'TNAU', subcategory: 'tnau', subjects: ['Physics', 'Chemistry', 'Biology/Maths'] },
    { exam: 'CUET', subcategory: 'cuet', subjects: ['GS', 'Domain', 'Language'] },
  ],
};

const sidebarCategories: CategoryNode[] = [
  {
    id: 'engineering', label: 'Engineering', icon: '⚙️', color: 'from-blue-500 to-cyan-500',
    children: [
      { id: 'jee-main', label: 'JEE Main' },
      { id: 'jee-advanced', label: 'JEE Advanced' },
      { id: 'tnea', label: 'TNEA / Anna Univ' },
      { id: 'bitsat', label: 'BITSAT' },
      { id: 'viteee', label: 'VITEEE' },
      { id: 'srmjeee', label: 'SRMJEEE' },
      { id: 'mht-cet', label: 'MHT CET' },
      { id: 'comedk', label: 'COMEDK' },
      { id: 'wb-jee', label: 'WB JEE' },
      { id: 'kcet', label: 'KCET' },
      { id: 'ap-eapcet', label: 'AP EAPCET' },
      { id: 'ts-eamcet', label: 'TS EAMCET' },
      { id: 'iat-iiser', label: 'IAT (IISER)' },
    ],
  },
  {
    id: 'medical', label: 'Medical / Health', icon: '🏥', color: 'from-emerald-500 to-teal-500',
    children: [
      { id: 'neet-ug', label: 'NEET UG' },
      { id: 'neet-pg', label: 'NEET PG' },
      { id: 'aiims', label: 'AIIMS (old pattern)' },
      { id: 'nursing', label: 'Nursing Entrance' },
      { id: 'pharmacy', label: 'Pharmacy Entrance' },
    ],
  },
  {
    id: 'management', label: 'Management', icon: '📊', color: 'from-purple-500 to-pink-500',
    children: [
      { id: 'cat', label: 'CAT' },
      { id: 'xat', label: 'XAT' },
      { id: 'mat', label: 'MAT' },
      { id: 'tancet-mba', label: 'TANCET MBA' },
      { id: 'snap', label: 'SNAP' },
    ],
  },
  {
    id: 'law', label: 'Law', icon: '⚖️', color: 'from-amber-500 to-orange-500',
    children: [
      { id: 'clat', label: 'CLAT' },
      { id: 'ailet', label: 'AILET' },
      { id: 'tnnlu', label: 'TNNLU Entrance' },
    ],
  },
  {
    id: 'civil', label: 'Civil Services', icon: '🏛️', color: 'from-rose-500 to-pink-500',
    children: [
      { id: 'upsc-prelims', label: 'UPSC Prelims' },
      { id: 'upsc-mains', label: 'UPSC Mains' },
      { id: 'tnpsc-group1', label: 'TNPSC Group 1' },
      { id: 'tnpsc-group2', label: 'TNPSC Group 2/2A' },
      { id: 'tnpsc-group4', label: 'TNPSC Group 4' },
    ],
  },
  {
    id: 'banking', label: 'Banking & SSC', icon: '🏦', color: 'from-indigo-500 to-blue-500',
    children: [
      { id: 'sbi-po', label: 'SBI PO' },
      { id: 'ibps-po', label: 'IBPS PO' },
      { id: 'ibps-clerk', label: 'IBPS Clerk' },
      { id: 'ssc-cgl', label: 'SSC CGL' },
      { id: 'ssc-chsl', label: 'SSC CHSL' },
      { id: 'rrb-ntpc', label: 'RRB NTPC' },
    ],
  },
  {
    id: 'defence', label: 'Defence', icon: '🎖️', color: 'from-green-600 to-emerald-600',
    children: [
      { id: 'nda', label: 'NDA' },
      { id: 'cds', label: 'CDS' },
      { id: 'afcat', label: 'AFCAT' },
    ],
  },
  {
    id: 'university', label: 'TN University', icon: '🎓', color: 'from-violet-500 to-purple-500',
    children: [
      { id: 'tancet-mca', label: 'TANCET MCA' },
      { id: 'tancet-me', label: 'TANCET M.E/M.Tech' },
      { id: 'tnau', label: 'TNAU Entrance' },
      { id: 'cuet', label: 'CUET' },
    ],
  },
];

const questionPapers: QuestionPaper[] = [
  { id: 1, exam: 'JEE Main', year: 2025, session: 'January Session 1 - Shift 1', subjects: ['Physics', 'Chemistry', 'Mathematics'], downloads: 24580, rating: 4.9, category: 'engineering', subcategory: 'jee-main', isNew: true, difficulty: 'Moderate', questions: 90, duration: '3 hrs', language: ['English', 'Hindi', 'Tamil'], trending: true },
  { id: 2, exam: 'JEE Main', year: 2025, session: 'January Session 1 - Shift 2', subjects: ['Physics', 'Chemistry', 'Mathematics'], downloads: 21300, rating: 4.8, category: 'engineering', subcategory: 'jee-main', isNew: true, difficulty: 'Hard', questions: 90, duration: '3 hrs', language: ['English', 'Hindi'] },
  { id: 3, exam: 'JEE Main', year: 2024, session: 'January Session 1', subjects: ['Physics', 'Chemistry', 'Mathematics'], downloads: 35420, rating: 4.8, category: 'engineering', subcategory: 'jee-main', isNew: false, difficulty: 'Moderate', questions: 90, duration: '3 hrs', language: ['English', 'Hindi', 'Tamil'] },
  { id: 4, exam: 'JEE Main', year: 2024, session: 'April Session 2', subjects: ['Physics', 'Chemistry', 'Mathematics'], downloads: 28100, rating: 4.7, category: 'engineering', subcategory: 'jee-main', isNew: false, difficulty: 'Hard', questions: 90, duration: '3 hrs', language: ['English', 'Hindi'] },
  { id: 5, exam: 'JEE Main', year: 2023, session: 'January Session', subjects: ['Physics', 'Chemistry', 'Mathematics'], downloads: 42000, rating: 4.7, category: 'engineering', subcategory: 'jee-main', isNew: false, difficulty: 'Moderate', questions: 90, duration: '3 hrs', language: ['English', 'Hindi'] },
  { id: 6, exam: 'JEE Advanced', year: 2024, session: 'Paper 1 & 2', subjects: ['Physics', 'Chemistry', 'Mathematics'], downloads: 18900, rating: 4.9, category: 'engineering', subcategory: 'jee-advanced', isNew: false, difficulty: 'Very Hard', questions: 54, duration: '3+3 hrs', language: ['English', 'Hindi'], trending: true },
  { id: 7, exam: 'JEE Advanced', year: 2023, session: 'Paper 1 & 2', subjects: ['Physics', 'Chemistry', 'Mathematics'], downloads: 22100, rating: 4.8, category: 'engineering', subcategory: 'jee-advanced', isNew: false, difficulty: 'Very Hard', questions: 54, duration: '3+3 hrs', language: ['English', 'Hindi'] },
  { id: 8, exam: 'NEET UG', year: 2025, session: 'May Session', subjects: ['Physics', 'Chemistry', 'Biology'], downloads: 38500, rating: 4.9, category: 'medical', subcategory: 'neet-ug', isNew: true, difficulty: 'Hard', questions: 200, duration: '3 hrs 20 min', language: ['English', 'Hindi', 'Tamil'], trending: true },
  { id: 9, exam: 'NEET UG', year: 2024, session: 'May Session', subjects: ['Physics', 'Chemistry', 'Biology'], downloads: 52350, rating: 4.9, category: 'medical', subcategory: 'neet-ug', isNew: false, difficulty: 'Hard', questions: 200, duration: '3 hrs 20 min', language: ['English', 'Hindi', 'Tamil'] },
  { id: 10, exam: 'NEET UG', year: 2023, session: 'May Session', subjects: ['Physics', 'Chemistry', 'Biology'], downloads: 61000, rating: 4.8, category: 'medical', subcategory: 'neet-ug', isNew: false, difficulty: 'Moderate', questions: 200, duration: '3 hrs 20 min', language: ['English', 'Hindi', 'Tamil'] },
  { id: 11, exam: 'CAT', year: 2024, session: 'Slot 1, 2, 3', subjects: ['VARC', 'DILR', 'QA'], downloads: 14450, rating: 4.7, category: 'management', subcategory: 'cat', isNew: false, difficulty: 'Hard', questions: 66, duration: '2 hrs', language: ['English'] },
  { id: 12, exam: 'CAT', year: 2023, session: 'Slot 1, 2, 3', subjects: ['VARC', 'DILR', 'QA'], downloads: 18200, rating: 4.6, category: 'management', subcategory: 'cat', isNew: false, difficulty: 'Hard', questions: 66, duration: '2 hrs', language: ['English'] },
  { id: 13, exam: 'UPSC CSE Prelims', year: 2024, session: 'Paper I (GS) & Paper II (CSAT)', subjects: ['GS', 'CSAT'], downloads: 45900, rating: 4.9, category: 'civil', subcategory: 'upsc-prelims', isNew: false, difficulty: 'Very Hard', questions: 200, duration: '2+2 hrs', language: ['English', 'Hindi'], trending: true },
  { id: 14, exam: 'UPSC CSE Prelims', year: 2023, session: 'Paper I & II', subjects: ['GS', 'CSAT'], downloads: 52800, rating: 4.9, category: 'civil', subcategory: 'upsc-prelims', isNew: false, difficulty: 'Very Hard', questions: 200, duration: '2+2 hrs', language: ['English', 'Hindi'] },
  { id: 15, exam: 'TNPSC Group 1', year: 2024, session: 'Prelims', subjects: ['GS', 'Aptitude', 'Tamil'], downloads: 32100, rating: 4.8, category: 'civil', subcategory: 'tnpsc-group1', isNew: false, difficulty: 'Hard', questions: 200, duration: '3 hrs', language: ['English', 'Tamil'] },
  { id: 16, exam: 'TNPSC Group 2/2A', year: 2024, session: 'Full Paper', subjects: ['GS', 'Tamil', 'Aptitude'], downloads: 28400, rating: 4.7, category: 'civil', subcategory: 'tnpsc-group2', isNew: false, difficulty: 'Moderate', questions: 200, duration: '3 hrs', language: ['English', 'Tamil'] },
  { id: 17, exam: 'TNPSC Group 4', year: 2024, session: 'Combined Exam', subjects: ['GS', 'Tamil', 'Aptitude'], downloads: 38900, rating: 4.6, category: 'civil', subcategory: 'tnpsc-group4', isNew: false, difficulty: 'Easy', questions: 200, duration: '3 hrs', language: ['English', 'Tamil'] },
  { id: 18, exam: 'CLAT', year: 2025, session: 'UG Exam', subjects: ['English', 'Legal Reasoning', 'GK', 'Quantitative', 'Logical'], downloads: 12540, rating: 4.6, category: 'law', subcategory: 'clat', isNew: true, difficulty: 'Moderate', questions: 150, duration: '2 hrs', language: ['English'] },
  { id: 19, exam: 'CLAT', year: 2024, session: 'UG Exam', subjects: ['English', 'Legal Reasoning', 'GK', 'Quantitative'], downloads: 15200, rating: 4.5, category: 'law', subcategory: 'clat', isNew: false, difficulty: 'Moderate', questions: 150, duration: '2 hrs', language: ['English'] },
  { id: 20, exam: 'SBI PO', year: 2024, session: 'Prelims + Mains', subjects: ['Reasoning', 'Quantitative', 'English', 'Banking'], downloads: 22800, rating: 4.7, category: 'banking', subcategory: 'sbi-po', isNew: false, difficulty: 'Moderate', questions: 155, duration: '1+3 hrs', language: ['English', 'Hindi'] },
  { id: 21, exam: 'SSC CGL', year: 2024, session: 'Tier 1', subjects: ['Reasoning', 'Quantitative', 'English', 'GK'], downloads: 31200, rating: 4.6, category: 'banking', subcategory: 'ssc-cgl', isNew: false, difficulty: 'Moderate', questions: 100, duration: '1 hr', language: ['English', 'Hindi'] },
  { id: 22, exam: 'NDA', year: 2024, session: 'Paper I & II', subjects: ['Maths', 'GAT'], downloads: 16700, rating: 4.5, category: 'defence', subcategory: 'nda', isNew: false, difficulty: 'Moderate', questions: 270, duration: '2.5+2.5 hrs', language: ['English'] },
  { id: 23, exam: 'TANCET MBA', year: 2024, session: 'Full Paper', subjects: ['Verbal', 'Quantitative', 'Analytical'], downloads: 8900, rating: 4.4, category: 'management', subcategory: 'tancet-mba', isNew: false, difficulty: 'Moderate', questions: 100, duration: '2 hrs', language: ['English'] },
  { id: 24, exam: 'CUET', year: 2024, session: 'Domain Subjects', subjects: ['GS', 'Domain', 'Language'], downloads: 19500, rating: 4.5, category: 'university', subcategory: 'cuet', isNew: false, difficulty: 'Moderate', questions: 175, duration: '3 hrs 15 min', language: ['English', 'Hindi', 'Tamil'] },
  { id: 25, exam: 'BITSAT', year: 2024, session: 'Online Test', subjects: ['Physics', 'Chemistry', 'Maths', 'English', 'Logical'], downloads: 11200, rating: 4.6, category: 'engineering', subcategory: 'bitsat', isNew: false, difficulty: 'Hard', questions: 130, duration: '3 hrs', language: ['English'] },
  { id: 26, exam: 'TNAU Entrance', year: 2024, session: 'Agriculture Stream', subjects: ['Physics', 'Chemistry', 'Biology/Maths'], downloads: 9800, rating: 4.3, category: 'university', subcategory: 'tnau', isNew: false, difficulty: 'Moderate', questions: 200, duration: '3 hrs', language: ['English', 'Tamil'] },
  { id: 27, exam: 'RRB NTPC', year: 2024, session: 'CBT 1', subjects: ['Maths', 'Reasoning', 'GK'], downloads: 27600, rating: 4.5, category: 'banking', subcategory: 'rrb-ntpc', isNew: false, difficulty: 'Easy', questions: 100, duration: '90 min', language: ['English', 'Hindi', 'Tamil'] },
  { id: 28, exam: 'IBPS PO', year: 2024, session: 'Prelims', subjects: ['Reasoning', 'Quantitative', 'English'], downloads: 19400, rating: 4.6, category: 'banking', subcategory: 'ibps-po', isNew: false, difficulty: 'Moderate', questions: 100, duration: '1 hr', language: ['English', 'Hindi'] },
  { id: 29, exam: 'VITEEE', year: 2024, session: 'Online Test', subjects: ['Physics', 'Chemistry', 'Maths', 'Aptitude'], downloads: 15200, rating: 4.5, category: 'engineering', subcategory: 'viteee', isNew: false, difficulty: 'Moderate', questions: 125, duration: '2.5 hrs', language: ['English'] },
  { id: 30, exam: 'SRMJEEE', year: 2024, session: 'Phase 1', subjects: ['Physics', 'Chemistry', 'Maths'], downloads: 12800, rating: 4.4, category: 'engineering', subcategory: 'srmjeee', isNew: false, difficulty: 'Moderate', questions: 125, duration: '2.5 hrs', language: ['English'] },
  { id: 31, exam: 'CDS', year: 2024, session: 'Paper I & II', subjects: ['English', 'GK', 'Maths'], downloads: 14300, rating: 4.5, category: 'defence', subcategory: 'cds', isNew: false, difficulty: 'Moderate', questions: 300, duration: '2+2+2 hrs', language: ['English'] },
  { id: 32, exam: 'SSC CHSL', year: 2024, session: 'Tier 1', subjects: ['Reasoning', 'Quantitative', 'English', 'GK'], downloads: 25100, rating: 4.4, category: 'banking', subcategory: 'ssc-chsl', isNew: false, difficulty: 'Easy', questions: 100, duration: '1 hr', language: ['English', 'Hindi'] },
];

// ---------- HELPERS ----------

const getDifficultyConfig = (d: string) => {
  switch (d) {
    case 'Easy': return { bg: 'bg-emerald-500/10', text: 'text-emerald-600', border: 'border-emerald-500/20', dot: 'bg-emerald-500' };
    case 'Moderate': return { bg: 'bg-amber-500/10', text: 'text-amber-600', border: 'border-amber-500/20', dot: 'bg-amber-500' };
    case 'Hard': return { bg: 'bg-orange-500/10', text: 'text-orange-600', border: 'border-orange-500/20', dot: 'bg-orange-500' };
    case 'Very Hard': return { bg: 'bg-red-500/10', text: 'text-red-600', border: 'border-red-500/20', dot: 'bg-red-500' };
    default: return { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200', dot: 'bg-gray-400' };
  }
};

const getCategoryGradient = (cat: string) => {
  const found = sidebarCategories.find(c => c.id === cat);
  return found?.color || 'from-gray-500 to-gray-600';
};

const formatDownloads = (n: number) => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
};

// ---------- COMPONENT ----------

export const PreviousYearQuestions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['engineering', 'medical']);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('latest');
  const [bookmarked, setBookmarked] = useState<number[]>([]);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [topicView, setTopicView] = useState<{ examId: string; examName: string; subject: string } | null>(null);
  const [subjectWeightageView, setSubjectWeightageView] = useState<{ examId: string; examName: string } | null>(null);

  const toggleCategory = (catId: string) => {
    setExpandedCategories(prev =>
      prev.includes(catId) ? prev.filter(c => c !== catId) : [...prev, catId]
    );
  };

  const handleSubcategoryClick = (catId: string, subId: string) => {
    if (selectedSubcategory === subId) {
      setSelectedSubcategory(null);
      setSelectedCategory(null);
    } else {
      setSelectedSubcategory(subId);
      setSelectedCategory(catId);
    }
    setShowMobileSidebar(false);
  };

  const handleCategoryClick = (catId: string) => {
    if (selectedCategory === catId && !selectedSubcategory) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(catId);
      setSelectedSubcategory(null);
    }
  };

  const toggleBookmark = (id: number) => {
    setBookmarked(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  // Filter & Sort
  const sorted = useMemo(() => {
    const filtered = questionPapers.filter(p => {
      const matchesCat = !selectedCategory || p.category === selectedCategory;
      const matchesSub = !selectedSubcategory || p.subcategory === selectedSubcategory;
      const matchesSearch = !searchQuery || 
        p.exam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSub && matchesSearch;
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'latest': return b.year - a.year || b.id - a.id;
        case 'popular': return b.downloads - a.downloads;
        case 'rating': return b.rating - a.rating;
        default: return 0;
      }
    });
  }, [selectedCategory, selectedSubcategory, searchQuery, sortBy]);

  const breadcrumbParts: string[] = [];
  if (selectedCategory) {
    const cat = sidebarCategories.find(c => c.id === selectedCategory);
    if (cat) breadcrumbParts.push(cat.label);
  }
  if (selectedSubcategory) {
    const sub = sidebarCategories.flatMap(c => c.children).find(s => s.id === selectedSubcategory);
    if (sub) breadcrumbParts.push(sub.label);
  }
  const breadcrumb = breadcrumbParts.length ? breadcrumbParts.join(' › ') : 'All Exams';

  // Sidebar content
  const SidebarNav = () => (
    <div className="space-y-1">
      <button
        onClick={() => { setSelectedCategory(null); setSelectedSubcategory(null); setShowMobileSidebar(false); }}
        className={cn(
          "w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
          !selectedCategory && !selectedSubcategory
            ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-500/25"
            : "text-gray-700 hover:bg-gray-50"
        )}
      >
        <span className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          All Exams
        </span>
      </button>

      {sidebarCategories.map(cat => {
        const isExpanded = expandedCategories.includes(cat.id);
        const isActive = selectedCategory === cat.id && !selectedSubcategory;
        const hasActiveSub = selectedCategory === cat.id && !!selectedSubcategory;
        const paperCount = questionPapers.filter(p => p.category === cat.id).length;

        return (
          <div key={cat.id}>
            <button
              onClick={() => { toggleCategory(cat.id); handleCategoryClick(cat.id); }}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-500/25"
                  : hasActiveSub
                    ? "bg-rose-50 text-rose-700"
                    : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <span className="flex items-center gap-2">
                <span className="text-base">{cat.icon}</span>
                <span>{cat.label}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className={cn(
                  "text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center",
                  isActive ? "bg-white/25 text-white" : "bg-gray-100 text-gray-500"
                )}>
                  {paperCount}
                </span>
                <ChevronDown className={cn(
                  "w-3.5 h-3.5 transition-transform duration-200",
                  isExpanded && "rotate-180",
                  isActive ? "text-white/70" : "text-gray-400"
                )} />
              </span>
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-rose-100 pl-3">
                    {cat.children.map(sub => {
                      const subCount = questionPapers.filter(p => p.subcategory === sub.id).length;
                      const isSubActive = selectedSubcategory === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => handleSubcategoryClick(cat.id, sub.id)}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-150",
                            isSubActive
                              ? "bg-rose-50 text-rose-700 font-semibold border border-rose-200"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                          )}
                        >
                          <span className="flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              {isSubActive && <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />}
                              {sub.label}
                            </span>
                            {subCount > 0 && (
                              <span className={cn("text-[10px]", isSubActive ? "text-rose-500 font-bold" : "text-gray-400")}>{subCount}</span>
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Hero Header with glassmorphism */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-rose-600 via-pink-600 to-purple-700" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-pink-300/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="relative z-10 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-white/15 backdrop-blur-sm rounded-xl border border-white/20">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-amber-900 text-xs font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> 2025 Updated
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur text-white text-xs font-medium flex items-center gap-1 border border-white/20">
                    <Flame className="w-3 h-3" /> Trending
                  </span>
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-1.5">Previous Year Questions</h2>
              <p className="text-rose-100 text-base md:text-lg">
                Access 10,000+ question papers from 50+ entrance exams
              </p>
              <p className="text-pink-200/80 font-tamil text-sm mt-1">
                முந்தைய ஆண்டு கேள்விகள் - சிறந்த நுழைவுத் தேர்வுகளிலிருந்து
              </p>
            </div>
            
            {/* Quick stats in header */}
            <div className="flex gap-3">
              {[
                { value: '10K+', label: 'Papers', icon: FileText },
                { value: '50+', label: 'Exams', icon: Target },
                { value: '5K+', label: 'Daily', icon: TrendingUp },
              ].map((s, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-4 py-3 text-center min-w-[80px]">
                  <s.icon className="w-4 h-4 text-white/70 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">{s.value}</div>
                  <div className="text-[10px] text-white/60 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search + Sort Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search exams, subjects, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 rounded-xl border-gray-200 bg-white shadow-sm focus:shadow-md transition-shadow"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="md:hidden rounded-xl h-11 border-gray-200"
            onClick={() => setShowMobileSidebar(true)}
          >
            <Filter className="w-4 h-4 mr-1.5" />
            Filters
            {(selectedCategory || selectedSubcategory) && (
              <span className="ml-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
                {(selectedCategory ? 1 : 0) + (selectedSubcategory ? 1 : 0)}
              </span>
            )}
          </Button>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[170px] rounded-xl border-gray-200 bg-white h-11 shadow-sm">
              <SortAsc className="w-4 h-4 mr-2 text-gray-400" />
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg z-50 rounded-xl">
              <SelectItem value="latest">📅 Latest First</SelectItem>
              <SelectItem value="popular">🔥 Most Downloaded</SelectItem>
              <SelectItem value="rating">⭐ Top Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {showMobileSidebar && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setShowMobileSidebar(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-80 bg-white z-50 shadow-2xl md:hidden"
            >
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-rose-500" />
                  Filter by Category
                </h3>
                <button onClick={() => setShowMobileSidebar(false)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <ScrollArea className="h-[calc(100%-60px)] p-4">
                <SidebarNav />
              </ScrollArea>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Layout: Sidebar + Grid */}
      <div className="flex gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-4 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
              <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-rose-500" />
                Categories
              </h3>
            </div>
            <ScrollArea className="max-h-[calc(100vh-10rem)] p-3">
              <SidebarNav />
            </ScrollArea>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Breadcrumb + Count */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between mb-5"
          >
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-bold text-gray-800 text-lg">{breadcrumb}</h3>
                {selectedCategory && (
                  <span className={cn("inline-block w-2 h-2 rounded-full bg-gradient-to-r", getCategoryGradient(selectedCategory))} />
                )}
              </div>
              <p className="text-sm text-gray-500">
                {sorted.length} {sorted.length === 1 ? 'paper' : 'papers'} available
              </p>
            </div>
            {(selectedCategory || selectedSubcategory) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { setSelectedCategory(null); setSelectedSubcategory(null); }}
                className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl"
              >
                <X className="w-3.5 h-3.5 mr-1" />
                Clear
              </Button>
            )}
          </motion.div>

          {/* Subject Weightage View (NEET PG style) */}
          {subjectWeightageView ? (
            <SubjectWeightageView
              examId={subjectWeightageView.examId}
              examName={subjectWeightageView.examName}
              onBack={() => setSubjectWeightageView(null)}
              onSelectSubject={(subject) => {
                setTopicView({ examId: subjectWeightageView.examId, examName: subjectWeightageView.examName, subject });
                setSubjectWeightageView(null);
              }}
            />
          ) : topicView ? (
            <TopicWiseView
              examId={topicView.examId}
              examName={topicView.examName}
              subject={topicView.subject}
              onBack={() => setTopicView(null)}
              onViewQuestions={(topic) => {
                setSearchQuery(topic);
                setTopicView(null);
              }}
            />
          ) : (
          <>
          {/* Subject-wise Exam Directory (ExamSIDE style) */}
          {selectedCategory && !selectedSubcategory && examSubjectDirectory[selectedCategory] && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                {/* Directory header */}
                <div className={cn("px-5 py-3 bg-gradient-to-r text-white", getCategoryGradient(selectedCategory))}>
                  <h4 className="font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Subject-wise Question Bank
                  </h4>
                  <p className="text-white/80 text-xs mt-0.5">Click on a subject to browse topic-wise previous year questions</p>
                </div>
                {/* Exam grid */}
                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {examSubjectDirectory[selectedCategory].map((entry) => (
                    <div key={entry.subcategory} className="space-y-1.5">
                      <h5
                        className="font-bold text-gray-800 text-sm cursor-pointer hover:text-rose-600 transition-colors"
                        onClick={() => handleSubcategoryClick(selectedCategory, entry.subcategory)}
                      >
                        {entry.exam}
                      </h5>
                      <div className="flex flex-col gap-0.5">
                        {entry.subcategory === 'neet-pg' && (
                          <button
                            onClick={() => setSubjectWeightageView({ examId: entry.subcategory, examName: entry.exam })}
                            className="text-left text-sm text-emerald-600 hover:text-emerald-800 hover:underline transition-colors py-0.5 font-medium"
                          >
                            📊 Subject-Wise Weightage
                          </button>
                        )}
                        {entry.subjects.map((subject) => (
                            <button
                              key={subject}
                              onClick={() => {
                                setTopicView({ examId: entry.subcategory, examName: entry.exam, subject });
                              }}
                              className="text-left text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors py-0.5"
                            >
                              {subject}
                            </button>
                          ))}

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* NEET PG Weightage shortcut when subcategory is selected */}
          {selectedSubcategory === 'neet-pg' && (
            <div className="mb-4">
              <button
                onClick={() => setSubjectWeightageView({ examId: 'neet-pg', examName: 'NEET PG' })}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium text-sm rounded-xl border border-emerald-200 transition-colors"
              >
                📊 Subject-Wise Weightage Dashboard
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Papers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {sorted.map((paper, index) => (
                <motion.div
                  key={paper.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: Math.min(index * 0.03, 0.3) }}
                >
                  <Card className="group bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden rounded-2xl">
                    {/* Top gradient bar */}
                    <div className={cn("h-1 bg-gradient-to-r", getCategoryGradient(paper.category))} />
                    
                    <CardContent className="p-5">
                      {/* Title row */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h4 className="font-bold text-gray-800 truncate">{paper.exam}</h4>
                            {paper.isNew && (
                              <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-bold uppercase tracking-wider animate-pulse">
                                New
                              </span>
                            )}
                            {paper.trending && (
                              <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-orange-400 to-amber-400 text-amber-900 text-[10px] font-bold flex items-center gap-0.5">
                                <Flame className="w-2.5 h-2.5" /> Hot
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 truncate">{paper.year} • {paper.session}</p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleBookmark(paper.id); }}
                          className="p-2 hover:bg-gray-50 rounded-xl transition-all duration-200 -mr-1 -mt-1"
                        >
                          {bookmarked.includes(paper.id) ? (
                            <BookmarkCheck className="w-5 h-5 text-rose-500 fill-rose-500" />
                          ) : (
                            <Bookmark className="w-5 h-5 text-gray-300 group-hover:text-gray-400 transition-colors" />
                          )}
                        </button>
                      </div>

                      {/* Subject chips */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {paper.subjects.slice(0, 3).map((s, i) => (
                          <span key={i} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-gray-50 text-gray-600 border border-gray-100">
                            {s}
                          </span>
                        ))}
                        {paper.subjects.length > 3 && (
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-gray-50 text-gray-500">
                            +{paper.subjects.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Meta row */}
                      <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5 text-gray-400" />
                          {paper.questions} Qs
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          {paper.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          {paper.rating}
                        </span>
                      </div>

                      {/* Difficulty + Downloads row */}
                      <div className="flex items-center justify-between mb-3">
                        {(() => {
                          const dc = getDifficultyConfig(paper.difficulty);
                          return (
                            <span className={cn("text-[11px] font-semibold px-2.5 py-1 rounded-lg border flex items-center gap-1.5", dc.bg, dc.text, dc.border)}>
                              <span className={cn("w-1.5 h-1.5 rounded-full", dc.dot)} />
                              {paper.difficulty}
                            </span>
                          );
                        })()}
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          {formatDownloads(paper.downloads)}
                        </span>
                      </div>

                      {/* Language pills */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {paper.language.map((l, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium border border-blue-100">
                            {l}
                          </span>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2 pt-3 border-t border-gray-50">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-xl h-9 shadow-sm shadow-rose-500/20 hover:shadow-md hover:shadow-rose-500/30 transition-all"
                        >
                          <Download className="w-3.5 h-3.5 mr-1.5" />
                          Download PDF
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="rounded-xl h-9 border-gray-200 hover:bg-gray-50 px-3"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty state */}
          {sorted.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-600 font-semibold text-lg">No papers found</p>
              <p className="text-sm text-gray-400 mt-1 max-w-xs mx-auto">Try adjusting your filters or search query</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 rounded-xl"
                onClick={() => { setSearchQuery(''); setSelectedCategory(null); setSelectedSubcategory(null); }}
              >
                Reset all filters
              </Button>
            </motion.div>
          )}

          {/* Load more */}
          {sorted.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center mt-8"
            >
              <Button variant="outline" size="lg" className="rounded-xl border-gray-200 hover:bg-gray-50 shadow-sm px-8">
                View More Papers
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}
          </>
          )}
        </div>
      </div>
    </div>
  );
};
