import { Question } from './types';

export const PCB_QUESTIONS: Question[] = [
  // Medical scenarios (1-20)
  {
    id: "pcb_001",
    scenario: "A patient in a rural clinic shows symptoms of multiple conditions. Resources are limited. What's your approach?",
    options: [
      { id: "A", text: "Prioritize based on severity and urgency", traits: ["clinical", "decisive"] },
      { id: "B", text: "Take detailed history to narrow down", traits: ["thorough", "analytical"] },
      { id: "C", text: "Start with most likely condition given local diseases", traits: ["contextual", "practical"] },
      { id: "D", text: "Refer to higher center for diagnosis", traits: ["cautious", "systematic"] }
    ]
  },
  {
    id: "pcb_002",
    scenario: "You observe a surgical procedure and notice a potential complication developing. What do you do?",
    options: [
      { id: "A", text: "Alert the surgeon immediately", traits: ["brave", "direct"] },
      { id: "B", text: "Wait to see if the surgeon notices", traits: ["observant", "patient"] },
      { id: "C", text: "Mention it subtly as a question", traits: ["diplomatic", "helpful"] },
      { id: "D", text: "Document and discuss after surgery", traits: ["methodical", "learning"] }
    ]
  },
  {
    id: "pcb_003",
    scenario: "A patient refuses treatment due to cultural beliefs. How do you handle this?",
    options: [
      { id: "A", text: "Respect their autonomy completely", traits: ["ethical", "respectful"] },
      { id: "B", text: "Try to understand and address concerns", traits: ["empathetic", "communicative"] },
      { id: "C", text: "Involve family or community leaders", traits: ["collaborative", "cultural-aware"] },
      { id: "D", text: "Explain medical consequences clearly", traits: ["honest", "educational"] }
    ]
  },
  {
    id: "pcb_004",
    scenario: "During dissection class, you discover something unusual in the specimen. What interests you?",
    options: [
      { id: "A", text: "Understanding what caused this variation", traits: ["curious", "analytical"] },
      { id: "B", text: "How it might affect function", traits: ["clinical", "practical"] },
      { id: "C", text: "Documenting it for academic interest", traits: ["academic", "thorough"] },
      { id: "D", text: "Comparing with normal anatomy", traits: ["comparative", "foundational"] }
    ]
  },
  {
    id: "pcb_005",
    scenario: "A pharmaceutical company claims a new drug is highly effective. How do you evaluate this?",
    options: [
      { id: "A", text: "Review the clinical trial methodology", traits: ["scientific", "critical"] },
      { id: "B", text: "Check for peer-reviewed publications", traits: ["thorough", "evidence-based"] },
      { id: "C", text: "Look at side effects and safety data", traits: ["cautious", "safety-conscious"] },
      { id: "D", text: "Compare with existing treatments", traits: ["comparative", "practical"] }
    ]
  },
  {
    id: "pcb_006",
    scenario: "You're interested in the human body. What fascinates you most?",
    options: [
      { id: "A", text: "How different systems work together", traits: ["systems-thinking", "integrated"] },
      { id: "B", text: "Cellular and molecular mechanisms", traits: ["detailed", "molecular"] },
      { id: "C", text: "How the body fights disease", traits: ["immunology", "defensive"] },
      { id: "D", text: "The brain and nervous system", traits: ["neuroscience", "complex"] }
    ]
  },
  {
    id: "pcb_007",
    scenario: "A classmate faints during a biology experiment. What's your first response?",
    options: [
      { id: "A", text: "Check vital signs and consciousness", traits: ["clinical", "action-oriented"] },
      { id: "B", text: "Clear the area and call for help", traits: ["organized", "responsible"] },
      { id: "C", text: "Position them safely and monitor", traits: ["trained", "calm"] },
      { id: "D", text: "Comfort them when they recover", traits: ["caring", "supportive"] }
    ]
  },
  {
    id: "pcb_008",
    scenario: "You're researching a disease with no known cure. What motivates you?",
    options: [
      { id: "A", text: "The challenge of solving the unknown", traits: ["curious", "persistent"] },
      { id: "B", text: "Helping future patients who suffer", traits: ["compassionate", "purposeful"] },
      { id: "C", text: "Advancing scientific knowledge", traits: ["academic", "contributory"] },
      { id: "D", text: "Being part of a breakthrough team", traits: ["collaborative", "ambitious"] }
    ]
  },
  {
    id: "pcb_009",
    scenario: "A patient's family demands a treatment you know won't help. What do you do?",
    options: [
      { id: "A", text: "Explain honestly why it won't work", traits: ["honest", "educational"] },
      { id: "B", text: "Explore their concerns and fears", traits: ["empathetic", "understanding"] },
      { id: "C", text: "Suggest alternatives that might help", traits: ["practical", "solution-focused"] },
      { id: "D", text: "Involve a counselor or support team", traits: ["comprehensive", "supportive"] }
    ]
  },
  {
    id: "pcb_010",
    scenario: "You notice a pattern in patient cases that textbooks don't cover. What do you do?",
    options: [
      { id: "A", text: "Document it systematically for study", traits: ["research", "observant"] },
      { id: "B", text: "Discuss with senior doctors", traits: ["collaborative", "learning"] },
      { id: "C", text: "Search medical literature for similar cases", traits: ["thorough", "evidence-seeking"] },
      { id: "D", text: "Consider publishing a case series", traits: ["academic", "contributory"] }
    ]
  },
  {
    id: "pcb_011",
    scenario: "A genetic test reveals a hereditary disease in a patient. What concerns you most?",
    options: [
      { id: "A", text: "How to communicate this sensitively", traits: ["empathetic", "communicative"] },
      { id: "B", text: "Implications for family members", traits: ["comprehensive", "family-focused"] },
      { id: "C", text: "Available treatments or management", traits: ["practical", "solution-focused"] },
      { id: "D", text: "Privacy and ethical considerations", traits: ["ethical", "thoughtful"] }
    ]
  },
  {
    id: "pcb_012",
    scenario: "You're choosing a medical specialization. What draws you most?",
    options: [
      { id: "A", text: "Surgical precision and immediate impact", traits: ["surgical", "action-oriented"] },
      { id: "B", text: "Long-term patient relationships (medicine)", traits: ["relational", "continuous"] },
      { id: "C", text: "Diagnostic puzzles (radiology, pathology)", traits: ["analytical", "detective-like"] },
      { id: "D", text: "Preventive care and public health", traits: ["preventive", "population-focused"] }
    ]
  },
  {
    id: "pcb_013",
    scenario: "Traditional medicine and modern medicine conflict in treatment. Your approach?",
    options: [
      { id: "A", text: "Prefer evidence-based modern medicine", traits: ["scientific", "evidence-based"] },
      { id: "B", text: "Respect both if they don't conflict", traits: ["integrative", "open-minded"] },
      { id: "C", text: "Educate patient about proven options", traits: ["educational", "honest"] },
      { id: "D", text: "Research the traditional treatment's efficacy", traits: ["curious", "thorough"] }
    ]
  },
  {
    id: "pcb_014",
    scenario: "A breakthrough treatment is expensive and not available to most. What do you think?",
    options: [
      { id: "A", text: "Focus on making it affordable", traits: ["equitable", "access-focused"] },
      { id: "B", text: "Research cheaper alternatives", traits: ["practical", "innovative"] },
      { id: "C", text: "Advocate for policy changes", traits: ["activist", "systemic"] },
      { id: "D", text: "Prioritize based on medical need", traits: ["clinical", "fair"] }
    ]
  },
  {
    id: "pcb_015",
    scenario: "You make an error in patient care. What's your immediate response?",
    options: [
      { id: "A", text: "Address patient safety first", traits: ["responsible", "action-oriented"] },
      { id: "B", text: "Disclose honestly to patient/family", traits: ["honest", "ethical"] },
      { id: "C", text: "Report to supervisor", traits: ["accountable", "systematic"] },
      { id: "D", text: "Analyze what went wrong to prevent recurrence", traits: ["learning", "preventive"] }
    ]
  },
  {
    id: "pcb_016",
    scenario: "A terminally ill patient asks about their prognosis. How do you respond?",
    options: [
      { id: "A", text: "Be honest but compassionate", traits: ["honest", "caring"] },
      { id: "B", text: "Ask what they want to know first", traits: ["patient-centered", "respectful"] },
      { id: "C", text: "Focus on quality of remaining time", traits: ["positive", "practical"] },
      { id: "D", text: "Involve palliative care team", traits: ["comprehensive", "supportive"] }
    ]
  },
  {
    id: "pcb_017",
    scenario: "Animal testing is required for your research. How do you feel about it?",
    options: [
      { id: "A", text: "Necessary for medical progress", traits: ["pragmatic", "utilitarian"] },
      { id: "B", text: "Use only when absolutely necessary", traits: ["ethical", "minimal-harm"] },
      { id: "C", text: "Actively seek alternative methods", traits: ["innovative", "animal-welfare"] },
      { id: "D", text: "Follow strict ethical guidelines", traits: ["compliant", "careful"] }
    ]
  },
  {
    id: "pcb_018",
    scenario: "A patient's condition is rare and you're unsure. What do you do?",
    options: [
      { id: "A", text: "Research thoroughly before proceeding", traits: ["thorough", "careful"] },
      { id: "B", text: "Consult specialists immediately", traits: ["collaborative", "prudent"] },
      { id: "C", text: "Be honest about uncertainty with patient", traits: ["honest", "transparent"] },
      { id: "D", text: "Start with safe, reversible treatments", traits: ["cautious", "practical"] }
    ]
  },
  {
    id: "pcb_019",
    scenario: "You're working in a high-stress emergency situation. How do you cope?",
    options: [
      { id: "A", text: "Focus completely on the task", traits: ["focused", "compartmentalized"] },
      { id: "B", text: "Rely on training and protocols", traits: ["systematic", "prepared"] },
      { id: "C", text: "Stay calm and communicate clearly", traits: ["composed", "communicative"] },
      { id: "D", text: "Process emotions after the situation", traits: ["self-aware", "healthy"] }
    ]
  },
  {
    id: "pcb_020",
    scenario: "Telemedicine is growing. What do you see as its biggest benefit?",
    options: [
      { id: "A", text: "Access for remote populations", traits: ["access-focused", "equitable"] },
      { id: "B", text: "Convenience for patients", traits: ["patient-centered", "practical"] },
      { id: "C", text: "Efficient use of doctor's time", traits: ["efficient", "systematic"] },
      { id: "D", text: "Better follow-up and monitoring", traits: ["continuous", "comprehensive"] }
    ]
  },
  // Healthcare situations (21-40)
  {
    id: "pcb_021",
    scenario: "A new vaccine has some hesitancy in the community. How do you address this?",
    options: [
      { id: "A", text: "Explain the science clearly", traits: ["educational", "scientific"] },
      { id: "B", text: "Address specific concerns and fears", traits: ["empathetic", "responsive"] },
      { id: "C", text: "Share personal example if appropriate", traits: ["authentic", "influential"] },
      { id: "D", text: "Involve trusted community leaders", traits: ["strategic", "collaborative"] }
    ]
  },
  {
    id: "pcb_022",
    scenario: "You're designing a health awareness campaign. What's your focus?",
    options: [
      { id: "A", text: "Clear, simple health messages", traits: ["communicative", "accessible"] },
      { id: "B", text: "Local language and cultural relevance", traits: ["cultural-aware", "inclusive"] },
      { id: "C", text: "Interactive and engaging content", traits: ["creative", "engaging"] },
      { id: "D", text: "Measurable behavior change goals", traits: ["outcome-focused", "strategic"] }
    ]
  },
  {
    id: "pcb_023",
    scenario: "A hospital has to ration limited resources. What principle should guide this?",
    options: [
      { id: "A", text: "Medical need and urgency", traits: ["clinical", "needs-based"] },
      { id: "B", text: "Maximize lives saved", traits: ["utilitarian", "outcome-focused"] },
      { id: "C", text: "Fair process and transparency", traits: ["ethical", "process-focused"] },
      { id: "D", text: "Consider social factors too", traits: ["holistic", "equitable"] }
    ]
  },
  {
    id: "pcb_024",
    scenario: "Mental health is often neglected. What would you prioritize?",
    options: [
      { id: "A", text: "Integrating into primary healthcare", traits: ["systemic", "accessible"] },
      { id: "B", text: "Reducing stigma through awareness", traits: ["awareness", "social"] },
      { id: "C", text: "Training more mental health professionals", traits: ["capacity-building", "professional"] },
      { id: "D", text: "Community-based support systems", traits: ["community", "sustainable"] }
    ]
  },
  {
    id: "pcb_025",
    scenario: "You notice healthcare quality varies between rich and poor patients. Your response?",
    options: [
      { id: "A", text: "Advocate for equal treatment standards", traits: ["advocate", "fair"] },
      { id: "B", text: "Focus on personal practice of equality", traits: ["personal", "ethical"] },
      { id: "C", text: "Support policy changes for equity", traits: ["systemic", "activist"] },
      { id: "D", text: "Work in underserved communities", traits: ["service", "committed"] }
    ]
  },
  {
    id: "pcb_026",
    scenario: "Antibiotic resistance is increasing. What's your role in addressing it?",
    options: [
      { id: "A", text: "Prescribe antibiotics only when necessary", traits: ["responsible", "clinical"] },
      { id: "B", text: "Educate patients about proper use", traits: ["educational", "preventive"] },
      { id: "C", text: "Support research into alternatives", traits: ["research", "innovative"] },
      { id: "D", text: "Follow and promote stewardship guidelines", traits: ["systematic", "compliant"] }
    ]
  },
  {
    id: "pcb_027",
    scenario: "An elderly patient has multiple health issues. What's your approach?",
    options: [
      { id: "A", text: "Coordinate care across specialists", traits: ["comprehensive", "coordinating"] },
      { id: "B", text: "Prioritize quality of life", traits: ["holistic", "patient-centered"] },
      { id: "C", text: "Simplify medications where possible", traits: ["practical", "safety-focused"] },
      { id: "D", text: "Involve family in care decisions", traits: ["family-centered", "collaborative"] }
    ]
  },
  {
    id: "pcb_028",
    scenario: "You disagree with a senior doctor's treatment plan. What do you do?",
    options: [
      { id: "A", text: "Voice concerns respectfully", traits: ["assertive", "professional"] },
      { id: "B", text: "Ask questions to understand their reasoning", traits: ["learning", "diplomatic"] },
      { id: "C", text: "Research and present evidence", traits: ["evidence-based", "thorough"] },
      { id: "D", text: "Follow their lead but document concerns", traits: ["compliant", "careful"] }
    ]
  },
  {
    id: "pcb_029",
    scenario: "A patient wants to try an unproven treatment. How do you respond?",
    options: [
      { id: "A", text: "Explain lack of evidence honestly", traits: ["honest", "educational"] },
      { id: "B", text: "Explore why they're drawn to it", traits: ["empathetic", "understanding"] },
      { id: "C", text: "Suggest clinical trials if available", traits: ["practical", "constructive"] },
      { id: "D", text: "Discuss risks of delaying proven treatment", traits: ["cautious", "responsible"] }
    ]
  },
  {
    id: "pcb_030",
    scenario: "Healthcare data privacy vs. research benefits. Where do you stand?",
    options: [
      { id: "A", text: "Privacy should be paramount", traits: ["privacy-focused", "ethical"] },
      { id: "B", text: "Anonymized data can benefit research", traits: ["balanced", "practical"] },
      { id: "C", text: "Patients should have control and choice", traits: ["autonomy-focused", "fair"] },
      { id: "D", text: "Strong safeguards enable both", traits: ["optimistic", "systematic"] }
    ]
  },
  {
    id: "pcb_031",
    scenario: "You're placed in a healthcare setting you didn't prefer. Your attitude?",
    options: [
      { id: "A", text: "Learn as much as possible", traits: ["growth-minded", "positive"] },
      { id: "B", text: "Find aspects that interest you", traits: ["adaptive", "open"] },
      { id: "C", text: "Do your best and seek transfer later", traits: ["professional", "patient"] },
      { id: "D", text: "See how it might complement your goals", traits: ["strategic", "integrative"] }
    ]
  },
  {
    id: "pcb_032",
    scenario: "A colleague seems burnt out. What do you do?",
    options: [
      { id: "A", text: "Offer support and listen", traits: ["supportive", "caring"] },
      { id: "B", text: "Help with their workload if possible", traits: ["helpful", "practical"] },
      { id: "C", text: "Encourage them to seek help", traits: ["advising", "concerned"] },
      { id: "D", text: "Reflect on systemic causes", traits: ["analytical", "systemic"] }
    ]
  },
  {
    id: "pcb_033",
    scenario: "You're asked to work extra hours frequently. How do you handle this?",
    options: [
      { id: "A", text: "Accept as part of the profession", traits: ["dedicated", "accepting"] },
      { id: "B", text: "Set boundaries when possible", traits: ["self-caring", "balanced"] },
      { id: "C", text: "Discuss workload with supervisors", traits: ["communicative", "assertive"] },
      { id: "D", text: "Find efficient ways to manage", traits: ["practical", "efficient"] }
    ]
  },
  {
    id: "pcb_034",
    scenario: "Traditional healers are active in your area. How do you work with them?",
    options: [
      { id: "A", text: "Ignore if they don't cause harm", traits: ["tolerant", "practical"] },
      { id: "B", text: "Educate them about danger signs", traits: ["collaborative", "educational"] },
      { id: "C", text: "Build referral relationships", traits: ["strategic", "integrative"] },
      { id: "D", text: "Study what they do that works", traits: ["curious", "open-minded"] }
    ]
  },
  {
    id: "pcb_035",
    scenario: "A patient can't afford their medication. What do you do?",
    options: [
      { id: "A", text: "Suggest generic alternatives", traits: ["practical", "helpful"] },
      { id: "B", text: "Connect with assistance programs", traits: ["resourceful", "supportive"] },
      { id: "C", text: "Adjust treatment to affordable options", traits: ["adaptive", "patient-centered"] },
      { id: "D", text: "Advocate for better drug pricing policies", traits: ["activist", "systemic"] }
    ]
  },
  {
    id: "pcb_036",
    scenario: "Pandemic preparedness is important. What's your priority?",
    options: [
      { id: "A", text: "Strong public health surveillance", traits: ["preventive", "systematic"] },
      { id: "B", text: "Healthcare capacity and training", traits: ["practical", "capacity-focused"] },
      { id: "C", text: "Community awareness and cooperation", traits: ["community", "collaborative"] },
      { id: "D", text: "Research and rapid response capability", traits: ["research", "agile"] }
    ]
  },
  {
    id: "pcb_037",
    scenario: "You're treating a patient who doesn't follow your advice. Your response?",
    options: [
      { id: "A", text: "Explore barriers to compliance", traits: ["understanding", "practical"] },
      { id: "B", text: "Explain consequences again clearly", traits: ["educational", "honest"] },
      { id: "C", text: "Respect their autonomy ultimately", traits: ["ethical", "accepting"] },
      { id: "D", text: "Find alternatives they might follow", traits: ["creative", "patient-centered"] }
    ]
  },
  {
    id: "pcb_038",
    scenario: "Technology is changing healthcare rapidly. What excites you?",
    options: [
      { id: "A", text: "AI in diagnosis and treatment", traits: ["innovative", "tech-forward"] },
      { id: "B", text: "Better patient monitoring and data", traits: ["data-driven", "comprehensive"] },
      { id: "C", text: "Improved access through telemedicine", traits: ["access-focused", "equitable"] },
      { id: "D", text: "Precision medicine based on genetics", traits: ["personalized", "advanced"] }
    ]
  },
  {
    id: "pcb_039",
    scenario: "A patient's condition is deteriorating despite treatment. What do you feel?",
    options: [
      { id: "A", text: "Determined to try other options", traits: ["persistent", "hopeful"] },
      { id: "B", text: "Sad but accepting of limits", traits: ["realistic", "mature"] },
      { id: "C", text: "Focused on comfort and support", traits: ["compassionate", "practical"] },
      { id: "D", text: "Reflective about what more could be done", traits: ["analytical", "learning"] }
    ]
  },
  {
    id: "pcb_040",
    scenario: "Your work-life balance is suffering. How do you address this?",
    options: [
      { id: "A", text: "Prioritize self-care actively", traits: ["self-aware", "healthy"] },
      { id: "B", text: "Seek support from colleagues/family", traits: ["connected", "supported"] },
      { id: "C", text: "Consider different practice settings", traits: ["adaptive", "strategic"] },
      { id: "D", text: "Accept it as temporary for training", traits: ["patient", "goal-focused"] }
    ]
  },
  // Biology/research (41-60)
  {
    id: "pcb_041",
    scenario: "You're designing a biology experiment. What's most important to you?",
    options: [
      { id: "A", text: "Clear hypothesis and controls", traits: ["rigorous", "scientific"] },
      { id: "B", text: "Reproducibility of results", traits: ["reliable", "methodical"] },
      { id: "C", text: "Ethical treatment of subjects", traits: ["ethical", "responsible"] },
      { id: "D", text: "Novel approach or question", traits: ["innovative", "curious"] }
    ]
  },
  {
    id: "pcb_042",
    scenario: "Your research results don't match your hypothesis. What do you do?",
    options: [
      { id: "A", text: "Report results honestly", traits: ["honest", "scientific"] },
      { id: "B", text: "Investigate possible errors", traits: ["thorough", "careful"] },
      { id: "C", text: "Consider if results suggest new hypothesis", traits: ["open-minded", "analytical"] },
      { id: "D", text: "Repeat the experiment", traits: ["methodical", "validating"] }
    ]
  },
  {
    id: "pcb_043",
    scenario: "CRISPR gene editing can cure diseases but has ethical concerns. Your view?",
    options: [
      { id: "A", text: "Support for therapeutic use only", traits: ["cautious", "balanced"] },
      { id: "B", text: "Embrace the potential fully", traits: ["progressive", "optimistic"] },
      { id: "C", text: "Need more research on safety", traits: ["prudent", "scientific"] },
      { id: "D", text: "Concerned about playing God", traits: ["thoughtful", "ethical"] }
    ]
  },
  {
    id: "pcb_044",
    scenario: "You discover a potential new antibiotic compound. What's your first step?",
    options: [
      { id: "A", text: "Test its effectiveness in lab", traits: ["experimental", "methodical"] },
      { id: "B", text: "Check for similar compounds in literature", traits: ["research", "thorough"] },
      { id: "C", text: "Assess safety and toxicity", traits: ["safety-conscious", "responsible"] },
      { id: "D", text: "Consult with senior researchers", traits: ["collaborative", "learning"] }
    ]
  },
  {
    id: "pcb_045",
    scenario: "Stem cell research offers promise but faces opposition. Your stance?",
    options: [
      { id: "A", text: "Support with ethical guidelines", traits: ["progressive", "balanced"] },
      { id: "B", text: "Prefer adult stem cells to avoid controversy", traits: ["pragmatic", "consensus-seeking"] },
      { id: "C", text: "Science should be unrestricted", traits: ["libertarian", "pro-science"] },
      { id: "D", text: "Understand concerns but support potential", traits: ["empathetic", "hopeful"] }
    ]
  },
  {
    id: "pcb_046",
    scenario: "You're studying how cancer cells evade the immune system. What aspect intrigues you?",
    options: [
      { id: "A", text: "Molecular mechanisms of evasion", traits: ["detailed", "molecular"] },
      { id: "B", text: "How to restore immune recognition", traits: ["therapeutic", "solution-focused"] },
      { id: "C", text: "Why some cancers are more evasive", traits: ["comparative", "analytical"] },
      { id: "D", text: "Clinical applications of findings", traits: ["applied", "patient-focused"] }
    ]
  },
  {
    id: "pcb_047",
    scenario: "Environmental changes are affecting disease patterns. What concerns you?",
    options: [
      { id: "A", text: "New diseases emerging", traits: ["alert", "preventive"] },
      { id: "B", text: "Known diseases spreading to new areas", traits: ["epidemiological", "analytical"] },
      { id: "C", text: "Healthcare systems' preparedness", traits: ["systemic", "practical"] },
      { id: "D", text: "Impact on vulnerable populations", traits: ["equity-focused", "compassionate"] }
    ]
  },
  {
    id: "pcb_048",
    scenario: "Your lab has limited funding. How do you prioritize projects?",
    options: [
      { id: "A", text: "Most scientifically promising", traits: ["scientific", "merit-based"] },
      { id: "B", text: "Best chance of external funding", traits: ["strategic", "practical"] },
      { id: "C", text: "Greatest potential patient impact", traits: ["patient-focused", "applied"] },
      { id: "D", text: "What can be done with available resources", traits: ["pragmatic", "efficient"] }
    ]
  },
  {
    id: "pcb_049",
    scenario: "You're studying microbiome and health. What interests you most?",
    options: [
      { id: "A", text: "How gut bacteria affect the brain", traits: ["novel", "integrative"] },
      { id: "B", text: "Role in immune system development", traits: ["immunological", "foundational"] },
      { id: "C", text: "Manipulating microbiome for health", traits: ["therapeutic", "applied"] },
      { id: "D", text: "How diet shapes microbiome", traits: ["nutritional", "preventive"] }
    ]
  },
  {
    id: "pcb_050",
    scenario: "Publish quickly or wait for more data? What's your preference?",
    options: [
      { id: "A", text: "Wait for comprehensive results", traits: ["thorough", "quality-focused"] },
      { id: "B", text: "Publish incremental findings", traits: ["pragmatic", "progressive"] },
      { id: "C", text: "Depends on competition and importance", traits: ["strategic", "contextual"] },
      { id: "D", text: "Share preliminary results as preprint", traits: ["open", "collaborative"] }
    ]
  },
  {
    id: "pcb_051",
    scenario: "You're researching a neglected tropical disease. What motivates you?",
    options: [
      { id: "A", text: "Helping underserved populations", traits: ["humanitarian", "equitable"] },
      { id: "B", text: "Scientific challenge of the unknown", traits: ["curious", "academic"] },
      { id: "C", text: "Potential for unique contributions", traits: ["ambitious", "impactful"] },
      { id: "D", text: "Opportunity to work in field settings", traits: ["adventurous", "practical"] }
    ]
  },
  {
    id: "pcb_052",
    scenario: "Your research involves human subjects. What's your priority?",
    options: [
      { id: "A", text: "Informed consent process", traits: ["ethical", "respectful"] },
      { id: "B", text: "Minimizing risks to participants", traits: ["protective", "responsible"] },
      { id: "C", text: "Scientific validity of the study", traits: ["rigorous", "scientific"] },
      { id: "D", text: "Fair selection of subjects", traits: ["equitable", "fair"] }
    ]
  },
  {
    id: "pcb_053",
    scenario: "Big data is transforming biology. How do you want to engage?",
    options: [
      { id: "A", text: "Learn bioinformatics and computational tools", traits: ["adaptive", "modern"] },
      { id: "B", text: "Collaborate with data scientists", traits: ["collaborative", "leveraging"] },
      { id: "C", text: "Focus on experimental work, let others analyze", traits: ["specialized", "traditional"] },
      { id: "D", text: "Understand both wet lab and computational", traits: ["comprehensive", "versatile"] }
    ]
  },
  {
    id: "pcb_054",
    scenario: "A senior researcher wants to add their name to your paper without contributing. Your response?",
    options: [
      { id: "A", text: "Discuss authorship guidelines with them", traits: ["assertive", "principled"] },
      { id: "B", text: "Accept if it helps your career", traits: ["pragmatic", "strategic"] },
      { id: "C", text: "Consult with your advisor", traits: ["seeking-guidance", "cautious"] },
      { id: "D", text: "Follow journal's authorship criteria", traits: ["rule-following", "fair"] }
    ]
  },
  {
    id: "pcb_055",
    scenario: "You discover your research might have commercial value. What do you do?",
    options: [
      { id: "A", text: "Discuss patenting with institution", traits: ["aware", "strategic"] },
      { id: "B", text: "Focus on publication and sharing", traits: ["academic", "open"] },
      { id: "C", text: "Consider how to maximize patient benefit", traits: ["patient-focused", "impactful"] },
      { id: "D", text: "Seek to balance commercial and academic goals", traits: ["balanced", "pragmatic"] }
    ]
  },
  {
    id: "pcb_056",
    scenario: "Your field is highly competitive. How do you handle this?",
    options: [
      { id: "A", text: "Focus on doing excellent work", traits: ["quality-focused", "confident"] },
      { id: "B", text: "Build collaborations strategically", traits: ["networked", "collaborative"] },
      { id: "C", text: "Find a unique niche", traits: ["differentiated", "smart"] },
      { id: "D", text: "Stay informed about others' work", traits: ["aware", "vigilant"] }
    ]
  },
  {
    id: "pcb_057",
    scenario: "You're presenting research at a conference. What do you focus on?",
    options: [
      { id: "A", text: "Clear explanation of methods and results", traits: ["thorough", "scientific"] },
      { id: "B", text: "Engaging story and implications", traits: ["communicative", "engaging"] },
      { id: "C", text: "Beautiful visuals and data presentation", traits: ["visual", "clear"] },
      { id: "D", text: "Being prepared for tough questions", traits: ["prepared", "confident"] }
    ]
  },
  {
    id: "pcb_058",
    scenario: "Peer review rejected your paper harshly. Your response?",
    options: [
      { id: "A", text: "Address all valid criticisms carefully", traits: ["responsive", "improving"] },
      { id: "B", text: "Evaluate if reviewer missed the point", traits: ["analytical", "objective"] },
      { id: "C", text: "Seek feedback from colleagues", traits: ["collaborative", "learning"] },
      { id: "D", text: "Submit to another journal", traits: ["persistent", "pragmatic"] }
    ]
  },
  {
    id: "pcb_059",
    scenario: "Interdisciplinary research is growing. How do you position yourself?",
    options: [
      { id: "A", text: "Stay deep in core biology", traits: ["specialist", "foundational"] },
      { id: "B", text: "Learn complementary skills actively", traits: ["versatile", "growing"] },
      { id: "C", text: "Collaborate across disciplines", traits: ["collaborative", "connecting"] },
      { id: "D", text: "Work at disciplinary boundaries", traits: ["innovative", "bridging"] }
    ]
  },
  {
    id: "pcb_060",
    scenario: "You have to choose between lab research and field research. Your preference?",
    options: [
      { id: "A", text: "Lab for controlled conditions", traits: ["controlled", "precise"] },
      { id: "B", text: "Field for real-world relevance", traits: ["applied", "contextual"] },
      { id: "C", text: "Combination of both", traits: ["comprehensive", "balanced"] },
      { id: "D", text: "Depends on the question being asked", traits: ["flexible", "question-driven"] }
    ]
  },
  // Patient care (61-80)
  {
    id: "pcb_061",
    scenario: "A child is scared of getting an injection. How do you handle this?",
    options: [
      { id: "A", text: "Distract with games or stories", traits: ["creative", "child-friendly"] },
      { id: "B", text: "Explain what will happen simply", traits: ["honest", "educational"] },
      { id: "C", text: "Be quick and efficient", traits: ["practical", "skilled"] },
      { id: "D", text: "Involve parent in comforting", traits: ["collaborative", "supportive"] }
    ]
  },
  {
    id: "pcb_062",
    scenario: "A patient has unrealistic expectations about treatment. Your approach?",
    options: [
      { id: "A", text: "Clearly explain realistic outcomes", traits: ["honest", "direct"] },
      { id: "B", text: "Explore where their expectations come from", traits: ["understanding", "empathetic"] },
      { id: "C", text: "Manage expectations gradually", traits: ["diplomatic", "patient"] },
      { id: "D", text: "Involve family in the conversation", traits: ["comprehensive", "supportive"] }
    ]
  },
  {
    id: "pcb_063",
    scenario: "A patient is anxious about test results. How do you support them?",
    options: [
      { id: "A", text: "Explain the waiting process", traits: ["informative", "transparent"] },
      { id: "B", text: "Offer reassurance without promises", traits: ["supportive", "honest"] },
      { id: "C", text: "Discuss ways to manage anxiety", traits: ["practical", "caring"] },
      { id: "D", text: "Be available for questions", traits: ["accessible", "responsive"] }
    ]
  },
  {
    id: "pcb_064",
    scenario: "Language barriers complicate patient communication. What do you do?",
    options: [
      { id: "A", text: "Use professional interpreter services", traits: ["proper", "thorough"] },
      { id: "B", text: "Use visual aids and demonstrations", traits: ["creative", "adaptive"] },
      { id: "C", text: "Learn key phrases in common languages", traits: ["proactive", "effort-making"] },
      { id: "D", text: "Work with family members carefully", traits: ["practical", "collaborative"] }
    ]
  },
  {
    id: "pcb_065",
    scenario: "A patient wants to know everything about their condition. How do you respond?",
    options: [
      { id: "A", text: "Provide comprehensive information", traits: ["thorough", "respectful"] },
      { id: "B", text: "Gauge what they can handle", traits: ["empathetic", "adaptive"] },
      { id: "C", text: "Give information in stages", traits: ["systematic", "paced"] },
      { id: "D", text: "Provide resources for more learning", traits: ["enabling", "educational"] }
    ]
  },
  {
    id: "pcb_066",
    scenario: "You need to discuss lifestyle changes with a resistant patient. Your approach?",
    options: [
      { id: "A", text: "Explain health consequences clearly", traits: ["direct", "educational"] },
      { id: "B", text: "Understand barriers to change", traits: ["empathetic", "practical"] },
      { id: "C", text: "Set small achievable goals", traits: ["incremental", "supportive"] },
      { id: "D", text: "Respect their choices ultimately", traits: ["ethical", "accepting"] }
    ]
  },
  {
    id: "pcb_067",
    scenario: "A patient asks about your personal health choices. How do you respond?",
    options: [
      { id: "A", text: "Share if it might help them", traits: ["authentic", "connecting"] },
      { id: "B", text: "Keep professional boundaries", traits: ["professional", "boundaried"] },
      { id: "C", text: "Redirect to their health needs", traits: ["focused", "practical"] },
      { id: "D", text: "Depends on the context", traits: ["flexible", "judgmental"] }
    ]
  },
  {
    id: "pcb_068",
    scenario: "A family member disagrees with the patient's treatment decision. What do you do?",
    options: [
      { id: "A", text: "Respect patient's autonomous choice", traits: ["ethical", "patient-centered"] },
      { id: "B", text: "Facilitate family discussion", traits: ["mediating", "comprehensive"] },
      { id: "C", text: "Ensure patient isn't being pressured", traits: ["protective", "careful"] },
      { id: "D", text: "Help family understand the decision", traits: ["educational", "supportive"] }
    ]
  },
  {
    id: "pcb_069",
    scenario: "You're caring for someone from a very different cultural background. Your approach?",
    options: [
      { id: "A", text: "Learn about their cultural health beliefs", traits: ["curious", "respectful"] },
      { id: "B", text: "Ask them about their preferences", traits: ["direct", "respectful"] },
      { id: "C", text: "Treat them like any other patient", traits: ["equal", "consistent"] },
      { id: "D", text: "Involve cultural liaisons if available", traits: ["resourceful", "thorough"] }
    ]
  },
  {
    id: "pcb_070",
    scenario: "A patient complains about long wait times. How do you respond?",
    options: [
      { id: "A", text: "Apologize and explain the delays", traits: ["empathetic", "communicative"] },
      { id: "B", text: "Focus on their care once with them", traits: ["present", "attentive"] },
      { id: "C", text: "Work on systemic improvements", traits: ["systemic", "proactive"] },
      { id: "D", text: "Acknowledge their frustration", traits: ["validating", "understanding"] }
    ]
  },
  {
    id: "pcb_071",
    scenario: "A patient has looked up their symptoms online and is worried. Your response?",
    options: [
      { id: "A", text: "Address their specific concerns", traits: ["responsive", "thorough"] },
      { id: "B", text: "Explain why online info can mislead", traits: ["educational", "corrective"] },
      { id: "C", text: "Appreciate their proactive approach", traits: ["positive", "encouraging"] },
      { id: "D", text: "Guide them to reliable sources", traits: ["helpful", "practical"] }
    ]
  },
  {
    id: "pcb_072",
    scenario: "You need to tell a patient they have a chronic condition. How do you approach this?",
    options: [
      { id: "A", text: "Be clear but compassionate", traits: ["honest", "caring"] },
      { id: "B", text: "Focus on management and living well", traits: ["positive", "practical"] },
      { id: "C", text: "Allow time for questions and reactions", traits: ["patient", "supportive"] },
      { id: "D", text: "Provide written information too", traits: ["thorough", "practical"] }
    ]
  },
  {
    id: "pcb_073",
    scenario: "A patient is not taking medications correctly. What do you do?",
    options: [
      { id: "A", text: "Simplify the regimen if possible", traits: ["practical", "patient-centered"] },
      { id: "B", text: "Understand barriers to adherence", traits: ["analytical", "empathetic"] },
      { id: "C", text: "Use pill boxes or reminders", traits: ["helpful", "solution-oriented"] },
      { id: "D", text: "Educate about importance", traits: ["educational", "persistent"] }
    ]
  },
  {
    id: "pcb_074",
    scenario: "A patient thanks you profusely for routine care. How do you feel?",
    options: [
      { id: "A", text: "Humbled and motivated", traits: ["humble", "inspired"] },
      { id: "B", text: "It's just my job, but appreciated", traits: ["professional", "gracious"] },
      { id: "C", text: "Reminded why I chose this field", traits: ["purpose-driven", "reflective"] },
      { id: "D", text: "Glad I could help", traits: ["satisfied", "caring"] }
    ]
  },
  {
    id: "pcb_075",
    scenario: "A patient's family wants to be involved in every decision. Your response?",
    options: [
      { id: "A", text: "Welcome their involvement", traits: ["inclusive", "collaborative"] },
      { id: "B", text: "Ensure patient's voice is primary", traits: ["patient-centered", "ethical"] },
      { id: "C", text: "Set appropriate boundaries", traits: ["professional", "clear"] },
      { id: "D", text: "Appreciate their support for the patient", traits: ["positive", "understanding"] }
    ]
  },
  {
    id: "pcb_076",
    scenario: "A difficult patient tests your patience. How do you cope?",
    options: [
      { id: "A", text: "Remain professional regardless", traits: ["professional", "controlled"] },
      { id: "B", text: "Try to understand their perspective", traits: ["empathetic", "patient"] },
      { id: "C", text: "Take brief breaks when needed", traits: ["self-caring", "practical"] },
      { id: "D", text: "Debrief with colleagues after", traits: ["supported", "processing"] }
    ]
  },
  {
    id: "pcb_077",
    scenario: "You notice a patient seems depressed during routine visit. What do you do?",
    options: [
      { id: "A", text: "Ask about their emotional wellbeing", traits: ["observant", "caring"] },
      { id: "B", text: "Mention mental health resources", traits: ["helpful", "comprehensive"] },
      { id: "C", text: "Focus on why they came today", traits: ["focused", "efficient"] },
      { id: "D", text: "Screen with validated questions", traits: ["systematic", "thorough"] }
    ]
  },
  {
    id: "pcb_078",
    scenario: "A patient wants a second opinion. How do you respond?",
    options: [
      { id: "A", text: "Support their decision completely", traits: ["supportive", "patient-centered"] },
      { id: "B", text: "Help them find appropriate specialists", traits: ["helpful", "practical"] },
      { id: "C", text: "Explore what concerns prompted this", traits: ["curious", "communicative"] },
      { id: "D", text: "Provide records promptly", traits: ["efficient", "professional"] }
    ]
  },
  {
    id: "pcb_079",
    scenario: "You're treating a patient with addiction issues. Your approach?",
    options: [
      { id: "A", text: "Non-judgmental, treating as illness", traits: ["compassionate", "scientific"] },
      { id: "B", text: "Focus on harm reduction", traits: ["practical", "realistic"] },
      { id: "C", text: "Connect with addiction specialists", traits: ["comprehensive", "collaborative"] },
      { id: "D", text: "Address underlying issues too", traits: ["holistic", "thorough"] }
    ]
  },
  {
    id: "pcb_080",
    scenario: "End of a long shift, one more patient waiting. Your attitude?",
    options: [
      { id: "A", text: "Give them the same attention as others", traits: ["fair", "professional"] },
      { id: "B", text: "Acknowledge my tiredness but push through", traits: ["self-aware", "dedicated"] },
      { id: "C", text: "Handle efficiently but thoroughly", traits: ["practical", "balanced"] },
      { id: "D", text: "Remember why I do this work", traits: ["purpose-driven", "motivated"] }
    ]
  },
  // Career choice situations (81-100)
  {
    id: "pcb_081",
    scenario: "You're choosing between MBBS and research-focused BSc. What appeals more?",
    options: [
      { id: "A", text: "MBBS for patient interaction", traits: ["clinical", "relational"] },
      { id: "B", text: "BSc for research freedom", traits: ["research", "academic"] },
      { id: "C", text: "MD-PhD combining both", traits: ["comprehensive", "ambitious"] },
      { id: "D", text: "Depends on long-term goals", traits: ["strategic", "planning"] }
    ]
  },
  {
    id: "pcb_082",
    scenario: "Private practice vs. government hospital. Your preference?",
    options: [
      { id: "A", text: "Private for better facilities", traits: ["quality-focused", "practical"] },
      { id: "B", text: "Government for serving all people", traits: ["service-oriented", "equitable"] },
      { id: "C", text: "Start government, move to private", traits: ["strategic", "evolving"] },
      { id: "D", text: "Both through part-time arrangements", traits: ["balanced", "comprehensive"] }
    ]
  },
  {
    id: "pcb_083",
    scenario: "Rural vs. urban healthcare career. What do you prefer?",
    options: [
      { id: "A", text: "Rural where I'm needed more", traits: ["service", "needed"] },
      { id: "B", text: "Urban for advanced facilities", traits: ["excellence", "specialized"] },
      { id: "C", text: "Rotate between both", traits: ["balanced", "varied"] },
      { id: "D", text: "Use telemedicine to serve rural areas", traits: ["innovative", "reaching"] }
    ]
  },
  {
    id: "pcb_084",
    scenario: "A lucrative specialty vs. one you're passionate about. Your choice?",
    options: [
      { id: "A", text: "Follow my passion", traits: ["passionate", "authentic"] },
      { id: "B", text: "Consider financial reality", traits: ["practical", "realistic"] },
      { id: "C", text: "Find passion in any specialty", traits: ["adaptive", "positive"] },
      { id: "D", text: "Balance both factors", traits: ["balanced", "strategic"] }
    ]
  },
  {
    id: "pcb_085",
    scenario: "You can specialize in high-tech procedures or holistic patient care. Preference?",
    options: [
      { id: "A", text: "High-tech for cutting-edge impact", traits: ["technical", "advanced"] },
      { id: "B", text: "Holistic for comprehensive care", traits: ["holistic", "patient-centered"] },
      { id: "C", text: "Combine technology with personal care", traits: ["integrated", "balanced"] },
      { id: "D", text: "Let patient needs guide me", traits: ["patient-driven", "adaptive"] }
    ]
  },
  {
    id: "pcb_086",
    scenario: "Working in India vs. abroad for better opportunities. Your thinking?",
    options: [
      { id: "A", text: "Stay and serve Indian patients", traits: ["patriotic", "committed"] },
      { id: "B", text: "Go abroad for better training", traits: ["growth-focused", "ambitious"] },
      { id: "C", text: "Train abroad, return to India", traits: ["strategic", "contributing"] },
      { id: "D", text: "Work globally, impact everywhere", traits: ["global", "cosmopolitan"] }
    ]
  },
  {
    id: "pcb_087",
    scenario: "You're interested in both surgery and medicine. How do you decide?",
    options: [
      { id: "A", text: "Try rotations in both first", traits: ["exploratory", "thorough"] },
      { id: "B", text: "Consider lifestyle implications", traits: ["practical", "balanced"] },
      { id: "C", text: "Follow what excites me more", traits: ["passionate", "intuitive"] },
      { id: "D", text: "Talk to mentors in both fields", traits: ["advised", "learning"] }
    ]
  },
  {
    id: "pcb_088",
    scenario: "Academia vs. clinical practice. What's your inclination?",
    options: [
      { id: "A", text: "Academia for teaching and research", traits: ["academic", "teaching"] },
      { id: "B", text: "Pure clinical for patient focus", traits: ["clinical", "patient-focused"] },
      { id: "C", text: "Academic medical center combining both", traits: ["comprehensive", "balanced"] },
      { id: "D", text: "Start clinical, move to academia later", traits: ["sequential", "evolving"] }
    ]
  },
  {
    id: "pcb_089",
    scenario: "Healthcare entrepreneurship interests you. What would you create?",
    options: [
      { id: "A", text: "Affordable diagnostic technology", traits: ["innovative", "access-focused"] },
      { id: "B", text: "Healthcare delivery model for underserved", traits: ["service", "equitable"] },
      { id: "C", text: "Digital health solutions", traits: ["tech-savvy", "modern"] },
      { id: "D", text: "Medical education innovations", traits: ["educational", "impactful"] }
    ]
  },
  {
    id: "pcb_090",
    scenario: "You want to impact health policy. What path would you take?",
    options: [
      { id: "A", text: "Practice first, policy later", traits: ["grounded", "experienced"] },
      { id: "B", text: "Public health degree and career", traits: ["direct", "focused"] },
      { id: "C", text: "Research to inform policy", traits: ["evidence-based", "academic"] },
      { id: "D", text: "Advocacy through medical associations", traits: ["organized", "influential"] }
    ]
  },
  {
    id: "pcb_091",
    scenario: "Alternative medicine career (AYUSH) vs. allopathy. Your view?",
    options: [
      { id: "A", text: "Allopathy for evidence-based practice", traits: ["scientific", "modern"] },
      { id: "B", text: "AYUSH for holistic traditional approach", traits: ["traditional", "holistic"] },
      { id: "C", text: "Integrative medicine combining both", traits: ["integrative", "open-minded"] },
      { id: "D", text: "Depends on what works for patients", traits: ["patient-focused", "pragmatic"] }
    ]
  },
  {
    id: "pcb_092",
    scenario: "Forensic science fascinates you. What aspect appeals most?",
    options: [
      { id: "A", text: "DNA and molecular analysis", traits: ["technical", "precise"] },
      { id: "B", text: "Solving crimes through evidence", traits: ["investigative", "justice-focused"] },
      { id: "C", text: "Autopsy and cause of death", traits: ["pathological", "detailed"] },
      { id: "D", text: "Toxicology and poisoning cases", traits: ["analytical", "specialized"] }
    ]
  },
  {
    id: "pcb_093",
    scenario: "Sports medicine vs. general practice. Your preference?",
    options: [
      { id: "A", text: "Sports medicine for active patients", traits: ["active", "specialized"] },
      { id: "B", text: "General practice for variety", traits: ["varied", "comprehensive"] },
      { id: "C", text: "Can do both in my practice", traits: ["flexible", "combining"] },
      { id: "D", text: "Whatever helps more people", traits: ["impact-focused", "open"] }
    ]
  },
  {
    id: "pcb_094",
    scenario: "Medical missions and humanitarian work interest you. How would you engage?",
    options: [
      { id: "A", text: "Regular short-term missions", traits: ["contributing", "periodic"] },
      { id: "B", text: "Long-term commitment in underserved area", traits: ["dedicated", "deep"] },
      { id: "C", text: "Supporting through training locals", traits: ["sustainable", "capacity-building"] },
      { id: "D", text: "Advocacy and fundraising support", traits: ["enabling", "supporting"] }
    ]
  },
  {
    id: "pcb_095",
    scenario: "Veterinary medicine vs. human medicine. What attracts you?",
    options: [
      { id: "A", text: "Human medicine for people", traits: ["people-focused", "relational"] },
      { id: "B", text: "Veterinary for animal welfare", traits: ["animal-loving", "caring"] },
      { id: "C", text: "One Health approach connecting both", traits: ["integrative", "ecological"] },
      { id: "D", text: "Zoonotic diseases bridging both", traits: ["epidemiological", "connecting"] }
    ]
  },
  {
    id: "pcb_096",
    scenario: "Nursing vs. medicine as a career. Your perspective?",
    options: [
      { id: "A", text: "Medicine for diagnosis and treatment", traits: ["diagnostic", "decisive"] },
      { id: "B", text: "Nursing for continuous patient care", traits: ["caring", "continuous"] },
      { id: "C", text: "Both are equally valuable", traits: ["respectful", "balanced"] },
      { id: "D", text: "Advanced practice nursing combines both", traits: ["comprehensive", "modern"] }
    ]
  },
  {
    id: "pcb_097",
    scenario: "Laboratory medicine vs. clinical practice. Preference?",
    options: [
      { id: "A", text: "Lab for precision and analysis", traits: ["analytical", "precise"] },
      { id: "B", text: "Clinical for patient interaction", traits: ["relational", "communicative"] },
      { id: "C", text: "Clinical pathology combining both", traits: ["integrated", "comprehensive"] },
      { id: "D", text: "Lab if I prefer behind-scenes impact", traits: ["supporting", "essential"] }
    ]
  },
  {
    id: "pcb_098",
    scenario: "You can focus on prevention or treatment. What appeals more?",
    options: [
      { id: "A", text: "Prevention to stop disease before it starts", traits: ["preventive", "proactive"] },
      { id: "B", text: "Treatment to help those already suffering", traits: ["curative", "responsive"] },
      { id: "C", text: "Both are essential parts of healthcare", traits: ["comprehensive", "balanced"] },
      { id: "D", text: "Prevention has more population impact", traits: ["public-health", "strategic"] }
    ]
  },
  {
    id: "pcb_099",
    scenario: "Medical writing and communication interests you. What area?",
    options: [
      { id: "A", text: "Research papers and scientific writing", traits: ["academic", "detailed"] },
      { id: "B", text: "Health journalism for public", traits: ["communicative", "accessible"] },
      { id: "C", text: "Patient education materials", traits: ["educational", "patient-focused"] },
      { id: "D", text: "Medical textbooks and teaching", traits: ["educational", "foundational"] }
    ]
  },
  {
    id: "pcb_100",
    scenario: "Reflecting on PCB, what has it prepared you for most?",
    options: [
      { id: "A", text: "Understanding life and living systems", traits: ["biological", "fundamental"] },
      { id: "B", text: "Caring for human health", traits: ["healthcare", "caring"] },
      { id: "C", text: "Scientific thinking and research", traits: ["scientific", "analytical"] },
      { id: "D", text: "Multiple paths in life sciences", traits: ["versatile", "open"] }
    ]
  }
];
