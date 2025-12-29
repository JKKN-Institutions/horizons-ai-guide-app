import { useState } from "react";
import {
  Scale,
  TrendingUp,
  Clock,
  GraduationCap,
  Briefcase,
  DollarSign,
  BarChart3,
  Award,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface CareerData {
  id: string;
  title: string;
  stream: string;
  salary: {
    min: number;
    max: number;
    avg: number;
  };
  growthPotential: number;
  jobDemand: number;
  workLifeBalance: number;
  entryDifficulty: number;
  duration: string;
  exams: string[];
  topCompanies: string[];
  skills: string[];
  futureProspects: string;
  color: string;
}

const careerDatabase: CareerData[] = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    stream: "Science (PCM)",
    salary: { min: 400000, max: 2500000, avg: 1200000 },
    growthPotential: 9,
    jobDemand: 10,
    workLifeBalance: 7,
    entryDifficulty: 7,
    duration: "4 years (B.Tech)",
    exams: ["JEE Main", "JEE Advanced", "BITSAT"],
    topCompanies: ["Google", "Microsoft", "Amazon", "Meta"],
    skills: ["Programming", "DSA", "System Design", "Problem Solving"],
    futureProspects: "Excellent - AI/ML, Cloud computing driving demand",
    color: "blue",
  },
  {
    id: "doctor-mbbs",
    title: "Doctor (MBBS)",
    stream: "Science (PCB)",
    salary: { min: 800000, max: 5000000, avg: 1500000 },
    growthPotential: 8,
    jobDemand: 9,
    workLifeBalance: 4,
    entryDifficulty: 3,
    duration: "5.5 years + Internship",
    exams: ["NEET UG"],
    topCompanies: ["AIIMS", "Apollo", "Fortis", "Max Healthcare"],
    skills: ["Clinical Skills", "Patient Care", "Medical Knowledge", "Empathy"],
    futureProspects: "Strong - Healthcare always in demand",
    color: "red",
  },
  {
    id: "chartered-accountant",
    title: "Chartered Accountant",
    stream: "Commerce",
    salary: { min: 700000, max: 3000000, avg: 1000000 },
    growthPotential: 8,
    jobDemand: 8,
    workLifeBalance: 5,
    entryDifficulty: 4,
    duration: "3-4 years",
    exams: ["CA Foundation", "CA Intermediate", "CA Final"],
    topCompanies: ["Deloitte", "EY", "KPMG", "PwC"],
    skills: ["Accounting", "Taxation", "Auditing", "Financial Analysis"],
    futureProspects: "Stable - Always needed for compliance",
    color: "amber",
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    stream: "Science (PCM)",
    salary: { min: 600000, max: 4000000, avg: 1500000 },
    growthPotential: 10,
    jobDemand: 9,
    workLifeBalance: 7,
    entryDifficulty: 6,
    duration: "4 years (B.Tech) + Specialization",
    exams: ["JEE Main", "GATE"],
    topCompanies: ["Google", "Netflix", "Uber", "LinkedIn"],
    skills: ["Python", "Machine Learning", "Statistics", "SQL"],
    futureProspects: "Exceptional - AI revolution driving demand",
    color: "purple",
  },
  {
    id: "architect",
    title: "Architect",
    stream: "Science (PCM)",
    salary: { min: 500000, max: 1500000, avg: 800000 },
    growthPotential: 6,
    jobDemand: 6,
    workLifeBalance: 6,
    entryDifficulty: 5,
    duration: "5 years (B.Arch)",
    exams: ["NATA", "JEE Main Paper 2"],
    topCompanies: ["Hafeez Contractor", "CP Kukreja", "DLF"],
    skills: ["Design", "AutoCAD", "3D Modeling", "Creativity"],
    futureProspects: "Growing - Smart cities initiative",
    color: "indigo",
  },
  {
    id: "lawyer",
    title: "Lawyer",
    stream: "Commerce/Arts",
    salary: { min: 500000, max: 2000000, avg: 900000 },
    growthPotential: 7,
    jobDemand: 7,
    workLifeBalance: 5,
    entryDifficulty: 5,
    duration: "5 years (Integrated LLB)",
    exams: ["CLAT", "AILET", "LSAT"],
    topCompanies: ["AZB", "Cyril Amarchand", "Khaitan & Co"],
    skills: ["Legal Research", "Argumentation", "Writing", "Critical Thinking"],
    futureProspects: "Stable - Corporate law growing",
    color: "slate",
  },
  {
    id: "civil-services",
    title: "IAS Officer",
    stream: "Any",
    salary: { min: 800000, max: 2500000, avg: 1200000 },
    growthPotential: 7,
    jobDemand: 5,
    workLifeBalance: 4,
    entryDifficulty: 2,
    duration: "Graduation + 2-3 years prep",
    exams: ["UPSC CSE"],
    topCompanies: ["Government of India"],
    skills: ["General Knowledge", "Writing", "Interview", "Leadership"],
    futureProspects: "Prestigious - Job security & influence",
    color: "emerald",
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    stream: "Arts/Science",
    salary: { min: 400000, max: 2000000, avg: 900000 },
    growthPotential: 9,
    jobDemand: 8,
    workLifeBalance: 8,
    entryDifficulty: 7,
    duration: "4 years (B.Des/Self-learning)",
    exams: ["NID DAT", "UCEED"],
    topCompanies: ["Apple", "Google", "Swiggy", "Flipkart"],
    skills: ["Figma", "User Research", "Prototyping", "Visual Design"],
    futureProspects: "Excellent - Digital products growing",
    color: "pink",
  },
];

