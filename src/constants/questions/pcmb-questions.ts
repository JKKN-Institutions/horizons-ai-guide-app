import { Question } from './types';

export const PCMB_QUESTIONS: Question[] = [
  // Engineering & Technology (1-20)
  {
    id: "pcmb_001",
    scenario: "A biotech company needs someone to develop a device that monitors patient vitals and alerts doctors remotely. What aspect would you focus on?",
    options: [
      { id: "A", text: "The electronic circuits and sensor accuracy", traits: ["technical", "engineering"] },
      { id: "B", text: "The biological data interpretation algorithms", traits: ["analytical", "medical"] },
      { id: "C", text: "User interface for doctors and patients", traits: ["design", "user-focused"] },
      { id: "D", text: "Integration with hospital management systems", traits: ["systems-thinking", "practical"] }
    ]
  },
  {
    id: "pcmb_002",
    scenario: "Your lab is researching artificial organs. What role would you want to play?",
    options: [
      { id: "A", text: "Designing the mechanical structure of organs", traits: ["engineering", "mechanical"] },
      { id: "B", text: "Understanding biological tissue compatibility", traits: ["biology", "research"] },
      { id: "C", text: "Testing and validating organ functionality", traits: ["experimental", "quality-focused"] },
      { id: "D", text: "Coordinating clinical trials with hospitals", traits: ["management", "medical"] }
    ]
  },
  {
    id: "pcmb_003",
    scenario: "A pharmaceutical company needs to automate drug manufacturing. Your contribution?",
    options: [
      { id: "A", text: "Design robotic systems for precise handling", traits: ["automation", "engineering"] },
      { id: "B", text: "Ensure chemical processes remain accurate", traits: ["chemistry", "quality"] },
      { id: "C", text: "Develop quality control testing systems", traits: ["analytical", "systematic"] },
      { id: "D", text: "Create software for process monitoring", traits: ["programming", "technical"] }
    ]
  },
  {
    id: "pcmb_004",
    scenario: "Designing a greenhouse that optimizes plant growth using technology. What's your focus?",
    options: [
      { id: "A", text: "Climate control and sensor systems", traits: ["technical", "engineering"] },
      { id: "B", text: "Plant biology and optimal growth conditions", traits: ["biology", "agricultural"] },
      { id: "C", text: "Energy efficiency and sustainability", traits: ["environmental", "practical"] },
      { id: "D", text: "Data analysis of growth patterns", traits: ["analytical", "research"] }
    ]
  },
  {
    id: "pcmb_005",
    scenario: "A research team is developing gene therapy delivery systems. Where would you contribute?",
    options: [
      { id: "A", text: "Nano-scale delivery vehicle engineering", traits: ["nanotechnology", "engineering"] },
      { id: "B", text: "Understanding cellular uptake mechanisms", traits: ["biology", "cellular"] },
      { id: "C", text: "Genetic sequencing and targeting", traits: ["genetics", "molecular"] },
      { id: "D", text: "Safety and efficacy testing protocols", traits: ["clinical", "rigorous"] }
    ]
  },
  {
    id: "pcmb_006",
    scenario: "Creating a system to detect diseases through breath analysis. Your role?",
    options: [
      { id: "A", text: "Developing the sensor technology", traits: ["engineering", "innovative"] },
      { id: "B", text: "Understanding biomarkers in breath", traits: ["biochemistry", "medical"] },
      { id: "C", text: "Machine learning for pattern recognition", traits: ["AI", "analytical"] },
      { id: "D", text: "Clinical validation with patients", traits: ["clinical", "practical"] }
    ]
  },
  {
    id: "pcmb_007",
    scenario: "A space agency needs life support systems for long Mars missions. What would you design?",
    options: [
      { id: "A", text: "Oxygen generation and recycling systems", traits: ["engineering", "life-support"] },
      { id: "B", text: "Food production through hydroponics", traits: ["biology", "agricultural"] },
      { id: "C", text: "Waste recycling and water purification", traits: ["environmental", "sustainable"] },
      { id: "D", text: "Health monitoring for astronauts", traits: ["medical", "monitoring"] }
    ]
  },
  {
    id: "pcmb_008",
    scenario: "Developing prosthetic limbs that can feel touch. What aspect interests you?",
    options: [
      { id: "A", text: "Mechanical design and movement", traits: ["mechanical", "engineering"] },
      { id: "B", text: "Nerve interface and signal processing", traits: ["biomedical", "neural"] },
      { id: "C", text: "Materials for durability and comfort", traits: ["materials-science", "practical"] },
      { id: "D", text: "Patient rehabilitation and adaptation", traits: ["medical", "therapeutic"] }
    ]
  },
  {
    id: "pcmb_009",
    scenario: "Your team is creating biodegradable medical implants. Your contribution?",
    options: [
      { id: "A", text: "Engineering the implant structure", traits: ["engineering", "design"] },
      { id: "B", text: "Studying how body absorbs the material", traits: ["biology", "research"] },
      { id: "C", text: "Developing biocompatible materials", traits: ["chemistry", "materials"] },
      { id: "D", text: "Testing in simulated body conditions", traits: ["experimental", "validation"] }
    ]
  },
  {
    id: "pcmb_010",
    scenario: "A hospital needs better surgical robots. What would you improve?",
    options: [
      { id: "A", text: "Precision and accuracy of movements", traits: ["mechanical", "precision"] },
      { id: "B", text: "Real-time tissue analysis during surgery", traits: ["medical", "diagnostic"] },
      { id: "C", text: "Surgeon interface and control systems", traits: ["ergonomic", "user-focused"] },
      { id: "D", text: "Integration with patient imaging data", traits: ["systems", "informatics"] }
    ]
  },
  {
    id: "pcmb_011",
    scenario: "Designing wearable devices for diabetics. What feature would you prioritize?",
    options: [
      { id: "A", text: "Accurate glucose measurement sensors", traits: ["engineering", "precision"] },
      { id: "B", text: "Automatic insulin delivery system", traits: ["medical", "therapeutic"] },
      { id: "C", text: "Smartphone app for data tracking", traits: ["software", "user-friendly"] },
      { id: "D", text: "Long battery life and comfort", traits: ["practical", "design"] }
    ]
  },
  {
    id: "pcmb_012",
    scenario: "Your lab is developing new cancer treatment technologies. What role suits you?",
    options: [
      { id: "A", text: "Designing targeted radiation delivery systems", traits: ["engineering", "precision"] },
      { id: "B", text: "Understanding cancer cell biology", traits: ["biology", "research"] },
      { id: "C", text: "Developing immunotherapy approaches", traits: ["medical", "innovative"] },
      { id: "D", text: "Clinical data analysis and outcomes", traits: ["analytical", "clinical"] }
    ]
  },
  {
    id: "pcmb_013",
    scenario: "Creating a system to monitor ocean health using underwater drones. Your focus?",
    options: [
      { id: "A", text: "Drone navigation and control systems", traits: ["robotics", "engineering"] },
      { id: "B", text: "Marine biology monitoring sensors", traits: ["biology", "environmental"] },
      { id: "C", text: "Data transmission and analysis", traits: ["technology", "analytical"] },
      { id: "D", text: "Energy systems for extended operation", traits: ["practical", "sustainable"] }
    ]
  },
  {
    id: "pcmb_014",
    scenario: "A biotech startup needs a system to rapidly test new drugs. Your contribution?",
    options: [
      { id: "A", text: "Automated testing equipment design", traits: ["engineering", "automation"] },
      { id: "B", text: "Cell culture and biological assays", traits: ["biology", "experimental"] },
      { id: "C", text: "Data management and analysis software", traits: ["informatics", "analytical"] },
      { id: "D", text: "Quality assurance protocols", traits: ["quality", "systematic"] }
    ]
  },
  {
    id: "pcmb_015",
    scenario: "Developing smart bandages that monitor wound healing. What would you work on?",
    options: [
      { id: "A", text: "Embedded sensor technology", traits: ["engineering", "innovative"] },
      { id: "B", text: "Drug release mechanisms", traits: ["pharmaceutical", "therapeutic"] },
      { id: "C", text: "Biocompatible materials", traits: ["materials", "biological"] },
      { id: "D", text: "Wireless health monitoring integration", traits: ["connectivity", "systems"] }
    ]
  },
  {
    id: "pcmb_016",
    scenario: "Your university is starting a bio-computing research lab. What area interests you?",
    options: [
      { id: "A", text: "DNA data storage systems", traits: ["innovative", "molecular"] },
      { id: "B", text: "Neural network modeling", traits: ["computational", "biological"] },
      { id: "C", text: "Protein folding computations", traits: ["biochemistry", "analytical"] },
      { id: "D", text: "Bioinformatics and genomics", traits: ["data", "biological"] }
    ]
  },
  {
    id: "pcmb_017",
    scenario: "Creating artificial intelligence for medical diagnosis. Your role?",
    options: [
      { id: "A", text: "Algorithm development and training", traits: ["AI", "technical"] },
      { id: "B", text: "Medical knowledge integration", traits: ["medical", "domain-expert"] },
      { id: "C", text: "Testing with real patient data", traits: ["clinical", "validation"] },
      { id: "D", text: "User interface for doctors", traits: ["design", "practical"] }
    ]
  },
  {
    id: "pcmb_018",
    scenario: "A company wants to develop lab-grown meat. What would you focus on?",
    options: [
      { id: "A", text: "Bioreactor design and scaling", traits: ["engineering", "process"] },
      { id: "B", text: "Cell biology and tissue growth", traits: ["biology", "cellular"] },
      { id: "C", text: "Nutritional and taste optimization", traits: ["food-science", "quality"] },
      { id: "D", text: "Regulatory and safety compliance", traits: ["regulatory", "systematic"] }
    ]
  },
  {
    id: "pcmb_019",
    scenario: "Developing brain-computer interfaces for paralyzed patients. Your interest?",
    options: [
      { id: "A", text: "Neural signal processing hardware", traits: ["engineering", "neural"] },
      { id: "B", text: "Understanding brain signal patterns", traits: ["neuroscience", "research"] },
      { id: "C", text: "Machine learning for thought translation", traits: ["AI", "analytical"] },
      { id: "D", text: "Patient training and rehabilitation", traits: ["clinical", "therapeutic"] }
    ]
  },
  {
    id: "pcmb_020",
    scenario: "Your team is creating a personal health monitoring ecosystem. What's your contribution?",
    options: [
      { id: "A", text: "Wearable device development", traits: ["hardware", "engineering"] },
      { id: "B", text: "Health data interpretation algorithms", traits: ["medical", "analytical"] },
      { id: "C", text: "Mobile app and user experience", traits: ["software", "design"] },
      { id: "D", text: "Integration with healthcare providers", traits: ["systems", "healthcare"] }
    ]
  },

  // Medical & Healthcare (21-40)
  {
    id: "pcmb_021",
    scenario: "A patient comes with symptoms that could indicate multiple conditions. Your diagnostic approach?",
    options: [
      { id: "A", text: "Order comprehensive lab tests", traits: ["thorough", "scientific"] },
      { id: "B", text: "Detailed patient history and examination", traits: ["clinical", "patient-centered"] },
      { id: "C", text: "Use diagnostic imaging immediately", traits: ["technology-focused", "quick"] },
      { id: "D", text: "Consult specialists for different possibilities", traits: ["collaborative", "comprehensive"] }
    ]
  },
  {
    id: "pcmb_022",
    scenario: "You're observing surgery and notice what might be an error. What do you do?",
    options: [
      { id: "A", text: "Speak up immediately during surgery", traits: ["brave", "direct"] },
      { id: "B", text: "Note it and discuss after surgery", traits: ["diplomatic", "observant"] },
      { id: "C", text: "Check with senior resident first", traits: ["hierarchical", "cautious"] },
      { id: "D", text: "Trust the experienced surgeon's judgment", traits: ["deferential", "trusting"] }
    ]
  },
  {
    id: "pcmb_023",
    scenario: "A breakthrough treatment is expensive and not covered by insurance. How do you help your patient?",
    options: [
      { id: "A", text: "Research patient assistance programs", traits: ["resourceful", "helpful"] },
      { id: "B", text: "Advocate with insurance company", traits: ["persistent", "advocacy"] },
      { id: "C", text: "Find alternative effective treatments", traits: ["practical", "adaptive"] },
      { id: "D", text: "Connect with clinical trial opportunities", traits: ["innovative", "research-oriented"] }
    ]
  },
  {
    id: "pcmb_024",
    scenario: "You're interested in medical research. What type appeals to you most?",
    options: [
      { id: "A", text: "Basic science understanding disease mechanisms", traits: ["fundamental", "scientific"] },
      { id: "B", text: "Clinical trials testing new treatments", traits: ["applied", "patient-focused"] },
      { id: "C", text: "Public health and epidemiology", traits: ["population", "preventive"] },
      { id: "D", text: "Translational research bridging lab and clinic", traits: ["bridging", "practical"] }
    ]
  },
  {
    id: "pcmb_025",
    scenario: "A patient refuses treatment that would save their life due to religious beliefs. Your response?",
    options: [
      { id: "A", text: "Respect their autonomy completely", traits: ["ethical", "respectful"] },
      { id: "B", text: "Try to understand and discuss gently", traits: ["empathetic", "communicative"] },
      { id: "C", text: "Involve family and religious leaders", traits: ["collaborative", "comprehensive"] },
      { id: "D", text: "Explore alternative treatments they accept", traits: ["creative", "solution-focused"] }
    ]
  },
  {
    id: "pcmb_026",
    scenario: "Rural areas have severe doctor shortages. Would you practice there?",
    options: [
      { id: "A", text: "Yes, that's where I'm needed most", traits: ["service-oriented", "selfless"] },
      { id: "B", text: "For a few years to gain experience", traits: ["strategic", "practical"] },
      { id: "C", text: "Telemedicine support from urban area", traits: ["innovative", "balanced"] },
      { id: "D", text: "Prefer urban with occasional rural camps", traits: ["practical", "occasional"] }
    ]
  },
  {
    id: "pcmb_027",
    scenario: "You suspect a colleague is impaired while on duty. What do you do?",
    options: [
      { id: "A", text: "Report to supervisor immediately", traits: ["responsible", "direct"] },
      { id: "B", text: "Talk to the colleague privately first", traits: ["compassionate", "personal"] },
      { id: "C", text: "Ensure patient safety, then address", traits: ["prioritizing", "systematic"] },
      { id: "D", text: "Document and seek advice from seniors", traits: ["careful", "procedural"] }
    ]
  },
  {
    id: "pcmb_028",
    scenario: "What medical specialty combination interests you most?",
    options: [
      { id: "A", text: "Neurosurgery - precision and complexity", traits: ["technical", "challenging"] },
      { id: "B", text: "Oncology - fighting cancer with science", traits: ["research", "impactful"] },
      { id: "C", text: "Sports Medicine - active lifestyle focus", traits: ["active", "rehabilitation"] },
      { id: "D", text: "Genetic Counseling - future of medicine", traits: ["innovative", "preventive"] }
    ]
  },
  {
    id: "pcmb_029",
    scenario: "Emergency room is overwhelmed. How do you prioritize patients?",
    options: [
      { id: "A", text: "Strictly by medical urgency (triage)", traits: ["systematic", "clinical"] },
      { id: "B", text: "Consider all factors including resources", traits: ["practical", "comprehensive"] },
      { id: "C", text: "Follow established protocols exactly", traits: ["procedural", "consistent"] },
      { id: "D", text: "Use clinical judgment for flexibility", traits: ["experienced", "adaptive"] }
    ]
  },
  {
    id: "pcmb_030",
    scenario: "A patient asks about alternative medicine for their condition. Your response?",
    options: [
      { id: "A", text: "Discuss evidence-based options only", traits: ["scientific", "principled"] },
      { id: "B", text: "Research their specific interest for safety", traits: ["thorough", "open-minded"] },
      { id: "C", text: "Recommend integrative approach if safe", traits: ["holistic", "balanced"] },
      { id: "D", text: "Refer to integrative medicine specialist", traits: ["collaborative", "comprehensive"] }
    ]
  },
  {
    id: "pcmb_031",
    scenario: "Your hospital is implementing AI diagnostic tools. Your stance?",
    options: [
      { id: "A", text: "Enthusiastic - embrace technology advancement", traits: ["innovative", "progressive"] },
      { id: "B", text: "Cautious - need to verify accuracy first", traits: ["careful", "scientific"] },
      { id: "C", text: "Use as support, not replacement for judgment", traits: ["balanced", "practical"] },
      { id: "D", text: "Concerned about losing human touch", traits: ["traditional", "patient-focused"] }
    ]
  },
  {
    id: "pcmb_032",
    scenario: "A pharmaceutical company offers you speaker fees. How do you respond?",
    options: [
      { id: "A", text: "Decline to avoid any conflict of interest", traits: ["ethical", "principled"] },
      { id: "B", text: "Accept if topic is evidence-based", traits: ["practical", "conditional"] },
      { id: "C", text: "Disclose and let others judge", traits: ["transparent", "honest"] },
      { id: "D", text: "Consult ethics committee for guidance", traits: ["careful", "procedural"] }
    ]
  },
  {
    id: "pcmb_033",
    scenario: "You're choosing between research career and clinical practice. What draws you?",
    options: [
      { id: "A", text: "Research - discover new treatments", traits: ["innovative", "scientific"] },
      { id: "B", text: "Clinical - direct patient impact", traits: ["patient-focused", "applied"] },
      { id: "C", text: "Both - physician-scientist path", traits: ["ambitious", "comprehensive"] },
      { id: "D", text: "Teaching and mentoring next generation", traits: ["educational", "influential"] }
    ]
  },
  {
    id: "pcmb_034",
    scenario: "A patient's family wants information but patient requested privacy. What do you do?",
    options: [
      { id: "A", text: "Respect patient's wishes strictly", traits: ["ethical", "principled"] },
      { id: "B", text: "Discuss with patient about family's concern", traits: ["mediating", "comprehensive"] },
      { id: "C", text: "Share general information only", traits: ["balanced", "careful"] },
      { id: "D", text: "Encourage patient to communicate with family", traits: ["supportive", "family-focused"] }
    ]
  },
  {
    id: "pcmb_035",
    scenario: "You're interested in global health. What aspect appeals most?",
    options: [
      { id: "A", text: "Disease outbreak response and control", traits: ["emergency", "epidemiology"] },
      { id: "B", text: "Healthcare system strengthening", traits: ["systemic", "developmental"] },
      { id: "C", text: "Research on tropical diseases", traits: ["scientific", "specialized"] },
      { id: "D", text: "Health policy and international cooperation", traits: ["policy", "diplomatic"] }
    ]
  },
  {
    id: "pcmb_036",
    scenario: "Medical education is changing rapidly. What approach do you prefer?",
    options: [
      { id: "A", text: "Simulation-based learning", traits: ["practical", "experiential"] },
      { id: "B", text: "Problem-based learning with cases", traits: ["analytical", "applied"] },
      { id: "C", text: "Traditional lectures and textbooks", traits: ["structured", "foundational"] },
      { id: "D", text: "Early clinical exposure with patients", traits: ["patient-focused", "real-world"] }
    ]
  },
  {
    id: "pcmb_037",
    scenario: "You're treating a patient who can't afford medication. What do you do?",
    options: [
      { id: "A", text: "Find generic alternatives", traits: ["practical", "resourceful"] },
      { id: "B", text: "Connect with charity programs", traits: ["helpful", "networked"] },
      { id: "C", text: "Provide samples when available", traits: ["immediate", "caring"] },
      { id: "D", text: "Advocate for policy changes", traits: ["systemic", "activist"] }
    ]
  },
  {
    id: "pcmb_038",
    scenario: "How do you handle delivering bad news to patients?",
    options: [
      { id: "A", text: "Direct but compassionate approach", traits: ["honest", "empathetic"] },
      { id: "B", text: "Gradual disclosure with support", traits: ["sensitive", "careful"] },
      { id: "C", text: "Involve family in the conversation", traits: ["inclusive", "supportive"] },
      { id: "D", text: "Focus on options and next steps", traits: ["practical", "hopeful"] }
    ]
  },
  {
    id: "pcmb_039",
    scenario: "Work-life balance is challenging in medicine. Your strategy?",
    options: [
      { id: "A", text: "Set boundaries firmly from start", traits: ["self-aware", "balanced"] },
      { id: "B", text: "Accept it's part of the profession", traits: ["dedicated", "accepting"] },
      { id: "C", text: "Choose specialty with lifestyle in mind", traits: ["practical", "planning"] },
      { id: "D", text: "Focus on efficiency to create time", traits: ["efficient", "strategic"] }
    ]
  },
  {
    id: "pcmb_040",
    scenario: "You've made a medical error. What's your immediate response?",
    options: [
      { id: "A", text: "Disclose to patient and supervisor immediately", traits: ["honest", "responsible"] },
      { id: "B", text: "Address patient safety first, then disclose", traits: ["prioritizing", "systematic"] },
      { id: "C", text: "Document everything accurately", traits: ["thorough", "careful"] },
      { id: "D", text: "Seek support and learn from it", traits: ["growth-minded", "resilient"] }
    ]
  },

  // Research & Scientific (41-60)
  {
    id: "pcmb_041",
    scenario: "You're designing an experiment to test a new hypothesis. What's your priority?",
    options: [
      { id: "A", text: "Rigorous controls and variables", traits: ["methodical", "scientific"] },
      { id: "B", text: "Innovative approach to testing", traits: ["creative", "novel"] },
      { id: "C", text: "Practical feasibility with resources", traits: ["practical", "realistic"] },
      { id: "D", text: "Statistical power for meaningful results", traits: ["analytical", "thorough"] }
    ]
  },
  {
    id: "pcmb_042",
    scenario: "Your research results contradict a well-established theory. What do you do?",
    options: [
      { id: "A", text: "Recheck methodology thoroughly", traits: ["careful", "rigorous"] },
      { id: "B", text: "Publish and let scientific community evaluate", traits: ["confident", "open"] },
      { id: "C", text: "Discuss with experts before publishing", traits: ["collaborative", "cautious"] },
      { id: "D", text: "Conduct additional experiments to confirm", traits: ["thorough", "patient"] }
    ]
  },
  {
    id: "pcmb_043",
    scenario: "What type of research environment do you prefer?",
    options: [
      { id: "A", text: "Academic university lab", traits: ["academic", "theoretical"] },
      { id: "B", text: "Industry R&D department", traits: ["applied", "practical"] },
      { id: "C", text: "Government research institution", traits: ["stable", "public-service"] },
      { id: "D", text: "Startup with cutting-edge focus", traits: ["innovative", "entrepreneurial"] }
    ]
  },
  {
    id: "pcmb_044",
    scenario: "Your lab has limited funding. How do you prioritize projects?",
    options: [
      { id: "A", text: "Focus on most scientifically promising", traits: ["scientific", "principled"] },
      { id: "B", text: "Balance scientific and commercial potential", traits: ["practical", "strategic"] },
      { id: "C", text: "Pursue collaborative grants with others", traits: ["collaborative", "resourceful"] },
      { id: "D", text: "Focus on quick publishable results", traits: ["pragmatic", "career-focused"] }
    ]
  },
  {
    id: "pcmb_045",
    scenario: "A colleague asks you to co-author a paper you contributed little to. Your response?",
    options: [
      { id: "A", text: "Decline - authorship should reflect contribution", traits: ["ethical", "principled"] },
      { id: "B", text: "Accept if you can contribute more now", traits: ["practical", "willing"] },
      { id: "C", text: "Suggest acknowledgment instead", traits: ["honest", "fair"] },
      { id: "D", text: "Discuss what contribution would be appropriate", traits: ["communicative", "collaborative"] }
    ]
  },
  {
    id: "pcmb_046",
    scenario: "You're deciding between basic research and applied research. What attracts you?",
    options: [
      { id: "A", text: "Basic - understanding fundamental principles", traits: ["curious", "theoretical"] },
      { id: "B", text: "Applied - solving real-world problems", traits: ["practical", "impactful"] },
      { id: "C", text: "Translational - bridging both worlds", traits: ["comprehensive", "strategic"] },
      { id: "D", text: "Whichever gets funding", traits: ["pragmatic", "flexible"] }
    ]
  },
  {
    id: "pcmb_047",
    scenario: "Your experiment failed repeatedly. How do you respond?",
    options: [
      { id: "A", text: "Analyze what's going wrong systematically", traits: ["analytical", "persistent"] },
      { id: "B", text: "Try completely different approach", traits: ["creative", "flexible"] },
      { id: "C", text: "Consult colleagues for fresh perspectives", traits: ["collaborative", "humble"] },
      { id: "D", text: "Reconsider if hypothesis is valid", traits: ["reflective", "scientific"] }
    ]
  },
  {
    id: "pcmb_048",
    scenario: "You discover your supervisor may have falsified data. What do you do?",
    options: [
      { id: "A", text: "Report to institutional ethics committee", traits: ["principled", "courageous"] },
      { id: "B", text: "Discuss concerns with supervisor first", traits: ["diplomatic", "careful"] },
      { id: "C", text: "Seek advice from trusted mentor", traits: ["cautious", "guidance-seeking"] },
      { id: "D", text: "Document everything before acting", traits: ["thorough", "protective"] }
    ]
  },
  {
    id: "pcmb_049",
    scenario: "What aspect of scientific communication interests you most?",
    options: [
      { id: "A", text: "Writing detailed research papers", traits: ["technical", "thorough"] },
      { id: "B", text: "Presenting at conferences", traits: ["communicative", "engaging"] },
      { id: "C", text: "Science outreach to public", traits: ["educational", "accessible"] },
      { id: "D", text: "Teaching and mentoring students", traits: ["nurturing", "guiding"] }
    ]
  },
  {
    id: "pcmb_050",
    scenario: "You're offered industry funding that might bias your research. How do you proceed?",
    options: [
      { id: "A", text: "Decline to maintain independence", traits: ["principled", "independent"] },
      { id: "B", text: "Accept with clear transparency about source", traits: ["practical", "transparent"] },
      { id: "C", text: "Negotiate for research independence clause", traits: ["strategic", "protective"] },
      { id: "D", text: "Consult ethics board for guidance", traits: ["careful", "procedural"] }
    ]
  },
  {
    id: "pcmb_051",
    scenario: "Your research could have dual-use implications (good and harmful). What's your stance?",
    options: [
      { id: "A", text: "Publish with safeguards and guidelines", traits: ["responsible", "open"] },
      { id: "B", text: "Restrict publication to prevent misuse", traits: ["cautious", "protective"] },
      { id: "C", text: "Consult biosecurity experts first", traits: ["collaborative", "thorough"] },
      { id: "D", text: "Benefits of knowledge outweigh risks", traits: ["progressive", "optimistic"] }
    ]
  },
  {
    id: "pcmb_052",
    scenario: "You're choosing a PhD topic. What influences your decision most?",
    options: [
      { id: "A", text: "Personal fascination with the subject", traits: ["passionate", "intrinsic"] },
      { id: "B", text: "Future career prospects", traits: ["practical", "strategic"] },
      { id: "C", text: "Supervisor and lab environment", traits: ["relationship-focused", "practical"] },
      { id: "D", text: "Potential to make real impact", traits: ["impactful", "meaningful"] }
    ]
  },
  {
    id: "pcmb_053",
    scenario: "Interdisciplinary collaboration is challenging. How do you approach it?",
    options: [
      { id: "A", text: "Learn basics of other disciplines", traits: ["curious", "adaptable"] },
      { id: "B", text: "Focus on clear communication", traits: ["communicative", "bridging"] },
      { id: "C", text: "Define roles and expectations clearly", traits: ["organized", "systematic"] },
      { id: "D", text: "Find shared language and goals", traits: ["collaborative", "unifying"] }
    ]
  },
  {
    id: "pcmb_054",
    scenario: "Your research animal model raises ethical concerns. How do you address this?",
    options: [
      { id: "A", text: "Follow strict 3Rs (Replace, Reduce, Refine)", traits: ["ethical", "principled"] },
      { id: "B", text: "Explore alternative models first", traits: ["innovative", "compassionate"] },
      { id: "C", text: "Justify necessity with clear rationale", traits: ["scientific", "reasoned"] },
      { id: "D", text: "Work with ethics committee continuously", traits: ["collaborative", "compliant"] }
    ]
  },
  {
    id: "pcmb_055",
    scenario: "You've made an accidental discovery unrelated to your project. What do you do?",
    options: [
      { id: "A", text: "Pursue it if it seems significant", traits: ["curious", "opportunistic"] },
      { id: "B", text: "Document and return to main project", traits: ["focused", "disciplined"] },
      { id: "C", text: "Share with colleagues who might pursue it", traits: ["collaborative", "generous"] },
      { id: "D", text: "Publish preliminary finding for others", traits: ["open", "scientific"] }
    ]
  },
  {
    id: "pcmb_056",
    scenario: "What role do you see for open science in research?",
    options: [
      { id: "A", text: "Essential for scientific progress", traits: ["progressive", "collaborative"] },
      { id: "B", text: "Good but need to protect intellectual property", traits: ["balanced", "practical"] },
      { id: "C", text: "Depends on the field and context", traits: ["nuanced", "adaptive"] },
      { id: "D", text: "Concerned about quality control", traits: ["cautious", "quality-focused"] }
    ]
  },
  {
    id: "pcmb_057",
    scenario: "Your breakthrough research is being rushed by administrators. How do you respond?",
    options: [
      { id: "A", text: "Insist on proper validation time", traits: ["principled", "patient"] },
      { id: "B", text: "Find ways to accelerate without compromising", traits: ["efficient", "adaptive"] },
      { id: "C", text: "Communicate risks of rushing clearly", traits: ["communicative", "responsible"] },
      { id: "D", text: "Document any pressure for future reference", traits: ["protective", "careful"] }
    ]
  },
  {
    id: "pcmb_058",
    scenario: "How do you handle negative peer review of your paper?",
    options: [
      { id: "A", text: "Address all concerns thoroughly", traits: ["responsive", "thorough"] },
      { id: "B", text: "Distinguish valid criticism from bias", traits: ["analytical", "discerning"] },
      { id: "C", text: "Seek second opinion before responding", traits: ["collaborative", "measured"] },
      { id: "D", text: "Revise and try another journal if needed", traits: ["persistent", "pragmatic"] }
    ]
  },
  {
    id: "pcmb_059",
    scenario: "You're considering leaving academia for industry. What factors matter most?",
    options: [
      { id: "A", text: "Research freedom and curiosity-driven work", traits: ["academic", "autonomous"] },
      { id: "B", text: "Impact and seeing research applied", traits: ["applied", "impactful"] },
      { id: "C", text: "Financial stability and career progression", traits: ["practical", "security-minded"] },
      { id: "D", text: "Work-life balance and team environment", traits: ["balanced", "collaborative"] }
    ]
  },
  {
    id: "pcmb_060",
    scenario: "Your research could be patented or published openly. Which do you prefer?",
    options: [
      { id: "A", text: "Open publication for scientific progress", traits: ["open", "idealistic"] },
      { id: "B", text: "Patent to ensure development resources", traits: ["practical", "commercial"] },
      { id: "C", text: "Publish and patent strategically", traits: ["strategic", "balanced"] },
      { id: "D", text: "Let institution decide based on potential", traits: ["flexible", "trusting"] }
    ]
  },

  // Environmental & Agricultural (61-80)
  {
    id: "pcmb_061",
    scenario: "Your region faces water scarcity. What solution would you research?",
    options: [
      { id: "A", text: "Efficient desalination technologies", traits: ["engineering", "innovative"] },
      { id: "B", text: "Drought-resistant crop varieties", traits: ["agricultural", "biological"] },
      { id: "C", text: "Water recycling and conservation systems", traits: ["practical", "sustainable"] },
      { id: "D", text: "Rainwater harvesting optimization", traits: ["traditional", "local"] }
    ]
  },
  {
    id: "pcmb_062",
    scenario: "Farmers in your area are overusing pesticides. How do you help?",
    options: [
      { id: "A", text: "Develop biological pest control methods", traits: ["scientific", "sustainable"] },
      { id: "B", text: "Create educational programs for farmers", traits: ["educational", "community"] },
      { id: "C", text: "Research integrated pest management", traits: ["balanced", "practical"] },
      { id: "D", text: "Develop safer, targeted pesticides", traits: ["chemical", "innovative"] }
    ]
  },
  {
    id: "pcmb_063",
    scenario: "Climate change is affecting local agriculture. What's your research focus?",
    options: [
      { id: "A", text: "Climate-resilient crop varieties", traits: ["genetic", "adaptive"] },
      { id: "B", text: "Changing planting patterns and calendars", traits: ["practical", "adaptive"] },
      { id: "C", text: "New irrigation and farming techniques", traits: ["engineering", "efficient"] },
      { id: "D", text: "Crop diversification strategies", traits: ["risk-management", "holistic"] }
    ]
  },
  {
    id: "pcmb_064",
    scenario: "You're developing sustainable farming practices. What do you prioritize?",
    options: [
      { id: "A", text: "Soil health and regeneration", traits: ["foundational", "long-term"] },
      { id: "B", text: "Reducing chemical inputs", traits: ["environmental", "clean"] },
      { id: "C", text: "Water efficiency", traits: ["practical", "conserving"] },
      { id: "D", text: "Farmer profitability and adoption", traits: ["practical", "economic"] }
    ]
  },
  {
    id: "pcmb_065",
    scenario: "A new genetically modified crop could increase yields significantly. Your stance?",
    options: [
      { id: "A", text: "Support with proper safety testing", traits: ["progressive", "scientific"] },
      { id: "B", text: "Concerned about long-term ecological effects", traits: ["cautious", "ecological"] },
      { id: "C", text: "Case-by-case evaluation needed", traits: ["nuanced", "analytical"] },
      { id: "D", text: "Prefer traditional breeding methods", traits: ["traditional", "conservative"] }
    ]
  },
  {
    id: "pcmb_066",
    scenario: "You're studying biodiversity loss in your region. What approach?",
    options: [
      { id: "A", text: "Species inventory and monitoring", traits: ["systematic", "foundational"] },
      { id: "B", text: "Habitat restoration projects", traits: ["applied", "restorative"] },
      { id: "C", text: "Understanding ecosystem interactions", traits: ["ecological", "complex"] },
      { id: "D", text: "Policy recommendations for protection", traits: ["advocacy", "systemic"] }
    ]
  },
  {
    id: "pcmb_067",
    scenario: "Organic farming is gaining popularity. How do you contribute?",
    options: [
      { id: "A", text: "Research organic pest and disease control", traits: ["scientific", "practical"] },
      { id: "B", text: "Develop organic certification standards", traits: ["regulatory", "quality"] },
      { id: "C", text: "Study nutritional benefits of organic produce", traits: ["health", "comparative"] },
      { id: "D", text: "Help farmers transition sustainably", traits: ["supportive", "educational"] }
    ]
  },
  {
    id: "pcmb_068",
    scenario: "A forest area is being cleared for development. Your action?",
    options: [
      { id: "A", text: "Document and advocate for conservation", traits: ["activist", "protective"] },
      { id: "B", text: "Propose sustainable development alternatives", traits: ["balanced", "creative"] },
      { id: "C", text: "Study the ecosystem impact scientifically", traits: ["research", "evidence-based"] },
      { id: "D", text: "Work on restoration of similar areas", traits: ["practical", "compensatory"] }
    ]
  },
  {
    id: "pcmb_069",
    scenario: "You're researching alternatives to animal testing. What method interests you?",
    options: [
      { id: "A", text: "Cell culture and organoid models", traits: ["biological", "innovative"] },
      { id: "B", text: "Computer simulation and modeling", traits: ["computational", "efficient"] },
      { id: "C", text: "Human tissue engineering", traits: ["biomedical", "advanced"] },
      { id: "D", text: "Comparative studies across species", traits: ["evolutionary", "analytical"] }
    ]
  },
  {
    id: "pcmb_070",
    scenario: "Food security is a growing concern. What's your research priority?",
    options: [
      { id: "A", text: "Increasing crop yields sustainably", traits: ["productive", "sustainable"] },
      { id: "B", text: "Reducing post-harvest losses", traits: ["practical", "efficient"] },
      { id: "C", text: "Developing nutritionally fortified crops", traits: ["nutritional", "health-focused"] },
      { id: "D", text: "Alternative protein sources", traits: ["innovative", "future-focused"] }
    ]
  },
  {
    id: "pcmb_071",
    scenario: "Your research on invasive species shows ecosystem damage. What action?",
    options: [
      { id: "A", text: "Develop biological control methods", traits: ["scientific", "biological"] },
      { id: "B", text: "Recommend policy for prevention", traits: ["policy", "preventive"] },
      { id: "C", text: "Create public awareness campaigns", traits: ["educational", "community"] },
      { id: "D", text: "Study native species for restoration", traits: ["restorative", "ecological"] }
    ]
  },
  {
    id: "pcmb_072",
    scenario: "You're exploring biofuel alternatives. What source interests you most?",
    options: [
      { id: "A", text: "Algae-based biofuels", traits: ["innovative", "efficient"] },
      { id: "B", text: "Agricultural waste conversion", traits: ["practical", "sustainable"] },
      { id: "C", text: "Genetically engineered biofuel crops", traits: ["genetic", "high-yield"] },
      { id: "D", text: "Microbial fuel production", traits: ["biotechnology", "novel"] }
    ]
  },
  {
    id: "pcmb_073",
    scenario: "Antibiotic resistance in agriculture concerns you. Your research focus?",
    options: [
      { id: "A", text: "Alternatives to antibiotics in farming", traits: ["innovative", "preventive"] },
      { id: "B", text: "Tracking resistance gene spread", traits: ["epidemiological", "monitoring"] },
      { id: "C", text: "Improved animal husbandry practices", traits: ["practical", "preventive"] },
      { id: "D", text: "New antibiotics from natural sources", traits: ["discovery", "biological"] }
    ]
  },
  {
    id: "pcmb_074",
    scenario: "You're studying microbiome effects on health. What application interests you?",
    options: [
      { id: "A", text: "Gut health and disease prevention", traits: ["medical", "preventive"] },
      { id: "B", text: "Soil microbiome for agriculture", traits: ["agricultural", "ecological"] },
      { id: "C", text: "Probiotics and personalized nutrition", traits: ["nutritional", "personalized"] },
      { id: "D", text: "Environmental microbiome applications", traits: ["environmental", "applied"] }
    ]
  },
  {
    id: "pcmb_075",
    scenario: "Marine pollution is damaging coastal ecosystems. Your contribution?",
    options: [
      { id: "A", text: "Develop plastic-degrading microbes", traits: ["biotechnology", "innovative"] },
      { id: "B", text: "Study impact on marine life", traits: ["ecological", "research"] },
      { id: "C", text: "Create cleanup technologies", traits: ["engineering", "practical"] },
      { id: "D", text: "Policy advocacy for pollution control", traits: ["advocacy", "systemic"] }
    ]
  },
  {
    id: "pcmb_076",
    scenario: "Vertical farming is emerging as urban agriculture solution. Your interest?",
    options: [
      { id: "A", text: "Optimizing LED lighting for growth", traits: ["engineering", "efficiency"] },
      { id: "B", text: "Plant biology in controlled environments", traits: ["biological", "research"] },
      { id: "C", text: "Economic viability and scalability", traits: ["business", "practical"] },
      { id: "D", text: "Integration with urban planning", traits: ["urban", "systemic"] }
    ]
  },
  {
    id: "pcmb_077",
    scenario: "You're researching carbon sequestration. What method appeals to you?",
    options: [
      { id: "A", text: "Forest and vegetation management", traits: ["natural", "ecological"] },
      { id: "B", text: "Ocean-based sequestration", traits: ["marine", "large-scale"] },
      { id: "C", text: "Soil carbon capture in agriculture", traits: ["agricultural", "practical"] },
      { id: "D", text: "Engineered carbon capture systems", traits: ["technological", "industrial"] }
    ]
  },
  {
    id: "pcmb_078",
    scenario: "Wildlife disease outbreaks are increasing. What's your research approach?",
    options: [
      { id: "A", text: "Understanding pathogen-host dynamics", traits: ["biological", "fundamental"] },
      { id: "B", text: "Developing wildlife vaccination programs", traits: ["applied", "preventive"] },
      { id: "C", text: "Monitoring and early warning systems", traits: ["surveillance", "preventive"] },
      { id: "D", text: "Studying human-wildlife-livestock interfaces", traits: ["one-health", "comprehensive"] }
    ]
  },
  {
    id: "pcmb_079",
    scenario: "Conservation genetics is crucial for endangered species. Your focus?",
    options: [
      { id: "A", text: "Genetic diversity assessment", traits: ["analytical", "foundational"] },
      { id: "B", text: "Captive breeding programs", traits: ["applied", "conservation"] },
      { id: "C", text: "Gene banking and preservation", traits: ["protective", "long-term"] },
      { id: "D", text: "Genetic rescue through assisted gene flow", traits: ["innovative", "interventionist"] }
    ]
  },
  {
    id: "pcmb_080",
    scenario: "Agroforestry combines trees with crops. What aspect would you research?",
    options: [
      { id: "A", text: "Optimal tree-crop combinations", traits: ["practical", "systematic"] },
      { id: "B", text: "Ecological benefits and biodiversity", traits: ["ecological", "holistic"] },
      { id: "C", text: "Economic returns for farmers", traits: ["economic", "farmer-focused"] },
      { id: "D", text: "Carbon sequestration potential", traits: ["climate", "quantitative"] }
    ]
  },

  // Career choice situations (81-100)
  {
    id: "pcmb_081",
    scenario: "You're choosing between medical research and becoming a practicing doctor. What matters most?",
    options: [
      { id: "A", text: "Direct patient interaction and healing", traits: ["clinical", "personal"] },
      { id: "B", text: "Discovering treatments that help millions", traits: ["research", "impactful"] },
      { id: "C", text: "Combining both through academic medicine", traits: ["comprehensive", "ambitious"] },
      { id: "D", text: "Flexibility and career options", traits: ["practical", "versatile"] }
    ]
  },
  {
    id: "pcmb_082",
    scenario: "A biotech startup offers you equity instead of high salary. Your decision?",
    options: [
      { id: "A", text: "Accept - believe in the innovation", traits: ["risk-taking", "optimistic"] },
      { id: "B", text: "Decline - prefer financial stability", traits: ["practical", "secure"] },
      { id: "C", text: "Negotiate a balance of both", traits: ["diplomatic", "balanced"] },
      { id: "D", text: "Evaluate the science and team first", traits: ["analytical", "careful"] }
    ]
  },
  {
    id: "pcmb_083",
    scenario: "You're deciding between MBBS and BSc in Biotechnology. What guides your choice?",
    options: [
      { id: "A", text: "Love for patient care and clinical work", traits: ["clinical", "caring"] },
      { id: "B", text: "Fascination with laboratory research", traits: ["research", "scientific"] },
      { id: "C", text: "Career prospects and job security", traits: ["practical", "career-focused"] },
      { id: "D", text: "Ability to innovate and discover", traits: ["innovative", "creative"] }
    ]
  },
  {
    id: "pcmb_084",
    scenario: "You want to work on pandemic preparedness. What role suits you?",
    options: [
      { id: "A", text: "Vaccine development researcher", traits: ["research", "scientific"] },
      { id: "B", text: "Epidemiologist tracking outbreaks", traits: ["analytical", "surveillance"] },
      { id: "C", text: "Healthcare policy maker", traits: ["policy", "systemic"] },
      { id: "D", text: "Frontline healthcare provider", traits: ["clinical", "direct"] }
    ]
  },
  {
    id: "pcmb_085",
    scenario: "Your dream is to work at NASA or ISRO on life sciences. What's your path?",
    options: [
      { id: "A", text: "Space biology and astrobiology research", traits: ["space", "research"] },
      { id: "B", text: "Aerospace engineering with biology focus", traits: ["engineering", "interdisciplinary"] },
      { id: "C", text: "Life support systems development", traits: ["applied", "engineering"] },
      { id: "D", text: "Astronaut health and medicine", traits: ["medical", "aerospace"] }
    ]
  },
  {
    id: "pcmb_086",
    scenario: "You're interested in forensic science. What area excites you most?",
    options: [
      { id: "A", text: "DNA analysis and genetics", traits: ["molecular", "analytical"] },
      { id: "B", text: "Toxicology and poison detection", traits: ["chemical", "detective"] },
      { id: "C", text: "Crime scene investigation", traits: ["field-work", "observant"] },
      { id: "D", text: "Digital forensics and cyber crimes", traits: ["technical", "modern"] }
    ]
  },
  {
    id: "pcmb_087",
    scenario: "A pharmaceutical company and a hospital both offer you positions. Your choice?",
    options: [
      { id: "A", text: "Hospital for direct patient impact", traits: ["clinical", "immediate"] },
      { id: "B", text: "Pharma for research and innovation", traits: ["research", "industry"] },
      { id: "C", text: "Whichever offers better growth", traits: ["pragmatic", "career-focused"] },
      { id: "D", text: "The one aligned with my specific interests", traits: ["purposeful", "passionate"] }
    ]
  },
  {
    id: "pcmb_088",
    scenario: "You want to address healthcare in underserved areas. What approach?",
    options: [
      { id: "A", text: "Work as rural healthcare provider", traits: ["direct", "service"] },
      { id: "B", text: "Develop affordable diagnostic tools", traits: ["innovative", "access-focused"] },
      { id: "C", text: "Telemedicine and health tech solutions", traits: ["technological", "scalable"] },
      { id: "D", text: "Health policy and systems strengthening", traits: ["systemic", "policy"] }
    ]
  },
  {
    id: "pcmb_089",
    scenario: "Bioethics increasingly interests you. What career path would you explore?",
    options: [
      { id: "A", text: "Hospital ethics committee member", traits: ["clinical", "applied"] },
      { id: "B", text: "Research ethics and policy", traits: ["academic", "policy"] },
      { id: "C", text: "Legal aspects of medical ethics", traits: ["legal", "regulatory"] },
      { id: "D", text: "Teaching bioethics to medical students", traits: ["educational", "influential"] }
    ]
  },
  {
    id: "pcmb_090",
    scenario: "You're considering science journalism. What would you cover?",
    options: [
      { id: "A", text: "Breaking research and discoveries", traits: ["news", "exciting"] },
      { id: "B", text: "Health and medical topics", traits: ["practical", "helpful"] },
      { id: "C", text: "Environmental and climate science", traits: ["impactful", "urgent"] },
      { id: "D", text: "Explaining science to general public", traits: ["educational", "accessible"] }
    ]
  },
  {
    id: "pcmb_091",
    scenario: "What type of graduate program appeals to you most?",
    options: [
      { id: "A", text: "MD - Clinical medicine focus", traits: ["clinical", "patient-care"] },
      { id: "B", text: "PhD - Pure research path", traits: ["research", "academic"] },
      { id: "C", text: "MD-PhD - Physician-scientist training", traits: ["comprehensive", "ambitious"] },
      { id: "D", text: "Professional Masters - Applied focus", traits: ["practical", "career-oriented"] }
    ]
  },
  {
    id: "pcmb_092",
    scenario: "You want to work in genetic counseling. What draws you?",
    options: [
      { id: "A", text: "Helping families understand genetic conditions", traits: ["empathetic", "educational"] },
      { id: "B", text: "Being at forefront of genetic technology", traits: ["innovative", "technical"] },
      { id: "C", text: "Ethical aspects of genetic decisions", traits: ["ethical", "thoughtful"] },
      { id: "D", text: "Combination of science and counseling", traits: ["interdisciplinary", "balanced"] }
    ]
  },
  {
    id: "pcmb_093",
    scenario: "Conservation biology calls you. What would you focus on?",
    options: [
      { id: "A", text: "Endangered species protection", traits: ["protective", "wildlife"] },
      { id: "B", text: "Ecosystem restoration projects", traits: ["restorative", "ecological"] },
      { id: "C", text: "Conservation policy and advocacy", traits: ["policy", "influential"] },
      { id: "D", text: "Community-based conservation", traits: ["social", "sustainable"] }
    ]
  },
  {
    id: "pcmb_094",
    scenario: "A career in clinical psychology versus neuroscience. What attracts you more?",
    options: [
      { id: "A", text: "Psychology - helping people directly", traits: ["clinical", "therapeutic"] },
      { id: "B", text: "Neuroscience - understanding the brain", traits: ["research", "fundamental"] },
      { id: "C", text: "Neuropsychology - combining both", traits: ["interdisciplinary", "comprehensive"] },
      { id: "D", text: "Wherever there's more career opportunity", traits: ["pragmatic", "flexible"] }
    ]
  },
  {
    id: "pcmb_095",
    scenario: "You're passionate about nutrition. What career path interests you?",
    options: [
      { id: "A", text: "Clinical dietitian in hospitals", traits: ["clinical", "patient-care"] },
      { id: "B", text: "Research on nutrition and disease", traits: ["research", "scientific"] },
      { id: "C", text: "Public health nutrition programs", traits: ["community", "preventive"] },
      { id: "D", text: "Sports and performance nutrition", traits: ["athletic", "specialized"] }
    ]
  },
  {
    id: "pcmb_096",
    scenario: "Regenerative medicine excites you. What area would you pursue?",
    options: [
      { id: "A", text: "Stem cell research and therapy", traits: ["cutting-edge", "biological"] },
      { id: "B", text: "Tissue engineering and 3D bioprinting", traits: ["engineering", "innovative"] },
      { id: "C", text: "Clinical applications and trials", traits: ["clinical", "applied"] },
      { id: "D", text: "Regulatory and ethical frameworks", traits: ["policy", "ethical"] }
    ]
  },
  {
    id: "pcmb_097",
    scenario: "You want to contribute to mental health. What role appeals?",
    options: [
      { id: "A", text: "Psychiatrist treating patients", traits: ["clinical", "medical"] },
      { id: "B", text: "Neuroscientist researching brain disorders", traits: ["research", "scientific"] },
      { id: "C", text: "Mental health policy advocate", traits: ["advocacy", "systemic"] },
      { id: "D", text: "Developing mental health technologies", traits: ["innovative", "technological"] }
    ]
  },
  {
    id: "pcmb_098",
    scenario: "Science entrepreneurship interests you. What would you build?",
    options: [
      { id: "A", text: "Biotech company developing new therapies", traits: ["medical", "innovative"] },
      { id: "B", text: "AgriTech improving farming", traits: ["agricultural", "practical"] },
      { id: "C", text: "Health tech for patient monitoring", traits: ["health", "technological"] },
      { id: "D", text: "Environmental solutions company", traits: ["green", "impactful"] }
    ]
  },
  {
    id: "pcmb_099",
    scenario: "You're at a career crossroads between industry and academia. What matters most?",
    options: [
      { id: "A", text: "Freedom to explore curiosity-driven research", traits: ["academic", "autonomous"] },
      { id: "B", text: "Resources and impact of industry", traits: ["industry", "practical"] },
      { id: "C", text: "Teaching and mentoring students", traits: ["educational", "nurturing"] },
      { id: "D", text: "Work-life balance and stability", traits: ["balanced", "practical"] }
    ]
  },
  {
    id: "pcmb_100",
    scenario: "Reflecting on PCMB, what has it prepared you for most?",
    options: [
      { id: "A", text: "Medical and healthcare careers", traits: ["medical", "caring"] },
      { id: "B", text: "Research and scientific discovery", traits: ["research", "analytical"] },
      { id: "C", text: "Interdisciplinary problem-solving", traits: ["versatile", "integrative"] },
      { id: "D", text: "Innovation and technology development", traits: ["innovative", "applied"] }
    ]
  }
];
