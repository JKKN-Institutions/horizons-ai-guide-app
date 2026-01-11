import React, { useState } from 'react';
import { ChevronDown, BookOpen, Atom, FlaskConical, Calculator, GraduationCap, Sparkles, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface JEEAdvancedSyllabusProps {
  language: 'en' | 'ta';
}

interface SyllabusSection {
  title: { en: string; ta: string };
  topics: string[];
  additionalTopics?: string[]; // Topics beyond JEE Main
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
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    sections: [
      {
        title: { en: 'General Physics', ta: 'பொது இயற்பியல்' },
        topics: [
          'Units and Dimensions: Dimensional analysis, least count, significant figures',
          'Experimental Methods: Vernier callipers, screw gauge, simple pendulum, Young\'s modulus',
          'Error Analysis: Systematic and random errors, propagation of errors'
        ]
      },
      {
        title: { en: 'Mechanics', ta: 'இயக்கவியல்' },
        topics: [
          'Kinematics: Frame of reference, relative motion in 2D, projectile motion with air resistance',
          'Newton\'s Laws: Friction (static/kinetic), variable mass systems, pseudo forces in non-inertial frames',
          'Circular Motion: Centripetal acceleration, conical pendulum, banking of roads',
          'Work & Energy: Conservative forces, potential energy diagrams, elastic/inelastic collisions',
          'Centre of Mass: Momentum conservation, rocket propulsion, variable mass problems',
          'Rotational Mechanics: Moment of inertia (parallel/perpendicular axes), rolling with slipping, angular momentum conservation'
        ],
        additionalTopics: [
          'Advanced rotational problems with combined translation and rotation',
          'Collision problems involving rotation',
          'Variable mass systems (rockets, chain problems)'
        ]
      },
      {
        title: { en: 'Gravitation', ta: 'ஈர்ப்பு விசை' },
        topics: [
          'Newton\'s Law of Gravitation: Field, potential, superposition principle',
          'Motion of Planets: Kepler\'s laws, satellite motion, escape velocity, geostationary orbits',
          'Gravitational Potential Energy: Self-energy of sphere, binding energy'
        ]
      },
      {
        title: { en: 'Thermal Physics', ta: 'வெப்ப இயற்பியல்' },
        topics: [
          'Thermal Expansion: Linear, area, volume expansion, thermal stress',
          'Calorimetry: Specific heat, latent heat, phase transitions',
          'Heat Transfer: Conduction (series/parallel), convection, radiation (Stefan-Boltzmann, Wien\'s law)',
          'Kinetic Theory: Maxwell velocity distribution, equipartition theorem, mean free path',
          'Thermodynamics: First law, isothermal/adiabatic processes, Carnot cycle, entropy'
        ],
        additionalTopics: [
          'Newton\'s Law of Cooling (detailed applications)',
          'Blackbody radiation characteristics',
          'Heat engines and refrigerators (efficiency calculations)'
        ]
      },
      {
        title: { en: 'Oscillations & Waves', ta: 'அலைவுகள் & அலைகள்' },
        topics: [
          'SHM: Equations of motion, energy, phase, composition of SHMs',
          'Damped & Forced Oscillations: Resonance phenomenon',
          'Wave Motion: Superposition, standing waves, harmonics, beats',
          'Sound Waves: Doppler effect, resonance in pipes and strings'
        ]
      },
      {
        title: { en: 'Electromagnetism', ta: 'மின்காந்தவியல்' },
        topics: [
          'Electrostatics: Coulomb\'s law, Gauss\'s law applications, multipoles, conductors',
          'Capacitors: Parallel plate, spherical, cylindrical; dielectrics, energy stored',
          'Current Electricity: Ohm\'s law, Kirchhoff\'s laws, RC circuits, electrical instruments',
          'Magnetic Field: Biot-Savart law, Ampere\'s law, Lorentz force, magnetic dipole',
          'Electromagnetic Induction: Faraday\'s law, Lenz\'s law, self/mutual inductance, LR/LC/LCR circuits',
          'AC Circuits: Impedance, resonance, power factor, transformers'
        ],
        additionalTopics: [
          'Electric field in conductors and cavities',
          'Magnetic field of complex current distributions',
          'Motional EMF in rotating systems'
        ]
      },
      {
        title: { en: 'Optics', ta: 'ஒளியியல்' },
        topics: [
          'Ray Optics: Reflection, refraction (Snell\'s law), TIR, prism, lenses, optical instruments',
          'Wave Optics: Huygens\' principle, interference (Young\'s, thin films), diffraction (single slit), polarization',
          'Optical Instruments: Microscope, telescope magnification and resolution'
        ]
      },
      {
        title: { en: 'Modern Physics', ta: 'நவீன இயற்பியல்' },
        topics: [
          'Photoelectric Effect: Einstein\'s equation, stopping potential, threshold frequency',
          'Atomic Structure: Bohr model, hydrogen spectrum, X-rays (Moseley\'s law)',
          'Nuclear Physics: Mass-energy equivalence, binding energy, fission/fusion, radioactive decay',
          'De Broglie Hypothesis: Matter waves, Davisson-Germer experiment'
        ],
        additionalTopics: [
          'Characteristic and continuous X-ray spectra',
          'Nuclear binding energy curve analysis',
          'Decay chains and equilibrium'
        ]
      }
    ]
  },
  {
    name: { en: 'Mathematics', ta: 'கணிதம்' },
    icon: <Calculator className="w-5 h-5" />,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    sections: [
      {
        title: { en: 'Algebra', ta: 'இயற்கணிதம்' },
        topics: [
          'Quadratic Equations: Roots, discriminant, symmetric functions of roots',
          'Complex Numbers: Algebra, Argand plane, De Moivre\'s theorem, nth roots of unity',
          'Permutations & Combinations: Counting principles, multinomial theorem',
          'Binomial Theorem: General term, properties, approximations',
          'Matrices & Determinants: Properties, inverse, system of equations, rank',
          'Progressions: AP, GP, HP, AGP, summation of series'
        ],
        additionalTopics: [
          'Advanced applications of complex numbers (geometry)',
          'Functional equations involving determinants',
          'Summation using difference method'
        ]
      },
      {
        title: { en: 'Trigonometry', ta: 'முக்கோணவியல்' },
        topics: [
          'Trigonometric Functions: Identities, graphs, periodicity',
          'Trigonometric Equations: General solutions, principal values',
          'Inverse Trigonometric Functions: Properties, compositions',
          'Heights and Distances: Applications in 2D and 3D'
        ],
        additionalTopics: [
          'Properties of triangles (sine rule, cosine rule, circumradius, inradius)',
          'Advanced trigonometric identities'
        ]
      },
      {
        title: { en: 'Calculus', ta: 'கால்குலஸ்' },
        topics: [
          'Functions: Domain, range, composition, types of functions',
          'Limits & Continuity: Standard limits, L\'Hopital\'s rule, intermediate value theorem',
          'Differentiability: Chain rule, implicit differentiation, higher-order derivatives',
          'Applications of Derivatives: Tangent/normal, maxima/minima, monotonicity, curve sketching, Rolle\'s/LMVT',
          'Indefinite Integration: Standard forms, substitution, partial fractions, integration by parts',
          'Definite Integration: Properties, Leibniz rule, reduction formulas',
          'Area Under Curves: Area between curves, standard curves',
          'Differential Equations: First order (variable separable, linear, exact), applications'
        ],
        additionalTopics: [
          'Advanced applications of LMVT and Rolle\'s theorem',
          'Integration using reduction formulas',
          'Differential equations with applications to physics'
        ]
      },
      {
        title: { en: 'Coordinate Geometry', ta: 'ஆய முக்கோண கணிதம்' },
        topics: [
          'Straight Lines: Various forms, angle bisectors, family of lines, concurrency',
          'Circles: Equations, tangents, chord of contact, radical axis, family of circles',
          'Conic Sections: Parabola, ellipse, hyperbola - standard forms, tangent, normal, focal chord'
        ],
        additionalTopics: [
          'Locus problems involving conics',
          'Pole and polar concepts',
          'Intersection of conics'
        ]
      },
      {
        title: { en: 'Vectors & 3D Geometry', ta: 'வெக்டர்கள் & 3D வடிவியல்' },
        topics: [
          'Vector Algebra: Dot and cross products, triple products, vector equations',
          '3D Geometry: Direction cosines/ratios, equations of lines and planes',
          'Shortest Distance: Between two lines, point to line/plane'
        ],
        additionalTopics: [
          'Vector methods in proving geometric theorems',
          'Skew lines and coplanarity conditions'
        ]
      },
      {
        title: { en: 'Probability', ta: 'நிகழ்தகவு' },
        topics: [
          'Basic Probability: Conditional probability, Bayes\' theorem',
          'Random Variables: Discrete distributions, binomial distribution',
          'Expected Value: Mean, variance for discrete random variables'
        ]
      }
    ]
  },
  {
    name: { en: 'Chemistry', ta: 'வேதியியல்' },
    icon: <FlaskConical className="w-5 h-5" />,
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
    sections: [
      {
        title: { en: 'Physical Chemistry', ta: 'இயற்பியல் வேதியியல்' },
        topics: [
          'Atomic Structure: Quantum numbers, orbitals, electronic configuration, periodic trends',
          'Chemical Bonding: Lewis structures, VSEPR, MOT, hybridization, bond parameters',
          'Gaseous State: Ideal gas, kinetic theory, real gases, van der Waals equation',
          'Thermodynamics: Laws, enthalpy, entropy, Gibbs energy, spontaneity',
          'Chemical Equilibrium: Law of mass action, Le Chatelier\'s principle, equilibrium constants',
          'Ionic Equilibrium: Acids/bases, pH, buffers, solubility product, common ion effect',
          'Electrochemistry: Electrochemical cells, Nernst equation, conductance, electrolysis',
          'Chemical Kinetics: Rate laws, order, molecularity, Arrhenius equation, mechanisms'
        ],
        additionalTopics: [
          's-Block Elements: Group 1 and 2 properties, compounds, reactions',
          'Solid State: Crystal systems, packing efficiency, defects',
          'Surface Chemistry: Adsorption, catalysis, colloids'
        ]
      },
      {
        title: { en: 'Inorganic Chemistry', ta: 'கனிம வேதியியல்' },
        topics: [
          'Periodic Table: Electronic configuration trends, atomic/ionic radii, electronegativity',
          'p-Block Elements: Group 13-18 properties, compounds, reactions, allotropy',
          'd-Block Elements: Electronic configuration, oxidation states, color, magnetic properties',
          'f-Block Elements: Lanthanoid and actinoid contraction, comparison',
          'Coordination Chemistry: Werner\'s theory, nomenclature, isomerism, VBT, CFT, stability'
        ],
        additionalTopics: [
          'Hydrogen: Position, isotopes, hydrides, water chemistry',
          'Metallurgy: Extraction principles, thermodynamics of metallurgy',
          'Qualitative Analysis: Identification of cations and anions'
        ]
      },
      {
        title: { en: 'Organic Chemistry', ta: 'கரிம வேதியியல்' },
        topics: [
          'Basic Concepts: Hybridization, resonance, hyperconjugation, inductive effect',
          'Stereochemistry: Conformations, optical isomerism, R/S configuration, E/Z isomerism',
          'Reaction Mechanisms: SN1, SN2, E1, E2, addition, substitution, elimination',
          'Hydrocarbons: Alkanes, alkenes, alkynes, arenes, reactions and preparations',
          'Halogen Compounds: Haloalkanes, haloarenes, reactions, Grignard reagents',
          'Oxygen Compounds: Alcohols, phenols, ethers, aldehydes, ketones, carboxylic acids',
          'Nitrogen Compounds: Amines, diazonium salts, cyanides, isocyanides',
          'Biomolecules: Carbohydrates, amino acids, proteins, nucleic acids'
        ],
        additionalTopics: [
          'Named Reactions: Aldol, Cannizzaro, Claisen, Reformatsky, etc.',
          'Reaction Mechanism Analysis: Multi-step synthesis',
          'Polymers: Types, polymerization mechanisms',
          'Practical Organic Chemistry: Detection of elements and functional groups'
        ]
      }
    ]
  }
];

