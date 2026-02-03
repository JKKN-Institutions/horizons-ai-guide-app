import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Exam, Category, Question } from '@/data/government-exams-data';

interface PDFOptions {
  type: 'syllabus' | 'pyq';
  exam: Exam;
  category: Category;
  language?: 'en' | 'ta';
}

export const generateGovtExamPDF = async (options: PDFOptions): Promise<void> => {
  const { type, exam, category, language = 'en' } = options;
  const doc = new jsPDF();
  
  // Colors based on category
  const categoryColors: Record<string, { r: number; g: number; b: number }> = {
    defence: { r: 245, g: 158, b: 11 },
    railway: { r: 239, g: 68, b: 68 },
    ssc: { r: 59, g: 130, b: 246 },
    banking: { r: 16, g: 185, b: 129 },
    state: { r: 20, g: 184, b: 166 },
    central: { r: 139, g: 92, b: 246 }
  };
  
  const color = categoryColors[category.id] || { r: 59, g: 130, b: 246 };
  
  // Header
  doc.setFillColor(color.r, color.g, color.b);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('VAZHIKATTI', 105, 18, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`${type === 'syllabus' ? 'Syllabus' : 'Previous Year Questions'}`, 105, 28, { align: 'center' });
  doc.text(language === 'ta' ? exam.nameTamil : exam.name, 105, 36, { align: 'center' });
  
  let yPos = 50;
  
  if (type === 'syllabus') {
    // Exam Overview
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Exam Overview', 14, yPos);
    yPos += 8;
    
    const overviewData = [
      ['Qualification', language === 'ta' ? exam.qualificationTamil : exam.qualification],
      ['Age Limit', exam.age],
      ['Salary', exam.salary],
      ['Selection Process', language === 'ta' ? exam.selectionProcessTamil : exam.selectionProcess]
    ];
    
    autoTable(doc, {
      startY: yPos,
      head: [],
      body: overviewData,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 4 },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 50 },
        1: { cellWidth: 130 }
      }
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 15;
    
    // Syllabus Content
    Object.entries(exam.syllabus).forEach(([key, sections]) => {
      sections.forEach((section) => {
        if (yPos > 260) {
          doc.addPage();
          yPos = 20;
        }
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(color.r, color.g, color.b);
        doc.text(language === 'ta' ? section.nameTamil : section.name, 14, yPos);
        yPos += 8;
        
        section.topics.forEach((topic) => {
          if (yPos > 270) {
            doc.addPage();
            yPos = 20;
          }
          
          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(0, 0, 0);
          doc.text(`• ${language === 'ta' ? topic.nameTamil : topic.name}`, 18, yPos);
          yPos += 6;
          
          doc.setFontSize(9);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(80, 80, 80);
          
          const subtopicsText = topic.subtopics.join(', ');
          const lines = doc.splitTextToSize(subtopicsText, 170);
          lines.forEach((line: string) => {
            if (yPos > 280) {
              doc.addPage();
              yPos = 20;
            }
            doc.text(line, 24, yPos);
            yPos += 5;
          });
          yPos += 3;
        });
        yPos += 5;
      });
    });
    
    // Exam Pattern if available
    if (exam.examPattern && exam.examPattern.length > 0) {
      if (yPos > 220) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('Exam Pattern', 14, yPos);
      yPos += 8;
      
      const patternData = exam.examPattern.map(p => [
        language === 'ta' ? p.paperTamil : p.paper,
        p.marks.toString(),
        p.duration,
        p.questions.toString()
      ]);
      
      autoTable(doc, {
        startY: yPos,
        head: [['Paper', 'Marks', 'Duration', 'Questions']],
        body: patternData,
        theme: 'striped',
        headStyles: { fillColor: [color.r, color.g, color.b] }
      });
    }
  } else {
    // PYQ Content
    if (exam.pyq.length === 0) {
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(12);
      doc.text('No previous year questions available yet.', 105, yPos, { align: 'center' });
    } else {
      const groupedQuestions = exam.pyq.reduce((acc, q) => {
        if (!acc[q.subject]) acc[q.subject] = [];
        acc[q.subject].push(q);
        return acc;
      }, {} as Record<string, Question[]>);
      
      Object.entries(groupedQuestions).forEach(([subject, questions]) => {
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }
        
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(color.r, color.g, color.b);
        doc.text(`${subject} (${questions.length} Questions)`, 14, yPos);
        yPos += 10;
        
        questions.forEach((q, idx) => {
          if (yPos > 250) {
            doc.addPage();
            yPos = 20;
          }
          
          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(0, 0, 0);
          
          const questionText = `Q${idx + 1}. ${language === 'ta' && q.questionTamil ? q.questionTamil : q.question}`;
          const questionLines = doc.splitTextToSize(questionText, 180);
          questionLines.forEach((line: string) => {
            doc.text(line, 14, yPos);
            yPos += 5;
          });
          
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9);
          q.options.forEach((opt, oIdx) => {
            const optionText = `${String.fromCharCode(65 + oIdx)}) ${opt}`;
            if (oIdx === q.answer) {
              doc.setTextColor(16, 185, 129);
              doc.setFont('helvetica', 'bold');
            } else {
              doc.setTextColor(60, 60, 60);
              doc.setFont('helvetica', 'normal');
            }
            doc.text(optionText, 18, yPos);
            yPos += 5;
          });
          
          doc.setTextColor(59, 130, 246);
          doc.setFont('helvetica', 'italic');
          doc.setFontSize(8);
          const expLines = doc.splitTextToSize(`Explanation: ${q.explanation}`, 175);
          expLines.forEach((line: string) => {
            if (yPos > 280) {
              doc.addPage();
              yPos = 20;
            }
            doc.text(line, 18, yPos);
            yPos += 4;
          });
          
          yPos += 8;
        });
      });
    }
  }
  
  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });
    doc.text('Generated by VAZHIKATTI', 14, 290);
    doc.text(new Date().toLocaleDateString(), 196, 290, { align: 'right' });
  }
  
  const fileName = `${exam.id}-${type}-${language}.pdf`;
  doc.save(fileName);
};
