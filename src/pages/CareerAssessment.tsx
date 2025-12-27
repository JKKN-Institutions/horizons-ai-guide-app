import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, RotateCcw, Share2, Sparkles, ArrowLeft, Lightbulb, Loader2, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { generateCareerAssessmentPDF } from './generateCareerAssessmentPDF';

interface CareerTip {
  emoji: string;
  title: string;
  description: string;
}
type Language = 'en' | 'ta';
type Screen = 'intro' | 'questions' | 'results';

interface Option {
  id: string;
  text: { en: string; ta: string };
  icon: string;
  scores: Record<string, number>;
}

interface Question {
  id: number;
  category: string;
  question: { en: string; ta: string };
  options: Option[];
}

interface Response {
  questionId: number;
  selectedOption: Option;
}

interface Result {
  career: string;
  score: number;
  percentage: number;
}

// Will reference careerClusters, defined later in the file

interface CareerCluster {
  name: { en: string; ta: string };
  icon: string;
  color: string;
  description: { en: string; ta: string };
  careers: string[];
  exams: string[];
  salary: string;
}

const questions: Question[] = [
  // APTITUDE (5)
  {
    id: 1,
    category: "aptitude",
    question: { 
      en: "Which activity comes most naturally to you?", 
      ta: "எந்த செயல்பாடு உங்களுக்கு இயல்பாக வருகிறது?" 
    },
    options: [
      { id: "A", text: { en: "Solving math problems", ta: "கணித கணக்குகள் தீர்ப்பது" }, icon: "🔢", scores: { healthcare: 0, technology: 3, business: 1, design: 0, science: 2, law: 0, education: 0, media: 0, agriculture: 0, defence: 0 } },
      { id: "B", text: { en: "Writing stories or essays", ta: "கதைகள் அல்லது கட்டுரைகள் எழுதுவது" }, icon: "📝", scores: { healthcare: 0, technology: 0, business: 0, design: 0, science: 0, law: 1, education: 2, media: 3, agriculture: 0, defence: 0 } },
      { id: "C", text: { en: "Drawing or designing", ta: "வரைதல் அல்லது வடிவமைப்பது" }, icon: "🎨", scores: { healthcare: 0, technology: 0, business: 0, design: 3, science: 0, law: 0, education: 0, media: 2, agriculture: 0, defence: 0 } },
      { id: "D", text: { en: "Helping and caring for others", ta: "மற்றவர்களுக்கு உதவுவது மற்றும் கவனிப்பது" }, icon: "🤝", scores: { healthcare: 3, technology: 0, business: 0, design: 0, science: 0, law: 0, education: 2, media: 0, agriculture: 0, defence: 0 } }
    ]
  },
  {
    id: 2,
    category: "aptitude",
    question: { 
      en: "Your strongest subject in school?", 
      ta: "பள்ளியில் உங்கள் வலிமையான பாடம்?" 
    },
    options: [
      { id: "A", text: { en: "Mathematics", ta: "கணிதம்" }, icon: "📐", scores: { healthcare: 0, technology: 3, business: 2, design: 0, science: 2, law: 0, education: 0, media: 0, agriculture: 0, defence: 0 } },
      { id: "B", text: { en: "Biology", ta: "உயிரியல்" }, icon: "🧬", scores: { healthcare: 3, technology: 0, business: 0, design: 0, science: 2, law: 0, education: 0, media: 0, agriculture: 2, defence: 0 } },
      { id: "C", text: { en: "Languages", ta: "மொழிகள்" }, icon: "📚", scores: { healthcare: 0, technology: 0, business: 0, design: 0, science: 0, law: 2, education: 2, media: 3, agriculture: 0, defence: 0 } },
      { id: "D", text: { en: "Social Studies", ta: "சமூக அறிவியல்" }, icon: "🌍", scores: { healthcare: 0, technology: 0, business: 0, design: 0, science: 0, law: 3, education: 2, media: 1, agriculture: 0, defence: 0 } }
    ]
  },
  {
    id: 3,
    category: "aptitude",
    question: { 
      en: "When solving problems, you prefer:", 
      ta: "பிரச்சனைகளை தீர்க்கும்போது நீங்கள் விரும்புவது:" 
    },
    options: [
      { id: "A", text: { en: "Logical step-by-step approach", ta: "படிப்படியான தர்க்க அணுகுமுறை" }, icon: "🧠", scores: { healthcare: 0, technology: 3, business: 1, design: 0, science: 3, law: 1, education: 0, media: 0, agriculture: 0, defence: 0 } },
      { id: "B", text: { en: "Creative brainstorming", ta: "படைப்பாற்றல் யோசனை" }, icon: "💡", scores: { healthcare: 0, technology: 0, business: 1, design: 3, science: 0, law: 0, education: 0, media: 2, agriculture: 0, defence: 0 } },
      { id: "C", text: { en: "Discussing with others", ta: "மற்றவர்களுடன் விவாதிப்பது" }, icon: "👥", scores: { healthcare: 1, technology: 0, business: 2, design: 0, science: 0, law: 1, education: 3, media: 0, agriculture: 0, defence: 0 } },
      { id: "D", text: { en: "Hands-on experimentation", ta: "நேரடி சோதனை செய்வது" }, icon: "🔧", scores: { healthcare: 2, technology: 1, business: 0, design: 1, science: 3, law: 0, education: 0, media: 0, agriculture: 2, defence: 0 } }
    ]
  },
  {
    id: 4,
    category: "aptitude",
    question: { 
      en: "You remember things best through:", 
      ta: "நீங்கள் எதன் மூலம் சிறப்பாக நினைவில் வைக்கிறீர்கள்?" 
    },
    options: [
      { id: "A", text: { en: "Numbers and formulas", ta: "எண்கள் மற்றும் சூத்திரங்கள்" }, icon: "🔢", scores: { healthcare: 0, technology: 3, business: 1, design: 0, science: 2, law: 0, education: 0, media: 0, agriculture: 0, defence: 0 } },
      { id: "B", text: { en: "Pictures and diagrams", ta: "படங்கள் மற்றும் வரைபடங்கள்" }, icon: "🖼️", scores: { healthcare: 1, technology: 0, business: 0, design: 3, science: 1, law: 0, education: 0, media: 1, agriculture: 0, defence: 0 } },
      { id: "C", text: { en: "Stories and examples", ta: "கதைகள் மற்றும் உதாரணங்கள்" }, icon: "📖", scores: { healthcare: 0, technology: 0, business: 0, design: 0, science: 0, law: 2, education: 3, media: 2, agriculture: 0, defence: 0 } },
      { id: "D", text: { en: "Doing and practicing", ta: "செய்து பயிற்சி செய்வது" }, icon: "✋", scores: { healthcare: 2, technology: 1, business: 0, design: 1, science: 1, law: 0, education: 0, media: 0, agriculture: 1, defence: 3 } }
    ]
  },
  {
    id: 5,
    category: "aptitude",
    question: { 
      en: "In group projects, you naturally:", 
      ta: "குழு திட்டங்களில் நீங்கள் இயல்பாக:" 
    },
    options: [
      { id: "A", text: { en: "Do the calculations and analysis", ta: "கணக்கீடுகள் மற்றும் பகுப்பாய்வு செய்வது" }, icon: "🧮", scores: { healthcare: 0, technology: 3, business: 2, design: 0, science: 2, law: 0, education: 0, media: 0, agriculture: 0, defence: 0 } },
      { id: "B", text: { en: "Present to the group", ta: "குழுவிற்கு வழங்குவது" }, icon: "🎤", scores: { healthcare: 0, technology: 0, business: 2, design: 0, science: 0, law: 2, education: 1, media: 3, agriculture: 0, defence: 0 } },
      { id: "C", text: { en: "Create visuals and designs", ta: "காட்சிகள் மற்றும் வடிவமைப்புகள் உருவாக்குவது" }, icon: "🎨", scores: { healthcare: 0, technology: 0, business: 0, design: 3, science: 0, law: 0, education: 0, media: 2, agriculture: 0, defence: 0 } },
      { id: "D", text: { en: "Organize and plan everything", ta: "எல்லாவற்றையும் ஒழுங்கமைத்து திட்டமிடுவது" }, icon: "📋", scores: { healthcare: 0, technology: 0, business: 3, design: 0, science: 0, law: 2, education: 0, media: 0, agriculture: 0, defence: 1 } }
    ]
  },
  // INTEREST (10)
  {
    id: 6,
    category: "interest",
    question: { 
      en: "Which work environment excites you most?", 
      ta: "எந்த பணிச்சூழல் உங்களை மிகவும் உற்சாகப்படுத்துகிறது?" 
    },
    options: [
      { id: "A", text: { en: "Laboratory / Research center", ta: "ஆய்வகம் / ஆராய்ச்சி மையம்" }, icon: "🔬", scores: { healthcare: 1, technology: 0, business: 0, design: 0, science: 3, law: 0, education: 0, media: 0, agriculture: 1, defence: 0 } },
      { id: "B", text: { en: "Tech office / Startup", ta: "தொழில்நுட்ப அலுவலகம் / ஸ்டார்ட்அப்" }, icon: "💻", scores: { healthcare: 0, technology: 3, business: 2, design: 1, science: 0, law: 0, education: 0, media: 0, agriculture: 0, defence: 0 } },
      { id: "C", text: { en: "Hospital / Clinic", ta: "மருத்துவமனை / மருத்துவ நிலையம்" }, icon: "🏥", scores: { healthcare: 3, technology: 0, business: 0, design: 0, science: 1, law: 0, education: 0, media: 0, agriculture: 0, defence: 0 } },
      { id: "D", text: { en: "Outdoors / Field work", ta: "வெளிப்புறம் / கள வேலை" }, icon: "🌳", scores: { healthcare: 0, technology: 0, business: 0, design: 0, science: 1, law: 0, education: 0, media: 0, agriculture: 3, defence: 2 } }
    ]
  },
  {
    id: 7,
    category: "interest",
    question: { 
      en: "If you started a YouTube channel, it would be about:", 
      ta: "நீங்கள் YouTube சேனல் தொடங்கினால், அது பற்றியது:" 
    },
    options: [
      { id: "A", text: { en: "Science experiments", ta: "அறிவியல் சோதனைகள்" }, icon: "🧪", scores: { healthcare: 0, technology: 1, business: 0, design: 0, science: 3, law: 0, education: 2, media: 1, agriculture: 0, defence: 0 } },
      { id: "B", text: { en: "Tech reviews & coding", ta: "தொழில்நுட்ப மதிப்புரைகள் & கோடிங்" }, icon: "📱", scores: { healthcare: 0, technology: 3, business: 1, design: 0, science: 0, law: 0, education: 0, media: 2, agriculture: 0, defence: 0 } },
      { id: "C", text: { en: "Health & fitness tips", ta: "ஆரோக்கியம் & உடற்பயிற்சி குறிப்புகள்" }, icon: "💪", scores: { healthcare: 3, technology: 0, business: 0, design: 0, science: 0, law: 0, education: 1, media: 1, agriculture: 0, defence: 1 } },
      { id: "D", text: { en: "Art, DIY & creative projects", ta: "கலை, DIY & படைப்பாற்றல் திட்டங்கள்" }, icon: "🎨", scores: { healthcare: 0, technology: 0, business: 0, design: 3, science: 0, law: 0, education: 0, media: 2, agriculture: 0, defence: 0 } }
    ]
  },
  {
    id: 8,
    category: "interest",
    question: { 
      en: "Your ideal weekend activity:", 
      ta: "உங்கள் சிறந்த வார இறுதி செயல்பாடு:" 
    },
    options: [
      { id: "A", text: { en: "Reading books / Learning online", ta: "புத்தகங்கள் படிப்பது / ஆன்லைனில் கற்றுக்கொள்வது" }, icon: "📚", scores: { healthcare: 0, technology: 1, business: 0, design: 0, science: 2, law: 1, education: 3, media: 0, agriculture: 0, defence: 0 } },
      { id: "B", text: { en: "Coding / Gaming", ta: "கோடிங் / கேமிங்" }, icon: "🎮", scores: { healthcare: 0, technology: 3, business: 0, design: 1, science: 0, law: 0, education: 0, media: 0, agriculture: 0, defence: 0 } },
      { id: "C", text: { en: "Volunteering / Social work", ta: "தன்னார்வ பணி / சமூக சேவை" }, icon: "🤝", scores: { healthcare: 3, technology: 0, business: 0, design: 0, science: 0, law: 1, education: 2, media: 0, agriculture: 0, defence: 0 } },
      { id: "D", text: { en: "Creating art / music", ta: "கலை / இசை உருவாக்குவது" }, icon: "🎵", scores: { healthcare: 0, technology: 0, business: 0, design: 3, science: 0, law: 0, education: 0, media: 2, agriculture: 0, defence: 0 } }
    ]
  },
  {
    id: 9,
    category: "interest",
    question: { 
      en: "Which career sounds most exciting to you?", 
      ta: "எந்த தொழில் உங்களுக்கு மிகவும் சுவாரஸ்யமாக தெரிகிறது?" 
    },
    options: [
      { id: "A", text: { en: "Doctor / Nurse / Pharmacist", ta: "மருத்துவர் / நர்ஸ் / மருந்தாளுநர்" }, icon: "👨‍⚕️", scores: { healthcare: 3, technology: 0, business: 0, design: 0, science: 1, law: 0, education: 0, media: 0, agriculture: 0, defence: 0 } },
      { id: "B", text: { en: "Software Engineer / Data Scientist", ta: "மென்பொருள் பொறியாளர் / தரவு விஞ்ஞானி" }, icon: "👨‍💻", scores: { healthcare: 0, technology: 3, business: 0, design: 0, science: 1, law: 0, education: 0, media: 0, agriculture: 0, defence: 0 } },
      { id: "C", text: { en: "Business Owner / CA / Manager", ta: "வணிக உரிமையாளர் / CA / மேலாளர்" }, icon: "👔", scores: { healthcare: 0, technology: 0, business: 3, design: 0, science: 0, law: 1, education: 0, media: 0, agriculture: 0, defence: 0 } },
      { id: "D", text: { en: "Designer / Artist / Architect", ta: "வடிவமைப்பாளர் / கலைஞர் / கட்டிடக்கலை நிபுணர்" }, icon: "👨‍🎨", scores: { healthcare: 0, technology: 0, business: 0, design: 3, science: 0, law: 0, education: 0, media: 1, agriculture: 0, defence: 0 } }
    ]
  },
  {
    id: 10,
    category: "interest",
    question: { 
      en: "What motivates you the most?", 
      ta: "உங்களை மிகவும் ஊக்குவிப்பது எது?" 
    },
    options: [
      { id: "A", text: { en: "Money & financial security", ta: "பணம் & நிதி பாதுகாப்பு" }, icon: "💰", scores: { healthcare: 1, technology: 2, business: 3, design: 0, science: 0, law: 1, education: 0, media: 0, agriculture: 0, defence: 0 } },
      { id: "B", text: { en: "Helping society & people", ta: "சமூகத்திற்கும் மக்களுக்கும் உதவுவது" }, icon: "❤️", scores: { healthcare: 3, technology: 0, business: 0, design: 0, science: 0, law: 1, education: 2, media: 0, agriculture: 1, defence: 0 } },
      { id: "C", text: { en: "Fame & recognition", ta: "புகழ் & அங்கீகாரம்" }, icon: "⭐", scores: { healthcare: 0, technology: 0, business: 1, design: 2, science: 0, law: 0, education: 0, media: 3, agriculture: 0, defence: 0 } },
      { id: "D", text: { en: "Learning & discovering new things", ta: "புதியவற்றை கற்றுக்கொள்வது & கண்டுபிடிப்பது" }, icon: "🎓", scores: { healthcare: 0, technology: 1, business: 0, design: 0, science: 3, law: 0, education: 2, media: 0, agriculture: 0, defence: 0 } }
    ]
  },
  {
    id: 11,
    category: "interest",
    question: { 
      en: "Your favorite type of content to consume:", 
      ta: "நீங்கள் பார்க்க விரும்பும் உள்ளடக்க வகை:" 
    },
    options: [
      { id: "A", text: { en: "Documentaries & educational", ta: "ஆவணப்படங்கள் & கல்வி சார்ந்தவை" }, icon: "🎬", scores: { healthcare: 0, technology: 0, business: 0, design: 0, science: 3, law: 1, education: 2, media: 1, agriculture: 0, defence: 0 } },
      { id: "B", text: { en: "Medical / Crime dramas", ta: "மருத்துவ / குற்ற நாடகங்கள்" }, icon: "🏥", scores: { healthcare: 2, technology: 0, business: 0, design: 0, science: 0, law: 3, education: 0, media: 1, agriculture: 0, defence: 0 } },
      { id: "C", text: { en: "Business & startup stories", ta: "வணிகம் & ஸ்டார்ட்அப் கதைகள்" }, icon: "📈", scores: { healthcare: 0, technology: 1, business: 3, design: 0, science: 0, law: 0, education: 0, media: 1, agriculture: 0, defence: 0 } },
      { id: "D", text: { en: "Art, design & creative shows", ta: "கலை, வடிவமைப்பு & படைப்பாற்றல் நிகழ்ச்சிகள்" }, icon: "🎨", scores: { healthcare: 0, technology: 0, business: 0, design: 3, science: 0, law: 0, education: 0, media: 2, agriculture: 0, defence: 0 } }
    ]
  },
  {
    id: 12,
    category: "interest",
    question: { 
      en: "In school, you are known for:", 
      ta: "பள்ளியில் நீங்கள் எதற்கு அறியப்படுகிறீர்கள்?" 
    },
    options: [
      { id: "A", text: { en: "Getting top marks", ta: "அதிக மதிப்பெண்கள் பெறுவது" }, icon: "🏆", scores: { healthcare: 1, technology: 2, business: 0, design: 0, science: 3, law: 1, education: 0, media: 0, agriculture: 0, defence: 0 } },
      { id: "B", text: { en: "Helping classmates", ta: "வகுப்பு தோழர்களுக்கு உதவுவது" }, icon: "🤝", scores: { healthcare: 2, technology: 0, business: 0, design: 0, science: 0, law: 0, education: 3, media: 0, agriculture: 0, defence: 0 } },
      { id: "C", text: { en: "Creative projects & art", ta: "படைப்பாற்றல் திட்டங்கள் & கலை" }, icon: "🎨", scores: { healthcare: 0, technology: 0, business: 0, design: 3, science: 0, law: 0, education: 0, media: 2, agriculture: 0, defence: 0 } },
      { id: "D", text: { en: "Leading events & teams", ta: "நிகழ்வுகள் & குழுக்களை வழிநடத்துவது" }, icon: "👑", scores: { healthcare: 0, technology: 0, business: 3, design: 0, science: 0, law: 1, education: 0, media: 0, agriculture: 0, defence: 2 } }
    ]
  },
  {
    id: 13,
    category: "interest",
    question: { 
      en: "Which news topic interests you most?", 
      ta: "எந்த செய்தி தலைப்பு உங்களுக்கு மிகவும் ஆர்வமாக இருக்கிறது?" 
    },
    options: [
      { id: "A", text: { en: "Technology & startups", ta: "தொழில்நுட்பம் & ஸ்டார்ட்அப்கள்" }, icon: "🚀", scores: { healthcare: 0, technology: 3, business: 2, design: 0, science: 0, law: 0, education: 0, media: 0, agriculture: 0, defence: 0 } },
      { id: "B", text: { en: "Health & medical breakthroughs", ta: "ஆரோக்கியம் & மருத்துவ கண்டுபிடிப்புகள்" }, icon: "💊", scores: { healthcare: 3, technology: 0, business: 0, design: 0, science: 2, law: 0, education: 0, media: 0, agriculture: 0, defence: 0 } },
      { id: "C", text: { en: "Politics, law & governance", ta: "அரசியல், சட்டம் & ஆட்சி" }, icon: "⚖️", scores: { healthcare: 0, technology: 0, business: 0, design: 0, science: 0, law: 3, education: 0, media: 1, agriculture: 0, defence: 1 } },
      { id: "D", text: { en: "Environment & agriculture", ta: "சுற்றுச்சூழல் & விவசாயம்" }, icon: "🌿", scores: { healthcare: 0, technology: 0, business: 0, design: 0, science: 2, law: 0, education: 0, media: 0, agriculture: 3, defence: 0 } }
    ]
  },
  {
    id: 14,
    category: "interest",
    question: { 
      en: "You prefer working:", 
      ta: "நீங்கள் வேலை செய்ய விரும்புவது:" 
    },
    options: [
      { id: "A", text: { en: "Alone with deep focus", ta: "ஆழ்ந்த கவனத்துடன் தனியாக" }, icon: "🎯", scores: { healthcare: 0, technology: 2, business: 0, design: 1, science: 3, law: 1, education: 0, media: 0, agriculture: 0, defence: 0 } },
      { id: "B", text: { en: "In small teams (3-5 people)", ta: "சிறிய குழுக்களில் (3-5 பேர்)" }, icon: "👥", scores: { healthcare: 1, technology: 1, business: 2, design: 2, science: 0, law: 0, education: 0, media: 1, agriculture: 0, defence: 0 } },
      { id: "C", text: { en: "With many people daily", ta: "தினமும் பலருடன்" }, icon: "👨‍👩‍👧‍👦", scores: { healthcare: 2, technology: 0, business: 1, design: 0, science: 0, law: 0, education: 3, media: 1, agriculture: 0, defence: 1 } },
      { id: "D", text: { en: "Mix of alone and team work", ta: "தனி மற்றும் குழு வேலையின் கலவை" }, icon: "🔄", scores: { healthcare: 0, technology: 2, business: 1, design: 1, science: 1, law: 1, education: 0, media: 2, agriculture: 0, defence: 0 } }
    ]
  },
  {
    id: 15,
    category: "interest",
    question: { 
      en: "Your dream impact on the world:", 
      ta: "உலகில் உங்கள் கனவு தாக்கம்:" 
    },
    options: [
      { id: "A", text: { en: "Cure diseases & save lives", ta: "நோய்களை குணப்படுத்தி உயிர்களை காப்பாற்றுவது" }, icon: "💉", scores: { healthcare: 3, technology: 0, business: 0, design: 0, science: 2, law: 0, education: 0, media: 0, agriculture: 0, defence: 0 } },
      { id: "B", text: { en: "Build technology that changes the world", ta: "உலகை மாற்றும் தொழில்நுட்பம் உருவாக்குவது" }, icon: "🖥️", scores: { healthcare: 0, technology: 3, business: 1, design: 0, science: 1, law: 0, education: 0, media: 0, agriculture: 0, defence: 0 } },
      { id: "C", text: { en: "Create jobs & economic growth", ta: "வேலைகள் & பொருளாதார வளர்ச்சியை உருவாக்குவது" }, icon: "💼", scores: { healthcare: 0, technology: 0, business: 3, design: 0, science: 0, law: 0, education: 0, media: 0, agriculture: 1, defence: 0 } },
      { id: "D", text: { en: "Inspire through art & creativity", ta: "கலை & படைப்பாற்றல் மூலம் ஊக்கமளிப்பது" }, icon: "🎭", scores: { healthcare: 0, technology: 0, business: 0, design: 3, science: 0, law: 0, education: 1, media: 2, agriculture: 0, defence: 0 } }
    ]
  },
  // PERSONALITY (5)
  {
    id: 16,
    category: "personality",
    question: { 
      en: "When making important decisions, you:", 
      ta: "முக்கியமான முடிவுகள் எடுக்கும்போது நீங்கள்:" 
    },
    options: [
      { id: "A", text: { en: "Analyze all data and facts first", ta: "முதலில் அனைத்து தரவுகளையும் உண்மைகளையும் பகுப்பாய்வு செய்வது" }, icon: "📊", scores: { healthcare: 1, technology: 2, business: 1, design: 0, science: 3, law: 1, education: 0, media: 0, agriculture: 0, defence: 0 } },
      { id: "B", text: { en: "Follow your gut feeling", ta: "உள்ளுணர்வைப் பின்பற்றுவது" }, icon: "💫", scores: { healthcare: 0, technology: 0, business: 1, design: 3, science: 0, law: 0, education: 0, media: 2, agriculture: 0, defence: 0 } },
      { id: "C", text: { en: "Ask family/friends for advice", ta: "குடும்பம்/நண்பர்களிடம் ஆலோசனை கேட்பது" }, icon: "🗣️", scores: { healthcare: 1, technology: 0, business: 0, design: 0, science: 0, law: 0, education: 3, media: 0, agriculture: 1, defence: 0 } },
      { id: "D", text: { en: "Decide quickly and take action", ta: "விரைவாக முடிவெடுத்து செயல்படுவது" }, icon: "⚡", scores: { healthcare: 0, technology: 0, business: 3, design: 0, science: 0, law: 0, education: 0, media: 0, agriculture: 0, defence: 2 } }
    ]
  },
  {
    id: 17,
    category: "personality",
    question: { 
      en: "When under pressure or stress, you:", 
      ta: "அழுத்தம் அல்லது மன அழுத்தத்தின் போது நீங்கள்:" 
    },
    options: [
      { id: "A", text: { en: "Stay calm and focus on solutions", ta: "அமைதியாக இருந்து தீர்வுகளில் கவனம் செலுத்துவது" }, icon: "🧘", scores: { healthcare: 3, technology: 1, business: 0, design: 0, science: 2, law: 1, education: 0, media: 0, agriculture: 0, defence: 1 } },
      { id: "B", text: { en: "Get creative and find new ways", ta: "படைப்பாற்றலாக இருந்து புதிய வழிகளைக் கண்டுபிடிப்பது" }, icon: "💡", scores: { healthcare: 0, technology: 2, business: 1, design: 3, science: 0, law: 0, education: 0, media: 1, agriculture: 0, defence: 0 } },
      { id: "C", text: { en: "Seek support from others", ta: "மற்றவர்களிடம் ஆதரவு நாடுவது" }, icon: "🤝", scores: { healthcare: 1, technology: 0, business: 0, design: 0, science: 0, law: 0, education: 3, media: 0, agriculture: 0, defence: 0 } },
      { id: "D", text: { en: "Thrive and perform even better", ta: "சிறப்பாக செயல்படுவது" }, icon: "🔥", scores: { healthcare: 0, technology: 0, business: 2, design: 0, science: 0, law: 1, education: 0, media: 0, agriculture: 0, defence: 3 } }
    ]
  },
  {
    id: 18,
    category: "personality",
    question: { 
      en: "Your communication style is:", 
      ta: "உங்கள் தொடர்பு நடை:" 
    },
    options: [
      { id: "A", text: { en: "Precise, logical and to the point", ta: "துல்லியமான, தர்க்கரீதியான மற்றும் நேரடியான" }, icon: "🎯", scores: { healthcare: 0, technology: 3, business: 1, design: 0, science: 2, law: 1, education: 0, media: 0, agriculture: 0, defence: 0 } },
      { id: "B", text: { en: "Friendly, warm and supportive", ta: "நட்பான, அன்பான மற்றும் ஆதரவான" }, icon: "😊", scores: { healthcare: 3, technology: 0, business: 0, design: 0, science: 0, law: 0, education: 2, media: 0, agriculture: 1, defence: 0 } },
      { id: "C", text: { en: "Creative, expressive and engaging", ta: "படைப்பாற்றல், வெளிப்படையான மற்றும் ஈடுபாடான" }, icon: "🎨", scores: { healthcare: 0, technology: 0, business: 0, design: 2, science: 0, law: 0, education: 1, media: 3, agriculture: 0, defence: 0 } },
      { id: "D", text: { en: "Formal, professional and authoritative", ta: "முறையான, தொழில்முறை மற்றும் அதிகாரபூர்வமான" }, icon: "👔", scores: { healthcare: 0, technology: 0, business: 2, design: 0, science: 0, law: 3, education: 0, media: 0, agriculture: 0, defence: 1 } }
    ]
  },
  {
    id: 19,
    category: "personality",
    question: { 
      en: "When you fail at something, you:", 
      ta: "நீங்கள் ஏதாவது தோல்வியடையும் போது:" 
    },
    options: [
      { id: "A", text: { en: "Analyze what went wrong", ta: "என்ன தவறு நடந்தது என்று பகுப்பாய்வு செய்வது" }, icon: "🔍", scores: { healthcare: 0, technology: 2, business: 0, design: 0, science: 3, law: 1, education: 0, media: 0, agriculture: 0, defence: 0 } },
      { id: "B", text: { en: "Move on quickly to next thing", ta: "அடுத்த விஷயத்திற்கு விரைவாக முன்னேறுவது" }, icon: "🏃", scores: { healthcare: 0, technology: 0, business: 3, design: 0, science: 0, law: 0, education: 0, media: 2, agriculture: 0, defence: 1 } },
      { id: "C", text: { en: "Talk to others and seek support", ta: "மற்றவர்களிடம் பேசி ஆதரவு நாடுவது" }, icon: "💬", scores: { healthcare: 2, technology: 0, business: 0, design: 0, science: 0, law: 0, education: 3, media: 0, agriculture: 0, defence: 0 } },
      { id: "D", text: { en: "Try a completely different approach", ta: "முற்றிலும் வேறு அணுகுமுறையை முயற்சிப்பது" }, icon: "🔄", scores: { healthcare: 0, technology: 1, business: 0, design: 3, science: 0, law: 0, education: 0, media: 0, agriculture: 0, defence: 1 } }
    ]
  },
  {
    id: 20,
    category: "personality",
    question: { 
      en: "Your ideal work-life balance:", 
      ta: "உங்கள் சிறந்த வேலை-வாழ்க்கை சமநிலை:" 
    },
    options: [
      { id: "A", text: { en: "Stable 9-5 job with weekends off", ta: "வார இறுதி விடுமுறையுடன் நிலையான 9-5 வேலை" }, icon: "🏢", scores: { healthcare: 1, technology: 2, business: 0, design: 0, science: 1, law: 1, education: 2, media: 0, agriculture: 0, defence: 0 } },
      { id: "B", text: { en: "Flexible hours, work from anywhere", ta: "நெகிழ்வான நேரம், எங்கிருந்தும் வேலை" }, icon: "🌴", scores: { healthcare: 0, technology: 1, business: 0, design: 2, science: 0, law: 0, education: 0, media: 3, agriculture: 0, defence: 0 } },
      { id: "C", text: { en: "Own my business or startup", ta: "என் சொந்த வணிகம் அல்லது ஸ்டார்ட்அப்" }, icon: "🚀", scores: { healthcare: 0, technology: 1, business: 3, design: 1, science: 0, law: 0, education: 0, media: 0, agriculture: 0, defence: 0 } },
      { id: "D", text: { en: "Adventurous field work with travel", ta: "பயணத்துடன் சாகச கள வேலை" }, icon: "✈️", scores: { healthcare: 0, technology: 0, business: 0, design: 0, science: 1, law: 0, education: 0, media: 1, agriculture: 2, defence: 3 } }
    ]
  }
];

