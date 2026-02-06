import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export const WizardProgress = ({ currentStep, totalSteps, stepLabels }: WizardProgressProps) => {
  return (
    <div className="w-full mb-8">
      {/* Step indicators */}
      <div className="flex items-center justify-between max-w-xl mx-auto mb-2">
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNum = i + 1;
          const isComplete = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <motion.div
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                    isComplete
                      ? "bg-primary border-primary text-primary-foreground"
                      : isCurrent
                      ? "border-primary text-primary bg-primary/10"
                      : "border-muted-foreground/30 text-muted-foreground bg-muted/50"
                  }`}
                  animate={isCurrent ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {isComplete ? <Check className="h-4 w-4" /> : stepNum}
                </motion.div>
                <span className={`text-[10px] mt-1 text-center leading-tight hidden sm:block ${
                  isCurrent ? "text-primary font-semibold" : "text-muted-foreground"
                }`}>
                  {stepLabels[i]}
                </span>
              </div>
              {i < totalSteps - 1 && (
                <div className={`flex-1 h-0.5 mx-1 rounded-full transition-all ${
                  isComplete ? "bg-primary" : "bg-muted-foreground/20"
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WizardProgress;
