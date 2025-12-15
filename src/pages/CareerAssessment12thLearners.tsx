import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Atom, Dna, Brain, TrendingUp, BookOpen, CheckCircle, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";

type StudentStream = Database['public']['Enums']['student_stream'];

const streams = [
  {
    id: "pcm",
    name: "Science - PCM",
    subtitle: "Physics, Chemistry, Mathematics",
    icon: Atom,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  {
    id: "pcb",
    name: "Science - PCB",
    subtitle: "Physics, Chemistry, Biology",
    icon: Dna,
    color: "text-green-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  },
  {
    id: "pcmb",
    name: "Science - PCMB",
    subtitle: "Physics, Chemistry, Maths & Biology",
    icon: Brain,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200"
  },
  {
    id: "commerce",
    name: "Commerce",
    subtitle: "Accountancy, Business Studies, Economics",
    icon: TrendingUp,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200"
  },
  {
    id: "arts",
    name: "Arts / Humanities",
    subtitle: "History, Geography, Languages, Psychology",
    icon: BookOpen,
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200"
  }
];

const marksRanges = [
  "Below 50%",
  "50% - 60%",
  "60% - 70%",
  "70% - 80%",
  "80% - 90%",
  "90% - 95%",
  "Above 95%"
];

export default function CareerAssessment12thLearners() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState<'intro' | 'stream' | 'details'>('intro');
  const [selectedStream, setSelectedStream] = useState<StudentStream | null>(null);
  const [selectedMarks, setSelectedMarks] = useState<string | null>(null);
  const [existingProfile, setExistingProfile] = useState<any>(null);
  const [completedAttempts, setCompletedAttempts] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      // Check for existing profile
      const { data: profile } = await supabase
        .from('student_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (profile) {
        setExistingProfile(profile);
        setSelectedStream(profile.stream as StudentStream);
        setSelectedMarks(profile.marks_range);
      }

      // Count completed attempts
      const { data: attempts } = await supabase
        .from('student_assessment_attempts')
        .select('id')
        .eq('user_id', user?.id)
        .not('completed_at', 'is', null);

      setCompletedAttempts(attempts?.length || 0);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartJourney = () => {
    if (!user) {
      // Save the current URL to redirect back after login
      localStorage.setItem('redirectAfterLogin', '/career-assessment/12th-learners');
      toast({
        title: "Please login first",
        description: "You need to be logged in to take the assessment.",
      });
      navigate('/auth');
      return;
    }

    if (existingProfile) {
      // Returning user
      setStep('details');
    } else {
      setStep('stream');
    }
  };

  const handleStreamSelect = (streamId: StudentStream) => {
    setSelectedStream(streamId);
    setStep('details');
  };

  const handleStartAssessment = async () => {
    if (!selectedStream || !selectedMarks) {
      toast({
        title: "Please complete all fields",
        description: "Select your marks range to continue.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Create or update profile
      if (!existingProfile) {
        await supabase
          .from('student_profiles')
          .insert({
            user_id: user?.id,
            stream: selectedStream,
            marks_range: selectedMarks
          });
      } else {
        await supabase
          .from('student_profiles')
          .update({
            stream: selectedStream,
            marks_range: selectedMarks
          })
          .eq('user_id', user?.id);
      }

      // Navigate to assessment
      navigate(`/career-assessment/12th-learners/take?stream=${selectedStream}`);
    } catch (error) {
      console.error('Error starting assessment:', error);
      toast({
        title: "Error",
        description: "Failed to start assessment. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-[#0A2E1F] text-white py-6">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-white hover:text-white/80 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="font-playfair text-3xl md:text-4xl font-bold">
            What Should I Study After 12th?
          </h1>
          <p className="text-white/80 mt-2 text-lg">
            Confused about your future? Let AI help you discover the perfect course based on your interests, skills and personality
          </p>
          <p className="text-orange-400 mt-1 text-base">
            12-ஆம் வகுப்புக்குப் பிறகு என்ன படிக்க வேண்டும்?
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Intro Step */}
        {step === 'intro' && (
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <div className="text-6xl mb-4">🎓</div>
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-4">
                Don't worry! Tell us your stream and we'll find the perfect course for YOU
              </h2>
              <p className="text-muted-foreground text-lg">
                Take our AI-powered assessment to discover courses that match your personality, interests, and career goals.
              </p>
            </div>

            {existingProfile && (
              <Card className="mb-6 border-l-4 border-l-green-500 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <div className="text-left">
                      <p className="font-semibold text-foreground">Welcome back!</p>
                      <p className="text-sm text-muted-foreground">
                        You're a {streams.find(s => s.id === existingProfile.stream)?.name} student with {completedAttempts} completed assessment{completedAttempts !== 1 ? 's' : ''}.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleStartJourney}
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg"
              >
                {existingProfile ? "Take Another Assessment" : "Start Your Discovery Journey"}
              </Button>
              {completedAttempts > 0 && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/career-assessment/12th-learners/results')}
                  className="px-8 py-6 text-lg"
                >
                  View Past Results
                </Button>
              )}
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="text-3xl mb-2">📝</div>
                <h3 className="font-semibold text-foreground">30 Questions</h3>
                <p className="text-sm text-muted-foreground">Scenario-based questions</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">⏱️</div>
                <h3 className="font-semibold text-foreground">15-20 Minutes</h3>
                <p className="text-sm text-muted-foreground">Quick and insightful</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-semibold text-foreground">50+ Courses</h3>
                <p className="text-sm text-muted-foreground">Personalized recommendations</p>
              </div>
            </div>
          </div>
        )}

        {/* Stream Selection Step */}
        {step === 'stream' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-2">
                First, tell us about your 12th standard
              </h2>
              <p className="text-muted-foreground">Select your stream to get personalized course recommendations</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {streams.map((streamItem) => (
                <Card
                  key={streamItem.id}
                  className={`cursor-pointer transition-all hover:shadow-lg border-l-4 ${streamItem.borderColor} ${
                    selectedStream === streamItem.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handleStreamSelect(streamItem.id as StudentStream)}
                >
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-full ${streamItem.bgColor} flex items-center justify-center mb-4`}>
                      <streamItem.icon className={`h-6 w-6 ${streamItem.color}`} />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground mb-1">{streamItem.name}</h3>
                    <p className="text-sm text-muted-foreground">{streamItem.subtitle}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button
                variant="ghost"
                onClick={() => setStep('intro')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
          </div>
        )}

        {/* Details Step */}
        {step === 'details' && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-2">
                A few more details...
              </h2>
              <p className="text-muted-foreground">This helps us give you better recommendations</p>
            </div>

            {/* Stream display */}
            <Card className="mb-6 border-l-4 border-l-primary">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const stream = streams.find(s => s.id === selectedStream);
                      if (stream) {
                        return (
                          <>
                            <div className={`w-10 h-10 rounded-full ${stream.bgColor} flex items-center justify-center`}>
                              <stream.icon className={`h-5 w-5 ${stream.color}`} />
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">{stream.name}</p>
                              <p className="text-sm text-muted-foreground">{stream.subtitle}</p>
                            </div>
                          </>
                        );
                      }
                      return null;
                    })()}
                  </div>
                  {!existingProfile && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setStep('stream')}
                    >
                      Change
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Marks Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-3">
                Your expected/obtained 12th marks:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {marksRanges.map((range) => (
                  <Button
                    key={range}
                    variant={selectedMarks === range ? "default" : "outline"}
                    className={selectedMarks === range ? "bg-primary" : ""}
                    onClick={() => setSelectedMarks(range)}
                  >
                    {range}
                  </Button>
                ))}
              </div>
            </div>

            {existingProfile && (
              <Card className="mb-6 bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Returning user:</strong> We'll generate completely new questions you haven't seen before!
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-4 justify-center mt-8">
              <Button
                variant="ghost"
                onClick={() => setStep(existingProfile ? 'intro' : 'stream')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleStartAssessment}
                disabled={!selectedMarks}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8"
              >
                Start Assessment
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
