import { Bell, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserMenu from "@/components/UserMenu";
import LanguageToggle from "@/components/LanguageToggle";
import { useAuth } from "@/hooks/useAuth";
import { useChatModal } from "@/hooks/useChatModal";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "react-router-dom";

const TopBar = () => {
  const { user } = useAuth();
  const { openChat } = useChatModal();
  const { t } = useLanguage();

  return (
    <div className="bg-primary text-primary-foreground py-2 px-4 md:px-8">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center font-serif font-bold text-accent-foreground text-sm">
              வ
            </div>
            <span className="font-semibold text-sm hidden sm:inline">வழிகாட்டி</span>
          </div>
          <span className="text-xs opacity-80 hidden md:inline border-l border-primary-foreground/30 pl-3">
            {t('topbar.careerPath')}
          </span>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <LanguageToggle />
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
