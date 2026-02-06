import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SituationFormProps {
  budget: string;
  location: string;
  duration: string;
  examReadiness: string;
  onChangeBudget: (v: string) => void;
  onChangeLocation: (v: string) => void;
  onChangeDuration: (v: string) => void;
  onChangeExamReadiness: (v: string) => void;
}

const budgetOptions = [
  { id: "below2", icon: "💵", label: "Below ₹2 Lakhs/year" },
  { id: "2to5", icon: "💵💵", label: "₹2-5 Lakhs/year" },
  { id: "5to10", icon: "💵💵💵", label: "₹5-10 Lakhs/year" },
  { id: "10to20", icon: "💵💵💵💵", label: "₹10-20 Lakhs/year" },
  { id: "noconstraint", icon: "💎", label: "No constraint" },
];

const locationOptions = [
  { id: "home", icon: "🏠", label: "Home District" },
  { id: "tamilnadu", icon: "🗺️", label: "Anywhere in Tamil Nadu" },
  { id: "southindia", icon: "🌏", label: "South India" },
  { id: "india", icon: "🇮🇳", label: "Anywhere in India" },
  { id: "abroad", icon: "✈️", label: "Abroad also OK" },
];

const durationOptions = [
  { id: "short", icon: "⚡", label: "2-3 Years (Quick Job)" },
  { id: "standard", icon: "📚", label: "4 Years (Standard)" },
  { id: "long", icon: "🎓", label: "5+ Years OK (Long-term)" },
];

const examOptions = [
  { id: "ready", icon: "🎯", label: "Ready for NEET/JEE" },
  { id: "moderate", icon: "📊", label: "Moderate Competition OK" },
  { id: "direct", icon: "🚪", label: "Prefer Direct Admission" },
];

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 }
};

interface OptionGroupProps {
  title: string;
  options: { id: string; icon: string; label: string }[];
  selected: string;
  onSelect: (v: string) => void;
}

const OptionGroup = ({ title, options, selected, onSelect }: OptionGroupProps) => (
  <div className="space-y-2">
    <p className="font-semibold text-sm">{title}</p>
    <div className="grid gap-2">
      {options.map((opt) => (
        <Card
          key={opt.id}
          className={`cursor-pointer transition-all ${
            selected === opt.id
              ? "border-2 border-primary bg-primary/5"
              : "hover:bg-muted/50"
          }`}
          onClick={() => onSelect(opt.id)}
        >
          <CardContent className="p-3 flex items-center gap-3">
            <span className="text-lg">{opt.icon}</span>
            <span className="text-sm flex-1">{opt.label}</span>
            {selected === opt.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="h-5 w-5 rounded-full bg-primary flex items-center justify-center shrink-0"
              >
                <Check className="h-3 w-3 text-primary-foreground" />
              </motion.div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export const SituationForm = ({
  budget, location, duration, examReadiness,
  onChangeBudget, onChangeLocation, onChangeDuration, onChangeExamReadiness
}: SituationFormProps) => {
  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-1">📋 Tell Us About Your Situation</h2>
        <p className="text-sm text-muted-foreground">உங்கள் நிலை பற்றி சொல்லுங்கள்</p>
      </div>

      <motion.div variants={itemVariants}>
        <OptionGroup title="Family's Education Budget (per year)" options={budgetOptions} selected={budget} onSelect={onChangeBudget} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <OptionGroup title="Preferred Study Location" options={locationOptions} selected={location} onSelect={onChangeLocation} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <OptionGroup title="Course Duration Preference" options={durationOptions} selected={duration} onSelect={onChangeDuration} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <OptionGroup title="Competitive Exam Readiness" options={examOptions} selected={examReadiness} onSelect={onChangeExamReadiness} />
      </motion.div>
    </motion.div>
  );
};

export default SituationForm;
