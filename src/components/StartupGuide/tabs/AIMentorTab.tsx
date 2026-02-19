import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import type { ChatMessage, UserProfile } from '../useStartupGuideData';

interface AIMentorTabProps {
  chatHistory: ChatMessage[];
  profile: UserProfile | null;
  onSendMessage: (message: string, history: { role: string; content: string }[]) => Promise<string>;
  onSaveChatMessage: (role: 'user' | 'assistant', content: string) => void;
  onProfileDetected: (profile: UserProfile) => void;
}

const FIELDS = [
  { label: '🏥 Healthcare', value: 'Healthcare' },
  { label: '🚗 Automotive', value: 'Automotive' },
  { label: '🌾 Agriculture', value: 'Agriculture' },
  { label: '🍕 Food', value: 'Food' },
  { label: '👗 Fashion', value: 'Fashion' },
  { label: '📚 Education', value: 'Education' },
  { label: '💰 Finance', value: 'Finance' },
  { label: '🏗 Construction', value: 'Construction' },
  { label: '💻 Technology', value: 'Technology' },
  { label: '🌿 Environment', value: 'Environment' },
];

const EXPERIENCE = [
  { label: '🌱 Beginner', value: 'Beginner' },
  { label: '📖 Some Knowledge', value: 'Some Knowledge' },
  { label: '⚡ Experienced', value: 'Experienced' },
];

type OnboardingStep = 'field' | 'subdomain' | 'location' | 'experience' | 'done';

