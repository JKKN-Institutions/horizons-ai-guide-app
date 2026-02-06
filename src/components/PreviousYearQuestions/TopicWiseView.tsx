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
        { name: 'Some Basic Concepts of Chemistry', total: 11, avg: 1.1, weightage: 4.4, trend: -27.99, syllabusTag: 'Syllabus Reduced' },
        { name: 'Structure of Atom', total: 14, avg: 1.4, weightage: 5.6, trend: 26.7, syllabusTag: 'Syllabus Reduced' },
        { name: 'Redox Reactions', total: 5, avg: 0.5, weightage: 2, trend: 36.05 },
        { name: 'Gaseous State', total: 0, avg: 0, weightage: 0, trend: -100, syllabusTag: 'Out of Syllabus' },
        { name: 'Chemical Equilibrium', total: 6, avg: 0.6, weightage: 2.4, trend: 3.45 },
        { name: 'Ionic Equilibrium', total: 5, avg: 0.5, weightage: 2, trend: -40.65 },
        { name: 'Solutions', total: 14, avg: 1.4, weightage: 5.6, trend: 20.95 },
        { name: 'Thermodynamics', total: 11, avg: 1.1, weightage: 4.4, trend: -32.62 },
        { name: 'Electrochemistry', total: 13, avg: 1.3, weightage: 5.2, trend: 12.31 },
        { name: 'Chemical Kinetics and Nuclear Chemistry', total: 14, avg: 1.4, weightage: 5.6, trend: 2.38, syllabusTag: 'Syllabus Reduced' },
        { name: 'Solid State', total: 0, avg: 0, weightage: 0, trend: 0, syllabusTag: 'Out of Syllabus' },
        { name: 'Surface Chemistry', total: 0, avg: 0, weightage: 0, trend: 0, syllabusTag: 'Out of Syllabus' },
      ],
    },
    {
      section: 'Inorganic Chemistry',
      topics: [
        { name: 'Periodic Table & Periodicity', total: 10, avg: 1, weightage: 4, trend: -32.09 },
        { name: 'Chemical Bonding & Molecular Structure', total: 14, avg: 1.4, weightage: 5.6, trend: 33.02 },
        { name: 'Isolation of Elements', total: 0, avg: 0, weightage: 0, trend: -100, syllabusTag: 'Out of Syllabus' },
        { name: 'Hydrogen', total: 0, avg: 0, weightage: 0, trend: 0, syllabusTag: 'Out of Syllabus' },
        { name: 's-Block Elements', total: 0, avg: 0, weightage: 0, trend: 0, syllabusTag: 'Out of Syllabus' },
        { name: 'p-Block Elements', total: 12, avg: 1.2, weightage: 4.8, trend: 127.49, syllabusTag: 'Syllabus Reduced' },
        { name: 'd and f Block Elements', total: 8, avg: 0.8, weightage: 3.2, trend: -20 },
        { name: 'Coordination Compounds', total: 20, avg: 2, weightage: 8, trend: -11.6 },
        { name: 'Salt Analysis', total: 3, avg: 0.3, weightage: 1.2, trend: -52.57 },
        { name: 'Environmental Chemistry', total: 0, avg: 0, weightage: 0, trend: 0, syllabusTag: 'Out of Syllabus' },
      ],
    },
    {
      section: 'Organic Chemistry',
      topics: [
        { name: 'Basics of Organic Chemistry', total: 12, avg: 1.2, weightage: 4.8, trend: -30.94 },
        { name: 'Hydrocarbons', total: 10, avg: 1, weightage: 4, trend: 5.54 },
        { name: 'Haloalkanes and Haloarenes', total: 11, avg: 1.1, weightage: 4.4, trend: 10 },
        { name: 'Alcohols, Phenols and Ethers', total: 7, avg: 0.7, weightage: 2.8, trend: 90.48 },
        { name: 'Aldehydes, Ketones and Carboxylic Acids', total: 22, avg: 2.2, weightage: 8.8, trend: 60.88 },
        { name: 'Compounds Containing Nitrogen', total: 14, avg: 1.4, weightage: 5.6, trend: 20.95 },
        { name: 'Polymers', total: 0, avg: 0, weightage: 0, trend: 0, syllabusTag: 'Out of Syllabus' },
        { name: 'Biomolecules', total: 8, avg: 0.8, weightage: 3.2, trend: -23.99 },
        { name: 'Chemistry in Everyday Life', total: 0, avg: 0, weightage: 0, trend: 0, syllabusTag: 'Out of Syllabus' },
        { name: 'Practical Organic Chemistry', total: 6, avg: 0.6, weightage: 2.4, trend: 3.45 },
      ],
    },
  ],
  Mathematics: [
    {
      section: 'Algebra',
      topics: [
        { name: 'Sets and Relations', total: 10, avg: 1, weightage: 4, trend: -9.5 },
        { name: 'Logarithm', total: 1, avg: 0.1, weightage: 0.4, trend: 90.48 },
        { name: 'Quadratic Equation and Inequalities', total: 11, avg: 1.1, weightage: 4.4, trend: 30.56 },
        { name: 'Sequences and Series', total: 17, avg: 1.7, weightage: 6.8, trend: 19.72, syllabusTag: 'Syllabus Reduced' },
        { name: 'Mathematical Induction', total: 0, avg: 0, weightage: 0, trend: 0, syllabusTag: 'Out of Syllabus' },
        { name: 'Binomial Theorem', total: 9, avg: 0.9, weightage: 3.6, trend: -28.71, syllabusTag: 'Syllabus Reduced' },
        { name: 'Matrices and Determinants', total: 16, avg: 1.6, weightage: 6.4, trend: -10.61, syllabusTag: 'Syllabus Reduced' },
        { name: 'Permutations and Combinations', total: 12, avg: 1.2, weightage: 4.8, trend: 8.6 },
        { name: 'Probability', total: 9, avg: 0.9, weightage: 3.6, trend: -18.55, syllabusTag: 'Syllabus Reduced' },
        { name: 'Vector Algebra', total: 18, avg: 1.8, weightage: 7.2, trend: 48.76, syllabusTag: 'Syllabus Reduced' },
        { name: '3D Geometry', total: 12, avg: 1.2, weightage: 4.8, trend: -32.96, syllabusTag: 'Syllabus Reduced' },
        { name: 'Complex Numbers', total: 10, avg: 1, weightage: 4, trend: 0 },
        { name: 'Statistics', total: 7, avg: 0.7, weightage: 2.8, trend: 66.67 },
        { name: 'Mathematical Reasoning', total: 0, avg: 0, weightage: 0, trend: 0, syllabusTag: 'Out of Syllabus' },
      ],
    },
    {
      section: 'Trigonometry',
      topics: [
        { name: 'Trigonometric Ratio and Identites', total: 7, avg: 0.7, weightage: 2.8, trend: 122.22 },
        { name: 'Trigonometric Equations', total: 2, avg: 0.2, weightage: 0.8, trend: -36.51, syllabusTag: 'Out of Syllabus' },
        { name: 'Inverse Trigonometric Functions', total: 6, avg: 0.6, weightage: 2.4, trend: 3.45 },
        { name: 'Properties of Triangle', total: 0, avg: 0, weightage: 0, trend: -100, syllabusTag: 'Out of Syllabus' },
        { name: 'Height and Distance', total: 0, avg: 0, weightage: 0, trend: 0, syllabusTag: 'Out of Syllabus' },
      ],
    },
    {
      section: 'Coordinate Geometry',
      topics: [
        { name: 'Straight Lines and Pair of Straight Lines', total: 7, avg: 0.7, weightage: 2.8, trend: -21.79, syllabusTag: 'Syllabus Reduced' },
        { name: 'Circle', total: 6, avg: 0.6, weightage: 2.4, trend: 13.74, syllabusTag: 'Syllabus Reduced' },
        { name: 'Parabola', total: 8, avg: 0.8, weightage: 3.2, trend: -10.61, syllabusTag: 'Syllabus Reduced' },
        { name: 'Ellipse', total: 8, avg: 0.8, weightage: 3.2, trend: -15.57, syllabusTag: 'Syllabus Reduced' },
        { name: 'Hyperbola', total: 7, avg: 0.7, weightage: 2.8, trend: 48.15, syllabusTag: 'Syllabus Reduced' },
      ],
    },
    {
      section: 'Calculus',
      topics: [
        { name: 'Functions', total: 8, avg: 0.8, weightage: 3.2, trend: -5.04 },
        { name: 'Limits, Continuity and Differentiability', total: 11, avg: 1.1, weightage: 4.4, trend: -19.56 },
        { name: 'Differentiation', total: 1, avg: 0.1, weightage: 0.4, trend: -52.38 },
        { name: 'Application of Derivatives', total: 7, avg: 0.7, weightage: 2.8, trend: -5.08, syllabusTag: 'Syllabus Reduced' },
        { name: 'Indefinite Integrals', total: 6, avg: 0.6, weightage: 2.4, trend: 42.86 },
        { name: 'Definite Integration', total: 15, avg: 1.5, weightage: 6, trend: 23.97, syllabusTag: 'Syllabus Reduced' },
        { name: 'Area Under The Curves', total: 10, avg: 1, weightage: 4, trend: 5.54 },
        { name: 'Differential Equations', total: 9, avg: 0.9, weightage: 3.6, trend: -18.55, syllabusTag: 'Syllabus Reduced' },
      ],
    },
  ],
};

