const Footer = () => {
  return (
    <footer className="bg-primary py-8" id="contact">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-serif text-xl font-bold italic text-primary-foreground mb-2">
              JKKN AI Horizons: Discover, Design, Do
            </h3>
            <p className="text-sm text-primary-foreground/70">
              © 2025 J.K.K. Nattraja Institutions. All Rights Reserved.
            </p>
          </div>

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
    </footer>
  );
};

export default Footer;
