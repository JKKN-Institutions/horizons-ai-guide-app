import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface CareerPrediction {
  career: string;
  matchScore: number;
  icon: string;
  color: string;
  description: string;
  avgSalary: string;
  growthRate: string;
  workLifeBalance?: number;
  jobDemand?: number;
  entryDifficulty?: number;
  avgWorkHours?: string;
  topSkills?: string[];
  educationRequired?: string;
}

interface OverallResult {
  winner: number;
  scores: number[];
  margin: number;
}

export const generateCareerComparisonPDF = (
  careers: CareerPrediction[],
  overallResult: OverallResult
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header with gradient effect
  doc.setFillColor(46, 125, 50); // JKKN Green
  doc.rect(0, 0, pageWidth, 50, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('Career Comparison Report', pageWidth / 2, 18, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('AI Career Predictor Analysis', pageWidth / 2, 28, { align: 'center' });

  doc.setFontSize(10);
  doc.text('VAZHIKATTI', pageWidth / 2, 36, { align: 'center' });

  doc.setFontSize(9);
  doc.text(
    `Generated on: ${new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })}`,
    pageWidth / 2,
    44,
    { align: 'center' }
  );

  let yPos = 60;

  // Winner announcement
  if (overallResult.winner >= 0) {
    const winnerCareer = careers[overallResult.winner];

    doc.setFillColor(255, 243, 205);
    doc.roundedRect(14, yPos, pageWidth - 28, 28, 3, 3, 'F');

    doc.setFillColor(245, 158, 11);
    doc.roundedRect(14, yPos, 5, 28, 2, 2, 'F');

    doc.setTextColor(180, 83, 9);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Overall Winner', 24, yPos + 10);

    doc.setTextColor(120, 53, 15);
    doc.setFontSize(16);
    doc.text(`${winnerCareer.career}`, 24, yPos + 20);

    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `Score: ${overallResult.scores[overallResult.winner]}/100 | Wins by ${overallResult.margin} points`,
      pageWidth - 20,
      yPos + 15,
      { align: 'right' }
    );

    yPos += 38;
  }

  // Career cards side by side
  doc.setTextColor(46, 125, 50);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Compared Careers', 14, yPos);
  yPos += 8;

  const cardWidth = (pageWidth - 35) / 2;
  careers.forEach((career, idx) => {
    const xOffset = 14 + idx * (cardWidth + 7);
    const isWinner = idx === overallResult.winner;

    // Card background
    doc.setFillColor(isWinner ? 240 : 250, isWinner ? 253 : 250, isWinner ? 244 : 250);
    doc.roundedRect(xOffset, yPos, cardWidth, 55, 3, 3, 'F');

    // Left border color
    doc.setFillColor(idx === 0 ? 59 : 168, idx === 0 ? 130 : 85, idx === 0 ? 246 : 247);
    doc.roundedRect(xOffset, yPos, 4, 55, 2, 2, 'F');

    // Winner badge
    if (isWinner) {
      doc.setFillColor(34, 197, 94);
      doc.roundedRect(xOffset + cardWidth - 22, yPos + 3, 18, 6, 2, 2, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(6);
      doc.text('WINNER', xOffset + cardWidth - 20, yPos + 7);
    }

    // Career name
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(career.career, xOffset + 10, yPos + 12);

    // Match score
    doc.setTextColor(idx === 0 ? 59 : 168, idx === 0 ? 130 : 85, idx === 0 ? 246 : 247);
    doc.setFontSize(10);
    doc.text(`${career.matchScore}% Match`, xOffset + 10, yPos + 20);

    // Details
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Salary: ${career.avgSalary}`, xOffset + 10, yPos + 28);
    doc.text(`Growth: ${career.growthRate}`, xOffset + 10, yPos + 35);
    doc.text(`Education: ${career.educationRequired || 'Degree Required'}`, xOffset + 10, yPos + 42);

    // Overall score
    doc.setTextColor(46, 125, 50);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`Score: ${overallResult.scores[idx]}/100`, xOffset + 10, yPos + 51);
  });

  yPos += 65;

  // Metrics comparison table
  doc.setTextColor(46, 125, 50);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Detailed Metrics Comparison', 14, yPos);
  yPos += 5;

  const tableHeaders = ['Metric', careers[0].career, careers[1].career, 'Winner'];
  const metrics = [
    {
      name: 'Match Score',
      values: [careers[0].matchScore, careers[1].matchScore],
      suffix: '%',
    },
    {
      name: 'Work-Life Balance',
      values: [careers[0].workLifeBalance || 0, careers[1].workLifeBalance || 0],
      suffix: '%',
    },
    {
      name: 'Job Demand',
      values: [careers[0].jobDemand || 0, careers[1].jobDemand || 0],
      suffix: '%',
    },
    {
      name: 'Entry Ease',
      values: [100 - (careers[0].entryDifficulty || 0), 100 - (careers[1].entryDifficulty || 0)],
      suffix: '%',
    },
    {
      name: 'Growth Rate',
      values: [
        parseInt(careers[0].growthRate?.replace(/[^0-9]/g, '') || '0'),
        parseInt(careers[1].growthRate?.replace(/[^0-9]/g, '') || '0'),
      ],
      suffix: '%',
    },
    {
      name: 'Salary Range',
      values: [careers[0].avgSalary, careers[1].avgSalary],
      suffix: '',
      isString: true,
    },
    {
      name: 'Education Required',
      values: [careers[0].educationRequired || '-', careers[1].educationRequired || '-'],
      suffix: '',
      isString: true,
    },
  ];

  const tableData = metrics.map((m) => {
    if (m.isString) {
      return [m.name, m.values[0], m.values[1], '-'];
    }
    const winner =
      (m.values[0] as number) > (m.values[1] as number)
        ? careers[0].career
        : (m.values[1] as number) > (m.values[0] as number)
        ? careers[1].career
        : 'Tie';
    return [m.name, `${m.values[0]}${m.suffix}`, `${m.values[1]}${m.suffix}`, winner];
  });

  autoTable(doc, {
    startY: yPos,
    head: [tableHeaders],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [46, 125, 50],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
    },
    bodyStyles: {
      fontSize: 9,
      cellPadding: 4,
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 40 },
      3: { fontStyle: 'bold', halign: 'center' },
    },
    didParseCell: (data) => {
      // Highlight winner column
      if (data.column.index === 3 && data.row.index >= 0) {
        const cellText = String(data.cell.raw);
        if (cellText === careers[0].career) {
          data.cell.styles.textColor = [59, 130, 246];
        } else if (cellText === careers[1].career) {
          data.cell.styles.textColor = [168, 85, 247];
        }
      }
    },
  });

  const afterTableY = (doc as any).lastAutoTable?.finalY || yPos + 80;

  // Skills comparison
  if (afterTableY < 220) {
    let skillsY = afterTableY + 10;
    doc.setTextColor(46, 125, 50);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Key Skills Required', 14, skillsY);
    skillsY += 8;

    careers.forEach((career, idx) => {
      const xOffset = 14 + idx * (cardWidth + 7);
      doc.setFillColor(idx === 0 ? 239 : 250, idx === 0 ? 246 : 240, idx === 0 ? 255 : 255);
      doc.roundedRect(xOffset, skillsY, cardWidth, 30, 3, 3, 'F');

      doc.setTextColor(idx === 0 ? 59 : 168, idx === 0 ? 130 : 85, idx === 0 ? 246 : 247);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(career.career, xOffset + 5, skillsY + 8);

      doc.setTextColor(80, 80, 80);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      const skills = career.topSkills?.join(', ') || 'Analytical Skills, Communication';
      doc.text(skills, xOffset + 5, skillsY + 18, { maxWidth: cardWidth - 10 });
    });
  }

  // Scoring methodology
  doc.addPage();
  let methodY = 20;

  doc.setTextColor(46, 125, 50);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Scoring Methodology', 14, methodY);
  methodY += 10;

  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('The overall comparison score is calculated using a weighted formula:', 14, methodY);
  methodY += 10;

  const weightings = [
    ['Match Score', '30%', 'How well the career matches your profile'],
    ['Salary Potential', '25%', 'Normalized salary range (0-100 scale)'],
    ['Growth Rate', '20%', 'Industry growth percentage'],
    ['Work-Life Balance', '15%', 'Expected balance score'],
    ['Job Demand', '10%', 'Current market demand'],
  ];

  autoTable(doc, {
    startY: methodY,
    head: [['Factor', 'Weight', 'Description']],
    body: weightings,
    theme: 'striped',
    headStyles: {
      fillColor: [46, 125, 50],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 10,
    },
    bodyStyles: {
      fontSize: 9,
      cellPadding: 4,
    },
    columnStyles: {
      0: { fontStyle: 'bold' },
      1: { halign: 'center', fontStyle: 'bold' },
    },
  });

  // Footer on all pages
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    const footerY = doc.internal.pageSize.getHeight() - 12;
    doc.setFillColor(46, 125, 50);
    doc.rect(0, footerY - 3, pageWidth, 15, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(
      'VAZHIKATTI | AI Career Predictor | Career Comparison Report',
      pageWidth / 2,
      footerY + 3,
      { align: 'center' }
    );
    doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, footerY + 8, { align: 'center' });
  }

  // Save the PDF
  const fileName = `Career_Comparison_${careers[0].career.replace(/\s+/g, '_')}_vs_${careers[1].career.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);

  return fileName;
};
