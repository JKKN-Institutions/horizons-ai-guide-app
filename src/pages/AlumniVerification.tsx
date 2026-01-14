import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, CheckCircle, XCircle, Search, Users, 
  GraduationCap, Briefcase, Linkedin, Loader2, RefreshCw,
  ChevronLeft, Eye, Mail
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Alumni {
  id: string;
  name: string;
  email: string;
  phone?: string;
  photo_url?: string;
  university: string;
  country: string;
  course: string;
  graduation_year: number;
  job_title?: string;
  current_company?: string;
  linkedin_url?: string;
  bio?: string;
  expertise: string[];
  is_verified: boolean;
  is_available_for_mentoring: boolean;
  created_at: string;
}

const countryFlags: Record<string, string> = {
  'USA': '🇺🇸',
  'UK': '🇬🇧',
  'Canada': '🇨🇦',
  'Australia': '🇦🇺',
  'Germany': '🇩🇪',
  'Ireland': '🇮🇪',
  'New Zealand': '🇳🇿',
  'Singapore': '🇸🇬',
};

export default function AlumniVerification() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('pending');
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      const { data, error } = await supabase
        .from('abroad_alumni')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAlumni(data || []);
    } catch (error) {
      console.error('Error fetching alumni:', error);
      toast.error('Failed to load alumni data');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (id: string, verify: boolean) => {
    setProcessingId(id);
    try {
      const { error } = await supabase
        .from('abroad_alumni')
        .update({ is_verified: verify })
        .eq('id', id);

      if (error) throw error;

      setAlumni(prev => prev.map(a => 
        a.id === id ? { ...a, is_verified: verify } : a
      ));

      toast.success(verify ? 'Alumni verified successfully!' : 'Alumni verification revoked');
    } catch (error) {
      console.error('Error updating verification:', error);
      toast.error('Failed to update verification status');
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this alumni profile?')) return;

    setProcessingId(id);
    try {
      const { error } = await supabase
        .from('abroad_alumni')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAlumni(prev => prev.filter(a => a.id !== id));
      toast.success('Alumni profile deleted');
    } catch (error) {
      console.error('Error deleting alumni:', error);
      toast.error('Failed to delete alumni');
    } finally {
      setProcessingId(null);
    }
  };

  const openDetails = (alum: Alumni) => {
    setSelectedAlumni(alum);
    setDetailsOpen(true);
  };

  const filteredAlumni = alumni.filter(alum => {
    const matchesSearch = 
      alum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alum.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alum.university.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'pending') return matchesSearch && !alum.is_verified;
    if (activeTab === 'verified') return matchesSearch && alum.is_verified;
    return matchesSearch;
  });

  const stats = {
    total: alumni.length,
    verified: alumni.filter(a => a.is_verified).length,
    pending: alumni.filter(a => !a.is_verified).length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              Alumni Verification Dashboard
            </h1>
            <p className="text-muted-foreground">Manage and verify study abroad alumni profiles</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <div className="text-3xl font-bold">{stats.total}</div>
                <div className="text-sm text-muted-foreground">Total Alumni</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <div className="text-3xl font-bold text-green-600">{stats.verified}</div>
                <div className="text-sm text-muted-foreground">Verified</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-amber-500" />
                <div className="text-3xl font-bold text-amber-600">{stats.pending}</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle>Alumni Profiles</CardTitle>
              <div className="flex gap-2">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search alumni..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="icon" onClick={fetchAlumni}>
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="pending">
                  Pending ({stats.pending})
                </TabsTrigger>
                <TabsTrigger value="verified">
                  Verified ({stats.verified})
                </TabsTrigger>
                <TabsTrigger value="all">
                  All ({stats.total})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-4">
                {filteredAlumni.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No alumni found</p>
                  </div>
                ) : (
                  filteredAlumni.map((alum) => (
                    <Card key={alum.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-14 h-14">
                            <AvatarImage src={alum.photo_url || undefined} />
                            <AvatarFallback className="bg-primary/10 text-primary font-bold">
                              {alum.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold">{alum.name}</h3>
                              <span className="text-lg">{countryFlags[alum.country] || '🌍'}</span>
                              {alum.is_verified ? (
                                <Badge className="bg-green-100 text-green-700">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-amber-600 border-amber-300">
                                  Pending
                                </Badge>
                              )}
                            </div>
                            
                            <div className="text-sm text-muted-foreground mt-1">
                              <div className="flex items-center gap-2">
                                <Mail className="w-3 h-3" />
                                <span>{alum.email}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4 mt-2 text-sm">
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <GraduationCap className="w-3 h-3" />
                                <span>{alum.university}, {alum.graduation_year}</span>
                              </div>
                              {alum.job_title && (
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <Briefcase className="w-3 h-3" />
                                  <span>{alum.job_title}</span>
                                </div>
                              )}
                            </div>

                            <div className="text-sm text-primary mt-1">{alum.course}</div>
                            
                            {alum.expertise && alum.expertise.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {alum.expertise.slice(0, 3).map((exp, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">{exp}</Badge>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => openDetails(alum)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            
                            {!alum.is_verified ? (
                              <Button 
                                size="sm" 
                                onClick={() => handleVerify(alum.id, true)}
                                disabled={processingId === alum.id}
                              >
                                {processingId === alum.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <>
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Verify
                                  </>
                                )}
                              </Button>
                            ) : (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleVerify(alum.id, false)}
                                disabled={processingId === alum.id}
                              >
                                {processingId === alum.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  'Revoke'
                                )}
                              </Button>
                            )}
                            
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleDelete(alum.id)}
                              disabled={processingId === alum.id}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Details Dialog */}
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Alumni Profile Details</DialogTitle>
              <DialogDescription>Complete information about the alumni</DialogDescription>
            </DialogHeader>
            
            {selectedAlumni && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={selectedAlumni.photo_url || undefined} />
                    <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
                      {selectedAlumni.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedAlumni.name}</h3>
                    <p className="text-muted-foreground">{selectedAlumni.email}</p>
                    {selectedAlumni.phone && (
                      <p className="text-sm text-muted-foreground">{selectedAlumni.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Country:</span>
                    <p className="font-medium">{countryFlags[selectedAlumni.country]} {selectedAlumni.country}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Graduation Year:</span>
                    <p className="font-medium">{selectedAlumni.graduation_year}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">University:</span>
                    <p className="font-medium">{selectedAlumni.university}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Course:</span>
                    <p className="font-medium">{selectedAlumni.course}</p>
                  </div>
                  {selectedAlumni.current_company && (
                    <div>
                      <span className="text-muted-foreground">Company:</span>
                      <p className="font-medium">{selectedAlumni.current_company}</p>
                    </div>
                  )}
                  {selectedAlumni.job_title && (
                    <div>
                      <span className="text-muted-foreground">Job Title:</span>
                      <p className="font-medium">{selectedAlumni.job_title}</p>
                    </div>
                  )}
                </div>

                {selectedAlumni.bio && (
                  <div>
                    <span className="text-sm text-muted-foreground">Bio:</span>
                    <p className="text-sm mt-1">{selectedAlumni.bio}</p>
                  </div>
                )}

                {selectedAlumni.expertise && selectedAlumni.expertise.length > 0 && (
                  <div>
                    <span className="text-sm text-muted-foreground">Expertise:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedAlumni.expertise.map((exp, i) => (
                        <Badge key={i} variant="secondary">{exp}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedAlumni.linkedin_url && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href={selectedAlumni.linkedin_url} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4 mr-2" />
                      View LinkedIn Profile
                    </a>
                  </Button>
                )}

                <div className="text-xs text-muted-foreground">
                  Registered on: {new Date(selectedAlumni.created_at).toLocaleDateString()}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
