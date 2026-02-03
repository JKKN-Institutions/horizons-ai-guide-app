import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  Monitor, 
  FlaskConical, 
  BookOpen, 
  CheckCircle2, 
  Users, 
  Target, 
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Sparkles,
  FileText,
  Upload,
  CreditCard,
  UserCheck,
  Cpu,
  Cog,
  Atom
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { University } from '@/data/university-entrance-data';

interface CourseAdmissionGuideProps {
  university: University;
}

interface CourseInfo {
  id: string;
  name: string;
  nameTamil: string;
  icon: typeof Briefcase;
  color: string;
  bgGradient: string;
  borderColor: string;
  eligibility: string[];
  selectionProcess: string;
  focusAreas: string[];
  whoShouldChoose: string;
  specializations?: string[];
}

// NIT/IIT specific courses
const getNITCourses = (): CourseInfo[] => [
  {
    id: 'btech',
    name: 'B.Tech – Bachelor of Technology',
    nameTamil: 'தொழில்நுட்ப இளங்கலை',
    icon: Cog,
    color: 'text-blue-600',
    bgGradient: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    eligibility: [
      '10+2 with Physics, Chemistry & Mathematics',
      'Minimum 75% marks (65% for reserved categories)',
      'Valid JEE Main score required'
    ],
    selectionProcess: 'JEE Main Rank → JoSAA Counselling → Seat Allotment',
    focusAreas: ['Core Engineering', 'Problem Solving', 'Innovation', 'Industry Projects'],
    whoShouldChoose: 'Students passionate about engineering, technology, and innovation',
    specializations: ['CSE', 'ECE', 'Mechanical', 'Civil', 'Electrical', 'Chemical', 'Metallurgy', 'Production', 'ICE']
  },
  {
    id: 'mtech',
    name: 'M.Tech – Master of Technology',
    nameTamil: 'தொழில்நுட்ப முதுகலை',
    icon: Cpu,
    color: 'text-purple-600',
    bgGradient: 'from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20',
    borderColor: 'border-purple-200 dark:border-purple-800',
    eligibility: [
      'B.Tech/B.E. in relevant discipline',
      'Valid GATE score required',
      'Minimum 60% marks in qualifying degree'
    ],
    selectionProcess: 'GATE Score → CCMT Counselling → Institute Selection',
    focusAreas: ['Advanced Research', 'Specialization', 'Industry Collaboration', 'Thesis Work'],
    whoShouldChoose: 'Engineers seeking deep specialization, research careers, or PSU jobs',
    specializations: ['VLSI Design', 'AI & ML', 'Structural Engineering', 'Power Systems', 'Manufacturing', 'Thermal Engineering']
  },
  {
    id: 'msc',
    name: 'M.Sc – Master of Science',
    nameTamil: 'அறிவியல் முதுகலை',
    icon: Atom,
    color: 'text-emerald-600',
    bgGradient: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    eligibility: [
      'B.Sc. in relevant Science discipline',
      'Valid IIT JAM score required',
      'Minimum 55% marks in qualifying degree'
    ],
    selectionProcess: 'IIT JAM Rank → JAM Counselling → Seat Allotment',
    focusAreas: ['Research', 'Laboratory Work', 'Advanced Theory', 'Scientific Computing'],
    whoShouldChoose: 'Science graduates aiming for research, PhD, or scientific careers',
    specializations: ['Physics', 'Chemistry', 'Mathematics', 'Computer Applications']
  },
  {
    id: 'mba',
    name: 'MBA – Master of Business Administration',
    nameTamil: 'வணிக நிர்வாக முதுகலை',
    icon: Briefcase,
    color: 'text-amber-600',
    bgGradient: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20',
    borderColor: 'border-amber-200 dark:border-amber-800',
    eligibility: [
      'Any recognized Bachelor\'s degree',
      'Valid CAT / GATE score required',
      'Minimum 60% marks in qualifying degree'
    ],
    selectionProcess: 'CAT/GATE Score → Written Test → GD/PI → Final Selection',
    focusAreas: ['Management', 'Leadership', 'Strategy', 'Business Analytics'],
    whoShouldChoose: 'Graduates seeking management roles in top corporations',
    specializations: ['Finance', 'Marketing', 'Operations', 'HR', 'Business Analytics']
  },
  {
    id: 'phd',
    name: 'Ph.D – Doctor of Philosophy',
    nameTamil: 'முனைவர் பட்டம்',
    icon: GraduationCap,
    color: 'text-rose-600',
    bgGradient: 'from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20',
    borderColor: 'border-rose-200 dark:border-rose-800',
    eligibility: [
      'Master\'s degree in relevant discipline',
      'Valid GATE/NET/CSIR score (preferred)',
      'Minimum 60% marks in PG degree'
    ],
    selectionProcess: 'Written Test → Research Proposal → Interview → Selection',
    focusAreas: ['Original Research', 'Innovation', 'Academic Publishing', 'Teaching'],
    whoShouldChoose: 'Students passionate about deep research and academic careers'
  }
];

