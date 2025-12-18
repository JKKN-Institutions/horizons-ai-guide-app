import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import {
  ArrowLeft,
  Send,
  Mic,
  MicOff,
  Trash2,
  GraduationCap,
  Building2,
  Compass,
  Loader2,
  Bot,
  User,
  Volume2,
  VolumeX
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/jkkn-chat`;

const CareerChat = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isTtsEnabled, setIsTtsEnabled] = useState(false);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load chat history
  useEffect(() => {
    const loadHistory = async () => {
      if (!user) return;

      const { data } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (data && data.length > 0) {
        setMessages(
          data.map((m) => ({
            role: m.role as 'user' | 'assistant',
            content: m.content,
            timestamp: new Date(m.created_at)
          }))
        );
      }
    };

    loadHistory();
  }, [user]);

  // Initialize speech recognition
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      recognition.onstart = () => setIsListening(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = Array.from({ length: event.results.length })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((_, i) => (event.results[i] as any)[0].transcript)
          .join('');
        setInput(transcript);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
    }
  }, []);

  const saveMessage = useCallback(
    async (message: Message) => {
      if (!user) return;
      await supabase.from('chat_messages').insert({
        user_id: user.id,
        role: message.role,
        content: message.content
      });
    },
    [user]
  );

  const speakText = (text: string) => {
    if (!isTtsEnabled) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = text.match(/[\u0B80-\u0BFF]/) ? 'ta-IN' : 'en-IN';
    window.speechSynthesis.speak(utterance);
  };

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      toast({
        title: 'Voice not supported',
        description: 'Your browser does not support voice input.',
        variant: 'destructive'
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const streamChat = async (userMessages: Message[]) => {
    setIsLoading(true);

    try {
      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
        },
        body: JSON.stringify({
          messages: userMessages.map((m) => ({ role: m.role, content: m.content }))
        })
      });

      if (!response.ok) throw new Error('Chat failed');
      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      // Add placeholder assistant message
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '', timestamp: new Date() }
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ') && line.trim() !== 'data: [DONE]') {
            try {
              const json = JSON.parse(line.slice(6));
              const delta = json.choices?.[0]?.delta?.content;
              if (delta) {
                assistantContent += delta;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: 'assistant',
                    content: assistantContent,
                    timestamp: new Date()
                  };
                  return updated;
                });
              }
            } catch {
              // Skip malformed JSON
            }
          }
        }
      }

      // Save assistant message
      const assistantMessage: Message = {
        role: 'assistant',
        content: assistantContent,
        timestamp: new Date()
      };
      await saveMessage(assistantMessage);
      speakText(assistantContent);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get response. Please try again.',
        variant: 'destructive'
      });
      // Remove placeholder
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    await saveMessage(userMessage);
    await streamChat([...messages, userMessage]);
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
  };

  const clearChat = async () => {
    if (!user) return;

    await supabase.from('chat_messages').delete().eq('user_id', user.id);
    setMessages([]);
    toast({ title: 'Chat cleared', description: 'Your conversation history has been deleted.' });
  };

  const quickActions = [
    { icon: <GraduationCap className="h-4 w-4" />, label: 'Suggest courses', prompt: 'Suggest some good courses for me based on science stream' },
    { icon: <Building2 className="h-4 w-4" />, label: 'Find colleges', prompt: 'List the best engineering colleges in Tamil Nadu' },
    { icon: <Compass className="h-4 w-4" />, label: 'Career guidance', prompt: 'What are the best career options after 12th science?' }
  ];

  return (
    <div className="fresh-page-wrapper">
      {/* Fresh Header */}
      <header className="fresh-page-header sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/student-dashboard')}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-serif font-bold text-white">AI Career Counselor</h1>
                <p className="text-sm text-white/80 font-tamil">AI தொழில் ஆலோசகர்</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsTtsEnabled(!isTtsEnabled)}
                className="text-white hover:bg-white/10"
                title={isTtsEnabled ? 'Disable voice' : 'Enable voice'}
              >
                {isTtsEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={clearChat}
                className="text-white hover:bg-white/10"
                title="Clear chat"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mb-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction(action.prompt)}
              className="fresh-card border-fresh-green-light hover:bg-fresh-green-bg text-fresh-green-dark"
            >
              {action.icon}
              {action.label}
            </Button>
          ))}
        </div>

        {/* Chat Area */}
        <Card className="glass-card-premium mb-4 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-premium-navy">
              <Bot className="h-5 w-5 text-premium-gold" />
              Conversation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[50vh] pr-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-premium-gold/20 to-premium-orange/20 flex items-center justify-center mb-4">
                    <Bot className="h-10 w-10 text-premium-gold" />
                  </div>
                  <h3 className="text-lg font-medium text-premium-navy mb-2">
                    Hello! I'm your AI Career Counselor
                  </h3>
                  <p className="text-premium-navy/70 max-w-md">
                    Ask me anything about careers, courses, colleges, or guidance. I'm here to help you find your path!
                  </p>
                  <p className="text-premium-navy/60 font-tamil mt-2">
                    தொழில், படிப்புகள், கல்லூரிகள் பற்றி என்னிடம் கேளுங்கள்!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.role === 'assistant' && (
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-premium-gold to-premium-orange flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-premium-navy to-premium-navy/90 text-white'
                            : 'glass-card text-premium-navy'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-60 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {message.role === 'user' && (
                        <div className="h-8 w-8 rounded-full bg-premium-navy/20 flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-premium-navy" />
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && messages[messages.length - 1]?.content === '' && (
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-premium-gold to-premium-orange flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="glass-card rounded-2xl px-4 py-2">
                        <Loader2 className="h-4 w-4 animate-spin text-premium-gold" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Input Area */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleVoiceInput}
            className={`glass-card border-premium-gold/30 ${isListening ? 'bg-red-500 text-white border-red-500' : 'hover:bg-premium-gold/10'}`}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5 text-premium-navy" />}
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Ask me about careers, courses, or colleges..."
            className="input-premium flex-1"
            disabled={isLoading}
          />
          <Button onClick={handleSend} disabled={isLoading || !input.trim()} className="btn-premium-primary">
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </Button>
        </div>

        {isListening && (
          <p className="text-center text-sm text-premium-gold mt-2 animate-pulse">
            🎤 Listening... Speak now
          </p>
        )}
      </div>
    </div>
  );
};

export default CareerChat;
