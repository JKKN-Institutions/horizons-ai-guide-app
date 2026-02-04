import { Bell, MessageSquareText, Moon, Sun, Monitor, Check, Sparkles, GraduationCap, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserMenu from "@/components/UserMenu";
import GlobalLanguageSelector from "@/components/GlobalLanguageSelector";
import { useAuth } from "@/hooks/useAuth";
import { useChatModal } from "@/hooks/useChatModal";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const inspirationalMessages = [
  { text: "உனது கனவை நோக்கி பயணி", icon: Target, translation: "Journey towards your dream" },
  { text: "கல்வியே உன் சக்தி", icon: GraduationCap, translation: "Education is your power" },
  { text: "வெற்றி உனக்கானது", icon: TrendingUp, translation: "Success awaits you" },
  { text: "முயற்சி திருவினையாக்கும்", icon: Sparkles, translation: "Effort leads to success" },
];

const TopBar = () => {
  const { user } = useAuth();
  const { openChat } = useChatModal();
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [messageIndex, setMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % inspirationalMessages.length);
        setIsVisible(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentMessage = inspirationalMessages[messageIndex];
  const IconComponent = currentMessage.icon;

  return (
    <div className="bg-primary text-primary-foreground py-2 px-4 md:px-8">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center font-serif font-bold text-accent-foreground text-sm">
            வ
          </div>
          <span className="text-xs opacity-80 hidden md:inline border-l border-primary-foreground/30 pl-3">
            {t('topbar.careerPath')}
          </span>
        </div>
        
        {/* Inspirational Message - Center */}
        <div 
          className={`hidden sm:flex items-center gap-2 text-xs transition-all duration-300 ${
            isVisible ? 'opacity-80 translate-y-0' : 'opacity-0 -translate-y-1'
          }`}
        >
          <IconComponent className="w-3.5 h-3.5 text-accent" />
          <span className="font-medium">{currentMessage.text}</span>
          <span className="text-primary-foreground/50 text-[10px]">• {currentMessage.translation}</span>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <GlobalLanguageSelector />
          
          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Moon className="w-4 h-4" />
                ) : theme === 'system' ? (
                  <Monitor className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[140px] bg-background border shadow-lg z-50">
              <DropdownMenuItem onClick={() => setTheme('light')} className="gap-2 cursor-pointer justify-between">
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>Light</span>
                </div>
                {theme === 'light' && <Check className="w-4 h-4 text-emerald-600" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')} className="gap-2 cursor-pointer justify-between">
                <div className="flex items-center gap-2">
                  <Moon className="w-4 h-4 text-slate-600" />
                  <span>Dark</span>
                </div>
                {theme === 'dark' && <Check className="w-4 h-4 text-emerald-600" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')} className="gap-2 cursor-pointer justify-between">
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-blue-500" />
                  <span>System</span>
                </div>
                {theme === 'system' && <Check className="w-4 h-4 text-emerald-600" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            size="sm" 
            className="relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium text-xs h-8 px-4 rounded-full shadow-md shadow-amber-500/20 transition-all duration-300 hover:shadow-lg"
            onClick={openChat}
          >
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <MessageSquareText className="w-3.5 h-3.5 mr-1.5" />
            {t('topbar.aiChat')}
          </Button>
          <button className="relative p-2 hover:bg-primary-foreground/10 rounded-full transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
          </button>
          
          {user ? (
            <UserMenu />
          ) : (
            <>
              <Link to="/auth">
                <span className="text-sm hover:underline hidden sm:inline cursor-pointer">{t('topbar.login')}</span>
              </Link>
              <Link to="/auth">
                <Button 
                  size="sm" 
                  className="bg-jkkn-green-light hover:bg-jkkn-green-light/80 text-primary-foreground text-xs h-8"
                >
                  {t('topbar.register')}
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
