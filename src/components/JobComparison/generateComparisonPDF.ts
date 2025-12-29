import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Job {
  title: string;
  company: string;
  location: string;
  salary: string;
  requirement: string;
  sector: string;
  isHot: boolean;
}

interface SectorInfo {
  name: string;
  icon: string;
}

const sectorDisplayNames: Record<string, { name: string; color: [number, number, number] }> = {
  tech: { name: 'Technology', color: [59, 130, 246] },
  healthcare: { name: 'Healthcare', color: [34, 197, 94] },
  manufacturing: { name: 'Manufacturing', color: [249, 115, 22] },
  bfsi: { name: 'BFSI', color: [168, 85, 247] },
  ecommerce: { name: 'E-Commerce', color: [236, 72, 153] },
  logistics: { name: 'Logistics', color: [245, 158, 11] },
  gaming: { name: 'Gaming', color: [239, 68, 68] },
  agritech: { name: 'AgriTech', color: [132, 204, 22] },
  edtech: { name: 'EdTech', color: [99, 102, 241] },
  renewable: { name: 'Renewable', color: [20, 184, 166] },
};

const parseSalaryMax = (salary: string): number => {
  const matches = salary.match(/(\d+)/g);
  if (!matches) return 0;
  const numbers = matches.map(Number);
  return Math.max(...numbers);
};

