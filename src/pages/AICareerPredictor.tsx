import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Sparkles, ArrowLeft, Lightbulb, Target, TrendingUp, BookOpen, Briefcase, Stethoscope, Calculator, Palette, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CareerPrediction {
  career: string;
  matchScore: number;
  icon: string;
  color: string;
  description: string;
  avgSalary: string;
  growthRate: string;
}

interface SkillRecommendation {
  skill: string;
  importance: number;
  currentLevel: number;
  resources: string[];
}

const streams = [
  { id: "pcm", label: "Science (PCM)", icon: Calculator, description: "Physics, Chemistry, Mathematics" },
  { id: "pcb", label: "Science (PCB)", icon: Stethoscope, description: "Physics, Chemistry, Biology" },
  { id: "commerce", label: "Commerce", icon: Briefcase, description: "Business, Accounts, Economics" },
  { id: "arts", label: "Arts/Humanities", icon: Palette, description: "Literature, History, Languages" },
];

const workPreferences = [
  { id: "tech", label: "Technology" },
  { id: "healthcare", label: "Healthcare" },
  { id: "design", label: "Design" },
  { id: "business", label: "Business" },
  { id: "education", label: "Education" },
  { id: "research", label: "Research" },
];

const workStyles = [
  { id: "team", label: "Team Player" },
  { id: "solo", label: "Independent" },
  { id: "hybrid", label: "Hybrid" },
  { id: "lead", label: "Leadership" },
];

export default function AICareerPredictor() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedStream, setSelectedStream] = useState("");
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [interests, setInterests] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [predictions, setPredictions] = useState<CareerPrediction[]>([]);
  const [skills, setSkills] = useState<SkillRecommendation[]>([]);
  const [showResults, setShowResults] = useState(false);

  const togglePreference = (id: string) => {
    setSelectedPreferences(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const getAIPredictions = async () => {
    setIsLoading(true);
    try {
      const streamLabel = streams.find(s => s.id === selectedStream)?.label || "";
      const prefLabels = selectedPreferences.map(p => workPreferences.find(wp => wp.id === p)?.label).join(", ");
      const styleLabel = workStyles.find(s => s.id === selectedStyle)?.label || "";

      const { data, error } = await supabase.functions.invoke("career-predictor", {
        body: {
          interests: `${streamLabel} student interested in ${interests || prefLabels}`,
          workPreference: prefLabels,
          workStyle: styleLabel,
        },
      });

      if (error) throw error;

      if (data?.predictions) {
        setPredictions(data.predictions);
        
        // Get skill recommendations for top career
        const topCareer = data.predictions[0]?.career;
        if (topCareer) {
          const skillData = await supabase.functions.invoke("career-predictor", {
            body: { type: "skills", career: topCareer },
          });
          if (skillData.data?.skills) {
            setSkills(skillData.data.skills);
          }
        }
        
        setShowResults(true);
      }
    } catch (error) {
      console.error("Error getting predictions:", error);
      toast.error("Failed to get predictions. Please try again.");
      // Fallback predictions
      setPredictions([
        {
          career: "Software Developer",
          matchScore: 87,
          icon: "💻",
          color: "from-blue-500 to-indigo-600",
          description: "Build applications and solve problems through code",
          avgSalary: "₹8-25 LPA",
          growthRate: "+35%",
        },
        {
          career: "Data Analyst",
          matchScore: 82,
          icon: "📊",
          color: "from-purple-500 to-pink-600",
          description: "Analyze data to drive business decisions",
          avgSalary: "₹6-18 LPA",
          growthRate: "+28%",
        },
        {
          career: "Product Manager",
          matchScore: 78,
          icon: "🎯",
          color: "from-emerald-500 to-teal-600",
          description: "Lead product development and strategy",
          avgSalary: "₹12-35 LPA",
          growthRate: "+25%",
        },
      ]);
      setShowResults(true);
    } finally {
      setIsLoading(false);
    }
  };

  const canProceed = () => {
    if (step === 1) return selectedStream !== "";
    if (step === 2) return selectedPreferences.length > 0;
    if (step === 3) return selectedStyle !== "";
    return true;
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      getAIPredictions();
    }
  };

  const handleBack = () => {
    if (showResults) {
      setShowResults(false);
    } else if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={handleBack} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI Analysis Complete</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Career Matches</h1>
            <p className="text-muted-foreground">Based on your stream, interests, and work style</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {predictions.map((prediction, index) => (
              <Card key={index} className="relative overflow-hidden border-2 hover:border-primary/50 transition-all">
                {index === 0 && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                    Best Match
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{prediction.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{prediction.career}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${prediction.color}`}
                        style={{ width: `${prediction.matchScore}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold">{prediction.matchScore}%</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{prediction.description}</p>
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-muted-foreground">Salary</p>
                      <p className="font-semibold">{prediction.avgSalary}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground">Growth</p>
                      <p className="font-semibold text-green-600">{prediction.growthRate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {skills.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Skills to Develop
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {skills.map((skill, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold">{skill.skill}</h4>
                        <Badge variant="secondary">{skill.importance}% Important</Badge>
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Current Level</span>
                          <span>{skill.currentLevel}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary"
                            style={{ width: `${skill.currentLevel}%` }}
                          />
                        </div>
                      </div>
                      {skill.resources.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {skill.resources.slice(0, 2).map((resource, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              <BookOpen className="h-3 w-3 mr-1" />
                              {resource}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div className="text-center">
            <Button size="lg" onClick={() => navigate("/career-assessment")}>
              Take Full Career Assessment
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={handleBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Brain className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI Career Predictor</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Discover Your Career Path</h1>
            <p className="text-muted-foreground">Answer a few questions to get AI-powered career recommendations</p>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 w-12 rounded-full transition-colors ${
                  s <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Step 1: Stream Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-center mb-6">Choose Your Stream</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {streams.map((stream) => (
                  <Card
                    key={stream.id}
                    className={`cursor-pointer transition-all hover:border-primary/50 ${
                      selectedStream === stream.id ? "border-2 border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setSelectedStream(stream.id)}
                  >
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${selectedStream === stream.id ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                        <stream.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{stream.label}</h3>
                        <p className="text-sm text-muted-foreground">{stream.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Work Preferences */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-center mb-6">What interests you? (Select multiple)</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {workPreferences.map((pref) => (
                  <Badge
                    key={pref.id}
                    variant={selectedPreferences.includes(pref.id) ? "default" : "outline"}
                    className="cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105"
                    onClick={() => togglePreference(pref.id)}
                  >
                    {pref.label}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Work Style */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-center mb-6">How do you prefer to work?</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {workStyles.map((style) => (
                  <Card
                    key={style.id}
                    className={`cursor-pointer transition-all hover:border-primary/50 ${
                      selectedStyle === style.id ? "border-2 border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setSelectedStyle(style.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <span className="font-medium">{style.label}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Additional Interests */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-center mb-6">Tell us more (optional)</h2>
              <Input
                placeholder="E.g., I enjoy solving puzzles, creating art, helping people..."
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                className="text-center"
              />
              <p className="text-sm text-muted-foreground text-center">
                This helps our AI provide more personalized recommendations
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-center mt-8">
            <Button
              size="lg"
              onClick={handleNext}
              disabled={!canProceed() || isLoading}
              className="min-w-[200px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : step === 4 ? (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Get Predictions
                </>
              ) : (
                <>
                  Continue
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
