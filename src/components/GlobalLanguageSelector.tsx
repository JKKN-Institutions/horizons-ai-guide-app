import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useLanguage, type Language, SUPPORTED_LANGUAGES } from "@/hooks/useLanguage";

const GlobalLanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, right: 0 });

  // Calculate dropdown position from button
  const updatePos = useCallback(() => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPos({
        top: rect.bottom + 4,
        right: window.innerWidth - rect.right,
      });
    }
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        btnRef.current && !btnRef.current.contains(target) &&
        menuRef.current && !menuRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    // Use timeout so the opening click doesn't immediately close it
    const timer = setTimeout(() => {
      document.addEventListener("click", handler);
    }, 10);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handler);
    };
  }, [open]);

  // Close on scroll/resize
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [open]);

  const handleToggle = () => {
    if (!open) updatePos();
    setOpen(prev => !prev);
  };

  const handleSelect = (code: Language) => {
    // Close first, then change language
    setOpen(false);
    // Small delay so the portal unmounts cleanly before re-render
    requestAnimationFrame(() => {
      setLanguage(code);
    });
  };

  const dropdown = open
    ? createPortal(
        <div
          ref={menuRef}
          style={{
            position: "fixed",
            top: pos.top,
            right: pos.right,
            zIndex: 99999,
          }}
          className="w-[220px] bg-white border border-gray-200 rounded-lg shadow-2xl max-h-[400px] overflow-y-auto p-1"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelect(lang.code)}
              className={`w-full flex items-center justify-between gap-2 py-3 px-4 rounded-md transition-colors text-left cursor-pointer ${
                language === lang.code
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
              {language === lang.code && (
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={handleToggle}
        className="h-8 px-2 flex items-center gap-1.5 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-md text-sm transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="text-xs font-medium uppercase">{language}</span>
        <ChevronDown className={`w-3 h-3 opacity-60 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {dropdown}
    </>
  );
};

export default GlobalLanguageSelector;
