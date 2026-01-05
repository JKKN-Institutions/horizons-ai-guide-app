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
    'common.change': 'Change',
    'common.startAssessment': 'Start Assessment',
    
    // AI Career Predictor
    'predictor.title': 'AI Career Predictor',
    'predictor.subtitle': 'Get AI-powered career predictions based on your interests and skills',
    'predictor.predictCareer': 'Predict My Career',
    'predictor.selectStream': 'Select Your Stream',
    'predictor.selectPercentage': 'Expected 12th Percentage',
    'predictor.selectInterests': 'Select Your Interests',
    'predictor.selectInterestsDesc': 'Choose up to 3 areas that excite you the most',
    'predictor.selectPriorities': 'What matters most to you?',
    'predictor.selectPrioritiesDesc': 'Pick up to 2 priorities',
    'predictor.budgetDuration': 'Budget & Duration',
    'predictor.budget': 'Budget for Education',
    'predictor.duration': 'Preferred Course Duration',
    'predictor.analyzing': 'Analyzing your interests...',
    'predictor.matching': 'Matching with 200+ courses...',
    'predictor.finding': 'Finding best courses for you...',
    'predictor.generating': 'Generating recommendations...',
    'predictor.yourRecommendations': 'Your Course Recommendations',
    'predictor.showingResults': 'Showing courses based on your profile',
    'predictor.matchScore': 'Match Score',
    'predictor.fees': 'Fees',
    'predictor.entranceExam': 'Entrance Exam',
    'predictor.viewDetails': 'View Details',
    'predictor.compare': 'Compare',
    'predictor.downloadPdf': 'Download PDF',
    'predictor.shareWhatsApp': 'Share on WhatsApp',
    'predictor.print': 'Print',
    'predictor.showFavorites': 'Show Favorites Only',
    'predictor.clearFilters': 'Clear Filters',
    'predictor.sortBy': 'Sort By',
    'predictor.filterBy': 'Filter',
    'predictor.allDurations': 'All Durations',
    'predictor.shortCourses': 'Short (2-3 years)',
    'predictor.mediumCourses': 'Medium (4 years)',
    'predictor.longCourses': 'Long (5+ years)',
    'predictor.allFees': 'All Fees',
    'predictor.lowFees': 'Under ₹1L',
    'predictor.mediumFees': '₹1L - ₹3L',
    'predictor.highFees': 'Above ₹3L',
    'predictor.allExams': 'All Exams',
    'predictor.step': 'Step',
    'predictor.of': 'of',
    'predictor.basicInfo': 'Basic Info',
    'predictor.interestsPriorities': 'Interests & Priorities',
    
    // Interest Cards
    'interest.technology': 'Technology & Computers',
    'interest.science': 'Science & Research',
    'interest.healthcare': 'Healthcare & Medicine',
    'interest.business': 'Business & Finance',
    'interest.law': 'Law & Justice',
    'interest.arts': 'Arts & Design',
    'interest.aviation': 'Aviation & Travel',
    'interest.construction': 'Building & Construction',
    'interest.media': 'Media & Journalism',
    'interest.teaching': 'Teaching & Education',
    'interest.agriculture': 'Agriculture & Nature',
    'interest.defence': 'Defence & Security',
    'interest.hospitality': 'Hotel & Hospitality',
    'interest.data': 'Data & Analytics',
    
    // Priority Options
    'priority.salary': 'High Salary',
    'priority.security': 'Job Security',
    'priority.balance': 'Work-Life Balance',
    'priority.growth': 'Fast Growth',
    'priority.helping': 'Helping Others',
    
    // Streams
    'stream.pcm': 'Science (PCM - Physics, Chemistry, Mathematics)',
    'stream.pcb': 'Science (PCB - Physics, Chemistry, Biology)',
    'stream.pcmb': 'Science (PCMB - All four subjects)',
    'stream.commerce_math': 'Commerce (with Mathematics)',
    'stream.commerce': 'Commerce (without Mathematics)',
    'stream.arts': 'Arts / Humanities',
    
    // Career Assessment 12th Learners
    'assessment12.title': 'What Should I Study After 12th?',
    'assessment12.tamilTitle': '12-ஆம் வகுப்புக்குப் பிறகு என்ன படிக்க வேண்டும்?',
    'assessment12.subtitle': 'Confused about your future? Let AI help you discover the perfect course based on your interests, skills and personality',
    'assessment12.introHeading': "Don't worry! Tell us your stream and we'll find the perfect course for YOU",
    'assessment12.introDesc': 'Take our AI-powered assessment to discover courses that match your personality, interests, and career goals.',
    'assessment12.welcomeBack': 'Welcome back!',
    'assessment12.completedAssessments': 'You\'re a {stream} student with {count} completed assessment(s).',
    'assessment12.startJourney': 'Start Your Discovery Journey',
    'assessment12.takeAnother': 'Take Another Assessment',
    'assessment12.viewPastResults': 'View Past Results',
    'assessment12.questions': 'Questions',
    'assessment12.scenarioBased': 'Scenario-based questions',
    'assessment12.minutes': 'Minutes',
    'assessment12.quickInsightful': 'Quick and insightful',
    'assessment12.courses': 'Courses',
    'assessment12.personalizedRecs': 'Personalized recommendations',
    'assessment12.selectStreamTitle': 'First, tell us about your 12th standard',
    'assessment12.selectStreamDesc': 'Select your stream to get personalized course recommendations',
    'assessment12.detailsTitle': 'A few more details...',
    'assessment12.detailsDesc': 'This helps us give you better recommendations',
    'assessment12.marksLabel': 'Your expected/obtained 12th marks:',
    'assessment12.returningUser': 'Returning user: We\'ll show you completely new questions you haven\'t seen before!',
    'assessment12.streamPCM': 'Science - PCM',
    'assessment12.streamPCMSub': 'Physics, Chemistry, Mathematics',
    'assessment12.streamPCB': 'Science - PCB',
    'assessment12.streamPCBSub': 'Physics, Chemistry, Biology',
    'assessment12.streamPCMB': 'Science - PCMB',
    'assessment12.streamPCMBSub': 'Physics, Chemistry, Maths & Biology',
    'assessment12.streamCommerce': 'Commerce',
    'assessment12.streamCommerceSub': 'Accountancy, Business Studies, Economics',
    'assessment12.streamArts': 'Arts / Humanities',
    'assessment12.streamArtsSub': 'History, Geography, Languages, Psychology',
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
    'common.change': 'மாற்று',
    'common.startAssessment': 'மதிப்பீட்டை தொடங்கு',
    
    // AI Career Predictor
    'predictor.title': 'AI தொழில் கணிப்பான்',
    'predictor.subtitle': 'உங்கள் ஆர்வங்கள் மற்றும் திறன்களின் அடிப்படையில் AI-இயங்கும் தொழில் கணிப்புகளைப் பெறுங்கள்',
    'predictor.predictCareer': 'எனது தொழிலைக் கணி',
    'predictor.selectStream': 'உங்கள் பிரிவைத் தேர்ந்தெடுக்கவும்',
    'predictor.selectPercentage': 'எதிர்பார்க்கப்படும் 12ஆம் வகுப்பு சதவீதம்',
    'predictor.selectInterests': 'உங்கள் ஆர்வங்களைத் தேர்ந்தெடுக்கவும்',
    'predictor.selectInterestsDesc': 'உங்களை மிகவும் உற்சாகப்படுத்தும் 3 துறைகளைத் தேர்ந்தெடுக்கவும்',
    'predictor.selectPriorities': 'உங்களுக்கு மிக முக்கியமானது என்ன?',
    'predictor.selectPrioritiesDesc': '2 முன்னுரிமைகளைத் தேர்ந்தெடுக்கவும்',
    'predictor.budgetDuration': 'பட்ஜெட் & கால அளவு',
    'predictor.budget': 'கல்விக்கான பட்ஜெட்',
    'predictor.duration': 'விரும்பிய படிப்பு கால அளவு',
    'predictor.analyzing': '🧠 உங்கள் ஆர்வங்களை பகுப்பாய்வு செய்கிறது...',
    'predictor.matching': '📊 200+ படிப்புகளுடன் பொருத்துகிறது...',
    'predictor.finding': '🎓 உங்களுக்கு சிறந்த படிப்புகளை கண்டறிகிறது...',
    'predictor.generating': '✨ பரிந்துரைகளை உருவாக்குகிறது...',
    'predictor.yourRecommendations': 'உங்கள் படிப்பு பரிந்துரைகள்',
    'predictor.showingResults': 'உங்கள் சுயவிவரத்தின் அடிப்படையில் படிப்புகளைக் காட்டுகிறது',
    'predictor.matchScore': 'பொருத்த மதிப்பெண்',
    'predictor.fees': 'கட்டணம்',
    'predictor.entranceExam': 'நுழைவுத் தேர்வு',
    'predictor.viewDetails': 'விவரங்களைக் காண்க',
    'predictor.compare': 'ஒப்பிடு',
    'predictor.downloadPdf': 'PDF பதிவிறக்கு',
    'predictor.shareWhatsApp': 'WhatsApp-இல் பகிர்',
    'predictor.print': 'அச்சிடு',
    'predictor.showFavorites': 'பிடித்தவை மட்டும் காட்டு',
    'predictor.clearFilters': 'வடிகட்டிகளை அழி',
    'predictor.sortBy': 'வரிசைப்படுத்து',
    'predictor.filterBy': 'வடிகட்டு',
    'predictor.allDurations': 'அனைத்து கால அளவுகள்',
    'predictor.shortCourses': 'குறுகிய (2-3 ஆண்டுகள்)',
    'predictor.mediumCourses': 'நடுத்தர (4 ஆண்டுகள்)',
    'predictor.longCourses': 'நீண்ட (5+ ஆண்டுகள்)',
    'predictor.allFees': 'அனைத்து கட்டணங்கள்',
    'predictor.lowFees': '₹1L கீழ்',
    'predictor.mediumFees': '₹1L - ₹3L',
    'predictor.highFees': '₹3L மேல்',
    'predictor.allExams': 'அனைத்து தேர்வுகள்',
    'predictor.step': 'படி',
    'predictor.of': '/',
    'predictor.basicInfo': 'அடிப்படை தகவல்',
    'predictor.interestsPriorities': 'ஆர்வங்கள் & முன்னுரிமைகள்',
    
    // Interest Cards
    'interest.technology': 'தொழில்நுட்பம் & கணினிகள்',
    'interest.science': 'அறிவியல் & ஆராய்ச்சி',
    'interest.healthcare': 'சுகாதாரம் & மருத்துவம்',
    'interest.business': 'வணிகம் & நிதி',
    'interest.law': 'சட்டம் & நீதி',
    'interest.arts': 'கலை & வடிவமைப்பு',
    'interest.aviation': 'விமானம் & பயணம்',
    'interest.construction': 'கட்டிடம் & நிர்மாணம்',
    'interest.media': 'ஊடகம் & பத்திரிகை',
    'interest.teaching': 'கற்பித்தல் & கல்வி',
    'interest.agriculture': 'வேளாண்மை & இயற்கை',
    'interest.defence': 'பாதுகாப்பு & பாதுகாப்பு',
    'interest.hospitality': 'ஹோட்டல் & விருந்தோம்பல்',
    'interest.data': 'தரவு & பகுப்பாய்வு',
    
    // Priority Options
    'priority.salary': 'உயர் சம்பளம்',
    'priority.security': 'வேலை பாதுகாப்பு',
    'priority.balance': 'வேலை-வாழ்க்கை சமநிலை',
    'priority.growth': 'விரைவான வளர்ச்சி',
    'priority.helping': 'பிறருக்கு உதவுதல்',
    
    // Streams
    'stream.pcm': 'அறிவியல் (PCM - இயற்பியல், வேதியியல், கணிதம்)',
    'stream.pcb': 'அறிவியல் (PCB - இயற்பியல், வேதியியல், உயிரியல்)',
    'stream.pcmb': 'அறிவியல் (PCMB - நான்கு பாடங்களும்)',
    'stream.commerce_math': 'வணிகம் (கணிதத்துடன்)',
    'stream.commerce': 'வணிகம் (கணிதம் இல்லாமல்)',
    'stream.arts': 'கலை / மனிதநேயம்',
    
    // Career Assessment 12th Learners
    'assessment12.title': 'What Should I Study After 12th?',
    'assessment12.tamilTitle': '12-ஆம் வகுப்புக்குப் பிறகு என்ன படிக்க வேண்டும்?',
    'assessment12.subtitle': 'உங்கள் எதிர்காலம் குறித்து குழப்பமா? உங்கள் ஆர்வங்கள், திறன்கள் மற்றும் ஆளுமையின் அடிப்படையில் சரியான படிப்பைக் கண்டறிய AI உதவட்டும்',
    'assessment12.introHeading': 'கவலைப்படாதீர்கள்! உங்கள் பிரிவைச் சொல்லுங்கள், உங்களுக்கு சரியான படிப்பைக் கண்டறிவோம்',
    'assessment12.introDesc': 'உங்கள் ஆளுமை, ஆர்வங்கள் மற்றும் தொழில் இலக்குகளுக்கு பொருந்தும் படிப்புகளைக் கண்டறிய எங்கள் AI-இயங்கும் மதிப்பீட்டை எடுங்கள்.',
    'assessment12.welcomeBack': 'மீண்டும் வருக!',
    'assessment12.completedAssessments': 'நீங்கள் {stream} மாணவர், {count} மதிப்பீடு(கள்) முடித்துள்ளீர்கள்.',
    'assessment12.startJourney': 'உங்கள் கண்டுபிடிப்பு பயணத்தை தொடங்குங்கள்',
    'assessment12.takeAnother': 'மற்றொரு மதிப்பீட்டை எடுங்கள்',
    'assessment12.viewPastResults': 'முந்தைய முடிவுகளைக் காண்க',
    'assessment12.questions': 'கேள்விகள்',
    'assessment12.scenarioBased': 'சூழ்நிலை அடிப்படையிலான கேள்விகள்',
    'assessment12.minutes': 'நிமிடங்கள்',
    'assessment12.quickInsightful': 'விரைவான மற்றும் நுண்ணறிவான',
    'assessment12.courses': 'படிப்புகள்',
    'assessment12.personalizedRecs': 'தனிப்பயனாக்கப்பட்ட பரிந்துரைகள்',
    'assessment12.selectStreamTitle': 'முதலில், உங்கள் 12ஆம் வகுப்பு பற்றி சொல்லுங்கள்',
    'assessment12.selectStreamDesc': 'தனிப்பயனாக்கப்பட்ட படிப்பு பரிந்துரைகளைப் பெற உங்கள் பிரிவைத் தேர்ந்தெடுக்கவும்',
    'assessment12.detailsTitle': 'இன்னும் சில விவரங்கள்...',
    'assessment12.detailsDesc': 'இது சிறந்த பரிந்துரைகளை வழங்க உதவுகிறது',
    'assessment12.marksLabel': 'உங்கள் எதிர்பார்க்கப்படும்/பெற்ற 12ஆம் வகுப்பு மதிப்பெண்கள்:',
    'assessment12.returningUser': 'திரும்பி வரும் பயனர்: நீங்கள் முன்பு பார்க்காத புதிய கேள்விகளைக் காட்டுவோம்!',
    'assessment12.streamPCM': 'அறிவியல் - PCM',
    'assessment12.streamPCMSub': 'இயற்பியல், வேதியியல், கணிதம்',
    'assessment12.streamPCB': 'அறிவியல் - PCB',
    'assessment12.streamPCBSub': 'இயற்பியல், வேதியியல், உயிரியல்',
    'assessment12.streamPCMB': 'அறிவியல் - PCMB',
    'assessment12.streamPCMBSub': 'இயற்பியல், வேதியியல், கணிதம் & உயிரியல்',
    'assessment12.streamCommerce': 'வணிகம்',
    'assessment12.streamCommerceSub': 'கணக்கியல், வணிக ஆய்வுகள், பொருளாதாரம்',
    'assessment12.streamArts': 'கலை / மனிதநேயம்',
    'assessment12.streamArtsSub': 'வரலாறு, புவியியல், மொழிகள், உளவியல்',
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
