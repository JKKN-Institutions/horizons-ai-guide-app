import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, IndianRupee, TrendingUp, Briefcase, Sparkles, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Skill {
  name: string;
  premium: number; // percentage boost
  demand: "high" | "medium" | "low";
  category: string;
}

interface CareerSkillData {
  id: string;
  title: string;
  color: string;
  baseSalary: number;
  skills: Skill[];
}

const careerSkillsData: CareerSkillData[] = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    color: "hsl(var(--primary))",
    baseSalary: 15,
    skills: [
      { name: "Cloud (AWS/GCP/Azure)", premium: 25, demand: "high", category: "Infrastructure" },
      { name: "System Design", premium: 30, demand: "high", category: "Architecture" },
      { name: "Kubernetes/Docker", premium: 20, demand: "high", category: "DevOps" },
      { name: "React/Next.js", premium: 15, demand: "high", category: "Frontend" },
      { name: "Machine Learning", premium: 35, demand: "high", category: "AI/ML" },
      { name: "Golang/Rust", premium: 25, demand: "medium", category: "Backend" },
      { name: "GraphQL", premium: 10, demand: "medium", category: "API" },
      { name: "TypeScript", premium: 12, demand: "high", category: "Language" },
    ],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    color: "hsl(280, 87%, 65%)",
    baseSalary: 20,
    skills: [
      { name: "Deep Learning (PyTorch/TF)", premium: 30, demand: "high", category: "AI/ML" },
      { name: "NLP/LLMs", premium: 40, demand: "high", category: "AI/ML" },
      { name: "MLOps", premium: 25, demand: "high", category: "Infrastructure" },
      { name: "Computer Vision", premium: 28, demand: "medium", category: "AI/ML" },
      { name: "Big Data (Spark)", premium: 20, demand: "medium", category: "Data" },
      { name: "Statistics/A-B Testing", premium: 15, demand: "high", category: "Analytics" },
      { name: "SQL Advanced", premium: 10, demand: "high", category: "Data" },
      { name: "Cloud ML Services", premium: 18, demand: "medium", category: "Infrastructure" },
    ],
  },
  {
    id: "product-manager",
    title: "Product Manager",
    color: "hsl(142, 76%, 36%)",
    baseSalary: 18,
    skills: [
      { name: "Data Analytics", premium: 20, demand: "high", category: "Analytics" },
      { name: "Technical Background", premium: 25, demand: "high", category: "Technical" },
      { name: "AI/ML Knowledge", premium: 30, demand: "high", category: "Technical" },
      { name: "Agile/Scrum Master", premium: 15, demand: "medium", category: "Process" },
      { name: "SQL/Python Basics", premium: 18, demand: "medium", category: "Technical" },
      { name: "UX Design", premium: 12, demand: "medium", category: "Design" },
      { name: "B2B SaaS Experience", premium: 22, demand: "high", category: "Domain" },
      { name: "Growth/PLG", premium: 20, demand: "high", category: "Strategy" },
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Engineer",
    color: "hsl(0, 72%, 51%)",
    baseSalary: 18,
    skills: [
      { name: "Penetration Testing", premium: 30, demand: "high", category: "Offensive" },
      { name: "Cloud Security", premium: 35, demand: "high", category: "Infrastructure" },
      { name: "SIEM/SOC", premium: 20, demand: "high", category: "Defensive" },
      { name: "Threat Intelligence", premium: 25, demand: "medium", category: "Analysis" },
      { name: "Compliance (ISO/SOC2)", premium: 18, demand: "medium", category: "Governance" },
      { name: "DevSecOps", premium: 28, demand: "high", category: "DevOps" },
      { name: "Malware Analysis", premium: 22, demand: "low", category: "Analysis" },
      { name: "Zero Trust Architecture", premium: 25, demand: "high", category: "Architecture" },
    ],
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    color: "hsl(221, 83%, 53%)",
    baseSalary: 16,
    skills: [
      { name: "Kubernetes Expert", premium: 30, demand: "high", category: "Orchestration" },
      { name: "Terraform/IaC", premium: 25, demand: "high", category: "Infrastructure" },
      { name: "CI/CD Pipelines", premium: 20, demand: "high", category: "Automation" },
      { name: "Multi-Cloud", premium: 28, demand: "high", category: "Infrastructure" },
      { name: "GitOps (ArgoCD)", premium: 18, demand: "medium", category: "Deployment" },
      { name: "Observability Stack", premium: 22, demand: "high", category: "Monitoring" },
      { name: "Security Automation", premium: 25, demand: "medium", category: "Security" },
      { name: "Platform Engineering", premium: 32, demand: "high", category: "Architecture" },
    ],
  },
];

const demandColors = {
  high: "bg-green-500/20 text-green-700 border-green-500/30",
  medium: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30",
  low: "bg-red-500/20 text-red-700 border-red-500/30",
};

