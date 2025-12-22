import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Bookmark, MapPin, DollarSign, Briefcase, Trash2, Loader2, Calendar, FileText, CheckCircle, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type JobStatus = "saved" | "applied" | "interview" | "offer" | "rejected";

interface SavedJob {
  id: string;
  job_title: string;
  job_company: string;
  job_location: string;
  job_salary: string;
  job_requirement: string;
  job_sector: string;
  saved_at: string;
  status: JobStatus;
  applied_date: string | null;
  interview_date: string | null;
  notes: string | null;
}

const statusConfig: Record<JobStatus, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  saved: { label: "Saved", icon: Bookmark, color: "text-muted-foreground", bg: "bg-muted" },
  applied: { label: "Applied", icon: FileText, color: "text-blue-600", bg: "bg-blue-100" },
  interview: { label: "Interview", icon: Calendar, color: "text-amber-600", bg: "bg-amber-100" },
  offer: { label: "Offer", icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
  rejected: { label: "Rejected", icon: XCircle, color: "text-red-600", bg: "bg-red-100" },
};

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [editingJob, setEditingJob] = useState<SavedJob | null>(null);
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
      setSavedJobs((data || []) as SavedJob[]);
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

  const updateJobStatus = async (jobId: string, status: JobStatus) => {
    if (!userId) return;
    
    setUpdatingId(jobId);
    try {
      const updateData: Partial<SavedJob> = { status };
      if (status === "applied" && !savedJobs.find(j => j.id === jobId)?.applied_date) {
        updateData.applied_date = new Date().toISOString();
      }

      const { error } = await supabase
        .from("saved_jobs")
        .update(updateData)
        .eq("id", jobId)
        .eq("user_id", userId);

      if (error) throw error;

      setSavedJobs(prev => prev.map(job => 
        job.id === jobId ? { ...job, ...updateData } : job
      ));
      
      toast({
        title: "Status updated",
        description: `Job marked as ${statusConfig[status].label}`,
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const updateJobDetails = async (jobId: string, updates: { interview_date?: string; notes?: string }) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from("saved_jobs")
        .update(updates)
        .eq("id", jobId)
        .eq("user_id", userId);

      if (error) throw error;

      setSavedJobs(prev => prev.map(job => 
        job.id === jobId ? { ...job, ...updates } : job
      ));
      
      toast({
        title: "Details updated",
        description: "Job details have been saved",
      });
      setEditingJob(null);
    } catch (error) {
      console.error("Error updating details:", error);
      toast({
        title: "Error",
        description: "Failed to update details",
        variant: "destructive",
      });
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
        description: "Job has been removed from your list",
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

  const filteredJobs = filterStatus === "all" 
    ? savedJobs 
    : savedJobs.filter(job => job.status === filterStatus);

  const statusCounts = savedJobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

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
            <h1 className="text-3xl font-bold">Job Application Tracker</h1>
          </div>
          <p className="text-primary-foreground/80 mt-2">
            Track your job applications from saved to offer
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      {savedJobs.length > 0 && (
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap gap-3">
              {(Object.keys(statusConfig) as JobStatus[]).map(status => {
                const config = statusConfig[status];
                const count = statusCounts[status] || 0;
                return (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(filterStatus === status ? "all" : status)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      filterStatus === status 
                        ? `${config.bg} ${config.color} ring-2 ring-offset-2 ring-current` 
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    <config.icon className="w-4 h-4" />
                    {config.label}
                    <span className="bg-background/50 px-2 py-0.5 rounded-full text-xs">{count}</span>
                  </button>
                );
              })}
              {filterStatus !== "all" && (
                <button
                  onClick={() => setFilterStatus("all")}
                  className="text-sm text-muted-foreground hover:text-foreground underline"
                >
                  Clear filter
                </button>
              )}
            </div>
          </div>
        </div>
      )}

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
              Showing {filteredJobs.length} of {savedJobs.length} job{savedJobs.length !== 1 ? "s" : ""}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => {
                const config = statusConfig[job.status];
                return (
                  <div
                    key={job.id}
                    className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border"
                  >
                    {/* Status Badge */}
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color} mb-4`}>
                      <config.icon className="w-3.5 h-3.5" />
                      {config.label}
                    </div>

                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-foreground mb-1">{job.job_title}</h3>
                        <p className="text-primary font-medium">{job.job_company}</p>
                      </div>
                      <button
                        onClick={() => removeJob(job.id)}
                        disabled={removingId === job.id}
                        className="w-8 h-8 rounded-full bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center transition-all duration-300"
                        title="Remove from list"
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
                      {job.applied_date && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span>Applied: {new Date(job.applied_date).toLocaleDateString()}</span>
                        </div>
                      )}
                      {job.interview_date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-amber-500" />
                          <span>Interview: {new Date(job.interview_date).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>

                    {job.notes && (
                      <p className="text-xs text-muted-foreground bg-muted p-2 rounded-lg mb-4 line-clamp-2">
                        {job.notes}
                      </p>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-4 border-t border-border">
                      <Select
                        value={job.status}
                        onValueChange={(value) => updateJobStatus(job.id, value as JobStatus)}
                        disabled={updatingId === job.id}
                      >
                        <SelectTrigger className="flex-1 h-9 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {(Object.keys(statusConfig) as JobStatus[]).map(status => (
                            <SelectItem key={status} value={status}>
                              {statusConfig[status].label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setEditingJob(job)}
                          >
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Job Details</DialogTitle>
                          </DialogHeader>
                          <EditJobForm 
                            job={job} 
                            onSave={(updates) => updateJobDetails(job.id, updates)} 
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const EditJobForm = ({ 
  job, 
  onSave 
}: { 
  job: SavedJob; 
  onSave: (updates: { interview_date?: string; notes?: string }) => void;
}) => {
  const [interviewDate, setInterviewDate] = useState(job.interview_date?.split("T")[0] || "");
  const [notes, setNotes] = useState(job.notes || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      interview_date: interviewDate ? new Date(interviewDate).toISOString() : undefined,
      notes: notes || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="interview-date">Interview Date</Label>
        <Input
          id="interview-date"
          type="date"
          value={interviewDate}
          onChange={(e) => setInterviewDate(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          placeholder="Add notes about this application..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
        />
      </div>
      <Button type="submit" className="w-full">
        Save Changes
      </Button>
    </form>
  );
};

export default SavedJobs;
