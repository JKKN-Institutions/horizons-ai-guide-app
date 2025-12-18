import { useState, useEffect, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
  AlertCircle,
  Bell,
  AlertTriangle,
  X
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

interface DeadlineReminder {
  id: string;
  scholarshipName: string;
  deadline: string;
  reminderDate: string;
  daysUntilDeadline: number;
  type: 'reminder' | 'deadline';
}

export const ApplicationTracker = ({ scholarships }: ApplicationTrackerProps) => {
  const [applications, setApplications] = useState<TrackedApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [editingApp, setEditingApp] = useState<TrackedApplication | null>(null);
  const [editNotes, setEditNotes] = useState('');
  const [editStatus, setEditStatus] = useState<string>('');
  const [editReminder, setEditReminder] = useState('');
  const [reminders, setReminders] = useState<DeadlineReminder[]>([]);
  const [dismissedReminders, setDismissedReminders] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  // Check for deadline reminders
  useEffect(() => {
    if (applications.length > 0) {
      checkDeadlineReminders();
    }
  }, [applications]);

  const checkDeadlineReminders = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const activeReminders: DeadlineReminder[] = [];

    applications.forEach((app) => {
      // Skip if already applied or completed
      if (['applied', 'under_review', 'accepted', 'rejected'].includes(app.status)) {
        return;
      }

      // Check for set reminder dates
      if (app.reminder_date) {
        const reminderDate = new Date(app.reminder_date);
        reminderDate.setHours(0, 0, 0, 0);
        const daysUntilReminder = Math.ceil((reminderDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysUntilReminder <= 0 && daysUntilReminder >= -3) {
          activeReminders.push({
            id: `reminder-${app.id}`,
            scholarshipName: app.scholarship_name,
            deadline: app.scholarship_deadline || 'Not specified',
            reminderDate: app.reminder_date,
            daysUntilDeadline: daysUntilReminder,
            type: 'reminder'
          });
        }
      }

      // Check for approaching deadlines (7 days warning)
      if (app.scholarship_deadline) {
        const deadlineMatch = app.scholarship_deadline.match(/(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})/i);
        if (deadlineMatch) {
          const months: { [key: string]: number } = {
            jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
            jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
          };
          const deadlineDate = new Date(
            parseInt(deadlineMatch[3]),
            months[deadlineMatch[2].toLowerCase()],
            parseInt(deadlineMatch[1])
          );
          deadlineDate.setHours(0, 0, 0, 0);
          const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

          if (daysUntilDeadline <= 7 && daysUntilDeadline >= 0) {
            activeReminders.push({
              id: `deadline-${app.id}`,
              scholarshipName: app.scholarship_name,
              deadline: app.scholarship_deadline,
              reminderDate: '',
              daysUntilDeadline,
              type: 'deadline'
            });
          }
        }
      }
    });

    // Sort by urgency
    activeReminders.sort((a, b) => a.daysUntilDeadline - b.daysUntilDeadline);
    setReminders(activeReminders);
  };

  const dismissReminder = (id: string) => {
    setDismissedReminders(prev => new Set([...prev, id]));
  };

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

  const visibleReminders = reminders.filter(r => !dismissedReminders.has(r.id));

  return (
    <div className="space-y-6">
      {/* Deadline Reminders */}
      {visibleReminders.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Bell className="w-4 h-4" />
            Deadline Reminders ({visibleReminders.length})
          </div>
          {visibleReminders.map((reminder) => (
            <Alert 
              key={reminder.id} 
              className={reminder.daysUntilDeadline <= 2 ? 'border-red-300 bg-red-50' : 'border-yellow-300 bg-yellow-50'}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  {reminder.daysUntilDeadline <= 2 ? (
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                  ) : (
                    <Bell className="h-4 w-4 text-yellow-600 mt-0.5" />
                  )}
                  <div>
                    <AlertTitle className={reminder.daysUntilDeadline <= 2 ? 'text-red-800' : 'text-yellow-800'}>
                      {reminder.type === 'reminder' ? 'Reminder' : 'Deadline Approaching'}
                    </AlertTitle>
                    <AlertDescription className={reminder.daysUntilDeadline <= 2 ? 'text-red-700' : 'text-yellow-700'}>
                      <strong>{reminder.scholarshipName}</strong>
                      {reminder.daysUntilDeadline === 0 && ' - Due today!'}
                      {reminder.daysUntilDeadline === 1 && ' - Due tomorrow!'}
                      {reminder.daysUntilDeadline > 1 && ` - ${reminder.daysUntilDeadline} days left`}
                      {reminder.daysUntilDeadline < 0 && ` - ${Math.abs(reminder.daysUntilDeadline)} days overdue`}
                      <br />
                      <span className="text-sm">Deadline: {reminder.deadline}</span>
                    </AlertDescription>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 -mt-1 -mr-2"
                  onClick={() => dismissReminder(reminder.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </Alert>
          ))}
        </div>
      )}

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
