 import { useState } from 'react';
 import { Card, CardContent } from '@/components/ui/card';
 import { Badge } from '@/components/ui/badge';
 import { Button } from '@/components/ui/button';
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
 import { Input } from '@/components/ui/input';
 import { cn } from '@/lib/utils';
 import { Building2, MapPin, Star, IndianRupee, Briefcase, Search, Heart, Shield, Landmark } from 'lucide-react';
 import { EngineeringResult } from './EngineeringCalculator';
 
 interface CollegePredictorProps {
   engineeringResult: EngineeringResult | null;
 }
 
 interface PredictedCollege {
   id: string;
   name: string;
   nameTamil?: string;
   location: string;
   district: string;
   type: 'Government';
   lastYearCutoff: Record<string, number>;
   branches: Branch[];
   annualFee: string;
   placement: string;
   naacGrade?: string;
   nirfRank?: number;
   seats: number;
 }
 
 interface Branch {
   code: string;
   name: string;
   lastCutoff: number;
   seats: number;
   chance: 'High' | 'Medium' | 'Low';
 }
 
 // Government Engineering Colleges in Tamil Nadu - Through TNEA Counseling (Free/Subsidized Education)
 const governmentColleges: PredictedCollege[] = [
   {
     id: '1',
     name: 'College of Engineering, Guindy (Anna University)',
     nameTamil: 'அண்ணா பல்கலைக்கழகம், கிண்டி',
     location: 'Chennai',
     district: 'Chennai',
     type: 'Government',
     lastYearCutoff: { OC: 198.5, BC: 196, MBC: 194, SC: 185, ST: 175 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 199, seats: 63, chance: 'Low' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 197, seats: 126, chance: 'Low' },
       { code: 'EEE', name: 'Electrical & Electronics', lastCutoff: 195, seats: 94, chance: 'Medium' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 193, seats: 157, chance: 'Medium' },
       { code: 'CIVIL', name: 'Civil Engineering', lastCutoff: 190, seats: 94, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹12 LPA',
     naacGrade: 'A++',
     nirfRank: 8,
     seats: 534,
   },
   {
     id: '2',
     name: 'Madras Institute of Technology (MIT)',
     nameTamil: 'மெட்ராஸ் தொழில்நுட்ப நிறுவனம்',
     location: 'Chennai',
     district: 'Chennai',
     type: 'Government',
     lastYearCutoff: { OC: 197, BC: 194, MBC: 192, SC: 183, ST: 173 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 198, seats: 60, chance: 'Low' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 196, seats: 120, chance: 'Low' },
       { code: 'AERO', name: 'Aerospace Engineering', lastCutoff: 195, seats: 60, chance: 'Medium' },
       { code: 'AUTO', name: 'Automobile Engineering', lastCutoff: 192, seats: 60, chance: 'Medium' },
     ],
     annualFee: '₹7,500',
     placement: '₹10 LPA',
     naacGrade: 'A++',
     nirfRank: 12,
     seats: 300,
   },
   {
     id: '3',
     name: 'Alagappa College of Technology (ACT)',
     nameTamil: 'அழகப்பா தொழில்நுட்ப கல்லூரி',
     location: 'Chennai',
     district: 'Chennai',
     type: 'Government',
     lastYearCutoff: { OC: 195, BC: 192, MBC: 189, SC: 180, ST: 170 },
     branches: [
       { code: 'CHEM', name: 'Chemical Engineering', lastCutoff: 194, seats: 60, chance: 'Medium' },
       { code: 'IT', name: 'Information Technology', lastCutoff: 193, seats: 60, chance: 'Medium' },
       { code: 'LEATHER', name: 'Leather Technology', lastCutoff: 180, seats: 45, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹8 LPA',
     naacGrade: 'A+',
     nirfRank: 35,
     seats: 165,
   },
   {
     id: '4',
     name: 'Govt. College of Engineering, Salem',
     nameTamil: 'அரசு பொறியியல் கல்லூரி, சேலம்',
     location: 'Salem',
     district: 'Salem',
     type: 'Government',
     lastYearCutoff: { OC: 185, BC: 182, MBC: 179, SC: 170, ST: 160 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 188, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 185, seats: 90, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 180, seats: 120, chance: 'High' },
       { code: 'CIVIL', name: 'Civil', lastCutoff: 175, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹5 LPA',
     naacGrade: 'A',
     seats: 330,
   },
   {
     id: '5',
     name: 'Govt. College of Engineering, Tirunelveli',
     nameTamil: 'அரசு பொறியியல் கல்லூரி, திருநெல்வேலி',
     location: 'Tirunelveli',
     district: 'Tirunelveli',
     type: 'Government',
     lastYearCutoff: { OC: 183, BC: 180, MBC: 177, SC: 168, ST: 158 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 186, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 183, seats: 90, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 178, seats: 120, chance: 'High' },
       { code: 'CIVIL', name: 'Civil', lastCutoff: 173, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹4.5 LPA',
     naacGrade: 'A',
     seats: 330,
   },
   {
     id: '6',
     name: 'Govt. College of Engineering, Bargur',
     nameTamil: 'அரசு பொறியியல் கல்லூரி, பார்கூர்',
     location: 'Bargur',
     district: 'Krishnagiri',
     type: 'Government',
     lastYearCutoff: { OC: 170, BC: 167, MBC: 164, SC: 155, ST: 145 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 173, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 170, seats: 60, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 165, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹4 LPA',
     seats: 180,
   },
   {
     id: '7',
     name: 'Govt. College of Engineering, Srirangam',
     nameTamil: 'அரசு பொறியியல் கல்லூரி, ஸ்ரீரங்கம்',
     location: 'Trichy',
     district: 'Tiruchirappalli',
     type: 'Government',
     lastYearCutoff: { OC: 178, BC: 175, MBC: 172, SC: 163, ST: 153 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 181, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 178, seats: 60, chance: 'High' },
       { code: 'EEE', name: 'Electrical & Electronics', lastCutoff: 175, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹4.5 LPA',
     seats: 180,
   },
   {
     id: '8',
     name: 'Govt. College of Engineering, Thanjavur',
     nameTamil: 'அரசு பொறியியல் கல்லூரி, தஞ்சாவூர்',
     location: 'Thanjavur',
     district: 'Thanjavur',
     type: 'Government',
     lastYearCutoff: { OC: 175, BC: 172, MBC: 169, SC: 160, ST: 150 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 178, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 175, seats: 60, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 170, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹4 LPA',
     seats: 180,
   },
   {
     id: '9',
     name: 'Coimbatore Institute of Technology',
     nameTamil: 'கோவை தொழில்நுட்ப நிறுவனம்',
     location: 'Coimbatore',
     district: 'Coimbatore',
     type: 'Government',
     lastYearCutoff: { OC: 192, BC: 189, MBC: 186, SC: 177, ST: 167 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 194, seats: 60, chance: 'Medium' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 191, seats: 90, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 187, seats: 120, chance: 'High' },
       { code: 'EEE', name: 'Electrical & Electronics', lastCutoff: 185, seats: 90, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹6 LPA',
     naacGrade: 'A+',
     seats: 360,
   },
   {
     id: '10',
     name: 'Govt. College of Engineering, Erode',
     nameTamil: 'அரசு பொறியியல் கல்லூரி, ஈரோடு',
     location: 'Erode',
     district: 'Erode',
     type: 'Government',
     lastYearCutoff: { OC: 168, BC: 165, MBC: 162, SC: 153, ST: 143 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 171, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 168, seats: 60, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 163, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹3.8 LPA',
     seats: 180,
   },
   {
     id: '11',
     name: 'Govt. College of Engineering, Dharmapuri',
     nameTamil: 'அரசு பொறியியல் கல்லூரி, தர்மபுரி',
     location: 'Dharmapuri',
     district: 'Dharmapuri',
     type: 'Government',
     lastYearCutoff: { OC: 165, BC: 162, MBC: 159, SC: 150, ST: 140 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 168, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 165, seats: 60, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 160, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹3.5 LPA',
     seats: 180,
   },
   {
     id: '12',
     name: 'Govt. College of Engineering, Bodinayakkanur',
     nameTamil: 'அரசு பொறியியல் கல்லூரி, போடிநாயக்கனூர்',
     location: 'Bodinayakkanur',
     district: 'Theni',
     type: 'Government',
     lastYearCutoff: { OC: 160, BC: 157, MBC: 154, SC: 145, ST: 135 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 163, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 160, seats: 60, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 155, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹3.2 LPA',
     seats: 180,
   },
   {
     id: '13',
     name: 'University College of Engineering, Nagercoil',
     nameTamil: 'பல்கலைக்கழக பொறியியல் கல்லூரி, நாகர்கோவில்',
     location: 'Nagercoil',
     district: 'Kanyakumari',
     type: 'Government',
     lastYearCutoff: { OC: 180, BC: 177, MBC: 174, SC: 165, ST: 155 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 183, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 180, seats: 60, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 175, seats: 60, chance: 'High' },
       { code: 'CIVIL', name: 'Civil Engineering', lastCutoff: 172, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹4.5 LPA',
     seats: 240,
   },
   {
     id: '14',
     name: 'University College of Engineering, Tindivanam',
     nameTamil: 'பல்கலைக்கழக பொறியியல் கல்லூரி, திண்டிவனம்',
     location: 'Tindivanam',
     district: 'Villupuram',
     type: 'Government',
     lastYearCutoff: { OC: 172, BC: 169, MBC: 166, SC: 157, ST: 147 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 175, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 172, seats: 60, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 168, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹4 LPA',
     seats: 180,
   },
   {
     id: '15',
     name: 'University College of Engineering, Ariyalur',
     nameTamil: 'பல்கலைக்கழக பொறியியல் கல்லூரி, அரியலூர்',
     location: 'Ariyalur',
     district: 'Ariyalur',
     type: 'Government',
     lastYearCutoff: { OC: 158, BC: 155, MBC: 152, SC: 143, ST: 133 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 161, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 158, seats: 60, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 153, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹3 LPA',
     seats: 180,
   },
   {
     id: '16',
     name: 'University College of Engineering, Ramanathapuram',
     nameTamil: 'பல்கலைக்கழக பொறியியல் கல்லூரி, ராமநாதபுரம்',
     location: 'Ramanathapuram',
     district: 'Ramanathapuram',
     type: 'Government',
     lastYearCutoff: { OC: 155, BC: 152, MBC: 149, SC: 140, ST: 130 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 158, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 155, seats: 60, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 150, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹3 LPA',
     seats: 180,
   },
   {
     id: '17',
     name: 'University College of Engineering, Dindigul',
     nameTamil: 'பல்கலைக்கழக பொறியியல் கல்லூரி, திண்டுக்கல்',
     location: 'Dindigul',
     district: 'Dindigul',
     type: 'Government',
     lastYearCutoff: { OC: 170, BC: 167, MBC: 164, SC: 155, ST: 145 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 173, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 170, seats: 60, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 165, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹3.5 LPA',
     seats: 180,
   },
   {
     id: '18',
     name: 'University College of Engineering, Pattukkottai',
     nameTamil: 'பல்கலைக்கழக பொறியியல் கல்லூரி, பட்டுக்கோட்டை',
     location: 'Pattukkottai',
     district: 'Thanjavur',
     type: 'Government',
     lastYearCutoff: { OC: 162, BC: 159, MBC: 156, SC: 147, ST: 137 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 165, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 162, seats: 60, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 158, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹3.2 LPA',
     seats: 180,
   },
   {
     id: '19',
     name: 'University College of Engineering, Villupuram',
     nameTamil: 'பல்கலைக்கழக பொறியியல் கல்லூரி, விழுப்புரம்',
     location: 'Villupuram',
     district: 'Villupuram',
     type: 'Government',
     lastYearCutoff: { OC: 165, BC: 162, MBC: 159, SC: 150, ST: 140 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 168, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 165, seats: 60, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 160, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹3.5 LPA',
     seats: 180,
   },
   {
     id: '20',
     name: 'University College of Engineering, Kanchipuram',
     nameTamil: 'பல்கலைக்கழக பொறியியல் கல்லூரி, காஞ்சிபுரம்',
     location: 'Kanchipuram',
     district: 'Kanchipuram',
     type: 'Government',
     lastYearCutoff: { OC: 175, BC: 172, MBC: 169, SC: 160, ST: 150 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 178, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 175, seats: 60, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 170, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹4 LPA',
     seats: 180,
   },
 ];
 
 const districts = [
   'Chennai', 'Coimbatore', 'Salem', 'Tirunelveli', 'Tiruchirappalli', 'Thanjavur', 
   'Erode', 'Dharmapuri', 'Krishnagiri', 'Theni', 'Kanyakumari', 'Villupuram', 
   'Ariyalur', 'Ramanathapuram', 'Dindigul', 'Kanchipuram'
 ];
 
 export const CollegePredictor = ({ engineeringResult }: CollegePredictorProps) => {
   const [searchQuery, setSearchQuery] = useState('');
   const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
   const [savedColleges, setSavedColleges] = useState<string[]>([]);
 
   const getChanceForBranch = (branchCutoff: number, userCutoff: number): 'High' | 'Medium' | 'Low' => {
     const diff = userCutoff - branchCutoff;
     if (diff >= 5) return 'High';
     if (diff >= -3) return 'Medium';
     return 'Low';
   };
 
   const predictedColleges = governmentColleges.map(college => {
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
     const matchesDistrict = selectedDistrict === 'all' || college.district === selectedDistrict;
     return matchesSearch && matchesDistrict;
   });
 
   const sortedColleges = [...filteredColleges].sort((a, b) => {
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
       {/* Government Colleges Info Banner */}
       <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0">
         <CardContent className="py-4">
           <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
               <Landmark className="h-6 w-6" />
             </div>
             <div>
               <h3 className="text-lg font-semibold flex items-center gap-2">
                 <Shield className="h-4 w-4" />
                 Government Colleges Only - Free Education through TNEA Counseling
               </h3>
               <p className="text-sm text-white/80 font-tamil">அரசு கல்லூரிகள் மட்டும் - TNEA கலந்தாய்வு மூலம் இலவச கல்வி</p>
             </div>
           </div>
           <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
             <div className="bg-white/10 rounded-lg px-3 py-2 text-center">
               <div className="text-xl font-bold">{engineeringResult.cutoff}</div>
               <div className="text-xs text-white/70">Your Cutoff</div>
             </div>
             <div className="bg-white/10 rounded-lg px-3 py-2 text-center">
               <div className="text-lg font-semibold">{engineeringResult.category}</div>
               <div className="text-xs text-white/70">Category</div>
             </div>
             <div className="bg-white/10 rounded-lg px-3 py-2 text-center">
               <div className="text-lg font-bold">₹7,500/yr</div>
               <div className="text-xs text-white/70">Govt. Fees</div>
             </div>
             <div className="bg-white/10 rounded-lg px-3 py-2 text-center">
               <div className="text-lg font-bold">{sortedColleges.filter(c => c.overallChance !== 'Low').length}</div>
               <div className="text-xs text-white/70">Good Chances</div>
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
               placeholder="Search govt. colleges..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="pl-10"
             />
           </div>
         </div>
         <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
           <SelectTrigger className="w-[180px]">
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
         <Badge variant="outline" className="h-10 px-4 flex items-center gap-2 bg-green-50 text-green-700 border-green-300">
           <Shield className="h-4 w-4" />
           {sortedColleges.length} Govt. Colleges
         </Badge>
       </div>
 
       {/* College Cards */}
       <div className="space-y-4">
         {sortedColleges.map((college) => (
           <Card key={college.id} className={cn(
             'overflow-hidden transition-all hover:shadow-lg',
             college.overallChance === 'High' ? 'border-green-500/50 bg-green-50/30' :
             college.overallChance === 'Medium' ? 'border-yellow-500/50 bg-yellow-50/30' : 'border-muted'
           )}>
             <CardContent className="p-0">
               {/* College Header */}
               <div className={cn(
                 'p-4 border-b',
                 college.overallChance === 'High' ? 'bg-green-100 dark:bg-green-950/30' :
                 college.overallChance === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-950/30' : 'bg-muted/50'
               )}>
                 <div className="flex items-start justify-between gap-4">
                   <div className="flex-1">
                     <div className="flex items-center gap-2 mb-1 flex-wrap">
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
                       <Badge className="text-xs bg-green-600 text-white">🏛️ {college.type}</Badge>
                       <span className="text-xs text-green-700 font-medium">
                         {college.seats} Govt. Quota Seats
                       </span>
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
                 <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
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
                   <div className="flex items-center gap-1 text-green-700 font-medium">
                     <IndianRupee className="h-4 w-4" />
                     <span>Fees: {college.annualFee}/year (Govt.)</span>
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
       <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
         <p className="text-xs text-green-800 dark:text-green-300 text-center">
           🏛️ <strong>Only Government Colleges:</strong> These are all government colleges where you can study for FREE or with minimal fees (₹7,500/year) through TNEA counseling. 
           Cutoffs are based on previous year data and may vary.
         </p>
         <p className="text-xs text-green-700/80 dark:text-green-400/80 text-center mt-1 font-tamil">
           இவை அனைத்தும் அரசு கல்லூரிகள். TNEA கலந்தாய்வு மூலம் இலவசமாக அல்லது குறைந்த கட்டணத்தில் படிக்கலாம்.
         </p>
       </div>
     </div>
   );
 };