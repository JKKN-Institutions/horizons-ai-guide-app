import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  ClipboardList, Plus, Trash2, CheckCircle, Clock, XCircle, 
  AlertCircle, Send, FileCheck, Calendar 
} from 'lucide-react';

interface Application {
  id: string;
  university: string;
  country: string;
  program: string;
  deadline: string;
  status: 'not_started' | 'in_progress' | 'submitted' | 'admitted' | 'rejected' | 'waitlisted';
}

const statusConfig = {
  not_started: { label: 'Not Started', color: 'bg-gray-100 text-gray-700', icon: Clock },
  in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-700', icon: AlertCircle },
  submitted: { label: 'Submitted', color: 'bg-purple-100 text-purple-700', icon: Send },
  admitted: { label: 'Admitted', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700', icon: XCircle },
  waitlisted: { label: 'Waitlisted', color: 'bg-amber-100 text-amber-700', icon: Clock },
};

export const ApplicationTracker = () => {
  const [applications, setApplications] = useState<Application[]>([
    { id: '1', university: 'MIT', country: '🇺🇸', program: 'MS Computer Science', deadline: '2025-12-15', status: 'submitted' },
    { id: '2', university: 'Stanford', country: '🇺🇸', program: 'MS Data Science', deadline: '2025-12-01', status: 'in_progress' },
    { id: '3', university: 'University of Toronto', country: '🇨🇦', program: 'MS Engineering', deadline: '2025-01-15', status: 'not_started' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newApp, setNewApp] = useState({ university: '', country: '🇺🇸', program: '', deadline: '' });

  const addApplication = () => {
    if (newApp.university && newApp.program && newApp.deadline) {
      setApplications(prev => [...prev, {
        id: Date.now().toString(),
        ...newApp,
        status: 'not_started'
      }]);
      setNewApp({ university: '', country: '🇺🇸', program: '', deadline: '' });
      setShowAddForm(false);
    }
  };

  const updateStatus = (id: string, status: Application['status']) => {
    setApplications(prev => prev.map(app => 
      app.id === id ? { ...app, status } : app
    ));
  };

  const removeApplication = (id: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  const stats = {
    total: applications.length,
    submitted: applications.filter(a => ['submitted', 'admitted', 'rejected', 'waitlisted'].includes(a.status)).length,
    admitted: applications.filter(a => a.status === 'admitted').length,
  };

  const progress = stats.total > 0 ? (stats.submitted / stats.total) * 100 : 0;

  return (
    <Card className="border-2 border-violet-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-violet-500" />
              Application Tracker
            </CardTitle>
            <CardDescription>Track your university applications</CardDescription>
          </div>
          <Button onClick={() => setShowAddForm(!showAddForm)} size="sm">
            <Plus className="w-4 h-4 mr-1" /> Add Application
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-700">{stats.total}</div>
            <div className="text-sm text-gray-500">Total</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-700">{stats.submitted}</div>
            <div className="text-sm text-gray-500">Submitted</div>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-700">{stats.admitted}</div>
            <div className="text-sm text-gray-500">Admitted</div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Submission Progress</span>
            <span>{stats.submitted}/{stats.total}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="p-4 bg-violet-50 rounded-xl space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="University Name"
                value={newApp.university}
                onChange={(e) => setNewApp(prev => ({ ...prev, university: e.target.value }))}
              />
              <Input
                placeholder="Program"
                value={newApp.program}
                onChange={(e) => setNewApp(prev => ({ ...prev, program: e.target.value }))}
              />
              <Select value={newApp.country} onValueChange={(v) => setNewApp(prev => ({ ...prev, country: v }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['🇺🇸 USA', '🇬🇧 UK', '🇨🇦 Canada', '🇦🇺 Australia', '🇩🇪 Germany', '🇮🇪 Ireland', '🇳🇿 New Zealand', '🇸🇬 Singapore'].map(c => (
                    <SelectItem key={c} value={c.split(' ')[0]}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={newApp.deadline}
                onChange={(e) => setNewApp(prev => ({ ...prev, deadline: e.target.value }))}
              />
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={addApplication}>Add</Button>
              <Button size="sm" variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
          </div>
        )}

        {/* Applications List */}
        <div className="space-y-3">
          {applications.map((app) => {
            const config = statusConfig[app.status];
            const StatusIcon = config.icon;
            
            return (
              <div key={app.id} className="p-4 bg-white border-2 rounded-xl">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{app.country}</span>
                      <h4 className="font-bold">{app.university}</h4>
                    </div>
                    <p className="text-sm text-gray-500">{app.program}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeApplication(app.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>Deadline: {new Date(app.deadline).toLocaleDateString()}</span>
                  </div>

                  <Select value={app.status} onValueChange={(v) => updateStatus(app.id, v as Application['status'])}>
                    <SelectTrigger className={`w-auto ${config.color}`}>
                      <div className="flex items-center gap-1">
                        <StatusIcon className="w-3 h-3" />
                        {config.label}
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(statusConfig).map(([value, { label, icon: Icon }]) => (
                        <SelectItem key={value} value={value}>
                          <div className="flex items-center gap-2">
                            <Icon className="w-3 h-3" />
                            {label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            );
          })}
        </div>

        {applications.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <ClipboardList className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No applications yet. Add your first application!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
