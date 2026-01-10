import { Building2, Sparkles, Handshake } from "lucide-react";

// Import partner logos
import tcsLogo from "@/assets/partners/tcs-logo.png";
import infosysLogo from "@/assets/partners/infosys-logo.png";
import wiproLogo from "@/assets/partners/wipro-logo.png";
import hclLogo from "@/assets/partners/hcl-logo.png";
import cognizantLogo from "@/assets/partners/cognizant-logo.png";
import apolloLogo from "@/assets/partners/apollo-logo.png";
import foxconnLogo from "@/assets/partners/foxconn-logo.jpg";
import sakthiLogo from "@/assets/partners/sakthi-auto-logo.png";
import premierLogo from "@/assets/partners/premier-logo.png";

const partners = [
  { name: "TCS", logo: tcsLogo },
  { name: "Infosys", logo: infosysLogo },
  { name: "Wipro", logo: wiproLogo },
  { name: "HCL", logo: hclLogo },
  { name: "Cognizant", logo: cognizantLogo },
  { name: "Apollo Hospitals", logo: apolloLogo },
  { name: "Sakthi Auto Components", logo: sakthiLogo },
  { name: "Foxconn", logo: foxconnLogo },
  { name: "Premier Pvt Ltd", logo: premierLogo },
  { name: "Rinex", logo: null },
];

const PartnersSection = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-green-900 to-emerald-950">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.02%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-400/10 to-orange-500/5 rounded-full blur-3xl transform -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tr from-emerald-400/10 to-teal-500/5 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-14 animate-fade-up">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-300 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-amber-400/30">
            <Handshake className="w-4 h-4" />
            Industry Connections
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-white mb-4">
            RECRUITING PARTNERS
          </h2>
          <p className="text-emerald-100/70 max-w-2xl mx-auto text-lg">
            A growing network of companies hiring our learners across IT, healthcare, manufacturing, and more.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:bg-white/20 hover:border-amber-400/40 transition-all duration-500 animate-fade-up hover:scale-105 hover:shadow-xl hover:shadow-amber-500/10"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/0 to-orange-500/0 group-hover:from-amber-400/10 group-hover:to-orange-500/5 transition-all duration-500" />
              
              <div className="relative flex flex-col items-center justify-center h-20">
                {partner.logo ? (
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`}
                    className="h-10 md:h-12 w-auto max-w-[130px] object-contain brightness-0 invert opacity-70 group-hover:opacity-100 transition-all duration-300"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center group-hover:from-amber-400/40 group-hover:to-orange-500/40 transition-all duration-300">
                      <Building2 className="w-5 h-5 text-amber-300/80 group-hover:text-amber-300 transition-colors" />
                    </div>
                    <span className="text-white/80 text-sm font-medium text-center group-hover:text-amber-300 transition-colors">
                      {partner.name}
                    </span>
                  </div>
                )}
              </div>

              {/* Partner name tooltip on hover for logo partners */}
              {partner.logo && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-0 transition-all duration-300 pointer-events-none">
                  <span className="bg-gray-900/90 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                    {partner.name}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { value: "50+", label: "Partner Companies" },
            { value: "1000+", label: "Placements" },
            { value: "100%", label: "Industry Ready" },
          ].map((stat, index) => (
            <div key={index} className="text-center animate-fade-up" style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
              <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-1">{stat.value}</div>
              <div className="text-emerald-200/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Decorative element */}
        <div className="flex justify-center mt-12">
          <div className="inline-flex items-center gap-2 text-emerald-300/50 text-sm">
            <Sparkles className="w-4 h-4" />
            <span>And many more industry leaders</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
