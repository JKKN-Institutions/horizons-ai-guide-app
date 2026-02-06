import { useState } from "react";
import { Clock, GraduationCap, IndianRupee, TrendingUp, ChevronDown, Building2, Zap, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { CourseInfo } from "./courseExplorerData";

interface CourseCardProps {
  course: CourseInfo;
  onViewDetails?: (course: CourseInfo) => void;
}

const DemandBar = ({ level }: { level: number }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <div
        key={i}
        className={cn(
          "h-2 w-4 rounded-sm",
          i < level
            ? level >= 4 ? "bg-emerald-500" : level >= 3 ? "bg-amber-500" : "bg-red-400"
            : "bg-gray-200"
        )}
      />
    ))}
    <span className="text-[10px] text-gray-500 ml-1">
      {level >= 4 ? "High" : level >= 3 ? "Medium" : "Low"}
    </span>
  </div>
);

const CourseCard = ({ course, onViewDetails }: CourseCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all">
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h4 className="font-semibold text-sm text-gray-900">{course.shortName}</h4>
              {course.hot && (
                <Badge className="bg-red-500 text-white text-[10px] px-1.5 py-0">🔥 Hot</Badge>
              )}
              {course.entranceRequired && (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-amber-300 text-amber-700">Entrance</Badge>
              )}
              {!course.entranceRequired && (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-emerald-300 text-emerald-700">Merit</Badge>
              )}
            </div>
            <p className="text-xs text-gray-500">{course.name}</p>
          </div>
        </div>

        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{course.description}</p>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Clock className="w-3 h-3 text-blue-500" />
            {course.duration}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <IndianRupee className="w-3 h-3 text-emerald-500" />
            {course.fee}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <TrendingUp className="w-3 h-3 text-purple-500" />
            {course.salaryRange}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <GraduationCap className="w-3 h-3 text-amber-500" />
            {course.entrance}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <DemandBar level={course.demandLevel} />
          <div className="flex items-center gap-2">
            {onViewDetails && (
              <button
                onClick={() => onViewDetails(course)}
                className="text-xs text-white bg-purple-600 px-3 py-1 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Details
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-purple-600 font-medium flex items-center gap-1 hover:underline"
            >
              {isExpanded ? "Less" : "More"}
              <ChevronDown className={cn("w-3 h-3 transition-transform", isExpanded && "rotate-180")} />
            </button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-100 p-4 bg-gray-50/50 space-y-3">
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
              <Zap className="w-3 h-3" /> Career Options
            </p>
            <div className="flex flex-wrap gap-1">
              {course.careers.map((c, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">{c}</span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
              <Building2 className="w-3 h-3" /> Top Colleges
            </p>
            <div className="flex flex-wrap gap-1">
              {course.topColleges.map((c, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{c}</span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-700 mb-1.5">🎯 Key Skills</p>
            <div className="flex flex-wrap gap-1">
              {course.skills.map((s, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">{s}</span>
              ))}
            </div>
          </div>

          {course.neetCutoff && (
            <div className="text-xs text-gray-600 bg-amber-50 border border-amber-200 rounded-lg p-2">
              <span className="font-semibold">NEET Cutoff:</span> {course.neetCutoff}
            </div>
          )}

          {course.abroadOptions && (
            <div className="text-xs text-gray-600 bg-blue-50 border border-blue-200 rounded-lg p-2 flex items-center gap-1">
              <Globe className="w-3 h-3 text-blue-500" />
              <span className="font-semibold">Abroad:</span> {course.abroadOptions}
            </div>
          )}

          {course.passRate && (
            <div className="text-xs text-gray-600 bg-red-50 border border-red-200 rounded-lg p-2">
              <span className="font-semibold">Pass Rate:</span> {course.passRate}
            </div>
          )}

          {course.path && (
            <div>
              <p className="text-xs font-semibold text-gray-700 mb-1.5">📋 Path</p>
              <div className="flex flex-wrap gap-1">
                {course.path.map((p, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">
                    {i + 1}. {p}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseCard;