const formatSalary = (amount: number) => {
  if (amount >= 1000000) {
    return `₹${(amount / 1000000).toFixed(1)}L`;
  }
  return `₹${(amount / 1000).toFixed(0)}K`;
};

const getScoreColor = (score: number) => {
  if (score >= 8) return "text-green-600";
  if (score >= 5) return "text-amber-600";
  return "text-red-600";
};

const getProgressColor = (score: number) => {
  if (score >= 8) return "bg-green-500";
  if (score >= 5) return "bg-amber-500";
  return "bg-red-500";
};

const MetricBar = ({
  label,
  value,
  maxValue = 10,
  icon: Icon,
}: {
  label: string;
  value: number;
  maxValue?: number;
  icon: typeof TrendingUp;
}) => (
  <div className="space-y-1.5">
    <div className="flex items-center justify-between text-sm">
      <span className="flex items-center gap-1.5 text-muted-foreground">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </span>
      <span className={cn("font-semibold", getScoreColor(value))}>
        {value}/{maxValue}
      </span>
    </div>
    <div className="h-2 bg-muted rounded-full overflow-hidden">
      <div
        className={cn("h-full rounded-full transition-all duration-500", getProgressColor(value))}
        style={{ width: `${(value / maxValue) * 100}%` }}
      />
    </div>
  </div>
);

