import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Briefcase, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { registerEmployerSchema } from "@/lib/validation/registration-schemas";
import { z } from "zod";

const steps = ["Company Info", "Contact Person", "Hiring Needs", "Review"];

const RegisterEmployer = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    website: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    designation: "",
    hiringRoles: "",
    experienceLevel: "",
    locationsHiring: "",
    hiringTimeline: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
    const stepFields: Record<number, string[]> = {
      0: ["companyName", "website"],
      1: ["contactName", "contactEmail", "contactPhone"],
      2: [],
      3: [],
    };

    const fieldsToValidate = stepFields[step] || [];
    const newErrors: Record<string, string> = {};

    for (const field of fieldsToValidate) {
      try {
        const schema = registerEmployerSchema.shape[field as keyof typeof registerEmployerSchema.shape];
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
      const validatedData = registerEmployerSchema.parse(formData);

      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from("registrations_employers")
        .insert({
          user_id: user?.id || null,
          company_name: validatedData.companyName,
          industry: validatedData.industry || null,
          company_size: validatedData.companySize || null,
          website: validatedData.website || null,
          contact_name: validatedData.contactName,
          contact_email: validatedData.contactEmail,
          contact_phone: validatedData.contactPhone,
          designation: validatedData.designation || null,
          roles_hiring: validatedData.hiringRoles || null,
          experience_level: validatedData.experienceLevel || null,
          job_location: validatedData.locationsHiring || null,
          hiring_timeline: validatedData.hiringTimeline || null,
        });

      if (error) throw error;
      
      toast.success("Registration successful! Our team will contact you soon.");
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get('redirect');
      navigate(redirect || "/");
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
    <div className="fresh-page-wrapper py-12">
      <div className="container mx-auto px-4 max-w-2xl relative z-10">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6 text-fresh-green-dark hover:text-fresh-green-medium hover:bg-fresh-green-bg">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="fresh-card border-l-purple-500">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-purple-600" />
            </div>
            <CardTitle className="text-2xl font-serif text-fresh-green-dark">Register as Employer</CardTitle>
            <CardDescription className="fresh-body">Connect with talented graduates from JKKN institutions</CardDescription>
          </CardHeader>

          {/* Progress Steps */}
          <div className="px-6 mb-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    index < currentStep 
                      ? "bg-gradient-to-r from-fresh-green-medium to-fresh-green-light text-white" 
                      : index === currentStep 
                        ? "bg-gradient-to-r from-fresh-gold-dark to-fresh-gold-medium text-white" 
                        : "bg-gray-200 text-gray-500"
                  }`}>
                    {index < currentStep ? <CheckCircle className="w-5 h-5" /> : index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 md:w-20 h-1 mx-2 rounded ${index < currentStep ? "bg-gradient-to-r from-fresh-green-medium to-fresh-green-light" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs fresh-muted">
              {steps.map(step => <span key={step}>{step}</span>)}
            </div>
          </div>

          <CardContent className="space-y-6">
            {currentStep === 0 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="fresh-label">Company Name *</Label>
                  <Input 
                    id="companyName" 
                    placeholder="Enter company name" 
                    value={formData.companyName} 
                    onChange={e => handleChange("companyName", e.target.value)} 
                    className={`fresh-input ${errors.companyName ? "border-destructive" : ""}`} 
                  />
                  {errors.companyName && <p className="text-sm text-destructive">{errors.companyName}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="fresh-label">Industry *</Label>
                  <Select value={formData.industry} onValueChange={v => handleChange("industry", v)}>
                    <SelectTrigger className="fresh-input"><SelectValue placeholder="Select industry" /></SelectTrigger>
                    <SelectContent className="bg-white border border-fresh-green-light">
                      <SelectItem value="it">IT / Software</SelectItem>
                      <SelectItem value="healthcare">Healthcare / Pharma</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="finance">Finance / Banking</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="retail">Retail / E-commerce</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="fresh-label">Company Size</Label>
                  <Select value={formData.companySize} onValueChange={v => handleChange("companySize", v)}>
                    <SelectTrigger className="fresh-input"><SelectValue placeholder="Select company size" /></SelectTrigger>
                    <SelectContent className="bg-white border border-fresh-green-light">
                      <SelectItem value="1-50">1-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="501-1000">501-1000 employees</SelectItem>
                      <SelectItem value="1000+">1000+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="fresh-label">Website</Label>
                  <Input 
                    id="website" 
                    placeholder="https://www.company.com" 
                    value={formData.website} 
                    onChange={e => handleChange("website", e.target.value)} 
                    className={`fresh-input ${errors.website ? "border-destructive" : ""}`} 
                  />
                  {errors.website && <p className="text-sm text-destructive">{errors.website}</p>}
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName" className="fresh-label">Contact Person Name *</Label>
                  <Input 
                    id="contactName" 
                    placeholder="Full name" 
                    value={formData.contactName} 
                    onChange={e => handleChange("contactName", e.target.value)} 
                    className={`fresh-input ${errors.contactName ? "border-destructive" : ""}`} 
                  />
                  {errors.contactName && <p className="text-sm text-destructive">{errors.contactName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail" className="fresh-label">Email Address *</Label>
                  <Input 
                    id="contactEmail" 
                    type="email" 
                    placeholder="hr@company.com" 
                    value={formData.contactEmail} 
                    onChange={e => handleChange("contactEmail", e.target.value)} 
                    className={`fresh-input ${errors.contactEmail ? "border-destructive" : ""}`} 
                  />
                  {errors.contactEmail && <p className="text-sm text-destructive">{errors.contactEmail}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone" className="fresh-label">Phone Number *</Label>
                  <Input 
                    id="contactPhone" 
                    placeholder="9876543210" 
                    value={formData.contactPhone} 
                    onChange={e => handleChange("contactPhone", e.target.value)} 
                    className={`fresh-input ${errors.contactPhone ? "border-destructive" : ""}`} 
                  />
                  {errors.contactPhone && <p className="text-sm text-destructive">{errors.contactPhone}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation" className="fresh-label">Designation</Label>
                  <Input id="designation" placeholder="e.g., HR Manager, Talent Acquisition Lead" value={formData.designation} onChange={e => handleChange("designation", e.target.value)} className="fresh-input" />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hiringRoles" className="fresh-label">Roles You're Hiring For</Label>
                  <Input id="hiringRoles" placeholder="e.g., Software Engineer, Data Analyst, Nurse" value={formData.hiringRoles} onChange={e => handleChange("hiringRoles", e.target.value)} className="fresh-input" />
                </div>
                <div className="space-y-2">
                  <Label className="fresh-label">Experience Level Required</Label>
                  <Select value={formData.experienceLevel} onValueChange={v => handleChange("experienceLevel", v)}>
                    <SelectTrigger className="fresh-input"><SelectValue placeholder="Select experience level" /></SelectTrigger>
                    <SelectContent className="bg-white border border-fresh-green-light">
                      <SelectItem value="fresher">Freshers Only</SelectItem>
                      <SelectItem value="0-2">0-2 years</SelectItem>
                      <SelectItem value="2-5">2-5 years</SelectItem>
                      <SelectItem value="mixed">Mixed (Fresher + Experienced)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="locations" className="fresh-label">Hiring Locations</Label>
                  <Input id="locations" placeholder="e.g., Chennai, Bangalore, Remote" value={formData.locationsHiring} onChange={e => handleChange("locationsHiring", e.target.value)} className="fresh-input" />
                </div>
                <div className="space-y-2">
                  <Label className="fresh-label">Hiring Timeline</Label>
                  <Select value={formData.hiringTimeline} onValueChange={v => handleChange("hiringTimeline", v)}>
                    <SelectTrigger className="fresh-input"><SelectValue placeholder="Select timeline" /></SelectTrigger>
                    <SelectContent className="bg-white border border-fresh-green-light">
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="1-month">Within 1 month</SelectItem>
                      <SelectItem value="3-months">Within 3 months</SelectItem>
                      <SelectItem value="6-months">Within 6 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-fresh-green-dark">Review Your Information</h3>
                <div className="fresh-card rounded-xl p-4 space-y-2 text-sm bg-fresh-green-bg">
                  <p className="fresh-card-title"><strong>Company:</strong> {formData.companyName || "Not provided"}</p>
                  <p className="fresh-body"><strong>Industry:</strong> {formData.industry || "Not provided"}</p>
                  <p className="fresh-body"><strong>Company Size:</strong> {formData.companySize || "Not provided"}</p>
                  <p className="fresh-body"><strong>Contact Name:</strong> {formData.contactName || "Not provided"}</p>
                  <p className="fresh-body"><strong>Contact Email:</strong> {formData.contactEmail || "Not provided"}</p>
                  <p className="fresh-body"><strong>Hiring Roles:</strong> {formData.hiringRoles || "Not provided"}</p>
                  <p className="fresh-body"><strong>Locations:</strong> {formData.locationsHiring || "Not provided"}</p>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 0 || isSubmitting} className="btn-fresh-outline">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button onClick={handleNext} className="btn-fresh-primary">
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="btn-fresh-primary" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Submit Registration
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterEmployer;
