import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, ChevronDown, GraduationCap, Briefcase, Code, 
  Stethoscope, Scale, Landmark, Palette, Wrench, BookOpen,
  TrendingUp, DollarSign, Clock, Award, Building2, Rocket,
  ArrowRight, Sparkles, Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CareerPath {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  entranceExams: string[];
  avgSalary: string;
  growthRate: string;
  jobRoles: string[];
  topColleges: string[];
  skills: string[];
  duration: string;
  subPaths?: CareerPath[];
}

const CAREER_PATHS: CareerPath[] = [
  {
    id: 'engineering',
    name: 'Engineering & Technology',
    icon: <Code className="h-5 w-5" />,
    color: 'blue',
    description: 'Design, build, and innovate technology solutions',
    entranceExams: ['JEE Main', 'JEE Advanced', 'TNEA', 'BITSAT'],
    avgSalary: '₹6-25 LPA',
    growthRate: '+15%',
    jobRoles: ['Software Engineer', 'Data Scientist', 'AI/ML Engineer'],
    topColleges: ['IIT Madras', 'Anna University', 'NIT Trichy'],
    skills: ['Programming', 'Problem Solving', 'Mathematics'],
    duration: '4 years B.Tech/B.E.',
    subPaths: [
      { id: 'cse', name: 'Computer Science', icon: <Code className="h-4 w-4" />, color: 'indigo', description: 'Software development, AI, Data Science', entranceExams: ['JEE', 'TNEA'], avgSalary: '₹8-30 LPA', growthRate: '+25%', jobRoles: ['Software Developer', 'AI Engineer', 'Cloud Architect'], topColleges: ['IIT', 'BITS', 'NIT'], skills: ['Coding', 'DSA', 'System Design'], duration: '4 years' },
      { id: 'ece', name: 'Electronics & Communication', icon: <Wrench className="h-4 w-4" />, color: 'purple', description: 'Embedded systems, IoT, Semiconductors', entranceExams: ['JEE', 'TNEA'], avgSalary: '₹5-18 LPA', growthRate: '+12%', jobRoles: ['Embedded Engineer', 'VLSI Designer'], topColleges: ['IIT', 'NIT'], skills: ['Circuit Design', 'Signal Processing'], duration: '4 years' },
      { id: 'mech', name: 'Mechanical Engineering', icon: <Wrench className="h-4 w-4" />, color: 'orange', description: 'Automobiles, Manufacturing, Robotics', entranceExams: ['JEE', 'TNEA'], avgSalary: '₹4-15 LPA', growthRate: '+8%', jobRoles: ['Design Engineer', 'Production Manager'], topColleges: ['IIT', 'NIT'], skills: ['CAD', 'Thermodynamics'], duration: '4 years' },
      { id: 'civil', name: 'Civil Engineering', icon: <Building2 className="h-4 w-4" />, color: 'green', description: 'Infrastructure, Construction, Urban Planning', entranceExams: ['JEE', 'TNEA'], avgSalary: '₹4-12 LPA', growthRate: '+6%', jobRoles: ['Site Engineer', 'Structural Designer'], topColleges: ['IIT', 'NIT'], skills: ['AutoCAD', 'Project Management'], duration: '4 years' },
    ]
  },
  {
    id: 'medical',
    name: 'Medical & Healthcare',
    icon: <Stethoscope className="h-5 w-5" />,
    color: 'red',
    description: 'Heal, care, and save lives',
    entranceExams: ['NEET UG', 'NEET PG', 'AIIMS'],
    avgSalary: '₹8-50 LPA',
    growthRate: '+10%',
    jobRoles: ['Doctor', 'Surgeon', 'Medical Researcher'],
    topColleges: ['AIIMS Delhi', 'CMC Vellore', 'Madras Medical'],
    skills: ['Biology', 'Patient Care', 'Research'],
    duration: '5.5 years MBBS',
    subPaths: [
      { id: 'mbbs', name: 'MBBS - Doctor', icon: <Stethoscope className="h-4 w-4" />, color: 'red', description: 'Become a physician or surgeon', entranceExams: ['NEET UG'], avgSalary: '₹10-60 LPA', growthRate: '+12%', jobRoles: ['General Physician', 'Specialist'], topColleges: ['AIIMS', 'CMC'], skills: ['Diagnosis', 'Surgery'], duration: '5.5 years' },
      { id: 'bds', name: 'BDS - Dentistry', icon: <Stethoscope className="h-4 w-4" />, color: 'pink', description: 'Oral health and dental care', entranceExams: ['NEET UG'], avgSalary: '₹5-25 LPA', growthRate: '+8%', jobRoles: ['Dentist', 'Orthodontist'], topColleges: ['Manipal', 'SRM'], skills: ['Dental Surgery'], duration: '5 years' },
      { id: 'pharmacy', name: 'B.Pharm - Pharmacy', icon: <BookOpen className="h-4 w-4" />, color: 'emerald', description: 'Drug development and pharmaceutical care', entranceExams: ['State Exams'], avgSalary: '₹3-12 LPA', growthRate: '+10%', jobRoles: ['Pharmacist', 'Drug Inspector'], topColleges: ['JSS', 'Manipal'], skills: ['Drug Formulation'], duration: '4 years' },
      { id: 'nursing', name: 'B.Sc Nursing', icon: <Stethoscope className="h-4 w-4" />, color: 'rose', description: 'Patient care and healthcare support', entranceExams: ['State Exams'], avgSalary: '₹3-10 LPA', growthRate: '+15%', jobRoles: ['Staff Nurse', 'ICU Nurse'], topColleges: ['CMC', 'NIMHANS'], skills: ['Patient Care'], duration: '4 years' },
    ]
  },
  {
    id: 'business',
    name: 'Business & Management',
    icon: <Briefcase className="h-5 w-5" />,
    color: 'emerald',
    description: 'Lead organizations and drive business growth',
    entranceExams: ['CAT', 'XAT', 'TANCET MBA', 'MAT'],
    avgSalary: '₹10-40 LPA',
    growthRate: '+12%',
    jobRoles: ['Manager', 'Consultant', 'Entrepreneur'],
    topColleges: ['IIM Ahmedabad', 'IIM Bangalore', 'XLRI'],
    skills: ['Leadership', 'Finance', 'Strategy'],
    duration: '2 years MBA',
    subPaths: [
      { id: 'mba', name: 'MBA', icon: <Briefcase className="h-4 w-4" />, color: 'emerald', description: 'Business administration and management', entranceExams: ['CAT', 'XAT'], avgSalary: '₹12-50 LPA', growthRate: '+15%', jobRoles: ['Manager', 'Consultant'], topColleges: ['IIM', 'XLRI'], skills: ['Leadership', 'Analytics'], duration: '2 years' },
      { id: 'bba', name: 'BBA', icon: <Briefcase className="h-4 w-4" />, color: 'teal', description: 'Undergraduate business studies', entranceExams: ['CUET', 'IPU CET'], avgSalary: '₹4-10 LPA', growthRate: '+10%', jobRoles: ['Executive', 'Analyst'], topColleges: ['Christ', 'NMIMS'], skills: ['Communication'], duration: '3 years' },
      { id: 'ca', name: 'CA - Chartered Accountant', icon: <DollarSign className="h-4 w-4" />, color: 'yellow', description: 'Accounting, taxation, and audit', entranceExams: ['CA Foundation'], avgSalary: '₹8-30 LPA', growthRate: '+8%', jobRoles: ['Auditor', 'Tax Consultant'], topColleges: ['ICAI'], skills: ['Accounting', 'Tax Laws'], duration: '4-5 years' },
    ]
  },
  {
    id: 'law',
    name: 'Law & Legal Services',
    icon: <Scale className="h-5 w-5" />,
    color: 'violet',
    description: 'Uphold justice and provide legal expertise',
    entranceExams: ['CLAT', 'AILET', 'LSAT'],
    avgSalary: '₹5-25 LPA',
    growthRate: '+8%',
    jobRoles: ['Advocate', 'Corporate Lawyer', 'Judge'],
    topColleges: ['NLS Bangalore', 'NALSAR', 'NLU Delhi'],
    skills: ['Legal Research', 'Argumentation', 'Writing'],
    duration: '5 years LLB',
    subPaths: [
      { id: 'ballb', name: 'BA LLB', icon: <Scale className="h-4 w-4" />, color: 'violet', description: 'Integrated law with arts', entranceExams: ['CLAT', 'AILET'], avgSalary: '₹5-30 LPA', growthRate: '+10%', jobRoles: ['Corporate Lawyer', 'Litigator'], topColleges: ['NLS', 'NALSAR'], skills: ['Legal Drafting'], duration: '5 years' },
      { id: 'llm', name: 'LLM', icon: <Scale className="h-4 w-4" />, color: 'purple', description: 'Specialization in law', entranceExams: ['CLAT PG'], avgSalary: '₹8-20 LPA', growthRate: '+8%', jobRoles: ['Legal Expert', 'Professor'], topColleges: ['NLU'], skills: ['Research'], duration: '1-2 years' },
    ]
  },
  {
    id: 'government',
    name: 'Government Services',
    icon: <Landmark className="h-5 w-5" />,
    color: 'amber',
    description: 'Serve the nation in administrative roles',
    entranceExams: ['UPSC CSE', 'SSC CGL', 'TNPSC', 'Banking'],
    avgSalary: '₹6-25 LPA',
    growthRate: '+5%',
    jobRoles: ['IAS Officer', 'IPS Officer', 'Bank PO'],
    topColleges: ['LBSNAA', 'Various Academies'],
    skills: ['Current Affairs', 'Administration', 'Ethics'],
    duration: 'Varies',
    subPaths: [
      { id: 'ias', name: 'Civil Services (IAS/IPS)', icon: <Landmark className="h-4 w-4" />, color: 'amber', description: 'Top administrative positions', entranceExams: ['UPSC CSE'], avgSalary: '₹10-30 LPA', growthRate: '+5%', jobRoles: ['IAS', 'IPS', 'IFS'], topColleges: ['LBSNAA'], skills: ['Admin', 'Ethics'], duration: '1-2 years prep' },
      { id: 'ssc', name: 'SSC (CGL/CHSL)', icon: <Briefcase className="h-4 w-4" />, color: 'orange', description: 'Central government jobs', entranceExams: ['SSC CGL', 'SSC CHSL'], avgSalary: '₹4-10 LPA', growthRate: '+6%', jobRoles: ['Inspector', 'Auditor'], topColleges: ['Self-prep'], skills: ['Quant', 'Reasoning'], duration: '6-12 months prep' },
      { id: 'banking', name: 'Banking (IBPS/SBI)', icon: <DollarSign className="h-4 w-4" />, color: 'green', description: 'Public sector bank jobs', entranceExams: ['IBPS PO', 'SBI PO'], avgSalary: '₹5-15 LPA', growthRate: '+8%', jobRoles: ['Bank PO', 'Clerk'], topColleges: ['Self-prep'], skills: ['Finance', 'Computer'], duration: '6-12 months prep' },
    ]
  },
  {
    id: 'design',
    name: 'Design & Creative Arts',
    icon: <Palette className="h-5 w-5" />,
    color: 'pink',
    description: 'Create visual experiences and artistic solutions',
    entranceExams: ['NID', 'NIFT', 'UCEED', 'CEED'],
    avgSalary: '₹5-20 LPA',
    growthRate: '+18%',
    jobRoles: ['UI/UX Designer', 'Fashion Designer', 'Animator'],
    topColleges: ['NID', 'NIFT', 'IDC IIT Bombay'],
    skills: ['Creativity', 'Visual Design', 'Software Tools'],
    duration: '4 years B.Des',
    subPaths: [
      { id: 'uiux', name: 'UI/UX Design', icon: <Palette className="h-4 w-4" />, color: 'pink', description: 'Digital product design', entranceExams: ['NID', 'UCEED'], avgSalary: '₹6-25 LPA', growthRate: '+25%', jobRoles: ['UI Designer', 'UX Researcher'], topColleges: ['NID', 'IDC'], skills: ['Figma', 'User Research'], duration: '4 years' },
      { id: 'fashion', name: 'Fashion Design', icon: <Palette className="h-4 w-4" />, color: 'rose', description: 'Apparel and textile design', entranceExams: ['NIFT'], avgSalary: '₹4-15 LPA', growthRate: '+10%', jobRoles: ['Fashion Designer'], topColleges: ['NIFT'], skills: ['Sketching', 'Textiles'], duration: '4 years' },
    ]
  },
];

