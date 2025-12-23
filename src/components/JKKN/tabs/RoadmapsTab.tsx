import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Map, Users, Clock, ChevronRight, Code, Database, Cloud, Smartphone, Palette } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface Roadmap {
  id: string;
  title: string;
  description: string | null;
  category: string;
  duration_months: number | null;
  steps_count: number | null;
  followers_count: number | null;
}

const roadmapIcons: Record<string, React.ReactNode> = {
  'Software Developer': <Code className="w-6 h-6" />,
  'Data Scientist': <Database className="w-6 h-6" />,
  'Cloud Engineer': <Cloud className="w-6 h-6" />,
  'Mobile Developer': <Smartphone className="w-6 h-6" />,
  'UI/UX Designer': <Palette className="w-6 h-6" />,
};

export function RoadmapsTab() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    try {
      const { data, error } = await supabase
        .from('roadmaps')
        .select('*')
        .order('followers_count', { ascending: false });

      if (error) throw error;
      setRoadmaps(data || []);
    } catch (error) {
      console.error('Error fetching roadmaps:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex gap-4">
              <Skeleton className="w-14 h-14 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-32" />
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
        <h2 className="text-xl font-bold text-gray-900">Career Roadmaps</h2>
        <p className="text-sm text-gray-500 mt-1">Step-by-step guides to your dream career</p>
      </div>

      {/* Roadmap Cards */}
      <div className="space-y-4">
        {roadmaps.map((roadmap) => (
          <div
            key={roadmap.id}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex gap-4">
              {/* Icon */}
              <div className="w-14 h-14 bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] rounded-xl flex items-center justify-center text-[#2E7D32] flex-shrink-0">
                {roadmapIcons[roadmap.title] || <Map className="w-6 h-6" />}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">{roadmap.title}</h3>
                
                {roadmap.description && (
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{roadmap.description}</p>
                )}

                <div className="flex flex-wrap gap-3 mt-3">
                  {roadmap.steps_count && (
                    <Badge variant="secondary" className="bg-[#E8F5E9] text-[#2E7D32]">
                      {roadmap.steps_count} Steps
                    </Badge>
                  )}
                  {roadmap.duration_months && (
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {roadmap.duration_months} months
                    </span>
                  )}
                  {roadmap.followers_count && (
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Users className="w-3 h-3" />
                      {roadmap.followers_count.toLocaleString()} followers
                    </span>
                  )}
                </div>

                <Link to={`/jkkn/roadmap/${roadmap.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 text-[#2E7D32] border-[#2E7D32] hover:bg-[#E8F5E9]"
                  >
                    View Roadmap
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {roadmaps.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Map className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No roadmaps found</p>
        </div>
      )}
    </div>
  );
}
