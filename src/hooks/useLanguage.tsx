import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // TopBar
    'topbar.aiChat': 'AI Chat',
    'topbar.login': 'Login',
    'topbar.register': 'Register',
    'topbar.careerPath': 'JKKN CAREER PATH - 2026-2032',
    
    // Navigation
    'nav.home': 'Home',
    'nav.careerHub': 'Career Hub',
    'nav.dashboard': 'Dashboard',
    'nav.aboutJkkn': 'About JKKN',
    'nav.careerGuidance': 'Career Guidance',
    'nav.jobPortal': 'Job Portal',
    'nav.contact': 'Contact',
    'nav.institutionName': 'J.K.K. Nattraja Institutions',
    'nav.tagline': '70+ Years of Excellence in Education & Healthcare',
    
    // Hero Section
    'hero.badge': 'JKKN CAREER PATH - 2026-2032',
    'hero.title': 'JKKN AI Horizons:',
    'hero.subtitle': 'Discover, Design, Do - வழிகாட்டி',
    'hero.tamilSubtitle': 'கண்டறி, வடிவமை, செய்',
    'hero.description': 'Empowering JKKN Learners & 12th Learners with AI-powered career guidance, skill development and placement opportunities across 9 institutions.',
    'hero.register12th': 'Register as 12th Learner',
    'hero.registerLearner': 'Register as JKKN Learner',
    'hero.whoIsFor': 'Who is this for?',
    'hero.12thLearners': '12th Learners',
    'hero.12thLearnersDesc': 'Discover careers & plan your future',
    'hero.learners': 'Learners',
    'hero.learnersDesc': 'Build skills & connect with employers',
    'hero.employers': 'Employers',
    'hero.employersDesc': 'Hire talented JKKN graduates',
    'hero.exploreMore': 'Explore More',
    
    // Services Section
    'services.badge': 'Complete Support System',
    'services.title': 'Your Complete Career Journey',
    'services.description': 'From self-discovery to job offers, JKKN AI Horizons supports every stage of your journey.',
    'services.careerAssessment': 'Career Assessment',
    'services.careerAssessmentDesc': 'AI-powered psychometric tests to discover your personality, strengths, and best-fit careers.',
    'services.careerPathFinder': 'Career Path Finder',
    'services.careerPathFinderDesc': 'Explore what to do after 10th & 12th, with clear education paths mapped to real careers.',
    'services.jobPortal': 'Job Portal',
    'services.jobPortalDesc': 'Apply to curated jobs, internships, and 12th-pass roles with a single profile.',
    'services.skillDevelopment': 'Skill Development',
    'services.skillDevelopmentDesc': 'Learn technical, communication, and life skills with focused courses and practice tasks.',
    'services.expertCounseling': 'Expert Counseling',
    'services.expertCounselingDesc': 'Book one-on-one sessions with Senior Learners and counselors to clarify doubts.',
    'services.aiAssistant': 'AI Career Assistant',
    'services.aiAssistantDesc': 'Ask JKKN AI anything about careers, courses, jobs, or JKKN admissions—24/7.',
    
    // Footer
    'footer.title': 'JKKN AI Horizons: Discover, Design, Do - வழிகாட்டி',
    'footer.tagline': '70+ Years of Excellence in Education & Healthcare',
    'footer.copyright': '© 2025 J.K.K. Nattraja Institutions. All Rights Reserved.',
    'footer.about': 'About JKKN',
    'footer.events': 'Events',
    'footer.contact': 'Contact',
    'footer.admin': 'Admin',
    
    // CTA Section
    'cta.title': 'Ready to Shape Your Future?',
    'cta.description': 'Join thousands of learners who have discovered their career path with JKKN AI Horizons.',
    'cta.startJourney': 'Start Your Journey',
    'cta.exploreJobs': 'Explore Jobs',
    
    // Common
    'common.loading': 'Loading...',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.viewAll': 'View All',
    'common.learnMore': 'Learn More',
  },
  ta: {
    // TopBar
    'topbar.aiChat': 'AI அரட்டை',
    'topbar.login': 'உள்நுழை',
    'topbar.register': 'பதிவு',
    'topbar.careerPath': 'JKKN தொழில் பாதை - 2026-2032',
    
    // Navigation
    'nav.home': 'முகப்பு',
    'nav.careerHub': 'தொழில் மையம்',
    'nav.dashboard': 'டாஷ்போர்டு',
    'nav.aboutJkkn': 'JKKN பற்றி',
    'nav.careerGuidance': 'தொழில் வழிகாட்டுதல்',
    'nav.jobPortal': 'வேலை போர்டல்',
    'nav.contact': 'தொடர்பு',
    'nav.institutionName': 'ஜே.கே.கே. நாட்ராஜா நிறுவனங்கள்',
    'nav.tagline': 'கல்வி மற்றும் சுகாதாரத்தில் 70+ ஆண்டுகள் சிறப்பு',
    
    // Hero Section
    'hero.badge': 'JKKN தொழில் பாதை - 2026-2032',
    'hero.title': 'JKKN AI ஹொரைசன்ஸ்:',
    'hero.subtitle': 'கண்டறி, வடிவமை, செய் - வழிகாட்டி',
    'hero.tamilSubtitle': 'Discover, Design, Do',
    'hero.description': 'JKKN கற்பவர்கள் மற்றும் 12ஆம் வகுப்பு மாணவர்களுக்கு AI-இயங்கும் தொழில் வழிகாட்டுதல், திறன் மேம்பாடு மற்றும் 9 நிறுவனங்களில் வேலைவாய்ப்புகளை வழங்குகிறது.',
    'hero.register12th': '12ஆம் வகுப்பு மாணவராக பதிவு செய்க',
    'hero.registerLearner': 'JKKN கற்பவராக பதிவு செய்க',
    'hero.whoIsFor': 'இது யாருக்கானது?',
    'hero.12thLearners': '12ஆம் வகுப்பு மாணவர்கள்',
    'hero.12thLearnersDesc': 'தொழில்களை கண்டறிந்து உங்கள் எதிர்காலத்தை திட்டமிடுங்கள்',
    'hero.learners': 'கற்பவர்கள்',
    'hero.learnersDesc': 'திறன்களை வளர்த்து முதலாளிகளுடன் இணையுங்கள்',
    'hero.employers': 'முதலாளிகள்',
    'hero.employersDesc': 'திறமையான JKKN பட்டதாரிகளை பணியமர்த்துங்கள்',
    'hero.exploreMore': 'மேலும் ஆராயுங்கள்',
    
    // Services Section
    'services.badge': 'முழுமையான ஆதரவு அமைப்பு',
    'services.title': 'உங்கள் முழுமையான தொழில் பயணம்',
    'services.description': 'சுய கண்டுபிடிப்பிலிருந்து வேலை வாய்ப்புகள் வரை, JKKN AI ஹொரைசன்ஸ் உங்கள் பயணத்தின் ஒவ்வொரு கட்டத்தையும் ஆதரிக்கிறது.',
    'services.careerAssessment': 'தொழில் மதிப்பீடு',
    'services.careerAssessmentDesc': 'உங்கள் ஆளுமை, பலங்கள் மற்றும் சிறந்த தொழில்களை கண்டறிய AI-இயங்கும் மனநல சோதனைகள்.',
    'services.careerPathFinder': 'தொழில் பாதை கண்டுபிடிப்பான்',
    'services.careerPathFinderDesc': '10வது மற்றும் 12வது வகுப்புக்கு பிறகு என்ன செய்யலாம் என்பதை ஆராயுங்கள், உண்மையான தொழில்களுக்கான தெளிவான கல்வி பாதைகள்.',
    'services.jobPortal': 'வேலை போர்டல்',
    'services.jobPortalDesc': 'ஒரே சுயவிவரத்துடன் தொகுக்கப்பட்ட வேலைகள், இன்டர்ன்ஷிப்கள் மற்றும் 12வது பாஸ் பதவிகளுக்கு விண்ணப்பிக்கவும்.',
    'services.skillDevelopment': 'திறன் மேம்பாடு',
    'services.skillDevelopmentDesc': 'கவனமான படிப்புகள் மற்றும் பயிற்சி பணிகளுடன் தொழில்நுட்ப, தொடர்பு மற்றும் வாழ்க்கை திறன்களை கற்றுக்கொள்ளுங்கள்.',
    'services.expertCounseling': 'நிபுணர் ஆலோசனை',
    'services.expertCounselingDesc': 'சந்தேகங்களை தெளிவுபடுத்த மூத்த கற்பவர்கள் மற்றும் ஆலோசகர்களுடன் ஒன்றுக்கொன்று அமர்வுகளை பதிவு செய்யுங்கள்.',
    'services.aiAssistant': 'AI தொழில் உதவியாளர்',
    'services.aiAssistantDesc': 'தொழில்கள், படிப்புகள், வேலைகள் அல்லது JKKN சேர்க்கைகள் பற்றி JKKN AI-யிடம் எதையும் கேளுங்கள்—24/7.',
    
    // Footer
    'footer.title': 'JKKN AI ஹொரைசன்ஸ்: கண்டறி, வடிவமை, செய் - வழிகாட்டி',
    'footer.tagline': 'கல்வி மற்றும் சுகாதாரத்தில் 70+ ஆண்டுகள் சிறப்பு',
    'footer.copyright': '© 2025 ஜே.கே.கே. நாட்ராஜா நிறுவனங்கள். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    'footer.about': 'JKKN பற்றி',
    'footer.events': 'நிகழ்வுகள்',
    'footer.contact': 'தொடர்பு',
    'footer.admin': 'நிர்வாகி',
    
    // CTA Section
    'cta.title': 'உங்கள் எதிர்காலத்தை வடிவமைக்க தயாரா?',
    'cta.description': 'JKKN AI ஹொரைசன்ஸுடன் தங்கள் தொழில் பாதையை கண்டறிந்த ஆயிரக்கணக்கான கற்பவர்களுடன் சேருங்கள்.',
    'cta.startJourney': 'உங்கள் பயணத்தை தொடங்குங்கள்',
    'cta.exploreJobs': 'வேலைகளை ஆராயுங்கள்',
    
    // Common
    'common.loading': 'ஏற்றுகிறது...',
    'common.back': 'பின்னால்',
    'common.next': 'அடுத்து',
    'common.submit': 'சமர்ப்பி',
    'common.cancel': 'ரத்து செய்',
    'common.save': 'சேமி',
    'common.search': 'தேடு',
    'common.filter': 'வடிகட்டு',
    'common.viewAll': 'அனைத்தும் காண்க',
    'common.learnMore': 'மேலும் அறிக',
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('jkkn_language');
      return (stored as Language) || 'en';
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('jkkn_language', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
