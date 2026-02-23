import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';

interface SummaryStats {
  totalQuestions: number;
  totalCorrect: number;
  totalTimeMinutes: number;
  totalTimeHours: string;
  avgAccuracy: number;
  testsCompleted: number;
  practiceDays: number;
  totalDays: number;
  consistencyRate: number;
}

interface DailyData {
  displayDate: string;
  questions: number;
  timeMinutes: number;
}

interface CategoryData {
  fullCategory: string;
  questions: number;
  accuracy: number;
  timeMinutes: number;
}

interface StreakData {
  currentStreak: number;
  bestStreak: number;
  totalDaysPracticed: number;
}

import { Language } from '@/hooks/useLanguage';

interface GenerateSummaryPDFParams {
  period: 'week' | 'month';
  dateRange: { start: Date; end: Date };
  summaryStats: SummaryStats;
  dailyBreakdown: DailyData[];
  categoryBreakdown: CategoryData[];
  streakData: StreakData;
  language: Language;
}

const getPerformanceGrade = (accuracy: number, consistency: number): { grade: string; message: string; messageTa: string } => {
  const score = (accuracy * 0.6) + (consistency * 0.4);
  
  if (score >= 85) {
    return { grade: 'A+', message: 'Outstanding performance! You are exam-ready.', messageTa: 'சிறப்பான செயல்திறன்! நீங்கள் தேர்வுக்கு தயாராக உள்ளீர்கள்.' };
  } else if (score >= 70) {
    return { grade: 'A', message: 'Excellent progress! Keep up the good work.', messageTa: 'சிறந்த முன்னேற்றம்! நல்ல வேலையை தொடருங்கள்.' };
  } else if (score >= 55) {
    return { grade: 'B', message: 'Good effort! Focus on weak areas to improve.', messageTa: 'நல்ல முயற்சி! மேம்படுத்த பலவீனமான பகுதிகளில் கவனம் செலுத்துங்கள்.' };
  } else if (score >= 40) {
    return { grade: 'C', message: 'Keep practicing! Consistency is key to success.', messageTa: 'தொடர்ந்து பயிற்சி செய்யுங்கள்! நிலைத்தன்மை வெற்றிக்கான திறவுகோல்.' };
  } else {
    return { grade: 'D', message: 'More practice needed. Start with basics and build up.', messageTa: 'மேலும் பயிற்சி தேவை. அடிப்படைகளிலிருந்து தொடங்கி மேம்படுத்துங்கள்.' };
  }
};

const getImprovementTips = (stats: SummaryStats, language: Language): string[] => {
  const tips: string[] = [];
  const useLang = language === 'ta' ? 'ta' : 'en';
  
  if (language === 'en') {
    if (stats.avgAccuracy < 60) {
      tips.push('Focus on understanding concepts rather than rushing through questions');
    }
    if (stats.consistencyRate < 50) {
      tips.push('Try to practice at least 5 days a week for better retention');
    }
    if (stats.totalQuestions < 50 && stats.totalDays >= 7) {
      tips.push('Increase daily question count to at least 20 questions per day');
    }
    if (stats.testsCompleted < 3) {
      tips.push('Take more mock tests to simulate real exam conditions');
    }
    tips.push('Review incorrect answers and understand the reasoning');
    tips.push('Set daily goals and track your progress regularly');
  } else {
    if (stats.avgAccuracy < 60) {
      tips.push('கேள்விகளை அவசரமாக செய்வதை விட கருத்துகளை புரிந்துகொள்வதில் கவனம் செலுத்துங்கள்');
    }
    if (stats.consistencyRate < 50) {
      tips.push('சிறந்த நினைவாற்றலுக்கு வாரத்தில் குறைந்தது 5 நாட்களாவது பயிற்சி செய்ய முயற்சிக்கவும்');
    }
    if (stats.totalQuestions < 50 && stats.totalDays >= 7) {
      tips.push('தினசரி கேள்விகளின் எண்ணிக்கையை குறைந்தது 20 கேள்விகளாக அதிகரிக்கவும்');
    }
    if (stats.testsCompleted < 3) {
      tips.push('உண்மையான தேர்வு நிலைமைகளை உருவகப்படுத்த மேலும் mock தேர்வுகள் எழுதுங்கள்');
    }
    tips.push('தவறான பதில்களை மறுஆய்வு செய்து காரணத்தை புரிந்துகொள்ளுங்கள்');
    tips.push('தினசரி இலக்குகளை அமைத்து உங்கள் முன்னேற்றத்தை தொடர்ந்து கண்காணிக்கவும்');
  }
  
  return tips.slice(0, 5);
};

