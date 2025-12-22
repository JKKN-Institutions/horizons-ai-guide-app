import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Bookmark, MapPin, DollarSign, Briefcase, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SavedJob {
  id: string;
  job_title: string;
  job_company: string;
  job_location: string;
  job_salary: string;
  job_requirement: string;
  job_sector: string;
  saved_at: string;
}

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
        loadSavedJobs(session.user.id);
      } else {
        setUserId(null);
        setLoading(false);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserId(session.user.id);
        loadSavedJobs(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadSavedJobs = async (uid: string) => {
    try {
      const { data, error } = await supabase
        .from("saved_jobs")
        .select("*")
        .eq("user_id", uid)
        .order("saved_at", { ascending: false });

      if (error) throw error;
      setSavedJobs(data || []);
    } catch (error) {
      console.error("Error loading saved jobs:", error);
      toast({
        title: "Error",
        description: "Failed to load saved jobs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeJob = async (jobId: string) => {
    if (!userId) return;
    
    setRemovingId(jobId);
    try {
      const { error } = await supabase
        .from("saved_jobs")
        .delete()
        .eq("id", jobId)
        .eq("user_id", userId);

      if (error) throw error;

      setSavedJobs(prev => prev.filter(job => job.id !== jobId));
      toast({
        title: "Job removed",
        description: "Job has been removed from your saved list",
      });
    } catch (error) {
      console.error("Error removing job:", error);
      toast({
        title: "Error",
        description: "Failed to remove job",
        variant: "destructive",
      });
    } finally {
      setRemovingId(null);
    }
  };

  if (!userId && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <Bookmark className="w-16 h-16 text-muted-foreground mx-auto" />
          <h2 className="text-2xl font-bold text-foreground">Sign in to view saved jobs</h2>
          <p className="text-muted-foreground">You need to be logged in to save and view jobs</p>
          <Button onClick={() => navigate("/auth?redirect=/saved-jobs")}>
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <Bookmark className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Saved Jobs</h1>
          </div>
          <p className="text-primary-foreground/80 mt-2">
            Your bookmarked job opportunities
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : savedJobs.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <Bookmark className="w-16 h-16 text-muted-foreground mx-auto" />
            <h2 className="text-2xl font-semibold text-foreground">No saved jobs yet</h2>
            <p className="text-muted-foreground">
              Start bookmarking jobs you're interested in from the Jobs section
            </p>
            <Button onClick={() => navigate("/#jobs")}>
              Browse Jobs
            </Button>
          </div>
        ) : (
          <>
            <p className="text-muted-foreground mb-6">
              {savedJobs.length} saved job{savedJobs.length !== 1 ? "s" : ""}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-foreground mb-1">{job.job_title}</h3>
                      <p className="text-primary font-medium">{job.job_company}</p>
                    </div>
                    <button
                      onClick={() => removeJob(job.id)}
                      disabled={removingId === job.id}
                      className="w-8 h-8 rounded-full bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center transition-all duration-300"
                      title="Remove from saved"
                    >
                      {removingId === job.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{job.job_location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-accent" />
                      <span>{job.job_salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-secondary-foreground" />
                      <span>{job.job_requirement}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {job.job_sector}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Saved {new Date(job.saved_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
