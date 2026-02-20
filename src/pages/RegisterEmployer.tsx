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
import { useLanguage } from "@/hooks/useLanguage";

const RegisterEmployer = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
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

  const steps = [
    t('regEmployer.companyInfo'),
    t('regEmployer.contactPerson'),
    t('regEmployer.hiringNeeds'),
    t('regEmployer.review')
  ];

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
      
      toast.success(t('regEmployer.registrationSuccess'));
      navigate("/employer/register/success");
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
      toast.error(t('regEmployer.registrationFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fresh-page-wrapper py-12">
      <div className="container mx-auto px-4 max-w-2xl relative z-10">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 text-fresh-green-dark hover:text-fresh-green-medium hover:bg-fresh-green-bg">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('regEmployer.back')}
        </Button>

        <Card className="fresh-card border-l-purple-500">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-purple-600" />
            </div>
            <CardTitle className="text-2xl font-serif text-fresh-green-dark">{t('regEmployer.pageTitle')}</CardTitle>
            <CardDescription className="fresh-body">{t('regEmployer.subtitle')}</CardDescription>
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

          <CardContent className="space-y-6 notranslate">
            {currentStep === 0 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="fresh-label">{t('regEmployer.companyName')} *</Label>
                  <Input 
                    id="companyName" 
                    placeholder={t('regEmployer.enterCompanyName')} 
                    value={formData.companyName} 
                    onChange={e => handleChange("companyName", e.target.value)} 
                    className={`fresh-input ${errors.companyName ? "border-destructive" : ""}`} 
                  />
                  {errors.companyName && <p className="text-sm text-destructive">{errors.companyName}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="fresh-label">{t('regEmployer.industry')} *</Label>
                  <Select value={formData.industry} onValueChange={v => handleChange("industry", v)}>
                    <SelectTrigger className="fresh-input"><SelectValue placeholder={t('regEmployer.selectIndustry')} /></SelectTrigger>
                    <SelectContent className="bg-white border border-fresh-green-light">
                      <SelectItem value="it">{t('regEmployer.industryIt')}</SelectItem>
                      <SelectItem value="healthcare">{t('regEmployer.industryHealthcare')}</SelectItem>
                      <SelectItem value="manufacturing">{t('regEmployer.industryManufacturing')}</SelectItem>
                      <SelectItem value="finance">{t('regEmployer.industryFinance')}</SelectItem>
                      <SelectItem value="education">{t('regEmployer.industryEducation')}</SelectItem>
                      <SelectItem value="retail">{t('regEmployer.industryRetail')}</SelectItem>
                      <SelectItem value="consulting">{t('regEmployer.industryConsulting')}</SelectItem>
                      <SelectItem value="other">{t('regEmployer.industryOther')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="fresh-label">{t('regEmployer.companySize')}</Label>
                  <Select value={formData.companySize} onValueChange={v => handleChange("companySize", v)}>
                    <SelectTrigger className="fresh-input"><SelectValue placeholder={t('regEmployer.selectCompanySize')} /></SelectTrigger>
                    <SelectContent className="bg-white border border-fresh-green-light">
                      <SelectItem value="1-50">{t('regEmployer.size1_50')}</SelectItem>
                      <SelectItem value="51-200">{t('regEmployer.size51_200')}</SelectItem>
                      <SelectItem value="201-500">{t('regEmployer.size201_500')}</SelectItem>
                      <SelectItem value="501-1000">{t('regEmployer.size501_1000')}</SelectItem>
                      <SelectItem value="1000+">{t('regEmployer.size1000plus')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="fresh-label">{t('regEmployer.website')}</Label>
                  <Input 
                    id="website" 
                    placeholder={t('regEmployer.websitePlaceholder')} 
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
                  <Label htmlFor="contactName" className="fresh-label">{t('regEmployer.contactPersonName')} *</Label>
                  <Input 
                    id="contactName" 
                    placeholder={t('regEmployer.fullName')} 
                    value={formData.contactName} 
                    onChange={e => handleChange("contactName", e.target.value)} 
                    className={`fresh-input ${errors.contactName ? "border-destructive" : ""}`} 
                  />
                  {errors.contactName && <p className="text-sm text-destructive">{errors.contactName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail" className="fresh-label">{t('regEmployer.emailAddress')} *</Label>
                  <Input 
                    id="contactEmail" 
                    type="email" 
                    placeholder={t('regEmployer.emailPlaceholder')} 
                    value={formData.contactEmail} 
                    onChange={e => handleChange("contactEmail", e.target.value)} 
                    className={`fresh-input ${errors.contactEmail ? "border-destructive" : ""}`} 
                  />
                  {errors.contactEmail && <p className="text-sm text-destructive">{errors.contactEmail}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone" className="fresh-label">{t('regEmployer.phoneNumber')} *</Label>
                  <Input 
                    id="contactPhone" 
                    placeholder={t('regEmployer.phonePlaceholder')} 
                    value={formData.contactPhone} 
                    onChange={e => handleChange("contactPhone", e.target.value)} 
                    className={`fresh-input ${errors.contactPhone ? "border-destructive" : ""}`} 
                  />
                  {errors.contactPhone && <p className="text-sm text-destructive">{errors.contactPhone}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation" className="fresh-label">{t('regEmployer.designation')}</Label>
                  <Input id="designation" placeholder={t('regEmployer.designationPlaceholder')} value={formData.designation} onChange={e => handleChange("designation", e.target.value)} className="fresh-input" />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hiringRoles" className="fresh-label">{t('regEmployer.rolesHiring')}</Label>
                  <Input id="hiringRoles" placeholder={t('regEmployer.rolesPlaceholder')} value={formData.hiringRoles} onChange={e => handleChange("hiringRoles", e.target.value)} className="fresh-input" />
                </div>
                <div className="space-y-2">
                  <Label className="fresh-label">{t('regEmployer.experienceLevel')}</Label>
                  <Select value={formData.experienceLevel} onValueChange={v => handleChange("experienceLevel", v)}>
                    <SelectTrigger className="fresh-input"><SelectValue placeholder={t('regEmployer.selectExperience')} /></SelectTrigger>
                    <SelectContent className="bg-white border border-fresh-green-light">
                      <SelectItem value="fresher">{t('regEmployer.expFresher')}</SelectItem>
                      <SelectItem value="0-2">{t('regEmployer.exp0_2')}</SelectItem>
                      <SelectItem value="2-5">{t('regEmployer.exp2_5')}</SelectItem>
                      <SelectItem value="mixed">{t('regEmployer.expMixed')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="locations" className="fresh-label">{t('regEmployer.hiringLocations')}</Label>
                  <Input id="locations" placeholder={t('regEmployer.locationsPlaceholder')} value={formData.locationsHiring} onChange={e => handleChange("locationsHiring", e.target.value)} className="fresh-input" />
                </div>
                <div className="space-y-2">
                  <Label className="fresh-label">{t('regEmployer.hiringTimeline')}</Label>
                  <Select value={formData.hiringTimeline} onValueChange={v => handleChange("hiringTimeline", v)}>
                    <SelectTrigger className="fresh-input"><SelectValue placeholder={t('regEmployer.selectTimeline')} /></SelectTrigger>
                    <SelectContent className="bg-white border border-fresh-green-light">
                      <SelectItem value="immediate">{t('regEmployer.timelineImmediate')}</SelectItem>
                      <SelectItem value="1-month">{t('regEmployer.timeline1Month')}</SelectItem>
                      <SelectItem value="3-months">{t('regEmployer.timeline3Months')}</SelectItem>
                      <SelectItem value="6-months">{t('regEmployer.timeline6Months')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-fresh-green-dark">{t('regEmployer.reviewYourInfo')}</h3>
                <div className="fresh-card rounded-xl p-4 space-y-2 text-sm bg-fresh-green-bg">
                  <p className="fresh-card-title"><strong>{t('regEmployer.company')}:</strong> {formData.companyName || t('regEmployer.notProvided')}</p>
                  <p className="fresh-body"><strong>{t('regEmployer.industry')}:</strong> {formData.industry || t('regEmployer.notProvided')}</p>
                  <p className="fresh-body"><strong>{t('regEmployer.companySize')}:</strong> {formData.companySize || t('regEmployer.notProvided')}</p>
                  <p className="fresh-body"><strong>{t('regEmployer.contactName')}:</strong> {formData.contactName || t('regEmployer.notProvided')}</p>
                  <p className="fresh-body"><strong>{t('regEmployer.contactEmail')}:</strong> {formData.contactEmail || t('regEmployer.notProvided')}</p>
                  <p className="fresh-body"><strong>{t('regEmployer.hiringRoles')}:</strong> {formData.hiringRoles || t('regEmployer.notProvided')}</p>
                  <p className="fresh-body"><strong>{t('regEmployer.locations')}:</strong> {formData.locationsHiring || t('regEmployer.notProvided')}</p>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 0 || isSubmitting} className="btn-fresh-outline">
                <ArrowLeft className="w-4 h-4 mr-2" /> {t('regEmployer.back')}
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button onClick={handleNext} className="btn-fresh-primary">
                  {t('regEmployer.next')} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="btn-fresh-primary" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  {t('regEmployer.submitRegistration')}
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
