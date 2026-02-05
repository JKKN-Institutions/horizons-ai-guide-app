 import { useState, useMemo, useCallback } from 'react';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import { Button } from '@/components/ui/button';
 import { Badge } from '@/components/ui/badge';
 import { Progress } from '@/components/ui/progress';
 import { cn } from '@/lib/utils';
 import { Stethoscope, Calculator, Building2, CheckCircle2, AlertTriangle, XCircle, TrendingUp } from 'lucide-react';
 
 type Category = 'OC' | 'BC' | 'BCM' | 'MBC' | 'DNC' | 'SC' | 'SCA' | 'ST';
 type QuotaType = 'government' | 'management' | 'nri';
 
 interface MedicalEligibilityCheckerProps {
   onResultChange?: (result: MedicalResult | null) => void;
 }
 
 export interface MedicalResult {
   neetScore: number;
   neetRank: number;
   stateRank: number;
   category: Category;
   quotaType: QuotaType;
   eligibility: {
     govtMBBS: 'eligible' | 'borderline' | 'not_eligible';
     privateMBBS: 'eligible' | 'borderline' | 'not_eligible';
     bds: 'eligible' | 'borderline' | 'not_eligible';
     ayush: 'eligible' | 'borderline' | 'not_eligible';
   };
   percentile: number;
 }
 
 const categories: { id: Category; name: string; fullName: string; minPercentile: number }[] = [
   { id: 'OC', name: 'OC', fullName: 'General', minPercentile: 50 },
   { id: 'BC', name: 'BC', fullName: 'Backward Class', minPercentile: 40 },
   { id: 'BCM', name: 'BCM', fullName: 'BC Muslim', minPercentile: 40 },
   { id: 'MBC', name: 'MBC', fullName: 'Most Backward', minPercentile: 40 },
   { id: 'DNC', name: 'DNC', fullName: 'Denotified', minPercentile: 40 },
   { id: 'SC', name: 'SC', fullName: 'Scheduled Caste', minPercentile: 40 },
   { id: 'SCA', name: 'SCA', fullName: 'SC Arunthathiyar', minPercentile: 40 },
   { id: 'ST', name: 'ST', fullName: 'Scheduled Tribe', minPercentile: 40 },
 ];
 
 const quotaTypes: { id: QuotaType; name: string; nameTamil: string; description: string }[] = [
   { id: 'government', name: 'Government Quota', nameTamil: 'அரசு இடஒதுக்கீடு', description: '85% seats - Lower fees' },
   { id: 'management', name: 'Management Quota', nameTamil: 'மேலாண்மை இடஒதுக்கீடு', description: '15% seats - Higher fees' },
   { id: 'nri', name: 'NRI Quota', nameTamil: 'NRI இடஒதுக்கீடு', description: 'For NRI/OCI candidates' },
 ];
 
 export const MedicalEligibilityChecker = ({ onResultChange }: MedicalEligibilityCheckerProps) => {
   const [neetScore, setNeetScore] = useState('');
   const [neetRank, setNeetRank] = useState('');
   const [stateRank, setStateRank] = useState('');
   const [category, setCategory] = useState<Category>('OC');
   const [quotaType, setQuotaType] = useState<QuotaType>('government');
   const [showResult, setShowResult] = useState(false);
 
   const score = parseInt(neetScore) || 0;
   const allIndiaRank = parseInt(neetRank) || 0;
   const tnRank = parseInt(stateRank) || 0;
 
   const percentile = useMemo(() => {
     if (score === 0) return 0;
     // Approximate percentile calculation
     return Math.min(100, Math.max(0, (score / 720) * 100));
   }, [score]);
 
   const canCalculate = neetScore !== '' && parseInt(neetScore) >= 0;
 
   const getGovtMBBSEligibility = useCallback((): 'eligible' | 'borderline' | 'not_eligible' => {
     const catConfig = categories.find(c => c.id === category);
     const minPercentile = catConfig?.minPercentile || 50;
     
     if (percentile < minPercentile) return 'not_eligible';
     
     // For government MBBS in TN
     if (tnRank > 0 && tnRank <= 3000) return 'eligible';
     if (tnRank > 0 && tnRank <= 8000) return 'borderline';
     if (score >= 550) return 'eligible';
     if (score >= 480) return 'borderline';
     return 'not_eligible';
   }, [category, percentile, tnRank, score]);
 
   const getPrivateMBBSEligibility = useCallback((): 'eligible' | 'borderline' | 'not_eligible' => {
     const catConfig = categories.find(c => c.id === category);
     const minPercentile = catConfig?.minPercentile || 50;
     
     if (percentile < minPercentile) return 'not_eligible';
     
     if (score >= 450) return 'eligible';
     if (score >= 350) return 'borderline';
     return 'not_eligible';
   }, [category, percentile, score]);
 
   const getBDSEligibility = useCallback((): 'eligible' | 'borderline' | 'not_eligible' => {
     const catConfig = categories.find(c => c.id === category);
     const minPercentile = catConfig?.minPercentile || 50;
     
     if (percentile < minPercentile) return 'not_eligible';
     
     if (score >= 400) return 'eligible';
     if (score >= 300) return 'borderline';
     return 'not_eligible';
   }, [category, percentile, score]);
 
   const getAYUSHEligibility = useCallback((): 'eligible' | 'borderline' | 'not_eligible' => {
     const catConfig = categories.find(c => c.id === category);
     const minPercentile = catConfig?.minPercentile || 50;
     
     if (percentile < minPercentile) return 'not_eligible';
     
     if (score >= 300) return 'eligible';
     if (score >= 200) return 'borderline';
     return 'not_eligible';
   }, [category, percentile, score]);
 
   const handleCalculate = () => {
     if (!canCalculate) return;
     setShowResult(true);
     
     const result: MedicalResult = {
       neetScore: score,
       neetRank: allIndiaRank,
       stateRank: tnRank,
       category,
       quotaType,
       eligibility: {
         govtMBBS: getGovtMBBSEligibility(),
         privateMBBS: getPrivateMBBSEligibility(),
         bds: getBDSEligibility(),
         ayush: getAYUSHEligibility(),
       },
       percentile,
     };
     
     onResultChange?.(result);
   };
 
   const getStatusIcon = (status: 'eligible' | 'borderline' | 'not_eligible') => {
     switch (status) {
       case 'eligible':
         return <CheckCircle2 className="h-5 w-5 text-green-500" />;
       case 'borderline':
         return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
       case 'not_eligible':
         return <XCircle className="h-5 w-5 text-red-500" />;
     }
   };
 
   const getStatusText = (status: 'eligible' | 'borderline' | 'not_eligible') => {
     switch (status) {
       case 'eligible':
         return { text: 'High Chance', color: 'text-green-600 bg-green-50' };
       case 'borderline':
         return { text: 'Medium Chance', color: 'text-yellow-600 bg-yellow-50' };
       case 'not_eligible':
         return { text: 'Low Chance', color: 'text-red-600 bg-red-50' };
     }
   };
 
   return (
     <div className="space-y-6">
       {/* Step 1: NEET Score Entry */}
       <Card className="border-2 border-green-500/20">
         <CardHeader className="pb-3">
           <CardTitle className="text-lg flex items-center gap-2">
             <Stethoscope className="h-5 w-5 text-green-600" />
             Step 1: Enter NEET Details
             <span className="text-sm font-normal text-muted-foreground font-tamil ml-2">NEET விவரங்களை உள்ளிடவும்</span>
           </CardTitle>
         </CardHeader>
         <CardContent>
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             <div className="space-y-2">
               <Label className="text-sm font-medium flex items-center gap-2">
                 <span>📊</span> NEET Score
               </Label>
               <Input
                 type="number"
                 min={0}
                 max={720}
                 placeholder="/ 720"
                 value={neetScore}
                 onChange={(e) => {
                   const val = Math.min(720, Math.max(0, parseInt(e.target.value) || 0));
                   setNeetScore(e.target.value === '' ? '' : val.toString());
                   setShowResult(false);
                 }}
                 className="text-xl font-bold text-center h-14"
               />
               {score > 0 && (
                 <div className="text-xs text-center text-muted-foreground">
                   Percentile: ~{percentile.toFixed(1)}%
                 </div>
               )}
             </div>
 
             <div className="space-y-2">
               <Label className="text-sm font-medium flex items-center gap-2">
                 <span>🇮🇳</span> All India Rank
               </Label>
               <Input
                 type="number"
                 min={1}
                 placeholder="Optional"
                 value={neetRank}
                 onChange={(e) => setNeetRank(e.target.value)}
                 className="text-lg font-semibold text-center h-14"
               />
             </div>
 
             <div className="space-y-2">
               <Label className="text-sm font-medium flex items-center gap-2">
                 <span>🏛️</span> Tamil Nadu State Rank
               </Label>
               <Input
                 type="number"
                 min={1}
                 placeholder="Optional"
                 value={stateRank}
                 onChange={(e) => setStateRank(e.target.value)}
                 className="text-lg font-semibold text-center h-14"
               />
             </div>
           </div>
 
           {/* Live Score Preview */}
           {score > 0 && (
             <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/5 rounded-xl border border-green-500/20">
               <div className="flex items-center justify-between">
                 <div>
                   <div className="text-sm text-muted-foreground">Your NEET Score</div>
                   <div className="text-xs text-muted-foreground font-tamil">உங்கள் NEET மதிப்பெண்</div>
                 </div>
                 <div className="text-right">
                   <div className="text-4xl font-bold text-green-600">{score}</div>
                   <div className="text-xs text-muted-foreground">out of 720</div>
                 </div>
               </div>
               <Progress value={(score / 720) * 100} className="h-2 mt-3" />
             </div>
           )}
         </CardContent>
       </Card>
 
       {/* Step 2: Category Selection */}
       <Card className="border-2 border-green-500/20">
         <CardHeader className="pb-3">
           <CardTitle className="text-lg flex items-center gap-2">
             <Building2 className="h-5 w-5 text-green-600" />
             Step 2: Select Category
             <span className="text-sm font-normal text-muted-foreground font-tamil ml-2">சமூகத்தைத் தேர்ந்தெடுக்கவும்</span>
           </CardTitle>
         </CardHeader>
         <CardContent>
           <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
             {categories.map((cat) => (
               <button
                 key={cat.id}
                 onClick={() => setCategory(cat.id)}
                 className={cn(
                   'p-2 rounded-lg border-2 text-center transition-all duration-200',
                   'hover:scale-105',
                   category === cat.id
                     ? 'border-green-500 bg-green-50 text-green-700 font-bold dark:bg-green-950'
                     : 'border-border hover:border-green-500/30'
                 )}
               >
                 <div className="font-semibold text-sm">{cat.name}</div>
               </button>
             ))}
           </div>
         </CardContent>
       </Card>
 
       {/* Step 3: Quota Type */}
       <Card className="border-2 border-green-500/20">
         <CardHeader className="pb-3">
           <CardTitle className="text-lg flex items-center gap-2">
             <TrendingUp className="h-5 w-5 text-green-600" />
             Step 3: Quota Type
             <span className="text-sm font-normal text-muted-foreground font-tamil ml-2">இடஒதுக்கீடு வகை</span>
           </CardTitle>
         </CardHeader>
         <CardContent>
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
             {quotaTypes.map((qt) => (
               <button
                 key={qt.id}
                 onClick={() => setQuotaType(qt.id)}
                 className={cn(
                   'p-4 rounded-xl border-2 text-left transition-all duration-200',
                   'hover:scale-[1.02]',
                   quotaType === qt.id
                     ? 'border-green-500 bg-green-50 dark:bg-green-950'
                     : 'border-border hover:border-green-500/30'
                 )}
               >
                 <div className="font-semibold text-foreground">{qt.name}</div>
                 <div className="text-xs text-muted-foreground font-tamil">{qt.nameTamil}</div>
                 <div className="text-xs text-muted-foreground mt-1">{qt.description}</div>
               </button>
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
           className="px-12 py-6 text-lg rounded-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 shadow-lg"
         >
           <Calculator className="mr-2 h-5 w-5" />
           Check Medical Eligibility
         </Button>
       </div>
 
       {/* Result Display */}
       {showResult && (
         <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
           <CardHeader>
             <CardTitle className="text-lg flex items-center gap-2 text-green-700 dark:text-green-400">
               🏥 Medical Eligibility Results
             </CardTitle>
           </CardHeader>
           <CardContent>
             {/* Score Summary */}
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
               <div className="text-center p-4 bg-white dark:bg-card rounded-xl shadow-sm">
                 <div className="text-xs text-muted-foreground">NEET Score</div>
                 <div className="text-2xl font-bold text-green-600">{score}/720</div>
               </div>
               <div className="text-center p-4 bg-white dark:bg-card rounded-xl shadow-sm">
                 <div className="text-xs text-muted-foreground">Percentile</div>
                 <div className="text-2xl font-bold text-foreground">{percentile.toFixed(1)}%</div>
               </div>
               {allIndiaRank > 0 && (
                 <div className="text-center p-4 bg-white dark:bg-card rounded-xl shadow-sm">
                   <div className="text-xs text-muted-foreground">AIR</div>
                   <div className="text-2xl font-bold text-foreground">{allIndiaRank.toLocaleString()}</div>
                 </div>
               )}
               {tnRank > 0 && (
                 <div className="text-center p-4 bg-white dark:bg-card rounded-xl shadow-sm">
                   <div className="text-xs text-muted-foreground">TN Rank</div>
                   <div className="text-2xl font-bold text-foreground">{tnRank.toLocaleString()}</div>
                 </div>
               )}
             </div>
 
             {/* Eligibility Cards */}
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
               {[
                 { id: 'govtMBBS', name: 'Govt. MBBS', icon: '🏛️', fee: '₹15,000/year', status: getGovtMBBSEligibility() },
                 { id: 'privateMBBS', name: 'Private MBBS', icon: '🏥', fee: '₹15-25 Lakh/year', status: getPrivateMBBSEligibility() },
                 { id: 'bds', name: 'BDS (Dental)', icon: '🦷', fee: '₹2-10 Lakh/year', status: getBDSEligibility() },
                 { id: 'ayush', name: 'AYUSH (BAMS/BHMS)', icon: '🌿', fee: '₹50K-3 Lakh/year', status: getAYUSHEligibility() },
               ].map((course) => {
                 const statusInfo = getStatusText(course.status);
                 return (
                   <div key={course.id} className="p-4 bg-white dark:bg-card rounded-xl shadow-sm border">
                     <div className="flex items-center justify-between mb-2">
                       <span className="text-2xl">{course.icon}</span>
                       {getStatusIcon(course.status)}
                     </div>
                     <div className="font-semibold text-foreground">{course.name}</div>
                     <div className="text-xs text-muted-foreground mt-1">{course.fee}</div>
                     <Badge className={cn('mt-2', statusInfo.color)}>
                       {statusInfo.text}
                     </Badge>
                   </div>
                 );
               })}
             </div>
 
             {/* Category Info */}
             <div className="mt-4 p-4 bg-white dark:bg-card rounded-xl">
               <div className="flex flex-wrap gap-2">
                 <Badge variant="outline">Category: {category}</Badge>
                 <Badge variant="outline">Quota: {quotaTypes.find(q => q.id === quotaType)?.name}</Badge>
                 <Badge variant="outline">Min Percentile Required: {categories.find(c => c.id === category)?.minPercentile}%</Badge>
               </div>
             </div>
 
             {/* Disclaimer */}
             <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200">
               <p className="text-xs text-yellow-800 dark:text-yellow-200">
                 ⚠️ <strong>Disclaimer:</strong> This is an estimate based on previous year data. Actual cutoffs vary each year based on number of applicants and seats. Always verify from official NEET/MCC counseling portals.
               </p>
             </div>
           </CardContent>
         </Card>
       )}
     </div>
   );
 };