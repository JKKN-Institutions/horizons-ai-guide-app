import { memo, forwardRef } from "react";
import { MessageCircle, X } from "lucide-react";
import { useChatModal } from "@/hooks/useChatModal";
import AIChatModal from "./AIChatModal";

const FloatingChatButton = memo(forwardRef<HTMLDivElement>((_, ref) => {
  const { isOpen, toggleChat, closeChat } = useChatModal();

  return (
    <div ref={ref}>
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full shadow-glow flex items-center justify-center transition-all duration-300 hover:scale-110 animate-float"
        aria-label={isOpen ? "Close AI Chat" : "Open AI Chat"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
      <AIChatModal isOpen={isOpen} onClose={closeChat} />
    </div>
  );
}));

FloatingChatButton.displayName = "FloatingChatButton";

export default FloatingChatButton;