// State University specific courses
const getStateUniversityCourses = (): CourseInfo[] => [
  {
    id: 'mba',
    name: 'MBA – Master of Business Administration',
    nameTamil: 'வணிக நிர்வாக முதுகலை',
    icon: Briefcase,
    color: 'text-purple-600',
    bgGradient: 'from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20',
    borderColor: 'border-purple-200 dark:border-purple-800',
    eligibility: [
      'Any recognized UG degree',
      'Minimum 50% marks (45% for reserved categories)'
    ],
    selectionProcess: 'Based on University norms (Entrance / Merit / Interview as applicable)',
    focusAreas: ['Management', 'Leadership', 'Marketing', 'Finance', 'HR', 'Business Analytics'],
    whoShouldChoose: 'Students interested in business, management, startups, or corporate careers'
  },
  {
    id: 'mca',
    name: 'MCA – Master of Computer Applications',
    nameTamil: 'கணினி பயன்பாடுகள் முதுகலை',
    icon: Monitor,
    color: 'text-blue-600',
    bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    eligibility: [
      'UG degree with Mathematics / Statistics / Computer Science background',
      'Minimum 50% marks (45% for reserved categories)'
    ],
    selectionProcess: 'Entrance / Merit-based as per university guidelines',
    focusAreas: ['Programming', 'Software Development', 'Data Structures', 'Web & App Development'],
    whoShouldChoose: 'Students aiming for IT, software, or technology-based careers'
  },
  {
    id: 'msc',
    name: 'M.Sc – Master of Science',
    nameTamil: 'அறிவியல் முதுகலை',
    icon: FlaskConical,
    color: 'text-emerald-600',
    bgGradient: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    eligibility: [
      'Relevant UG degree in Science discipline',
      'Minimum 50% marks (45% for reserved categories)'
    ],
    selectionProcess: 'Merit-based or Entrance Test (depends on specialization)',
    focusAreas: ['Research', 'Laboratory Work', 'Data Analysis', 'Academic Excellence'],
    whoShouldChoose: 'Students interested in research, teaching, analytics, or higher studies',
    specializations: ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biotechnology', 'Data Science']
  },
  {
    id: 'ma',
    name: 'MA – Master of Arts',
    nameTamil: 'கலை முதுகலை',
    icon: BookOpen,
    color: 'text-amber-600',
    bgGradient: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20',
    borderColor: 'border-amber-200 dark:border-amber-800',
    eligibility: [
      'Relevant UG degree in Arts / Humanities',
      'Minimum 50% marks (45% for reserved categories)'
    ],
    selectionProcess: 'Merit-based or Entrance Test as per department rules',
    focusAreas: ['Critical Thinking', 'Research', 'Communication', 'Cultural Studies'],
    whoShouldChoose: 'Students aiming for teaching, civil services, research, media, or public service',
    specializations: ['English', 'Tamil', 'Economics', 'History', 'Political Science']
  }
];

