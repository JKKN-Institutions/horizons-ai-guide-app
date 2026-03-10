import { cn } from "@/lib/utils";
import GroupCard from "./GroupCard";
import type { StreamData } from "./courseExplorerData";

interface StreamSectionProps {
  stream: StreamData;
  selectedGroup: string | null;
  onGroupSelect: (code: string) => void;
}

const StreamSection = ({ stream, selectedGroup, onGroupSelect }: StreamSectionProps) => {
  return (
    <div className={cn("rounded-2xl border-2 p-4", stream.bgClass, stream.borderClass)}>
      <div className="mb-3">
        <h3 className="text-base font-bold text-gray-900">{stream.title}</h3>
        <p className="text-xs text-gray-500">{stream.subtitle} · {stream.groups.length} group{stream.groups.length > 1 ? "s" : ""} · Tap to see courses</p>
      </div>

      {/* Single column on mobile, 2 on tablet+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
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
    </div>
  );
};

export default StreamSection;
