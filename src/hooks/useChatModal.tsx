import { createContext, useContext, useState, ReactNode } from "react";

interface ChatModalContextType {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
}

const ChatModalContext = createContext<ChatModalContextType | undefined>(undefined);

export const ChatModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);
  const toggleChat = () => setIsOpen(prev => !prev);

  return (
    <ChatModalContext.Provider value={{ isOpen, openChat, closeChat, toggleChat }}>
      {children}
    </ChatModalContext.Provider>
  );
};

export const useChatModal = () => {
  const context = useContext(ChatModalContext);
  if (context === undefined) {
    throw new Error("useChatModal must be used within a ChatModalProvider");
  }
  return context;
};
