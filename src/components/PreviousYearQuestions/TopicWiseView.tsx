import { useState } from 'react';
import { ArrowLeft, BookOpen, TrendingUp, TrendingDown, Eye, Flame } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

// ---------- DATA ----------

interface TopicData {
  name: string;
  total: number;
  avg: number;
  weightage: number;
  trend: number; // percentage change, positive = up, negative = down
  syllabusTag?: 'Syllabus Reduced' | 'Out of Syllabus';
}

interface SectionData {
  section: string;
  topics: TopicData[];
}

type SubjectTopics = Record<string, SectionData[]>;
type ExamTopicMap = Record<string, SubjectTopics>;

const jeeMainTopics: SubjectTopics = {
  Physics: [
    {
      section: 'Mechanics',
      topics: [
        { name: 'Units & Measurements', total: 15, avg: 1.5, weightage: 6, trend: 9.69 },
        { name: 'Vector Algebra', total: 0, avg: 0, weightage: 0, trend: -100 },
        { name: 'Motion in a Straight Line', total: 4, avg: 0.4, weightage: 1.6, trend: 8.84 },
        { name: 'Motion in a Plane', total: 3, avg: 0.3, weightage: 1.2, trend: -52.57 },
        { name: 'Circular Motion', total: 3, avg: 0.3, weightage: 1.2, trend: -36.51 },
        { name: 'Laws of Motion', total: 7, avg: 0.7, weightage: 2.8, trend: 90.48 },
        { name: 'Work Power & Energy', total: 6, avg: 0.6, weightage: 2.4, trend: -12.41 },
        { name: 'Center of Mass and Collision', total: 4, avg: 0.4, weightage: 1.6, trend: 8.84 },
        { name: 'Rotational Motion', total: 18, avg: 1.8, weightage: 7.2, trend: 31.63 },
        { name: 'Properties of Matter', total: 14, avg: 1.4, weightage: 5.6, trend: -16.91, syllabusTag: 'Syllabus Reduced' },
        { name: 'Heat and Thermodynamics', total: 19, avg: 1.9, weightage: 7.6, trend: -27.83, syllabusTag: 'Syllabus Reduced' },
        { name: 'Simple Harmonic Motion', total: 7, avg: 0.7, weightage: 2.8, trend: 20.69, syllabusTag: 'Syllabus Reduced' },
        { name: 'Waves', total: 8, avg: 0.8, weightage: 3.2, trend: 37.93, syllabusTag: 'Syllabus Reduced' },
        { name: 'Gravitation', total: 5, avg: 0.5, weightage: 2, trend: -27.01 },
      ],
    },
    {
      section: 'Electricity',
      topics: [
        { name: 'Electrostatics', total: 16, avg: 1.6, weightage: 6.4, trend: -17.84 },
        { name: 'Current Electricity', total: 19, avg: 1.9, weightage: 7.6, trend: 71.95, syllabusTag: 'Syllabus Reduced' },
        { name: 'Capacitor', total: 7, avg: 0.7, weightage: 2.8, trend: -16.91 },
        { name: 'Magnetic Effect of Current', total: 7, avg: 0.7, weightage: 2.8, trend: -39.52, syllabusTag: 'Syllabus Reduced' },
        { name: 'Magnetic Properties of Matter', total: 2, avg: 0.2, weightage: 0.8, trend: -36.51, syllabusTag: 'Syllabus Reduced' },
        { name: 'Electromagnetic Induction', total: 12, avg: 1.2, weightage: 4.8, trend: 185.71 },
        { name: 'Alternating Current', total: 4, avg: 0.4, weightage: 1.6, trend: -15.34, syllabusTag: 'Syllabus Reduced' },
        { name: 'Electromagnetic Waves', total: 11, avg: 1.1, weightage: 4.4, trend: 108.53 },
      ],
    },
    {
      section: 'Optics',
      topics: [
        { name: 'Wave Optics', total: 10, avg: 1, weightage: 4, trend: -9.5 },
        { name: 'Geometrical Optics', total: 19, avg: 1.9, weightage: 7.6, trend: -11.94 },
      ],
    },
    {
      section: 'Modern Physics',
      topics: [
        { name: 'Atoms and Nuclei', total: 13, avg: 1.3, weightage: 5.2, trend: 23.52, syllabusTag: 'Syllabus Reduced' },
        { name: 'Dual Nature of Radiation', total: 7, avg: 0.7, weightage: 2.8, trend: -36.65, syllabusTag: 'Syllabus Reduced' },
        { name: 'Semiconductor', total: 10, avg: 1, weightage: 4, trend: 5.54, syllabusTag: 'Syllabus Reduced' },
        { name: 'Communication Systems', total: 0, avg: 0, weightage: 0, trend: 0, syllabusTag: 'Out of Syllabus' },
      ],
    },
  ],
  Chemistry: [
    {
      section: 'Physical Chemistry',
      topics: [
        { name: 'Some Basic Concepts in Chemistry', total: 8, avg: 0.8, weightage: 3.2, trend: 15.2 },
        { name: 'States of Matter', total: 5, avg: 0.5, weightage: 2, trend: -8.3 },
        { name: 'Atomic Structure', total: 10, avg: 1, weightage: 4, trend: 12.5 },
        { name: 'Chemical Bonding', total: 14, avg: 1.4, weightage: 5.6, trend: -5.2 },
        { name: 'Thermodynamics', total: 12, avg: 1.2, weightage: 4.8, trend: 22.1 },
        { name: 'Equilibrium', total: 11, avg: 1.1, weightage: 4.4, trend: -15.6 },
        { name: 'Redox Reactions', total: 4, avg: 0.4, weightage: 1.6, trend: -20.3 },
        { name: 'Electrochemistry', total: 9, avg: 0.9, weightage: 3.6, trend: 35.8 },
        { name: 'Chemical Kinetics', total: 8, avg: 0.8, weightage: 3.2, trend: 18.4 },
        { name: 'Surface Chemistry', total: 5, avg: 0.5, weightage: 2, trend: -42.1, syllabusTag: 'Syllabus Reduced' },
        { name: 'Solutions', total: 7, avg: 0.7, weightage: 2.8, trend: 8.9 },
      ],
    },
    {
      section: 'Inorganic Chemistry',
      topics: [
        { name: 'Classification of Elements', total: 6, avg: 0.6, weightage: 2.4, trend: -12.5 },
        { name: 'Hydrogen', total: 3, avg: 0.3, weightage: 1.2, trend: -55.0 },
        { name: 's-Block Elements', total: 5, avg: 0.5, weightage: 2, trend: 10.2 },
        { name: 'p-Block Elements', total: 18, avg: 1.8, weightage: 7.2, trend: 28.4 },
        { name: 'd & f Block Elements', total: 12, avg: 1.2, weightage: 4.8, trend: -8.7 },
        { name: 'Coordination Compounds', total: 10, avg: 1, weightage: 4, trend: 45.2 },
      ],
    },
    {
      section: 'Organic Chemistry',
      topics: [
        { name: 'Basic Principles of Organic Chemistry', total: 8, avg: 0.8, weightage: 3.2, trend: 5.6 },
        { name: 'Hydrocarbons', total: 7, avg: 0.7, weightage: 2.8, trend: -18.9 },
        { name: 'Haloalkanes and Haloarenes', total: 6, avg: 0.6, weightage: 2.4, trend: 12.3 },
        { name: 'Alcohols, Phenols and Ethers', total: 9, avg: 0.9, weightage: 3.6, trend: -22.4 },
        { name: 'Aldehydes, Ketones and Carboxylic Acids', total: 14, avg: 1.4, weightage: 5.6, trend: 33.1 },
        { name: 'Amines', total: 5, avg: 0.5, weightage: 2, trend: -15.8 },
        { name: 'Biomolecules', total: 6, avg: 0.6, weightage: 2.4, trend: 8.2, syllabusTag: 'Syllabus Reduced' },
        { name: 'Polymers', total: 4, avg: 0.4, weightage: 1.6, trend: -30.5, syllabusTag: 'Syllabus Reduced' },
        { name: 'Chemistry in Everyday Life', total: 3, avg: 0.3, weightage: 1.2, trend: -45.0, syllabusTag: 'Syllabus Reduced' },
      ],
    },
  ],
  Mathematics: [
    {
      section: 'Algebra',
      topics: [
        { name: 'Sets, Relations & Functions', total: 8, avg: 0.8, weightage: 3.2, trend: 12.5 },
        { name: 'Complex Numbers', total: 10, avg: 1, weightage: 4, trend: 25.3 },
        { name: 'Quadratic Equations', total: 7, avg: 0.7, weightage: 2.8, trend: -8.6 },
        { name: 'Permutation & Combination', total: 9, avg: 0.9, weightage: 3.6, trend: 18.2 },
        { name: 'Binomial Theorem', total: 6, avg: 0.6, weightage: 2.4, trend: -22.1 },
        { name: 'Sequence & Series', total: 11, avg: 1.1, weightage: 4.4, trend: 35.7 },
        { name: 'Matrices & Determinants', total: 15, avg: 1.5, weightage: 6, trend: 42.8 },
      ],
    },
    {
      section: 'Calculus',
      topics: [
        { name: 'Limits, Continuity & Differentiability', total: 14, avg: 1.4, weightage: 5.6, trend: -5.2 },
        { name: 'Differentiation', total: 8, avg: 0.8, weightage: 3.2, trend: 15.8 },
        { name: 'Application of Derivatives', total: 12, avg: 1.2, weightage: 4.8, trend: -12.4 },
        { name: 'Indefinite Integration', total: 6, avg: 0.6, weightage: 2.4, trend: 8.9 },
        { name: 'Definite Integration', total: 10, avg: 1, weightage: 4, trend: 28.6 },
        { name: 'Area Under Curves', total: 5, avg: 0.5, weightage: 2, trend: -18.3 },
        { name: 'Differential Equations', total: 9, avg: 0.9, weightage: 3.6, trend: 22.4 },
      ],
    },
    {
      section: 'Coordinate Geometry',
      topics: [
        { name: 'Straight Lines', total: 8, avg: 0.8, weightage: 3.2, trend: 10.5 },
        { name: 'Circle', total: 11, avg: 1.1, weightage: 4.4, trend: -15.2 },
        { name: 'Conic Sections', total: 16, avg: 1.6, weightage: 6.4, trend: 38.9 },
      ],
    },
    {
      section: 'Trigonometry & Vectors',
      topics: [
        { name: 'Trigonometry', total: 9, avg: 0.9, weightage: 3.6, trend: -8.7 },
        { name: 'Inverse Trigonometry', total: 5, avg: 0.5, weightage: 2, trend: 15.4 },
        { name: 'Vector Algebra', total: 7, avg: 0.7, weightage: 2.8, trend: 22.1 },
        { name: '3D Geometry', total: 10, avg: 1, weightage: 4, trend: -5.8 },
      ],
    },
    {
      section: 'Statistics & Probability',
      topics: [
        { name: 'Statistics', total: 6, avg: 0.6, weightage: 2.4, trend: 12.3 },
        { name: 'Probability', total: 12, avg: 1.2, weightage: 4.8, trend: 28.5 },
        { name: 'Mathematical Reasoning', total: 3, avg: 0.3, weightage: 1.2, trend: -52.0, syllabusTag: 'Syllabus Reduced' },
      ],
    },
  ],
};

