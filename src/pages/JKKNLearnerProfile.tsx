import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Mail, Phone, GraduationCap, Calendar, Linkedin, Github, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

export default function JKKNLearnerProfile() {
  const { id } = useParams<{ id: string }>();

  const { data: learner, isLoading } = useQuery({
    queryKey: ['jkkn-learner', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('learners')
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

  if (!learner) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1E293B] mb-2">Learner Not Found</h1>
          <Link to="/jkkn?tab=learners">
            <Button variant="outline">Back to Learners</Button>
          </Link>
        </div>
      </div>
    );
  }

  const skills = (learner.skills as string[]) || [];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="bg-[#2E7D32] text-white sticky top-0 z-50">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link to="/jkkn?tab=learners">
            <button className="p-2 hover:bg-white/10 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <h1 className="text-lg font-semibold">Learner Profile</h1>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
          {learner.photo_url ? (
            <img 
              src={learner.photo_url} 
              alt={learner.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-[#E8F5E9]"
            />
          ) : (
            <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-[#E8F5E9] flex items-center justify-center">
              <User className="w-12 h-12 text-[#2E7D32]" />
            </div>
          )}
          
          <h2 className="text-2xl font-bold text-[#1E293B]">{learner.name}</h2>
          <Badge className="bg-[#2E7D32] text-white mt-2">
            Learner #{learner.learner_number}
          </Badge>
          
          {learner.registered_at && (
            <p className="text-sm text-[#64748B] mt-3 flex items-center justify-center gap-1">
              <Calendar className="w-4 h-4" />
              Registered {format(new Date(learner.registered_at), 'MMM d, yyyy')}
            </p>
          )}
        </div>

        {/* Academic Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-[#1E293B] mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#2E7D32]" />
            Academic Information
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[#64748B]">College</span>
              <span className="text-[#1E293B] font-medium text-right max-w-[60%]">{learner.college}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Course</span>
              <span className="text-[#1E293B] font-medium">{learner.course}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Branch</span>
              <span className="text-[#1E293B] font-medium">{learner.branch}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Year of Study</span>
              <span className="text-[#1E293B] font-medium">{learner.year_of_study} Year</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Graduation Year</span>
              <span className="text-[#1E293B] font-medium">{learner.graduation_year}</span>
            </div>
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-[#1E293B] mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <Badge key={i} className="bg-[#E8F5E9] text-[#2E7D32]">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Career Interest */}
        {learner.career_interest && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-[#1E293B] mb-3">Career Interest</h3>
            <p className="text-[#64748B] text-sm">{learner.career_interest}</p>
          </div>
        )}

        {/* Contact Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-[#1E293B] mb-4">Contact Information</h3>
          
          <div className="space-y-3">
            <a href={`mailto:${learner.email}`} className="flex items-center gap-3 text-[#64748B] hover:text-[#2E7D32]">
              <Mail className="w-5 h-5" />
              <span className="text-sm">{learner.email}</span>
            </a>
            <a href={`tel:${learner.phone}`} className="flex items-center gap-3 text-[#64748B] hover:text-[#2E7D32]">
              <Phone className="w-5 h-5" />
              <span className="text-sm">{learner.phone}</span>
            </a>
          </div>
        </div>

        {/* Social Links */}
        {(learner.linkedin_url || learner.github_url) && (
          <div className="flex gap-3">
            {learner.linkedin_url && (
              <a href={learner.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="outline" className="w-full gap-2">
                  <Linkedin className="w-5 h-5 text-[#0077b5]" />
                  LinkedIn
                </Button>
              </a>
            )}
            {learner.github_url && (
              <a href={learner.github_url} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="outline" className="w-full gap-2">
                  <Github className="w-5 h-5" />
                  GitHub
                </Button>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
