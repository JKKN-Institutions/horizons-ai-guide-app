import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, IndianRupee, Calendar, Award, Target, Briefcase } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

interface CareerGrowthData {
  id: string;
  title: string;
  color: string;
  milestones: {
    year: number;
    salary: number;
    role: string;
    skills: string[];
  }[];
}

const careerGrowthData: CareerGrowthData[] = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    color: "hsl(var(--primary))",
    milestones: [
      { year: 0, salary: 6, role: "Fresher/Intern", skills: ["Basics", "DSA"] },
      { year: 1, salary: 8, role: "Junior Developer", skills: ["Framework", "Git"] },
      { year: 3, salary: 15, role: "Software Engineer", skills: ["System Design", "APIs"] },
      { year: 5, salary: 25, role: "Senior Engineer", skills: ["Architecture", "Mentoring"] },
      { year: 8, salary: 40, role: "Tech Lead", skills: ["Leadership", "Strategy"] },
      { year: 12, salary: 60, role: "Engineering Manager", skills: ["Team Building", "Vision"] },
      { year: 15, salary: 80, role: "Director/CTO", skills: ["Executive", "Innovation"] },
    ],
  },
  {
    id: "doctor",
    title: "Doctor (MBBS)",
    color: "hsl(142, 76%, 36%)",
    milestones: [
      { year: 0, salary: 5, role: "Intern", skills: ["Clinical Basics"] },
      { year: 1, salary: 8, role: "Junior Resident", skills: ["Diagnosis", "Treatment"] },
      { year: 4, salary: 15, role: "Senior Resident", skills: ["Specialization"] },
      { year: 6, salary: 25, role: "Consultant", skills: ["Expert Care"] },
      { year: 10, salary: 45, role: "Senior Consultant", skills: ["Research", "Teaching"] },
      { year: 15, salary: 70, role: "HOD/Director", skills: ["Administration"] },
      { year: 20, salary: 100, role: "CMO/Dean", skills: ["Leadership"] },
    ],
  },
  {
    id: "chartered-accountant",
    title: "Chartered Accountant",
    color: "hsl(221, 83%, 53%)",
    milestones: [
      { year: 0, salary: 4, role: "Articleship", skills: ["Audit Basics"] },
      { year: 1, salary: 7, role: "Junior CA", skills: ["Taxation", "Compliance"] },
      { year: 3, salary: 12, role: "CA Associate", skills: ["Financial Planning"] },
      { year: 5, salary: 20, role: "Senior CA", skills: ["Advisory", "Consulting"] },
      { year: 8, salary: 35, role: "Manager", skills: ["Team Lead", "Client Relations"] },
      { year: 12, salary: 55, role: "Partner", skills: ["Business Development"] },
      { year: 15, salary: 80, role: "Senior Partner", skills: ["Firm Strategy"] },
    ],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    color: "hsl(280, 87%, 65%)",
    milestones: [
      { year: 0, salary: 8, role: "Junior Analyst", skills: ["Python", "Statistics"] },
      { year: 1, salary: 12, role: "Data Analyst", skills: ["ML Basics", "SQL"] },
      { year: 3, salary: 20, role: "Data Scientist", skills: ["Deep Learning", "NLP"] },
      { year: 5, salary: 35, role: "Senior Data Scientist", skills: ["MLOps", "Research"] },
      { year: 8, salary: 55, role: "Lead/Principal", skills: ["Strategy", "Innovation"] },
      { year: 12, salary: 75, role: "Head of AI/ML", skills: ["Vision", "Team Building"] },
      { year: 15, salary: 100, role: "Chief Data Officer", skills: ["Executive Leadership"] },
    ],
  },
];

