import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PYQExam, PYQQuestion, pyqCategories } from '@/data/pyq-database';

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable?: { finalY: number };
  }
}

interface ExamPDFData {
  exam: PYQExam;
  questions: PYQQuestion[];
  year?: number;
  session?: string;
}

const getCategoryColor = (category: string): [number, number, number] => {
  const colors: Record<string, [number, number, number]> = {
    engineering: [59, 130, 246],   // Blue
    medical: [16, 185, 129],       // Green
    management: [245, 158, 11],    // Orange
    law: [139, 92, 246],           // Purple
    civil_services: [234, 179, 8], // Gold
    banking: [6, 182, 212],        // Cyan
    teaching: [236, 72, 153],      // Pink
  };
  return colors[category] || [100, 100, 100];
};

const getCategoryName = (categoryId: string): string => {
  const category = pyqCategories.find(c => c.id === categoryId);
  return category?.name.en || categoryId;
};

export const generatePYQPDF = (data: ExamPDFData): void => {
  const { exam, questions, year, session } = data;
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const categoryColor = getCategoryColor(exam.category);
  
  let currentPage = 1;

  // Helper function to add watermark
  const addWatermark = () => {
    doc.setTextColor(230, 230, 230);
    doc.setFontSize(40);
    doc.setFont('helvetica', 'bold');
    doc.text('JKKN', pageWidth / 2, pageHeight / 2, { 
      align: 'center', 
      angle: 45 
    });
    doc.setTextColor(0, 0, 0);
  };

  // Helper function to add footer
  const addFooter = () => {
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Page ${currentPage} | VAZHIKATTI - Career Dictionary | www.vazhikatti.com`,
      pageWidth / 2,
      pageHeight - 8,
      { align: 'center' }
    );
    doc.setTextColor(0, 0, 0);
  };

  // Helper function to add new page
  const addNewPage = () => {
    doc.addPage();
    currentPage++;
    addWatermark();
    addFooter();
  };

  // ============= COVER PAGE =============
  addWatermark();
  
  // Header banner
  doc.setFillColor(categoryColor[0], categoryColor[1], categoryColor[2]);
  doc.rect(0, 0, pageWidth, 70, 'F');
  
  // Decorative circles (simplified without opacity)
  doc.setFillColor(
    Math.min(255, categoryColor[0] + 40), 
    Math.min(255, categoryColor[1] + 40), 
    Math.min(255, categoryColor[2] + 40)
  );
  doc.circle(pageWidth - 30, 20, 40, 'F');
  doc.circle(30, 50, 25, 'F');
  
  // Logo area
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(pageWidth / 2 - 50, 15, 100, 20, 3, 3, 'F');
  
  doc.setTextColor(categoryColor[0], categoryColor[1], categoryColor[2]);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('VAZHIKATTI', pageWidth / 2, 28, { align: 'center' });
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text('Career Dictionary - Previous Year Questions', pageWidth / 2, 50, { align: 'center' });
  doc.setFontSize(10);
  doc.text('Practice Makes Perfect', pageWidth / 2, 62, { align: 'center' });
  
  // Exam name box
  doc.setTextColor(0, 0, 0);
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(margin, 85, pageWidth - margin * 2, 50, 5, 5, 'F');
  
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text(exam.name.en, pageWidth / 2, 110, { align: 'center' });
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  const sessionText = year ? `${year}${session ? ` - ${session}` : ''}` : 'All Years';
  doc.text(sessionText, pageWidth / 2, 125, { align: 'center' });
  
  // Exam details grid
  let yPos = 155;
  
  const examDetails = [
    ['Subjects Covered', exam.subjects.join(' | ')],
    ['Total Questions', questions.length.toString()],
    ['Total Marks', exam.totalMarks.toString()],
    ['Duration', `${exam.duration} Minutes`],
    ['Difficulty Level', exam.difficultyLevel],
    ['Category', getCategoryName(exam.category)],
  ];
  
  doc.setFillColor(categoryColor[0], categoryColor[1], categoryColor[2]);
  doc.rect(margin, yPos - 8, pageWidth - margin * 2, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('EXAM INFORMATION', pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 15;
  doc.setTextColor(0, 0, 0);
  
  examDetails.forEach(([label, value]) => {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`${label}:`, margin + 5, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(value, margin + 55, yPos);
    yPos += 10;
  });
  
  // Additional info box
  yPos += 10;
  doc.setFillColor(250, 250, 250);
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, 40, 3, 3, 'F');
  doc.setDrawColor(200, 200, 200);
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, 40, 3, 3, 'S');
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Conducted By:', margin + 5, yPos + 12);
  doc.setFont('helvetica', 'normal');
  doc.text(exam.conductedBy, margin + 45, yPos + 12);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Eligibility:', margin + 5, yPos + 22);
  doc.setFont('helvetica', 'normal');
  const eligText = doc.splitTextToSize(exam.eligibility, pageWidth - margin * 2 - 50);
  doc.text(eligText, margin + 45, yPos + 22);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Website:', margin + 5, yPos + 34);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(categoryColor[0], categoryColor[1], categoryColor[2]);
  doc.text(exam.officialWebsite, margin + 45, yPos + 34);
  doc.setTextColor(0, 0, 0);
  
  // Download info
  yPos = pageHeight - 40;
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(`Downloaded on: ${new Date().toLocaleDateString('en-IN', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  })}`, pageWidth / 2, yPos, { align: 'center' });
  doc.text('www.jkkn-aihorizons.com | Career Dictionary', pageWidth / 2, yPos + 10, { align: 'center' });
  
  addFooter();

  // ============= EXAM PATTERN PAGE =============
  addNewPage();
  
  yPos = margin;
  
  // Header
  doc.setFillColor(categoryColor[0], categoryColor[1], categoryColor[2]);
  doc.rect(0, 0, pageWidth, 25, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('EXAM PATTERN & INSTRUCTIONS', pageWidth / 2, 16, { align: 'center' });
  
  yPos = 40;
  doc.setTextColor(0, 0, 0);
  
  // Marking Scheme
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Marking Scheme', margin, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const markingInfo = [
    '• Correct Answer: +4 marks',
    '• Wrong Answer: -1 mark (MCQ), 0 marks (Numerical)',
    '• Unattempted: 0 marks',
  ];
  markingInfo.forEach(info => {
    doc.text(info, margin + 5, yPos);
    yPos += 7;
  });
  
  yPos += 8;
  doc.setFont('helvetica', 'bold');
  doc.text('Question Distribution by Subject', margin, yPos);
  yPos += 8;
  
  // Subject distribution table
  const subjectCounts: Record<string, number> = {};
  questions.forEach(q => {
    subjectCounts[q.subject] = (subjectCounts[q.subject] || 0) + 1;
  });
  
  const subjectData = Object.entries(subjectCounts).map(([subject, count]) => [
    subject,
    count.toString(),
    (count * 4).toString(),
  ]);
  
  autoTable(doc, {
    startY: yPos,
    head: [['Subject', 'Questions', 'Max Marks']],
    body: subjectData,
    theme: 'grid',
    headStyles: { 
      fillColor: categoryColor,
      fontSize: 10,
    },
    styles: { fontSize: 9 },
    margin: { left: margin, right: margin },
  });
  
  yPos = doc.lastAutoTable?.finalY || yPos + 40;
  yPos += 15;
  
  // Difficulty Distribution
  doc.setFont('helvetica', 'bold');
  doc.text('Difficulty Distribution', margin, yPos);
  yPos += 8;
  
  const diffCounts: Record<string, number> = { Easy: 0, Moderate: 0, Hard: 0 };
  questions.forEach(q => {
    diffCounts[q.difficulty] = (diffCounts[q.difficulty] || 0) + 1;
  });
  
  const diffData = Object.entries(diffCounts).map(([diff, count]) => [
    diff,
    count.toString(),
    `${Math.round((count / questions.length) * 100)}%`,
  ]);
  
  autoTable(doc, {
    startY: yPos,
    head: [['Difficulty', 'Questions', 'Percentage']],
    body: diffData,
    theme: 'grid',
    headStyles: { 
      fillColor: categoryColor,
      fontSize: 10,
    },
    styles: { fontSize: 9 },
    margin: { left: margin, right: margin },
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: 40 },
      2: { cellWidth: 40 },
    },
  });
  
  yPos = doc.lastAutoTable?.finalY || yPos + 40;
  yPos += 15;
  
  // Important Instructions
  doc.setFont('helvetica', 'bold');
  doc.text('Important Instructions', margin, yPos);
  yPos += 8;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const instructions = [
    '1. Read each question carefully before answering.',
    '2. There is negative marking for wrong answers in MCQ questions.',
    '3. For numerical answer type questions, enter the value correct to 2 decimal places.',
    '4. Use rough sheets for calculations - do not mark on the question paper.',
    '5. Manage your time wisely - allocate approximately 2 minutes per question.',
    '6. Attempt easier questions first to secure marks.',
    '7. Do not spend too much time on a single difficult question.',
    '8. Review your answers if time permits.',
  ];
  
  instructions.forEach(inst => {
    doc.text(inst, margin + 5, yPos);
    yPos += 6;
  });

  // ============= QUESTIONS PAGES =============
  // Group questions by subject
  const questionsBySubject: Record<string, PYQQuestion[]> = {};
  questions.forEach(q => {
    if (!questionsBySubject[q.subject]) {
      questionsBySubject[q.subject] = [];
    }
    questionsBySubject[q.subject].push(q);
  });
  
  let globalQuestionNumber = 1;
  
  Object.entries(questionsBySubject).forEach(([subject, subjectQuestions]) => {
    addNewPage();
    yPos = margin;
    
    // Subject header
    doc.setFillColor(categoryColor[0], categoryColor[1], categoryColor[2]);
    doc.rect(0, 0, pageWidth, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(`${subject.toUpperCase()} - ${subjectQuestions.length} Questions`, pageWidth / 2, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`Marks: ${subjectQuestions.length * 4} | Time: ~${subjectQuestions.length * 2} mins`, pageWidth / 2, 25, { align: 'center' });
    
    yPos = 40;
    doc.setTextColor(0, 0, 0);
    
    subjectQuestions.forEach((question, idx) => {
      // Check if need new page
      if (yPos > pageHeight - 80) {
        addNewPage();
        yPos = margin + 10;
      }
      
      // Question header bar
      doc.setFillColor(245, 245, 245);
      doc.rect(margin, yPos, pageWidth - margin * 2, 10, 'F');
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(categoryColor[0], categoryColor[1], categoryColor[2]);
      doc.text(`Q.${globalQuestionNumber}`, margin + 3, yPos + 7);
      
      doc.setTextColor(80, 80, 80);
      doc.setFont('helvetica', 'normal');
      doc.text(`[${question.topic}]`, margin + 20, yPos + 7);
      
      // Difficulty badge
      const diffColors: Record<string, [number, number, number]> = {
        'Easy': [16, 185, 129],
        'Moderate': [245, 158, 11],
        'Hard': [239, 68, 68],
      };
      const diffColor = diffColors[question.difficulty] || [100, 100, 100];
      doc.setTextColor(diffColor[0], diffColor[1], diffColor[2]);
      doc.text(`[${question.difficulty}]`, margin + 80, yPos + 7);
      
      doc.setTextColor(80, 80, 80);
      doc.text(`[${question.marks} Marks]`, pageWidth - margin - 25, yPos + 7);
      
      yPos += 15;
      
      // Question text
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const questionLines = doc.splitTextToSize(question.question.en, pageWidth - margin * 2 - 10);
      doc.text(questionLines, margin + 5, yPos);
      yPos += questionLines.length * 5 + 5;
      
      // Options
      question.options.en.forEach((option) => {
        if (yPos > pageHeight - 30) {
          addNewPage();
          yPos = margin + 10;
        }
        
        const isCorrect = option.id === question.correctAnswer;
        
        if (isCorrect) {
          doc.setFillColor(220, 252, 231);
          doc.rect(margin + 5, yPos - 4, pageWidth - margin * 2 - 10, 7, 'F');
          doc.setTextColor(22, 163, 74);
        } else {
          doc.setTextColor(60, 60, 60);
        }
        
        doc.setFontSize(9);
        const optionText = `(${option.id}) ${option.text}${isCorrect ? ' ✓' : ''}`;
        doc.text(optionText, margin + 10, yPos);
        yPos += 7;
      });
      
      yPos += 3;
      
      // Answer and Solution
      doc.setFillColor(254, 249, 195);
      doc.rect(margin + 5, yPos, pageWidth - margin * 2 - 10, 8, 'F');
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(161, 98, 7);
      doc.text(`Answer: (${question.correctAnswer})`, margin + 10, yPos + 5);
      yPos += 12;
      
      // Solution
      doc.setFillColor(250, 250, 250);
      const solutionLines = doc.splitTextToSize(`Solution: ${question.solution.en}`, pageWidth - margin * 2 - 20);
      const solutionHeight = solutionLines.length * 4 + 6;
      doc.rect(margin + 5, yPos, pageWidth - margin * 2 - 10, solutionHeight, 'F');
      doc.setDrawColor(200, 200, 200);
      doc.rect(margin + 5, yPos, pageWidth - margin * 2 - 10, solutionHeight, 'S');
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(80, 80, 80);
      doc.setFontSize(8);
      doc.text(solutionLines, margin + 10, yPos + 5);
      yPos += solutionHeight + 10;
      
      // Separator line
      if (idx < subjectQuestions.length - 1) {
        doc.setDrawColor(220, 220, 220);
        doc.setLineWidth(0.3);
        doc.line(margin + 20, yPos - 3, pageWidth - margin - 20, yPos - 3);
      }
      
      globalQuestionNumber++;
    });
  });

  // ============= ANSWER KEY PAGE =============
  addNewPage();
  
  doc.setFillColor(categoryColor[0], categoryColor[1], categoryColor[2]);
  doc.rect(0, 0, pageWidth, 25, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('ANSWER KEY - Quick Reference', pageWidth / 2, 16, { align: 'center' });
  
  // Create answer key table data
  const answerKeyData = questions.map((q, idx) => [
    (idx + 1).toString(),
    q.subject,
    q.correctAnswer,
    q.difficulty,
    q.topic,
  ]);
  
  autoTable(doc, {
    startY: 35,
    head: [['Q#', 'Subject', 'Ans', 'Difficulty', 'Topic']],
    body: answerKeyData,
    theme: 'striped',
    headStyles: { 
      fillColor: categoryColor,
      fontSize: 9,
      fontStyle: 'bold',
    },
    styles: { 
      fontSize: 8,
      cellPadding: 2,
    },
    columnStyles: {
      0: { cellWidth: 15, halign: 'center' },
      1: { cellWidth: 35 },
      2: { cellWidth: 15, halign: 'center', fontStyle: 'bold' },
      3: { cellWidth: 25 },
      4: { cellWidth: 70 },
    },
    margin: { left: margin, right: margin },
    didParseCell: function(data) {
      if (data.column.index === 2 && data.section === 'body') {
        data.cell.styles.textColor = [22, 163, 74];
      }
    },
  });

  // ============= PERFORMANCE ANALYSIS TEMPLATE =============
  addNewPage();
  
  doc.setFillColor(categoryColor[0], categoryColor[1], categoryColor[2]);
  doc.rect(0, 0, pageWidth, 25, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('SELF-ASSESSMENT SCORECARD', pageWidth / 2, 16, { align: 'center' });
  
  yPos = 40;
  doc.setTextColor(0, 0, 0);
  
  // Personal Info Section
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Student Information', margin, yPos);
  yPos += 8;
  
  doc.setFont('helvetica', 'normal');
  doc.setDrawColor(180, 180, 180);
  doc.line(margin + 25, yPos + 3, pageWidth - margin, yPos + 3);
  doc.text('Name:', margin, yPos);
  yPos += 10;
  doc.line(margin + 25, yPos + 3, pageWidth / 2 - 10, yPos + 3);
  doc.text('Date:', margin, yPos);
  doc.line(pageWidth / 2 + 25, yPos + 3, pageWidth - margin, yPos + 3);
  doc.text('Time Taken:', pageWidth / 2, yPos);
  
  yPos += 20;
  
  // Score Card
  doc.setFont('helvetica', 'bold');
  doc.text('Subject-wise Performance', margin, yPos);
  yPos += 8;
  
  const subjects = Object.keys(questionsBySubject);
  const scoreCardData = subjects.map(subject => {
    const count = questionsBySubject[subject].length;
    return [subject, count.toString(), '', '', `${count * 4}`, ''];
  });
  scoreCardData.push(['Total', questions.length.toString(), '', '', `${questions.length * 4}`, '']);
  
  autoTable(doc, {
    startY: yPos,
    head: [['Subject', 'Total Q', 'Attempted', 'Correct', 'Max Marks', 'Your Score']],
    body: scoreCardData,
    theme: 'grid',
    headStyles: { 
      fillColor: categoryColor,
      fontSize: 9,
    },
    styles: { 
      fontSize: 9,
      cellPadding: 3,
    },
    margin: { left: margin, right: margin },
  });
  
  yPos = doc.lastAutoTable?.finalY || yPos + 60;
  yPos += 15;
  
  // Performance Analysis
  doc.setFont('helvetica', 'bold');
  doc.text('Performance Analysis', margin, yPos);
  yPos += 10;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  
  const analysisItems = [
    'Overall Accuracy: _______ %',
    'Time per Question: _______ seconds',
    'Strongest Subject: _____________',
    'Weakest Subject: _____________',
    'Topics to Revise: _____________',
  ];
  
  analysisItems.forEach(item => {
    doc.text(`• ${item}`, margin + 5, yPos);
    yPos += 8;
  });
  
  yPos += 10;
  
  // Tips Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Time Management Tips', margin, yPos);
  yPos += 8;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  
  const tips = [
    '1. Allocate 2-3 minutes per MCQ question',
    '2. Attempt easy questions first to build confidence',
    '3. Mark difficult questions for review and move on',
    '4. Keep 10-15 minutes for revision at the end',
    '5. Practice with timer to improve speed',
  ];
  
  tips.forEach(tip => {
    doc.text(tip, margin + 5, yPos);
    yPos += 6;
  });
  
  // Final footer on all pages
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Page ${i} of ${totalPages} | VAZHIKATTI - Career Dictionary | www.vazhikatti.com`,
      pageWidth / 2,
      pageHeight - 8,
      { align: 'center' }
    );
  }

  // Save the PDF
  const fileName = `${exam.name.en.replace(/\s+/g, '_')}_${year || 'All_Years'}_PYQ.pdf`;
  doc.save(fileName);
};

export default generatePYQPDF;
