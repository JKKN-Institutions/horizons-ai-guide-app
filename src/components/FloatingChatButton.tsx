import { MessageCircle } from "lucide-react";

const FloatingChatButton = () => {
  return (
    <button
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full shadow-glow flex items-center justify-center transition-all duration-300 hover:scale-110 animate-float"
      aria-label="Open AI Chat"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
};

export default FloatingChatButton;