const SkillPremiumCalculator = () => {
  const [selectedCareer, setSelectedCareer] = useState<string>("software-engineer");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const career = careerSkillsData.find((c) => c.id === selectedCareer)!;

  const toggleSkill = (skillName: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skillName)
        ? prev.filter((s) => s !== skillName)
        : [...prev, skillName]
    );
  };

  const calculation = useMemo(() => {
    const selectedSkillData = career.skills.filter((s) => selectedSkills.includes(s.name));
    
    // Calculate total premium with diminishing returns for stacking
    let totalPremium = 0;
    selectedSkillData
      .sort((a, b) => b.premium - a.premium)
      .forEach((skill, index) => {
        // Each subsequent skill adds less (diminishing returns)
        const factor = Math.pow(0.85, index);
        totalPremium += skill.premium * factor;
      });

    const boostedSalary = career.baseSalary * (1 + totalPremium / 100);
    const absoluteBoost = boostedSalary - career.baseSalary;

    return {
      baseSalary: career.baseSalary,
      totalPremium: Math.round(totalPremium),
      boostedSalary: Math.round(boostedSalary * 10) / 10,
      absoluteBoost: Math.round(absoluteBoost * 10) / 10,
      skillCount: selectedSkillData.length,
    };
  }, [career, selectedSkills]);

  // Group skills by category
  const skillsByCategory = useMemo(() => {
    const grouped: Record<string, Skill[]> = {};
    career.skills.forEach((skill) => {
      if (!grouped[skill.category]) {
        grouped[skill.category] = [];
      }
      grouped[skill.category].push(skill);
    });
    return grouped;
  }, [career]);

  // Reset selected skills when career changes
  const handleCareerChange = (careerId: string) => {
    setSelectedCareer(careerId);
    setSelectedSkills([]);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1">
            <Zap className="w-4 h-4 mr-2" />
            Skill Premium
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Skill Premium Calculator
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover how in-demand skills can boost your salary above the baseline. Select skills you have or plan to learn.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Skills Selection Panel */}
          <div className="lg:col-span-2">
            <Card className="border-2">
              <CardHeader className="bg-muted/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Select Your Skills
                  </CardTitle>
                  <Select value={selectedCareer} onValueChange={handleCareerChange}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {careerSkillsData.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: c.color }}
                            />
                            {c.title}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {Object.entries(skillsByCategory).map(([category, skills]) => (
                    <div key={category}>
                      <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        {category}
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {skills.map((skill) => (
                          <div
                            key={skill.name}
                            className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${
                              selectedSkills.includes(skill.name)
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                            onClick={() => toggleSkill(skill.name)}
                          >
                            <div className="flex items-center gap-3">
                              <Checkbox
                                checked={selectedSkills.includes(skill.name)}
                                onCheckedChange={() => toggleSkill(skill.name)}
                              />
                              <div>
                                <p className="text-sm font-medium">{skill.name}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge
                                    variant="outline"
                                    className={`text-[10px] ${demandColors[skill.demand]}`}
                                  >
                                    {skill.demand} demand
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <Badge
                              variant="secondary"
                              className="font-bold"
                              style={{ color: career.color }}
                            >
                              +{skill.premium}%
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {/* Salary Boost Card */}
            <Card
              className="border-2 overflow-hidden"
              style={{ borderColor: `${career.color}40` }}
            >
              <CardHeader
                className="py-4"
                style={{ backgroundColor: `${career.color}15` }}
              >
                <CardTitle className="flex items-center gap-2 text-lg">
                  <IndianRupee className="w-5 h-5" style={{ color: career.color }} />
                  Your Boosted Salary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Base Salary */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Base Salary</span>
                  <span className="font-medium">₹{calculation.baseSalary} LPA</span>
                </div>

                {/* Skill Premium */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Skill Premium ({calculation.skillCount} skills)
                  </span>
                  <span className="font-bold text-green-600">
                    +{calculation.totalPremium}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <Progress
                    value={Math.min(calculation.totalPremium, 100)}
                    className="h-3"
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    Premium Meter (max ~100%)
                  </p>
                </div>

                {/* Divider */}
                <div className="border-t pt-4">
                  {/* Boosted Salary */}
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">
                      Estimated Salary
                    </p>
                    <p
                      className="text-4xl font-bold"
                      style={{ color: career.color }}
                    >
                      ₹{calculation.boostedSalary} LPA
                    </p>
                    {calculation.absoluteBoost > 0 && (
                      <Badge variant="secondary" className="mt-2">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +₹{calculation.absoluteBoost}L boost
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Skills Suggestion */}
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  Top Skills to Learn
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="space-y-2">
                  {career.skills
                    .filter((s) => !selectedSkills.includes(s.name))
                    .sort((a, b) => b.premium - a.premium)
                    .slice(0, 3)
                    .map((skill, index) => (
                      <div
                        key={skill.name}
                        className="flex items-center justify-between p-2 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
                        onClick={() => toggleSkill(skill.name)}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-muted-foreground">
                            #{index + 1}
                          </span>
                          <span className="text-sm">{skill.name}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          +{skill.premium}%
                        </Badge>
                      </div>
                    ))}
                </div>
                {selectedSkills.length === career.skills.length && (
                  <p className="text-sm text-center text-muted-foreground mt-4">
                    🎉 You have all the skills!
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">
                  <strong>Note:</strong> Premiums have diminishing returns when stacking multiple skills. 
                  Actual salaries vary by company, location, and experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillPremiumCalculator;
