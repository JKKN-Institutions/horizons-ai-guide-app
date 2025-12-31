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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  VolumeX,
  Target,
  TrendingUp,
  BookOpen,
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Career options for skill gap analyzer
const CAREER_OPTIONS = [
  'Software Developer',
  'Data Scientist',
  'Web Developer',
  'Mobile App Developer',
  'DevOps Engineer',
  'Cloud Architect',
  'Machine Learning Engineer',
  'UI/UX Designer',
  'Product Manager',
  'Business Analyst',
  'Cybersecurity Analyst',
  'Database Administrator',
  'Network Engineer',
  'Full Stack Developer',
  'AI Engineer',
  'Blockchain Developer',
  'Game Developer',
  'Quality Assurance Engineer',
  'Technical Writer',
  'IT Project Manager'
];

// Common skills for selection
const COMMON_SKILLS = [
  'Python', 'JavaScript', 'Java', 'C++', 'SQL', 'HTML/CSS',
  'React', 'Node.js', 'TypeScript', 'Git', 'Docker', 'AWS',
  'Machine Learning', 'Data Analysis', 'Excel', 'Communication',
  'Problem Solving', 'Teamwork', 'Leadership', 'Critical Thinking',
  'Agile/Scrum', 'REST APIs', 'MongoDB', 'PostgreSQL', 'Linux',
  'Figma', 'Adobe XD', 'Photoshop', 'Project Management', 'Testing'
];

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
  
  // Skill Gap Analyzer state
  const [skillGapOpen, setSkillGapOpen] = useState(false);
  const [targetCareer, setTargetCareer] = useState('');
  const [currentSkills, setCurrentSkills] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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
      // Get the current session for authentication
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        throw new Error('Please sign in to use the chat');
      }
      
      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          messages: userMessages.map((m) => ({ role: m.role, content: m.content }))
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 401) {
          throw new Error('Please sign in to use the chat');
        } else if (response.status === 429) {
          throw new Error(errorData.error || 'Rate limit exceeded. Please try again later.');
        }
        throw new Error(errorData.error || 'Chat failed');
      }
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

  const toggleSkill = (skill: string) => {
    setCurrentSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const analyzeSkillGap = async () => {
    if (!targetCareer || currentSkills.length === 0) {
      toast({
        title: 'Missing Information',
        description: 'Please select a target career and at least one skill.',
        variant: 'destructive'
      });
      return;
    }

    setIsAnalyzing(true);
    setSkillGapOpen(false);

    const analysisPrompt = `Perform a detailed SKILL GAP ANALYSIS for the following:

TARGET CAREER: ${targetCareer}
CURRENT SKILLS: ${currentSkills.join(', ')}

Please provide:
1. **Skills Match Analysis** - Which of my current skills are relevant for ${targetCareer} and how well they match
2. **Missing Critical Skills** - List the essential skills I'm missing with priority levels (High/Medium/Low)
3. **Learning Roadmap** - A 3-6 month action plan to bridge the gap
4. **Recommended Resources** - Specific courses, certifications, or projects for each missing skill
5. **Career Readiness Score** - Rate my current readiness from 0-100%
6. **Quick Wins** - Skills I can acquire in under 2 weeks that would boost my profile

Format the response clearly with headers and bullet points.`;

    const userMessage: Message = {
      role: 'user',
      content: analysisPrompt,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    await saveMessage(userMessage);
    await streamChat([...messages, userMessage]);
    setIsAnalyzing(false);
    
    // Reset form
    setTargetCareer('');
    setCurrentSkills([]);
  };

  const quickActions = [
    { icon: <GraduationCap className="h-4 w-4" />, label: 'Suggest courses', prompt: 'Suggest some good courses for me based on science stream' },
    { icon: <Building2 className="h-4 w-4" />, label: 'Find colleges', prompt: 'List the best engineering colleges in Tamil Nadu' },
    { icon: <Compass className="h-4 w-4" />, label: 'Career guidance', prompt: 'What are the best career options after 12th science?' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50/50 to-amber-50/30 page-transition">
      {/* Enhanced Header */}
      <header className="bg-gradient-to-r from-emerald-700 via-green-700 to-emerald-800 sticky top-0 z-20 shadow-xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
        <div className="container mx-auto px-4 py-5 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/career-assessment/colleges')}
                className="text-white/90 hover:text-white hover:bg-white/15 rounded-xl transition-all duration-300"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30 animate-pulse">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-serif font-bold text-white tracking-tight">AI Career Counselor</h1>
                  <p className="text-sm text-emerald-100 font-tamil">AI தொழில் ஆலோசகர்</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsTtsEnabled(!isTtsEnabled)}
                className={`rounded-xl transition-all duration-300 ${isTtsEnabled ? 'bg-amber-500/30 text-amber-200 hover:bg-amber-500/40' : 'text-white/80 hover:text-white hover:bg-white/15'}`}
                title={isTtsEnabled ? 'Disable voice' : 'Enable voice'}
              >
                {isTtsEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={clearChat}
                className="text-white/80 hover:text-white hover:bg-white/15 rounded-xl transition-all duration-300"
                title="Clear chat"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Enhanced Quick Actions with Skill Gap Analyzer */}
        <div className="flex flex-wrap gap-3 mb-6">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction(action.prompt)}
              className="bg-white/80 backdrop-blur-sm border-2 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 text-emerald-700 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300 gap-2 font-medium"
            >
              <span className="p-1 rounded-full bg-emerald-100">{action.icon}</span>
              {action.label}
            </Button>
          ))}
          
          {/* Skill Gap Analyzer Button */}
          <Sheet open={skillGapOpen} onOpenChange={setSkillGapOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-purple-50 to-violet-50 backdrop-blur-sm border-2 border-purple-300 hover:border-purple-500 hover:from-purple-100 hover:to-violet-100 text-purple-700 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300 gap-2 font-medium"
              >
                <span className="p-1 rounded-full bg-purple-100">
                  <Target className="h-4 w-4" />
                </span>
                Skill Gap Analyzer
                <Sparkles className="h-3 w-3 text-purple-500" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50">
              <SheetHeader className="text-left pb-4 border-b border-purple-100">
                <SheetTitle className="text-2xl font-bold text-purple-900 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  Skill Gap Analyzer
                </SheetTitle>
                <SheetDescription className="text-purple-700">
                  Identify missing skills for your dream career and get a personalized learning roadmap
                </SheetDescription>
              </SheetHeader>
              
              <ScrollArea className="h-[calc(85vh-180px)] mt-6">
                <div className="space-y-6 pr-4">
                  {/* Target Career Selection */}
                  <div className="space-y-3">
                    <Label className="text-purple-900 font-semibold flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Target Career
                    </Label>
                    <Select value={targetCareer} onValueChange={setTargetCareer}>
                      <SelectTrigger className="h-12 bg-white border-2 border-purple-200 focus:border-purple-500 rounded-xl">
                        <SelectValue placeholder="Select your dream career..." />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {CAREER_OPTIONS.map((career) => (
                          <SelectItem key={career} value={career}>
                            {career}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Current Skills Selection */}
                  <div className="space-y-3">
                    <Label className="text-purple-900 font-semibold flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Your Current Skills
                      <Badge variant="secondary" className="ml-2 bg-purple-100 text-purple-700">
                        {currentSkills.length} selected
                      </Badge>
                    </Label>
                    <p className="text-sm text-purple-600">
                      Click to select skills you already have:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {COMMON_SKILLS.map((skill) => (
                        <Badge
                          key={skill}
                          variant={currentSkills.includes(skill) ? "default" : "outline"}
                          className={`cursor-pointer transition-all duration-200 px-3 py-1.5 text-sm ${
                            currentSkills.includes(skill)
                              ? 'bg-gradient-to-r from-purple-500 to-violet-600 text-white border-transparent shadow-md'
                              : 'bg-white border-2 border-purple-200 text-purple-700 hover:border-purple-400 hover:bg-purple-50'
                          }`}
                          onClick={() => toggleSkill(skill)}
                        >
                          {currentSkills.includes(skill) && (
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                          )}
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Selected Skills Summary */}
                  {currentSkills.length > 0 && (
                    <div className="bg-white/80 rounded-xl p-4 border border-purple-100">
                      <p className="text-sm font-medium text-purple-900 mb-2">Selected Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {currentSkills.map((skill) => (
                          <Badge
                            key={skill}
                            className="bg-purple-100 text-purple-700 pr-1"
                          >
                            {skill}
                            <button
                              onClick={() => toggleSkill(skill)}
                              className="ml-1 p-0.5 rounded-full hover:bg-purple-200 transition-colors"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Analysis Preview */}
                  {targetCareer && currentSkills.length > 0 && (
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-emerald-100">
                          <Sparkles className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-medium text-emerald-900">Ready to Analyze!</p>
                          <p className="text-sm text-emerald-700 mt-1">
                            AI will analyze your {currentSkills.length} skills against {targetCareer} requirements
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              {/* Analyze Button */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-purple-50 via-purple-50 to-transparent">
                <Button
                  onClick={analyzeSkillGap}
                  disabled={!targetCareer || currentSkills.length === 0 || isAnalyzing}
                  className="w-full h-14 bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 text-white font-semibold text-lg rounded-xl shadow-lg shadow-purple-200 disabled:opacity-50 transition-all duration-300"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Analyzing Skills...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Analyze My Skill Gap
                    </>
                  )}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Enhanced Chat Area */}
        <Card className="bg-white/70 backdrop-blur-xl border-2 border-white/60 shadow-2xl shadow-emerald-900/5 rounded-3xl mb-6 overflow-hidden">
          <CardContent className="p-0">
            <ScrollArea className="h-[55vh]">
              <div className="p-6">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-16">
                    {/* Animated avatar */}
                    <div className="relative mb-6">
                      <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 flex items-center justify-center shadow-2xl shadow-orange-300/50 transform hover:scale-105 transition-transform duration-300">
                        <Bot className="h-12 w-12 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-gray-800 mb-3">
                      Hello! I'm your AI Career Counselor
                    </h3>
                    <p className="text-gray-600 max-w-md text-lg leading-relaxed">
                      Ask me anything about careers, courses, colleges, or guidance. I'm here to help you find your path!
                    </p>
                    <p className="text-amber-600/80 font-tamil mt-4 text-lg">
                      தொழில், படிப்புகள், கல்லூரிகள் பற்றி என்னிடம் கேளுங்கள்!
                    </p>
                    
                    {/* Suggestion chips */}
                    <div className="mt-8 flex flex-wrap justify-center gap-2">
                      {['Career options after 12th', 'Best engineering colleges', 'Course recommendations'].map((chip) => (
                        <button
                          key={chip}
                          onClick={() => handleQuickAction(chip)}
                          className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 text-emerald-700 text-sm font-medium hover:border-emerald-400 hover:shadow-md transition-all duration-300"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                      >
                        {message.role === 'assistant' && (
                          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-200/50">
                            <Bot className="h-5 w-5 text-white" />
                          </div>
                        )}
                        <div
                          className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-lg ${
                            message.role === 'user'
                              ? 'bg-gradient-to-br from-emerald-600 to-green-700 text-white shadow-emerald-200/50'
                              : 'bg-white border border-gray-100 text-gray-800 shadow-gray-100/50'
                          }`}
                        >
                          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                          <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-emerald-100' : 'text-gray-400'}`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        {message.role === 'user' && (
                          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center flex-shrink-0 shadow-md">
                            <User className="h-5 w-5 text-emerald-700" />
                          </div>
                        )}
                      </div>
                    ))}
                    {isLoading && messages[messages.length - 1]?.content === '' && (
                      <div className="flex gap-3 animate-fade-in">
                        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-200/50">
                          <Bot className="h-5 w-5 text-white" />
                        </div>
                        <div className="bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-lg">
                          <div className="flex gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Enhanced Input Area */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border-2 border-white/60 shadow-xl p-3 flex gap-3 items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleVoiceInput}
            className={`rounded-xl h-12 w-12 transition-all duration-300 ${
              isListening 
                ? 'bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg shadow-red-200 animate-pulse' 
                : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
            }`}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Ask me about careers, courses, or colleges..."
            className="flex-1 border-0 bg-transparent text-gray-800 placeholder:text-gray-400 focus-visible:ring-0 text-base h-12"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSend} 
            disabled={isLoading || !input.trim()} 
            className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg shadow-emerald-200/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </Button>
        </div>

        {isListening && (
          <div className="text-center mt-4 flex items-center justify-center gap-2">
            <span className="inline-flex h-3 w-3 rounded-full bg-red-500 animate-ping" />
            <p className="text-emerald-700 font-medium">Listening... Speak now</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerChat;
