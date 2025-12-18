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

const steps = ["Company Info", "Contact Person", "Hiring Needs", "Review"];

const RegisterEmployer = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
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
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from("registrations_employers")
        .insert({
          user_id: user?.id || null,
          company_name: formData.companyName,
          industry: formData.industry || null,
          company_size: formData.companySize || null,
          website: formData.website || null,
          contact_name: formData.contactName,
          contact_email: formData.contactEmail,
          contact_phone: formData.contactPhone,
          designation: formData.designation || null,
          roles_hiring: formData.hiringRoles || null,
          experience_level: formData.experienceLevel || null,
          job_location: formData.locationsHiring || null,
          hiring_timeline: formData.hiringTimeline || null,
        });

      if (error) throw error;
      
      toast.success("Registration successful! Our team will contact you soon.");
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get('redirect');
      navigate(redirect || "/");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="premium-page-bg min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6 text-white hover:bg-white/10">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="glass-card-premium border-0 dark-card-purple">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-purple-500" />
            </div>
            <CardTitle className="text-2xl font-serif card-heading">Register as Employer</CardTitle>
            <CardDescription className="card-body">Connect with talented graduates from JKKN institutions</CardDescription>
          </CardHeader>

          {/* Progress Steps */}
          <div className="px-6 mb-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    index < currentStep 
                      ? "bg-gradient-to-r from-premium-gold to-premium-orange text-white" 
                      : index === currentStep 
                        ? "bg-premium-navy text-white" 
                        : "bg-premium-cream text-premium-navy/50"
                  }`}>
                    {index < currentStep ? <CheckCircle className="w-5 h-5" /> : index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 md:w-20 h-1 mx-2 rounded ${index < currentStep ? "bg-gradient-to-r from-premium-gold to-premium-orange" : "bg-premium-cream"}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-premium-navy/60">
              {steps.map(step => <span key={step}>{step}</span>)}
            </div>
          </div>

          <CardContent className="space-y-6">
            {currentStep === 0 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-premium-navy">Company Name *</Label>
                  <Input id="companyName" placeholder="Enter company name" value={formData.companyName} onChange={e => handleChange("companyName", e.target.value)} className="input-premium" />
                </div>
                <div className="space-y-2">
                  <Label className="text-premium-navy">Industry *</Label>
                  <Select value={formData.industry} onValueChange={v => handleChange("industry", v)}>
                    <SelectTrigger className="input-premium"><SelectValue placeholder="Select industry" /></SelectTrigger>
                    <SelectContent>
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
                  <Label className="text-premium-navy">Company Size</Label>
                  <Select value={formData.companySize} onValueChange={v => handleChange("companySize", v)}>
                    <SelectTrigger className="input-premium"><SelectValue placeholder="Select company size" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-50">1-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="501-1000">501-1000 employees</SelectItem>
                      <SelectItem value="1000+">1000+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-premium-navy">Website</Label>
                  <Input id="website" placeholder="https://www.company.com" value={formData.website} onChange={e => handleChange("website", e.target.value)} className="input-premium" />
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName" className="text-premium-navy">Contact Person Name *</Label>
                  <Input id="contactName" placeholder="Full name" value={formData.contactName} onChange={e => handleChange("contactName", e.target.value)} className="input-premium" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail" className="text-premium-navy">Email Address *</Label>
                  <Input id="contactEmail" type="email" placeholder="hr@company.com" value={formData.contactEmail} onChange={e => handleChange("contactEmail", e.target.value)} className="input-premium" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone" className="text-premium-navy">Phone Number *</Label>
                  <Input id="contactPhone" placeholder="+91 98765 43210" value={formData.contactPhone} onChange={e => handleChange("contactPhone", e.target.value)} className="input-premium" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation" className="text-premium-navy">Designation</Label>
                  <Input id="designation" placeholder="e.g., HR Manager, Talent Acquisition Lead" value={formData.designation} onChange={e => handleChange("designation", e.target.value)} className="input-premium" />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hiringRoles" className="text-premium-navy">Roles You're Hiring For</Label>
                  <Input id="hiringRoles" placeholder="e.g., Software Engineer, Data Analyst, Nurse" value={formData.hiringRoles} onChange={e => handleChange("hiringRoles", e.target.value)} className="input-premium" />
                </div>
                <div className="space-y-2">
                  <Label className="text-premium-navy">Experience Level Required</Label>
                  <Select value={formData.experienceLevel} onValueChange={v => handleChange("experienceLevel", v)}>
                    <SelectTrigger className="input-premium"><SelectValue placeholder="Select experience level" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fresher">Freshers Only</SelectItem>
                      <SelectItem value="0-2">0-2 years</SelectItem>
                      <SelectItem value="2-5">2-5 years</SelectItem>
                      <SelectItem value="mixed">Mixed (Fresher + Experienced)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="locations" className="text-premium-navy">Hiring Locations</Label>
                  <Input id="locations" placeholder="e.g., Chennai, Bangalore, Remote" value={formData.locationsHiring} onChange={e => handleChange("locationsHiring", e.target.value)} className="input-premium" />
                </div>
                <div className="space-y-2">
                  <Label className="text-premium-navy">Hiring Timeline</Label>
                  <Select value={formData.hiringTimeline} onValueChange={v => handleChange("hiringTimeline", v)}>
                    <SelectTrigger className="input-premium"><SelectValue placeholder="Select timeline" /></SelectTrigger>
                    <SelectContent>
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
                <h3 className="font-semibold text-lg text-premium-navy">Review Your Information</h3>
                <div className="glass-card rounded-xl p-4 space-y-2 text-sm">
                  <p className="text-premium-navy"><strong>Company:</strong> {formData.companyName || "Not provided"}</p>
                  <p className="text-premium-navy"><strong>Industry:</strong> {formData.industry || "Not provided"}</p>
                  <p className="text-premium-navy"><strong>Company Size:</strong> {formData.companySize || "Not provided"}</p>
                  <p className="text-premium-navy"><strong>Contact Name:</strong> {formData.contactName || "Not provided"}</p>
                  <p className="text-premium-navy"><strong>Contact Email:</strong> {formData.contactEmail || "Not provided"}</p>
                  <p className="text-premium-navy"><strong>Hiring Roles:</strong> {formData.hiringRoles || "Not provided"}</p>
                  <p className="text-premium-navy"><strong>Locations:</strong> {formData.locationsHiring || "Not provided"}</p>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 0 || isSubmitting} className="border-premium-navy/20 text-premium-navy hover:bg-premium-navy/5">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button onClick={handleNext} className="btn-premium-primary">
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="btn-premium-primary" disabled={isSubmitting}>
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
