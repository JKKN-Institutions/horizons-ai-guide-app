import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Briefcase, 
  Users, 
  Eye, 
  MoreVertical,
  Edit,
  Trash2,
  Clock
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PageHeader from "@/components/PageHeader";

interface Job {
  id: string;
  title: string;
  location: string;
  applications: number;
  views: number;
  status: "active" | "paused" | "closed";
  daysLeft: number;
  postedDate: string;
}

const EmployerJobs = () => {
  const navigate = useNavigate();
  const [jobs] = useState<Job[]>([
    { id: "1", title: "Software Developer", location: "Chennai", applications: 15, views: 120, status: "active", daysLeft: 12, postedDate: "Dec 10, 2024" },
    { id: "2", title: "Marketing Manager", location: "Bangalore", applications: 8, views: 85, status: "active", daysLeft: 5, postedDate: "Dec 15, 2024" },
    { id: "3", title: "Sales Executive", location: "Coimbatore", applications: 24, views: 200, status: "closed", daysLeft: 0, postedDate: "Nov 20, 2024" },
    { id: "4", title: "HR Associate", location: "Chennai", applications: 6, views: 45, status: "paused", daysLeft: 8, postedDate: "Dec 12, 2024" },
  ]);

  const getStatusBadge = (status: Job["status"]) => {
    const styles = {
      active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      paused: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
      closed: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
    };
    return styles[status];
  };

  const filteredJobs = (status: "all" | Job["status"]) => {
    if (status === "all") return jobs;
    return jobs.filter((job) => job.status === status);
  };

  const JobCard = ({ job }: { job: Job }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{job.title}</h3>
              <p className="text-sm text-muted-foreground">{job.location}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate(`/employer/jobs/${job.id}/edit`)}>
                <Edit className="w-4 h-4 mr-2" /> Edit Job
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{job.applications}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{job.views}</span>
          </div>
          {job.status === "active" && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{job.daysLeft}d left</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusBadge(job.status)}`}>
            {job.status}
          </span>
          <span className="text-xs text-muted-foreground">Posted {job.postedDate}</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Manage Jobs"
        backTo="/employer/dashboard"
        rightContent={
          <Button size="sm" onClick={() => navigate("/employer/jobs/new")}>
            <Plus className="w-4 h-4 mr-1" /> New Job
          </Button>
        }
      />

      <div className="container mx-auto p-4">
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="all">All ({jobs.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({filteredJobs("active").length})</TabsTrigger>
            <TabsTrigger value="paused">Paused ({filteredJobs("paused").length})</TabsTrigger>
            <TabsTrigger value="closed">Closed ({filteredJobs("closed").length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredJobs("all").map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </TabsContent>
          <TabsContent value="active" className="space-y-4">
            {filteredJobs("active").map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </TabsContent>
          <TabsContent value="paused" className="space-y-4">
            {filteredJobs("paused").map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </TabsContent>
          <TabsContent value="closed" className="space-y-4">
            {filteredJobs("closed").map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployerJobs;
