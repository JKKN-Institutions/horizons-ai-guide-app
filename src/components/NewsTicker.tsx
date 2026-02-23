import { useLanguage } from "@/hooks/useLanguage";

const newsItemsByLang: Record<string, string[]> = {
  en: [
    "🔴 JEE Main 2026 Session 1 - Jan 22-31 | Registration Open!",
    "📢 NEET UG 2026 Registration Opens Feb 1",
    "💰 Scholarship Deadline Feb 28 - Apply on NSP!",
    "🎯 Free Career Guidance Workshop - Register Now!",
    "📚 TN 12th Exams March 1-20",
    "🆕 AI Career Predictor Launched!",
  ],
  ta: [
    "🔴 JEE Main 2026 அமர்வு 1 - ஜன 22-31 | பதிவு திறந்துள்ளது!",
    "📢 NEET UG 2026 பதிவு பிப்.1 தொடங்குகிறது",
    "💰 உதவித்தொகை காலக்கெடு பிப்.28 - NSP-ல் விண்ணப்பிக்கவும்!",
    "🎯 இலவச தொழில் வழிகாட்டுதல் பட்டறை - இப்போதே பதிவு செய்யுங்கள்!",
    "📚 TN 12ஆம் வகுப்பு தேர்வுகள் மார்ச் 1-20",
    "🆕 AI தொழில் கணிப்பான் அறிமுகம்!",
  ],
  hi: [
    "🔴 JEE Main 2026 सत्र 1 - जनवरी 22-31 | पंजीकरण खुला!",
    "📢 NEET UG 2026 पंजीकरण 1 फरवरी से शुरू",
    "💰 छात्रवृत्ति की अंतिम तिथि 28 फरवरी - NSP पर आवेदन करें!",
    "🎯 मुफ्त करियर मार्गदर्शन कार्यशाला - अभी पंजीकरण करें!",
    "📚 TN 12वीं परीक्षा 1-20 मार्च",
    "🆕 AI करियर प्रेडिक्टर लॉन्च!",
  ],
  te: [
    "🔴 JEE Main 2026 సెషన్ 1 - జన 22-31 | నమోదు తెరవబడింది!",
    "📢 NEET UG 2026 నమోదు ఫిబ్ర 1 నుండి ప్రారంభం",
    "💰 స్కాలర్‌షిప్ గడువు ఫిబ్ర 28 - NSP లో దరఖాస్తు చేయండి!",
    "🎯 ఉచిత కెరీర్ గైడెన్స్ వర్క్‌షాప్ - ఇప్పుడే రిజిస్టర్ చేయండి!",
    "📚 TN 12వ తరగతి పరీక్షలు మార్చి 1-20",
    "🆕 AI కెరీర్ ప్రెడిక్టర్ ప్రారంభం!",
  ],
  kn: [
    "🔴 JEE Main 2026 ಸೆಶನ್ 1 - ಜನ 22-31 | ನೋಂದಣಿ ತೆರೆದಿದೆ!",
    "📢 NEET UG 2026 ನೋಂದಣಿ ಫೆಬ್ 1 ರಿಂದ ಪ್ರಾರಂಭ",
    "💰 ವಿದ್ಯಾರ್ಥಿವೇತನ ಗಡುವು ಫೆಬ್ 28 - NSP ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ!",
    "🎯 ಉಚಿತ ಕೆರಿಯರ್ ಮಾರ್ಗದರ್ಶನ ಕಾರ್ಯಾಗಾರ - ಈಗಲೇ ನೋಂದಾಯಿಸಿ!",
    "📚 TN 12ನೇ ತರಗತಿ ಪರೀಕ್ಷೆಗಳು ಮಾರ್ಚ್ 1-20",
    "🆕 AI ಕೆರಿಯರ್ ಪ್ರೆಡಿಕ್ಟರ್ ಬಿಡುಗಡೆ!",
  ],
  ml: [
    "🔴 JEE Main 2026 സെഷൻ 1 - ജനു 22-31 | രജിസ്ട്രേഷൻ തുറന്നു!",
    "📢 NEET UG 2026 രജിസ്ട്രേഷൻ ഫെബ്രുവരി 1 മുതൽ",
    "💰 സ്കോളർഷിപ്പ് അവസാന തീയതി ഫെബ്രുവരി 28 - NSP-ൽ അപേക്ഷിക്കുക!",
    "🎯 സൗജന്യ കരിയർ ഗൈഡൻസ് വർക്ക്ഷോപ്പ് - ഇപ്പോൾ രജിസ്റ്റർ ചെയ്യുക!",
    "📚 TN 12-ാം ക്ലാസ് പരീക്ഷകൾ മാർച്ച് 1-20",
    "🆕 AI കരിയർ പ്രെഡിക്ടർ ലോഞ്ച്!",
  ],
  bn: [
    "🔴 JEE Main 2026 সেশন 1 - জানু 22-31 | নিবন্ধন খোলা!",
    "📢 NEET UG 2026 নিবন্ধন ফেব্রুয়ারি 1 থেকে শুরু",
    "💰 বৃত্তির শেষ তারিখ ফেব্রুয়ারি 28 - NSP-তে আবেদন করুন!",
    "🎯 বিনামূল্যে ক্যারিয়ার গাইডেন্স ওয়ার্কশপ - এখনই নিবন্ধন করুন!",
    "📚 TN 12তম শ্রেণির পরীক্ষা মার্চ 1-20",
    "🆕 AI ক্যারিয়ার প্রেডিক্টর লঞ্চ!",
  ],
};

const badgeLabel: Record<string, string> = {
  en: "Latest:",
  ta: "சமீபத்தியது:",
  hi: "नवीनतम:",
  te: "తాజా:",
  kn: "ಇತ್ತೀಚಿನ:",
  ml: "ഏറ്റവും പുതിയത്:",
  bn: "সর্বশেষ:",
  mr: "नवीनतम:",
  gu: "તાજેતરનું:",
  pa: "ਨਵੀਨਤਮ:",
};

const NewsTicker = () => {
  const { language } = useLanguage();
  const items = newsItemsByLang[language] || newsItemsByLang['en'];
  const badge = badgeLabel[language] || badgeLabel['en'];

  return (
    <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 text-white py-2.5 overflow-hidden shadow-sm">
      <div className="flex items-center">
        <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 text-sm font-bold flex-shrink-0 ml-4 mr-4 rounded shadow-md">
          {badge}
        </span>
        <div className="overflow-hidden flex-1">
          <div className="animate-ticker flex whitespace-nowrap">
            {[...items, ...items].map((news, index) => (
              <span key={index} className="mx-8 text-sm font-medium tracking-wide">
                {news}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
