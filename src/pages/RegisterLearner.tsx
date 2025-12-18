import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Users, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const steps = ["Personal Info", "Education", "Experience", "Review"];

const RegisterLearner = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        .from("registrations_learners")
        .insert({
          user_id: user?.id || null,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          date_of_birth: formData.dateOfBirth || null,
          institution: formData.institution || null,
          degree: formData.degree || null,
          specialization: formData.specialization || null,
          graduation_year: formData.graduationYear || null,
          experience: formData.experience || null,
          job_role: formData.currentRole || null,
          skills: formData.skills || null,
          preferred_role: formData.preferredRole || null,
        });

      if (error) throw error;
      
      toast.success("Registration successful! We'll be in touch soon.");
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
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6 text-premium-navy hover:bg-premium-gold/10">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="glass-card-premium border-0 shadow-premium">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-premium-navy/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-premium-navy" />
            </div>
            <CardTitle className="text-2xl font-serif text-premium-navy">Register as Learner</CardTitle>
            <CardDescription className="text-premium-navy/70">Find your dream job and advance your career</CardDescription>
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
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-premium-navy">Full Name *</Label>
                    <Input id="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={e => handleChange("fullName", e.target.value)} className="input-premium" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-premium-navy">Email Address *</Label>
                    <Input id="email" type="email" placeholder="your@email.com" value={formData.email} onChange={e => handleChange("email", e.target.value)} className="input-premium" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-premium-navy">Phone Number *</Label>
                    <Input id="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={e => handleChange("phone", e.target.value)} className="input-premium" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob" className="text-premium-navy">Date of Birth</Label>
                    <Input id="dob" type="date" value={formData.dateOfBirth} onChange={e => handleChange("dateOfBirth", e.target.value)} className="input-premium" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-premium-navy">JKKN Institution *</Label>
                  <Select value={formData.institution} onValueChange={v => handleChange("institution", v)}>
                    <SelectTrigger className="input-premium"><SelectValue placeholder="Select your institution" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jkkn-college-engineering">JKKN College of Engineering</SelectItem>
                      <SelectItem value="jkkn-college-arts">JKKN College of Arts & Science</SelectItem>
                      <SelectItem value="jkkn-pharmacy">JKKN College of Pharmacy</SelectItem>
                      <SelectItem value="jkkn-nursing">JKKN College of Nursing</SelectItem>
                      <SelectItem value="jkkn-dental">JKKN Dental College</SelectItem>
                      <SelectItem value="jkkn-physiotherapy">JKKN College of Physiotherapy</SelectItem>
                      <SelectItem value="jkkn-education">JKKN College of Education</SelectItem>
                      <SelectItem value="jkkn-allied">JKKN College of Allied Health Sciences</SelectItem>
                      <SelectItem value="jkkn-polytechnic">JKKN Polytechnic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="degree" className="text-premium-navy">Degree/Program *</Label>
                  <Input id="degree" placeholder="e.g., B.Tech, B.Sc, M.Pharm" value={formData.degree} onChange={e => handleChange("degree", e.target.value)} className="input-premium" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialization" className="text-premium-navy">Specialization</Label>
                  <Input id="specialization" placeholder="e.g., Computer Science, Biotechnology" value={formData.specialization} onChange={e => handleChange("specialization", e.target.value)} className="input-premium" />
                </div>
                <div className="space-y-2">
                  <Label className="text-premium-navy">Graduation Year</Label>
                  <Select value={formData.graduationYear} onValueChange={v => handleChange("graduationYear", v)}>
                    <SelectTrigger className="input-premium"><SelectValue placeholder="Select year" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2027">2027</SelectItem>
                      <SelectItem value="graduated">Already Graduated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-premium-navy">Work Experience</Label>
                  <Select value={formData.experience} onValueChange={v => handleChange("experience", v)}>
                    <SelectTrigger className="input-premium"><SelectValue placeholder="Select experience" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fresher">Fresher</SelectItem>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="1-3">1-3 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5+">5+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentRole" className="text-premium-navy">Current/Last Role</Label>
                  <Input id="currentRole" placeholder="e.g., Software Developer, Analyst" value={formData.currentRole} onChange={e => handleChange("currentRole", e.target.value)} className="input-premium" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills" className="text-premium-navy">Key Skills</Label>
                  <Input id="skills" placeholder="e.g., Python, React, Data Analysis" value={formData.skills} onChange={e => handleChange("skills", e.target.value)} className="input-premium" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredRole" className="text-premium-navy">Preferred Role</Label>
                  <Input id="preferredRole" placeholder="e.g., Full Stack Developer, Product Manager" value={formData.preferredRole} onChange={e => handleChange("preferredRole", e.target.value)} className="input-premium" />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-premium-navy">Review Your Information</h3>
                <div className="glass-card rounded-xl p-4 space-y-2 text-sm">
                  <p className="text-premium-navy"><strong>Name:</strong> {formData.fullName || "Not provided"}</p>
                  <p className="text-premium-navy"><strong>Email:</strong> {formData.email || "Not provided"}</p>
                  <p className="text-premium-navy"><strong>Phone:</strong> {formData.phone || "Not provided"}</p>
                  <p className="text-premium-navy"><strong>Institution:</strong> {formData.institution || "Not provided"}</p>
                  <p className="text-premium-navy"><strong>Degree:</strong> {formData.degree || "Not provided"}</p>
                  <p className="text-premium-navy"><strong>Specialization:</strong> {formData.specialization || "Not provided"}</p>
                  <p className="text-premium-navy"><strong>Experience:</strong> {formData.experience || "Not provided"}</p>
                  <p className="text-premium-navy"><strong>Skills:</strong> {formData.skills || "Not provided"}</p>
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

export default RegisterLearner;
