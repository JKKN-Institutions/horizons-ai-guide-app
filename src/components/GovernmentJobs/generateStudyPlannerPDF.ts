import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, parseISO, isSameMonth } from 'date-fns';

interface PracticeSchedule {
  id: string;
  date: string;
  title: string;
  titleTamil: string;
  type: 'practice' | 'revision' | 'mock-test' | 'rest';
  subject?: string;
  duration?: number;
  completed: boolean;
}

interface UpcomingExam {
  id: string;
  name: string;
  date: string;
  status: string;
}

import { Language } from '@/hooks/useLanguage';

interface GenerateStudyPlannerPDFParams {
  month: Date;
  schedules: PracticeSchedule[];
  upcomingExams: UpcomingExam[];
  language: Language;
}

const SCHEDULE_TYPE_COLORS: Record<string, number[]> = {
  'practice': [59, 130, 246],    // Blue
  'revision': [139, 92, 246],    // Purple
  'mock-test': [249, 115, 22],   // Orange
  'rest': [34, 197, 94],         // Green
};

const SCHEDULE_TYPE_LABELS: Record<string, { en: string; ta: string }> = {
  'practice': { en: 'Practice', ta: 'பயிற்சி' },
  'revision': { en: 'Revision', ta: 'திருத்தம்' },
  'mock-test': { en: 'Mock Test', ta: 'மாக் தேர்வு' },
  'rest': { en: 'Rest', ta: 'ஓய்வு' },
};

const SUBJECT_LABELS: Record<string, { en: string; ta: string }> = {
  'gk': { en: 'General Knowledge', ta: 'பொது அறிவு' },
  'math': { en: 'Mathematics', ta: 'கணிதம்' },
  'reasoning': { en: 'Reasoning', ta: 'நியாயம்' },
  'english': { en: 'English', ta: 'ஆங்கிலம்' },
  'polity': { en: 'Polity', ta: 'அரசியல்' },
  'all': { en: 'All Subjects', ta: 'அனைத்து பாடங்கள்' },
};

