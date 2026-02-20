import { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useLanguage, type Language, SUPPORTED_LANGUAGES } from "@/hooks/useLanguage";

const GlobalLanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="h-8 px-2 flex items-center gap-1.5 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-md text-sm transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="text-xs font-medium uppercase">{language}</span>
        <ChevronDown className={`w-3 h-3 opacity-60 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-[220px] bg-white border border-gray-200 rounded-lg shadow-xl z-[9999] max-h-[400px] overflow-y-auto p-1 animate-in fade-in slide-in-from-top-2 duration-150">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`w-full flex items-center justify-between gap-2 py-3 px-4 rounded-md transition-colors text-left ${
                language === lang.code
                  ? "bg-emerald-50 text-emerald-700"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">{lang.flag}</span>
                <span className="text-sm font-medium">
                  {lang.nativeName}{" "}
                  <span className="text-gray-400 font-normal">({lang.name})</span>
                </span>
              </div>
              {language === lang.code && (
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GlobalLanguageSelector;
