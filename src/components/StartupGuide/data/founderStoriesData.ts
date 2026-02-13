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
    id: 1, name: 'P.C. Duraisamy & Shanthi Duraisamy', company: 'Sakthi Masala', industry: 'FMCG / Spices',
    startAge: 30, startYear: 1975, location: 'Erode, Tamil Nadu',
    initialInvestment: '₹Small (turmeric trading profits)', currentValuation: '₹2,000+ Crore',
    keyLesson: 'You don\'t need a tech background — start with what your region is famous for. Look at your own kitchen for startup ideas.',
    story: 'Mr. P.C. Duraisamy started as a small turmeric trader in Erode. He and his wife Shanthi noticed that as more women started working, they didn\'t have time to grind traditional spices at home every day. Their solution: sell high-quality, pre-ground masalas that tasted like "home-cooked" food. They built trust through relentless focus on purity, competing against national brands. Sakthi Masala is also famous for hiring a large number of differently-abled individuals — proving a business can be successful and kind at the same time. From a small shop in Erode to a massive factory, their story is the most relatable for Tamil Nadu students.',
    frameworks: ['Regional Advantage', 'Solve a Home Problem', 'Trust-Based Branding', 'Social Impact'],
    avatar: '🌶️',
  },
  {
    id: 2, name: 'A.D. Padmasingh Isaac', company: 'Aachi Group', industry: 'FMCG / Spices',
    startAge: 28, startYear: 1995, location: 'Nazareth, Tirunelveli, Tamil Nadu',
    initialInvestment: '₹Minimal (hocked wife\'s jewelry)', currentValuation: '₹4,000+ Crore',
    keyLesson: 'You don\'t need a fancy degree or huge capital — just understand what people in your community need.',
    story: 'Born in Nazareth, Tirunelveli, into a farming family, he lost his father at age 12. His mother had only a 5th-grade education. While working for a soap company, he spotted a gap: branded, quality spice mixes. He was so committed he even pawned his wife\'s jewelry to fund his early ventures. Today, Aachi is a household name worldwide — proof that grit from a small town can build a global brand.',
    frameworks: ['Community-First Business', 'Bootstrap with Sacrifice', 'Gap Identification', 'Small Town to Global'],
    avatar: '👑',
  },
  {
    id: 3, name: 'Sridhar Vembu', company: 'Zoho', industry: 'SaaS / Technology',
    startAge: 28, startYear: 1996, location: 'Tenkasi, Tamil Nadu',
    initialInvestment: '₹Minimal', currentValuation: '$5 Billion+',
    keyLesson: 'You can build a world-class technology company right from a village in Tamil Nadu.',
    story: 'Zoho is a global SaaS giant competing with Google and Microsoft. But what makes Sridhar Vembu\'s story unique is his decision to move back to a rural village in Tenkasi, Tamil Nadu, to run the company. He focuses on creating high-tech jobs in rural areas so talented students don\'t have to leave their hometowns. Zoho has never taken VC funding — it\'s 100% bootstrapped and profitable.',
    frameworks: ['Rural Innovation', 'Bootstrapped SaaS', 'Reverse Brain Drain', 'No-VC Model'],
    avatar: '💻',
  },
  {
    id: 4, name: 'Harpita Pandian', company: 'Classminds', industry: 'EdTech',
    startAge: 16, startYear: 2018, location: 'Tamil Nadu',
    initialInvestment: '₹0', currentValuation: 'Impact: 8,000+ students across 15 countries',
    keyLesson: 'Age is not a barrier to becoming an entrepreneur or an educator.',
    story: 'Harpita and her twin brother founded Classminds, an EdTech platform, while they were still school students. They\'ve impacted over 8,000 students across 15 countries and even collaborated with the Tamil Nadu State Government on educational content. Their journey proves that you can start building something meaningful right from your classroom.',
    frameworks: ['Student Founder', 'Education-First Impact', 'Government Collaboration', 'Youth Leadership'],
    avatar: '🎓',
  },
  {
    id: 5, name: 'Santhosh & Sai', company: 'Printwear Company', industry: 'E-commerce / Print-on-Demand',
    startAge: 22, startYear: 2019, location: 'Small town, Tamil Nadu',
    initialInvestment: '₹Minimal', currentValuation: '$1 Million+',
    keyLesson: 'You don\'t need a "big city" or an "elite degree" to build a million-dollar startup.',
    story: 'Two young men from a small town in Tamil Nadu, from lower-middle-class families, with no IIT or IIM degree. They noticed small businesses struggled with high inventory costs and used "print-on-demand" to solve it — customers order, they print and ship, zero inventory risk. They turned this simple insight into a million-dollar enterprise, proving that smart execution beats elite pedigree.',
    frameworks: ['Print-on-Demand', 'Zero Inventory Model', 'Small Town Hustle', 'Lean Startup'],
    avatar: '👕',
  },
  {
    id: 6, name: 'Anumadhubala R', company: 'Skyline Space', industry: 'Space Tech / Education',
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
