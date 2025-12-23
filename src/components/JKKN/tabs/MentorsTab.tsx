import { useState, useEffect } from 'react';
import { Search, Star, Linkedin, Building, GraduationCap, UserCheck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Mentor {
  id: string;
  name: string;
  photo_url: string | null;
  designation: string | null;
  company: string | null;
  college: string | null;
  expertise: string[];
  linkedin_url: string | null;
  rating: number | null;
}

const companyFilters = ['All', 'Google', 'Amazon', 'TCS', 'Microsoft'];

export function MentorsTab() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const { data, error } = await supabase
        .from('mentors')
        .select('*')
        .order('rating', { ascending: false });

      if (error) throw error;

      const formattedMentors = (data || []).map((mentor) => ({
        ...mentor,
        expertise: Array.isArray(mentor.expertise) ? (mentor.expertise as any[]).map(s => String(s)) : [],
      }));

      setMentors(formattedMentors as Mentor[]);
    } catch (error) {
      console.error('Error fetching mentors:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.designation?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === 'All' ||
      mentor.company?.toLowerCase().includes(activeFilter.toLowerCase());

    return matchesSearch && matchesFilter;
  });

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
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">Mentors & Alumni</h2>
        <p className="text-sm text-gray-500 mt-1">Learn from industry experts</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search mentors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 py-3 rounded-xl border-gray-200 bg-white"
        />
      </div>

      {/* Company Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {companyFilters.map((filter) => (
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

      {/* Mentor Cards */}
      <div className="space-y-4">
        {filteredMentors.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex gap-4">
              {/* Avatar */}
              <Avatar className="w-16 h-16 border-2 border-[#2E7D32]/20">
                <AvatarImage src={mentor.photo_url || undefined} />
                <AvatarFallback className="bg-[#E8F5E9] text-[#2E7D32] font-semibold text-lg">
                  {mentor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
                    {mentor.designation && (
                      <p className="text-sm text-[#2E7D32] font-medium">{mentor.designation}</p>
                    )}
                  </div>
                  {mentor.rating && (
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-medium">{mentor.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1 mt-2 text-sm text-gray-500">
                  {mentor.company && (
                    <span className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      {mentor.company}
                    </span>
                  )}
                  {mentor.college && (
                    <span className="flex items-center gap-1">
                      <GraduationCap className="w-4 h-4" />
                      {mentor.college} Alumni
                    </span>
                  )}
                </div>

                {/* Expertise */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {mentor.expertise.slice(0, 3).map((skill, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-[#E8F5E9] text-[#2E7D32] text-xs px-2 py-0.5"
                    >
                      {skill}
                    </Badge>
                  ))}
                  {mentor.expertise.length > 3 && (
                    <Badge variant="outline" className="text-xs px-2 py-0.5">
                      +{mentor.expertise.length - 3}
                    </Badge>
                  )}
                </div>

                {/* LinkedIn Button */}
                {mentor.linkedin_url && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 text-[#0077B5] border-[#0077B5] hover:bg-[#0077B5]/10"
                    onClick={() => window.open(mentor.linkedin_url!, '_blank')}
                  >
                    <Linkedin className="w-4 h-4 mr-1" />
                    Connect
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMentors.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <UserCheck className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No mentors found</p>
        </div>
      )}
    </div>
  );
}
