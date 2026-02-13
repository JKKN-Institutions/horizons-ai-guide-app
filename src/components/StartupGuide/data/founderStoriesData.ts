export interface FounderStory {
  id: number;
  name: string;
  company: string;
  industry: string;
  startAge: number;
  startYear: number;
  location: string;
  initialInvestment: string;
  currentValuation: string;
  keyLesson: string;
  story: string;
  frameworks: string[];
  avatar: string;
}

export const founderStories: FounderStory[] = [
  {
    id: 1, name: 'Ritesh Agarwal', company: 'OYO Rooms', industry: 'Hospitality',
    startAge: 17, startYear: 2013, location: 'Gurgaon',
    initialInvestment: '₹0 (Thiel Fellowship)', currentValuation: '$9 Billion',
    keyLesson: 'You don\'t need experience — you need obsession with the problem.',
    story: 'Ritesh dropped out at 17 after traveling across India and seeing terrible budget hotels. He didn\'t build a hotel — he standardized existing ones. Started by convincing ONE hotel owner to let him improve and list their rooms. Key insight: you don\'t need to own assets to build a business around them.',
    frameworks: ['Asset-Light Model', 'Standardization', 'Platform Business'],
    avatar: '🏨',
  },
  {
    id: 2, name: 'Falguni Nayar', company: 'Nykaa', industry: 'Beauty & E-commerce',
    startAge: 50, startYear: 2012, location: 'Mumbai',
    initialInvestment: '₹2 Crore (personal savings)', currentValuation: '$6.5 Billion',
    keyLesson: 'It\'s never too late. Domain expertise + timing = unstoppable.',
    story: 'Falguni spent 20 years in banking before noticing that Indian women couldn\'t easily buy authentic beauty products online. At 50, she quit her MD role and started Nykaa. Her banking experience helped with operations and fundraising. She proved that starting late with deep expertise beats starting young with none.',
    frameworks: ['Domain Expertise Advantage', 'Content-Led Commerce', 'Omnichannel Strategy'],
    avatar: '💄',
  },
  {
    id: 3, name: 'Deepinder Goyal', company: 'Zomato', industry: 'Food Tech',
    startAge: 25, startYear: 2008, location: 'Delhi',
    initialInvestment: '₹0', currentValuation: '$12 Billion',
    keyLesson: 'Start by solving YOUR OWN problem. The simplest idea can become massive.',
    story: 'Deepinder saw long queues at his office cafeteria and thought: "What if people could see menus online?" He started by scanning restaurant menus in Delhi and putting them on a website called Foodiebay. No delivery, no orders — just menus. That simple idea evolved into India\'s largest food platform.',
    frameworks: ['Solve Your Own Problem', 'Start Simple Then Expand', 'Network Effects'],
    avatar: '🍕',
  },
  {
    id: 4, name: 'Tilak Mehta', company: 'Paper N Parcels', industry: 'Logistics',
    startAge: 13, startYear: 2018, location: 'Mumbai',
    initialInvestment: '₹0', currentValuation: '₹100 Crore',
    keyLesson: 'Age is just a number. If you can identify a problem and execute, the market doesn\'t care how old you are.',
    story: 'At 13, Tilak needed to send a forgotten assignment to school. He realized same-day intra-city delivery was expensive and unreliable. He partnered with Mumbai\'s dabbawalas — the world\'s most efficient delivery network — to create affordable same-day delivery. Genius: he didn\'t build a new network, he leveraged an existing one.',
    frameworks: ['Leveraging Existing Networks', 'Partnership Model', 'Last-Mile Innovation'],
    avatar: '📦',
  },
  {
    id: 5, name: 'Kiran Mazumdar-Shaw', company: 'Biocon', industry: 'Biotechnology',
    startAge: 25, startYear: 1978, location: 'Bangalore',
    initialInvestment: '₹10,000', currentValuation: '$4 Billion',
    keyLesson: 'Persistence through rejection. She was denied bank loans because she was a woman. She proved them all wrong.',
    story: 'Kiran wanted to be a brewmaster but couldn\'t get a job in India (male-dominated industry). She started Biocon in her garage with ₹10,000, making enzymes. Banks refused loans. Landlords refused to rent to a "woman entrepreneur." She persisted for 20 years before Biocon became a pharmaceutical giant.',
    frameworks: ['Deep Tech Startup', 'Bootstrap First', 'Patience & Persistence'],
    avatar: '🧬',
  },
  {
    id: 6, name: 'Byju Raveendran', company: 'BYJU\'S (early days)', industry: 'EdTech',
    startAge: 25, startYear: 2011, location: 'Bangalore',
    initialInvestment: '₹0 (started with free classes)', currentValuation: 'Peak: $22 Billion',
    keyLesson: 'Start with what you know. Byju was a great teacher — he built a business around his skill, not around technology.',
    story: 'Byju started by teaching friends for CAT exams. His classes grew so popular he rented auditoriums for 2,000+ students. The app came LATER — only after he proved the teaching model worked offline. Lesson: Technology should enhance a proven model, not replace the need for one. (Note: BYJU\'S later faced challenges due to aggressive scaling — a cautionary tale about sustainable growth.)',
    frameworks: ['Skill-First Business', 'Offline-to-Online', 'Cautionary Scaling'],
    avatar: '📚',
  },
  {
    id: 7, name: 'P.C. Duraisamy & Shanthi Duraisamy', company: 'Sakthi Masala', industry: 'FMCG / Spices',
    startAge: 30, startYear: 1975, location: 'Erode, Tamil Nadu',
    initialInvestment: '₹Small (turmeric trading profits)', currentValuation: '₹2,000+ Crore',
    keyLesson: 'You don\'t need a tech background — start with what your region is famous for. Look at your own kitchen for startup ideas.',
    story: 'Mr. P.C. Duraisamy started as a small turmeric trader in Erode. He and his wife Shanthi noticed that as more women started working, they didn\'t have time to grind traditional spices at home every day. Their solution: sell high-quality, pre-ground masalas that tasted like "home-cooked" food. They built trust through relentless focus on purity, competing against national brands. Sakthi Masala is also famous for hiring a large number of differently-abled individuals — proving a business can be successful and kind at the same time. From a small shop in Erode to a massive factory, their story is the most relatable for Tamil Nadu students.',
    frameworks: ['Regional Advantage', 'Solve a Home Problem', 'Trust-Based Branding', 'Social Impact'],
    avatar: '🌶️',
  },
  {
    id: 8, name: 'A.D. Padmasingh Isaac', company: 'Aachi Group', industry: 'FMCG / Spices',
    startAge: 28, startYear: 1995, location: 'Nazareth, Tirunelveli, Tamil Nadu',
    initialInvestment: '₹Minimal (hocked wife\'s jewelry)', currentValuation: '₹4,000+ Crore',
    keyLesson: 'You don\'t need a fancy degree or huge capital — just understand what people in your community need.',
    story: 'Born in Nazareth, Tirunelveli, into a farming family, he lost his father at age 12. His mother had only a 5th-grade education. While working for a soap company, he spotted a gap: branded, quality spice mixes. He was so committed he even pawned his wife\'s jewelry to fund his early ventures. Today, Aachi is a household name worldwide — proof that grit from a small town can build a global brand.',
    frameworks: ['Community-First Business', 'Bootstrap with Sacrifice', 'Gap Identification', 'Small Town to Global'],
    avatar: '👑',
  },
  {
    id: 9, name: 'Harpita Pandian', company: 'Classminds', industry: 'EdTech',
    startAge: 16, startYear: 2018, location: 'Tamil Nadu',
    initialInvestment: '₹0', currentValuation: 'Impact: 8,000+ students across 15 countries',
    keyLesson: 'Age is not a barrier to becoming an entrepreneur or an educator.',
    story: 'Harpita and her twin brother founded Classminds, an EdTech platform, while they were still school students. They\'ve impacted over 8,000 students across 15 countries and even collaborated with the Tamil Nadu State Government on educational content. Their journey proves that you can start building something meaningful right from your classroom.',
    frameworks: ['Student Founder', 'Education-First Impact', 'Government Collaboration', 'Youth Leadership'],
    avatar: '🎓',
  },
  {
    id: 10, name: 'Sridhar Vembu', company: 'Zoho', industry: 'SaaS / Technology',
    startAge: 28, startYear: 1996, location: 'Tenkasi, Tamil Nadu',
    initialInvestment: '₹Minimal', currentValuation: '$5 Billion+',
    keyLesson: 'You can build a world-class technology company right from a village in Tamil Nadu.',
    story: 'Zoho is a global SaaS giant competing with Google and Microsoft. But what makes Sridhar Vembu\'s story unique is his decision to move back to a rural village in Tenkasi, Tamil Nadu, to run the company. He focuses on creating high-tech jobs in rural areas so talented students don\'t have to leave their hometowns. Zoho has never taken VC funding — it\'s 100% bootstrapped and profitable.',
    frameworks: ['Rural Innovation', 'Bootstrapped SaaS', 'Reverse Brain Drain', 'No-VC Model'],
    avatar: '💻',
  },
  {
    id: 11, name: 'Santhosh & Sai', company: 'Printwear Company', industry: 'E-commerce / Print-on-Demand',
    startAge: 22, startYear: 2019, location: 'Small town, Tamil Nadu',
    initialInvestment: '₹Minimal', currentValuation: '$1 Million+',
    keyLesson: 'You don\'t need a "big city" or an "elite degree" to build a million-dollar startup.',
    story: 'Two young men from a small town in Tamil Nadu, from lower-middle-class families, with no IIT or IIM degree. They noticed small businesses struggled with high inventory costs and used "print-on-demand" to solve it — customers order, they print and ship, zero inventory risk. They turned this simple insight into a million-dollar enterprise, proving that smart execution beats elite pedigree.',
    frameworks: ['Print-on-Demand', 'Zero Inventory Model', 'Small Town Hustle', 'Lean Startup'],
    avatar: '👕',
  },
  {
    id: 12, name: 'Anumadhubala R', company: 'Skyline Space', industry: 'Space Tech / Education',
    startAge: 20, startYear: 2020, location: 'Tamil Nadu',
    initialInvestment: '₹0', currentValuation: 'Early Stage',
    keyLesson: 'Look for things you\'re curious about and turn that passion into a platform for others.',
    story: 'A student founder (Batch 2019-2023) who launched Skyline Space during her college years to teach other students about space science and technology. She saw a gap in space science knowledge among Indian students and built a platform to bridge it. Her journey shows that curiosity + action can create something meaningful — you don\'t need to wait until graduation to start.',
    frameworks: ['Passion-to-Platform', 'Student Founder', 'Knowledge Gap Bridging', 'Space Education'],
    avatar: '🚀',
  },
];

