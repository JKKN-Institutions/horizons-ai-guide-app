import { useState, useRef, useEffect } from "react";
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
  Sparkles,
  TrendingUp
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Animated SVG connector component
const AnimatedConnector = ({ 
  startX, 
  startY, 
  endX, 
  endY, 
  isActive = false,
  delay = 0 
}: { 
  startX: number; 
  startY: number; 
  endX: number; 
  endY: number; 
  isActive?: boolean;
  delay?: number;
}) => {
  const midY = startY + (endY - startY) / 2;
  const pathD = `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`;
  
  return (
    <g>
      {/* Background path */}
      <path
        d={pathD}
        fill="none"
        stroke="hsl(var(--muted-foreground) / 0.2)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Animated foreground path */}
      <path
        d={pathD}
        fill="none"
        stroke={isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground) / 0.3)"}
        strokeWidth={isActive ? "3" : "2"}
        strokeLinecap="round"
        strokeDasharray="1000"
        strokeDashoffset={isActive ? "0" : "1000"}
        style={{
          transition: `stroke-dashoffset 0.8s ease-out ${delay}s, stroke 0.3s ease`,
        }}
      />
      {/* Animated dot */}
      {isActive && (
        <circle
          r="4"
          fill="hsl(var(--primary))"
          style={{
            offsetPath: `path('${pathD}')`,
            animation: `flowDot 2s ease-in-out infinite ${delay}s`,
          }}
        >
          <animateMotion
            dur="2s"
            repeatCount="indefinite"
            path={pathD}
            begin={`${delay}s`}
          />
        </circle>
      )}
    </g>
  );
};

