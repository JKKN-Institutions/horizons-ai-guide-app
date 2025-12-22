import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Building2, Users, Star, TrendingUp, MapPin, Globe, Briefcase, Award } from "lucide-react";

interface CompanyInsightsProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
}

// Mock company data - in production, this would come from an API
const companyData: Record<string, {
  industry: string;
  size: string;
  founded: string;
  headquarters: string;
  website: string;
  rating: number;
  reviewCount: number;
  description: string;
  culture: string[];
  benefits: string[];
  interviewDifficulty: string;
  recommendToFriend: number;
}> = {
  "Infosys": {
    industry: "IT Services & Consulting",
    size: "300,000+ employees",
    founded: "1981",
    headquarters: "Bangalore, India",
    website: "infosys.com",
    rating: 3.8,
    reviewCount: 42500,
    description: "Global leader in next-generation digital services and consulting.",
    culture: ["Work-life balance", "Learning opportunities", "Diverse workforce"],
    benefits: ["Health insurance", "ESOPs", "Flexible work", "Learning platforms"],
    interviewDifficulty: "Medium",
    recommendToFriend: 72
  },
  "Wipro": {
    industry: "IT Services & Consulting",
    size: "250,000+ employees",
    founded: "1945",
    headquarters: "Bangalore, India",
    website: "wipro.com",
    rating: 3.7,
    reviewCount: 38000,
    description: "Leading global information technology, consulting and business process services company.",
    culture: ["Innovation-focused", "Employee development", "Sustainability"],
    benefits: ["Medical coverage", "Retirement plans", "Sabbatical leave", "Gym facilities"],
    interviewDifficulty: "Medium",
    recommendToFriend: 68
  },
  "Google": {
    industry: "Technology",
    size: "180,000+ employees",
    founded: "1998",
    headquarters: "Mountain View, USA",
    website: "google.com",
    rating: 4.5,
    reviewCount: 85000,
    description: "Multinational technology company specializing in Internet-related services.",
    culture: ["Innovation", "Openness", "20% time projects", "Flat hierarchy"],
    benefits: ["Free meals", "Unlimited PTO", "Parental leave", "Wellness programs"],
    interviewDifficulty: "Hard",
    recommendToFriend: 92
  },
  "TCS": {
    industry: "IT Services & Consulting",
    size: "600,000+ employees",
    founded: "1968",
    headquarters: "Mumbai, India",
    website: "tcs.com",
    rating: 3.9,
    reviewCount: 65000,
    description: "India's largest IT services company and a global leader in technology services.",
    culture: ["Stability", "Career growth", "Training programs", "Global exposure"],
    benefits: ["Health insurance", "Performance bonuses", "Gratuity", "Transport allowance"],
    interviewDifficulty: "Medium",
    recommendToFriend: 75
  },
  "Microsoft": {
    industry: "Technology",
    size: "220,000+ employees",
    founded: "1975",
    headquarters: "Redmond, USA",
    website: "microsoft.com",
    rating: 4.4,
    reviewCount: 72000,
    description: "Technology corporation that develops and supports software, services, and devices.",
    culture: ["Growth mindset", "Inclusion", "Innovation", "Collaboration"],
    benefits: ["Stock options", "Health & wellness", "Education assistance", "Family support"],
    interviewDifficulty: "Hard",
    recommendToFriend: 89
  },
  "Amazon": {
    industry: "E-Commerce & Cloud",
    size: "1,500,000+ employees",
    founded: "1994",
    headquarters: "Seattle, USA",
    website: "amazon.com",
    rating: 3.9,
    reviewCount: 120000,
    description: "World's largest online retailer and cloud computing provider.",
    culture: ["Customer obsession", "Ownership", "High bar for hiring", "Frugality"],
    benefits: ["Career choice", "Stock grants", "Parental leave", "Health insurance"],
    interviewDifficulty: "Hard",
    recommendToFriend: 71
  },
  "Razorpay": {
    industry: "FinTech",
    size: "3,000+ employees",
    founded: "2014",
    headquarters: "Bangalore, India",
    website: "razorpay.com",
    rating: 4.2,
    reviewCount: 1800,
    description: "India's leading payment gateway and financial services company.",
    culture: ["Fast-paced", "Startup vibes", "Learning culture", "Ownership"],
    benefits: ["ESOPs", "Flexible hours", "Health coverage", "Learning budget"],
    interviewDifficulty: "Medium-Hard",
    recommendToFriend: 85
  },
  "Flipkart": {
    industry: "E-Commerce",
    size: "50,000+ employees",
    founded: "2007",
    headquarters: "Bangalore, India",
    website: "flipkart.com",
    rating: 4.0,
    reviewCount: 12000,
    description: "India's leading e-commerce marketplace.",
    culture: ["Customer first", "Innovation", "Bold decisions", "Teamwork"],
    benefits: ["ESOPs", "Health insurance", "Flexible work", "Career growth"],
    interviewDifficulty: "Medium",
    recommendToFriend: 78
  }
};

// Default company data for unknown companies
const defaultCompany = {
  industry: "Technology",
  size: "1,000+ employees",
  founded: "2010",
  headquarters: "India",
  website: "company.com",
  rating: 3.8,
  reviewCount: 500,
  description: "A growing company in the technology sector.",
  culture: ["Professional environment", "Growth opportunities"],
  benefits: ["Health insurance", "Performance bonuses"],
  interviewDifficulty: "Medium",
  recommendToFriend: 70
};

export const CompanyInsightsModal = ({ isOpen, onClose, companyName }: CompanyInsightsProps) => {
  const company = companyData[companyName] || defaultCompany;
  
  const getRatingColor = (rating: number) => {
    if (rating >= 4.0) return "text-green-600";
    if (rating >= 3.5) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold text-lg">
              {companyName.charAt(0)}
            </div>
            {companyName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Rating Overview */}
          <div className="flex items-center gap-6 p-4 bg-muted rounded-xl">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getRatingColor(company.rating)}`}>
                {company.rating}
              </div>
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(company.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {company.reviewCount.toLocaleString()} reviews
              </p>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Recommend to friend</span>
                <span className="font-semibold text-green-600">{company.recommendToFriend}%</span>
              </div>
              <div className="w-full h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${company.recommendToFriend}%` }}
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-muted-foreground">Interview Difficulty</span>
                <span className="font-medium">{company.interviewDifficulty}</span>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-background border border-border rounded-lg">
              <Building2 className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Industry</p>
                <p className="font-medium text-sm">{company.industry}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-background border border-border rounded-lg">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Company Size</p>
                <p className="font-medium text-sm">{company.size}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-background border border-border rounded-lg">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Headquarters</p>
                <p className="font-medium text-sm">{company.headquarters}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-background border border-border rounded-lg">
              <TrendingUp className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Founded</p>
                <p className="font-medium text-sm">{company.founded}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              About
            </h3>
            <p className="text-sm text-muted-foreground">{company.description}</p>
          </div>

          {/* Culture */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-primary" />
              Work Culture
            </h3>
            <div className="flex flex-wrap gap-2">
              {company.culture.map((item, i) => (
                <span key={i} className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" />
              Benefits & Perks
            </h3>
            <div className="flex flex-wrap gap-2">
              {company.benefits.map((benefit, i) => (
                <span key={i} className="px-3 py-1.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyInsightsModal;
