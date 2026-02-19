import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, GraduationCap, CheckCircle, Loader2, User, BookOpen, Heart, ClipboardCheck, Sparkles, Star, School, Layers, CalendarDays } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { register12thSchema } from "@/lib/validation/registration-schemas";
import { z } from "zod";
import { useLanguage } from "@/hooks/useLanguage";

const Register12thLearner = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
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

  const steps = [
    { name: t('reg12.personalInfo'), icon: User },
    { name: t('reg12.education'), icon: BookOpen },
    { name: t('reg12.interests'), icon: Heart },
    { name: t('reg12.review'), icon: ClipboardCheck }
  ];

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      const step0Fields = ["fullName", "phone", "email", "dateOfBirth"];
      for (const field of step0Fields) {
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
    }

    if (step === 1) {
      if (!formData.school || formData.school.trim().length === 0) {
        newErrors.school = "School name is required";
      }
      if (!formData.board) {
        newErrors.board = "Please select your board";
      }
      if (!formData.stream) {
        newErrors.stream = "Please select your stream";
      }
      if (!formData.expectedYear) {
        newErrors.expectedYear = "Please select expected year";
      }
    }

    if (step === 2) {
      if (!formData.preferredCourses || formData.preferredCourses.trim().length === 0) {
        newErrors.preferredCourses = "Please enter your preferred courses";
      }
      if (!formData.careerInterests || formData.careerInterests.trim().length === 0) {
        newErrors.careerInterests = "Please enter your career interests";
      }
      if (!formData.preferredLocation) {
        newErrors.preferredLocation = "Please select your preferred location";
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
      
      toast.success(t('reg12.registrationSuccess'));
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
      toast.error(t('reg12.registrationFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepDescriptions = [
    t('reg12.tellAboutYourself'),
    t('reg12.educationalBackground'),
    t('reg12.passionateAbout'),
    t('reg12.reviewInfo')
  ];

  const benefits = [
    t('reg12.benefit1'),
    t('reg12.benefit2'),
    t('reg12.benefit3'),
    t('reg12.benefit4')
  ];

  const reviewItems = [
    { label: t('reg12.name'), value: formData.fullName },
    { label: t('reg12.phone'), value: formData.phone },
    { label: t('reg12.email'), value: formData.email },
    { label: t('reg12.school'), value: formData.school },
    { label: t('reg12.board'), value: formData.board },
    { label: t('reg12.stream'), value: formData.stream },
    { label: t('reg12.careerInterests'), value: formData.careerInterests },
    { label: t('reg12.location'), value: formData.preferredLocation },
  ];

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
          <span className="text-primary font-medium">{t('reg12.back')}</span>
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
                    <CardTitle className="text-xl text-white">{t('reg12.yourJourney')}</CardTitle>
                    <p className="text-white/70 text-sm">{t('reg12.stepOf').replace('{current}', String(currentStep + 1)).replace('{total}', String(steps.length))}</p>
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
                    <span className="text-white/70">{t('reg12.progress')}</span>
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
                  {t('reg12.whyRegister')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {benefits.map((benefit, i) => (
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
                      {stepDescriptions[currentStep]}
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
                          {t('reg12.fullName')} <span className="text-destructive">*</span>
                        </Label>
                        <Input 
                          id="fullName" 
                          placeholder={t('reg12.enterFullName')} 
                          value={formData.fullName} 
                          onChange={e => handleChange("fullName", e.target.value)} 
                          className={`h-12 border-2 transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/10 ${errors.fullName ? "border-destructive" : "border-border hover:border-primary/50"}`} 
                        />
                        {errors.fullName && <p className="text-sm text-destructive animate-fade-in">{errors.fullName}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-semibold text-foreground">
                          {t('reg12.phoneNumber')} <span className="text-destructive">*</span>
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
                      <Label htmlFor="email" className="text-sm font-semibold text-foreground">{t('reg12.emailAddress')}</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder={t('reg12.emailOptional')} 
                        value={formData.email} 
                        onChange={e => handleChange("email", e.target.value)} 
                        className={`h-12 border-2 transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/10 ${errors.email ? "border-destructive" : "border-border hover:border-primary/50"}`} 
                      />
                      {errors.email && <p className="text-sm text-destructive animate-fade-in">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob" className="text-sm font-semibold text-foreground">
                        {t('reg12.dateOfBirth')} <span className="text-destructive">*</span>
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
                        {t('reg12.schoolName')} <span className="text-destructive">*</span>
                      </Label>
                      <Input 
                        id="school" 
                        placeholder={t('reg12.enterSchoolName')} 
                        value={formData.school} 
                        onChange={e => handleChange("school", e.target.value)} 
                        className={`h-12 border-2 transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/10 ${errors.school ? "border-destructive" : "border-border hover:border-primary/50"}`} 
                      />
                      {errors.school && <p className="text-sm text-destructive animate-fade-in">{errors.school}</p>}
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                          <School className="w-4 h-4 text-primary" />
                          {t('reg12.board')} <span className="text-destructive">*</span></Label>
                        <Select value={formData.board} onValueChange={v => handleChange("board", v)}>
                          <SelectTrigger className={`h-12 border-2 transition-all ${errors.board ? "border-destructive" : "border-border hover:border-primary/50 focus:border-primary"}`}>
                            <SelectValue placeholder={t('reg12.selectBoard')} />
                          </SelectTrigger>
                          <SelectContent position="popper" className="bg-white border-2 shadow-xl z-50">
                            <SelectItem value="cbse">CBSE</SelectItem>
                            <SelectItem value="state">State Board</SelectItem>
                            <SelectItem value="icse">ICSE</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.board && <p className="text-sm text-destructive animate-fade-in">{errors.board}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                          <Layers className="w-4 h-4 text-primary" />
                          {t('reg12.stream')} <span className="text-destructive">*</span></Label>
                        <Select value={formData.stream} onValueChange={v => handleChange("stream", v)}>
                          <SelectTrigger className={`h-12 border-2 transition-all ${errors.stream ? "border-destructive" : "border-border hover:border-primary/50 focus:border-primary"}`}>
                            <SelectValue placeholder={t('reg12.selectStream')} />
                          </SelectTrigger>
                          <SelectContent position="popper" className="bg-white border-2 shadow-xl z-50">
                            <SelectItem value="science">{t('reg12.science')}</SelectItem>
                            <SelectItem value="commerce">{t('reg12.commerce')}</SelectItem>
                            <SelectItem value="arts">{t('reg12.artsHumanities')}</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.stream && <p className="text-sm text-destructive animate-fade-in">{errors.stream}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-primary" />
                        {t('reg12.expectedYear')} <span className="text-destructive">*</span></Label>
                      <Select value={formData.expectedYear} onValueChange={v => handleChange("expectedYear", v)}>
                        <SelectTrigger className={`h-12 border-2 transition-all ${errors.expectedYear ? "border-destructive" : "border-border hover:border-primary/50 focus:border-primary"}`}>
                          <SelectValue placeholder={t('reg12.selectYear')} />
                        </SelectTrigger>
                        <SelectContent position="popper" className="bg-white border-2 shadow-xl z-50 max-h-60 overflow-y-auto">
                          <SelectItem value="2026">2026</SelectItem>
                          <SelectItem value="2027">2027</SelectItem>
                          <SelectItem value="2028">2028</SelectItem>
                          <SelectItem value="2029">2029</SelectItem>
                          <SelectItem value="2030">2030</SelectItem>
                          <SelectItem value="2031">2031</SelectItem>
                          <SelectItem value="2032">2032</SelectItem>
                          <SelectItem value="2033">2033</SelectItem>
                          <SelectItem value="2034">2034</SelectItem>
                          <SelectItem value="2035">2035</SelectItem>
                          <SelectItem value="2036">2036</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.expectedYear && <p className="text-sm text-destructive animate-fade-in">{errors.expectedYear}</p>}
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-5 animate-fade-in">
                    <div className="space-y-2">
                      <Label htmlFor="courses" className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Heart className="w-4 h-4 text-primary" />
                        {t('reg12.preferredCourses')} <span className="text-destructive">*</span>
                      </Label>
                      <Input 
                        id="courses" 
                        placeholder={t('reg12.preferredCoursesPlaceholder')} 
                        value={formData.preferredCourses} 
                        onChange={e => handleChange("preferredCourses", e.target.value)} 
                        className={`h-12 border-2 transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/10 ${errors.preferredCourses ? "border-destructive" : "border-border hover:border-primary/50"}`} 
                      />
                      {errors.preferredCourses && <p className="text-sm text-destructive animate-fade-in">{errors.preferredCourses}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interests" className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Star className="w-4 h-4 text-primary" />
                        {t('reg12.careerInterests')} <span className="text-destructive">*</span>
                      </Label>
                      <Input 
                        id="interests" 
                        placeholder={t('reg12.careerInterestsPlaceholder')} 
                        value={formData.careerInterests} 
                        onChange={e => handleChange("careerInterests", e.target.value)} 
                        className={`h-12 border-2 transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/10 ${errors.careerInterests ? "border-destructive" : "border-border hover:border-primary/50"}`} 
                      />
                      {errors.careerInterests && <p className="text-sm text-destructive animate-fade-in">{errors.careerInterests}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-primary" />
                        {t('reg12.preferredLocation')} <span className="text-destructive">*</span>
                      </Label>
                      <Select value={formData.preferredLocation} onValueChange={v => handleChange("preferredLocation", v)}>
                        <SelectTrigger className={`h-12 border-2 transition-all ${errors.preferredLocation ? "border-destructive" : "border-border hover:border-primary/50 focus:border-primary"}`}>
                          <SelectValue placeholder={t('reg12.selectLocation')} />
                        </SelectTrigger>
                        <SelectContent position="popper" className="bg-white border-2 shadow-xl z-50">
                          <SelectItem value="tamil-nadu">{t('reg12.tamilNadu')}</SelectItem>
                          <SelectItem value="karnataka">{t('reg12.karnataka')}</SelectItem>
                          <SelectItem value="kerala">{t('reg12.kerala')}</SelectItem>
                          <SelectItem value="anywhere">{t('reg12.anywhereIndia')}</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.preferredLocation && <p className="text-sm text-destructive animate-fade-in">{errors.preferredLocation}</p>}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 border border-primary/10">
                      <h3 className="font-bold text-lg text-primary mb-4 flex items-center gap-2">
                        <ClipboardCheck className="w-5 h-5" />
                        {t('reg12.reviewYourInfo')}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {reviewItems.map((item, i) => (
                          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-border/50">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                            <p className="font-medium text-foreground">{item.value || <span className="text-muted-foreground italic">{t('reg12.notProvided')}</span>}</p>
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
                    {t('reg12.back')}
                  </Button>
                  {currentStep < steps.length - 1 ? (
                    <Button 
                      onClick={handleNext} 
                      className="h-12 px-8 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all group"
                    >
                      {t('reg12.next')} 
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleSubmit} 
                      className="h-12 px-8 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-primary font-bold shadow-lg hover:shadow-xl transition-all" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                      {t('reg12.submitRegistration')}
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