const careerClusters: Record<string, CareerCluster> = {
  healthcare: { 
    name: { en: "Healthcare", ta: "சுகாதாரம்" }, 
    icon: "🏥", 
    color: "#EF4444",
    description: { en: "Your empathy and desire to help others make healthcare careers ideal for you.", ta: "உங்கள் பச்சாதாபமும் மற்றவர்களுக்கு உதவ விரும்பும் தன்மையும் சுகாதார வாழ்க்கைக்கு ஏற்றவை." },
    careers: ["Doctor (MBBS)", "Nurse", "Pharmacist", "Physiotherapist", "Dentist"],
    exams: ["NEET UG", "AIIMS", "JIPMER"],
    salary: "₹5L - ₹25L/year"
  },
  technology: { 
    name: { en: "Technology", ta: "தொழில்நுட்பம்" }, 
    icon: "💻", 
    color: "#3B82F6",
    description: { en: "Your logical thinking and problem-solving skills make technology careers perfect.", ta: "உங்கள் தர்க்கரீதியான சிந்தனையும் சிக்கலைத் தீர்க்கும் திறன்களும் தொழில்நுட்ப வாழ்க்கைக்கு ஏற்றவை." },
    careers: ["Software Engineer", "Data Scientist", "AI/ML Engineer", "Cybersecurity Analyst"],
    exams: ["JEE Main", "JEE Advanced", "BITSAT", "VITEEE"],
    salary: "₹6L - ₹50L/year"
  },
  business: { 
    name: { en: "Business & Management", ta: "வணிகம் & மேலாண்மை" }, 
    icon: "📊", 
    color: "#F59E0B",
    description: { en: "Your leadership and financial interest make business careers a great fit.", ta: "உங்கள் தலைமைப் பண்புகளும் நிதி ஆர்வமும் வணிக வாழ்க்கைக்கு ஏற்றவை." },
    careers: ["Chartered Accountant (CA)", "MBA Manager", "Entrepreneur", "Financial Analyst"],
    exams: ["CA Foundation", "CAT", "XAT", "TANCET MBA"],
    salary: "₹8L - ₹40L/year"
  },
  design: { 
    name: { en: "Design & Creative", ta: "வடிவமைப்பு & படைப்பாற்றல்" }, 
    icon: "🎨", 
    color: "#EC4899",
    description: { en: "Your creativity and visual thinking make design careers ideal.", ta: "உங்கள் படைப்பாற்றலும் காட்சி சிந்தனையும் வடிவமைப்பு வாழ்க்கைக்கு ஏற்றவை." },
    careers: ["Fashion Designer", "Graphic Designer", "UI/UX Designer", "Architect", "Interior Designer"],
    exams: ["NIFT", "NID", "NATA", "UCEED"],
    salary: "₹4L - ₹20L/year"
  },
  science: { 
    name: { en: "Science & Research", ta: "அறிவியல் & ஆராய்ச்சி" }, 
    icon: "🔬", 
    color: "#8B5CF6",
    description: { en: "Your curiosity and analytical mind make research careers perfect.", ta: "உங்கள் ஆர்வமும் பகுப்பாய்வு மனமும் ஆராய்ச்சி வாழ்க்கைக்கு ஏற்றவை." },
    careers: ["Research Scientist", "Professor", "ISRO Scientist", "Biotechnologist"],
    exams: ["IIT JAM", "CSIR NET", "GATE", "JEST"],
    salary: "₹6L - ₹25L/year"
  },
  law: { 
    name: { en: "Law & Governance", ta: "சட்டம் & ஆட்சி" }, 
    icon: "⚖️", 
    color: "#6366F1",
    description: { en: "Your interest in justice and communication skills make law careers ideal.", ta: "நீதியில் உங்கள் ஆர்வமும் தொடர்பு திறன்களும் சட்ட வாழ்க்கைக்கு ஏற்றவை." },
    careers: ["Lawyer/Advocate", "Judge", "IAS Officer", "Legal Advisor"],
    exams: ["CLAT", "AILET", "UPSC CSE", "Judicial Services"],
    salary: "₹5L - ₹50L/year"
  },
  education: { 
    name: { en: "Education & Training", ta: "கல்வி & பயிற்சி" }, 
    icon: "📚", 
    color: "#10B981",
    description: { en: "Your patience and desire to help others learn make education perfect.", ta: "உங்கள் பொறுமையும் மற்றவர்களுக்கு கற்பிக்க விரும்பும் தன்மையும் கல்வி வாழ்க்கைக்கு ஏற்றவை." },
    careers: ["School Teacher", "College Professor", "Education Counselor", "EdTech Professional"],
    exams: ["TET", "TRB", "CTET", "NET/SET"],
    salary: "₹3L - ₹15L/year"
  },
  media: { 
    name: { en: "Media & Communication", ta: "ஊடகம் & தொடர்பு" }, 
    icon: "📺", 
    color: "#F97316",
    description: { en: "Your communication skills and creativity make media careers ideal.", ta: "உங்கள் தொடர்பு திறன்களும் படைப்பாற்றலும் ஊடக வாழ்க்கைக்கு ஏற்றவை." },
    careers: ["Journalist", "Content Creator", "Film Director", "PR Manager", "Digital Marketer"],
    exams: ["IIMC", "ACJ", "XIC", "FTII"],
    salary: "₹4L - ₹30L/year"
  },
  agriculture: { 
    name: { en: "Agriculture & Environment", ta: "விவசாயம் & சுற்றுச்சூழல்" }, 
    icon: "🌾", 
    color: "#84CC16",
    description: { en: "Your connection with nature makes agriculture careers perfect.", ta: "இயற்கையுடன் உங்கள் தொடர்பு விவசாய வாழ்க்கைக்கு ஏற்றது." },
    careers: ["Agricultural Officer", "Food Technologist", "Agronomist", "Forest Officer"],
    exams: ["ICAR AIEEA", "TNAU", "State Agriculture Exams"],
    salary: "₹4L - ₹15L/year"
  },
  defence: { 
    name: { en: "Defence & Security", ta: "பாதுகாப்பு" }, 
    icon: "🛡️", 
    color: "#1F2937",
    description: { en: "Your discipline and courage make defence careers ideal.", ta: "உங்கள் ஒழுக்கமும் தைரியமும் பாதுகாப்பு வாழ்க்கைக்கு ஏற்றவை." },
    careers: ["Army Officer", "Navy Officer", "Air Force Officer", "IPS Officer", "CRPF/BSF"],
    exams: ["NDA", "CDS", "AFCAT", "UPSC CSE"],
    salary: "₹6L - ₹20L/year"
  }
};