export const generateComparisonPDF = (jobs: Job[], bestMatchIndex: number) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header with gradient effect (simulated)
  doc.setFillColor(46, 125, 50); // JKKN Green
  doc.rect(0, 0, pageWidth, 45, 'F');
  
  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Job Comparison Report', pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('JKKN AI Horizons Career Hub', pageWidth / 2, 30, { align: 'center' });
  
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}`, pageWidth / 2, 38, { align: 'center' });

  let yPos = 55;

  // Summary stats
  doc.setTextColor(46, 125, 50);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Comparison Summary', 14, yPos);
  
  yPos += 8;
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Total Jobs Compared: ${jobs.length}`, 14, yPos);
  
  yPos += 6;
  const salaries = jobs.map(j => parseSalaryMax(j.salary));
  const highestSalary = Math.max(...salaries);
  const highestSalaryJob = jobs[salaries.indexOf(highestSalary)];
  doc.text(`Highest Salary: ${highestSalaryJob.salary} (${highestSalaryJob.title})`, 14, yPos);
  
  yPos += 6;
  const hotJobs = jobs.filter(j => j.isHot).length;
  doc.text(`Trending/Hot Jobs: ${hotJobs}`, 14, yPos);

  yPos += 12;

  // Best Match highlight
  if (bestMatchIndex >= 0 && jobs[bestMatchIndex]) {
    const bestJob = jobs[bestMatchIndex];
    
    doc.setFillColor(255, 243, 205); // Amber light
    doc.roundedRect(14, yPos, pageWidth - 28, 25, 3, 3, 'F');
    
    doc.setFillColor(245, 158, 11); // Amber
    doc.roundedRect(14, yPos, 4, 25, 2, 2, 'F');
    
    doc.setTextColor(180, 83, 9);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('⭐ Best Match', 22, yPos + 8);
    
    doc.setTextColor(120, 53, 15);
    doc.setFontSize(12);
    doc.text(`${bestJob.title} at ${bestJob.company}`, 22, yPos + 16);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`${bestJob.salary} | ${bestJob.location}`, 22, yPos + 22);
    
    yPos += 35;
  }

  // Individual job cards
  doc.setTextColor(46, 125, 50);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Job Details', 14, yPos);
  yPos += 8;

  jobs.forEach((job, idx) => {
    const sectorInfo = sectorDisplayNames[job.sector] || { name: job.sector, color: [100, 100, 100] };
    
    // Check if we need a new page
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }

    // Card background
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(14, yPos, pageWidth - 28, 42, 3, 3, 'F');
    
    // Left color border
    doc.setFillColor(sectorInfo.color[0], sectorInfo.color[1], sectorInfo.color[2]);
    doc.roundedRect(14, yPos, 4, 42, 2, 2, 'F');

    // Best match indicator
    if (idx === bestMatchIndex) {
      doc.setFillColor(245, 158, 11);
      doc.circle(pageWidth - 22, yPos + 8, 4, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(6);
      doc.text('★', pageWidth - 23.5, yPos + 9.5);
    }

    // Hot badge
    if (job.isHot) {
      doc.setFillColor(239, 68, 68);
      doc.roundedRect(pageWidth - 38, yPos + 3, 18, 6, 2, 2, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(6);
      doc.text('🔥 Hot', pageWidth - 36, yPos + 7);
    }

    // Job title
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(job.title, 22, yPos + 10);

    // Company
    doc.setTextColor(sectorInfo.color[0], sectorInfo.color[1], sectorInfo.color[2]);
    doc.setFontSize(10);
    doc.text(job.company, 22, yPos + 17);

    // Details row
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`📍 ${job.location}`, 22, yPos + 25);
    doc.text(`💼 ${job.requirement}`, 80, yPos + 25);

    // Salary
    doc.setTextColor(34, 197, 94);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`💰 ${job.salary}`, 22, yPos + 33);

    // Sector badge
    doc.setFillColor(sectorInfo.color[0], sectorInfo.color[1], sectorInfo.color[2]);
    doc.roundedRect(80, yPos + 29, 30, 7, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7);
    doc.text(sectorInfo.name, 82, yPos + 34);

    yPos += 48;
  });

  // Comparison table
  if (yPos > 200) {
    doc.addPage();
    yPos = 20;
  }

  yPos += 5;
  doc.setTextColor(46, 125, 50);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Quick Comparison Table', 14, yPos);
  yPos += 5;

  const tableHeaders = ['Attribute', ...jobs.map((j, i) => 
    i === bestMatchIndex ? `${j.title.slice(0, 15)}... ⭐` : j.title.slice(0, 18) + (j.title.length > 18 ? '...' : '')
  )];

  const tableData = [
    ['Company', ...jobs.map(j => j.company)],
    ['Location', ...jobs.map(j => j.location)],
    ['Salary', ...jobs.map(j => j.salary)],
    ['Requirements', ...jobs.map(j => j.requirement)],
    ['Sector', ...jobs.map(j => sectorDisplayNames[j.sector]?.name || j.sector)],
    ['Status', ...jobs.map(j => j.isHot ? '🔥 Trending' : 'Active')],
  ];

  autoTable(doc, {
    startY: yPos,
    head: [tableHeaders],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [46, 125, 50],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8,
    },
    bodyStyles: {
      fontSize: 8,
      cellPadding: 3,
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 25 },
    },
    didParseCell: (data) => {
      // Highlight salary row
      if (data.row.index === 2 && data.column.index > 0) {
        data.cell.styles.textColor = [34, 197, 94];
        data.cell.styles.fontStyle = 'bold';
      }
      // Highlight best match column
      if (data.column.index === bestMatchIndex + 1) {
        data.cell.styles.fillColor = [255, 251, 235];
      }
    },
  });

  // Footer
  const finalY = (doc as any).lastAutoTable?.finalY || yPos + 60;
  
  if (finalY > 260) {
    doc.addPage();
  }
  
  const footerY = doc.internal.pageSize.getHeight() - 15;
  doc.setFillColor(46, 125, 50);
  doc.rect(0, footerY - 5, pageWidth, 20, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('JKKN AI Horizons | Career Hub | Industry Trends & Job Comparison', pageWidth / 2, footerY + 2, { align: 'center' });
  doc.text('www.jkkn.ac.in | Powered by AI Horizons', pageWidth / 2, footerY + 7, { align: 'center' });

  // Save the PDF
  const fileName = `Job_Comparison_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
  
  return fileName;
};
