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
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pw = 210;    // A4 width
  const margin = 15;
  const W = pw - margin * 2; // usable width = 180mm

  const clr: Record<string, [number, number, number]> = {
    defence: [22, 101, 52],     // dark green
    railway: [30, 64, 175],     // dark blue
    ssc: [88, 28, 175],         // dark violet
    state: [159, 18, 57],       // dark rose
    central: [146, 64, 14],     // dark amber
  };
  const c = clr[category.id] || [30, 64, 175];
  let yPos = 0;

  const newPage = () => { doc.addPage(); yPos = 18; };
  const need = (h: number) => { if (yPos + h > 274) newPage(); };

  // ══════════════════════════════════════════
  // HEADER — tall colored banner
  // ══════════════════════════════════════════
  doc.setFillColor(c[0], c[1], c[2]);
  doc.rect(0, 0, pw, 48, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(26);
  doc.setFont('helvetica', 'bold');
  doc.text('VAZHIKAATTI', pw / 2, 17, { align: 'center' });

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Career Guidance for 12th Pass Students', pw / 2, 25, { align: 'center' });

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  const titleLines = doc.splitTextToSize(exam.name, W - 20);
  titleLines.forEach((line: string, i: number) => {
    doc.text(line, pw / 2, 34 + i * 6, { align: 'center' });
  });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(
    type === 'syllabus' ? 'COMPLETE SYLLABUS' : 'PREVIOUS YEAR QUESTIONS',
    pw / 2, 34 + titleLines.length * 6 + 2, { align: 'center' }
  );

  yPos = 58;

  if (type === 'syllabus') {
    // ══════════════════════════════════════
    // EXAM OVERVIEW — clean table
    // ══════════════════════════════════════
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(c[0], c[1], c[2]);
    doc.text('Exam Overview', margin, yPos);
    yPos += 4;

    autoTable(doc, {
      startY: yPos,
      body: [
        ['Qualification', exam.qualification],
        ['Age Limit', exam.age],
        ['Salary', exam.salary],
        ['Selection', exam.selectionProcess],
      ],
      theme: 'plain',
      styles: { fontSize: 11, cellPadding: { top: 5, bottom: 5, left: 8, right: 8 }, lineColor: [220, 220, 220], lineWidth: 0.4 },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 40, textColor: [80, 80, 80] },
        1: { cellWidth: W - 40, textColor: [20, 20, 20] }
      },
      alternateRowStyles: { fillColor: [245, 247, 250] },
    });
    yPos = (doc as any).lastAutoTable.finalY + 14;

    // ══════════════════════════════════════
    // EXAM PATTERN TABLE
    // ══════════════════════════════════════
    if (exam.examPattern && exam.examPattern.length > 0) {
      need(45);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(c[0], c[1], c[2]);
      doc.text('Exam Pattern', margin, yPos);
      yPos += 4;

      autoTable(doc, {
        startY: yPos,
        head: [['Paper / Section', 'Questions', 'Marks', 'Duration']],
        body: exam.examPattern.map(p => [p.paper, String(p.questions), String(p.marks), p.duration]),
        theme: 'grid',
        headStyles: { fillColor: [c[0], c[1], c[2]], textColor: [255, 255, 255], fontSize: 11, fontStyle: 'bold', cellPadding: 6 },
        styles: { fontSize: 11, cellPadding: 5, textColor: [20, 20, 20] },
        alternateRowStyles: { fillColor: [245, 247, 250] },
      });
      yPos = (doc as any).lastAutoTable.finalY + 14;
    }

    // ══════════════════════════════════════
    // SYLLABUS — clear hierarchy
    // ══════════════════════════════════════
    let secNum = 0;
    Object.entries(exam.syllabus).forEach(([sectionKey, sections]) => {
      secNum++;
      need(22);

      // ── SECTION HEADER BAR (dark, prominent) ──
      doc.setFillColor(c[0], c[1], c[2]);
      doc.rect(margin, yPos - 5, W, 12, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      const secTitle = `${secNum}. ${sectionKey}`;
      const secLines = doc.splitTextToSize(secTitle, W - 10);
      doc.text(secLines[0], margin + 5, yPos + 2.5);
      yPos += 14;

      // If section title was too long, show 2nd line
      if (secLines.length > 1) {
        doc.setTextColor(c[0], c[1], c[2]);
        doc.setFontSize(11);
        doc.text(secLines.slice(1).join(' '), margin + 5, yPos);
        yPos += 7;
      }

      sections.forEach((section) => {
        need(16);

        // ── Sub-section heading (colored, bold, underlined) ──
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(c[0], c[1], c[2]);
        const subLines = doc.splitTextToSize(section.name, W - 4);
        subLines.forEach((line: string) => {
          need(7);
          doc.text(line, margin + 3, yPos);
          yPos += 6;
        });
        // Underline
        doc.setDrawColor(c[0], c[1], c[2]);
        doc.setLineWidth(0.5);
        doc.line(margin + 3, yPos - 3.5, margin + 3 + Math.min(doc.getTextWidth(subLines[0]) * 1.1, W - 6), yPos - 3.5);
        yPos += 4;

        section.topics.forEach((topic, tIdx) => {
          need(14);

          // ── Topic name (numbered, bold, dark) ──
          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(20, 20, 20);
          const topicText = `${tIdx + 1}. ${topic.name}`;
          const topicLines = doc.splitTextToSize(topicText, W - 10);
          topicLines.forEach((line: string) => {
            need(6);
            doc.text(line, margin + 5, yPos);
            yPos += 6;
          });
          yPos += 1;

          // ── Subtopics as clear bullet list ──
          doc.setFontSize(11);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(40, 40, 40);

          topic.subtopics.forEach((sub) => {
            need(8);
            // Bullet character
            doc.setFontSize(8);
            doc.text('\u2022', margin + 10, yPos); // bullet dot
            doc.setFontSize(11);
            const subLines = doc.splitTextToSize(sub, W - 22);
            subLines.forEach((line: string, li: number) => {
              need(6);
              doc.text(line, margin + 14, yPos);
              yPos += 5.8;
            });
            yPos += 0.5;
          });
          yPos += 4;
        });
        yPos += 3;
      });
      yPos += 4;
    });

    // ── POSTS ──
    if (exam.posts && exam.posts.length > 0) {
      need(25);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(c[0], c[1], c[2]);
      doc.text('Available Posts', margin, yPos);
      yPos += 8;

      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(30, 30, 30);
      exam.posts.forEach((post) => {
        need(7);
        doc.text(`-  ${post}`, margin + 5, yPos);
        yPos += 6.5;
      });
    }

  } else {
    // ══════════════════════════════════════
    // PYQ — Previous Year Questions
    // ══════════════════════════════════════
    if (exam.pyq.length === 0) {
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(16);
      doc.text('No previous year questions available yet.', pw / 2, yPos + 10, { align: 'center' });
    } else {
      const grouped = exam.pyq.reduce((acc, q) => {
        if (!acc[q.subject]) acc[q.subject] = [];
        acc[q.subject].push(q);
        return acc;
      }, {} as Record<string, Question[]>);

      let qNum = 0;
      Object.entries(grouped).forEach(([subject, questions]) => {
        need(22);

        // Subject header bar
        doc.setFillColor(c[0], c[1], c[2]);
        doc.rect(margin, yPos - 5, W, 12, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text(`${subject}  (${questions.length} Questions)`, margin + 5, yPos + 2.5);
        yPos += 16;

        questions.forEach((q) => {
          qNum++;
          need(50);

          // Question — large, bold
          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(20, 20, 20);
          const qText = `Q${qNum}.  ${q.question}`;
          const qLines = doc.splitTextToSize(qText, W - 8);
          qLines.forEach((line: string) => {
            need(7);
            doc.text(line, margin + 3, yPos);
            yPos += 6.5;
          });
          yPos += 3;

          // Options — clear A B C D
          doc.setFontSize(11);
          q.options.forEach((opt, oIdx) => {
            need(8);
            const label = String.fromCharCode(65 + oIdx);
            const isCorrect = oIdx === q.answer;

            if (isCorrect) {
              // Green background for correct answer
              doc.setFillColor(220, 252, 231); // green-100
              doc.roundedRect(margin + 6, yPos - 4.5, W - 12, 7.5, 1.5, 1.5, 'F');
              doc.setFont('helvetica', 'bold');
              doc.setTextColor(22, 101, 52); // green-800
              doc.text(`${label})  ${opt}   [CORRECT]`, margin + 10, yPos);
            } else {
              doc.setFont('helvetica', 'normal');
              doc.setTextColor(50, 50, 50);
              doc.text(`${label})  ${opt}`, margin + 10, yPos);
            }
            yPos += 7.5;
          });
          yPos += 3;

          // Explanation box
          need(18);
          doc.setFillColor(239, 246, 255); // blue-50
          doc.setDrawColor(191, 219, 254); // blue-200
          const expStr = `Explanation:  ${q.explanation}`;
          const expLines = doc.splitTextToSize(expStr, W - 22);
          const boxH = expLines.length * 5.5 + 7;
          doc.roundedRect(margin + 5, yPos - 3, W - 10, boxH, 2, 2, 'FD');

          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(30, 64, 175); // blue-800
          expLines.forEach((line: string) => {
            doc.text(line, margin + 10, yPos + 2);
            yPos += 5.5;
          });
          yPos += 10;
        });
        yPos += 5;
      });
    }
  }

  // ══════════════════════════════════════
  // FOOTER — all pages
  // ══════════════════════════════════════
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, 283, pw - margin, 283);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(140, 140, 140);
    doc.text(`Page ${i} of ${totalPages}`, pw / 2, 289, { align: 'center' });
    doc.text('VAZHIKAATTI', margin, 289);
    doc.text(new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }), pw - margin, 289, { align: 'right' });
  }

  doc.save(`${exam.id}-${type}.pdf`);
};
