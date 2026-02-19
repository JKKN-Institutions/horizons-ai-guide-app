import type { WeeklyTask } from './useStartupGuideData';

const templates: Record<string, WeeklyTask[]> = {
  Healthcare: [
    { day: 1, taskTitle: 'Visit a Local Hospital', taskDescription: 'Visit the nearest government or private hospital in your area. Observe the patient registration process. Talk to 3 patients about their biggest frustrations.', goal: 'Identify 3 pain points in hospital experience', isCompleted: false },
    { day: 2, taskTitle: 'Interview a Pharmacist', taskDescription: 'Visit 2 pharmacies near your college. Ask the pharmacist about their supply chain challenges, common customer complaints, and how they manage inventory.', goal: 'Understand medicine supply chain problems', isCompleted: false },
    { day: 3, taskTitle: 'Talk to Healthcare Workers', taskDescription: 'Interview 2 nurses or paramedic staff. Ask about their daily challenges, technology they wish they had, and biggest time-wasters in their workflow.', goal: 'Discover workflow problems in healthcare delivery', isCompleted: false },
    { day: 4, taskTitle: 'Observe a Medical Lab', taskDescription: 'Visit a diagnostic lab or medical testing center. Observe how patients book tests, wait times, and how reports are delivered. Talk to the lab technician.', goal: 'Map the patient journey in diagnostics', isCompleted: false },
    { day: 5, taskTitle: 'Research Health Apps', taskDescription: 'Download and test 3 popular health apps (Practo, PharmEasy, 1mg). Note what works well and what frustrates users. Read their negative reviews on Play Store.', goal: 'Find gaps in existing digital health solutions', isCompleted: false },
    { day: 6, taskTitle: 'Talk to Elderly Patients', taskDescription: 'Interview 3 elderly people (60+) about how they manage their health. Do they use any apps? How do they remember medicines? What help do they need?', goal: 'Understand healthcare needs of elderly population', isCompleted: false },
    { day: 7, taskTitle: 'Synthesize & Reflect', taskDescription: 'Review all your notes from Days 1-6. What problem appeared most frequently? Which group of people suffered the most? Write a detailed summary of the strongest problem you found.', goal: 'Identify the #1 healthcare problem worth solving', isCompleted: false },
  ],
  Agriculture: [
    { day: 1, taskTitle: 'Visit a Local Farm', taskDescription: 'Visit a farm within 10km of your area. Talk to the farmer about crop selection, water management, and their biggest daily challenge.', goal: 'Understand a farmer\'s daily pain points', isCompleted: false },
    { day: 2, taskTitle: 'Talk to Agricultural Shops', taskDescription: 'Visit 2 fertilizer/seed shops. Ask about what farmers complain about most, which products sell best, and supply chain issues.', goal: 'Map the agri supply chain locally', isCompleted: false },
    { day: 3, taskTitle: 'Interview Middlemen/Traders', taskDescription: 'Find a local mandi or agricultural trader. Ask how pricing works, how farmers get paid, and what technology could improve the process.', goal: 'Understand price discovery problems in agriculture', isCompleted: false },
    { day: 4, taskTitle: 'Observe Irrigation Systems', taskDescription: 'Visit 2 different farms and observe their irrigation methods. Are they using drip? Flood? How do they monitor water usage?', goal: 'Identify water management gaps', isCompleted: false },
    { day: 5, taskTitle: 'Research AgriTech Apps', taskDescription: 'Download and test 3 agritech apps (Kisan Suvidha, AgroStar, DeHaat). What works? What\'s missing? Would farmers in your area use them?', goal: 'Find gaps in existing agritech solutions', isCompleted: false },
    { day: 6, taskTitle: 'Talk to Young Farmers', taskDescription: 'Interview 3 farmers under 35. Are they open to technology? What smartphone apps do they use? What would they pay for?', goal: 'Understand tech adoption among young farmers', isCompleted: false },
    { day: 7, taskTitle: 'Synthesize & Reflect', taskDescription: 'Review all your notes from Days 1-6. What problem appeared most frequently? Which solution would farmers actually pay for? Write your detailed analysis.', goal: 'Identify the #1 agriculture problem worth solving', isCompleted: false },
  ],
  Food: [
    { day: 1, taskTitle: 'Visit 3 Local Restaurants', taskDescription: 'Visit 3 different restaurants (street food, mid-range, and premium). Observe operations, wait times, and talk to the owner about their biggest business challenge.', goal: 'Understand restaurant pain points at different scales', isCompleted: false },
    { day: 2, taskTitle: 'Talk to Food Delivery Riders', taskDescription: 'Interview 3 Zomato/Swiggy delivery riders. Ask about their biggest frustrations, earnings challenges, and what they wish was different.', goal: 'Discover delivery ecosystem problems', isCompleted: false },
    { day: 3, taskTitle: 'Interview a Cloud Kitchen Owner', taskDescription: 'Find a cloud kitchen or home-based food business. Ask about setup costs, customer acquisition, hygiene challenges, and technology they use.', goal: 'Map cloud kitchen operational challenges', isCompleted: false },
    { day: 4, taskTitle: 'Observe Food Waste', taskDescription: 'Visit a local market, restaurant kitchen, or catering service. Estimate how much food gets wasted. Talk to 3 people about why food is wasted.', goal: 'Quantify food waste problem locally', isCompleted: false },
    { day: 5, taskTitle: 'Research Food Tech Apps', taskDescription: 'Test 3 food apps beyond Zomato/Swiggy (EatSure, Box8, DotPe). Read negative reviews. What are users complaining about?', goal: 'Find gaps in food tech solutions', isCompleted: false },
    { day: 6, taskTitle: 'Talk to College Students About Food', taskDescription: 'Survey 10 students about their food habits. How much do they spend daily? What frustrates them about food options near campus?', goal: 'Understand student food market', isCompleted: false },
    { day: 7, taskTitle: 'Synthesize & Reflect', taskDescription: 'Review all your notes from Days 1-6. What food-related problem appeared most often? Who suffers most? Write your complete analysis.', goal: 'Identify the #1 food industry problem worth solving', isCompleted: false },
  ],
  Education: [
    { day: 1, taskTitle: 'Interview 5 Students', taskDescription: 'Talk to 5 students from different courses. Ask about their biggest learning challenges, what tools they use, and what frustrates them about education.', goal: 'Discover student learning pain points', isCompleted: false },
    { day: 2, taskTitle: 'Talk to 2 Teachers', taskDescription: 'Interview 2 teachers/professors. Ask about classroom challenges, grading burden, student engagement problems, and technology gaps.', goal: 'Understand teacher-side challenges', isCompleted: false },
    { day: 3, taskTitle: 'Visit a Coaching Center', taskDescription: 'Visit a local coaching center or tuition class. Observe the teaching method, student engagement, and talk to the owner about business challenges.', goal: 'Map the coaching industry ecosystem', isCompleted: false },
    { day: 4, taskTitle: 'Research EdTech Apps', taskDescription: 'Test 3 EdTech apps (Byju\'s, Unacademy, Doubtnut). What works? What doesn\'t? Read negative Play Store reviews for patterns.', goal: 'Find gaps in existing EdTech solutions', isCompleted: false },
    { day: 5, taskTitle: 'Talk to Parents', taskDescription: 'Interview 3 parents about their children\'s education. How much do they spend? What are they dissatisfied with? What would they pay for?', goal: 'Understand parent perspectives on education', isCompleted: false },
    { day: 6, taskTitle: 'Observe Skill Gaps', taskDescription: 'Talk to 3 recent graduates or job seekers. What skills do they lack? What did college NOT teach them? What would they learn if they could?', goal: 'Identify education-to-employment gaps', isCompleted: false },
    { day: 7, taskTitle: 'Synthesize & Reflect', taskDescription: 'Review all notes from Days 1-6. What education problem appeared most frequently? Who would pay to solve it? Write your complete analysis.', goal: 'Identify the #1 education problem worth solving', isCompleted: false },
  ],
  Technology: [
    { day: 1, taskTitle: 'Interview 5 Local Businesses', taskDescription: 'Visit 5 local shops/businesses near your area. Ask if they use any software, what manual work takes most time, and what technology they wish existed.', goal: 'Discover technology gaps in local businesses', isCompleted: false },
    { day: 2, taskTitle: 'Talk to Freelance Developers', taskDescription: 'Find 2 freelance developers or IT professionals. Ask about their client\'s most common requests, frustrations, and market demands.', goal: 'Understand what businesses want built', isCompleted: false },
    { day: 3, taskTitle: 'Observe Digital Adoption', taskDescription: 'Visit a government office, bank, or hospital. Observe how they use technology. What\'s still paper-based? What frustrates staff and visitors?', goal: 'Map digital adoption gaps in institutions', isCompleted: false },
    { day: 4, taskTitle: 'Research Trending Tech', taskDescription: 'Research 3 trending technologies (AI, IoT, blockchain). Find 3 Indian startups in each. What problem do they solve? What\'s missing?', goal: 'Identify technology trends with local application', isCompleted: false },
    { day: 5, taskTitle: 'Talk to Small Business Owners', taskDescription: 'Interview 3 small business owners. Do they have a website? Do they use WhatsApp for business? What would they automate if they could?', goal: 'Find SMB technology needs', isCompleted: false },
    { day: 6, taskTitle: 'Survey Students on Tech Pain Points', taskDescription: 'Ask 10 students about their biggest tech frustrations. Apps that don\'t work well? Tasks they wish were automated? Services they need?', goal: 'Identify student tech pain points', isCompleted: false },
    { day: 7, taskTitle: 'Synthesize & Reflect', taskDescription: 'Review all notes from Days 1-6. What technology gap appeared most often? Who needs it most? Write your complete analysis.', goal: 'Identify the #1 technology problem worth solving', isCompleted: false },
  ],
  Finance: [
    { day: 1, taskTitle: 'Visit a Bank Branch', taskDescription: 'Visit a local bank. Observe customer wait times, common complaints, and talk to 3 customers about their banking frustrations.', goal: 'Discover banking pain points', isCompleted: false },
    { day: 2, taskTitle: 'Talk to Street Vendors About Payments', taskDescription: 'Interview 5 street vendors or small shop owners. Do they accept UPI? What payment problems do they face? How do they track finances?', goal: 'Understand small business payment challenges', isCompleted: false },
    { day: 3, taskTitle: 'Interview Young Professionals', taskDescription: 'Talk to 3 working professionals (25-35). How do they save money? What financial tools do they use? What frustrates them about managing finances?', goal: 'Map personal finance pain points', isCompleted: false },
    { day: 4, taskTitle: 'Research FinTech Apps', taskDescription: 'Test 3 FinTech apps (Groww, CRED, Jupiter). What works well? What doesn\'t? Read negative reviews for common complaints.', goal: 'Find gaps in existing FinTech solutions', isCompleted: false },
    { day: 5, taskTitle: 'Talk to Insurance Agents', taskDescription: 'Interview 2 insurance agents. What do customers complain about? What\'s the hardest part of selling insurance? What technology could help?', goal: 'Understand insurance industry challenges', isCompleted: false },
    { day: 6, taskTitle: 'Survey Students on Money', taskDescription: 'Ask 10 students about money management. Do they budget? Save? Invest? What would help them manage money better?', goal: 'Discover student financial needs', isCompleted: false },
    { day: 7, taskTitle: 'Synthesize & Reflect', taskDescription: 'Review all notes from Days 1-6. What financial problem appeared most often? Who would pay to solve it? Write your complete analysis.', goal: 'Identify the #1 finance problem worth solving', isCompleted: false },
  ],
};

