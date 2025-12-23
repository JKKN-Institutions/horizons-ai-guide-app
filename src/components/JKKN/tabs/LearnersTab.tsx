import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Trophy, Clock, Linkedin, Github, ChevronDown, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Json } from '@/integrations/supabase/types';

interface Learner {
  id: string;
  learner_number: number;
  name: string;
  email: string;
  phone: string;
  photo_url: string | null;
  college: string;
  course: string;
  branch: string;
  year_of_study: string;
  graduation_year: number;
  skills: string[];
  career_interest: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  registered_at: string;
}

const branchFilters = ['All', 'CSE', 'IT', 'ECE', 'MCA', 'More'];

export function LearnersTab() {
  const [learners, setLearners] = useState<Learner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [displayCount, setDisplayCount] = useState(10);

  useEffect(() => {
    fetchLearners();
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel('learners-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'learners' },
        (payload) => {
          const newLearner = payload.new as Learner;
          newLearner.skills = Array.isArray(newLearner.skills) ? newLearner.skills : [];
          setLearners((prev) => [newLearner, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchLearners = async () => {
    try {
      const { data, error } = await supabase
        .from('learners')
        .select('*')
        .order('registered_at', { ascending: false });

      if (error) throw error;

      const formattedLearners = (data || []).map((learner) => ({
        ...learner,
        skills: Array.isArray(learner.skills) ? (learner.skills as Json[]).map(s => String(s)) : [],
      }));

      setLearners(formattedLearners as Learner[]);
    } catch (error) {
      console.error('Error fetching learners:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLearners = learners.filter((learner) => {
    const matchesSearch =
      learner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      learner.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      learner.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesFilter =
      activeFilter === 'All' ||
      activeFilter === 'More' ||
      learner.branch.toUpperCase().includes(activeFilter);

    return matchesSearch && matchesFilter;
  });

  const displayedLearners = filteredLearners.slice(0, displayCount);

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const registered = new Date(dateString);
    const diffMs = now.getTime() - registered.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just Now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const getRankBadge = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex gap-3">
              <Skeleton className="w-16 h-16 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search learners..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 py-3 rounded-xl border-gray-200 bg-white"
        />
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {branchFilters.map((filter) => (
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

      {/* Count */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{filteredLearners.length}+ Registered (Newest First)</span>
      </div>

      {/* Learner Cards */}
      <div className="space-y-3">
        {displayedLearners.map((learner, index) => (
          <Link
            key={learner.id}
            to={`/jkkn/learner/${learner.id}`}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow block"
          >
            <div className="flex gap-3">
              {/* Rank Badge */}
              <div className="flex flex-col items-center gap-1">
                <span className={`text-lg font-bold ${index < 3 ? 'text-2xl' : 'text-gray-400 text-sm'}`}>
                  {getRankBadge(index)}
                </span>
              </div>

              {/* Avatar */}
              <Avatar className="w-14 h-14 border-2 border-[#2E7D32]/20">
                <AvatarImage src={learner.photo_url || undefined} />
                <AvatarFallback className="bg-[#E8F5E9] text-[#2E7D32] font-semibold">
                  {learner.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 truncate">{learner.name}</h3>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {getTimeAgo(learner.registered_at)}
                  </span>
                </div>
                
                <p className="text-sm text-[#2E7D32] font-medium">
                  {learner.course} {learner.branch} | {learner.year_of_study}
                </p>
                
                <p className="text-xs text-gray-500 truncate">{learner.college}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {learner.skills.slice(0, 3).map((skill, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-[#E8F5E9] text-[#2E7D32] text-xs px-2 py-0.5"
                    >
                      {skill}
                    </Badge>
                  ))}
                  {learner.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs px-2 py-0.5">
                      +{learner.skills.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Social Links */}
                <div className="flex gap-2 mt-2">
                  {learner.linkedin_url && (
                    <a
                      href={learner.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-[#0077B5]/10 rounded-md hover:bg-[#0077B5]/20 transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-[#0077B5]" />
                    </a>
                  )}
                  {learner.github_url && (
                    <a
                      href={learner.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      <Github className="w-4 h-4 text-gray-700" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Load More */}
      {displayCount < filteredLearners.length && (
        <Button
          variant="outline"
          onClick={() => setDisplayCount((prev) => prev + 10)}
          className="w-full py-3 border-[#2E7D32] text-[#2E7D32] hover:bg-[#E8F5E9]"
        >
          <ChevronDown className="w-4 h-4 mr-2" />
          Load More
        </Button>
      )}

      {filteredLearners.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No learners found</p>
        </div>
      )}
    </div>
  );
}
