 import { useState } from "react";
 import { motion } from "framer-motion";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Checkbox } from "@/components/ui/checkbox";
 import { Badge } from "@/components/ui/badge";
 import { Clock, ExternalLink, CheckCircle2 } from "lucide-react";
 
 interface ActionItem {
   id: string;
   title: string;
   titleTamil: string;
   description: string;
   priority: "high" | "medium" | "low";
   deadline?: string;
   link?: string;
 }
 
 interface ActionItemsProps {
   stream: string;
   career: string;
 }
 
 const getActionItems = (stream: string, career: string): ActionItem[] => {
   const baseItems: ActionItem[] = [
     {
       id: "1",
       title: "Register for NEET/JEE 2026",
       titleTamil: "NEET/JEE 2026 க்கு பதிவு செய்யவும்",
       description: "Complete your entrance exam registration before deadline",
       priority: "high",
       deadline: "Nov 2025",
       link: stream.includes("bio") ? "https://neet.nta.nic.in" : "https://jeemain.nta.nic.in"
     },
     {
       id: "2",
       title: "Collect Required Documents",
       titleTamil: "தேவையான ஆவணங்களை சேகரிக்கவும்",
       description: "Gather 10th & 12th marksheets, community certificate, income proof",
       priority: "high",
       deadline: "Mar 2026"
     },
     {
       id: "3",
       title: "Create Practice Schedule",
       titleTamil: "பயிற்சி அட்டவணையை உருவாக்கவும்",
       description: "Solve previous year questions daily - minimum 2 hours",
       priority: "medium"
     },
     {
       id: "4",
       title: "Join Test Series",
       titleTamil: "தேர்வு தொடர்களில் சேரவும்",
       description: "Enroll in mock test series for regular practice",
       priority: "medium"
     },
     {
       id: "5",
       title: "Research Colleges",
       titleTamil: "கல்லூரிகளை ஆராயுங்கள்",
       description: "Shortlist 10-15 colleges based on your preferences",
       priority: "low"
     },
     {
       id: "6",
       title: "Apply for Scholarships",
       titleTamil: "உதவித்தொகைக்கு விண்ணப்பிக்கவும்",
       description: "Check eligibility for state and national scholarships",
       priority: "medium",
       deadline: "Apr 2026"
     }
   ];
 
   return baseItems;
 };
 
 const priorityColors = {
   high: "text-red-600 bg-red-50 border-red-200",
   medium: "text-amber-600 bg-amber-50 border-amber-200",
   low: "text-blue-600 bg-blue-50 border-blue-200"
 };
 
 const priorityLabels = {
   high: "🔴 High Priority",
   medium: "🟡 Medium",
   low: "🔵 Low"
 };
 
 export const ActionItems = ({ stream, career }: ActionItemsProps) => {
   const items = getActionItems(stream, career);
   const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
 
   const toggleItem = (id: string) => {
     setCheckedItems(prev => {
       const newSet = new Set(prev);
       if (newSet.has(id)) {
         newSet.delete(id);
       } else {
         newSet.add(id);
       }
       // Save to localStorage
       localStorage.setItem('career_action_items', JSON.stringify(Array.from(newSet)));
       return newSet;
     });
   };
 
   const completedCount = checkedItems.size;
   const totalCount = items.length;
   const progressPercent = (completedCount / totalCount) * 100;
 
   return (
     <Card className="border-0 shadow-lg overflow-hidden">
       <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 pb-4">
         <div className="flex items-center justify-between">
           <div>
             <CardTitle className="flex items-center gap-2 text-lg">
               <span className="text-2xl">✅</span>
               Immediate Action Items
             </CardTitle>
             <p className="text-sm text-muted-foreground mt-1">உடனடி செயல் திட்டம்</p>
           </div>
           <div className="text-right">
             <p className="text-2xl font-bold text-primary">{completedCount}/{totalCount}</p>
             <p className="text-xs text-muted-foreground">completed</p>
           </div>
         </div>
         
         {/* Progress bar */}
         <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
           <motion.div
             className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
             initial={{ width: 0 }}
             animate={{ width: `${progressPercent}%` }}
             transition={{ duration: 0.5 }}
           />
         </div>
       </CardHeader>
       <CardContent className="pt-4">
         <div className="space-y-3">
           {items.map((item, index) => {
             const isChecked = checkedItems.has(item.id);
             
             return (
               <motion.div
                 key={item.id}
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: index * 0.05 }}
               >
                 <Card 
                   className={`transition-all cursor-pointer ${
                     isChecked 
                       ? 'bg-green-50/50 border-green-200' 
                       : 'hover:bg-muted/50'
                   }`}
                   onClick={() => toggleItem(item.id)}
                 >
                   <CardContent className="p-3 flex items-start gap-3">
                     <Checkbox
                       checked={isChecked}
                       onCheckedChange={() => toggleItem(item.id)}
                       className="mt-0.5"
                     />
                     
                     <div className="flex-1 min-w-0">
                       <div className="flex items-center gap-2 flex-wrap">
                         <p className={`font-medium text-sm ${isChecked ? 'line-through text-muted-foreground' : ''}`}>
                           {item.title}
                         </p>
                         <Badge variant="outline" className={`text-xs ${priorityColors[item.priority]}`}>
                           {priorityLabels[item.priority]}
                         </Badge>
                       </div>
                       <p className="text-xs text-muted-foreground mt-0.5">{item.titleTamil}</p>
                       <p className={`text-xs mt-1 ${isChecked ? 'text-muted-foreground' : 'text-foreground/70'}`}>
                         {item.description}
                       </p>
                       
                       <div className="flex items-center gap-3 mt-2">
                         {item.deadline && (
                           <span className="text-xs text-muted-foreground flex items-center gap-1">
                             <Clock className="h-3 w-3" />
                             {item.deadline}
                           </span>
                         )}
                         {item.link && (
                           <a
                             href={item.link}
                             target="_blank"
                             rel="noopener noreferrer"
                             className="text-xs text-primary flex items-center gap-1 hover:underline"
                             onClick={(e) => e.stopPropagation()}
                           >
                             <ExternalLink className="h-3 w-3" />
                             Apply Now
                           </a>
                         )}
                       </div>
                     </div>
 
                     {isChecked && (
                       <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                     )}
                   </CardContent>
                 </Card>
               </motion.div>
             );
           })}
         </div>
       </CardContent>
     </Card>
   );
 };
 
 export default ActionItems;