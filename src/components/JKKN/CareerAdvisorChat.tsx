import { useState, useRef, useEffect, useCallback } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  Briefcase,
  FileText,
  GraduationCap,
  Lightbulb,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface LearnerProfile {
  name: string;
  college: string;
  branch: string;
  yearOfStudy: string;
  skills: string[];
  careerInterest: string | null;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/career-chat`;

const quickPrompts = [
  { icon: Briefcase, label: 'Interview Tips', prompt: 'Give me tips for my first technical interview' },
  { icon: FileText, label: 'Resume Help', prompt: 'How can I improve my resume as a fresher?' },
  { icon: GraduationCap, label: 'Career Path', prompt: 'What career options do I have based on my skills?' },
  { icon: Lightbulb, label: 'Skill Building', prompt: 'What skills should I learn to get a good job?' },
];

interface CareerAdvisorChatProps {
  learnerProfile?: LearnerProfile | null;
}

export function CareerAdvisorChat({ learnerProfile }: CareerAdvisorChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const streamChat = useCallback(async (userMessages: Message[]) => {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ 
        messages: userMessages,
        learnerProfile 
      }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to get response");
    }

    if (!resp.body) throw new Error("No response body");

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantContent = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantContent += content;
            setMessages(prev => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant") {
                return prev.map((m, i) => 
                  i === prev.length - 1 ? { ...m, content: assistantContent } : m
                );
              }
              return [...prev, { role: "assistant", content: assistantContent }];
            });
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }
  }, [learnerProfile]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: messageText.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      await streamChat(updatedMessages);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get response",
      });
      // Remove the failed message attempt
      setMessages(prev => prev.filter((_, i) => i !== prev.length - 1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-4 z-40 p-4 bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] text-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 ${isOpen ? 'hidden' : 'flex'} items-center gap-2 md:bottom-8`}
      >
        <Sparkles className="w-5 h-5" />
        <span className="hidden md:inline font-medium">Career Advisor</span>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:inset-auto md:bottom-8 md:right-4 md:w-[400px] md:h-[600px] flex flex-col bg-white md:rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Career Advisor</h3>
                <p className="text-xs text-white/80">AI-powered guidance</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            {messages.length === 0 ? (
              <div className="space-y-4">
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-[#2E7D32]" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Hi{learnerProfile?.name ? `, ${learnerProfile.name.split(' ')[0]}` : ''}! 👋
                  </h4>
                  <p className="text-sm text-gray-500">
                    I'm your AI career advisor. Ask me anything about interviews, resumes, or career paths!
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {quickPrompts.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickPrompt(item.prompt)}
                      className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-left transition-colors"
                    >
                      <item.icon className="w-4 h-4 text-[#2E7D32]" />
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-[#2E7D32]" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        msg.role === 'user'
                          ? 'bg-[#2E7D32] text-white rounded-br-md'
                          : 'bg-gray-100 text-gray-800 rounded-bl-md'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && messages[messages.length - 1]?.role === 'user' && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-[#2E7D32]" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-md">
                      <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-gray-100 bg-white">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about interviews, resumes..."
                className="flex-1 rounded-xl border-gray-200"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="icon"
                disabled={!input.trim() || isLoading}
                className="rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20]"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}