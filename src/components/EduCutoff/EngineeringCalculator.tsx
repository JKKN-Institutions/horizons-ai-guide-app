 import { useState, useMemo, useCallback } from 'react';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import { Button } from '@/components/ui/button';
 import { Badge } from '@/components/ui/badge';
 import { Progress } from '@/components/ui/progress';
 import { Checkbox } from '@/components/ui/checkbox';
 import { cn } from '@/lib/utils';
 import { Calculator, GraduationCap, School, CheckCircle2, AlertCircle, TrendingUp, Building2 } from 'lucide-react';
 
 type Board = 'tn_state' | 'cbse' | 'icse';
 type Category = 'OC' | 'BC' | 'BCM' | 'MBC' | 'MBC_V' | 'DNC' | 'SC' | 'SCA' | 'ST';
 
 interface EngineeringCalculatorProps {
   onResultChange?: (result: EngineeringResult | null) => void;
 }
 
 export interface EngineeringResult {
   cutoff: number;
   category: Category;
   board: Board;
   specialQuotas: string[];
   rankEstimate: string;
   chanceLevel: 'High' | 'Medium' | 'Low' | 'Very Low';
   marks: {
     maths: number;
     physics: number;
     chemistry: number;
   };
 }
 
 const boards: { id: Board; name: string; nameTamil: string; icon: string }[] = [
   { id: 'tn_state', name: 'Tamil Nadu State Board', nameTamil: 'தமிழ்நாடு மாநில வாரியம்', icon: '🏛️' },
   { id: 'cbse', name: 'CBSE', nameTamil: 'மத்திய வாரியம்', icon: '📘' },
   { id: 'icse', name: 'ICSE', nameTamil: 'ICSE வாரியம்', icon: '📗' },
 ];
 
 const categories: { id: Category; name: string; fullName: string }[] = [
   { id: 'OC', name: 'OC', fullName: 'General' },
   { id: 'BC', name: 'BC', fullName: 'Backward Class' },
   { id: 'BCM', name: 'BCM', fullName: 'BC Muslim' },
   { id: 'MBC', name: 'MBC', fullName: 'Most Backward' },
   { id: 'MBC_V', name: 'MBC(V)', fullName: 'Vanniyar' },
   { id: 'DNC', name: 'DNC', fullName: 'Denotified' },
   { id: 'SC', name: 'SC', fullName: 'Scheduled Caste' },
   { id: 'SCA', name: 'SCA', fullName: 'SC Arunthathiyar' },
   { id: 'ST', name: 'ST', fullName: 'Scheduled Tribe' },
 ];
 
 const specialQuotas = [
   { id: 'govt_school', label: '7.5% Government School Quota', labelTamil: 'அரசு பள்ளி இட ஒதுக்கீடு' },
   { id: 'sports', label: 'Sports Quota', labelTamil: 'விளையாட்டு இட ஒதுக்கீடு' },
   { id: 'ex_serviceman', label: 'Ex-Servicemen Ward', labelTamil: 'முன்னாள் படைவீரர் வாரிசு' },
   { id: 'pwd', label: 'Differently Abled (PwD)', labelTamil: 'மாற்றுத்திறனாளி' },
 ];
 
 export const EngineeringCalculator = ({ onResultChange }: EngineeringCalculatorProps) => {
   const [board, setBoard] = useState<Board>('tn_state');
   const [marks, setMarks] = useState({ maths: '', physics: '', chemistry: '' });
   const [category, setCategory] = useState<Category>('OC');
   const [selectedQuotas, setSelectedQuotas] = useState<string[]>([]);
   const [showResult, setShowResult] = useState(false);
 
   const handleMarkChange = useCallback((subject: keyof typeof marks, value: string) => {
     const numValue = value === '' ? '' : Math.min(100, Math.max(0, parseInt(value) || 0)).toString();
     setMarks(prev => ({ ...prev, [subject]: numValue }));
     setShowResult(false);
   }, []);
 
   const toggleQuota = useCallback((quotaId: string) => {
     setSelectedQuotas(prev => 
       prev.includes(quotaId) ? prev.filter(q => q !== quotaId) : [...prev, quotaId]
     );
   }, []);
 
   const cutoff = useMemo(() => {
     const m = parseFloat(marks.maths) || 0;
     const p = parseFloat(marks.physics) || 0;
     const c = parseFloat(marks.chemistry) || 0;
     if (m === 0 && p === 0 && c === 0) return 0;
     return Math.round((m + (p / 2) + (c / 2)) * 100) / 100;
   }, [marks]);
 
   const canCalculate = marks.maths !== '' && marks.physics !== '' && marks.chemistry !== '';
 
   const getRankEstimate = (cutoff: number): string => {
     if (cutoff >= 195) return 'Top 100';
     if (cutoff >= 190) return 'Top 500';
     if (cutoff >= 185) return 'Top 2,000';
     if (cutoff >= 180) return 'Top 5,000';
     if (cutoff >= 175) return 'Top 10,000';
     if (cutoff >= 170) return 'Top 20,000';
     if (cutoff >= 160) return 'Top 50,000';
     if (cutoff >= 150) return 'Top 1,00,000';
     if (cutoff >= 140) return 'Top 1,50,000';
     return 'Below 1,50,000';
   };
 
   const getChanceLevel = (cutoff: number): 'High' | 'Medium' | 'Low' | 'Very Low' => {
     if (cutoff >= 180) return 'High';
     if (cutoff >= 160) return 'Medium';
     if (cutoff >= 140) return 'Low';
     return 'Very Low';
   };
 
   const handleCalculate = () => {
     if (!canCalculate) return;
     setShowResult(true);
     
     const result: EngineeringResult = {
       cutoff,
       category,
       board,
       specialQuotas: selectedQuotas,
       rankEstimate: getRankEstimate(cutoff),
       chanceLevel: getChanceLevel(cutoff),
       marks: {
         maths: parseFloat(marks.maths) || 0,
         physics: parseFloat(marks.physics) || 0,
         chemistry: parseFloat(marks.chemistry) || 0,
       },
     };
     
     onResultChange?.(result);
   };
 
   const isValidMark = (value: string) => {
     const num = parseFloat(value);
     return !isNaN(num) && num >= 0 && num <= 100;
   };
 
   return (
     <div className="space-y-6">
       {/* Step 1: Board Selection */}
       <Card className="border-2 border-primary/20">
         <CardHeader className="pb-3">
           <CardTitle className="text-lg flex items-center gap-2">
             <School className="h-5 w-5 text-primary" />
             Step 1: Select Your Board
             <span className="text-sm font-normal text-muted-foreground font-tamil ml-2">வாரியத்தைத் தேர்ந்தெடுக்கவும்</span>
           </CardTitle>
         </CardHeader>
         <CardContent>
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
             {boards.map((b) => (
               <button
                 key={b.id}
                 onClick={() => setBoard(b.id)}
                 className={cn(
                   'p-4 rounded-xl border-2 text-left transition-all duration-200',
                   'hover:scale-[1.02] hover:shadow-md',
                   board === b.id
                     ? 'border-primary bg-primary/5 shadow-md'
                     : 'border-border hover:border-primary/30'
                 )}
               >
                 <div className="flex items-center gap-3">
                   <span className="text-2xl">{b.icon}</span>
                   <div>
                     <div className="font-semibold text-foreground">{b.name}</div>
                     <div className="text-xs text-muted-foreground font-tamil">{b.nameTamil}</div>
                   </div>
                 </div>
                 {board === b.id && (
                   <CheckCircle2 className="absolute top-2 right-2 h-5 w-5 text-primary" />
                 )}
               </button>
             ))}
           </div>
         </CardContent>
       </Card>
 
       {/* Step 2: Marks Entry */}
       <Card className="border-2 border-primary/20">
         <CardHeader className="pb-3">
           <CardTitle className="text-lg flex items-center gap-2">
             <Calculator className="h-5 w-5 text-primary" />
             Step 2: Enter Your 12th Marks
             <span className="text-sm font-normal text-muted-foreground font-tamil ml-2">மதிப்பெண்களை உள்ளிடவும்</span>
           </CardTitle>
         </CardHeader>
         <CardContent>
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             {[
               { key: 'maths' as const, label: 'Mathematics', icon: '📐', color: 'blue' },
               { key: 'physics' as const, label: 'Physics', icon: '⚛️', color: 'green' },
               { key: 'chemistry' as const, label: 'Chemistry', icon: '🧪', color: 'purple' },
             ].map((subject) => (
               <div key={subject.key} className="space-y-2">
                 <Label className="text-sm font-medium flex items-center gap-2">
                   <span>{subject.icon}</span> {subject.label}
                 </Label>
                 <div className="relative">
                   <Input
                     type="number"
                     min={0}
                     max={100}
                     placeholder="/ 100"
                     value={marks[subject.key]}
                     onChange={(e) => handleMarkChange(subject.key, e.target.value)}
                     className={cn(
                       'text-xl font-bold text-center h-14 pr-10',
                       marks[subject.key] && isValidMark(marks[subject.key])
                         ? 'border-green-500 focus:ring-green-500'
                         : marks[subject.key] ? 'border-red-500' : ''
                     )}
                   />
                   {marks[subject.key] && (
                     <div className="absolute right-3 top-1/2 -translate-y-1/2">
                       {isValidMark(marks[subject.key]) ? (
                         <CheckCircle2 className="h-5 w-5 text-green-500" />
                       ) : (
                         <AlertCircle className="h-5 w-5 text-red-500" />
                       )}
                     </div>
                   )}
                 </div>
               </div>
             ))}
           </div>
 
           {/* Live Cutoff Preview */}
           {cutoff > 0 && (
             <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
               <div className="flex items-center justify-between">
                 <div>
                   <div className="text-sm text-muted-foreground">Live Cutoff Preview</div>
                   <div className="text-xs text-muted-foreground font-tamil">நேரடி கட்ஆஃப் முன்னோட்டம்</div>
                 </div>
                 <div className="text-right">
                   <div className="text-3xl font-bold text-primary">{cutoff}</div>
                   <div className="text-xs text-muted-foreground">out of 200</div>
                 </div>
               </div>
               <div className="mt-3">
                 <Progress value={(cutoff / 200) * 100} className="h-2" />
               </div>
               <div className="mt-2 text-xs text-muted-foreground">
                 Formula: Maths ({marks.maths || 0}) + Physics/2 ({(parseFloat(marks.physics) || 0)/2}) + Chemistry/2 ({(parseFloat(marks.chemistry) || 0)/2}) = <strong>{cutoff}</strong>
               </div>
             </div>
           )}
         </CardContent>
       </Card>
 
       {/* Step 3: Category Selection */}
       <Card className="border-2 border-primary/20">
         <CardHeader className="pb-3">
           <CardTitle className="text-lg flex items-center gap-2">
             <GraduationCap className="h-5 w-5 text-primary" />
             Step 3: Select Your Category
             <span className="text-sm font-normal text-muted-foreground font-tamil ml-2">சமூகத்தைத் தேர்ந்தெடுக்கவும்</span>
           </CardTitle>
         </CardHeader>
         <CardContent>
           <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
             {categories.map((cat) => (
               <button
                 key={cat.id}
                 onClick={() => setCategory(cat.id)}
                 className={cn(
                   'p-3 rounded-lg border-2 text-center transition-all duration-200',
                   'hover:scale-105',
                   category === cat.id
                     ? 'border-primary bg-primary/10 text-primary font-bold'
                     : 'border-border hover:border-primary/30'
                 )}
               >
                 <div className="font-semibold text-sm">{cat.name}</div>
                 <div className="text-[10px] text-muted-foreground truncate">{cat.fullName}</div>
               </button>
             ))}
           </div>
         </CardContent>
       </Card>
 
       {/* Step 4: Special Quotas */}
       <Card className="border-2 border-primary/20">
         <CardHeader className="pb-3">
           <CardTitle className="text-lg flex items-center gap-2">
             <Building2 className="h-5 w-5 text-primary" />
             Step 4: Special Quota (Optional)
             <span className="text-sm font-normal text-muted-foreground font-tamil ml-2">சிறப்பு இட ஒதுக்கீடு</span>
           </CardTitle>
         </CardHeader>
         <CardContent>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
             {specialQuotas.map((quota) => (
               <div key={quota.id} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                 <Checkbox
                   id={quota.id}
                   checked={selectedQuotas.includes(quota.id)}
                   onCheckedChange={() => toggleQuota(quota.id)}
                 />
                 <label htmlFor={quota.id} className="flex-1 cursor-pointer">
                   <div className="text-sm font-medium">{quota.label}</div>
                   <div className="text-xs text-muted-foreground font-tamil">{quota.labelTamil}</div>
                 </label>
               </div>
             ))}
           </div>
         </CardContent>
       </Card>
 
       {/* Calculate Button */}
       <div className="flex justify-center">
         <Button
           size="lg"
           onClick={handleCalculate}
           disabled={!canCalculate}
           className="px-12 py-6 text-lg rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg"
         >
           <Calculator className="mr-2 h-5 w-5" />
           Calculate TNEA Cutoff
         </Button>
       </div>
 
       {/* Result Display */}
       {showResult && (
         <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
           <CardHeader>
             <CardTitle className="text-lg flex items-center gap-2 text-green-700 dark:text-green-400">
               🎯 Your TNEA Engineering Cutoff Result
             </CardTitle>
           </CardHeader>
           <CardContent>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               {/* Cutoff Score */}
               <div className="text-center p-6 bg-white dark:bg-card rounded-xl shadow-sm">
                 <div className="text-sm text-muted-foreground mb-1">🎓 TNEA CUTOFF</div>
                 <div className="text-5xl font-bold text-primary">{cutoff}</div>
                 <div className="text-sm text-muted-foreground">out of 200</div>
                 <Progress value={(cutoff / 200) * 100} className="h-2 mt-3" />
               </div>
 
               {/* Rank Estimate */}
               <div className="text-center p-6 bg-white dark:bg-card rounded-xl shadow-sm">
                 <div className="text-sm text-muted-foreground mb-1">📊 RANK ESTIMATE</div>
                 <div className="text-3xl font-bold text-foreground">{getRankEstimate(cutoff)}</div>
                 <Badge variant={getChanceLevel(cutoff) === 'High' ? 'default' : getChanceLevel(cutoff) === 'Medium' ? 'secondary' : 'outline'} className="mt-2">
                   {getChanceLevel(cutoff)} Chance
                 </Badge>
               </div>
 
               {/* Formula Breakdown */}
               <div className="p-6 bg-white dark:bg-card rounded-xl shadow-sm">
                 <div className="text-sm text-muted-foreground mb-2">📐 FORMULA</div>
                 <div className="text-sm space-y-1 font-mono">
                   <div>Maths: {marks.maths}</div>
                   <div>Physics/2: {(parseFloat(marks.physics) || 0) / 2}</div>
                   <div>Chemistry/2: {(parseFloat(marks.chemistry) || 0) / 2}</div>
                   <div className="border-t pt-1 font-bold">Total: {cutoff}</div>
                 </div>
               </div>
             </div>
 
             {/* Category & Quota Info */}
             <div className="mt-4 flex flex-wrap gap-2">
               <Badge variant="outline">Category: {category}</Badge>
               <Badge variant="outline">Board: {boards.find(b => b.id === board)?.name}</Badge>
               {selectedQuotas.map(q => (
                 <Badge key={q} variant="secondary">
                   {specialQuotas.find(sq => sq.id === q)?.label}
                 </Badge>
               ))}
             </div>
           </CardContent>
         </Card>
       )}
     </div>
   );
 };