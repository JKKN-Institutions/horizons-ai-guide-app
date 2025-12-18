import { useState, useEffect, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  ClipboardList, 
  Calendar, 
  Trash2, 
  Edit2, 
  ExternalLink,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Scholarship } from './types';

// Context for tracker functions
interface TrackerContextType {
  saveScholarship: (scholarship: Scholarship) => Promise<void>;
  isScholarshipTracked: (scholarshipId: string) => boolean;
}

export const TrackerContext = createContext<TrackerContextType | null>(null);

export const useTracker = () => {
  return useContext(TrackerContext);
};

interface TrackedApplication {
  id: string;
  scholarship_id: string;
  scholarship_name: string;
  scholarship_provider: string;
  scholarship_amount: string | null;
  scholarship_deadline: string | null;
  status: 'saved' | 'in_progress' | 'documents_pending' | 'applied' | 'under_review' | 'accepted' | 'rejected';
  applied_date: string | null;
  notes: string | null;
  reminder_date: string | null;
  created_at: string;
}

interface ApplicationTrackerProps {
  scholarships: Scholarship[];
}

const statusConfig = {
  saved: { label: 'Saved', color: 'bg-muted text-muted-foreground', icon: Clock },
  in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-700', icon: FileText },
  documents_pending: { label: 'Documents Pending', color: 'bg-yellow-100 text-yellow-700', icon: AlertCircle },
  applied: { label: 'Applied', color: 'bg-purple-100 text-purple-700', icon: CheckCircle2 },
  under_review: { label: 'Under Review', color: 'bg-orange-100 text-orange-700', icon: Clock },
  accepted: { label: 'Accepted', color: 'bg-green-100 text-green-700', icon: CheckCircle2 },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700', icon: XCircle }
};

export const ApplicationTracker = ({ scholarships }: ApplicationTrackerProps) => {
  const [applications, setApplications] = useState<TrackedApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [editingApp, setEditingApp] = useState<TrackedApplication | null>(null);
  const [editNotes, setEditNotes] = useState('');
  const [editStatus, setEditStatus] = useState<string>('');
  const [editReminder, setEditReminder] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      fetchApplications(user.id);
    } else {
      setLoading(false);
    }
  };

  const fetchApplications = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('scholarship_applications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications((data || []) as TrackedApplication[]);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateApplication = async () => {
    if (!editingApp) return;

    try {
      const { error } = await supabase
        .from('scholarship_applications')
        .update({
          status: editStatus as TrackedApplication['status'],
          notes: editNotes,
          reminder_date: editReminder || null,
          applied_date: editStatus === 'applied' ? new Date().toISOString() : editingApp.applied_date
        })
        .eq('id', editingApp.id);

      if (error) throw error;

      toast({
        title: "Updated",
        description: "Application updated successfully"
      });
      setEditingApp(null);
      if (user) fetchApplications(user.id);
    } catch (error) {
      console.error('Error updating application:', error);
      toast({
        title: "Error",
        description: "Failed to update application",
        variant: "destructive"
      });
    }
  };

  const deleteApplication = async (id: string) => {
    try {
      const { error } = await supabase
        .from('scholarship_applications')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Removed",
        description: "Scholarship removed from tracker"
      });
      if (user) fetchApplications(user.id);
    } catch (error) {
      console.error('Error deleting application:', error);
      toast({
        title: "Error",
        description: "Failed to remove scholarship",
        variant: "destructive"
      });
    }
  };

  const openEditDialog = (app: TrackedApplication) => {
    setEditingApp(app);
    setEditNotes(app.notes || '');
    setEditStatus(app.status);
    setEditReminder(app.reminder_date || '');
  };

  const stats = {
    total: applications.length,
    applied: applications.filter(a => ['applied', 'under_review', 'accepted'].includes(a.status)).length,
    pending: applications.filter(a => ['saved', 'in_progress', 'documents_pending'].includes(a.status)).length,
    accepted: applications.filter(a => a.status === 'accepted').length
  };

  if (!user) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-8 text-center">
          <ClipboardList className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-semibold mb-2">Track Your Applications</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Login to save scholarships and track your application progress
          </p>
          <Button variant="outline" onClick={() => window.location.href = '/auth'}>
            Login to Start Tracking
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-2xl font-bold text-primary">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total Tracked</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.applied}</p>
            <p className="text-sm text-muted-foreground">Applied</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-2xl font-bold text-green-600">{stats.accepted}</p>
            <p className="text-sm text-muted-foreground">Accepted</p>
          </CardContent>
        </Card>
      </div>

      {/* Applications List */}
      {applications.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-8 text-center">
            <ClipboardList className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">No Scholarships Tracked</h3>
            <p className="text-muted-foreground text-sm">
              Save scholarships from the list to track your applications
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => {
            const StatusIcon = statusConfig[app.status].icon;
            const scholarship = scholarships.find(s => s.id === app.scholarship_id);
            
            return (
              <Card key={app.id} className="hover:shadow-md transition-shadow">
                <CardContent className="py-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <StatusIcon className={`w-5 h-5 mt-1 ${
                          app.status === 'accepted' ? 'text-green-600' :
                          app.status === 'rejected' ? 'text-red-600' :
                          app.status === 'applied' ? 'text-purple-600' :
                          'text-muted-foreground'
                        }`} />
                        <div>
                          <h4 className="font-semibold">{app.scholarship_name}</h4>
                          <p className="text-sm text-muted-foreground">{app.scholarship_provider}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <Badge className={statusConfig[app.status].color}>
                              {statusConfig[app.status].label}
                            </Badge>
                            {app.scholarship_amount && (
                              <Badge variant="outline">{app.scholarship_amount}</Badge>
                            )}
                            {app.scholarship_deadline && (
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Deadline: {app.scholarship_deadline}
                              </span>
                            )}
                          </div>
                          {app.notes && (
                            <p className="text-sm text-muted-foreground mt-2 italic">
                              "{app.notes}"
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {scholarship && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(scholarship.applicationUrl, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Apply
                        </Button>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(app)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Application</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <label className="text-sm font-medium mb-2 block">Status</label>
                              <Select value={editStatus} onValueChange={setEditStatus}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {Object.entries(statusConfig).map(([key, config]) => (
                                    <SelectItem key={key} value={key}>
                                      {config.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-2 block">Notes</label>
                              <Textarea
                                value={editNotes}
                                onChange={(e) => setEditNotes(e.target.value)}
                                placeholder="Add notes about your application..."
                                rows={3}
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-2 block">Reminder Date</label>
                              <Input
                                type="date"
                                value={editReminder}
                                onChange={(e) => setEditReminder(e.target.value)}
                              />
                            </div>
                            <Button onClick={updateApplication} className="w-full">
                              Save Changes
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteApplication(app.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
