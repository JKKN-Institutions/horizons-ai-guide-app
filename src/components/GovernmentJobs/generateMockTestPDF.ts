import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CategoryType } from './types';
import { categoryInfo } from './governmentExamsData';

interface Question {
  id: string;
  question: string;
  questionTamil: string;
  options: { en: string; ta: string }[];
  correctAnswer: number;
  explanation: string;
  explanationTamil: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

import { Language } from '@/hooks/useLanguage';

interface GeneratePDFParams {
  category: CategoryType;
  questions: Question[];
  selectedAnswers: Record<string, number>;
  score: number;
  totalQuestions: number;
  timeTaken: number;
  language: Language;
}

// Subject-wise improvement recommendations
const SUBJECT_RECOMMENDATIONS: Record<string, { en: string[]; ta: string[] }> = {
  'General Knowledge': {
    en: [
      'Read The Hindu or Indian Express daily for current affairs',
      'Follow Pratiyogita Darpan monthly magazine',
      'Watch Loksabha TV for political awareness',
      'Practice monthly current affairs PDFs',
      'Focus on last 6 months national/international events'
    ],
    ta: [
      'நடப்பு விவகாரங்களுக்கு தினமும் தி இந்து அல்லது இந்தியன் எக்ஸ்பிரஸ் படிக்கவும்',
      'மாதாந்திர பிரதியோகிதா தர்பன் இதழைப் பின்தொடரவும்',
      'அரசியல் விழிப்புணர்வுக்கு லோக்சபா டிவி பாருங்கள்',
      'மாதாந்திர நடப்பு நிகழ்வுகள் PDFகளை பயிற்சி செய்யுங்கள்',
      'கடந்த 6 மாத தேசிய/சர்வதேச நிகழ்வுகளில் கவனம் செலுத்துங்கள்'
    ]
  },
  'Mathematics': {
    en: [
      'Master shortcut methods for calculations',
      'Practice 50 problems daily from RS Aggarwal',
      'Focus on Percentage, Ratio, and Time & Work',
      'Learn tables up to 30 and squares up to 50',
      'Solve previous year SSC/Railway math questions'
    ],
    ta: [
      'கணக்கீடுகளுக்கான குறுக்குவழி முறைகளை கற்றுக்கொள்ளுங்கள்',
      'RS அகர்வாலிலிருந்து தினமும் 50 சிக்கல்களை பயிற்சி செய்யுங்கள்',
      'சதவீதம், விகிதம் மற்றும் நேரம் & வேலை மீது கவனம் செலுத்துங்கள்',
      '30 வரை அட்டவணைகள் மற்றும் 50 வரை சதுரங்களை கற்றுக்கொள்ளுங்கள்',
      'முந்தைய ஆண்டு SSC/ரயில்வே கணித கேள்விகளை தீர்க்கவும்'
    ]
  },
  'Reasoning': {
    en: [
      'Practice coding-decoding daily',
      'Master blood relations and seating arrangements',
      'Solve puzzles and syllogisms regularly',
      'Practice analogy and classification',
      'Focus on non-verbal reasoning patterns'
    ],
    ta: [
      'குறியீடு-குறிநீக்கம் தினமும் பயிற்சி செய்யுங்கள்',
      'இரத்த உறவுகள் மற்றும் அமர்வு ஏற்பாடுகளை கற்றுக்கொள்ளுங்கள்',
      'புதிர்கள் மற்றும் நியாயங்களை தொடர்ந்து தீர்க்கவும்',
      'ஒப்புமை மற்றும் வகைப்பாடு பயிற்சி செய்யுங்கள்',
      'சொல்லாத தர்க்க மாதிரிகளில் கவனம் செலுத்துங்கள்'
    ]
  },
  'English': {
    en: [
      'Read English newspapers for 30 mins daily',
      'Practice error spotting and sentence improvement',
      'Learn 20 new vocabulary words daily',
      'Focus on idioms, phrases, and one-word substitutions',
      'Practice reading comprehension passages'
    ],
    ta: [
      'தினமும் 30 நிமிடம் ஆங்கில செய்தித்தாள்கள் படிக்கவும்',
      'பிழை கண்டறிதல் மற்றும் வாக்கிய மேம்படுத்தல் பயிற்சி செய்யுங்கள்',
      'தினமும் 20 புதிய சொற்களை கற்றுக்கொள்ளுங்கள்',
      'மரபுத்தொடர்கள், சொற்றொடர்கள் மற்றும் ஒற்றை சொல் மாற்றீடுகளில் கவனம் செலுத்துங்கள்',
      'வாசிப்பு புரிதல் பத்திகளை பயிற்சி செய்யுங்கள்'
    ]
  },
  'Polity': {
    en: [
      'Read Laxmikanth for Indian Polity thoroughly',
      'Focus on Fundamental Rights and Duties',
      'Learn about Constitutional Amendments',
      'Study Parliament and State Legislature',
      'Practice previous year polity questions'
    ],
    ta: [
      'இந்திய அரசியலுக்கு லக்ஷ்மிகாந்தை முழுமையாக படிக்கவும்',
      'அடிப்படை உரிமைகள் மற்றும் கடமைகளில் கவனம் செலுத்துங்கள்',
      'அரசியலமைப்பு திருத்தங்களைப் பற்றி அறிந்து கொள்ளுங்கள்',
      'நாடாளுமன்றம் மற்றும் மாநில சட்டமன்றத்தைப் படிக்கவும்',
      'முந்தைய ஆண்டு அரசியல் கேள்விகளை பயிற்சி செய்யுங்கள்'
    ]
  },
  'Banking': {
    en: [
      'Stay updated with RBI circulars and policies',
      'Learn about banking schemes and initiatives',
      'Practice banking awareness questions',
      'Focus on financial literacy concepts',
      'Study about various banking reforms'
    ],
    ta: [
      'RBI சுற்றறிக்கைகள் மற்றும் கொள்கைகளுடன் புதுப்பித்த நிலையில் இருங்கள்',
      'வங்கி திட்டங்கள் மற்றும் முன்முயற்சிகளைப் பற்றி அறிந்து கொள்ளுங்கள்',
      'வங்கி விழிப்புணர்வு கேள்விகளை பயிற்சி செய்யுங்கள்',
      'நிதி கல்வி கருத்துகளில் கவனம் செலுத்துங்கள்',
      'பல்வேறு வங்கி சீர்திருத்தங்களைப் பற்றி படிக்கவும்'
    ]
  }
};

// Get personalized recommendations based on weak subjects
const getPersonalizedRecommendations = (
  subjectWise: Record<string, { total: number; correct: number }>,
  language: Language
): { subject: string; accuracy: number; tips: string[] }[] => {
  const useLang = language === 'ta' ? 'ta' : 'en';
  const weakSubjects = Object.entries(subjectWise)
    .map(([subject, data]) => ({
      subject,
      accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
      total: data.total
    }))
    .filter(s => s.accuracy < 60 && s.total >= 2)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 3);