const InteractiveCareerFlowchart: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);
  const [expandedPaths, setExpandedPaths] = useState<string[]>([]);

  const toggleExpand = (pathId: string) => {
    setExpandedPaths(prev => 
      prev.includes(pathId) 
        ? prev.filter(id => id !== pathId) 
        : [...prev, pathId]
    );
  };

  const getColorClasses = (color: string) => ({
    bg: `bg-${color}-100 dark:bg-${color}-900/30`,
    border: `border-${color}-300 dark:border-${color}-700`,
    text: `text-${color}-700 dark:text-${color}-300`,
    icon: `bg-${color}-500 text-white`,
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
                <Target className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-green-600 transition-colors">
                  Career Path Explorer
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Visualize and explore different career paths after 12th
                </p>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-medium">
                  <span>Explore Paths</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs">Engineering</Badge>
              <Badge variant="secondary" className="text-xs">Medical</Badge>
              <Badge variant="secondary" className="text-xs">Law</Badge>
              <Badge variant="secondary" className="text-xs">+3 more</Badge>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-500" />
            Interactive Career Path Explorer
          </DialogTitle>
        </DialogHeader>

        <div className="flex h-[70vh]">
          {/* Left Panel - Career Tree */}
          <ScrollArea className="w-1/2 border-r p-4">
            <div className="space-y-2">
              {CAREER_PATHS.map((path, index) => (
                <motion.div
                  key={path.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedPath?.id === path.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedPath(path)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-${path.color}-100 text-${path.color}-600`}>
                            {path.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm">{path.name}</h4>
                            <p className="text-xs text-muted-foreground">{path.description}</p>
                          </div>
                        </div>
                        {path.subPaths && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpand(path.id);
                            }}
                          >
                            {expandedPaths.includes(path.id) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                      </div>

                      {/* Sub-paths */}
                      <AnimatePresence>
                        {expandedPaths.includes(path.id) && path.subPaths && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-3 ml-8 space-y-2"
                          >
                            {path.subPaths.map((sub) => (
                              <div
                                key={sub.id}
                                className={`p-2 rounded-lg border cursor-pointer transition-all hover:bg-muted ${
                                  selectedPath?.id === sub.id ? 'ring-2 ring-primary bg-muted' : ''
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedPath(sub);
                                }}
                              >
                                <div className="flex items-center gap-2">
                                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                  <span className="font-medium text-sm">{sub.name}</span>
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </ScrollArea>

          {/* Right Panel - Details */}
          <ScrollArea className="w-1/2 p-4">
            {selectedPath ? (
              <motion.div
                key={selectedPath.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl bg-${selectedPath.color}-500 text-white`}>
                    {selectedPath.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedPath.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedPath.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Card>
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <span className="text-xs text-muted-foreground">Avg Salary</span>
                      </div>
                      <div className="font-bold">{selectedPath.avgSalary}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                        <span className="text-xs text-muted-foreground">Growth Rate</span>
                      </div>
                      <div className="font-bold text-green-600">{selectedPath.growthRate}</div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Entrance Exams
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2">
                      {selectedPath.entranceExams.map((exam) => (
                        <Badge key={exam} variant="secondary">{exam}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      Job Roles
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2">
                      {selectedPath.jobRoles.map((role) => (
                        <Badge key={role} variant="outline">{role}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Top Colleges
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-1">
                      {selectedPath.topColleges.map((college) => (
                        <li key={college} className="text-sm flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {college}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Key Skills Required
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2">
                      {selectedPath.skills.map((skill) => (
                        <Badge key={skill} className="bg-primary/10 text-primary">{skill}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted">
                  <CardContent className="p-3 flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">Duration</div>
                      <div className="font-medium">{selectedPath.duration}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Target className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Select a career path to view details</p>
                </div>
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InteractiveCareerFlowchart;
