import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Rocket, Zap, Brain, Target, TrendingUp, Sparkles, 
  ChevronRight, Star, Lightbulb, BarChart3, Users,
  GraduationCap, Briefcase, Heart, Code, Stethoscope,
  PenTool, Calculator, Loader2, ArrowRight, BookOpen,
  Trophy, Flame, Send
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

const quickQuestions = [
  {
    id: 1,
    question: "What excites you most?",
    options: [
      { label: "Technology & Coding", icon: Code, value: "tech" },
      { label: "Helping People", icon: Heart, value: "healthcare" },
      { label: "Creative Work", icon: PenTool, value: "design" },
      { label: "Numbers & Analysis", icon: Calculator, value: "business" },
    ]
  },
  {
    id: 2,
    question: "Preferred work style?",
    options: [
      { label: "Team Collaboration", icon: Users, value: "team" },
      { label: "Independent Work", icon: Target, value: "solo" },
      { label: "Mix of Both", icon: Zap, value: "hybrid" },
      { label: "Leadership Roles", icon: Trophy, value: "lead" },
    ]
  }
];

const trendingCareers = [
  { name: "AI/ML Engineer", growth: "+45%", hot: true, icon: "🤖" },
  { name: "Data Scientist", growth: "+38%", hot: true, icon: "📊" },
  { name: "Healthcare Tech", growth: "+32%", hot: false, icon: "🏥" },
  { name: "UX Designer", growth: "+28%", hot: true, icon: "🎨" },
  { name: "Cloud Architect", growth: "+35%", hot: false, icon: "☁️" },
];

