 import { useState } from "react";
 import { motion, AnimatePresence, Reorder } from "framer-motion";
 import { GripVertical, Check } from "lucide-react";
 import { Card, CardContent } from "@/components/ui/card";
 import { Badge } from "@/components/ui/badge";
 import { careerPriorities, CareerPriority } from "@/data/tnGroupTaxonomy";
 
 interface PriorityRankerProps {
   rankedPriorities: string[];
   onReorder: (newOrder: string[]) => void;
 }
 
 export const PriorityRanker = ({ rankedPriorities, onReorder }: PriorityRankerProps) => {
   const [items, setItems] = useState<string[]>(
     rankedPriorities.length > 0 
       ? rankedPriorities 
       : careerPriorities.map(p => p.id)
   );
 
   const handleReorder = (newOrder: string[]) => {
     setItems(newOrder);
     onReorder(newOrder);
   };
 
   const getPriority = (id: string): CareerPriority | undefined => {
     return careerPriorities.find(p => p.id === id);
   };
 
   const getRankColor = (index: number): string => {
     if (index === 0) return "from-amber-500 to-yellow-500";
     if (index === 1) return "from-slate-400 to-gray-500";
     if (index === 2) return "from-amber-700 to-orange-700";
     return "from-blue-500 to-cyan-500";
   };
 
   const getRankBg = (index: number): string => {
     if (index === 0) return "bg-amber-50 border-amber-200";
     if (index === 1) return "bg-slate-50 border-slate-200";
     if (index === 2) return "bg-orange-50 border-orange-200";
     return "";
   };
 
   return (
     <motion.div
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       className="space-y-4"
     >
       <div className="text-center mb-6">
         <h2 className="text-xl font-semibold mb-1">🎯 What Matters Most to You?</h2>
         <p className="text-sm text-muted-foreground">உங்களுக்கு எது மிக முக்கியம்?</p>
         <p className="text-xs text-muted-foreground mt-2">
           Drag to rank from Most Important to Least Important
         </p>
       </div>
 
       <Reorder.Group
         axis="y"
         values={items}
         onReorder={handleReorder}
         className="space-y-2"
       >
         <AnimatePresence>
           {items.map((id, index) => {
             const priority = getPriority(id);
             if (!priority) return null;
 
             return (
               <Reorder.Item
                 key={id}
                 value={id}
                 className="cursor-grab active:cursor-grabbing"
               >
                 <motion.div
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: index * 0.05 }}
                 >
                   <Card 
                     className={`transition-all hover:shadow-md ${
                       index < 3 ? getRankBg(index) : ''
                     }`}
                   >
                     <CardContent className="p-3 flex items-center gap-3">
                       <GripVertical className="h-5 w-5 text-muted-foreground/50 shrink-0" />
                       
                       <div 
                         className={`h-8 w-8 rounded-full bg-gradient-to-br ${getRankColor(index)} flex items-center justify-center shadow-md shrink-0`}
                       >
                         <span className="text-white font-bold text-sm">
                           {index + 1}
                         </span>
                       </div>
                       
                       <span className="text-xl shrink-0">{priority.icon}</span>
                       
                       <div className="flex-1 min-w-0">
                         <p className="font-medium text-sm">{priority.label}</p>
                         <p className="text-xs text-muted-foreground truncate">
                           {priority.description}
                         </p>
                       </div>
 
                       {index < 3 && (
                         <Badge 
                           variant="outline" 
                           className={`text-xs shrink-0 ${
                             index === 0 ? 'text-amber-600 border-amber-300' :
                             index === 1 ? 'text-slate-600 border-slate-300' :
                             'text-orange-600 border-orange-300'
                           }`}
                         >
                           {index === 0 ? "🥇 Top" : index === 1 ? "🥈 2nd" : "🥉 3rd"}
                         </Badge>
                       )}
                     </CardContent>
                   </Card>
                 </motion.div>
               </Reorder.Item>
             );
           })}
         </AnimatePresence>
       </Reorder.Group>
 
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 0.5 }}
         className="mt-4 p-3 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl text-center"
       >
         <p className="text-sm text-green-700">
           ✨ Your top priorities:{" "}
           <span className="font-semibold">
             {items.slice(0, 3).map(id => getPriority(id)?.label).join(", ")}
           </span>
         </p>
       </motion.div>
     </motion.div>
   );
 };
 
 export default PriorityRanker;