const CareerComparison = () => {
  const [career1, setCareer1] = useState<CareerData | null>(null);
  const [career2, setCareer2] = useState<CareerData | null>(null);

  const handleSelectCareer = (id: string, slot: 1 | 2) => {
    const career = careerDatabase.find((c) => c.id === id) || null;
    if (slot === 1) {
      setCareer1(career);
    } else {
      setCareer2(career);
    }
  };

  const calculateOverallScore = (career: CareerData) => {
    const weights = {
      salary: 0.25,
      growth: 0.25,
      demand: 0.2,
      balance: 0.15,
      entry: 0.15,
    };
    
    const salaryScore = Math.min(10, (career.salary.avg / 2000000) * 10);
    return (
      salaryScore * weights.salary +
      career.growthPotential * weights.growth +
      career.jobDemand * weights.demand +
      career.workLifeBalance * weights.balance +
      career.entryDifficulty * weights.entry
    ).toFixed(1);
  };

  const getWinner = (metric: keyof CareerData | "salary") => {
    if (!career1 || !career2) return null;
    
    if (metric === "salary") {
      return career1.salary.avg > career2.salary.avg ? 1 : career1.salary.avg < career2.salary.avg ? 2 : null;
    }
    
    const val1 = career1[metric] as number;
    const val2 = career2[metric] as number;
    
    return val1 > val2 ? 1 : val1 < val2 ? 2 : null;
  };

  return (
    <section className="py-12 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
            <Scale className="w-3 h-3 mr-1" />
            Career Comparison Tool
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Compare <span className="text-primary">Career Paths</span> Side-by-Side
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Make informed decisions by comparing salary, growth potential, work-life balance, and more
          </p>
        </div>

        {/* Selection Area */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {/* Career 1 Selector */}
            <div className="space-y-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</span>
                Select First Career
              </label>
              <Select onValueChange={(v) => handleSelectCareer(v, 1)}>
                <SelectTrigger className="w-full h-12 text-base">
                  <SelectValue placeholder="Choose a career path..." />
                </SelectTrigger>
                <SelectContent>
                  {careerDatabase.map((career) => (
                    <SelectItem 
                      key={career.id} 
                      value={career.id}
                      disabled={career.id === career2?.id}
                    >
                      <span className="flex items-center gap-2">
                        {career.title}
                        <span className="text-muted-foreground text-xs">({career.stream})</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* VS Badge */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-lg">
                VS
              </div>
            </div>

            {/* Career 2 Selector */}
            <div className="space-y-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-bold">2</span>
                Select Second Career
              </label>
              <Select onValueChange={(v) => handleSelectCareer(v, 2)}>
                <SelectTrigger className="w-full h-12 text-base">
                  <SelectValue placeholder="Choose a career path..." />
                </SelectTrigger>
                <SelectContent>
                  {careerDatabase.map((career) => (
                    <SelectItem 
                      key={career.id} 
                      value={career.id}
                      disabled={career.id === career1?.id}
                    >
                      <span className="flex items-center gap-2">
                        {career.title}
                        <span className="text-muted-foreground text-xs">({career.stream})</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Comparison Cards */}
        {(career1 || career2) && (
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Career 1 Card */}
              <Card className={cn(
                "border-2 transition-all duration-300",
                career1 ? "border-primary/30 bg-primary/5" : "border-dashed border-muted-foreground/30"
              )}>
                {career1 ? (
                  <>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Badge variant="outline" className="mb-2">{career1.stream}</Badge>
                          <CardTitle className="text-xl">{career1.title}</CardTitle>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-primary">
                            {calculateOverallScore(career1)}
                          </div>
                          <span className="text-xs text-muted-foreground">Overall Score</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Salary */}
                      <div className={cn(
                        "p-4 rounded-lg border",
                        getWinner("salary") === 1 ? "bg-green-50 dark:bg-green-950/30 border-green-200" : "bg-muted/50"
                      )}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium flex items-center gap-1.5">
                            <DollarSign className="w-4 h-4" />
                            Salary Range
                          </span>
                          {getWinner("salary") === 1 && (
                            <Badge className="bg-green-500 text-white text-xs">
                              <Award className="w-3 h-3 mr-1" />
                              Higher
                            </Badge>
                          )}
                        </div>
                        <div className="text-2xl font-bold">
                          {formatSalary(career1.salary.min)} - {formatSalary(career1.salary.max)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Avg: {formatSalary(career1.salary.avg)}/year
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="space-y-4">
                        <MetricBar label="Growth Potential" value={career1.growthPotential} icon={TrendingUp} />
                        <MetricBar label="Job Demand" value={career1.jobDemand} icon={Briefcase} />
                        <MetricBar label="Work-Life Balance" value={career1.workLifeBalance} icon={Clock} />
                        <MetricBar label="Entry Accessibility" value={career1.entryDifficulty} icon={GraduationCap} />
                      </div>

                      {/* Duration & Exams */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 rounded-lg bg-muted/50">
                          <span className="text-xs text-muted-foreground">Duration</span>
                          <p className="font-medium text-sm">{career1.duration}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/50">
                          <span className="text-xs text-muted-foreground">Key Exams</span>
                          <p className="font-medium text-sm truncate">{career1.exams.slice(0, 2).join(", ")}</p>
                        </div>
                      </div>

                      {/* Skills */}
                      <div>
                        <span className="text-sm font-medium mb-2 block">Required Skills</span>
                        <div className="flex flex-wrap gap-2">
                          {career1.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                          ))}
                        </div>
                      </div>

                      {/* Future Prospects */}
                      <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-transparent border border-primary/20">
                        <span className="text-sm font-medium flex items-center gap-1.5 mb-1">
                          <Sparkles className="w-4 h-4 text-primary" />
                          Future Prospects
                        </span>
                        <p className="text-sm text-muted-foreground">{career1.futureProspects}</p>
                      </div>

                      {/* Top Companies */}
                      <div>
                        <span className="text-sm font-medium mb-2 block">Top Companies</span>
                        <div className="flex flex-wrap gap-2">
                          {career1.topCompanies.map((company) => (
                            <Badge key={company} variant="outline" className="text-xs">{company}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p>Select first career to compare</p>
                    </div>
                  </div>
                )}
              </Card>

              {/* Career 2 Card */}
              <Card className={cn(
                "border-2 transition-all duration-300",
                career2 ? "border-secondary/50 bg-secondary/5" : "border-dashed border-muted-foreground/30"
              )}>
                {career2 ? (
                  <>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Badge variant="outline" className="mb-2">{career2.stream}</Badge>
                          <CardTitle className="text-xl">{career2.title}</CardTitle>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-secondary-foreground">
                            {calculateOverallScore(career2)}
                          </div>
                          <span className="text-xs text-muted-foreground">Overall Score</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Salary */}
                      <div className={cn(
                        "p-4 rounded-lg border",
                        getWinner("salary") === 2 ? "bg-green-50 dark:bg-green-950/30 border-green-200" : "bg-muted/50"
                      )}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium flex items-center gap-1.5">
                            <DollarSign className="w-4 h-4" />
                            Salary Range
                          </span>
                          {getWinner("salary") === 2 && (
                            <Badge className="bg-green-500 text-white text-xs">
                              <Award className="w-3 h-3 mr-1" />
                              Higher
                            </Badge>
                          )}
                        </div>
                        <div className="text-2xl font-bold">
                          {formatSalary(career2.salary.min)} - {formatSalary(career2.salary.max)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Avg: {formatSalary(career2.salary.avg)}/year
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="space-y-4">
                        <MetricBar label="Growth Potential" value={career2.growthPotential} icon={TrendingUp} />
                        <MetricBar label="Job Demand" value={career2.jobDemand} icon={Briefcase} />
                        <MetricBar label="Work-Life Balance" value={career2.workLifeBalance} icon={Clock} />
                        <MetricBar label="Entry Accessibility" value={career2.entryDifficulty} icon={GraduationCap} />
                      </div>

                      {/* Duration & Exams */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 rounded-lg bg-muted/50">
                          <span className="text-xs text-muted-foreground">Duration</span>
                          <p className="font-medium text-sm">{career2.duration}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/50">
                          <span className="text-xs text-muted-foreground">Key Exams</span>
                          <p className="font-medium text-sm truncate">{career2.exams.slice(0, 2).join(", ")}</p>
                        </div>
                      </div>

                      {/* Skills */}
                      <div>
                        <span className="text-sm font-medium mb-2 block">Required Skills</span>
                        <div className="flex flex-wrap gap-2">
                          {career2.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                          ))}
                        </div>
                      </div>

                      {/* Future Prospects */}
                      <div className="p-4 rounded-lg bg-gradient-to-r from-secondary/10 to-transparent border border-secondary/20">
                        <span className="text-sm font-medium flex items-center gap-1.5 mb-1">
                          <Sparkles className="w-4 h-4" />
                          Future Prospects
                        </span>
                        <p className="text-sm text-muted-foreground">{career2.futureProspects}</p>
                      </div>

                      {/* Top Companies */}
                      <div>
                        <span className="text-sm font-medium mb-2 block">Top Companies</span>
                        <div className="flex flex-wrap gap-2">
                          {career2.topCompanies.map((company) => (
                            <Badge key={company} variant="outline" className="text-xs">{company}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p>Select second career to compare</p>
                    </div>
                  </div>
                )}
              </Card>
            </div>

            {/* Quick Summary */}
            {career1 && career2 && (
              <Card className="mt-6 border-2 border-primary/10 bg-gradient-to-r from-primary/5 via-background to-secondary/5">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Quick Comparison Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                    {[
                      { label: "Salary", career1Win: getWinner("salary") === 1 },
                      { label: "Growth", career1Win: career1.growthPotential >= career2.growthPotential },
                      { label: "Demand", career1Win: career1.jobDemand >= career2.jobDemand },
                      { label: "Balance", career1Win: career1.workLifeBalance >= career2.workLifeBalance },
                      { label: "Accessibility", career1Win: career1.entryDifficulty >= career2.entryDifficulty },
                    ].map((item) => (
                      <div key={item.label} className="p-3 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                        <p className={cn(
                          "font-semibold text-sm",
                          item.career1Win ? "text-primary" : "text-secondary-foreground"
                        )}>
                          {item.career1Win ? career1.title.split(" ")[0] : career2.title.split(" ")[0]}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Empty State */}
        {!career1 && !career2 && (
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <Scale className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Select Two Careers to Compare</h3>
            <p className="text-muted-foreground mb-6">
              Use the dropdowns above to select career paths and see a detailed side-by-side comparison
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {careerDatabase.slice(0, 4).map((career) => (
                <Badge 
                  key={career.id} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-primary/10 transition-colors"
                  onClick={() => handleSelectCareer(career.id, 1)}
                >
                  {career.title}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CareerComparison;
