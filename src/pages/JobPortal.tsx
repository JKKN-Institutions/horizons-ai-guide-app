import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, RefreshCw, ArrowLeft } from 'lucide-react';
import { JobCard, CategoryFilter, JobFiltersSheet, JobDetailsSheet, BottomNav } from '@/components/JobPortal';
import { useCategories, useJobs, useSaveJob, useUnsaveJob, useSavedJobs, useLogContact } from '@/hooks/useJobPortal';
import { Job, JobFilters } from '@/types/jobPortal';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/hooks/useLanguage';

const JobPortal = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [userId, setUserId] = useState<string | null>(null);
  const [filters, setFilters] = useState<JobFilters>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUserId(session?.user?.id ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const { data: categories = [], isLoading: loadingCategories } = useCategories();
  const { data: jobsData, isLoading: loadingJobs, refetch } = useJobs({ ...filters, search: searchQuery }, page, 20);
  const { data: savedJobs = [] } = useSavedJobs(userId);
  const saveJob = useSaveJob();
  const unsaveJob = useUnsaveJob();
  const logContact = useLogContact();

  const savedJobIds = new Set(savedJobs.map(s => s.job_id));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const handleCategorySelect = (categoryId: string | null) => {
    setFilters({ ...filters, category: categoryId || undefined });
    setPage(1);
  };

  const handleSave = (jobId: string) => {
    if (!userId) return;
    saveJob.mutate({ userId, jobId });
  };

  const handleUnsave = (jobId: string) => {
    if (!userId) return;
    unsaveJob.mutate({ userId, jobId });
  };

  const handleContact = (jobId: string, type: 'call' | 'whatsapp') => {
    logContact.mutate({ userId: userId || undefined, jobId, contactType: type });
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 page-transition">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="h-10 w-10 rounded-full hover:bg-white/20 text-primary-foreground"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">{t('jobportal.findDreamJob')}</h1>
          </div>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('jobportal.searchPlaceholder')}
                className="pl-10 bg-background text-foreground"
              />
            </div>
            <JobFiltersSheet 
              filters={filters} 
              onApply={(f) => { setFilters(f); setPage(1); }}
              onClear={() => { setFilters({}); setPage(1); }}
            />
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        {/* Categories */}
        {loadingCategories ? (
          <div className="flex gap-2 mb-4">
            {[1,2,3,4].map(i => <Skeleton key={i} className="h-10 w-24 rounded-full" />)}
          </div>
        ) : (
          <CategoryFilter 
            categories={categories} 
            selected={filters.category || null} 
            onSelect={handleCategorySelect}
          />
        )}

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {jobsData?.total || 0} {t('jobportal.jobsFound')}
          </p>
          <Button variant="ghost" size="sm" onClick={() => refetch()}>
            <RefreshCw className="w-4 h-4 mr-1" />
            {t('jobportal.refresh')}
          </Button>
        </div>

        {/* Job List */}
        {loadingJobs ? (
          <div className="space-y-4">
            {[1,2,3].map(i => <Skeleton key={i} className="h-48 rounded-xl" />)}
          </div>
        ) : (
          <div className="space-y-4">
            {jobsData?.jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={savedJobIds.has(job.id)}
                onSave={() => handleSave(job.id)}
                onUnsave={() => handleUnsave(job.id)}
                onCall={() => handleContact(job.id, 'call')}
                onWhatsApp={() => handleContact(job.id, 'whatsapp')}
                onClick={() => setSelectedJob(job)}
              />
            ))}
            {jobsData?.jobs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t('jobportal.noJobsFound')}</p>
                <Button variant="link" onClick={() => { setFilters({}); setSearchQuery(''); }}>
                  {t('jobportal.clearFilters')}
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Load More */}
        {jobsData && jobsData.jobs.length < jobsData.total && (
          <Button 
            variant="outline" 
            className="w-full mt-6"
            onClick={() => setPage(p => p + 1)}
          >
            {t('jobportal.loadMore')}
          </Button>
        )}
      </div>

      {/* Job Details Sheet */}
      <JobDetailsSheet
        job={selectedJob}
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        isSaved={selectedJob ? savedJobIds.has(selectedJob.id) : false}
        onSave={() => selectedJob && handleSave(selectedJob.id)}
        onUnsave={() => selectedJob && handleUnsave(selectedJob.id)}
        onCall={() => selectedJob && handleContact(selectedJob.id, 'call')}
        onWhatsApp={() => selectedJob && handleContact(selectedJob.id, 'whatsapp')}
      />

      <BottomNav />
    </div>
  );
};

export default JobPortal;
