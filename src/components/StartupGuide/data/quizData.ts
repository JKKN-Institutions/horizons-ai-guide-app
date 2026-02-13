export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

export const moneyMinuteQuestions: QuizQuestion[] = [
  { id: 1, question: 'If you invest ₹1,000/month in an SIP with 12% annual returns, how much will you have after 10 years?', options: ['₹1,20,000', '₹2,32,000', '₹1,80,000', '₹3,00,000'], correctAnswer: 1, explanation: 'Thanks to compound interest, ₹1,000/month at 12% grows to approximately ₹2,32,000 in 10 years. Your investment of ₹1,20,000 nearly doubles!', category: 'Personal Finance' },
  { id: 2, question: 'What does "break-even" mean for a startup?', options: ['Making ₹1 crore in revenue', 'Revenue equals total costs', 'Getting your first customer', 'Paying back investors'], correctAnswer: 1, explanation: 'Break-even is when your total revenue equals your total costs. After this point, every additional sale is profit. Most startups aim to reach break-even within 12-18 months.', category: 'Startup Finance' },
  { id: 3, question: 'A food delivery startup charges ₹60 per delivery. Costs: ₹35 rider pay, ₹10 packaging, ₹5 platform. Monthly fixed costs: ₹50,000. How many deliveries to break even?', options: ['500', '1000', '5000', '2500'], correctAnswer: 2, explanation: 'Profit per delivery = ₹60 - ₹35 - ₹10 - ₹5 = ₹10. To cover ₹50,000 fixed costs: ₹50,000 ÷ ₹10 = 5,000 deliveries needed per month.', category: 'Startup Finance' },
  { id: 4, question: 'What is GST registration mandatory for businesses with turnover above?', options: ['₹5 lakh', '₹10 lakh', '₹20 lakh', '₹40 lakh'], correctAnswer: 2, explanation: 'GST registration is mandatory for businesses with annual turnover exceeding ₹20 lakh (₹10 lakh for special category states). Below this, it\'s optional but can be beneficial.', category: 'Legal' },
  { id: 5, question: 'What is "revenue" vs "profit"?', options: ['They\'re the same thing', 'Revenue is total income; profit is revenue minus costs', 'Profit is total income; revenue is profit minus costs', 'Revenue is only from products; profit includes services'], correctAnswer: 1, explanation: 'Revenue is total money earned from sales. Profit = Revenue - All Costs (materials, salaries, rent, etc.). A company can have ₹10 crore revenue but ₹0 profit if costs equal ₹10 crore.', category: 'Startup Finance' },
  { id: 6, question: 'Which Mudra loan category offers up to ₹50,000?', options: ['Tarun', 'Kishore', 'Shishu', 'Yuva'], correctAnswer: 2, explanation: 'PMMY Mudra Loans have 3 categories: Shishu (up to ₹50,000), Kishore (₹50,000 to ₹5 lakh), and Tarun (₹5 lakh to ₹10 lakh). No collateral needed!', category: 'Funding' },
  { id: 7, question: 'If your CAC (Customer Acquisition Cost) is ₹200 and LTV (Lifetime Value) is ₹150, what should you do?', options: ['Scale up marketing immediately', 'Shut down the business', 'Reduce CAC or increase LTV before scaling', 'Raise more funding'], correctAnswer: 2, explanation: 'If CAC > LTV, you LOSE money on every customer. You must either reduce acquisition costs or increase customer lifetime value (through upselling, retention, price increases) before scaling.', category: 'Startup Finance' },
  { id: 8, question: 'What is compound interest often called?', options: ['The magic formula', 'The 8th wonder of the world', 'The golden ratio', 'The money multiplier'], correctAnswer: 1, explanation: 'Albert Einstein reportedly called compound interest "the 8th wonder of the world." It means earning interest on your interest — the reason ₹1,000/month can become ₹2.3 crore in 30 years at 12% returns.', category: 'Personal Finance' },
  { id: 9, question: 'A startup has ₹5,00,000 revenue and ₹4,50,000 costs. What is its profit margin?', options: ['5%', '10%', '50%', '90%'], correctAnswer: 1, explanation: 'Profit = ₹5,00,000 - ₹4,50,000 = ₹50,000. Profit margin = (₹50,000 / ₹5,00,000) × 100 = 10%. Most startups operate at thin margins initially.', category: 'Startup Finance' },
  { id: 10, question: 'What does DPIIT stand for in Startup India?', options: ['Department of Policy for Indian Industries & Trade', 'Department for Promotion of Industry and Internal Trade', 'Digital Platform for Indian Innovation & Technology', 'Development Program for IT Industries'], correctAnswer: 1, explanation: 'DPIIT = Department for Promotion of Industry and Internal Trade. Getting DPIIT recognition is the first step to accessing Startup India benefits like tax exemptions and funding.', category: 'Legal' },
];

export const problemOfTheDay = [
  { id: 1, problem: 'Students in rural Tamil Nadu waste 2-3 hours daily commuting to coaching centers for competitive exam prep.', context: 'Over 8 lakh students appear for NEET from TN alone. Many travel 30-60 km for quality coaching.', hint: 'Think about what Byju\'s did — but for a specific underserved segment.' },
  { id: 2, problem: 'Small vegetable vendors lose 30-40% of their produce due to lack of cold storage and unpredictable demand.', context: 'India wastes ₹92,000 crore worth of food annually. Most wastage happens at the last mile — small vendors and kirana stores.', hint: 'Could you predict demand? Or connect surplus to someone who needs it?' },
  { id: 3, problem: 'Auto-rickshaw drivers in tier-2 cities lose 40% of their day waiting for passengers at stands.', context: 'Ola/Uber focus on tier-1 cities. In tier-2/3 cities, auto drivers still rely on stand-based waiting.', hint: 'A simpler, cheaper version of ride-hailing designed specifically for autos in small cities.' },
  { id: 4, problem: 'Senior citizens living alone often miss medication doses and can\'t easily communicate health emergencies.', context: 'India has 140 million senior citizens. 15 million live alone. Most smart health solutions are too complex for them.', hint: 'Think simple — very simple. What\'s simpler than an app?' },
  { id: 5, problem: 'Local artisans (pottery, weaving, woodwork) can\'t reach customers beyond their village, selling through middlemen at 30% of fair price.', context: 'India\'s handicraft industry is worth ₹50,000 crore but artisans earn an average of ₹5,000/month.', hint: 'How did Meesho empower small sellers? Apply that thinking to artisans.' },
  { id: 6, problem: 'Farmers don\'t know the fair market price for their crops and often sell at 40-60% below market rate to local traders.', context: 'Despite government MSP, most farmers sell to middlemen. Real-time price information could change everything.', hint: 'What if every farmer had price data on their basic phone — not smartphone?' },
  { id: 7, problem: 'Temple festivals and local events generate zero revenue for the organizing committee after expenses, despite attracting thousands.', context: 'India has over 2 million temples. Festival organizing is chaotic, expensive, and financially unsustainable.', hint: 'Think sponsorships, digital payments for donations, vendor management — not just one thing.' },
];

export const getDailyProblem = () => {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return problemOfTheDay[dayOfYear % problemOfTheDay.length];
};

export const getDailyQuiz = (count = 3) => {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const shuffled = [...moneyMinuteQuestions].sort((a, b) => {
    const ha = (a.id * 2654435761 + dayOfYear) % 1000;
    const hb = (b.id * 2654435761 + dayOfYear) % 1000;
    return ha - hb;
  });
  return shuffled.slice(0, count);
};
