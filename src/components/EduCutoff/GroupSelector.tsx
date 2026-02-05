 import { useState } from 'react';
 import { cn } from '@/lib/utils';
 import { GroupInfo, StudentGroup, GroupCategory } from './types';
 import { ChevronDown, ChevronUp } from 'lucide-react';
 
 interface GroupSelectorProps {
   selectedGroup: StudentGroup | null;
   onSelectGroup: (group: StudentGroup) => void;
 }
 
 // Official TN State Board 12th Group Data
 const groupCategories: { category: GroupCategory; title: string; titleTamil: string; icon: string; series: string; careers: string[]; color: string; bgColor: string; groups: GroupInfo[] }[] = [
   {
     category: 'science_maths',
     title: 'SCIENCE - Maths Based',
     titleTamil: 'அறிவியல் - கணிதம்',
     icon: '🔬',
     series: '100 Series',
     careers: ['Engineering', 'B.Tech', 'B.Sc', 'B.Arch', 'NDA', 'Merchant Navy'],
     color: 'border-blue-500 text-blue-600',
     bgColor: 'bg-blue-50 hover:bg-blue-100',
     groups: [
       { id: '101', code: '101', name: 'Group 101', category: 'science_maths', icon: '📊', subjects: ['Physics', 'Chemistry', 'Statistics', 'Mathematics'], careers: ['Engineering', 'Data Science'], color: 'text-blue-600', bgColor: 'bg-blue-50' },
       { id: '102', code: '102', name: 'Group 102', category: 'science_maths', icon: '💻', subjects: ['Physics', 'Chemistry', 'Computer Science', 'Mathematics'], careers: ['Engineering', 'IT'], color: 'text-blue-600', bgColor: 'bg-blue-50' },
       { id: '103', code: '103', name: 'Group 103', category: 'science_maths', icon: '🧬', subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics'], careers: ['Engineering + Medical'], color: 'text-purple-600', bgColor: 'bg-purple-50' },
       { id: '104', code: '104', name: 'Group 104', category: 'science_maths', icon: '🧪', subjects: ['Physics', 'Chemistry', 'Bio-Chemistry', 'Mathematics'], careers: ['Biotech', 'Research'], color: 'text-blue-600', bgColor: 'bg-blue-50' },
       { id: '105', code: '105', name: 'Group 105', category: 'science_maths', icon: '📝', subjects: ['Physics', 'Chemistry', 'English for Communication', 'Mathematics'], careers: ['Engineering', 'Teaching'], color: 'text-blue-600', bgColor: 'bg-blue-50' },
       { id: '106', code: '106', name: 'Group 106', category: 'science_maths', icon: '🏠', subjects: ['Physics', 'Chemistry', 'Mathematics', 'Home Science'], careers: ['Engineering', 'Home Science'], color: 'text-blue-600', bgColor: 'bg-blue-50' },
     ]
   },
   {
     category: 'science_bio',
     title: 'SCIENCE - Biology Based',
     titleTamil: 'அறிவியல் - உயிரியல்',
     icon: '🧬',
     series: '200 Series',
     careers: ['MBBS', 'BDS', 'BAMS', 'BHMS', 'B.Pharm', 'Nursing', 'Veterinary', 'Agriculture'],
     color: 'border-green-500 text-green-600',
     bgColor: 'bg-green-50 hover:bg-green-100',
     groups: [
       { id: '201', code: '201', name: 'Group 201', category: 'science_bio', icon: '💻', subjects: ['Physics', 'Chemistry', 'Biology', 'Computer Science'], careers: ['Medical', 'Biotech IT'], color: 'text-green-600', bgColor: 'bg-green-50' },
       { id: '202', code: '202', name: 'Group 202', category: 'science_bio', icon: '🦠', subjects: ['Physics', 'Chemistry', 'Biology', 'Micro-Biology'], careers: ['Medical', 'Research'], color: 'text-green-600', bgColor: 'bg-green-50' },
       { id: '203', code: '203', name: 'Group 203', category: 'science_bio', icon: '🧪', subjects: ['Physics', 'Chemistry', 'Biology', 'Bio-Chemistry'], careers: ['Medical', 'Pharmacy'], color: 'text-green-600', bgColor: 'bg-green-50' },
       { id: '204', code: '204', name: 'Group 204', category: 'science_bio', icon: '🩺', subjects: ['Physics', 'Chemistry', 'Biology', 'Nursing'], careers: ['Nursing', 'Healthcare'], color: 'text-green-600', bgColor: 'bg-green-50' },
       { id: '205', code: '205', name: 'Group 205', category: 'science_bio', icon: '🥗', subjects: ['Physics', 'Chemistry', 'Biology', 'Nutrition & Dietetics'], careers: ['Nutrition', 'Healthcare'], color: 'text-green-600', bgColor: 'bg-green-50' },
       { id: '206', code: '206', name: 'Group 206', category: 'science_bio', icon: '📝', subjects: ['Physics', 'Chemistry', 'Biology', 'English for Communication'], careers: ['Medical', 'Teaching'], color: 'text-green-600', bgColor: 'bg-green-50' },
       { id: '207', code: '207', name: 'Group 207', category: 'science_bio', icon: '🏠', subjects: ['Physics', 'Chemistry', 'Biology', 'Home Science'], careers: ['Medical', 'Home Science'], color: 'text-green-600', bgColor: 'bg-green-50' },
       { id: '208', code: '208', name: 'Group 208', category: 'science_bio', icon: '🌿', subjects: ['Physics', 'Chemistry', 'Botany', 'Zoology'], careers: ['Research', 'Agriculture'], color: 'text-green-600', bgColor: 'bg-green-50' },
     ]
   },
   {
     category: 'commerce',
     title: 'COMMERCE',
     titleTamil: 'வணிகவியல்',
     icon: '💼',
     series: '300 Series',
     careers: ['B.Com', 'BBA', 'CA', 'CS', 'CMA', 'MBA', 'Banking', 'Insurance', 'Law'],
     color: 'border-orange-500 text-orange-600',
     bgColor: 'bg-orange-50 hover:bg-orange-100',
     groups: [
       { id: '301', code: '301', name: 'Group 301', category: 'commerce', icon: '📊', subjects: ['Statistics', 'Economics', 'Commerce', 'Accountancy'], careers: ['Finance', 'Analytics'], color: 'text-orange-600', bgColor: 'bg-orange-50' },
       { id: '302', code: '302', name: 'Group 302', category: 'commerce', icon: '💻', subjects: ['Computer Science', 'Economics', 'Commerce', 'Accountancy'], careers: ['IT', 'Business'], color: 'text-orange-600', bgColor: 'bg-orange-50' },
       { id: '303', code: '303', name: 'Group 303', category: 'commerce', icon: '📝', subjects: ['English for Communication', 'Economics', 'Commerce', 'Accountancy'], careers: ['Business', 'Communication'], color: 'text-orange-600', bgColor: 'bg-orange-50' },
       { id: '304', code: '304', name: 'Group 304', category: 'commerce', icon: '📜', subjects: ['History', 'Economics', 'Commerce', 'Accountancy'], careers: ['Civil Services', 'Business'], color: 'text-orange-600', bgColor: 'bg-orange-50' },
       { id: '305', code: '305', name: 'Group 305', category: 'commerce', icon: '🏛️', subjects: ['Economics', 'Political Science', 'Commerce', 'Accountancy'], careers: ['Law', 'Civil Services'], color: 'text-orange-600', bgColor: 'bg-orange-50' },
       { id: '306', code: '306', name: 'Group 306', category: 'commerce', icon: '🕉️', subjects: ['Economics', 'Commerce', 'Accountancy', 'Ethics & Indian Culture'], careers: ['Business', 'Teaching'], color: 'text-orange-600', bgColor: 'bg-orange-50' },
       { id: '307', code: '307', name: 'Group 307', category: 'commerce', icon: '📖', subjects: ['Economics', 'Commerce', 'Accountancy', 'Advanced Language'], careers: ['Business', 'Literature'], color: 'text-orange-600', bgColor: 'bg-orange-50' },
       { id: '308', code: '308', name: 'Group 308', category: 'commerce', icon: '🔢', subjects: ['Economics', 'Commerce', 'Accountancy', 'Business Maths'], careers: ['Finance', 'Banking'], color: 'text-orange-600', bgColor: 'bg-orange-50' },
     ]
   },
   {
     category: 'arts',
     title: 'ARTS / HUMANITIES',
     titleTamil: 'கலை / மனிதநேயம்',
     icon: '📚',
     series: '400 Series',
     careers: ['BA', 'Law (LLB)', 'Civil Services (UPSC/TNPSC)', 'Journalism', 'B.Ed', 'Social Work'],
     color: 'border-pink-500 text-pink-600',
     bgColor: 'bg-pink-50 hover:bg-pink-100',
     groups: [
       { id: '401', code: '401', name: 'Group 401', category: 'arts', icon: '📊', subjects: ['Statistics', 'Geography', 'History', 'Economics'], careers: ['Civil Services', 'Research'], color: 'text-pink-600', bgColor: 'bg-pink-50' },
       { id: '402', code: '402', name: 'Group 402', category: 'arts', icon: '💻', subjects: ['Computer Science', 'Geography', 'History', 'Economics'], careers: ['IT', 'Civil Services'], color: 'text-pink-600', bgColor: 'bg-pink-50' },
       { id: '403', code: '403', name: 'Group 403', category: 'arts', icon: '📝', subjects: ['Geography', 'English for Communication', 'History', 'Economics'], careers: ['Journalism', 'Teaching'], color: 'text-pink-600', bgColor: 'bg-pink-50' },
       { id: '404', code: '404', name: 'Group 404', category: 'arts', icon: '🏛️', subjects: ['Geography', 'History', 'Economics', 'Political Science'], careers: ['Law', 'Civil Services'], color: 'text-pink-600', bgColor: 'bg-pink-50' },
       { id: '405', code: '405', name: 'Group 405', category: 'arts', icon: '🕉️', subjects: ['Geography', 'History', 'Economics', 'Ethics & Indian Culture'], careers: ['Civil Services', 'Teaching'], color: 'text-pink-600', bgColor: 'bg-pink-50' },
       { id: '406', code: '406', name: 'Group 406', category: 'arts', icon: '📖', subjects: ['Geography', 'History', 'Economics', 'Advanced Language'], careers: ['Literature', 'Teaching'], color: 'text-pink-600', bgColor: 'bg-pink-50' },
     ]
   }
 ];
 
 export const GroupSelector = ({ selectedGroup, onSelectGroup }: GroupSelectorProps) => {
   const [expandedCategory, setExpandedCategory] = useState<GroupCategory | null>(null);
 
   const getSelectedGroupInfo = () => {
     for (const cat of groupCategories) {
       const found = cat.groups.find(g => g.id === selectedGroup);
       if (found) return { group: found, category: cat };
     }
     return null;
   };
 
   const selectedInfo = getSelectedGroupInfo();
 
   return (
     <div className="bg-white rounded-xl shadow-sm border p-6">
       <div className="mb-4">
         <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
           📚 Step 1: Select Your 12th Group Code
         </h3>
         <p className="text-sm text-gray-500 mt-1">
           உங்கள் 12-ஆம் வகுப்பு குழு எண்ணைத் தேர்ந்தெடுக்கவும்
         </p>
       </div>
 
       {/* Category Cards */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
         {groupCategories.map((cat) => {
           const isExpanded = expandedCategory === cat.category;
           const hasSelectedGroup = cat.groups.some(g => g.id === selectedGroup);
 
           return (
             <div key={cat.category} className="border rounded-xl overflow-hidden">
               {/* Category Header */}
               <button
                 onClick={() => setExpandedCategory(isExpanded ? null : cat.category)}
                 className={cn(
                   'w-full p-4 text-left transition-all duration-200 flex items-center justify-between',
                   hasSelectedGroup ? `${cat.bgColor} ${cat.color}` : 'hover:bg-gray-50'
                 )}
               >
                 <div className="flex items-center gap-3">
                   <span className="text-2xl">{cat.icon}</span>
                   <div>
                     <h4 className="font-semibold text-sm">{cat.title}</h4>
                     <p className="text-xs text-gray-500">{cat.titleTamil} • {cat.series}</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-2">
                   {hasSelectedGroup && (
                     <span className="text-xs bg-white/80 px-2 py-1 rounded font-medium">
                       {selectedGroup}
                     </span>
                   )}
                   {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                 </div>
               </button>
 
               {/* Expanded Groups */}
               {isExpanded && (
                 <div className="p-3 bg-gray-50 border-t">
                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                     {cat.groups.map((group) => {
                       const isSelected = selectedGroup === group.id;
                       return (
                         <button
                           key={group.id}
                           onClick={() => onSelectGroup(group.id)}
                           className={cn(
                             'p-3 rounded-lg border text-left transition-all text-sm',
                             isSelected
                               ? 'bg-white border-2 border-current shadow-sm ' + cat.color
                               : 'bg-white border-gray-200 hover:border-gray-300'
                           )}
                         >
                           <div className="flex items-center gap-2 mb-1">
                             <span className="font-bold">{group.code}</span>
                             {isSelected && <span className="text-green-500">✓</span>}
                           </div>
                           <p className="text-[10px] text-gray-500 line-clamp-2">
                             {group.subjects.slice(2).join(', ')}
                           </p>
                         </button>
                       );
                     })}
                   </div>
                   <div className="mt-3 p-2 bg-white rounded border">
                     <p className="text-xs text-gray-600">
                       <strong>Career Paths:</strong> {cat.careers.slice(0, 4).join(', ')}...
                     </p>
                   </div>
                 </div>
               )}
             </div>
           );
         })}
       </div>
 
       {/* Selected Group Info */}
       {selectedInfo && (
         <div className={cn('mt-4 p-4 rounded-xl border-2', selectedInfo.category.color, selectedInfo.category.bgColor)}>
           <div className="flex items-start gap-3">
             <span className="text-3xl">{selectedInfo.group.icon}</span>
             <div className="flex-1">
               <h4 className="font-bold text-lg">Group {selectedInfo.group.code} Selected</h4>
               <p className="text-sm mt-1">
                 <strong>Subjects:</strong> {selectedInfo.group.subjects.join(' + ')}
               </p>
               <p className="text-sm text-gray-600 mt-1">
                 <strong>Common:</strong> Tamil/Hindi + English (Compulsory)
               </p>
               <div className="mt-2 flex flex-wrap gap-1">
                 {selectedInfo.category.careers.slice(0, 5).map((career, idx) => (
                   <span key={idx} className="text-xs px-2 py-1 bg-white/80 rounded">
                     → {career}
                   </span>
                 ))}
               </div>
             </div>
           </div>
         </div>
       )}
 
       {/* Marks Structure Info */}
       <div className="mt-4 p-3 bg-gray-50 rounded-lg">
         <p className="text-xs text-gray-600">
           <strong>📊 Total Marks:</strong> Part I (100) + Part II English (100) + Part III 4 Subjects (400) = <strong>600 Marks</strong> | Pass: 35% per subject
         </p>
       </div>
     </div>
   );
 };
 
 export { groupCategories };