import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const checklist = [
  { icon: '🏠', item: 'Hostel (Boys / Girls)', question: 'Is hostel available? AC/Non-AC? Fees? Food included?' },
  { icon: '🚌', item: 'College Bus / Transport', question: 'How many bus routes? Monthly pass cost? Distance covered?' },
  { icon: '📚', item: 'Library & Digital Library', question: 'Book count? E-journals? Study hours? Open on weekends?' },
  { icon: '🔬', item: 'Laboratories', question: 'How many labs? Updated equipment? Computer labs? Internet speed?' },
  { icon: '🏟️', item: 'Sports Facilities', question: 'Indoor/Outdoor? Cricket, Football, Volleyball? Sports quota?' },
  { icon: '🎭', item: 'Cultural Events / Fests', question: 'Annual fest? Inter-college events? Cultural clubs?' },
  { icon: '💻', item: 'Hackathons / Tech Fests', question: 'Coding clubs? Annual hackathon? Tech competitions?' },
  { icon: '🏅', item: 'NSS / NCC', question: 'NSS unit available? NCC? Extra credit for activities?' },
  { icon: '📶', item: 'WiFi / Internet', question: 'Full campus WiFi? Speed? Free or paid?' },
  { icon: '❄️', item: 'AC Classrooms', question: 'All rooms AC? Only seminar halls? Labs AC?' },
  { icon: '🍽️', item: 'Canteen / Mess', question: 'Veg/Non-veg? Affordable? Hygienic? Timings?' },
  { icon: '🏋️', item: 'Gym / Fitness Center', question: 'Available? Free for students? Equipment quality?' },
  { icon: '💼', item: 'Placement Cell', question: 'Placement %? Top companies visiting? Average package? Internships?' },
  { icon: '🎓', item: 'Scholarships', question: 'Govt scholarships processed? Merit scholarships? Fee concession?' },
  { icon: '🛡️', item: 'Anti-Ragging & Safety', question: 'Anti-ragging committee? CCTV? Women safety cell? Complaints process?' },
  { icon: '🏥', item: 'Medical / First Aid', question: 'Medical room on campus? Tie-up hospital? Insurance?' },
  { icon: '🏛️', item: 'Auditorium / Seminar Hall', question: 'Capacity? AV equipment? Used for guest lectures?' },
  { icon: '🅿️', item: 'Parking', question: 'Two-wheeler/Car parking? Free or paid? Covered?' },
];

export const FacilityChecklist = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl overflow-hidden mb-4 md:mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 md:px-5 py-2.5 md:py-3 text-left"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">📋</span>
          <div>
            <p className="text-xs md:text-sm font-bold text-emerald-800">
              College Visit Checklist — What to Ask About Facilities
            </p>
            <p className="text-[10px] md:text-xs text-emerald-600">
              கல்லூரி வருகையின் போது கேட்க வேண்டிய முக்கிய கேள்விகள்
            </p>
          </div>
        </div>
        {isOpen ? <ChevronUp className="h-4 w-4 text-emerald-600 flex-shrink-0" /> : <ChevronDown className="h-4 w-4 text-emerald-600 flex-shrink-0" />}
      </button>

      {isOpen && (
        <div className="px-3 md:px-5 pb-3 md:pb-4 border-t border-emerald-200">
          <p className="text-[10px] md:text-xs text-gray-500 mt-2 mb-3">
            Before choosing a college, visit and ask these questions directly. Each college has different facilities — don't assume, always verify.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {checklist.map((item, i) => (
              <div key={i} className="flex items-start gap-2 bg-white rounded-lg p-2 md:p-2.5 border border-gray-100">
                <span className="text-base md:text-lg flex-shrink-0">{item.icon}</span>
                <div className="min-w-0">
                  <p className="text-xs md:text-sm font-semibold text-gray-800">{item.item}</p>
                  <p className="text-[10px] md:text-xs text-gray-500 leading-snug">{item.question}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-2 md:p-3">
            <p className="text-[10px] md:text-xs text-amber-800">
              <strong>Tip:</strong> Take a screenshot of this checklist before visiting any college. Ask these questions to the admission office directly. Click the green <strong>"Facility Details"</strong> button on any college to search for their facility information online.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
