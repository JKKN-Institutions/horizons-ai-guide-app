import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, MapPin, Banknote, Clock, Building2, Calendar, ExternalLink, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';

export default function JKKNJobDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: job, isLoading } = useQuery({
    queryKey: ['jkkn-job', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jkkn_jobs')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] p-4">
        <Skeleton className="h-8 w-32 mb-4" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1E293B] mb-2">Job Not Found</h1>
          <Link to="/jkkn?tab=jobs">
            <Button variant="outline">Back to Jobs</Button>
          </Link>
        </div>
      </div>
    );
  }

  const skills = (job.skills_required as string[]) || [];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="bg-[#2E7D32] text-white sticky top-0 z-50">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link to="/jkkn?tab=jobs">
            <button className="p-2 hover:bg-white/10 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <h1 className="text-lg font-semibold">Job Details</h1>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Company Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            {job.company_logo_url ? (
              <img src={job.company_logo_url} alt={job.company_name} className="w-16 h-16 rounded-xl object-cover" />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-[#E8F5E9] flex items-center justify-center">
                <Building2 className="w-8 h-8 text-[#2E7D32]" />
              </div>
            )}
            <div className="flex-1">
              <h2 className="text-xl font-bold text-[#1E293B]">{job.title}</h2>
              <p className="text-[#2E7D32] font-medium">{job.company_name}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge className="bg-[#E8F5E9] text-[#2E7D32]">{job.type}</Badge>
                {job.work_mode && <Badge variant="outline">{job.work_mode}</Badge>}
                {job.is_featured && <Badge className="bg-[#FFD54F] text-[#1E293B]">Featured</Badge>}
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-semibold text-[#1E293B]">Job Details</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {job.location && (
              <div className="flex items-center gap-2 text-[#64748B]">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{job.location}</span>
              </div>
            )}
            {(job.salary_min || job.salary_max) && (
              <div className="flex items-center gap-2 text-[#64748B]">
                <Banknote className="w-4 h-4" />
                <span className="text-sm">
                  ₹{job.salary_min?.toLocaleString()} - ₹{job.salary_max?.toLocaleString()}
                </span>
              </div>
            )}
            {job.duration && (
              <div className="flex items-center gap-2 text-[#64748B]">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{job.duration}</span>
              </div>
            )}
            {job.application_deadline && (
              <div className="flex items-center gap-2 text-[#64748B]">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Deadline: {new Date(job.application_deadline).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {job.description && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-[#1E293B] mb-3">Description</h3>
            <p className="text-[#64748B] text-sm whitespace-pre-line">{job.description}</p>
          </div>
        )}

        {/* Eligibility */}
        {job.eligibility && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-[#1E293B] mb-3">Eligibility</h3>
            <p className="text-[#64748B] text-sm">{job.eligibility}</p>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-[#1E293B] mb-3">Skills Required</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <Badge key={i} variant="secondary" className="bg-[#E8F5E9] text-[#2E7D32]">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Apply Button */}
        {job.apply_link && (
          <a href={job.apply_link} target="_blank" rel="noopener noreferrer" className="block">
            <Button className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white py-6 text-lg rounded-xl">
              <ExternalLink className="w-5 h-5 mr-2" />
              Apply on Company Site
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}
