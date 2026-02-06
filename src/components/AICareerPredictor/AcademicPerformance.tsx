import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { tnGroupTaxonomy } from "@/data/tnGroupTaxonomy";

interface AcademicPerformanceProps {
  percentage: string;
  onChangePercentage: (v: string) => void;
  strongestSubject: string;
  onChangeStrongest: (v: string) => void;
  weakestSubject: string;
  onChangeWeakest: (v: string) => void;
  entranceScore: string;
  onChangeEntranceScore: (v: string) => void;
  notAppeared: boolean;
  onChangeNotAppeared: (v: boolean) => void;
  selectedGroup: string;
}

const percentageOptions = [
  { id: "90plus", label: "90%+", description: "Excellent", emoji: "🏆" },
  { id: "80to90", label: "80-90%", description: "Very Good", emoji: "📗" },
  { id: "70to80", label: "70-80%", description: "Good", emoji: "📘" },
  { id: "60to70", label: "60-70%", description: "Average", emoji: "📙" },
  { id: "below60", label: "Below 60%", description: "Below Average", emoji: "📕" },
];

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.06 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 }
};

export const AcademicPerformance = ({
  percentage, onChangePercentage,
  strongestSubject, onChangeStrongest,
  weakestSubject, onChangeWeakest,
  entranceScore, onChangeEntranceScore,
  notAppeared, onChangeNotAppeared,
  selectedGroup
}: AcademicPerformanceProps) => {
  // Determine subjects from selected group
  const getSubjects = (): string[] => {
    for (const section of tnGroupTaxonomy) {
      const group = section.groups.find(g => g.id === selectedGroup);
      if (group) return group.subjects;
    }
    return ["Mathematics", "Physics", "Chemistry", "English"];
  };

  const subjects = getSubjects();

  // Determine if biology or maths group for entrance exam
  const isBiologyGroup = selectedGroup.startsWith("2");
  const isMathsGroup = selectedGroup.startsWith("1");
  const examType = isBiologyGroup ? "NEET" : isMathsGroup ? "JEE" : null;

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-1">📊 Your Academic Performance</h2>
        <p className="text-sm text-muted-foreground">உங்கள் கல்வி செயல்திறன்</p>
      </div>

      {/* Percentage Selection */}
      <motion.div variants={itemVariants} className="space-y-2">
        <p className="font-semibold text-sm">Expected/Actual 12th Percentage</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {percentageOptions.map((opt) => (
            <Card
              key={opt.id}
              className={`cursor-pointer transition-all ${
                percentage === opt.id
                  ? "border-2 border-primary bg-primary/5"
                  : "hover:bg-muted/50"
              }`}
              onClick={() => onChangePercentage(opt.id)}
            >
              <CardContent className="p-3 text-center">
                <span className="text-lg">{opt.emoji}</span>
                <p className="font-semibold text-sm mt-1">{opt.label}</p>
                <p className="text-xs text-muted-foreground">{opt.description}</p>
                {percentage === opt.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="h-4 w-4 rounded-full bg-primary flex items-center justify-center mx-auto mt-1"
                  >
                    <Check className="h-2.5 w-2.5 text-primary-foreground" />
                  </motion.div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Strongest Subject */}
      <motion.div variants={itemVariants} className="space-y-2">
        <p className="font-semibold text-sm">Strongest Subject</p>
        <Select value={strongestSubject} onValueChange={onChangeStrongest}>
          <SelectTrigger>
            <SelectValue placeholder="Select your strongest subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((sub) => (
              <SelectItem key={sub} value={sub}>{sub}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* Weakest Subject */}
      <motion.div variants={itemVariants} className="space-y-2">
        <p className="font-semibold text-sm">Weakest Subject</p>
        <Select value={weakestSubject} onValueChange={onChangeWeakest}>
          <SelectTrigger>
            <SelectValue placeholder="Select your weakest subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.filter(s => s !== strongestSubject).map((sub) => (
              <SelectItem key={sub} value={sub}>{sub}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* Entrance Exam Score (conditional) */}
      {examType && (
        <motion.div variants={itemVariants} className="space-y-3">
          <p className="font-semibold text-sm">{examType} Score</p>
          <div className="flex items-center gap-3">
            <Input
              type="number"
              placeholder={`Enter your ${examType} score (optional)`}
              value={entranceScore}
              onChange={(e) => onChangeEntranceScore(e.target.value)}
              disabled={notAppeared}
              className="flex-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="not-appeared"
              checked={notAppeared}
              onCheckedChange={(checked) => onChangeNotAppeared(!!checked)}
            />
            <label htmlFor="not-appeared" className="text-sm text-muted-foreground cursor-pointer">
              Not yet appeared
            </label>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AcademicPerformance;
