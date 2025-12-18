import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, GraduationCap, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const steps = ["Personal Info", "Education", "Interests", "Review"];

const Register12thLearner = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        .from("registrations_12th_learners")
        .insert({
          user_id: user?.id || null,
          full_name: formData.fullName,
          email: formData.email || null,
          phone: formData.phone,
          date_of_birth: formData.dateOfBirth || null,
          school_name: formData.school || null,
          board: formData.board || null,
          stream: formData.stream || null,
          percentage: formData.expectedYear || null,
          preferred_course: formData.preferredCourses || null,
          preferred_institution: formData.preferredLocation || null,
          career_interests: formData.careerInterests ? [formData.careerInterests] : null,
        });

      if (error) throw error;
      
      toast.success("Registration successful! We'll be in touch soon.");
      navigate('/career-assessment/colleges', { replace: true });
    } catch (error) {
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

        <Card className="fresh-card border-l-fresh-green-medium">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-fresh-green-medium/20 to-fresh-green-light/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-fresh-green-medium" />
            </div>
            <CardTitle className="text-2xl font-serif text-fresh-green-dark">Register as 12th Learner</CardTitle>
            <CardDescription className="fresh-body">Start your career journey with JKKN AI Horizons</CardDescription>
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
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="fresh-label">Full Name *</Label>
                    <Input id="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={e => handleChange("fullName", e.target.value)} className="fresh-input" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="fresh-label">Email Address</Label>
                    <Input id="email" type="email" placeholder="your@email.com (optional)" value={formData.email} onChange={e => handleChange("email", e.target.value)} className="fresh-input" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="fresh-label">Phone Number *</Label>
                    <Input id="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={e => handleChange("phone", e.target.value)} className="fresh-input" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob" className="fresh-label">Date of Birth</Label>
                    <Input id="dob" type="date" value={formData.dateOfBirth} onChange={e => handleChange("dateOfBirth", e.target.value)} className="fresh-input" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="school" className="fresh-label">School Name *</Label>
                  <Input id="school" placeholder="Enter your school name" value={formData.school} onChange={e => handleChange("school", e.target.value)} className="fresh-input" />
                </div>
                <div className="space-y-2">
                  <Label className="fresh-label">Board *</Label>
                  <Select value={formData.board} onValueChange={v => handleChange("board", v)}>
                    <SelectTrigger className="fresh-input"><SelectValue placeholder="Select your board" /></SelectTrigger>
                    <SelectContent className="bg-white border border-fresh-green-light">
                      <SelectItem value="cbse">CBSE</SelectItem>
                      <SelectItem value="state">State Board</SelectItem>
                      <SelectItem value="icse">ICSE</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="fresh-label">Stream *</Label>
                  <Select value={formData.stream} onValueChange={v => handleChange("stream", v)}>
                    <SelectTrigger className="fresh-input"><SelectValue placeholder="Select your stream" /></SelectTrigger>
                    <SelectContent className="bg-white border border-fresh-green-light">
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="commerce">Commerce</SelectItem>
                      <SelectItem value="arts">Arts/Humanities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="fresh-label">Expected Year of Passing</Label>
                  <Select value={formData.expectedYear} onValueChange={v => handleChange("expectedYear", v)}>
                    <SelectTrigger className="fresh-input"><SelectValue placeholder="Select year" /></SelectTrigger>
                    <SelectContent className="bg-white border border-fresh-green-light">
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2027">2027</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="courses" className="fresh-label">Preferred Courses</Label>
                  <Input id="courses" placeholder="e.g., Engineering, Medicine, Arts" value={formData.preferredCourses} onChange={e => handleChange("preferredCourses", e.target.value)} className="fresh-input" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interests" className="fresh-label">Career Interests</Label>
                  <Input id="interests" placeholder="e.g., Software Development, Healthcare" value={formData.careerInterests} onChange={e => handleChange("careerInterests", e.target.value)} className="fresh-input" />
                </div>
                <div className="space-y-2">
                  <Label className="fresh-label">Preferred Location</Label>
                  <Select value={formData.preferredLocation} onValueChange={v => handleChange("preferredLocation", v)}>
                    <SelectTrigger className="fresh-input"><SelectValue placeholder="Select location" /></SelectTrigger>
                    <SelectContent className="bg-white border border-fresh-green-light">
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
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-fresh-green-dark">Review Your Information</h3>
                <div className="fresh-card rounded-xl p-4 space-y-2 text-sm bg-fresh-green-bg">
                  <p className="fresh-card-title"><strong>Name:</strong> {formData.fullName || "Not provided"}</p>
                  <p className="fresh-body"><strong>Email:</strong> {formData.email || "Not provided"}</p>
                  <p className="fresh-body"><strong>Phone:</strong> {formData.phone || "Not provided"}</p>
                  <p className="fresh-body"><strong>School:</strong> {formData.school || "Not provided"}</p>
                  <p className="fresh-body"><strong>Board:</strong> {formData.board || "Not provided"}</p>
                  <p className="fresh-body"><strong>Stream:</strong> {formData.stream || "Not provided"}</p>
                  <p className="fresh-body"><strong>Career Interests:</strong> {formData.careerInterests || "Not provided"}</p>
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

export default Register12thLearner;