const examTopicData: ExamTopicMap = {
  'jee-main': jeeMainTopics,
};

// ---------- COMPONENT ----------

interface TopicWiseViewProps {
  examId: string;
  examName: string;
  subject: string;
  onBack: () => void;
  onViewQuestions?: (topic: string) => void;
}

export const TopicWiseView = ({ examId, examName, subject, onBack, onViewQuestions }: TopicWiseViewProps) => {
  const subjectData = examTopicData[examId]?.[subject];

  if (!subjectData) {
    return (
      <div className="text-center py-16">
        <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 font-medium">Topic data for {subject} coming soon!</p>
        <Button variant="outline" size="sm" className="mt-4 rounded-xl" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Go Back
        </Button>
      </div>
    );
  }

  const totalQuestions = subjectData.reduce((sum, sec) => sum + sec.topics.reduce((s, t) => s + t.total, 0), 0);
  const totalTopics = subjectData.reduce((sum, sec) => sum + sec.topics.length, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Button variant="ghost" size="sm" className="mb-3 text-gray-600 hover:text-gray-800 rounded-xl -ml-2" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to {examName}
        </Button>

        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-2xl p-5 md:p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="text-blue-200 text-sm font-medium">{examName}</p>
              <h3 className="text-2xl font-bold">{subject} — Topic-wise PYQ Analysis</h3>
              <p className="text-blue-100 text-sm mt-1">2016–2026 | Chapter-wise weightage & trends</p>
            </div>
            <div className="flex gap-3">
              <div className="bg-white/15 backdrop-blur rounded-xl px-4 py-2 text-center border border-white/20">
                <div className="text-xl font-bold">{totalQuestions}</div>
                <div className="text-[10px] text-white/70 uppercase tracking-wider">Questions</div>
              </div>
              <div className="bg-white/15 backdrop-blur rounded-xl px-4 py-2 text-center border border-white/20">
                <div className="text-xl font-bold">{totalTopics}</div>
                <div className="text-[10px] text-white/70 uppercase tracking-wider">Topics</div>
              </div>
              <div className="bg-white/15 backdrop-blur rounded-xl px-4 py-2 text-center border border-white/20">
                <div className="text-xl font-bold">{subjectData.length}</div>
                <div className="text-[10px] text-white/70 uppercase tracking-wider">Sections</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sections */}
      {subjectData.map((section, sIdx) => (
        <motion.div
          key={section.section}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: sIdx * 0.08 }}
        >
          <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <div className="w-1 h-5 rounded-full bg-gradient-to-b from-blue-500 to-cyan-500" />
            {section.section}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {section.topics.map((topic) => (
              <Card
                key={topic.name}
                className={cn(
                  "overflow-hidden border transition-all hover:shadow-md rounded-xl",
                  topic.syllabusTag
                    ? "bg-blue-50/50 border-blue-100"
                    : "bg-white border-gray-100"
                )}
              >
                {/* Bottom accent bar */}
                <CardContent className="p-0">
                  <div className="p-4">
                    {/* Title + badge */}
                    <div className="flex items-start gap-2 mb-2">
                      <h5 className="font-semibold text-gray-800 text-sm leading-tight flex-1">{topic.name}</h5>
                      {topic.syllabusTag && (
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[10px] px-2 py-0.5 shrink-0 font-semibold rounded-md border",
                            topic.syllabusTag === 'Out of Syllabus'
                              ? "border-green-300 text-green-600 bg-green-50"
                              : "border-orange-300 text-orange-600 bg-orange-50"
                          )}
                        >
                          {topic.syllabusTag}
                        </Badge>
                      )}
                    </div>

                    {/* Stats row */}
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-3 flex-wrap">
                      <span className="font-semibold text-gray-700">2026:</span>
                      <span>Total: {topic.total}</span>
                      <span className="text-gray-300">·</span>
                      <span>Avg: {topic.avg}</span>
                      <span className="text-gray-300">·</span>
                      <span>Weightage: {topic.weightage}%</span>
                      {topic.trend !== 0 && (
                        <span className={cn(
                          "font-semibold ml-1 flex items-center gap-0.5",
                          topic.trend > 0 ? "text-green-600" : "text-red-500"
                        )}>
                          {topic.trend > 0 ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {topic.trend > 0 ? '+' : ''}{topic.trend.toFixed(2)}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* View Questions button bar */}
                  <button
                    onClick={() => onViewQuestions?.(topic.name)}
                    className="w-full bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 border-t border-blue-100 text-blue-600 font-semibold text-sm py-2.5 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View Questions
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
