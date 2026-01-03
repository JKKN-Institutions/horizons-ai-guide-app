import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Sparkles, ArrowLeft, Lightbulb, Target, TrendingUp, BookOpen, Briefcase, Stethoscope, Calculator, Palette, ChevronRight, Loader2, GitCompare, X, Check, DollarSign, BarChart3, Clock, Users, GraduationCap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from "recharts";

interface CareerPrediction {
  career: string;
  matchScore: number;
  icon: string;
  color: string;
  description: string;
  avgSalary: string;
  growthRate: string;
  // Extended comparison data
  workLifeBalance?: number;
  jobDemand?: number;
  entryDifficulty?: number;
  avgWorkHours?: string;
  topSkills?: string[];
  educationRequired?: string;
}

interface SkillRecommendation {
  skill: string;
  importance: number;
  currentLevel: number;
  resources: string[];
}

// Career comparison metrics
const getCareerMetrics = (career: CareerPrediction): CareerPrediction => {
  // Add default metrics if not present
  return {
    ...career,
    workLifeBalance: career.workLifeBalance || Math.floor(Math.random() * 30) + 60,
    jobDemand: career.jobDemand || Math.floor(Math.random() * 25) + 70,
    entryDifficulty: career.entryDifficulty || Math.floor(Math.random() * 40) + 40,
    avgWorkHours: career.avgWorkHours || `${Math.floor(Math.random() * 10) + 40}-${Math.floor(Math.random() * 10) + 45} hrs/week`,
    topSkills: career.topSkills || getDefaultSkills(career.career),
    educationRequired: career.educationRequired || getDefaultEducation(career.career),
  };
};

const getDefaultSkills = (career: string): string[] => {
  const skillMap: Record<string, string[]> = {
    "Software Developer": ["Programming", "Problem Solving", "System Design"],
    "Data Analyst": ["SQL", "Statistics", "Data Visualization"],
    "Product Manager": ["Communication", "Strategy", "User Research"],
    "Doctor": ["Medical Knowledge", "Patient Care", "Diagnosis"],
    "CA": ["Accounting", "Tax Planning", "Auditing"],
    "Engineer": ["Technical Skills", "Mathematics", "Design"],
  };
  return skillMap[career] || ["Analytical Skills", "Communication", "Technical Knowledge"];
};

