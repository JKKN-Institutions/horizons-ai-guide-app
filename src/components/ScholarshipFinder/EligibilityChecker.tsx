import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, CheckCircle2, XCircle, AlertCircle, Loader2, TrendingUp, Award, Lightbulb } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Scholarship } from "./types";

interface EligibilityCheckerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scholarships: Scholarship[];
}

interface UserProfile {
  fullName: string;
  stream: string;
  board: string;
  percentage: string;
  schoolName: string;
  careerInterests: string[];
  preferredCourse: string;
  gender: string;
  category: string;
  familyIncome: string;
  state: string;
  isFirstGraduate: boolean;
  isRural: boolean;
}

interface ScholarshipRecommendation {
  scholarshipId: string;
  scholarshipName: string;
  matchPercentage: number;
  status: 'highly_eligible' | 'eligible' | 'partially_eligible' | 'not_eligible';
  metCriteria: string[];
  unmetCriteria: string[];
  applicationTip: string;
}

interface EligibilityAnalysis {
  recommendations: ScholarshipRecommendation[];
  overallSummary: string;
  improvementTips: string[];
  topRecommendation: string;
}

const defaultProfile: UserProfile = {
  fullName: '',
  stream: '',
  board: '',
  percentage: '',
  schoolName: '',
  careerInterests: [],
  preferredCourse: '',
  gender: '',
  category: 'general',
  familyIncome: '',
  state: 'Tamil Nadu',
  isFirstGraduate: false,
  isRural: false,
};

