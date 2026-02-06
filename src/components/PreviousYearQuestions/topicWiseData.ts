export interface TopicData {
  name: string;
  total: number;
  avg: number;
  weightage: number;
  trend: number;
  syllabusTag?: 'Syllabus Reduced' | 'Out of Syllabus';
}

export interface SectionData {
  section: string;
  topics: TopicData[];
}

export type SubjectTopics = Record<string, SectionData[]>;
export type ExamTopicMap = Record<string, SubjectTopics>;

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

const bitsatTopics: SubjectTopics = {
  Physics: [
    {
      section: 'Mechanics',
      topics: [
        { name: 'Units & Measurement and Dimensions', total: 1, avg: 1, weightage: 3.33, trend: 0 },
        { name: 'Motion', total: 1, avg: 1, weightage: 3.33, trend: 0 },
        { name: 'Laws of Motion', total: 0, avg: 0, weightage: 0, trend: -100 },
        { name: 'Circular Motion', total: 0, avg: 0, weightage: 0, trend: 0 },
        { name: 'Work, Energy and Power', total: 3, avg: 3, weightage: 10, trend: 200.3 },
        { name: 'Center of Mass and Collision', total: 1, avg: 1, weightage: 3.33, trend: 0 },
        { name: 'Rotational Motion', total: 2, avg: 2, weightage: 6.67, trend: 0 },
        { name: 'Gravitation', total: 1, avg: 1, weightage: 3.33, trend: 0 },
        { name: 'Simple Harmonic Motion', total: 1, avg: 1, weightage: 3.33, trend: 0 },
        { name: 'Fluid Mechanics', total: 0, avg: 0, weightage: 0, trend: -100 },
        { name: 'Elasticity', total: 1, avg: 1, weightage: 3.33, trend: 0 },
        { name: 'Waves', total: 0, avg: 0, weightage: 0, trend: -100 },
        { name: 'Heat and Thermodynamics', total: 2, avg: 2, weightage: 6.67, trend: 0 },
      ],
    },
    {
      section: 'Optics',
      topics: [
        { name: 'Wave Optics', total: 2, avg: 2, weightage: 6.67, trend: 100.3 },
        { name: 'Ray Optics', total: 2, avg: 2, weightage: 6.67, trend: 0 },
      ],
    },
    {
      section: 'Electromagnetism',
      topics: [
        { name: 'Moving Charges and Magnetism', total: 1, avg: 1, weightage: 3.33, trend: 0 },
        { name: 'Alternating Current', total: 0, avg: 0, weightage: 0, trend: -100 },
        { name: 'Magnetism and Matter', total: 0, avg: 0, weightage: 0, trend: -100 },
        { name: 'Electromagnetic Waves', total: 0, avg: 0, weightage: 0, trend: -100 },
        { name: 'Electromagnetic Induction', total: 1, avg: 1, weightage: 3.33, trend: 0 },
        { name: 'Current Electricity', total: 4, avg: 4, weightage: 13.33, trend: 300.3 },
        { name: 'Capacitor', total: 1, avg: 1, weightage: 3.33, trend: 0 },
        { name: 'Electrostatics', total: 4, avg: 4, weightage: 13.33, trend: 0 },
      ],
    },
    {
      section: 'Modern Physics',
      topics: [
        { name: 'Dual Nature of Radiation', total: 0, avg: 0, weightage: 0, trend: -100 },
        { name: 'Atoms and Nuclei', total: 1, avg: 1, weightage: 3.33, trend: -50.07 },
        { name: 'Semiconductor Devices and Logic Gates', total: 1, avg: 1, weightage: 3.33, trend: -50.07 },
      ],
    },
  ],
  Chemistry: [
    {
      section: 'Physical Chemistry',
      topics: [
        { name: 'Some Basic Concepts of Chemistry', total: 0, avg: 0, weightage: 0, trend: -100 },
        { name: 'Atomic Structure', total: 2, avg: 2, weightage: 6.67, trend: 100.3 },
        { name: 'States of Matter', total: 0, avg: 0, weightage: 0, trend: -100 },
        { name: 'Thermodynamics', total: 1, avg: 1, weightage: 3.33, trend: -66.7 },
        { name: 'Chemical Equilibrium', total: 0, avg: 0, weightage: 0, trend: 0 },
        { name: 'Ionic Equilibrium', total: 2, avg: 2, weightage: 6.67, trend: 0 },
        { name: 'Liquid Solution', total: 2, avg: 2, weightage: 6.67, trend: 0 },
        { name: 'Redox Reactions', total: 2, avg: 2, weightage: 6.67, trend: 0 },
        { name: 'Surface Chemistry', total: 0, avg: 0, weightage: 0, trend: 0 },
        { name: 'Solid State', total: 0, avg: 0, weightage: 0, trend: -100 },
        { name: 'Electrochemistry', total: 2, avg: 2, weightage: 6.67, trend: 100.3 },
        { name: 'Chemical Kinetics', total: 2, avg: 2, weightage: 6.67, trend: 0 },
      ],
    },
    {
      section: 'Inorganic Chemistry',
      topics: [
        { name: 'Metallurgy', total: 0, avg: 0, weightage: 0, trend: 0 },
        { name: 'Coordination Compounds', total: 2, avg: 2, weightage: 6.67, trend: 0 },
        { name: 'Environmental Chemistry', total: 0, avg: 0, weightage: 0, trend: 0 },
        { name: 'Chemical Bonding and Molecular Structure', total: 2, avg: 2, weightage: 6.67, trend: 0 },
        { name: 's-Block Elements', total: 0, avg: 0, weightage: 0, trend: -100 },
        { name: 'Periodic Table and Periodicity', total: 2, avg: 2, weightage: 6.67, trend: 0 },
        { name: 'p-Block Elements', total: 0, avg: 0, weightage: 0, trend: -100 },
        { name: "Hydrogen and It's Compounds", total: 0, avg: 0, weightage: 0, trend: -100 },
        { name: 'd and f Block Elements', total: 2, avg: 2, weightage: 6.67, trend: 0 },
      ],
    },
    {
      section: 'Organic Chemistry',
      topics: [
        { name: 'Biomolecules', total: 2, avg: 2, weightage: 6.67, trend: 0 },
        { name: 'Chemistry in Everyday Life', total: 0, avg: 0, weightage: 0, trend: -100 },
        { name: 'Practical Organic Chemistry', total: 0, avg: 0, weightage: 0, trend: 0 },
        { name: 'Alcohol, Phenols and Ethers', total: 1, avg: 1, weightage: 3.33, trend: 0 },
        { name: 'Polymers', total: 0, avg: 0, weightage: 0, trend: -100 },
        { name: 'Hydrocarbons', total: 1, avg: 1, weightage: 3.33, trend: -66.7 },
        { name: 'Isomerism', total: 1, avg: 1, weightage: 3.33, trend: 0 },
        { name: 'Aldehyde and Ketone', total: 1, avg: 1, weightage: 3.33, trend: 0 },
        { name: 'General Organic Chemistry', total: 0, avg: 0, weightage: 0, trend: -100 },
        { name: 'Compounds Containing Nitrogen', total: 0, avg: 0, weightage: 0, trend: 0 },
        { name: 'Haloalkanes and Haloarenes', total: 3, avg: 3, weightage: 10, trend: 0 },
      ],
    },
  ],
  Mathematics: [
    {
      section: 'Algebra',
      topics: [
        { name: 'Matrices and Determinants', total: 3, avg: 3, weightage: 7.5, trend: -25 },
        { name: 'Statistics', total: 0, avg: 0, weightage: 0, trend: -100 },
        { name: 'Permutations and Combinations', total: 2, avg: 2, weightage: 5, trend: 0 },
        { name: 'Vector Algebra', total: 2, avg: 2, weightage: 5, trend: 100 },
        { name: 'Linear Programming', total: 1, avg: 1, weightage: 2.5, trend: 0 },
        { name: 'Logarithms', total: 0, avg: 0, weightage: 0, trend: 0 },
        { name: 'Sequences and Series', total: 4, avg: 4, weightage: 10, trend: 33.33 },
        { name: 'Binomial Theorem', total: 1, avg: 1, weightage: 2.5, trend: -50 },
        { name: 'Mathematical Reasoning', total: 1, avg: 1, weightage: 2.5, trend: 0 },
        { name: 'Quadratic Equations', total: 2, avg: 2, weightage: 5, trend: 0 },
        { name: 'Three Dimensional Geometry', total: 0, avg: 0, weightage: 0, trend: -100 },
        { name: 'Probability', total: 2, avg: 2, weightage: 5, trend: 100 },
        { name: 'Sets and Relations', total: 1, avg: 1, weightage: 2.5, trend: 0 },
        { name: 'Complex Numbers', total: 2, avg: 2, weightage: 5, trend: 0 },
      ],
    },
    {
      section: 'Trigonometry',
      topics: [
        { name: 'Trigonometric Equations', total: 1, avg: 1, weightage: 2.5, trend: 0 },
        { name: 'Inverse Trigonometric Functions', total: 1, avg: 1, weightage: 2.5, trend: 0 },
        { name: 'Trigonometric Ratios & Identities', total: 1, avg: 1, weightage: 2.5, trend: -66.67 },
        { name: 'Properties of Triangles', total: 2, avg: 2, weightage: 5, trend: 100 },
      ],
    },
    {
      section: 'Calculus',
      topics: [
        { name: 'Functions', total: 1, avg: 1, weightage: 2.5, trend: 0 },
        { name: 'Limits, Continuity and Differentiability', total: 1, avg: 1, weightage: 2.5, trend: -50 },
        { name: 'Differential Equations', total: 1, avg: 1, weightage: 2.5, trend: 0 },
        { name: 'Application of Derivatives', total: 2, avg: 2, weightage: 5, trend: 0 },
        { name: 'Definite Integration', total: 2, avg: 2, weightage: 5, trend: 0 },
        { name: 'Differentiation', total: 1, avg: 1, weightage: 2.5, trend: 0 },
        { name: 'Indefinite Integration', total: 0, avg: 0, weightage: 0, trend: -100 },
        { name: 'Area Under The Curves', total: 2, avg: 2, weightage: 5, trend: 0 },
      ],
    },
    {
      section: 'Coordinate Geometry',
      topics: [
        { name: 'Parabola', total: 0, avg: 0, weightage: 0, trend: -100 },
        { name: 'Ellipse', total: 0, avg: 0, weightage: 0, trend: 0 },
        { name: 'Hyperbola', total: 1, avg: 1, weightage: 2.5, trend: 0 },
        { name: 'Straight Lines and Pair of Straight Lines', total: 1, avg: 1, weightage: 2.5, trend: 0 },
        { name: 'Circle', total: 2, avg: 2, weightage: 5, trend: -33.33 },
      ],
    },
  ],
  'English Proficiency': [
    {
      section: 'English Proficiency',
      topics: [
        { name: 'Rearrangement', total: 2, avg: 2, weightage: 20, trend: 0 },
        { name: 'Comprehension Ability', total: 0, avg: 0, weightage: 0, trend: -100 },
        { name: 'Fill in the Blanks', total: 0, avg: 0, weightage: 0, trend: 0 },
        { name: 'Grammar', total: 2, avg: 2, weightage: 20, trend: 100 },
        { name: 'Vocabulary', total: 6, avg: 6, weightage: 60, trend: 0 },
      ],
    },
  ],
  'Logical Reasoning': [
    {
      section: 'Verbal',
      topics: [
        { name: 'Series Completion', total: 3, avg: 3, weightage: 15, trend: 0 },
        { name: 'Blood Relations', total: 1, avg: 1, weightage: 5, trend: 0 },
        { name: 'Logical Deduction', total: 4, avg: 4, weightage: 20, trend: 0 },
      { name: 'Logic Chart', total: 0, avg: 0, weightage: 0, trend: 0 },
      ],
    },
    {
      section: 'Non Verbal',
      topics: [
        { name: 'Completion of Figure', total: 2, avg: 2, weightage: 10, trend: 0 },
        { name: 'Paper Folding and Cutting', total: 1, avg: 1, weightage: 5, trend: 0 },
        { name: 'Figure Matrix', total: 0, avg: 0, weightage: 0, trend: -100 },
        { name: 'Rule Detection', total: 1, avg: 1, weightage: 5, trend: 0 },
        { name: 'Mirror Image', total: 1, avg: 1, weightage: 5, trend: 0 },
        { name: 'Figure Formation', total: 1, avg: 1, weightage: 5, trend: 0 },
      ],
    },
  ],
};

