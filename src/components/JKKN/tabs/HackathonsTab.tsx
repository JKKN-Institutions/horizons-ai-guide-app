import { useState, useEffect } from 'react';
import { Trophy, Calendar, MapPin, Users, IndianRupee, ExternalLink, Flame, Bookmark, BookmarkCheck, Code, Laptop, Zap, Globe } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

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

const typeConfig: Record<string, { gradient: string; icon: any }> = {
  'Hackathon': { gradient: 'from-purple-500 to-pink-600', icon: Code },
  'Coding Contest': { gradient: 'from-blue-500 to-indigo-600', icon: Laptop },
  'Innovation Challenge': { gradient: 'from-orange-500 to-red-600', icon: Zap },
  'Default': { gradient: 'from-amber-500 to-yellow-600', icon: Trophy },
};

const statusFilters = [
  { name: 'Upcoming', icon: Calendar, gradient: 'from-emerald-500 to-teal-600' },
  { name: 'Ongoing', icon: Zap, gradient: 'from-orange-500 to-red-600' },
  { name: 'Past', icon: Trophy, gradient: 'from-gray-500 to-slate-600' },
];

export function HackathonsTab() {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Upcoming');
  const [savedHackathons, setSavedHackathons] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchHackathons();
    const saved = localStorage.getItem('saved_hackathons');
    if (saved) {
      setSavedHackathons(new Set(JSON.parse(saved)));
    }
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

  const toggleSave = (id: string, title: string) => {
    setSavedHackathons(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
        toast.success('Removed from saved');
      } else {
        newSet.add(id);
        toast.success(`"${title}" saved!`);
      }
      localStorage.setItem('saved_hackathons', JSON.stringify([...newSet]));
      return newSet;
    });
  };

  const getEventStatus = (startDate: string | null, endDate: string | null) => {
    const now = new Date();
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && start > now) return 'Upcoming';
    if (start && end && start <= now && end >= now) return 'Ongoing';
    return 'Past';
  };

  const getTypeConfig = (type: string) => {
    return typeConfig[type] || typeConfig['Default'];
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
      <div className="p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <Skeleton className="h-32 w-full rounded-2xl" />
        <div className="flex gap-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="w-24 h-10 rounded-full flex-shrink-0" />
          ))}
        </div>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-64 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-5 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Colorful Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-5 text-white shadow-lg">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-6 h-6" />
            <span className="text-sm font-medium text-white/80">Competitions</span>
          </div>
          <h2 className="text-2xl font-bold">Hackathons & Events</h2>
          <p className="text-sm text-white/80 mt-1">Build, compete, and win amazing prizes</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-3 text-white text-center shadow-md">
          <p className="text-2xl font-bold">{hackathons.length}</p>
          <p className="text-xs text-purple-100">Total Events</p>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-3 text-white text-center shadow-md">
          <p className="text-2xl font-bold">{hackathons.filter(h => getEventStatus(h.start_date, h.end_date) === 'Upcoming').length}</p>
          <p className="text-xs text-pink-100">Upcoming</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-3 text-white text-center shadow-md">
          <p className="text-2xl font-bold">{savedHackathons.size}</p>
          <p className="text-xs text-orange-100">Saved</p>
        </div>
      </div>

      {/* Colorful Status Filters */}
      <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {statusFilters.map((filter) => {
          const IconComponent = filter.icon;
          const isActive = activeFilter === filter.name;
          return (
            <button
              key={filter.name}
              onClick={() => setActiveFilter(filter.name)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all shadow-sm ${
                isActive
                  ? `bg-gradient-to-r ${filter.gradient} text-white shadow-md scale-105`
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              {filter.name}
            </button>
          );
        })}
      </div>

      {/* Hackathon Cards */}
      <div className="space-y-4">
        {filteredHackathons.map((hackathon) => {
          const config = getTypeConfig(hackathon.type);
          const IconComponent = config.icon;
          const isSaved = savedHackathons.has(hackathon.id);
          
          return (
            <div
              key={hackathon.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              {/* Colorful Top Banner */}
              <div className={`h-2 bg-gradient-to-r ${config.gradient}`} />
              
              {/* Banner */}
              <div className={`relative h-40 bg-gradient-to-br ${config.gradient}`}>
                {hackathon.banner_url ? (
                  <img
                    src={hackathon.banner_url}
                    alt={hackathon.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <IconComponent className="w-16 h-16 text-white/30" />
                  </div>
                )}
                {hackathon.is_featured && (
                  <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-400 to-red-500 text-white border-0 shadow-md">
                    <Flame className="w-3 h-3 mr-1" />
                    Hot
                  </Badge>
                )}
                <Badge className={`absolute top-3 right-12 bg-white/90 text-gray-700 shadow-md`}>
                  <Globe className="w-3 h-3 mr-1" />
                  {hackathon.mode || 'Online'}
                </Badge>
                <button
                  onClick={() => toggleSave(hackathon.id, hackathon.title)}
                  className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full transition-colors shadow-md"
                >
                  {isSaved ? (
                    <BookmarkCheck className="w-5 h-5 text-purple-600" />
                  ) : (
                    <Bookmark className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-lg">{hackathon.title}</h3>
                    {hackathon.organizer && (
                      <p className={`text-sm font-semibold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
                        {hackathon.organizer}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-gray-500">
                  <span className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    {formatDateRange(hackathon.start_date, hackathon.end_date)}
                  </span>
                  {hackathon.prize_pool && (
                    <span className="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 px-3 py-2 rounded-lg font-semibold">
                      <IndianRupee className="w-4 h-4" />
                      {hackathon.prize_pool}
                    </span>
                  )}
                  {hackathon.team_size && (
                    <span className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                      <Users className="w-4 h-4 text-blue-500" />
                      {hackathon.team_size}
                    </span>
                  )}
                  {hackathon.venue && (
                    <span className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                      <MapPin className="w-4 h-4 text-red-500" />
                      {hackathon.venue}
                    </span>
                  )}
                </div>

                {hackathon.registration_deadline && (
                  <p className="text-xs text-orange-600 mt-3 font-medium bg-orange-50 px-3 py-2 rounded-lg inline-block">
                    ⏰ Register by: {new Date(hackathon.registration_deadline).toLocaleDateString()}
                  </p>
                )}

                <Button
                  className={`w-full mt-4 bg-gradient-to-r ${config.gradient} hover:opacity-90 text-white shadow-md`}
                  onClick={() => hackathon.register_link && window.open(hackathon.register_link, '_blank')}
                >
                  Register Now
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredHackathons.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <Trophy className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-500 font-medium">No {activeFilter.toLowerCase()} hackathons found</p>
          <p className="text-gray-400 text-sm mt-1">Check back soon for more events</p>
        </div>
      )}
    </div>
  );
}
