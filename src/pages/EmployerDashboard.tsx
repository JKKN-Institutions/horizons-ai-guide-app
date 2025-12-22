import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Briefcase, 
  Users, 
  Eye, 
  MessageSquare, 
  Plus, 
  TrendingUp,
  Clock,
  CheckCircle
} from "lucide-react";
import PageHeader from "@/components/PageHeader";

const EmployerDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Active Jobs", value: "5", icon: Briefcase, color: "text-blue-600" },
    { label: "Total Applications", value: "47", icon: Users, color: "text-green-600" },
    { label: "Views This Week", value: "234", icon: Eye, color: "text-purple-600" },
    { label: "Messages", value: "12", icon: MessageSquare, color: "text-amber-600" },
  ];

  const recentJobs = [
    { title: "Software Developer", applications: 15, status: "active", daysLeft: 12 },
    { title: "Marketing Manager", applications: 8, status: "active", daysLeft: 5 },
    { title: "Sales Executive", applications: 24, status: "closed", daysLeft: 0 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Employer Dashboard" showBack={false} />

      <div className="container mx-auto p-4 space-y-6">
        {/* Welcome Banner */}
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-none">
          <CardContent className="py-6">
            <h2 className="text-xl font-bold">Welcome back!</h2>
            <p className="text-primary-foreground/80 mt-1">
              Manage your job postings and connect with talented candidates.
            </p>
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
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
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
            {recentJobs.map((job) => (
              <div
                key={job.title}
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
                      {job.applications} applications
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {job.status === "active" ? (
                    <>
                      <Clock className="w-4 h-4 text-amber-500" />
                      <span className="text-sm text-muted-foreground">{job.daysLeft}d left</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">Closed</span>
                    </>
                  )}
                </div>
              </div>
            ))}
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
