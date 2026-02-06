import { BookOpen } from "lucide-react";
import CourseCard from "./CourseCard";
import type { CourseCategory } from "./courseExplorerData";

interface CourseResultsProps {
  categories: CourseCategory[];
  groupCode: string;
}

const CourseResults = ({ categories, groupCode }: CourseResultsProps) => {
  const totalCourses = categories.reduce((sum, cat) => sum + cat.courses.length, 0);

  return (
    <div className="space-y-6 mt-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            Courses for Group {groupCode}
          </h3>
          <p className="text-sm text-gray-500">{totalCourses} courses across {categories.length} categories</p>
        </div>
      </div>

      {categories.map((category) => (
        <div key={category.name}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{category.icon}</span>
            <h4 className="font-semibold text-gray-800">{category.name}</h4>
            <span className="text-xs text-gray-400">({category.courses.length})</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {category.courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      ))}

      {categories.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="text-gray-500">Select a group to see available courses</p>
        </div>
      )}
    </div>
  );
};

export default CourseResults;
