import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="h-8 px-2 gap-1.5 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
      title={language === 'en' ? 'Switch to Tamil' : 'Switch to English'}
    >
      <Languages className="w-4 h-4" />
      <span className="text-xs font-medium">
        {language === 'en' ? 'தமிழ்' : 'EN'}
      </span>
    </Button>
  );
};

export default LanguageToggle;
