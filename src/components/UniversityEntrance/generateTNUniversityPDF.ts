import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PreviousQuestion, Course, University } from '@/data/university-entrance-data';

interface PDFOptions {
  includeAnswers: boolean;
  includeExplanations: boolean;
}

export const generatePYQPDF = (
  university: University,
  course: Course,
  questions: PreviousQuestion[],
  options: PDFOptions = { includeAnswers: true, includeExplanations: true }
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  let yPos = 20;

  // Header with university branding
  doc.setFillColor(106, 13, 173); // Purple theme
  doc.rect(0, 0, pageWidth, 45, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('TN University Entrance Exams', pageWidth / 2, 18, { align: 'center' });

  doc.setFontSize(16);
  doc.text(`${university.name} - ${course.name}`, pageWidth / 2, 30, { align: 'center' });

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Previous Year Questions', pageWidth / 2, 40, { align: 'center' });

  yPos = 55;

  // Exam Info Box
  doc.setFillColor(245, 245, 250);
  doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 25, 3, 3, 'F');

  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);
  doc.text(`Exam: ${university.examName}`, margin + 5, yPos + 8);
  doc.text(`Total Questions: ${questions.length}`, margin + 5, yPos + 16);
  doc.text(`Pattern: ${course.examPattern.totalQuestions} Qs | ${course.examPattern.duration}`, pageWidth - margin - 5, yPos + 8, { align: 'right' });
  doc.text(`Mode: ${course.examPattern.mode}`, pageWidth - margin - 5, yPos + 16, { align: 'right' });

  yPos = 90;

  // Questions
  questions.forEach((q, index) => {
    // Check if we need a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    // Question number and difficulty badge
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(106, 13, 173);
    doc.text(`Q${index + 1}.`, margin, yPos);

    // Difficulty badge
    const diffColors: Record<string, [number, number, number]> = {
      'Easy': [34, 197, 94],
      'Medium': [245, 158, 11],
      'Hard': [239, 68, 68]
    };
    const [r, g, b] = diffColors[q.difficulty] || [107, 114, 128];
    doc.setFillColor(r, g, b);
    doc.roundedRect(pageWidth - margin - 20, yPos - 5, 20, 7, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7);
    doc.text(q.difficulty, pageWidth - margin - 10, yPos - 0.5, { align: 'center' });

    // Topic badge
    doc.setFillColor(229, 231, 235);
    doc.roundedRect(pageWidth - margin - 50, yPos - 5, 28, 7, 2, 2, 'F');
    doc.setTextColor(75, 85, 99);
    doc.setFontSize(6);
    const topicText = q.topic.length > 12 ? q.topic.substring(0, 12) + '..' : q.topic;
    doc.text(topicText, pageWidth - margin - 36, yPos - 0.5, { align: 'center' });

    yPos += 8;

    // Question text
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const questionLines = doc.splitTextToSize(q.question, pageWidth - 2 * margin - 10);
    doc.text(questionLines, margin + 5, yPos);
    yPos += questionLines.length * 5 + 3;

    // Options
    q.options.forEach((opt, optIdx) => {
      const prefix = `(${String.fromCharCode(97 + optIdx)}) `;
      const isCorrect = options.includeAnswers && optIdx === q.correctAnswer;
      
      if (isCorrect) {
        doc.setTextColor(22, 163, 74);
        doc.setFont('helvetica', 'bold');
      } else {
        doc.setTextColor(60, 60, 60);
        doc.setFont('helvetica', 'normal');
      }

      const optText = prefix + opt;
      const optLines = doc.splitTextToSize(optText, pageWidth - 2 * margin - 15);
      doc.text(optLines, margin + 10, yPos);
      yPos += optLines.length * 5;
    });

    // Answer and Explanation
    if (options.includeAnswers) {
      yPos += 3;
      doc.setFillColor(236, 253, 245);
      doc.roundedRect(margin + 5, yPos - 3, pageWidth - 2 * margin - 10, options.includeExplanations ? 20 : 10, 2, 2, 'F');
      
      doc.setTextColor(22, 101, 52);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(`Answer: (${String.fromCharCode(97 + q.correctAnswer)}) ${q.options[q.correctAnswer]}`, margin + 8, yPos + 3);

      if (options.includeExplanations) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        const explLines = doc.splitTextToSize(`Explanation: ${q.explanation}`, pageWidth - 2 * margin - 20);
        doc.text(explLines.slice(0, 2), margin + 8, yPos + 10);
        yPos += 15;
      } else {
        yPos += 8;
      }
    }

    yPos += 10;
  });

  // Footer on last page
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Page ${i} of ${pageCount} | Generated on ${new Date().toLocaleDateString()}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  // Save the PDF
  const fileName = `${university.examName}_${course.name}_PYQ.pdf`;
  doc.save(fileName);
};

