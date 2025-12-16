import { Question } from './types';

export const ARTS_QUESTIONS: Question[] = [
  // Creative scenarios (1-20)
  {
    id: "arts_001",
    scenario: "Your school is organizing a cultural fest and needs someone to design all the promotional materials. What approach would you take?",
    options: [
      { id: "A", text: "Create a cohesive visual theme with original artwork", traits: ["creative", "artistic"] },
      { id: "B", text: "Research successful fest designs for inspiration", traits: ["analytical", "research"] },
      { id: "C", text: "Collaborate with classmates to gather diverse ideas", traits: ["collaborative", "social"] },
      { id: "D", text: "Use templates and focus on clear information", traits: ["practical", "organized"] }
    ]
  },
  {
    id: "arts_002",
    scenario: "A local NGO asks you to create awareness content about environmental issues. How would you approach this?",
    options: [
      { id: "A", text: "Create an emotional video documentary", traits: ["storytelling", "empathetic"] },
      { id: "B", text: "Design infographics with data and statistics", traits: ["analytical", "informative"] },
      { id: "C", text: "Organize community workshops and discussions", traits: ["social", "activist"] },
      { id: "D", text: "Write compelling articles for newspapers", traits: ["writing", "journalism"] }
    ]
  },
  {
    id: "arts_003",
    scenario: "You're asked to direct a short play for your college annual day. What's your priority?",
    options: [
      { id: "A", text: "Focus on innovative staging and visual effects", traits: ["creative", "technical"] },
      { id: "B", text: "Ensure strong character development and story", traits: ["storytelling", "literary"] },
      { id: "C", text: "Create opportunities for maximum student participation", traits: ["inclusive", "social"] },
      { id: "D", text: "Choose a socially relevant theme with a message", traits: ["activist", "thoughtful"] }
    ]
  },
  {
    id: "arts_004",
    scenario: "Your photography captures a powerful moment of social injustice. What do you do with it?",
    options: [
      { id: "A", text: "Submit it to photography competitions", traits: ["artistic", "ambitious"] },
      { id: "B", text: "Share on social media to raise awareness", traits: ["activist", "communicative"] },
      { id: "C", text: "Offer it to news organizations", traits: ["journalism", "practical"] },
      { id: "D", text: "Create an exhibition with context and stories", traits: ["educational", "storytelling"] }
    ]
  },
  {
    id: "arts_005",
    scenario: "A museum wants to make art more accessible to children. How would you help?",
    options: [
      { id: "A", text: "Create interactive digital exhibits", traits: ["innovative", "technical"] },
      { id: "B", text: "Design hands-on art workshops", traits: ["educational", "creative"] },
      { id: "C", text: "Develop storytelling tours with characters", traits: ["storytelling", "engaging"] },
      { id: "D", text: "Create activity books and games about art", traits: ["practical", "child-focused"] }
    ]
  },
  {
    id: "arts_006",
    scenario: "You're composing music for a documentary about tribal communities. What's your approach?",
    options: [
      { id: "A", text: "Incorporate authentic tribal instruments and rhythms", traits: ["cultural", "authentic"] },
      { id: "B", text: "Create modern fusion that appeals to wider audience", traits: ["innovative", "commercial"] },
      { id: "C", text: "Let the visuals guide the emotional tone", traits: ["intuitive", "collaborative"] },
      { id: "D", text: "Research and document traditional music first", traits: ["research", "preservationist"] }
    ]
  },
  {
    id: "arts_007",
    scenario: "Your art teacher criticizes your unconventional painting style. How do you respond?",
    options: [
      { id: "A", text: "Explain your artistic vision and intent", traits: ["confident", "articulate"] },
      { id: "B", text: "Try to incorporate feedback while keeping your style", traits: ["adaptable", "balanced"] },
      { id: "C", text: "Seek opinions from other artists and peers", traits: ["open-minded", "social"] },
      { id: "D", text: "Continue developing your unique style regardless", traits: ["independent", "persistent"] }
    ]
  },
  {
    id: "arts_008",
    scenario: "A startup wants you to design their brand identity. What do you prioritize?",
    options: [
      { id: "A", text: "Understanding their values and target audience", traits: ["strategic", "empathetic"] },
      { id: "B", text: "Creating visually stunning and memorable designs", traits: ["artistic", "creative"] },
      { id: "C", text: "Ensuring designs work across all platforms", traits: ["practical", "technical"] },
      { id: "D", text: "Researching competitor brands thoroughly", traits: ["analytical", "strategic"] }
    ]
  },
  {
    id: "arts_009",
    scenario: "You discover an old family photo album with historical significance. What do you do?",
    options: [
      { id: "A", text: "Create a documentary or photo essay", traits: ["storytelling", "creative"] },
      { id: "B", text: "Donate to a historical archive or museum", traits: ["preservationist", "civic"] },
      { id: "C", text: "Write a book about the family history", traits: ["writing", "research"] },
      { id: "D", text: "Organize a family reunion to share stories", traits: ["social", "family-oriented"] }
    ]
  },
  {
    id: "arts_010",
    scenario: "Your dance troupe must choose between a traditional performance or contemporary fusion. Your vote?",
    options: [
      { id: "A", text: "Traditional - preserve and showcase heritage", traits: ["cultural", "preservationist"] },
      { id: "B", text: "Fusion - make it relevant to modern audience", traits: ["innovative", "adaptable"] },
      { id: "C", text: "Create a narrative that blends both styles", traits: ["creative", "balanced"] },
      { id: "D", text: "Let audience demographics decide the style", traits: ["practical", "audience-focused"] }
    ]
  },
  {
    id: "arts_011",
    scenario: "You're writing a novel and face writer's block. How do you overcome it?",
    options: [
      { id: "A", text: "Take a break and seek new experiences", traits: ["experiential", "self-aware"] },
      { id: "B", text: "Force yourself to write anything, edit later", traits: ["disciplined", "persistent"] },
      { id: "C", text: "Discuss plot ideas with friends", traits: ["collaborative", "social"] },
      { id: "D", text: "Read other authors for inspiration", traits: ["research", "literary"] }
    ]
  },
  {
    id: "arts_012",
    scenario: "A film director offers you a role that conflicts with your personal values. What do you do?",
    options: [
      { id: "A", text: "Decline and explain your reasons respectfully", traits: ["principled", "communicative"] },
      { id: "B", text: "Accept as it's just acting, not real life", traits: ["professional", "pragmatic"] },
      { id: "C", text: "Negotiate to modify the role slightly", traits: ["diplomatic", "adaptable"] },
      { id: "D", text: "Consult with mentors before deciding", traits: ["cautious", "advice-seeking"] }
    ]
  },
  {
    id: "arts_013",
    scenario: "Your street art gets both praise and criticism from the community. How do you feel?",
    options: [
      { id: "A", text: "Proud - art should provoke discussion", traits: ["confident", "provocative"] },
      { id: "B", text: "Concerned about those who feel offended", traits: ["empathetic", "considerate"] },
      { id: "C", text: "Motivated to create more dialogue through art", traits: ["activist", "persistent"] },
      { id: "D", text: "Reflective about the impact of public art", traits: ["thoughtful", "analytical"] }
    ]
  },
  {
    id: "arts_014",
    scenario: "You're curating an art exhibition on mental health. What's your theme approach?",
    options: [
      { id: "A", text: "Raw, honest expressions of lived experiences", traits: ["authentic", "empathetic"] },
      { id: "B", text: "Hope and recovery journey stories", traits: ["positive", "inspiring"] },
      { id: "C", text: "Interactive installations for visitor engagement", traits: ["innovative", "engaging"] },
      { id: "D", text: "Educational displays with resources and support", traits: ["informative", "helpful"] }
    ]
  },
  {
    id: "arts_015",
    scenario: "A famous artist offers to mentor you but lives in another city. What do you do?",
    options: [
      { id: "A", text: "Relocate immediately for this opportunity", traits: ["ambitious", "committed"] },
      { id: "B", text: "Arrange virtual mentorship sessions", traits: ["practical", "adaptable"] },
      { id: "C", text: "Visit periodically while continuing locally", traits: ["balanced", "resourceful"] },
      { id: "D", text: "Seek similar mentorship opportunities locally", traits: ["practical", "community-focused"] }
    ]
  },
  {
    id: "arts_016",
    scenario: "Your poetry is selected for a national competition but needs significant editing. Your approach?",
    options: [
      { id: "A", text: "Work intensively to perfect every word", traits: ["perfectionist", "dedicated"] },
      { id: "B", text: "Seek feedback from experienced poets", traits: ["collaborative", "humble"] },
      { id: "C", text: "Trust your original voice, make minimal changes", traits: ["authentic", "confident"] },
      { id: "D", text: "Research winning poems for guidance", traits: ["strategic", "analytical"] }
    ]
  },
  {
    id: "arts_017",
    scenario: "You're designing costumes for a historical drama. Budget is limited. What do you prioritize?",
    options: [
      { id: "A", text: "Historical accuracy in key pieces", traits: ["detail-oriented", "authentic"] },
      { id: "B", text: "Overall visual impact on stage", traits: ["artistic", "practical"] },
      { id: "C", text: "Comfort and movement for actors", traits: ["empathetic", "functional"] },
      { id: "D", text: "Creative upcycling of available materials", traits: ["resourceful", "sustainable"] }
    ]
  },
  {
    id: "arts_018",
    scenario: "A publisher wants to change the ending of your story to be more commercial. What do you do?",
    options: [
      { id: "A", text: "Refuse - artistic integrity is non-negotiable", traits: ["principled", "independent"] },
      { id: "B", text: "Consider their perspective and compromise", traits: ["pragmatic", "flexible"] },
      { id: "C", text: "Offer alternative endings for them to choose", traits: ["creative", "diplomatic"] },
      { id: "D", text: "Seek another publisher who respects your vision", traits: ["determined", "patient"] }
    ]
  },
  {
    id: "arts_019",
    scenario: "You notice a talented classmate lacking confidence in their art. How do you help?",
    options: [
      { id: "A", text: "Publicly praise their work to boost confidence", traits: ["supportive", "encouraging"] },
      { id: "B", text: "Invite them to collaborate on a project", traits: ["inclusive", "collaborative"] },
      { id: "C", text: "Share your own struggles and growth journey", traits: ["empathetic", "authentic"] },
      { id: "D", text: "Help them submit work to competitions", traits: ["practical", "action-oriented"] }
    ]
  },
  {
    id: "arts_020",
    scenario: "Your sculpture installation requires community space. How do you get permission?",
    options: [
      { id: "A", text: "Present detailed proposal to local authorities", traits: ["organized", "professional"] },
      { id: "B", text: "Gather community support through petitions", traits: ["activist", "social"] },
      { id: "C", text: "Partner with established organizations", traits: ["strategic", "collaborative"] },
      { id: "D", text: "Start small in private spaces, build reputation", traits: ["patient", "gradual"] }
    ]
  },

  // Social work situations (21-40)
  {
    id: "arts_021",
    scenario: "You encounter a homeless person asking for help near your college. What's your response?",
    options: [
      { id: "A", text: "Provide food and connect them with shelters", traits: ["compassionate", "practical"] },
      { id: "B", text: "Spend time listening to their story", traits: ["empathetic", "patient"] },
      { id: "C", text: "Organize a college drive to help homeless people", traits: ["activist", "leadership"] },
      { id: "D", text: "Document and report to social services", traits: ["systematic", "civic"] }
    ]
  },
  {
    id: "arts_022",
    scenario: "A friend confides about facing domestic abuse. How do you support them?",
    options: [
      { id: "A", text: "Listen without judgment and offer emotional support", traits: ["empathetic", "supportive"] },
      { id: "B", text: "Research and share helpline numbers and resources", traits: ["practical", "helpful"] },
      { id: "C", text: "Encourage them to speak with a counselor", traits: ["thoughtful", "professional"] },
      { id: "D", text: "Offer practical help like safe space if needed", traits: ["action-oriented", "protective"] }
    ]
  },
  {
    id: "arts_023",
    scenario: "Your village has poor access to education. What initiative would you start?",
    options: [
      { id: "A", text: "Start evening classes for children", traits: ["educational", "committed"] },
      { id: "B", text: "Create a mobile library program", traits: ["innovative", "resourceful"] },
      { id: "C", text: "Advocate with government for better schools", traits: ["activist", "political"] },
      { id: "D", text: "Partner with NGOs working in education", traits: ["collaborative", "strategic"] }
    ]
  },
  {
    id: "arts_024",
    scenario: "You witness caste discrimination at a public event. What do you do?",
    options: [
      { id: "A", text: "Speak up immediately against the discrimination", traits: ["courageous", "activist"] },
      { id: "B", text: "Support the affected person privately afterwards", traits: ["empathetic", "supportive"] },
      { id: "C", text: "Document and report to appropriate authorities", traits: ["systematic", "civic"] },
      { id: "D", text: "Organize awareness campaigns about equality", traits: ["educational", "proactive"] }
    ]
  },
  {
    id: "arts_025",
    scenario: "A senior citizen in your neighborhood seems isolated and lonely. How do you help?",
    options: [
      { id: "A", text: "Visit regularly for conversation and company", traits: ["compassionate", "patient"] },
      { id: "B", text: "Help them connect with senior citizen groups", traits: ["resourceful", "practical"] },
      { id: "C", text: "Involve them in community activities", traits: ["inclusive", "social"] },
      { id: "D", text: "Assist with their daily needs and errands", traits: ["helpful", "service-oriented"] }
    ]
  },
  {
    id: "arts_026",
    scenario: "Your NGO internship reveals corruption affecting beneficiaries. What do you do?",
    options: [
      { id: "A", text: "Report to senior management with evidence", traits: ["principled", "courageous"] },
      { id: "B", text: "Discuss concerns with trusted colleagues first", traits: ["cautious", "collaborative"] },
      { id: "C", text: "Anonymously report to oversight authorities", traits: ["strategic", "protective"] },
      { id: "D", text: "Document everything but wait for right moment", traits: ["patient", "calculating"] }
    ]
  },
  {
    id: "arts_027",
    scenario: "A migrant worker's family needs help navigating government schemes. Your approach?",
    options: [
      { id: "A", text: "Personally guide them through the process", traits: ["helpful", "patient"] },
      { id: "B", text: "Create simplified guides in their language", traits: ["resourceful", "practical"] },
      { id: "C", text: "Connect them with community organizations", traits: ["networked", "strategic"] },
      { id: "D", text: "Advocate for simpler processes with authorities", traits: ["activist", "systemic"] }
    ]
  },
  {
    id: "arts_028",
    scenario: "You're organizing a charity event but sponsors want prominent branding. How do you balance?",
    options: [
      { id: "A", text: "Accept - their support enables the cause", traits: ["pragmatic", "grateful"] },
      { id: "B", text: "Negotiate tasteful acknowledgment instead", traits: ["diplomatic", "balanced"] },
      { id: "C", text: "Seek sponsors aligned with the cause's values", traits: ["principled", "selective"] },
      { id: "D", text: "Crowdfund to reduce corporate dependence", traits: ["independent", "innovative"] }
    ]
  },
  {
    id: "arts_029",
    scenario: "A rehabilitation center asks you to volunteer with recovering addicts. What role suits you?",
    options: [
      { id: "A", text: "Conducting art or music therapy sessions", traits: ["creative", "therapeutic"] },
      { id: "B", text: "One-on-one mentoring and support", traits: ["empathetic", "patient"] },
      { id: "C", text: "Organizing skill development workshops", traits: ["practical", "empowering"] },
      { id: "D", text: "Family counseling and support services", traits: ["holistic", "comprehensive"] }
    ]
  },
  {
    id: "arts_030",
    scenario: "Your community faces a natural disaster. How do you contribute to relief efforts?",
    options: [
      { id: "A", text: "Join ground-level rescue and relief operations", traits: ["action-oriented", "brave"] },
      { id: "B", text: "Coordinate donations and logistics", traits: ["organized", "systematic"] },
      { id: "C", text: "Provide emotional support to affected families", traits: ["empathetic", "supportive"] },
      { id: "D", text: "Document and raise awareness for ongoing support", traits: ["communicative", "strategic"] }
    ]
  },
  {
    id: "arts_031",
    scenario: "A child laborer asks you for help to go to school. What's your first step?",
    options: [
      { id: "A", text: "Contact child welfare organizations immediately", traits: ["action-oriented", "systematic"] },
      { id: "B", text: "Speak with the child's family about options", traits: ["diplomatic", "understanding"] },
      { id: "C", text: "Offer to sponsor their education personally", traits: ["generous", "committed"] },
      { id: "D", text: "Report to authorities for formal intervention", traits: ["legal", "civic"] }
    ]
  },
  {
    id: "arts_032",
    scenario: "You're counseling a teenager contemplating dropping out of school. Your approach?",
    options: [
      { id: "A", text: "Understand their reasons without judgment", traits: ["empathetic", "patient"] },
      { id: "B", text: "Share success stories of education's impact", traits: ["inspiring", "motivational"] },
      { id: "C", text: "Help identify and address specific obstacles", traits: ["practical", "problem-solving"] },
      { id: "D", text: "Involve parents and teachers in support plan", traits: ["collaborative", "comprehensive"] }
    ]
  },
  {
    id: "arts_033",
    scenario: "A women's self-help group wants to start income-generating activities. How do you help?",
    options: [
      { id: "A", text: "Conduct market research for viable products", traits: ["analytical", "strategic"] },
      { id: "B", text: "Provide skill training in crafts or services", traits: ["educational", "empowering"] },
      { id: "C", text: "Connect them with microfinance institutions", traits: ["resourceful", "practical"] },
      { id: "D", text: "Help create marketing and sales channels", traits: ["business-minded", "supportive"] }
    ]
  },
  {
    id: "arts_034",
    scenario: "Your social work involves visiting slums. You notice health issues are prevalent. What do you prioritize?",
    options: [
      { id: "A", text: "Organize free health camps with doctors", traits: ["action-oriented", "resourceful"] },
      { id: "B", text: "Educate about hygiene and preventive care", traits: ["educational", "sustainable"] },
      { id: "C", text: "Advocate for better public health facilities", traits: ["activist", "systemic"] },
      { id: "D", text: "Train community health workers locally", traits: ["empowering", "long-term"] }
    ]
  },
  {
    id: "arts_035",
    scenario: "A beneficiary becomes dependent on your help instead of self-reliant. How do you address this?",
    options: [
      { id: "A", text: "Gradually reduce support while building their skills", traits: ["strategic", "empowering"] },
      { id: "B", text: "Have an honest conversation about independence", traits: ["direct", "respectful"] },
      { id: "C", text: "Connect them with peer support groups", traits: ["collaborative", "sustainable"] },
      { id: "D", text: "Reflect on your approach and adjust methods", traits: ["self-aware", "adaptive"] }
    ]
  },
  {
    id: "arts_036",
    scenario: "You're asked to mediate a land dispute between two families in your village. Your approach?",
    options: [
      { id: "A", text: "Listen to both sides separately first", traits: ["fair", "methodical"] },
      { id: "B", text: "Involve respected village elders in the process", traits: ["traditional", "collaborative"] },
      { id: "C", text: "Research legal aspects before mediating", traits: ["informed", "thorough"] },
      { id: "D", text: "Focus on underlying relationship issues", traits: ["insightful", "holistic"] }
    ]
  },
  {
    id: "arts_037",
    scenario: "A disability rights organization needs help with awareness campaigns. What do you offer?",
    options: [
      { id: "A", text: "Create inclusive communication materials", traits: ["creative", "inclusive"] },
      { id: "B", text: "Organize events with disabled speakers", traits: ["empowering", "authentic"] },
      { id: "C", text: "Train organizations on accessibility", traits: ["educational", "practical"] },
      { id: "D", text: "Advocate for policy changes", traits: ["activist", "systemic"] }
    ]
  },
  {
    id: "arts_038",
    scenario: "You discover that donated funds aren't reaching intended beneficiaries. What do you do?",
    options: [
      { id: "A", text: "Investigate and document the discrepancies", traits: ["thorough", "evidence-based"] },
      { id: "B", text: "Report to organization leadership immediately", traits: ["direct", "responsible"] },
      { id: "C", text: "Inform donors about the situation", traits: ["transparent", "ethical"] },
      { id: "D", text: "Work to establish better tracking systems", traits: ["constructive", "practical"] }
    ]
  },
  {
    id: "arts_039",
    scenario: "An elderly person you're helping refuses medical treatment due to financial concerns. Your response?",
    options: [
      { id: "A", text: "Research and share free treatment options", traits: ["resourceful", "helpful"] },
      { id: "B", text: "Help them understand treatment importance", traits: ["patient", "persuasive"] },
      { id: "C", text: "Mobilize community support for their expenses", traits: ["community-minded", "action-oriented"] },
      { id: "D", text: "Respect their autonomy while staying supportive", traits: ["respectful", "ethical"] }
    ]
  },
  {
    id: "arts_040",
    scenario: "Your social work project needs more volunteers but you're struggling to recruit. What strategy?",
    options: [
      { id: "A", text: "Share impact stories on social media", traits: ["communicative", "inspiring"] },
      { id: "B", text: "Partner with colleges for student volunteers", traits: ["strategic", "collaborative"] },
      { id: "C", text: "Offer flexible, micro-volunteering opportunities", traits: ["innovative", "practical"] },
      { id: "D", text: "Focus on quality over quantity of volunteers", traits: ["selective", "efficient"] }
    ]
  },

  // Education/teaching (41-60)
  {
    id: "arts_041",
    scenario: "A student in your class struggles with learning disabilities. How do you support them?",
    options: [
      { id: "A", text: "Create individualized learning materials", traits: ["dedicated", "creative"] },
      { id: "B", text: "Work closely with special educators", traits: ["collaborative", "professional"] },
      { id: "C", text: "Pair them with supportive peer buddies", traits: ["inclusive", "social"] },
      { id: "D", text: "Focus on their strengths rather than weaknesses", traits: ["positive", "empowering"] }
    ]
  },
  {
    id: "arts_042",
    scenario: "Parents complain your teaching methods are too unconventional. How do you respond?",
    options: [
      { id: "A", text: "Demonstrate student progress and outcomes", traits: ["evidence-based", "confident"] },
      { id: "B", text: "Invite parents to observe a class", traits: ["transparent", "welcoming"] },
      { id: "C", text: "Incorporate some traditional elements", traits: ["flexible", "diplomatic"] },
      { id: "D", text: "Explain the research behind your methods", traits: ["informed", "educational"] }
    ]
  },
  {
    id: "arts_043",
    scenario: "You're teaching in a rural school with minimal resources. How do you make learning engaging?",
    options: [
      { id: "A", text: "Use local environment and materials creatively", traits: ["resourceful", "innovative"] },
      { id: "B", text: "Focus on storytelling and oral traditions", traits: ["cultural", "engaging"] },
      { id: "C", text: "Create games and activities for learning", traits: ["playful", "creative"] },
      { id: "D", text: "Involve community members as guest teachers", traits: ["collaborative", "community-focused"] }
    ]
  },
  {
    id: "arts_044",
    scenario: "A bright student is being forced by family to drop out for marriage. What do you do?",
    options: [
      { id: "A", text: "Counsel the family about education's importance", traits: ["persuasive", "caring"] },
      { id: "B", text: "Connect them with scholarship opportunities", traits: ["practical", "resourceful"] },
      { id: "C", text: "Involve school administration and counselors", traits: ["systematic", "professional"] },
      { id: "D", text: "Share success stories of educated women", traits: ["inspiring", "strategic"] }
    ]
  },
  {
    id: "arts_045",
    scenario: "Students are more interested in their phones than your class. How do you engage them?",
    options: [
      { id: "A", text: "Integrate technology into your lessons", traits: ["adaptive", "modern"] },
      { id: "B", text: "Create interactive, discussion-based sessions", traits: ["engaging", "social"] },
      { id: "C", text: "Connect lessons to real-world applications", traits: ["practical", "relevant"] },
      { id: "D", text: "Establish clear phone-free learning norms", traits: ["structured", "disciplined"] }
    ]
  },
  {
    id: "arts_046",
    scenario: "You notice bullying among students in your class. What's your intervention approach?",
    options: [
      { id: "A", text: "Address it immediately and establish consequences", traits: ["decisive", "authoritative"] },
      { id: "B", text: "Conduct class discussions on empathy and respect", traits: ["educational", "preventive"] },
      { id: "C", text: "Counsel both the bully and victim separately", traits: ["understanding", "comprehensive"] },
      { id: "D", text: "Implement peer mediation and support systems", traits: ["collaborative", "sustainable"] }
    ]
  },
  {
    id: "arts_047",
    scenario: "A student's performance suddenly drops drastically. What's your first step?",
    options: [
      { id: "A", text: "Have a private, caring conversation with them", traits: ["empathetic", "concerned"] },
      { id: "B", text: "Contact parents to understand home situation", traits: ["thorough", "collaborative"] },
      { id: "C", text: "Refer to school counselor", traits: ["professional", "supportive"] },
      { id: "D", text: "Offer extra help and tutoring support", traits: ["practical", "dedicated"] }
    ]
  },
  {
    id: "arts_048",
    scenario: "You're asked to teach a subject you're not expert in. How do you prepare?",
    options: [
      { id: "A", text: "Study intensively to build knowledge", traits: ["dedicated", "hardworking"] },
      { id: "B", text: "Learn alongside students honestly", traits: ["humble", "authentic"] },
      { id: "C", text: "Seek mentorship from subject experts", traits: ["resourceful", "collaborative"] },
      { id: "D", text: "Focus on facilitating student discovery", traits: ["innovative", "student-centered"] }
    ]
  },
  {
    id: "arts_049",
    scenario: "Standardized testing is limiting your creative teaching. How do you balance?",
    options: [
      { id: "A", text: "Integrate creativity within test preparation", traits: ["creative", "practical"] },
      { id: "B", text: "Advocate for assessment reform", traits: ["activist", "principled"] },
      { id: "C", text: "Dedicate separate time for creative activities", traits: ["organized", "balanced"] },
      { id: "D", text: "Help students see connections beyond tests", traits: ["inspiring", "holistic"] }
    ]
  },
  {
    id: "arts_050",
    scenario: "A parent wants their child to be teacher's pet. How do you handle this?",
    options: [
      { id: "A", text: "Explain your equal treatment policy clearly", traits: ["fair", "principled"] },
      { id: "B", text: "Redirect focus to child's actual development", traits: ["professional", "redirecting"] },
      { id: "C", text: "Ignore the pressure and continue fairly", traits: ["steady", "unfazed"] },
      { id: "D", text: "Involve school administration if pressure continues", traits: ["systematic", "boundary-setting"] }
    ]
  },
  {
    id: "arts_051",
    scenario: "You discover a student cheating on an exam. What's your approach?",
    options: [
      { id: "A", text: "Address it privately with consequences", traits: ["fair", "discreet"] },
      { id: "B", text: "Understand why they felt need to cheat", traits: ["empathetic", "root-cause"] },
      { id: "C", text: "Use it as a teaching moment about integrity", traits: ["educational", "values-based"] },
      { id: "D", text: "Follow school policy strictly", traits: ["rule-following", "consistent"] }
    ]
  },
  {
    id: "arts_052",
    scenario: "Students from different backgrounds have conflicts in class. How do you build unity?",
    options: [
      { id: "A", text: "Create collaborative projects across groups", traits: ["strategic", "inclusive"] },
      { id: "B", text: "Celebrate diverse cultures in class activities", traits: ["cultural", "appreciative"] },
      { id: "C", text: "Facilitate open dialogues about differences", traits: ["communicative", "brave"] },
      { id: "D", text: "Model and teach conflict resolution skills", traits: ["educational", "practical"] }
    ]
  },
  {
    id: "arts_053",
    scenario: "A shy student has brilliant ideas but never speaks up. How do you encourage them?",
    options: [
      { id: "A", text: "Create written submission options", traits: ["accommodating", "understanding"] },
      { id: "B", text: "Start with small group discussions", traits: ["gradual", "supportive"] },
      { id: "C", text: "Privately encourage them before class", traits: ["caring", "personal"] },
      { id: "D", text: "Pair them with supportive classmates", traits: ["collaborative", "protective"] }
    ]
  },
  {
    id: "arts_054",
    scenario: "You're organizing a field trip but some students can't afford it. What do you do?",
    options: [
      { id: "A", text: "Arrange sponsorship or scholarships", traits: ["resourceful", "inclusive"] },
      { id: "B", text: "Modify trip to be affordable for all", traits: ["practical", "fair"] },
      { id: "C", text: "Create alternative meaningful experiences", traits: ["creative", "equitable"] },
      { id: "D", text: "Fundraise with student activities", traits: ["collaborative", "empowering"] }
    ]
  },
  {
    id: "arts_055",
    scenario: "A student questions information in your textbook with online research. Your response?",
    options: [
      { id: "A", text: "Praise critical thinking and explore together", traits: ["encouraging", "collaborative"] },
      { id: "B", text: "Teach about evaluating source reliability", traits: ["educational", "thorough"] },
      { id: "C", text: "Update lesson to include multiple perspectives", traits: ["flexible", "comprehensive"] },
      { id: "D", text: "Invite debate and discussion on the topic", traits: ["engaging", "democratic"] }
    ]
  },
  {
    id: "arts_056",
    scenario: "You're mentoring a first-generation college student unsure about higher education. Your guidance?",
    options: [
      { id: "A", text: "Share detailed information about opportunities", traits: ["informative", "helpful"] },
      { id: "B", text: "Connect them with successful first-gen alumni", traits: ["resourceful", "inspiring"] },
      { id: "C", text: "Help with applications and financial aid", traits: ["practical", "supportive"] },
      { id: "D", text: "Include family in discussions about benefits", traits: ["inclusive", "comprehensive"] }
    ]
  },
  {
    id: "arts_057",
    scenario: "Students complain your class is too hard. How do you address this?",
    options: [
      { id: "A", text: "Differentiate instruction for various levels", traits: ["adaptive", "inclusive"] },
      { id: "B", text: "Explain the importance of challenging oneself", traits: ["motivating", "principled"] },
      { id: "C", text: "Provide additional support resources", traits: ["supportive", "practical"] },
      { id: "D", text: "Review and adjust pace if needed", traits: ["flexible", "responsive"] }
    ]
  },
  {
    id: "arts_058",
    scenario: "A talented student is considering teaching as career but family disapproves. Your advice?",
    options: [
      { id: "A", text: "Share the rewards and impact of teaching", traits: ["passionate", "inspiring"] },
      { id: "B", text: "Discuss diverse career paths in education", traits: ["informative", "practical"] },
      { id: "C", text: "Help them explore and follow their passion", traits: ["supportive", "empowering"] },
      { id: "D", text: "Suggest teaching alongside other pursuits", traits: ["balanced", "pragmatic"] }
    ]
  },
  {
    id: "arts_059",
    scenario: "Your school wants to stream students by ability. What's your position?",
    options: [
      { id: "A", text: "Support for targeted instruction efficiency", traits: ["practical", "systematic"] },
      { id: "B", text: "Oppose for risking fixed mindset development", traits: ["principled", "research-based"] },
      { id: "C", text: "Suggest flexible grouping instead", traits: ["balanced", "innovative"] },
      { id: "D", text: "Request more data on outcomes before deciding", traits: ["evidence-based", "cautious"] }
    ]
  },
  {
    id: "arts_060",
    scenario: "A student shares that they want to become an artist but fear failure. Your response?",
    options: [
      { id: "A", text: "Discuss how failure is part of artistic growth", traits: ["wise", "encouraging"] },
      { id: "B", text: "Help them create a practical development plan", traits: ["practical", "supportive"] },
      { id: "C", text: "Share stories of successful artists' journeys", traits: ["inspiring", "relatable"] },
      { id: "D", text: "Encourage pursuing art alongside backup skills", traits: ["pragmatic", "balanced"] }
    ]
  },

  // Media/communication (61-80)
  {
    id: "arts_061",
    scenario: "You're reporting on a sensitive story about victims of crime. How do you approach it?",
    options: [
      { id: "A", text: "Prioritize victims' privacy and consent", traits: ["ethical", "empathetic"] },
      { id: "B", text: "Focus on systemic issues, not individuals", traits: ["analytical", "responsible"] },
      { id: "C", text: "Give victims platform to share their story", traits: ["empowering", "trusting"] },
      { id: "D", text: "Balance public interest with sensitivity", traits: ["balanced", "professional"] }
    ]
  },
  {
    id: "arts_062",
    scenario: "Your editor wants a sensationalized headline. You disagree. What do you do?",
    options: [
      { id: "A", text: "Propose an equally compelling but accurate alternative", traits: ["creative", "principled"] },
      { id: "B", text: "Explain why accuracy matters more", traits: ["ethical", "persuasive"] },
      { id: "C", text: "Comply but ensure story is balanced", traits: ["pragmatic", "compromising"] },
      { id: "D", text: "Refuse and escalate if necessary", traits: ["principled", "courageous"] }
    ]
  },
  {
    id: "arts_063",
    scenario: "You have exclusive information about corruption but incomplete evidence. What do you do?",
    options: [
      { id: "A", text: "Continue investigating until evidence is solid", traits: ["thorough", "patient"] },
      { id: "B", text: "Publish what you have with clear caveats", traits: ["transparent", "urgent"] },
      { id: "C", text: "Consult with legal and editorial teams", traits: ["professional", "careful"] },
      { id: "D", text: "Seek additional sources to corroborate", traits: ["diligent", "responsible"] }
    ]
  },
  {
    id: "arts_064",
    scenario: "A powerful person offers you exclusive access in exchange for favorable coverage. Your response?",
    options: [
      { id: "A", text: "Decline - editorial independence is paramount", traits: ["principled", "independent"] },
      { id: "B", text: "Accept access but maintain objective reporting", traits: ["confident", "professional"] },
      { id: "C", text: "Negotiate terms that preserve integrity", traits: ["diplomatic", "strategic"] },
      { id: "D", text: "Report the offer itself as news", traits: ["bold", "transparent"] }
    ]
  },
  {
    id: "arts_065",
    scenario: "Social media spreads misinformation about a topic you're covering. Your action?",
    options: [
      { id: "A", text: "Create clear fact-check content immediately", traits: ["responsible", "urgent"] },
      { id: "B", text: "Investigate the source and expose it", traits: ["investigative", "thorough"] },
      { id: "C", text: "Engage directly with audiences spreading it", traits: ["communicative", "proactive"] },
      { id: "D", text: "Partner with platforms for corrections", traits: ["collaborative", "systemic"] }
    ]
  },
  {
    id: "arts_066",
    scenario: "You're creating content for a brand but their product doesn't match claims. What do you do?",
    options: [
      { id: "A", text: "Refuse the project on ethical grounds", traits: ["principled", "honest"] },
      { id: "B", text: "Modify content to be truthful", traits: ["creative", "ethical"] },
      { id: "C", text: "Advise the brand to improve their product", traits: ["constructive", "bold"] },
      { id: "D", text: "Add disclosures and caveats", traits: ["transparent", "compliant"] }
    ]
  },
  {
    id: "arts_067",
    scenario: "Your documentary subject changes their mind about participation after filming. Your response?",
    options: [
      { id: "A", text: "Respect their decision and don't use footage", traits: ["ethical", "respectful"] },
      { id: "B", text: "Discuss concerns and find compromise", traits: ["diplomatic", "understanding"] },
      { id: "C", text: "Explain the footage's importance sensitively", traits: ["persuasive", "professional"] },
      { id: "D", text: "Offer anonymity options", traits: ["creative", "accommodating"] }
    ]
  },
  {
    id: "arts_068",
    scenario: "You're interviewing someone who becomes emotional. How do you handle it?",
    options: [
      { id: "A", text: "Pause and offer support before continuing", traits: ["empathetic", "kind"] },
      { id: "B", text: "Continue gently - emotions are authentic", traits: ["professional", "authentic"] },
      { id: "C", text: "Give them choice to stop or continue", traits: ["respectful", "empowering"] },
      { id: "D", text: "Move to less sensitive topics", traits: ["adaptive", "considerate"] }
    ]
  },
  {
    id: "arts_069",
    scenario: "Your news organization is cutting costs by reducing original reporting. Your stance?",
    options: [
      { id: "A", text: "Advocate strongly for quality journalism", traits: ["passionate", "principled"] },
      { id: "B", text: "Propose cost-effective alternatives", traits: ["practical", "solution-oriented"] },
      { id: "C", text: "Do more with less, maintain standards", traits: ["adaptable", "dedicated"] },
      { id: "D", text: "Consider moving to organization that values journalism", traits: ["principled", "career-minded"] }
    ]
  },
  {
    id: "arts_070",
    scenario: "You're creating a podcast. What format appeals to you most?",
    options: [
      { id: "A", text: "In-depth investigative series", traits: ["thorough", "investigative"] },
      { id: "B", text: "Casual conversational interviews", traits: ["social", "engaging"] },
      { id: "C", text: "Educational explainer content", traits: ["informative", "helpful"] },
      { id: "D", text: "Storytelling and narrative journalism", traits: ["creative", "compelling"] }
    ]
  },
  {
    id: "arts_071",
    scenario: "A viewer complains your content is biased. How do you respond?",
    options: [
      { id: "A", text: "Review content objectively and respond thoughtfully", traits: ["open-minded", "professional"] },
      { id: "B", text: "Explain perspective while acknowledging theirs", traits: ["diplomatic", "fair"] },
      { id: "C", text: "Invite them to share their perspective", traits: ["inclusive", "engaging"] },
      { id: "D", text: "Stand by your work if it's factual", traits: ["confident", "principled"] }
    ]
  },
  {
    id: "arts_072",
    scenario: "You're assigned to cover your friend's company. How do you maintain objectivity?",
    options: [
      { id: "A", text: "Disclose relationship and recuse yourself", traits: ["ethical", "transparent"] },
      { id: "B", text: "Be extra rigorous in fact-checking", traits: ["professional", "thorough"] },
      { id: "C", text: "Have colleagues review your work", traits: ["collaborative", "accountable"] },
      { id: "D", text: "Disclose relationship in the content", traits: ["transparent", "honest"] }
    ]
  },
  {
    id: "arts_073",
    scenario: "Your content goes viral for the wrong reasons. People misinterpret your message. Action?",
    options: [
      { id: "A", text: "Clarify your intent publicly and clearly", traits: ["communicative", "responsible"] },
      { id: "B", text: "Learn from the miscommunication for future", traits: ["reflective", "growth-minded"] },
      { id: "C", text: "Engage with critics constructively", traits: ["brave", "open"] },
      { id: "D", text: "Let it settle and move on", traits: ["pragmatic", "resilient"] }
    ]
  },
  {
    id: "arts_074",
    scenario: "A PR agency offers you a sponsored trip for coverage. Your decision?",
    options: [
      { id: "A", text: "Decline to maintain independence", traits: ["principled", "independent"] },
      { id: "B", text: "Accept but disclose sponsorship clearly", traits: ["transparent", "practical"] },
      { id: "C", text: "Accept and ensure balanced coverage", traits: ["confident", "professional"] },
      { id: "D", text: "Pay own way to maintain complete independence", traits: ["principled", "committed"] }
    ]
  },
  {
    id: "arts_075",
    scenario: "You're covering a protest and police ask you to stop filming. What do you do?",
    options: [
      { id: "A", text: "Assert your press rights and continue", traits: ["brave", "principled"] },
      { id: "B", text: "Comply but document the restriction", traits: ["strategic", "observant"] },
      { id: "C", text: "Negotiate and explain your role", traits: ["diplomatic", "communicative"] },
      { id: "D", text: "Find alternative vantage point", traits: ["resourceful", "persistent"] }
    ]
  },
  {
    id: "arts_076",
    scenario: "Your audience research shows people prefer entertainment over hard news. Your response?",
    options: [
      { id: "A", text: "Find ways to make important news engaging", traits: ["creative", "committed"] },
      { id: "B", text: "Balance content mix for sustainability", traits: ["pragmatic", "strategic"] },
      { id: "C", text: "Focus on hard news regardless", traits: ["principled", "mission-driven"] },
      { id: "D", text: "Create separate channels for different content", traits: ["organized", "audience-focused"] }
    ]
  },
  {
    id: "arts_077",
    scenario: "A whistleblower offers sensitive documents. How do you proceed?",
    options: [
      { id: "A", text: "Verify authenticity before anything else", traits: ["careful", "thorough"] },
      { id: "B", text: "Protect source identity absolutely", traits: ["ethical", "protective"] },
      { id: "C", text: "Consult legal counsel about risks", traits: ["professional", "cautious"] },
      { id: "D", text: "Assess public interest value carefully", traits: ["thoughtful", "responsible"] }
    ]
  },
  {
    id: "arts_078",
    scenario: "You're building your personal brand as a journalist. What's your focus?",
    options: [
      { id: "A", text: "Expertise in a specific beat", traits: ["focused", "specialist"] },
      { id: "B", text: "Engaging personality and storytelling", traits: ["charismatic", "creative"] },
      { id: "C", text: "Reputation for accuracy and fairness", traits: ["principled", "trustworthy"] },
      { id: "D", text: "Breaking news and exclusives", traits: ["ambitious", "competitive"] }
    ]
  },
  {
    id: "arts_079",
    scenario: "AI can now write basic news articles. How do you see your role evolving?",
    options: [
      { id: "A", text: "Focus on analysis and investigation AI can't do", traits: ["strategic", "valuable"] },
      { id: "B", text: "Add human perspective and context", traits: ["authentic", "irreplaceable"] },
      { id: "C", text: "Learn to use AI as a tool", traits: ["adaptable", "tech-savvy"] },
      { id: "D", text: "Move toward multimedia storytelling", traits: ["innovative", "evolving"] }
    ]
  },
  {
    id: "arts_080",
    scenario: "You're offered a corporate communications role with much higher pay. What do you consider?",
    options: [
      { id: "A", text: "Stay in journalism for its mission", traits: ["passionate", "principled"] },
      { id: "B", text: "Consider the opportunity objectively", traits: ["pragmatic", "open-minded"] },
      { id: "C", text: "Explore hybrid options or freelancing", traits: ["creative", "balanced"] },
      { id: "D", text: "See if corporate values align with yours", traits: ["thoughtful", "ethical"] }
    ]
  },

  // Career choice situations (81-100)
  {
    id: "arts_081",
    scenario: "You're choosing between a stable government job and pursuing your passion for writing. What matters most?",
    options: [
      { id: "A", text: "Following my passion despite uncertainty", traits: ["passionate", "risk-taking"] },
      { id: "B", text: "Security to support myself and family", traits: ["responsible", "practical"] },
      { id: "C", text: "Finding a way to do both", traits: ["balanced", "creative"] },
      { id: "D", text: "Building skills in stable job for future transition", traits: ["strategic", "patient"] }
    ]
  },
  {
    id: "arts_082",
    scenario: "A career in fine arts versus applied design. Which attracts you more?",
    options: [
      { id: "A", text: "Fine arts - pure creative expression", traits: ["artistic", "expressive"] },
      { id: "B", text: "Applied design - creativity with purpose", traits: ["practical", "functional"] },
      { id: "C", text: "Both - I can't choose one", traits: ["versatile", "multi-talented"] },
      { id: "D", text: "Whichever has better career prospects", traits: ["pragmatic", "career-focused"] }
    ]
  },
  {
    id: "arts_083",
    scenario: "You're offered an internship abroad in your field but it's unpaid. What do you decide?",
    options: [
      { id: "A", text: "Take it - the experience is invaluable", traits: ["ambitious", "growth-oriented"] },
      { id: "B", text: "Decline - need financial sustainability", traits: ["practical", "responsible"] },
      { id: "C", text: "Negotiate for some support", traits: ["assertive", "realistic"] },
      { id: "D", text: "Find local alternatives with pay", traits: ["practical", "resourceful"] }
    ]
  },
  {
    id: "arts_084",
    scenario: "Your family expects you to take over their business, but you want a career in psychology. Your approach?",
    options: [
      { id: "A", text: "Pursue psychology and explain your passion", traits: ["determined", "communicative"] },
      { id: "B", text: "Try to combine both somehow", traits: ["creative", "accommodating"] },
      { id: "C", text: "Fulfill family duty first, pursue later", traits: ["dutiful", "patient"] },
      { id: "D", text: "Have an honest family discussion about expectations", traits: ["mature", "diplomatic"] }
    ]
  },
  {
    id: "arts_085",
    scenario: "You're excellent at multiple arts - music, writing, and visual art. How do you choose a career focus?",
    options: [
      { id: "A", text: "Follow what brings most joy", traits: ["passionate", "intuitive"] },
      { id: "B", text: "Research market demand and opportunities", traits: ["practical", "strategic"] },
      { id: "C", text: "Create a career that combines all", traits: ["innovative", "ambitious"] },
      { id: "D", text: "Try each professionally before deciding", traits: ["experimental", "thorough"] }
    ]
  },
  {
    id: "arts_086",
    scenario: "A career counselor suggests you're better suited for business than arts. Your reaction?",
    options: [
      { id: "A", text: "Consider their input but trust yourself", traits: ["confident", "self-aware"] },
      { id: "B", text: "Explore business aspects of arts careers", traits: ["open-minded", "strategic"] },
      { id: "C", text: "Seek second opinions from arts professionals", traits: ["thorough", "cautious"] },
      { id: "D", text: "Prove them wrong through your work", traits: ["determined", "motivated"] }
    ]
  },
  {
    id: "arts_087",
    scenario: "You're considering a career in heritage conservation. What aspect excites you most?",
    options: [
      { id: "A", text: "Preserving cultural artifacts and sites", traits: ["preservationist", "cultural"] },
      { id: "B", text: "Research and documentation work", traits: ["academic", "detailed"] },
      { id: "C", text: "Community education about heritage", traits: ["educational", "social"] },
      { id: "D", text: "Policy and advocacy for protection", traits: ["activist", "systemic"] }
    ]
  },
  {
    id: "arts_088",
    scenario: "You want to be an actor but also value financial stability. What's your plan?",
    options: [
      { id: "A", text: "Pursue acting fully, trust it will work out", traits: ["optimistic", "committed"] },
      { id: "B", text: "Keep a day job while building acting career", traits: ["practical", "balanced"] },
      { id: "C", text: "Study related stable fields like communications", traits: ["strategic", "backup-minded"] },
      { id: "D", text: "Set a timeline to evaluate and adjust", traits: ["organized", "realistic"] }
    ]
  },
  {
    id: "arts_089",
    scenario: "You're passionate about human rights work but opportunities are limited and low-paying. What do you do?",
    options: [
      { id: "A", text: "Pursue it anyway - money isn't everything", traits: ["principled", "passionate"] },
      { id: "B", text: "Find related corporate roles like CSR", traits: ["strategic", "practical"] },
      { id: "C", text: "Start as volunteer while building career", traits: ["gradual", "committed"] },
      { id: "D", text: "Create your own initiative or organization", traits: ["entrepreneurial", "ambitious"] }
    ]
  },
  {
    id: "arts_090",
    scenario: "You're choosing a master's program. What's your primary consideration?",
    options: [
      { id: "A", text: "Program reputation and faculty", traits: ["quality-focused", "academic"] },
      { id: "B", text: "Career outcomes and placement", traits: ["practical", "outcome-oriented"] },
      { id: "C", text: "Research opportunities and specialization", traits: ["scholarly", "focused"] },
      { id: "D", text: "Location and life experience", traits: ["experiential", "holistic"] }
    ]
  },
  {
    id: "arts_091",
    scenario: "A career in therapy and counseling interests you. What draws you to it?",
    options: [
      { id: "A", text: "Helping people heal and grow", traits: ["empathetic", "helping"] },
      { id: "B", text: "Understanding human psychology", traits: ["curious", "analytical"] },
      { id: "C", text: "Making a direct personal impact", traits: ["impactful", "personal"] },
      { id: "D", text: "Flexible, relationship-based work", traits: ["independent", "relational"] }
    ]
  },
  {
    id: "arts_092",
    scenario: "You want to work in the development sector. Which role suits you best?",
    options: [
      { id: "A", text: "Field work directly with communities", traits: ["hands-on", "community-focused"] },
      { id: "B", text: "Research and policy analysis", traits: ["analytical", "strategic"] },
      { id: "C", text: "Program management and coordination", traits: ["organized", "leadership"] },
      { id: "D", text: "Fundraising and donor relations", traits: ["communicative", "persuasive"] }
    ]
  },
  {
    id: "arts_093",
    scenario: "You're drawn to both law and social work. How might you combine them?",
    options: [
      { id: "A", text: "Human rights law and advocacy", traits: ["activist", "legal"] },
      { id: "B", text: "Legal aid for underserved communities", traits: ["service-oriented", "practical"] },
      { id: "C", text: "Policy work and legislative reform", traits: ["systemic", "political"] },
      { id: "D", text: "Social work with legal specialization", traits: ["hybrid", "specialized"] }
    ]
  },
  {
    id: "arts_094",
    scenario: "You want to teach but also crave variety. What type of teaching role would suit you?",
    options: [
      { id: "A", text: "Multiple subjects across grades", traits: ["versatile", "adaptable"] },
      { id: "B", text: "Training and corporate education", traits: ["professional", "varied"] },
      { id: "C", text: "Online teaching to global students", traits: ["tech-savvy", "international"] },
      { id: "D", text: "Educational content creation", traits: ["creative", "scalable"] }
    ]
  },
  {
    id: "arts_095",
    scenario: "You're considering a career in political science. What area interests you most?",
    options: [
      { id: "A", text: "Electoral politics and campaigns", traits: ["active", "political"] },
      { id: "B", text: "Policy research and think tanks", traits: ["analytical", "academic"] },
      { id: "C", text: "International relations and diplomacy", traits: ["global", "diplomatic"] },
      { id: "D", text: "Public administration and governance", traits: ["administrative", "civic"] }
    ]
  },
  {
    id: "arts_096",
    scenario: "You want to start your own venture in the arts. What would it be?",
    options: [
      { id: "A", text: "Creative agency or studio", traits: ["entrepreneurial", "creative"] },
      { id: "B", text: "Cultural events and festival organization", traits: ["social", "organizing"] },
      { id: "C", text: "Art education center or school", traits: ["educational", "foundational"] },
      { id: "D", text: "Social enterprise using arts for change", traits: ["impactful", "social"] }
    ]
  },
  {
    id: "arts_097",
    scenario: "You're at a career crossroads - continue current path or completely change direction. What guides your decision?",
    options: [
      { id: "A", text: "What makes me feel most alive", traits: ["passionate", "intuitive"] },
      { id: "B", text: "Long-term financial and career security", traits: ["practical", "forward-thinking"] },
      { id: "C", text: "Where I can make the most difference", traits: ["impactful", "purpose-driven"] },
      { id: "D", text: "Advice from mentors and loved ones", traits: ["collaborative", "community-minded"] }
    ]
  },
  {
    id: "arts_098",
    scenario: "You love languages and culture. What career path would you explore?",
    options: [
      { id: "A", text: "Translation and interpretation", traits: ["linguistic", "bridging"] },
      { id: "B", text: "Cultural diplomacy and exchange programs", traits: ["diplomatic", "international"] },
      { id: "C", text: "Language teaching and curriculum development", traits: ["educational", "systematic"] },
      { id: "D", text: "Travel writing and cultural documentation", traits: ["adventurous", "creative"] }
    ]
  },
  {
    id: "arts_099",
    scenario: "You want to work with children and youth. What setting appeals to you?",
    options: [
      { id: "A", text: "Formal education in schools", traits: ["structured", "educational"] },
      { id: "B", text: "Youth development organizations", traits: ["developmental", "empowering"] },
      { id: "C", text: "Child welfare and protection", traits: ["protective", "advocacy"] },
      { id: "D", text: "Children's media and entertainment", traits: ["creative", "entertaining"] }
    ]
  },
  {
    id: "arts_100",
    scenario: "Reflecting on your arts education, what do you value most about it?",
    options: [
      { id: "A", text: "Developing creativity and expression", traits: ["creative", "expressive"] },
      { id: "B", text: "Understanding human society and culture", traits: ["analytical", "cultural"] },
      { id: "C", text: "Building empathy and perspective-taking", traits: ["empathetic", "understanding"] },
      { id: "D", text: "Preparing to make positive social change", traits: ["activist", "purposeful"] }
    ]
  }
];
