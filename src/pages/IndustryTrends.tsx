 import { useState } from 'react';
 import { useNavigate } from 'react-router-dom';
 import { ArrowLeft, Download, TrendingUp, Target, Globe, Lightbulb, CheckCircle2, AlertTriangle, MapPin, Award, Sparkles, Building2, Briefcase } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Badge } from '@/components/ui/badge';
 import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
 import { useToast } from '@/hooks/use-toast';
 import { TableCell, TableRow } from '@/components/ui/table';
 import { AttractiveTable, TimeBadge, SalaryBadge, SkillsBadge, GroupsBadge } from '@/components/IndustryTrends/AttractiveTable';
 
 // Job Market Outlook Data
 const jobMarketOutlook = [
   { factor: 'AI in Workplaces', current: '25% jobs use AI', future: '60%+ jobs will require AI skills' },
   { factor: 'Remote Work', current: '30% workforce', future: '45% hybrid/remote opportunities' },
   { factor: 'Green Jobs', current: 'Emerging', future: '10 million new jobs in India' },
   { factor: 'Healthcare Demand', current: 'High', future: 'Critical shortage - huge opportunities' },
   { factor: 'Gig Economy', current: 'Growing', future: '25% workforce will be freelancers' },
 ];
 
 // Science with Maths Careers
 const scienceMathsCareers = [
   { career: 'AI/ML Engineer', why: 'AI will be in every industry', salary: '₹10-25 LPA', demand: 5 },
   { career: 'Data Scientist', why: 'Data is the new oil', salary: '₹8-20 LPA', demand: 5 },
   { career: 'Cybersecurity Expert', why: 'Digital threats increasing', salary: '₹8-18 LPA', demand: 4 },
   { career: 'EV & Renewable Engineer', why: 'Green future is certain', salary: '₹6-15 LPA', demand: 4 },
   { career: 'Semiconductor Engineer', why: 'India becoming chip hub', salary: '₹8-20 LPA', demand: 4 },
 ];
 
 const scienceMathsDeclining = [
   'Basic IT support roles (being automated)',
   'Traditional mechanical jobs without tech skills',
   'Routine coding jobs (AI can do basic coding)',
 ];
 
 const scienceMathsCombinations = [
   { interest: 'Coding + Problem Solving', path: 'B.Tech CSE/IT', specialization: 'AI, Cloud Computing' },
   { interest: 'Building Things', path: 'B.Tech Mechanical/Civil', specialization: 'Robotics, Smart Infrastructure' },
   { interest: 'Electronics', path: 'B.Tech ECE/EEE', specialization: 'VLSI, Embedded Systems, IoT' },
   { interest: 'Maths + Analysis', path: 'B.Sc + Data Science', specialization: 'Analytics, Actuarial Science' },
 ];
 
 // Science with Biology Careers
 const scienceBioCareers = [
   { career: 'Doctor (MBBS/Specialist)', why: "Always in demand, AI can't replace", salary: '₹12-50+ LPA', demand: 5 },
   { career: 'Pharmacist/Drug Research', why: 'Pharma industry booming', salary: '₹5-15 LPA', demand: 4 },
   { career: 'Biotechnologist', why: 'Gene therapy, vaccines future', salary: '₹6-18 LPA', demand: 4 },
   { career: 'Nursing (International)', why: 'Global shortage, great abroad options', salary: '₹4-15 LPA (₹30-60 LPA abroad)', demand: 5 },
   { career: 'Clinical Psychologist', why: 'Mental health awareness rising', salary: '₹5-15 LPA', demand: 4 },
 ];
 
 const globalHealthcareOpportunities = [
   { country: 'UK', roles: 'Nurses, Doctors', salary: '£25,000-70,000/year', pathway: 'IELTS + Registration' },
   { country: 'Canada', roles: 'Healthcare workers', salary: 'CAD 50,000-100,000/year', pathway: 'NEET + IELTS' },
   { country: 'Australia', roles: 'Nurses, Aged Care', salary: 'AUD 55,000-90,000/year', pathway: 'Nursing degree + IELTS' },
   { country: 'Gulf', roles: 'Nurses, Pharmacists', salary: '₹15-30 LPA (tax-free)', pathway: 'License exam' },
 ];
 
 const scienceBioCombinations = [
   { interest: 'Patient Care', path: 'MBBS/BDS', specialization: 'Oncology, Cardiology, Dermatology' },
   { interest: 'Research', path: 'B.Sc + M.Sc', specialization: 'Genetics, Immunology, Bioinformatics' },
   { interest: 'Healthcare + Business', path: 'B.Pharm + MBA', specialization: 'Pharma Management, Clinical Research' },
   { interest: 'Helping Profession', path: 'Nursing/Allied Health', specialization: 'Critical Care, Geriatrics' },
 ];
 
 // Commerce Careers
 const commerceCareers = [
   { career: 'Chartered Accountant', why: 'Trusted profession, always needed', salary: '₹10-30 LPA', demand: 4 },
   { career: 'Financial Analyst', why: 'Investment & wealth growing', salary: '₹8-25 LPA', demand: 4 },
   { career: 'Digital Marketing Manager', why: 'Every business needs online presence', salary: '₹6-20 LPA', demand: 5 },
   { career: 'FinTech Professional', why: 'UPI, digital banking exploding', salary: '₹8-22 LPA', demand: 5 },
   { career: 'Entrepreneur/Startup Founder', why: 'Best time to start a business', salary: 'Unlimited', demand: 4 },
 ];
 
 const commerceTechUpgrade = [
   { traditional: 'Accountant', futureReady: 'Financial Data Analyst', skills: 'Python, SQL, Power BI' },
   { traditional: 'Marketing Executive', futureReady: 'Growth Hacker', skills: 'SEO, Analytics, AI tools' },
   { traditional: 'Bank Clerk', futureReady: 'FinTech Specialist', skills: 'Blockchain, Digital payments' },
   { traditional: 'Tax Consultant', futureReady: 'Tech-enabled Tax Expert', skills: 'GST software, Automation' },
 ];
 
 const commerceCombinations = [
   { interest: 'Numbers + Accuracy', path: 'CA/CMA', specialization: 'Forensic Accounting, International Taxation' },
   { interest: 'Business + Leadership', path: 'BBA + MBA', specialization: 'Product Management, Consulting' },
   { interest: 'Creativity + Business', path: 'B.Com + Digital Marketing', specialization: 'Brand Strategy, E-commerce' },
   { interest: 'Law + Commerce', path: 'B.Com + LLB', specialization: 'Corporate Law, Tax Law' },
 ];
 
 // Arts/Humanities Careers
 const artsCareers = [
   { career: 'Civil Services (IAS/IPS)', why: 'Prestige + Impact + Stability', salary: '₹10-20 LPA + perks', demand: 4 },
   { career: 'Corporate Lawyer', why: 'Businesses need legal protection', salary: '₹10-50 LPA', demand: 4 },
   { career: 'Content Creator/Writer', why: 'Content is king in digital age', salary: '₹5-30+ LPA', demand: 5 },
   { career: 'UX Researcher', why: 'Companies need to understand users', salary: '₹8-20 LPA', demand: 4 },
   { career: 'Policy Analyst', why: 'Govt & NGOs need policy experts', salary: '₹6-18 LPA', demand: 3 },
 ];
 
 const artsDigitalSkills = [
   { background: 'History/Political Science', addSkill: 'Data Analysis', newCareer: 'Policy Research Analyst' },
   { background: 'Economics', addSkill: 'Python + Statistics', newCareer: 'Economic Consultant' },
   { background: 'Geography', addSkill: 'GIS Software', newCareer: 'Urban Planner, Climate Analyst' },
   { background: 'Any Arts', addSkill: 'Video Editing', newCareer: 'YouTuber, Documentary Maker' },
 ];
 
 const artsCombinations = [
   { interest: 'Serving Nation', path: 'BA + UPSC Coaching', specialization: 'IAS, IPS, IFS' },
   { interest: 'Justice + Arguments', path: 'BA + LLB (5 years)', specialization: 'Cyber Law, IPR Law' },
   { interest: 'Writing + Creativity', path: 'BA + Mass Comm', specialization: 'Journalism, Content Strategy' },
   { interest: 'Understanding People', path: 'BA Psychology', specialization: 'Organizational Psychology, Counseling' },
 ];
 
 // Skills Data
 const nonNegotiableSkills = [
   { skill: 'English Communication', why: 'Interview, workplace success', how: 'Practice daily, YouTube', time: 'Ongoing' },
   { skill: 'Basic Excel', why: 'Every job needs this', how: 'Free YouTube courses', time: '2 weeks' },
   { skill: 'Digital Literacy', why: 'Work is digital now', how: 'Google Digital Garage', time: '1 week' },
   { skill: 'Presentation Skills', why: 'College + career need this', how: 'Practice, Toastmasters', time: 'Ongoing' },
 ];
 
 const highValueSkills = [
   { skill: 'AI Tools (ChatGPT, etc.)', relevantFor: 'All streams', free: 'YouTube, Coursera', paid: 'Google AI certificate' },
   { skill: 'Data Analytics', relevantFor: 'All streams', free: 'Khan Academy, Coursera', paid: 'Google Data Analytics' },
   { skill: 'Video Editing', relevantFor: 'Side income, marketing', free: 'CapCut, DaVinci tutorials', paid: '-' },
   { skill: 'Coding Basics', relevantFor: 'Science, Commerce', free: 'freeCodeCamp, Codecademy', paid: '-' },
 ];
 
 // Tamil Nadu Data
 const tnIndustries = [
   { industry: 'IT & Software', locations: 'Chennai, Coimbatore', salary: '₹4-8 LPA', bestGroups: '102, 302' },
   { industry: 'Automobile & EV', locations: 'Chennai, Hosur, Sriperumbudur', salary: '₹4-7 LPA', bestGroups: '101, 102' },
   { industry: 'Healthcare', locations: 'Chennai, Vellore, Madurai', salary: '₹3-12 LPA', bestGroups: '201-208' },
   { industry: 'Manufacturing', locations: 'Oragadam, Krishnagiri', salary: '₹3-6 LPA', bestGroups: '101, 102' },
   { industry: 'Banking & Finance', locations: 'All major cities', salary: '₹3-8 LPA', bestGroups: '301-308' },
   { industry: 'Education & EdTech', locations: 'Chennai, Coimbatore', salary: '₹3-6 LPA', bestGroups: 'All' },
   { industry: 'Government Jobs', locations: 'Across TN', salary: '₹4-8 LPA', bestGroups: 'All' },
 ];
 
 const tnSchemes = [
   { scheme: 'Pudhumai Penn', benefit: '₹1,000/month for college', eligibility: 'Govt school girls' },
   { scheme: 'Free Education', benefit: 'Free UG in Govt colleges', eligibility: 'All students' },
   { scheme: 'TANSEED', benefit: 'Up to ₹10 lakhs for startups', eligibility: 'Young entrepreneurs' },
   { scheme: 'Skill Development', benefit: 'Free technical courses', eligibility: 'All students' },
 ];
 
 // Quick Career Matcher
 const quickCareerMatcher = [
   { ifYouAre: 'Good at Maths + Logical', bestGroups: '101, 102', careers: 'Software Engineer, Data Scientist, CA' },
   { ifYouAre: 'Interested in Medicine', bestGroups: '201, 208', careers: 'Doctor, Pharmacist, Biotechnologist' },
   { ifYouAre: 'Business-minded', bestGroups: '302, 308', careers: 'Entrepreneur, CA, Marketing Manager' },
   { ifYouAre: 'Creative + Expressive', bestGroups: '404, 406', careers: 'Content Creator, Lawyer, Journalist' },
   { ifYouAre: 'Want Government Job', bestGroups: 'Any', careers: 'UPSC, TNPSC, Banking, Teaching' },
   { ifYouAre: 'Confused but Hardworking', bestGroups: '103, 304', careers: 'Keeps options open (Eng + Medical / Commerce + Civil Services)' },
 ];
 
 // Decision Framework
 const decisionQuestions = [
   { question: 'Do I like solving problems with numbers/logic?', ifYes: 'Engineering, Data Science, CA' },
   { question: 'Do I want to help people directly?', ifYes: 'Medicine, Nursing, Teaching, Law' },
   { question: 'Am I creative and like expressing ideas?', ifYes: 'Design, Content, Marketing, Arts' },
   { question: 'Do I want job security above all?', ifYes: 'Government jobs, CA, Medicine' },
   { question: 'Do I dream of starting my own business?', ifYes: 'BBA, B.Com, any stream + skills' },
   { question: 'Do I want to work abroad?', ifYes: 'Nursing, IT, Medicine' },
 ];
 
 const realityCheckQuestions = [
   { factor: 'Family Finances', question: 'Can we afford MBBS/Engineering fees? Need scholarship?' },
   { factor: 'Duration', question: 'Am I ready for 5+ years (MBBS) or want quick job (3 years)?' },
   { factor: 'Competition', question: 'Am I prepared for NEET/JEE level competition?' },
   { factor: 'Location', question: 'Willing to relocate or prefer hometown?' },
 ];
 
 // Key Takeaways
 const keyTakeaways = [
   "Choose based on interest + market demand - Don't follow crowd blindly",
   "Degree alone won't get you jobs - Skills and internships matter more",
   "AI won't take your job - But someone who knows AI might",
   "Start building skills NOW - Don't wait for college",
   "Keep options open - Choose groups that give flexibility (103, 302, 304)",
   "Mental health matters - Don't stress over 'perfect' choice. Many successful people changed careers!",
 ];
 
 const renderDemandBars = (demand: number) => {
   return (
     <div className="flex gap-1">
       {[1, 2, 3, 4, 5].map((i) => (
         <div 
           key={i} 
           className={`w-2 h-5 rounded-sm transition-colors ${
             i <= demand 
               ? 'bg-gradient-to-t from-amber-500 to-amber-400' 
               : 'bg-muted/40'
           }`}
         />
       ))}
     </div>
   );
 };
 
 const IndustryTrends = () => {
   const navigate = useNavigate();
   const { toast } = useToast();
   const [activeStream, setActiveStream] = useState('maths');
 
   const handleDownloadPDF = () => {
     toast({
       title: "PDF Download",
       description: "Career Trends PDF downloaded successfully!",
     });
   };
 
   return (
     <div className="min-h-screen bg-gradient-to-b from-muted/30 via-background to-muted/20">
       {/* Professional Hero Header */}
       <div className="relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-secondary" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.1),transparent_50%)]" />
         <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
         
         <div className="relative container mx-auto px-4 py-10">
           <div className="flex items-center justify-between mb-8">
             <Button 
               variant="ghost" 
               onClick={() => navigate(-1)} 
               className="text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm"
             >
               <ArrowLeft className="mr-2 h-4 w-4" />
               Back
             </Button>
             <Button 
               onClick={handleDownloadPDF} 
               className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
             >
               <Download className="mr-2 h-4 w-4" />
               Download Report
             </Button>
           </div>
           
           <div className="text-center space-y-4 max-w-3xl mx-auto pb-8">
             <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
               <Sparkles className="h-4 w-4 text-amber-300" />
               <span className="text-sm font-medium text-white/90">Career Intelligence Report</span>
             </div>
             
             <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
               Industry Trends & Insights
             </h1>
             <p className="text-lg text-amber-200/90 font-tamil">
               வகுப்பு 2026 - தொழில் போக்குகள் & நுண்ணறிவுகள்
             </p>
             
             <div className="inline-flex items-center gap-2 mt-6">
               <Badge className="bg-amber-500/20 text-amber-200 border-amber-400/30 text-sm py-1.5 px-4">
                 Class of 2026
               </Badge>
               <Badge className="bg-white/10 text-white/80 border-white/20 text-sm py-1.5 px-4">
                 Your Career Compass
               </Badge>
             </div>
           </div>
         </div>
       </div>
 
       <div className="container mx-auto px-4 py-12 space-y-16">
         {/* Why This Matters Section */}
         <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-amber-950/30 dark:to-orange-950/20">
           <CardContent className="p-8">
             <div className="flex items-start gap-4">
               <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/25">
                 <Target className="h-7 w-7 text-white" />
               </div>
               <div className="space-y-3">
                 <h3 className="text-xl font-bold text-foreground">Why This Matters For You</h3>
                 <p className="text-muted-foreground leading-relaxed">
                   You're passing out in <span className="font-semibold text-foreground">2026</span> and will enter the workforce around <span className="font-semibold text-foreground">2029-2030</span>. 
                   The career decisions you make <span className="font-semibold text-primary">NOW</span> will shape your next 10-15 years.
                 </p>
                 <p className="text-amber-700 dark:text-amber-400 font-tamil text-sm">
                   இப்போது எடுக்கும் முடிவுகள் அடுத்த 10-15 ஆண்டுகளை வடிவமைக்கும்.
                 </p>
               </div>
             </div>
           </CardContent>
         </Card>
 
         {/* Job Market Outlook 2026-2030 */}
         <section>
           <div className="text-center mb-8">
             <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
               <TrendingUp className="h-4 w-4 text-primary" />
               <span className="text-sm font-medium text-primary">Market Intelligence</span>
             </div>
             <h2 className="text-2xl md:text-3xl font-bold text-foreground">
               Job Market Outlook 2026-2030
             </h2>
           </div>
           
           <AttractiveTable 
             headers={['Factor', 'Current (2025)', 'When You Graduate (2029-30)']}
             headerColor="from-blue-500 to-indigo-500"
           >
             {jobMarketOutlook.map((row, idx) => (
               <TableRow key={idx} className="hover:bg-muted/20 transition-colors">
                 <TableCell className="font-semibold py-5 px-5">{row.factor}</TableCell>
                 <TableCell className="text-muted-foreground py-5 px-5">{row.current}</TableCell>
                 <TableCell className="py-5 px-5">
                   <SkillsBadge skills={row.future} color="blue" />
                 </TableCell>
               </TableRow>
             ))}
           </AttractiveTable>
         </section>
 
         {/* Stream-wise Career Guidance */}
         <section>
           <div className="text-center mb-8">
             <div className="inline-flex items-center gap-2 bg-secondary/10 rounded-full px-4 py-2 mb-4">
               <Briefcase className="h-4 w-4 text-secondary" />
               <span className="text-sm font-medium text-secondary">Career Pathways</span>
             </div>
             <h2 className="text-2xl md:text-3xl font-bold text-foreground">
               Career Paths by 12th Stream
             </h2>
             <p className="text-amber-600 dark:text-amber-400 mt-2 font-tamil">
               12-ஆம் வகுப்பு பிரிவின் அடிப்படையில் வாழ்க்கை பாதைகள்
             </p>
           </div>
 
           <Tabs value={activeStream} onValueChange={setActiveStream} className="w-full">
             <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 h-auto p-1.5 bg-muted/50 rounded-xl">
               <TabsTrigger value="maths" className="py-3 text-xs md:text-sm rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                 Science (Maths)
               </TabsTrigger>
               <TabsTrigger value="bio" className="py-3 text-xs md:text-sm rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                 Science (Biology)
               </TabsTrigger>
               <TabsTrigger value="commerce" className="py-3 text-xs md:text-sm rounded-lg data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                 Commerce
               </TabsTrigger>
               <TabsTrigger value="arts" className="py-3 text-xs md:text-sm rounded-lg data-[state=active]:bg-orange-600 data-[state=active]:text-white">
                 Arts/Humanities
               </TabsTrigger>
             </TabsList>
 
             {/* Science with Maths */}
             <TabsContent value="maths" className="space-y-8">
               <div>
                 <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                   <Sparkles className="h-5 w-5 text-amber-500" />
                   Top 5 Future-Proof Careers (Engineering/Tech Path)
                 </h4>
                 <AttractiveTable 
                   headers={['Career', 'Why Choose This', 'Salary by 2030', 'Demand']}
                   headerColor="from-blue-500 to-blue-600"
                 >
                   {scienceMathsCareers.map((c, idx) => (
                     <TableRow key={idx} className="hover:bg-blue-50/30 dark:hover:bg-blue-950/20">
                       <TableCell className="font-semibold py-4 px-5">{c.career}</TableCell>
                       <TableCell className="text-muted-foreground py-4 px-5">{c.why}</TableCell>
                       <TableCell className="py-4 px-5">
                         <SalaryBadge salary={c.salary} />
                       </TableCell>
                       <TableCell className="py-4 px-5">{renderDemandBars(c.demand)}</TableCell>
                     </TableRow>
                   ))}
                 </AttractiveTable>
               </div>
 
               <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/20 p-6 rounded-2xl border border-red-100 dark:border-red-900/50">
                 <h4 className="font-bold text-red-700 dark:text-red-400 flex items-center gap-2 mb-4">
                   <AlertTriangle className="h-5 w-5" />
                   Declining Fields (Avoid/Be Cautious)
                 </h4>
                 <ul className="space-y-3">
                   {scienceMathsDeclining.map((item, idx) => (
                     <li key={idx} className="flex items-center gap-3 text-red-800 dark:text-red-300 bg-white/50 dark:bg-red-950/30 p-3 rounded-lg">
                       <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center shrink-0">
                         <span className="text-sm">✕</span>
                       </div>
                       <span>{item}</span>
                     </li>
                   ))}
                 </ul>
               </div>
 
               <div>
                 <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                   <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                   Smart Combinations
                 </h4>
                 <div className="grid md:grid-cols-2 gap-4">
                   {scienceMathsCombinations.map((c, idx) => (
                     <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/20 p-5 rounded-xl border border-blue-100 dark:border-blue-900/50">
                       <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">{c.interest}</p>
                       <p className="text-sm text-muted-foreground mb-3">Path: {c.path}</p>
                       <SkillsBadge skills={c.specialization} color="blue" />
                     </div>
                   ))}
                 </div>
               </div>
             </TabsContent>
 
             {/* Science with Biology */}
             <TabsContent value="bio" className="space-y-8">
               <div>
                 <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                   <Sparkles className="h-5 w-5 text-amber-500" />
                   Top 5 Future-Proof Careers (Medical/Life Sciences Path)
                 </h4>
                 <AttractiveTable 
                   headers={['Career', 'Why Choose This', 'Salary by 2030', 'Demand']}
                   headerColor="from-emerald-500 to-teal-500"
                 >
                   {scienceBioCareers.map((c, idx) => (
                     <TableRow key={idx} className="hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20">
                       <TableCell className="font-semibold py-4 px-5">{c.career}</TableCell>
                       <TableCell className="text-muted-foreground py-4 px-5">{c.why}</TableCell>
                       <TableCell className="py-4 px-5">
                         <SalaryBadge salary={c.salary} />
                       </TableCell>
                       <TableCell className="py-4 px-5">{renderDemandBars(c.demand)}</TableCell>
                     </TableRow>
                   ))}
                 </AttractiveTable>
               </div>
 
               <div>
                 <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                   <Globe className="h-5 w-5 text-emerald-600" />
                   Global Opportunities
                 </h4>
                 <AttractiveTable 
                   headers={['Country', 'In-Demand Roles', 'Salary Range', 'Pathway']}
                   headerColor="from-teal-500 to-emerald-500"
                 >
                   {globalHealthcareOpportunities.map((o, idx) => (
                     <TableRow key={idx} className="hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20">
                       <TableCell className="font-semibold py-4 px-5">{o.country}</TableCell>
                       <TableCell className="py-4 px-5">{o.roles}</TableCell>
                       <TableCell className="py-4 px-5">
                         <SalaryBadge salary={o.salary} />
                       </TableCell>
                       <TableCell className="text-muted-foreground py-4 px-5">{o.pathway}</TableCell>
                     </TableRow>
                   ))}
                 </AttractiveTable>
               </div>
 
               <div>
                 <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                   <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                   Smart Combinations
                 </h4>
                 <div className="grid md:grid-cols-2 gap-4">
                   {scienceBioCombinations.map((c, idx) => (
                     <div key={idx} className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20 p-5 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                       <p className="font-semibold text-emerald-700 dark:text-emerald-400 mb-1">{c.interest}</p>
                       <p className="text-sm text-muted-foreground mb-3">Path: {c.path}</p>
                       <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                         {c.specialization}
                       </Badge>
                     </div>
                   ))}
                 </div>
               </div>
             </TabsContent>
 
             {/* Commerce */}
             <TabsContent value="commerce" className="space-y-8">
               <div>
                 <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                   <Sparkles className="h-5 w-5 text-amber-500" />
                   Top 5 Future-Proof Careers
                 </h4>
                 <AttractiveTable 
                   headers={['Career', 'Why Choose This', 'Salary by 2030', 'Demand']}
                   headerColor="from-purple-500 to-violet-500"
                 >
                   {commerceCareers.map((c, idx) => (
                     <TableRow key={idx} className="hover:bg-purple-50/30 dark:hover:bg-purple-950/20">
                       <TableCell className="font-semibold py-4 px-5">{c.career}</TableCell>
                       <TableCell className="text-muted-foreground py-4 px-5">{c.why}</TableCell>
                       <TableCell className="py-4 px-5">
                         <SalaryBadge salary={c.salary} />
                       </TableCell>
                       <TableCell className="py-4 px-5">{renderDemandBars(c.demand)}</TableCell>
                     </TableRow>
                   ))}
                 </AttractiveTable>
               </div>
 
               <div>
                 <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                   <Lightbulb className="h-5 w-5 text-purple-600" />
                   Commerce + Technology = Goldmine
                 </h4>
                 <AttractiveTable 
                   headers={['Traditional Role', '→', 'Future-Ready Version', 'Skills to Add']}
                   headerColor="from-violet-500 to-purple-500"
                 >
                   {commerceTechUpgrade.map((t, idx) => (
                     <TableRow key={idx} className="hover:bg-purple-50/30 dark:hover:bg-purple-950/20">
                       <TableCell className="text-muted-foreground py-4 px-5">{t.traditional}</TableCell>
                       <TableCell className="text-center text-primary font-bold py-4 px-5">→</TableCell>
                       <TableCell className="font-semibold text-purple-600 dark:text-purple-400 py-4 px-5">{t.futureReady}</TableCell>
                       <TableCell className="py-4 px-5">
                         <SkillsBadge skills={t.skills} color="purple" />
                       </TableCell>
                     </TableRow>
                   ))}
                 </AttractiveTable>
               </div>
 
               <div>
                 <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                   <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                   Smart Combinations
                 </h4>
                 <div className="grid md:grid-cols-2 gap-4">
                   {commerceCombinations.map((c, idx) => (
                     <div key={idx} className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/20 p-5 rounded-xl border border-purple-100 dark:border-purple-900/50">
                       <p className="font-semibold text-purple-700 dark:text-purple-400 mb-1">{c.interest}</p>
                       <p className="text-sm text-muted-foreground mb-3">Path: {c.path}</p>
                       <SkillsBadge skills={c.specialization} color="purple" />
                     </div>
                   ))}
                 </div>
               </div>
             </TabsContent>
 
             {/* Arts/Humanities */}
             <TabsContent value="arts" className="space-y-8">
               <div>
                 <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                   <Sparkles className="h-5 w-5 text-amber-500" />
                   Top 5 Future-Proof Careers
                 </h4>
                 <AttractiveTable 
                   headers={['Career', 'Why Choose This', 'Salary by 2030', 'Demand']}
                   headerColor="from-orange-500 to-amber-500"
                 >
                   {artsCareers.map((c, idx) => (
                     <TableRow key={idx} className="hover:bg-orange-50/30 dark:hover:bg-orange-950/20">
                       <TableCell className="font-semibold py-4 px-5">{c.career}</TableCell>
                       <TableCell className="text-muted-foreground py-4 px-5">{c.why}</TableCell>
                       <TableCell className="py-4 px-5">
                         <SalaryBadge salary={c.salary} />
                       </TableCell>
                       <TableCell className="py-4 px-5">{renderDemandBars(c.demand)}</TableCell>
                     </TableRow>
                   ))}
                 </AttractiveTable>
               </div>
 
               <div>
                 <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                   <Target className="h-5 w-5 text-orange-600" />
                   Arts + Digital Skills = Powerful
                 </h4>
                 <AttractiveTable 
                   headers={['Arts Background', 'Add This Skill', 'New Career Option']}
                   headerColor="from-amber-500 to-orange-500"
                 >
                   {artsDigitalSkills.map((s, idx) => (
                     <TableRow key={idx} className="hover:bg-orange-50/30 dark:hover:bg-orange-950/20">
                       <TableCell className="font-semibold py-4 px-5">{s.background}</TableCell>
                       <TableCell className="py-4 px-5">
                         <SkillsBadge skills={s.addSkill} color="orange" />
                       </TableCell>
                       <TableCell className="font-semibold text-orange-600 dark:text-orange-400 py-4 px-5">{s.newCareer}</TableCell>
                     </TableRow>
                   ))}
                 </AttractiveTable>
               </div>
 
               <div>
                 <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                   <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                   Smart Combinations
                 </h4>
                 <div className="grid md:grid-cols-2 gap-4">
                   {artsCombinations.map((c, idx) => (
                     <div key={idx} className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/20 p-5 rounded-xl border border-orange-100 dark:border-orange-900/50">
                       <p className="font-semibold text-orange-700 dark:text-orange-400 mb-1">{c.interest}</p>
                       <p className="text-sm text-muted-foreground mb-3">Path: {c.path}</p>
                       <SkillsBadge skills={c.specialization} color="orange" />
                     </div>
                   ))}
                 </div>
               </div>
             </TabsContent>
           </Tabs>
         </section>
 
         {/* Skills Section */}
         <section>
           <div className="text-center mb-8">
             <div className="inline-flex items-center gap-2 bg-amber-500/10 rounded-full px-4 py-2 mb-4">
               <Award className="h-4 w-4 text-amber-600" />
               <span className="text-sm font-medium text-amber-700 dark:text-amber-400">Essential Skills</span>
             </div>
             <h2 className="text-2xl md:text-3xl font-bold text-foreground">
               Skills Every 2026 Graduate Must Have
             </h2>
             <p className="text-amber-600 dark:text-amber-400 mt-2 font-tamil">
               2026 பட்டதாரி ஒவ்வொருவரும் கற்றுக்கொள்ள வேண்டிய திறன்கள்
             </p>
           </div>
 
           <div className="grid md:grid-cols-2 gap-6">
             <AttractiveTable 
               title="Non-Negotiable Skills (Learn Before College)"
               headers={['Skill', 'Why Essential', 'How to Learn', 'Time']}
               headerColor="from-rose-400 to-rose-500"
             >
               {nonNegotiableSkills.map((s, idx) => (
                 <TableRow key={idx} className="hover:bg-rose-50/30 dark:hover:bg-rose-950/20">
                   <TableCell className="font-semibold py-4 px-5">{s.skill}</TableCell>
                   <TableCell className="text-muted-foreground text-sm py-4 px-5">{s.why}</TableCell>
                   <TableCell className="text-sm py-4 px-5">{s.how}</TableCell>
                   <TableCell className="py-4 px-5">
                     <TimeBadge time={s.time} />
                   </TableCell>
                 </TableRow>
               ))}
             </AttractiveTable>
 
             <AttractiveTable 
               title="High-Value Skills (Learn During College)"
               headers={['Skill', 'Relevant For', 'Free Resources', 'Paid']}
               headerColor="from-emerald-400 to-emerald-500"
             >
               {highValueSkills.map((s, idx) => (
                 <TableRow key={idx} className="hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20">
                   <TableCell className="font-semibold py-4 px-5">{s.skill}</TableCell>
                   <TableCell className="text-sm py-4 px-5">{s.relevantFor}</TableCell>
                   <TableCell className="text-muted-foreground text-sm py-4 px-5">{s.free}</TableCell>
                   <TableCell className="text-sm py-4 px-5">{s.paid}</TableCell>
                 </TableRow>
               ))}
             </AttractiveTable>
           </div>
         </section>
 
         {/* Tamil Nadu Opportunities */}
         <section>
           <div className="text-center mb-8">
             <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
               <MapPin className="h-4 w-4 text-primary" />
               <span className="text-sm font-medium text-primary">Local Opportunities</span>
             </div>
             <h2 className="text-2xl md:text-3xl font-bold text-foreground">
               Tamil Nadu Opportunities for Class of 2026
             </h2>
             <p className="text-amber-600 dark:text-amber-400 mt-2 font-tamil">
               2026 வகுப்புக்கான தமிழ்நாடு வாய்ப்புகள்
             </p>
           </div>
 
           <div className="grid md:grid-cols-2 gap-6">
             <AttractiveTable 
               title="Top Industries Hiring in TN (2026-2030)"
               headers={['Industry', 'Locations', 'Starting Salary', 'Best Groups']}
               headerColor="from-primary to-secondary"
             >
               {tnIndustries.map((ind, idx) => (
                 <TableRow key={idx} className="hover:bg-muted/20">
                   <TableCell className="font-semibold py-4 px-5">{ind.industry}</TableCell>
                   <TableCell className="text-muted-foreground text-sm py-4 px-5">{ind.locations}</TableCell>
                   <TableCell className="py-4 px-5">
                     <SalaryBadge salary={ind.salary} />
                   </TableCell>
                   <TableCell className="py-4 px-5">
                     <GroupsBadge groups={ind.bestGroups} />
                   </TableCell>
                 </TableRow>
               ))}
             </AttractiveTable>
 
             <Card className="border-0 shadow-lg overflow-hidden">
               <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                 <CardTitle className="text-lg flex items-center gap-2">
                   <Award className="h-5 w-5" />
                   Tamil Nadu Government Schemes for Students
                 </CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="space-y-4 p-2">
                   {tnSchemes.map((scheme, idx) => (
                     <div key={idx} className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 rounded-xl border border-amber-100 dark:border-amber-900/50">
                       <p className="font-bold text-foreground">{scheme.scheme}</p>
                       <p className="text-primary font-medium mt-1">{scheme.benefit}</p>
                       <p className="text-xs text-muted-foreground mt-2">Eligibility: {scheme.eligibility}</p>
                     </div>
                   ))}
                 </div>
               </CardContent>
             </Card>
           </div>
         </section>
 
         {/* Quick Career Matcher */}
         <section>
           <div className="text-center mb-8">
             <div className="inline-flex items-center gap-2 bg-purple-500/10 rounded-full px-4 py-2 mb-4">
               <Sparkles className="h-4 w-4 text-purple-600" />
               <span className="text-sm font-medium text-purple-700 dark:text-purple-400">Quick Match</span>
             </div>
             <h2 className="text-2xl md:text-3xl font-bold text-foreground">
               Quick Career Matcher
             </h2>
           </div>
           
           <AttractiveTable 
             headers={['If You Are...', 'Best Groups', 'Top 3 Careers to Explore']}
             headerColor="from-purple-500 to-violet-500"
           >
             {quickCareerMatcher.map((row, idx) => (
               <TableRow key={idx} className="hover:bg-purple-50/30 dark:hover:bg-purple-950/20">
                 <TableCell className="font-semibold py-4 px-5">{row.ifYouAre}</TableCell>
                 <TableCell className="py-4 px-5">
                   <SkillsBadge skills={row.bestGroups} color="purple" />
                 </TableCell>
                 <TableCell className="text-primary font-medium py-4 px-5">{row.careers}</TableCell>
               </TableRow>
             ))}
           </AttractiveTable>
         </section>
 
         {/* Decision Framework */}
         <section>
           <div className="text-center mb-8">
             <div className="inline-flex items-center gap-2 bg-amber-500/10 rounded-full px-4 py-2 mb-4">
               <Lightbulb className="h-4 w-4 text-amber-600" />
               <span className="text-sm font-medium text-amber-700 dark:text-amber-400">Decision Framework</span>
             </div>
             <h2 className="text-2xl md:text-3xl font-bold text-foreground">
               How to Choose Your Career
             </h2>
           </div>
 
           <div className="grid md:grid-cols-2 gap-6">
             <Card className="border-0 shadow-lg">
               <CardHeader className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/20 border-b">
                 <CardTitle className="text-blue-700 dark:text-blue-400">Step 1: Know Yourself</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="space-y-3 p-2">
                   {decisionQuestions.map((q, idx) => (
                     <div key={idx} className="p-4 bg-muted/30 rounded-xl border">
                       <p className="font-medium text-sm">{q.question}</p>
                       <p className="text-primary text-sm mt-1">If Yes → {q.ifYes}</p>
                     </div>
                   ))}
                 </div>
               </CardContent>
             </Card>
 
             <Card className="border-0 shadow-lg">
               <CardHeader className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 border-b">
                 <CardTitle className="text-amber-700 dark:text-amber-400">Step 2: Reality Check</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="space-y-3 p-2">
                   {realityCheckQuestions.map((q, idx) => (
                     <div key={idx} className="p-4 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-amber-100 dark:border-amber-900/50">
                       <p className="font-semibold text-amber-700 dark:text-amber-400">{q.factor}</p>
                       <p className="text-sm text-muted-foreground">{q.question}</p>
                     </div>
                   ))}
                 </div>
               </CardContent>
             </Card>
           </div>
 
           <Card className="mt-6 border-0 shadow-lg">
             <CardHeader className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20 border-b">
               <CardTitle className="text-emerald-700 dark:text-emerald-400">Step 3: Future-Proof Your Choice</CardTitle>
             </CardHeader>
             <CardContent className="p-6">
               <p className="mb-4">Whatever you choose, add:</p>
               <div className="flex flex-wrap gap-3">
                 <Badge className="text-sm py-2.5 px-5 bg-emerald-100 text-emerald-700 border-emerald-200">
                   <CheckCircle2 className="w-4 h-4 mr-2" />
                   Digital skills
                 </Badge>
                 <Badge className="text-sm py-2.5 px-5 bg-blue-100 text-blue-700 border-blue-200">
                   <CheckCircle2 className="w-4 h-4 mr-2" />
                   Communication skills
                 </Badge>
                 <Badge className="text-sm py-2.5 px-5 bg-purple-100 text-purple-700 border-purple-200">
                   <CheckCircle2 className="w-4 h-4 mr-2" />
                   One technical certification
                 </Badge>
                 <Badge className="text-sm py-2.5 px-5 bg-amber-100 text-amber-700 border-amber-200">
                   <CheckCircle2 className="w-4 h-4 mr-2" />
                   Internship experience
                 </Badge>
               </div>
             </CardContent>
           </Card>
         </section>
 
         {/* Key Takeaways */}
         <section>
           <Card className="border-0 shadow-xl bg-gradient-to-br from-primary/5 via-background to-amber-500/5 overflow-hidden">
             <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white text-center">
               <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
                 <CheckCircle2 className="h-7 w-7" />
                 Key Takeaways for 2026 Batch
               </h2>
             </div>
             <CardContent className="p-8">
               <div className="grid md:grid-cols-2 gap-4">
                 {keyTakeaways.map((takeaway, idx) => (
                   <div key={idx} className="flex items-start gap-4 p-5 bg-white dark:bg-card rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                     <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                       <span className="text-primary font-bold">{idx + 1}</span>
                     </div>
                     <p className="font-medium text-foreground">{takeaway}</p>
                   </div>
                 ))}
               </div>
             </CardContent>
           </Card>
         </section>
 
       </div>
     </div>
   );
 };
 
 export default IndustryTrends;