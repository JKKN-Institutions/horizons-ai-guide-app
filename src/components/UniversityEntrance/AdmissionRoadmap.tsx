import { useState } from 'react';
import { 
  FileText, 
  GraduationCap, 
  Target, 
  CalendarCheck,
  CheckCircle2,
  BookOpen,
  Users,
  Award,
  Building2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Calendar
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { University } from '@/data/university-entrance-data';
import { motion, AnimatePresence } from 'framer-motion';

interface AdmissionRoadmapProps {
  university: University;
}

export const AdmissionRoadmap = ({ university }: AdmissionRoadmapProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Determine admission type based on examName
  const isEntranceExamRequired = !university.examName.includes('Merit') && 
    !university.examName.includes('12th Marks') &&
    university.examName !== 'Merit-Based';

  const getAdmissionSteps = () => {
    // For TANCET-based universities (Anna, Periyar, etc.)
    if (university.examName === 'TANCET') {
      return {
        importantDates: [
          { event: 'Notification', date: 'January 2026', status: 'tentative' },
          { event: 'Application Start', date: 'January 2026', status: 'tentative' },
          { event: 'Application End', date: 'February 2026', status: 'tentative' },
          { event: 'Exam Date', date: 'March 2026 – Last Saturday', status: 'tentative' },
          { event: 'Results', date: 'April 2026', status: 'tentative' },
        ],
        steps: [
          {
            step: 1,
            icon: CheckCircle2,
            title: 'Check Eligibility',
            titleTamil: 'தகுதியை சரிபார்க்கவும்',
            colorScheme: 'purple',
            details: [
              'Relevant UG degree (Engineering / Science / Commerce) as per PG program',
              'Minimum 50% marks (45% for reserved categories) in qualifying degree',
              'Final-year students are also eligible'
            ]
          },
          {
            step: 2,
            icon: FileText,
            title: 'Apply for TANCET',
            titleTamil: 'TANCET-க்கு விண்ணப்பிக்கவும்',
            colorScheme: 'blue',
            details: [
              'Register online at annauniv.edu',
              'Fill application form carefully',
              'Pay application fee: ₹600 (General/OBC) | ₹300 (SC/ST)',
              'Upload photo & signature',
              'Application period: January–February'
            ]
          },
          {
            step: 3,
            icon: BookOpen,
            title: 'Prepare & Write Exam',
            titleTamil: 'தேர்வுக்கு தயாராகவும்',
            colorScheme: 'green',
            details: [
              'Exam conducted every year in March',
              '100 MCQs | 2 Hours duration',
              'No negative marking ✓',
              'Sections: Aptitude, Mathematics, Domain',
              'Computer Based Test (CBT)'
            ]
          },
          {
            step: 4,
            icon: Target,
            title: 'Expected Qualifying Score',
            titleTamil: 'எதிர்பார்க்கப்படும் தகுதி மதிப்பெண்',
            colorScheme: 'yellow',
            highlight: true,
            details: [
              'General: 35+ marks (out of 100)',
              'OBC / BC: 30+ marks',
              'SC / ST: 25+ marks',
              '⭐ Higher score = Better college options',
              'Note: Cut-off marks may vary every year'
            ]
          },
          {
            step: 5,
            icon: Users,
            title: 'Attend Counselling',
            titleTamil: 'கவுன்சிலிங்கில் கலந்து கொள்ளுங்கள்',
            colorScheme: 'rose',
            details: [
              'Merit list released in April',
              'Online counselling in May–June',
              'Choose preferred college & course based on rank'
            ]
          },
          {
            step: 6,
            icon: GraduationCap,
            title: 'Join University',
            titleTamil: 'பல்கலைக்கழகத்தில் சேருங்கள்',
            colorScheme: 'indigo',
            isFinal: true,
            details: [
              'Submit original certificates',
              'Pay semester fees',
              'Collect ID card & study materials',
              'Classes begin in July–August'
            ]
          }
        ]
      };
    }

    // For TNEA-based (Engineering UG)
    if (university.examName === 'TNEA') {
      return {
        importantDates: [
          { event: 'Registration Opens', date: 'May 2026', status: 'tentative' },
          { event: 'Registration Closes', date: 'June 2026', status: 'tentative' },
          { event: 'Counselling', date: 'July–August 2026', status: 'tentative' },
        ],
        steps: [
          {
            step: 1,
            icon: CheckCircle2,
            title: 'Complete 12th Standard',
            titleTamil: '12ஆம் வகுப்பு முடிக்கவும்',
            colorScheme: 'purple',
            details: [
              'Physics, Chemistry & Maths mandatory',
              'Minimum 50% in Maths (45% for reserved)',
              'Minimum 50% in aggregate (45% for reserved)'
            ]
          },
          {
            step: 2,
            icon: FileText,
            title: 'Apply for TNEA',
            titleTamil: 'TNEA-க்கு விண்ணப்பிக்கவும்',
            colorScheme: 'blue',
            details: [
              'Apply online at tneaonline.org',
              'Pay application fee',
              'Upload documents & photo',
              'Apply in May-June after 12th results'
            ]
          },
          {
            step: 3,
            icon: Target,
            title: 'Cutoff Score Calculation',
            titleTamil: 'கட்ஆஃப் மதிப்பெண் கணக்கீடு',
            colorScheme: 'green',
            highlight: true,
            details: [
              'Cutoff = Maths + (Physics/2) + (Chemistry/2)',
              'Maximum cutoff: 200 marks',
              '⭐ Higher cutoff = Top college seats',
              'Cutoffs vary by branch & college'
            ]
          },
          {
            step: 4,
            icon: Users,
            title: 'Online Counselling',
            titleTamil: 'ஆன்லைன் கவுன்சலிங்',
            colorScheme: 'yellow',
            details: [
              'Rank based on cutoff marks',
              'Multiple rounds of counselling',
              'Fill college & branch preferences',
              'Confirm allotted seat'
            ]
          },
          {
            step: 5,
            icon: GraduationCap,
            title: 'Join College',
            titleTamil: 'கல்லூரியில் சேருங்கள்',
            colorScheme: 'indigo',
            isFinal: true,
            details: [
              'Report to allotted college',
              'Submit original certificates',
              'Pay first year fees',
              'Classes start in August'
            ]
          }
        ]
      };
    }

    // For CUET-based universities
    if (university.examName === 'CUET-UG' || university.examName === 'CUET-PG' || university.examName.includes('CUET')) {
      return {
        importantDates: [
          { event: 'Application Opens', date: 'February 2026', status: 'tentative' },
          { event: 'Application Closes', date: 'March 2026', status: 'tentative' },
          { event: 'Exam Date', date: 'May-June 2026', status: 'tentative' },
          { event: 'Results', date: 'July 2026', status: 'tentative' },
        ],
        steps: [
          {
            step: 1,
            icon: CheckCircle2,
            title: 'Check Eligibility',
            titleTamil: 'தகுதியை சரிபார்க்கவும்',
            colorScheme: 'purple',
            details: [
              '12th pass for UG / Graduation for PG',
              'Minimum % varies by university',
              'Age limit as per course norms'
            ]
          },
          {
            step: 2,
            icon: FileText,
            title: 'Apply for CUET',
            titleTamil: 'CUET-க்கு விண்ணப்பிக்கவும்',
            colorScheme: 'blue',
            details: [
              'Apply online at cuet.nta.nic.in',
              'Pay ₹650-1000 (varies by subjects)',
              'Upload documents & photo',
              'Apply in February-March'
            ]
          },
          {
            step: 3,
            icon: BookOpen,
            title: 'Prepare & Give CUET',
            titleTamil: 'CUET தயாராகி எழுதுங்கள்',
            colorScheme: 'green',
            details: [
              'Computer-based test in May-June',
              'Choose domain subjects wisely',
              'Negative marking: -1 for wrong answer',
              'Multiple sessions available'
            ]
          },
          {
            step: 4,
            icon: Target,
            title: 'Score & Apply to University',
            titleTamil: 'மதிப்பெண் & பல்கலைக்கழகத்தில் விண்ணப்பிக்கவும்',
            colorScheme: 'yellow',
            highlight: true,
            details: [
              'Check university-wise cutoffs',
              'Apply separately to each university',
              '⭐ CUET score valid for 40+ universities',
              'Fill preference order'
            ]
          },
          {
            step: 5,
            icon: Users,
            title: 'Counselling & Seat Allotment',
            titleTamil: 'கவுன்சலிங் & இட ஒதுக்கீடு',
            colorScheme: 'rose',
            details: [
              'Merit list by each university',
              'Online/offline counselling',
              'Document verification',
              'Confirm seat with fee payment'
            ]
          },
          {
            step: 6,
            icon: GraduationCap,
            title: 'Join University',
            titleTamil: 'பல்கலைக்கழகத்தில் சேருங்கள்',
            colorScheme: 'indigo',
            isFinal: true,
            details: [
              'Report to campus',
              'Submit original certificates',
              'Get hostel allocation',
              'Session starts in July-August'
            ]
          }
        ]
      };
    }

    // For JEE-based (IITs, NITs)
    if (university.examName === 'JEE Advanced' || university.examName === 'JEE Main') {
      return {
        importantDates: [
          { event: 'JEE Main Application', date: 'November 2025', status: 'tentative' },
          { event: 'JEE Main Exam', date: 'January & April 2026', status: 'tentative' },
          { event: 'JEE Advanced Exam', date: 'May-June 2026', status: 'tentative' },
          { event: 'JoSAA Counselling', date: 'June-July 2026', status: 'tentative' },
        ],
        steps: [
          {
            step: 1,
            icon: CheckCircle2,
            title: 'Complete 12th with PCM',
            titleTamil: 'PCM-உடன் 12ஆம் வகுப்பு முடிக்கவும்',
            colorScheme: 'purple',
            details: [
              'Physics, Chemistry, Mathematics mandatory',
              'Minimum 75% aggregate (65% for reserved)',
              'Top 20 percentile in board exams'
            ]
          },
          {
            step: 2,
            icon: FileText,
            title: 'Apply for JEE Main',
            titleTamil: 'JEE Main-க்கு விண்ணப்பிக்கவும்',
            colorScheme: 'blue',
            details: [
              'Apply at jeemain.nta.nic.in',
              'Pay ₹950-1000',
              'Apply in November-December',
              'Two attempts: January & April'
            ]
          },
          {
            step: 3,
            icon: BookOpen,
            title: 'Clear JEE Main',
            titleTamil: 'JEE Main தேர்ச்சி பெறுங்கள்',
            colorScheme: 'green',
            details: [
              '90 questions, 300 marks, 3 hours',
              'Negative marking: -1 for wrong MCQ',
              'Top 2.5 lakh qualify for JEE Advanced',
              'JEE Main rank enough for NITs/IIITs'
            ]
          },
          {
            step: 4,
            icon: Target,
            title: university.examName === 'JEE Advanced' ? 'Clear JEE Advanced' : 'Get Good Rank',
            titleTamil: university.examName === 'JEE Advanced' ? 'JEE Advanced தேர்ச்சி' : 'நல்ல தரவரிசை பெறுங்கள்',
            colorScheme: 'yellow',
            highlight: true,
            details: university.examName === 'JEE Advanced' ? [
              'Only top 2.5 lakh from JEE Main eligible',
              'Paper 1 & 2, highly competitive',
              '⭐ IIT seats: ~16,000 only',
              'Exam in May-June'
            ] : [
              'Aim for 95+ percentile for top NITs',
              '⭐ Branch choice depends on rank',
              'Check previous year cutoffs',
              'State quota vs All India quota'
            ]
          },
          {
            step: 5,
            icon: Users,
            title: 'JoSAA Counselling',
            titleTamil: 'JoSAA கவுன்சலிங்',
            colorScheme: 'rose',
            details: [
              'Online counselling at josaa.nic.in',
              'Fill preferences (colleges + branches)',
              '6 rounds of seat allotment',
              'Accept, Freeze, or Slide option'
            ]
          },
          {
            step: 6,
            icon: GraduationCap,
            title: 'Report to Institute',
            titleTamil: 'நிறுவனத்தில் சேருங்கள்',
            colorScheme: 'indigo',
            isFinal: true,
            details: [
              'Original certificate verification',
              'Pay admission fees',
              'Hostel allocation',
              'Welcome to IIT/NIT life! 🎓'
            ]
          }
        ]
      };
    }

    // For NEET-based (Medical)
    if (university.examName === 'NEET-UG' || university.examName === 'NEET-PG') {
      return {
        importantDates: [
          { event: 'Application Opens', date: 'December 2025', status: 'tentative' },
          { event: 'Application Closes', date: 'March 2026', status: 'tentative' },
          { event: 'NEET Exam', date: 'May 2026', status: 'tentative' },
          { event: 'Counselling', date: 'July-August 2026', status: 'tentative' },
        ],
        steps: [
          {
            step: 1,
            icon: CheckCircle2,
            title: 'Complete 12th with PCB',
            titleTamil: 'PCB-உடன் 12ஆம் வகுப்பு முடிக்கவும்',
            colorScheme: 'purple',
            details: [
              'Physics, Chemistry, Biology mandatory',
              'Minimum 50% aggregate (40% for reserved)',
              'English as compulsory subject'
            ]
          },
          {
            step: 2,
            icon: FileText,
            title: 'Apply for NEET-UG',
            titleTamil: 'NEET-UG-க்கு விண்ணப்பிக்கவும்',
            colorScheme: 'blue',
            details: [
              'Apply at neet.nta.nic.in',
              'Pay ₹1600-1700',
              'Apply in December-March',
              'Only gateway to MBBS/BDS admission'
            ]
          },
          {
            step: 3,
            icon: BookOpen,
            title: 'Prepare & Give NEET',
            titleTamil: 'NEET தயாராகி எழுதுங்கள்',
            colorScheme: 'green',
            details: [
              '200 questions (180 to attempt), 720 marks',
              'Negative marking: -1 for wrong answer',
              'Physics, Chemistry, Biology (equal weightage)',
              '3 hours 20 minutes duration'
            ]
          },
          {
            step: 4,
            icon: Target,
            title: 'Score Required',
            titleTamil: 'தேவையான மதிப்பெண்',
            colorScheme: 'yellow',
            highlight: true,
            details: [
              'General: 600+ for Govt MBBS (TN)',
              'OBC: 550+ for Govt MBBS (TN)',
              'SC/ST: 450+ for Govt MBBS (TN)',
              '⭐ 650+ for top medical colleges'
            ]
          },
          {
            step: 5,
            icon: Users,
            title: 'State Counselling',
            titleTamil: 'மாநில கவுன்சலிங்',
            colorScheme: 'rose',
            details: [
              'TNMC conducts TN state counselling',
              'Choose 85% State quota or 15% AIQ',
              'Online choice filling',
              'Document verification at center'
            ]
          },
          {
            step: 6,
            icon: GraduationCap,
            title: 'Join Medical College',
            titleTamil: 'மருத்துவக் கல்லூரியில் சேருங்கள்',
            colorScheme: 'indigo',
            isFinal: true,
            details: [
              'Submit original certificates',
              'Pay fees (Govt: ~₹15K/yr)',
              'Get your white coat! 🥼',
              '5.5 years MBBS journey begins'
            ]
          }
        ]
      };
    }

    // Default for Merit-Based admissions
    return {
      importantDates: [],
      steps: [
        {
          step: 1,
          icon: CheckCircle2,
          title: 'Check Eligibility',
          titleTamil: 'தகுதியை சரிபார்க்கவும்',
          colorScheme: 'purple',
          details: [
            'Required educational qualification',
            'Minimum percentage as per course',
            'Age limit if applicable'
          ]
        },
        {
          step: 2,
          icon: FileText,
          title: 'Apply Online',
          titleTamil: 'ஆன்லைனில் விண்ணப்பிக்கவும்',
          colorScheme: 'blue',
          details: [
            `Apply at ${university.website}`,
            'Fill application form',
            'Pay application fee',
            'Upload required documents'
          ]
        },
        {
          step: 3,
          icon: Target,
          title: 'Marks Required',
          titleTamil: 'தேவையான மதிப்பெண்கள்',
          colorScheme: 'green',
          highlight: true,
          details: [
            'Based on 12th/UG marks',
            '⭐ Higher marks = Better chance',
            'Check previous year cutoffs',
            'Category-wise cutoffs apply'
          ]
        },
        {
          step: 4,
          icon: Users,
          title: 'Merit List & Counselling',
          titleTamil: 'தகுதி பட்டியல் & கவுன்சலிங்',
          colorScheme: 'yellow',
          details: [
            'Merit list published on website',
            'Online/offline counselling',
            'Choose your preferred course',
            'Confirm seat allocation'
          ]
        },
        {
          step: 5,
          icon: GraduationCap,
          title: 'Join University',
          titleTamil: 'பல்கலைக்கழகத்தில் சேருங்கள்',
          colorScheme: 'indigo',
          isFinal: true,
          details: [
            'Submit original certificates',
            'Pay semester/year fees',
            'Collect ID card',
            'Classes begin as per schedule'
          ]
        }
      ]
    };
  };

  const roadmapData = getAdmissionSteps();

  // Color scheme mappings for soft, pastel-like colors
  const getColorClasses = (colorScheme: string) => {
    const colors: Record<string, { 
      bg: string; 
      bgLight: string;
      border: string; 
      text: string; 
      icon: string;
      gradient: string;
      dot: string;
    }> = {
      purple: {
        bg: 'bg-purple-500',
        bgLight: 'bg-purple-50 dark:bg-purple-900/20',
        border: 'border-purple-200 dark:border-purple-800',
        text: 'text-purple-600 dark:text-purple-400',
        icon: 'bg-gradient-to-br from-purple-400 to-purple-600',
        gradient: 'from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10',
        dot: 'bg-purple-400'
      },
      blue: {
        bg: 'bg-blue-500',
        bgLight: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-200 dark:border-blue-800',
        text: 'text-blue-600 dark:text-blue-400',
        icon: 'bg-gradient-to-br from-blue-400 to-blue-600',
        gradient: 'from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10',
        dot: 'bg-blue-400'
      },
      green: {
        bg: 'bg-emerald-500',
        bgLight: 'bg-emerald-50 dark:bg-emerald-900/20',
        border: 'border-emerald-200 dark:border-emerald-800',
        text: 'text-emerald-600 dark:text-emerald-400',
        icon: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
        gradient: 'from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/10',
        dot: 'bg-emerald-400'
      },
      yellow: {
        bg: 'bg-amber-500',
        bgLight: 'bg-amber-50 dark:bg-amber-900/20',
        border: 'border-amber-200 dark:border-amber-800',
        text: 'text-amber-600 dark:text-amber-400',
        icon: 'bg-gradient-to-br from-amber-400 to-amber-600',
        gradient: 'from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/10',
        dot: 'bg-amber-400'
      },
      rose: {
        bg: 'bg-rose-500',
        bgLight: 'bg-rose-50 dark:bg-rose-900/20',
        border: 'border-rose-200 dark:border-rose-800',
        text: 'text-rose-600 dark:text-rose-400',
        icon: 'bg-gradient-to-br from-rose-400 to-rose-600',
        gradient: 'from-rose-50 to-rose-100/50 dark:from-rose-900/20 dark:to-rose-800/10',
        dot: 'bg-rose-400'
      },
      indigo: {
        bg: 'bg-indigo-500',
        bgLight: 'bg-indigo-50 dark:bg-indigo-900/20',
        border: 'border-indigo-200 dark:border-indigo-800',
        text: 'text-indigo-600 dark:text-indigo-400',
        icon: 'bg-gradient-to-br from-indigo-400 to-indigo-600',
        gradient: 'from-indigo-50 to-indigo-100/50 dark:from-indigo-900/20 dark:to-indigo-800/10',
        dot: 'bg-indigo-400'
      }
    };
    return colors[colorScheme] || colors.purple;
  };

  return (
    <div className="space-y-4">
      {/* Collapsible Header */}
      <Card 
        className="overflow-hidden cursor-pointer transition-all hover:shadow-md border-2 border-emerald-100 dark:border-emerald-900/30 rounded-2xl"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-900/20 dark:via-teal-900/20 dark:to-cyan-900/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg shadow-emerald-500/20">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  🎯 Step-by-Step Admission Guide
                </h2>
                <p className="text-sm text-muted-foreground font-tamil">படிப்படியான சேர்க்கை வழிகாட்டி</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Exam Badge */}
              {isEntranceExamRequired ? (
                <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs hidden sm:flex">
                  📝 Entrance Exam Required
                </Badge>
              ) : (
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs hidden sm:flex">
                  ✅ Merit-Based
                </Badge>
              )}
              <div className="p-2 rounded-full bg-white/50 dark:bg-slate-800/50">
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-emerald-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </div>
          </div>
          {/* Mobile badge */}
          <div className="mt-2 flex sm:hidden">
            {isEntranceExamRequired ? (
              <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">
                📝 Entrance Exam Required
              </Badge>
            ) : (
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
                ✅ Merit-Based
              </Badge>
            )}
          </div>
        </div>
      </Card>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 overflow-hidden"
          >
            {/* University Title & Exam Name */}
            <div className="text-center py-2">
              <h3 className="text-xl font-bold text-foreground">{university.name}</h3>
              <p className="text-muted-foreground font-tamil">{university.nameTamil}</p>
              <div className="mt-2 flex justify-center gap-2 flex-wrap">
                <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                  Admission via: {university.examName}
                </Badge>
              </div>
            </div>

            {/* Important Dates */}
            {roadmapData.importantDates.length > 0 && (
              <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground">📅 Important Dates</h3>
                    <Badge variant="outline" className="text-xs bg-amber-50 text-amber-600 border-amber-200">
                      Tentative – 2026
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {roadmapData.importantDates.map((date, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700"
                      >
                        <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{date.event}</p>
                          <p className="text-xs text-muted-foreground">{date.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Steps Timeline */}
            <div className="space-y-3">
              {roadmapData.steps.map((step, index) => {
                const colors = getColorClasses(step.colorScheme);
                const IconComponent = step.icon;
                
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <Card className={`relative overflow-hidden rounded-2xl border-2 ${colors.border} ${step.isFinal ? 'ring-2 ring-emerald-400/30' : ''}`}>
                      {/* Left accent bar */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${colors.bg}`} />
                      
                      <CardContent className={`p-4 pl-5 bg-gradient-to-r ${colors.gradient}`}>
                        <div className="flex items-start gap-4">
                          {/* Step Number & Icon */}
                          <div className="flex flex-col items-center gap-2 shrink-0">
                            <div className={`w-14 h-14 rounded-2xl ${colors.icon} flex items-center justify-center shadow-lg`}>
                              <IconComponent className="h-7 w-7 text-white" />
                            </div>
                            <Badge className={`${colors.bgLight} ${colors.text} border-0 text-xs font-bold px-3`}>
                              Step {step.step}
                            </Badge>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <div>
                                <h4 className="font-bold text-foreground text-lg leading-tight">{step.title}</h4>
                                <p className="text-sm text-muted-foreground font-tamil">({step.titleTamil})</p>
                              </div>
                              {step.highlight && (
                                <Badge className="bg-amber-100 text-amber-700 border-amber-200 shrink-0 text-xs">
                                  ⭐ Key Step
                                </Badge>
                              )}
                            </div>

                            {/* Details List */}
                            <ul className="mt-3 space-y-2">
                              {step.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                  <span className={`mt-1.5 w-2 h-2 rounded-full ${colors.dot} shrink-0`} />
                                  <span className="leading-relaxed">{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Congratulations Message */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-2xl overflow-hidden border-0 shadow-xl shadow-emerald-500/20">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    🎉 Congratulations!
                  </h3>
                  <p className="text-white/95 text-lg">
                    "You are now a student of {university.name}."
                  </p>
                  <p className="text-white/85 font-tamil mt-1">
                    (வாழ்த்துக்கள்! நீங்கள் இப்போது {university.nameTamil} மாணவர்!)
                  </p>
                  <p className="mt-4 text-sm text-white/75">
                    Your journey to success begins here! 🚀
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
