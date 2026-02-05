 import { useState } from 'react';
 import { Button } from '@/components/ui/button';
 import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
 import { cn } from '@/lib/utils';
 import { StudentGroup, EligibleCourse, getGroupCategory, isEligibleForTNEA, isEligibleForMedical } from './types';
 import { CheckCircle2, AlertTriangle, XCircle, Star, MapPin, GraduationCap } from 'lucide-react';
 import { useNavigate } from 'react-router-dom';
 
 interface CollegeInfo {
   name: string;
   location: string;
   type: 'Government' | 'Aided' | 'Private' | 'Autonomous';
   rating?: string;
   fee?: string;
 }
 
 interface CourseColleges {
   [key: string]: CollegeInfo[];
 }
 
 // Government colleges data (focus on free/subsidized education)
 const collegeData: CourseColleges = {
   engineering: [
     { name: 'Anna University CEG', location: 'Chennai', type: 'Government', rating: 'NAAC A++', fee: '₹7,500/year' },
     { name: 'Anna University MIT', location: 'Chennai', type: 'Government', rating: 'NAAC A++', fee: '₹7,500/year' },
     { name: 'Anna University ACT', location: 'Chennai', type: 'Government', rating: 'NAAC A++', fee: '₹7,500/year' },
     { name: 'Coimbatore Institute of Technology', location: 'Coimbatore', type: 'Government', rating: 'NAAC A+', fee: '₹7,500/year' },
     { name: 'Govt. College of Engineering, Salem', location: 'Salem', type: 'Government', rating: 'NAAC A', fee: '₹7,500/year' },
     { name: 'Govt. College of Engineering, Tirunelveli', location: 'Tirunelveli', type: 'Government', rating: 'NAAC A', fee: '₹7,500/year' },
     { name: 'Govt. College of Technology', location: 'Coimbatore', type: 'Government', rating: 'NAAC A', fee: '₹7,500/year' },
     { name: 'Thanthai Periyar Govt. IT', location: 'Vellore', type: 'Government', rating: 'NAAC A', fee: '₹7,500/year' },
     { name: 'Alagappa Chettiar GCE', location: 'Karaikudi', type: 'Government', fee: '₹7,500/year' },
     { name: 'Govt. College of Engineering, Bargur', location: 'Bargur', type: 'Government', fee: '₹7,500/year' },
   ],
   medical: [
     { name: 'Madras Medical College', location: 'Chennai', type: 'Government', rating: 'Top Ranked', fee: '₹15,850/year' },
     { name: 'Stanley Medical College', location: 'Chennai', type: 'Government', rating: 'Top Ranked', fee: '₹15,850/year' },
     { name: 'Kilpauk Medical College', location: 'Chennai', type: 'Government', fee: '₹15,850/year' },
     { name: 'Govt. Medical College, Coimbatore', location: 'Coimbatore', type: 'Government', fee: '₹15,850/year' },
     { name: 'Govt. Medical College, Madurai', location: 'Madurai', type: 'Government', fee: '₹15,850/year' },
     { name: 'Govt. Medical College, Thanjavur', location: 'Thanjavur', type: 'Government', fee: '₹15,850/year' },
     { name: 'Govt. Medical College, Trichy', location: 'Trichy', type: 'Government', fee: '₹15,850/year' },
     { name: 'Govt. Medical College, Salem', location: 'Salem', type: 'Government', fee: '₹15,850/year' },
   ],
   nursing: [
     { name: 'Madras Medical College - Nursing', location: 'Chennai', type: 'Government', fee: '₹5,000/year' },
     { name: 'Govt. College of Nursing, Coimbatore', location: 'Coimbatore', type: 'Government', fee: '₹5,000/year' },
     { name: 'Govt. College of Nursing, Madurai', location: 'Madurai', type: 'Government', fee: '₹5,000/year' },
     { name: 'Govt. College of Nursing, Trichy', location: 'Trichy', type: 'Government', fee: '₹5,000/year' },
   ],
   arts_science: [
     { name: 'Presidency College', location: 'Chennai', type: 'Government', rating: 'NAAC A+', fee: '₹500/year' },
     { name: 'Queen Mary\'s College', location: 'Chennai', type: 'Government', rating: 'NAAC A', fee: '₹500/year' },
     { name: 'Govt. Arts College, Coimbatore', location: 'Coimbatore', type: 'Government', fee: '₹500/year' },
     { name: 'Govt. Arts College, Salem', location: 'Salem', type: 'Government', fee: '₹500/year' },
     { name: 'Govt. Arts College, Trichy', location: 'Trichy', type: 'Government', fee: '₹500/year' },
     { name: 'Govt. Arts College, Madurai', location: 'Madurai', type: 'Government', fee: '₹500/year' },
   ],
   agriculture: [
     { name: 'Tamil Nadu Agricultural University', location: 'Coimbatore', type: 'Government', rating: 'ICAR Accredited', fee: '₹7,000/year' },
     { name: 'AC&RI, Madurai', location: 'Madurai', type: 'Government', fee: '₹7,000/year' },
     { name: 'AC&RI, Trichy', location: 'Trichy', type: 'Government', fee: '₹7,000/year' },
   ],
   law: [
     { name: 'Dr. Ambedkar Govt. Law College', location: 'Chennai', type: 'Government', rating: 'BCI Approved', fee: '₹3,000/year' },
     { name: 'Madras Law College', location: 'Chennai', type: 'Government', fee: '₹3,000/year' },
     { name: 'Govt. Law College, Madurai', location: 'Madurai', type: 'Government', fee: '₹3,000/year' },
     { name: 'Govt. Law College, Coimbatore', location: 'Coimbatore', type: 'Government', fee: '₹3,000/year' },
   ],
   polytechnic: [
     { name: 'Govt. Polytechnic College, Chennai', location: 'Chennai', type: 'Government', fee: '₹2,000/year' },
     { name: 'Central Polytechnic, Chennai', location: 'Chennai', type: 'Government', fee: '₹2,000/year' },
     { name: 'Govt. Polytechnic, Coimbatore', location: 'Coimbatore', type: 'Government', fee: '₹2,000/year' },
     { name: 'Govt. Polytechnic, Salem', location: 'Salem', type: 'Government', fee: '₹2,000/year' },
     { name: 'Govt. Polytechnic, Madurai', location: 'Madurai', type: 'Government', fee: '₹2,000/year' },
   ],
 };
 
 interface EligibleCoursesProps {
   group: StudentGroup;
   cutoffScore: number;
   percentage: number;
   neetScore?: number;
 }
 
 const getCoursesByGroup = (group: StudentGroup, cutoff: number, percentage: number, neet?: number): EligibleCourse[] => {
   const category = getGroupCategory(group);
   const canDoTNEA = isEligibleForTNEA(group);
   const canDoMedical = isEligibleForMedical(group);
   
   const courses: EligibleCourse[] = [];
 
   // Engineering courses for science_maths groups
   if (canDoTNEA) {
     courses.push(
       { id: 'engineering', name: 'ENGINEERING', fullName: 'B.E / B.Tech via TNEA', icon: '⚙️', collegeCount: 25, eligibilityStatus: cutoff >= 100 ? 'eligible' : cutoff >= 80 ? 'borderline' : 'not_eligible', cutoffRequired: 100, userCutoff: cutoff, note: 'Government Quota Seats' },
       { id: 'architecture', name: 'ARCHITECTURE', fullName: 'B.Arch via NATA', icon: '📐', collegeCount: 5, eligibilityStatus: 'eligible', entranceExam: 'NATA Required' },
     );
   }
 
   // Medical courses for bio groups
   if (canDoMedical) {
     courses.push(
       { id: 'mbbs', name: 'MBBS', fullName: 'Government Medical Colleges', icon: '🏥', collegeCount: 23, eligibilityStatus: neet && neet >= 500 ? 'eligible' : neet && neet >= 400 ? 'borderline' : 'not_eligible', entranceExam: 'NEET Required', note: neet ? `Your NEET: ${neet}` : 'Enter NEET Score' },
       { id: 'bds', name: 'BDS (DENTAL)', fullName: 'Government Dental Colleges', icon: '🦷', collegeCount: 8, eligibilityStatus: neet && neet >= 450 ? 'eligible' : 'borderline', entranceExam: 'NEET Required' },
       { id: 'nursing', name: 'B.Sc NURSING', fullName: 'Government Nursing Colleges', icon: '🩺', collegeCount: 20, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
       { id: 'pharmacy', name: 'B.PHARM', fullName: 'Government Pharmacy Colleges', icon: '💊', collegeCount: 8, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
       { id: 'physiotherapy', name: 'PHYSIOTHERAPY', fullName: 'BPT - Government Colleges', icon: '🏃', collegeCount: 5, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
       { id: 'agriculture', name: 'B.Sc AGRICULTURE', fullName: 'TNAU Government Colleges', icon: '🌾', collegeCount: 15, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
       { id: 'veterinary', name: 'VETERINARY (BVSc)', fullName: 'TANUVAS Government Colleges', icon: '🐾', collegeCount: 5, eligibilityStatus: 'borderline', entranceExam: 'NEET Required' },
     );
   }
 
   // Arts & Science courses for all groups
   courses.push(
     { id: 'bsc', name: 'B.Sc', fullName: 'Government Arts & Science Colleges', icon: '🔬', collegeCount: 100, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
     { id: 'ba', name: 'BA', fullName: 'Government Arts Colleges', icon: '📚', collegeCount: 100, eligibilityStatus: percentage >= 45 ? 'eligible' : 'not_eligible' },
   );
 
   // Commerce courses
   if (category === 'commerce') {
     courses.push(
       { id: 'bcom', name: 'B.COM', fullName: 'Government Commerce Colleges', icon: '💼', collegeCount: 80, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
       { id: 'bba', name: 'BBA', fullName: 'Government/Aided Colleges', icon: '👔', collegeCount: 40, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
       { id: 'ca', name: 'CA / CS / CMA', fullName: 'Professional Courses (Self-Study)', icon: '📜', collegeCount: 0, eligibilityStatus: 'eligible', entranceExam: 'Entrance Exams' },
     );
   }
 
   // Law for Arts & Commerce
   if (category === 'arts' || category === 'commerce') {
     courses.push(
       { id: 'law', name: 'LLB (LAW)', fullName: 'Government Law Colleges', icon: '⚖️', collegeCount: 10, eligibilityStatus: percentage >= 45 ? 'eligible' : 'not_eligible', entranceExam: 'TNDALU Entrance' },
       { id: 'bed', name: 'B.Ed', fullName: 'Government Teacher Training', icon: '🎓', collegeCount: 50, eligibilityStatus: 'eligible', note: 'After UG Degree' },
     );
   }
 
   // Polytechnic for all
   courses.push(
     { id: 'polytechnic', name: 'POLYTECHNIC', fullName: 'Government Polytechnic Colleges', icon: '🛠️', collegeCount: 100, eligibilityStatus: 'eligible', note: 'Diploma Courses' },
   );
 
   return courses;
 };
 
 export const EligibleCourses = ({ group, cutoffScore, percentage, neetScore }: EligibleCoursesProps) => {
   const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
   const navigate = useNavigate();
   const category = getGroupCategory(group);
 
   const courses = getCoursesByGroup(group, cutoffScore, percentage, neetScore);
   const eligibleCourses = courses.filter(c => c.eligibilityStatus === 'eligible');
   const borderlineCourses = courses.filter(c => c.eligibilityStatus === 'borderline');
   const notEligible = courses.filter(c => c.eligibilityStatus === 'not_eligible');
 
   const getStatusIcon = (status: EligibleCourse['eligibilityStatus']) => {
     switch (status) {
       case 'eligible': return <CheckCircle2 className="h-5 w-5 text-green-500" />;
       case 'borderline': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
       case 'not_eligible': return <XCircle className="h-5 w-5 text-red-400" />;
     }
   };
 
   const getStatusBg = (status: EligibleCourse['eligibilityStatus']) => {
     switch (status) {
       case 'eligible': return 'bg-green-50 border-green-200 hover:bg-green-100';
       case 'borderline': return 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100';
       case 'not_eligible': return 'bg-red-50 border-red-200 opacity-60';
     }
   };
 
   const selectedCourseData = courses.find(c => c.id === selectedCourse);
   const collegesForCourse = selectedCourse ? collegeData[selectedCourse] || collegeData.arts_science : [];
 
   return (
     <div className="bg-white rounded-xl shadow-sm border p-6 animate-fade-in">
       <div className="mb-6">
         <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
           🎓 Eligible Courses (Government Colleges - Free/Subsidized)
         </h3>
         <p className="text-sm text-gray-500 mt-1">
           அரசு கல்லூரிகள் - இலவச/மானிய கல்வி • Group {group}
         </p>
       </div>
 
       {/* Eligible Courses */}
       {eligibleCourses.length > 0 && (
         <div className="mb-6">
           <h4 className="text-sm font-semibold text-green-700 mb-3 flex items-center gap-2">
             ✅ ELIGIBLE ({eligibleCourses.length} courses)
           </h4>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
             {eligibleCourses.map(course => (
               <button
                 key={course.id}
                 onClick={() => setSelectedCourse(course.id)}
                 className={cn(
                   'p-4 rounded-xl border-2 text-left transition-all',
                   getStatusBg(course.eligibilityStatus)
                 )}
               >
                 <div className="flex items-start gap-3">
                   <span className="text-2xl">{course.icon}</span>
                   <div className="flex-1 min-w-0">
                     <div className="flex items-center justify-between">
                       <h5 className="font-semibold text-sm">{course.name}</h5>
                       {getStatusIcon(course.eligibilityStatus)}
                     </div>
                     <p className="text-xs text-gray-600 mt-1">{course.fullName}</p>
                     {course.collegeCount > 0 && (
                       <p className="text-xs text-green-600 mt-1">
                         {course.collegeCount} Govt. Colleges
                       </p>
                     )}
                     {course.entranceExam && (
                       <span className="inline-block text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded mt-1">
                         {course.entranceExam}
                       </span>
                     )}
                   </div>
                 </div>
               </button>
             ))}
           </div>
         </div>
       )}
 
       {/* Borderline Courses */}
       {borderlineCourses.length > 0 && (
         <div className="mb-6">
           <h4 className="text-sm font-semibold text-yellow-700 mb-3 flex items-center gap-2">
             ⚠️ BORDERLINE ({borderlineCourses.length} courses)
           </h4>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
             {borderlineCourses.map(course => (
               <button
                 key={course.id}
                 onClick={() => setSelectedCourse(course.id)}
                 className={cn(
                   'p-4 rounded-xl border-2 text-left transition-all',
                   getStatusBg(course.eligibilityStatus)
                 )}
               >
                 <div className="flex items-start gap-3">
                   <span className="text-2xl">{course.icon}</span>
                   <div className="flex-1 min-w-0">
                     <div className="flex items-center justify-between">
                       <h5 className="font-semibold text-sm">{course.name}</h5>
                       {getStatusIcon(course.eligibilityStatus)}
                     </div>
                     <p className="text-xs text-gray-600 mt-1">{course.fullName}</p>
                     {course.note && (
                       <p className="text-xs text-yellow-600 mt-1">{course.note}</p>
                     )}
                   </div>
                 </div>
               </button>
             ))}
           </div>
         </div>
       )}
 
       {/* Not Eligible Courses */}
       {notEligible.length > 0 && (
         <div>
           <h4 className="text-sm font-semibold text-red-600 mb-3 flex items-center gap-2">
             ❌ NOT ELIGIBLE ({notEligible.length} courses)
           </h4>
           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
             {notEligible.map(course => (
               <div
                 key={course.id}
                 className={cn(
                   'p-3 rounded-lg border text-left',
                   getStatusBg(course.eligibilityStatus)
                 )}
               >
                 <div className="flex items-center gap-2">
                   <span>{course.icon}</span>
                   <span className="text-xs font-medium text-gray-500">{course.name}</span>
                 </div>
               </div>
             ))}
           </div>
         </div>
       )}
 
       {/* College Dialog */}
       <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
         <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
           <DialogHeader>
             <DialogTitle className="flex items-center gap-3">
               <span className="text-2xl">{selectedCourseData?.icon}</span>
               {selectedCourseData?.name} - Government Colleges
             </DialogTitle>
           </DialogHeader>
 
           <div className="p-2 bg-green-50 rounded-lg border border-green-200 mb-4">
             <p className="text-sm text-green-800">
               🎓 <strong>FREE EDUCATION:</strong> These government colleges offer free/subsidized education through counseling.
             </p>
           </div>
 
           <div className="space-y-3">
             {collegesForCourse.map((college, idx) => (
               <div key={idx} className="p-4 bg-gray-50 rounded-xl border">
                 <div className="flex items-start justify-between">
                   <div>
                     <h4 className="font-semibold text-gray-900">{college.name}</h4>
                     <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                       <MapPin className="h-4 w-4" />
                       {college.location}
                     </div>
                   </div>
                   <div className="text-right">
                     <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-700 rounded font-medium">
                       {college.type}
                     </span>
                     {college.rating && (
                       <div className="flex items-center gap-1 mt-1 text-xs text-yellow-600">
                         <Star className="h-3 w-3 fill-current" />
                         {college.rating}
                       </div>
                     )}
                   </div>
                 </div>
                 {college.fee && (
                   <div className="mt-2 pt-2 border-t flex items-center gap-2">
                     <GraduationCap className="h-4 w-4 text-green-600" />
                     <span className="text-sm font-semibold text-green-700">{college.fee}</span>
                     <span className="text-xs text-gray-500">(Government Quota)</span>
                   </div>
                 )}
               </div>
             ))}
           </div>
 
           <div className="mt-4 flex gap-3">
             <Button
               onClick={() => navigate('/counselling-simulator')}
               className="flex-1 bg-fresh-green-medium hover:bg-fresh-green-dark"
             >
               Try Counselling Simulator
             </Button>
             <Button
               variant="outline"
               onClick={() => setSelectedCourse(null)}
             >
               Close
             </Button>
           </div>
         </DialogContent>
       </Dialog>
     </div>
   );
 };