  return weakSubjects.map(s => ({
    ...s,
    tips: SUBJECT_RECOMMENDATIONS[s.subject]?.[language] || [
      language === 'en' 
        ? 'Practice more questions from this topic' 
        : 'இந்த தலைப்பில் அதிக கேள்விகளை பயிற்சி செய்யுங்கள்'
    ]
  }));
};

// Get overall performance message
const getPerformanceMessage = (percentage: number, language: Language): string => {
  const useLang = language === 'ta' ? 'ta' : 'en';
  if (percentage >= 90) {
    return language === 'en' 
      ? 'Outstanding! You are well-prepared for the exam. Keep maintaining this level.'
      : 'சிறப்பானது! நீங்கள் தேர்வுக்கு நன்கு தயாராக உள்ளீர்கள். இந்த நிலையை தொடர்ந்து பராமரிக்கவும்.';
  } else if (percentage >= 75) {
    return language === 'en'
      ? 'Great performance! Focus on weak areas to improve further.'
      : 'சிறந்த செயல்திறன்! மேலும் மேம்படுத்த பலவீனமான பகுதிகளில் கவனம் செலுத்துங்கள்.';
  } else if (percentage >= 60) {
    return language === 'en'
      ? 'Good effort! Regular practice in weak subjects will help you score better.'
      : 'நல்ல முயற்சி! பலவீனமான பாடங்களில் தொடர்ந்து பயிற்சி செய்வது உங்களுக்கு சிறந்த மதிப்பெண் பெற உதவும்.';
  } else if (percentage >= 40) {
    return language === 'en'
      ? 'Keep practicing! Focus on fundamentals and solve more questions daily.'
      : 'தொடர்ந்து பயிற்சி செய்யுங்கள்! அடிப்படைகளில் கவனம் செலுத்தி தினமும் அதிக கேள்விகளை தீர்க்கவும்.';
  } else {
    return language === 'en'
      ? 'Start with basics and gradually build up. Daily consistent practice is key.'
      : 'அடிப்படைகளிலிருந்து தொடங்கி படிப்படியாக உருவாக்குங்கள். தினசரி நிலையான பயிற்சி முக்கியம்.';
  }
};

