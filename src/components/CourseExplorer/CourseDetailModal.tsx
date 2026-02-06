import { X, Clock, IndianRupee, TrendingUp, GraduationCap, Building2, Zap, Globe, Lightbulb, Share2, Heart } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CourseInfo } from "./courseExplorerData";

interface CourseDetailModalProps {
  course: CourseInfo | null;
  isOpen: boolean;
  onClose: () => void;
}

const DemandDots = ({ level }: { level: number }) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <div
        key={i}
        className={cn(
          "w-4 h-4 rounded-full",
          i < level
            ? level >= 4 ? "bg-emerald-500" : level >= 3 ? "bg-amber-500" : "bg-red-400"
            : "bg-gray-200"
        )}
      />
    ))}
  </div>
);

const CourseDetailModal = ({ course, isOpen, onClose }: CourseDetailModalProps) => {
  if (!course) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-6 rounded-t-lg">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <DialogTitle className="text-xl font-bold text-white">{course.shortName}</DialogTitle>
              {course.hot && <Badge className="bg-red-500 text-white text-xs">🔥 Hot</Badge>}
              {course.entranceRequired ? (
                <Badge className="bg-amber-400/30 text-white text-xs border-amber-300">Entrance</Badge>
              ) : (
                <Badge className="bg-emerald-400/30 text-white text-xs border-emerald-300">Merit</Badge>
              )}
            </div>
            <DialogDescription className="text-white/80 text-sm">{course.name}</DialogDescription>
          </DialogHeader>
          <p className="text-white/70 text-sm mt-2">{course.description}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-gray-50 border-b">
          <div className="text-center p-2">
            <Clock className="w-5 h-5 mx-auto mb-1 text-blue-500" />
            <div className="font-bold text-sm text-gray-800">{course.duration}</div>
            <div className="text-[10px] text-gray-500">Duration</div>
          </div>
          <div className="text-center p-2">
            <IndianRupee className="w-5 h-5 mx-auto mb-1 text-emerald-500" />
            <div className="font-bold text-sm text-gray-800">{course.fee}</div>
            <div className="text-[10px] text-gray-500">Fee Range</div>
          </div>
          <div className="text-center p-2">
            <TrendingUp className="w-5 h-5 mx-auto mb-1 text-purple-500" />
            <div className="font-bold text-sm text-gray-800">{course.salaryRange}</div>
            <div className="text-[10px] text-gray-500">Salary</div>
          </div>
          <div className="text-center p-2">
            <DemandDots level={course.demandLevel} />
            <div className="text-[10px] text-gray-500 mt-1">Demand</div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Entrance */}
          <div>
            <h3 className="font-semibold text-gray-800 text-sm flex items-center gap-2 mb-2">
              <GraduationCap className="w-4 h-4 text-purple-500" /> Entrance Exam
            </h3>
            <p className="text-sm text-gray-600 bg-purple-50 p-3 rounded-lg">
              {course.entrance} {course.entranceRequired ? "(Required)" : "(Optional)"}
            </p>
            {course.neetCutoff && (
              <p className="text-xs text-amber-700 bg-amber-50 p-2 rounded-lg mt-2">
                <span className="font-semibold">Expected Cutoff:</span> {course.neetCutoff}
              </p>
            )}
          </div>

          {/* Careers */}
          <div>
            <h3 className="font-semibold text-gray-800 text-sm flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-blue-500" /> Career Options
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {course.careers.map((c, i) => (
                <span key={i} className="text-xs px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full">{c}</span>
              ))}
            </div>
          </div>

          {/* Top Colleges */}
          <div>
            <h3 className="font-semibold text-gray-800 text-sm flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-emerald-500" /> Top Colleges
            </h3>
            <div className="space-y-1.5">
              {course.topColleges.map((c, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  {c}
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="font-semibold text-gray-800 text-sm mb-2">🎯 Skills You'll Learn</h3>
            <div className="flex flex-wrap gap-1.5">
              {course.skills.map((s, i) => (
                <span key={i} className="text-xs px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full">{s}</span>
              ))}
            </div>
          </div>

          {/* Course Path */}
          {course.path && (
            <div>
              <h3 className="font-semibold text-gray-800 text-sm mb-2">📋 Course Path</h3>
              <div className="relative">
                {course.path.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 pb-3">
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">{idx + 1}</div>
                      {idx < course.path!.length - 1 && <div className="w-0.5 h-6 bg-orange-200" />}
                    </div>
                    <div className="pt-1 text-sm text-gray-600">{step}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pass Rate */}
          {course.passRate && (
            <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
              <span className="font-semibold">Pass Rate:</span> {course.passRate}
            </div>
          )}

          {/* Abroad Options */}
          {course.abroadOptions && (
            <div className="text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span><span className="font-semibold">Abroad Opportunities:</span> {course.abroadOptions}</span>
            </div>
          )}

          {/* Global Recognition */}
          {course.globalRecognition && (
            <div className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-500" />
              <span className="font-semibold">Globally Recognized Qualification</span>
            </div>
          )}

          {/* Note */}
          {(course as any).note && (
            <div className="bg-green-50 border border-green-200 p-3 rounded-lg flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-800">{(course as any).note}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
              <Heart className="w-4 h-4" /> Save Course
            </Button>
            <Button variant="outline" className="flex-1 border-purple-300 text-purple-600 hover:bg-purple-50">
              <Share2 className="w-4 h-4" /> Share
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDetailModal;
