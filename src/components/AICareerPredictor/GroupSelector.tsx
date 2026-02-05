 import { useState } from "react";
 import { motion, AnimatePresence } from "framer-motion";
 import { ChevronDown, Check } from "lucide-react";
 import { Card, CardContent } from "@/components/ui/card";
 import { Badge } from "@/components/ui/badge";
 import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
 import { tnGroupTaxonomy, GroupSection, GroupOption } from "@/data/tnGroupTaxonomy";
 
 interface GroupSelectorProps {
   selectedGroup: string;
   onSelectGroup: (groupId: string) => void;
 }
 
 const containerVariants = {
   initial: { opacity: 0 },
   animate: { opacity: 1, transition: { staggerChildren: 0.05 } }
 };
 
 const itemVariants = {
   initial: { opacity: 0, y: 10 },
   animate: { opacity: 1, y: 0 }
 };
 
 export const GroupSelector = ({ selectedGroup, onSelectGroup }: GroupSelectorProps) => {
   const [openSections, setOpenSections] = useState<string[]>(["science_maths", "science_biology"]);
 
   const toggleSection = (sectionId: string) => {
     setOpenSections(prev => 
       prev.includes(sectionId) 
         ? prev.filter(id => id !== sectionId)
         : [...prev, sectionId]
     );
   };
 
   const findSelectedSection = () => {
     for (const section of tnGroupTaxonomy) {
       if (section.groups.some(g => g.id === selectedGroup)) {
         return section;
       }
     }
     return null;
   };
 
   const selectedSection = findSelectedSection();
 
   return (
     <motion.div
       className="space-y-4"
       variants={containerVariants}
       initial="initial"
       animate="animate"
     >
       <div className="text-center mb-6">
         <h2 className="text-xl font-semibold mb-1">🔬 Select Your 12th Group</h2>
         <p className="text-sm text-muted-foreground">உங்கள் 12-ஆம் வகுப்பு குழுவைத் தேர்ந்தெடுக்கவும்</p>
       </div>
 
       {tnGroupTaxonomy.map((section) => (
         <motion.div key={section.id} variants={itemVariants}>
           <Collapsible
             open={openSections.includes(section.id)}
             onOpenChange={() => toggleSection(section.id)}
           >
             <CollapsibleTrigger asChild>
               <Card 
                 className={`cursor-pointer transition-all hover:shadow-md border-2 ${
                   selectedSection?.id === section.id 
                     ? `${section.borderColor} ${section.bgLight}`
                     : 'border-muted hover:border-muted-foreground/30'
                 }`}
               >
                 <CardContent className="p-4 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center shadow-md`}>
                       <span className="text-white font-bold text-sm">
                         {section.id === "vocational" ? "V" : section.groups[0]?.code.toString().charAt(0)}
                       </span>
                     </div>
                     <div>
                       <p className={`font-semibold ${section.textColor}`}>{section.title}</p>
                       <p className="text-xs text-muted-foreground">{section.titleTamil}</p>
                     </div>
                   </div>
                   <ChevronDown 
                     className={`h-5 w-5 text-muted-foreground transition-transform ${
                       openSections.includes(section.id) ? 'rotate-180' : ''
                     }`}
                   />
                 </CardContent>
               </Card>
             </CollapsibleTrigger>
 
             <CollapsibleContent>
               <div className="mt-2 space-y-2 pl-4">
                 <AnimatePresence>
                   {section.groups.map((group, index) => (
                     <motion.div
                       key={group.id}
                       initial={{ opacity: 0, x: -10 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: index * 0.03 }}
                     >
                       <Card
                         className={`cursor-pointer transition-all ${
                           selectedGroup === group.id
                             ? `border-2 ${section.borderColor} ${section.bgLight} shadow-md`
                             : 'hover:bg-muted/50 hover:border-muted-foreground/30'
                         }`}
                         onClick={() => onSelectGroup(group.id)}
                       >
                         <CardContent className="p-3">
                           <div className="flex items-start gap-3">
                             <span className="text-xl">{group.icon}</span>
                             <div className="flex-1 min-w-0">
                               <div className="flex items-center gap-2 flex-wrap">
                                 <span className="font-semibold text-sm">
                                   {group.code > 0 ? `Group ${group.code}` : group.subjects[0]}
                                 </span>
                                 {group.popularTag && (
                                   <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700 border-amber-300">
                                     ⭐ {group.popularTag}
                                   </Badge>
                                 )}
                               </div>
                               <p className="text-xs text-muted-foreground mt-1">
                                 {group.subjects.join(" • ")}
                               </p>
                               <div className="flex flex-wrap gap-1 mt-2">
                                 {group.careerPaths.slice(0, 3).map((path, i) => (
                                   <Badge 
                                     key={i} 
                                     variant="outline" 
                                     className={`text-xs ${section.textColor} border-current/30`}
                                   >
                                     → {path}
                                   </Badge>
                                 ))}
                                 {group.careerPaths.length > 3 && (
                                   <Badge variant="outline" className="text-xs text-muted-foreground">
                                     +{group.careerPaths.length - 3} more
                                   </Badge>
                                 )}
                               </div>
                             </div>
                             {selectedGroup === group.id && (
                               <motion.div
                                 initial={{ scale: 0 }}
                                 animate={{ scale: 1 }}
                                 className={`h-6 w-6 rounded-full bg-gradient-to-br ${section.color} flex items-center justify-center shadow-md shrink-0`}
                               >
                                 <Check className="h-3.5 w-3.5 text-white" />
                               </motion.div>
                             )}
                           </div>
                         </CardContent>
                       </Card>
                     </motion.div>
                   ))}
                 </AnimatePresence>
               </div>
             </CollapsibleContent>
           </Collapsible>
         </motion.div>
       ))}
 
       {selectedGroup && (
         <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl text-center"
         >
           <p className="text-sm text-green-700">
             ✅ Great! We have specialized guidance for your group.
           </p>
         </motion.div>
       )}
     </motion.div>
   );
 };
 
 export default GroupSelector;