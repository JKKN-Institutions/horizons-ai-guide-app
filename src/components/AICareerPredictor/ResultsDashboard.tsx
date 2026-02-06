import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ArrowLeft, Sparkles, Download, Share2, RotateCcw, GitCompare, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import CareerRoadmap from "./CareerRoadmap";
import ActionItems from "./ActionItems";

interface CareerPrediction {
  career: string;
  matchScore: number;
  icon: string;
  color: string;
  description: string;
  avgSalary: string;
  growthRate: string;
  workLifeBalance?: number;
  jobDemand?: number;
  entryDifficulty?: number;
  topSkills?: string[];
  educationRequired?: string;
}

interface SkillRecommendation {
  skill: string;
  importance: number;
  currentLevel: number;
  resources: string[];
}

interface ResultsDashboardProps {
  predictions: CareerPrediction[];
  skills: SkillRecommendation[];
  stream: string;
  selectedGroup: string;
  onBack: () => void;
  onRetake: () => void;
}

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

const rankStyles = [
  { border: "border-amber-400 ring-2 ring-amber-200", label: "#1 Match", labelBg: "bg-amber-500", gradient: "from-amber-50 to-yellow-50" },
  { border: "border-slate-300 ring-2 ring-slate-200", label: "#2 Match", labelBg: "bg-slate-500", gradient: "from-slate-50 to-gray-50" },
  { border: "border-orange-400 ring-2 ring-orange-200", label: "#3 Match", labelBg: "bg-orange-600", gradient: "from-orange-50 to-amber-50" },
];

export const ResultsDashboard = ({
  predictions, skills, stream, selectedGroup, onBack, onRetake
}: ResultsDashboardProps) => {
  const [showAllMatches, setShowAllMatches] = useState(false);

  useEffect(() => {
    // Trigger confetti on mount
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#FFD700', '#FFA500', '#FF6347', '#32CD32', '#1E90FF', '#9370DB'],
    });
  }, []);

  const topPredictions = predictions.slice(0, 3);
  const remainingPredictions = predictions.slice(3);
  const topCareer = predictions[0]?.career || "Your Career";

  const handleShare = (method: 'whatsapp' | 'email') => {
    const text = `🎯 My AI Career Analysis Results!\n\nTop Match: ${predictions[0]?.career} (${predictions[0]?.matchScore}%)\n\nCheck yours at: ${window.location.origin}/career-assessment/colleges`;
    if (method === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    } else {
      window.open(`mailto:?subject=My Career Predictions&body=${encodeURIComponent(text)}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI Analysis Complete</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">🎉 Your AI Career Analysis is Ready!</h1>
          <p className="text-muted-foreground">Generated on {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

          {/* Share Buttons */}
          <div className="flex justify-center gap-3 mt-4">
            <Button variant="outline" size="sm" onClick={() => handleShare('whatsapp')} className="gap-2">
              📱 WhatsApp
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleShare('email')} className="gap-2">
              📧 Email
            </Button>
          </div>
        </motion.div>

        {/* Section 1: Top Career Matches */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="mb-12"
        >
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="text-2xl">🏆</span> Top Career Matches
          </h2>

          <div className="grid gap-4 md:grid-cols-3 mb-4">
            {topPredictions.map((prediction, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className={`relative overflow-hidden h-full ${rankStyles[index]?.border || ''} bg-gradient-to-br ${rankStyles[index]?.gradient || ''}`}>
                  <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-bold text-white rounded-bl-lg ${rankStyles[index]?.labelBg || 'bg-primary'}`}>
                    {rankStyles[index]?.label || `#${index + 1}`}
                  </div>
                  <CardContent className="p-6 pt-8">
                    <div className="text-4xl mb-3">{prediction.icon}</div>
                    <h3 className="text-lg font-bold mb-2">{prediction.career}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${prediction.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${prediction.matchScore}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                      <span className="text-sm font-bold">{prediction.matchScore}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{prediction.description}</p>
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">Salary</p>
                        <p className="font-semibold">{prediction.avgSalary}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Growth</p>
                        <p className="font-semibold text-green-600">{prediction.growthRate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* View All Matches */}
          {remainingPredictions.length > 0 && (
            <Collapsible open={showAllMatches} onOpenChange={setShowAllMatches}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full gap-2">
                  <ChevronDown className={`h-4 w-4 transition-transform ${showAllMatches ? 'rotate-180' : ''}`} />
                  {showAllMatches ? 'Hide' : `View All ${predictions.length} Matches`}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="grid gap-3 mt-4">
                  {remainingPredictions.map((prediction, index) => (
                    <Card key={index + 3} className="hover:bg-muted/50 transition-all">
                      <CardContent className="p-4 flex items-center gap-4">
                        <span className="text-2xl">{prediction.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">{prediction.career}</span>
                            <Badge variant="outline" className="text-xs">{prediction.matchScore}%</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{prediction.description}</p>
                        </div>
                        <div className="text-right text-xs shrink-0">
                          <p className="font-semibold">{prediction.avgSalary}</p>
                          <p className="text-green-600">{prediction.growthRate}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
        </motion.div>

        {/* Section 2: Personalized Roadmap */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <CareerRoadmap careerName={topCareer} stream={stream} />
        </motion.div>

        {/* Section 3: Skills to Develop */}
        {skills.length > 0 && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">💡</span>
                  Skills to Develop
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {skills.slice(0, 5).map((skill, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{skill.skill}</span>
                          <span className="text-xs text-muted-foreground">Importance: {skill.importance}/10</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.importance * 10}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Section 4: Action Items */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ActionItems stream={stream} career={topCareer} />
        </motion.div>

        {/* Section 5: Download & Share */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-muted/30">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-bold mb-4">📄 Save Your Results</h3>
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="outline" className="gap-2" onClick={() => handleShare('whatsapp')}>
                  📱 Share on WhatsApp
                </Button>
                <Button variant="outline" className="gap-2" onClick={() => handleShare('email')}>
                  📧 Email Results
                </Button>
                <Button variant="outline" className="gap-2" onClick={onRetake}>
                  <RotateCcw className="h-4 w-4" />
                  Retake Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
