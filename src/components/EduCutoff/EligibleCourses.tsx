import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { StudentGroup, EligibleCourse } from './types';
import { CheckCircle2, AlertTriangle, XCircle, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EligibleCoursesProps {
  group: StudentGroup;
  cutoffScore: number;
  percentage: number;
  neetScore?: number;
}

const getCoursesByGroup = (group: StudentGroup, cutoff: number, percentage: number, neet?: number): EligibleCourse[] => {
  switch (group) {
    case 'pcm':
      return [
        { id: 'engineering', name: 'ENGINEERING', fullName: 'B.E / B.Tech', icon: '⚙️', collegeCount: 450, eligibilityStatus: cutoff >= 100 ? 'eligible' : cutoff >= 80 ? 'borderline' : 'not_eligible', cutoffRequired: 100, userCutoff: cutoff, note: 'CSE, ECE, Mech, etc' },
        { id: 'computer_it', name: 'COMPUTER/IT', fullName: 'BCA, B.Sc CS, B.Sc IT', icon: '💻', collegeCount: 300, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible', note: 'Min: 50%' },
        { id: 'architecture', name: 'ARCHITECTURE', fullName: 'B.Arch, B.Planning', icon: '📐', collegeCount: 50, eligibilityStatus: 'eligible', entranceExam: 'NATA Required' },
        { id: 'pure_science', name: 'PURE SCIENCE', fullName: 'B.Sc Physics/Chemistry/Maths', icon: '🔬', collegeCount: 200, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'aviation', name: 'AVIATION/DEFENCE', fullName: 'Pilot Training, NDA, IAF', icon: '✈️', collegeCount: 0, eligibilityStatus: 'eligible', note: 'PCM Required' },
        { id: 'merchant_navy', name: 'MERCHANT NAVY', fullName: 'B.Sc Nautical, Marine Engineer', icon: '🚢', collegeCount: 0, eligibilityStatus: 'eligible' },
      ];
    case 'pcb':
      return [
        { id: 'mbbs', name: 'MBBS / BDS', fullName: 'Medicine & Dental', icon: '🏥', collegeCount: 0, eligibilityStatus: neet && neet >= 500 ? 'eligible' : neet && neet >= 400 ? 'borderline' : 'not_eligible', entranceExam: 'NEET Required', note: neet ? `Your NEET: ${neet}` : 'Enter NEET Score' },
        { id: 'pharmacy', name: 'PHARMACY', fullName: 'B.Pharm, Pharm.D', icon: '💊', collegeCount: 150, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'nursing', name: 'NURSING', fullName: 'B.Sc Nursing, GNM, ANM', icon: '🩺', collegeCount: 200, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'allied_health', name: 'ALLIED HEALTH', fullName: 'Physio, MLT, Radiology, Optometry', icon: '🧪', collegeCount: 100, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'ayush', name: 'AYUSH', fullName: 'BAMS, BHMS, BUMS, BNYS', icon: '🌿', collegeCount: 0, eligibilityStatus: 'borderline', entranceExam: 'NEET Required' },
        { id: 'agriculture', name: 'AGRICULTURE', fullName: 'B.Sc Agriculture, Veterinary', icon: '🌾', collegeCount: 80, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible', entranceExam: 'NEET for BVSc' },
      ];
    case 'pcmb':
      return [
        { id: 'engineering', name: 'ENGINEERING', fullName: 'B.E / B.Tech', icon: '⚙️', collegeCount: 450, eligibilityStatus: cutoff >= 100 ? 'eligible' : cutoff >= 80 ? 'borderline' : 'not_eligible', cutoffRequired: 100, userCutoff: cutoff },
        { id: 'mbbs', name: 'MBBS / BDS', fullName: 'Medicine & Dental', icon: '🏥', collegeCount: 0, eligibilityStatus: neet && neet >= 500 ? 'eligible' : 'borderline', entranceExam: 'NEET Required' },
        { id: 'pharmacy', name: 'PHARMACY', fullName: 'B.Pharm, Pharm.D', icon: '💊', collegeCount: 150, eligibilityStatus: 'eligible' },
        { id: 'biotechnology', name: 'BIOTECHNOLOGY', fullName: 'B.Sc/B.Tech Biotech', icon: '🧬', collegeCount: 100, eligibilityStatus: 'eligible' },
        { id: 'research', name: 'RESEARCH', fullName: 'Integrated M.Sc, BS-MS', icon: '🔬', collegeCount: 50, eligibilityStatus: 'eligible' },
        { id: 'agriculture', name: 'AGRICULTURE', fullName: 'B.Sc Agriculture, Food Tech', icon: '🌾', collegeCount: 80, eligibilityStatus: 'eligible' },
      ];
    case 'commerce':
      return [
        { id: 'bcom', name: 'B.COM', fullName: 'B.Com General/Honours/Corporate', icon: '📊', collegeCount: 400, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'bba', name: 'BBA', fullName: 'Business Admin, Aviation, Banking', icon: '🏢', collegeCount: 200, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'bca', name: 'BCA', fullName: 'Bachelor of Computer Apps', icon: '💻', collegeCount: 250, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'ca_cs', name: 'CA / CS / CMA', fullName: 'Chartered Accountant, Company Secretary', icon: '📜', collegeCount: 0, eligibilityStatus: 'eligible', entranceExam: 'Entrance Exams' },
        { id: 'banking', name: 'BANKING & FINANCE', fullName: 'B.Sc Banking, Finance', icon: '🏦', collegeCount: 100, eligibilityStatus: 'eligible' },
        { id: 'hotel', name: 'HOTEL MGMT', fullName: 'BHM, BHMCT, Hospitality', icon: '🏨', collegeCount: 80, eligibilityStatus: 'eligible' },
      ];
    case 'arts':
      return [
        { id: 'ba', name: 'BA (Various)', fullName: 'English, History, Economics, etc.', icon: '📚', collegeCount: 500, eligibilityStatus: percentage >= 45 ? 'eligible' : 'not_eligible' },
        { id: 'law', name: 'LAW (LLB)', fullName: 'BA LLB, BBA LLB, LLB', icon: '⚖️', collegeCount: 0, eligibilityStatus: 'borderline', entranceExam: 'CLAT/LSAT Required' },
        { id: 'journalism', name: 'JOURNALISM', fullName: 'BA Journalism, BMM, Mass Comm', icon: '📰', collegeCount: 100, eligibilityStatus: 'eligible' },
        { id: 'bed', name: 'B.ED', fullName: 'Bachelor of Education', icon: '🎓', collegeCount: 200, eligibilityStatus: 'borderline', note: 'After UG Degree' },
        { id: 'bsw', name: 'BSW', fullName: 'Bachelor of Social Work', icon: '👥', collegeCount: 150, eligibilityStatus: 'eligible' },
        { id: 'civil_services', name: 'CIVIL SERVICES', fullName: 'UPSC/TNPSC Preparation', icon: '🌍', collegeCount: 0, eligibilityStatus: 'borderline', note: 'After Degree' },
      ];
    case 'vocational':
      return [
        { id: 'diploma', name: 'DIPLOMA/POLYTECHNIC', fullName: 'Computer, Mechanical, Civil, etc.', icon: '🔧', collegeCount: 500, eligibilityStatus: 'eligible' },
        { id: 'iti', name: 'ITI COURSES', fullName: 'Fitter, Electrician, Welder, etc.', icon: '📜', collegeCount: 300, eligibilityStatus: 'eligible' },
        { id: 'lateral', name: 'LATERAL ENTRY', fullName: 'Direct B.E 2nd Year', icon: '🎓', collegeCount: 0, eligibilityStatus: 'borderline', note: 'After Diploma' },
        { id: 'apprenticeship', name: 'APPRENTICESHIP', fullName: 'Earn While You Learn', icon: '🏭', collegeCount: 0, eligibilityStatus: 'eligible', note: 'Stipend: ₹5000-15000' },
        { id: 'bvoc', name: 'B.VOC', fullName: 'Retail, Fashion, Tourism, Healthcare', icon: '📚', collegeCount: 100, eligibilityStatus: 'eligible' },
      ];
    default:
      return [];
  }
};

const getJKKNCourses = (group: StudentGroup): EligibleCourse[] => {
  const baseCourses: EligibleCourse[] = [];
  
  if (group === 'pcm' || group === 'pcmb') {
    baseCourses.push({
      id: 'jkkn_engineering',
      name: 'JKKN Engineering',
      fullName: 'B.E/B.Tech - CSE, ECE, EEE, Mech',
      icon: '⭐',
      collegeCount: 0,
      eligibilityStatus: 'eligible',
      isJKKN: true,
      fee: '₹75,000/year',
      placement: '95% Placement',
      note: 'Your Cutoff Accepted',
    });
  }

  if (group === 'pcb' || group === 'pcmb') {
    baseCourses.push({
      id: 'jkkn_pharmacy',
      name: 'JKKN Pharmacy',
      fullName: 'B.Pharm, Pharm.D',
      icon: '⭐',
      collegeCount: 0,
      eligibilityStatus: 'eligible',
      isJKKN: true,
      fee: '₹85,000/year',
      placement: '100% Placement',
    });
    baseCourses.push({
      id: 'jkkn_nursing',
      name: 'JKKN Nursing',
      fullName: 'B.Sc Nursing, GNM, ANM',
      icon: '⭐',
      collegeCount: 0,
      eligibilityStatus: 'eligible',
      isJKKN: true,
      fee: '₹60,000/year',
      placement: '100% Jobs',
    });
  }

  return baseCourses;
};

export const EligibleCourses = ({ group, cutoffScore, percentage, neetScore }: EligibleCoursesProps) => {
  const navigate = useNavigate();
  const courses = getCoursesByGroup(group, cutoffScore, percentage, neetScore);
  const jkknCourses = getJKKNCourses(group);

  const getStatusBadge = (status: EligibleCourse['eligibilityStatus']) => {
    switch (status) {
      case 'eligible':
        return (
          <span className="inline-flex items-center gap-1 text-green-700 bg-green-100 px-2 py-0.5 rounded text-xs font-medium">
            <CheckCircle2 className="h-3 w-3" /> Eligible
          </span>
        );
      case 'borderline':
        return (
          <span className="inline-flex items-center gap-1 text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded text-xs font-medium">
            <AlertTriangle className="h-3 w-3" /> Borderline
          </span>
        );
      case 'not_eligible':
        return (
          <span className="inline-flex items-center gap-1 text-red-700 bg-red-100 px-2 py-0.5 rounded text-xs font-medium">
            <XCircle className="h-3 w-3" /> Not Eligible
          </span>
        );
    }
  };

  const getGroupIcon = () => {
    switch (group) {
      case 'pcm': return '🏛️';
      case 'pcb': return '🏥';
      case 'pcmb': return '🔬';
      case 'commerce': return '💼';
      case 'arts': return '📖';
      case 'vocational': return '🛠️';
      default: return '🎓';
    }
  };

  return (
    <div className="space-y-6">
      {/* Regular Courses */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            {getGroupIcon()} Courses You're Eligible For
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className={cn(
                'p-4 rounded-xl border-2 transition-all duration-200',
                course.eligibilityStatus === 'eligible' ? 'border-green-200 bg-white hover:border-green-300 hover:shadow-md' :
                course.eligibilityStatus === 'borderline' ? 'border-yellow-200 bg-white hover:border-yellow-300 hover:shadow-md' :
                'border-gray-200 bg-gray-50 opacity-60'
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{course.icon}</span>
                  <div>
                    <h4 className="font-semibold text-sm">{course.name}</h4>
                    <p className="text-xs text-gray-500">{course.fullName}</p>
                  </div>
                </div>
              </div>

              {course.collegeCount > 0 && (
                <p className="text-xs text-gray-500 mb-2">
                  🏛️ {course.collegeCount}+ Colleges
                </p>
              )}

              {course.note && (
                <p className="text-xs text-gray-600 mb-2">{course.note}</p>
              )}

              {course.entranceExam && (
                <p className="text-xs text-blue-600 mb-2">📝 {course.entranceExam}</p>
              )}

              {course.cutoffRequired && course.userCutoff && (
                <p className="text-xs text-gray-600 mb-2">
                  ✅ Your Cutoff: {course.userCutoff}
                </p>
              )}

              <div className="flex items-center justify-between mt-3">
                {getStatusBadge(course.eligibilityStatus)}
                {course.collegeCount > 0 && course.eligibilityStatus !== 'not_eligible' && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs h-7 px-2"
                    onClick={() => navigate('/career-assessment/colleges')}
                  >
                    View Colleges →
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* JKKN Recommended Section */}
      {jkknCourses.length > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl shadow-sm border border-amber-200 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
              JKKN Recommended Courses for You
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Based on your marks and eligibility, JKKN colleges offer:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {jkknCourses.map((course) => (
              <div
                key={course.id}
                className="p-4 rounded-xl border-2 border-amber-300 bg-white hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{course.icon}</span>
                  <div>
                    <h4 className="font-semibold text-sm text-amber-800">{course.name}</h4>
                    <p className="text-xs text-gray-600">{course.fullName}</p>
                  </div>
                </div>

                {course.fee && (
                  <p className="text-xs text-gray-600 mb-1">💰 Fee: {course.fee}</p>
                )}
                {course.placement && (
                  <p className="text-xs text-gray-600 mb-1">🎓 {course.placement}</p>
                )}
                {course.note && (
                  <p className="text-xs text-green-600 mb-2">✅ {course.note}</p>
                )}

                <Button
                  size="sm"
                  className="w-full mt-2 bg-amber-600 hover:bg-amber-700 text-white"
                >
                  Apply Now →
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cutoff Formulas */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            📚 Cutoff Calculation Formulas
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="font-semibold text-blue-800 mb-1">🔬 TNEA Engineering Cutoff (PCM):</div>
            <div className="text-blue-700">Cutoff = Mathematics + (Physics/2) + (Chemistry/2)</div>
            <div className="text-blue-600 text-xs mt-1">Maximum: 200</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="font-semibold text-green-800 mb-1">🏥 Medical Admission (PCB):</div>
            <div className="text-green-700">Based on NEET Score (Out of 720)</div>
            <div className="text-green-600 text-xs mt-1">12th Marks: Minimum 50% in PCB required</div>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="font-semibold text-orange-800 mb-1">💼 Commerce/Arts:</div>
            <div className="text-orange-700">Based on Overall Percentage</div>
            <div className="text-orange-600 text-xs mt-1">Best of 4/5 Subjects</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-800 mb-1">🛠️ Polytechnic/ITI:</div>
            <div className="text-gray-700">Based on 10th/12th Overall Percentage</div>
          </div>
        </div>
      </div>
    </div>
  );
};
