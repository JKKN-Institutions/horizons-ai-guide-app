import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Trash2, Minimize2, Maximize2, Mic, MicOff, Download, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Message {
  id?: string;
  role: "user" | "assistant";
  content: string;
  imageUrl?: string;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/jkkn-chat`;

// Speech recognition types
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

const AIChatModal = ({ isOpen, onClose }: AIChatModalProps) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<string>("");
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Load chat history from database
  useEffect(() => {
    const loadChatHistory = async () => {
      if (!user) return;
      
      setIsLoadingHistory(true);
      try {
        const { data, error } = await supabase
          .from("chat_messages")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: true });
        
        if (error) throw error;
        
        if (data) {
          setMessages(data.map(msg => ({
            id: msg.id,
            role: msg.role as "user" | "assistant",
            content: msg.content,
            imageUrl: msg.image_url || undefined
          })));
        }
      } catch (error) {
        console.error("Error loading chat history:", error);
      } finally {
        setIsLoadingHistory(false);
      }
    };
    
    loadChatHistory();
  }, [user]);

  // Save message to database
  const saveMessage = useCallback(async (message: Message) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from("chat_messages")
        .insert({
          user_id: user.id,
          role: message.role,
          content: message.content,
          image_url: message.imageUrl || null
        });
      
      if (error) throw error;
    } catch (error) {
      console.error("Error saving message:", error);
    }
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US"; // Will auto-detect Tamil as well
      
      recognitionRef.current.onstart = () => {
        setVoiceStatus("Listening...");
      };
      
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = "";
        let interimTranscript = "";
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        if (finalTranscript) {
          setInput(prev => prev + finalTranscript);
          setVoiceStatus("Processing...");
        } else if (interimTranscript) {
          setVoiceStatus(`"${interimTranscript}"`);
        }
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event);
        setIsListening(false);
        setVoiceStatus("");
        toast.error("Voice input error. Please try again.");
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
        setVoiceStatus("");
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [saveMessage]);

  // Text-to-speech function
  const speakText = useCallback((text: string) => {
    if (!ttsEnabled || !window.speechSynthesis) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthRef.current = utterance;
    
    // Detect language (simple heuristic for Tamil)
    const hasTamil = /[\u0B80-\u0BFF]/.test(text);
    utterance.lang = hasTamil ? "ta-IN" : "en-US";
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  }, [ttsEnabled]);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, []);

  const toggleTts = useCallback(() => {
    if (isSpeaking) {
      stopSpeaking();
    }
    setTtsEnabled(prev => !prev);
    toast.success(ttsEnabled ? "Voice output disabled" : "Voice output enabled");
  }, [ttsEnabled, isSpeaking, stopSpeaking]);

  const toggleVoiceInput = useCallback(() => {
    if (!recognitionRef.current) {
      toast.error("Voice input is not supported in your browser");
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setVoiceStatus("");
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        toast.error("Could not start voice input");
      }
    }
  }, [isListening]);

  const streamChat = useCallback(async (userMessages: Message[]) => {
    // Get the current session for authentication
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.access_token) {
      throw new Error("Please sign in to use the chat");
    }
    
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ messages: userMessages.map(m => ({ role: m.role, content: m.content })) }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      throw new Error(errorData.error || `Request failed with status ${resp.status}`);
    }

    const contentType = resp.headers.get("content-type") || "";
    
    // Check if it's an image response (JSON)
    if (contentType.includes("application/json")) {
      const data = await resp.json();
      if (data.type === "image" && data.imageUrl) {
        const assistantMsg: Message = { 
          role: "assistant", 
          content: data.content || "Here's the image you requested!",
          imageUrl: data.imageUrl 
        };
        setMessages(prev => [...prev, assistantMsg]);
        await saveMessage(assistantMsg);
        speakText(assistantMsg.content);
        return;
      } else if (data.error) {
        throw new Error(data.error);
      }
    }

    // Handle streaming text response
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
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant" && !last.imageUrl) {
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
    
    // Save the final assistant message and speak it
    if (assistantContent) {
      await saveMessage({ role: "assistant", content: assistantContent });
      speakText(assistantContent);
    }
  }, [saveMessage, speakText]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Stop voice input if active
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      setVoiceStatus("");
    }

    const userMessage: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    // Save user message
    await saveMessage(userMessage);

    try {
      await streamChat(newMessages);
    } catch (error) {
      console.error("Chat error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to send message");
      setMessages(messages);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = async () => {
    if (!user) {
      setMessages([]);
      toast.success("Chat cleared");
      return;
    }
    
    try {
      const { error } = await supabase
        .from("chat_messages")
        .delete()
        .eq("user_id", user.id);
      
      if (error) throw error;
      
      setMessages([]);
      toast.success("Chat cleared");
    } catch (error) {
      console.error("Error clearing chat:", error);
      toast.error("Failed to clear chat history");
    }
  };

  const downloadImage = (imageUrl: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `jkkn-ai-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image download started");
  };

  if (!isOpen) return null;

  if (isMinimized) {
    return (
      <div className="fixed bottom-24 right-6 z-50 bg-card border border-border rounded-lg shadow-lg p-3 flex items-center gap-3 animate-scale-in">
        <span className="font-medium text-sm">JKKN AI Assistant</span>
        <Button size="icon" variant="ghost" onClick={() => setIsMinimized(false)}>
          <Maximize2 className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-24 right-6 z-50 w-[380px] h-[520px] bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden animate-scale-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-primary/5">
        <div>
          <h3 className="font-semibold text-foreground">JKKN AI Assistant</h3>
          <p className="text-xs text-muted-foreground">Ask me anything! 🎤 Voice enabled</p>
        </div>
        <div className="flex items-center gap-1">
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={isSpeaking ? stopSpeaking : toggleTts} 
            title={isSpeaking ? "Stop speaking" : ttsEnabled ? "Disable voice output" : "Enable voice output"}
            className={isSpeaking ? "text-primary animate-pulse" : ""}
          >
            {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
          <Button size="icon" variant="ghost" onClick={clearChat} title="Clear chat">
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => setIsMinimized(true)} title="Minimize">
            <Minimize2 className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={onClose} title="Close">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        {isLoadingHistory ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce [animation-delay:0.1s]" />
              <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce [animation-delay:0.2s]" />
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <p className="text-sm">👋 Welcome! I'm your JKKN AI Assistant.</p>
            <p className="text-xs mt-2">
              Ask me about careers, education, or say "generate an image"!
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setInput("What are the career options after 12th science?")}
                className="text-xs bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-full transition-colors"
              >
                Career options after 12th
              </button>
              <button
                onClick={() => setInput("Generate an image of a student studying")}
                className="text-xs bg-accent/20 hover:bg-accent/30 px-3 py-1.5 rounded-full transition-colors"
              >
                🎨 Generate image
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  {msg.imageUrl && (
                    <div className="mt-2 relative group">
                      <img 
                        src={msg.imageUrl} 
                        alt="Generated image" 
                        className="rounded-lg max-w-full h-auto"
                      />
                      <Button
                        size="sm"
                        variant="secondary"
                        className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => downloadImage(msg.imageUrl!)}
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-3 py-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce [animation-delay:0.1s]" />
                    <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>

      {/* Voice Status */}
      {voiceStatus && (
        <div className="px-3 py-2 bg-accent/20 text-center">
          <span className="text-xs text-accent-foreground flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            {voiceStatus}
          </span>
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-border bg-background">
        <div className="flex gap-2">
          <Button
            onClick={toggleVoiceInput}
            size="icon"
            variant={isListening ? "destructive" : "outline"}
            className={`shrink-0 ${isListening ? "animate-pulse" : ""}`}
            title={isListening ? "Stop listening" : "Start voice input"}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type or speak your message..."
            className="min-h-[44px] max-h-[120px] resize-none"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIChatModal;
