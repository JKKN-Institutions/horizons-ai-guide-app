const newsItems = [
  "JKKN Founders Day Celebration 2025 - Feb 21 | Komarapalayam Campus",
  "Career Guidance Workshop for 12th Learners - Feb 20",
  "Founder Book Opening 2025 - Special Edition Release",
  "JKKN Mega Job Fair 2025 - Registration Open Now",
];

const NewsTicker = () => {
  return (
    <div className="bg-secondary text-secondary-foreground py-2 overflow-hidden">
      <div className="flex items-center">
        <span className="bg-accent text-accent-foreground px-4 py-1 text-sm font-semibold flex-shrink-0 mr-4">
          Latest:
        </span>
        <div className="overflow-hidden flex-1">
          <div className="animate-ticker flex whitespace-nowrap">
            {[...newsItems, ...newsItems].map((news, index) => (
              <span key={index} className="mx-8 text-sm font-medium">
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
