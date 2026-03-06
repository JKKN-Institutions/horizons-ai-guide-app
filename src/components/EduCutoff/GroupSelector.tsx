import { useState } from 'react';
import { cn } from '@/lib/utils';
import { GroupInfo, StudentGroup, GroupCategory } from './types';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

interface GroupSelectorProps {
  selectedGroup: StudentGroup | null;
  onSelectGroup: (group: StudentGroup) => void;
}

// Descriptive course names based on distinguishing subject
const groupCourseName: Record<string, string> = {
  '101': 'Statistics',
  '102': 'Computer Science',
  '103': 'Biology + Maths',
  '104': 'Bio-Chemistry',
  '105': 'English for Communication',
  '106': 'Home Science',
  '201': 'Biology + CS',
  '202': 'Micro-Biology',
  '203': 'Bio-Chemistry',
  '204': 'Nursing',
  '205': 'Nutrition & Dietetics',
  '206': 'English for Communication',
  '207': 'Home Science',
  '208': 'Botany & Zoology',
  '301': 'Statistics',
  '302': 'Computer Science',
  '303': 'English for Communication',
  '304': 'History',
  '305': 'Political Science',
  '306': 'Ethics & Indian Culture',
  '307': 'Advanced Language',
  '308': 'Business Maths',
  '401': 'Statistics',
  '402': 'Computer Science',
  '403': 'English for Communication',
  '404': 'Political Science',
  '405': 'Ethics & Indian Culture',
  '406': 'Advanced Language',
};

