 import { useState } from 'react';
 import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
 import { Card, CardContent } from '@/components/ui/card';
 import { Badge } from '@/components/ui/badge';
 import NavigationBar from '@/components/NavigationBar';
 import Footer from '@/components/Footer';
 import { EngineeringCalculator, EngineeringResult } from '@/components/EduCutoff/EngineeringCalculator';
 import { MedicalEligibilityChecker, MedicalResult } from '@/components/EduCutoff/MedicalEligibilityChecker';
 import { CollegePredictor } from '@/components/EduCutoff/CollegePredictor';
 import { Calculator, Stethoscope, Building2, GraduationCap, MapPin, CheckCircle } from 'lucide-react';
 
 const EduCutoffPage = () => {
   const [activeTab, setActiveTab] = useState('engineering');
   const [engineeringResult, setEngineeringResult] = useState<EngineeringResult | null>(null);
   const [medicalResult, setMedicalResult] = useState<MedicalResult | null>(null);
 
   return (
     <div className="min-h-screen bg-background">
       <NavigationBar />
       
       <main className="container mx-auto px-4 py-8">
         {/* Hero Header */}
         <div className="fresh-page-header rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden">
           <div className="relative z-10">
             <div className="flex items-center gap-3 mb-3">
               <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                 <Calculator className="h-7 w-7 text-white" />
               </div>
               <div>
                 <h1 className="text-2xl md:text-3xl font-serif font-bold text-white">
                   EduCutoff - Admission Predictor
                 </h1>
                 <p className="text-fresh-gold-medium text-lg font-tamil">
                   கல்வி கட்ஆஃப் - சேர்க்கை கணிப்பான்
                 </p>
               </div>
             </div>
             <p className="text-white/90 text-sm max-w-2xl">
               Calculate your Engineering Cutoff (TNEA) or check Medical College eligibility (NEET) and discover which colleges you can get admission to in Tamil Nadu.
             </p>
 
             {/* Stats */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
               <div className="fresh-card p-3 text-center">
                 <GraduationCap className="h-5 w-5 mx-auto mb-1 text-fresh-gold-dark" />
                 <div className="text-xl font-bold text-fresh-green-dark">550+</div>
                 <div className="text-xs text-muted-foreground">Engineering Colleges</div>
               </div>
               <div className="fresh-card p-3 text-center">
                 <Stethoscope className="h-5 w-5 mx-auto mb-1 text-fresh-gold-dark" />
                 <div className="text-xl font-bold text-fresh-green-dark">50+</div>
                 <div className="text-xs text-muted-foreground">Medical Colleges</div>
               </div>
               <div className="fresh-card p-3 text-center">
                 <MapPin className="h-5 w-5 mx-auto mb-1 text-fresh-gold-dark" />
                 <div className="text-xl font-bold text-fresh-green-dark">38</div>
                 <div className="text-xs text-muted-foreground">Districts</div>
               </div>
               <div className="fresh-card p-3 text-center">
                 <CheckCircle className="h-5 w-5 mx-auto mb-1 text-fresh-gold-dark" />
                 <div className="text-xl font-bold text-fresh-green-dark">100%</div>
                 <div className="text-xs text-muted-foreground">Accurate Formula</div>
               </div>
             </div>
           </div>
         </div>
 
         {/* Main Tabs */}
         <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
           <TabsList className="grid w-full grid-cols-2 lg:w-[400px] h-14">
             <TabsTrigger value="engineering" className="text-base gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
               <Calculator className="h-5 w-5" />
               Engineering (TNEA)
             </TabsTrigger>
             <TabsTrigger value="medical" className="text-base gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white">
               <Stethoscope className="h-5 w-5" />
               Medical (NEET)
             </TabsTrigger>
           </TabsList>
 
           {/* Engineering Tab */}
           <TabsContent value="engineering" className="space-y-8">
             {/* Info Card */}
             <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200">
               <CardContent className="py-4">
                 <div className="flex flex-wrap items-center gap-4">
                   <div className="flex-1">
                     <h3 className="font-semibold text-foreground flex items-center gap-2">
                       <Calculator className="h-4 w-4 text-primary" />
                       TNEA Engineering Cutoff Calculator
                     </h3>
                     <p className="text-sm text-muted-foreground mt-1">
                       For B.E/B.Tech admission in Anna University affiliated colleges through TNEA Counseling
                     </p>
                   </div>
                   <div className="flex gap-2">
                     <Badge variant="outline">Formula: M + P/2 + C/2</Badge>
                     <Badge variant="secondary">Max: 200</Badge>
                   </div>
                 </div>
               </CardContent>
             </Card>
 
             {/* Engineering Calculator */}
             <EngineeringCalculator onResultChange={setEngineeringResult} />
 
             {/* College Predictor */}
             {engineeringResult && (
               <div className="mt-8">
                 <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                   <Building2 className="h-5 w-5 text-primary" />
                   Predicted Colleges for You
                   <span className="text-sm font-normal text-muted-foreground font-tamil ml-2">
                     உங்களுக்கான கல்லூரிகள்
                   </span>
                 </h2>
                 <CollegePredictor engineeringResult={engineeringResult} />
               </div>
             )}
           </TabsContent>
 
           {/* Medical Tab */}
           <TabsContent value="medical" className="space-y-8">
             {/* Info Card */}
             <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200">
               <CardContent className="py-4">
                 <div className="flex flex-wrap items-center gap-4">
                   <div className="flex-1">
                     <h3 className="font-semibold text-foreground flex items-center gap-2">
                       <Stethoscope className="h-4 w-4 text-green-600" />
                       NEET Medical Eligibility Checker
                     </h3>
                     <p className="text-sm text-muted-foreground mt-1">
                       Check your eligibility for MBBS, BDS, BAMS, BHMS and other medical courses in Tamil Nadu
                     </p>
                   </div>
                   <div className="flex gap-2">
                     <Badge variant="outline" className="border-green-300">Score out of 720</Badge>
                     <Badge variant="secondary" className="bg-green-100 text-green-700">NEET Based</Badge>
                   </div>
                 </div>
               </CardContent>
             </Card>
 
             {/* Medical Checker */}
             <MedicalEligibilityChecker onResultChange={setMedicalResult} />
           </TabsContent>
         </Tabs>
 
         {/* Important Notice */}
         <Card className="mt-8 border-yellow-200 bg-yellow-50/50 dark:bg-yellow-950/10">
           <CardContent className="py-4">
             <p className="text-sm text-yellow-800 dark:text-yellow-200">
               ⚠️ <strong>Important:</strong> This tool provides predictions based on previous year data. 
               Actual admission depends on counseling rules which may change each year. 
               Always verify from official <strong>TNEA</strong> / <strong>NEET-MCC</strong> counseling websites.
             </p>
             <p className="text-xs text-yellow-700/80 dark:text-yellow-300/80 mt-2 font-tamil">
               முக்கிய குறிப்பு: இது முந்தைய ஆண்டு தரவுகளின் அடிப்படையில் கணிப்புகளை வழங்குகிறது. 
               உண்மையான சேர்க்கை ஆலோசனை விதிகளைப் பொறுத்தது.
             </p>
           </CardContent>
         </Card>
       </main>
 
       <Footer />
     </div>
   );
 };
 
 export default EduCutoffPage;