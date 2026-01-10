import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/useLanguage";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { label: t('nav.home'), href: "/", isRoute: true },
    { label: t('nav.careerHub'), href: "/jkkn", isRoute: true },
    { label: t('nav.dashboard'), href: "/student-dashboard", isRoute: true },
    { label: t('nav.aboutJkkn'), href: "#about", isRoute: false },
    { label: t('nav.careerGuidance'), href: "#services", isRoute: false },
    { label: t('nav.jobPortal'), href: "#jobs", isRoute: false },
    { label: t('nav.contact'), href: "#contact", isRoute: false },
  ];

  const isActive = (href: string, isRoute: boolean) => {
    if (!isRoute) return false;
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="font-serif text-lg md:text-xl font-semibold text-foreground leading-tight hover:text-primary transition-colors">
              வழிகாட்டி
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) =>
              item.isRoute ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive(item.href, item.isRoute)
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  {item.label}
                </a>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-up">
            {navItems.map((item) =>
              item.isRoute ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className={cn(
                    "block py-3 font-medium transition-colors",
                    isActive(item.href, item.isRoute)
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="block py-3 text-muted-foreground hover:text-foreground transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