export const CourseAdmissionGuide = ({ university }: CourseAdmissionGuideProps) => {
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [showCommonSteps, setShowCommonSteps] = useState(false);

  // Determine university type and get appropriate courses
  const isNITorIIT = useMemo(() => {
    const name = university.name.toLowerCase();
    return name.includes('nit') || 
           name.includes('iit') || 
           name.includes('national institute of technology') ||
           name.includes('indian institute of technology') ||
           name.includes('iiit') ||
           name.includes('iiser');
  }, [university.name]);

  const courses = useMemo(() => {
    return isNITorIIT ? getNITCourses() : getStateUniversityCourses();
  }, [isNITorIIT]);

  // Get appropriate common steps based on university type
  const commonAdmissionSteps = useMemo(() => {
    if (isNITorIIT) {
      return [
        {
          step: 1,
          title: 'Appear for Entrance Exam',
          titleTamil: 'நுழைவுத் தேர்வு எழுதவும்',
          description: 'JEE Main (B.Tech), GATE (M.Tech), CAT (MBA), JAM (M.Sc)',
          icon: FileText,
          color: 'bg-blue-100 text-blue-600'
        },
        {
          step: 2,
          title: 'Register for Counselling',
          titleTamil: 'கவுன்சிலிங்கிற்கு பதிவு செய்யவும்',
          description: 'Register on JoSAA / CCMT / JAM portal with valid scores',
          icon: Upload,
          color: 'bg-purple-100 text-purple-600'
        },
        {
          step: 3,
          title: 'Fill Choices & Lock',
          titleTamil: 'தேர்வுகளை நிரப்பி பூட்டவும்',
          description: 'Select preferred NITs, branches and lock your choices',
          icon: Target,
          color: 'bg-emerald-100 text-emerald-600'
        },
        {
          step: 4,
          title: 'Seat Allotment',
          titleTamil: 'இடம் ஒதுக்கீடு',
          description: 'Check allotment result and accept/float/reject seat',
          icon: Users,
          color: 'bg-amber-100 text-amber-600'
        },
        {
          step: 5,
          title: 'Report to Institute',
          titleTamil: 'நிறுவனத்தில் சேருங்கள்',
          description: 'Verify documents, pay fees, collect ID card',
          icon: CreditCard,
          color: 'bg-rose-100 text-rose-600'
        }
      ];
    }
    
    return [
      {
        step: 1,
        title: 'Apply Online',
        titleTamil: 'ஆன்லைனில் விண்ணப்பிக்கவும்',
        description: `Apply through ${university.name} official admission portal`,
        icon: FileText,
        color: 'bg-purple-100 text-purple-600'
      },
      {
        step: 2,
        title: 'Upload Documents',
        titleTamil: 'ஆவணங்களை பதிவேற்றவும்',
        description: 'Upload required certificates, photos, and signature',
        icon: Upload,
        color: 'bg-blue-100 text-blue-600'
      },
      {
        step: 3,
        title: 'Attend Entrance / Counselling',
        titleTamil: 'நுழைவு / கவுன்சிலிங்கில் கலந்து கொள்ளுங்கள்',
        description: 'Appear for entrance test or counselling if applicable',
        icon: Users,
        color: 'bg-emerald-100 text-emerald-600'
      },
      {
        step: 4,
        title: 'Verify Certificates',
        titleTamil: 'சான்றிதழ்களை சரிபார்க்கவும்',
        description: 'Submit original documents for verification & confirm seat',
        icon: UserCheck,
        color: 'bg-amber-100 text-amber-600'
      },
      {
        step: 5,
        title: 'Pay Fees & Join',
        titleTamil: 'கட்டணம் செலுத்தி சேருங்கள்',
        description: 'Pay semester fees and officially join the university',
        icon: CreditCard,
        color: 'bg-rose-100 text-rose-600'
      }
    ];
  }, [isNITorIIT, university.name]);

  const toggleCourse = (courseId: string) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 border-indigo-200 dark:border-indigo-800 rounded-2xl overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2 text-foreground">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            Course-Wise Admission Guide
            <span className="text-base font-normal text-muted-foreground">/ படிப்பு வாரியான சேர்க்கை வழிகாட்டி</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground">
            Explore detailed admission information for each program at {university.name}. 
            Tap on any course to view eligibility, selection process, and career guidance.
          </p>
        </CardContent>
      </Card>

      {/* Course Cards */}
      <div className="space-y-4">
        {courses.map((course) => {
          const isExpanded = expandedCourse === course.id;
          const IconComponent = course.icon;

          return (
            <div key={course.id} className="space-y-2">
              <button
                onClick={() => toggleCourse(course.id)}
                className={`w-full p-4 rounded-2xl border-2 transition-all bg-gradient-to-br ${course.bgGradient} ${
                  isExpanded 
                    ? `${course.borderColor} shadow-lg` 
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-800/70 shadow-sm">
                      <IconComponent className={`h-6 w-6 ${course.color}`} />
                    </div>
                    <div className="text-left">
                      <h3 className={`font-bold text-lg ${course.color}`}>{course.name}</h3>
                      <p className="text-sm text-muted-foreground font-tamil">{course.nameTamil}</p>
                    </div>
                  </div>
                  <div className={`p-2 rounded-full ${isExpanded ? 'bg-white/50' : 'bg-transparent'}`}>
                    {isExpanded ? (
                      <ChevronUp className={`h-5 w-5 ${course.color}`} />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
                {!isExpanded && (
                  <p className="text-xs text-muted-foreground mt-2 text-left">
                    Tap to view eligibility & career guidance →
                  </p>
                )}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <Card className={`${course.borderColor} border rounded-2xl`}>
                      <CardContent className="p-5 space-y-5">
                        {/* Specializations (if available) */}
                        {course.specializations && (
                          <div className="bg-white/50 dark:bg-slate-800/50 rounded-xl p-4">
                            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                              <Sparkles className={`h-4 w-4 ${course.color}`} />
                              Popular Specializations
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {course.specializations.map((spec) => (
                                <Badge 
                                  key={spec} 
                                  variant="secondary"
                                  className="bg-white/70 dark:bg-slate-700/70"
                                >
                                  {spec}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Eligibility */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            Eligibility / தகுதி
                          </h4>
                          <ul className="space-y-2">
                            {course.eligibility.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Selection Process */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                            <Target className="h-4 w-4 text-blue-600" />
                            Selection Process / தேர்வு செயல்முறை
                          </h4>
                          <p className="text-sm text-foreground">{course.selectionProcess}</p>
                        </div>

                        {/* Focus Areas */}
                        <div className="bg-white/50 dark:bg-slate-800/50 rounded-xl p-4">
                          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <Sparkles className={`h-4 w-4 ${course.color}`} />
                            Focus Areas / முக்கிய பகுதிகள்
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {course.focusAreas.map((area) => (
                              <Badge 
                                key={area} 
                                className={`bg-gradient-to-r ${course.bgGradient} ${course.color} border ${course.borderColor}`}
                              >
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Who Should Choose */}
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
                          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                            <Users className="h-4 w-4 text-amber-600" />
                            Who Should Choose? / யார் தேர்வு செய்ய வேண்டும்?
                          </h4>
                          <p className="text-sm text-foreground">
                            🎯 {course.whoShouldChoose}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Common Admission Steps */}
      <div className="space-y-3">
        <button
          onClick={() => setShowCommonSteps(!showCommonSteps)}
          className={`w-full p-4 rounded-2xl border-2 transition-all bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 ${
            showCommonSteps 
              ? 'border-slate-400 dark:border-slate-600 shadow-lg' 
              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-sm">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg text-foreground">Common Admission Steps</h3>
                <p className="text-sm text-muted-foreground font-tamil">பொதுவான சேர்க்கை படிகள் (அனைத்து படிப்புகளுக்கும்)</p>
              </div>
            </div>
            <div className={`p-2 rounded-full ${showCommonSteps ? 'bg-white/50' : 'bg-transparent'}`}>
              {showCommonSteps ? (
                <ChevronUp className="h-5 w-5 text-indigo-600" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          </div>
        </button>

        <AnimatePresence>
          {showCommonSteps && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <Card className="border-slate-300 dark:border-slate-600 rounded-2xl">
                <CardContent className="p-5">
                  <div className="space-y-4">
                    {commonAdmissionSteps.map((step, index) => {
                      const StepIcon = step.icon;
                      return (
                        <motion.div
                          key={step.step}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-4"
                        >
                          <div className="flex flex-col items-center">
                            <div className={`p-2 rounded-xl ${step.color}`}>
                              <StepIcon className="h-5 w-5" />
                            </div>
                            {index < commonAdmissionSteps.length - 1 && (
                              <div className="w-0.5 h-8 bg-slate-200 dark:bg-slate-700 mt-2" />
                            )}
                          </div>
                          <div className="flex-1 pb-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                Step {step.step}
                              </Badge>
                              <h4 className="font-semibold text-foreground">{step.title}</h4>
                            </div>
                            <p className="text-xs text-muted-foreground font-tamil">{step.titleTamil}</p>
                            <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Success Message */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500 rounded-full">
                        <GraduationCap className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-green-700 dark:text-green-400">
                          🎉 Congratulations! You are now a student of {university.name}!
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-500 font-tamil">
                          வாழ்த்துக்கள்! நீங்கள் இப்போது {university.name} மாணவர்!
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
