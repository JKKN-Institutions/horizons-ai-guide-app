import { cn } from '@/lib/utils';
import { GroupInfo, StudentGroup } from './types';

interface GroupSelectorProps {
  selectedGroup: StudentGroup | null;
  onSelectGroup: (group: StudentGroup) => void;
}

const groups: GroupInfo[] = [
  {
    id: 'pcm',
    name: 'SCIENCE - PCM',
    icon: '🔬',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    careers: ['Engineering', 'B.Sc Maths', 'BCA, B.Tech'],
    color: 'border-blue-500 text-blue-600',
    bgColor: 'bg-blue-50 hover:bg-blue-100',
  },
  {
    id: 'pcb',
    name: 'SCIENCE - PCB',
    icon: '🧬',
    subjects: ['Physics', 'Chemistry', 'Biology'],
    careers: ['Medical', 'MBBS/BDS', 'Pharmacy'],
    color: 'border-green-500 text-green-600',
    bgColor: 'bg-green-50 hover:bg-green-100',
  },
  {
    id: 'pcmb',
    name: 'SCIENCE - PCMB',
    icon: '🔬🧬',
    subjects: ['Physics', 'Chemistry', 'Maths + Biology'],
    careers: ['Eng + Medical', 'All Options', ''],
    color: 'border-purple-500 text-purple-600',
    bgColor: 'bg-purple-50 hover:bg-purple-100',
  },
  {
    id: 'commerce',
    name: 'COMMERCE',
    icon: '💼',
    subjects: ['Accountancy', 'Business Studies', 'Economics'],
    careers: ['B.Com, BBA', 'CA, CS', 'Banking'],
    color: 'border-orange-500 text-orange-600',
    bgColor: 'bg-orange-50 hover:bg-orange-100',
  },
  {
    id: 'arts',
    name: 'ARTS/HUMANITIES',
    icon: '📖',
    subjects: ['History', 'Economics', 'Political Sci', 'Geography'],
    careers: ['BA, BSW', 'B.Ed, Law', 'Journalism'],
    color: 'border-pink-500 text-pink-600',
    bgColor: 'bg-pink-50 hover:bg-pink-100',
  },
  {
    id: 'vocational',
    name: 'VOCATIONAL',
    icon: '🛠️',
    subjects: ['Computer Science', 'Electronics', 'Automobile', 'Agriculture'],
    careers: ['Diploma', 'Polytechnic', 'ITI'],
    color: 'border-gray-500 text-gray-600',
    bgColor: 'bg-gray-50 hover:bg-gray-100',
  },
];

export const GroupSelector = ({ selectedGroup, onSelectGroup }: GroupSelectorProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          📚 Step 1: Select Your 12th Group
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          உங்கள் 12-ஆம் வகுப்பு குழுவைத் தேர்ந்தெடுக்கவும்
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group) => {
          const isSelected = selectedGroup === group.id;
          return (
            <button
              key={group.id}
              onClick={() => onSelectGroup(group.id)}
              className={cn(
                'relative p-4 rounded-xl border-2 text-left transition-all duration-300',
                'hover:scale-[1.02] hover:shadow-md',
                isSelected
                  ? `${group.color} ${group.bgColor} border-current shadow-md`
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              )}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{group.icon}</span>
                <div className="flex-1 min-w-0">
                  <h4 className={cn(
                    'font-semibold text-sm',
                    isSelected ? group.color.split(' ')[1] : 'text-gray-900'
                  )}>
                    {group.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {group.subjects.slice(0, 3).join(', ')}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {group.careers.filter(c => c).slice(0, 2).map((career, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-1.5 py-0.5 bg-gray-100 rounded text-gray-600"
                      >
                        → {career}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <span className="text-lg">✓</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
