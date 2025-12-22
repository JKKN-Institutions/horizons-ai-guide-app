import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/jkkn", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/jkkn", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/jkkn", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/jkkn", label: "YouTube" },
];

const Footer = () => {
  return (
    <footer className="bg-primary py-8" id="contact">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-serif text-xl font-bold italic text-primary-foreground mb-1">
              JKKN AI Horizons: Discover, Design, Do
            </h3>
            <p className="text-xs text-primary-foreground/60 mb-2">
              70+ Years of Excellence in Education & Healthcare
            </p>
            <p className="text-sm text-primary-foreground/70">
              © 2025 J.K.K. Nattraja Institutions. All Rights Reserved.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/70 hover:bg-primary-foreground/20 hover:text-primary-foreground transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-6">
              <a href="#about" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                About JKKN
              </a>
              <a href="#events" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Events
              </a>
              <a href="#contact" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Contact
              </a>
              <span className="text-primary-foreground/30">|</span>
              <a href="/admin/login" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Admin
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