export const AIMentorTab = ({ chatHistory, profile, onSendMessage, onSaveChatMessage, onProfileDetected }: AIMentorTabProps) => {
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('field');
  const [pendingProfile, setPendingProfile] = useState<Partial<UserProfile>>({});
  const [apiAvailable, setApiAvailable] = useState<boolean | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize on mount
  useEffect(() => {
    if (chatHistory.length > 0) {
      setMessages(chatHistory);
      if (profile) {
        setOnboardingStep('done');
      }
      return;
    }

    if (profile) {
      setOnboardingStep('done');
      addBotMessage(`Welcome back! 🎉 You're exploring **${profile.field} — ${profile.subDomain}** in **${profile.location}**.\n\nAsk me anything about your startup journey!`);
    } else {
      addBotMessage(`Hey there! 👋 Welcome to your **Startup Journey!**\n\nI'm your AI Startup Mentor. I'll guide you from idea to MVP in 40 days.\n\nLet's start! **Pick your field of interest:**`);
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, onboardingStep]);

  const addBotMessage = (content: string) => {
    const msg: ChatMessage = { role: 'assistant', content, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, msg]);
    onSaveChatMessage('assistant', content);
  };

  const addUserMessage = (content: string) => {
    const msg: ChatMessage = { role: 'user', content, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, msg]);
    onSaveChatMessage('user', content);
  };

  // Handle field selection (chip click)
  const handleFieldSelect = (field: string) => {
    addUserMessage(field);
    setPendingProfile(prev => ({ ...prev, field }));
    setOnboardingStep('subdomain');
    setTimeout(() => {
      addBotMessage(`Great choice! **${field}** has huge potential! 🚀\n\nNow, what's your **specific area within ${field}**?\n\nFor example: ${getSubdomainExamples(field)}\n\nType your sub-domain below 👇`);
    }, 300);
  };

  // Handle experience selection (chip click)
  const handleExperienceSelect = (experience: string) => {
    addUserMessage(experience);
    const finalProfile: UserProfile = {
      field: pendingProfile.field || '',
      subDomain: pendingProfile.subDomain || '',
      location: pendingProfile.location || '',
      experience,
    };
    setPendingProfile(finalProfile);
    setOnboardingStep('done');

    setTimeout(() => {
      addBotMessage(`🎉 **Onboarding Complete!** Here's your profile:\n\n🎯 Field: **${finalProfile.field}**\n🔍 Sub-domain: **${finalProfile.subDomain}**\n📍 Location: **${finalProfile.location}**\n⚡ Experience: **${experience}**\n\nI'm now generating your **personalized 7-day tasks**... Check the **My Tasks** tab! 🚀\n\nYou can ask me anything about startups anytime!`);
      onProfileDetected(finalProfile);
    }, 300);
  };

  // Handle text input (for subdomain & location steps, and free chat)
  const handleSend = async () => {
    if (!input.trim() || sending) return;
    const msg = input.trim();
    setInput('');

    if (onboardingStep === 'subdomain') {
      addUserMessage(msg);
      setPendingProfile(prev => ({ ...prev, subDomain: msg }));
      setOnboardingStep('location');
      setTimeout(() => {
        addBotMessage(`**${msg}** — very specific, I like it! 💡\n\nNow tell me, **which city and region are you in?**\n\nFor example: "Komarapalayam, Tamil Nadu" or "Chennai, Tamil Nadu"\n\nThis helps me give you hyper-local tasks! 📍`);
      }, 300);
      return;
    }

    if (onboardingStep === 'location') {
      addUserMessage(msg);
      setPendingProfile(prev => ({ ...prev, location: msg }));
      setOnboardingStep('experience');
      setTimeout(() => {
        addBotMessage(`📍 **${msg}** — great location for startup exploration!\n\nLast question: **What's your experience level?**`);
      }, 300);
      return;
    }

    // Free chat after onboarding (try API, fallback to local)
    addUserMessage(msg);
    setSending(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const reply = await onSendMessage(msg, history);

      // Check if API actually worked or returned error message
      if (reply.includes('CLAUDE_API_KEY') || reply.includes('not connected')) {
        // API not configured — give a local helpful response
        addBotMessage(getLocalMentorReply(msg, profile));
      } else {
        // Check for profile JSON in reply
        const profileMatch = reply.match(/<PROFILE_JSON>(.*?)<\/PROFILE_JSON>/s);
        if (profileMatch) {
          try { onProfileDetected(JSON.parse(profileMatch[1])); } catch {}
        }
        const cleanReply = reply.replace(/<PROFILE_JSON>.*?<\/PROFILE_JSON>/s, '').trim();
        addBotMessage(cleanReply);
      }
    } catch {
      addBotMessage(getLocalMentorReply(msg, profile));
    }

    setSending(false);
    inputRef.current?.focus();
  };

  const renderMessage = (content: string) => {
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

  const showFieldChips = onboardingStep === 'field';
  const showExperienceChips = onboardingStep === 'experience';
  const showTextInput = onboardingStep === 'subdomain' || onboardingStep === 'location' || onboardingStep === 'done';

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
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-white/50">Online</span>
        </div>
      </div>

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

        {/* Field Selection Chips */}
        {showFieldChips && (
          <div className="pl-9">
            <div className="flex flex-wrap gap-2">
              {FIELDS.map(f => (
                <button
                  key={f.value}
                  onClick={() => handleFieldSelect(f.value)}
                  className="px-3 py-2 bg-white border-2 border-emerald-200 rounded-xl text-sm font-medium text-foreground hover:border-emerald-500 hover:bg-emerald-50 transition-all active:scale-95 shadow-sm"
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Experience Selection Chips */}
        {showExperienceChips && (
          <div className="pl-9">
            <div className="flex flex-wrap gap-2">
              {EXPERIENCE.map(e => (
                <button
                  key={e.value}
                  onClick={() => handleExperienceSelect(e.value)}
                  className="px-4 py-2.5 bg-white border-2 border-emerald-200 rounded-xl text-sm font-medium text-foreground hover:border-emerald-500 hover:bg-emerald-50 transition-all active:scale-95 shadow-sm"
                >
                  {e.label}
                </button>
              ))}
            </div>
          </div>
        )}

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

      {/* Input — only show for text steps */}
      {showTextInput && (
        <div className="border-t border-border/50 p-3 bg-white flex-shrink-0">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={
                onboardingStep === 'subdomain' ? "Type your sub-domain..." :
                onboardingStep === 'location' ? "Type your city, state..." :
                "Ask your mentor anything..."
              }
              className="flex-1 rounded-xl border-border/50"
              disabled={sending}
            />
            <Button onClick={handleSend} disabled={sending || !input.trim()} className="rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 px-4">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Chip selection hint */}
      {(showFieldChips || showExperienceChips) && (
        <div className="border-t border-border/50 p-3 bg-emerald-50 flex-shrink-0 text-center">
          <p className="text-xs text-emerald-700 font-medium flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {showFieldChips ? 'Tap a field to select it' : 'Tap your experience level'}
          </p>
        </div>
      )}
    </div>
  );
};

// === HELPER FUNCTIONS ===

function getSubdomainExamples(field: string): string {
  const examples: Record<string, string> = {
    Healthcare: 'Hospital Management, Telemedicine, Medical Devices, Mental Health',
    Automotive: 'EV Charging, Fleet Management, Auto Parts, Vehicle Safety',
    Agriculture: 'Smart Farming, Organic Food, Cold Storage, Crop Insurance',
    Food: 'Restaurant Tech, Food Delivery, Food Safety, Cloud Kitchen',
    Fashion: 'Sustainable Fashion, Ethnic Wear, Fashion Tech, Rental Fashion',
    Education: 'EdTech, Skill Training, Tutoring, Campus Management',
    Finance: 'UPI Payments, Insurance, Lending, Personal Finance',
    Construction: 'Smart Buildings, Interior Design, Material Supply, Safety',
    Technology: 'AI/ML, IoT, Cybersecurity, SaaS, Mobile Apps',
    Environment: 'Waste Management, Solar Energy, Water Purification, Carbon Credits',
  };
  return examples[field] || 'Any specific area you are passionate about';
}

function getLocalMentorReply(msg: string, profile: UserProfile | null): string {
  const lower = msg.toLowerCase();
  const field = profile?.field || 'your field';
  const location = profile?.location || 'your city';

  if (lower.includes('idea') || lower.includes('start')) {
    return `Great question! 💡 Here are some tips to find a startup idea in **${field}**:\n\n1. **Talk to 10 people** in ${location} who work in ${field}\n2. **Write down their biggest frustrations**\n3. **Look for patterns** — if 3+ people mention the same problem, that's your idea!\n\nComplete your daily tasks to discover real problems! 🚀`;
  }
  if (lower.includes('fund') || lower.includes('money') || lower.includes('invest')) {
    return `💰 Great funding options for student startups in India:\n\n1. **Startup India Seed Fund** — up to ₹20 lakhs\n2. **MSME loans** — low interest for first-time founders\n3. **College incubators** — JKKN may have grants available\n4. **Angel investors** — pitch after you validate your idea\n\nFirst focus on validating your problem through the survey! 📊`;
  }
  if (lower.includes('help') || lower.includes('how')) {
    return `Here's how I can help you! 🤝\n\n📋 **My Tasks tab** — Complete 7 daily observation tasks\n✍️ **Submit reflections** — Write what you observed each day\n🎯 **Problem & Survey** — I'll detect your strongest problem (unlocks after Day 7)\n📊 **Share your survey** — Get 20+ responses to validate\n🚀 **Build tab** — Get your MVP roadmap\n\nStart with your tasks today!`;
  }
  if (lower.includes('task') || lower.includes('what should')) {
    return `Check the **My Tasks** tab for your personalized daily tasks! 📋\n\nEach task is designed to make you:\n• Talk to real people in ${location}\n• Visit places related to ${field}\n• Observe real problems\n\nAfter completing a task, submit your reflection. I'll analyze all 7 to find your startup idea! 🎯`;
  }

  return `That's a great question! 🤔\n\nAs your startup mentor, I'm here to guide you through:\n\n1. **Daily observation tasks** specific to ${field} in ${location}\n2. **Problem discovery** from your reflections\n3. **Survey validation** with real people\n4. **MVP roadmap** to build your startup\n\nTry asking me about ideas, funding, or next steps! Or head to the **My Tasks** tab to start your daily challenge. 🚀`;
}
