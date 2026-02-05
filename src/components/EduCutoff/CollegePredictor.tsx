 import { useState, useEffect } from 'react';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Badge } from '@/components/ui/badge';
 import { Button } from '@/components/ui/button';
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
 import { Input } from '@/components/ui/input';
 import { cn } from '@/lib/utils';
 import { Building2, MapPin, GraduationCap, TrendingUp, Star, IndianRupee, Briefcase, Search, Filter, Heart } from 'lucide-react';
 import { EngineeringResult } from './EngineeringCalculator';
 
 interface CollegePredictorProps {
   engineeringResult: EngineeringResult | null;
 }
 
 interface PredictedCollege {
   id: string;
   name: string;
   nameTamil?: string;
   location: string;
   type: 'Government' | 'Government Aided' | 'Autonomous' | 'Self-Finance';
   lastYearCutoff: Record<string, number>;
   branches: Branch[];
   annualFee: string;
   placement: string;
   naacGrade?: string;
   nirfRank?: number;
 }
 
 interface Branch {
   code: string;
   name: string;
   lastCutoff: number;
   seats: number;
   chance: 'High' | 'Medium' | 'Low';
 }
 
 // Sample college data for Tamil Nadu
 const sampleColleges: PredictedCollege[] = [
   {
     id: '1',
     name: 'College of Engineering, Guindy (Anna University)',
     nameTamil: 'அண்ணா பல்கலைக்கழகம், கிண்டி',
     location: 'Chennai',
     type: 'Government',
     lastYearCutoff: { OC: 198.5, BC: 196, MBC: 194, SC: 185, ST: 175 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 199, seats: 60, chance: 'Low' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 197, seats: 120, chance: 'Low' },
       { code: 'EEE', name: 'Electrical & Electronics', lastCutoff: 195, seats: 90, chance: 'Medium' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 193, seats: 150, chance: 'Medium' },
       { code: 'CIVIL', name: 'Civil', lastCutoff: 190, seats: 90, chance: 'High' },
     ],
     annualFee: '₹50,000',
     placement: '₹12 LPA',
     naacGrade: 'A++',
     nirfRank: 8,
   },
   {
     id: '2',
     name: 'PSG College of Technology',
     nameTamil: 'PSG தொழில்நுட்பக் கல்லூரி',
     location: 'Coimbatore',
     type: 'Autonomous',
     lastYearCutoff: { OC: 195, BC: 192, MBC: 189, SC: 180, ST: 170 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 196, seats: 120, chance: 'Medium' },
       { code: 'IT', name: 'Information Technology', lastCutoff: 194, seats: 60, chance: 'Medium' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 192, seats: 120, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 188, seats: 180, chance: 'High' },
     ],
     annualFee: '₹1,20,000',
     placement: '₹8.5 LPA',
     naacGrade: 'A++',
     nirfRank: 44,
   },
   {
     id: '3',
     name: 'Thiagarajar College of Engineering',
     nameTamil: 'திருவள்ளுவர் பொறியியல் கல்லூரி',
     location: 'Madurai',
     type: 'Autonomous',
     lastYearCutoff: { OC: 190, BC: 187, MBC: 184, SC: 175, ST: 165 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 192, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 189, seats: 90, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 185, seats: 120, chance: 'High' },
     ],
     annualFee: '₹90,000',
     placement: '₹6.5 LPA',
     naacGrade: 'A+',
   },
   {
     id: '4',
     name: 'Government College of Engineering, Salem',
     nameTamil: 'அரசு பொறியியல் கல்லூரி, சேலம்',
     location: 'Salem',
     type: 'Government',
     lastYearCutoff: { OC: 185, BC: 182, MBC: 179, SC: 170, ST: 160 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 188, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 185, seats: 90, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 180, seats: 120, chance: 'High' },
       { code: 'CIVIL', name: 'Civil', lastCutoff: 175, seats: 60, chance: 'High' },
     ],
     annualFee: '₹40,000',
     placement: '₹5 LPA',
     naacGrade: 'A',
   },
   {
     id: '5',
     name: 'Kongu Engineering College',
     nameTamil: 'கொங்கு பொறியியல் கல்லூரி',
     location: 'Erode',
     type: 'Autonomous',
     lastYearCutoff: { OC: 188, BC: 185, MBC: 182, SC: 173, ST: 163 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 190, seats: 120, chance: 'High' },
       { code: 'AI', name: 'AI & Data Science', lastCutoff: 188, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 185, seats: 120, chance: 'High' },
     ],
     annualFee: '₹1,10,000',
     placement: '₹7 LPA',
     naacGrade: 'A++',
   },
   {
     id: '6',
     name: 'Coimbatore Institute of Technology',
     nameTamil: 'கோயம்புத்தூர் தொழில்நுட்ப நிறுவனம்',
     location: 'Coimbatore',
     type: 'Government',
     lastYearCutoff: { OC: 192, BC: 189, MBC: 186, SC: 177, ST: 167 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 194, seats: 60, chance: 'Medium' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 191, seats: 90, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 187, seats: 120, chance: 'High' },
     ],
     annualFee: '₹45,000',
     placement: '₹6 LPA',
     naacGrade: 'A+',
   },
   {
     id: '7',
     name: 'Bannari Amman Institute of Technology',
     nameTamil: 'பன்னாரி அம்மன் தொழில்நுட்ப நிறுவனம்',
     location: 'Erode',
     type: 'Autonomous',
     lastYearCutoff: { OC: 180, BC: 177, MBC: 174, SC: 165, ST: 155 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 183, seats: 180, chance: 'High' },
       { code: 'IT', name: 'Information Technology', lastCutoff: 180, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 178, seats: 120, chance: 'High' },
     ],
     annualFee: '₹1,00,000',
     placement: '₹5.5 LPA',
     naacGrade: 'A+',
   },
   {
     id: '8',
     name: 'Sri Krishna College of Engineering & Technology',
     nameTamil: 'ஸ்ரீ கிருஷ்ணா பொறியியல் கல்லூரி',
     location: 'Coimbatore',
     type: 'Autonomous',
     lastYearCutoff: { OC: 175, BC: 172, MBC: 169, SC: 160, ST: 150 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 178, seats: 120, chance: 'High' },
       { code: 'AI', name: 'AI & Machine Learning', lastCutoff: 175, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 172, seats: 90, chance: 'High' },
     ],
     annualFee: '₹95,000',
     placement: '₹5 LPA',
     naacGrade: 'A+',
   },
 ];
 
 export const CollegePredictor = ({ engineeringResult }: CollegePredictorProps) => {
   const [searchQuery, setSearchQuery] = useState('');
   const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
   const [selectedType, setSelectedType] = useState<string>('all');
   const [savedColleges, setSavedColleges] = useState<string[]>([]);
 
   const districts = ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Erode', 'Trichy', 'Tirunelveli'];
 
   const getChanceForBranch = (branchCutoff: number, userCutoff: number): 'High' | 'Medium' | 'Low' => {
     const diff = userCutoff - branchCutoff;
     if (diff >= 5) return 'High';
     if (diff >= -3) return 'Medium';
     return 'Low';
   };
 
   const predictedColleges = sampleColleges.map(college => {
     const userCutoff = engineeringResult?.cutoff || 0;
     const userCategory = engineeringResult?.category || 'OC';
     const collegeCutoff = college.lastYearCutoff[userCategory] || college.lastYearCutoff['OC'];
     
     const branches = college.branches.map(branch => ({
       ...branch,
       chance: getChanceForBranch(branch.lastCutoff, userCutoff),
     }));
 
     const overallChance: 'High' | 'Medium' | 'Low' = 
       userCutoff >= collegeCutoff + 5 ? 'High' :
       userCutoff >= collegeCutoff - 3 ? 'Medium' : 'Low';
 
     return {
       ...college,
       branches,
       overallChance,
       userCutoff,
       collegeCutoff,
     };
   });
 
   const filteredColleges = predictedColleges.filter(college => {
     const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          college.location.toLowerCase().includes(searchQuery.toLowerCase());
     const matchesDistrict = selectedDistrict === 'all' || college.location === selectedDistrict;
     const matchesType = selectedType === 'all' || college.type === selectedType;
     return matchesSearch && matchesDistrict && matchesType;
   });
 
   const sortedColleges = [...filteredColleges].sort((a, b) => {
     // Sort by chance level (High > Medium > Low)
     const chanceOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
     return chanceOrder[a.overallChance] - chanceOrder[b.overallChance];
   });
 
   const toggleSaveCollege = (collegeId: string) => {
     setSavedColleges(prev => 
       prev.includes(collegeId) ? prev.filter(id => id !== collegeId) : [...prev, collegeId]
     );
   };
 
   if (!engineeringResult) {
     return (
       <Card className="border-dashed">
         <CardContent className="py-12 text-center">
           <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
           <h3 className="text-lg font-semibold text-foreground mb-2">Calculate Your Cutoff First</h3>
           <p className="text-sm text-muted-foreground">
             Enter your marks in the Engineering Calculator above to see predicted colleges
           </p>
         </CardContent>
       </Card>
     );
   }
 
   return (
     <div className="space-y-6">
       {/* Header with Summary */}
       <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
         <CardContent className="py-4">
           <div className="flex flex-wrap items-center justify-between gap-4">
             <div>
               <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                 <Building2 className="h-5 w-5 text-primary" />
                 College Predictions for You
               </h3>
               <p className="text-sm text-muted-foreground font-tamil">உங்களுக்கான கல்லூரி கணிப்புகள்</p>
             </div>
             <div className="flex items-center gap-4">
               <div className="text-center px-4 py-2 bg-white dark:bg-card rounded-lg shadow-sm">
                 <div className="text-2xl font-bold text-primary">{engineeringResult.cutoff}</div>
                 <div className="text-xs text-muted-foreground">Your Cutoff</div>
               </div>
               <div className="text-center px-4 py-2 bg-white dark:bg-card rounded-lg shadow-sm">
                 <div className="text-lg font-semibold text-foreground">{engineeringResult.category}</div>
                 <div className="text-xs text-muted-foreground">Category</div>
               </div>
             </div>
           </div>
         </CardContent>
       </Card>
 
       {/* Filters */}
       <div className="flex flex-wrap gap-3">
         <div className="flex-1 min-w-[200px]">
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
             <Input
               placeholder="Search colleges..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="pl-10"
             />
           </div>
         </div>
         <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
           <SelectTrigger className="w-[150px]">
             <MapPin className="h-4 w-4 mr-2" />
             <SelectValue placeholder="District" />
           </SelectTrigger>
           <SelectContent>
             <SelectItem value="all">All Districts</SelectItem>
             {districts.map(d => (
               <SelectItem key={d} value={d}>{d}</SelectItem>
             ))}
           </SelectContent>
         </Select>
         <Select value={selectedType} onValueChange={setSelectedType}>
           <SelectTrigger className="w-[180px]">
             <Filter className="h-4 w-4 mr-2" />
             <SelectValue placeholder="College Type" />
           </SelectTrigger>
           <SelectContent>
             <SelectItem value="all">All Types</SelectItem>
             <SelectItem value="Government">Government</SelectItem>
             <SelectItem value="Government Aided">Govt. Aided</SelectItem>
             <SelectItem value="Autonomous">Autonomous</SelectItem>
             <SelectItem value="Self-Finance">Self-Finance</SelectItem>
           </SelectContent>
         </Select>
       </div>
 
       {/* College Cards */}
       <div className="space-y-4">
         {sortedColleges.map((college) => (
           <Card key={college.id} className={cn(
             'overflow-hidden transition-all hover:shadow-lg',
             college.overallChance === 'High' ? 'border-green-500/30' :
             college.overallChance === 'Medium' ? 'border-yellow-500/30' : 'border-red-500/30'
           )}>
             <CardContent className="p-0">
               {/* College Header */}
               <div className={cn(
                 'p-4 border-b',
                 college.overallChance === 'High' ? 'bg-green-50 dark:bg-green-950/20' :
                 college.overallChance === 'Medium' ? 'bg-yellow-50 dark:bg-yellow-950/20' : 'bg-red-50 dark:bg-red-950/20'
               )}>
                 <div className="flex items-start justify-between gap-4">
                   <div className="flex-1">
                     <div className="flex items-center gap-2 mb-1">
                       <h4 className="font-semibold text-foreground">{college.name}</h4>
                       {college.naacGrade && (
                         <Badge variant="outline" className="text-xs">NAAC {college.naacGrade}</Badge>
                       )}
                     </div>
                     {college.nameTamil && (
                       <p className="text-xs text-muted-foreground font-tamil mb-2">{college.nameTamil}</p>
                     )}
                     <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                       <span className="flex items-center gap-1">
                         <MapPin className="h-3 w-3" /> {college.location}
                       </span>
                       <Badge variant="secondary" className="text-xs">{college.type}</Badge>
                       {college.nirfRank && (
                         <span className="flex items-center gap-1">
                           <Star className="h-3 w-3 text-yellow-500" /> NIRF #{college.nirfRank}
                         </span>
                       )}
                     </div>
                   </div>
                   <div className="flex items-center gap-2">
                     <Button
                       variant="ghost"
                       size="icon"
                       onClick={() => toggleSaveCollege(college.id)}
                       className={savedColleges.includes(college.id) ? 'text-red-500' : ''}
                     >
                       <Heart className={cn('h-5 w-5', savedColleges.includes(college.id) && 'fill-current')} />
                     </Button>
                     <div className={cn(
                       'px-3 py-1 rounded-full text-sm font-semibold',
                       college.overallChance === 'High' ? 'bg-green-100 text-green-700' :
                       college.overallChance === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                     )}>
                       {college.overallChance === 'High' ? '✅ High Chance' :
                        college.overallChance === 'Medium' ? '🟡 Medium' : '🔴 Low'}
                     </div>
                   </div>
                 </div>
 
                 {/* Cutoff Comparison */}
                 <div className="mt-3 flex items-center gap-4 text-sm">
                   <span>Your Cutoff: <strong className="text-primary">{college.userCutoff}</strong></span>
                   <span>Last Year ({engineeringResult.category}): <strong>{college.collegeCutoff}</strong></span>
                   <span className={cn(
                     'font-semibold',
                     college.userCutoff >= college.collegeCutoff ? 'text-green-600' : 'text-red-600'
                   )}>
                     {college.userCutoff >= college.collegeCutoff ? 
                       `+${(college.userCutoff - college.collegeCutoff).toFixed(1)} above` : 
                       `${(college.userCutoff - college.collegeCutoff).toFixed(1)} below`}
                   </span>
                 </div>
               </div>
 
               {/* Branch-wise Chances */}
               <div className="p-4">
                 <div className="text-sm font-medium text-muted-foreground mb-3">Available Branches:</div>
                 <div className="flex flex-wrap gap-2">
                   {college.branches.map((branch) => (
                     <div
                       key={branch.code}
                       className={cn(
                         'px-3 py-2 rounded-lg text-sm border',
                         branch.chance === 'High' ? 'bg-green-50 border-green-200 text-green-700' :
                         branch.chance === 'Medium' ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 
                         'bg-red-50 border-red-200 text-red-700'
                       )}
                     >
                       <div className="font-semibold">{branch.code}</div>
                       <div className="text-xs">Cutoff: {branch.lastCutoff}</div>
                     </div>
                   ))}
                 </div>
 
                 {/* College Stats */}
                 <div className="mt-4 flex flex-wrap gap-4 text-sm">
                   <div className="flex items-center gap-1 text-muted-foreground">
                     <IndianRupee className="h-4 w-4" />
                     <span>Fees: {college.annualFee}/year</span>
                   </div>
                   <div className="flex items-center gap-1 text-muted-foreground">
                     <Briefcase className="h-4 w-4" />
                     <span>Avg Package: {college.placement}</span>
                   </div>
                 </div>
               </div>
             </CardContent>
           </Card>
         ))}
       </div>
 
       {sortedColleges.length === 0 && (
         <Card className="border-dashed">
           <CardContent className="py-12 text-center">
             <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
             <h3 className="text-lg font-semibold text-foreground mb-2">No Colleges Found</h3>
             <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
           </CardContent>
         </Card>
       )}
 
       {/* Disclaimer */}
       <div className="p-4 bg-muted/50 rounded-lg">
         <p className="text-xs text-muted-foreground text-center">
           ⚠️ <strong>Disclaimer:</strong> These predictions are based on previous year cutoff data. 
           Actual cutoffs vary each year. Always verify from official TNEA counseling website.
         </p>
       </div>
     </div>
   );
 };