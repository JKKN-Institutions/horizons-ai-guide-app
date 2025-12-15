import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Users, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const steps = ["Personal Info", "Education", "Experience", "Review"];

const RegisterLearner = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
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

  const handleSubmit = () => {
    toast.success("Registration successful! We'll be in touch soon.");
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
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-serif">Register as Learner</CardTitle>
            <CardDescription>Find your dream job and advance your career</CardDescription>
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
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input id="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={e => handleChange("fullName", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="your@email.com" value={formData.email} onChange={e => handleChange("email", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={e => handleChange("phone", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" value={formData.dateOfBirth} onChange={e => handleChange("dateOfBirth", e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>JKKN Institution *</Label>
                  <Select value={formData.institution} onValueChange={v => handleChange("institution", v)}>
                    <SelectTrigger><SelectValue placeholder="Select your institution" /></SelectTrigger>
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
                  <Label htmlFor="degree">Degree/Program *</Label>
                  <Input id="degree" placeholder="e.g., B.Tech, B.Sc, M.Pharm" value={formData.degree} onChange={e => handleChange("degree", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input id="specialization" placeholder="e.g., Computer Science, Biotechnology" value={formData.specialization} onChange={e => handleChange("specialization", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Graduation Year</Label>
                  <Select value={formData.graduationYear} onValueChange={v => handleChange("graduationYear", v)}>
                    <SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
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
                  <Label>Work Experience</Label>
                  <Select value={formData.experience} onValueChange={v => handleChange("experience", v)}>
                    <SelectTrigger><SelectValue placeholder="Select experience" /></SelectTrigger>
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
                  <Label htmlFor="currentRole">Current/Last Role</Label>
                  <Input id="currentRole" placeholder="e.g., Software Developer, Analyst" value={formData.currentRole} onChange={e => handleChange("currentRole", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills">Key Skills</Label>
                  <Input id="skills" placeholder="e.g., Python, React, Data Analysis" value={formData.skills} onChange={e => handleChange("skills", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredRole">Preferred Role</Label>
                  <Input id="preferredRole" placeholder="e.g., Full Stack Developer, Product Manager" value={formData.preferredRole} onChange={e => handleChange("preferredRole", e.target.value)} />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Review Your Information</h3>
                <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
                  <p><strong>Name:</strong> {formData.fullName || "Not provided"}</p>
                  <p><strong>Email:</strong> {formData.email || "Not provided"}</p>
                  <p><strong>Phone:</strong> {formData.phone || "Not provided"}</p>
                  <p><strong>Institution:</strong> {formData.institution || "Not provided"}</p>
                  <p><strong>Degree:</strong> {formData.degree || "Not provided"}</p>
                  <p><strong>Specialization:</strong> {formData.specialization || "Not provided"}</p>
                  <p><strong>Experience:</strong> {formData.experience || "Not provided"}</p>
                  <p><strong>Skills:</strong> {formData.skills || "Not provided"}</p>
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

export default RegisterLearner;
