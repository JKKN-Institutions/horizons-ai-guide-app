import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Briefcase, 
  Users, 
  Eye, 
  Plus, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/PageHeader";

interface EmployerData {
  id: string;
  company_name: string;
  is_verified: boolean;
  verification_status: string | null;
}

interface JobData {
  id: string;
  title: string;
  status: string | null;
  views_count: number | null;
  valid_until: string | null;
  created_at: string | null;
}

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [employer, setEmployer] = useState<EmployerData | null>(null);
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [totalViews, setTotalViews] = useState(0);

  useEffect(() => {
    const loadDashboardData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate("/auth?redirect=/employer/dashboard");
        return;
      }

      try {
        // Load employer profile
        const { data: employerData } = await supabase
          .from("employers")
          .select("id, company_name, is_verified, verification_status")
          .eq("user_id", session.user.id)
          .maybeSingle();

        if (employerData) {
          setEmployer(employerData);

          // Load jobs for this employer
          const { data: jobsData } = await supabase
            .from("jobs")
            .select("id, title, status, views_count, valid_until, created_at")
            .eq("employer_id", employerData.id)
            .order("created_at", { ascending: false })
            .limit(5);

          if (jobsData) {
            setJobs(jobsData);
            const views = jobsData.reduce((sum, job) => sum + (job.views_count || 0), 0);
            setTotalViews(views);
          }
        }
      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session?.user) {
        navigate("/auth?redirect=/employer/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const getDaysLeft = (validUntil: string | null) => {
    if (!validUntil) return null;
    const diff = new Date(validUntil).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const activeJobsCount = jobs.filter(j => j.status === "active").length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader title="Employer Dashboard" showBack={false} />
        <div className="container mx-auto p-4 space-y-6">
          <Skeleton className="h-32 w-full rounded-xl" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-24 rounded-xl" />)}
          </div>
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Employer Dashboard" showBack={false} />

      <div className="container mx-auto p-4 space-y-6">
        {/* Welcome Banner */}
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-none">
          <CardContent className="py-6">
            <h2 className="text-xl font-bold">
              Welcome{employer?.company_name ? `, ${employer.company_name}` : " back"}!
            </h2>
            <p className="text-primary-foreground/80 mt-1">
              Manage your job postings and connect with talented candidates.
            </p>
            {!employer?.is_verified && (
              <div className="flex items-center gap-2 mt-3 bg-white/10 rounded-lg px-3 py-2 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>Account verification: {employer?.verification_status || "Pending"}</span>
              </div>
            )}
            <Button
              onClick={() => navigate("/employer/jobs/new")}
              variant="secondary"
              className="mt-4"
            >
              <Plus className="w-4 h-4 mr-2" /> Post New Job
            </Button>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted text-blue-600">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeJobsCount}</p>
                <p className="text-sm text-muted-foreground">Active Jobs</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted text-green-600">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{jobs.length}</p>
                <p className="text-sm text-muted-foreground">Total Jobs</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted text-purple-600">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalViews}</p>
                <p className="text-sm text-muted-foreground">Total Views</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted text-amber-600">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{employer?.is_verified ? "Yes" : "No"}</p>
                <p className="text-sm text-muted-foreground">Verified</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Jobs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Job Postings</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate("/employer/jobs")}>
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {jobs.length === 0 ? (
              <div className="text-center py-8">
                <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No jobs posted yet</p>
                <Button 
                  variant="link" 
                  className="mt-2"
                  onClick={() => navigate("/employer/jobs/new")}
                >
                  Post your first job
                </Button>
              </div>
            ) : (
              jobs.map((job) => {
                const daysLeft = getDaysLeft(job.valid_until);
                const isActive = job.status === "active";

                return (
                  <div
                    key={job.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                    onClick={() => navigate("/employer/jobs")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{job.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {job.views_count || 0} views
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isActive && daysLeft !== null ? (
                        <>
                          <Clock className="w-4 h-4 text-amber-500" />
                          <span className="text-sm text-muted-foreground">{daysLeft}d left</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-muted-foreground capitalize">{job.status}</span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center gap-2"
            onClick={() => navigate("/employer/profile")}
          >
            <TrendingUp className="w-5 h-5" />
            <span>Company Profile</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center gap-2"
            onClick={() => navigate("/employer/jobs")}
          >
            <Briefcase className="w-5 h-5" />
            <span>Manage Jobs</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
