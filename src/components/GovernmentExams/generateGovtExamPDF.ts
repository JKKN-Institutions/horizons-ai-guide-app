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
  const { type, exam, category } = options;
  const doc = new jsPDF();
  const pw = doc.internal.pageSize.getWidth();
  const margin = 14;
  const contentW = pw - margin * 2;

  // Category colors
  const colors: Record<string, [number, number, number]> = {
    defence: [22, 163, 74],    // green-600
    railway: [37, 99, 235],    // blue-600
    ssc: [124, 58, 237],       // violet-600
    state: [225, 29, 72],      // rose-600
    central: [217, 119, 6],    // amber-600
  };
  const c = colors[category.id] || [37, 99, 235];

  // ─── HELPER: add page break if needed ───
  const checkPage = (needed: number) => {
    if (yPos + needed > 275) { doc.addPage(); yPos = 20; }
  };

  // ─── HEADER ───
  doc.setFillColor(c[0], c[1], c[2]);
  doc.rect(0, 0, pw, 45, 'F');

  // Small accent line
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 45, pw, 1.5, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('VAZHIKAATTI', pw / 2, 16, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Career Guidance for 12th Pass Students', pw / 2, 23, { align: 'center' });

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(exam.name, pw / 2, 33, { align: 'center' });

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(type === 'syllabus' ? 'COMPLETE SYLLABUS' : 'PREVIOUS YEAR QUESTIONS', pw / 2, 41, { align: 'center' });

  let yPos = 55;

  if (type === 'syllabus') {
    // ─── EXAM OVERVIEW TABLE ───
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(c[0], c[1], c[2]);
    doc.text('Exam Overview', margin, yPos);
    yPos += 3;

    const overviewRows = [
      ['Qualification', exam.qualification],
      ['Age Limit', exam.age],
      ['Salary', exam.salary],
      ['Selection Process', exam.selectionProcess],
    ];

    autoTable(doc, {
      startY: yPos,
      body: overviewRows,
      theme: 'plain',
      styles: { fontSize: 10, cellPadding: { top: 4, bottom: 4, left: 6, right: 6 }, lineColor: [230, 230, 230], lineWidth: 0.3 },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 45, textColor: [60, 60, 60] },
        1: { cellWidth: contentW - 45, textColor: [30, 30, 30] }
      },
      alternateRowStyles: { fillColor: [248, 250, 252] },
    });
    yPos = (doc as any).lastAutoTable.finalY + 12;

    // ─── EXAM PATTERN TABLE ───
    if (exam.examPattern && exam.examPattern.length > 0) {
      checkPage(40);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(c[0], c[1], c[2]);
      doc.text('Exam Pattern', margin, yPos);
      yPos += 3;

      const patternRows = exam.examPattern.map(p => [
        p.paper, String(p.questions), String(p.marks), p.duration
      ]);

      autoTable(doc, {
        startY: yPos,
        head: [['Paper / Section', 'Questions', 'Marks', 'Duration']],
        body: patternRows,
        theme: 'grid',
        headStyles: { fillColor: [c[0], c[1], c[2]], textColor: [255, 255, 255], fontSize: 10, fontStyle: 'bold', cellPadding: 5 },
        styles: { fontSize: 10, cellPadding: 4 },
        alternateRowStyles: { fillColor: [248, 250, 252] },
      });
      yPos = (doc as any).lastAutoTable.finalY + 15;
    }

    // ─── SYLLABUS CONTENT ───
    let sectionNum = 0;
    Object.entries(exam.syllabus).forEach(([sectionKey, sections]) => {
      sectionNum++;
      checkPage(20);

      // Section header bar
      doc.setFillColor(c[0], c[1], c[2]);
      doc.rect(margin, yPos - 5, contentW, 10, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`Section ${sectionNum}: ${sectionKey}`, margin + 4, yPos + 1.5);
      yPos += 12;

      sections.forEach((section) => {
        checkPage(15);

        // Sub-section heading
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(c[0], c[1], c[2]);
        doc.text(section.name, margin + 2, yPos);
        yPos += 8;

        section.topics.forEach((topic, tIdx) => {
          checkPage(15);

          // Topic name
          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(30, 30, 30);
          doc.text(`${tIdx + 1}. ${topic.name}`, margin + 4, yPos);
          yPos += 7;

          // Subtopics as bullet list (NOT comma-separated)
          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(70, 70, 70);

          topic.subtopics.forEach((sub) => {
            checkPage(8);
            const lines = doc.splitTextToSize(`•  ${sub}`, contentW - 16);
            lines.forEach((line: string) => {
              checkPage(6);
              doc.text(line, margin + 10, yPos);
              yPos += 5.5;
            });
          });
          yPos += 4;
        });
        yPos += 4;
      });
      yPos += 3;
    });

    // ─── POSTS (if available) ───
    if (exam.posts && exam.posts.length > 0) {
      checkPage(25);
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(c[0], c[1], c[2]);
      doc.text('Available Posts', margin, yPos);
      yPos += 8;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(50, 50, 50);
      exam.posts.forEach((post) => {
        checkPage(7);
        doc.text(`•  ${post}`, margin + 4, yPos);
        yPos += 6;
      });
      yPos += 5;
    }

  } else {
    // ─── PYQ CONTENT ───
    if (exam.pyq.length === 0) {
      doc.setTextColor(120, 120, 120);
      doc.setFontSize(14);
      doc.text('No previous year questions available yet.', pw / 2, yPos, { align: 'center' });
      doc.setFontSize(11);
      yPos += 10;
      doc.text('Questions will be added soon. Check back later.', pw / 2, yPos, { align: 'center' });
    } else {
      // Group by subject
      const grouped = exam.pyq.reduce((acc, q) => {
        if (!acc[q.subject]) acc[q.subject] = [];
        acc[q.subject].push(q);
        return acc;
      }, {} as Record<string, Question[]>);

      let qNum = 0;
      Object.entries(grouped).forEach(([subject, questions]) => {
        checkPage(20);

        // Subject header bar
        doc.setFillColor(c[0], c[1], c[2]);
        doc.rect(margin, yPos - 5, contentW, 10, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(`${subject} (${questions.length} Questions)`, margin + 4, yPos + 1.5);
        yPos += 14;

        questions.forEach((q) => {
          qNum++;
          checkPage(40);

          // Question
          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(30, 30, 30);
          const qText = `Q${qNum}. ${q.question}`;
          const qLines = doc.splitTextToSize(qText, contentW - 6);
          qLines.forEach((line: string) => {
            checkPage(7);
            doc.text(line, margin + 2, yPos);
            yPos += 6;
          });
          yPos += 2;

          // Options
          doc.setFontSize(10);
          q.options.forEach((opt, oIdx) => {
            checkPage(7);
            const label = String.fromCharCode(65 + oIdx);
            if (oIdx === q.answer) {
              doc.setFont('helvetica', 'bold');
              doc.setTextColor(22, 163, 74); // green
              doc.text(`${label})  ${opt}  ✓`, margin + 8, yPos);
            } else {
              doc.setFont('helvetica', 'normal');
              doc.setTextColor(70, 70, 70);
              doc.text(`${label})  ${opt}`, margin + 8, yPos);
            }
            yPos += 6.5;
          });
          yPos += 2;

          // Explanation box
          checkPage(15);
          doc.setFillColor(240, 249, 255);
          const expText = `Answer: ${String.fromCharCode(65 + q.answer)}) — ${q.explanation}`;
          const expLines = doc.splitTextToSize(expText, contentW - 14);
          const boxH = expLines.length * 5 + 6;
          doc.roundedRect(margin + 4, yPos - 3, contentW - 8, boxH, 2, 2, 'F');
          doc.setFontSize(9);
          doc.setFont('helvetica', 'italic');
          doc.setTextColor(37, 99, 235);
          expLines.forEach((line: string) => {
            doc.text(line, margin + 8, yPos + 2);
            yPos += 5;
          });
          yPos += 8;
        });
        yPos += 5;
      });
    }
  }

  // ─── FOOTER ON ALL PAGES ───
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);

    // Footer line
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, 284, pw - margin, 284);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(150, 150, 150);
    doc.text(`Page ${i} of ${pageCount}`, pw / 2, 290, { align: 'center' });
    doc.text('VAZHIKAATTI — Career Guidance', margin, 290);
    doc.text(new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }), pw - margin, 290, { align: 'right' });
  }

  doc.save(`${exam.id}-${type}.pdf`);
};
