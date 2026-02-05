 import { useState, useEffect } from 'react';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import { cn } from '@/lib/utils';
 import { StudentGroup, getGroupCategory } from './types';
 import { groupCategories } from './GroupSelector';
 import { CheckCircle2, AlertCircle } from 'lucide-react';
 
 interface MarksEntryFormProps {
   group: StudentGroup;
   onMarksChange: (marks: Record<string, number | null>) => void;
 }
 
 // Get subjects for a specific group code
 const getSubjectsForGroup = (groupCode: StudentGroup): { subject: string; icon: string }[] => {
   for (const cat of groupCategories) {
     const group = cat.groups.find(g => g.id === groupCode);
     if (group) {
       return group.subjects.map(subj => ({
         subject: subj,
         icon: getSubjectIcon(subj)
       }));
     }
   }
   return [];
 };
 
 const getSubjectIcon = (subject: string): string => {
   const icons: Record<string, string> = {
     'Physics': '📗',
     'Chemistry': '📕',
     'Mathematics': '📘',
     'Biology': '🧬',
     'Statistics': '📊',
     'Computer Science': '💻',
     'Bio-Chemistry': '🧪',
     'Micro-Biology': '🦠',
     'Nursing': '🩺',
     'Nutrition & Dietetics': '🥗',
     'English for Communication': '📝',
     'Home Science': '🏠',
     'Botany': '🌿',
     'Zoology': '🦎',
     'Economics': '📈',
     'Commerce': '💼',
     'Accountancy': '🧮',
     'History': '📜',
     'Geography': '🌍',
     'Political Science': '🏛️',
     'Ethics & Indian Culture': '🕉️',
     'Advanced Language': '📖',
     'Business Maths': '🔢',
   };
   return icons[subject] || '📚';
 };
 
 const getEligibleCoursesText = (groupCode: StudentGroup): string => {
   const category = getGroupCategory(groupCode);
   
   switch (category) {
     case 'science_maths':
       if (groupCode === '103' || groupCode === '104') {
         return 'Engineering (B.E/B.Tech) + Medical Courses (MBBS/BDS with NEET), B.Sc, BCA, B.Arch, NDA, Merchant Navy';
       }
       return 'Engineering (B.E/B.Tech), B.Sc Physics/Chemistry/Maths, BCA, B.Arch, Pilot Training, NDA, Merchant Navy';
     case 'science_bio':
       return 'MBBS, BDS, BAMS, BHMS, B.Pharm, B.Sc Nursing, Physiotherapy, MLT, B.Sc Agriculture, Veterinary, Biotechnology';
     case 'commerce':
       return 'B.Com, BBA, BCA, CA Foundation, CS, CMA, Banking, B.Sc Statistics, Economics Honours, Hotel Management';
     case 'arts':
       return 'BA (All Subjects), BSW, B.Ed, LLB, Journalism, Mass Communication, Public Administration, Library Science, Tourism';
     default:
       return '';
   }
 };
 
 export const MarksEntryForm = ({ group, onMarksChange }: MarksEntryFormProps) => {
   const [marks, setMarks] = useState<Record<string, number | null>>({});
   const [neetScore, setNeetScore] = useState<number | null>(null);

 
   const subjects = getSubjectsForGroup(group);
   const category = getGroupCategory(group);
 
   useEffect(() => {
     setMarks({});
     setNeetScore(null);
   }, [group]);
 
   useEffect(() => {
     const allMarks: Record<string, number | null> = {
       ...marks,
     };
     if (neetScore !== null) {
       allMarks.neet = neetScore;
     }
     onMarksChange(allMarks);
  }, [marks, neetScore, onMarksChange]);
 
   const handleMarkChange = (subject: string, value: string) => {
     const numValue = value === '' ? null : Math.min(100, Math.max(0, parseInt(value) || 0));
     setMarks(prev => ({ ...prev, [subject]: numValue }));
   };
 
   const isValidMark = (value: number | null) => value !== null && value >= 0 && value <= 100;
 
   const showNEET = category === 'science_bio' || group === '103' || group === '104';
   const showTNEA = category === 'science_maths';
 
   const renderInput = (
     label: string,
     icon: string,
     value: number | null,
     onChange: (value: string) => void,
     maxMarks: number = 100
   ) => (
     <div className="space-y-2">
       <Label className="text-sm font-medium flex items-center gap-2">
         <span>{icon}</span> {label}
       </Label>
       <div className="relative">
         <Input
           type="number"
           min={0}
           max={maxMarks}
           placeholder={`/${maxMarks}`}
           value={value ?? ''}
           onChange={(e) => onChange(e.target.value)}
           className={cn(
             'text-lg font-semibold pr-10',
             value !== null && (isValidMark(value) ? 'border-green-500' : 'border-red-500')
           )}
         />
         {value !== null && (
           <div className="absolute right-3 top-1/2 -translate-y-1/2">
             {isValidMark(value) ? (
               <CheckCircle2 className="h-5 w-5 text-green-500" />
             ) : (
               <AlertCircle className="h-5 w-5 text-red-500" />
             )}
           </div>
         )}
       </div>
     </div>
   );
 
   const getCategoryColor = () => {
     switch (category) {
       case 'science_maths': return { bg: 'bg-blue-50', text: 'text-blue-800' };
       case 'science_bio': return { bg: 'bg-green-50', text: 'text-green-800' };
       case 'commerce': return { bg: 'bg-orange-50', text: 'text-orange-800' };
       case 'arts': return { bg: 'bg-pink-50', text: 'text-pink-800' };
       default: return { bg: 'bg-gray-50', text: 'text-gray-800' };
     }
   };
 
   const colors = getCategoryColor();
 
   return (
     <div className="bg-white rounded-xl shadow-sm border p-6 animate-fade-in">
       <div className="mb-4">
         <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
           📝 Step 2: Enter Your 12th Marks (Group {group})
         </h3>
         <p className="text-sm text-gray-500 mt-1">
           உங்கள் 12-ஆம் வகுப்பு மதிப்பெண்களை உள்ளிடவும்
         </p>
       </div>
 
       <div className="space-y-6">
         {/* Part III - Core Subjects */}
         <div>
           <Label className="text-sm font-medium text-gray-700 mb-3 block">PART III - CORE SUBJECTS (4 × 100 = 400 marks)</Label>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
             {subjects.map((subj) => (
               <div key={subj.subject}>
                 {renderInput(
                   subj.subject,
                   subj.icon,
                   marks[subj.subject] ?? null,
                   (v) => handleMarkChange(subj.subject, v)
                 )}
               </div>
             ))}
           </div>
         </div>
 
         {/* NEET Score for Bio groups */}
         {showNEET && (
           <div>
             <Label className="text-sm font-medium text-gray-500 mb-3 block">
               NEET SCORE (For Medical/Dental/AYUSH Admissions)
             </Label>
             <div className="max-w-xs">
               <div className="space-y-2">
                 <Label className="text-sm font-medium flex items-center gap-2">
                   <span>🏥</span> NEET Score (If appeared)
                 </Label>
                 <Input
                   type="number"
                   min={0}
                   max={720}
                   placeholder="/720"
                   value={neetScore ?? ''}
                   onChange={(e) => {
                     const val = e.target.value === '' ? null : Math.min(720, Math.max(0, parseInt(e.target.value) || 0));
                     setNeetScore(val);
                   }}
                   className="text-lg font-semibold"
                 />
               </div>
             </div>
           </div>
         )}
 
         {/* TNEA Info for Maths groups */}
         {showTNEA && (
           <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
             <p className="text-sm text-blue-800">
               <strong>📐 TNEA Cutoff Formula:</strong> Maths + (Physics/2) + (Chemistry/2) = Max 200
             </p>
           </div>
         )}
       </div>
 
       <div className={cn('mt-6 p-4 rounded-lg', colors.bg)}>
         <p className={cn('text-sm', colors.text)}>
           <strong>ELIGIBLE COURSES:</strong> {getEligibleCoursesText(group)}
         </p>
       </div>
     </div>
   );
 };