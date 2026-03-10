import { useState, useMemo } from "react";
import { BookOpen, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import StreamSection from "./StreamSection";
import CourseResults from "./CourseResults";
import CourseDetailModal from "./CourseDetailModal";
import { boards, getCoursesForGroup, getStreamsForBoard } from "./courseExplorerData";
import type { CourseInfo } from "./courseExplorerData";

const CourseExplorer = () => {
  const [selectedBoard, setSelectedBoard] = useState("tn");
  const [selectedStream, setSelectedStream] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<CourseInfo | null>(null);

  const currentStreams = useMemo(() => getStreamsForBoard(selectedBoard), [selectedBoard]);
  const streamKeys = useMemo(() => Object.keys(currentStreams), [currentStreams]);
  const courseCategories = selectedGroup ? getCoursesForGroup(selectedGroup) : [];

  const boardInfo = boards.find(b => b.id === selectedBoard);

  const handleBoardChange = (boardId: string) => {
    setSelectedBoard(boardId);
    setSelectedStream(null);
    setSelectedGroup(null);
  };

  const handleStreamSelect = (key: string) => {
    if (selectedStream === key) {
      setSelectedStream(null);
      setSelectedGroup(null);
    } else {
      setSelectedStream(key);
      setSelectedGroup(null);
    }
  };

  return (
    <div className="space-y-5">

      {/* ── COMPACT HERO ── */}
      <div className="bg-gradient-to-br from-violet-600 to-purple-700 text-white rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center border border-white/30">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold">Course Explorer</h1>
            <p className="text-sm text-white/70">உங்கள் எதிர்காலப் படிப்பைக் கண்டறியுங்கள்</p>
          </div>
        </div>
        <p className="text-xs text-white/60 mt-2">Select your board → stream → group → see all available courses</p>
      </div>

      {/* ── STEP 1: BOARD SELECTOR ── */}
      <div>
        <p className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center">1</span>
          Select Your Board
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
          {boards.map((board) => (
            <button
              key={board.id}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all text-sm font-semibold border-2",
                selectedBoard === board.id
                  ? "bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-200"
                  : "bg-white text-gray-700 border-gray-200 hover:border-violet-300"
              )}
              onClick={() => handleBoardChange(board.id)}
            >
              <span className="text-base">{board.icon}</span>
              <span>{board.id === 'tn' ? 'TN Board' : board.id === 'icse' ? 'ICSE' : board.id === 'nios' ? 'NIOS' : board.id === 'other' ? 'Others' : board.name}</span>
            </button>
          ))}
        </div>
        {boardInfo && (
          <p className="text-xs text-gray-500 mt-1.5 ml-7">
            {boardInfo.icon} {boardInfo.name}
            {boardInfo.id === 'tn' && ' — HSC Group Codes (101, 201, 301, 401)'}
            {boardInfo.id === 'cbse' && ' — PCM, PCB, Commerce, Humanities'}
            {boardInfo.id === 'icse' && ' — ISC Science, Commerce, Humanities'}
            {boardInfo.id === 'nios' && ' — Flexible subject combinations'}
          </p>
        )}
      </div>

      {/* ── STEP 2: STREAM SELECTOR ── */}
      <div>
        <p className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center">2</span>
          Select Your Stream
          {selectedStream && (
            <button
              onClick={() => { setSelectedStream(null); setSelectedGroup(null); }}
              className="ml-auto text-xs font-bold text-violet-600 flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" /> All Streams
            </button>
          )}
        </p>

        {/* Stream Cards — full width on mobile */}
        {!selectedStream && (
          <div className="space-y-2">
            {streamKeys.map((key) => {
              const stream = currentStreams[key];
              return (
                <button
                  key={key}
                  onClick={() => handleStreamSelect(key)}
                  className={cn(
                    "w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all active:scale-[0.98]",
                    stream.bgClass, stream.borderClass, "hover:shadow-md"
                  )}
                >
                  <span className="text-2xl flex-shrink-0">{stream.title.split(' ')[0]}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-gray-900">{stream.title.replace(/^[^\s]+\s/, '')}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{stream.subtitle} · {stream.groups.length} group{stream.groups.length > 1 ? "s" : ""}</p>
                  </div>
                  <span className="text-xs font-bold text-gray-400">→</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Groups for selected stream */}
        {selectedStream && currentStreams[selectedStream] && (
          <StreamSection
            stream={currentStreams[selectedStream]}
            selectedGroup={selectedGroup}
            onGroupSelect={setSelectedGroup}
          />
        )}
      </div>

      {/* ── STEP 3: COURSE RESULTS ── */}
      {selectedGroup && (
        <div>
          <p className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center">3</span>
            Available Courses
          </p>
          <CourseResults
            categories={courseCategories}
            groupCode={selectedGroup}
            onViewDetails={setSelectedCourse}
          />
        </div>
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
