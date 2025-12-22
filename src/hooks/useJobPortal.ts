import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Job, Category, JobFilters, SavedJob } from '@/types/jobPortal';
import { useToast } from '@/hooks/use-toast';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_order');
      
      if (error) throw error;
      return data as Category[];
    },
  });
};

export const useJobs = (filters: JobFilters = {}, page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ['jobs', filters, page, limit],
    queryFn: async () => {
      let query = supabase
        .from('jobs')
        .select('*, categories(name, icon)', { count: 'exact' })
        .eq('status', 'active')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (filters.category) {
        query = query.eq('category_id', filters.category);
      }
      if (filters.city) {
        query = query.ilike('city', `%${filters.city}%`);
      }
      if (filters.state) {
        query = query.eq('state', filters.state);
      }
      if (filters.salaryMin) {
        query = query.gte('salary_min', filters.salaryMin);
      }
      if (filters.salaryMax) {
        query = query.lte('salary_max', filters.salaryMax);
      }
      if (filters.experienceMin !== undefined) {
        query = query.lte('experience_min', filters.experienceMin);
      }
      if (filters.jobType) {
        query = query.eq('job_type', filters.jobType);
      }
      if (filters.isWalkin) {
        query = query.eq('is_walkin', true);
      }
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,company_name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;
      
      if (error) throw error;
      return { jobs: data as Job[], total: count || 0 };
    },
  });
};

export const useJob = (id: string) => {
  return useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*, categories(name, icon)')
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      return data as Job | null;
    },
    enabled: !!id,
  });
};

export const useSavedJobs = (userId: string | null) => {
  return useQuery({
    queryKey: ['savedJobs', userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from('portal_saved_jobs')
        .select('*, jobs(*)')
        .eq('user_id', userId)
        .order('saved_at', { ascending: false });
      
      if (error) throw error;
      return data as SavedJob[];
    },
    enabled: !!userId,
  });
};

export const useSaveJob = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ userId, jobId }: { userId: string; jobId: string }) => {
      const { error } = await supabase
        .from('portal_saved_jobs')
        .insert({ user_id: userId, job_id: jobId });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedJobs'] });
      toast({ title: 'Job saved!', description: 'Added to your saved jobs.' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to save job.', variant: 'destructive' });
    },
  });
};

export const useUnsaveJob = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ userId, jobId }: { userId: string; jobId: string }) => {
      const { error } = await supabase
        .from('portal_saved_jobs')
        .delete()
        .eq('user_id', userId)
        .eq('job_id', jobId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedJobs'] });
      toast({ title: 'Job removed', description: 'Removed from saved jobs.' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to remove job.', variant: 'destructive' });
    },
  });
};

export const useLogContact = () => {
  return useMutation({
    mutationFn: async ({ userId, jobId, contactType }: { userId?: string; jobId: string; contactType: string }) => {
      const { error } = await supabase
        .from('contact_logs')
        .insert({ user_id: userId || null, job_id: jobId, contact_type: contactType });
      
      if (error) throw error;
    },
  });
};

export const useIncrementViewCount = () => {
  return useMutation({
    mutationFn: async (jobId: string) => {
      // Use RPC or direct update - for simplicity, we'll skip this for now
      // as it requires service role
    },
  });
};
