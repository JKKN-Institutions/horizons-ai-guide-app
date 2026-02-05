 import { useState } from 'react';
 import { useNavigate } from 'react-router-dom';
 import { ArrowLeft, Download, TrendingUp, Target, GraduationCap, Globe, Lightbulb, CheckCircle2, AlertTriangle, MapPin, Award } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Badge } from '@/components/ui/badge';
 import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
 import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
 import { useToast } from '@/hooks/use-toast';
 
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
     <div className="flex gap-0.5">
       {[1, 2, 3, 4, 5].map((i) => (
         <span key={i} className={i <= demand ? 'text-orange-500' : 'text-muted-foreground/30'}>🔥</span>
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
     <div className="min-h-screen bg-background">
       {/* Hero Header */}
       <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-8 px-4">
         <div className="container mx-auto">
           <div className="flex items-center justify-between mb-6">
             <Button variant="ghost" onClick={() => navigate(-1)} className="text-primary-foreground hover:bg-primary-foreground/10">
               <ArrowLeft className="mr-2 h-4 w-4" />
               Back
             </Button>
             <Button onClick={handleDownloadPDF} className="bg-amber-500 hover:bg-amber-600 text-white">
               <Download className="mr-2 h-4 w-4" />
               Download PDF
             </Button>
           </div>
           
           <div className="text-center space-y-3">
             <h1 className="text-3xl md:text-4xl font-bold">
               📊 Industry Trends & Insights | Class of 2026
             </h1>
             <p className="text-lg text-amber-300 font-medium">
               வகுப்பு 2026 - தொழில் போக்குகள் & நுண்ணறிவுகள்
             </p>
             <p className="text-xl text-primary-foreground/90 font-semibold mt-4">
               Your Career Compass for the Next Decade
             </p>
             <p className="text-amber-300/80">
               அடுத்த தசாப்தத்திற்கான உங்கள் வாழ்க்கை திசைகாட்டி
             </p>
           </div>
         </div>
       </div>
 
       <div className="container mx-auto px-4 py-8 space-y-12">
         {/* Why This Matters Section */}
         <Card className="border-l-4 border-l-amber-500 bg-amber-50/50 dark:bg-amber-950/20">
           <CardHeader>
             <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
               <Target className="h-6 w-6" />
               🎯 WHY THIS MATTERS FOR YOU
             </CardTitle>
           </CardHeader>
           <CardContent>
             <p className="text-lg">
               You're passing out in <strong>2026</strong> and will enter the workforce around <strong>2029-2030</strong>. 
               The career decisions you make <strong>NOW</strong> will shape your next 10-15 years. 
               Here's what the job market will look like when you graduate.
             </p>
             <p className="text-amber-600 dark:text-amber-400 mt-2 font-medium">
               நீங்கள் 2026-ல் படிப்பை முடித்து 2029-30 வாக்கில் வேலை சந்தையில் நுழைவீர்கள். இப்போது எடுக்கும் முடிவுகள் அடுத்த 10-15 ஆண்டுகளை வடிவமைக்கும்.
             </p>
           </CardContent>
         </Card>
 
         {/* Job Market Outlook 2026-2030 */}
         <section>
           <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
             <TrendingUp className="h-8 w-8 text-primary" />
             🔮 JOB MARKET OUTLOOK 2026-2030
           </h2>
           <Card>
             <CardContent className="p-0 overflow-x-auto">
               <table className="w-full">
                 <thead className="bg-primary/10">
                   <tr>
                     <th className="text-left p-4 font-semibold">Factor</th>
                     <th className="text-left p-4 font-semibold">Current (2025)</th>
                     <th className="text-left p-4 font-semibold">When You Graduate (2029-30)</th>
                   </tr>
                 </thead>
                 <tbody>
                   {jobMarketOutlook.map((row, idx) => (
                     <tr key={idx} className="border-b last:border-b-0 hover:bg-muted/50 transition-colors">
                       <td className="p-4 font-medium">{row.factor}</td>
                       <td className="p-4 text-muted-foreground">{row.current}</td>
                       <td className="p-4 text-primary font-semibold">{row.future}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </CardContent>
           </Card>
         </section>
 
         {/* Stream-wise Career Guidance */}
         <section>
           <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
             🔬 CAREER PATHS BY 12TH STREAM
           </h2>
           <p className="text-center text-amber-600 dark:text-amber-400 mb-6 font-medium">
             12-ஆம் வகுப்பு பிரிவின் அடிப்படையில் வாழ்க்கை பாதைகள்
           </p>
 
           <Tabs value={activeStream} onValueChange={setActiveStream} className="w-full">
             <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
               <TabsTrigger value="maths" className="text-xs md:text-sm">🔢 Science (Maths)</TabsTrigger>
               <TabsTrigger value="bio" className="text-xs md:text-sm">🧬 Science (Biology)</TabsTrigger>
               <TabsTrigger value="commerce" className="text-xs md:text-sm">💼 Commerce</TabsTrigger>
               <TabsTrigger value="arts" className="text-xs md:text-sm">📚 Arts/Humanities</TabsTrigger>
             </TabsList>
 
             {/* Science with Maths */}
             <TabsContent value="maths">
               <div className="space-y-6">
                 <Card className="border-l-4 border-l-blue-500">
                   <CardHeader>
                     <CardTitle className="text-blue-600">With Maths (Groups 101-106) → Engineering/Tech Path</CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-6">
                     <div>
                       <h4 className="font-bold text-lg mb-4">🌟 TOP 5 FUTURE-PROOF CAREERS</h4>
                       <div className="overflow-x-auto">
                         <table className="w-full text-sm">
                           <thead className="bg-blue-50 dark:bg-blue-950/30">
                             <tr>
                               <th className="text-left p-3">Career</th>
                               <th className="text-left p-3">Why Choose This</th>
                               <th className="text-left p-3">Salary by 2030</th>
                               <th className="text-left p-3">Demand Level</th>
                             </tr>
                           </thead>
                           <tbody>
                             {scienceMathsCareers.map((c, idx) => (
                               <tr key={idx} className="border-b">
                                 <td className="p-3 font-medium">{c.career}</td>
                                 <td className="p-3 text-muted-foreground">{c.why}</td>
                                 <td className="p-3 text-primary font-semibold">{c.salary}</td>
                                 <td className="p-3">{renderDemandBars(c.demand)}</td>
                               </tr>
                             ))}
                           </tbody>
                         </table>
                       </div>
                     </div>
 
                     <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                       <h4 className="font-bold text-red-600 dark:text-red-400 flex items-center gap-2 mb-3">
                         <AlertTriangle className="h-5 w-5" />
                         ⚠️ DECLINING FIELDS (Avoid/Be Cautious)
                       </h4>
                       <ul className="space-y-2">
                         {scienceMathsDeclining.map((item, idx) => (
                           <li key={idx} className="flex items-center gap-2 text-red-700 dark:text-red-300">
                             <span>❌</span> {item}
                           </li>
                         ))}
                       </ul>
                     </div>
 
                     <div>
                       <h4 className="font-bold text-lg mb-4">✅ SMART COMBINATIONS</h4>
                       <div className="grid md:grid-cols-2 gap-4">
                         {scienceMathsCombinations.map((c, idx) => (
                           <Card key={idx} className="bg-blue-50/50 dark:bg-blue-950/20">
                             <CardContent className="p-4">
                               <p className="font-semibold text-blue-700 dark:text-blue-400">{c.interest}</p>
                               <p className="text-sm text-muted-foreground">Path: {c.path}</p>
                               <Badge variant="outline" className="mt-2">{c.specialization}</Badge>
                             </CardContent>
                           </Card>
                         ))}
                       </div>
                     </div>
                   </CardContent>
                 </Card>
               </div>
             </TabsContent>
 
             {/* Science with Biology */}
             <TabsContent value="bio">
               <div className="space-y-6">
                 <Card className="border-l-4 border-l-green-500">
                   <CardHeader>
                     <CardTitle className="text-green-600">With Biology (Groups 201-208) → Medical/Life Sciences Path</CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-6">
                     <div>
                       <h4 className="font-bold text-lg mb-4">🌟 TOP 5 FUTURE-PROOF CAREERS</h4>
                       <div className="overflow-x-auto">
                         <table className="w-full text-sm">
                           <thead className="bg-green-50 dark:bg-green-950/30">
                             <tr>
                               <th className="text-left p-3">Career</th>
                               <th className="text-left p-3">Why Choose This</th>
                               <th className="text-left p-3">Salary by 2030</th>
                               <th className="text-left p-3">Demand Level</th>
                             </tr>
                           </thead>
                           <tbody>
                             {scienceBioCareers.map((c, idx) => (
                               <tr key={idx} className="border-b">
                                 <td className="p-3 font-medium">{c.career}</td>
                                 <td className="p-3 text-muted-foreground">{c.why}</td>
                                 <td className="p-3 text-primary font-semibold">{c.salary}</td>
                                 <td className="p-3">{renderDemandBars(c.demand)}</td>
                               </tr>
                             ))}
                           </tbody>
                         </table>
                       </div>
                     </div>
 
                     <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                       <h4 className="font-bold text-green-700 dark:text-green-400 flex items-center gap-2 mb-3">
                         <Globe className="h-5 w-5" />
                         🌍 GLOBAL OPPORTUNITIES
                       </h4>
                       <div className="overflow-x-auto">
                         <table className="w-full text-sm">
                           <thead>
                             <tr className="border-b">
                               <th className="text-left p-2">Country</th>
                               <th className="text-left p-2">In-Demand Roles</th>
                               <th className="text-left p-2">Salary Range</th>
                               <th className="text-left p-2">Pathway</th>
                             </tr>
                           </thead>
                           <tbody>
                             {globalHealthcareOpportunities.map((o, idx) => (
                               <tr key={idx} className="border-b">
                                 <td className="p-2 font-medium">{o.country}</td>
                                 <td className="p-2">{o.roles}</td>
                                 <td className="p-2 text-green-600">{o.salary}</td>
                                 <td className="p-2 text-muted-foreground">{o.pathway}</td>
                               </tr>
                             ))}
                           </tbody>
                         </table>
                       </div>
                     </div>
 
                     <div>
                       <h4 className="font-bold text-lg mb-4">✅ SMART COMBINATIONS</h4>
                       <div className="grid md:grid-cols-2 gap-4">
                         {scienceBioCombinations.map((c, idx) => (
                           <Card key={idx} className="bg-green-50/50 dark:bg-green-950/20">
                             <CardContent className="p-4">
                               <p className="font-semibold text-green-700 dark:text-green-400">{c.interest}</p>
                               <p className="text-sm text-muted-foreground">Path: {c.path}</p>
                               <Badge variant="outline" className="mt-2">{c.specialization}</Badge>
                             </CardContent>
                           </Card>
                         ))}
                       </div>
                     </div>
                   </CardContent>
                 </Card>
               </div>
             </TabsContent>
 
             {/* Commerce */}
             <TabsContent value="commerce">
               <div className="space-y-6">
                 <Card className="border-l-4 border-l-purple-500">
                   <CardHeader>
                     <CardTitle className="text-purple-600">💼 IF YOU'RE CHOOSING COMMERCE (300 Series)</CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-6">
                     <div>
                       <h4 className="font-bold text-lg mb-4">🌟 TOP 5 FUTURE-PROOF CAREERS</h4>
                       <div className="overflow-x-auto">
                         <table className="w-full text-sm">
                           <thead className="bg-purple-50 dark:bg-purple-950/30">
                             <tr>
                               <th className="text-left p-3">Career</th>
                               <th className="text-left p-3">Why Choose This</th>
                               <th className="text-left p-3">Salary by 2030</th>
                               <th className="text-left p-3">Demand Level</th>
                             </tr>
                           </thead>
                           <tbody>
                             {commerceCareers.map((c, idx) => (
                               <tr key={idx} className="border-b">
                                 <td className="p-3 font-medium">{c.career}</td>
                                 <td className="p-3 text-muted-foreground">{c.why}</td>
                                 <td className="p-3 text-primary font-semibold">{c.salary}</td>
                                 <td className="p-3">{renderDemandBars(c.demand)}</td>
                               </tr>
                             ))}
                           </tbody>
                         </table>
                       </div>
                     </div>
 
                     <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                       <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-3">
                         💡 COMMERCE + TECHNOLOGY = GOLDMINE
                       </h4>
                       <div className="overflow-x-auto">
                         <table className="w-full text-sm">
                           <thead>
                             <tr className="border-b">
                               <th className="text-left p-2">Traditional Role</th>
                               <th className="text-left p-2">→</th>
                               <th className="text-left p-2">Future-Ready Version</th>
                               <th className="text-left p-2">Skills to Add</th>
                             </tr>
                           </thead>
                           <tbody>
                             {commerceTechUpgrade.map((t, idx) => (
                               <tr key={idx} className="border-b">
                                 <td className="p-2 text-muted-foreground">{t.traditional}</td>
                                 <td className="p-2">→</td>
                                 <td className="p-2 font-medium text-purple-600">{t.futureReady}</td>
                                 <td className="p-2"><Badge variant="secondary">{t.skills}</Badge></td>
                               </tr>
                             ))}
                           </tbody>
                         </table>
                       </div>
                     </div>
 
                     <div>
                       <h4 className="font-bold text-lg mb-4">✅ SMART COMBINATIONS</h4>
                       <div className="grid md:grid-cols-2 gap-4">
                         {commerceCombinations.map((c, idx) => (
                           <Card key={idx} className="bg-purple-50/50 dark:bg-purple-950/20">
                             <CardContent className="p-4">
                               <p className="font-semibold text-purple-700 dark:text-purple-400">{c.interest}</p>
                               <p className="text-sm text-muted-foreground">Path: {c.path}</p>
                               <Badge variant="outline" className="mt-2">{c.specialization}</Badge>
                             </CardContent>
                           </Card>
                         ))}
                       </div>
                     </div>
                   </CardContent>
                 </Card>
               </div>
             </TabsContent>
 
             {/* Arts/Humanities */}
             <TabsContent value="arts">
               <div className="space-y-6">
                 <Card className="border-l-4 border-l-orange-500">
                   <CardHeader>
                     <CardTitle className="text-orange-600">📚 IF YOU'RE CHOOSING ARTS/HUMANITIES (400 Series)</CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-6">
                     <div>
                       <h4 className="font-bold text-lg mb-4">🌟 TOP 5 FUTURE-PROOF CAREERS</h4>
                       <div className="overflow-x-auto">
                         <table className="w-full text-sm">
                           <thead className="bg-orange-50 dark:bg-orange-950/30">
                             <tr>
                               <th className="text-left p-3">Career</th>
                               <th className="text-left p-3">Why Choose This</th>
                               <th className="text-left p-3">Salary by 2030</th>
                               <th className="text-left p-3">Demand Level</th>
                             </tr>
                           </thead>
                           <tbody>
                             {artsCareers.map((c, idx) => (
                               <tr key={idx} className="border-b">
                                 <td className="p-3 font-medium">{c.career}</td>
                                 <td className="p-3 text-muted-foreground">{c.why}</td>
                                 <td className="p-3 text-primary font-semibold">{c.salary}</td>
                                 <td className="p-3">{renderDemandBars(c.demand)}</td>
                               </tr>
                             ))}
                           </tbody>
                         </table>
                       </div>
                     </div>
 
                     <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                       <h4 className="font-bold text-orange-700 dark:text-orange-400 mb-3">
                         🎯 ARTS + DIGITAL SKILLS = POWERFUL
                       </h4>
                       <div className="overflow-x-auto">
                         <table className="w-full text-sm">
                           <thead>
                             <tr className="border-b">
                               <th className="text-left p-2">Arts Background</th>
                               <th className="text-left p-2">Add This Skill</th>
                               <th className="text-left p-2">New Career Option</th>
                             </tr>
                           </thead>
                           <tbody>
                             {artsDigitalSkills.map((s, idx) => (
                               <tr key={idx} className="border-b">
                                 <td className="p-2">{s.background}</td>
                                 <td className="p-2"><Badge variant="secondary">{s.addSkill}</Badge></td>
                                 <td className="p-2 font-medium text-orange-600">{s.newCareer}</td>
                               </tr>
                             ))}
                           </tbody>
                         </table>
                       </div>
                     </div>
 
                     <div>
                       <h4 className="font-bold text-lg mb-4">✅ SMART COMBINATIONS</h4>
                       <div className="grid md:grid-cols-2 gap-4">
                         {artsCombinations.map((c, idx) => (
                           <Card key={idx} className="bg-orange-50/50 dark:bg-orange-950/20">
                             <CardContent className="p-4">
                               <p className="font-semibold text-orange-700 dark:text-orange-400">{c.interest}</p>
                               <p className="text-sm text-muted-foreground">Path: {c.path}</p>
                               <Badge variant="outline" className="mt-2">{c.specialization}</Badge>
                             </CardContent>
                           </Card>
                         ))}
                       </div>
                     </div>
                   </CardContent>
                 </Card>
               </div>
             </TabsContent>
           </Tabs>
         </section>
 
         {/* Skills Section */}
         <section>
           <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
             <Award className="h-8 w-8 text-primary" />
             🏆 SKILLS EVERY 2026 GRADUATE MUST HAVE
           </h2>
           <p className="text-center text-amber-600 dark:text-amber-400 mb-6 font-medium">
             2026 பட்டதாரி ஒவ்வொருவரும் கற்றுக்கொள்ள வேண்டிய திறன்கள்
           </p>
 
           <div className="grid md:grid-cols-2 gap-6">
             <Card>
               <CardHeader>
                 <CardTitle className="text-red-600">Non-Negotiable Skills (Learn Before College)</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="overflow-x-auto">
                   <table className="w-full text-sm">
                     <thead className="bg-red-50 dark:bg-red-950/30">
                       <tr>
                         <th className="text-left p-2">Skill</th>
                         <th className="text-left p-2">Why Essential</th>
                         <th className="text-left p-2">How to Learn</th>
                         <th className="text-left p-2">Time</th>
                       </tr>
                     </thead>
                     <tbody>
                       {nonNegotiableSkills.map((s, idx) => (
                         <tr key={idx} className="border-b">
                           <td className="p-2 font-medium">{s.skill}</td>
                           <td className="p-2 text-muted-foreground">{s.why}</td>
                           <td className="p-2">{s.how}</td>
                           <td className="p-2"><Badge variant="outline">{s.time}</Badge></td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               </CardContent>
             </Card>
 
             <Card>
               <CardHeader>
                 <CardTitle className="text-green-600">High-Value Skills (Learn During College)</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="overflow-x-auto">
                   <table className="w-full text-sm">
                     <thead className="bg-green-50 dark:bg-green-950/30">
                       <tr>
                         <th className="text-left p-2">Skill</th>
                         <th className="text-left p-2">Relevant For</th>
                         <th className="text-left p-2">Free Resources</th>
                         <th className="text-left p-2">Paid Certifications</th>
                       </tr>
                     </thead>
                     <tbody>
                       {highValueSkills.map((s, idx) => (
                         <tr key={idx} className="border-b">
                           <td className="p-2 font-medium">{s.skill}</td>
                           <td className="p-2">{s.relevantFor}</td>
                           <td className="p-2 text-muted-foreground">{s.free}</td>
                           <td className="p-2">{s.paid}</td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               </CardContent>
             </Card>
           </div>
         </section>
 
         {/* Tamil Nadu Opportunities */}
         <section>
           <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
             <MapPin className="h-8 w-8 text-primary" />
             📍 TAMIL NADU OPPORTUNITIES FOR CLASS OF 2026
           </h2>
           <p className="text-center text-amber-600 dark:text-amber-400 mb-6 font-medium">
             2026 வகுப்புக்கான தமிழ்நாடு வாய்ப்புகள்
           </p>
 
           <div className="grid md:grid-cols-2 gap-6">
             <Card>
               <CardHeader>
                 <CardTitle>Top Industries Hiring in TN (2026-2030)</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="overflow-x-auto">
                   <table className="w-full text-sm">
                     <thead className="bg-primary/10">
                       <tr>
                         <th className="text-left p-2">Industry</th>
                         <th className="text-left p-2">Locations</th>
                         <th className="text-left p-2">Starting Salary</th>
                         <th className="text-left p-2">Best Groups</th>
                       </tr>
                     </thead>
                     <tbody>
                       {tnIndustries.map((ind, idx) => (
                         <tr key={idx} className="border-b">
                           <td className="p-2 font-medium">{ind.industry}</td>
                           <td className="p-2 text-muted-foreground">{ind.locations}</td>
                           <td className="p-2 text-primary">{ind.salary}</td>
                           <td className="p-2"><Badge variant="outline">{ind.bestGroups}</Badge></td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               </CardContent>
             </Card>
 
             <Card>
               <CardHeader>
                 <CardTitle>Tamil Nadu Government Schemes for Students</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="space-y-4">
                   {tnSchemes.map((scheme, idx) => (
                     <div key={idx} className="p-3 bg-muted/50 rounded-lg">
                       <p className="font-semibold text-primary">{scheme.scheme}</p>
                       <p className="text-sm">{scheme.benefit}</p>
                       <p className="text-xs text-muted-foreground">Eligibility: {scheme.eligibility}</p>
                     </div>
                   ))}
                 </div>
               </CardContent>
             </Card>
           </div>
         </section>
 
         {/* Quick Career Matcher */}
         <section>
           <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
             ⚡ QUICK CAREER MATCHER
           </h2>
           <Card>
             <CardContent className="p-0 overflow-x-auto">
               <table className="w-full">
                 <thead className="bg-primary/10">
                   <tr>
                     <th className="text-left p-4 font-semibold">If You Are...</th>
                     <th className="text-left p-4 font-semibold">Best Groups</th>
                     <th className="text-left p-4 font-semibold">Top 3 Careers to Explore</th>
                   </tr>
                 </thead>
                 <tbody>
                   {quickCareerMatcher.map((row, idx) => (
                     <tr key={idx} className="border-b last:border-b-0 hover:bg-muted/50 transition-colors">
                       <td className="p-4 font-medium">{row.ifYouAre}</td>
                       <td className="p-4"><Badge>{row.bestGroups}</Badge></td>
                       <td className="p-4 text-primary">{row.careers}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </CardContent>
           </Card>
         </section>
 
         {/* Decision Framework */}
         <section>
           <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
             <Lightbulb className="h-8 w-8 text-amber-500" />
             🤔 HOW TO CHOOSE YOUR CAREER (Decision Framework)
           </h2>
 
           <div className="grid md:grid-cols-2 gap-6">
             <Card>
               <CardHeader>
                 <CardTitle>Step 1: Know Yourself</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="space-y-3">
                   {decisionQuestions.map((q, idx) => (
                     <div key={idx} className="p-3 bg-muted/50 rounded-lg">
                       <p className="font-medium text-sm">{q.question}</p>
                       <p className="text-primary text-sm">If Yes → {q.ifYes}</p>
                     </div>
                   ))}
                 </div>
               </CardContent>
             </Card>
 
             <Card>
               <CardHeader>
                 <CardTitle>Step 2: Reality Check</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="space-y-3">
                   {realityCheckQuestions.map((q, idx) => (
                     <div key={idx} className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                       <p className="font-semibold text-amber-700 dark:text-amber-400">{q.factor}</p>
                       <p className="text-sm text-muted-foreground">{q.question}</p>
                     </div>
                   ))}
                 </div>
               </CardContent>
             </Card>
           </div>
 
           <Card className="mt-6">
             <CardHeader>
               <CardTitle>Step 3: Future-Proof Your Choice</CardTitle>
             </CardHeader>
             <CardContent>
               <p className="mb-4">Whatever you choose, add:</p>
               <div className="flex flex-wrap gap-3">
                 <Badge variant="default" className="text-sm py-2 px-4">✅ Digital skills</Badge>
                 <Badge variant="default" className="text-sm py-2 px-4">✅ Communication skills</Badge>
                 <Badge variant="default" className="text-sm py-2 px-4">✅ One technical certification</Badge>
                 <Badge variant="default" className="text-sm py-2 px-4">✅ Internship experience</Badge>
               </div>
             </CardContent>
           </Card>
         </section>
 
         {/* Key Takeaways */}
         <section>
           <Card className="bg-gradient-to-r from-primary/10 to-amber-500/10 border-2 border-primary/30">
             <CardHeader>
               <CardTitle className="text-center text-2xl flex items-center justify-center gap-2">
                 <CheckCircle2 className="h-8 w-8 text-primary" />
                 📌 KEY TAKEAWAYS FOR 2026 BATCH
               </CardTitle>
             </CardHeader>
             <CardContent>
               <div className="grid md:grid-cols-2 gap-4">
                 {keyTakeaways.map((takeaway, idx) => (
                   <div key={idx} className="flex items-start gap-3 p-4 bg-background rounded-lg">
                     <span className="text-2xl">{idx + 1}️⃣</span>
                     <p className="font-medium">{takeaway}</p>
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