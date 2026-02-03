import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Result {
  career: string;
  percentage: number;
}

interface CareerCluster {
  name: { en: string; ta: string };
  icon: string;
  color: string;
  description: { en: string; ta: string };
  careers: string[];
  exams: string[];
  salary: string;
}

interface CareerTip {
  emoji: string;
  title: string;
  description: string;
}

export const generateCareerAssessmentPDF = (
  results: Result[],
  careerClusters: Record<string, CareerCluster>,
  careerTips: CareerTip[]
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Colors
  const purple = [139, 92, 246];
  const violet = [124, 58, 237];
  const gray = [75, 85, 99];
  
  // Header
  doc.setFillColor(purple[0], purple[1], purple[2]);
  doc.rect(0, 0, pageWidth, 45, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('AI Career Assessment Report', pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('VAZHIKATTI', pageWidth / 2, 30, { align: 'center' });
  
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })}`, pageWidth / 2, 38, { align: 'center' });
  
  let yPos = 55;
  
  // Title
  doc.setTextColor(gray[0], gray[1], gray[2]);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Your Top 5 Career Matches', 14, yPos);
  yPos += 10;
  
  // Results Table
  const tableData = results.map((result, index) => {
    const cluster = careerClusters[result.career];
    return [
      `#${index + 1}`,
      cluster.name.en,
      `${result.percentage}%`,
      cluster.careers.slice(0, 3).join(', '),
      cluster.exams.slice(0, 2).join(', '),
      cluster.salary
    ];
  });
  
  autoTable(doc, {
    startY: yPos,
    head: [['Rank', 'Career Field', 'Match %', 'Sample Careers', 'Key Exams', 'Salary Range']],
    body: tableData,
    headStyles: {
      fillColor: [139, 92, 246],
      textColor: 255,
      fontStyle: 'bold',
      fontSize: 9
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [55, 65, 81]
    },
    alternateRowStyles: {
      fillColor: [245, 243, 255]
    },
    columnStyles: {
      0: { cellWidth: 12, halign: 'center' },
      1: { cellWidth: 30, fontStyle: 'bold' },
      2: { cellWidth: 18, halign: 'center' },
      3: { cellWidth: 50 },
      4: { cellWidth: 40 },
      5: { cellWidth: 32 }
    },
    margin: { left: 14, right: 14 }
  });
  
  yPos = (doc as any).lastAutoTable.finalY + 15;
  
  // Detailed Analysis
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(gray[0], gray[1], gray[2]);
  doc.text('Detailed Career Analysis', 14, yPos);
  yPos += 10;
  
  results.slice(0, 3).forEach((result, index) => {
    const cluster = careerClusters[result.career];
    
    // Check if we need a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    // Career box
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(14, yPos, pageWidth - 28, 40, 3, 3, 'F');
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(violet[0], violet[1], violet[2]);
    doc.text(`#${index + 1} ${cluster.name.en} (${result.percentage}% Match)`, 20, yPos + 8);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(gray[0], gray[1], gray[2]);
    
    const description = doc.splitTextToSize(cluster.description.en, pageWidth - 50);
    doc.text(description, 20, yPos + 16);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Careers: ', 20, yPos + 28);
    doc.setFont('helvetica', 'normal');
    doc.text(cluster.careers.join(', '), 40, yPos + 28);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Exams: ', 20, yPos + 35);
    doc.setFont('helvetica', 'normal');
    doc.text(cluster.exams.join(', '), 36, yPos + 35);
    
    yPos += 48;
  });
  
  // Career Tips
  if (careerTips.length > 0) {
    if (yPos > 220) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.text('Personalized Career Tips', 14, yPos);
    yPos += 10;
    
    careerTips.forEach((tip, index) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFillColor(255, 251, 235);
      doc.roundedRect(14, yPos, pageWidth - 28, 18, 2, 2, 'F');
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(146, 64, 14);
      doc.text(`${tip.emoji} ${tip.title}`, 20, yPos + 7);
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(gray[0], gray[1], gray[2]);
      const tipDesc = doc.splitTextToSize(tip.description, pageWidth - 50);
      doc.text(tipDesc[0], 20, yPos + 14);
      
      yPos += 22;
    });
  }
  
  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    doc.text(
      `Page ${i} of ${pageCount} | VAZHIKATTI Career Assessment`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }
  
  // Save
  doc.save('career-assessment-report.pdf');
};