export function EligibilityChecker({ open, onOpenChange, scholarships }: EligibilityCheckerProps) {
  const [step, setStep] = useState<'profile' | 'analyzing' | 'results'>('profile');
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [analysis, setAnalysis] = useState<EligibilityAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { toast } = useToast();

  // Load user data from registration if logged in
  useEffect(() => {
    if (open && !dataLoaded) {
      loadUserData();
    }
  }, [open]);

  const loadUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: registration } = await supabase
        .from('registrations_12th_learners')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (registration) {
        setProfile(prev => ({
          ...prev,
          fullName: registration.full_name || '',
          stream: registration.stream || '',
          board: registration.board || '',
          percentage: registration.percentage || '',
          schoolName: registration.school_name || '',
          careerInterests: registration.career_interests || [],
          preferredCourse: registration.preferred_course || '',
        }));
        setDataLoaded(true);
        toast({
          title: "Profile loaded",
          description: "Your registration data has been loaded. Please complete any missing fields.",
        });
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const handleCheckEligibility = async () => {
    if (!profile.percentage || !profile.category || !profile.familyIncome) {
      toast({
        title: "Missing Information",
        description: "Please fill in percentage, category, and family income to check eligibility.",
        variant: "destructive",
      });
      return;
    }

    setStep('analyzing');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('scholarship-eligibility', {
        body: { userProfile: profile, scholarships },
      });

      if (error) throw error;
      
      setAnalysis(data);
      setStep('results');
    } catch (error: any) {
      console.error("Eligibility check error:", error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze eligibility. Please try again.",
        variant: "destructive",
      });
      setStep('profile');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'highly_eligible':
        return { color: 'bg-green-500', label: 'Highly Eligible', icon: CheckCircle2 };
      case 'eligible':
        return { color: 'bg-blue-500', label: 'Eligible', icon: CheckCircle2 };
      case 'partially_eligible':
        return { color: 'bg-yellow-500', label: 'Partially Eligible', icon: AlertCircle };
      default:
        return { color: 'bg-red-500', label: 'Not Eligible', icon: XCircle };
    }
  };

  const resetChecker = () => {
    setStep('profile');
    setAnalysis(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            AI Eligibility Checker
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          {step === 'profile' && (
            <div className="space-y-6">
              <p className="text-muted-foreground text-sm">
                Fill in your details to get personalized scholarship recommendations powered by AI.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input 
                    value={profile.fullName}
                    onChange={(e) => setProfile(p => ({ ...p, fullName: e.target.value }))}
                    placeholder="Your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>12th Percentage *</Label>
                  <Input 
                    value={profile.percentage}
                    onChange={(e) => setProfile(p => ({ ...p, percentage: e.target.value }))}
                    placeholder="e.g., 85%"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Stream</Label>
                  <Select value={profile.stream} onValueChange={(v) => setProfile(p => ({ ...p, stream: v }))}>
                    <SelectTrigger><SelectValue placeholder="Select stream" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pcm">PCM (Science with Maths)</SelectItem>
                      <SelectItem value="pcb">PCB (Science with Biology)</SelectItem>
                      <SelectItem value="pcmb">PCMB (Science with both)</SelectItem>
                      <SelectItem value="commerce">Commerce</SelectItem>
                      <SelectItem value="arts">Arts/Humanities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select value={profile.category} onValueChange={(v) => setProfile(p => ({ ...p, category: v }))}>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="obc">OBC</SelectItem>
                      <SelectItem value="bc">BC</SelectItem>
                      <SelectItem value="mbc">MBC</SelectItem>
                      <SelectItem value="sc">SC</SelectItem>
                      <SelectItem value="st">ST</SelectItem>
                      <SelectItem value="ews">EWS</SelectItem>
                      <SelectItem value="minority">Minority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Annual Family Income *</Label>
                  <Select value={profile.familyIncome} onValueChange={(v) => setProfile(p => ({ ...p, familyIncome: v }))}>
                    <SelectTrigger><SelectValue placeholder="Select income range" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="below_1_lakh">Below ₹1 Lakh</SelectItem>
                      <SelectItem value="1_2_lakh">₹1 - 2 Lakh</SelectItem>
                      <SelectItem value="2_3_lakh">₹2 - 3 Lakh</SelectItem>
                      <SelectItem value="3_5_lakh">₹3 - 5 Lakh</SelectItem>
                      <SelectItem value="5_8_lakh">₹5 - 8 Lakh</SelectItem>
                      <SelectItem value="above_8_lakh">Above ₹8 Lakh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select value={profile.gender} onValueChange={(v) => setProfile(p => ({ ...p, gender: v }))}>
                    <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>State</Label>
                  <Select value={profile.state} onValueChange={(v) => setProfile(p => ({ ...p, state: v }))}>
                    <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                      <SelectItem value="Karnataka">Karnataka</SelectItem>
                      <SelectItem value="Kerala">Kerala</SelectItem>
                      <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Preferred Course</Label>
                  <Input 
                    value={profile.preferredCourse}
                    onChange={(e) => setProfile(p => ({ ...p, preferredCourse: e.target.value }))}
                    placeholder="e.g., Engineering, Medicine"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="firstGrad" 
                    checked={profile.isFirstGraduate}
                    onCheckedChange={(c) => setProfile(p => ({ ...p, isFirstGraduate: !!c }))}
                  />
                  <Label htmlFor="firstGrad" className="text-sm">First in family to graduate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="rural" 
                    checked={profile.isRural}
                    onCheckedChange={(c) => setProfile(p => ({ ...p, isRural: !!c }))}
                  />
                  <Label htmlFor="rural" className="text-sm">From rural area</Label>
                </div>
              </div>

              <Button onClick={handleCheckEligibility} className="w-full bg-accent hover:bg-accent/90">
                <Sparkles className="w-4 h-4 mr-2" />
                Check My Eligibility
              </Button>
            </div>
          )}

          {step === 'analyzing' && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="w-12 h-12 text-accent animate-spin" />
              <h3 className="text-lg font-semibold">Analyzing Your Profile</h3>
              <p className="text-muted-foreground text-center max-w-sm">
                Our AI is matching your profile against {scholarships.length}+ scholarships to find the best matches...
              </p>
            </div>
          )}

          {step === 'results' && analysis && (
            <div className="space-y-6">
              {/* Summary Card */}
              <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                <div className="flex items-start gap-3">
                  <Award className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Your Scholarship Summary</h3>
                    <p className="text-muted-foreground mt-1">{analysis.overallSummary}</p>
                    {analysis.topRecommendation && (
                      <p className="mt-2 text-sm">
                        <span className="font-medium">Top Pick:</span>{' '}
                        <span className="text-accent">{analysis.topRecommendation}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Personalized Recommendations ({analysis.recommendations?.length || 0})
                </h4>
                <div className="space-y-3">
                  {analysis.recommendations?.slice(0, 10).map((rec, idx) => {
                    const status = getStatusConfig(rec.status);
                    const StatusIcon = status.icon;
                    return (
                      <div key={idx} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h5 className="font-medium">{rec.scholarshipName}</h5>
                            <Badge className={`${status.color} text-white mt-1`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {status.label} - {rec.matchPercentage}%
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="w-16 h-16 relative">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" className="text-muted/20" />
                                <circle 
                                  cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" 
                                  className={rec.matchPercentage >= 70 ? 'text-green-500' : rec.matchPercentage >= 40 ? 'text-yellow-500' : 'text-red-500'}
                                  strokeDasharray={`${rec.matchPercentage * 1.76} 176`}
                                />
                              </svg>
                              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                                {rec.matchPercentage}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {rec.metCriteria?.length > 0 && (
                            <div>
                              <p className="text-green-600 font-medium mb-1">✓ Met Criteria</p>
                              <ul className="space-y-1 text-muted-foreground">
                                {rec.metCriteria.slice(0, 3).map((c, i) => (
                                  <li key={i} className="flex items-start gap-1">
                                    <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>{c}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {rec.unmetCriteria?.length > 0 && (
                            <div>
                              <p className="text-red-600 font-medium mb-1">✗ Unmet Criteria</p>
                              <ul className="space-y-1 text-muted-foreground">
                                {rec.unmetCriteria.slice(0, 3).map((c, i) => (
                                  <li key={i} className="flex items-start gap-1">
                                    <XCircle className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                                    <span>{c}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {rec.applicationTip && (
                          <div className="bg-muted/50 rounded p-2 text-sm flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                            <span>{rec.applicationTip}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Improvement Tips */}
              {analysis.improvementTips?.length > 0 && (
                <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-blue-500" />
                    Tips to Improve Eligibility
                  </h4>
                  <ul className="space-y-2">
                    {analysis.improvementTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-blue-500 font-bold">{idx + 1}.</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button onClick={resetChecker} variant="outline" className="w-full">
                Check Again with Different Details
              </Button>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
