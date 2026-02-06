import { Check, BookOpen } from "lucide-react";
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
    <div
      onClick={onClick}
      className={cn(
        "relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300",
        isSelected
          ? `${stream.selectedBorder} ${stream.selectedBg} shadow-lg scale-[1.02]`
          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
      )}
    >
      {group.badge && (
        <div className={cn("absolute -top-2 -right-2 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold", stream.accentClass)}>
          {group.badge}
        </div>
      )}
      {group.popular && !group.badge && (
        <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">
          🔥 Popular
        </div>
      )}

      <div className="flex items-center justify-between mb-3">
        <span className={cn("text-2xl font-bold", stream.textClass)}>{group.code}</span>
        {isSelected && (
          <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", stream.accentClass)}>
            <Check className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      <div className="space-y-1 mb-3">
        {group.subjects.map((subject, idx) => (
          <div key={idx} className="text-xs text-gray-600 flex items-center gap-1.5">
            <div className={cn("w-1.5 h-1.5 rounded-full", stream.dotClass)} />
            {subject}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {group.careers.slice(0, 3).map((career, idx) => (
          <span key={idx} className={cn("text-[10px] px-2 py-0.5 rounded-full", stream.tagBg, stream.tagText)}>
            {career}
          </span>
        ))}
      </div>

      <div className="text-xs text-gray-500 flex items-center gap-1">
        <BookOpen className="w-3 h-3" />
        {group.courseCount} courses
      </div>
    </div>
  );
};

export default GroupCard;