const comedkTopics: SubjectTopics = {
  Physics: [
    {
      section: 'Mechanics',
      topics: [
        { name: 'Units & Measurements', total: 18, avg: 6, weightage: 10, trend: 350.45 },
        { name: 'Vector Algebra', total: 1, avg: 0.33, weightage: 0.56, trend: 0 },
        { name: 'Motion', total: 5, avg: 1.67, weightage: 2.78, trend: 25.23 },
        { name: 'Laws of Motion', total: 3, avg: 1, weightage: 1.67, trend: -39.93 },
        { name: 'Circular Motion', total: 2, avg: 0.67, weightage: 1.11, trend: -33.53 },
        { name: 'Work, Energy and Power', total: 1, avg: 0.33, weightage: 0.56, trend: -79.86 },
        { name: 'Center of Mass and Collision', total: 5, avg: 1.67, weightage: 2.78, trend: 150.45 },
        { name: 'Rotational Motion', total: 3, avg: 1, weightage: 1.67, trend: -39.93 },
        { name: 'Elasticity', total: 3, avg: 1, weightage: 1.67, trend: 50.45 },
        { name: 'Fluid Mechanics', total: 4, avg: 1.33, weightage: 2.22, trend: 0 },
        { name: 'Heat and Thermodynamics', total: 12, avg: 4, weightage: 6.67, trend: 0 },
        { name: 'Gravitation', total: 7, avg: 2.33, weightage: 3.89, trend: 16.82 },
        { name: 'Simple Harmonic Motion', total: 1, avg: 0.33, weightage: 0.56, trend: -66.47 },
        { name: 'Waves', total: 2, avg: 0.67, weightage: 1.11, trend: -33.53 },
      ],
    },
    {
      section: 'Optics',
      topics: [
        { name: 'Ray Optics', total: 11, avg: 3.67, weightage: 6.11, trend: -8.4 },
        { name: 'Wave Optics', total: 8, avg: 2.67, weightage: 4.44, trend: -33.43 },
      ],
    },
    {
      section: 'Electromagnetism',
      topics: [
        { name: 'Capacitor', total: 5, avg: 1.67, weightage: 2.78, trend: 25.23 },
        { name: 'Electromagnetic Induction', total: 4, avg: 1.33, weightage: 2.22, trend: -60.07 },
        { name: 'Electrostatics', total: 13, avg: 4.33, weightage: 7.22, trend: 0 },
        { name: 'Moving Charges and Magnetism', total: 10, avg: 3.33, weightage: 5.56, trend: 0 },
        { name: 'Alternating Current', total: 11, avg: 3.67, weightage: 6.11, trend: 22.2 },
        { name: 'Magnetism and Matter', total: 5, avg: 1.67, weightage: 2.78, trend: 0 },
        { name: 'Current Electricity', total: 16, avg: 5.33, weightage: 8.89, trend: 6.72 },
        { name: 'Electromagnetic Waves', total: 2, avg: 0.67, weightage: 1.11, trend: 0 },
      ],
    },
    {
      section: 'Modern Physics',
      topics: [
        { name: 'Semiconductor Devices and Logic Gates', total: 9, avg: 3, weightage: 5, trend: -10.07 },
        { name: 'Atoms and Nuclei', total: 13, avg: 4.33, weightage: 7.22, trend: 8.25 },
        { name: 'Dual Nature of Radiation', total: 6, avg: 2, weightage: 3.33, trend: -14.4 },
        { name: 'Communication Systems', total: 0, avg: 0, weightage: 0, trend: 0, syllabusTag: 'Out of Syllabus' as const },
      ],
    },
  ],
  Chemistry: [
    {
      section: 'Physical Chemistry',
      topics: [
        { name: 'Some Basic Concepts of Chemistry', total: 2, avg: 0.67, weightage: 1.11, trend: -50 },
        { name: 'Atomic Structure', total: 5, avg: 1.67, weightage: 2.78, trend: -28.53 },
        { name: 'States of Matter', total: 0, avg: 0, weightage: 0, trend: 0, syllabusTag: 'Out of Syllabus' as const },
        { name: 'Thermodynamics', total: 9, avg: 3, weightage: 5, trend: 0 },
        { name: 'Chemical Equilibrium', total: 3, avg: 1, weightage: 1.67, trend: 50.45 },
        { name: 'Ionic Equilibrium', total: 5, avg: 1.67, weightage: 2.78, trend: 25.23 },
        { name: 'Liquid Solution', total: 14, avg: 4.67, weightage: 7.78, trend: 0 },
        { name: 'Redox Reactions', total: 7, avg: 2.33, weightage: 3.89, trend: 16.82 },
        { name: 'Surface Chemistry', total: 0, avg: 0, weightage: 0, trend: 0, syllabusTag: 'Out of Syllabus' as const },
        { name: 'Solid State', total: 0, avg: 0, weightage: 0, trend: 0, syllabusTag: 'Out of Syllabus' as const },
        { name: 'Electrochemistry', total: 14, avg: 4.67, weightage: 7.78, trend: -12.49 },
        { name: 'Chemical Kinetics', total: 15, avg: 5, weightage: 8.33, trend: 0 },
        { name: 'Nuclear Chemistry', total: 0, avg: 0, weightage: 0, trend: 0 },
      ],
    },
    {
      section: 'Inorganic Chemistry',
      topics: [
        { name: 'Metallurgy', total: 0, avg: 0, weightage: 0, trend: 0, syllabusTag: 'Out of Syllabus' as const },
        { name: 'Periodic Table and Periodicity', total: 2, avg: 0.67, weightage: 1.11, trend: 0 },
        { name: "Hydrogen and It's Compounds", total: 0, avg: 0, weightage: 0, trend: 0, syllabusTag: 'Out of Syllabus' as const },
        { name: 'p-Block Elements', total: 1, avg: 0.33, weightage: 0.56, trend: 0, syllabusTag: 'Out of Syllabus' as const },
        { name: 'Environmental Chemistry', total: 0, avg: 0, weightage: 0, trend: 0, syllabusTag: 'Out of Syllabus' as const },
        { name: 'Coordination Compounds', total: 11, avg: 3.67, weightage: 6.11, trend: 9.89 },
        { name: 'd and f Block Elements', total: 10, avg: 3.33, weightage: 5.56, trend: 0 },
        { name: 's-Block Elements', total: 0, avg: 0, weightage: 0, trend: 0, syllabusTag: 'Out of Syllabus' as const },
        { name: 'Chemical Bonding and Molecular Structure', total: 8, avg: 2.67, weightage: 4.44, trend: -11.2 },
      ],
    },
    {
      section: 'Organic Chemistry',
      topics: [
        { name: 'IUPAC Nomenclatures', total: 3, avg: 1, weightage: 1.67, trend: 50.45 },
        { name: 'General Organic Chemistry', total: 4, avg: 1.33, weightage: 2.22, trend: -33.33 },
        { name: 'Isomerism', total: 1, avg: 0.33, weightage: 0.56, trend: -74.77 },
        { name: 'Hydrocarbons', total: 12, avg: 4, weightage: 6.67, trend: 100.3 },
        { name: 'Haloalkanes and Haloarenes', total: 10, avg: 3.33, weightage: 5.56, trend: -9 },
        { name: 'Alcohol, Phenols and Ethers', total: 12, avg: 4, weightage: 6.67, trend: 33.4 },
        { name: 'Aldehyde and Ketone', total: 7, avg: 2.33, weightage: 3.89, trend: -30.04 },
        { name: 'Carboxylic Acids and Its Derivatives', total: 6, avg: 2, weightage: 3.33, trend: -14.4 },
        { name: 'Compounds Containing Nitrogen', total: 10, avg: 3.33, weightage: 5.56, trend: 42.93 },
        { name: 'Polymers', total: 0, avg: 0, weightage: 0, trend: 0, syllabusTag: 'Out of Syllabus' as const },
        { name: 'Biomolecules', total: 8, avg: 2.67, weightage: 4.44, trend: -11.2 },
        { name: 'Chemistry in Everyday Life', total: 0, avg: 0, weightage: 0, trend: 0, syllabusTag: 'Out of Syllabus' as const },
        { name: 'Practical Organic Chemistry', total: 1, avg: 0.33, weightage: 0.56, trend: 0 },
      ],
    },
  ],
  Mathematics: [
    {
      section: 'Algebra',
      topics: [
        { name: 'Sets and Relations', total: 10, avg: 3.33, weightage: 5.56, trend: 11.2 },
        { name: 'Logarithms', total: 0, avg: 0, weightage: 0, trend: 0 },
        { name: 'Complex Numbers', total: 4, avg: 1.33, weightage: 2.22, trend: 32.93 },
        { name: 'Quadratic Equations', total: 1, avg: 0.33, weightage: 0.56, trend: -66.47 },
        { name: 'Sequences and Series', total: 5, avg: 1.67, weightage: 2.78, trend: -44.4 },
        { name: 'Permutations and Combinations', total: 6, avg: 2, weightage: 3.33, trend: 0 },
        { name: 'Probability', total: 15, avg: 5, weightage: 8.33, trend: 0 },
        { name: 'Binomial Theorem', total: 2, avg: 0.67, weightage: 1.11, trend: -33.53 },
        { name: 'Vector Algebra', total: 7, avg: 2.33, weightage: 3.89, trend: 16.82 },
        { name: 'Three Dimensional Geometry', total: 8, avg: 2.67, weightage: 4.44, trend: -11.2 },
        { name: 'Matrices and Determinants', total: 16, avg: 5.33, weightage: 8.89, trend: 14.27 },
        { name: 'Statistics', total: 3, avg: 1, weightage: 1.67, trend: 0 },
        { name: 'Mathematical Reasoning', total: 0, avg: 0, weightage: 0, trend: 0, syllabusTag: 'Out of Syllabus' as const },
        { name: 'Linear Programming', total: 4, avg: 1.33, weightage: 2.22, trend: 32.93 },
      ],
    },
    {
      section: 'Trigonometry',
      topics: [
        { name: 'Properties of Triangles', total: 0, avg: 0, weightage: 0, trend: 0 },
        { name: 'Trigonometric Ratios & Identities', total: 7, avg: 2.33, weightage: 3.89, trend: -22.2 },
        { name: 'Inverse Trigonometric Functions', total: 6, avg: 2, weightage: 3.33, trend: -25 },
        { name: 'Trigonometric Equations', total: 2, avg: 0.67, weightage: 1.11, trend: 0 },
      ],
    },
    {
      section: 'Coordinate Geometry',
      topics: [
        { name: 'Straight Lines and Pair of Straight Lines', total: 9, avg: 3, weightage: 5, trend: 28.53 },
        { name: 'Circle', total: 1, avg: 0.33, weightage: 0.56, trend: -66.47 },
        { name: 'Ellipse', total: 3, avg: 1, weightage: 1.67, trend: -24.77 },
        { name: 'Parabola', total: 1, avg: 0.33, weightage: 0.56, trend: -49.55 },
        { name: 'Hyperbola', total: 2, avg: 0.67, weightage: 1.11, trend: 98.21 },
      ],
    },
    {
      section: 'Calculus',
      topics: [
        { name: 'Differentiation', total: 8, avg: 2.67, weightage: 4.44, trend: 0 },
        { name: 'Functions', total: 2, avg: 0.67, weightage: 1.11, trend: -50 },
        { name: 'Limits, Continuity and Differentiability', total: 9, avg: 3, weightage: 5, trend: 0 },
        { name: 'Area Under The Curves', total: 5, avg: 1.67, weightage: 2.78, trend: 66.47 },
        { name: 'Differential Equations', total: 12, avg: 4, weightage: 6.67, trend: 19.96 },
        { name: 'Application of Derivatives', total: 17, avg: 5.67, weightage: 9.44, trend: 21.34 },
        { name: 'Indefinite Integration', total: 10, avg: 3.33, weightage: 5.56, trend: 11.2 },
        { name: 'Definite Integration', total: 5, avg: 1.67, weightage: 2.78, trend: -16.52 },
      ],
    },
  ],
};

export const examTopicData: ExamTopicMap = {
  'jee-main': jeeMainTopics,
  'jee-advanced': jeeAdvancedTopics,
  'mht-cet': mhtCetTopics,
  'bitsat': bitsatTopics,
  'comedk': comedkTopics,
};
