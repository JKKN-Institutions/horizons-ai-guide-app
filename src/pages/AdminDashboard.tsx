import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Shield, LogOut, Search, Download, GraduationCap, Users, Briefcase, 
  Loader2, RefreshCw, Calendar
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";

interface Registration12th {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  school_name: string | null;
  board: string | null;
  stream: string | null;
  preferred_course: string | null;
  created_at: string;
}

interface RegistrationLearner {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  institution: string | null;
  degree: string | null;
  experience: string | null;
  preferred_role: string | null;
  created_at: string;
}

interface RegistrationEmployer {
  id: string;
  company_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  industry: string | null;
  roles_hiring: string | null;
  job_location: string | null;
  created_at: string;
}

type AnyRegistration = Registration12th | RegistrationLearner | RegistrationEmployer;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading, signOut } = useAdminAuth();
  
  const [activeTab, setActiveTab] = useState("12th-learners");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [isDataLoading, setIsDataLoading] = useState(true);
  
  const [registrations12th, setRegistrations12th] = useState<Registration12th[]>([]);
  const [registrationsLearner, setRegistrationsLearner] = useState<RegistrationLearner[]>([]);
  const [registrationsEmployer, setRegistrationsEmployer] = useState<RegistrationEmployer[]>([]);

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      toast.error("Access denied. Admin privileges required.");
      navigate("/admin/login");
    }
  }, [user, isAdmin, isLoading, navigate]);

  const fetchData = async () => {
    setIsDataLoading(true);
    try {
      const [res12th, resLearner, resEmployer] = await Promise.all([
        supabase.from("registrations_12th_learners").select("*").order("created_at", { ascending: false }),
        supabase.from("registrations_learners").select("*").order("created_at", { ascending: false }),
        supabase.from("registrations_employers").select("*").order("created_at", { ascending: false }),
      ]);

      if (res12th.data) setRegistrations12th(res12th.data);
      if (resLearner.data) setRegistrationsLearner(resLearner.data);
      if (resEmployer.data) setRegistrationsEmployer(resEmployer.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch registrations");
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    if (user && isAdmin) {
      fetchData();
    }
  }, [user, isAdmin]);

  const filterByDate = <T extends { created_at: string }>(data: T[]): T[] => {
    if (dateFilter === "all") return data;
    
    const now = new Date();
    const filterDate = new Date();
    
    switch (dateFilter) {
      case "today":
        filterDate.setHours(0, 0, 0, 0);
        break;
      case "week":
        filterDate.setDate(now.getDate() - 7);
        break;
      case "month":
        filterDate.setMonth(now.getMonth() - 1);
        break;
      default:
        return data;
    }
    
    return data.filter(item => new Date(item.created_at) >= filterDate);
  };

  const filterBySearch = <T extends AnyRegistration>(data: T[], fields: string[]): T[] => {
    if (!searchQuery) return data;
    const query = searchQuery.toLowerCase();
    return data.filter(item => 
      fields.some(field => {
        const value = (item as unknown as Record<string, unknown>)[field];
        return String(value || "").toLowerCase().includes(query);
      })
    );
  };

  const exportToCSV = <T extends AnyRegistration>(data: T[], filename: string) => {
    if (data.length === 0) {
      toast.error("No data to export");
      return;
    }
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map(row => 
        headers.map(header => {
          const value = (row as unknown as Record<string, unknown>)[header];
          const stringValue = String(value ?? "");
          return `"${stringValue.replace(/"/g, '""')}"`;
        }).join(",")
      )
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    toast.success("Data exported successfully");
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (isLoading) {
    return (
      <div className="fresh-page-wrapper flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-fresh-green-medium" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const filtered12th = filterBySearch(filterByDate(registrations12th), ["full_name", "email", "phone", "school_name"]);
  const filteredLearner = filterBySearch(filterByDate(registrationsLearner), ["full_name", "email", "phone", "institution"]);
  const filteredEmployer = filterBySearch(filterByDate(registrationsEmployer), ["company_name", "contact_name", "contact_email"]);

  return (
    <div className="fresh-page-wrapper">
      {/* Header */}
      <header className="fresh-page-header py-4 px-6 mb-6">
        <div className="container mx-auto flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-white" />
            <div>
              <h1 className="text-xl font-serif font-bold text-white">Admin Dashboard</h1>
              <p className="text-sm text-white/80">JKKN AI Horizons</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm hidden md:block text-white/80">{user.email}</span>
            <Button variant="secondary" size="sm" onClick={handleSignOut} className="bg-white/20 text-white hover:bg-white/30">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 pb-6 space-y-6 relative z-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="fresh-card border-l-fresh-green-medium">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium fresh-muted">12th Learners</CardTitle>
              <GraduationCap className="w-5 h-5 text-fresh-green-medium" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-fresh-green-dark">{registrations12th.length}</div>
            </CardContent>
          </Card>
          <Card className="fresh-card border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium fresh-muted">Learners</CardTitle>
              <Users className="w-5 h-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-fresh-green-dark">{registrationsLearner.length}</div>
            </CardContent>
          </Card>
          <Card className="fresh-card border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium fresh-muted">Employers</CardTitle>
              <Briefcase className="w-5 h-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-fresh-green-dark">{registrationsEmployer.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="fresh-card">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 fresh-muted" />
                <Input
                  placeholder="Search by name, email, phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="fresh-input pl-10"
                />
              </div>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full md:w-48 fresh-input">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-fresh-green-light">
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={fetchData} className="btn-fresh-outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Tabs */}
        <Card className="fresh-card">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <TabsList className="bg-fresh-green-bg">
                  <TabsTrigger value="12th-learners" className="gap-2 data-[state=active]:bg-fresh-green-medium data-[state=active]:text-white">
                    <GraduationCap className="w-4 h-4" />
                    <span className="hidden sm:inline">12th Learners</span>
                    <Badge variant="secondary" className="ml-1 bg-fresh-gold-light text-fresh-gold-rich">{filtered12th.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="learners" className="gap-2 data-[state=active]:bg-fresh-green-medium data-[state=active]:text-white">
                    <Users className="w-4 h-4" />
                    <span className="hidden sm:inline">Learners</span>
                    <Badge variant="secondary" className="ml-1 bg-fresh-gold-light text-fresh-gold-rich">{filteredLearner.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="employers" className="gap-2 data-[state=active]:bg-fresh-green-medium data-[state=active]:text-white">
                    <Briefcase className="w-4 h-4" />
                    <span className="hidden sm:inline">Employers</span>
                    <Badge variant="secondary" className="ml-1 bg-fresh-gold-light text-fresh-gold-rich">{filteredEmployer.length}</Badge>
                  </TabsTrigger>
                </TabsList>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    if (activeTab === "12th-learners") exportToCSV(filtered12th, "12th_learners");
                    else if (activeTab === "learners") exportToCSV(filteredLearner, "learners");
                    else exportToCSV(filteredEmployer, "employers");
                  }}
                  className="btn-fresh-secondary"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              {isDataLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                <>
                  <TabsContent value="12th-learners" className="m-0">
                    <div className="rounded-md border overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>School</TableHead>
                            <TableHead>Board</TableHead>
                            <TableHead>Stream</TableHead>
                            <TableHead>Preferred Course</TableHead>
                            <TableHead>Registered</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filtered12th.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                No registrations found
                              </TableCell>
                            </TableRow>
                          ) : (
                            filtered12th.map((reg) => (
                              <TableRow key={reg.id}>
                                <TableCell className="font-medium">{reg.full_name}</TableCell>
                                <TableCell>{reg.email}</TableCell>
                                <TableCell>{reg.phone}</TableCell>
                                <TableCell>{reg.school_name || "-"}</TableCell>
                                <TableCell>{reg.board || "-"}</TableCell>
                                <TableCell>{reg.stream || "-"}</TableCell>
                                <TableCell>{reg.preferred_course || "-"}</TableCell>
                                <TableCell className="text-sm text-muted-foreground">{formatDate(reg.created_at)}</TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>

                  <TabsContent value="learners" className="m-0">
                    <div className="rounded-md border overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Institution</TableHead>
                            <TableHead>Degree</TableHead>
                            <TableHead>Experience</TableHead>
                            <TableHead>Preferred Role</TableHead>
                            <TableHead>Registered</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredLearner.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                No registrations found
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredLearner.map((reg) => (
                              <TableRow key={reg.id}>
                                <TableCell className="font-medium">{reg.full_name}</TableCell>
                                <TableCell>{reg.email}</TableCell>
                                <TableCell>{reg.phone}</TableCell>
                                <TableCell>{reg.institution || "-"}</TableCell>
                                <TableCell>{reg.degree || "-"}</TableCell>
                                <TableCell>{reg.experience || "-"}</TableCell>
                                <TableCell>{reg.preferred_role || "-"}</TableCell>
                                <TableCell className="text-sm text-muted-foreground">{formatDate(reg.created_at)}</TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>

                  <TabsContent value="employers" className="m-0">
                    <div className="rounded-md border overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Company</TableHead>
                            <TableHead>Contact Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Industry</TableHead>
                            <TableHead>Roles Hiring</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Registered</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredEmployer.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                No registrations found
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredEmployer.map((reg) => (
                              <TableRow key={reg.id}>
                                <TableCell className="font-medium">{reg.company_name}</TableCell>
                                <TableCell>{reg.contact_name}</TableCell>
                                <TableCell>{reg.contact_email}</TableCell>
                                <TableCell>{reg.contact_phone}</TableCell>
                                <TableCell>{reg.industry || "-"}</TableCell>
                                <TableCell>{reg.roles_hiring || "-"}</TableCell>
                                <TableCell>{reg.job_location || "-"}</TableCell>
                                <TableCell className="text-sm text-muted-foreground">{formatDate(reg.created_at)}</TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </>
              )}
            </CardContent>
          </Tabs>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;