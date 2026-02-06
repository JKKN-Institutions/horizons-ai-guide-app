import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface InterestAssessmentProps {
  selectedInterests: string[];
  onToggleInterest: (id: string) => void;
}

const interests = [
  { id: "tech", icon: "💻", label: "Technology & Coding", description: "Building apps, websites, AI" },
  { id: "healthcare", icon: "🏥", label: "Healthcare & Medicine", description: "Helping patients, saving lives" },
  { id: "finance", icon: "💰", label: "Business & Finance", description: "Money management, entrepreneurship" },
  { id: "design", icon: "🎨", label: "Creative & Design", description: "Art, graphics, user experience" },
  { id: "research", icon: "🔬", label: "Research & Science", description: "Discovery, experiments, innovation" },
  { id: "govt", icon: "🏛️", label: "Government & Public Service", description: "Serving the nation" },
  { id: "travel", icon: "✈️", label: "Travel & Hospitality", description: "Tourism, hotels, airlines" },
  { id: "media", icon: "📱", label: "Social Media & Content", description: "Creating videos, influencing" },
  { id: "engineering", icon: "🏗️", label: "Building & Engineering", description: "Construction, machines" },
  { id: "law", icon: "⚖️", label: "Law & Justice", description: "Courts, legal rights, advocacy" },
  { id: "environment", icon: "🌱", label: "Environment & Sustainability", description: "Climate, conservation" },
  { id: "education", icon: "🎓", label: "Teaching & Education", description: "Shaping young minds" },
];

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.04 } }
};

const itemVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 }
};

export const InterestAssessment = ({ selectedInterests, onToggleInterest }: InterestAssessmentProps) => {
  const maxSelections = 3;
  const canSelect = selectedInterests.length < maxSelections;

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-1">💡 What Interests You Most?</h2>
        <p className="text-sm text-muted-foreground">உங்களுக்கு எது மிகவும் ஆர்வமாக உள்ளது?</p>
        <p className="text-xs text-muted-foreground mt-2">Select up to 3 areas that excite you</p>
      </div>

      <div className="flex justify-center mb-4">
        <Badge variant="outline" className={`text-sm px-4 py-1 ${
          selectedInterests.length === maxSelections ? "bg-primary/10 text-primary border-primary/30" : ""
        }`}>
          Selected: {selectedInterests.length}/{maxSelections}
        </Badge>
      </div>

      <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-3" variants={containerVariants}>
        {interests.map((interest) => {
          const isSelected = selectedInterests.includes(interest.id);
          const isDisabled = !isSelected && !canSelect;

          return (
            <motion.div key={interest.id} variants={itemVariants}>
              <Card
                className={`cursor-pointer transition-all duration-300 h-full ${
                  isSelected
                    ? "border-2 border-primary bg-primary/5 shadow-md"
                    : isDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:border-primary/30 hover:bg-muted/50"
                }`}
                onClick={() => !isDisabled && onToggleInterest(interest.id)}
              >
                <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                  <span className="text-3xl">{interest.icon}</span>
                  <span className="font-semibold text-sm">{interest.label}</span>
                  <span className="text-xs text-muted-foreground leading-tight">{interest.description}</span>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="h-5 w-5 rounded-full bg-primary flex items-center justify-center"
                    >
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default InterestAssessment;
