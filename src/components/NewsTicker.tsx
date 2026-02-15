const newsItems = [
  "🔴 JEE Main 2026 Session 1 - Jan 22-31 | Registration Open!",
  "📢 NEET UG 2026 Registration Opens Feb 1",
  "🎓 Founders Day - Feb 21, 2026 | Komarapalayam Campus",
  "💰 Scholarship Deadline Feb 28 - Apply on NSP!",
  "🎯 Free Career Guidance Workshop - Register Now!",
  "📚 TN 12th Exams March 1-20",
  "🆕 AI Career Predictor Launched!",
];

const NewsTicker = () => {
  return (
    <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 text-white py-2.5 overflow-hidden shadow-sm">
      <div className="flex items-center">
        <span className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-1 text-sm font-bold flex-shrink-0 ml-4 mr-4 rounded shadow-md">
          Latest:
        </span>
        <div className="overflow-hidden flex-1">
          <div className="animate-ticker flex whitespace-nowrap">
            {[...newsItems, ...newsItems].map((news, index) => (
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
