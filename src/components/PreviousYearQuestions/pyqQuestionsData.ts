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

};

// Helper to get questions for a topic
export const getTopicQuestions = (examId: string, subject: string, topicName: string): PYQQuestion[] => {
  const key = `${examId}::${subject}::${topicName}`;
  return pyqQuestions[key] || [];
};