const jeeAdvancedTopics: SubjectTopics = {
  Physics: [
    {
      section: 'Mechanics',
      topics: [
        { name: 'Units & Measurements', total: 3, avg: 1.5, weightage: 9.38, trend: 59.52 },
        { name: 'Motion', total: 0, avg: 0, weightage: 0, trend: -100 },
        { name: 'Laws of Motion', total: 1, avg: 0.5, weightage: 3.13, trend: 0 },
        { name: 'Work Power & Energy', total: 0, avg: 0, weightage: 0, trend: 0 },
        { name: 'Impulse & Momentum', total: 1, avg: 0.5, weightage: 3.13, trend: 6.46 },
        { name: 'Rotational Motion', total: 1, avg: 0.5, weightage: 3.13, trend: -46.77 },
        { name: 'Properties of Matter', total: 0, avg: 0, weightage: 0, trend: -100 },
        { name: 'Heat and Thermodynamics', total: 4, avg: 2, weightage: 12.5, trend: 41.72 },
        { name: 'Simple Harmonic Motion', total: 2, avg: 1, weightage: 6.25, trend: 6.29 },
        { name: 'Waves', total: 1, avg: 0.5, weightage: 3.13, trend: -46.77 },
        { name: 'Gravitation', total: 2, avg: 1, weightage: 6.25, trend: 112.59 },
      ],
    },
    {
      section: 'Electricity',
      topics: [
        { name: 'Electrostatics', total: 4, avg: 2, weightage: 12.5, trend: 6.29 },
        { name: 'Current Electricity', total: 0, avg: 0, weightage: 0, trend: 0 },
        { name: 'Capacitor', total: 0, avg: 0, weightage: 0, trend: -100 },
        { name: 'Magnetism', total: 1, avg: 0.5, weightage: 3.13, trend: -64.51 },
        { name: 'Electromagnetic Induction', total: 2, avg: 1, weightage: 6.25, trend: 112.59 },
        { name: 'Alternating Current', total: 1, avg: 0.5, weightage: 3.13, trend: 6.46 },
        { name: 'Electromagnetic Waves', total: 1, avg: 0.5, weightage: 3.13, trend: 0 },
      ],
    },
    {
      section: 'Optics',
      topics: [
        { name: 'Geometrical Optics', total: 2, avg: 1, weightage: 6.25, trend: -29.14 },
        { name: 'Wave Optics', total: 3, avg: 1.5, weightage: 9.38, trend: 6.35 },
      ],
    },
    {
      section: 'Modern Physics',
      topics: [
        { name: 'Atoms and Nuclei', total: 1, avg: 0.5, weightage: 3.13, trend: 6.46 },
        { name: 'Dual Nature of Radiation', total: 2, avg: 1, weightage: 6.25, trend: 112.59 },
      ],
    },
  ],
  Chemistry: [
    {
      section: 'Physical Chemistry',
      topics: [
        { name: 'Some Basic Concepts of Chemistry', total: 0, avg: 0, weightage: 0, trend: 0 },
        { name: 'Structure of Atom', total: 0, avg: 0, weightage: 0, trend: -100 },
        { name: 'Redox Reactions', total: 1, avg: 0.5, weightage: 3.13, trend: 0 },
        { name: 'Gaseous State', total: 1, avg: 0.5, weightage: 3.13, trend: 6.46 },
        { name: 'Chemical Equilibrium', total: 0, avg: 0, weightage: 0, trend: 0 },
        { name: 'Ionic Equilibrium', total: 2, avg: 1, weightage: 6.25, trend: 0 },
        { name: 'Solutions', total: 1, avg: 0.5, weightage: 3.13, trend: 6.46 },
        { name: 'Thermodynamics', total: 1, avg: 0.5, weightage: 3.13, trend: 6.46 },
        { name: 'Chemical Kinetics and Nuclear Chemistry', total: 1, avg: 0.5, weightage: 3.13, trend: -46.77 },
        { name: 'Electrochemistry', total: 2, avg: 1, weightage: 6.25, trend: 6.29 },
        { name: 'Solid State', total: 1, avg: 0.5, weightage: 3.13, trend: 6.46 },
        { name: 'Surface Chemistry', total: 1, avg: 0.5, weightage: 3.13, trend: 6.46 },
      ],
    },
    {
      section: 'Inorganic Chemistry',
      topics: [
        { name: 'Periodic Table & Periodicity', total: 0, avg: 0, weightage: 0, trend: 0 },
        { name: 'Chemical Bonding & Molecular Structure', total: 2, avg: 1, weightage: 6.25, trend: 6.29 },
        { name: 'Isolation of Elements', total: 0, avg: 0, weightage: 0, trend: 0 },
        { name: 'Hydrogen', total: 0, avg: 0, weightage: 0, trend: 0 },
        { name: 's-Block Elements', total: 0, avg: 0, weightage: 0, trend: 0 },
        { name: 'p-Block Elements', total: 3, avg: 1.5, weightage: 9.38, trend: 6.35 },
        { name: 'd and f Block Elements', total: 1, avg: 0.5, weightage: 3.13, trend: 0 },
        { name: 'Coordination Compounds', total: 2, avg: 1, weightage: 6.25, trend: -6.85 },
        { name: 'Salt Analysis', total: 2, avg: 1, weightage: 6.25, trend: 6.29 },
      ],
    },
    {
      section: 'Organic Chemistry',
      topics: [
        { name: 'Basics of Organic Chemistry', total: 0, avg: 0, weightage: 0, trend: 0 },
        { name: 'Hydrocarbons', total: 1, avg: 0.5, weightage: 3.13, trend: 6.46 },
        { name: 'Haloalkanes and Haloarenes', total: 1, avg: 0.5, weightage: 3.13, trend: 0 },
        { name: 'Alcohols, Phenols and Ethers', total: 3, avg: 1.5, weightage: 9.38, trend: 219.05 },
        { name: 'Aldehydes, Ketones and Carboxylic Acids', total: 1, avg: 0.5, weightage: 3.13, trend: -82.27 },
        { name: 'Compounds Containing Nitrogen', total: 2, avg: 1, weightage: 6.25, trend: 6.29 },
        { name: 'Polymers', total: 1, avg: 0.5, weightage: 3.13, trend: 0 },
        { name: 'Biomolecules', total: 1, avg: 0.5, weightage: 3.13, trend: 6.46 },
        { name: 'Chemistry in Everyday Life', total: 0, avg: 0, weightage: 0, trend: -100 },
        { name: 'Practical Organic Chemistry', total: 1, avg: 0.5, weightage: 3.13, trend: 0 },
      ],
    },
  ],
  Mathematics: [
    {
      section: 'Algebra',
      topics: [
        { name: 'Quadratic Equation and Inequalities', total: 1, avg: 0.5, weightage: 3.13, trend: 6.46 },
        { name: 'Sequences and Series', total: 0, avg: 0, weightage: 0, trend: 0 },
        { name: 'Mathematical Induction and Binomial Theorem', total: 1, avg: 0.5, weightage: 3.13, trend: 0 },
        { name: 'Matrices and Determinants', total: 2, avg: 1, weightage: 6.25, trend: -29.14 },
        { name: 'Permutations and Combinations', total: 2, avg: 1, weightage: 6.25, trend: -29.14 },
        { name: 'Probability', total: 2, avg: 1, weightage: 6.25, trend: -29.14 },
        { name: 'Vector Algebra', total: 3, avg: 1.5, weightage: 9.38, trend: 59.52 },
        { name: '3D Geometry', total: 1, avg: 0.5, weightage: 3.13, trend: -64.51 },
        { name: 'Statistics', total: 1, avg: 0.5, weightage: 3.13, trend: 0 },
        { name: 'Complex Numbers', total: 2, avg: 1, weightage: 6.25, trend: 6.29 },
      ],
    },
    {
      section: 'Trigonometry',
      topics: [
        { name: 'Trigonometric Functions & Equations', total: 1, avg: 0.5, weightage: 3.13, trend: 6.46 },
        { name: 'Inverse Trigonometric Functions', total: 1, avg: 0.5, weightage: 3.13, trend: 6.46 },
        { name: 'Properties of Triangle', total: 0, avg: 0, weightage: 0, trend: 0 },
      ],
    },
    {
      section: 'Coordinate Geometry',
      topics: [
        { name: 'Straight Lines and Pair of Straight Lines', total: 1, avg: 0.5, weightage: 3.13, trend: 0 },
        { name: 'Circle', total: 0, avg: 0, weightage: 0, trend: -100 },
        { name: 'Parabola', total: 1, avg: 0.5, weightage: 3.13, trend: -46.77 },
        { name: 'Ellipse', total: 1, avg: 0.5, weightage: 3.13, trend: 6.46 },
        { name: 'Hyperbola', total: 0, avg: 0, weightage: 0, trend: 0 },
      ],
    },
    {
      section: 'Calculus',
      topics: [
        { name: 'Functions', total: 3, avg: 1.5, weightage: 9.38, trend: 59.52 },
        { name: 'Limits, Continuity and Differentiability', total: 4, avg: 2, weightage: 12.5, trend: 6.29 },
        { name: 'Differentiation', total: 0, avg: 0, weightage: 0, trend: 0 },
        { name: 'Application of Derivatives', total: 1, avg: 0.5, weightage: 3.13, trend: 0 },
        { name: 'Indefinite Integrals', total: 0, avg: 0, weightage: 0, trend: 0 },
        { name: 'Definite Integration', total: 1, avg: 0.5, weightage: 3.13, trend: -46.77 },
        { name: 'Application of Integration', total: 1, avg: 0.5, weightage: 3.13, trend: -46.77 },
        { name: 'Differential Equations', total: 2, avg: 1, weightage: 6.25, trend: 112.59 },
      ],
    },
  ],
};

