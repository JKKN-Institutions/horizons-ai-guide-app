 import { motion } from "framer-motion";
 import { Slider } from "@/components/ui/slider";
 import { Card, CardContent } from "@/components/ui/card";
 import { Badge } from "@/components/ui/badge";
 import { skillCategories, SkillCategory } from "@/data/tnGroupTaxonomy";
 
 interface SkillAssessmentProps {
   skillRatings: Record<string, number>;
   onUpdateSkill: (skillId: string, value: number) => void;
 }
 
 const containerVariants = {
   initial: { opacity: 0 },
   animate: { opacity: 1, transition: { staggerChildren: 0.08 } }
 };
 
 const itemVariants = {
   initial: { opacity: 0, y: 15 },
   animate: { opacity: 1, y: 0 }
 };
 
 const getSkillLabel = (value: number): { label: string; color: string } => {
   if (value <= 1) return { label: "Weak", color: "text-red-500" };
   if (value <= 2) return { label: "Below Average", color: "text-orange-500" };
   if (value <= 3) return { label: "Average", color: "text-amber-500" };
   if (value <= 4) return { label: "Good", color: "text-blue-500" };
   return { label: "Excellent", color: "text-green-500" };
 };
 
 export const SkillAssessment = ({ skillRatings, onUpdateSkill }: SkillAssessmentProps) => {
   return (
     <motion.div
       className="space-y-6"
       variants={containerVariants}
       initial="initial"
       animate="animate"
     >
       <div className="text-center mb-6">
         <h2 className="text-xl font-semibold mb-1">🎯 Rate Your Skills</h2>
         <p className="text-sm text-muted-foreground">உங்கள் திறன்களை மதிப்பிடுங்கள்</p>
         <p className="text-xs text-muted-foreground mt-2">
           Be honest - this helps us give better recommendations
         </p>
       </div>
 
       <div className="space-y-4">
         {skillCategories.map((skill, index) => {
           const currentValue = skillRatings[skill.id] || 3;
           const { label, color } = getSkillLabel(currentValue);
           
           return (
             <motion.div key={skill.id} variants={itemVariants}>
               <Card className="overflow-hidden">
                 <CardContent className="p-4">
                   <div className="flex items-start gap-3 mb-3">
                     <span className="text-2xl">{skill.icon}</span>
                     <div className="flex-1">
                       <div className="flex items-center justify-between">
                         <div>
                           <p className="font-semibold text-sm">{skill.name}</p>
                           <p className="text-xs text-muted-foreground">{skill.description}</p>
                         </div>
                         <Badge 
                           variant="outline" 
                           className={`${color} border-current/30 text-xs font-medium`}
                         >
                           {label}
                         </Badge>
                       </div>
                     </div>
                   </div>
                   
                   <div className="space-y-2">
                     <Slider
                       value={[currentValue]}
                       onValueChange={(values) => onUpdateSkill(skill.id, values[0])}
                       min={1}
                       max={5}
                       step={1}
                       className="w-full"
                     />
                     <div className="flex justify-between text-xs text-muted-foreground px-1">
                       <span>1 - Weak</span>
                       <span>2</span>
                       <span>3 - Average</span>
                       <span>4</span>
                       <span>5 - Excellent</span>
                     </div>
                   </div>
                 </CardContent>
               </Card>
             </motion.div>
           );
         })}
       </div>
 
       {/* Summary */}
       <motion.div
         variants={itemVariants}
         className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200"
       >
         <p className="text-sm text-center text-blue-700">
           <span className="font-semibold">Your Skill Profile: </span>
           {Object.values(skillRatings).length} skills rated
         </p>
         <div className="flex justify-center gap-1 mt-2">
           {Object.entries(skillRatings).map(([skillId, value]) => (
             <div
               key={skillId}
               className="h-2 w-4 rounded-full"
               style={{
                 backgroundColor: value >= 4 ? '#22c55e' : value >= 3 ? '#eab308' : '#f97316',
                 opacity: 0.7 + (value / 10)
               }}
             />
           ))}
         </div>
       </motion.div>
     </motion.div>
   );
 };
 
 export default SkillAssessment;