// Official TN State Board 12th Group Data
const groupCategories: { category: GroupCategory; title: string; titleTamil: string; icon: string; series: string; careers: string[]; color: string; bgColor: string; groups: GroupInfo[] }[] = [
  {
    category: 'science_maths',
    title: 'SCIENCE - Maths Based',
    titleTamil: 'அறிவியல் - கணிதம்',
    icon: '🔬',
    series: '100 Series',
    careers: ['Engineering', 'B.Tech', 'B.Sc', 'B.Arch', 'NDA', 'Merchant Navy'],
    color: 'border-blue-500 text-blue-600',
    bgColor: 'bg-blue-50 hover:bg-blue-100',
    groups: [
      { id: '101', code: '101', name: 'Statistics Group', category: 'science_maths', icon: '📊', subjects: ['Physics', 'Chemistry', 'Statistics', 'Mathematics'], careers: ['Engineering', 'Data Science'], color: 'text-blue-600', bgColor: 'bg-blue-50' },
      { id: '102', code: '102', name: 'Computer Science Group', category: 'science_maths', icon: '💻', subjects: ['Physics', 'Chemistry', 'Computer Science', 'Mathematics'], careers: ['Engineering', 'IT'], color: 'text-blue-600', bgColor: 'bg-blue-50' },
      { id: '103', code: '103', name: 'Biology + Maths Group', category: 'science_maths', icon: '🧬', subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics'], careers: ['Engineering + Medical'], color: 'text-purple-600', bgColor: 'bg-purple-50' },
      { id: '104', code: '104', name: 'Bio-Chemistry Group', category: 'science_maths', icon: '🧪', subjects: ['Physics', 'Chemistry', 'Bio-Chemistry', 'Mathematics'], careers: ['Biotech', 'Research'], color: 'text-blue-600', bgColor: 'bg-blue-50' },
      { id: '105', code: '105', name: 'English Comm. Group', category: 'science_maths', icon: '📝', subjects: ['Physics', 'Chemistry', 'English for Communication', 'Mathematics'], careers: ['Engineering', 'Teaching'], color: 'text-blue-600', bgColor: 'bg-blue-50' },
      { id: '106', code: '106', name: 'Home Science Group', category: 'science_maths', icon: '🏠', subjects: ['Physics', 'Chemistry', 'Mathematics', 'Home Science'], careers: ['Engineering', 'Home Science'], color: 'text-blue-600', bgColor: 'bg-blue-50' },
    ]
  },
  {
    category: 'science_bio',
    title: 'SCIENCE - Biology Based',
    titleTamil: 'அறிவியல் - உயிரியல்',
    icon: '🧬',
    series: '200 Series',
    careers: ['MBBS', 'BDS', 'BAMS', 'BHMS', 'B.Pharm', 'Nursing', 'Veterinary', 'Agriculture'],
    color: 'border-green-500 text-green-600',
    bgColor: 'bg-green-50 hover:bg-green-100',
    groups: [
      { id: '201', code: '201', name: 'Bio-Computer Science', category: 'science_bio', icon: '💻', subjects: ['Physics', 'Chemistry', 'Biology', 'Computer Science'], careers: ['Medical', 'Biotech IT'], color: 'text-green-600', bgColor: 'bg-green-50' },
      { id: '202', code: '202', name: 'Bio-Microbiology', category: 'science_bio', icon: '🦠', subjects: ['Physics', 'Chemistry', 'Biology', 'Micro-Biology'], careers: ['Medical', 'Research'], color: 'text-green-600', bgColor: 'bg-green-50' },
      { id: '203', code: '203', name: 'Bio-Biochemistry', category: 'science_bio', icon: '🧪', subjects: ['Physics', 'Chemistry', 'Biology', 'Bio-Chemistry'], careers: ['Medical', 'Pharmacy'], color: 'text-green-600', bgColor: 'bg-green-50' },
      { id: '204', code: '204', name: 'Bio-Nursing', category: 'science_bio', icon: '🩺', subjects: ['Physics', 'Chemistry', 'Biology', 'Nursing'], careers: ['Nursing', 'Healthcare'], color: 'text-green-600', bgColor: 'bg-green-50' },
      { id: '205', code: '205', name: 'Bio-Nutrition', category: 'science_bio', icon: '🥗', subjects: ['Physics', 'Chemistry', 'Biology', 'Nutrition & Dietetics'], careers: ['Nutrition', 'Healthcare'], color: 'text-green-600', bgColor: 'bg-green-50' },
      { id: '206', code: '206', name: 'Bio-English Comm.', category: 'science_bio', icon: '📝', subjects: ['Physics', 'Chemistry', 'Biology', 'English for Communication'], careers: ['Medical', 'Teaching'], color: 'text-green-600', bgColor: 'bg-green-50' },
      { id: '207', code: '207', name: 'Bio-Home Science', category: 'science_bio', icon: '🏠', subjects: ['Physics', 'Chemistry', 'Biology', 'Home Science'], careers: ['Medical', 'Home Science'], color: 'text-green-600', bgColor: 'bg-green-50' },
      { id: '208', code: '208', name: 'Botany & Zoology', category: 'science_bio', icon: '🌿', subjects: ['Physics', 'Chemistry', 'Botany', 'Zoology'], careers: ['Research', 'Agriculture'], color: 'text-green-600', bgColor: 'bg-green-50' },
    ]
  },
  {
    category: 'commerce',
    title: 'COMMERCE',
    titleTamil: 'வணிகவியல்',
    icon: '💼',
    series: '300 Series',
    careers: ['B.Com', 'BBA', 'CA', 'CS', 'CMA', 'MBA', 'Banking', 'Insurance', 'Law'],
    color: 'border-orange-500 text-orange-600',
    bgColor: 'bg-orange-50 hover:bg-orange-100',
    groups: [
      { id: '301', code: '301', name: 'Commerce-Statistics', category: 'commerce', icon: '📊', subjects: ['Statistics', 'Economics', 'Commerce', 'Accountancy'], careers: ['Finance', 'Analytics'], color: 'text-orange-600', bgColor: 'bg-orange-50' },
      { id: '302', code: '302', name: 'Commerce-Computer Sci.', category: 'commerce', icon: '💻', subjects: ['Computer Science', 'Economics', 'Commerce', 'Accountancy'], careers: ['IT', 'Business'], color: 'text-orange-600', bgColor: 'bg-orange-50' },
      { id: '303', code: '303', name: 'Commerce-English Comm.', category: 'commerce', icon: '📝', subjects: ['English for Communication', 'Economics', 'Commerce', 'Accountancy'], careers: ['Business', 'Communication'], color: 'text-orange-600', bgColor: 'bg-orange-50' },
      { id: '304', code: '304', name: 'Commerce-History', category: 'commerce', icon: '📜', subjects: ['History', 'Economics', 'Commerce', 'Accountancy'], careers: ['Civil Services', 'Business'], color: 'text-orange-600', bgColor: 'bg-orange-50' },
      { id: '305', code: '305', name: 'Commerce-Political Sci.', category: 'commerce', icon: '🏛️', subjects: ['Economics', 'Political Science', 'Commerce', 'Accountancy'], careers: ['Law', 'Civil Services'], color: 'text-orange-600', bgColor: 'bg-orange-50' },
      { id: '306', code: '306', name: 'Commerce-Ethics', category: 'commerce', icon: '🕉️', subjects: ['Economics', 'Commerce', 'Accountancy', 'Ethics & Indian Culture'], careers: ['Business', 'Teaching'], color: 'text-orange-600', bgColor: 'bg-orange-50' },
      { id: '307', code: '307', name: 'Commerce-Language', category: 'commerce', icon: '📖', subjects: ['Economics', 'Commerce', 'Accountancy', 'Advanced Language'], careers: ['Business', 'Literature'], color: 'text-orange-600', bgColor: 'bg-orange-50' },
      { id: '308', code: '308', name: 'Commerce-Business Maths', category: 'commerce', icon: '🔢', subjects: ['Economics', 'Commerce', 'Accountancy', 'Business Maths'], careers: ['Finance', 'Banking'], color: 'text-orange-600', bgColor: 'bg-orange-50' },
    ]
  },
  {
    category: 'arts',
    title: 'ARTS / HUMANITIES',
    titleTamil: 'கலை / மனிதநேயம்',
    icon: '📚',
    series: '400 Series',
    careers: ['BA', 'Law (LLB)', 'Civil Services (UPSC/TNPSC)', 'Journalism', 'B.Ed', 'Social Work'],
    color: 'border-pink-500 text-pink-600',
    bgColor: 'bg-pink-50 hover:bg-pink-100',
    groups: [
      { id: '401', code: '401', name: 'Arts-Statistics', category: 'arts', icon: '📊', subjects: ['Statistics', 'Geography', 'History', 'Economics'], careers: ['Civil Services', 'Research'], color: 'text-pink-600', bgColor: 'bg-pink-50' },
      { id: '402', code: '402', name: 'Arts-Computer Science', category: 'arts', icon: '💻', subjects: ['Computer Science', 'Geography', 'History', 'Economics'], careers: ['IT', 'Civil Services'], color: 'text-pink-600', bgColor: 'bg-pink-50' },
      { id: '403', code: '403', name: 'Arts-English Comm.', category: 'arts', icon: '📝', subjects: ['Geography', 'English for Communication', 'History', 'Economics'], careers: ['Journalism', 'Teaching'], color: 'text-pink-600', bgColor: 'bg-pink-50' },
      { id: '404', code: '404', name: 'Arts-Political Science', category: 'arts', icon: '🏛️', subjects: ['Geography', 'History', 'Economics', 'Political Science'], careers: ['Law', 'Civil Services'], color: 'text-pink-600', bgColor: 'bg-pink-50' },
      { id: '405', code: '405', name: 'Arts-Ethics', category: 'arts', icon: '🕉️', subjects: ['Geography', 'History', 'Economics', 'Ethics & Indian Culture'], careers: ['Civil Services', 'Teaching'], color: 'text-pink-600', bgColor: 'bg-pink-50' },
      { id: '406', code: '406', name: 'Arts-Language', category: 'arts', icon: '📖', subjects: ['Geography', 'History', 'Economics', 'Advanced Language'], careers: ['Literature', 'Teaching'], color: 'text-pink-600', bgColor: 'bg-pink-50' },
    ]
  }
];

export const GroupSelector = ({ selectedGroup, onSelectGroup }: GroupSelectorProps) => {
  const [expandedCategory, setExpandedCategory] = useState<GroupCategory | null>(null);

  const getSelectedGroupInfo = () => {
    for (const cat of groupCategories) {
      const found = cat.groups.find(g => g.id === selectedGroup);
      if (found) return { group: found, category: cat };
    }
    return null;
  };

  const selectedInfo = getSelectedGroupInfo();

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 md:p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          📚 Step 1: Select Your 12th Group Code
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          உங்கள் 12-ஆம் வகுப்பு குழு எண்ணைத் தேர்ந்தெடுக்கவும்
        </p>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {groupCategories.map((cat) => {
          const isExpanded = expandedCategory === cat.category;
          const hasSelectedGroup = cat.groups.some(g => g.id === selectedGroup);

          return (
            <div key={cat.category} className="border rounded-xl overflow-hidden">
              {/* Category Header */}
              <button
                onClick={() => setExpandedCategory(isExpanded ? null : cat.category)}
                className={cn(
                  'w-full p-4 text-left transition-all duration-200 flex items-center justify-between',
                  hasSelectedGroup ? `${cat.bgColor} ${cat.color}` : 'hover:bg-gray-50'
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <div>
                    <h4 className="font-semibold text-sm">{cat.title}</h4>
                    <p className="text-xs text-gray-500">{cat.titleTamil} • {cat.series}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {cat.category === 'science_maths' && <span className="text-[10px] bg-blue-100 text-blue-700 border border-blue-300 px-2 py-0.5 rounded-full font-bold whitespace-nowrap">CUTOFF NEEDED</span>}
                  {cat.category === 'science_bio' && <span className="text-[10px] bg-amber-100 text-amber-700 border border-amber-300 px-2 py-0.5 rounded-full font-bold whitespace-nowrap">NEET NEEDED</span>}
                  {(cat.category === 'commerce' || cat.category === 'arts') && <span className="text-[10px] bg-green-100 text-green-700 border border-green-300 px-2 py-0.5 rounded-full font-bold whitespace-nowrap">NO CUTOFF</span>}
                  {hasSelectedGroup && (
                    <span className="text-xs bg-white/80 px-2 py-1 rounded font-medium">
                      {selectedGroup}
                    </span>
                  )}
                  {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </div>
              </button>

              {/* Expanded Groups - Table layout with fixed header and scrollable list */}
              {isExpanded && (
                <div className="bg-gray-50 border-t">
                  {/* Fixed Table Header */}
                  <div className="sticky top-0 z-10 bg-gray-200 border-b px-3 py-2 grid grid-cols-[48px_1fr_1.5fr] md:grid-cols-[56px_1fr_1.8fr] gap-2 items-center">
                    <span className="text-[10px] md:text-xs font-bold text-gray-600 uppercase">Code</span>
                    <span className="text-[10px] md:text-xs font-bold text-gray-600 uppercase">Course Name</span>
                    <span className="text-[10px] md:text-xs font-bold text-gray-600 uppercase flex items-center gap-1">
                      <BookOpen className="h-3 w-3" /> Subjects
                    </span>
                  </div>
                  {/* Scrollable Group List */}
                  <div className="max-h-[320px] overflow-y-auto">
                    {cat.groups.map((group) => {
                      const isSelected = selectedGroup === group.id;
                      return (
                        <button
                          key={group.id}
                          onClick={() => onSelectGroup(group.id)}
                          className={cn(
                            'w-full px-3 py-3 grid grid-cols-[48px_1fr_1.5fr] md:grid-cols-[56px_1fr_1.8fr] gap-2 items-start text-left transition-all border-b border-gray-100 last:border-b-0',
                            isSelected
                              ? 'bg-white shadow-sm ring-2 ring-current ' + cat.color
                              : 'bg-white hover:bg-gray-50'
                          )}
                        >
                          {/* Code */}
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-sm">{group.code}</span>
                            {isSelected && <span className="text-green-500 text-xs">✓</span>}
                          </div>
                          {/* Course Name */}
                          <div className="min-w-0">
                            <span className="text-xs md:text-sm font-semibold text-gray-800 leading-tight block">
                              {group.icon} {groupCourseName[group.id] || group.name}
                            </span>
                          </div>
                          {/* All Subjects - readable comma-separated text */}
                          <div className="min-w-0">
                            <p className={cn(
                              'text-[11px] md:text-sm leading-relaxed break-words',
                              isSelected ? 'text-gray-800 font-medium' : 'text-gray-600'
                            )}>
                              {group.subjects.join(', ')}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {/* Career Paths Footer */}
                  <div className="px-3 py-2 bg-white border-t">
                    <p className="text-xs text-gray-600">
                      <strong>Career Paths:</strong> {cat.careers.slice(0, 5).join(', ')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Group Info - Enhanced with all subjects as tags */}
      {selectedInfo && (
        <div className={cn('mt-4 p-4 rounded-xl border-2', selectedInfo.category.color, selectedInfo.category.bgColor)}>
          <div className="flex items-start gap-3">
            <span className="text-3xl">{selectedInfo.group.icon}</span>
            <div className="flex-1">
              <h4 className="font-bold text-lg">
                {selectedInfo.group.code} — {groupCourseName[selectedInfo.group.id] || selectedInfo.group.name}
              </h4>
              {/* All subjects displayed clearly */}
              <p className="text-sm mt-1">
                <strong>Subjects:</strong> {selectedInfo.group.subjects.join(', ')}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <strong>+ Common:</strong> Tamil/Hindi (Part I) + English (Part II) — Compulsory
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {selectedInfo.category.careers.slice(0, 5).map((career, idx) => (
                  <span key={idx} className="text-xs px-2 py-1 bg-white/60 rounded border">
                    → {career}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Marks Structure Info */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600">
          <strong>📊 Total Marks:</strong> Part I (100) + Part II English (100) + Part III 4 Subjects (400) = <strong>600 Marks</strong> | Pass: 35% per subject
        </p>
      </div>
    </div>
  );
};

export { groupCategories };
