import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, Loader2, AlertCircle } from 'lucide-react';
import type { ChatMessage, UserProfile } from '../useStartupGuideData';

interface AIMentorTabProps {
  chatHistory: ChatMessage[];
  profile: UserProfile | null;
  onSendMessage: (message: string, history: { role: string; content: string }[]) => Promise<string>;
  onSaveChatMessage: (role: 'user' | 'assistant', content: string) => void;
  onProfileDetected: (profile: UserProfile) => void;
}

const WELCOME_MSG = `Hey there! 👋 Welcome to your Startup Journey!

I'm your AI Startup Mentor. I'll guide you from idea to MVP in 40 days.

Let's start with a quick onboarding. Tell me:

🎯 **What field interests you most?**
Pick one: Healthcare, Automotive, Agriculture, Food, Fashion, Education, Finance, Construction, Technology, or Environment

Just type your choice below!`;

export const AIMentorTab = ({ chatHistory, profile, onSendMessage, onSaveChatMessage, onProfileDetected }: AIMentorTabProps) => {
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [apiError, setApiError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize messages: use saved history OR show welcome message
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (chatHistory.length > 0) return chatHistory;
    if (!profile) {
      // Show welcome message locally — no API call needed
      return [{
        role: 'assistant' as const,
        content: WELCOME_MSG,
        timestamp: new Date().toISOString(),
      }];
    }
    return [{
      role: 'assistant' as const,
      content: `Welcome back! 🎉 You're working on ${profile.field} — ${profile.subDomain} in ${profile.location}. Ask me anything about your startup journey!`,
      timestamp: new Date().toISOString(),
    }];
  });

  // Sync if chat history changes externally
  useEffect(() => {
    if (chatHistory.length > 0) {
      setMessages(chatHistory);
    }
  }, [chatHistory.length]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    const msg = input.trim();
    setInput('');
    setApiError(false);

    const userMsg: ChatMessage = { role: 'user', content: msg, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    onSaveChatMessage('user', msg);

    setSending(true);
    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const reply = await onSendMessage(msg, history);

      // Check if reply indicates API error
      if (reply.includes('could not process') || reply.includes('unavailable')) {
        setApiError(true);
      }

      // Check if profile JSON is in reply (onboarding complete)
      const profileMatch = reply.match(/<PROFILE_JSON>(.*?)<\/PROFILE_JSON>/s);
      if (profileMatch) {
        try {
          const profileData = JSON.parse(profileMatch[1]);
          onProfileDetected(profileData);
        } catch (e) {
          console.error('Profile parse error:', e);
        }
      }

      const cleanReply = reply.replace(/<PROFILE_JSON>.*?<\/PROFILE_JSON>/s, '').trim();
      const assistantMsg: ChatMessage = { role: 'assistant', content: cleanReply, timestamp: new Date().toISOString() };
      setMessages(prev => [...prev, assistantMsg]);
      onSaveChatMessage('assistant', cleanReply);
    } catch (e) {
      console.error(e);
      setApiError(true);
      const errMsg: ChatMessage = {
        role: 'assistant',
        content: '⚠️ AI service is not connected yet. Please add CLAUDE_API_KEY in Vercel Environment Variables and redeploy. The UI is working — just needs the AI backend!',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errMsg]);
    }
    setSending(false);
    inputRef.current?.focus();
  };

  const renderMessage = (content: string) => {
    // Simple bold text rendering: **text** → <strong>text</strong>
    return content.split('\n').map((line, j) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={j} className={j > 0 ? 'mt-1.5' : ''}>
          {parts.map((part, k) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={k}>{part.slice(2, -2)}</strong>;
            }
            return <span key={k}>{part}</span>;
          })}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col h-[600px] md:h-[650px] bg-white rounded-xl border border-border/40 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#14532d] to-[#166534] px-4 py-3 flex items-center gap-3 flex-shrink-0">
        <div className="w-9 h-9 rounded-full bg-amber-400/20 flex items-center justify-center">
          <Bot className="w-5 h-5 text-amber-300" />
        </div>
        <div>
          <p className="text-sm font-bold text-white">AI Startup Mentor</p>
          <p className="text-[10px] text-white/50">{profile ? `Guiding you in ${profile.field}` : 'Ready to help you start'}</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${apiError ? 'bg-red-400' : 'bg-emerald-400'} animate-pulse`} />
          <span className="text-[10px] text-white/50">{apiError ? 'Offline' : 'Online'}</span>
        </div>
      </div>

      {/* API Error Banner */}
      {apiError && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center gap-2 flex-shrink-0">
          <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
          <p className="text-[11px] text-amber-700">AI not connected. Add <code className="bg-amber-100 px-1 rounded text-[10px]">CLAUDE_API_KEY</code> to Vercel env vars.</p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-emerald-50/30 to-white">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-emerald-100' : 'bg-amber-100'}`}>
              {msg.role === 'user' ? <User className="w-3.5 h-3.5 text-emerald-700" /> : <Bot className="w-3.5 h-3.5 text-amber-700" />}
            </div>
            <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-emerald-600 text-white rounded-tr-md' : 'bg-white border border-border/50 text-foreground rounded-tl-md shadow-sm'}`}>
              {renderMessage(msg.content)}
            </div>
          </div>
        ))}
        {sending && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center">
              <Bot className="w-3.5 h-3.5 text-amber-700" />
            </div>
            <div className="bg-white border border-border/50 px-4 py-3 rounded-2xl rounded-tl-md shadow-sm">
              <div className="flex items-center gap-1.5">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                <span className="text-xs text-muted-foreground">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border/50 p-3 bg-white flex-shrink-0">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={profile ? "Ask your mentor anything..." : "Type your field of interest..."}
            className="flex-1 rounded-xl border-border/50"
            disabled={sending}
          />
          <Button onClick={handleSend} disabled={sending || !input.trim()} className="rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 px-4">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
