// PYQ Questions Database
// Key format: "examId::subject::topicName"

export interface PYQQuestion {
  id: number;
  year: number;
  exam: string;
  question: string;
  options: string[];
  answer: number; // 0-indexed
  topic: string;
}

export const pyqQuestions: Record<string, PYQQuestion[]> = {

  // ===== JEE MAIN — PHYSICS — Units & Measurements =====
  "jee-main::Physics::Units & Measurements": [
    {
      id: 1, year: 2019, exam: "JEE Main 2019",
      question: "The number of significant figures in 0.005060 is:",
      options: ["3", "4", "5", "6"],
      answer: 1,
      topic: "Units & Measurements",
    },
    {
      id: 2, year: 2020, exam: "JEE Main 2020",
      question: "If percentage errors in mass and velocity are 2% and 3% respectively, then the maximum percentage error in kinetic energy ½mv² is:",
      options: ["5%", "7%", "8%", "10%"],
      answer: 2,
      topic: "Units & Measurements",
    },
    {
      id: 3, year: 2018, exam: "JEE Main 2018",
      question: "The dimensional formula of Planck's constant (h) is:",
      options: ["[ML²T⁻¹]", "[ML²T⁻²]", "[M⁰L²T⁻¹]", "[MLT⁻¹]"],
      answer: 0,
      topic: "Units & Measurements",
    },
    {
      id: 4, year: 2021, exam: "JEE Main 2021",
      question: "A Vernier caliper has 10 vernier divisions equal to 9 main scale divisions. If 1 MSD = 1 mm, the least count is:",
      options: ["0.1 mm", "0.01 mm", "0.9 mm", "0.09 mm"],
      answer: 0,
      topic: "Units & Measurements",
    },
    {
      id: 5, year: 2017, exam: "JEE Main 2017",
      question: "If a physical quantity is measured as (5.0 ± 0.2) m, the percentage error is:",
      options: ["2%", "4%", "5%", "10%"],
      answer: 1,
      topic: "Units & Measurements",
    },
    {
      id: 6, year: 2022, exam: "JEE Main 2022",
      question: "The dimensional formula of force is:",
      options: ["[MLT⁻¹]", "[ML²T⁻²]", "[MLT⁻²]", "[M⁰LT⁻²]"],
      answer: 2,
      topic: "Units & Measurements",
    },
    {
      id: 7, year: 2016, exam: "JEE Main 2016",
      question: "Which of the following is a dimensionless quantity?",
      options: ["Strain", "Stress", "Momentum", "Energy"],
      answer: 0,
      topic: "Units & Measurements",
    },
    {
      id: 8, year: 2020, exam: "JEE Main 2020",
      question: "The number of significant figures in 2.300 × 10³ is:",
      options: ["2", "3", "4", "5"],
      answer: 2,
      topic: "Units & Measurements",
    },
    {
      id: 9, year: 2015, exam: "JEE Main 2015",
      question: "Which of the following equations is dimensionally correct?",
      options: ["v = u + at²", "s = ut + ½at²", "F = ma²", "E = mv"],
      answer: 1,
      topic: "Units & Measurements",
    },
    {
      id: 10, year: 2021, exam: "JEE Main 2021",
      question: "If Y = a²b/c³, then percentage error in Y is: (Given percentage errors in a, b, c are Δa, Δb, Δc)",
      options: ["2Δa + Δb + 3Δc", "2Δa + Δb − 3Δc", "2Δa + Δb + Δc", "Δa + Δb + 3Δc"],
      answer: 0,
      topic: "Units & Measurements",
    },
    {
      id: 11, year: 2019, exam: "JEE Main 2019",
      question: "The SI unit of pressure is:",
      options: ["N/m", "N·m", "N/m²", "kg/m"],
      answer: 2,
      topic: "Units & Measurements",
    },
    {
      id: 12, year: 2018, exam: "JEE Main 2018",
      question: "The dimensional formula of angular momentum is:",
      options: ["[MLT⁻¹]", "[ML²T⁻¹]", "[ML²T⁻²]", "[M⁰L²T⁻¹]"],
      answer: 1,
      topic: "Units & Measurements",
    },
    {
      id: 13, year: 2022, exam: "JEE Main 2022",
      question: "The number of significant figures in 0.0200 is:",
      options: ["2", "3", "4", "5"],
      answer: 1,
      topic: "Units & Measurements",
    },
    {
      id: 14, year: 2017, exam: "JEE Main 2017",
      question: "If length, breadth and height have percentage errors 1%, 2% and 3% respectively, the maximum percentage error in volume is:",
      options: ["6%", "5%", "3%", "1%"],
      answer: 0,
      topic: "Units & Measurements",
    },
    {
      id: 15, year: 2020, exam: "JEE Main 2020",
      question: "Which of the following has dimensions of energy?",
      options: ["F × v", "F × d", "P × t⁻¹", "mv"],
      answer: 1,
      topic: "Units & Measurements",
    },
  ],

  // ===== NEET — PHYSICS — Physics and Measurement =====
  "neet::Physics::Physics and Measurement": [
    {
      id: 101, year: 2022, exam: "NEET 2022",
      question: "The dimensions [MLT⁻²A⁻²] belong to the:",
      options: ["Magnetic permeability", "Electric permittivity", "Magnetic flux", "Self-inductance"],
      answer: 0,
      topic: "Physics and Measurement",
    },
    {
      id: 102, year: 2020, exam: "NEET 2020",
      question: "Taking into account the significant figures, what is the value of 9.99 m − 0.0099 m?",
      options: ["9.98 m", "9.9 m", "9.980 m", "9.9801 m"],
      answer: 0,
      topic: "Physics and Measurement",
    },
    {
      id: 103, year: 2019, exam: "NEET 2019",
      question: "In an experiment, the percentage of error occurred in the measurement of physical quantities A, B, C, and D are 1%, 2%, 3%, and 4% respectively. Then the maximum percentage of error in the measurement X, where X = A²B^(1/2) / C^(1/3)D³, will be:",
      options: ["10%", "(3/13)%", "16%", "12%"],
      answer: 2,
      topic: "Physics and Measurement",
    },
    {
      id: 104, year: 2021, exam: "NEET 2021",
      question: "A screw gauge gives the following readings when used to measure the diameter of a wire: Main scale reading: 0 mm, Circular scale reading: 52 divisions. Given that 1 mm on main scale corresponds to 100 divisions on the circular scale. The diameter of the wire is:",
      options: ["0.52 cm", "0.052 cm", "0.26 cm", "0.026 cm"],
      answer: 1,
      topic: "Physics and Measurement",
    },
    {
      id: 105, year: 2023, exam: "NEET 2023",
      question: "If force (F), acceleration (A), and time (T) are chosen as the fundamental physical quantities, find the dimensions of energy.",
      options: ["[F][A][T]", "[F][A][T²]", "[F][A⁻¹][T]", "[F][A][T⁻¹]"],
      answer: 1,
      topic: "Physics and Measurement",
    },
    {
      id: 106, year: 2016, exam: "NEET 2016",
      question: "The unit of Stefan-Boltzmann constant is:",
      options: ["W m² K⁴", "W m⁻² K⁻⁴", "W m² K⁻⁴", "W m⁻² K⁴"],
      answer: 1,
      topic: "Physics and Measurement",
    },
    {
      id: 107, year: 2020, exam: "NEET 2020",
      question: "The dimensions of stress are:",
      options: ["[MLT⁻²]", "[ML²T⁻²]", "[ML⁻¹T⁻²]", "[ML⁰T⁻²]"],
      answer: 2,
      topic: "Physics and Measurement",
    },
    {
      id: 108, year: 2018, exam: "NEET 2018",
      question: "A student measured the diameter of a small steel ball using a screw gauge of least count 0.001 cm. The main scale reading is 5 mm and zero of circular scale division coincides with 25 divisions above the reference level. If screw gauge has a zero error of −0.004 cm, the correct diameter of the ball is:",
      options: ["0.521 cm", "0.525 cm", "0.053 cm", "0.529 cm"],
      answer: 3,
      topic: "Physics and Measurement",
    },
    {
      id: 109, year: 2013, exam: "NEET 2013",
      question: "The dimensional formula of Planck's constant (h) is:",
      options: ["[ML²T⁻²]", "[ML²T⁻¹]", "[MLT⁻¹]", "[ML²T⁻³]"],
      answer: 1,
      topic: "Physics and Measurement",
    },
    {
      id: 110, year: 2013, exam: "NEET 2013",
      question: "In an experiment, four quantities a, b, c and d are measured with percentage error 1%, 2%, 3% and 4% respectively. Quantity P is calculated as P = a³b²/(cd). Percentage error in P is:",
      options: ["14%", "10%", "7%", "4%"],
      answer: 0,
      topic: "Physics and Measurement",
    },
    {
      id: 111, year: 2015, exam: "NEET 2015",
      question: "The dimensional formula for surface tension is:",
      options: ["[ML⁰T⁻²]", "[ML¹T⁻²]", "[ML²T⁻²]", "[ML⁰T⁻¹]"],
      answer: 0,
      topic: "Physics and Measurement",
    },
    {
      id: 112, year: 2022, exam: "NEET 2022",
      question: "The area of a rectangular field (length = 55.3 m, breadth = 25 m) after rounding off to correct significant digits is:",
      options: ["1382.5 m²", "1382 m²", "1383 m²", "1.4 × 10³ m²"],
      answer: 3,
      topic: "Physics and Measurement",
    },
    {
      id: 113, year: 2014, exam: "NEET 2014",
      question: "If energy (E), velocity (V) and time (T) are chosen as the fundamental units, the dimensional formula of surface tension will be:",
      options: ["[EV⁻²T⁻²]", "[E⁻²V⁻¹T⁻³]", "[EV⁻²T⁻¹]", "[EV⁻¹T⁻²]"],
      answer: 0,
      topic: "Physics and Measurement",
    },
    {
      id: 114, year: 2017, exam: "NEET 2017",
      question: "A physical quantity of the dimensions of length that can be formed out of c, G and e²/(4πε₀) is:",
      options: ["c²[G·e²/(4πε₀)]^(1/2)", "(1/c²)[G·e²/(4πε₀)]^(1/2)", "(1/c)·G·e²/(4πε₀)", "(1/c²)[G·e²/(4πε₀)]²"],
      answer: 1,
      topic: "Physics and Measurement",
    },
    {
      id: 115, year: 2021, exam: "NEET 2021",
      question: "Which of the following is not a fundamental SI unit?",
      options: ["Ampere", "Candela", "Mole", "Tesla"],
      answer: 3,
      topic: "Physics and Measurement",
    },
  ],

};

// Helper to get questions for a topic
export const getTopicQuestions = (examId: string, subject: string, topicName: string): PYQQuestion[] => {
  // Handle exam ID aliases
  const idMap: Record<string, string> = { 'neet-ug': 'neet' };
  const resolvedId = idMap[examId] || examId;
  const key = `${resolvedId}::${subject}::${topicName}`;
  return pyqQuestions[key] || [];
};