// Pulsing node indicator
const PulsingDot = ({ isActive }: { isActive: boolean }) => (
  <span className="relative flex h-3 w-3">
    {isActive && (
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
    )}
    <span className={cn(
      "relative inline-flex rounded-full h-3 w-3",
      isActive ? "bg-primary" : "bg-muted-foreground/30"
    )}></span>
  </span>
);

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
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const startNodeRef = useRef<HTMLDivElement>(null);
  const streamRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const currentPaths = careerPaths.find(p => p.stream === selectedStream)?.paths || [];
  const selectedStreamIndex = careerPaths.findIndex(p => p.stream === selectedStream);

  // Calculate SVG dimensions and positions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setSvgDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [selectedStream, currentPaths]);

  // Get element center position relative to container
  const getElementCenter = (el: HTMLElement | null) => {
    if (!el || !containerRef.current) return { x: 0, y: 0 };
    const containerRect = containerRef.current.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    return {
      x: elRect.left - containerRect.left + elRect.width / 2,
      y: elRect.top - containerRect.top + elRect.height / 2,
    };
  };

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
        <div className="max-w-6xl mx-auto relative" ref={containerRef}>
          {/* SVG Layer for animated connections */}
          <svg 
            className="absolute inset-0 pointer-events-none z-0" 
            width={svgDimensions.width} 
            height={svgDimensions.height}
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="flowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--primary) / 0.3)" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Connections from 12th to streams */}
            {startNodeRef.current && streamRefs.current.map((streamEl, index) => {
              if (!streamEl) return null;
              const start = getElementCenter(startNodeRef.current);
              const end = getElementCenter(streamEl);
              const isActive = index === selectedStreamIndex;
              
              return (
                <AnimatedConnector
                  key={`stream-${index}`}
                  startX={start.x}
                  startY={start.y + 30}
                  endX={end.x}
                  endY={end.y - 24}
                  isActive={isActive}
                  delay={index * 0.1}
                />
              );
            })}

            {/* Connections from selected stream to career cards */}
            {selectedStreamIndex >= 0 && streamRefs.current[selectedStreamIndex] && 
              cardRefs.current.map((cardEl, index) => {
                if (!cardEl) return null;
                const streamEl = streamRefs.current[selectedStreamIndex];
                if (!streamEl) return null;
                const start = getElementCenter(streamEl);
                const end = getElementCenter(cardEl);
                const isActive = selectedPath?.id === currentPaths[index]?.id;
                
                return (
                  <AnimatedConnector
                    key={`card-${index}`}
                    startX={start.x}
                    startY={start.y + 24}
                    endX={end.x}
                    endY={end.y - 60}
                    isActive={isActive}
                    delay={0.3 + index * 0.1}
                  />
                );
              })
            }
          </svg>

          {/* Starting Point - 12th Grade */}
          <div className="flex justify-center mb-12 relative z-10">
            <div ref={startNodeRef} className="relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-2xl shadow-lg flex items-center gap-3 border-2 border-primary-foreground/20">
                <div className="relative">
                  <GraduationCap className="w-8 h-8" />
                  <span className="absolute -top-1 -right-1">
                    <PulsingDot isActive={true} />
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">12th Grade</h3>
                  <p className="text-sm opacity-90">Choose Your Stream</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stream Selection */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 relative z-10">
            {careerPaths.map((path, index) => (
              <button
                key={path.stream}
                ref={(el) => { streamRefs.current[index] = el; }}
                onClick={() => {
                  setSelectedStream(path.stream);
                  setSelectedPath(null);
                  // Reset card refs for new stream
                  cardRefs.current = [];
                }}
                className={cn(
                  "relative flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 border-2 group",
                  selectedStream === path.stream
                    ? `${path.bgColor} ${path.color} border-current shadow-lg scale-105`
                    : "bg-card border-border hover:border-primary/50 hover:shadow-md hover:scale-102"
                )}
              >
                {/* Pulsing indicator */}
                <span className="absolute -top-1.5 -right-1.5">
                  <PulsingDot isActive={selectedStream === path.stream} />
                </span>
                
                <div className={cn(
                  "p-2 rounded-lg transition-all duration-300",
                  selectedStream === path.stream ? path.bgColor : "bg-muted"
                )}>
                  {path.icon}
                </div>
                <span className="font-medium">{path.stream}</span>
              </button>
            ))}
          </div>

          {/* Flow indicator */}
          {selectedStream && (
            <div className="flex justify-center mb-8 relative z-10">
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-muted/50 border border-border">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span 
                      key={i}
                      className="w-2 h-2 rounded-full bg-primary animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground font-medium">Available Career Paths</span>
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span 
                      key={i}
                      className="w-2 h-2 rounded-full bg-primary animate-pulse"
                      style={{ animationDelay: `${(2 - i) * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Career Path Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8 relative z-10">
            {currentPaths.map((path, index) => (
              <Card
                key={path.id}
                ref={(el) => { cardRefs.current[index] = el; }}
                onClick={() => setSelectedPath(selectedPath?.id === path.id ? null : path)}
                className={cn(
                  "cursor-pointer transition-all duration-300 hover:shadow-xl border-2 relative overflow-hidden group",
                  path.bgColor,
                  selectedPath?.id === path.id 
                    ? "ring-2 ring-primary ring-offset-2 scale-[1.02]" 
                    : "hover:scale-[1.02]"
                )}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: 'fade-in 0.5s ease-out forwards',
                  opacity: 0,
                }}
              >
                {/* Animated border gradient on selection */}
                {selectedPath?.id === path.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 animate-pulse" />
                )}
                
                {/* Connection indicator */}
                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2">
                  <PulsingDot isActive={selectedPath?.id === path.id} />
                </span>

                <CardHeader className="pb-2 relative">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-lg transition-transform duration-300 group-hover:scale-110",
                      path.bgColor, 
                      path.color
                    )}>
                      {path.icon}
                    </div>
                    <CardTitle className="text-lg">{path.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative">
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
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-muted/50 animate-in slide-in-from-bottom-4 duration-300 relative z-10 overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 animate-pulse" />
              
              <CardHeader className="relative">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "p-3 rounded-xl relative",
                    selectedPath.bgColor, 
                    selectedPath.color
                  )}>
                    <span className="absolute -top-1 -right-1">
                      <PulsingDot isActive={true} />
                    </span>
                    {selectedPath.icon}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{selectedPath.title}</CardTitle>
                    <p className="text-muted-foreground">{selectedPath.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Entrance Exams */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      Entrance Exams
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPath.exams?.map((exam, i) => (
                        <Badge 
                          key={exam} 
                          variant="secondary"
                          className="animate-fade-in"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        >
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
                      {selectedPath.careers?.map((career, i) => (
                        <Badge 
                          key={career} 
                          variant="outline" 
                          className="bg-primary/5 animate-fade-in"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        >
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
                      <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                        <span className="text-sm text-muted-foreground">Salary Range</span>
                        <span className="font-semibold text-green-600">{selectedPath.salary}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
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
