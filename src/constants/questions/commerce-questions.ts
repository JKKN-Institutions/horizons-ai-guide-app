import { Question } from './types';

export const COMMERCE_QUESTIONS: Question[] = [
  // Business scenarios (1-20)
  {
    id: "com_001",
    scenario: "Your family business is struggling with inventory management. What would you suggest?",
    options: [
      { id: "A", text: "Implement a digital inventory tracking system", traits: ["technical", "modern"] },
      { id: "B", text: "Analyze sales patterns to optimize stock", traits: ["analytical", "data-driven"] },
      { id: "C", text: "Negotiate better terms with suppliers", traits: ["negotiation", "relationship"] },
      { id: "D", text: "Reduce product variety to simplify", traits: ["practical", "efficient"] }
    ]
  },
  {
    id: "com_002",
    scenario: "A customer complains about a product publicly on social media. How would you respond?",
    options: [
      { id: "A", text: "Respond publicly with empathy and resolution", traits: ["communicative", "transparent"] },
      { id: "B", text: "Take the conversation private immediately", traits: ["diplomatic", "discreet"] },
      { id: "C", text: "Investigate internally before responding", traits: ["thorough", "careful"] },
      { id: "D", text: "Offer compensation to resolve quickly", traits: ["action-oriented", "customer-focused"] }
    ]
  },
  {
    id: "com_003",
    scenario: "You notice a competitor is gaining market share. What do you analyze first?",
    options: [
      { id: "A", text: "Their pricing strategy", traits: ["analytical", "competitive"] },
      { id: "B", text: "Their marketing and messaging", traits: ["marketing", "strategic"] },
      { id: "C", text: "Customer reviews and feedback", traits: ["customer-focused", "research"] },
      { id: "D", text: "Their product or service differences", traits: ["product-focused", "detailed"] }
    ]
  },
  {
    id: "com_004",
    scenario: "You're starting a small business with limited capital. What do you prioritize?",
    options: [
      { id: "A", text: "Product quality and customer satisfaction", traits: ["quality", "customer-focused"] },
      { id: "B", text: "Marketing to build awareness", traits: ["marketing", "growth-oriented"] },
      { id: "C", text: "Keeping costs minimal", traits: ["frugal", "practical"] },
      { id: "D", text: "Building a strong team", traits: ["people-focused", "foundational"] }
    ]
  },
  {
    id: "com_005",
    scenario: "A business partnership opportunity arises. What do you evaluate first?",
    options: [
      { id: "A", text: "Financial benefits and risks", traits: ["financial", "analytical"] },
      { id: "B", text: "Cultural and values alignment", traits: ["values-driven", "relational"] },
      { id: "C", text: "Legal and contractual terms", traits: ["legal", "cautious"] },
      { id: "D", text: "Strategic fit and synergies", traits: ["strategic", "long-term"] }
    ]
  },
  {
    id: "com_006",
    scenario: "Your business idea requires significant investment. How do you proceed?",
    options: [
      { id: "A", text: "Bootstrap and start small", traits: ["independent", "careful"] },
      { id: "B", text: "Seek investors or venture capital", traits: ["ambitious", "growth-oriented"] },
      { id: "C", text: "Apply for bank loans", traits: ["traditional", "structured"] },
      { id: "D", text: "Find a partner to share investment", traits: ["collaborative", "risk-sharing"] }
    ]
  },
  {
    id: "com_007",
    scenario: "Sales are declining. What's your first diagnostic step?",
    options: [
      { id: "A", text: "Analyze sales data for patterns", traits: ["analytical", "data-driven"] },
      { id: "B", text: "Talk to customers and salespeople", traits: ["communicative", "frontline"] },
      { id: "C", text: "Review market and competitor changes", traits: ["market-aware", "strategic"] },
      { id: "D", text: "Check product quality and feedback", traits: ["quality-focused", "detailed"] }
    ]
  },
  {
    id: "com_008",
    scenario: "An employee suggests an unconventional idea. How do you respond?",
    options: [
      { id: "A", text: "Evaluate it objectively on merit", traits: ["fair", "analytical"] },
      { id: "B", text: "Encourage experimentation", traits: ["innovative", "supportive"] },
      { id: "C", text: "Check if it aligns with company goals", traits: ["strategic", "aligned"] },
      { id: "D", text: "Ask for a detailed proposal", traits: ["thorough", "systematic"] }
    ]
  },
  {
    id: "com_009",
    scenario: "You need to choose between expanding product line or deepening market. Your choice?",
    options: [
      { id: "A", text: "Expand products for growth", traits: ["growth", "expansive"] },
      { id: "B", text: "Deepen market for stability", traits: ["focused", "stable"] },
      { id: "C", text: "Depends on market research", traits: ["data-driven", "analytical"] },
      { id: "D", text: "Do both gradually", traits: ["balanced", "comprehensive"] }
    ]
  },
  {
    id: "com_010",
    scenario: "E-commerce is disrupting your traditional business. What's your strategy?",
    options: [
      { id: "A", text: "Embrace and go online strongly", traits: ["adaptive", "digital"] },
      { id: "B", text: "Focus on what online can't offer", traits: ["differentiated", "experiential"] },
      { id: "C", text: "Develop omnichannel presence", traits: ["comprehensive", "modern"] },
      { id: "D", text: "Partner with e-commerce platforms", traits: ["collaborative", "leveraging"] }
    ]
  },
  {
    id: "com_011",
    scenario: "You discover a profitable business practice that's ethically questionable. What do you do?",
    options: [
      { id: "A", text: "Avoid it regardless of profit", traits: ["ethical", "principled"] },
      { id: "B", text: "Check if it's legally allowed", traits: ["compliance", "cautious"] },
      { id: "C", text: "Consider reputation risks", traits: ["strategic", "long-term"] },
      { id: "D", text: "Find ethical alternatives", traits: ["creative", "solution-focused"] }
    ]
  },
  {
    id: "com_012",
    scenario: "A key supplier suddenly raises prices significantly. Your response?",
    options: [
      { id: "A", text: "Negotiate firmly for better terms", traits: ["negotiation", "assertive"] },
      { id: "B", text: "Look for alternative suppliers", traits: ["resourceful", "independent"] },
      { id: "C", text: "Absorb costs temporarily while finding solutions", traits: ["patient", "strategic"] },
      { id: "D", text: "Pass costs to customers if necessary", traits: ["practical", "realistic"] }
    ]
  },
  {
    id: "com_013",
    scenario: "You're planning a business expansion. What research do you prioritize?",
    options: [
      { id: "A", text: "Market size and growth potential", traits: ["market", "opportunity"] },
      { id: "B", text: "Competition and barriers to entry", traits: ["competitive", "analytical"] },
      { id: "C", text: "Regulatory and legal requirements", traits: ["compliance", "thorough"] },
      { id: "D", text: "Resource and capability needs", traits: ["internal", "practical"] }
    ]
  },
  {
    id: "com_014",
    scenario: "Your business receives a buyout offer. What factors do you consider?",
    options: [
      { id: "A", text: "Financial valuation and terms", traits: ["financial", "analytical"] },
      { id: "B", text: "Future of employees and culture", traits: ["people-focused", "responsible"] },
      { id: "C", text: "Your personal goals and vision", traits: ["personal", "strategic"] },
      { id: "D", text: "Impact on customers and partners", traits: ["stakeholder-focused", "comprehensive"] }
    ]
  },
  {
    id: "com_015",
    scenario: "Cash flow is tight but growth opportunities exist. How do you balance?",
    options: [
      { id: "A", text: "Prioritize cash flow stability", traits: ["conservative", "prudent"] },
      { id: "B", text: "Invest in growth strategically", traits: ["growth", "risk-taking"] },
      { id: "C", text: "Seek external funding for growth", traits: ["resourceful", "ambitious"] },
      { id: "D", text: "Cut costs elsewhere to fund growth", traits: ["efficient", "reallocation"] }
    ]
  },
  {
    id: "com_016",
    scenario: "A major client threatens to leave. How do you respond?",
    options: [
      { id: "A", text: "Understand their concerns deeply", traits: ["empathetic", "listening"] },
      { id: "B", text: "Offer concessions to retain them", traits: ["accommodating", "client-focused"] },
      { id: "C", text: "Evaluate if they're worth retaining", traits: ["analytical", "strategic"] },
      { id: "D", text: "Diversify to reduce dependence", traits: ["prudent", "long-term"] }
    ]
  },
  {
    id: "com_017",
    scenario: "Technology can automate some jobs in your company. What do you do?",
    options: [
      { id: "A", text: "Implement with plans to retrain employees", traits: ["responsible", "modern"] },
      { id: "B", text: "Delay to preserve jobs", traits: ["people-focused", "conservative"] },
      { id: "C", text: "Gradually implement to manage transition", traits: ["balanced", "gradual"] },
      { id: "D", text: "Full automation for efficiency", traits: ["efficient", "profit-focused"] }
    ]
  },
  {
    id: "com_018",
    scenario: "You need to hire for a key position. What do you prioritize?",
    options: [
      { id: "A", text: "Skills and experience", traits: ["competence", "practical"] },
      { id: "B", text: "Cultural fit and attitude", traits: ["cultural", "values-focused"] },
      { id: "C", text: "Growth potential and learning ability", traits: ["developmental", "future-focused"] },
      { id: "D", text: "Balance of all factors", traits: ["comprehensive", "balanced"] }
    ]
  },
  {
    id: "com_019",
    scenario: "A product recall is necessary. How do you handle communication?",
    options: [
      { id: "A", text: "Full transparency immediately", traits: ["transparent", "honest"] },
      { id: "B", text: "Controlled release with solution", traits: ["strategic", "prepared"] },
      { id: "C", text: "Legal review before communication", traits: ["cautious", "protected"] },
      { id: "D", text: "Direct outreach to affected customers", traits: ["customer-focused", "proactive"] }
    ]
  },
  {
    id: "com_020",
    scenario: "You're mentoring a young entrepreneur. What advice do you emphasize?",
    options: [
      { id: "A", text: "Understand your customers deeply", traits: ["customer-focused", "foundational"] },
      { id: "B", text: "Watch your cash flow carefully", traits: ["financial", "practical"] },
      { id: "C", text: "Be prepared to pivot and adapt", traits: ["flexible", "resilient"] },
      { id: "D", text: "Build a strong network", traits: ["networked", "relational"] }
    ]
  },
  // Finance situations (21-40)
  {
    id: "com_021",
    scenario: "You're analyzing an investment opportunity. What metric matters most to you?",
    options: [
      { id: "A", text: "Return on investment (ROI)", traits: ["return-focused", "analytical"] },
      { id: "B", text: "Risk assessment and volatility", traits: ["risk-aware", "cautious"] },
      { id: "C", text: "Cash flow generation", traits: ["cash-focused", "practical"] },
      { id: "D", text: "Long-term growth potential", traits: ["growth-oriented", "patient"] }
    ]
  },
  {
    id: "com_022",
    scenario: "A client wants aggressive investments but their risk profile suggests otherwise. What do you do?",
    options: [
      { id: "A", text: "Educate them about risk-return tradeoffs", traits: ["educational", "advisory"] },
      { id: "B", text: "Follow their wishes as it's their money", traits: ["client-directed", "neutral"] },
      { id: "C", text: "Propose a balanced compromise", traits: ["balanced", "diplomatic"] },
      { id: "D", text: "Document concerns and proceed cautiously", traits: ["protective", "careful"] }
    ]
  },
  {
    id: "com_023",
    scenario: "You spot what looks like a financial irregularity in reports. What's your first step?",
    options: [
      { id: "A", text: "Investigate further before raising", traits: ["thorough", "careful"] },
      { id: "B", text: "Report to supervisor immediately", traits: ["transparent", "following-process"] },
      { id: "C", text: "Check if it could be an honest error", traits: ["fair", "understanding"] },
      { id: "D", text: "Document and preserve evidence", traits: ["systematic", "protective"] }
    ]
  },
  {
    id: "com_024",
    scenario: "Markets are volatile. How do you advise a nervous investor?",
    options: [
      { id: "A", text: "Stay the course with long-term view", traits: ["patient", "strategic"] },
      { id: "B", text: "Review and rebalance if needed", traits: ["active", "responsive"] },
      { id: "C", text: "Move to safer assets temporarily", traits: ["protective", "conservative"] },
      { id: "D", text: "Use volatility as buying opportunity", traits: ["opportunistic", "bold"] }
    ]
  },
  {
    id: "com_025",
    scenario: "A company's stock is undervalued but has governance concerns. Do you invest?",
    options: [
      { id: "A", text: "Avoid - governance is fundamental", traits: ["principled", "risk-averse"] },
      { id: "B", text: "Limited investment with monitoring", traits: ["balanced", "watchful"] },
      { id: "C", text: "Invest and engage for change", traits: ["activist", "engaged"] },
      { id: "D", text: "Depends on the specific concerns", traits: ["analytical", "case-by-case"] }
    ]
  },
  {
    id: "com_026",
    scenario: "You need to prepare a budget for next year. What's your approach?",
    options: [
      { id: "A", text: "Start from last year with adjustments", traits: ["incremental", "practical"] },
      { id: "B", text: "Zero-based budgeting from scratch", traits: ["thorough", "fresh"] },
      { id: "C", text: "Focus on strategic priorities", traits: ["strategic", "goal-oriented"] },
      { id: "D", text: "Build in flexibility for changes", traits: ["adaptive", "realistic"] }
    ]
  },
  {
    id: "com_027",
    scenario: "A company's earnings look good but cash flow is weak. What concerns you?",
    options: [
      { id: "A", text: "Accounting might be aggressive", traits: ["skeptical", "analytical"] },
      { id: "B", text: "Working capital management issues", traits: ["operational", "detailed"] },
      { id: "C", text: "Growth eating up cash", traits: ["contextual", "understanding"] },
      { id: "D", text: "All warrant further investigation", traits: ["thorough", "comprehensive"] }
    ]
  },
  {
    id: "com_028",
    scenario: "Interest rates are rising. How does this affect your analysis?",
    options: [
      { id: "A", text: "Adjust discount rates for valuations", traits: ["technical", "accurate"] },
      { id: "B", text: "Favor less leveraged companies", traits: ["risk-aware", "selective"] },
      { id: "C", text: "Consider impact on consumer spending", traits: ["macro", "holistic"] },
      { id: "D", text: "Look for beneficiaries like banks", traits: ["opportunistic", "strategic"] }
    ]
  },
  {
    id: "com_029",
    scenario: "You're structuring a loan package for a client. What do you prioritize?",
    options: [
      { id: "A", text: "Lowest possible interest rate", traits: ["cost-focused", "competitive"] },
      { id: "B", text: "Flexible terms and conditions", traits: ["client-focused", "practical"] },
      { id: "C", text: "Matching loan to cash flows", traits: ["aligned", "appropriate"] },
      { id: "D", text: "Minimizing total cost of borrowing", traits: ["comprehensive", "analytical"] }
    ]
  },
  {
    id: "com_030",
    scenario: "ESG (Environmental, Social, Governance) investing is growing. Your view?",
    options: [
      { id: "A", text: "Important for long-term returns", traits: ["progressive", "long-term"] },
      { id: "B", text: "Good but returns still matter most", traits: ["balanced", "practical"] },
      { id: "C", text: "Mostly marketing hype", traits: ["skeptical", "traditional"] },
      { id: "D", text: "Essential for risk management", traits: ["risk-focused", "comprehensive"] }
    ]
  },
  {
    id: "com_031",
    scenario: "A startup needs valuation for funding. What method would you use?",
    options: [
      { id: "A", text: "Comparable company analysis", traits: ["market-based", "relative"] },
      { id: "B", text: "Discounted cash flow projections", traits: ["fundamental", "detailed"] },
      { id: "C", text: "Multiple methods for range", traits: ["comprehensive", "thorough"] },
      { id: "D", text: "Focus on qualitative factors too", traits: ["holistic", "nuanced"] }
    ]
  },
  {
    id: "com_032",
    scenario: "Foreign exchange movements affect your company. What's your hedging approach?",
    options: [
      { id: "A", text: "Hedge significant exposures", traits: ["risk-management", "prudent"] },
      { id: "B", text: "Natural hedging through operations", traits: ["strategic", "operational"] },
      { id: "C", text: "Accept currency risk as part of business", traits: ["accepting", "simple"] },
      { id: "D", text: "Active management based on views", traits: ["active", "speculative"] }
    ]
  },
  {
    id: "com_033",
    scenario: "You're reviewing internal controls. What red flags do you watch for?",
    options: [
      { id: "A", text: "Lack of segregation of duties", traits: ["control-focused", "systematic"] },
      { id: "B", text: "Unusual transactions or patterns", traits: ["analytical", "alert"] },
      { id: "C", text: "Override of controls by management", traits: ["governance-focused", "skeptical"] },
      { id: "D", text: "All of the above systematically", traits: ["comprehensive", "thorough"] }
    ]
  },
  {
    id: "com_034",
    scenario: "A client wants to minimize taxes aggressively. Where do you draw the line?",
    options: [
      { id: "A", text: "Legal is acceptable, illegal is not", traits: ["compliant", "clear"] },
      { id: "B", text: "Both legal and ethical standards apply", traits: ["ethical", "principled"] },
      { id: "C", text: "Depends on risk of audit/penalties", traits: ["risk-based", "pragmatic"] },
      { id: "D", text: "Follow professional guidelines strictly", traits: ["professional", "conservative"] }
    ]
  },
  {
    id: "com_035",
    scenario: "Financial projections seem overly optimistic. How do you validate them?",
    options: [
      { id: "A", text: "Compare with historical performance", traits: ["analytical", "grounded"] },
      { id: "B", text: "Stress test with pessimistic scenarios", traits: ["rigorous", "conservative"] },
      { id: "C", text: "Challenge assumptions explicitly", traits: ["critical", "questioning"] },
      { id: "D", text: "Benchmark against industry norms", traits: ["comparative", "contextual"] }
    ]
  },
  {
    id: "com_036",
    scenario: "A merger opportunity arises. What due diligence do you prioritize?",
    options: [
      { id: "A", text: "Financial statements and liabilities", traits: ["financial", "foundational"] },
      { id: "B", text: "Customer and revenue quality", traits: ["commercial", "sustainable"] },
      { id: "C", text: "Cultural fit and integration plans", traits: ["operational", "people-focused"] },
      { id: "D", text: "Legal and regulatory risks", traits: ["compliance", "protective"] }
    ]
  },
  {
    id: "com_037",
    scenario: "Cryptocurrency investments are trending. Your professional view?",
    options: [
      { id: "A", text: "Too speculative for most portfolios", traits: ["conservative", "cautious"] },
      { id: "B", text: "Small allocation for diversification", traits: ["balanced", "open"] },
      { id: "C", text: "Transformative technology to embrace", traits: ["progressive", "innovative"] },
      { id: "D", text: "Need more regulation and clarity first", traits: ["prudent", "institutional"] }
    ]
  },
  {
    id: "com_038",
    scenario: "You're presenting financials to non-finance stakeholders. Your approach?",
    options: [
      { id: "A", text: "Simplify without losing accuracy", traits: ["communicative", "accessible"] },
      { id: "B", text: "Use visual charts and graphs", traits: ["visual", "clear"] },
      { id: "C", text: "Focus on what matters to them", traits: ["audience-focused", "relevant"] },
      { id: "D", text: "Provide detailed backup for questions", traits: ["thorough", "prepared"] }
    ]
  },
  {
    id: "com_039",
    scenario: "A colleague makes an error that affects financial reports. What do you do?",
    options: [
      { id: "A", text: "Correct it and inform supervisors", traits: ["transparent", "professional"] },
      { id: "B", text: "Help them fix it privately if minor", traits: ["supportive", "diplomatic"] },
      { id: "C", text: "Document for audit trail", traits: ["systematic", "compliant"] },
      { id: "D", text: "Assess materiality before deciding", traits: ["analytical", "proportionate"] }
    ]
  },
  {
    id: "com_040",
    scenario: "Personal investing vs. professional finance. How do you separate them?",
    options: [
      { id: "A", text: "Strict separation and disclosure", traits: ["ethical", "clear"] },
      { id: "B", text: "Apply same rigor to both", traits: ["consistent", "disciplined"] },
      { id: "C", text: "Personal is more risk-tolerant", traits: ["differentiated", "realistic"] },
      { id: "D", text: "Learn from professional for personal", traits: ["leveraging", "integrated"] }
    ]
  },
  // Marketing/sales (41-60)
  {
    id: "com_041",
    scenario: "You're launching a new product. What's your first marketing priority?",
    options: [
      { id: "A", text: "Understand target customer deeply", traits: ["customer-focused", "research"] },
      { id: "B", text: "Create compelling messaging", traits: ["creative", "communicative"] },
      { id: "C", text: "Choose right channels to reach them", traits: ["strategic", "practical"] },
      { id: "D", text: "Set measurable goals and metrics", traits: ["analytical", "goal-oriented"] }
    ]
  },
  {
    id: "com_042",
    scenario: "Social media marketing results are disappointing. What do you analyze?",
    options: [
      { id: "A", text: "Content quality and relevance", traits: ["content-focused", "quality"] },
      { id: "B", text: "Audience targeting accuracy", traits: ["analytical", "precise"] },
      { id: "C", text: "Platform choice and timing", traits: ["strategic", "tactical"] },
      { id: "D", text: "Engagement patterns and feedback", traits: ["responsive", "learning"] }
    ]
  },
  {
    id: "com_043",
    scenario: "A competitor's marketing campaign is very successful. Your response?",
    options: [
      { id: "A", text: "Analyze what made it work", traits: ["analytical", "learning"] },
      { id: "B", text: "Differentiate rather than copy", traits: ["original", "strategic"] },
      { id: "C", text: "Counter with own strong campaign", traits: ["competitive", "responsive"] },
      { id: "D", text: "Focus on our strengths instead", traits: ["confident", "self-focused"] }
    ]
  },
  {
    id: "com_044",
    scenario: "Brand image needs refreshing. What's your approach?",
    options: [
      { id: "A", text: "Research current brand perception", traits: ["research", "data-driven"] },
      { id: "B", text: "Evolve gradually to maintain recognition", traits: ["cautious", "continuous"] },
      { id: "C", text: "Bold rebrand if needed", traits: ["brave", "transformational"] },
      { id: "D", text: "Focus on substance over aesthetics", traits: ["fundamental", "authentic"] }
    ]
  },
  {
    id: "com_045",
    scenario: "Customer acquisition cost is rising. What do you optimize?",
    options: [
      { id: "A", text: "Focus on customer retention instead", traits: ["retention-focused", "efficient"] },
      { id: "B", text: "Improve conversion in current channels", traits: ["optimization", "focused"] },
      { id: "C", text: "Test new, cheaper acquisition channels", traits: ["experimental", "resourceful"] },
      { id: "D", text: "Increase customer lifetime value", traits: ["strategic", "long-term"] }
    ]
  },
  {
    id: "com_046",
    scenario: "An influencer partnership opportunity arises. How do you evaluate it?",
    options: [
      { id: "A", text: "Audience fit and authenticity", traits: ["aligned", "authentic"] },
      { id: "B", text: "Engagement rates and reach", traits: ["metrics-focused", "analytical"] },
      { id: "C", text: "Cost versus expected return", traits: ["ROI-focused", "practical"] },
      { id: "D", text: "Brand safety and reputation", traits: ["protective", "cautious"] }
    ]
  },
  {
    id: "com_047",
    scenario: "Pricing strategy needs review. What factors do you consider?",
    options: [
      { id: "A", text: "Cost structure and margins", traits: ["cost-based", "fundamental"] },
      { id: "B", text: "Competitor pricing landscape", traits: ["competitive", "market-aware"] },
      { id: "C", text: "Customer perceived value", traits: ["value-based", "customer-focused"] },
      { id: "D", text: "Strategic positioning goals", traits: ["strategic", "brand-focused"] }
    ]
  },
  {
    id: "com_048",
    scenario: "A sales prospect keeps delaying decision. What's your approach?",
    options: [
      { id: "A", text: "Understand their specific concerns", traits: ["empathetic", "diagnostic"] },
      { id: "B", text: "Create urgency with limited offers", traits: ["assertive", "tactical"] },
      { id: "C", text: "Provide more information and value", traits: ["educational", "supportive"] },
      { id: "D", text: "Qualify if they're serious buyer", traits: ["efficient", "realistic"] }
    ]
  },
  {
    id: "com_049",
    scenario: "Customer feedback reveals a common pain point. What do you do?",
    options: [
      { id: "A", text: "Prioritize fixing the issue", traits: ["responsive", "customer-focused"] },
      { id: "B", text: "Communicate you're addressing it", traits: ["transparent", "engaging"] },
      { id: "C", text: "Analyze root cause thoroughly", traits: ["analytical", "thorough"] },
      { id: "D", text: "Turn it into marketing opportunity", traits: ["positive", "strategic"] }
    ]
  },
  {
    id: "com_050",
    scenario: "Digital marketing vs. traditional marketing budget. How do you split?",
    options: [
      { id: "A", text: "Based on customer journey data", traits: ["data-driven", "analytical"] },
      { id: "B", text: "Mostly digital for measurability", traits: ["modern", "metrics-focused"] },
      { id: "C", text: "Balance based on brand building needs", traits: ["balanced", "strategic"] },
      { id: "D", text: "Test and learn continuously", traits: ["experimental", "adaptive"] }
    ]
  },
  {
    id: "com_051",
    scenario: "A loyal customer is leaving for a competitor. Your response?",
    options: [
      { id: "A", text: "Understand why through exit interview", traits: ["learning", "analytical"] },
      { id: "B", text: "Make compelling retention offer", traits: ["proactive", "value-offering"] },
      { id: "C", text: "Accept gracefully and stay connected", traits: ["gracious", "long-term"] },
      { id: "D", text: "Address issues for other customers", traits: ["systematic", "preventive"] }
    ]
  },
  {
    id: "com_052",
    scenario: "Sales team morale is low. How do you address this?",
    options: [
      { id: "A", text: "Identify and address specific issues", traits: ["diagnostic", "responsive"] },
      { id: "B", text: "Improve incentives and recognition", traits: ["motivating", "supportive"] },
      { id: "C", text: "Provide better tools and training", traits: ["enabling", "practical"] },
      { id: "D", text: "Lead by example with positive attitude", traits: ["leadership", "inspiring"] }
    ]
  },
  {
    id: "com_053",
    scenario: "Content marketing results are hard to measure. What metrics do you track?",
    options: [
      { id: "A", text: "Engagement and sharing metrics", traits: ["engagement-focused", "social"] },
      { id: "B", text: "Lead generation and conversion", traits: ["outcome-focused", "practical"] },
      { id: "C", text: "SEO and organic traffic growth", traits: ["technical", "long-term"] },
      { id: "D", text: "Brand awareness and sentiment", traits: ["brand-focused", "holistic"] }
    ]
  },
  {
    id: "com_054",
    scenario: "A marketing campaign went viral unexpectedly. What do you do?",
    options: [
      { id: "A", text: "Capitalize and extend the momentum", traits: ["opportunistic", "agile"] },
      { id: "B", text: "Analyze why it worked", traits: ["analytical", "learning"] },
      { id: "C", text: "Ensure brand is protected in viral spread", traits: ["protective", "careful"] },
      { id: "D", text: "Convert attention to tangible results", traits: ["practical", "ROI-focused"] }
    ]
  },
  {
    id: "com_055",
    scenario: "B2B sales cycle is very long. How do you nurture leads?",
    options: [
      { id: "A", text: "Regular value-adding content and touchpoints", traits: ["persistent", "valuable"] },
      { id: "B", text: "Build relationships with all stakeholders", traits: ["relational", "comprehensive"] },
      { id: "C", text: "Automate and track interactions", traits: ["systematic", "efficient"] },
      { id: "D", text: "Focus on solving their business problems", traits: ["consultative", "solution-focused"] }
    ]
  },
  {
    id: "com_056",
    scenario: "Customer segmentation needs updating. What approach do you take?",
    options: [
      { id: "A", text: "Data-driven clustering analysis", traits: ["analytical", "technical"] },
      { id: "B", text: "Behavioral and needs-based segments", traits: ["behavioral", "psychological"] },
      { id: "C", text: "Value-based segmentation", traits: ["financial", "strategic"] },
      { id: "D", text: "Test multiple approaches", traits: ["experimental", "comprehensive"] }
    ]
  },
  {
    id: "com_057",
    scenario: "Marketing and sales teams are not aligned. How do you fix this?",
    options: [
      { id: "A", text: "Create shared goals and metrics", traits: ["aligned", "strategic"] },
      { id: "B", text: "Improve communication processes", traits: ["communicative", "systematic"] },
      { id: "C", text: "Joint customer journey mapping", traits: ["collaborative", "customer-focused"] },
      { id: "D", text: "Leadership involvement in resolution", traits: ["escalating", "serious"] }
    ]
  },
  {
    id: "com_058",
    scenario: "A negative review goes viral. How do you respond?",
    options: [
      { id: "A", text: "Respond professionally and apologize", traits: ["professional", "accountable"] },
      { id: "B", text: "Investigate and address the issue", traits: ["thorough", "action-oriented"] },
      { id: "C", text: "Engage supporters to share positive stories", traits: ["strategic", "balanced"] },
      { id: "D", text: "Learn and prevent future occurrences", traits: ["learning", "preventive"] }
    ]
  },
  {
    id: "com_059",
    scenario: "Trade show participation is expensive. How do you maximize ROI?",
    options: [
      { id: "A", text: "Strong pre-event marketing and appointments", traits: ["prepared", "proactive"] },
      { id: "B", text: "Engaging booth and presentations", traits: ["experiential", "engaging"] },
      { id: "C", text: "Effective lead capture and follow-up", traits: ["systematic", "follow-through"] },
      { id: "D", text: "Measure against clear objectives", traits: ["analytical", "accountable"] }
    ]
  },
  {
    id: "com_060",
    scenario: "You need to present marketing results to the board. What do you focus on?",
    options: [
      { id: "A", text: "Business impact and ROI", traits: ["business-focused", "relevant"] },
      { id: "B", text: "Strategic progress and insights", traits: ["strategic", "insightful"] },
      { id: "C", text: "Comparison with competitors", traits: ["competitive", "contextual"] },
      { id: "D", text: "Future plans and resource needs", traits: ["forward-looking", "planning"] }
    ]
  },
  // Management (61-80)
  {
    id: "com_061",
    scenario: "You're promoted to manage former peers. How do you navigate this?",
    options: [
      { id: "A", text: "Have honest conversations about the change", traits: ["transparent", "direct"] },
      { id: "B", text: "Maintain professionalism with fairness", traits: ["professional", "fair"] },
      { id: "C", text: "Focus on team success, not authority", traits: ["team-focused", "humble"] },
      { id: "D", text: "Set clear expectations early", traits: ["clear", "structured"] }
    ]
  },
  {
    id: "com_062",
    scenario: "Two team members have conflict. How do you intervene?",
    options: [
      { id: "A", text: "Hear both sides separately first", traits: ["fair", "thorough"] },
      { id: "B", text: "Facilitate direct conversation between them", traits: ["mediating", "empowering"] },
      { id: "C", text: "Focus on work impact and resolution", traits: ["practical", "results-focused"] },
      { id: "D", text: "Involve HR if it's serious", traits: ["appropriate", "escalating"] }
    ]
  },
  {
    id: "com_063",
    scenario: "Your team is overwhelmed with work. What do you do?",
    options: [
      { id: "A", text: "Prioritize and cut lower-value work", traits: ["prioritizing", "decisive"] },
      { id: "B", text: "Advocate for more resources", traits: ["supportive", "advocating"] },
      { id: "C", text: "Help with critical tasks personally", traits: ["hands-on", "supportive"] },
      { id: "D", text: "Improve processes for efficiency", traits: ["systematic", "improving"] }
    ]
  },
  {
    id: "com_064",
    scenario: "A high performer has a bad attitude. How do you address this?",
    options: [
      { id: "A", text: "Private conversation about behavior impact", traits: ["direct", "private"] },
      { id: "B", text: "Set clear expectations with consequences", traits: ["firm", "clear"] },
      { id: "C", text: "Understand root causes first", traits: ["empathetic", "diagnostic"] },
      { id: "D", text: "Consider if performance justifies tolerance", traits: ["pragmatic", "weighing"] }
    ]
  },
  {
    id: "com_065",
    scenario: "You need to deliver bad news to your team. Your approach?",
    options: [
      { id: "A", text: "Be direct and honest", traits: ["honest", "direct"] },
      { id: "B", text: "Provide context and rationale", traits: ["transparent", "explanatory"] },
      { id: "C", text: "Focus on path forward", traits: ["positive", "forward-looking"] },
      { id: "D", text: "Allow space for questions and concerns", traits: ["supportive", "listening"] }
    ]
  },
  {
    id: "com_066",
    scenario: "A team member makes a mistake that affects clients. How do you handle it?",
    options: [
      { id: "A", text: "Fix the client issue first", traits: ["client-focused", "prioritizing"] },
      { id: "B", text: "Support the team member through it", traits: ["supportive", "leader"] },
      { id: "C", text: "Analyze what went wrong to prevent recurrence", traits: ["analytical", "preventive"] },
      { id: "D", text: "Appropriate accountability without blame", traits: ["fair", "constructive"] }
    ]
  },
  {
    id: "com_067",
    scenario: "You're setting team goals. What principle guides you?",
    options: [
      { id: "A", text: "Alignment with organizational strategy", traits: ["aligned", "strategic"] },
      { id: "B", text: "Challenging but achievable", traits: ["stretching", "realistic"] },
      { id: "C", text: "Team input and buy-in", traits: ["participative", "engaging"] },
      { id: "D", text: "Clear metrics and accountability", traits: ["measurable", "accountable"] }
    ]
  },
  {
    id: "com_068",
    scenario: "Remote work is increasing. How do you manage team effectively?",
    options: [
      { id: "A", text: "Regular structured check-ins", traits: ["structured", "connected"] },
      { id: "B", text: "Focus on outcomes not hours", traits: ["results-focused", "trusting"] },
      { id: "C", text: "Use technology for collaboration", traits: ["tech-savvy", "enabling"] },
      { id: "D", text: "Maintain team culture intentionally", traits: ["cultural", "proactive"] }
    ]
  },
  {
    id: "com_069",
    scenario: "A team member wants a promotion they're not ready for. What do you do?",
    options: [
      { id: "A", text: "Be honest about gaps to address", traits: ["honest", "developmental"] },
      { id: "B", text: "Create a development plan together", traits: ["supportive", "constructive"] },
      { id: "C", text: "Find ways to stretch them in current role", traits: ["enabling", "growing"] },
      { id: "D", text: "Clarify criteria for promotion", traits: ["transparent", "clear"] }
    ]
  },
  {
    id: "com_070",
    scenario: "Your team needs new skills for changing business. Your strategy?",
    options: [
      { id: "A", text: "Invest in training and development", traits: ["developmental", "investing"] },
      { id: "B", text: "Hire new talent with needed skills", traits: ["building", "practical"] },
      { id: "C", text: "Partner with other teams", traits: ["collaborative", "resourceful"] },
      { id: "D", text: "Combine internal development and hiring", traits: ["balanced", "comprehensive"] }
    ]
  },
  {
    id: "com_071",
    scenario: "You receive feedback that you're micromanaging. Your response?",
    options: [
      { id: "A", text: "Reflect and adjust behavior", traits: ["self-aware", "adaptive"] },
      { id: "B", text: "Understand specific concerns better", traits: ["curious", "responsive"] },
      { id: "C", text: "Explain reasons but work on it", traits: ["transparent", "improving"] },
      { id: "D", text: "Delegate more intentionally", traits: ["action-oriented", "trusting"] }
    ]
  },
  {
    id: "com_072",
    scenario: "A project is failing. How do you turn it around?",
    options: [
      { id: "A", text: "Diagnose root causes quickly", traits: ["analytical", "urgent"] },
      { id: "B", text: "Bring in additional expertise", traits: ["resourceful", "pragmatic"] },
      { id: "C", text: "Reset expectations with stakeholders", traits: ["transparent", "managing"] },
      { id: "D", text: "Consider if it should continue", traits: ["strategic", "decisive"] }
    ]
  },
  {
    id: "com_073",
    scenario: "Diversity and inclusion matter to you. How do you promote them?",
    options: [
      { id: "A", text: "Diverse hiring practices", traits: ["inclusive", "proactive"] },
      { id: "B", text: "Inclusive team culture and behaviors", traits: ["cultural", "daily"] },
      { id: "C", text: "Speak up against bias when seen", traits: ["courageous", "principled"] },
      { id: "D", text: "Mentoring underrepresented team members", traits: ["developmental", "supportive"] }
    ]
  },
  {
    id: "com_074",
    scenario: "You disagree with a decision from your boss. What do you do?",
    options: [
      { id: "A", text: "Express disagreement respectfully", traits: ["assertive", "professional"] },
      { id: "B", text: "Support the decision once made", traits: ["loyal", "team-player"] },
      { id: "C", text: "Ask questions to understand rationale", traits: ["curious", "open"] },
      { id: "D", text: "Focus on executing well regardless", traits: ["professional", "committed"] }
    ]
  },
  {
    id: "com_075",
    scenario: "Team performance reviews are coming up. Your approach?",
    options: [
      { id: "A", text: "Ongoing feedback throughout year", traits: ["continuous", "developmental"] },
      { id: "B", text: "Fair and documented assessments", traits: ["fair", "thorough"] },
      { id: "C", text: "Focus on growth and future", traits: ["forward-looking", "developmental"] },
      { id: "D", text: "Link to development plans", traits: ["constructive", "actionable"] }
    ]
  },
  {
    id: "com_076",
    scenario: "A talented team member wants to leave. How do you respond?",
    options: [
      { id: "A", text: "Understand their reasons fully", traits: ["listening", "understanding"] },
      { id: "B", text: "Make counter-offer if appropriate", traits: ["responsive", "valuing"] },
      { id: "C", text: "Support their decision gracefully", traits: ["gracious", "professional"] },
      { id: "D", text: "Learn from it to retain others", traits: ["learning", "preventive"] }
    ]
  },
  {
    id: "com_077",
    scenario: "You're building a new team from scratch. What do you focus on first?",
    options: [
      { id: "A", text: "Hiring the right people", traits: ["foundational", "people-focused"] },
      { id: "B", text: "Clarifying mission and goals", traits: ["purposeful", "clear"] },
      { id: "C", text: "Establishing culture and norms", traits: ["cultural", "intentional"] },
      { id: "D", text: "Setting up processes and tools", traits: ["systematic", "enabling"] }
    ]
  },
  {
    id: "com_078",
    scenario: "Work-life balance is suffering in your team. What do you do?",
    options: [
      { id: "A", text: "Model better balance yourself", traits: ["leading", "authentic"] },
      { id: "B", text: "Address workload and priorities", traits: ["practical", "responsive"] },
      { id: "C", text: "Support flexible arrangements", traits: ["flexible", "supportive"] },
      { id: "D", text: "Have open conversations about it", traits: ["communicative", "caring"] }
    ]
  },
  {
    id: "com_079",
    scenario: "You need to give difficult feedback to someone. Your approach?",
    options: [
      { id: "A", text: "Specific, timely, and private", traits: ["professional", "direct"] },
      { id: "B", text: "Focus on behavior not person", traits: ["fair", "constructive"] },
      { id: "C", text: "Include positive alongside developmental", traits: ["balanced", "encouraging"] },
      { id: "D", text: "Follow up on improvement", traits: ["supportive", "accountable"] }
    ]
  },
  {
    id: "com_080",
    scenario: "Innovation seems stuck in your organization. How do you catalyze it?",
    options: [
      { id: "A", text: "Create safe space for experimentation", traits: ["enabling", "safe"] },
      { id: "B", text: "Allocate time and resources for innovation", traits: ["investing", "supporting"] },
      { id: "C", text: "Bring in outside perspectives", traits: ["open", "fresh"] },
      { id: "D", text: "Celebrate attempts, not just successes", traits: ["encouraging", "cultural"] }
    ]
  },
  // Career choice situations (81-100)
  {
    id: "com_081",
    scenario: "You're deciding between finance and marketing specialization. What attracts you?",
    options: [
      { id: "A", text: "Finance for analytical rigor", traits: ["analytical", "numbers"] },
      { id: "B", text: "Marketing for creativity and people", traits: ["creative", "people-focused"] },
      { id: "C", text: "Depends on industry opportunities", traits: ["practical", "market-aware"] },
      { id: "D", text: "Both can be combined in many roles", traits: ["versatile", "strategic"] }
    ]
  },
  {
    id: "com_082",
    scenario: "CA/CPA vs. MBA for career growth. Your thinking?",
    options: [
      { id: "A", text: "CA/CPA for specialized expertise", traits: ["specialist", "technical"] },
      { id: "B", text: "MBA for broader management skills", traits: ["generalist", "leadership"] },
      { id: "C", text: "Both for maximum opportunities", traits: ["ambitious", "comprehensive"] },
      { id: "D", text: "Depends on career goals", traits: ["goal-oriented", "strategic"] }
    ]
  },
  {
    id: "com_083",
    scenario: "Startup vs. established company for your first job. Preference?",
    options: [
      { id: "A", text: "Startup for learning and impact", traits: ["learning", "impact-seeking"] },
      { id: "B", text: "Established for structure and training", traits: ["structured", "foundational"] },
      { id: "C", text: "Established first, startup later", traits: ["sequential", "strategic"] },
      { id: "D", text: "Depends on the specific opportunity", traits: ["evaluative", "flexible"] }
    ]
  },
  {
    id: "com_084",
    scenario: "Family business vs. corporate career. What appeals to you?",
    options: [
      { id: "A", text: "Family business for autonomy and legacy", traits: ["entrepreneurial", "family"] },
      { id: "B", text: "Corporate for professional growth", traits: ["professional", "meritocratic"] },
      { id: "C", text: "Corporate first, family business later", traits: ["strategic", "experienced"] },
      { id: "D", text: "Can contribute to both differently", traits: ["balanced", "versatile"] }
    ]
  },
  {
    id: "com_085",
    scenario: "High salary vs. work you love. How do you decide?",
    options: [
      { id: "A", text: "Passion is more important", traits: ["passionate", "idealistic"] },
      { id: "B", text: "Need to be practical about money", traits: ["practical", "realistic"] },
      { id: "C", text: "Find intersection of both", traits: ["strategic", "optimistic"] },
      { id: "D", text: "Salary now, passion later when stable", traits: ["sequential", "pragmatic"] }
    ]
  },
  {
    id: "com_086",
    scenario: "Entrepreneurship calls to you. When would you take the plunge?",
    options: [
      { id: "A", text: "Now, while young and less tied down", traits: ["bold", "risk-taking"] },
      { id: "B", text: "After gaining experience and savings", traits: ["prepared", "cautious"] },
      { id: "C", text: "When I have a validated idea", traits: ["opportunity-focused", "smart"] },
      { id: "D", text: "Side project first, full-time when viable", traits: ["gradual", "risk-managed"] }
    ]
  },
  {
    id: "com_087",
    scenario: "International career vs. staying local. Your inclination?",
    options: [
      { id: "A", text: "International for broader experience", traits: ["global", "adventurous"] },
      { id: "B", text: "Local where I have networks", traits: ["networked", "rooted"] },
      { id: "C", text: "International exposure, return later", traits: ["strategic", "combining"] },
      { id: "D", text: "Depends on specific opportunities", traits: ["flexible", "evaluative"] }
    ]
  },
  {
    id: "com_088",
    scenario: "Technical expertise vs. management track. Which career path?",
    options: [
      { id: "A", text: "Technical for deep expertise", traits: ["expert", "specialized"] },
      { id: "B", text: "Management for broader impact", traits: ["leadership", "influential"] },
      { id: "C", text: "Technical initially, management later", traits: ["sequential", "growing"] },
      { id: "D", text: "Stay flexible based on opportunities", traits: ["adaptive", "opportunistic"] }
    ]
  },
  {
    id: "com_089",
    scenario: "A prestigious role vs. one with better learning. Your choice?",
    options: [
      { id: "A", text: "Learning at this career stage", traits: ["developmental", "strategic"] },
      { id: "B", text: "Prestige opens more doors", traits: ["credential-focused", "ambitious"] },
      { id: "C", text: "Evaluate both factors carefully", traits: ["analytical", "balanced"] },
      { id: "D", text: "Consider which I'd regret missing", traits: ["intuitive", "regret-minimizing"] }
    ]
  },
  {
    id: "com_090",
    scenario: "Public sector vs. private sector career. Your preference?",
    options: [
      { id: "A", text: "Public for service and stability", traits: ["service", "stable"] },
      { id: "B", text: "Private for growth and compensation", traits: ["ambitious", "rewarded"] },
      { id: "C", text: "Private sector expertise for public impact", traits: ["strategic", "impactful"] },
      { id: "D", text: "Move between both at different stages", traits: ["varied", "comprehensive"] }
    ]
  },
  {
    id: "com_091",
    scenario: "Work-life balance vs. career advancement. How do you prioritize?",
    options: [
      { id: "A", text: "Balance is essential always", traits: ["balanced", "holistic"] },
      { id: "B", text: "Career push now, balance later", traits: ["ambitious", "sequential"] },
      { id: "C", text: "Find roles that allow both", traits: ["optimistic", "selective"] },
      { id: "D", text: "Depends on life stage and goals", traits: ["adaptive", "contextual"] }
    ]
  },
  {
    id: "com_092",
    scenario: "Consulting vs. industry role. What appeals to you?",
    options: [
      { id: "A", text: "Consulting for variety and learning", traits: ["varied", "learning"] },
      { id: "B", text: "Industry for depth and impact", traits: ["deep", "impactful"] },
      { id: "C", text: "Consulting then industry", traits: ["strategic", "planned"] },
      { id: "D", text: "Based on specific firm and role", traits: ["evaluative", "specific"] }
    ]
  },
  {
    id: "com_093",
    scenario: "You want to create social impact through business. Your approach?",
    options: [
      { id: "A", text: "Social enterprise or nonprofit", traits: ["dedicated", "social"] },
      { id: "B", text: "CSR role in large corporation", traits: ["leveraged", "scaled"] },
      { id: "C", text: "Impact investing or social finance", traits: ["financial", "systemic"] },
      { id: "D", text: "Any business done ethically creates impact", traits: ["integrated", "principled"] }
    ]
  },
  {
    id: "com_094",
    scenario: "Digital skills are increasingly important. How do you upskill?",
    options: [
      { id: "A", text: "Formal courses and certifications", traits: ["structured", "credential"] },
      { id: "B", text: "Learn by doing in projects", traits: ["practical", "experiential"] },
      { id: "C", text: "Online learning platforms", traits: ["flexible", "self-directed"] },
      { id: "D", text: "Combination of all approaches", traits: ["comprehensive", "thorough"] }
    ]
  },
  {
    id: "com_095",
    scenario: "Networking is important for career. Your approach?",
    options: [
      { id: "A", text: "Build genuine relationships over time", traits: ["authentic", "long-term"] },
      { id: "B", text: "Active on professional platforms", traits: ["digital", "visible"] },
      { id: "C", text: "Attend events and conferences", traits: ["proactive", "in-person"] },
      { id: "D", text: "Help others, network will follow", traits: ["giving", "indirect"] }
    ]
  },
  {
    id: "com_096",
    scenario: "Mentor relationship would help your career. How do you find one?",
    options: [
      { id: "A", text: "Approach someone I admire directly", traits: ["direct", "brave"] },
      { id: "B", text: "Through formal mentoring programs", traits: ["structured", "facilitated"] },
      { id: "C", text: "Build relationship naturally over time", traits: ["organic", "patient"] },
      { id: "D", text: "Multiple mentors for different aspects", traits: ["comprehensive", "strategic"] }
    ]
  },
  {
    id: "com_097",
    scenario: "Your career is not progressing as expected. What do you do?",
    options: [
      { id: "A", text: "Seek feedback to understand why", traits: ["self-aware", "learning"] },
      { id: "B", text: "Look for opportunities elsewhere", traits: ["proactive", "mobile"] },
      { id: "C", text: "Invest in new skills", traits: ["developmental", "growing"] },
      { id: "D", text: "Reassess if goals are still right", traits: ["reflective", "adaptive"] }
    ]
  },
  {
    id: "com_098",
    scenario: "Side hustle alongside job. Is this for you?",
    options: [
      { id: "A", text: "Yes, diversifies income and learning", traits: ["entrepreneurial", "multiple"] },
      { id: "B", text: "No, prefer full focus on job", traits: ["focused", "dedicated"] },
      { id: "C", text: "Depends on employer policy", traits: ["compliant", "careful"] },
      { id: "D", text: "Only if it complements my career", traits: ["strategic", "aligned"] }
    ]
  },
  {
    id: "com_099",
    scenario: "Long-term career vision exercise. What do you see yourself doing?",
    options: [
      { id: "A", text: "Leading a company or business unit", traits: ["leadership", "ambitious"] },
      { id: "B", text: "Running my own business", traits: ["entrepreneurial", "independent"] },
      { id: "C", text: "Expert and thought leader in my field", traits: ["expert", "influential"] },
      { id: "D", text: "Multiple chapters with different focus", traits: ["varied", "evolving"] }
    ]
  },
  {
    id: "com_100",
    scenario: "Reflecting on commerce studies, what has it prepared you for most?",
    options: [
      { id: "A", text: "Understanding business and markets", traits: ["business-minded", "strategic"] },
      { id: "B", text: "Financial and analytical skills", traits: ["analytical", "quantitative"] },
      { id: "C", text: "Communication and people skills", traits: ["communicative", "relational"] },
      { id: "D", text: "Foundation for multiple career paths", traits: ["versatile", "foundational"] }
    ]
  }
];
