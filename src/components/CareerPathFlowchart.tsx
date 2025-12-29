import { useState } from "react";
import { 
  GraduationCap, 
  Briefcase, 
  Stethoscope, 
  Code, 
  Building2, 
  Palette, 
  Scale, 
  FlaskConical,
  Calculator,
  BookOpen,
  ChevronRight,
  Sparkles,
  TrendingUp
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CareerNode {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description: string;
  salary?: string;
  duration?: string;
  exams?: string[];
  careers?: string[];
}

interface PathData {
  stream: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  paths: CareerNode[];
}

const careerPaths: PathData[] = [
  {
    stream: "Science (PCM)",
    icon: <Calculator className="w-5 h-5" />,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    paths: [
      {
        id: "engineering",
        title: "Engineering",
        icon: <Code className="w-6 h-6" />,
        color: "text-blue-600",
        bgColor: "bg-blue-50 border-blue-200",
        description: "B.Tech/B.E in various specializations",
        salary: "₹4-25 LPA",
        duration: "4 years",
        exams: ["JEE Main", "JEE Advanced", "TNEA"],
        careers: ["Software Engineer", "Data Scientist", "AI/ML Engineer", "Civil Engineer"]
      },
      {
        id: "architecture",
        title: "Architecture",
        icon: <Building2 className="w-6 h-6" />,
        color: "text-purple-600",
        bgColor: "bg-purple-50 border-purple-200",
        description: "B.Arch - Design buildings & spaces",
        salary: "₹5-15 LPA",
        duration: "5 years",
        exams: ["NATA", "JEE Main Paper 2"],
        careers: ["Architect", "Urban Planner", "Interior Designer"]
      },
      {
        id: "pure-science",
        title: "Pure Sciences",
        icon: <FlaskConical className="w-6 h-6" />,
        color: "text-green-600",
        bgColor: "bg-green-50 border-green-200",
        description: "B.Sc in Physics, Chemistry, Math",
        salary: "₹3-12 LPA",
        duration: "3 years",
        exams: ["CUET", "University Entrance"],
        careers: ["Research Scientist", "Professor", "Data Analyst"]
      }
    ]
  },
  {
    stream: "Science (PCB)",
    icon: <Stethoscope className="w-5 h-5" />,
    color: "text-red-600",
    bgColor: "bg-red-100",
    paths: [
      {
        id: "medicine",
        title: "Medicine (MBBS)",
        icon: <Stethoscope className="w-6 h-6" />,
        color: "text-red-600",
        bgColor: "bg-red-50 border-red-200",
        description: "Become a Doctor - Heal and Save Lives",
        salary: "₹8-50 LPA",
        duration: "5.5 years",
        exams: ["NEET UG"],
        careers: ["Doctor", "Surgeon", "Specialist", "Medical Researcher"]
      },
      {
        id: "dental",
        title: "Dental (BDS)",
        icon: <Stethoscope className="w-6 h-6" />,
        color: "text-pink-600",
        bgColor: "bg-pink-50 border-pink-200",
        description: "Dental Surgeon - Oral Healthcare",
        salary: "₹5-20 LPA",
        duration: "5 years",
        exams: ["NEET UG"],
        careers: ["Dentist", "Orthodontist", "Oral Surgeon"]
      },
      {
        id: "pharmacy",
        title: "Pharmacy",
        icon: <FlaskConical className="w-6 h-6" />,
        color: "text-orange-600",
        bgColor: "bg-orange-50 border-orange-200",
        description: "B.Pharm - Pharmaceutical Sciences",
        salary: "₹4-15 LPA",
        duration: "4 years",
        exams: ["NEET", "State Entrance"],
        careers: ["Pharmacist", "Drug Inspector", "Clinical Researcher"]
      },
      {
        id: "nursing",
        title: "Nursing",
        icon: <Stethoscope className="w-6 h-6" />,
        color: "text-teal-600",
        bgColor: "bg-teal-50 border-teal-200",
        description: "B.Sc Nursing - Patient Care",
        salary: "₹3-10 LPA",
        duration: "4 years",
        exams: ["NEET", "State Nursing Entrance"],
        careers: ["Staff Nurse", "Nursing Supervisor", "Healthcare Manager"]
      }
    ]
  },
  {
    stream: "Commerce",
    icon: <Briefcase className="w-5 h-5" />,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    paths: [
      {
        id: "ca",
        title: "Chartered Accountant",
        icon: <Calculator className="w-6 h-6" />,
        color: "text-amber-600",
        bgColor: "bg-amber-50 border-amber-200",
        description: "Finance & Accounting Expert",
        salary: "₹7-30 LPA",
        duration: "3-4 years",
        exams: ["CA Foundation", "CA Intermediate", "CA Final"],
        careers: ["CA", "CFO", "Financial Analyst", "Auditor"]
      },
      {
        id: "bba",
        title: "Business Administration",
        icon: <Briefcase className="w-6 h-6" />,
        color: "text-indigo-600",
        bgColor: "bg-indigo-50 border-indigo-200",
        description: "BBA/MBA - Business Leadership",
        salary: "₹5-25 LPA",
        duration: "3+2 years",
        exams: ["CUET", "CAT", "XAT"],
        careers: ["Manager", "Entrepreneur", "Consultant", "Marketing Head"]
      },
      {
        id: "law",
        title: "Law",
        icon: <Scale className="w-6 h-6" />,
        color: "text-slate-600",
        bgColor: "bg-slate-50 border-slate-200",
        description: "LLB - Legal Professional",
        salary: "₹5-20 LPA",
        duration: "5 years (Integrated)",
        exams: ["CLAT", "AILET", "LSAT"],
        careers: ["Lawyer", "Judge", "Legal Advisor", "Corporate Counsel"]
      }
    ]
  },
  {
    stream: "Arts/Humanities",
    icon: <Palette className="w-5 h-5" />,
    color: "text-fuchsia-600",
    bgColor: "bg-fuchsia-100",
    paths: [
      {
        id: "journalism",
        title: "Journalism & Mass Comm",
        icon: <BookOpen className="w-6 h-6" />,
        color: "text-cyan-600",
        bgColor: "bg-cyan-50 border-cyan-200",
        description: "Media, News & Communication",
        salary: "₹4-15 LPA",
        duration: "3 years",
        exams: ["CUET", "IIMC Entrance"],
        careers: ["Journalist", "News Anchor", "Content Creator", "PR Manager"]
      },
      {
        id: "design",
        title: "Design",
        icon: <Palette className="w-6 h-6" />,
        color: "text-fuchsia-600",
        bgColor: "bg-fuchsia-50 border-fuchsia-200",
        description: "B.Des - Creative Design Fields",
        salary: "₹5-20 LPA",
        duration: "4 years",
        exams: ["NID DAT", "UCEED", "CEED"],
        careers: ["UI/UX Designer", "Fashion Designer", "Product Designer"]
      },
      {
        id: "civilservices",
        title: "Civil Services",
        icon: <Building2 className="w-6 h-6" />,
        color: "text-emerald-600",
        bgColor: "bg-emerald-50 border-emerald-200",
        description: "IAS/IPS/IFS - Government Leadership",
        salary: "₹8-20 LPA + Benefits",
        duration: "Any Graduation + Prep",
        exams: ["UPSC CSE"],
        careers: ["IAS Officer", "IPS Officer", "IFS Officer", "IRS Officer"]
      }
    ]
  }
];

const CareerPathFlowchart = () => {
  const [selectedStream, setSelectedStream] = useState<string | null>("Science (PCM)");
  const [selectedPath, setSelectedPath] = useState<CareerNode | null>(null);

  const currentPaths = careerPaths.find(p => p.stream === selectedStream)?.paths || [];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
            <Sparkles className="w-3 h-3 mr-1" />
            Interactive Career Navigator
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Career Path from <span className="text-primary">12th Grade</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore different education streams and discover career opportunities with salary insights, exam requirements, and job roles
          </p>
        </div>

        {/* Flowchart Container */}
        <div className="max-w-6xl mx-auto">
          {/* Starting Point - 12th Grade */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-2xl shadow-lg flex items-center gap-3">
                <GraduationCap className="w-8 h-8" />
                <div>
                  <h3 className="font-bold text-lg">12th Grade</h3>
                  <p className="text-sm opacity-90">Choose Your Stream</p>
                </div>
              </div>
              {/* Connector Line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0.5 h-8 bg-gradient-to-b from-primary to-muted-foreground/30"></div>
            </div>
          </div>

          {/* Stream Selection */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 relative">
            {/* Horizontal connector */}
            <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-muted-foreground/20"></div>
            
            {careerPaths.map((path) => (
              <button
                key={path.stream}
                onClick={() => {
                  setSelectedStream(path.stream);
                  setSelectedPath(null);
                }}
                className={cn(
                  "relative flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 border-2",
                  selectedStream === path.stream
                    ? `${path.bgColor} ${path.color} border-current shadow-lg scale-105`
                    : "bg-card border-border hover:border-primary/50 hover:shadow-md"
                )}
              >
                {/* Vertical connector */}
                <div className={cn(
                  "absolute left-1/2 -translate-x-1/2 -top-8 w-0.5 h-8",
                  selectedStream === path.stream ? "bg-primary" : "bg-muted-foreground/30"
                )}></div>
                {path.icon}
                <span className="font-medium">{path.stream}</span>
              </button>
            ))}
          </div>

          {/* Arrow indicator */}
          {selectedStream && (
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
                <ChevronRight className="w-5 h-5 rotate-90" />
                <span className="text-sm">Available Career Paths</span>
                <ChevronRight className="w-5 h-5 rotate-90" />
              </div>
            </div>
          )}

          {/* Career Path Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {currentPaths.map((path, index) => (
              <Card
                key={path.id}
                onClick={() => setSelectedPath(selectedPath?.id === path.id ? null : path)}
                className={cn(
                  "cursor-pointer transition-all duration-300 hover:shadow-lg border-2",
                  path.bgColor,
                  selectedPath?.id === path.id 
                    ? "ring-2 ring-primary ring-offset-2 scale-[1.02]" 
                    : "hover:scale-[1.01]"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg", path.bgColor, path.color)}>
                      {path.icon}
                    </div>
                    <CardTitle className="text-lg">{path.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{path.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {path.salary}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {path.duration}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed View */}
          {selectedPath && (
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-muted/50 animate-in slide-in-from-bottom-4 duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className={cn("p-3 rounded-xl", selectedPath.bgColor, selectedPath.color)}>
                    {selectedPath.icon}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{selectedPath.title}</CardTitle>
                    <p className="text-muted-foreground">{selectedPath.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Entrance Exams */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      Entrance Exams
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPath.exams?.map((exam) => (
                        <Badge key={exam} variant="secondary">
                          {exam}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Career Options */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" />
                      Career Options
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPath.careers?.map((career) => (
                        <Badge key={career} variant="outline" className="bg-primary/5">
                          {career}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Salary & Duration */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      Key Details
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-green-50 dark:bg-green-950/30">
                        <span className="text-sm text-muted-foreground">Salary Range</span>
                        <span className="font-semibold text-green-600">{selectedPath.salary}</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                        <span className="text-sm text-muted-foreground">Duration</span>
                        <span className="font-semibold text-blue-600">{selectedPath.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default CareerPathFlowchart;
