import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, IndianRupee, TrendingUp, Briefcase, Award, Target } from "lucide-react";

interface CareerSalaryData {
  id: string;
  title: string;
  color: string;
  milestones: {
    year: number;
    salary: number;
    role: string;
  }[];
}

const careerSalaryData: CareerSalaryData[] = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    color: "hsl(var(--primary))",
    milestones: [
      { year: 0, salary: 6, role: "Fresher/Intern" },
      { year: 1, salary: 8, role: "Junior Developer" },
      { year: 3, salary: 15, role: "Software Engineer" },
      { year: 5, salary: 25, role: "Senior Engineer" },
      { year: 8, salary: 40, role: "Tech Lead" },
      { year: 12, salary: 60, role: "Engineering Manager" },
      { year: 15, salary: 80, role: "Director/CTO" },
    ],
  },
  {
    id: "doctor",
    title: "Doctor (MBBS)",
    color: "hsl(142, 76%, 36%)",
    milestones: [
      { year: 0, salary: 5, role: "Intern" },
      { year: 1, salary: 8, role: "Junior Resident" },
      { year: 4, salary: 15, role: "Senior Resident" },
      { year: 6, salary: 25, role: "Consultant" },
      { year: 10, salary: 45, role: "Senior Consultant" },
      { year: 15, salary: 70, role: "HOD/Director" },
      { year: 20, salary: 100, role: "CMO/Dean" },
    ],
  },
  {
    id: "chartered-accountant",
    title: "Chartered Accountant",
    color: "hsl(221, 83%, 53%)",
    milestones: [
      { year: 0, salary: 4, role: "Articleship" },
      { year: 1, salary: 7, role: "Junior CA" },
      { year: 3, salary: 12, role: "CA Associate" },
      { year: 5, salary: 20, role: "Senior CA" },
      { year: 8, salary: 35, role: "Manager" },
      { year: 12, salary: 55, role: "Partner" },
      { year: 15, salary: 80, role: "Senior Partner" },
    ],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    color: "hsl(280, 87%, 65%)",
    milestones: [
      { year: 0, salary: 8, role: "Junior Analyst" },
      { year: 1, salary: 12, role: "Data Analyst" },
      { year: 3, salary: 20, role: "Data Scientist" },
      { year: 5, salary: 35, role: "Senior Data Scientist" },
      { year: 8, salary: 55, role: "Lead/Principal" },
      { year: 12, salary: 75, role: "Head of AI/ML" },
      { year: 15, salary: 100, role: "Chief Data Officer" },
    ],
  },
  {
    id: "civil-services",
    title: "Civil Services (IAS)",
    color: "hsl(25, 95%, 53%)",
    milestones: [
      { year: 0, salary: 6, role: "Probationer" },
      { year: 2, salary: 8, role: "Sub-Divisional Magistrate" },
      { year: 5, salary: 12, role: "District Collector" },
      { year: 10, salary: 18, role: "Commissioner" },
      { year: 15, salary: 25, role: "Principal Secretary" },
      { year: 20, salary: 32, role: "Chief Secretary" },
      { year: 25, salary: 40, role: "Cabinet Secretary" },
    ],
  },
  {
    id: "lawyer",
    title: "Lawyer",
    color: "hsl(0, 72%, 51%)",
    milestones: [
      { year: 0, salary: 3, role: "Junior Associate" },
      { year: 2, salary: 6, role: "Associate" },
      { year: 5, salary: 15, role: "Senior Associate" },
      { year: 8, salary: 30, role: "Partner" },
      { year: 12, salary: 50, role: "Senior Partner" },
      { year: 15, salary: 80, role: "Managing Partner" },
      { year: 20, salary: 120, role: "Senior Counsel" },
    ],
  },
];