export const generateStudyPlannerPDF = ({
  month,
  schedules,
  upcomingExams,
  language
}: GenerateStudyPlannerPDFParams): void => {
  const doc = new jsPDF('landscape');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Filter schedules and exams for this month
  const monthSchedules = schedules.filter(s => {
    const date = parseISO(s.date);
    return isSameMonth(date, month);
  });

  const monthExams = upcomingExams.filter(e => {
    const date = parseISO(e.date);
    return isSameMonth(date, month);
  });

  // Header
  doc.setFillColor(79, 70, 229); // Indigo
  doc.rect(0, 0, pageWidth, 30, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text(
    language === 'en' ? 'Study Planner Calendar' : 'Study Planner Calendar',
    pageWidth / 2, 14, { align: 'center' }
  );

  doc.setFontSize(14);
  doc.text(format(month, 'MMMM yyyy'), pageWidth / 2, 24, { align: 'center' });

  // Calendar grid
  let yPos = 40;
  const cellWidth = (pageWidth - 20) / 7;
  const cellHeight = 22;

  // Day headers
  const dayNames = language === 'en' 
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'];

  doc.setFillColor(243, 244, 246);
  doc.rect(10, yPos, pageWidth - 20, 10, 'F');
  
  doc.setTextColor(55, 65, 81);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  
  dayNames.forEach((day, index) => {
    doc.text(day, 10 + (index * cellWidth) + (cellWidth / 2), yPos + 7, { align: 'center' });
  });

  yPos += 12;

  // Calendar cells
  const firstDayOfWeek = getDay(monthStart);
  let currentX = 10 + (firstDayOfWeek * cellWidth);
  let currentY = yPos;
  let rowCount = 0;

  days.forEach((day, index) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    const daySchedules = monthSchedules.filter(s => s.date === dateStr);
    const dayExams = monthExams.filter(e => e.date === dateStr);

    // Cell background
    if (dayExams.length > 0) {
      doc.setFillColor(254, 226, 226); // Light red for exam days
    } else if (daySchedules.length > 0) {
      doc.setFillColor(239, 246, 255); // Light blue for scheduled days
    } else {
      doc.setFillColor(255, 255, 255);
    }
    doc.rect(currentX, currentY, cellWidth, cellHeight, 'F');
    doc.setDrawColor(229, 231, 235);
    doc.rect(currentX, currentY, cellWidth, cellHeight, 'S');

    // Day number
    doc.setTextColor(dayExams.length > 0 ? 185 : 55, dayExams.length > 0 ? 28 : 65, dayExams.length > 0 ? 28 : 81);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(format(day, 'd'), currentX + 3, currentY + 6);

    // Add indicators
    let indicatorY = currentY + 10;
    
    // Exam indicator
    if (dayExams.length > 0) {
      doc.setFillColor(239, 68, 68);
      doc.circle(currentX + cellWidth - 6, currentY + 5, 2, 'F');
    }

    // Schedule indicators (max 2)
    daySchedules.slice(0, 2).forEach((schedule, idx) => {
      const color = SCHEDULE_TYPE_COLORS[schedule.type] || [107, 114, 128];
      doc.setFillColor(color[0], color[1], color[2]);
      doc.roundedRect(currentX + 2, indicatorY + (idx * 5), cellWidth - 4, 4, 1, 1, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(5);
      doc.setFont('helvetica', 'normal');
      const label = schedule.title.substring(0, 12);
      doc.text(label, currentX + 3, indicatorY + 3 + (idx * 5));
    });

    if (daySchedules.length > 2) {
      doc.setTextColor(107, 114, 128);
      doc.setFontSize(5);
      doc.text(`+${daySchedules.length - 2}`, currentX + cellWidth - 8, currentY + cellHeight - 2);
    }

    // Move to next cell
    currentX += cellWidth;
    if ((firstDayOfWeek + index + 1) % 7 === 0) {
      currentX = 10;
      currentY += cellHeight;
      rowCount++;
    }
  });

  // Summary section
  yPos = currentY + cellHeight + 15;

  // Check if we need a new page
  if (yPos > pageHeight - 60) {
    doc.addPage('landscape');
    yPos = 20;
  }

  // Monthly summary box
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(10, yPos, pageWidth / 2 - 15, 35, 3, 3, 'F');
  
  doc.setTextColor(34, 197, 94);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(language === 'en' ? 'Monthly Summary' : 'Monthly Summary', 15, yPos + 10);
  
  const totalScheduled = monthSchedules.length;
  const totalCompleted = monthSchedules.filter(s => s.completed).length;
  const totalStudyTime = monthSchedules.filter(s => s.duration).reduce((sum, s) => sum + (s.duration || 0), 0);
  
  doc.setTextColor(55, 65, 81);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`${language === 'en' ? 'Scheduled Activities' : 'Scheduled'}: ${totalScheduled}`, 15, yPos + 20);
  doc.text(`${language === 'en' ? 'Completed' : 'Completed'}: ${totalCompleted}`, 15, yPos + 28);
  doc.text(`${language === 'en' ? 'Total Study Time' : 'Study Time'}: ${Math.round(totalStudyTime / 60)} hours`, 100, yPos + 20);

  // Upcoming exams box
  doc.setFillColor(254, 243, 199);
  doc.roundedRect(pageWidth / 2 + 5, yPos, pageWidth / 2 - 15, 35, 3, 3, 'F');
  
  doc.setTextColor(194, 65, 12);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(language === 'en' ? 'Exams This Month' : 'Exams This Month', pageWidth / 2 + 10, yPos + 10);
  
  doc.setTextColor(55, 65, 81);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  
  if (monthExams.length === 0) {
    doc.text(language === 'en' ? 'No exams scheduled this month' : 'No exams', pageWidth / 2 + 10, yPos + 20);
  } else {
    monthExams.slice(0, 3).forEach((exam, idx) => {
      const examDate = format(parseISO(exam.date), 'MMM d');
      doc.text(`• ${exam.name} - ${examDate}`, pageWidth / 2 + 10, yPos + 18 + (idx * 6));
    });
  }

  yPos += 45;

  // Legend
  doc.setFillColor(249, 250, 251);
  doc.roundedRect(10, yPos, pageWidth - 20, 18, 3, 3, 'F');
  
  doc.setTextColor(55, 65, 81);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(language === 'en' ? 'Legend:' : 'Legend:', 15, yPos + 7);

  let legendX = 45;
  Object.entries(SCHEDULE_TYPE_COLORS).forEach(([type, color]) => {
    doc.setFillColor(color[0], color[1], color[2]);
    doc.circle(legendX, yPos + 5, 3, 'F');
    doc.setFont('helvetica', 'normal');
    const label = SCHEDULE_TYPE_LABELS[type][language];
    doc.text(label, legendX + 5, yPos + 7);
    legendX += 50;
  });

  // Exam indicator
  doc.setFillColor(239, 68, 68);
  doc.circle(legendX, yPos + 5, 3, 'F');
  doc.text(language === 'en' ? 'Exam Day' : 'Exam', legendX + 5, yPos + 7);

  yPos += 25;

  // Detailed schedule table
  if (monthSchedules.length > 0) {
    if (yPos > pageHeight - 50) {
      doc.addPage('landscape');
      yPos = 20;
    }

    doc.setTextColor(31, 41, 55);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(language === 'en' ? 'Detailed Schedule' : 'Detailed Schedule', 10, yPos);

    yPos += 5;

    const tableData = monthSchedules
      .sort((a, b) => a.date.localeCompare(b.date))
      .map(schedule => [
        format(parseISO(schedule.date), 'MMM d, EEE'),
        schedule.title,
        SCHEDULE_TYPE_LABELS[schedule.type][language],
        schedule.subject ? SUBJECT_LABELS[schedule.subject]?.[language] || schedule.subject : '-',
        schedule.duration ? `${schedule.duration} min` : '-',
        schedule.completed ? '✓' : '○'
      ]);

    autoTable(doc, {
      startY: yPos,
      head: [[
        language === 'en' ? 'Date' : 'Date',
        language === 'en' ? 'Activity' : 'Activity',
        language === 'en' ? 'Type' : 'Type',
        language === 'en' ? 'Subject' : 'Subject',
        language === 'en' ? 'Duration' : 'Duration',
        language === 'en' ? 'Status' : 'Status'
      ]],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [79, 70, 229] },
      styles: { fontSize: 8 },
      margin: { left: 10, right: 10 },
    });
  }

  // Footer
  const footerY = pageHeight - 8;
  doc.setFillColor(243, 244, 246);
  doc.rect(0, footerY - 5, pageWidth, 15, 'F');
  
  doc.setTextColor(107, 114, 128);
  doc.setFontSize(8);
  doc.text(
    `Generated by JKKN AI HORIZONS | ${format(new Date(), 'MMM d, yyyy HH:mm')}`,
    pageWidth / 2, footerY, { align: 'center' }
  );

  // Save
  const fileName = language === 'en'
    ? `Study_Planner_${format(month, 'yyyy-MM')}.pdf`
    : `படிப்பு_திட்டம்_${format(month, 'yyyy-MM')}.pdf`;
  
  doc.save(fileName);
};
