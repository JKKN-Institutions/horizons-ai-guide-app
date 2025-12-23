import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code, ChevronRight, ExternalLink, BookOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface Problem {
  id: string;
  title: string;
  description: string | null;
  difficulty: string;
  category: string;
  examples: any[] | null;
  constraints: string | null;
  hints: any[] | null;
  solution_approaches: any[] | null;
  external_links: any[] | null;
}

const difficultyFilters = ['All', 'Easy', 'Medium', 'Hard'];

const topicIcons: Record<string, { count: number; color: string }> = {
  'Arrays': { count: 50, color: 'bg-blue-100 text-blue-600' },
  'Strings': { count: 35, color: 'bg-purple-100 text-purple-600' },
  'Linked List': { count: 30, color: 'bg-green-100 text-green-600' },
  'Trees': { count: 40, color: 'bg-orange-100 text-orange-600' },
  'Dynamic Programming': { count: 50, color: 'bg-red-100 text-red-600' },
  'Graphs': { count: 25, color: 'bg-cyan-100 text-cyan-600' },
  'Sorting': { count: 20, color: 'bg-yellow-100 text-yellow-600' },
  'Recursion': { count: 15, color: 'bg-pink-100 text-pink-600' },
};

export function PracticeTab() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const { data, error } = await supabase
        .from('coding_problems')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProblems((data || []) as Problem[]);
    } catch (error) {
      console.error('Error fetching problems:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProblems = problems.filter((problem) => {
    return activeFilter === 'All' || problem.difficulty.toLowerCase() === activeFilter.toLowerCase();
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'hard':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getDifficultyBadgeColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Group problems by category
  const groupedProblems = problems.reduce((acc, problem) => {
    const category = problem.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(problem);
    return acc;
  }, {} as Record<string, Problem[]>);

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">Coding Practice</h2>
        <p className="text-sm text-gray-500 mt-1">Master DSA with {problems.length}+ problems</p>
      </div>

      {/* Difficulty Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {difficultyFilters.map((filter) => (
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

      {/* Topics Grid */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Topics</h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(groupedProblems).map(([category, categoryProblems]) => {
            const topicConfig = topicIcons[category] || { count: categoryProblems.length, color: 'bg-gray-100 text-gray-600' };
            return (
              <div
                key={category}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-lg ${topicConfig.color} flex items-center justify-center mb-3`}>
                  <Code className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">{category}</h4>
                <p className="text-xs text-gray-500">{categoryProblems.length} problems</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Popular Problems */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Popular Problems</h3>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
          {filteredProblems.slice(0, 10).map((problem) => (
            <Link
              key={problem.id}
              to={`/jkkn/problem/${problem.id}`}
              className="p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors"
            >
              <div className={`w-2.5 h-2.5 rounded-full ${getDifficultyColor(problem.difficulty)}`} />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 text-sm truncate">{problem.title}</h4>
                <p className="text-xs text-gray-500">{problem.category}</p>
              </div>
              <Badge className={`${getDifficultyBadgeColor(problem.difficulty)} text-xs`}>
                {problem.difficulty}
              </Badge>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
          ))}
        </div>
      </div>

      {/* External Practice Links */}
      <div className="bg-gradient-to-r from-[#E8F5E9] to-[#FFF8E1] rounded-xl p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Practice on Popular Platforms</h3>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open('https://leetcode.com', '_blank')}
            className="bg-white"
          >
            LeetCode
            <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open('https://geeksforgeeks.org', '_blank')}
            className="bg-white"
          >
            GeeksforGeeks
            <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open('https://hackerrank.com', '_blank')}
            className="bg-white"
          >
            HackerRank
            <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </div>

      {problems.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No problems found</p>
        </div>
      )}
    </div>
  );
}
