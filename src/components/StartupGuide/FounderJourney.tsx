import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Star, Globe, ChevronDown, ChevronUp, Lightbulb, AlertTriangle,
  Trophy, Route, Table
} from 'lucide-react';

// Helper to render text with **bold** markers
const renderBoldText = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
};

interface FounderDetail {
  year: string;
  name: string;
  startup: string;
  product: string;
  stream: string;
  color: string;
  emoji: string;
  idea: { title: string; points: string[] };
  struggles: { title: string; points: string[] };
  success: { title: string; points: string[] };
  summary: { label: string; value: string }[];
}

const indianFounders: FounderDetail[] = [
  {
    year: '2011', name: 'Shravan & Sanjay Kumaran', startup: 'GoDimensions', product: 'Mobile Apps', stream: 'Science', color: 'from-blue-500 to-indigo-500', emoji: '📱',
    idea: {
      title: '💡 The Idea: How It All Started',
      points: [
        '**The journey began at home in Chennai** when Shravan was just 7 years old. Their father, Kumaran Surendran (a tech director), noticed Shravan watching him work. He bought them a PC, and instead of just playing games, the brothers started "playing with programming."',
        '**The Spark (2011):** They wanted a way to showcase the products they were building. Sanjay (then 10) came up with the name "Go" and Shravan (then 12) added "Dimensions" to make it sound "cool."',
        '**The First Product:** Their first official game, Catch Me Cop, was born from a simple desire to build a fun maze-style game where a convict outsmarts the police.',
      ],
    },
    struggles: {
      title: '⚡ The Struggles: Real Hurdles They Faced',
      points: [
        '**The "Dad-Funded" Hurdle:** They started with zero external investment. They had to "pitch" their ideas to their father to get funds for devices (Macs, iPhones, Android sets). They were $600 in profit early on but still hadn\'t broken even because the hardware costs were so high.',
        '**Time Management:** They were full-time students. Their rule was strict: School from 8:20 am to 3:00 pm, play for an hour, and then code only from 6:00 pm to 7:30 pm.',
        '**Knowledge Gap:** In 2011, mobile internet wasn\'t like it is now. They couldn\'t just watch a YouTube tutorial for everything; they had to buy physical books and study programming languages like Java, QBasic, and Objective C from scratch.',
      ],
    },
    success: {
      title: '🏆 The Success: Real Data & Achievements',
      points: [
        '**Global Reach:** Their apps (like Alphabet Board and Emergency Booth) received over 70,000 downloads across 53 countries.',
        '**The Forbes Milestone:** They were featured in the Forbes 30 Under 30 list — one of the few teenagers to ever achieve this.',
        '**Social Impact:** They didn\'t just make games. Their app Emergency Booth allowed users to dial emergency numbers in 14 countries with one click, specifically helping senior citizens.',
      ],
    },
    summary: [
      { label: 'Launch Year', value: '2011 (Ages 10 & 12)' },
      { label: 'Total Apps', value: '12+ (iOS, Android, Windows)' },
      { label: 'First App', value: 'Catch Me Cop (2,000 downloads in 1st month)' },
      { label: 'Key Tech', value: 'QBasic, Java, Objective C, XML' },
      { label: 'Philosophy', value: '"Innovation means everything; money is not the focus."' },
    ],
  },
  {
    year: '2015', name: 'Rohan Ganapathy', startup: 'Bellatrix Aerospace', product: 'Space Tech', stream: 'Science', color: 'from-violet-500 to-purple-500', emoji: '🚀',
    idea: {
      title: '💡 The Idea: How It All Started',
      points: [
        '**Rohan Ganapathy** was fascinated by space from childhood in Coimbatore. While studying Aerospace Engineering at IIT Madras, he realized India\'s space industry lacked private players in propulsion technology.',
        '**The Spark (2015):** During his M.Tech research, Rohan identified that electric propulsion for small satellites was an untapped opportunity in India. He co-founded Bellatrix Aerospace with Yashas Karanam.',
        '**The First Product:** They developed India\'s first private sector electric propulsion system — a hall-effect thruster for satellites, drastically reducing launch costs.',
      ],
    },
    struggles: {
      title: '⚡ The Struggles: Real Hurdles They Faced',
      points: [
        '**Space is expensive:** Building rocket propulsion systems requires specialized labs, vacuum chambers, and test facilities. As students, getting access was extremely difficult.',
        '**Regulatory maze:** India\'s space sector was entirely government-controlled (ISRO). There was no clear path for private companies until recent policy changes.',
        '**Credibility gap:** Convincing investors and partners that a 22-year-old could build satellite propulsion was an uphill battle — they faced hundreds of rejections.',
      ],
    },
    success: {
      title: '🏆 The Success: Real Data & Achievements',
      points: [
        '**Raised over ₹74 crores** from marquee investors including IDFC, StartupXseed, and Inflexor Ventures.',
        '**Signed contracts with ISRO** and multiple international satellite manufacturers for their propulsion systems.',
        '**Named in Forbes 30 Under 30 Asia** list and recognized as one of India\'s most promising deep-tech startups.',
      ],
    },
    summary: [
      { label: 'Launch Year', value: '2015 (Age 22)' },
      { label: 'Product', value: 'Electric propulsion for satellites' },
      { label: 'Key Tech', value: 'Hall-effect thrusters, Green propulsion' },
      { label: 'Funding', value: '₹74+ Crores raised' },
      { label: 'Philosophy', value: '"India must be a global space superpower, not just a participant."' },
    ],
  },
  {
    year: '2017', name: 'Satish Kannan', startup: 'DocsApp', product: 'Health-Tech App', stream: 'Science', color: 'from-emerald-500 to-green-500', emoji: '🏥',
    idea: {
      title: '💡 The Idea: How It All Started',
      points: [
        '**Satish Kannan** observed that millions of Indians in Tier-2 and Tier-3 cities had zero access to specialist doctors. Travelling hours for a 5-minute consultation was the norm.',
        '**The Spark:** While working in the healthcare sector, he realized that 70% of doctor consultations could happen over phone/video — no physical examination needed.',
        '**The First Product:** DocsApp launched as an app connecting patients directly with specialist doctors via chat, call, and video — at just ₹199 per consultation.',
      ],
    },
    struggles: {
      title: '⚡ The Struggles: Real Hurdles They Faced',
      points: [
        '**Doctor onboarding:** Convincing established doctors to consult online was extremely hard in 2017 — telemedicine was not mainstream yet.',
        '**Trust deficit:** Patients in India were skeptical about online medical advice. Building trust without a physical clinic was a massive challenge.',
        '**Regulatory uncertainty:** Telemedicine had no clear legal framework in India until 2020, creating risk for the business model.',
      ],
    },
    success: {
      title: '🏆 The Success: Real Data & Achievements',
      points: [
        '**Served over 4 million patients** across 800+ cities in India through the platform.',
        '**Successfully acquired by MediBuddy** in 2020, creating one of India\'s largest digital healthcare platforms.',
        '**Played a critical role during COVID-19** by enabling thousands of remote consultations when hospitals were overwhelmed.',
      ],
    },
    summary: [
      { label: 'Launch Year', value: '2017' },
      { label: 'Users', value: '4 million+ patients served' },
      { label: 'Reach', value: '800+ cities across India' },
      { label: 'Exit', value: 'Acquired by MediBuddy (2020)' },
      { label: 'Philosophy', value: '"Healthcare should be as easy as ordering food online."' },
    ],
  },
  {
    year: '2019', name: 'Vinusha M K', startup: 'Four Seasons Pastry', product: 'Baking Kits', stream: 'Arts/Culinary', color: 'from-rose-500 to-pink-500', emoji: '🧁',
    idea: {
      title: '💡 The Idea: How It All Started',
      points: [
        '**Vinusha M K** from Karnataka started baking as a hobby during school. She noticed that people wanted to bake at home but didn\'t have easy access to pre-measured, ready-to-use baking kits.',
        '**The Spark (2019):** Instead of just selling cakes, she flipped the model — she would sell DIY baking kits that let anyone bake professional-quality pastries at home.',
        '**The First Product:** Her first baking kit included pre-measured ingredients, step-by-step recipe cards, and all the dry mixes needed — just add eggs, butter, and bake.',
      ],
    },
    struggles: {
      title: '⚡ The Struggles: Real Hurdles They Faced',
      points: [
        '**From Arts stream:** Unlike tech founders, Vinusha didn\'t have a coding or engineering background. She had to learn everything about e-commerce, packaging, and logistics from scratch.',
        '**Shelf life challenges:** Baking mixes have a limited shelf life. Figuring out preservative-free packaging that kept ingredients fresh was a constant R&D challenge.',
        '**Scaling from kitchen to factory:** Moving from a home kitchen to commercial production required food safety certifications (FSSAI), standardized recipes, and quality control systems.',
      ],
    },
    success: {
      title: '🏆 The Success: Real Data & Achievements',
      points: [
        '**Built a loyal customer base** through Instagram and word-of-mouth, reaching thousands of home bakers across Karnataka.',
        '**Proved that the Arts/Culinary stream** can produce viable startups — her story inspired many non-tech students.',
        '**Successfully developed a scalable** product line with multiple flavors and seasonal special edition kits.',
      ],
    },
    summary: [
      { label: 'Launch Year', value: '2019' },
      { label: 'Product', value: 'DIY Baking Kits' },
      { label: 'Key Innovation', value: 'Pre-measured, ready-to-use baking mixes' },
      { label: 'Certification', value: 'FSSAI Certified' },
      { label: 'Philosophy', value: '"You don\'t need to be a tech person to build a startup."' },
    ],
  },
  {
    year: '2019', name: 'A. Gopalkrishnan', startup: 'Paper Reclaiming Machine', product: 'Hardware', stream: 'Science', color: 'from-amber-500 to-yellow-500', emoji: '♻️',
    idea: {
      title: '💡 The Idea: How It All Started',
      points: [
        '**A. Gopalkrishnan**, a student from Tamil Nadu, was disturbed by the massive amount of paper waste generated by schools and colleges every year.',
        '**The Spark (2019):** He conceptualized a small, affordable machine that could reclaim waste paper and convert it into usable writing paper — right at the source (schools, offices).',
        '**The First Product:** A compact paper recycling machine that takes waste paper, pulps it, and produces fresh sheets — all in a machine small enough to fit in a classroom.',
      ],
    },
    struggles: {
      title: '⚡ The Struggles: Real Hurdles They Faced',
      points: [
        '**Hardware is hard:** Unlike software, building physical machines requires materials, fabrication, and extensive testing. Prototyping costs were significant.',
        '**Finding manufacturers:** Getting small-batch manufacturing support for a student\'s project in India was extremely difficult — most factories require large minimum orders.',
        '**Market education:** Schools and offices didn\'t understand why they needed an in-house paper recycling machine. Changing mindsets was as hard as building the product.',
      ],
    },
    success: {
      title: '🏆 The Success: Real Data & Achievements',
      points: [
        '**Successfully built a working prototype** that demonstrated paper-to-paper recycling at low cost.',
        '**Won multiple innovation competitions** and received recognition from science and technology forums.',
        '**Inspired a wave of sustainability**-focused hardware projects among students in Tamil Nadu.',
      ],
    },
    summary: [
      { label: 'Launch Year', value: '2019' },
      { label: 'Product', value: 'Compact Paper Reclaiming Machine' },
      { label: 'Innovation', value: 'In-house paper recycling for institutions' },
      { label: 'Impact', value: 'Reduces paper waste at source' },
      { label: 'Philosophy', value: '"Waste is just a resource in the wrong place."' },
    ],
  },
  {
    year: '2021', name: 'P. Sowmiya & Team', startup: 'Pectogel', product: 'Organic Food Wrap', stream: 'Science', color: 'from-teal-500 to-cyan-500', emoji: '🌿',
    idea: {
      title: '💡 The Idea: How It All Started',
      points: [
        '**P. Sowmiya and her team** from Tamil Nadu were concerned about plastic food wraps contaminating food and harming the environment.',
        '**The Spark (2021):** They developed Pectogel, an organic, biodegradable food wrap made from natural pectin extracted from fruit peels — turning food waste into food preservation.',
        '**The First Product:** A transparent, flexible food wrap that keeps food fresh naturally without any plastic, chemicals, or synthetic preservatives.',
      ],
    },
    struggles: {
      title: '⚡ The Struggles: Real Hurdles They Faced',
      points: [
        '**Lab to market gap:** Developing a lab prototype is one thing; making it commercially viable with consistent quality at scale was a huge challenge.',
        '**Competing with plastic:** Plastic wraps are incredibly cheap. Making an organic alternative price-competitive enough for everyday use required constant cost optimization.',
        '**Consumer habits:** Convincing people to switch from convenient plastic wrap to an organic alternative required extensive education and marketing.',
      ],
    },
    success: {
      title: '🏆 The Success: Real Data & Achievements',
      points: [
        '**Won prestigious innovation awards** at national-level science and startup competitions.',
        '**Successfully created a product** that addresses two problems simultaneously: food waste (pectin from fruit peels) and plastic waste (replacing plastic wraps).',
        '**Gained recognition in the green-tech** and sustainability startup ecosystem, attracting interest from eco-conscious brands and retailers.',
      ],
    },
    summary: [
      { label: 'Launch Year', value: '2021' },
      { label: 'Product', value: 'Organic food wrap from fruit peel pectin' },
      { label: 'Innovation', value: 'Dual impact — reduces food waste + plastic waste' },
      { label: 'Material', value: 'Natural pectin, biodegradable' },
      { label: 'Philosophy', value: '"Nature already has the solutions; we just need to extract them."' },
    ],
  },
  {
    year: '2023', name: 'Baanhem Team', startup: 'Baanhem Ventures', product: 'Incubation', stream: 'Commerce', color: 'from-orange-500 to-red-500', emoji: '💼',
    idea: {
      title: '💡 The Idea: How It All Started',
      points: [
        '**The Baanhem team** — a group of Commerce students — realized that while there were many incubators for tech startups, Commerce and business students had almost no support ecosystem.',
        '**The Spark (2023):** They decided to build an incubation platform specifically designed for student entrepreneurs from non-technical backgrounds — Commerce, Arts, Management.',
        '**The First Product:** A structured incubation program offering mentorship, business plan workshops, pitch practice, and connections to micro-funding sources.',
      ],
    },
    struggles: {
      title: '⚡ The Struggles: Real Hurdles They Faced',
      points: [
        '**No tech advantage:** As Commerce students, they faced the stereotype that "real startups" are tech companies. They had to constantly prove that business model innovation is just as valuable.',
        '**Building credibility:** Starting an incubator as students meant they had to convince mentors, industry leaders, and investors to volunteer their time and trust student organizers.',
        '**Sustainability:** Running a free or low-cost incubation program without a clear revenue model was a constant financial balancing act.',
      ],
    },
    success: {
      title: '🏆 The Success: Real Data & Achievements',
      points: [
        '**Successfully incubated multiple** student-led startups across different colleges and streams.',
        '**Proved that Commerce students** can build platforms, not just use them — shifting the narrative around non-tech founders.',
        '**Built a growing community** of young entrepreneurs who now mentor the next batch, creating a self-sustaining cycle.',
      ],
    },
    summary: [
      { label: 'Launch Year', value: '2023' },
      { label: 'Product', value: 'Student startup incubation platform' },
      { label: 'Focus', value: 'Non-tech founders (Commerce, Arts, Management)' },
      { label: 'Model', value: 'Mentorship + workshops + micro-funding connections' },
      { label: 'Philosophy', value: '"Every stream has founders waiting to emerge."' },
    ],
  },
];