export const generateSummaryReportPDF = ({
  period,
  dateRange,
  summaryStats,
  dailyBreakdown,
  categoryBreakdown,
  streakData,
  language
}: GenerateSummaryPDFParams): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPos = 20;

  const periodLabel = period === 'week' 
    ? (language === 'en' ? 'Weekly' : 'வாராந்திர')
    : (language === 'en' ? 'Monthly' : 'மாதாந்திர');

  const gradeData = getPerformanceGrade(summaryStats.avgAccuracy, summaryStats.consistencyRate);

  // Header background with gradient effect
  doc.setFillColor(59, 130, 246); // Blue
  doc.rect(0, 0, pageWidth, 50, 'F');
  
  // Accent stripe
  doc.setFillColor(16, 185, 129); // Green
  doc.rect(0, 50, pageWidth, 3, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(
    language === 'en' ? `${periodLabel} Study Report` : `${periodLabel} படிப்பு அறிக்கை`,
    pageWidth / 2, 22, { align: 'center' }
  );

  // Date range
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `${format(dateRange.start, 'MMM d')} - ${format(dateRange.end, 'MMM d, yyyy')}`,
    pageWidth / 2, 35, { align: 'center' }
  );

  // Brand
  doc.setFontSize(10);
  doc.text('VAZHIKAATTI', pageWidth / 2, 46, { align: 'center' });

  yPos = 65;

  // Performance Grade Box
  const gradeColor = gradeData.grade.startsWith('A') ? [16, 185, 129] : 
                     gradeData.grade === 'B' ? [245, 158, 11] : [239, 68, 68];
  
  doc.setFillColor(gradeColor[0], gradeColor[1], gradeColor[2]);
  doc.roundedRect(pageWidth / 2 - 40, yPos, 80, 35, 5, 5, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(32);
  doc.setFont('helvetica', 'bold');
  doc.text(gradeData.grade, pageWidth / 2, yPos + 22, { align: 'center' });
  
  doc.setFontSize(9);
  doc.text(language === 'en' ? 'Performance Grade' : 'செயல்திறன் தரம்', pageWidth / 2, yPos + 32, { align: 'center' });

  yPos += 45;

  // Performance message
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(15, yPos, pageWidth - 30, 18, 3, 3, 'F');
  doc.setTextColor(34, 197, 94);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const message = language === 'en' ? gradeData.message : gradeData.messageTa;
  doc.text(message, pageWidth / 2, yPos + 11, { align: 'center' });

  yPos += 28;

  // Key Statistics Table
  doc.setTextColor(31, 41, 55);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(language === 'en' ? '📊 Key Statistics' : '📊 முக்கிய புள்ளிவிவரங்கள்', 15, yPos);

  yPos += 5;

  autoTable(doc, {
    startY: yPos,
    head: [[
      language === 'en' ? 'Metric' : 'அளவீடு',
      language === 'en' ? 'Value' : 'மதிப்பு'
    ]],
    body: [
      [language === 'en' ? 'Total Questions Answered' : 'மொத்த கேள்விகள்', summaryStats.totalQuestions.toString()],
      [language === 'en' ? 'Correct Answers' : 'சரியான பதில்கள்', summaryStats.totalCorrect.toString()],
      [language === 'en' ? 'Average Accuracy' : 'சராசரி துல்லியம்', `${summaryStats.avgAccuracy}%`],
      [language === 'en' ? 'Total Study Time' : 'மொத்த படிப்பு நேரம்', 
        summaryStats.totalTimeMinutes < 60 
          ? `${summaryStats.totalTimeMinutes} min` 
          : `${summaryStats.totalTimeHours} hours`
      ],
      [language === 'en' ? 'Tests Completed' : 'முடிக்கப்பட்ட தேர்வுகள்', summaryStats.testsCompleted.toString()],
      [language === 'en' ? 'Practice Days' : 'பயிற்சி நாட்கள்', `${summaryStats.practiceDays}/${summaryStats.totalDays}`],
      [language === 'en' ? 'Consistency Rate' : 'நிலைத்தன்மை விகிதம்', `${summaryStats.consistencyRate}%`],
    ],
    theme: 'striped',
    headStyles: { fillColor: [59, 130, 246] },
    margin: { left: 15, right: 15 },
    styles: { fontSize: 10 },
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;

  // Streak & Achievements
  doc.setFillColor(255, 237, 213); // Orange light
  doc.roundedRect(15, yPos, pageWidth - 30, 30, 3, 3, 'F');
  
  doc.setTextColor(194, 65, 12);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(language === 'en' ? '🔥 Streak & Achievements' : '🔥 தொடர் & சாதனைகள்', 20, yPos + 10);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const streakText = language === 'en' 
    ? `Current Streak: ${streakData.currentStreak} days | Best Streak: ${streakData.bestStreak} days | Total Practice Days: ${streakData.totalDaysPracticed}`
    : `தற்போதைய தொடர்: ${streakData.currentStreak} நாட்கள் | சிறந்த தொடர்: ${streakData.bestStreak} நாட்கள் | மொத்த பயிற்சி நாட்கள்: ${streakData.totalDaysPracticed}`;
  doc.text(streakText, 20, yPos + 22);

  yPos += 40;

  // Daily Breakdown
  if (dailyBreakdown.length > 0) {
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(language === 'en' ? '📅 Daily Breakdown' : '📅 தினசரி விபரம்', 15, yPos);

    yPos += 5;

    autoTable(doc, {
      startY: yPos,
      head: [[
        language === 'en' ? 'Day' : 'நாள்',
        language === 'en' ? 'Questions' : 'கேள்விகள்',
        language === 'en' ? 'Time (min)' : 'நேரம் (நிமிடம்)'
      ]],
      body: dailyBreakdown.map(d => [d.displayDate, d.questions.toString(), d.timeMinutes.toString()]),
      theme: 'striped',
      headStyles: { fillColor: [139, 92, 246] },
      margin: { left: 15, right: 15 },
      styles: { fontSize: 9 },
    });

    yPos = (doc as any).lastAutoTable.finalY + 15;
  }

  // Category Performance
  if (categoryBreakdown.length > 0) {
    if (yPos > pageHeight - 80) {
      doc.addPage();
      yPos = 20;
    }

    doc.setTextColor(31, 41, 55);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(language === 'en' ? '📚 Category Performance' : '📚 வகை செயல்திறன்', 15, yPos);

    yPos += 5;

    autoTable(doc, {
      startY: yPos,
      head: [[
        language === 'en' ? 'Category' : 'வகை',
        language === 'en' ? 'Questions' : 'கேள்விகள்',
        language === 'en' ? 'Accuracy' : 'துல்லியம்',
        language === 'en' ? 'Time (min)' : 'நேரம்'
      ]],
      body: categoryBreakdown.map(c => [
        c.fullCategory,
        c.questions.toString(),
        `${c.accuracy}%`,
        c.timeMinutes.toString()
      ]),
      theme: 'striped',
      headStyles: { fillColor: [16, 185, 129] },
      margin: { left: 15, right: 15 },
      styles: { fontSize: 9 },
    });

    yPos = (doc as any).lastAutoTable.finalY + 15;
  }

  // Improvement Tips
  if (yPos > pageHeight - 80) {
    doc.addPage();
    yPos = 20;
  }

  const tips = getImprovementTips(summaryStats, language);

  doc.setFillColor(239, 246, 255);
  doc.roundedRect(15, yPos, pageWidth - 30, 12, 3, 3, 'F');
  doc.setTextColor(30, 64, 175);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(
    language === 'en' ? '💡 Improvement Tips' : '💡 மேம்பாட்டு குறிப்புகள்',
    pageWidth / 2, yPos + 8, { align: 'center' }
  );

  yPos += 18;

  doc.setTextColor(55, 65, 81);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  tips.forEach((tip, index) => {
    if (yPos > pageHeight - 20) {
      doc.addPage();
      yPos = 20;
    }
    const bulletText = `${index + 1}. ${tip}`;
    const splitTip = doc.splitTextToSize(bulletText, pageWidth - 40);
    doc.text(splitTip, 20, yPos);
    yPos += splitTip.length * 5 + 3;
  });

  // Footer
  yPos = pageHeight - 15;
  doc.setFillColor(243, 244, 246);
  doc.rect(0, yPos - 5, pageWidth, 20, 'F');
  
  doc.setTextColor(107, 114, 128);
  doc.setFontSize(8);
  doc.text(
    `Generated by VAZHIKAATTI | ${format(new Date(), 'MMM d, yyyy HH:mm')}`,
    pageWidth / 2, yPos + 5, { align: 'center' }
  );

  // Save PDF
  const fileName = language === 'en' 
    ? `Study_Report_${period}_${format(new Date(), 'yyyy-MM-dd')}.pdf`
    : `படிப்பு_அறிக்கை_${period}_${format(new Date(), 'yyyy-MM-dd')}.pdf`;
  
  doc.save(fileName);
};