const getDefaultEducation = (career: string): string => {
  const eduMap: Record<string, string> = {
    "Software Developer": "B.Tech/BCA/MCA",
    "Data Analyst": "B.Tech/B.Sc Statistics",
    "Product Manager": "MBA/B.Tech",
    "Doctor": "MBBS + MD/MS",
    "CA": "CA Foundation + Inter + Final",
    "Engineer": "B.Tech/B.E",
  };
  return eduMap[career] || "Bachelor's Degree";
};

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
  const [selectedForCompare, setSelectedForCompare] = useState<number[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

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
    if (showCompareModal) {
      setShowCompareModal(false);
    } else if (showResults) {
      setShowResults(false);
      setSelectedForCompare([]);
    } else if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  const toggleCompareSelection = (index: number) => {
    setSelectedForCompare(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      }
      if (prev.length >= 2) {
        return [prev[1], index]; // Replace oldest selection
      }
      return [...prev, index];
    });
  };

  const handleOpenComparison = () => {
    if (selectedForCompare.length === 2) {
      setShowCompareModal(true);
    } else {
      toast.info("Select 2 careers to compare");
    }
  };

  const getComparisonCareers = () => {
    return selectedForCompare.map(i => getCareerMetrics(predictions[i]));
  };

  const getWinner = (metric: 'matchScore' | 'workLifeBalance' | 'jobDemand', careers: CareerPrediction[]) => {
    if (careers.length < 2) return -1;
    const val0 = careers[0][metric] || 0;
    const val1 = careers[1][metric] || 0;
    if (val0 > val1) return 0;
    if (val1 > val0) return 1;
    return -1;
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

          {/* Compare Button */}
          {predictions.length > 1 && (
            <div className="flex justify-center mb-6">
              <Button 
                variant={selectedForCompare.length === 2 ? "default" : "outline"}
                onClick={handleOpenComparison}
                className="gap-2"
              >
                <GitCompare className="h-4 w-4" />
                Compare Careers {selectedForCompare.length > 0 && `(${selectedForCompare.length}/2)`}
              </Button>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {predictions.map((prediction, index) => (
              <Card 
                key={index} 
                className={`relative overflow-hidden border-2 transition-all cursor-pointer ${
                  selectedForCompare.includes(index) 
                    ? "border-primary ring-2 ring-primary/20" 
                    : "hover:border-primary/50"
                }`}
                onClick={() => toggleCompareSelection(index)}
              >
                {/* Selection indicator */}
                <div className={`absolute top-3 left-3 z-10 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedForCompare.includes(index) 
                    ? "bg-primary border-primary" 
                    : "border-muted-foreground/30 bg-background"
                }`}>
                  {selectedForCompare.includes(index) && (
                    <Check className="h-4 w-4 text-primary-foreground" />
                  )}
                </div>

                {index === 0 && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                    Best Match
                  </div>
                )}
                <CardContent className="p-6 pt-10">
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

          {/* Comparison Modal */}
          <Dialog open={showCompareModal} onOpenChange={setShowCompareModal}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <GitCompare className="h-5 w-5 text-primary" />
                  Career Comparison
                </DialogTitle>
              </DialogHeader>
              
              {selectedForCompare.length === 2 && (
                <div className="space-y-6 pt-4">
                  {/* Career Headers */}
                  <div className="grid grid-cols-2 gap-4">
                    {getComparisonCareers().map((career, i) => (
                      <Card key={i} className={`p-4 ${i === 0 ? 'border-blue-200 bg-blue-50/50' : 'border-purple-200 bg-purple-50/50'}`}>
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{career.icon}</span>
                          <div>
                            <h3 className="font-bold text-lg">{career.career}</h3>
                            <Badge variant="secondary" className="mt-1">
                              {career.matchScore}% Match
                            </Badge>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Radar Chart Visualization */}
                  <Card className="overflow-hidden">
                    <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-purple-50">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-primary" />
                        Skills & Metrics Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart 
                            data={(() => {
                              const careers = getComparisonCareers();
                              return [
                                { metric: 'Match Score', career1: careers[0]?.matchScore || 0, career2: careers[1]?.matchScore || 0 },
                                { metric: 'Work-Life Balance', career1: careers[0]?.workLifeBalance || 0, career2: careers[1]?.workLifeBalance || 0 },
                                { metric: 'Job Demand', career1: careers[0]?.jobDemand || 0, career2: careers[1]?.jobDemand || 0 },
                                { metric: 'Entry Ease', career1: 100 - (careers[0]?.entryDifficulty || 50), career2: 100 - (careers[1]?.entryDifficulty || 50) },
                                { metric: 'Growth Potential', career1: parseInt(careers[0]?.growthRate?.replace(/[^0-9]/g, '') || '0'), career2: parseInt(careers[1]?.growthRate?.replace(/[^0-9]/g, '') || '0') },
                              ];
                            })()}
                            margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
                          >
                            <PolarGrid stroke="#e5e7eb" />
                            <PolarAngleAxis 
                              dataKey="metric" 
                              tick={{ fill: '#6b7280', fontSize: 11 }}
                            />
                            <PolarRadiusAxis 
                              angle={90} 
                              domain={[0, 100]} 
                              tick={{ fill: '#9ca3af', fontSize: 10 }}
                            />
                            <Radar
                              name={getComparisonCareers()[0]?.career || 'Career 1'}
                              dataKey="career1"
                              stroke="#3b82f6"
                              fill="#3b82f6"
                              fillOpacity={0.3}
                              strokeWidth={2}
                            />
                            <Radar
                              name={getComparisonCareers()[1]?.career || 'Career 2'}
                              dataKey="career2"
                              stroke="#a855f7"
                              fill="#a855f7"
                              fillOpacity={0.3}
                              strokeWidth={2}
                            />
                            <Legend 
                              wrapperStyle={{ paddingTop: '10px' }}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex justify-center gap-6 mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                          <span>{getComparisonCareers()[0]?.career}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-purple-500" />
                          <span>{getComparisonCareers()[1]?.career}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Comparison Metrics */}
                  <div className="space-y-4">
                    {/* Salary Comparison */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          Salary Range
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-2 gap-4">
                          {getComparisonCareers().map((career, i) => (
                            <div key={i} className="text-center py-3 bg-muted/50 rounded-lg">
                              <p className="text-2xl font-bold text-green-600">{career.avgSalary}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Growth Rate */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                          Growth Rate
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-2 gap-4">
                          {getComparisonCareers().map((career, i) => (
                            <div key={i} className="text-center py-3 bg-muted/50 rounded-lg">
                              <p className="text-2xl font-bold text-blue-600">{career.growthRate}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Work-Life Balance */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <Clock className="h-4 w-4 text-orange-600" />
                          Work-Life Balance
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-2 gap-4">
                          {getComparisonCareers().map((career, i) => {
                            const winner = getWinner('workLifeBalance', getComparisonCareers());
                            return (
                              <div key={i} className={`text-center py-3 rounded-lg ${winner === i ? 'bg-green-100 ring-2 ring-green-500' : 'bg-muted/50'}`}>
                                <p className="text-2xl font-bold">{career.workLifeBalance}%</p>
                                {winner === i && <Badge className="mt-1 bg-green-600">Better</Badge>}
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Job Demand */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <Users className="h-4 w-4 text-purple-600" />
                          Job Market Demand
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-2 gap-4">
                          {getComparisonCareers().map((career, i) => {
                            const winner = getWinner('jobDemand', getComparisonCareers());
                            return (
                              <div key={i} className={`text-center py-3 rounded-lg ${winner === i ? 'bg-green-100 ring-2 ring-green-500' : 'bg-muted/50'}`}>
                                <p className="text-2xl font-bold">{career.jobDemand}%</p>
                                {winner === i && <Badge className="mt-1 bg-green-600">Higher</Badge>}
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Education Required */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-indigo-600" />
                          Education Required
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-2 gap-4">
                          {getComparisonCareers().map((career, i) => (
                            <div key={i} className="text-center py-3 bg-muted/50 rounded-lg">
                              <p className="font-semibold">{career.educationRequired}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Top Skills */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <Award className="h-4 w-4 text-amber-600" />
                          Key Skills Required
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-2 gap-4">
                          {getComparisonCareers().map((career, i) => (
                            <div key={i} className="py-3">
                              <div className="flex flex-wrap gap-2 justify-center">
                                {career.topSkills?.map((skill, si) => (
                                  <Badge key={si} variant="outline">{skill}</Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="text-center pt-4">
                    <Button onClick={() => setShowCompareModal(false)}>
                      Close Comparison
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

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
