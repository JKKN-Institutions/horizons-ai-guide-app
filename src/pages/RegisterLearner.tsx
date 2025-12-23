import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { registerLearnerSchema } from "@/lib/validation/registration-schemas";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

const steps = [
  { id: 1, name: "Personal Info" },
  { id: 2, name: "Education" },
  { id: 3, name: "Experience" },
];

const RegisterLearner = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    institution: "",
    degree: "",
    specialization: "",
    graduationYear: "",
    experience: "",
    currentRole: "",
    skills: "",
    preferredRole: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const stepFields: Record<number, (keyof typeof formData)[]> = {
      1: ["fullName", "email", "phone"],
      2: ["institution", "degree"],
      3: ["experience"],
    };

    const fieldsToValidate = stepFields[step] || [];
    const newErrors: Record<string, string> = {};
    
    // Basic validation for required fields
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/[\s\-\+]/g, '').replace(/^91/, ''))) {
        newErrors.phone = "Enter valid 10-digit mobile number starting with 6-9";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    try {
      const validatedData = registerLearnerSchema.parse(formData);
      setIsSubmitting(true);

      const { error } = await supabase.from("registrations_learners").insert({
        full_name: validatedData.fullName,
        email: validatedData.email,
        phone: validatedData.phone,
        date_of_birth: validatedData.dateOfBirth || null,
        institution: validatedData.institution || null,
        degree: validatedData.degree || null,
        specialization: validatedData.specialization || null,
        graduation_year: validatedData.graduationYear || null,
        experience: validatedData.experience || null,
        job_role: validatedData.currentRole || null,
        skills: validatedData.skills || null,
        preferred_role: validatedData.preferredRole || null,
      });

      if (error) throw error;

      toast.success("Registration successful! We'll be in touch soon.");
      navigate("/");
    } catch (error: unknown) {
      if (error && typeof error === "object" && "errors" in error) {
        const zodError = error as { errors: Array<{ path: string[]; message: string }> };
        const newErrors: Record<string, string> = {};
        zodError.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
        toast.error("Please fix the errors in the form");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-serif text-primary">
              Register as Learner
            </CardTitle>
            <CardDescription>
              Find your dream job and advance your career
            </CardDescription>
          </CardHeader>

          {/* Progress Steps */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors ${
                        currentStep > step.id
                          ? "bg-primary border-primary text-primary-foreground"
                          : currentStep === step.id
                          ? "bg-primary border-primary text-primary-foreground"
                          : "bg-background border-muted-foreground/30 text-muted-foreground"
                      }`}
                    >
                      {currentStep > step.id ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        step.id
                      )}
                    </div>
                    <span
                      className={`mt-2 text-xs ${
                        currentStep >= step.id
                          ? "text-primary font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 w-16 sm:w-24 mx-2 ${
                        currentStep > step.id ? "bg-primary" : "bg-muted-foreground/30"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <CardContent className="pt-4">
            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="e.g., Ramesh Kumar"
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    className={errors.fullName ? "border-destructive" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-destructive mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="e.g., ramesh@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Mobile Number *</Label>
                  <Input
                    id="phone"
                    placeholder="e.g., 9876543210"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && (
                    <p className="text-xs text-destructive mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Education */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="institution">Institution/College</Label>
                  <Input
                    id="institution"
                    placeholder="e.g., Anna University"
                    value={formData.institution}
                    onChange={(e) => handleChange("institution", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="degree">Degree/Qualification</Label>
                  <Select
                    value={formData.degree}
                    onValueChange={(value) => handleChange("degree", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select degree" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10th">10th Pass</SelectItem>
                      <SelectItem value="12th">12th Pass</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="iti">ITI</SelectItem>
                      <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                      <SelectItem value="masters">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="specialization">Specialization/Major</Label>
                  <Input
                    id="specialization"
                    placeholder="e.g., Computer Science, Mechanical Engineering"
                    value={formData.specialization}
                    onChange={(e) => handleChange("specialization", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="graduationYear">Graduation Year</Label>
                  <Select
                    value={formData.graduationYear}
                    onValueChange={(value) => handleChange("graduationYear", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => 2025 - i).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 3: Experience */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="experience">Work Experience</Label>
                  <Select
                    value={formData.experience}
                    onValueChange={(value) => handleChange("experience", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fresher">Fresher (0 years)</SelectItem>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="1-3">1-3 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5-10">5-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="currentRole">Current/Last Role</Label>
                  <Input
                    id="currentRole"
                    placeholder="e.g., Software Developer, Analyst"
                    value={formData.currentRole}
                    onChange={(e) => handleChange("currentRole", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="skills">Key Skills</Label>
                  <Input
                    id="skills"
                    placeholder="e.g., Python, React, Data Analysis"
                    value={formData.skills}
                    onChange={(e) => handleChange("skills", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="preferredRole">Preferred Role</Label>
                  <Input
                    id="preferredRole"
                    placeholder="e.g., Full Stack Developer, Product Manager"
                    value={formData.preferredRole}
                    onChange={(e) => handleChange("preferredRole", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={currentStep === 1 ? () => navigate(-1) : handleBack}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              {currentStep < steps.length ? (
                <Button onClick={handleNext} className="gap-2 bg-amber-500 hover:bg-amber-600">
                  NEXT
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="gap-2 bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? "Submitting..." : "Submit Registration"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterLearner;
