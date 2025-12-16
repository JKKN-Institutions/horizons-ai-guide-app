import { Question } from './types';

export const PCM_QUESTIONS: Question[] = [
  // Engineering scenarios (1-20)
  {
    id: "pcm_001",
    scenario: "Your school's computer lab has a network issue. The IT staff is unavailable. What would you do?",
    options: [
      { id: "A", text: "Try to diagnose and fix it yourself", traits: ["problem-solving", "technical"] },
      { id: "B", text: "Research online for solutions", traits: ["analytical", "research"] },
      { id: "C", text: "Wait for IT staff to return", traits: ["patient", "rule-follower"] },
      { id: "D", text: "Ask physics teacher for help", traits: ["collaborative", "resourceful"] }
    ]
  },
  {
    id: "pcm_002",
    scenario: "You notice a bridge in your city has visible cracks. What concerns you most?",
    options: [
      { id: "A", text: "The structural integrity and safety", traits: ["engineering", "safety-conscious"] },
      { id: "B", text: "The materials used in construction", traits: ["materials-science", "analytical"] },
      { id: "C", text: "The maintenance schedule", traits: ["systematic", "organized"] },
      { id: "D", text: "Who should be informed about it", traits: ["responsible", "civic-minded"] }
    ]
  },
  {
    id: "pcm_003",
    scenario: "Your team is building a robot for a competition. What role would you prefer?",
    options: [
      { id: "A", text: "Designing the mechanical structure", traits: ["mechanical", "design"] },
      { id: "B", text: "Programming the control systems", traits: ["programming", "logical"] },
      { id: "C", text: "Managing the electronics and wiring", traits: ["electronics", "technical"] },
      { id: "D", text: "Coordinating the team and timeline", traits: ["leadership", "organized"] }
    ]
  },
  {
    id: "pcm_004",
    scenario: "A local factory is causing pollution. How would you approach solving this?",
    options: [
      { id: "A", text: "Design filtration systems to reduce emissions", traits: ["engineering", "innovative"] },
      { id: "B", text: "Analyze the chemical composition of pollutants", traits: ["analytical", "chemistry"] },
      { id: "C", text: "Create awareness campaigns", traits: ["social", "activist"] },
      { id: "D", text: "Research renewable energy alternatives", traits: ["sustainable", "forward-thinking"] }
    ]
  },
  {
    id: "pcm_005",
    scenario: "You're given a broken radio to fix. What's your first step?",
    options: [
      { id: "A", text: "Open it up and examine the components", traits: ["hands-on", "curious"] },
      { id: "B", text: "Research the circuit diagram online", traits: ["research", "systematic"] },
      { id: "C", text: "Test with a multimeter for faults", traits: ["technical", "methodical"] },
      { id: "D", text: "Ask someone experienced for guidance", traits: ["collaborative", "learning"] }
    ]
  },
  {
    id: "pcm_006",
    scenario: "Your friend wants to build a mobile app. How would you contribute?",
    options: [
      { id: "A", text: "Write the backend code and database", traits: ["programming", "backend"] },
      { id: "B", text: "Design the user interface", traits: ["design", "creative"] },
      { id: "C", text: "Handle testing and quality assurance", traits: ["detail-oriented", "quality"] },
      { id: "D", text: "Plan the features and user experience", traits: ["planning", "user-focused"] }
    ]
  },
  {
    id: "pcm_007",
    scenario: "You're designing a solar-powered vehicle. What aspect excites you most?",
    options: [
      { id: "A", text: "Maximizing solar panel efficiency", traits: ["engineering", "optimization"] },
      { id: "B", text: "Aerodynamic body design", traits: ["physics", "design"] },
      { id: "C", text: "Battery storage and management", traits: ["electrical", "practical"] },
      { id: "D", text: "Cost-effective material selection", traits: ["practical", "economical"] }
    ]
  },
  {
    id: "pcm_008",
    scenario: "A satellite image shows unusual patterns on Earth. What would you investigate?",
    options: [
      { id: "A", text: "The geological formations causing patterns", traits: ["geological", "analytical"] },
      { id: "B", text: "The satellite imaging technology used", traits: ["technical", "curious"] },
      { id: "C", text: "Mathematical analysis of the patterns", traits: ["mathematical", "analytical"] },
      { id: "D", text: "Environmental factors at play", traits: ["environmental", "holistic"] }
    ]
  },
  {
    id: "pcm_009",
    scenario: "Your calculator gives wrong answers. How do you verify calculations?",
    options: [
      { id: "A", text: "Do mental math to cross-check", traits: ["mathematical", "confident"] },
      { id: "B", text: "Use estimation to verify reasonableness", traits: ["logical", "practical"] },
      { id: "C", text: "Try another calculator or computer", traits: ["resourceful", "systematic"] },
      { id: "D", text: "Work backwards from the answer", traits: ["analytical", "methodical"] }
    ]
  },
  {
    id: "pcm_010",
    scenario: "You're asked to improve a local traffic system. What would you focus on?",
    options: [
      { id: "A", text: "Optimizing signal timing with algorithms", traits: ["programming", "optimization"] },
      { id: "B", text: "Designing better road layouts", traits: ["civil-engineering", "planning"] },
      { id: "C", text: "Installing sensors for real-time data", traits: ["IoT", "technical"] },
      { id: "D", text: "Creating a mobile app for commuters", traits: ["software", "user-focused"] }
    ]
  },
  {
    id: "pcm_011",
    scenario: "A construction project is delayed due to material shortage. What solution would you propose?",
    options: [
      { id: "A", text: "Find alternative materials with similar properties", traits: ["resourceful", "materials-science"] },
      { id: "B", text: "Redesign to use available materials", traits: ["adaptive", "engineering"] },
      { id: "C", text: "Calculate minimum materials needed to proceed", traits: ["mathematical", "efficient"] },
      { id: "D", text: "Source materials from different suppliers", traits: ["practical", "management"] }
    ]
  },
  {
    id: "pcm_012",
    scenario: "You're developing a weather prediction model. What data would you prioritize?",
    options: [
      { id: "A", text: "Temperature and pressure readings", traits: ["physics", "fundamental"] },
      { id: "B", text: "Historical weather patterns", traits: ["data-analysis", "research"] },
      { id: "C", text: "Satellite imagery and cloud formations", traits: ["visual", "comprehensive"] },
      { id: "D", text: "Wind speed and humidity levels", traits: ["meteorological", "detailed"] }
    ]
  },
  {
    id: "pcm_013",
    scenario: "A friend's laptop overheats frequently. How would you diagnose the problem?",
    options: [
      { id: "A", text: "Check CPU and GPU temperatures with software", traits: ["technical", "systematic"] },
      { id: "B", text: "Open it to check thermal paste and fans", traits: ["hands-on", "hardware"] },
      { id: "C", text: "Monitor running processes for high usage", traits: ["software", "analytical"] },
      { id: "D", text: "Research the laptop model for known issues", traits: ["research", "thorough"] }
    ]
  },
  {
    id: "pcm_014",
    scenario: "You want to automate your home. What would you start with?",
    options: [
      { id: "A", text: "Smart lighting controlled by phone", traits: ["IoT", "practical"] },
      { id: "B", text: "Security system with sensors", traits: ["security", "safety"] },
      { id: "C", text: "Energy monitoring and optimization", traits: ["efficient", "sustainable"] },
      { id: "D", text: "Voice-controlled assistant integration", traits: ["AI", "user-friendly"] }
    ]
  },
  {
    id: "pcm_015",
    scenario: "Your physics experiment results don't match the theory. What's your reaction?",
    options: [
      { id: "A", text: "Recheck calculations and methodology", traits: ["methodical", "careful"] },
      { id: "B", text: "Consider sources of experimental error", traits: ["analytical", "scientific"] },
      { id: "C", text: "Question if the theory applies here", traits: ["critical-thinking", "curious"] },
      { id: "D", text: "Repeat the experiment multiple times", traits: ["thorough", "persistent"] }
    ]
  },
  {
    id: "pcm_016",
    scenario: "You're designing a water purification system for a village. What's your priority?",
    options: [
      { id: "A", text: "Cost-effectiveness and local materials", traits: ["practical", "economical"] },
      { id: "B", text: "Maximum purification efficiency", traits: ["engineering", "quality"] },
      { id: "C", text: "Easy maintenance by villagers", traits: ["user-focused", "sustainable"] },
      { id: "D", text: "Scalability for growing population", traits: ["planning", "forward-thinking"] }
    ]
  },
  {
    id: "pcm_017",
    scenario: "A drone delivery system needs improvement. What would you enhance?",
    options: [
      { id: "A", text: "Battery life and flight range", traits: ["electrical", "optimization"] },
      { id: "B", text: "Navigation and obstacle avoidance", traits: ["AI", "programming"] },
      { id: "C", text: "Payload capacity and stability", traits: ["mechanical", "engineering"] },
      { id: "D", text: "Weather resistance and durability", traits: ["materials", "practical"] }
    ]
  },
  {
    id: "pcm_018",
    scenario: "You notice your math teacher made an error on the board. What do you do?",
    options: [
      { id: "A", text: "Politely point out the mistake", traits: ["confident", "helpful"] },
      { id: "B", text: "Work through it yourself to confirm", traits: ["analytical", "independent"] },
      { id: "C", text: "Ask a clarifying question", traits: ["tactful", "curious"] },
      { id: "D", text: "Wait to see if others notice", traits: ["observant", "patient"] }
    ]
  },
  {
    id: "pcm_019",
    scenario: "You're tasked with reducing plastic waste in your school. Your approach?",
    options: [
      { id: "A", text: "Design a recycling machine prototype", traits: ["engineering", "innovative"] },
      { id: "B", text: "Analyze waste patterns with data", traits: ["analytical", "data-driven"] },
      { id: "C", text: "Create alternatives to plastic items", traits: ["creative", "sustainable"] },
      { id: "D", text: "Implement a monitoring system", traits: ["systematic", "organized"] }
    ]
  },
  {
    id: "pcm_020",
    scenario: "A spaceship needs to conserve fuel. What strategy would you suggest?",
    options: [
      { id: "A", text: "Use gravitational slingshot maneuvers", traits: ["physics", "strategic"] },
      { id: "B", text: "Optimize trajectory calculations", traits: ["mathematical", "precise"] },
      { id: "C", text: "Reduce non-essential systems", traits: ["practical", "efficient"] },
      { id: "D", text: "Design more efficient propulsion", traits: ["engineering", "innovative"] }
    ]
  },
  // Technology situations (21-40)
  {
    id: "pcm_021",
    scenario: "A website you built is loading slowly. What do you check first?",
    options: [
      { id: "A", text: "Image sizes and optimization", traits: ["practical", "optimization"] },
      { id: "B", text: "Server response times", traits: ["backend", "technical"] },
      { id: "C", text: "Code efficiency and scripts", traits: ["programming", "analytical"] },
      { id: "D", text: "Network and CDN configuration", traits: ["infrastructure", "systematic"] }
    ]
  },
  {
    id: "pcm_022",
    scenario: "You need to encrypt sensitive data. What's your approach?",
    options: [
      { id: "A", text: "Use established encryption libraries", traits: ["practical", "security"] },
      { id: "B", text: "Understand the mathematical basis first", traits: ["theoretical", "thorough"] },
      { id: "C", text: "Implement multiple layers of security", traits: ["comprehensive", "cautious"] },
      { id: "D", text: "Research the latest encryption standards", traits: ["research", "current"] }
    ]
  },
  {
    id: "pcm_023",
    scenario: "Your data analysis shows unexpected outliers. What do you do?",
    options: [
      { id: "A", text: "Investigate the source of outliers", traits: ["analytical", "curious"] },
      { id: "B", text: "Apply statistical methods to handle them", traits: ["mathematical", "methodical"] },
      { id: "C", text: "Check for data entry errors", traits: ["detail-oriented", "practical"] },
      { id: "D", text: "Consider if they represent real phenomena", traits: ["scientific", "open-minded"] }
    ]
  },
  {
    id: "pcm_024",
    scenario: "You're choosing between two programming languages for a project. How do you decide?",
    options: [
      { id: "A", text: "Performance and efficiency needs", traits: ["technical", "optimization"] },
      { id: "B", text: "Available libraries and ecosystem", traits: ["practical", "resourceful"] },
      { id: "C", text: "Team familiarity and learning curve", traits: ["collaborative", "pragmatic"] },
      { id: "D", text: "Future scalability and maintenance", traits: ["planning", "forward-thinking"] }
    ]
  },
  {
    id: "pcm_025",
    scenario: "A machine learning model gives biased results. How do you address this?",
    options: [
      { id: "A", text: "Examine and diversify training data", traits: ["analytical", "thorough"] },
      { id: "B", text: "Adjust the algorithm parameters", traits: ["technical", "methodical"] },
      { id: "C", text: "Implement fairness metrics", traits: ["ethical", "systematic"] },
      { id: "D", text: "Consult domain experts for guidance", traits: ["collaborative", "humble"] }
    ]
  },
  {
    id: "pcm_026",
    scenario: "Your 3D printer keeps failing mid-print. What's your debugging approach?",
    options: [
      { id: "A", text: "Check mechanical components and calibration", traits: ["mechanical", "hands-on"] },
      { id: "B", text: "Analyze the G-code and slicer settings", traits: ["software", "analytical"] },
      { id: "C", text: "Test with different materials", traits: ["experimental", "methodical"] },
      { id: "D", text: "Monitor temperature and environmental factors", traits: ["systematic", "thorough"] }
    ]
  },
  {
    id: "pcm_027",
    scenario: "You're building a game. What aspect would you enjoy working on most?",
    options: [
      { id: "A", text: "Game physics and mechanics", traits: ["physics", "programming"] },
      { id: "B", text: "Graphics rendering and optimization", traits: ["technical", "visual"] },
      { id: "C", text: "Level design and player experience", traits: ["creative", "user-focused"] },
      { id: "D", text: "Multiplayer networking code", traits: ["networking", "complex"] }
    ]
  },
  {
    id: "pcm_028",
    scenario: "A cybersecurity breach affects your school's systems. What's your role?",
    options: [
      { id: "A", text: "Help identify and patch vulnerabilities", traits: ["security", "technical"] },
      { id: "B", text: "Assist with data recovery efforts", traits: ["practical", "helpful"] },
      { id: "C", text: "Analyze the attack patterns", traits: ["analytical", "investigative"] },
      { id: "D", text: "Create better security protocols", traits: ["preventive", "systematic"] }
    ]
  },
  {
    id: "pcm_029",
    scenario: "You're developing an AI chatbot. What feature would you prioritize?",
    options: [
      { id: "A", text: "Natural language understanding", traits: ["AI", "linguistic"] },
      { id: "B", text: "Response accuracy and relevance", traits: ["quality", "technical"] },
      { id: "C", text: "User-friendly conversation flow", traits: ["user-focused", "design"] },
      { id: "D", text: "Integration with existing systems", traits: ["practical", "systematic"] }
    ]
  },
  {
    id: "pcm_030",
    scenario: "Your database query is taking too long. How do you optimize it?",
    options: [
      { id: "A", text: "Add appropriate indexes", traits: ["technical", "optimization"] },
      { id: "B", text: "Analyze the query execution plan", traits: ["analytical", "systematic"] },
      { id: "C", text: "Restructure the database schema", traits: ["fundamental", "thorough"] },
      { id: "D", text: "Implement caching mechanisms", traits: ["practical", "efficient"] }
    ]
  },
  {
    id: "pcm_031",
    scenario: "You're creating an IoT device. What concerns you most?",
    options: [
      { id: "A", text: "Power consumption and battery life", traits: ["practical", "efficient"] },
      { id: "B", text: "Secure communication protocols", traits: ["security", "technical"] },
      { id: "C", text: "Sensor accuracy and reliability", traits: ["quality", "precise"] },
      { id: "D", text: "User interface and accessibility", traits: ["user-focused", "design"] }
    ]
  },
  {
    id: "pcm_032",
    scenario: "A software bug only appears in production, not in testing. Your approach?",
    options: [
      { id: "A", text: "Compare environments systematically", traits: ["analytical", "methodical"] },
      { id: "B", text: "Add detailed logging to trace the issue", traits: ["technical", "thorough"] },
      { id: "C", text: "Reproduce with production-like data", traits: ["practical", "realistic"] },
      { id: "D", text: "Review recent code changes carefully", traits: ["careful", "investigative"] }
    ]
  },
  {
    id: "pcm_033",
    scenario: "You're designing a smart city infrastructure. What system would you prioritize?",
    options: [
      { id: "A", text: "Intelligent traffic management", traits: ["urban", "optimization"] },
      { id: "B", text: "Energy grid optimization", traits: ["sustainable", "efficient"] },
      { id: "C", text: "Public safety and surveillance", traits: ["security", "safety"] },
      { id: "D", text: "Waste management automation", traits: ["environmental", "practical"] }
    ]
  },
  {
    id: "pcm_034",
    scenario: "Your algorithm has O(n²) complexity. Should you optimize it?",
    options: [
      { id: "A", text: "Only if performance is actually an issue", traits: ["pragmatic", "practical"] },
      { id: "B", text: "Yes, always aim for optimal complexity", traits: ["perfectionist", "theoretical"] },
      { id: "C", text: "Depends on the expected data size", traits: ["analytical", "contextual"] },
      { id: "D", text: "Profile first, optimize where needed", traits: ["data-driven", "efficient"] }
    ]
  },
  {
    id: "pcm_035",
    scenario: "You're building a recommendation system. What approach would you use?",
    options: [
      { id: "A", text: "Collaborative filtering based on user behavior", traits: ["data-driven", "analytical"] },
      { id: "B", text: "Content-based analysis of items", traits: ["systematic", "detailed"] },
      { id: "C", text: "Hybrid combining multiple approaches", traits: ["comprehensive", "strategic"] },
      { id: "D", text: "Deep learning for pattern recognition", traits: ["AI", "advanced"] }
    ]
  },
  {
    id: "pcm_036",
    scenario: "A self-driving car must make a difficult ethical decision. How do you program it?",
    options: [
      { id: "A", text: "Prioritize passenger safety always", traits: ["practical", "clear"] },
      { id: "B", text: "Calculate to minimize total harm", traits: ["utilitarian", "mathematical"] },
      { id: "C", text: "Follow traffic rules strictly", traits: ["rule-based", "systematic"] },
      { id: "D", text: "Allow for human override in edge cases", traits: ["cautious", "human-centered"] }
    ]
  },
  {
    id: "pcm_037",
    scenario: "Your app needs to work offline. What's your strategy?",
    options: [
      { id: "A", text: "Cache essential data locally", traits: ["practical", "user-focused"] },
      { id: "B", text: "Implement service workers and PWA", traits: ["technical", "modern"] },
      { id: "C", text: "Sync when connection is available", traits: ["systematic", "reliable"] },
      { id: "D", text: "Reduce functionality gracefully", traits: ["adaptive", "pragmatic"] }
    ]
  },
  {
    id: "pcm_038",
    scenario: "You're testing a new quantum computing algorithm. What excites you most?",
    options: [
      { id: "A", text: "The mathematical foundations", traits: ["theoretical", "mathematical"] },
      { id: "B", text: "Practical speedup over classical methods", traits: ["practical", "performance"] },
      { id: "C", text: "Potential real-world applications", traits: ["applied", "visionary"] },
      { id: "D", text: "Understanding quantum mechanics better", traits: ["physics", "curious"] }
    ]
  },
  {
    id: "pcm_039",
    scenario: "Your API is receiving too many requests. How do you handle this?",
    options: [
      { id: "A", text: "Implement rate limiting", traits: ["systematic", "protective"] },
      { id: "B", text: "Scale up server resources", traits: ["practical", "direct"] },
      { id: "C", text: "Add caching to reduce load", traits: ["optimization", "efficient"] },
      { id: "D", text: "Optimize the underlying code", traits: ["technical", "thorough"] }
    ]
  },
  {
    id: "pcm_040",
    scenario: "You're debugging a concurrent programming issue. What's your approach?",
    options: [
      { id: "A", text: "Add synchronization carefully", traits: ["methodical", "careful"] },
      { id: "B", text: "Use debugging tools for thread analysis", traits: ["technical", "systematic"] },
      { id: "C", text: "Simplify the concurrent design", traits: ["practical", "elegant"] },
      { id: "D", text: "Write comprehensive unit tests", traits: ["thorough", "preventive"] }
    ]
  },
  // Problem-solving scenarios (41-60)
  {
    id: "pcm_041",
    scenario: "You're stuck on a complex math problem for hours. What do you do?",
    options: [
      { id: "A", text: "Take a break and return with fresh eyes", traits: ["self-aware", "strategic"] },
      { id: "B", text: "Try a completely different approach", traits: ["creative", "flexible"] },
      { id: "C", text: "Break it into smaller sub-problems", traits: ["analytical", "systematic"] },
      { id: "D", text: "Seek hints or similar solved problems", traits: ["resourceful", "learning"] }
    ]
  },
  {
    id: "pcm_042",
    scenario: "Two equally valid solutions exist for a problem. How do you choose?",
    options: [
      { id: "A", text: "Pick the simpler, more elegant one", traits: ["elegant", "practical"] },
      { id: "B", text: "Consider long-term maintainability", traits: ["forward-thinking", "strategic"] },
      { id: "C", text: "Test both and compare performance", traits: ["empirical", "thorough"] },
      { id: "D", text: "Choose based on team's familiarity", traits: ["pragmatic", "collaborative"] }
    ]
  },
  {
    id: "pcm_043",
    scenario: "A proof requires a technique you haven't learned. What do you do?",
    options: [
      { id: "A", text: "Learn the technique from resources", traits: ["self-learning", "determined"] },
      { id: "B", text: "Try to derive it from first principles", traits: ["independent", "deep-thinking"] },
      { id: "C", text: "Ask a teacher or expert for help", traits: ["collaborative", "efficient"] },
      { id: "D", text: "Look for an alternative approach", traits: ["creative", "adaptive"] }
    ]
  },
  {
    id: "pcm_044",
    scenario: "Your solution works but feels inelegant. What do you do?",
    options: [
      { id: "A", text: "Refactor for cleaner code", traits: ["perfectionist", "quality"] },
      { id: "B", text: "Move on if it meets requirements", traits: ["pragmatic", "efficient"] },
      { id: "C", text: "Document it well for future improvement", traits: ["organized", "practical"] },
      { id: "D", text: "Seek feedback on improvements", traits: ["collaborative", "learning"] }
    ]
  },
  {
    id: "pcm_045",
    scenario: "You're competing in a hackathon with limited time. Your strategy?",
    options: [
      { id: "A", text: "Focus on core functionality first", traits: ["prioritizing", "practical"] },
      { id: "B", text: "Plan thoroughly before coding", traits: ["strategic", "organized"] },
      { id: "C", text: "Divide tasks among team efficiently", traits: ["collaborative", "leadership"] },
      { id: "D", text: "Build a working prototype quickly", traits: ["agile", "action-oriented"] }
    ]
  },
  {
    id: "pcm_046",
    scenario: "A physics concept contradicts your intuition. How do you reconcile this?",
    options: [
      { id: "A", text: "Trust the math and evidence", traits: ["scientific", "rational"] },
      { id: "B", text: "Seek visual or physical demonstrations", traits: ["visual", "experiential"] },
      { id: "C", text: "Study historical development of the concept", traits: ["contextual", "thorough"] },
      { id: "D", text: "Work through examples until it clicks", traits: ["persistent", "practice-oriented"] }
    ]
  },
  {
    id: "pcm_047",
    scenario: "You need to estimate something without precise data. Your approach?",
    options: [
      { id: "A", text: "Use Fermi estimation techniques", traits: ["analytical", "resourceful"] },
      { id: "B", text: "Make conservative assumptions", traits: ["cautious", "practical"] },
      { id: "C", text: "Compare with known similar cases", traits: ["comparative", "experienced"] },
      { id: "D", text: "State the uncertainty clearly", traits: ["honest", "scientific"] }
    ]
  },
  {
    id: "pcm_048",
    scenario: "Your simulation and theoretical prediction differ slightly. What do you conclude?",
    options: [
      { id: "A", text: "Check for numerical precision issues", traits: ["technical", "detail-oriented"] },
      { id: "B", text: "Review theoretical assumptions", traits: ["analytical", "thorough"] },
      { id: "C", text: "Consider if the difference is significant", traits: ["statistical", "pragmatic"] },
      { id: "D", text: "Run more simulations for confirmation", traits: ["methodical", "careful"] }
    ]
  },
  {
    id: "pcm_049",
    scenario: "You're explaining a complex concept to someone. What's your method?",
    options: [
      { id: "A", text: "Use analogies and real-world examples", traits: ["communicative", "relatable"] },
      { id: "B", text: "Break it down step by step", traits: ["systematic", "patient"] },
      { id: "C", text: "Draw diagrams and visualizations", traits: ["visual", "clear"] },
      { id: "D", text: "Let them explore and ask questions", traits: ["interactive", "supportive"] }
    ]
  },
  {
    id: "pcm_050",
    scenario: "A project has conflicting requirements. How do you resolve this?",
    options: [
      { id: "A", text: "Prioritize based on importance", traits: ["decisive", "analytical"] },
      { id: "B", text: "Find creative compromise solutions", traits: ["creative", "diplomatic"] },
      { id: "C", text: "Clarify requirements with stakeholders", traits: ["communicative", "thorough"] },
      { id: "D", text: "Document trade-offs for decision makers", traits: ["organized", "transparent"] }
    ]
  },
  {
    id: "pcm_051",
    scenario: "You're learning a new programming language. What's your approach?",
    options: [
      { id: "A", text: "Build a project while learning", traits: ["practical", "hands-on"] },
      { id: "B", text: "Study documentation systematically", traits: ["thorough", "foundational"] },
      { id: "C", text: "Compare with languages you know", traits: ["comparative", "efficient"] },
      { id: "D", text: "Follow tutorials and courses", traits: ["structured", "guided"] }
    ]
  },
  {
    id: "pcm_052",
    scenario: "Your code review reveals a colleague's bug. How do you handle it?",
    options: [
      { id: "A", text: "Point it out constructively with suggestions", traits: ["helpful", "diplomatic"] },
      { id: "B", text: "Fix it yourself if minor", traits: ["efficient", "action-oriented"] },
      { id: "C", text: "Discuss it privately first", traits: ["considerate", "collaborative"] },
      { id: "D", text: "Document it formally in the review", traits: ["systematic", "thorough"] }
    ]
  },
  {
    id: "pcm_053",
    scenario: "A mathematical pattern emerges in your data. What do you do?",
    options: [
      { id: "A", text: "Try to derive the underlying formula", traits: ["mathematical", "analytical"] },
      { id: "B", text: "Research if this pattern is known", traits: ["research", "curious"] },
      { id: "C", text: "Test if it holds for more data", traits: ["scientific", "validating"] },
      { id: "D", text: "Consider physical explanations", traits: ["physics-minded", "holistic"] }
    ]
  },
  {
    id: "pcm_054",
    scenario: "You're designing a fail-safe system. What's your priority?",
    options: [
      { id: "A", text: "Redundancy in critical components", traits: ["safety", "thorough"] },
      { id: "B", text: "Graceful degradation of functionality", traits: ["practical", "resilient"] },
      { id: "C", text: "Clear error detection and reporting", traits: ["systematic", "transparent"] },
      { id: "D", text: "Easy recovery and reset procedures", traits: ["user-focused", "practical"] }
    ]
  },
  {
    id: "pcm_055",
    scenario: "Your experimental setup isn't giving reproducible results. What do you check?",
    options: [
      { id: "A", text: "Control variables more strictly", traits: ["methodical", "rigorous"] },
      { id: "B", text: "Calibrate all instruments again", traits: ["technical", "careful"] },
      { id: "C", text: "Document every procedure detail", traits: ["organized", "thorough"] },
      { id: "D", text: "Consider environmental factors", traits: ["comprehensive", "analytical"] }
    ]
  },
  {
    id: "pcm_056",
    scenario: "You need to present technical content to non-technical people. Your approach?",
    options: [
      { id: "A", text: "Focus on the impact and benefits", traits: ["practical", "audience-focused"] },
      { id: "B", text: "Use simple language and avoid jargon", traits: ["clear", "accessible"] },
      { id: "C", text: "Create visual aids and demonstrations", traits: ["visual", "engaging"] },
      { id: "D", text: "Tell a story around the technology", traits: ["creative", "narrative"] }
    ]
  },
  {
    id: "pcm_057",
    scenario: "A critical deadline is approaching but your solution isn't perfect. What do you do?",
    options: [
      { id: "A", text: "Deliver what works, plan improvements", traits: ["pragmatic", "realistic"] },
      { id: "B", text: "Request more time if possible", traits: ["honest", "quality-focused"] },
      { id: "C", text: "Focus on fixing critical issues only", traits: ["prioritizing", "efficient"] },
      { id: "D", text: "Document known issues clearly", traits: ["transparent", "organized"] }
    ]
  },
  {
    id: "pcm_058",
    scenario: "You're reverse engineering a device. What's your methodology?",
    options: [
      { id: "A", text: "Careful physical examination first", traits: ["methodical", "observant"] },
      { id: "B", text: "Analyze inputs and outputs systematically", traits: ["analytical", "systematic"] },
      { id: "C", text: "Look for documentation and similar devices", traits: ["research", "resourceful"] },
      { id: "D", text: "Test components individually", traits: ["experimental", "thorough"] }
    ]
  },
  {
    id: "pcm_059",
    scenario: "Your project scope is growing beyond original plans. How do you handle scope creep?",
    options: [
      { id: "A", text: "Document and negotiate new requirements", traits: ["organized", "communicative"] },
      { id: "B", text: "Prioritize and defer non-essential features", traits: ["decisive", "practical"] },
      { id: "C", text: "Estimate impact and update timeline", traits: ["analytical", "transparent"] },
      { id: "D", text: "Refactor architecture to accommodate", traits: ["technical", "adaptive"] }
    ]
  },
  {
    id: "pcm_060",
    scenario: "You're mentoring a junior student in coding. What do you focus on?",
    options: [
      { id: "A", text: "Problem-solving approaches and thinking", traits: ["foundational", "teaching"] },
      { id: "B", text: "Debugging skills and persistence", traits: ["practical", "resilient"] },
      { id: "C", text: "Good coding practices and habits", traits: ["quality", "long-term"] },
      { id: "D", text: "Building their confidence through success", traits: ["supportive", "encouraging"] }
    ]
  },
  // Innovation/creativity (61-80)
  {
    id: "pcm_061",
    scenario: "You have an innovative idea but lack resources to prototype. What do you do?",
    options: [
      { id: "A", text: "Create a detailed simulation instead", traits: ["resourceful", "technical"] },
      { id: "B", text: "Seek funding or partnerships", traits: ["entrepreneurial", "networking"] },
      { id: "C", text: "Build a minimal version with what's available", traits: ["practical", "scrappy"] },
      { id: "D", text: "Document the idea thoroughly for later", traits: ["organized", "patient"] }
    ]
  },
  {
    id: "pcm_062",
    scenario: "Two emerging technologies could solve a problem. How do you choose?",
    options: [
      { id: "A", text: "Evaluate based on technical merit", traits: ["analytical", "technical"] },
      { id: "B", text: "Consider adoption and support ecosystem", traits: ["practical", "strategic"] },
      { id: "C", text: "Prototype with both and compare", traits: ["experimental", "thorough"] },
      { id: "D", text: "Choose the more future-proof option", traits: ["forward-thinking", "strategic"] }
    ]
  },
  {
    id: "pcm_063",
    scenario: "Your invention could have both beneficial and harmful uses. What do you consider?",
    options: [
      { id: "A", text: "Design safeguards into the technology", traits: ["responsible", "proactive"] },
      { id: "B", text: "Focus on beneficial applications", traits: ["optimistic", "purpose-driven"] },
      { id: "C", text: "Consult ethics experts before proceeding", traits: ["thoughtful", "collaborative"] },
      { id: "D", text: "Consider whether to proceed at all", traits: ["cautious", "ethical"] }
    ]
  },
  {
    id: "pcm_064",
    scenario: "You see potential to automate a tedious task. What's your approach?",
    options: [
      { id: "A", text: "Build the automation immediately", traits: ["action-oriented", "efficient"] },
      { id: "B", text: "Calculate time saved versus development cost", traits: ["analytical", "practical"] },
      { id: "C", text: "Consider all edge cases first", traits: ["thorough", "cautious"] },
      { id: "D", text: "Start simple and iterate", traits: ["agile", "pragmatic"] }
    ]
  },
  {
    id: "pcm_065",
    scenario: "A competitor releases something similar to your idea. Your reaction?",
    options: [
      { id: "A", text: "Find ways to differentiate your approach", traits: ["creative", "competitive"] },
      { id: "B", text: "Analyze their implementation for insights", traits: ["analytical", "learning"] },
      { id: "C", text: "Accelerate your development timeline", traits: ["driven", "action-oriented"] },
      { id: "D", text: "Consider collaboration instead", traits: ["collaborative", "strategic"] }
    ]
  },
  {
    id: "pcm_066",
    scenario: "You're brainstorming solutions to traffic congestion. What's your idea?",
    options: [
      { id: "A", text: "AI-optimized traffic signal systems", traits: ["AI", "optimization"] },
      { id: "B", text: "Incentive systems for off-peak travel", traits: ["behavioral", "economic"] },
      { id: "C", text: "Underground or elevated transport networks", traits: ["infrastructure", "bold"] },
      { id: "D", text: "Remote work technology improvements", traits: ["preventive", "modern"] }
    ]
  },
  {
    id: "pcm_067",
    scenario: "An old technology is being phased out. What do you think about?",
    options: [
      { id: "A", text: "What made it obsolete and lessons learned", traits: ["analytical", "reflective"] },
      { id: "B", text: "How to migrate existing systems smoothly", traits: ["practical", "helpful"] },
      { id: "C", text: "Preserving knowledge for historical value", traits: ["preservationist", "thoughtful"] },
      { id: "D", text: "Environmental impact of disposal", traits: ["environmental", "responsible"] }
    ]
  },
  {
    id: "pcm_068",
    scenario: "You notice a gap in available tools for your field. What do you do?",
    options: [
      { id: "A", text: "Build the tool yourself", traits: ["entrepreneurial", "capable"] },
      { id: "B", text: "Suggest it to existing tool developers", traits: ["collaborative", "practical"] },
      { id: "C", text: "Work around it with existing tools", traits: ["adaptive", "resourceful"] },
      { id: "D", text: "Research if others have the same need", traits: ["validating", "strategic"] }
    ]
  },
  {
    id: "pcm_069",
    scenario: "You're designing the future of personal transportation. What excites you?",
    options: [
      { id: "A", text: "Flying personal vehicles", traits: ["visionary", "bold"] },
      { id: "B", text: "Hyperloop-style high-speed transit", traits: ["engineering", "efficient"] },
      { id: "C", text: "Autonomous shared vehicle networks", traits: ["AI", "sustainable"] },
      { id: "D", text: "Personal electric vehicles with solar", traits: ["practical", "green"] }
    ]
  },
  {
    id: "pcm_070",
    scenario: "A breakthrough in materials science is announced. What interests you?",
    options: [
      { id: "A", text: "Potential engineering applications", traits: ["applied", "practical"] },
      { id: "B", text: "The underlying physics principles", traits: ["theoretical", "curious"] },
      { id: "C", text: "Manufacturing and scalability challenges", traits: ["realistic", "process-oriented"] },
      { id: "D", text: "How it might change existing products", traits: ["innovative", "forward-thinking"] }
    ]
  },
  {
    id: "pcm_071",
    scenario: "You're designing a product for elderly users. What's your priority?",
    options: [
      { id: "A", text: "Simplicity and ease of use", traits: ["user-focused", "accessible"] },
      { id: "B", text: "Physical accessibility (buttons, text size)", traits: ["practical", "inclusive"] },
      { id: "C", text: "Safety features and fail-safes", traits: ["safety", "caring"] },
      { id: "D", text: "Integration with health monitoring", traits: ["comprehensive", "modern"] }
    ]
  },
  {
    id: "pcm_072",
    scenario: "Space colonization requires sustainable systems. What would you design?",
    options: [
      { id: "A", text: "Closed-loop life support systems", traits: ["sustainable", "engineering"] },
      { id: "B", text: "In-situ resource utilization tech", traits: ["resourceful", "innovative"] },
      { id: "C", text: "Reliable communication systems", traits: ["practical", "connectivity"] },
      { id: "D", text: "Modular expandable habitats", traits: ["scalable", "architectural"] }
    ]
  },
  {
    id: "pcm_073",
    scenario: "You're innovating in renewable energy. What technology do you focus on?",
    options: [
      { id: "A", text: "More efficient solar panels", traits: ["optimization", "solar"] },
      { id: "B", text: "Better energy storage solutions", traits: ["practical", "enabling"] },
      { id: "C", text: "Novel energy sources (fusion, etc.)", traits: ["breakthrough", "ambitious"] },
      { id: "D", text: "Smart grid distribution systems", traits: ["systematic", "infrastructure"] }
    ]
  },
  {
    id: "pcm_074",
    scenario: "Wearable technology is evolving. What would you create?",
    options: [
      { id: "A", text: "Health monitoring and early detection", traits: ["health", "preventive"] },
      { id: "B", text: "Augmented reality glasses", traits: ["AR", "immersive"] },
      { id: "C", text: "Brain-computer interfaces", traits: ["advanced", "neural"] },
      { id: "D", text: "Smart clothing with integrated tech", traits: ["practical", "integrated"] }
    ]
  },
  {
    id: "pcm_075",
    scenario: "You're improving educational technology. What do you build?",
    options: [
      { id: "A", text: "Adaptive learning algorithms", traits: ["AI", "personalized"] },
      { id: "B", text: "Virtual reality labs and experiences", traits: ["immersive", "experiential"] },
      { id: "C", text: "Collaborative online platforms", traits: ["social", "accessible"] },
      { id: "D", text: "Assessment and feedback systems", traits: ["evaluation", "improvement"] }
    ]
  },
  {
    id: "pcm_076",
    scenario: "Nanotechnology enables new possibilities. What application interests you?",
    options: [
      { id: "A", text: "Targeted drug delivery systems", traits: ["medical", "precise"] },
      { id: "B", text: "Self-healing materials", traits: ["materials", "innovative"] },
      { id: "C", text: "Molecular-scale manufacturing", traits: ["manufacturing", "revolutionary"] },
      { id: "D", text: "Environmental cleanup technologies", traits: ["environmental", "beneficial"] }
    ]
  },
  {
    id: "pcm_077",
    scenario: "You're designing the factory of the future. What's key?",
    options: [
      { id: "A", text: "Full automation with robotics", traits: ["automation", "efficient"] },
      { id: "B", text: "Flexible, reconfigurable production lines", traits: ["adaptive", "modern"] },
      { id: "C", text: "Predictive maintenance systems", traits: ["data-driven", "preventive"] },
      { id: "D", text: "Zero waste and sustainability", traits: ["green", "responsible"] }
    ]
  },
  {
    id: "pcm_078",
    scenario: "Artificial General Intelligence becomes possible. What's your concern?",
    options: [
      { id: "A", text: "Alignment with human values", traits: ["ethical", "safety"] },
      { id: "B", text: "Economic disruption and jobs", traits: ["social", "practical"] },
      { id: "C", text: "Beneficial applications to pursue", traits: ["optimistic", "applied"] },
      { id: "D", text: "Control and governance frameworks", traits: ["systematic", "governance"] }
    ]
  },
  {
    id: "pcm_079",
    scenario: "You're innovating in agriculture. What technology do you develop?",
    options: [
      { id: "A", text: "Precision farming with drones and sensors", traits: ["IoT", "data-driven"] },
      { id: "B", text: "Vertical indoor farming systems", traits: ["space-efficient", "controlled"] },
      { id: "C", text: "Genetic improvements for crops", traits: ["biotech", "fundamental"] },
      { id: "D", text: "Water-efficient irrigation systems", traits: ["sustainable", "practical"] }
    ]
  },
  {
    id: "pcm_080",
    scenario: "The metaverse is becoming reality. What would you build in it?",
    options: [
      { id: "A", text: "Engineering and design workspaces", traits: ["professional", "practical"] },
      { id: "B", text: "Educational and training environments", traits: ["educational", "impactful"] },
      { id: "C", text: "Social and entertainment experiences", traits: ["social", "creative"] },
      { id: "D", text: "The underlying infrastructure", traits: ["foundational", "technical"] }
    ]
  },
  // Career choice situations (81-100)
  {
    id: "pcm_081",
    scenario: "You're choosing between pure research and industry application. What appeals more?",
    options: [
      { id: "A", text: "Pure research - advancing knowledge", traits: ["academic", "curious"] },
      { id: "B", text: "Industry - seeing real-world impact", traits: ["applied", "practical"] },
      { id: "C", text: "Research with industry collaboration", traits: ["balanced", "strategic"] },
      { id: "D", text: "Startup - innovating and building", traits: ["entrepreneurial", "ambitious"] }
    ]
  },
  {
    id: "pcm_082",
    scenario: "An internship offers less pay but great learning. Another offers high pay but routine work. Your choice?",
    options: [
      { id: "A", text: "Learning opportunity - invest in future", traits: ["long-term", "growth"] },
      { id: "B", text: "Higher pay - practical needs matter", traits: ["practical", "realistic"] },
      { id: "C", text: "Try to negotiate better terms on learning one", traits: ["assertive", "strategic"] },
      { id: "D", text: "Look for options that offer both", traits: ["ambitious", "thorough"] }
    ]
  },
  {
    id: "pcm_083",
    scenario: "You're passionate about robotics but the job market favors software. What do you do?",
    options: [
      { id: "A", text: "Follow my passion in robotics", traits: ["passionate", "determined"] },
      { id: "B", text: "Adapt and focus on software", traits: ["pragmatic", "adaptive"] },
      { id: "C", text: "Combine both - software for robotics", traits: ["creative", "strategic"] },
      { id: "D", text: "Build skills in both areas", traits: ["versatile", "prepared"] }
    ]
  },
  {
    id: "pcm_084",
    scenario: "A prestigious company with long hours vs. a startup with work-life balance. Your preference?",
    options: [
      { id: "A", text: "Prestigious company for career growth", traits: ["ambitious", "career-focused"] },
      { id: "B", text: "Startup for balance and autonomy", traits: ["balanced", "lifestyle-focused"] },
      { id: "C", text: "Depends on the specific role and team", traits: ["nuanced", "thorough"] },
      { id: "D", text: "Try prestigious first, startup later", traits: ["strategic", "sequential"] }
    ]
  },
  {
    id: "pcm_085",
    scenario: "You can specialize deeply or stay a generalist. What's your strategy?",
    options: [
      { id: "A", text: "Specialize - be the best at something", traits: ["focused", "expert"] },
      { id: "B", text: "Generalist - flexibility and options", traits: ["versatile", "adaptive"] },
      { id: "C", text: "T-shaped - deep in one, broad elsewhere", traits: ["balanced", "strategic"] },
      { id: "D", text: "It depends on the field and market", traits: ["pragmatic", "contextual"] }
    ]
  },
  {
    id: "pcm_086",
    scenario: "A professor offers research assistantship. A company offers internship. Same period. Your choice?",
    options: [
      { id: "A", text: "Research if considering higher studies", traits: ["academic", "strategic"] },
      { id: "B", text: "Industry for practical experience", traits: ["practical", "career-focused"] },
      { id: "C", text: "Based on which mentor/team is better", traits: ["relationship-focused", "wise"] },
      { id: "D", text: "Try to defer one for later", traits: ["ambitious", "wanting-both"] }
    ]
  },
  {
    id: "pcm_087",
    scenario: "You're considering a career in space technology. What role appeals?",
    options: [
      { id: "A", text: "Spacecraft systems engineer", traits: ["systems", "engineering"] },
      { id: "B", text: "Mission planning and operations", traits: ["strategic", "operational"] },
      { id: "C", text: "Research scientist (propulsion, etc.)", traits: ["research", "scientific"] },
      { id: "D", text: "Space entrepreneur", traits: ["entrepreneurial", "visionary"] }
    ]
  },
  {
    id: "pcm_088",
    scenario: "Technical career vs. moving into management later. Your preference?",
    options: [
      { id: "A", text: "Stay technical - I love the work", traits: ["technical", "passionate"] },
      { id: "B", text: "Management for broader impact", traits: ["leadership", "strategic"] },
      { id: "C", text: "Technical leadership (CTO path)", traits: ["hybrid", "ambitious"] },
      { id: "D", text: "Keep options open based on opportunities", traits: ["flexible", "opportunistic"] }
    ]
  },
  {
    id: "pcm_089",
    scenario: "Working for a large corporation vs. a nimble startup. What attracts you?",
    options: [
      { id: "A", text: "Corporation - stability and resources", traits: ["stable", "resource-focused"] },
      { id: "B", text: "Startup - impact and growth", traits: ["dynamic", "growth-focused"] },
      { id: "C", text: "Corporation first, startup later", traits: ["sequential", "risk-managed"] },
      { id: "D", text: "Depends on the specific opportunity", traits: ["evaluative", "opportunistic"] }
    ]
  },
  {
    id: "pcm_090",
    scenario: "A job abroad offers great opportunities but requires relocation. Your thinking?",
    options: [
      { id: "A", text: "Go for it - experience and growth", traits: ["adventurous", "ambitious"] },
      { id: "B", text: "Prefer to stay close to family/home", traits: ["rooted", "family-oriented"] },
      { id: "C", text: "Depends on the country and role", traits: ["analytical", "evaluative"] },
      { id: "D", text: "Try for some time, then decide", traits: ["experimental", "open"] }
    ]
  },
  {
    id: "pcm_091",
    scenario: "Higher studies (Masters/PhD) or start working? What's your inclination?",
    options: [
      { id: "A", text: "Higher studies for deeper knowledge", traits: ["academic", "knowledge-seeking"] },
      { id: "B", text: "Work to gain practical experience first", traits: ["practical", "experience-focused"] },
      { id: "C", text: "Work then return for higher studies", traits: ["sequential", "strategic"] },
      { id: "D", text: "Depends on specific career goals", traits: ["goal-oriented", "strategic"] }
    ]
  },
  {
    id: "pcm_092",
    scenario: "You're offered a role in a cutting-edge but risky technology. Your response?",
    options: [
      { id: "A", text: "Accept - innovation requires risk", traits: ["risk-taking", "innovative"] },
      { id: "B", text: "Prefer something more established", traits: ["cautious", "stable"] },
      { id: "C", text: "Research the risk-reward thoroughly", traits: ["analytical", "thorough"] },
      { id: "D", text: "Join if the team is strong", traits: ["team-focused", "pragmatic"] }
    ]
  },
  {
    id: "pcm_093",
    scenario: "Teaching and mentoring vs. hands-on technical work. What energizes you more?",
    options: [
      { id: "A", text: "Teaching - shaping the next generation", traits: ["mentoring", "impactful"] },
      { id: "B", text: "Technical work - building things", traits: ["hands-on", "creating"] },
      { id: "C", text: "Both - technical role with mentoring", traits: ["balanced", "comprehensive"] },
      { id: "D", text: "Depends on the stage of career", traits: ["evolving", "adaptive"] }
    ]
  },
  {
    id: "pcm_094",
    scenario: "A career in defense technology vs. civilian applications. Your preference?",
    options: [
      { id: "A", text: "Defense - serving the nation", traits: ["patriotic", "service-oriented"] },
      { id: "B", text: "Civilian - broader impact and ethics", traits: ["ethical", "broad-impact"] },
      { id: "C", text: "Dual-use technologies", traits: ["balanced", "versatile"] },
      { id: "D", text: "Based on specific projects and impact", traits: ["evaluative", "impact-focused"] }
    ]
  },
  {
    id: "pcm_095",
    scenario: "You want to create something that outlasts you. What would it be?",
    options: [
      { id: "A", text: "A fundamental scientific discovery", traits: ["scientific", "legacy"] },
      { id: "B", text: "A technology that helps millions", traits: ["impactful", "humanitarian"] },
      { id: "C", text: "An institution or company that continues", traits: ["institutional", "lasting"] },
      { id: "D", text: "Mentoring people who create great things", traits: ["mentoring", "multiplicative"] }
    ]
  },
  {
    id: "pcm_096",
    scenario: "Work in India contributing to national development vs. abroad with better facilities. Your choice?",
    options: [
      { id: "A", text: "India - contribute to national growth", traits: ["patriotic", "contributing"] },
      { id: "B", text: "Abroad - better research opportunities", traits: ["opportunity-seeking", "growth"] },
      { id: "C", text: "Go abroad, return with expertise", traits: ["strategic", "long-term"] },
      { id: "D", text: "Collaborate internationally while in India", traits: ["connected", "balanced"] }
    ]
  },
  {
    id: "pcm_097",
    scenario: "You can solve one global problem with technology. What would it be?",
    options: [
      { id: "A", text: "Clean and abundant energy", traits: ["environmental", "fundamental"] },
      { id: "B", text: "Access to quality education", traits: ["educational", "empowering"] },
      { id: "C", text: "Healthcare for all", traits: ["healthcare", "humanitarian"] },
      { id: "D", text: "Climate change mitigation", traits: ["climate", "urgent"] }
    ]
  },
  {
    id: "pcm_098",
    scenario: "Your career has been successful but unfulfilling. What do you do?",
    options: [
      { id: "A", text: "Pivot to something more meaningful", traits: ["courageous", "purpose-seeking"] },
      { id: "B", text: "Find meaning outside work", traits: ["balanced", "realistic"] },
      { id: "C", text: "Gradually transition while staying stable", traits: ["cautious", "planned"] },
      { id: "D", text: "Mentor others and find purpose that way", traits: ["giving", "mentoring"] }
    ]
  },
  {
    id: "pcm_099",
    scenario: "Technology is changing rapidly. How do you stay relevant?",
    options: [
      { id: "A", text: "Continuous learning and upskilling", traits: ["adaptive", "learning"] },
      { id: "B", text: "Focus on fundamentals that don't change", traits: ["foundational", "stable"] },
      { id: "C", text: "Specialize in emerging technologies", traits: ["forward-looking", "specialized"] },
      { id: "D", text: "Move to roles less affected by change", traits: ["strategic", "pragmatic"] }
    ]
  },
  {
    id: "pcm_100",
    scenario: "Reflecting on PCM, what has it prepared you for most?",
    options: [
      { id: "A", text: "Analytical thinking and problem-solving", traits: ["analytical", "problem-solving"] },
      { id: "B", text: "Technical and engineering skills", traits: ["technical", "building"] },
      { id: "C", text: "Scientific approach to the world", traits: ["scientific", "rational"] },
      { id: "D", text: "Foundation for multiple career paths", traits: ["versatile", "foundational"] }
    ]
  }
];