// Fallback: generic tasks for unlisted fields
const genericTasks: WeeklyTask[] = [
  { day: 1, taskTitle: 'Talk to 5 People in Your Field', taskDescription: 'Find 5 people who work in your chosen field locally. Interview them about their biggest daily challenges and frustrations.', goal: 'Identify 5 real-world pain points', isCompleted: false },
  { day: 2, taskTitle: 'Visit 3 Related Businesses', taskDescription: 'Visit 3 businesses related to your field in your area. Observe operations, talk to owners and customers about problems they face.', goal: 'Map the local business ecosystem', isCompleted: false },
  { day: 3, taskTitle: 'Interview Customers/Users', taskDescription: 'Find 5 end-users or customers in your domain. Ask what frustrates them most, what solutions they\'ve tried, and what they wish existed.', goal: 'Understand customer pain points deeply', isCompleted: false },
  { day: 4, taskTitle: 'Research Existing Solutions', taskDescription: 'Find and test 3 existing apps or services in your field. Read their negative reviews. What do users complain about?', goal: 'Identify gaps in current solutions', isCompleted: false },
  { day: 5, taskTitle: 'Observe the Supply Chain', taskDescription: 'Trace how products/services in your field reach the end user. Who are the middlemen? Where does value get lost? What could be improved?', goal: 'Map the value chain and find inefficiencies', isCompleted: false },
  { day: 6, taskTitle: 'Survey 10 People', taskDescription: 'Create a quick 5-question survey about the problems you\'ve observed. Get 10 responses from relevant people. Look for patterns.', goal: 'Validate your observations with data', isCompleted: false },
  { day: 7, taskTitle: 'Synthesize & Reflect', taskDescription: 'Review all your notes from Days 1-6. What problem appeared most frequently? Who suffers the most? Write a detailed analysis of the strongest problem.', goal: 'Identify the #1 problem worth solving', isCompleted: false },
];

export function getLocalTasks(field: string, location: string): WeeklyTask[] {
  const fieldTasks = templates[field] || genericTasks;
  // Inject location into task descriptions
  return fieldTasks.map(t => ({
    ...t,
    taskDescription: t.taskDescription.replace(/your area|your city|locally|near your college/gi, `in ${location}`),
  }));
}
