import { Check, BookOpen, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StreamGroup, StreamData } from "./courseExplorerData";

interface GroupCardProps {
  group: StreamGroup;
  stream: StreamData;
  isSelected: boolean;
  onClick: () => void;
}

const GroupCard = ({ group, stream, isSelected, onClick }: GroupCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left relative p-4 rounded-xl border-2 transition-all active:scale-[0.98]",
        isSelected
          ? `${stream.selectedBorder} ${stream.selectedBg} shadow-lg`
          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
      )}
    >
      {/* Badge */}
      {(group.badge || group.popular) && (
        <div className={cn(
          "absolute -top-2.5 right-3 text-white text-xs px-2.5 py-0.5 rounded-full font-bold",
          group.badge ? stream.accentClass : "bg-pink-500"
        )}>
          {group.badge || '🔥 Popular'}
        </div>
      )}

      <div className="flex items-start gap-3">
        {/* Group Code */}
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-extrabold text-lg", stream.bgClass, stream.textClass)}>
          {group.code}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Subjects */}
          <div className="flex flex-wrap gap-1 mb-2">
            {group.subjects.map((subject, idx) => (
              <span key={idx} className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md">
                {subject}
              </span>
            ))}
          </div>

          {/* Careers */}
          <div className="flex flex-wrap gap-1 mb-2">
            {group.careers.slice(0, 4).map((career, idx) => (
              <span key={idx} className={cn("text-xs px-2 py-0.5 rounded-md font-medium", stream.tagBg, stream.tagText)}>
                {career}
              </span>
            ))}
          </div>

          {/* Course count */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> {group.courseCount} courses
            </span>
            {isSelected ? (
              <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", stream.accentClass)}>
                <Check className="w-3.5 h-3.5 text-white" />
              </div>
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default GroupCard;
