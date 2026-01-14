import { useState } from 'react';
import { ChevronDown, ChevronRight, Star, Circle } from 'lucide-react';
import { SyllabusUnit } from '@/data/university-entrance-data';
import { Badge } from '@/components/ui/badge';

interface SyllabusAccordionProps {
  syllabus: SyllabusUnit[];
}

export const SyllabusAccordion = ({ syllabus }: SyllabusAccordionProps) => {
  const [expandedUnits, setExpandedUnits] = useState<number[]>([]);

  const toggleUnit = (unitNumber: number) => {
    setExpandedUnits(prev => 
      prev.includes(unitNumber) 
        ? prev.filter(u => u !== unitNumber)
        : [...prev, unitNumber]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'Medium': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'Hard': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getImportanceIcon = (importance: string) => {
    switch (importance) {
      case 'High': return <Star className="h-3 w-3 text-red-500 fill-red-500" />;
      case 'Medium': return <Star className="h-3 w-3 text-amber-500 fill-amber-500" />;
      case 'Low': return <Circle className="h-3 w-3 text-slate-400" />;
      default: return null;
    }
  };

  if (syllabus.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Syllabus details coming soon...</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {syllabus.map((unit) => {
        const isExpanded = expandedUnits.includes(unit.unitNumber);
        
        return (
          <div key={unit.unitNumber} className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            {/* Unit Header */}
            <button
              onClick={() => toggleUnit(unit.unitNumber)}
              className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                {isExpanded ? (
                  <ChevronDown className="h-5 w-5 text-[#6a0dad]" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <h4 className="font-semibold text-foreground">
                    Unit {unit.unitNumber}: {unit.title}
                  </h4>
                  <p className="text-sm text-muted-foreground font-tamil">{unit.titleTamil}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  ~{unit.expectedQuestions} Qs
                </Badge>
                <Badge className={getDifficultyColor(unit.difficulty)}>
                  {unit.difficulty}
                </Badge>
              </div>
            </button>

            {/* Unit Content */}
            {isExpanded && (
              <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                <div className="space-y-4">
                  {unit.topics.map((topic, idx) => (
                    <div key={idx} className="border-l-3 border-[#6a0dad] pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        {getImportanceIcon(topic.importance)}
                        <span className="font-medium text-foreground">{topic.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          topic.importance === 'High' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                          topic.importance === 'Medium' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                          'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                        }`}>
                          {topic.importance}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {topic.subtopics.map((subtopic, subIdx) => (
                          <span 
                            key={subIdx}
                            className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-muted-foreground"
                          >
                            {subtopic}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