export const generateMockTestPDF = ({
  category,
  questions,
  selectedAnswers,
  score,
  totalQuestions,
  timeTaken,
  language
}: GeneratePDFParams): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPos = 20;

  // Calculate statistics
  const correct = score;
  const incorrect = Object.keys(selectedAnswers).length - correct;
  const unattempted = totalQuestions - Object.keys(selectedAnswers).length;
  const percentage = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;
  
  // Calculate subject-wise stats
  const subjectWise: Record<string, { total: number; correct: number }> = {};
  questions.forEach(q => {
    if (!subjectWise[q.subject]) {
      subjectWise[q.subject] = { total: 0, correct: 0 };
    }
    subjectWise[q.subject].total++;
    if (selectedAnswers[q.id] === q.correctAnswer) {
      subjectWise[q.subject].correct++;
    }
  });

  // Calculate difficulty-wise stats
  const difficultyWise: Record<string, { total: number; correct: number }> = {};
  questions.forEach(q => {
    if (!difficultyWise[q.difficulty]) {
      difficultyWise[q.difficulty] = { total: 0, correct: 0 };
    }
    difficultyWise[q.difficulty].total++;
    if (selectedAnswers[q.id] === q.correctAnswer) {
      difficultyWise[q.difficulty].correct++;
    }
  });

  const categoryLabel = categoryInfo[category]?.label || category;

  // Header background
  doc.setFillColor(88, 80, 236); // Indigo
  doc.rect(0, 0, pageWidth, 45, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text(language === 'en' ? 'Mock Test Results' : 'Mock Test Results', pageWidth / 2, 18, { align: 'center' });

  // Subtitle
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `${categoryLabel} | ${new Date().toLocaleDateString()}`,
    pageWidth / 2, 30, { align: 'center' }
  );

  // Brand
  doc.setFontSize(10);
  doc.text('VAZHIKATTI', pageWidth / 2, 40, { align: 'center' });

  yPos = 55;

  // Score Summary Box
  doc.setFillColor(240, 253, 244); // Light green
  doc.roundedRect(15, yPos, pageWidth - 30, 40, 3, 3, 'F');
  
  doc.setTextColor(34, 197, 94); // Green
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text(`${percentage}%`, pageWidth / 2, yPos + 18, { align: 'center' });
  
  doc.setTextColor(55, 65, 81); // Gray
  doc.setFontSize(12);
  doc.text(
    `${correct}/${totalQuestions} ${language === 'en' ? 'Correct' : 'Correct'}`,
    pageWidth / 2, yPos + 32, { align: 'center' }
  );

  yPos += 50;

  // Performance Message
  doc.setFillColor(254, 243, 199); // Light amber
  doc.roundedRect(15, yPos, pageWidth - 30, 20, 3, 3, 'F');
  doc.setTextColor(146, 64, 14); // Amber
  doc.setFontSize(10);
  const perfMessage = getPerformanceMessage(percentage, language);
  const splitMessage = doc.splitTextToSize(perfMessage, pageWidth - 40);
  doc.text(splitMessage, pageWidth / 2, yPos + 8, { align: 'center' });

  yPos += 30;

  // Statistics Table
  doc.setTextColor(31, 41, 55);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(language === 'en' ? 'Test Statistics' : 'Test Statistics', 15, yPos);

  yPos += 5;

  autoTable(doc, {
    startY: yPos,
    head: [[
      language === 'en' ? 'Metric' : 'Metric',
      language === 'en' ? 'Value' : 'Value'
    ]],
    body: [
      [language === 'en' ? 'Total Questions' : 'Total Questions', totalQuestions.toString()],
      [language === 'en' ? 'Correct Answers' : 'Correct Answers', correct.toString()],
      [language === 'en' ? 'Incorrect Answers' : 'Incorrect Answers', incorrect.toString()],
      [language === 'en' ? 'Unattempted' : 'Unattempted', unattempted.toString()],
      [language === 'en' ? 'Time Taken' : 'Time Taken', `${Math.floor(timeTaken / 60)}:${(timeTaken % 60).toString().padStart(2, '0')}`],
      [language === 'en' ? 'Accuracy' : 'Accuracy', `${percentage}%`],
    ],
    theme: 'striped',
    headStyles: { fillColor: [88, 80, 236] },
    margin: { left: 15, right: 15 },
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;

  // Subject-wise Performance
  if (Object.keys(subjectWise).length > 0) {
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(language === 'en' ? 'Subject-wise Performance' : 'Subject-wise Performance', 15, yPos);

    yPos += 5;

    const subjectData = Object.entries(subjectWise).map(([subject, data]) => [
      subject,
      data.total.toString(),
      data.correct.toString(),
      `${data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0}%`
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [[
        language === 'en' ? 'Subject' : 'Subject',
        language === 'en' ? 'Total' : 'Total',
        language === 'en' ? 'Correct' : 'Correct',
        language === 'en' ? 'Accuracy' : 'Accuracy'
      ]],
      body: subjectData,
      theme: 'striped',
      headStyles: { fillColor: [139, 92, 246] },
      margin: { left: 15, right: 15 },
    });

    yPos = (doc as any).lastAutoTable.finalY + 15;
  }

  // Difficulty-wise Performance
  if (Object.keys(difficultyWise).length > 0) {
    if (yPos > pageHeight - 60) {
      doc.addPage();
      yPos = 20;
    }

    doc.setTextColor(31, 41, 55);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(language === 'en' ? 'Difficulty-wise Performance' : 'Difficulty-wise Performance', 15, yPos);

    yPos += 5;

    const diffData = Object.entries(difficultyWise).map(([diff, data]) => [
      diff.charAt(0).toUpperCase() + diff.slice(1),
      data.total.toString(),
      data.correct.toString(),
      `${data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0}%`
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [[
        language === 'en' ? 'Difficulty' : 'Difficulty',
        language === 'en' ? 'Total' : 'Total',
        language === 'en' ? 'Correct' : 'Correct',
        language === 'en' ? 'Accuracy' : 'Accuracy'
      ]],
      body: diffData,
      theme: 'striped',
      headStyles: { fillColor: [249, 115, 22] },
      margin: { left: 15, right: 15 },
    });

    yPos = (doc as any).lastAutoTable.finalY + 15;
  }

  // Personalized Recommendations
  const recommendations = getPersonalizedRecommendations(subjectWise, language);
  
  if (recommendations.length > 0) {
    if (yPos > pageHeight - 80) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFillColor(239, 246, 255); // Light blue
    doc.roundedRect(15, yPos, pageWidth - 30, 15, 3, 3, 'F');
    doc.setTextColor(30, 64, 175); // Blue
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(
      language === 'en' ? '📚 Personalized Improvement Plan' : '📚 Personalized Improvement Plan',
      pageWidth / 2, yPos + 10, { align: 'center' }
    );

    yPos += 25;

    recommendations.forEach((rec) => {
      if (yPos > pageHeight - 50) {
        doc.addPage();
        yPos = 20;
      }

      // Subject header
      doc.setFillColor(254, 226, 226); // Light red
      doc.roundedRect(15, yPos, pageWidth - 30, 12, 2, 2, 'F');
      doc.setTextColor(185, 28, 28); // Red
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(`${rec.subject} (${rec.accuracy}% accuracy)`, 20, yPos + 8);

      yPos += 18;

      // Tips
      doc.setTextColor(55, 65, 81);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');

      rec.tips.forEach((tip) => {
        if (yPos > pageHeight - 20) {
          doc.addPage();
          yPos = 20;
        }
        doc.text(`• ${tip}`, 20, yPos);
        yPos += 6;
      });

      yPos += 5;
    });
  }

  // Question Review Section
  doc.addPage();
  yPos = 20;

  doc.setFillColor(88, 80, 236);
  doc.roundedRect(15, yPos, pageWidth - 30, 15, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(
    language === 'en' ? 'Detailed Question Review' : 'Detailed Question Review',
    pageWidth / 2, yPos + 10, { align: 'center' }
  );

  yPos += 25;

  questions.forEach((q, index) => {
    if (yPos > pageHeight - 60) {
      doc.addPage();
      yPos = 20;
    }

    const userAnswer = selectedAnswers[q.id];
    const isCorrect = userAnswer === q.correctAnswer;

    // Question background
    if (isCorrect) {
      doc.setFillColor(220, 252, 231);
    } else {
      doc.setFillColor(254, 226, 226);
    }
    doc.roundedRect(15, yPos, pageWidth - 30, 35, 2, 2, 'F');

    // Question number and status
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    if (isCorrect) {
      doc.setTextColor(22, 163, 74);
    } else {
      doc.setTextColor(220, 38, 38);
    }
    doc.text(`Q${index + 1}. ${isCorrect ? '✓' : '✗'}`, 20, yPos + 8);

    // Question text
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const questionText = language === 'ta' ? q.questionTamil : q.question;
    const splitQuestion = doc.splitTextToSize(questionText, pageWidth - 50);
    doc.text(splitQuestion, 20, yPos + 15);

    // Correct answer
    doc.setTextColor(22, 163, 74);
    doc.setFontSize(8);
    const correctOption = q.options[q.correctAnswer][language === 'ta' ? 'ta' : 'en'];
    doc.text(`Correct: ${correctOption}`, 20, yPos + 28);

    // User answer if wrong
    if (!isCorrect && userAnswer !== undefined) {
      doc.setTextColor(220, 38, 38);
      const wrongOption = q.options[userAnswer][language === 'ta' ? 'ta' : 'en'];
      doc.text(`Your answer: ${wrongOption}`, pageWidth / 2, yPos + 28);
    }

    yPos += 42;
  });

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(156, 163, 175);
  doc.text(
    `Generated by VAZHIKATTI | ${new Date().toLocaleDateString()}`,
    pageWidth / 2, pageHeight - 10, { align: 'center' }
  );

  // Save
  const filename = `MockTest_${categoryLabel.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
};