export const generateBookmarkedPDF = (
  bookmarks: Array<{
    id: string;
    universityName: string;
    courseName: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    topic: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
  }>
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  let yPos = 20;

  // Header
  doc.setFillColor(106, 13, 173);
  doc.rect(0, 0, pageWidth, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('TN University Entrance Exams', pageWidth / 2, 16, { align: 'center' });

  doc.setFontSize(14);
  doc.text('Bookmarked Questions for Revision', pageWidth / 2, 28, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`${bookmarks.length} Questions Saved`, pageWidth / 2, 36, { align: 'center' });

  yPos = 50;

  // Questions
  bookmarks.forEach((q, index) => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    // Question header
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(106, 13, 173);
    doc.text(`Q${index + 1}. [${q.universityName} - ${q.courseName}]`, margin, yPos);
    yPos += 7;

    // Question text
    doc.setTextColor(30, 30, 30);
    doc.setFont('helvetica', 'normal');
    const questionLines = doc.splitTextToSize(q.question, pageWidth - 2 * margin);
    doc.text(questionLines, margin, yPos);
    yPos += questionLines.length * 5 + 3;

    // Options
    q.options.forEach((opt, optIdx) => {
      const isCorrect = optIdx === q.correctAnswer;
      if (isCorrect) {
        doc.setTextColor(22, 163, 74);
        doc.setFont('helvetica', 'bold');
      } else {
        doc.setTextColor(60, 60, 60);
        doc.setFont('helvetica', 'normal');
      }
      doc.text(`(${String.fromCharCode(97 + optIdx)}) ${opt}`, margin + 5, yPos);
      yPos += 5;
    });

    // Explanation
    yPos += 2;
    doc.setFillColor(236, 253, 245);
    doc.roundedRect(margin, yPos - 3, pageWidth - 2 * margin, 12, 2, 2, 'F');
    doc.setTextColor(22, 101, 52);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    const explLines = doc.splitTextToSize(q.explanation, pageWidth - 2 * margin - 10);
    doc.text(explLines.slice(0, 2), margin + 5, yPos + 4);
    yPos += 18;
  });

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Page ${i} of ${pageCount} | Generated on ${new Date().toLocaleDateString()}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  doc.save('TN_University_Bookmarked_Questions.pdf');
};

export const generateSyllabusPDF = (university: University, course: Course) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  let yPos = 20;

  // Header
  doc.setFillColor(30, 58, 138); // Blue theme
  doc.rect(0, 0, pageWidth, 45, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(university.name, pageWidth / 2, 18, { align: 'center' });

  doc.setFontSize(14);
  doc.text(`${course.name} - Complete Syllabus`, pageWidth / 2, 30, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`${university.examName} | ${course.examPattern.duration}`, pageWidth / 2, 40, { align: 'center' });

  yPos = 55;

  // Exam Pattern Summary
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 58, 138);
  doc.text('Exam Pattern', margin, yPos);
  yPos += 8;

  const patternData = course.examPattern.sections.map(s => [
    s.name,
    s.questions.toString(),
    s.marks.toString(),
    s.topics.slice(0, 3).join(', ')
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [['Section', 'Questions', 'Marks', 'Key Topics']],
    body: patternData,
    theme: 'striped',
    headStyles: { fillColor: [30, 58, 138] },
    margin: { left: margin, right: margin },
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;

  // Syllabus Units
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 58, 138);
  doc.text('Detailed Syllabus', margin, yPos);
  yPos += 10;

  course.syllabus.forEach((unit, unitIdx) => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(60, 60, 60);
    doc.text(`Unit ${unit.unitNumber}: ${unit.title}`, margin, yPos);
    yPos += 7;

    unit.topics.forEach((topic, topicIdx) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(80, 80, 80);
      doc.text(`• ${topic.name}`, margin + 5, yPos);

      // Importance indicator
      const impColors: Record<string, [number, number, number]> = {
        'High': [239, 68, 68],
        'Medium': [245, 158, 11],
        'Low': [107, 114, 128]
      };
      const [r, g, b] = impColors[topic.importance];
      doc.setFillColor(r, g, b);
      doc.circle(pageWidth - margin - 5, yPos - 1.5, 2, 'F');

      yPos += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      const subtopicsText = topic.subtopics.join(', ');
      const lines = doc.splitTextToSize(subtopicsText, pageWidth - 2 * margin - 20);
      doc.text(lines, margin + 10, yPos);
      yPos += lines.length * 4 + 3;
    });

    yPos += 5;
  });

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Page ${i} of ${pageCount} | ${university.website}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  doc.save(`${university.examName}_${course.name}_Syllabus.pdf`);
};
