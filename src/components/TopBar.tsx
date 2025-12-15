import { Bell, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const TopBar = () => {
  return (
    <div className="bg-primary text-primary-foreground py-2 px-4 md:px-8">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center font-serif font-bold text-accent-foreground text-sm">
              J
            </div>
            <span className="font-semibold text-sm hidden sm:inline">JKKN AI Horizons</span>
          </div>
          <span className="text-xs opacity-80 hidden md:inline border-l border-primary-foreground/30 pl-3">
            JKKN CAREER PATH - 2026-2032
          </span>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button 
            size="sm" 
            className="bg-jkkn-green-light hover:bg-jkkn-green-light/80 text-primary-foreground text-xs h-8"
          >
            <MessageCircle className="w-3 h-3 mr-1" />
            AI Chat
          </Button>
          <button className="relative p-2 hover:bg-primary-foreground/10 rounded-full transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
          </button>
          <a href="#" className="text-sm hover:underline hidden sm:inline">Login</a>
          <Button 
            size="sm" 
            className="bg-jkkn-green-light hover:bg-jkkn-green-light/80 text-primary-foreground text-xs h-8"
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
