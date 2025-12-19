import { Building2 } from "lucide-react";

// Import partner logos
import tcsLogo from "@/assets/partners/tcs-logo.png";
import infosysLogo from "@/assets/partners/infosys-logo.png";
import wiproLogo from "@/assets/partners/wipro-logo.png";
import hclLogo from "@/assets/partners/hcl-logo.png";
import cognizantLogo from "@/assets/partners/cognizant-logo.png";
import apolloLogo from "@/assets/partners/apollo-logo.png";
import foxconnLogo from "@/assets/partners/foxconn-logo.jpg";

const partners = [
  { name: "TCS", logo: tcsLogo },
  { name: "Infosys", logo: infosysLogo },
  { name: "Wipro", logo: wiproLogo },
  { name: "HCL", logo: hclLogo },
  { name: "Cognizant", logo: cognizantLogo },
  { name: "Apollo Hospitals", logo: apolloLogo },
  { name: "Sakthi Auto Components", logo: null },
  { name: "Foxconn", logo: foxconnLogo },
  { name: "Premier Pvt Ltd", logo: null },
  { name: "Rinex", logo: null },
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
              key={partner.name}
              className="group px-6 py-4 bg-white/5 backdrop-blur-sm border-2 border-primary-foreground/20 rounded-2xl hover:border-amber-400/50 hover:bg-white/10 transition-all duration-300 animate-fade-up flex items-center gap-3 min-w-[160px] justify-center"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {partner.logo ? (
                <div className="h-8 flex items-center">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`}
                    className="h-6 md:h-8 w-auto max-w-[120px] object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary-foreground/60 group-hover:text-amber-400 transition-colors" />
                  <span className="text-primary-foreground font-medium group-hover:text-amber-400 transition-colors">
                    {partner.name}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
