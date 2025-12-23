import { useState, useEffect } from 'react';
import { Trophy, Calendar, MapPin, Users, IndianRupee, ExternalLink, Flame } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface Hackathon {
  id: string;
  title: string;
  description: string | null;
  type: string;
  organizer: string | null;
  banner_url: string | null;
  start_date: string | null;
  end_date: string | null;
  registration_deadline: string | null;
  venue: string | null;
  mode: string | null;
  team_size: string | null;
  prize_pool: string | null;
  register_link: string | null;
  is_featured: boolean | null;
}

const statusFilters = ['Upcoming', 'Ongoing', 'Past'];

export function HackathonsTab() {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Upcoming');

  useEffect(() => {
    fetchHackathons();
  }, []);

  const fetchHackathons = async () => {
    try {
      const { data, error } = await supabase
        .from('competitions')
        .select('*')
        .order('start_date', { ascending: true });

      if (error) throw error;
      setHackathons(data || []);
    } catch (error) {
      console.error('Error fetching hackathons:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getEventStatus = (startDate: string | null, endDate: string | null) => {
    const now = new Date();
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && start > now) return 'Upcoming';
    if (start && end && start <= now && end >= now) return 'Ongoing';
    return 'Past';
  };

  const filteredHackathons = hackathons.filter((hackathon) => {
    return getEventStatus(hackathon.start_date, hackathon.end_date) === activeFilter;
  });

  const formatDateRange = (startDate: string | null, endDate: string | null) => {
    if (!startDate) return 'TBA';
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;

    const startStr = start.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    const endStr = end ? end.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

    return end ? `${startStr} - ${endStr}` : startStr;
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
            <Skeleton className="w-full h-40" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
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
        <h2 className="text-xl font-bold text-gray-900">Hackathons & Competitions</h2>
        <p className="text-sm text-gray-500 mt-1">Build, compete, and win amazing prizes</p>
      </div>

      {/* Status Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {statusFilters.map((filter) => (
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

      {/* Hackathon Cards */}
      <div className="space-y-4">
        {filteredHackathons.map((hackathon) => (
          <div
            key={hackathon.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            {/* Banner */}
            <div className="relative h-40 bg-gradient-to-br from-[#2E7D32] to-[#1B5E20]">
              {hackathon.banner_url ? (
                <img
                  src={hackathon.banner_url}
                  alt={hackathon.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Trophy className="w-16 h-16 text-white/30" />
                </div>
              )}
              {hackathon.is_featured && (
                <Badge className="absolute top-3 left-3 bg-orange-500 text-white">
                  <Flame className="w-3 h-3 mr-1" />
                  Hot
                </Badge>
              )}
              <Badge className="absolute top-3 right-3 bg-white/90 text-gray-700">
                {hackathon.mode || 'Online'}
              </Badge>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 text-lg">{hackathon.title}</h3>
              
              {hackathon.organizer && (
                <p className="text-sm text-[#2E7D32] font-medium">{hackathon.organizer}</p>
              )}

              <div className="grid grid-cols-2 gap-2 mt-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-[#2E7D32]" />
                  {formatDateRange(hackathon.start_date, hackathon.end_date)}
                </span>
                {hackathon.prize_pool && (
                  <span className="flex items-center gap-1">
                    <IndianRupee className="w-4 h-4 text-[#2E7D32]" />
                    {hackathon.prize_pool}
                  </span>
                )}
                {hackathon.team_size && (
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-[#2E7D32]" />
                    {hackathon.team_size}
                  </span>
                )}
                {hackathon.venue && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#2E7D32]" />
                    {hackathon.venue}
                  </span>
                )}
              </div>

              {hackathon.registration_deadline && (
                <p className="text-xs text-orange-600 mt-2">
                  Register by: {new Date(hackathon.registration_deadline).toLocaleDateString()}
                </p>
              )}

              <Button
                className="w-full mt-4 bg-[#2E7D32] hover:bg-[#1B5E20] text-white"
                onClick={() => hackathon.register_link && window.open(hackathon.register_link, '_blank')}
              >
                Register Now
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredHackathons.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Trophy className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No {activeFilter.toLowerCase()} hackathons found</p>
        </div>
      )}
    </div>
  );
}
