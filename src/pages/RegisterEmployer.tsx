import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Briefcase, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const steps = ["Company Info", "Contact Person", "Hiring Needs", "Review"];

const RegisterEmployer = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
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
    aboutCompany: "",
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

  const handleSubmit = () => {
    toast.success("Registration successful! Our team will contact you soon.");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="shadow-elevated">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-accent-foreground" />
            </div>
            <CardTitle className="text-2xl font-serif">Register as Employer</CardTitle>
            <CardDescription>Connect with talented graduates from JKKN institutions</CardDescription>
          </CardHeader>

          {/* Progress Steps */}
          <div className="px-6 mb-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    index < currentStep 
                      ? "bg-secondary text-secondary-foreground" 
                      : index === currentStep 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-muted-foreground"
                  }`}>
                    {index < currentStep ? <CheckCircle className="w-5 h-5" /> : index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 md:w-20 h-1 mx-2 ${index < currentStep ? "bg-secondary" : "bg-muted"}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              {steps.map(step => <span key={step}>{step}</span>)}
            </div>
          </div>

          <CardContent className="space-y-6">
            {currentStep === 0 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input id="companyName" placeholder="Enter company name" value={formData.companyName} onChange={e => handleChange("companyName", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Industry *</Label>
                  <Select value={formData.industry} onValueChange={v => handleChange("industry", v)}>
                    <SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger>
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
                  <Label>Company Size</Label>
                  <Select value={formData.companySize} onValueChange={v => handleChange("companySize", v)}>
                    <SelectTrigger><SelectValue placeholder="Select company size" /></SelectTrigger>
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
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="https://www.company.com" value={formData.website} onChange={e => handleChange("website", e.target.value)} />
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Person Name *</Label>
                  <Input id="contactName" placeholder="Full name" value={formData.contactName} onChange={e => handleChange("contactName", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email Address *</Label>
                  <Input id="contactEmail" type="email" placeholder="hr@company.com" value={formData.contactEmail} onChange={e => handleChange("contactEmail", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Phone Number *</Label>
                  <Input id="contactPhone" placeholder="+91 98765 43210" value={formData.contactPhone} onChange={e => handleChange("contactPhone", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input id="designation" placeholder="e.g., HR Manager, Talent Acquisition Lead" value={formData.designation} onChange={e => handleChange("designation", e.target.value)} />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hiringRoles">Roles You're Hiring For</Label>
                  <Input id="hiringRoles" placeholder="e.g., Software Engineer, Data Analyst, Nurse" value={formData.hiringRoles} onChange={e => handleChange("hiringRoles", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Experience Level Required</Label>
                  <Select value={formData.experienceLevel} onValueChange={v => handleChange("experienceLevel", v)}>
                    <SelectTrigger><SelectValue placeholder="Select experience level" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fresher">Freshers Only</SelectItem>
                      <SelectItem value="0-2">0-2 years</SelectItem>
                      <SelectItem value="2-5">2-5 years</SelectItem>
                      <SelectItem value="mixed">Mixed (Fresher + Experienced)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="locations">Hiring Locations</Label>
                  <Input id="locations" placeholder="e.g., Chennai, Bangalore, Remote" value={formData.locationsHiring} onChange={e => handleChange("locationsHiring", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="about">About Your Company</Label>
                  <Textarea id="about" placeholder="Brief description of your company..." value={formData.aboutCompany} onChange={e => handleChange("aboutCompany", e.target.value)} rows={3} />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Review Your Information</h3>
                <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
                  <p><strong>Company:</strong> {formData.companyName || "Not provided"}</p>
                  <p><strong>Industry:</strong> {formData.industry || "Not provided"}</p>
                  <p><strong>Company Size:</strong> {formData.companySize || "Not provided"}</p>
                  <p><strong>Contact Name:</strong> {formData.contactName || "Not provided"}</p>
                  <p><strong>Contact Email:</strong> {formData.contactEmail || "Not provided"}</p>
                  <p><strong>Hiring Roles:</strong> {formData.hiringRoles || "Not provided"}</p>
                  <p><strong>Locations:</strong> {formData.locationsHiring || "Not provided"}</p>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button onClick={handleNext} className="bg-secondary hover:bg-secondary/90">
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">
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
