import { 
  FileText, 
  GraduationCap, 
  ClipboardCheck, 
  Target, 
  CalendarCheck, 
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Users,
  Award,
  Building2,
  Sparkles
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { University } from '@/data/university-entrance-data';

interface AdmissionRoadmapProps {
  university: University;
}

export const AdmissionRoadmap = ({ university }: AdmissionRoadmapProps) => {
  // Determine admission type based on examName
  const isEntranceExamRequired = !university.examName.includes('Merit') && 
    !university.examName.includes('12th Marks') &&
    university.examName !== 'Merit-Based';

  const getAdmissionSteps = () => {
    // For TANCET-based universities (Anna, Periyar, etc.)
    if (university.examName === 'TANCET') {
      return [
        {
          step: 1,
          icon: GraduationCap,
          title: 'Check Eligibility',
          titleTamil: 'தகுதியை சரிபார்க்கவும்',
          description: 'Complete your UG degree with required percentage',
          details: [
            '✅ Engineering/B.Sc./B.Com degree for PG courses',
            '✅ Minimum 50% marks (45% for reserved categories)',
            '✅ Final year students can also apply'
          ],
          color: 'from-purple-500 to-purple-600',
          bgColor: 'bg-purple-50 dark:bg-purple-900/20'
        },
        {
          step: 2,
          icon: FileText,
          title: 'Apply for TANCET',
          titleTamil: 'TANCET-க்கு விண்ணப்பிக்கவும்',
          description: 'Register online at annauniv.edu',
          details: [
            '📝 Fill application form online',
            '💰 Pay ₹600 (General) / ₹300 (SC/ST)',
            '📸 Upload photo & signature',
            '📅 Apply in January-February'
          ],
          color: 'from-blue-500 to-blue-600',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20'
        },
        {
          step: 3,
          icon: BookOpen,
          title: 'Prepare & Give Exam',
          titleTamil: 'தயாராகி தேர்வு எழுதுங்கள்',
          description: 'TANCET is conducted in March every year',
          details: [
            '📚 100 MCQs in 2 hours',
            '🎯 No negative marking',
            '📖 Sections: Aptitude, Maths, Domain',
            '🏫 Computer Based Test (CBT)'
          ],
          color: 'from-emerald-500 to-emerald-600',
          bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
        },
        {
          step: 4,
          icon: Target,
          title: 'Score Required',
          titleTamil: 'தேவையான மதிப்பெண்',
          description: 'Qualifying marks vary by category',
          details: [
            '🎯 General: 35+ marks (out of 100)',
            '🎯 OBC/BC: 30+ marks',
            '🎯 SC/ST: 25+ marks',
            '⭐ Higher score = Better college choice'
          ],
          color: 'from-amber-500 to-amber-600',
          bgColor: 'bg-amber-50 dark:bg-amber-900/20'
        },
        {
          step: 5,
          icon: ClipboardCheck,
          title: 'Attend Counselling',
          titleTamil: 'கவுன்சலிங்கில் கலந்துகொள்ளுங்கள்',
          description: 'Based on rank, choose your college',
          details: [
            '🏆 Merit list released in April',
            '💻 Online counselling in May-June',
            '📋 Choose college & course preference',
            '✅ Confirm seat with fee payment'
          ],
          color: 'from-rose-500 to-rose-600',
          bgColor: 'bg-rose-50 dark:bg-rose-900/20'
        },
        {
          step: 6,
          icon: Building2,
          title: 'Join University',
          titleTamil: 'பல்கலைக்கழகத்தில் சேருங்கள்',
          description: 'Complete admission formalities',
          details: [
            '📄 Submit original certificates',
            '💳 Pay semester fees',
            '🎓 Collect ID card & materials',
            '📅 Classes start in July-August'
          ],
          color: 'from-indigo-500 to-indigo-600',
          bgColor: 'bg-indigo-50 dark:bg-indigo-900/20'
        }
      ];
    }

    // For TNEA-based (Engineering UG)
    if (university.examName === 'TNEA') {
      return [
        {
          step: 1,
          icon: GraduationCap,
          title: 'Complete 12th Standard',
          titleTamil: '12ஆம் வகுப்பு முடிக்கவும்',
          description: 'With Physics, Chemistry & Maths',
          details: [
            '✅ PCM stream mandatory for Engineering',
            '✅ Minimum 50% in Maths (45% for reserved)',
            '✅ Minimum 50% in aggregate (45% for reserved)'
          ],
          color: 'from-purple-500 to-purple-600',
          bgColor: 'bg-purple-50 dark:bg-purple-900/20'
        },
        {
          step: 2,
          icon: FileText,
          title: 'Apply for TNEA',
          titleTamil: 'TNEA-க்கு விண்ணப்பிக்கவும்',
          description: 'Tamil Nadu Engineering Admissions',
          details: [
            '📝 Apply online at tneaonline.org',
            '💰 Pay application fee',
            '📸 Upload documents & photo',
            '📅 Apply in May-June after 12th results'
          ],
          color: 'from-blue-500 to-blue-600',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20'
        },
        {
          step: 3,
          icon: Target,
          title: 'Cutoff Score Calculation',
          titleTamil: 'கட்ஆஃப் மதிப்பெண் கணக்கீடு',
          description: 'Based on 12th marks (No entrance exam!)',
          details: [
            '📊 Cutoff = Maths + (Phy/2) + (Chem/2)',
            '🎯 Maximum cutoff: 200 marks',
            '⭐ Higher cutoff = Top college seats',
            '📈 Cutoffs vary by branch & college'
          ],
          color: 'from-emerald-500 to-emerald-600',
          bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
        },
        {
          step: 4,
          icon: ClipboardCheck,
          title: 'Online Counselling',
          titleTamil: 'ஆன்லைன் கவுன்சலிங்',
          description: 'Choose colleges based on your rank',
          details: [
            '🏆 Rank based on cutoff marks',
            '💻 Multiple rounds of counselling',
            '📋 Fill college & branch preferences',
            '✅ Confirm allotted seat'
          ],
          color: 'from-amber-500 to-amber-600',
          bgColor: 'bg-amber-50 dark:bg-amber-900/20'
        },
        {
          step: 5,
          icon: Building2,
          title: 'Join College',
          titleTamil: 'கல்லூரியில் சேருங்கள்',
          description: 'Report to allotted college',
          details: [
            '📄 Submit original certificates',
            '💳 Pay first year fees',
            '🎓 Begin your B.E./B.Tech journey',
            '📅 Classes start in August'
          ],
          color: 'from-indigo-500 to-indigo-600',
          bgColor: 'bg-indigo-50 dark:bg-indigo-900/20'
        }
      ];
    }

    // For CUET-based universities
    if (university.examName === 'CUET-UG' || university.examName === 'CUET-PG' || university.examName.includes('CUET')) {
      return [
        {
          step: 1,
          icon: GraduationCap,
          title: 'Check Eligibility',
          titleTamil: 'தகுதியை சரிபார்க்கவும்',
          description: 'Based on course requirements',
          details: [
            '✅ 12th pass for UG / Graduation for PG',
            '✅ Minimum % varies by university',
            '✅ Age limit as per course norms'
          ],
          color: 'from-purple-500 to-purple-600',
          bgColor: 'bg-purple-50 dark:bg-purple-900/20'
        },
        {
          step: 2,
          icon: FileText,
          title: 'Apply for CUET',
          titleTamil: 'CUET-க்கு விண்ணப்பிக்கவும்',
          description: 'Common University Entrance Test',
          details: [
            '📝 Apply online at cuet.nta.nic.in',
            '💰 Pay ₹650-1000 (varies by subjects)',
            '📸 Upload documents',
            '📅 Apply in February-March'
          ],
          color: 'from-blue-500 to-blue-600',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20'
        },
        {
          step: 3,
          icon: BookOpen,
          title: 'Prepare & Give CUET',
          titleTamil: 'CUET தயாராகி எழுதுங்கள்',
          description: 'Computer-based test in May-June',
          details: [
            '📚 Choose domain subjects wisely',
            '🎯 Negative marking: -1 for wrong answer',
            '📖 Multiple sessions available',
            '🏫 Test centers across India'
          ],
          color: 'from-emerald-500 to-emerald-600',
          bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
        },
        {
          step: 4,
          icon: Target,
          title: 'Score & Apply to University',
          titleTamil: 'மதிப்பெண் & பல்கலைக்கழகத்தில் விண்ணப்பிக்கவும்',
          description: 'Apply to multiple central universities',
          details: [
            '🎯 Check university-wise cutoffs',
            '📝 Apply separately to each university',
            '⭐ CUET score valid for 40+ universities',
            '📋 Fill preference order'
          ],
          color: 'from-amber-500 to-amber-600',
          bgColor: 'bg-amber-50 dark:bg-amber-900/20'
        },
        {
          step: 5,
          icon: ClipboardCheck,
          title: 'Counselling & Seat Allotment',
          titleTamil: 'கவுன்சலிங் & இட ஒதுக்கீடு',
          description: 'University-wise admission process',
          details: [
            '🏆 Merit list by each university',
            '💻 Online/offline counselling',
            '✅ Document verification',
            '💳 Confirm seat with fee payment'
          ],
          color: 'from-rose-500 to-rose-600',
          bgColor: 'bg-rose-50 dark:bg-rose-900/20'
        },
        {
          step: 6,
          icon: Building2,
          title: 'Join University',
          titleTamil: 'பல்கலைக்கழகத்தில் சேருங்கள்',
          description: 'Report to campus',
          details: [
            '📄 Submit original certificates',
            '💳 Complete fee payment',
            '🎓 Get hostel allocation',
            '📅 Session starts in July-August'
          ],
          color: 'from-indigo-500 to-indigo-600',
          bgColor: 'bg-indigo-50 dark:bg-indigo-900/20'
        }
      ];
    }

    // For JEE-based (IITs, NITs)
    if (university.examName === 'JEE Advanced' || university.examName === 'JEE Main') {
      return [
        {
          step: 1,
          icon: GraduationCap,
          title: 'Complete 12th with PCM',
          titleTamil: 'PCM-உடன் 12ஆம் வகுப்பு முடிக்கவும்',
          description: 'Physics, Chemistry, Mathematics mandatory',
          details: [
            '✅ PCM stream in 11th & 12th',
            '✅ Minimum 75% aggregate (65% for reserved)',
            '✅ Top 20 percentile in board exams'
          ],
          color: 'from-purple-500 to-purple-600',
          bgColor: 'bg-purple-50 dark:bg-purple-900/20'
        },
        {
          step: 2,
          icon: FileText,
          title: 'Apply for JEE Main',
          titleTamil: 'JEE Main-க்கு விண்ணப்பிக்கவும்',
          description: 'First step to IIT/NIT admission',
          details: [
            '📝 Apply at jeemain.nta.nic.in',
            '💰 Pay ₹950-1000',
            '📅 Apply in November-December',
            '🔄 Two attempts: Jan & April'
          ],
          color: 'from-blue-500 to-blue-600',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20'
        },
        {
          step: 3,
          icon: BookOpen,
          title: 'Clear JEE Main',
          titleTamil: 'JEE Main தேர்ச்சி பெறுங்கள்',
          description: 'Qualify for NITs or JEE Advanced',
          details: [
            '📚 90 questions, 300 marks, 3 hours',
            '🎯 Negative marking: -1 for wrong MCQ',
            '⭐ Top 2.5 lakh qualify for JEE Advanced',
            '🏫 JEE Main rank enough for NITs/IIITs'
          ],
          color: 'from-emerald-500 to-emerald-600',
          bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
        },
        {
          step: 4,
          icon: Target,
          title: university.examName === 'JEE Advanced' ? 'Clear JEE Advanced' : 'Get Good Rank',
          titleTamil: university.examName === 'JEE Advanced' ? 'JEE Advanced தேர்ச்சி' : 'நல்ல தரவரிசை பெறுங்கள்',
          description: university.examName === 'JEE Advanced' ? 'For IIT admission only' : 'Better rank = Better branch',
          details: university.examName === 'JEE Advanced' ? [
            '📚 Only top 2.5 lakh from JEE Main eligible',
            '🎯 Paper 1 & 2, highly competitive',
            '⭐ IIT seats: ~16,000 only',
            '📅 Exam in May-June'
          ] : [
            '🎯 Aim for 95+ percentile for top NITs',
            '⭐ Branch choice depends on rank',
            '📊 Check previous year cutoffs',
            '🏆 State quota vs All India quota'
          ],
          color: 'from-amber-500 to-amber-600',
          bgColor: 'bg-amber-50 dark:bg-amber-900/20'
        },
        {
          step: 5,
          icon: ClipboardCheck,
          title: 'JoSAA Counselling',
          titleTamil: 'JoSAA கவுன்சலிங்',
          description: 'Joint Seat Allocation Authority',
          details: [
            '💻 Online counselling at josaa.nic.in',
            '📋 Fill preferences (colleges + branches)',
            '🔄 6 rounds of seat allotment',
            '✅ Accept, Freeze, or Slide option'
          ],
          color: 'from-rose-500 to-rose-600',
          bgColor: 'bg-rose-50 dark:bg-rose-900/20'
        },
        {
          step: 6,
          icon: Building2,
          title: 'Report to Institute',
          titleTamil: 'நிறுவனத்தில் சேருங்கள்',
          description: 'Complete admission at campus',
          details: [
            '📄 Original certificate verification',
            '💳 Pay admission fees',
            '🏠 Hostel allocation',
            '🎓 Welcome to IIT/NIT life!'
          ],
          color: 'from-indigo-500 to-indigo-600',
          bgColor: 'bg-indigo-50 dark:bg-indigo-900/20'
        }
      ];
    }

    // For NEET-based (Medical)
    if (university.examName === 'NEET-UG' || university.examName === 'NEET-PG') {
      return [
        {
          step: 1,
          icon: GraduationCap,
          title: 'Complete 12th with PCB',
          titleTamil: 'PCB-உடன் 12ஆம் வகுப்பு முடிக்கவும்',
          description: 'Physics, Chemistry, Biology mandatory',
          details: [
            '✅ PCB stream in 11th & 12th',
            '✅ Minimum 50% aggregate (40% for reserved)',
            '✅ English as compulsory subject'
          ],
          color: 'from-purple-500 to-purple-600',
          bgColor: 'bg-purple-50 dark:bg-purple-900/20'
        },
        {
          step: 2,
          icon: FileText,
          title: 'Apply for NEET-UG',
          titleTamil: 'NEET-UG-க்கு விண்ணப்பிக்கவும்',
          description: 'Only gateway to MBBS/BDS admission',
          details: [
            '📝 Apply at neet.nta.nic.in',
            '💰 Pay ₹1600-1700',
            '📅 Apply in December-March',
            '📸 Upload photo in white background'
          ],
          color: 'from-blue-500 to-blue-600',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20'
        },
        {
          step: 3,
          icon: BookOpen,
          title: 'Prepare & Give NEET',
          titleTamil: 'NEET தயாராகி எழுதுங்கள்',
          description: 'Pen-paper based exam in May',
          details: [
            '📚 200 questions (180 to attempt), 720 marks',
            '🎯 Negative marking: -1 for wrong answer',
            '📖 Physics, Chemistry, Biology (equal weightage)',
            '⏱️ 3 hours 20 minutes duration'
          ],
          color: 'from-emerald-500 to-emerald-600',
          bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
        },
        {
          step: 4,
          icon: Target,
          title: 'Score Required',
          titleTamil: 'தேவையான மதிப்பெண்',
          description: 'Higher marks = Govt college MBBS seat',
          details: [
            '🎯 General: 600+ for Govt MBBS (TN)',
            '🎯 OBC: 550+ for Govt MBBS (TN)',
            '🎯 SC/ST: 450+ for Govt MBBS (TN)',
            '⭐ 650+ for top medical colleges'
          ],
          color: 'from-amber-500 to-amber-600',
          bgColor: 'bg-amber-50 dark:bg-amber-900/20'
        },
        {
          step: 5,
          icon: ClipboardCheck,
          title: 'State Counselling',
          titleTamil: 'மாநில கவுன்சலிங்',
          description: 'Choose 85% State quota or 15% AIQ',
          details: [
            '🏆 TNMC conducts TN state counselling',
            '💻 Online choice filling',
            '📋 Choose medical/dental colleges',
            '✅ Document verification at center'
          ],
          color: 'from-rose-500 to-rose-600',
          bgColor: 'bg-rose-50 dark:bg-rose-900/20'
        },
        {
          step: 6,
          icon: Building2,
          title: 'Join Medical College',
          titleTamil: 'மருத்துவக் கல்லூரியில் சேருங்கள்',
          description: 'Begin your medical journey',
          details: [
            '📄 Submit original certificates',
            '💳 Pay fees (Govt: ~₹15K/yr)',
            '🥼 Get your white coat!',
            '📅 5.5 years MBBS journey begins'
          ],
          color: 'from-indigo-500 to-indigo-600',
          bgColor: 'bg-indigo-50 dark:bg-indigo-900/20'
        }
      ];
    }

    // Default for Merit-Based admissions
    return [
      {
        step: 1,
        icon: GraduationCap,
        title: 'Check Eligibility',
        titleTamil: 'தகுதியை சரிபார்க்கவும்',
        description: 'Meet minimum qualification requirements',
        details: [
          '✅ Required educational qualification',
          '✅ Minimum percentage as per course',
          '✅ Age limit if applicable'
        ],
        color: 'from-purple-500 to-purple-600',
        bgColor: 'bg-purple-50 dark:bg-purple-900/20'
      },
      {
        step: 2,
        icon: FileText,
        title: 'Apply Online',
        titleTamil: 'ஆன்லைனில் விண்ணப்பிக்கவும்',
        description: `Apply at ${university.website}`,
        details: [
          '📝 Fill application form',
          '💰 Pay application fee',
          '📸 Upload required documents',
          '📅 Apply before deadline'
        ],
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20'
      },
      {
        step: 3,
        icon: Target,
        title: 'Marks Required',
        titleTamil: 'தேவையான மதிப்பெண்கள்',
        description: 'Merit based on qualifying exam marks',
        details: [
          '📊 Based on 12th/UG marks',
          '🎯 Higher marks = Better chance',
          '⭐ Check previous year cutoffs',
          '📈 Category-wise cutoffs apply'
        ],
        color: 'from-emerald-500 to-emerald-600',
        bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
      },
      {
        step: 4,
        icon: ClipboardCheck,
        title: 'Merit List & Counselling',
        titleTamil: 'தகுதி பட்டியல் & கவுன்சலிங்',
        description: 'Selection based on merit ranking',
        details: [
          '🏆 Merit list published on website',
          '💻 Online/offline counselling',
          '📋 Choose your preferred course',
          '✅ Confirm seat allocation'
        ],
        color: 'from-amber-500 to-amber-600',
        bgColor: 'bg-amber-50 dark:bg-amber-900/20'
      },
      {
        step: 5,
        icon: Building2,
        title: 'Join University',
        titleTamil: 'பல்கலைக்கழகத்தில் சேருங்கள்',
        description: 'Complete admission formalities',
        details: [
          '📄 Submit original certificates',
          '💳 Pay semester/year fees',
          '🎓 Collect ID card',
          '📅 Classes begin as per schedule'
        ],
        color: 'from-indigo-500 to-indigo-600',
        bgColor: 'bg-indigo-50 dark:bg-indigo-900/20'
      }
    ];
  };

  const steps = getAdmissionSteps();

  return (
    <Card className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 border-2 border-primary/20 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-white p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              Step-by-Step Admission Guide
            </h2>
            <p className="text-white/80 text-sm font-tamil">
              படிப்படியான சேர்க்கை வழிகாட்டி
            </p>
          </div>
        </div>
        
        {/* Exam Badge */}
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 px-3 py-1">
            🎯 Admission via: {university.examName}
          </Badge>
          {isEntranceExamRequired ? (
            <Badge className="bg-amber-500/80 hover:bg-amber-500 text-white border-0 px-3 py-1">
              📝 Entrance Exam Required
            </Badge>
          ) : (
            <Badge className="bg-green-500/80 hover:bg-green-500 text-white border-0 px-3 py-1">
              ✅ Merit-Based (No Entrance Exam)
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-4 md:p-6">
        {/* Steps Container */}
        <div className="relative space-y-4">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isLast = index === steps.length - 1;
            
            return (
              <div key={step.step} className="relative">
                {/* Connector Line */}
                {!isLast && (
                  <div className="absolute left-6 top-16 w-0.5 h-full -bottom-4 bg-gradient-to-b from-primary/30 to-transparent z-0" />
                )}
                
                {/* Step Card */}
                <div className={`relative flex gap-4 p-4 rounded-xl ${step.bgColor} border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all`}>
                  {/* Step Number & Icon */}
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className={`px-2 py-0.5 rounded-full bg-gradient-to-r ${step.color} text-white text-xs font-bold`}>
                      Step {step.step}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                    <p className="text-sm text-primary font-tamil">{step.titleTamil}</p>
                    <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                    
                    {/* Details List */}
                    <div className="mt-3 space-y-1.5">
                      {step.details.map((detail, idx) => (
                        <p key={idx} className="text-sm text-foreground/80 flex items-start gap-2">
                          <span>{detail}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                  
                  {/* Arrow for next step */}
                  {!isLast && (
                    <div className="absolute -bottom-4 left-6 transform -translate-x-1/2 z-10">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <ArrowRight className="h-3 w-3 text-primary rotate-90" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          
          {/* Success Message */}
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-green-300 dark:border-green-700">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-green-700 dark:text-green-400">
                🎉 Congratulations! You're now a student of {university.name}!
              </h3>
              <p className="text-sm text-green-600 dark:text-green-500 font-tamil">
                வாழ்த்துக்கள்! இப்போது நீங்கள் {university.nameTamil} மாணவர்!
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
