import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PYQQuestion, pyqExams, pyqCategories } from '@/data/pyq-database';

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable?: { finalY: number };
  }
}

interface BookmarkedPDFData {
  questions: PYQQuestion[];
}

const getCategoryColor = (category: string): [number, number, number] => {
  const colors: Record<string, [number, number, number]> = {
    engineering: [59, 130, 246],
    medical: [16, 185, 129],
    management: [245, 158, 11],
    law: [139, 92, 246],
    civil_services: [234, 179, 8],
    banking: [6, 182, 212],
    teaching: [236, 72, 153],
  };
  return colors[category] || [100, 100, 100];
};

export const generateBookmarkedPDF = (data: BookmarkedPDFData): void => {
  const { questions } = data;
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const primaryColor: [number, number, number] = [220, 38, 127]; // Rose color for bookmarks
  
  let currentPage = 1;

  // Helper function to add watermark
  const addWatermark = () => {
    doc.setTextColor(240, 240, 240);
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
      `Page ${currentPage} | VAZHIKATTI - Bookmarked Questions | www.vazhikatti.com`,
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
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, pageWidth, 70, 'F');
  
  // Decorative circles
  doc.setFillColor(255, 100, 150);
  doc.circle(pageWidth - 30, 20, 40, 'F');
  doc.circle(30, 50, 25, 'F');
  
  // Logo area
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(pageWidth / 2 - 50, 15, 100, 20, 3, 3, 'F');
  
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('VAZHIKATTI', pageWidth / 2, 28, { align: 'center' });
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text('Career Dictionary - Bookmarked Questions', pageWidth / 2, 50, { align: 'center' });
  doc.setFontSize(10);
  doc.text('Your Personal Revision Collection', pageWidth / 2, 62, { align: 'center' });
  
  // Title box
  doc.setTextColor(0, 0, 0);
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(margin, 85, pageWidth - margin * 2, 40, 5, 5, 'F');
  
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('📌 Bookmarked Questions', pageWidth / 2, 105, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  doc.text('For Revision & Quick Reference', pageWidth / 2, 118, { align: 'center' });
  
  // Stats section
  let yPos = 145;
  
  // Group questions by exam
  const questionsByExam: Record<string, PYQQuestion[]> = {};
  questions.forEach(q => {
    if (!questionsByExam[q.examId]) {
      questionsByExam[q.examId] = [];
    }
    questionsByExam[q.examId].push(q);
  });
  
  // Group by subject
  const questionsBySubject: Record<string, number> = {};
  questions.forEach(q => {
    questionsBySubject[q.subject] = (questionsBySubject[q.subject] || 0) + 1;
  });
  
  // Group by difficulty
  const difficultyCount = { Easy: 0, Moderate: 0, Hard: 0 };
  questions.forEach(q => {
    difficultyCount[q.difficulty as keyof typeof difficultyCount]++;
  });
  
  // Summary header
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(margin, yPos - 8, pageWidth - margin * 2, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('SUMMARY', pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 15;
  doc.setTextColor(0, 0, 0);
  
  const summaryData = [
    ['Total Bookmarked Questions', questions.length.toString()],
    ['Exams Covered', Object.keys(questionsByExam).length.toString()],
    ['Subjects Covered', Object.keys(questionsBySubject).length.toString()],
    ['Easy Questions', difficultyCount.Easy.toString()],
    ['Moderate Questions', difficultyCount.Moderate.toString()],
    ['Hard Questions', difficultyCount.Hard.toString()],
  ];
  
  summaryData.forEach(([label, value]) => {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`${label}:`, margin + 5, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(value, margin + 70, yPos);
    yPos += 9;
  });
  
  // Exam breakdown
  yPos += 10;
  doc.setFont('helvetica', 'bold');
  doc.text('Questions by Exam:', margin + 5, yPos);
  yPos += 8;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  Object.entries(questionsByExam).forEach(([examId, examQuestions]) => {
    const exam = pyqExams.find(e => e.id === examId);
    const examName = exam?.name.en || examId;
    doc.text(`• ${examName}: ${examQuestions.length} questions`, margin + 10, yPos);
    yPos += 6;
  });
  
  // Download info
  yPos = pageHeight - 40;
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}`, pageWidth / 2, yPos, { align: 'center' });
  doc.text('www.jkkn-aihorizons.com | Career Dictionary', pageWidth / 2, yPos + 10, { align: 'center' });
  
  addFooter();

  // ============= QUESTIONS PAGES =============
  let globalQuestionNumber = 1;
  
  // Group questions by exam for better organization
  Object.entries(questionsByExam).forEach(([examId, examQuestions]) => {
    const exam = pyqExams.find(e => e.id === examId);
    const categoryColor = exam ? getCategoryColor(exam.category) : [100, 100, 100] as [number, number, number];
    
    addNewPage();
    yPos = margin;
    
    // Exam header
    doc.setFillColor(categoryColor[0], categoryColor[1], categoryColor[2]);
    doc.rect(0, 0, pageWidth, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(`${exam?.name.en || examId} - ${examQuestions.length} Bookmarked`, pageWidth / 2, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.text('📌 Marked for Revision', pageWidth / 2, 25, { align: 'center' });
    
    yPos = 40;
    doc.setTextColor(0, 0, 0);
    
    examQuestions.forEach((question, idx) => {
      // Check if need new page
      if (yPos > pageHeight - 80) {
        addNewPage();
        yPos = margin + 10;
      }
      
      // Question header bar
      doc.setFillColor(254, 242, 242);
      doc.rect(margin, yPos, pageWidth - margin * 2, 10, 'F');
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(`Q.${globalQuestionNumber} 📌`, margin + 3, yPos + 7);
      
      doc.setTextColor(80, 80, 80);
      doc.setFont('helvetica', 'normal');
      doc.text(`[${question.subject}]`, margin + 25, yPos + 7);
      doc.text(`[${question.topic}]`, margin + 60, yPos + 7);
      
      // Year badge
      doc.setTextColor(100, 100, 100);
      doc.text(`[${question.year}]`, margin + 120, yPos + 7);
      
      // Difficulty badge
      const diffColors: Record<string, [number, number, number]> = {
        'Easy': [16, 185, 129],
        'Moderate': [245, 158, 11],
        'Hard': [239, 68, 68],
      };
      const diffColor = diffColors[question.difficulty] || [100, 100, 100];
      doc.setTextColor(diffColor[0], diffColor[1], diffColor[2]);
      doc.text(`[${question.difficulty}]`, pageWidth - margin - 25, yPos + 7);
      
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
      if (idx < examQuestions.length - 1) {
        doc.setDrawColor(255, 200, 200);
        doc.setLineWidth(0.5);
        doc.line(margin + 20, yPos - 3, pageWidth - margin - 20, yPos - 3);
      }
      
      globalQuestionNumber++;
    });
  });

  // ============= QUICK REFERENCE PAGE =============
  addNewPage();
  
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, pageWidth, 25, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('📌 QUICK ANSWER REFERENCE', pageWidth / 2, 16, { align: 'center' });
  
  // Create answer reference table
  const answerData = questions.map((q, idx) => {
    const exam = pyqExams.find(e => e.id === q.examId);
    return [
      (idx + 1).toString(),
      exam?.name.en.substring(0, 15) || q.examId,
      q.year.toString(),
      q.subject,
      q.correctAnswer,
      q.difficulty,
    ];
  });
  
  autoTable(doc, {
    startY: 35,
    head: [['#', 'Exam', 'Year', 'Subject', 'Ans', 'Level']],
    body: answerData,
    theme: 'striped',
    headStyles: { 
      fillColor: primaryColor,
      fontSize: 9,
      fontStyle: 'bold',
    },
    styles: { 
      fontSize: 8,
      cellPadding: 2,
    },
    columnStyles: {
      0: { cellWidth: 12, halign: 'center' },
      1: { cellWidth: 35 },
      2: { cellWidth: 18, halign: 'center' },
      3: { cellWidth: 35 },
      4: { cellWidth: 15, halign: 'center', fontStyle: 'bold' },
      5: { cellWidth: 25 },
    },
    margin: { left: margin, right: margin },
    didParseCell: function(data) {
      if (data.column.index === 4 && data.section === 'body') {
        data.cell.styles.textColor = [22, 163, 74];
      }
    },
  });

  // Final footer on all pages
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Page ${i} of ${totalPages} | VAZHIKATTI - Bookmarked Questions | www.vazhikatti.com`,
      pageWidth / 2,
      pageHeight - 8,
      { align: 'center' }
    );
  }

  // Save the PDF
  const fileName = `Bookmarked_Questions_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};

export default generateBookmarkedPDF;
