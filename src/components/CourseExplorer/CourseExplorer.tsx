import { useState } from "react";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import StreamSection from "./StreamSection";
import CourseResults from "./CourseResults";
import CourseDetailModal from "./CourseDetailModal";
import { streamsData, boards, getCoursesForGroup } from "./courseExplorerData";
import type { CourseInfo } from "./courseExplorerData";

const CourseExplorer = () => {
  const [selectedBoard, setSelectedBoard] = useState("tn");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<CourseInfo | null>(null);

  const courseCategories = selectedGroup ? getCoursesForGroup(selectedGroup) : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-white/20 p-3 rounded-xl">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Course Explorer</h1>
            <p className="text-white/80 text-sm">Discover the perfect course for your future</p>
          </div>
        </div>
        <p className="text-sm text-white/70 mt-2">
          உங்கள் எதிர்காலத்திற்கான சரியான படிப்பைக் கண்டறியுங்கள்
        </p>
      </div>

      {/* Board Selector */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Select Your Board</p>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {boards.map((board) => (
            <button
              key={board.id}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm font-medium",
                selectedBoard === board.id
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
              onClick={() => setSelectedBoard(board.id)}
            >
              <span>{board.icon}</span>
              <span>{board.name}</span>
              {board.isDefault && selectedBoard === board.id && (
                <span className="bg-emerald-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Group Selector */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">
          Select Your 12th Group
          {selectedGroup && (
            <button
              onClick={() => setSelectedGroup(null)}
              className="ml-2 text-xs text-purple-600 hover:underline"
            >
              Clear selection
            </button>
          )}
        </p>

        {Object.entries(streamsData).map(([key, stream]) => (
          <StreamSection
            key={key}
            stream={stream}
            selectedGroup={selectedGroup}
            onGroupSelect={setSelectedGroup}
          />
        ))}
      </div>

      {/* Course Results */}
      {selectedGroup && (
        <CourseResults
          categories={courseCategories}
          groupCode={selectedGroup}
          onViewDetails={setSelectedCourse}
        />
      )}

      {/* Course Detail Modal */}
      <CourseDetailModal
        course={selectedCourse}
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
    </div>
  );
};

export default CourseExplorer;
