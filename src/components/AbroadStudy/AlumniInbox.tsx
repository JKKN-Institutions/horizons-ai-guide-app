import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Inbox, Mail, MailOpen, Clock, Send, Loader2, RefreshCw, AlertCircle, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { format, formatDistanceToNow } from 'date-fns';

interface Message {
  id: string;
  sender_name: string;
  sender_email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

interface AlumniProfile {
  id: string;
  name: string;
  university: string;
  country: string;
}

export const AlumniInbox = () => {
  const { user } = useAuth();
  const [alumniProfile, setAlumniProfile] = useState<AlumniProfile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (user) {
      fetchAlumniProfile();
    } else {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (alumniProfile) {
      fetchMessages();
    }
  }, [alumniProfile]);

  const fetchAlumniProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('abroad_alumni')
        .select('id, name, university, country')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error) throw error;
      setAlumniProfile(data);
    } catch (error) {
      console.error('Error fetching alumni profile:', error);
    } finally {
      if (!alumniProfile) {
        setLoading(false);
      }
    }
  };

  const fetchMessages = async () => {
    if (!alumniProfile) return;

    try {
      const { data, error } = await supabase
        .from('alumni_messages')
        .select('*')
        .eq('receiver_id', alumniProfile.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('alumni_messages')
        .update({ is_read: true })
        .eq('id', messageId);

      if (error) throw error;
      
      setMessages(prev => 
        prev.map(m => m.id === messageId ? { ...m, is_read: true } : m)
      );
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const openMessage = (message: Message) => {
    setSelectedMessage(message);
    if (!message.is_read) {
      markAsRead(message.id);
    }
  };

  const openReplyDialog = () => {
    if (selectedMessage) {
      setReplyText(`Hi ${selectedMessage.sender_name},\n\nThank you for reaching out!\n\n`);
      setReplyDialogOpen(true);
    }
  };

  const handleSendReply = async () => {
    if (!selectedMessage || !replyText.trim()) {
      toast.error('Please write a reply');
      return;
    }

    setSending(true);
    
    // Open email client with pre-filled content
    const subject = encodeURIComponent(`Re: Study Abroad Query from ${alumniProfile?.name}`);
    const body = encodeURIComponent(replyText);
    const mailtoUrl = `mailto:${selectedMessage.sender_email}?subject=${subject}&body=${body}`;
    
    window.open(mailtoUrl, '_blank');
    
    toast.success('Email client opened with your reply');
    setReplyDialogOpen(false);
    setReplyText('');
    setSending(false);
  };

  const unreadCount = messages.filter(m => !m.is_read).length;

  if (loading) {
    return (
      <Card className="border-2 border-indigo-200">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="border-2 border-indigo-200">
        <CardContent className="text-center py-12">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-semibold text-lg mb-2">Sign In Required</h3>
          <p className="text-muted-foreground">Please sign in to access your alumni inbox</p>
        </CardContent>
      </Card>
    );
  }

  if (!alumniProfile) {
    return (
      <Card className="border-2 border-indigo-200">
        <CardContent className="text-center py-12">
          <Inbox className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-semibold text-lg mb-2">Not Registered as Alumni</h3>
          <p className="text-muted-foreground mb-4">
            You need to register as an alumni mentor to access the inbox
          </p>
          <p className="text-sm text-muted-foreground">
            Go to "Alumni Connect" section to register
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-indigo-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Inbox className="w-5 h-5 text-indigo-500" />
              Alumni Inbox
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount} new
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Messages from students seeking your guidance
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={fetchMessages}>
            <RefreshCw className="w-4 h-4 mr-1" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Messages List */}
          <div className="border rounded-lg">
            <div className="p-3 border-b bg-muted/50">
              <h4 className="font-medium text-sm">Messages ({messages.length})</h4>
            </div>
            <ScrollArea className="h-[400px]">
              {messages.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Mail className="w-10 h-10 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No messages yet</p>
                  <p className="text-xs mt-1">Students will reach out to you soon!</p>
                </div>
              ) : (
                <div className="divide-y">
                  {messages.map((message) => (
                    <button
                      key={message.id}
                      onClick={() => openMessage(message)}
                      className={`w-full text-left p-3 hover:bg-muted/50 transition-colors ${
                        selectedMessage?.id === message.id ? 'bg-muted' : ''
                      } ${!message.is_read ? 'bg-indigo-50 dark:bg-indigo-950/30' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className={`text-xs ${!message.is_read ? 'bg-indigo-200 text-indigo-700' : ''}`}>
                            {message.sender_name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            {!message.is_read ? (
                              <Mail className="w-3 h-3 text-indigo-500 flex-shrink-0" />
                            ) : (
                              <MailOpen className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                            )}
                            <span className={`font-medium text-sm truncate ${!message.is_read ? 'text-indigo-700 dark:text-indigo-300' : ''}`}>
                              {message.sender_name}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate mt-0.5">
                            {message.message}
                          </p>
                          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Message Detail */}
          <div className="border rounded-lg">
            <div className="p-3 border-b bg-muted/50">
              <h4 className="font-medium text-sm">Message Details</h4>
            </div>
            {selectedMessage ? (
              <div className="p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-indigo-100 text-indigo-700">
                      {selectedMessage.sender_name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{selectedMessage.sender_name}</h4>
                    <a 
                      href={`mailto:${selectedMessage.sender_email}`}
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      {selectedMessage.sender_email}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(selectedMessage.created_at), 'PPpp')}
                    </p>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-sm whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>

                <Button onClick={openReplyDialog} className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Reply via Email
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[350px] text-muted-foreground">
                <div className="text-center">
                  <MailOpen className="w-10 h-10 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Select a message to view</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reply Dialog */}
        <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Reply to {selectedMessage?.sender_name}</DialogTitle>
              <DialogDescription>
                This will open your email client with a pre-filled message
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Replying to:</p>
                <p className="text-sm font-medium">{selectedMessage?.sender_email}</p>
              </div>

              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your reply..."
                rows={8}
                className="resize-none"
              />

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setReplyDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleSendReply} disabled={sending} className="flex-1">
                  {sending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  Open Email Client
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
