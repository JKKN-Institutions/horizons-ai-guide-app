import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Bookmark, MapPin, DollarSign, Briefcase, Trash2, Loader2, Calendar, FileText, CheckCircle, Clock, XCircle, Download, BarChart3, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import jsPDF from "jspdf";
import { CompanyInsightsModal } from "@/components/CompanyInsightsModal";

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

const statusConfig: Record<JobStatus, { label: string; icon: React.ElementType; color: string; bg: string; chartColor: string }> = {
  saved: { label: "Saved", icon: Bookmark, color: "text-muted-foreground", bg: "bg-muted", chartColor: "#6b7280" },
  applied: { label: "Applied", icon: FileText, color: "text-blue-600", bg: "bg-blue-100", chartColor: "#3b82f6" },
  interview: { label: "Interview", icon: Calendar, color: "text-amber-600", bg: "bg-amber-100", chartColor: "#f59e0b" },
  offer: { label: "Offer", icon: CheckCircle, color: "text-green-600", bg: "bg-green-100", chartColor: "#22c55e" },
  rejected: { label: "Rejected", icon: XCircle, color: "text-red-600", bg: "bg-red-100", chartColor: "#ef4444" },
};

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [editingJob, setEditingJob] = useState<SavedJob | null>(null);
  const [showChart, setShowChart] = useState(true);
  const [companyInsightsOpen, setCompanyInsightsOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<string>("");
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

  // Chart data for status distribution
  const pieChartData = useMemo(() => {
    return (Object.keys(statusConfig) as JobStatus[])
      .map(status => ({
        name: statusConfig[status].label,
        value: statusCounts[status] || 0,
        color: statusConfig[status].chartColor,
      }))
      .filter(item => item.value > 0);
  }, [statusCounts]);

  // Chart data for timeline (applications over time)
  const timelineData = useMemo(() => {
    const monthlyData: Record<string, Record<string, number>> = {};
    
    savedJobs.forEach(job => {
      const date = new Date(job.saved_at);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthLabel = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { month: monthLabel, saved: 0, applied: 0, interview: 0, offer: 0, rejected: 0 } as any;
      }
      monthlyData[monthKey][job.status] = (monthlyData[monthKey][job.status] || 0) + 1;
    });

    return Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([_, data]) => data);
  }, [savedJobs]);

  // Export functions
  const exportToCSV = () => {
    const headers = ["Title", "Company", "Location", "Salary", "Requirements", "Sector", "Status", "Saved Date", "Applied Date", "Interview Date", "Notes"];
    const rows = savedJobs.map(job => [
      job.job_title,
      job.job_company,
      job.job_location,
      job.job_salary,
      job.job_requirement,
      job.job_sector,
      statusConfig[job.status].label,
      new Date(job.saved_at).toLocaleDateString(),
      job.applied_date ? new Date(job.applied_date).toLocaleDateString() : "",
      job.interview_date ? new Date(job.interview_date).toLocaleDateString() : "",
      job.notes || "",
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `job-applications-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    toast({ title: "Exported", description: "Job applications exported to CSV" });
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Title
    doc.setFontSize(20);
    doc.setTextColor(33, 37, 41);
    doc.text("Job Application Tracker", pageWidth / 2, 20, { align: "center" });
    
    // Summary
    doc.setFontSize(12);
    doc.setTextColor(108, 117, 125);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, 28, { align: "center" });
    
    // Stats
    doc.setFontSize(14);
    doc.setTextColor(33, 37, 41);
    doc.text("Summary", 14, 45);
    
    doc.setFontSize(10);
    doc.text(`Total Applications: ${savedJobs.length}`, 14, 55);
    doc.text(`Applied: ${statusCounts["applied"] || 0}`, 14, 62);
    doc.text(`Interviews: ${statusCounts["interview"] || 0}`, 14, 69);
    doc.text(`Offers: ${statusCounts["offer"] || 0}`, 14, 76);
    doc.text(`Success Rate: ${savedJobs.length > 0 ? Math.round(((statusCounts["offer"] || 0) / savedJobs.length) * 100) : 0}%`, 14, 83);
    
    // Jobs list
    let yPos = 100;
    doc.setFontSize(14);
    doc.text("Applications", 14, yPos);
    yPos += 10;
    
    savedJobs.forEach((job, index) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFontSize(11);
      doc.setTextColor(33, 37, 41);
      doc.text(`${index + 1}. ${job.job_title} at ${job.job_company}`, 14, yPos);
      
      doc.setFontSize(9);
      doc.setTextColor(108, 117, 125);
      doc.text(`   ${job.job_location} | ${job.job_salary} | Status: ${statusConfig[job.status].label}`, 14, yPos + 5);
      
      yPos += 15;
    });
    
    doc.save(`job-applications-${new Date().toISOString().split('T')[0]}.pdf`);
    toast({ title: "Exported", description: "Job applications exported to PDF" });
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bookmark className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Job Application Tracker</h1>
            </div>
            {savedJobs.length > 0 && (
              <div className="flex items-center gap-2">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={exportToCSV}
                  className="bg-white/10 hover:bg-white/20 text-white border-0"
                >
                  <Download className="w-4 h-4 mr-2" />
                  CSV
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={exportToPDF}
                  className="bg-white/10 hover:bg-white/20 text-white border-0"
                >
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </Button>
              </div>
            )}
          </div>
          <p className="text-primary-foreground/80 mt-2">
            Track your job applications from saved to offer
          </p>
        </div>
      </div>

      {/* Dashboard Summary */}
      {savedJobs.length > 0 && (
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                <p className="text-sm opacity-80">Total Applications</p>
                <p className="text-3xl font-bold">{savedJobs.length}</p>
              </div>
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl p-4 text-white">
                <p className="text-sm opacity-80">Interviews</p>
                <p className="text-3xl font-bold">{statusCounts["interview"] || 0}</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white">
                <p className="text-sm opacity-80">Offers</p>
                <p className="text-3xl font-bold">{statusCounts["offer"] || 0}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl p-4 text-white">
                <p className="text-sm opacity-80">Success Rate</p>
                <p className="text-3xl font-bold">
                  {savedJobs.length > 0 
                    ? Math.round(((statusCounts["offer"] || 0) / savedJobs.length) * 100) 
                    : 0}%
                </p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="mb-6">
              <button 
                onClick={() => setShowChart(!showChart)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
              >
                <BarChart3 className="w-4 h-4" />
                {showChart ? "Hide Charts" : "Show Charts"}
              </button>
              
              {showChart && (
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Status Distribution Pie Chart */}
                  <div className="bg-background rounded-xl p-4 border border-border">
                    <h3 className="text-sm font-medium text-foreground mb-4">Status Distribution</h3>
                    {pieChartData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {pieChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value: number) => [value, 'Jobs']}
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--background))', 
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                        No data to display
                      </div>
                    )}
                    <div className="flex flex-wrap justify-center gap-3 mt-2">
                      {pieChartData.map((entry, index) => (
                        <div key={index} className="flex items-center gap-1.5 text-xs">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                          <span className="text-muted-foreground">{entry.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline Bar Chart */}
                  <div className="bg-background rounded-xl p-4 border border-border">
                    <h3 className="text-sm font-medium text-foreground mb-4">Applications Over Time</h3>
                    {timelineData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={timelineData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                          <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--background))', 
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                          <Bar dataKey="saved" stackId="a" fill={statusConfig.saved.chartColor} name="Saved" />
                          <Bar dataKey="applied" stackId="a" fill={statusConfig.applied.chartColor} name="Applied" />
                          <Bar dataKey="interview" stackId="a" fill={statusConfig.interview.chartColor} name="Interview" />
                          <Bar dataKey="offer" stackId="a" fill={statusConfig.offer.chartColor} name="Offer" />
                          <Bar dataKey="rejected" stackId="a" fill={statusConfig.rejected.chartColor} name="Rejected" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                        No data to display
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Status Filter Pills */}
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
                        <button 
                          onClick={() => {
                            setSelectedCompany(job.job_company);
                            setCompanyInsightsOpen(true);
                          }}
                          className="text-primary font-medium hover:underline flex items-center gap-1"
                        >
                          {job.job_company}
                          <Building2 className="w-3.5 h-3.5" />
                        </button>
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
      
      <CompanyInsightsModal 
        isOpen={companyInsightsOpen}
        onClose={() => setCompanyInsightsOpen(false)}
        companyName={selectedCompany}
      />
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