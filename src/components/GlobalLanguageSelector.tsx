import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Globe, Check, ChevronDown } from "lucide-react";

type LangCode = 'en' | 'ta' | 'hi' | 'te' | 'kn' | 'ml' | 'bn' | 'mr' | 'gu' | 'pa';

const LANGUAGES: Array<{ code: LangCode; name: string; nativeName: string; flag: string }> = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
];

function getSavedLang(): LangCode {
  try {
    const saved = localStorage.getItem('jkkn_language');
    if (saved && LANGUAGES.some(l => l.code === saved)) return saved as LangCode;
  } catch {}
  return 'en';
}

const GlobalLanguageSelector = () => {
  const [selected, setSelected] = useState<LangCode>(getSavedLang);
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, right: 0 });

  const updatePos = useCallback(() => {
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 4, right: window.innerWidth - r.right });
    }
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (btnRef.current && !btnRef.current.contains(t) && menuRef.current && !menuRef.current.contains(t)) {
        setOpen(false);
      }
    };
    const timer = setTimeout(() => document.addEventListener("click", handler), 10);
    return () => { clearTimeout(timer); document.removeEventListener("click", handler); };
  }, [open]);

  // Close on scroll
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("scroll", close, true);
    return () => window.removeEventListener("scroll", close, true);
  }, [open]);

  const handleSelect = (code: LangCode) => {
    setOpen(false);
    if (code === selected) return;
    
    // Save choice
    setSelected(code);
    localStorage.setItem('jkkn_language', code);
    
    // Trigger Google Translate
    if (typeof (window as any).changeLanguage === 'function') {
      (window as any).changeLanguage(code);
    }
  };

  const handleToggle = () => {
    if (!open) updatePos();
    setOpen(prev => !prev);
  };

  const currentLang = LANGUAGES.find(l => l.code === selected) || LANGUAGES[0];

  const dropdown = open ? createPortal(
    <div
      ref={menuRef}
      className="notranslate"
      style={{ position: "fixed", top: pos.top, right: pos.right, zIndex: 99999 }}
    >
      <div className="w-[220px] bg-white border border-gray-200 rounded-lg shadow-2xl max-h-[420px] overflow-y-auto p-1">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => handleSelect(lang.code)}
            className={`w-full flex items-center justify-between gap-2 py-3 px-4 rounded-md transition-colors text-left cursor-pointer ${
              selected === lang.code
                ? "bg-emerald-50 text-emerald-700"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base">{lang.flag}</span>
              <span className="text-sm font-medium">
                {lang.nativeName}{" "}
                <span className="text-gray-400 font-normal">({lang.name})</span>
              </span>
            </div>
            {selected === lang.code && (
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            )}
          </button>
        ))}
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <div className="notranslate">
      <button
        ref={btnRef}
        type="button"
        onClick={handleToggle}
        className="h-8 px-2 flex items-center gap-1.5 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-md text-sm transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="text-xs font-medium uppercase">{selected}</span>
        <ChevronDown className={`w-3 h-3 opacity-60 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {dropdown}
    </div>
  );
};

export default GlobalLanguageSelector;