export const JEEAdvancedSyllabus: React.FC<JEEAdvancedSyllabusProps> = ({ language }) => {
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  return (
    <div className="mt-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg shadow">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">
            {language === 'en' ? 'JEE Advanced 2026 Syllabus' : 'JEE Advanced 2026 பாடத்திட்டம்'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {language === 'en' ? 'Broader syllabus with deeper conceptual focus' : 'ஆழமான கருத்தியல் கவனத்துடன் பரந்த பாடத்திட்டம்'}
          </p>
        </div>
        <Badge className="ml-auto bg-rose-100 text-rose-700 border-rose-200">
          {language === 'en' ? 'IIT Conducted' : 'IIT நடத்துகிறது'}
        </Badge>
      </div>

      {/* Key Differences Notice */}
      <div className="mb-6 p-4 bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-lg">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-rose-800 text-sm">
              {language === 'en' ? 'Beyond JEE Main' : 'JEE Main-ஐ தாண்டி'}
            </h4>
            <p className="text-sm text-rose-700 mt-1">
              {language === 'en' 
                ? 'JEE Advanced retains topics removed from Main (s-Block, Solid State, Surface Chemistry) and focuses on multi-concept problems requiring deeper understanding. Topics marked with ✦ are additional beyond JEE Main.'
                : 'JEE Advanced, Main-இலிருந்து நீக்கப்பட்ட தலைப்புகளை தக்கவைக்கிறது (s-Block, திட நிலை, மேற்பரப்பு வேதியியல்) மற்றும் ஆழமான புரிதல் தேவைப்படும் பல-கருத்து சிக்கல்களில் கவனம் செலுத்துகிறது.'}
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
                          {subject.sections.length} {language === 'en' ? 'sections' : 'பிரிவுகள்'} • {subject.sections.reduce((acc, s) => acc + s.topics.length + (s.additionalTopics?.length || 0), 0)} {language === 'en' ? 'topics' : 'தலைப்புகள்'}
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
                        
                        {/* Additional Topics Beyond JEE Main */}
                        {section.additionalTopics && section.additionalTopics.length > 0 && (
                          <div className="mt-3 ml-6 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
                            <p className="text-xs font-medium text-emerald-700 mb-2 flex items-center gap-1">
                              <Plus className="w-3 h-3" />
                              {language === 'en' ? 'Additional Topics (Beyond JEE Main):' : 'கூடுதல் தலைப்புகள் (JEE Main-ஐ தாண்டி):'}
                            </p>
                            <ul className="space-y-1.5">
                              {section.additionalTopics.map((topic, idx) => (
                                <li key={idx} className="text-xs text-emerald-700 flex items-start gap-2">
                                  <Sparkles className="w-3 h-3 mt-0.5 text-emerald-500 flex-shrink-0" />
                                  <span>{topic}</span>
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

      {/* Exam Pattern Note */}
      <div className="mt-6 p-4 bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-lg">
        <h4 className="font-semibold text-violet-800 text-sm mb-2">
          {language === 'en' ? 'JEE Advanced Exam Pattern' : 'JEE Advanced தேர்வு முறை'}
        </h4>
        <ul className="text-sm text-violet-700 space-y-1">
          <li>• {language === 'en' ? 'Two papers (Paper 1 & Paper 2), each 3 hours duration' : 'இரண்டு தாள்கள் (Paper 1 & Paper 2), ஒவ்வொன்றும் 3 மணி நேரம்'}</li>
          <li>• {language === 'en' ? 'Multiple choice, numerical answer, and matching type questions' : 'பல தேர்வு, எண் பதில், மற்றும் பொருத்துதல் வகை கேள்விகள்'}</li>
          <li>• {language === 'en' ? 'Negative marking applies for incorrect answers' : 'தவறான பதில்களுக்கு எதிர்மறை மதிப்பெண் பொருந்தும்'}</li>
          <li>• {language === 'en' ? 'Emphasizes conceptual understanding over rote memorization' : 'மனப்பாடத்தை விட கருத்தியல் புரிதலை வலியுறுத்துகிறது'}</li>
        </ul>
      </div>
    </div>
  );
};

export default JEEAdvancedSyllabus;
