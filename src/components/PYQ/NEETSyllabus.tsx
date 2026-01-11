import React, { useState } from 'react';
import { ChevronDown, BookOpen, Atom, FlaskConical, Leaf, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface NEETSyllabusProps {
  language: 'en' | 'ta';
}

interface SyllabusSection {
  title: { en: string; ta: string };
  topics: string[];
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
        title: { en: 'Class 11 Topics', ta: '11ஆம் வகுப்பு தலைப்புகள்' },
        topics: [
          'Physical World and Measurement: Units, dimensions, errors in measurement',
          'Kinematics: Motion in a straight line, Motion in a plane (Projectiles, Uniform circular motion)',
          'Laws of Motion: Newton\'s laws, friction, circular motion dynamics',
          'Work, Energy, and Power: Work-energy theorem, collisions, potential energy',
          'Motion of System of Particles and Rigid Body: Centre of mass, torque, angular momentum, moment of inertia',
          'Gravitation: Kepler\'s laws, universal law of gravitation, escape velocity, satellites',
          'Properties of Bulk Matter: Elasticity (Stress-strain), Fluid dynamics (Bernoulli\'s, Viscosity), Surface tension, Thermal properties (Calorimetry, Heat transfer)',
          'Thermodynamics: Laws of thermodynamics, heat engines, refrigerators',
          'Behaviour of Perfect Gas and Kinetic Theory: Gas laws, kinetic theory assumptions, RMS speed, degrees of freedom',
          'Oscillations and Waves: SHM, dampening, wave motion, Doppler effect'
        ]
      },
      {
        title: { en: 'Class 12 Topics', ta: '12ஆம் வகுப்பு தலைப்புகள்' },
        topics: [
          'Electrostatics: Charges, fields, flux (Gauss\'s law), potential, capacitance',
          'Current Electricity: Ohm\'s law, drift velocity, Kirchhoff\'s laws, Wheatstone bridge',
          'Magnetic Effects of Current and Magnetism: Biot-Savart law, Ampere\'s law, moving coil galvanometer, Earth\'s magnetism',
          'Electromagnetic Induction and Alternating Currents: Faraday\'s law, Lenz\'s law, LCR circuits, resonance, transformers',
          'Electromagnetic Waves: Spectrum and properties',
          'Optics: Ray optics (mirrors, lenses, prisms, optical instruments) and Wave optics (interference, diffraction, polarization)',
          'Dual Nature of Matter and Radiation: Photoelectric effect, de Broglie relations',
          'Atoms and Nuclei: Bohr model, radioactivity, mass-energy relation (fission/fusion)',
          'Electronic Devices: Semiconductors, I-V characteristics, Logic gates',
          'Experimental Skills: Familiarity with basic experiments (Vernier calipers, Screw gauge, Pendulum, Meter scale, etc.)'
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
          'Some Basic Concepts of Chemistry: Mole concept, stoichiometry',
          'Atomic Structure: Bohr model, Quantum mechanical model, electronic configuration',
          'Chemical Bonding and Molecular Structure: VSEPR, VB theory, MO theory, Hydrogen bonding',
          'Chemical Thermodynamics: First and second laws, Enthalpy, Entropy, Gibbs energy',
          'Solutions: Raoult\'s law, Colligative properties, Van\'t Hoff factor',
          'Equilibrium: Ionic and Chemical equilibrium, pH, Buffer solutions, Ksp',
          'Redox Reactions and Electrochemistry: Oxidation numbers, Nernst equation, Conductance, Cells',
          'Chemical Kinetics: Rate laws, Order/Molecularity, Arrhenius equation'
        ]
      },
      {
        title: { en: 'Inorganic Chemistry', ta: 'கனிம வேதியியல்' },
        topics: [
          'Classification of Elements and Periodicity: Trends in properties',
          'p-Block Elements: Trends in Group 13 to 18 (General introduction)',
          'd- and f-Block Elements: Trends, Lanthanoids, Actinoids, K₂Cr₂O₇, KMnO₄',
          'Coordination Compounds: IUPAC nomenclature, Bonding (VBT, CFT), Isomerism'
        ]
      },
      {
        title: { en: 'Organic Chemistry', ta: 'கரிம வேதியியல்' },
        topics: [
          'Purification and Characterization of Organic Compounds: Crystallization, distillation, chromatography',
          'Some Basic Principles of Organic Chemistry: IUPAC, Electronic displacements (Inductive, Resonance, Hyperconjugation), Isomerism',
          'Hydrocarbons: Alkanes, Alkenes, Alkynes, Aromatic hydrocarbons (Benzene)',
          'Organic Compounds Containing Halogens: Haloalkanes and Haloarenes (SN1/SN2)',
          'Organic Compounds Containing Oxygen: Alcohols, Phenols, Ethers, Aldehydes, Ketones, Carboxylic Acids',
          'Organic Compounds Containing Nitrogen: Amines, Diazonium salts',
          'Biomolecules: Carbohydrates, Proteins, Vitamins, Nucleic Acids',
          'Principles Related to Practical Chemistry: Detection of functional groups'
        ]
      }
    ]
  },
  {
    name: { en: 'Biology', ta: 'உயிரியல்' },
    icon: <Leaf className="w-5 h-5" />,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    sections: [
      {
        title: { en: 'Botany', ta: 'தாவரவியல்' },
        topics: [
          'Diversity in Living World: Classification systems (Monera, Protista, Fungi, Plantae, Animalia)',
          'Structural Organisation in Plants: Morphology and Anatomy of flowering plants (Root, Stem, Leaf, Flower, Fruit, Seed). Focus on families Malvaceae, Cruciferae, Leguminosae, Compositae, Gramineae',
          'Cell: Structure and Function: Cell theory, Organelles, Cell cycle (Mitosis/Meiosis)',
          'Plant Physiology: Photosynthesis (C3/C4), Respiration (Glycolysis/Krebs), Plant Growth and Development (Hormones)'
        ]
      },
      {
        title: { en: 'Zoology', ta: 'விலங்கியல்' },
        topics: [
          'Structural Organisation in Animals: Animal tissues. Morphology/Anatomy of Frog',
          'Human Physiology: Breathing and Exchange of Gases, Body Fluids and Circulation, Excretory Products and Elimination, Locomotion and Movement, Neural Control and Coordination, Chemical Coordination and Integration',
          'Reproduction: Sexual reproduction in Flowering Plants, Human Reproduction, Reproductive Health',
          'Genetics and Evolution: Mendelian genetics, Chromosomal theory, Molecular basis of inheritance (DNA/RNA), Evolution (Darwinism, Modern synthesis)',
          'Biology and Human Welfare: Human Health and Disease (Pathogens, Immunity, Cancer, AIDS), Microbes in Human Welfare',
          'Biotechnology: Principles and Processes (rDNA technology), Applications (Insulin, Gene therapy)',
          'Ecology and Environment: Organisms and Populations, Ecosystem, Biodiversity and Conservation'
        ]
      }
    ]
  }
];

export const NEETSyllabus: React.FC<NEETSyllabusProps> = ({ language }) => {
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  return (
    <div className="mt-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">
            {language === 'en' ? 'NEET UG 2026 Syllabus' : 'NEET UG 2026 பாடத்திட்டம்'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {language === 'en' ? 'Complete subject-wise syllabus for NEET preparation' : 'NEET தயாரிப்புக்கான முழுமையான பாடத்திட்டம்'}
          </p>
        </div>
        <Badge className="ml-auto bg-emerald-100 text-emerald-700 border-emerald-200">
          {language === 'en' ? 'Updated 2026' : 'புதுப்பிக்கப்பட்டது 2026'}
        </Badge>
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
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NEETSyllabus;
