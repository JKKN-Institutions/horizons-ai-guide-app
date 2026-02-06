import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import GroupCard from "./GroupCard";
import type { StreamData } from "./courseExplorerData";

interface StreamSectionProps {
  stream: StreamData;
  selectedGroup: string | null;
  onGroupSelect: (code: string) => void;
}

const StreamSection = ({ stream, selectedGroup, onGroupSelect }: StreamSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={cn("rounded-2xl border p-4 mb-4", stream.bgClass, stream.borderClass)}>
      <div
        className="flex items-center justify-between cursor-pointer mb-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{stream.title}</h3>
          <p className="text-sm text-gray-500">{stream.subtitle} • {stream.groups.length} group{stream.groups.length > 1 ? "s" : ""}</p>
        </div>
        <ChevronDown className={cn("w-5 h-5 transition-transform text-gray-500", isExpanded && "rotate-180")} />
      </div>

      {isExpanded && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {stream.groups.map((group) => (
            <GroupCard
              key={group.code}
              group={group}
              stream={stream}
              isSelected={selectedGroup === group.code}
              onClick={() => onGroupSelect(group.code)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StreamSection;
