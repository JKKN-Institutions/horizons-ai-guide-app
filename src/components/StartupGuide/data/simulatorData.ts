export interface SimulatorScenario {
  id: number;
  month: number;
  title: string;
  context: string;
  choices: SimulatorChoice[];
  debrief: string;
}

export interface SimulatorChoice {
  id: number;
  text: string;
  cashImpact: number;
  moraleImpact: number;
  outcome: string;
  isOptimal: boolean;
}

export const simulatorScenarios: SimulatorScenario[] = [
  {
    id: 1, month: 1, title: 'The Launch Decision',
    context: 'You have a food delivery idea for your college campus. You have ₹10,000 savings. Your friend says "Build an app first!" but that costs ₹2-3 lakh. What do you do?',
    choices: [
      { id: 1, text: 'Build a full app with a freelancer (₹2.5 lakh loan)', cashImpact: -250000, moraleImpact: -10, outcome: 'You spent 3 months and ₹2.5 lakh on an app nobody uses. Classic mistake — 90% of startup failures start here.', isOptimal: false },
      { id: 2, text: 'Start with WhatsApp orders + bicycle delivery', cashImpact: -2000, moraleImpact: 20, outcome: 'Brilliant! You validated demand with ₹2,000 (phone + bicycle costs). You got 15 orders in week 1. Now you KNOW people want this.', isOptimal: true },
      { id: 3, text: 'Wait until you have more money', cashImpact: 0, moraleImpact: -15, outcome: 'You waited 6 months and someone else launched the same idea. In startups, speed beats perfection.', isOptimal: false },
    ],
    debrief: 'The Lean Startup principle: Always validate before building. Dropbox started with just a video. Zappos started by posting shoe photos online and buying from local stores. Your MVP should cost near-zero.',
  },
  {
    id: 2, month: 2, title: 'Your First Cash Flow Crisis',
    context: 'Your campus food delivery is growing — 50 orders/day! But you\'re paying delivery partners daily (₹30/order = ₹1,500/day) while customers pay monthly. You have ₹8,000 left. You\'ll run out of cash in 5 days.',
    choices: [
      { id: 1, text: 'Switch to prepaid-only orders immediately', cashImpact: 15000, moraleImpact: -5, outcome: 'You lost 30% of customers who preferred pay-later, but your cash flow is now positive. Smart survival move.', isOptimal: true },
      { id: 2, text: 'Borrow ₹50,000 from family to keep going', cashImpact: 50000, moraleImpact: -10, outcome: 'You survived this month, but you didn\'t fix the root problem. Next month you\'ll face the same crisis with family money at risk.', isOptimal: false },
      { id: 3, text: 'Reduce delivery partner pay to ₹20/order', cashImpact: 5000, moraleImpact: -25, outcome: 'Your best delivery partner quit immediately. Others are unhappy and slow. Orders are getting delayed. Revenue drops 40%.', isOptimal: false },
    ],
    debrief: '82% of startups fail due to cash flow problems. The #1 rule: Cash is oxygen. Change your payment terms, reduce costs, or increase prices — but NEVER run out of cash. Prepaid models are safer for early-stage startups.',
  },
  {
    id: 3, month: 3, title: 'The Copycat Appears',
    context: 'A senior student with more money just launched an identical food delivery service on your campus with lower prices and a proper app. Your orders dropped 40% in one week. What do you do?',
    choices: [
      { id: 1, text: 'Match their lower prices', cashImpact: -5000, moraleImpact: -10, outcome: 'Price war! You both lose money. They have more funding so they\'ll outlast you. You go bankrupt in 2 months.', isOptimal: false },
      { id: 2, text: 'Focus on what they CAN\'T copy — speed and personal service', cashImpact: 2000, moraleImpact: 15, outcome: 'You promise 15-minute delivery (they take 30). You remember every customer\'s favorite order. Your loyal customers come back. Niche > mass market.', isOptimal: true },
      { id: 3, text: 'Expand to a different campus where they\'re not present', cashImpact: -8000, moraleImpact: 5, outcome: 'Expansion costs you time and money. Your original campus customers leave. You\'re now fighting on two fronts with limited resources.', isOptimal: false },
    ],
    debrief: 'Competition is inevitable. The response is NEVER to compete on price (unless you\'re Amazon). Instead, differentiate: speed, quality, service, niche focus. Zomato beat Swiggy in some cities through restaurant-exclusive deals, not price cuts.',
  },
  {
    id: 4, month: 4, title: 'The Hiring Dilemma',
    context: 'You\'re doing everything yourself: taking orders, managing delivery partners, handling complaints, updating menus. You\'re exhausted and making mistakes. You need help but can\'t afford a full salary.',
    choices: [
      { id: 1, text: 'Hire a full-time operations manager at ₹15,000/month', cashImpact: -15000, moraleImpact: 10, outcome: 'Good hire! But ₹15,000/month is 60% of your profit. You need to grow revenue fast or this hire becomes unsustainable.', isOptimal: false },
      { id: 2, text: 'Offer a friend 10% equity + small stipend to join as co-founder', cashImpact: -3000, moraleImpact: 25, outcome: 'Perfect! Your friend brings complementary skills, shares the workload AND the risk. You gave up 10% equity but gained 50% more capacity.', isOptimal: true },
      { id: 3, text: 'Automate with technology — build a basic order management system', cashImpact: -5000, moraleImpact: 5, outcome: 'Good thinking long-term, but automation takes 2 months to build. You need help NOW. You burn out before it\'s ready.', isOptimal: false },
    ],
    debrief: 'Finding a co-founder is one of the most important startup decisions. The best co-founders have complementary skills (you\'re ops, they\'re tech), shared values, and "skin in the game" through equity. Never hire when you can partner.',
  },
  {
    id: 5, month: 5, title: 'The Pivot Moment',
    context: 'After 5 months, you realize campus food delivery has thin margins (₹5/order profit). But you notice that students spend ₹500-1000/month on stationery and printing — and there\'s no convenient option. Should you pivot?',
    choices: [
      { id: 1, text: 'Abandon food delivery completely and switch to stationery', cashImpact: -5000, moraleImpact: -15, outcome: 'You lost all your food delivery customers and brand. Starting from zero again. The stationery idea might work, but you threw away months of effort.', isOptimal: false },
      { id: 2, text: 'Keep food delivery AND add stationery delivery as a new vertical', cashImpact: 3000, moraleImpact: 20, outcome: 'Smart! You leverage your existing delivery network and customer base. Stationery has higher margins (₹15/order). Revenue diversification!', isOptimal: true },
      { id: 3, text: 'Ignore it — stay focused on food delivery only', cashImpact: 0, moraleImpact: -5, outcome: 'Focus is good, but ignoring a clearly better opportunity when you have the infrastructure is a missed opportunity. Your thin margins continue to squeeze you.', isOptimal: false },
    ],
    debrief: 'Pivoting doesn\'t mean abandoning everything. The best pivots leverage existing strengths. Slack pivoted from a gaming company — but kept the internal chat tool they\'d built. Instagram pivoted from Burbn — but kept the photo filter feature. Pivot with purpose.',
  },
  {
    id: 6, month: 6, title: 'The Angry Customer',
    context: 'A customer posted a scathing review on your college WhatsApp group: "Terrible service! Order was 45 minutes late and food was cold. Never ordering again. AVOID!" 200 students saw it. Orders drop 25% next day.',
    choices: [
      { id: 1, text: 'Reply publicly defending yourself and explaining what went wrong', cashImpact: -3000, moraleImpact: -15, outcome: 'Your defensive reply made you look worse. Other students piled on. "They don\'t even accept responsibility!" Never argue with a customer publicly.', isOptimal: false },
      { id: 2, text: 'Reply publicly apologizing, offer free order, AND fix the root cause', cashImpact: -500, moraleImpact: 20, outcome: 'The student was impressed by your response. They edited their post: "UPDATE: They apologized and fixed the issue. Giving them another chance." Other students respected your maturity.', isOptimal: true },
      { id: 3, text: 'Ignore it — the controversy will die down', cashImpact: -8000, moraleImpact: -20, outcome: 'It didn\'t die down. Two more students posted similar complaints. Without a response, the narrative became "they don\'t care about customers." Orders dropped 40%.', isOptimal: false },
    ],
    debrief: 'Customer complaints are GIFTS. They tell you what\'s broken. The best response: 1) Acknowledge publicly, 2) Apologize sincerely, 3) Fix the root cause, 4) Follow up. Companies like Zappos and Amazon built empires on customer service excellence.',
  },
];

export const getScenarioById = (id: number) => simulatorScenarios.find(s => s.id === id);
export const getTotalScenarios = () => simulatorScenarios.length;