const mhtCetTopics: SubjectTopics = {
  Mathematics: [
    {
      section: 'Algebra',
      topics: [
        { name: 'Sets and Relations', total: 0, avg: 0, weightage: 0, trend: -100 },
        { name: 'Logarithms', total: 5, avg: 0.33, weightage: 0.67, trend: 76.32 },
        { name: 'Quadratic Equations', total: 2, avg: 0.13, weightage: 0.27, trend: -46 },
        { name: 'Sequences and Series', total: 1, avg: 0.07, weightage: 0.13, trend: 0 },
        { name: 'Binomial Theorem', total: 1, avg: 0.07, weightage: 0.13, trend: 0 },
        { name: 'Permutations and Combinations', total: 15, avg: 1, weightage: 2, trend: 22.7 },
        { name: 'Probability', total: 57, avg: 3.8, weightage: 7.6, trend: 4.83 },
        { name: 'Vector Algebra', total: 69, avg: 4.6, weightage: 9.2, trend: -15.44 },
        { name: 'Three Dimensional Geometry', total: 78, avg: 5.2, weightage: 10.4, trend: 15.56 },
        { name: 'Matrices and Determinants', total: 16, avg: 1.07, weightage: 2.13, trend: -5.33 },
        { name: 'Statistics', total: 3, avg: 0.2, weightage: 0.4, trend: -83.19 },
        { name: 'Mathematical Reasoning', total: 30, avg: 2, weightage: 4, trend: -5.88 },
        { name: 'Linear Programming', total: 15, avg: 1, weightage: 2, trend: 0 },
        { name: 'Complex Numbers', total: 16, avg: 1.07, weightage: 2.13, trend: 21.71 },
      ],
    },
    {
      section: 'Trigonometry',
      topics: [
        { name: 'Trigonometric Ratios & Identities', total: 18, avg: 1.2, weightage: 2.4, trend: 37.14 },
        { name: 'Trigonometric Equations', total: 12, avg: 0.8, weightage: 1.6, trend: -48.88 },
        { name: 'Inverse Trigonometric Functions', total: 33, avg: 2.2, weightage: 4.4, trend: -25.17 },
        { name: 'Properties of Triangles', total: 39, avg: 2.6, weightage: 5.2, trend: 131.11 },
      ],
    },
    {
      section: 'Calculus',
      topics: [
        { name: 'Limits, Continuity and Differentiability', total: 32, avg: 2.13, weightage: 4.27, trend: -7.78 },
        { name: 'Functions', total: 9, avg: 0.6, weightage: 1.2, trend: -20 },
        { name: 'Definite Integration', total: 30, avg: 2, weightage: 4, trend: 60 },
        { name: 'Indefinite Integration', total: 45, avg: 3, weightage: 6, trend: -23.86 },
        { name: 'Application of Derivatives', total: 52, avg: 3.47, weightage: 6.93, trend: -13.38 },
        { name: 'Area Under The Curves', total: 14, avg: 0.93, weightage: 1.87, trend: -6.5 },
        { name: 'Differential Equations', total: 59, avg: 3.93, weightage: 7.87, trend: 31.17 },
        { name: 'Differentiation', total: 36, avg: 2.4, weightage: 4.8, trend: -16.52 },
      ],
    },
    {
      section: 'Coordinate Geometry',
      topics: [
        { name: 'Parabola', total: 6, avg: 0.4, weightage: 0.8, trend: 515.38 },
        { name: 'Ellipse', total: 8, avg: 0.53, weightage: 1.07, trend: 0 },
        { name: 'Circle', total: 15, avg: 1, weightage: 2, trend: 0 },
        { name: 'Straight Lines and Pair of Straight Lines', total: 29, avg: 1.93, weightage: 3.87, trend: -6.3 },
        { name: 'Hyperbola', total: 5, avg: 0.33, weightage: 0.67, trend: 0 },
      ],
    },
  ],
};

const examTopicData: ExamTopicMap = {
  'jee-main': jeeMainTopics,
  'jee-advanced': jeeAdvancedTopics,
  'mht-cet': mhtCetTopics,
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
