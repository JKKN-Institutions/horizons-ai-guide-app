import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Atom, Dna, Brain, TrendingUp, BookOpen, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";

type StudentStream = Database['public']['Enums']['student_stream'];

const getStreams = (t: (key: string) => string) => [
  {
    id: "pcm",
    name: t('assessment12.streamPCM'),
    subtitle: t('assessment12.streamPCMSub'),
    icon: Atom,
    color: "text-fresh-green-medium",
    bgColor: "bg-fresh-green-bg",
    borderColor: "border-fresh-green-light"
  },
  {
    id: "pcb",
    name: t('assessment12.streamPCB'),
    subtitle: t('assessment12.streamPCBSub'),
    icon: Dna,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200"
  },
  {
    id: "pcmb",
    name: t('assessment12.streamPCMB'),
    subtitle: t('assessment12.streamPCMBSub'),
    icon: Brain,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200"
  },
  {
    id: "commerce",
    name: t('assessment12.streamCommerce'),
    subtitle: t('assessment12.streamCommerceSub'),
    icon: TrendingUp,
    color: "text-fresh-gold-dark",
    bgColor: "bg-fresh-gold-light",
    borderColor: "border-fresh-gold-medium"
  },
  {
    id: "arts",
    name: t('assessment12.streamArts'),
    subtitle: t('assessment12.streamArtsSub'),
    icon: BookOpen,
    color: "text-pink-600",
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
  const { t, language } = useLanguage();
  const streams = getStreams(t);
  const [step, setStep] = useState<'intro' | 'stream' | 'details'>('intro');
  const [selectedStream, setSelectedStream] = useState<StudentStream | null>(null);
  const [selectedMarks, setSelectedMarks] = useState<string | null>(null);
  const [existingProfile, setExistingProfile] = useState<any>(null);
  const [completedAttempts, setCompletedAttempts] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, [user]);

  const loadUserData = async () => {
    try {
      if (user) {
        const { data: profile } = await supabase
          .from('student_profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (profile) {
          setExistingProfile(profile);
          setSelectedStream(profile.stream as StudentStream);
          setSelectedMarks(profile.marks_range);
        }

        const { data: attempts } = await supabase
          .from('student_assessment_attempts')
          .select('id')
          .eq('user_id', user.id)
          .not('completed_at', 'is', null);

        setCompletedAttempts(attempts?.length || 0);
      } else {
        const localProfile = localStorage.getItem('student_profile');
        if (localProfile) {
          const parsed = JSON.parse(localProfile);
          setExistingProfile(parsed);
          setSelectedStream(parsed.stream as StudentStream);
          setSelectedMarks(parsed.marks_range);
        }

        const localAttempts = localStorage.getItem('completed_attempts');
        setCompletedAttempts(localAttempts ? parseInt(localAttempts) : 0);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartJourney = () => {
    if (existingProfile) {
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
      if (user) {
        if (!existingProfile) {
          await supabase
            .from('student_profiles')
            .insert({
              user_id: user.id,
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
            .eq('user_id', user.id);
        }
      } else {
        localStorage.setItem('student_profile', JSON.stringify({
          stream: selectedStream,
          marks_range: selectedMarks
        }));
      }

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
      <div className="fresh-page-wrapper page-transition flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fresh-green-medium"></div>
      </div>
    );
  }

  return (
    <div className="fresh-page-wrapper page-transition">
      {/* Header */}
      <div className="fresh-page-header">
        <div className="container mx-auto px-4 relative z-10">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-white hover:text-white/80 hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('common.back')}
          </Button>
          <h1>{language === 'ta' ? t('assessment12.tamilTitle') : t('assessment12.title')}</h1>
          <p className="subtitle">
            {t('assessment12.subtitle')}
          </p>
          {language === 'en' && (
            <p className="tamil-title">
              {t('assessment12.tamilTitle')}
            </p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Intro Step */}
        {step === 'intro' && (
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <div className="text-6xl mb-4">🎓</div>
              <h2 className="fresh-heading text-2xl md:text-3xl mb-4">
                {t('assessment12.introHeading')}
              </h2>
              <p className="fresh-body text-lg">
                {t('assessment12.introDesc')}
              </p>
            </div>

            {existingProfile && (
              <Card className="fresh-card mb-6 border-l-fresh-green-medium bg-fresh-green-bg">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-fresh-green-medium" />
                    <div className="text-left">
                      <p className="font-semibold text-fresh-green-dark">{t('assessment12.welcomeBack')}</p>
                      <p className="text-sm fresh-muted">
                        {t('assessment12.completedAssessments')
                          .replace('{stream}', streams.find(s => s.id === existingProfile.stream)?.name || '')
                          .replace('{count}', String(completedAttempts))}
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
                className="btn-fresh-primary px-8 py-6 text-lg"
              >
                {existingProfile ? t('assessment12.takeAnother') : t('assessment12.startJourney')}
              </Button>
              {completedAttempts > 0 && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/career-assessment/12th-learners/results')}
                  className="btn-fresh-outline px-8 py-6 text-lg"
                >
                  {t('assessment12.viewPastResults')}
                </Button>
              )}
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="fresh-card text-center p-6">
                <div className="text-3xl mb-2">📝</div>
                <h3 className="font-semibold fresh-card-title">20 {t('assessment12.questions')}</h3>
                <p className="text-sm fresh-muted">{t('assessment12.scenarioBased')}</p>
              </div>
              <div className="fresh-card text-center p-6">
                <div className="text-3xl mb-2">⏱️</div>
                <h3 className="font-semibold fresh-card-title">10-15 {t('assessment12.minutes')}</h3>
                <p className="text-sm fresh-muted">{t('assessment12.quickInsightful')}</p>
              </div>
              <div className="fresh-card text-center p-6">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-semibold fresh-card-title">50+ {t('assessment12.courses')}</h3>
                <p className="text-sm fresh-muted">{t('assessment12.personalizedRecs')}</p>
              </div>
            </div>
          </div>
        )}

        {/* Stream Selection Step */}
        {step === 'stream' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="fresh-heading text-2xl md:text-3xl mb-2">
                {t('assessment12.selectStreamTitle')}
              </h2>
              <p className="fresh-muted">{t('assessment12.selectStreamDesc')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {streams.map((streamItem) => (
                <Card
                  key={streamItem.id}
                  className={`fresh-card cursor-pointer transition-all hover:shadow-lg border-l-4 ${streamItem.borderColor} ${
                    selectedStream === streamItem.id ? 'ring-2 ring-fresh-green-medium' : ''
                  }`}
                  onClick={() => handleStreamSelect(streamItem.id as StudentStream)}
                >
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-full ${streamItem.bgColor} flex items-center justify-center mb-4`}>
                      <streamItem.icon className={`h-6 w-6 ${streamItem.color}`} />
                    </div>
                    <h3 className="font-semibold text-lg fresh-card-title mb-1">{streamItem.name}</h3>
                    <p className="text-sm fresh-muted">{streamItem.subtitle}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button
                variant="ghost"
                onClick={() => setStep('intro')}
                className="text-fresh-green-dark hover:text-fresh-green-medium"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('common.back')}
              </Button>
            </div>
          </div>
        )}

        {/* Details Step */}
        {step === 'details' && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="fresh-heading text-2xl md:text-3xl mb-2">
                {t('assessment12.detailsTitle')}
              </h2>
              <p className="fresh-muted">{t('assessment12.detailsDesc')}</p>
            </div>

            {/* Stream display */}
            <Card className="fresh-card mb-6 border-l-fresh-green-medium">
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
                              <p className="font-semibold fresh-card-title">{stream.name}</p>
                              <p className="text-sm fresh-muted">{stream.subtitle}</p>
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
                      className="text-fresh-green-dark hover:text-fresh-green-medium"
                    >
                      {t('common.change')}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Marks Range */}
            <div className="fresh-card p-6 mb-6">
              <label className="block text-sm font-medium fresh-card-title mb-3">
                {t('assessment12.marksLabel')}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {marksRanges.map((range) => (
                  <Button
                    key={range}
                    variant={selectedMarks === range ? "default" : "outline"}
                    className={selectedMarks === range ? "btn-fresh-secondary" : "btn-fresh-outline text-sm"}
                    onClick={() => setSelectedMarks(range)}
                  >
                    {range}
                  </Button>
                ))}
              </div>
            </div>

            {existingProfile && (
              <Card className="fresh-card mb-6 bg-blue-50 border-l-blue-500">
                <CardContent className="p-4">
                  <p className="text-sm text-blue-800">
                    <strong>{t('assessment12.returningUser')}</strong>
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-4 justify-center mt-8">
              <Button
                variant="ghost"
                onClick={() => setStep('stream')}
                className="text-fresh-green-dark hover:text-fresh-green-medium"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('common.back')}
              </Button>
              <Button
                onClick={handleStartAssessment}
                disabled={!selectedMarks}
                className="btn-fresh-primary px-8"
              >
                {t('common.startAssessment')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