const globalFounders: FounderDetail[] = [
  {
    year: '2004', name: 'Mark Zuckerberg', startup: 'Facebook', product: 'Social Media', stream: 'Science', color: 'from-blue-600 to-blue-500', emoji: '👤',
    idea: {
      title: '💡 The Idea: How It All Started',
      points: [
        '**Mark Zuckerberg** was a psychology and computer science student at Harvard. He was fascinated by how people connect and share identity online.',
        '**The Spark (2004):** After building Facemash (a "hot or not" site using student photos), he realized students wanted a real online directory. Facebook launched from his dorm room in February 2004.',
        '**The First Product:** "TheFacebook" was a Harvard-only social directory where students could create profiles, connect with classmates, and share basic info.',
      ],
    },
    struggles: {
      title: '⚡ The Struggles: Real Hurdles They Faced',
      points: [
        '**Legal battles:** The Winklevoss twins sued Zuckerberg claiming he stole their idea. The lawsuit dragged on for years and resulted in a $65 million settlement.',
        '**Dropping out of Harvard:** Choosing to leave one of the world\'s most prestigious universities to pursue a startup was a massive risk with no guaranteed outcome.',
        '**Monetization:** For years, Facebook had millions of users but no clear revenue model. Investors pressured them constantly to figure out how to make money.',
      ],
    },
    success: {
      title: '🏆 The Success: Real Data & Achievements',
      points: [
        '**Facebook (now Meta) grew to 3**+ billion monthly active users — the largest social network in human history.',
        '**IPO in 2012** valued the company at $104 billion — the largest tech IPO at that time.',
        '**Acquired Instagram** ($1B), WhatsApp ($19B), and Oculus ($2B), building a technology empire spanning social media, messaging, and VR.',
      ],
    },
    summary: [
      { label: 'Launch Year', value: '2004 (Age 19, Harvard dorm room)' },
      { label: 'Users', value: '3+ billion monthly active users' },
      { label: 'IPO', value: '$104 billion (2012)' },
      { label: 'Key Acquisitions', value: 'Instagram, WhatsApp, Oculus' },
      { label: 'Philosophy', value: '"Move fast and break things."' },
    ],
  },
  {
    year: '2007', name: 'Sachin & Binny Bansal', startup: 'Flipkart', product: 'E-commerce', stream: 'Science', color: 'from-yellow-500 to-amber-500', emoji: '🛒',
    idea: {
      title: '💡 The Idea: How It All Started',
      points: [
        '**Sachin and Binny Bansal** (not related) were IIT Delhi graduates working at Amazon in Bangalore. They saw firsthand how e-commerce was transforming retail globally.',
        '**The Spark (2007):** India had almost no online shopping. They quit Amazon and started Flipkart from a 2-bedroom apartment in Bangalore with just ₹4 lakhs.',
        '**The First Product:** An online bookstore (inspired by Amazon\'s origin). Their first order was the book "Leaving Microsoft to Change the World" — they personally delivered it.',
      ],
    },
    struggles: {
      title: '⚡ The Struggles: Real Hurdles They Faced',
      points: [
        '**No logistics infrastructure:** India had no reliable delivery network for e-commerce. They had to build their own logistics arm (Ekart) from scratch.',
        '**Cash-on-delivery problem:** Indians didn\'t trust online payments. Flipkart pioneered COD, which was operationally expensive and risky.',
        '**Intense competition:** When Amazon entered India in 2013 with unlimited capital, Flipkart had to fight a war of attrition against a global giant.',
      ],
    },
    success: {
      title: '🏆 The Success: Real Data & Achievements',
      points: [
        '**Walmart acquired Flipkart in 2018 for $16 billion** — the world\'s largest e-commerce acquisition at that time.',
        '**Built India**\'s e-commerce ecosystem: popularized online shopping, created Ekart logistics, launched Flipkart Pay Later, and the Big Billion Day sale.',
        '**Proved that Indian founders** could build global-scale companies — paving the way for the entire Indian startup ecosystem.',
      ],
    },
    summary: [
      { label: 'Launch Year', value: '2007 (₹4 lakhs initial investment)' },
      { label: 'First Product', value: 'Online bookstore' },
      { label: 'Exit', value: '$16 billion (acquired by Walmart, 2018)' },
      { label: 'Innovation', value: 'Pioneered COD, built Ekart logistics' },
      { label: 'Philosophy', value: '"If you don\'t build your dream, someone will hire you to build theirs."' },
    ],
  },
  {
    year: '2009', name: 'Farrhad Acidwalla', startup: 'Rockstah Media', product: 'Digital Agency', stream: 'Arts', color: 'from-pink-500 to-rose-500', emoji: '🎨',
    idea: {
      title: '💡 The Idea: How It All Started',
      points: [
        '**Farrhad Acidwalla** from Mumbai started his entrepreneurial journey at age 13 by buying a Facebook community page about aviation for $10.',
        '**The Spark (2009):** He grew that page to 3 lakh+ followers and realized he could monetize digital communities. At 16, he founded Rockstah Media, a digital marketing and branding agency.',
        '**The First Product:** Digital branding and social media marketing services for businesses — at a time when most Indian companies didn\'t even have a social media strategy.',
      ],
    },
    struggles: {
      title: '⚡ The Struggles: Real Hurdles They Faced',
      points: [
        '**Age barrier:** No one wanted to hire a teenager for their marketing. He had to prove his expertise through results, not credentials.',
        '**Arts stream stigma:** Coming from a non-technical background, he faced constant skepticism about whether he could build a "real" company.',
        '**Self-taught everything:** Digital marketing had no formal curriculum in India. He learned SEO, social media, and branding entirely through experimentation.',
      ],
    },
    success: {
      title: '🏆 The Success: Real Data & Achievements',
      points: [
        '**Named in Forbes 30 Under 30 at just 17** years old — one of the youngest entrepreneurs on the list globally.',
        '**Rockstah Media grew** into a full-service digital agency serving clients across multiple countries.',
        '**Became a globally recognized** young entrepreneur, speaking at international conferences and inspiring thousands of young people from non-tech backgrounds.',
      ],
    },
    summary: [
      { label: 'Launch Year', value: '2009 (Age 16)' },
      { label: 'First Investment', value: '$10 (bought a Facebook page)' },
      { label: 'Company', value: 'Rockstah Media (Digital Agency)' },
      { label: 'Recognition', value: 'Forbes 30 Under 30 (at age 17)' },
      { label: 'Philosophy', value: '"Age is just a number; execution is everything."' },
    ],
  },
  {
    year: '2013', name: 'Ritesh Agarwal', startup: 'OYO Rooms', product: 'Hotel Network', stream: 'Commerce', color: 'from-red-500 to-rose-600', emoji: '🏨',
    idea: {
      title: '💡 The Idea: How It All Started',
      points: [
        '**Ritesh Agarwal** from Odisha started travelling across India at 17, staying in budget hotels. He was frustrated by the inconsistent quality — dirty rooms, no WiFi, broken ACs.',
        '**The Spark (2013):** He realized budget hotels had no brand standardization. At 19, he founded OYO Rooms to bring consistency to India\'s fragmented budget hotel market.',
        '**The First Product:** A platform that partnered with existing budget hotels, standardized their rooms (clean sheets, WiFi, AC, branded toiletries), and listed them under the OYO brand.',
      ],
    },
    struggles: {
      title: '⚡ The Struggles: Real Hurdles They Faced',
      points: [
        '**Dropped out of college:** Ritesh dropped out of Indian School of Hospitality to pursue OYO. His family and society pressured him to get a "proper degree."',
        '**Hotel owner resistance:** Convincing traditional hotel owners to give up control of their rooms and follow OYO\'s standards was an enormous ground-level challenge.',
        '**Hyper-growth pains:** Scaling too fast led to quality control issues, customer complaints, and franchise disputes. OYO had to learn to balance growth with quality.',
      ],
    },
    success: {
      title: '🏆 The Success: Real Data & Achievements',
      points: [
        '**Grew to 43,000+ hotels** across 800+ cities in 80+ countries — making it one of the world\'s largest hotel chains by room count.',
        '**Received backing from SoftBank**, Sequoia, and Airbnb. Valuation peaked at $9.6 billion.',
        '**Became the youngest Indian** to receive the Thiel Fellowship ($100,000 grant from Peter Thiel to skip college and build a company).',
      ],
    },
    summary: [
      { label: 'Launch Year', value: '2013 (Age 19)' },
      { label: 'Hotels', value: '43,000+ across 80+ countries' },
      { label: 'Valuation', value: '$9.6 billion (peak)' },
      { label: 'Recognition', value: 'Thiel Fellow, Forbes 30 Under 30' },
      { label: 'Philosophy', value: '"If the world can have a McDonalds for food, why not for hotels?"' },
    ],
  },
  {
    year: '2018', name: 'Tilak Mehta', startup: 'Papers N Parcels', product: 'Logistics', stream: 'Commerce', color: 'from-indigo-500 to-violet-500', emoji: '📦',
    idea: {
      title: '💡 The Idea: How It All Started',
      points: [
        '**Tilak Mehta** from Mumbai was just 13 when he needed to urgently send documents to a relative across the city. No courier service offered same-day intra-city delivery.',
        '**The Spark (2018):** He connected the dots — Mumbai\'s legendary dabbawalas deliver 2 lakh lunchboxes daily with 99.99% accuracy. Why not use the same network for parcel delivery?',
        '**The First Product:** Papers N Parcels — a logistics platform that partnered with Mumbai\'s dabbawala network to offer same-day, affordable intra-city parcel delivery.',
      ],
    },
    struggles: {
      title: '⚡ The Struggles: Real Hurdles They Faced',
      points: [
        '**Being 13 years old:** Opening a business bank account, signing contracts, and being taken seriously by adults was a daily struggle. His father had to co-sign many documents.',
        '**Dabbawala integration:** The dabbawala network is traditional and works on trust, not technology. Bridging the gap between their analog system and a digital platform required careful negotiation.',
        '**Scaling beyond Mumbai:** The dabbawala model is unique to Mumbai. Expanding to other cities required completely different logistics partners and strategies.',
      ],
    },
    success: {
      title: '🏆 The Success: Real Data & Achievements',
      points: [
        '**Successfully launched intra-city delivery** across Mumbai, leveraging the world-famous dabbawala network.',
        '**Featured in major Indian** and international media, becoming one of India\'s youngest recognized entrepreneurs.',
        '**Proved that Commerce students** can innovate in logistics — you don\'t need to code to disrupt an industry.',
      ],
    },
    summary: [
      { label: 'Launch Year', value: '2018 (Age 13)' },
      { label: 'Product', value: 'Intra-city same-day parcel delivery' },
      { label: 'Innovation', value: 'Partnered with Mumbai dabbawala network' },
      { label: 'Key Insight', value: '99.99% delivery accuracy of dabbawalas' },
      { label: 'Philosophy', value: '"Don\'t build new when you can innovate on what already works."' },
    ],
  },
  {
    year: '2018', name: 'Arjun Deshpande', startup: 'Generic Aadhaar', product: 'Affordable Pharma', stream: 'Science', color: 'from-emerald-500 to-teal-500', emoji: '💊',
    idea: {
      title: '💡 The Idea: How It All Started',
      points: [
        '**Arjun Deshpande** from Pune noticed that millions of Indians overpay for branded medicines when chemically identical generic alternatives exist at 50–90% lower cost.',
        '**The Spark (2018):** While studying, he realized there was no easy way for common people to discover and buy genuine generic medicines. The pharmacy ecosystem was designed to push expensive brands.',
        '**The First Product:** Generic Aadhaar — a platform/network of stores that exclusively sell affordable, quality-certified generic medicines, making healthcare accessible to all.',
      ],
    },
    struggles: {
      title: '⚡ The Struggles: Real Hurdles They Faced',
      points: [
        '**Pharma industry resistance:** Big pharmaceutical companies and traditional pharmacies saw generic-only stores as a threat to their margins and actively discouraged the model.',
        '**Quality perception:** Indians associate "cheap medicine" with "low quality." Educating customers that generic medicines have the same active ingredients and FDA approval was an uphill task.',
        '**Regulatory complexity:** The Indian pharma market has complex distribution rules. Navigating drug licensing, storage requirements, and state-level regulations was challenging.',
      ],
    },
    success: {
      title: '🏆 The Success: Real Data & Achievements',
      points: [
        '**Expanded to 1,500+ Generic Aadhaar** stores across India, making affordable medicines accessible in smaller cities and towns.',
        '**Saved millions of rupees** for low-income families by providing medicines at 50–90% lower than branded alternatives.',
        '**Recognized by major media outlets** and government bodies for democratizing access to affordable healthcare.',
      ],
    },
    summary: [
      { label: 'Launch Year', value: '2018' },
      { label: 'Stores', value: '1,500+ across India' },
      { label: 'Savings', value: '50–90% cheaper than branded medicines' },
      { label: 'Impact', value: 'Affordable healthcare for millions' },
      { label: 'Philosophy', value: '"Everyone deserves access to affordable medicine, not just the wealthy."' },
    ],
  },
  {
    year: '2021', name: 'Aadit & Kaivalya', startup: 'Zepto', product: '10-min Grocery', stream: 'Science', color: 'from-purple-500 to-violet-500', emoji: '⚡',
    idea: {
      title: '💡 The Idea: How It All Started',
      points: [
        '**Aadit Palicha and Kaivalya Vohra** were childhood friends from Mumbai who went to Stanford University. During COVID-19 lockdowns, they launched KiranaKart to help people order groceries.',
        '**The Spark (2021):** They dropped out of Stanford at 19 to pivot KiranaKart into Zepto — promising grocery delivery in just 10 minutes using dark stores (micro-warehouses).',
        '**The First Product:** A grocery delivery app with strategically placed dark stores within 2–3 km of customers, enabling deliveries faster than anyone thought possible.',
      ],
    },
    struggles: {
      title: '⚡ The Struggles: Real Hurdles They Faced',
      points: [
        '**Dropping out of Stanford:** Leaving a top-3 global university at 19 to start a grocery delivery company was considered reckless by many.',
        '**Cash burn:** Quick commerce requires massive upfront investment in dark stores, inventory, and delivery fleet. Zepto was burning crores per month while trying to prove the model.',
        '**Skepticism:** Many industry experts called 10-minute delivery "unsustainable" and predicted it would fail once investor funding dried up.',
      ],
    },
    success: {
      title: '🏆 The Success: Real Data & Achievements',
      points: [
        '**Raised over $1.3 billion** in funding, reaching a valuation of $5 billion+ by 2024.',
        '**Expanded to 10+ major Indian** cities with hundreds of dark stores, delivering millions of orders monthly.',
        '**Became the youngest founders** to build a billion-dollar company in India, proving that quick commerce is a viable business model.',
      ],
    },
    summary: [
      { label: 'Launch Year', value: '2021 (Both founders aged 19)' },
      { label: 'Valuation', value: '$5 billion+ (2024)' },
      { label: 'Funding', value: '$1.3 billion+ raised' },
      { label: 'Innovation', value: 'Dark store model for 10-min delivery' },
      { label: 'Philosophy', value: '"Speed is the new currency of convenience."' },
    ],
  },
];

