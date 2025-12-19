const partners = [
  "TCS",
  "Infosys",
  "Wipro",
  "HCL",
  "Cognizant",
  "Apollo Hospitals",
  "Sakthi Auto Components",
  "Foxconn",
  "Premier Pvt Ltd",
  "Rinex",
];

const PartnersSection = () => {
  return (
    <section className="py-16 md:py-20 bg-jkkn-dark">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-2xl font-semibold tracking-widest text-primary-foreground mb-4">
            RECRUITING PARTNERS
          </h2>
          <p className="text-primary-foreground/70">
            A growing network of companies hiring JKKN Learners across IT, healthcare, banking, retail and more.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {partners.map((partner, index) => (
            <div
              key={partner}
              className="px-8 py-4 border-2 border-primary-foreground/30 rounded-full text-primary-foreground font-medium hover:border-accent hover:text-accent transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