const CareerAssessment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [language, setLanguage] = useState<Language>('en');
  const [currentScreen, setCurrentScreen] = useState<Screen>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Response[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [careerTips, setCareerTips] = useState<CareerTip[]>([]);
  const [loadingTips, setLoadingTips] = useState(false);

  // Load saved state from localStorage
  useEffect(() => {
    const savedResponses = localStorage.getItem('careerAssessmentResponses');
    const savedResults = localStorage.getItem('careerAssessmentResults');
    
    if (savedResults) {
      setResults(JSON.parse(savedResults));
      setCurrentScreen('results');
    } else if (savedResponses) {
      const parsed = JSON.parse(savedResponses);
      setResponses(parsed);
      setCurrentQuestion(parsed.length);
      if (parsed.length > 0 && parsed.length < 20) {
        setCurrentScreen('questions');
      }
    }
  }, []);

  // Fetch personalized tips when results are available
  const fetchCareerTips = async (resultsData: Result[]) => {
    setLoadingTips(true);
    try {
      const topCareers = resultsData.map(r => ({
        name: careerClusters[r.career]?.name?.en || r.career,
        percentage: r.percentage
      }));

      const { data, error } = await supabase.functions.invoke('career-tips', {
        body: { topCareers, language }
      });

      if (error) {
        console.error('Error fetching tips:', error);
        if (error.message?.includes('429')) {
          toast({
            title: language === 'en' ? 'Please wait' : 'காத்திருக்கவும்',
            description: language === 'en' ? 'Too many requests. Try again in a moment.' : 'பல கோரிக்கைகள். சிறிது நேரம் கழித்து முயற்சிக்கவும்.',
            variant: 'destructive'
          });
        }
        return;
      }

      if (data?.tips) {
        setCareerTips(data.tips);
      }
    } catch (err) {
      console.error('Error fetching career tips:', err);
    } finally {
      setLoadingTips(false);
    }
  };

  const calculateResults = (allResponses: Response[]) => {
    const scores: Record<string, number> = {
      healthcare: 0, technology: 0, business: 0, design: 0, science: 0,
      law: 0, education: 0, media: 0, agriculture: 0, defence: 0
    };
    
    allResponses.forEach(response => {
      if (response?.selectedOption?.scores) {
        Object.entries(response.selectedOption.scores).forEach(([career, score]) => {
          scores[career] += score as number;
        });
      }
    });
    
    const maxPossible = allResponses.length * 3;
    
    const sortedResults = Object.entries(scores)
      .map(([career, score]) => ({
        career,
        score,
        percentage: Math.min(99, Math.round((score / maxPossible) * 100) + Math.floor(Math.random() * 8) + 25)
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);
    
    setResults(sortedResults);
    localStorage.setItem('careerAssessmentResults', JSON.stringify(sortedResults));
    // Fetch personalized tips
    fetchCareerTips(sortedResults);
  };

  const handleNext = () => {
    if (!selectedOption) return;
    
    const selectedOpt = questions[currentQuestion].options.find(o => o.id === selectedOption);
    if (!selectedOpt) return;
    
    const newResponses = [...responses];
    newResponses[currentQuestion] = {
      questionId: questions[currentQuestion].id,
      selectedOption: selectedOpt
    };
    setResponses(newResponses);
    localStorage.setItem('careerAssessmentResponses', JSON.stringify(newResponses));
    
    if (currentQuestion < 19) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(newResponses[currentQuestion + 1]?.selectedOption?.id || null);
    } else {
      calculateResults(newResponses);
      setCurrentScreen('results');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(responses[currentQuestion - 1]?.selectedOption?.id || null);
    }
  };

  const handleRetake = () => {
    localStorage.removeItem('careerAssessmentResponses');
    localStorage.removeItem('careerAssessmentResults');
    setCurrentScreen('intro');
    setCurrentQuestion(0);
    setResponses([]);
    setSelectedOption(null);
    setResults([]);
    setCareerTips([]);
  };

  const handleShare = () => {
    const text = `🎯 My Career Assessment Results:\n\n${results.map((r, i) => 
      `#${i+1} ${careerClusters[r.career].icon} ${careerClusters[r.career].name.en}: ${r.percentage}%`
    ).join('\n')}\n\nTake yours at JKKN AI HORIZONS!`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'aptitude': return '🧠';
      case 'interest': return '❤️';
      case 'personality': return '👤';
      default: return '📝';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-violet-700 text-white py-4 px-4 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20"
            onClick={() => navigate('/career-assessment/colleges')}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                language === 'en' 
                  ? 'bg-white text-purple-600' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ta')}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                language === 'ta' 
                  ? 'bg-white text-purple-600' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              தமிழ்
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Intro Screen */}
        {currentScreen === 'intro' && (
          <div className="animate-fade-in">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
              <div className="p-8 text-center">
                {/* Hero Icon */}
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-violet-600 rounded-3xl flex items-center justify-center shadow-xl transform rotate-3">
                    <Sparkles className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg transform -rotate-12">
                    <span className="text-lg">✨</span>
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-3">
                  {language === 'en' ? 'AI Career Assessment' : 'AI தொழில் மதிப்பீடு'}
                </h1>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  {language === 'en' 
                    ? 'Discover careers that match your unique personality, interests and aptitude' 
                    : 'உங்கள் தனித்துவமான ஆளுமை, ஆர்வங்கள் மற்றும் திறனுக்கு பொருந்தும் தொழில்களைக் கண்டறியுங்கள்'}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 bg-purple-50 p-3 rounded-xl">
                    <span className="text-2xl">✨</span>
                    <span className="text-gray-700 text-left">
                      {language === 'en' ? '20 questions in 10 minutes' : '10 நிமிடங்களில் 20 கேள்விகள்'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-violet-50 p-3 rounded-xl">
                    <span className="text-2xl">📊</span>
                    <span className="text-gray-700 text-left">
                      {language === 'en' ? 'Get top 5 career matches with fit scores' : 'சிறந்த 5 தொழில் பொருத்தங்களைப் பெறுங்கள்'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-indigo-50 p-3 rounded-xl">
                    <span className="text-2xl">🌐</span>
                    <span className="text-gray-700 text-left">
                      {language === 'en' ? 'Available in English & Tamil' : 'ஆங்கிலம் & தமிழில் கிடைக்கும்'}
                    </span>
                  </div>
                </div>

                <Button 
                  onClick={() => setCurrentScreen('questions')}
                  className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white py-6 rounded-2xl text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                >
                  🚀 {language === 'en' ? 'Start Assessment' : 'மதிப்பீட்டைத் தொடங்கு'}
                </Button>

                <button 
                  onClick={handleRetake}
                  className="w-full text-center text-sm text-gray-500 mt-4 hover:text-purple-500 transition-colors"
                >
                  {language === 'en' ? '🔄 Clear previous responses' : '🔄 முந்தைய பதில்களை அழிக்கவும்'}
                </button>
              </div>
            </Card>
          </div>
        )}

        {/* Questions Screen */}
        {currentScreen === 'questions' && (
          <div className="animate-fade-in space-y-6">
            {/* Progress Header */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                {language === 'en' ? `Question ${currentQuestion + 1} of 20` : `கேள்வி ${currentQuestion + 1} / 20`}
              </span>
              <button
                onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
                className="px-3 py-1 bg-white rounded-full text-sm shadow-sm hover:shadow transition-shadow"
              >
                {language === 'en' ? 'தமிழ்' : 'EN'}
              </button>
            </div>

            {/* Progress Bar */}
            <Progress value={((currentQuestion + 1) / 20) * 100} className="h-2" />

            {/* Category Progress Indicator */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                {/* Aptitude */}
                <div className="flex-1 text-center">
                  <div className={`flex items-center justify-center gap-1.5 mb-1 ${currentQuestion < 5 ? 'text-purple-600' : currentQuestion >= 5 ? 'text-green-600' : 'text-gray-400'}`}>
                    <span className="text-lg">🧠</span>
                    <span className="text-xs font-semibold hidden sm:inline">Aptitude</span>
                  </div>
                  <div className="flex gap-0.5 justify-center">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentQuestion === i
                            ? 'bg-purple-500 ring-2 ring-purple-300'
                            : currentQuestion > i
                            ? 'bg-green-500'
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-500 mt-1 block">{Math.min(currentQuestion + 1, 5)}/5</span>
                </div>

                {/* Divider */}
                <div className="w-px h-10 bg-gray-200" />

                {/* Interest */}
                <div className="flex-1 text-center">
                  <div className={`flex items-center justify-center gap-1.5 mb-1 ${currentQuestion >= 5 && currentQuestion < 15 ? 'text-purple-600' : currentQuestion >= 15 ? 'text-green-600' : 'text-gray-400'}`}>
                    <span className="text-lg">❤️</span>
                    <span className="text-xs font-semibold hidden sm:inline">Interest</span>
                  </div>
                  <div className="flex gap-0.5 justify-center">
                    {[5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentQuestion === i
                            ? 'bg-purple-500 ring-2 ring-purple-300'
                            : currentQuestion > i
                            ? 'bg-green-500'
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-500 mt-1 block">{Math.max(0, Math.min(currentQuestion - 4, 10))}/10</span>
                </div>

                {/* Divider */}
                <div className="w-px h-10 bg-gray-200" />

                {/* Personality */}
                <div className="flex-1 text-center">
                  <div className={`flex items-center justify-center gap-1.5 mb-1 ${currentQuestion >= 15 ? 'text-purple-600' : 'text-gray-400'}`}>
                    <span className="text-lg">👤</span>
                    <span className="text-xs font-semibold hidden sm:inline">Personality</span>
                  </div>
                  <div className="flex gap-0.5 justify-center">
                    {[15, 16, 17, 18, 19].map((i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentQuestion === i
                            ? 'bg-purple-500 ring-2 ring-purple-300'
                            : currentQuestion > i
                            ? 'bg-green-500'
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-500 mt-1 block">{Math.max(0, Math.min(currentQuestion - 14, 5))}/5</span>
                </div>
              </div>
            </div>

            {/* Question Card */}
            <Card className="bg-white shadow-xl rounded-3xl border-0 overflow-hidden">
              <div className="p-6">
                {/* Bilingual Question */}
                <div className="mb-6 text-center">
                  <h2 className="text-xl font-bold text-gray-800 leading-relaxed">
                    {questions[currentQuestion].question.en}
                  </h2>
                  <p className="text-base text-gray-600 mt-2 leading-relaxed">
                    {questions[currentQuestion].question.ta}
                  </p>
                </div>

                {/* Options - Bilingual */}
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedOption(option.id)}
                      className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-200 transform hover:scale-[1.01] ${
                        selectedOption === option.id
                          ? 'border-purple-500 bg-purple-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-purple-200 hover:bg-purple-50/50'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-2xl mt-0.5">{option.icon}</span>
                        <div className="flex-1">
                          <span className="text-gray-800 font-medium block">{option.text.en}</span>
                          <span className="text-gray-500 text-sm block mt-0.5">{option.text.ta}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex gap-3">
              {currentQuestion > 0 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 py-6 rounded-2xl"
                >
                  <ChevronLeft className="h-5 w-5 mr-1" />
                  {language === 'en' ? 'Back' : 'பின்'}
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={!selectedOption}
                className="flex-1 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 py-6 rounded-2xl disabled:opacity-50"
              >
                {currentQuestion === 19 
                  ? (language === 'en' ? 'See Results' : 'முடிவுகளைப் பார்') 
                  : (language === 'en' ? 'Next' : 'அடுத்து')}
                {currentQuestion < 19 && <ChevronRight className="h-5 w-5 ml-1" />}
              </Button>
            </div>
          </div>
        )}

        {/* Results Screen */}
        {currentScreen === 'results' && (
          <div className="animate-fade-in space-y-6">
            {/* Header */}
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-3xl mb-4 shadow-xl">
                <span className="text-4xl">🎉</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {language === 'en' ? 'Your Career Profile' : 'உங்கள் தொழில் சுயவிவரம்'}
              </h1>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Based on your responses, here are your best matches' 
                  : 'உங்கள் பதில்களின் அடிப்படையில், இவை உங்கள் சிறந்த பொருத்தங்கள்'}
              </p>
            </div>

            {/* Results Cards */}
            <div className="space-y-4">
              {results.map((result, index) => {
                const cluster = careerClusters[result.career];
                return (
                  <Card 
                    key={result.career} 
                    className={`bg-white shadow-lg rounded-2xl border-0 overflow-hidden transition-all duration-300 ${
                      index === 0 ? 'ring-2 ring-purple-500 ring-offset-2' : ''
                    }`}
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{cluster.icon}</span>
                          <div>
                            <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
                              #{index + 1} Match
                            </span>
                            <h3 className="text-lg font-bold text-gray-800">
                              {cluster.name[language]}
                            </h3>
                          </div>
                        </div>
                        <div 
                          className="text-2xl font-bold"
                          style={{ color: cluster.color }}
                        >
                          {result.percentage}%
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${result.percentage}%`,
                            backgroundColor: cluster.color
                          }}
                        />
                      </div>

                      <p className="text-sm text-gray-600 mb-3">
                        {cluster.description[language]}
                      </p>

                      <div className="text-xs text-gray-500 space-y-1">
                        <p>
                          <span className="font-semibold">{language === 'en' ? 'Careers:' : 'தொழில்கள்:'}</span>{' '}
                          {cluster.careers.slice(0, 3).join(', ')}
                        </p>
                        <p>
                          <span className="font-semibold">{language === 'en' ? 'Exams:' : 'தேர்வுகள்:'}</span>{' '}
                          {cluster.exams.join(', ')}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Personalized Career Tips */}
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg rounded-2xl border-0 overflow-hidden">
              <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
                    <Lightbulb className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {language === 'en' ? 'Personalized Career Tips' : 'தனிப்பயனாக்கப்பட்ட தொழில் குறிப்புகள்'}
                  </h3>
                </div>

                {loadingTips ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
                    <span className="ml-3 text-gray-600">
                      {language === 'en' ? 'Generating personalized tips...' : 'தனிப்பயனாக்கப்பட்ட குறிப்புகளை உருவாக்குகிறது...'}
                    </span>
                  </div>
                ) : careerTips.length > 0 ? (
                  <div className="space-y-3">
                    {careerTips.map((tip, index) => (
                      <div 
                        key={index}
                        className="flex items-start gap-3 p-3 bg-white rounded-xl shadow-sm"
                      >
                        <span className="text-2xl flex-shrink-0">{tip.emoji}</span>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">{tip.title}</h4>
                          <p className="text-xs text-gray-600 mt-0.5">{tip.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => fetchCareerTips(results)}
                    className="w-full py-4 border-amber-200 text-amber-700 hover:bg-amber-50"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {language === 'en' ? 'Get AI-Powered Tips' : 'AI குறிப்புகளைப் பெறுங்கள்'}
                  </Button>
                )}
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button
                onClick={() => generateCareerAssessmentPDF(results, careerClusters, careerTips)}
                className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 py-6 rounded-2xl"
              >
                <Download className="h-5 w-5 mr-2" />
                {language === 'en' ? 'Download PDF Report' : 'PDF அறிக்கையைப் பதிவிறக்கவும்'}
              </Button>

              <Button
                variant="outline"
                onClick={handleRetake}
                className="w-full py-6 rounded-2xl border-2"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                {language === 'en' ? 'Retake Assessment' : 'மீண்டும் எடுக்கவும்'}
              </Button>
              
              <Button
                variant="outline"
                onClick={handleShare}
                className="w-full py-6 rounded-2xl border-2"
              >
                <Share2 className="h-5 w-5 mr-2" />
                {language === 'en' ? 'Share on WhatsApp' : 'WhatsApp இல் பகிர்'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerAssessment;
