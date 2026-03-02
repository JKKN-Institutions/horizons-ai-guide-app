 // TN State Board 12th Group Taxonomy - Comprehensive Data
 
 export interface GroupOption {
   id: string;
   code: number;
   subjects: string[];
   careerPaths: string[];
   popularTag?: string;
   icon?: string;
 }
 
 export interface GroupSection {
   id: string;
   title: string;
   titleTamil: string;
   color: string;
   bgLight: string;
   borderColor: string;
   textColor: string;
   groups: GroupOption[];
 }
 
 export const tnGroupTaxonomy: GroupSection[] = [
   {
     id: "science_maths",
     title: "Science - Maths Based (100 Series)",
     titleTamil: "அறிவியல் - கணிதம் (100 தொடர்)",
     color: "from-blue-500 to-cyan-500",
     bgLight: "bg-blue-50",
     borderColor: "border-blue-300",
     textColor: "text-blue-700",
     groups: [
       { id: "101", code: 101, subjects: ["Physics", "Chemistry", "Statistics", "Mathematics"], careerPaths: ["Engineering", "B.Sc Maths", "Data Science"], icon: "📊" },
       { id: "102", code: 102, subjects: ["Physics", "Chemistry", "Computer Science", "Mathematics"], careerPaths: ["Software", "IT", "Data Science", "AI/ML"], popularTag: "High Demand", icon: "💻" },
       { id: "103", code: 103, subjects: ["Physics", "Chemistry", "Biology", "Mathematics"], careerPaths: ["Engineering + Medical Options", "Biotech"], icon: "🔬" },
       { id: "104", code: 104, subjects: ["Physics", "Chemistry", "Bio-Chemistry", "Mathematics"], careerPaths: ["Biotechnology", "Research", "Pharma"], icon: "🧬" },
       { id: "105", code: 105, subjects: ["Physics", "Chemistry", "English for Communication", "Mathematics"], careerPaths: ["Technical Writing", "Engineering"], icon: "📝" },
       { id: "106", code: 106, subjects: ["Physics", "Chemistry", "Mathematics", "Home Science"], careerPaths: ["Food Technology", "Nutrition Science"], icon: "🏠" },
     ]
   },
   {
     id: "science_biology",
     title: "Science - Biology Based (200 Series)",
     titleTamil: "அறிவியல் - உயிரியல் (200 தொடர்)",
     color: "from-emerald-500 to-teal-500",
     bgLight: "bg-emerald-50",
     borderColor: "border-emerald-300",
     textColor: "text-emerald-700",
     groups: [
       { id: "201", code: 201, subjects: ["Physics", "Chemistry", "Biology", "Computer Science"], careerPaths: ["Bioinformatics", "Health IT"], icon: "🖥️" },
       { id: "202", code: 202, subjects: ["Physics", "Chemistry", "Biology", "Micro-Biology"], careerPaths: ["Lab Sciences", "Research"], icon: "🔬" },
       { id: "203", code: 203, subjects: ["Physics", "Chemistry", "Biology", "Bio-Chemistry"], careerPaths: ["Biochemistry", "Pharma R&D"], icon: "🧪" },
       { id: "204", code: 204, subjects: ["Physics", "Chemistry", "Biology", "Nursing"], careerPaths: ["B.Sc Nursing", "Healthcare"], icon: "👩‍⚕️" },
       { id: "205", code: 205, subjects: ["Physics", "Chemistry", "Biology", "Nutrition & Dietetics"], careerPaths: ["Dietitian", "Nutrition Science"], icon: "🥗" },
       { id: "206", code: 206, subjects: ["Physics", "Chemistry", "Biology", "English for Communication"], careerPaths: ["Medical Writing", "Healthcare Admin"], icon: "📄" },
       { id: "207", code: 207, subjects: ["Physics", "Chemistry", "Biology", "Home Science"], careerPaths: ["Food Science", "Community Health"], icon: "🏡" },
       { id: "208", code: 208, subjects: ["Physics", "Chemistry", "Botany", "Zoology"], careerPaths: ["MBBS", "BDS", "BAMS", "Nursing", "Veterinary"], popularTag: "Most Popular", icon: "🏥" },
     ]
   },
   {
     id: "commerce",
     title: "Commerce (300 Series)",
     titleTamil: "வணிகவியல் (300 தொடர்)",
     color: "from-amber-500 to-orange-500",
     bgLight: "bg-amber-50",
     borderColor: "border-amber-300",
     textColor: "text-amber-700",
     groups: [
       { id: "301", code: 301, subjects: ["Statistics", "Economics", "Commerce", "Accountancy"], careerPaths: ["B.Com", "CA", "Statistics"], icon: "📈" },
       { id: "302", code: 302, subjects: ["Computer Application", "Economics", "Commerce", "Accountancy"], careerPaths: ["CA", "FinTech", "Business Analytics"], popularTag: "Future-Ready", icon: "💹" },
       { id: "303", code: 303, subjects: ["English for Communication", "Economics", "Commerce", "Accountancy"], careerPaths: ["Business Communication", "Marketing"], icon: "📢" },
       { id: "304", code: 304, subjects: ["History", "Economics", "Commerce", "Accountancy"], careerPaths: ["CA", "Law", "Civil Services", "Banking"], popularTag: "UPSC Ready", icon: "⚖️" },
       { id: "305", code: 305, subjects: ["Economics", "Political Science", "Commerce", "Accountancy"], careerPaths: ["Public Policy", "Civil Services"], icon: "🏛️" },
       { id: "306", code: 306, subjects: ["Economics", "Commerce", "Accountancy", "Ethics & Indian Culture"], careerPaths: ["Ethics Officer", "CSR"], icon: "🙏" },
       { id: "307", code: 307, subjects: ["Economics", "Commerce", "Accountancy", "Advanced Language"], careerPaths: ["International Business", "Translation"], icon: "🌐" },
       { id: "308", code: 308, subjects: ["Economics", "Commerce", "Accountancy", "Business Maths"], careerPaths: ["Finance", "Actuarial Science", "BBA"], icon: "🔢" },
     ]
   },
   {
     id: "arts",
     title: "Arts / Humanities (400 Series)",
     titleTamil: "கலை / மானுடவியல் (400 தொடர்)",
     color: "from-purple-500 to-violet-500",
     bgLight: "bg-purple-50",
     borderColor: "border-purple-300",
     textColor: "text-purple-700",
     groups: [
       { id: "401", code: 401, subjects: ["Statistics", "Geography", "History", "Economics"], careerPaths: ["Geospatial Analyst", "Research"], icon: "🗺️" },
       { id: "402", code: 402, subjects: ["Computer Science", "Geography", "History", "Economics"], careerPaths: ["GIS Specialist", "Digital Humanities"], icon: "🌍" },
       { id: "403", code: 403, subjects: ["Geography", "English for Communication", "History", "Economics"], careerPaths: ["Journalism", "Content Writing"], icon: "✍️" },
       { id: "404", code: 404, subjects: ["Geography", "History", "Economics", "Political Science"], careerPaths: ["UPSC", "Law", "Journalism", "Civil Services"], popularTag: "UPSC Preferred", icon: "⚖️" },
       { id: "405", code: 405, subjects: ["Geography", "History", "Economics", "Ethics & Indian Culture"], careerPaths: ["Cultural Studies", "Heritage Management"], icon: "🏺" },
       { id: "406", code: 406, subjects: ["Geography", "History", "Economics", "Advanced Language"], careerPaths: ["Translation", "Foreign Services"], icon: "🗣️" },
     ]
   },
   {
     id: "vocational",
     title: "Vocational Courses",
     titleTamil: "தொழிற்பயிற்சி படிப்புகள்",
     color: "from-teal-500 to-cyan-500",
     bgLight: "bg-teal-50",
     borderColor: "border-teal-300",
     textColor: "text-teal-700",
     groups: [
       { id: "voc_cs", code: 0, subjects: ["Computer Science", "Office Automation", "Programming"], careerPaths: ["IT Support", "Software Testing"], icon: "🖥️" },
       { id: "voc_elec", code: 0, subjects: ["Electronics", "Circuits", "Digital Systems"], careerPaths: ["Electronics Technician", "IoT"], icon: "⚡" },
       { id: "voc_auto", code: 0, subjects: ["Automobile", "Mechanics", "Engine Systems"], careerPaths: ["Auto Technician", "EV Sector"], icon: "🚗" },
       { id: "voc_other", code: 0, subjects: ["Other Vocational", "Trade Skills"], careerPaths: ["Skilled Trades", "Entrepreneurship"], icon: "🛠️" },
     ]
   }
 ];
 
 // Skill assessment categories
 export interface SkillCategory {
   id: string;
   name: string;
   nameTamil: string;
   description: string;
   icon: string;
 }
 
 export const skillCategories: SkillCategory[] = [
   { id: "mathematics", name: "Mathematics & Logical Thinking", nameTamil: "கணிதம் & தர்க்க சிந்தனை", description: "Problem solving, calculations, patterns", icon: "📐" },
   { id: "language", name: "Language & Communication", nameTamil: "மொழி & தொடர்பாடல்", description: "Speaking, writing, expressing ideas", icon: "📝" },
   { id: "science", name: "Science & Analytical Skills", nameTamil: "அறிவியல் & பகுப்பாய்வு", description: "Understanding concepts, experiments", icon: "🔬" },
   { id: "creativity", name: "Creativity & Innovation", nameTamil: "படைப்பாற்றல் & புதுமை", description: "New ideas, artistic expression", icon: "🎨" },
   { id: "people", name: "People Skills & Leadership", nameTamil: "மனித உறவுகள் & தலைமைத்துவம்", description: "Teamwork, convincing others, leading", icon: "👥" },
   { id: "physical", name: "Physical Stamina & Patience", nameTamil: "உடல் திறன் & பொறுமை", description: "Long hours, physical work, persistence", icon: "💪" },
   { id: "digital", name: "Computer & Digital Skills", nameTamil: "கணினி & டிஜிட்டல் திறன்கள்", description: "Using software, internet, basic tech", icon: "💻" },
 ];
 
 // Career priorities for ranking
 export interface CareerPriority {
   id: string;
   label: string;
   labelTamil: string;
   description: string;
   icon: string;
 }
 
 export const careerPriorities: CareerPriority[] = [
   { id: "salary", label: "High Salary", labelTamil: "அதிக சம்பளம்", description: "Earning well is my top priority", icon: "💰" },
   { id: "security", label: "Job Security & Stability", labelTamil: "வேலை பாதுகாப்பு", description: "Permanent, risk-free career", icon: "🔒" },
   { id: "balance", label: "Work-Life Balance", labelTamil: "வேலை-வாழ்க்கை சமநிலை", description: "Time for family and hobbies", icon: "⏰" },
   { id: "abroad", label: "Work Abroad Opportunities", labelTamil: "வெளிநாடு வாய்ப்புகள்", description: "Want to settle in foreign country", icon: "🌍" },
   { id: "prestige", label: "Social Status & Prestige", labelTamil: "சமூக அந்தஸ்து", description: "Respected profession in society", icon: "🏆" },
   { id: "passion", label: "Passion & Purpose", labelTamil: "ஆர்வம் & நோக்கம்", description: "Doing what I love", icon: "❤️" },
   { id: "growth", label: "Fast Career Growth", labelTamil: "விரைவான தொழில் வளர்ச்சி", description: "Quick promotions and progress", icon: "🚀" },
   { id: "hometown", label: "Work from Hometown", labelTamil: "சொந்த ஊரில் வேலை", description: "Stay close to family", icon: "🏠" },
 ];
 
 // Map group to stream for compatibility
 export const groupToStream: Record<string, string> = {
   "101": "pcm", "102": "pcm", "103": "pcmb", "104": "pcm", "105": "pcm", "106": "pcm",
   "201": "pcb", "202": "pcb", "203": "pcb", "204": "pcb", "205": "pcb", "206": "pcb", "207": "pcb", "208": "pcb",
   "301": "commerce", "302": "commerce", "303": "commerce", "304": "commerce", "305": "commerce", "306": "commerce", "307": "commerce", "308": "commerce",
   "401": "arts", "402": "arts", "403": "arts", "404": "arts", "405": "arts", "406": "arts",
   "voc_cs": "vocational", "voc_elec": "vocational", "voc_auto": "vocational", "voc_other": "vocational",
 };