const FounderCard = ({ founder, isExpanded, onToggle }: { founder: FounderDetail; isExpanded: boolean; onToggle: () => void }) => (
  <Card className={`border-border/40 transition-all duration-300 overflow-hidden ${isExpanded ? 'shadow-lg ring-1 ring-orange-200/50' : 'hover:border-orange-300/40 hover:shadow-md'}`}>
    <CardContent className="p-0">
      {/* Header Row — always visible */}
      <button className="w-full flex items-stretch text-left" onClick={onToggle}>
        <div className={`flex-shrink-0 w-16 md:w-20 bg-gradient-to-br ${founder.color} flex flex-col items-center justify-center text-white p-2`}>
          <span className="text-lg">{founder.emoji}</span>
          <span className="text-[11px] font-bold mt-0.5">{founder.year}</span>
        </div>
        <div className="flex-1 p-3 min-w-0 flex items-center">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-black truncate">{founder.name}</p>
            <p className="text-xs text-gray-800 mt-0.5">
              <span className="font-semibold text-gray-900">{founder.startup}</span> — {founder.product}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
            <Badge className={`text-[9px] border hidden sm:inline-flex ${
              founder.stream === 'Science' ? 'bg-blue-50 text-blue-700 border-blue-200' :
              founder.stream === 'Commerce' ? 'bg-amber-50 text-amber-700 border-amber-200' :
              'bg-rose-50 text-rose-700 border-rose-200'
            }`}>
              {founder.stream}
            </Badge>
            {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-800" /> : <ChevronDown className="w-4 h-4 text-gray-800" />}
          </div>
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-border/30 p-4 space-y-4 bg-gradient-to-b from-muted/20 to-transparent">
          {/* Stream badge on mobile */}
          <Badge className={`text-[9px] border sm:hidden ${
            founder.stream === 'Science' ? 'bg-blue-50 text-blue-700 border-blue-200' :
            founder.stream === 'Commerce' ? 'bg-amber-50 text-amber-700 border-amber-200' :
            'bg-rose-50 text-rose-700 border-rose-200'
          }`}>
            {founder.stream}
          </Badge>

          {/* 1. The Idea */}
          <div className="space-y-2">
            <h4 className="text-sm font-extrabold text-foreground flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              {founder.idea.title}
            </h4>
            <div className="space-y-2 pl-5">
              {founder.idea.points.map((point, i) => (
                <p key={i} className="text-[13px] text-gray-800 leading-relaxed">
                  {renderBoldText(point)}
                </p>
              ))}
            </div>
          </div>

          {/* 2. The Struggles */}
          <div className="space-y-2">
            <h4 className="text-sm font-extrabold text-foreground flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              {founder.struggles.title}
            </h4>
            <div className="space-y-2 pl-5">
              {founder.struggles.points.map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0 mt-1.5" />
                  <p className="text-[13px] text-gray-800 leading-relaxed">{renderBoldText(point)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. The Success */}
          <div className="space-y-2">
            <h4 className="text-sm font-extrabold text-foreground flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-emerald-500" />
              {founder.success.title}
            </h4>
            <div className="space-y-2 pl-5">
              {founder.success.points.map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />
                  <p className="text-[13px] text-gray-800 leading-relaxed">{renderBoldText(point)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Summary Table */}
          <div className="space-y-2">
            <h4 className="text-sm font-extrabold text-foreground flex items-center gap-1.5">
              <Table className="w-4 h-4 text-blue-500" />
              📋 Summary
            </h4>
            <div className="rounded-lg border border-border/50 overflow-hidden">
              {founder.summary.map((row, i) => (
                <div key={i} className={`flex text-[13px] ${i % 2 === 0 ? 'bg-muted/30' : 'bg-transparent'} ${i < founder.summary.length - 1 ? 'border-b border-border/30' : ''}`}>
                  <div className="w-28 md:w-36 flex-shrink-0 p-2.5 font-extrabold text-foreground border-r border-border/30">
                    {row.label}
                  </div>
                  <div className="flex-1 p-2.5 text-gray-900 font-medium">
                    {row.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </CardContent>
  </Card>
);

export const FounderJourney = () => {
  const [expandedIndian, setExpandedIndian] = useState<number | null>(null);
  const [expandedGlobal, setExpandedGlobal] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 rounded-xl p-5 border border-white/[0.06] text-center">
        <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-400/20 text-rose-400 px-4 py-1.5 rounded-full text-[11px] font-semibold mb-3">
          <Route className="w-3.5 h-3.5" />
          Real Founder Stories
        </div>
        <h3 className="text-lg font-bold text-white mb-1">They Started Young. So Can You.</h3>
        <p className="text-xs text-gray-400 max-w-md mx-auto">
          Tap on any founder to read their full story — the idea, the struggles, and the success. From Science, Arts, and Commerce streams.
        </p>
      </div>

      {/* Indian Student Founders */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500">
            <Star className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-black">Indian Student Founders</h4>
            <p className="text-[10px] text-gray-800">Startups born in India by young innovators</p>
          </div>
        </div>
        <div className="space-y-2">
          {indianFounders.map((founder, i) => (
            <FounderCard
              key={i}
              founder={founder}
              isExpanded={expandedIndian === i}
              onToggle={() => setExpandedIndian(expandedIndian === i ? null : i)}
            />
          ))}
        </div>
      </div>

      {/* Global Young Founders */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500">
            <Globe className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-black">Global Young Founders</h4>
            <p className="text-[10px] text-gray-800">World-changing startups by young entrepreneurs</p>
          </div>
        </div>
        <div className="space-y-2">
          {globalFounders.map((founder, i) => (
            <FounderCard
              key={i}
              founder={founder}
              isExpanded={expandedGlobal === i}
              onToggle={() => setExpandedGlobal(expandedGlobal === i ? null : i)}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 rounded-xl p-4 border border-white/[0.06] text-center">
        <p className="text-sm font-bold text-white mb-1">🔥 Your stream doesn't define your startup.</p>
        <p className="text-xs text-gray-400">Science, Arts, or Commerce — every founder started by solving a real problem. What's yours?</p>
      </div>
    </div>
  );
};
