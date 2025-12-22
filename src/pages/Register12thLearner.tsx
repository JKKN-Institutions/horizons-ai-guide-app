import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, GraduationCap, CheckCircle, Loader2, User, BookOpen, Heart, ClipboardCheck, Sparkles, Star } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { register12thSchema } from "@/lib/validation/registration-schemas";
import { z } from "zod";

const steps = [
  { name: "Personal Info", icon: User },
  { name: "Education", icon: BookOpen },
  { name: "Interests", icon: Heart },
  { name: "Review", icon: ClipboardCheck }
];

const Register12thLearner = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    school: "",
    board: "",
    stream: "",
    expectedYear: "",
    preferredCourses: "",
    careerInterests: "",
    preferredLocation: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
    const stepFields: Record<number, string[]> = {
      0: ["fullName", "phone", "email", "dateOfBirth"],
      1: ["school"],
      2: [],
      3: [],
    };

    const fieldsToValidate = stepFields[step] || [];
    const newErrors: Record<string, string> = {};

    for (const field of fieldsToValidate) {
      try {
        const schema = register12thSchema.shape[field as keyof typeof register12thSchema.shape];
        if (schema) {
          schema.parse(formData[field as keyof typeof formData]);
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
          newErrors[field] = error.errors[0]?.message || "Invalid value";
        }
      }
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors({});

    try {
      const validatedData = register12thSchema.parse(formData);
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from("registrations_12th_learners")
        .insert({
          user_id: user?.id || null,
          full_name: validatedData.fullName,
          email: validatedData.email || null,
          phone: validatedData.phone,
          date_of_birth: validatedData.dateOfBirth || null,
          school_name: validatedData.school || null,
          board: validatedData.board || null,
          stream: validatedData.stream || null,
          percentage: validatedData.expectedYear || null,
          preferred_course: validatedData.preferredCourses || null,
          preferred_institution: validatedData.preferredLocation || null,
          career_interests: validatedData.careerInterests ? [validatedData.careerInterests] : null,
        });

      if (error) throw error;
      
      toast.success("Registration successful! We'll be in touch soon.");
      navigate('/career-assessment/colleges', { replace: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as string;
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
        toast.error(error.errors[0]?.message || "Please fix the form errors");
        return;
      }
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-amber-50/30 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
        
        {/* Floating decorative icons */}
        <div className="absolute top-20 left-[10%] animate-bounce opacity-20" style={{ animationDuration: "4s" }}>
          <Star className="w-8 h-8 text-accent" fill="currentColor" />
        </div>
        <div className="absolute top-40 right-[15%] animate-bounce opacity-20" style={{ animationDuration: "5s", animationDelay: "0.5s" }}>
          <Sparkles className="w-10 h-10 text-primary" />
        </div>
        <div className="absolute bottom-32 left-[20%] animate-bounce opacity-20" style={{ animationDuration: "3.5s", animationDelay: "1s" }}>
          <GraduationCap className="w-12 h-12 text-primary" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")} 
          className="mb-6 group hover:bg-primary/10 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="text-primary font-medium">Back</span>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Progress & Benefits */}
          <div className="lg:col-span-1 space-y-6">
            {/* Progress Card */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-primary to-primary/90 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <CardHeader className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-white">Your Journey</CardTitle>
                    <p className="text-white/70 text-sm">Step {currentStep + 1} of {steps.length}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="relative z-10 space-y-4">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isCompleted = index < currentStep;
                  const isCurrent = index === currentStep;
                  
                  return (
                    <div key={step.name} className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isCompleted 
                          ? "bg-accent text-primary" 
                          : isCurrent 
                            ? "bg-white text-primary ring-4 ring-white/30" 
                            : "bg-white/20 text-white/60"
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <StepIcon className="w-5 h-5" />
                        )}
                      </div>
                      <div className={`flex-1 ${isCurrent ? "text-white" : isCompleted ? "text-white/90" : "text-white/50"}`}>
                        <p className="font-medium text-sm">{step.name}</p>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`absolute left-[1.4rem] mt-10 w-0.5 h-6 ${isCompleted ? "bg-accent" : "bg-white/20"}`} style={{ top: `${index * 3.5 + 8}rem` }} />
                      )}
                    </div>
                  );
                })}
                
                {/* Progress Bar */}
                <div className="mt-6 pt-4 border-t border-white/20">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">Progress</span>
                    <span className="font-semibold">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits Card */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-primary flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  Why Register?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "AI-Powered Career Guidance",
                  "Personalized Course Recommendations",
                  "Connect with Top Institutions",
                  "Free Career Assessment"
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                      <CheckCircle className="w-4 h-4 text-primary group-hover:text-white" />
                    </div>
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Form Card */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-b">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
                    {(() => {
                      const CurrentIcon = steps[currentStep].icon;
                      return <CurrentIcon className="w-7 h-7 text-white" />;
                    })()}
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-primary">{steps[currentStep].name}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {currentStep === 0 && "Tell us about yourself"}
                      {currentStep === 1 && "Your educational background"}
                      {currentStep === 2 && "What are you passionate about?"}
                      {currentStep === 3 && "Review your information"}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-8 space-y-6">
                {currentStep === 0 && (
                  <div className="space-y-5 animate-fade-in">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-sm font-semibold text-foreground flex items-center gap-2">
                          <User className="w-4 h-4 text-primary" />
                          Full Name <span className="text-destructive">*</span>
                        </Label>
                        <Input 
                          id="fullName" 
                          placeholder="Enter your full name" 
                          value={formData.fullName} 
                          onChange={e => handleChange("fullName", e.target.value)} 
                          className={`h-12 border-2 transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/10 ${errors.fullName ? "border-destructive" : "border-border hover:border-primary/50"}`} 
                        />
                        {errors.fullName && <p className="text-sm text-destructive animate-fade-in">{errors.fullName}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-semibold text-foreground">
                          Phone Number <span className="text-destructive">*</span>
                        </Label>
                        <Input 
                          id="phone" 
                          placeholder="9876543210" 
                          value={formData.phone} 
                          onChange={e => handleChange("phone", e.target.value)} 
                          className={`h-12 border-2 transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/10 ${errors.phone ? "border-destructive" : "border-border hover:border-primary/50"}`} 
                        />
                        {errors.phone && <p className="text-sm text-destructive animate-fade-in">{errors.phone}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-foreground">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your@email.com (optional)" 
                        value={formData.email} 
                        onChange={e => handleChange("email", e.target.value)} 
                        className={`h-12 border-2 transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/10 ${errors.email ? "border-destructive" : "border-border hover:border-primary/50"}`} 
                      />
                      {errors.email && <p className="text-sm text-destructive animate-fade-in">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob" className="text-sm font-semibold text-foreground">
                        Date of Birth <span className="text-destructive">*</span>
                      </Label>
                      <Input 
                        id="dob" 
                        type="date" 
                        value={formData.dateOfBirth} 
                        onChange={e => handleChange("dateOfBirth", e.target.value)} 
                        className={`h-12 border-2 transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/10 ${errors.dateOfBirth ? "border-destructive" : "border-border hover:border-primary/50"}`} 
                      />
                      {errors.dateOfBirth && <p className="text-sm text-destructive animate-fade-in">{errors.dateOfBirth}</p>}
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-5 animate-fade-in">
                    <div className="space-y-2">
                      <Label htmlFor="school" className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-primary" />
                        School Name <span className="text-destructive">*</span>
                      </Label>
                      <Input 
                        id="school" 
                        placeholder="Enter your school name" 
                        value={formData.school} 
                        onChange={e => handleChange("school", e.target.value)} 
                        className={`h-12 border-2 transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/10 ${errors.school ? "border-destructive" : "border-border hover:border-primary/50"}`} 
                      />
                      {errors.school && <p className="text-sm text-destructive animate-fade-in">{errors.school}</p>}
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground">Board</Label>
                        <Select value={formData.board} onValueChange={v => handleChange("board", v)}>
                          <SelectTrigger className="h-12 border-2 border-border hover:border-primary/50 focus:border-primary transition-all">
                            <SelectValue placeholder="Select your board" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-2 shadow-xl">
                            <SelectItem value="cbse">CBSE</SelectItem>
                            <SelectItem value="state">State Board</SelectItem>
                            <SelectItem value="icse">ICSE</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground">Stream</Label>
                        <Select value={formData.stream} onValueChange={v => handleChange("stream", v)}>
                          <SelectTrigger className="h-12 border-2 border-border hover:border-primary/50 focus:border-primary transition-all">
                            <SelectValue placeholder="Select your stream" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-2 shadow-xl">
                            <SelectItem value="science">Science</SelectItem>
                            <SelectItem value="commerce">Commerce</SelectItem>
                            <SelectItem value="arts">Arts/Humanities</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-foreground">Expected Year of Passing</Label>
                      <Select value={formData.expectedYear} onValueChange={v => handleChange("expectedYear", v)}>
                        <SelectTrigger className="h-12 border-2 border-border hover:border-primary/50 focus:border-primary transition-all">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-2 shadow-xl">
                          <SelectItem value="2025">2025</SelectItem>
                          <SelectItem value="2026">2026</SelectItem>
                          <SelectItem value="2027">2027</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-5 animate-fade-in">
                    <div className="space-y-2">
                      <Label htmlFor="courses" className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Heart className="w-4 h-4 text-primary" />
                        Preferred Courses
                      </Label>
                      <Input 
                        id="courses" 
                        placeholder="e.g., Engineering, Medicine, Arts" 
                        value={formData.preferredCourses} 
                        onChange={e => handleChange("preferredCourses", e.target.value)} 
                        className="h-12 border-2 transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/10 border-border hover:border-primary/50" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interests" className="text-sm font-semibold text-foreground">Career Interests</Label>
                      <Input 
                        id="interests" 
                        placeholder="e.g., Software Development, Healthcare" 
                        value={formData.careerInterests} 
                        onChange={e => handleChange("careerInterests", e.target.value)} 
                        className="h-12 border-2 transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/10 border-border hover:border-primary/50" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-foreground">Preferred Location</Label>
                      <Select value={formData.preferredLocation} onValueChange={v => handleChange("preferredLocation", v)}>
                        <SelectTrigger className="h-12 border-2 border-border hover:border-primary/50 focus:border-primary transition-all">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-2 shadow-xl">
                          <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                          <SelectItem value="karnataka">Karnataka</SelectItem>
                          <SelectItem value="kerala">Kerala</SelectItem>
                          <SelectItem value="anywhere">Anywhere in India</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 border border-primary/10">
                      <h3 className="font-bold text-lg text-primary mb-4 flex items-center gap-2">
                        <ClipboardCheck className="w-5 h-5" />
                        Review Your Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { label: "Name", value: formData.fullName },
                          { label: "Phone", value: formData.phone },
                          { label: "Email", value: formData.email },
                          { label: "School", value: formData.school },
                          { label: "Board", value: formData.board },
                          { label: "Stream", value: formData.stream },
                          { label: "Career Interests", value: formData.careerInterests },
                          { label: "Location", value: formData.preferredLocation },
                        ].map((item, i) => (
                          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-border/50">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                            <p className="font-medium text-foreground">{item.value || <span className="text-muted-foreground italic">Not provided</span>}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t">
                  <Button 
                    variant="outline" 
                    onClick={handleBack} 
                    disabled={currentStep === 0 || isSubmitting} 
                    className="h-12 px-6 border-2 hover:bg-primary/5 transition-all group"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
                    Back
                  </Button>
                  {currentStep < steps.length - 1 ? (
                    <Button 
                      onClick={handleNext} 
                      className="h-12 px-8 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all group"
                    >
                      Next 
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleSubmit} 
                      className="h-12 px-8 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-primary font-bold shadow-lg hover:shadow-xl transition-all" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                      Submit Registration
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register12thLearner;