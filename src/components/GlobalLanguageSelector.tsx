import { Globe, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useLanguage, type Language, SUPPORTED_LANGUAGES } from "@/hooks/useLanguage";

const GlobalLanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === language);

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
        className="min-w-[200px] bg-background border shadow-lg z-[100] max-h-[400px] overflow-y-auto"
      >
        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
          Select Language / மொழியை தேர்வு செய்யவும்
        </div>
        <DropdownMenuSeparator />
        {SUPPORTED_LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className="gap-3 cursor-pointer justify-between py-2.5"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{lang.flag}</span>
              <div className="flex flex-col">
                <span className="font-medium text-sm">{lang.name}</span>
                <span className="text-xs text-muted-foreground">{lang.nativeName}</span>
              </div>
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
