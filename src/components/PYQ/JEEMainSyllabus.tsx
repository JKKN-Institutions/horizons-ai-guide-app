import React, { useState } from 'react';
import { ChevronDown, BookOpen, Atom, FlaskConical, Calculator, GraduationCap, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface JEEMainSyllabusProps {
  language: 'en' | 'ta';
}

interface SyllabusSection {
  title: { en: string; ta: string };
  topics: string[];
  removedTopics?: string[];
}

interface SubjectData {
  name: { en: string; ta: string };
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  sections: SyllabusSection[];
}

const syllabusData: SubjectData[] = [
  {
    name: { en: 'Physics', ta: 'இயற்பியல்' },
    icon: <Atom className="w-5 h-5" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    sections: [
      {
        title: { en: 'Mechanics', ta: 'இயக்கவியல்' },
        topics: [
          'Units and Measurements: SI units, dimensional analysis, significant figures',
          'Kinematics: Motion in straight line, projectile motion, relative motion',
          'Laws of Motion: Newton\'s laws, friction, circular motion dynamics, pseudo forces',
          'Work, Energy and Power: Work-energy theorem, conservation of energy, collisions',
          'Rotational Motion: Moment of inertia, angular momentum, torque, rolling motion',
          'Gravitation: Newton\'s law, gravitational potential, Kepler\'s laws, satellites'
        ]
      },
      {
        title: { en: 'Properties of Matter & Thermodynamics', ta: 'பொருளின் பண்புகள் & வெப்பவியக்கவியல்' },
        topics: [
          'Solids: Stress-strain, Young\'s modulus, bulk and shear modulus',
          'Liquids: Viscosity, surface tension, capillarity, Bernoulli\'s theorem',
          'Thermodynamics: Zeroth, first and second laws, Carnot engine, entropy',
          'Kinetic Theory of Gases: Ideal gas equation, degrees of freedom, mean free path'
        ]
      },
      {
        title: { en: 'Oscillations & Waves', ta: 'அலைவுகள் & அலைகள்' },
        topics: [
          'Simple Harmonic Motion: Equation, energy, pendulums, springs',
          'Sound Waves: Speed of sound, standing waves, beats, Doppler effect'
        ]
      },
      {
        title: { en: 'Electrodynamics', ta: 'மின்னியக்கவியல்' },
        topics: [
          'Electrostatics: Coulomb\'s law, electric field, Gauss\'s law, potential, capacitors',
          'Current Electricity: Ohm\'s law, resistivity, Kirchhoff\'s laws, RC circuits',
          'Magnetic Effects of Current: Biot-Savart law, Ampere\'s law, magnetic force, galvanometer',
          'Magnetism: Earth\'s magnetism, magnetic materials, hysteresis',
          'Electromagnetic Induction: Faraday\'s law, Lenz\'s law, self and mutual inductance',
          'Alternating Currents: AC circuits, LCR resonance, transformers, power factor',
          'Electromagnetic Waves: EM spectrum, properties, applications'
        ]
      },
      {
        title: { en: 'Optics', ta: 'ஒளியியல்' },
        topics: [
          'Ray Optics: Reflection, refraction, lenses, mirrors, optical instruments',
          'Wave Optics: Interference, Young\'s double slit, diffraction, polarization'
        ]
      },
      {
        title: { en: 'Modern Physics', ta: 'நவீன இயற்பியல்' },
        topics: [
          'Dual Nature of Matter & Radiation: Photoelectric effect, de Broglie wavelength',
          'Atoms and Nuclei: Bohr model, hydrogen spectrum, radioactivity, nuclear reactions',
          'Electronic Devices: Semiconductors, p-n junction, transistors, logic gates'
        ]
      },
      {
        title: { en: 'Experimental Skills', ta: 'பரிசோதனை திறன்கள்' },
        topics: [
          'Vernier callipers, Screw gauge, Simple pendulum, Meter scale experiments'
        ],
        removedTopics: [
          'Communication Systems (removed from syllabus)'
        ]
      }
    ]
  },
  {
    name: { en: 'Mathematics', ta: 'கணிதம்' },
    icon: <Calculator className="w-5 h-5" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    sections: [
      {
        title: { en: 'Algebra', ta: 'இயற்கணிதம்' },
        topics: [
          'Sets, Relations & Functions: Types of relations, functions, composition',
          'Complex Numbers: Algebra of complex numbers, Argand plane, De Moivre\'s theorem',
          'Quadratic Equations: Roots, discriminant, nature of roots',
          'Matrices & Determinants: Types, operations, inverse, system of linear equations',
          'Permutations & Combinations: Fundamental principle, factorial, arrangements',
          'Binomial Theorem: General term, middle term, properties',
          'Sequence & Series: AP, GP, HP, sum formulas, special series',
          'Probability: Conditional probability, Bayes\' theorem, distributions'
        ],
        removedTopics: [
          'Mathematical Induction (removed)',
          'Mathematical Reasoning (removed)'
        ]
      },
      {
        title: { en: 'Calculus', ta: 'கால்குலஸ்' },
        topics: [
          'Limits: Standard limits, L\'Hopital\'s rule, continuity',
          'Continuity & Differentiability: Derivatives, chain rule, implicit differentiation',
          'Applications of Derivatives: Rate of change, tangents, maxima/minima, curve sketching',
          'Indefinite Integrals: Integration techniques, substitution, partial fractions',
          'Definite Integrals: Properties, applications, area under curves',
          'Differential Equations: Order, degree, solution methods, applications'
        ]
      },
      {
        title: { en: 'Coordinate Geometry', ta: 'ஆய முக்கோண கணிதம்' },
        topics: [
          'Straight Lines: Slope, equations of lines, angle between lines, distance formulas',
          'Circles: Standard equation, tangents, chord, family of circles',
          'Conic Sections: Parabola, Ellipse, Hyperbola - equations, properties, tangents'
        ]
      },
      {
        title: { en: 'Vectors & 3D Geometry', ta: 'வெக்டர்கள் & 3D வடிவியல்' },
        topics: [
          'Vector Algebra: Addition, scalar & vector products, triple products',
          '3D Coordinate Geometry: Direction cosines, lines, planes, shortest distance'
        ]
      },
      {
        title: { en: 'Trigonometry', ta: 'முக்கோணவியல்' },
        topics: [
          'Trigonometric Functions: Identities, graphs, equations, general solutions',
          'Inverse Trigonometric Functions: Principal values, properties, graphs'
        ]
      },
      {
        title: { en: 'Statistics', ta: 'புள்ளியியல்' },
        topics: [
          'Mean, Median, Mode, Variance, Standard Deviation, Coefficient of variation'
        ]
      }
    ]
  },
  {
    name: { en: 'Chemistry', ta: 'வேதியியல்' },
    icon: <FlaskConical className="w-5 h-5" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    sections: [
      {
        title: { en: 'Physical Chemistry', ta: 'இயற்பியல் வேதியியல்' },
        topics: [
          'Some Basic Concepts: Mole concept, stoichiometry, limiting reagent',
          'Atomic Structure: Bohr model, quantum numbers, electronic configuration, orbitals',
          'Chemical Bonding: VSEPR, VBT, MOT, hybridization, hydrogen bonding',
          'Thermodynamics: Enthalpy, entropy, Gibbs energy, spontaneity',
          'Solutions: Raoult\'s law, colligative properties, Van\'t Hoff factor',
          'Equilibrium: Law of mass action, Le Chatelier, ionic equilibrium, pH, buffers',
          'Redox Reactions & Electrochemistry: Oxidation numbers, electrochemical cells, Nernst equation',
          'Chemical Kinetics: Rate law, order, molecularity, Arrhenius equation, activation energy'
        ],
        removedTopics: [
          'States of Matter (Gases/Liquids) - removed',
          'Solid State - removed',
          'Surface Chemistry - removed'
        ]
      },
      {
        title: { en: 'Inorganic Chemistry', ta: 'கனிம வேதியியல்' },
        topics: [
          'Classification of Elements: Periodic table, periodic trends',
          'p-Block Elements: Group 13 to 18 - properties, compounds, applications',
          'd- and f-Block Elements: Transition metals, lanthanoids, actinoids, K₂Cr₂O₇, KMnO₄',
          'Coordination Compounds: Werner\'s theory, IUPAC nomenclature, VBT, CFT, isomerism'
        ],
        removedTopics: [
          's-Block Elements - removed',
          'Hydrogen - removed',
          'Metallurgy - removed',
          'Environmental Chemistry - removed'
        ]
      },
      {
        title: { en: 'Organic Chemistry', ta: 'கரிம வேதியியல்' },
        topics: [
          'Purification & Characterization: Crystallization, distillation, chromatography',
          'Basic Principles (GOC): IUPAC nomenclature, isomerism, electronic effects',
          'Hydrocarbons: Alkanes, alkenes, alkynes, benzene, aromatic reactions',
          'Haloalkanes & Haloarenes: SN1, SN2, elimination reactions',
          'Alcohols, Phenols, Ethers: Preparation, reactions, acidity comparison',
          'Aldehydes, Ketones, Carboxylic Acids: Preparation, reactions, tests',
          'Amines: Classification, preparation, reactions, diazonium salts',
          'Biomolecules: Carbohydrates, proteins, amino acids, nucleic acids'
        ],
        removedTopics: [
          'Polymers - removed',
          'Chemistry in Everyday Life - removed'
        ]
      }
    ]
  }
];

export const JEEMainSyllabus: React.FC<JEEMainSyllabusProps> = ({ language }) => {
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  return (
    <div className="mt-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg shadow">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">
            {language === 'en' ? 'JEE Main 2026 Syllabus' : 'JEE Main 2026 பாடத்திட்டம்'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {language === 'en' ? 'Revised syllabus based on NTA guidelines' : 'NTA வழிகாட்டுதல்களின் அடிப்படையில் திருத்தப்பட்ட பாடத்திட்டம்'}
          </p>
        </div>
        <Badge className="ml-auto bg-indigo-100 text-indigo-700 border-indigo-200">
          {language === 'en' ? 'Revised 2026' : 'திருத்தம் 2026'}
        </Badge>
      </div>

      {/* Important Notice */}
      <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-800 text-sm">
              {language === 'en' ? 'Important Update for 2026' : '2026க்கான முக்கிய புதுப்பிப்பு'}
            </h4>
            <p className="text-sm text-amber-700 mt-1">
              {language === 'en' 
                ? 'JEE Main follows the reduced syllabus introduced in 2024. Several chapters (especially in Chemistry) have been removed. Removed topics are marked in each section.'
                : 'JEE Main 2024ல் அறிமுகப்படுத்தப்பட்ட குறைக்கப்பட்ட பாடத்திட்டத்தைப் பின்பற்றுகிறது. பல அத்தியாயங்கள் (குறிப்பாக வேதியியலில்) நீக்கப்பட்டுள்ளன.'}
            </p>
          </div>
        </div>
      </div>

      {/* Subject Cards */}
      <div className="space-y-4">
        {syllabusData.map((subject) => (
          <Card 
            key={subject.name.en} 
            className={`border ${subject.borderColor} shadow-sm hover:shadow-md transition-shadow overflow-hidden`}
          >
            <Collapsible
              open={expandedSubject === subject.name.en}
              onOpenChange={(open) => setExpandedSubject(open ? subject.name.en : null)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className={`${subject.bgColor} cursor-pointer hover:opacity-90 transition-opacity py-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 bg-white rounded-xl shadow-sm ${subject.color}`}>
                        {subject.icon}
                      </div>
                      <div>
                        <CardTitle className={`text-lg font-semibold ${subject.color}`}>
                          {language === 'en' ? subject.name.en : subject.name.ta}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {subject.sections.length} {language === 'en' ? 'sections' : 'பிரிவுகள்'} • {subject.sections.reduce((acc, s) => acc + s.topics.length, 0)} {language === 'en' ? 'topics' : 'தலைப்புகள்'}
                        </p>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 ${subject.color} transition-transform duration-200 ${expandedSubject === subject.name.en ? 'rotate-180' : ''}`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-4 pb-6">
                  <div className="space-y-6">
                    {subject.sections.map((section, sectionIdx) => (
                      <div key={sectionIdx}>
                        <h4 className={`font-semibold ${subject.color} mb-3 flex items-center gap-2`}>
                          <BookOpen className="w-4 h-4" />
                          {language === 'en' ? section.title.en : section.title.ta}
                        </h4>
                        <ul className="space-y-2 ml-6">
                          {section.topics.map((topic, topicIdx) => (
                            <li 
                              key={topicIdx} 
                              className="text-sm text-gray-700 leading-relaxed flex items-start gap-2"
                            >
                              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${subject.color.replace('text-', 'bg-')} flex-shrink-0`} />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {/* Removed Topics */}
                        {section.removedTopics && section.removedTopics.length > 0 && (
                          <div className="mt-3 ml-6 p-3 bg-red-50 border border-red-100 rounded-lg">
                            <p className="text-xs font-medium text-red-600 mb-2 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              {language === 'en' ? 'Removed from Syllabus:' : 'பாடத்திட்டத்திலிருந்து நீக்கப்பட்டது:'}
                            </p>
                            <ul className="space-y-1">
                              {section.removedTopics.map((topic, idx) => (
                                <li key={idx} className="text-xs text-red-500 line-through flex items-start gap-2">
                                  <span className="mt-1 w-1 h-1 rounded-full bg-red-300 flex-shrink-0" />
                                  {topic}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      {/* JEE Advanced Comparison Note */}
      <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg">
        <h4 className="font-semibold text-indigo-800 text-sm mb-2">
          {language === 'en' ? 'JEE Main vs JEE Advanced' : 'JEE Main vs JEE Advanced'}
        </h4>
        <ul className="text-sm text-indigo-700 space-y-1">
          <li>• {language === 'en' ? 'JEE Advanced retains s-Block elements and deeper inorganic concepts' : 'JEE Advanced s-Block உறுப்புகள் மற்றும் ஆழமான கனிம கருத்துக்களை தக்கவைக்கிறது'}</li>
          <li>• {language === 'en' ? 'JEE Advanced excludes Statistics but focuses deeper on Calculus/Algebra' : 'JEE Advanced புள்ளியியலை விலக்குகிறது ஆனால் கால்குலஸ்/இயற்கணிதத்தில் ஆழமாக கவனம் செலுத்துகிறது'}</li>
          <li>• {language === 'en' ? 'JEE Advanced focuses on multi-concept problems requiring deeper understanding' : 'JEE Advanced ஆழமான புரிதல் தேவைப்படும் பல-கருத்து சிக்கல்களில் கவனம் செலுத்துகிறது'}</li>
        </ul>
      </div>
    </div>
  );
};

export default JEEMainSyllabus;
