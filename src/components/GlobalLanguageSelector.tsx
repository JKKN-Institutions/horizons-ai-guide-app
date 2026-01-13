import { Globe, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage, type Language, SUPPORTED_LANGUAGES } from "@/hooks/useLanguage";

const GlobalLanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 gap-1.5 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
        >
          <Globe className="w-4 h-4" />
          <span className="text-xs font-medium uppercase">{language}</span>
          <ChevronDown className="w-3 h-3 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-[200px] bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-[100] max-h-[400px] overflow-y-auto p-1"
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center justify-between gap-2 cursor-pointer py-3 px-4 rounded-md transition-colors ${
              language === lang.code 
                ? 'bg-emerald-50 text-emerald-700' 
                : 'hover:bg-[#F3F4F6]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base">{lang.flag}</span>
              <span className="text-sm font-medium">
                {lang.nativeName} <span className="text-muted-foreground font-normal">({lang.name})</span>
              </span>
            </div>
            {language === lang.code && (
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GlobalLanguageSelector;
