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
import { useLanguage } from "@/hooks/useLanguage";

const tamilNaduDistricts = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore",
  "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kancheepuram",
  "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam",
  "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram",
  "Ranipet", "Salem", "Sivagangai", "Tenkasi", "Thanjavur", "Theni",
  "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur",
  "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore",
  "Viluppuram", "Virudhunagar"
];

const RegisterLearner = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    district: "",
    place: "",
    institution: "",
    degree: "",
    specialization: "",
    graduationYear: "",
  });

  const steps = [
    { id: 1, name: t('regLearner.personalInfo') },
    { id: 2, name: t('regLearner.education') },
  ];

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
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/[\s\-\+]/g, '').replace(/^91/, ''))) {
        newErrors.phone = "Enter valid 10-digit mobile number starting with 6-9";
      }
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
      if (!formData.district) newErrors.district = "District is required";
      if (!formData.place.trim()) newErrors.place = "Place/Town is required";
    }

    if (step === 2) {
      if (!formData.institution.trim()) newErrors.institution = "Institution is required";
      if (!formData.degree) newErrors.degree = "Degree is required";
      if (!formData.specialization.trim()) newErrors.specialization = "Specialization is required";
      if (!formData.graduationYear) newErrors.graduationYear = "Graduation year is required";
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
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        date_of_birth: formData.dateOfBirth || null,
        district: formData.district || null,
        place: formData.place || null,
        institution: formData.institution || null,
        degree: formData.degree || null,
        specialization: formData.specialization || null,
        graduation_year: formData.graduationYear || null,
      });

      if (error) throw error;

      // Store learner email for personalization
      localStorage.setItem('jkkn_learner_email', formData.email);
      localStorage.setItem('jkkn_learner_name', formData.fullName);

      toast.success(t('regLearner.registrationSuccess'));
      navigate("/jkkn");
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
        toast.error(t('regLearner.fixErrors'));
      } else {
        toast.error(t('regLearner.registrationFailed'));
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
              {t('regLearner.pageTitle')}
            </CardTitle>
            <CardDescription>
              {t('regLearner.subtitle')}
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

          <CardContent className="pt-4 notranslate">
            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">{t('regLearner.fullName')} *</Label>
                  <Input
                    id="fullName"
                    placeholder={t('regLearner.fullNamePlaceholder')}
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    className={errors.fullName ? "border-destructive" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-destructive mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">{t('regLearner.emailAddress')} *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('regLearner.emailPlaceholder')}
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">{t('regLearner.mobileNumber')} *</Label>
                  <Input
                    id="phone"
                    placeholder={t('regLearner.mobilePlaceholder')}
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && (
                    <p className="text-xs text-destructive mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="dateOfBirth">{t('regLearner.dateOfBirth')} *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                    className={errors.dateOfBirth ? "border-destructive" : ""}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-xs text-destructive mt-1">{errors.dateOfBirth}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="district">{t('regLearner.district')} *</Label>
                  <Select
                    value={formData.district}
                    onValueChange={(value) => handleChange("district", value)}
                  >
                    <SelectTrigger className={errors.district ? "border-destructive" : ""}>
                      <SelectValue placeholder={t('regLearner.selectDistrict')} />
                    </SelectTrigger>
                    <SelectContent>
                      {tamilNaduDistricts.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.district && (
                    <p className="text-xs text-destructive mt-1">{errors.district}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="place">{t('regLearner.placeTown')} *</Label>
                  <Input
                    id="place"
                    placeholder={t('regLearner.placePlaceholder')}
                    value={formData.place}
                    onChange={(e) => handleChange("place", e.target.value)}
                    className={errors.place ? "border-destructive" : ""}
                  />
                  {errors.place && (
                    <p className="text-xs text-destructive mt-1">{errors.place}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Education */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="institution">{t('regLearner.institution')} *</Label>
                  <Input
                    id="institution"
                    placeholder={t('regLearner.institutionPlaceholder')}
                    value={formData.institution}
                    onChange={(e) => handleChange("institution", e.target.value)}
                    className={errors.institution ? "border-destructive" : ""}
                  />
                  {errors.institution && (
                    <p className="text-xs text-destructive mt-1">{errors.institution}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="degree">{t('regLearner.degree')} *</Label>
                  <Select
                    value={formData.degree}
                    onValueChange={(value) => handleChange("degree", value)}
                  >
                    <SelectTrigger className={errors.degree ? "border-destructive" : ""}>
                      <SelectValue placeholder={t('regLearner.selectDegree')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10th">{t('regLearner.degree10th')}</SelectItem>
                      <SelectItem value="12th">{t('regLearner.degree12th')}</SelectItem>
                      <SelectItem value="diploma">{t('regLearner.degreeDiploma')}</SelectItem>
                      <SelectItem value="iti">{t('regLearner.degreeIti')}</SelectItem>
                      <SelectItem value="bachelors">{t('regLearner.degreeBachelors')}</SelectItem>
                      <SelectItem value="masters">{t('regLearner.degreeMasters')}</SelectItem>
                      <SelectItem value="phd">{t('regLearner.degreePhd')}</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.degree && (
                    <p className="text-xs text-destructive mt-1">{errors.degree}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="specialization">{t('regLearner.specialization')} *</Label>
                  <Input
                    id="specialization"
                    placeholder={t('regLearner.specializationPlaceholder')}
                    value={formData.specialization}
                    onChange={(e) => handleChange("specialization", e.target.value)}
                    className={errors.specialization ? "border-destructive" : ""}
                  />
                  {errors.specialization && (
                    <p className="text-xs text-destructive mt-1">{errors.specialization}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="graduationYear">{t('regLearner.graduationYear')} *</Label>
                  <Select
                    value={formData.graduationYear}
                    onValueChange={(value) => handleChange("graduationYear", value)}
                  >
                    <SelectTrigger className={errors.graduationYear ? "border-destructive" : ""}>
                      <SelectValue placeholder={t('regLearner.selectGradYear')} />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => 2025 - i).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.graduationYear && (
                    <p className="text-xs text-destructive mt-1">{errors.graduationYear}</p>
                  )}
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
                {t('regLearner.back')}
              </Button>

              {currentStep < steps.length ? (
                <Button onClick={handleNext} className="gap-2 bg-amber-500 hover:bg-amber-600">
                  {t('regLearner.next')}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="gap-2 bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? t('regLearner.submitting') : t('regLearner.submitRegistration')}
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
