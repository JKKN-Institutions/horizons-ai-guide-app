import { Users, Building2, TrendingUp, School } from "lucide-react";

const stats = [
  { value: "5000+", label: "Learners Registered", icon: Users },
  { value: "500+", label: "Partner Companies", icon: Building2 },
  { value: "95%", label: "Placement Rate", icon: TrendingUp },
  { value: "9", label: "JKKN Institutions", icon: School },
];

const StatsBar = () => {
  return (
    <section className="bg-gradient-stats py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center text-primary-foreground animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-accent" />
              <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-primary-foreground/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
