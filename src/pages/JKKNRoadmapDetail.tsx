import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Clock, Users, CheckCircle, BookOpen, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';

export default function JKKNRoadmapDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: roadmap, isLoading: loadingRoadmap } = useQuery({
    queryKey: ['jkkn-roadmap', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('roadmaps')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: steps, isLoading: loadingSteps } = useQuery({
    queryKey: ['jkkn-roadmap-steps', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('roadmap_steps')
        .select('*')
        .eq('roadmap_id', id)
        .order('step_number', { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  if (loadingRoadmap || loadingSteps) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] p-4">
        <Skeleton className="h-8 w-32 mb-4" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1E293B] mb-2">Roadmap Not Found</h1>
          <Link to="/jkkn?tab=roadmaps">
            <Button variant="outline">Back to Roadmaps</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="bg-[#2E7D32] text-white sticky top-0 z-50">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link to="/jkkn?tab=roadmaps">
            <button className="p-2 hover:bg-white/10 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <h1 className="text-lg font-semibold">Roadmap</h1>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Title Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <Badge className="bg-[#E8F5E9] text-[#2E7D32] mb-3">{roadmap.category}</Badge>
          <h2 className="text-2xl font-bold text-[#1E293B] mb-2">{roadmap.title}</h2>
          {roadmap.description && (
            <p className="text-[#64748B] text-sm mb-4">{roadmap.description}</p>
          )}
          <div className="flex flex-wrap gap-4">
            {roadmap.duration_months && (
              <div className="flex items-center gap-2 text-sm text-[#64748B]">
                <Clock className="w-4 h-4" />
                <span>{roadmap.duration_months} months</span>
              </div>
            )}
            {roadmap.steps_count && (
              <div className="flex items-center gap-2 text-sm text-[#64748B]">
                <CheckCircle className="w-4 h-4" />
                <span>{roadmap.steps_count} steps</span>
              </div>
            )}
            {roadmap.followers_count && (
              <div className="flex items-center gap-2 text-sm text-[#64748B]">
                <Users className="w-4 h-4" />
                <span>{roadmap.followers_count.toLocaleString()} followers</span>
              </div>
            )}
          </div>
        </div>

        {/* Steps Timeline */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-[#1E293B] mb-6">Learning Path</h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#E8F5E9]" />
            
            <div className="space-y-6">
              {steps?.map((step, index) => {
                const resources = (step.resources as any[]) || [];
                return (
                  <div key={step.id} className="relative pl-12">
                    {/* Step number circle */}
                    <div className="absolute left-0 w-8 h-8 rounded-full bg-[#2E7D32] text-white flex items-center justify-center text-sm font-bold">
                      {step.step_number}
                    </div>
                    
                    <div className="bg-[#F5F5F5] rounded-xl p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-[#1E293B]">{step.title}</h4>
                        {step.duration_weeks && (
                          <Badge variant="outline" className="text-xs">
                            {step.duration_weeks} weeks
                          </Badge>
                        )}
                      </div>
                      
                      {step.description && (
                        <p className="text-sm text-[#64748B] mb-3">{step.description}</p>
                      )}
                      
                      {resources.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-[#2E7D32] flex items-center gap-1">
                            <BookOpen className="w-3 h-3" /> Resources
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {resources.map((resource, i) => (
                              <a 
                                key={i} 
                                href={resource.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-[#2E7D32] hover:underline"
                              >
                                <ExternalLink className="w-3 h-3" />
                                {resource.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
