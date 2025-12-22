import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, FileText, UserCheck, Building2 } from "lucide-react";

const EmployerRegistrationSuccess = () => {
  const navigate = useNavigate();

  // Prevent browser back to form
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const steps = [
    { icon: FileText, label: "Application Submitted", status: "completed" },
    { icon: Clock, label: "Under Review", status: "current" },
    { icon: UserCheck, label: "Verification Complete", status: "pending" },
    { icon: Building2, label: "Account Activated", status: "pending" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-none shadow-xl">
        <CardContent className="pt-8 pb-6 text-center space-y-6">
          {/* Animated Checkmark */}
          <div className="relative mx-auto w-24 h-24">
            <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
            <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-white animate-in zoom-in duration-500" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Registration Successful!</h1>
            <p className="text-muted-foreground">
              Thank you for registering. Our team will review your application.
            </p>
          </div>

          {/* Verification Status */}
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400">
              <Clock className="w-5 h-5" />
              <span className="font-medium">Verification In Progress</span>
            </div>
            <p className="text-sm text-amber-600 dark:text-amber-500 mt-1">
              Usually takes 24-48 hours
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Next Steps
            </h3>
            <div className="relative">
              {steps.map((step, index) => (
                <div key={step.label} className="flex items-start gap-3 mb-4 last:mb-0">
                  <div
                    className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.status === "completed"
                        ? "bg-green-500 text-white"
                        : step.status === "current"
                        ? "bg-amber-500 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <step.icon className="w-4 h-4" />
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute left-4 top-8 w-0.5 h-8 -translate-x-1/2 ${
                        step.status === "completed" ? "bg-green-500" : "bg-muted"
                      }`}
                    />
                  )}
                  <div className="text-left pt-1">
                    <p
                      className={`text-sm font-medium ${
                        step.status === "pending" ? "text-muted-foreground" : "text-foreground"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={() => navigate("/employer/dashboard")}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Go to Dashboard
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/employer/profile")}
              className="w-full"
            >
              Complete Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployerRegistrationSuccess;
