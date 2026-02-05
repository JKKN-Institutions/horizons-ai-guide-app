 import { motion } from "framer-motion";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Badge } from "@/components/ui/badge";
 import { Check, Circle, ArrowRight, GraduationCap, FileText, ClipboardCheck, Building, Briefcase } from "lucide-react";
 
 interface CareerRoadmapProps {
   careerName: string;
   stream: string;
 }
 
 const containerVariants = {
   initial: { opacity: 0 },
   animate: { opacity: 1, transition: { staggerChildren: 0.15 } }
 };
 
 const itemVariants = {
   initial: { opacity: 0, x: -20 },
   animate: { opacity: 1, x: 0 }
 };
 
 const getRoadmapSteps = (careerName: string, stream: string) => {
   // Generate personalized roadmap based on career and stream
   const baseSteps = [
     {
       title: "Complete 12th Standard",
       titleTamil: "12-ஆம் வகுப்பை முடிக்கவும்",
       description: "Focus on scoring well in your board exams",
       icon: GraduationCap,
       status: "current",
       timeline: "Now - Mar 2026",
       color: "from-emerald-500 to-green-600"
     },
     {
       title: "Prepare for Entrance Exams",
       titleTamil: "நுழைவுத் தேர்வுகளுக்கு தயாராகுங்கள்",
       description: stream.includes("bio") ? "NEET preparation is crucial" : 
                    stream.includes("math") ? "JEE/TNEA preparation" : "CAT/CLAT/Other exams",
       icon: FileText,
       status: "upcoming",
       timeline: "Jan - Apr 2026",
       color: "from-blue-500 to-cyan-600"
     },
     {
       title: "Apply to Colleges",
       titleTamil: "கல்லூரிகளுக்கு விண்ணப்பிக்கவும்",
       description: "Submit applications to target colleges",
       icon: ClipboardCheck,
       status: "upcoming",
       timeline: "Apr - Jun 2026",
       color: "from-violet-500 to-purple-600"
     },
     {
       title: "Attend Counselling",
       titleTamil: "ஆலோசனையில் கலந்துகொள்ளுங்கள்",
       description: "Participate in counselling process for seat allotment",
       icon: Building,
       status: "upcoming",
       timeline: "Jun - Aug 2026",
       color: "from-amber-500 to-orange-600"
     },
     {
       title: "Start Your Journey",
       titleTamil: "உங்கள் பயணத்தைத் தொடங்குங்கள்",
       description: `Begin your ${careerName} education`,
       icon: Briefcase,
       status: "upcoming",
       timeline: "Aug 2026",
       color: "from-pink-500 to-rose-600"
     }
   ];
 
   return baseSteps;
 };
 
 export const CareerRoadmap = ({ careerName, stream }: CareerRoadmapProps) => {
   const steps = getRoadmapSteps(careerName, stream);
 
   return (
     <Card className="border-0 shadow-lg overflow-hidden">
       <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 pb-4">
         <CardTitle className="flex items-center gap-2 text-lg">
           <span className="text-2xl">🗺️</span>
           Your Career Roadmap
           <Badge variant="secondary" className="ml-2 text-xs">
             Personalized
           </Badge>
         </CardTitle>
         <p className="text-sm text-muted-foreground">உங்கள் தொழில் வழிகாட்டி</p>
       </CardHeader>
       <CardContent className="pt-6">
         <motion.div
           className="relative"
           variants={containerVariants}
           initial="initial"
           animate="animate"
         >
           {/* Timeline line */}
           <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-blue-500 to-pink-500" />
 
           <div className="space-y-6">
             {steps.map((step, index) => {
               const Icon = step.icon;
               const isLast = index === steps.length - 1;
               
               return (
                 <motion.div
                   key={index}
                   variants={itemVariants}
                   className="relative pl-16"
                 >
                   {/* Node */}
                   <div 
                     className={`absolute left-3 -translate-x-1/2 h-7 w-7 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg border-2 border-white`}
                   >
                     {step.status === "current" ? (
                       <div className="h-2 w-2 bg-white rounded-full animate-pulse" />
                     ) : (
                       <Icon className="h-3.5 w-3.5 text-white" />
                     )}
                   </div>
 
                   {/* Content */}
                   <Card 
                     className={`transition-all ${
                       step.status === "current" 
                         ? "border-2 border-emerald-300 bg-emerald-50/50 shadow-md" 
                         : "hover:bg-muted/50"
                     }`}
                   >
                     <CardContent className="p-4">
                       <div className="flex items-start justify-between gap-4">
                         <div>
                           <div className="flex items-center gap-2">
                             <p className="font-semibold text-sm">{step.title}</p>
                             {step.status === "current" && (
                               <Badge className="bg-emerald-500 text-white text-xs">
                                 Current
                               </Badge>
                             )}
                           </div>
                           <p className="text-xs text-muted-foreground mt-0.5">{step.titleTamil}</p>
                           <p className="text-sm text-muted-foreground mt-2">{step.description}</p>
                         </div>
                         <Badge variant="outline" className="text-xs shrink-0">
                           {step.timeline}
                         </Badge>
                       </div>
                     </CardContent>
                   </Card>
                 </motion.div>
               );
             })}
           </div>
         </motion.div>
       </CardContent>
     </Card>
   );
 };
 
 export default CareerRoadmap;