export interface MentorProfile {
  id: number;
  name: string;
  role: string;
  expertise: string[];
  bio: string;
  availability: string;
  avatar: string;
}

export const mentorProfiles: MentorProfile[] = [
  { id: 1, name: 'Industry Mentor', role: 'Startup Founder & TN Entrepreneur', expertise: ['Business Model Design', 'Fundraising', 'Team Building'], bio: 'Built and scaled 2 startups in Tamil Nadu. Mentors early-stage founders on validation and growth.', availability: 'Monthly live Q&A sessions', avatar: '👨‍💼' },
  { id: 2, name: 'Finance Mentor', role: 'CA & Startup CFO', expertise: ['Financial Planning', 'Tax & Compliance', 'Investor Relations'], bio: 'Chartered Accountant helping startups with financial literacy, GST, and fundraising strategy.', availability: 'Bi-weekly office hours', avatar: '📊' },
  { id: 3, name: 'Tech Mentor', role: 'CTO & Product Builder', expertise: ['MVP Development', 'No-Code Tools', 'Product-Market Fit'], bio: 'Built MVPs for 15+ startups. Specializes in helping non-tech founders build their first product.', availability: 'Weekly tech office hours', avatar: '💻' },
  { id: 4, name: 'Marketing Mentor', role: 'Growth Hacker', expertise: ['Social Media', 'Content Marketing', 'Community Building'], bio: 'Grew 3 D2C brands from 0 to 1 lakh followers. Expert in low-cost marketing for student startups.', availability: 'Monthly masterclass', avatar: '📱' },
];