const SalaryGrowthTimeline = () => {
  const [selectedCareers, setSelectedCareers] = useState<string[]>(["software-engineer", "doctor"]);
  const [hoveredMilestone, setHoveredMilestone] = useState<{ careerId: string; year: number } | null>(null);

  const toggleCareer = (careerId: string) => {
    setSelectedCareers((prev) => {
      if (prev.includes(careerId)) {
        if (prev.length === 1) return prev;
        return prev.filter((id) => id !== careerId);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), careerId];
      }
      return [...prev, careerId];
    });
  };

  // Prepare chart data
  const years = [0, 1, 3, 5, 8, 12, 15, 20];
  const chartData = years.map((year) => {
    const dataPoint: Record<string, number | string> = { year: `Year ${year}` };
    selectedCareers.forEach((careerId) => {
      const career = careerGrowthData.find((c) => c.id === careerId);
      if (career) {
        const milestone = career.milestones.find((m) => m.year === year);
        if (milestone) {
          dataPoint[career.title] = milestone.salary;
        } else {
          // Interpolate if needed
          const prevMilestone = career.milestones.filter((m) => m.year < year).pop();
          const nextMilestone = career.milestones.find((m) => m.year > year);
          if (prevMilestone && nextMilestone) {
            const ratio = (year - prevMilestone.year) / (nextMilestone.year - prevMilestone.year);
            dataPoint[career.title] = Math.round(
              prevMilestone.salary + ratio * (nextMilestone.salary - prevMilestone.salary)
            );
          } else if (prevMilestone) {
            dataPoint[career.title] = prevMilestone.salary;
          }
        }
      }
    });
    return dataPoint;
  });

  const selectedCareerData = careerGrowthData.filter((c) => selectedCareers.includes(c.id));

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1">
            <TrendingUp className="w-4 h-4 mr-2" />
            Career Progression
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Salary Growth Timeline
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visualize your earning potential over the years. Compare different career paths and plan your financial future.
          </p>
        </div>

        {/* Career Selection */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {careerGrowthData.map((career) => (
            <Button
              key={career.id}
              variant={selectedCareers.includes(career.id) ? "default" : "outline"}
              onClick={() => toggleCareer(career.id)}
              className="relative"
              style={
                selectedCareers.includes(career.id)
                  ? { backgroundColor: career.color, borderColor: career.color }
                  : {}
              }
            >
              <Briefcase className="w-4 h-4 mr-2" />
              {career.title}
              {selectedCareers.includes(career.id) && (
                <span className="ml-2 w-2 h-2 rounded-full bg-white animate-pulse" />
              )}
            </Button>
          ))}
        </div>

        {/* Chart */}
        <Card className="mb-8 overflow-hidden border-2">
          <CardHeader className="bg-muted/50">
            <CardTitle className="flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-primary" />
              Salary Progression (in LPA)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <defs>
                    {selectedCareerData.map((career) => (
                      <linearGradient
                        key={career.id}
                        id={`gradient-${career.id}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor={career.color} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={career.color} stopOpacity={0} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="year" className="text-xs" />
                  <YAxis
                    tickFormatter={(value) => `₹${value}L`}
                    className="text-xs"
                    domain={[0, 110]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`₹${value} LPA`, ""]}
                  />
                  <Legend />
                  {selectedCareerData.map((career) => (
                    <Area
                      key={career.id}
                      type="monotone"
                      dataKey={career.title}
                      stroke={career.color}
                      fill={`url(#gradient-${career.id})`}
                      strokeWidth={3}
                      dot={{ fill: career.color, strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 8, strokeWidth: 0 }}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Career Milestones Timeline */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedCareerData.map((career) => (
            <Card key={career.id} className="overflow-hidden">
              <CardHeader
                className="py-4"
                style={{ backgroundColor: `${career.color}15`, borderBottom: `3px solid ${career.color}` }}
              >
                <CardTitle className="text-lg flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: career.color }}
                  />
                  {career.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="relative">
                  {/* Timeline line */}
                  <div
                    className="absolute left-3 top-0 bottom-0 w-0.5"
                    style={{ backgroundColor: `${career.color}40` }}
                  />

                  {/* Milestones */}
                  <div className="space-y-4">
                    {career.milestones.map((milestone, index) => (
                      <div
                        key={milestone.year}
                        className="relative pl-8 group cursor-pointer"
                        onMouseEnter={() =>
                          setHoveredMilestone({ careerId: career.id, year: milestone.year })
                        }
                        onMouseLeave={() => setHoveredMilestone(null)}
                      >
                        {/* Timeline dot */}
                        <div
                          className="absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white transition-transform group-hover:scale-125"
                          style={{ backgroundColor: career.color }}
                        >
                          {index + 1}
                        </div>

                        {/* Content */}
                        <div
                          className={`p-3 rounded-lg transition-all ${
                            hoveredMilestone?.careerId === career.id &&
                            hoveredMilestone?.year === milestone.year
                              ? "bg-muted shadow-md scale-[1.02]"
                              : "bg-muted/50"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Year {milestone.year}
                            </span>
                            <Badge
                              variant="secondary"
                              className="text-xs font-bold"
                              style={{ color: career.color }}
                            >
                              ₹{milestone.salary} LPA
                            </Badge>
                          </div>
                          <p className="font-medium text-sm mb-1">{milestone.role}</p>
                          <div className="flex flex-wrap gap-1">
                            {milestone.skills.map((skill) => (
                              <Badge
                                key={skill}
                                variant="outline"
                                className="text-[10px] py-0 px-1.5"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {selectedCareerData.map((career) => {
            const maxSalary = Math.max(...career.milestones.map((m) => m.salary));
            const avgGrowth = Math.round(
              (maxSalary - career.milestones[0].salary) / career.milestones.length
            );
            return (
              <Card key={career.id} className="text-center p-4">
                <div
                  className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center"
                  style={{ backgroundColor: `${career.color}20` }}
                >
                  <Target className="w-5 h-5" style={{ color: career.color }} />
                </div>
                <p className="text-xs text-muted-foreground mb-1">{career.title}</p>
                <p className="text-xl font-bold" style={{ color: career.color }}>
                  ₹{maxSalary}L
                </p>
                <p className="text-xs text-muted-foreground">
                  Peak Salary • +₹{avgGrowth}L/stage
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SalaryGrowthTimeline;