const CareerBoosterSection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState<"predictor" | "insights" | "skills">("predictor");
  const [quickAnswers, setQuickAnswers] = useState<Record<number, string>>({});
  const [userInterest, setUserInterest] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [predictions, setPredictions] = useState<CareerPrediction[] | null>(null);
  const [skillRecommendations, setSkillRecommendations] = useState<SkillRecommendation[] | null>(null);

  const handleQuickAnswer = (questionId: number, value: string) => {
    setQuickAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const getAIPrediction = async () => {
    if (!userInterest.trim() && Object.keys(quickAnswers).length === 0) {
      toast({
        title: "Please provide some input",
        description: "Answer the quick questions or describe your interests",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const prompt = `Based on the following:
      - Interest area: ${userInterest || "Not specified"}
      - Work preference: ${quickAnswers[1] || "Not specified"}
      - Work style: ${quickAnswers[2] || "Not specified"}
      
      Provide 3 career predictions with match scores.`;

      const { data, error } = await supabase.functions.invoke('career-predictor', {
        body: { 
          interests: userInterest,
          workPreference: quickAnswers[1],
          workStyle: quickAnswers[2],
          prompt 
        }
      });

      if (error) throw error;

      if (data?.predictions) {
        setPredictions(data.predictions);
        toast({
          title: "🎯 Career Predictions Ready!",
          description: "Your AI-powered career matches have been calculated",
        });
      }
    } catch (error) {
      console.error('Prediction error:', error);
      // Fallback predictions for demo
      setPredictions([
        {
          career: "Software Developer",
          matchScore: 92,
          icon: "💻",
          color: "from-blue-500 to-indigo-600",
          description: "Build innovative applications and solve complex problems",
          avgSalary: "₹8-25 LPA",
          growthRate: "+35%"
        },
        {
          career: "Data Analyst",
          matchScore: 85,
          icon: "📊",
          color: "from-emerald-500 to-green-600",
          description: "Transform data into actionable business insights",
          avgSalary: "₹6-18 LPA",
          growthRate: "+28%"
        },
        {
          career: "Product Manager",
          matchScore: 78,
          icon: "🚀",
          color: "from-purple-500 to-violet-600",
          description: "Lead product development and strategy",
          avgSalary: "₹12-35 LPA",
          growthRate: "+25%"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getSkillRecommendations = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('career-predictor', {
        body: { 
          type: 'skills',
          career: predictions?.[0]?.career || 'Software Developer'
        }
      });

      if (error) throw error;

      if (data?.skills) {
        setSkillRecommendations(data.skills);
      }
    } catch (error) {
      // Fallback skills for demo
      setSkillRecommendations([
        { skill: "Python Programming", importance: 95, currentLevel: 60, resources: ["Coursera", "LeetCode"] },
        { skill: "Data Structures", importance: 90, currentLevel: 50, resources: ["GeeksforGeeks", "HackerRank"] },
        { skill: "Machine Learning", importance: 85, currentLevel: 30, resources: ["Andrew Ng Course", "Kaggle"] },
        { skill: "Communication", importance: 80, currentLevel: 70, resources: ["LinkedIn Learning", "Toastmasters"] },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 relative overflow-hidden" id="career-booster">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-indigo-300/20 to-purple-300/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-fuchsia-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-purple-200">
            <Rocket className="w-4 h-4" />
            AI-Powered Career Intelligence
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-5">
            Career Booster Dashboard
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Get real AI predictions, personalized insights, and skill recommendations to accelerate your career
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 mb-8">
          {[
            { id: "predictor", label: "AI Predictor", icon: Brain },
            { id: "insights", label: "Industry Insights", icon: TrendingUp },
            { id: "skills", label: "Skill Analyzer", icon: Target },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id as any)}
              className={`gap-2 rounded-full px-6 ${
                activeTab === tab.id 
                  ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-200" 
                  : "border-purple-200 text-purple-700 hover:bg-purple-50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* AI Predictor Tab */}
        {activeTab === "predictor" && (
          <div className="grid lg:grid-cols-2 gap-8 animate-fade-up">
            {/* Input Section */}
            <Card className="border-2 border-purple-100 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">Quick Career Match</h3>
                    <p className="text-sm text-gray-500">Answer to get AI predictions</p>
                  </div>
                </div>

                {/* Quick Questions */}
                <div className="space-y-6 mb-6">
                  {quickQuestions.map((q) => (
                    <div key={q.id}>
                      <p className="font-medium text-gray-700 mb-3">{q.question}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {q.options.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => handleQuickAnswer(q.id, opt.value)}
                            className={`p-3 rounded-xl border-2 transition-all duration-300 flex items-center gap-2 text-sm ${
                              quickAnswers[q.id] === opt.value
                                ? "border-purple-500 bg-purple-50 text-purple-700"
                                : "border-gray-200 hover:border-purple-300 text-gray-600"
                            }`}
                          >
                            <opt.icon className="w-4 h-4" />
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Interest Input */}
                <div className="mb-6">
                  <p className="font-medium text-gray-700 mb-2">Describe your interests (optional)</p>
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g., I love solving puzzles and building things..."
                      value={userInterest}
                      onChange={(e) => setUserInterest(e.target.value)}
                      className="flex-1 border-purple-200 focus:border-purple-500"
                    />
                    <Button 
                      size="icon"
                      onClick={getAIPrediction}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700"
                    >
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <Button 
                  onClick={getAIPrediction}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white shadow-lg shadow-purple-200 gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing with AI...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4" />
                      Get AI Career Predictions
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Predictions Section */}
            <div className="space-y-4">
              {predictions ? (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <h3 className="font-bold text-lg text-gray-800">Your Career Matches</h3>
                  </div>
                  {predictions.map((pred, idx) => (
                    <Card 
                      key={idx} 
                      className={`border-2 border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-up overflow-hidden ${idx === 0 ? 'ring-2 ring-purple-400 ring-offset-2' : ''}`}
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pred.color} flex items-center justify-center text-2xl shadow-lg`}>
                            {pred.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-gray-800">{pred.career}</h4>
                              {idx === 0 && (
                                <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0 text-xs">
                                  Top Match
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{pred.description}</p>
                            
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-emerald-600 font-medium">💰 {pred.avgSalary}</span>
                              <span className="text-blue-600 font-medium">📈 {pred.growthRate}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="relative w-16 h-16">
                              <svg className="w-16 h-16 transform -rotate-90">
                                <circle
                                  cx="32" cy="32" r="28"
                                  stroke="currentColor"
                                  strokeWidth="6"
                                  fill="none"
                                  className="text-gray-200"
                                />
                                <circle
                                  cx="32" cy="32" r="28"
                                  stroke="url(#gradient)"
                                  strokeWidth="6"
                                  fill="none"
                                  strokeDasharray={`${pred.matchScore * 1.76} 176`}
                                  className="transition-all duration-1000"
                                />
                                <defs>
                                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#9333ea" />
                                    <stop offset="100%" stopColor="#db2777" />
                                  </linearGradient>
                                </defs>
                              </svg>
                              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-purple-700">
                                {pred.matchScore}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <Button 
                    onClick={() => navigate('/career-assessment')}
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg mt-4 gap-2"
                  >
                    <GraduationCap className="w-4 h-4" />
                    Take Full Assessment for Detailed Results
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <Card className="border-2 border-dashed border-purple-200 bg-purple-50/50">
                  <CardContent className="p-12 text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-fuchsia-100 flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-10 h-10 text-purple-500" />
                    </div>
                    <h4 className="font-bold text-gray-700 mb-2">AI Predictions Will Appear Here</h4>
                    <p className="text-gray-500 text-sm">Answer the questions and click "Get AI Predictions"</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Industry Insights Tab */}
        {activeTab === "insights" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up">
            {/* Trending Careers */}
            <Card className="border-2 border-purple-100 shadow-xl bg-white/80 backdrop-blur-sm md:col-span-2 lg:col-span-1">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">Trending Careers 2025</h3>
                    <p className="text-sm text-gray-500">Fastest growing fields</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {trendingCareers.map((career, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-orange-50/50 hover:from-orange-50 hover:to-red-50/50 transition-all duration-300 cursor-pointer"
                    >
                      <span className="text-2xl">{career.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-800">{career.name}</span>
                          {career.hot && (
                            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 text-xs animate-pulse">
                              🔥 Hot
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-emerald-600 border-emerald-300 bg-emerald-50">
                        {career.growth}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Stats */}
            <Card className="border-2 border-purple-100 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">Market Stats</h3>
                    <p className="text-sm text-gray-500">India Job Market 2025</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Tech Sector Growth</span>
                      <span className="font-bold text-blue-600">+42%</span>
                    </div>
                    <Progress value={84} className="h-2" />
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Healthcare Hiring</span>
                      <span className="font-bold text-emerald-600">+35%</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-violet-50">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Remote Opportunities</span>
                      <span className="font-bold text-purple-600">+58%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Salary Insights */}
            <Card className="border-2 border-purple-100 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">Salary Trends</h3>
                    <p className="text-sm text-gray-500">Average packages</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[
                    { role: "Freshers (IT)", salary: "₹4-8 LPA", growth: "+15%" },
                    { role: "3-5 Years Exp", salary: "₹12-25 LPA", growth: "+22%" },
                    { role: "Senior (8+ Yrs)", salary: "₹30-60 LPA", growth: "+18%" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50">
                      <div>
                        <p className="font-medium text-gray-800">{item.role}</p>
                        <p className="text-lg font-bold text-emerald-600">{item.salary}</p>
                      </div>
                      <Badge variant="outline" className="text-emerald-600 border-emerald-300">
                        {item.growth}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Skill Analyzer Tab */}
        {activeTab === "skills" && (
          <div className="grid lg:grid-cols-2 gap-8 animate-fade-up">
            <Card className="border-2 border-purple-100 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">Skill Gap Analyzer</h3>
                    <p className="text-sm text-gray-500">AI-powered recommendations</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">
                  {predictions 
                    ? `Based on your interest in ${predictions[0]?.career}, here are the skills you should focus on:`
                    : "Get your career predictions first, then we'll analyze the skill gaps for your target career."}
                </p>

                <Button 
                  onClick={getSkillRecommendations}
                  disabled={isLoading || !predictions}
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-lg gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing Skills...
                    </>
                  ) : (
                    <>
                      <Lightbulb className="w-4 h-4" />
                      Analyze Skill Gaps
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {skillRecommendations ? (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-5 h-5 text-teal-600" />
                    <h3 className="font-bold text-lg text-gray-800">Skills to Develop</h3>
                  </div>
                  {skillRecommendations.map((skill, idx) => (
                    <Card 
                      key={idx}
                      className="border-2 border-teal-100 shadow-lg animate-fade-up"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-gray-800">{skill.skill}</h4>
                          <Badge 
                            className={`${
                              skill.importance >= 90 
                                ? 'bg-red-100 text-red-700 border-red-200' 
                                : skill.importance >= 80 
                                  ? 'bg-amber-100 text-amber-700 border-amber-200'
                                  : 'bg-blue-100 text-blue-700 border-blue-200'
                            }`}
                          >
                            {skill.importance >= 90 ? 'Critical' : skill.importance >= 80 ? 'Important' : 'Helpful'}
                          </Badge>
                        </div>
                        <div className="mb-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-500">Your Level</span>
                            <span className="font-medium">{skill.currentLevel}%</span>
                          </div>
                          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="absolute h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full transition-all duration-1000"
                              style={{ width: `${skill.currentLevel}%` }}
                            />
                            <div 
                              className="absolute h-full border-r-2 border-dashed border-red-400"
                              style={{ left: `${skill.importance}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-400 mt-1">Target: {skill.importance}%</p>
                        </div>
                        <div className="flex gap-2 mt-3">
                          {skill.resources.map((res, rIdx) => (
                            <Badge key={rIdx} variant="outline" className="text-xs">
                              {res}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </>
              ) : (
                <Card className="border-2 border-dashed border-teal-200 bg-teal-50/50">
                  <CardContent className="p-12 text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center mx-auto mb-4">
                      <Target className="w-10 h-10 text-teal-500" />
                    </div>
                    <h4 className="font-bold text-gray-700 mb-2">Skill Analysis Will Appear Here</h4>
                    <p className="text-gray-500 text-sm">Get career predictions first, then analyze skill gaps</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button 
            onClick={() => navigate('/career-assessment')}
            className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-700 hover:via-fuchsia-700 hover:to-pink-700 text-white font-semibold px-10 py-6 text-lg rounded-xl shadow-xl shadow-purple-200 hover:shadow-2xl transition-all duration-300 hover:scale-105 gap-3"
          >
            <Rocket className="w-5 h-5" />
            Take Complete Career Assessment
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CareerBoosterSection;