const SalaryCalculator = () => {
  const [selectedCareer, setSelectedCareer] = useState<string>("software-engineer");
  const [experience, setExperience] = useState<number>(3);

  const career = careerSalaryData.find((c) => c.id === selectedCareer)!;

  const calculatedData = useMemo(() => {
    const milestones = career.milestones;
    
    // Find the surrounding milestones for interpolation
    let prevMilestone = milestones[0];
    let nextMilestone = milestones[milestones.length - 1];
    
    for (let i = 0; i < milestones.length; i++) {
      if (milestones[i].year <= experience) {
        prevMilestone = milestones[i];
      }
      if (milestones[i].year >= experience && (!nextMilestone || milestones[i].year < nextMilestone.year)) {
        nextMilestone = milestones[i];
        break;
      }
    }

    // If experience exactly matches a milestone
    const exactMatch = milestones.find((m) => m.year === experience);
    if (exactMatch) {
      return {
        salary: exactMatch.salary,
        role: exactMatch.role,
        minSalary: Math.round(exactMatch.salary * 0.8),
        maxSalary: Math.round(exactMatch.salary * 1.3),
        nextRole: milestones.find((m) => m.year > experience)?.role || "Peak Level",
        yearsToNext: (milestones.find((m) => m.year > experience)?.year || experience) - experience,
      };
    }

    // Interpolate salary
    if (prevMilestone.year === nextMilestone.year) {
      return {
        salary: prevMilestone.salary,
        role: prevMilestone.role,
        minSalary: Math.round(prevMilestone.salary * 0.8),
        maxSalary: Math.round(prevMilestone.salary * 1.3),
        nextRole: "Peak Level",
        yearsToNext: 0,
      };
    }

    const ratio = (experience - prevMilestone.year) / (nextMilestone.year - prevMilestone.year);
    const interpolatedSalary = Math.round(
      prevMilestone.salary + ratio * (nextMilestone.salary - prevMilestone.salary)
    );

    return {
      salary: interpolatedSalary,
      role: prevMilestone.role,
      minSalary: Math.round(interpolatedSalary * 0.8),
      maxSalary: Math.round(interpolatedSalary * 1.3),
      nextRole: nextMilestone.role,
      yearsToNext: nextMilestone.year - experience,
    };
  }, [career, experience]);

  const maxExperience = Math.max(...career.milestones.map((m) => m.year));

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1">
            <Calculator className="w-4 h-4 mr-2" />
            Salary Estimator
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Salary Calculator
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Estimate your expected salary based on your career path and years of experience.
          </p>
        </div>

        <Card className="border-2 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
            <CardTitle className="flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-primary" />
              Calculate Your Salary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-8">
            {/* Career Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
                Select Your Career
              </label>
              <Select value={selectedCareer} onValueChange={setSelectedCareer}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a career" />
                </SelectTrigger>
                <SelectContent>
                  {careerSalaryData.map((c) => (
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

            {/* Experience Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Award className="w-4 h-4 text-muted-foreground" />
                  Years of Experience
                </label>
                <Badge
                  variant="secondary"
                  className="text-lg font-bold px-4"
                  style={{ color: career.color }}
                >
                  {experience} {experience === 1 ? "Year" : "Years"}
                </Badge>
              </div>
              <Slider
                value={[experience]}
                onValueChange={(value) => setExperience(value[0])}
                max={maxExperience}
                min={0}
                step={1}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Fresher</span>
                <span>{maxExperience}+ Years</span>
              </div>
            </div>

            {/* Results */}
            <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
              {/* Estimated Salary */}
              <Card
                className="text-center p-6 border-2"
                style={{ borderColor: `${career.color}40` }}
              >
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: `${career.color}20` }}
                >
                  <IndianRupee className="w-6 h-6" style={{ color: career.color }} />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Estimated Salary</p>
                <p
                  className="text-3xl font-bold"
                  style={{ color: career.color }}
                >
                  ₹{calculatedData.salary} LPA
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Range: ₹{calculatedData.minSalary}L - ₹{calculatedData.maxSalary}L
                </p>
              </Card>

              {/* Current Role */}
              <Card className="text-center p-6">
                <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center bg-muted">
                  <Briefcase className="w-6 h-6 text-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Expected Role</p>
                <p className="text-xl font-bold text-foreground">
                  {calculatedData.role}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  at {experience} years experience
                </p>
              </Card>

              {/* Next Milestone */}
              <Card className="text-center p-6">
                <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center bg-primary/10">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Next Milestone</p>
                <p className="text-xl font-bold text-foreground">
                  {calculatedData.nextRole}
                </p>
                {calculatedData.yearsToNext > 0 && (
                  <p className="text-xs text-muted-foreground mt-2">
                    in {calculatedData.yearsToNext} more years
                  </p>
                )}
              </Card>
            </div>

            {/* Career Progression Preview */}
            <div className="pt-4 border-t">
              <p className="text-sm font-medium mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                Career Progression for {career.title}
              </p>
              <div className="flex flex-wrap gap-2">
                {career.milestones.map((milestone, index) => (
                  <Badge
                    key={milestone.year}
                    variant={milestone.year <= experience ? "default" : "outline"}
                    className="cursor-pointer transition-all hover:scale-105"
                    style={
                      milestone.year <= experience
                        ? { backgroundColor: career.color, borderColor: career.color }
                        : {}
                    }
                    onClick={() => setExperience(milestone.year)}
                  >
                    Year {milestone.year}: {milestone.role}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SalaryCalculator;
