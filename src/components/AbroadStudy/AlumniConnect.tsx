import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Search, GraduationCap, Briefcase, MessageCircle, Linkedin, Loader2, Send, UserPlus, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

interface Alumni {
  id: string;
  name: string;
  email: string;
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
  is_available_for_mentoring: boolean;
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

const countries = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'Ireland', 'New Zealand', 'Singapore'];

export const AlumniConnect = () => {
  const { user } = useAuth();
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  
  // Message dialog state
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
  const [messageForm, setMessageForm] = useState({ name: '', email: '', message: '' });
  const [sendingMessage, setSendingMessage] = useState(false);
  
  // Registration dialog state
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    university: '',
    course: '',
    graduation_year: new Date().getFullYear(),
    current_company: '',
    job_title: '',
    linkedin_url: '',
    bio: '',
    expertise: '',
  });

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      const { data, error } = await supabase
        .from('abroad_alumni')
        .select('*')
        .eq('is_verified', true)
        .eq('is_available_for_mentoring', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAlumni(data || []);
    } catch (error) {
      console.error('Error fetching alumni:', error);
      toast.error('Failed to load alumni');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!selectedAlumni || !messageForm.name || !messageForm.email || !messageForm.message) {
      toast.error('Please fill in all fields');
      return;
    }

    setSendingMessage(true);
    try {
      const { error } = await supabase
        .from('alumni_messages')
        .insert({
          receiver_id: selectedAlumni.id,
          sender_id: user?.id || null,
          sender_name: messageForm.name,
          sender_email: messageForm.email,
          message: messageForm.message,
        });

      if (error) throw error;

      toast.success('Message sent successfully! The alumni will respond via email.');
      setMessageDialogOpen(false);
      setMessageForm({ name: '', email: '', message: '' });
      setSelectedAlumni(null);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setSendingMessage(false);
    }
  };

  const handleRegister = async () => {
    if (!user) {
      toast.error('Please sign in to register as alumni');
      return;
    }

    if (!registerForm.name || !registerForm.email || !registerForm.country || 
        !registerForm.university || !registerForm.course) {
      toast.error('Please fill in all required fields');
      return;
    }

    setRegistering(true);
    try {
      const expertiseArray = registerForm.expertise
        .split(',')
        .map(e => e.trim())
        .filter(e => e.length > 0);

      const { error } = await supabase
        .from('abroad_alumni')
        .insert({
          user_id: user.id,
          name: registerForm.name,
          email: registerForm.email,
          phone: registerForm.phone || null,
          country: registerForm.country,
          university: registerForm.university,
          course: registerForm.course,
          graduation_year: registerForm.graduation_year,
          current_company: registerForm.current_company || null,
          job_title: registerForm.job_title || null,
          linkedin_url: registerForm.linkedin_url || null,
          bio: registerForm.bio || null,
          expertise: expertiseArray,
          is_verified: false,
          is_available_for_mentoring: true,
        });

      if (error) throw error;

      toast.success('Registration submitted! Your profile will be visible after verification.');
      setRegisterDialogOpen(false);
      setRegisterForm({
        name: '',
        email: '',
        phone: '',
        country: '',
        university: '',
        course: '',
        graduation_year: new Date().getFullYear(),
        current_company: '',
        job_title: '',
        linkedin_url: '',
        bio: '',
        expertise: '',
      });
    } catch (error) {
      console.error('Error registering:', error);
      toast.error('Failed to register. You may have already registered.');
    } finally {
      setRegistering(false);
    }
  };

  const openMessageDialog = (alum: Alumni) => {
    setSelectedAlumni(alum);
    if (user) {
      setMessageForm(prev => ({ ...prev, email: user.email || '' }));
    }
    setMessageDialogOpen(true);
  };

  const filteredAlumni = alumni.filter(alum => {
    const matchesSearch = 
      alum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alum.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alum.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alum.expertise?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCountry = !selectedCountry || alum.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  const uniqueCountries = [...new Set(alumni.map(a => a.country))];

  if (loading) {
    return (
      <Card className="border-2 border-cyan-200">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-cyan-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-cyan-500" />
          Alumni Connect
        </CardTitle>
        <CardDescription>Connect with students who've been through the journey</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, university, or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCountry === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCountry(null)}
            >
              All
            </Button>
            {uniqueCountries.map(c => (
              <Button
                key={c}
                variant={selectedCountry === c ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCountry(c)}
              >
                {countryFlags[c] || '🌍'} {c}
              </Button>
            ))}
          </div>
        </div>

        {/* Alumni Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredAlumni.map((alum) => (
            <Card key={alum.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="w-14 h-14">
                    <AvatarImage src={alum.photo_url || undefined} />
                    <AvatarFallback className="bg-cyan-100 text-cyan-700 font-bold">
                      {alum.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold">{alum.name}</h3>
                      <span className="text-lg">{countryFlags[alum.country] || '🌍'}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <GraduationCap className="w-3 h-3" />
                      <span>{alum.university}, {alum.graduation_year}</span>
                    </div>
                    
                    <p className="text-sm text-primary font-medium mt-1">{alum.course}</p>
                    
                    {alum.job_title && alum.current_company && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <Briefcase className="w-3 h-3" />
                        <span>{alum.job_title} @ {alum.current_company}</span>
                      </div>
                    )}
                  </div>
                </div>

                {alum.bio && (
                  <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{alum.bio}</p>
                )}

                {alum.expertise && alum.expertise.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {alum.expertise.slice(0, 3).map((specialty, i) => (
                      <Badge key={i} variant="outline" className="text-xs">{specialty}</Badge>
                    ))}
                    {alum.expertise.length > 3 && (
                      <Badge variant="outline" className="text-xs">+{alum.expertise.length - 3}</Badge>
                    )}
                  </div>
                )}

                <div className="flex gap-2 mt-4">
                  <Button size="sm" className="flex-1" onClick={() => openMessageDialog(alum)}>
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Message
                  </Button>
                  {alum.linkedin_url && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={alum.linkedin_url} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAlumni.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No alumni found matching your criteria</p>
          </div>
        )}

        {/* Register as Alumni CTA */}
        <div className="bg-cyan-50 dark:bg-cyan-950/30 rounded-xl p-4 text-center">
          <h4 className="font-semibold text-cyan-800 dark:text-cyan-200 mb-2">Are you a Study Abroad Alumni? 🎓</h4>
          <p className="text-sm text-cyan-700 dark:text-cyan-300 mb-3">
            Help fellow students by sharing your experience and insights
          </p>
          <Dialog open={registerDialogOpen} onOpenChange={setRegisterDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <UserPlus className="w-4 h-4 mr-2" />
                Register as Alumni Mentor
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Register as Alumni Mentor</DialogTitle>
                <DialogDescription>
                  Share your study abroad experience to help future students
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-name">Full Name *</Label>
                    <Input
                      id="reg-name"
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email *</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-country">Country of Study *</Label>
                    <Select
                      value={registerForm.country}
                      onValueChange={(value) => setRegisterForm(prev => ({ ...prev, country: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map(c => (
                          <SelectItem key={c} value={c}>
                            {countryFlags[c]} {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-year">Graduation Year *</Label>
                    <Input
                      id="reg-year"
                      type="number"
                      min={2000}
                      max={new Date().getFullYear() + 5}
                      value={registerForm.graduation_year}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, graduation_year: parseInt(e.target.value) }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-university">University *</Label>
                  <Input
                    id="reg-university"
                    value={registerForm.university}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, university: e.target.value }))}
                    placeholder="e.g., MIT, Stanford, Oxford"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-course">Course/Degree *</Label>
                  <Input
                    id="reg-course"
                    value={registerForm.course}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, course: e.target.value }))}
                    placeholder="e.g., MS Computer Science, MBA"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-company">Current Company</Label>
                    <Input
                      id="reg-company"
                      value={registerForm.current_company}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, current_company: e.target.value }))}
                      placeholder="e.g., Google, Microsoft"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-role">Job Title</Label>
                    <Input
                      id="reg-role"
                      value={registerForm.job_title}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, job_title: e.target.value }))}
                      placeholder="e.g., Software Engineer"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-linkedin">LinkedIn Profile</Label>
                  <Input
                    id="reg-linkedin"
                    value={registerForm.linkedin_url}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, linkedin_url: e.target.value }))}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-expertise">Areas of Expertise (comma-separated)</Label>
                  <Input
                    id="reg-expertise"
                    value={registerForm.expertise}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, expertise: e.target.value }))}
                    placeholder="e.g., SOP Review, Visa Tips, Scholarships"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-bio">Short Bio</Label>
                  <Textarea
                    id="reg-bio"
                    value={registerForm.bio}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell students about your journey and how you can help..."
                    rows={3}
                  />
                </div>

                <Button onClick={handleRegister} disabled={registering || !user} className="w-full">
                  {registering ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Submit Registration
                    </>
                  )}
                </Button>
                {!user && (
                  <p className="text-sm text-center text-muted-foreground">
                    Please sign in to register as an alumni mentor
                  </p>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Message Dialog */}
        <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Message {selectedAlumni?.name}</DialogTitle>
              <DialogDescription>
                Send a message to connect with this alumni mentor
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="msg-name">Your Name *</Label>
                <Input
                  id="msg-name"
                  value={messageForm.name}
                  onChange={(e) => setMessageForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="msg-email">Your Email *</Label>
                <Input
                  id="msg-email"
                  type="email"
                  value={messageForm.email}
                  onChange={(e) => setMessageForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="msg-message">Message *</Label>
                <Textarea
                  id="msg-message"
                  value={messageForm.message}
                  onChange={(e) => setMessageForm(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Introduce yourself and ask your questions..."
                  rows={4}
                />
              </div>
              <Button onClick={handleSendMessage} disabled={sendingMessage} className="w-full">
                {sendingMessage ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
