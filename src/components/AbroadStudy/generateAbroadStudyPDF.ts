import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Application {
  id: string;
  university: string;
  country: string;
  program: string;
  deadline: string;
  status: string;
}

interface Scholarship {
  name: string;
  country: string;
  amount: string;
  deadline: string;
  eligibility: string;
}

interface CountryData {
  name: string;
  flag: string;
  avgTuition: string;
  avgLiving: string;
  workHours: string;
  prDuration: string;
  popularCourses: string[];
  topUniversities: string[];
}

const statusLabels: Record<string, string> = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  submitted: 'Submitted',
  admitted: 'Admitted',
  rejected: 'Rejected',
  waitlisted: 'Waitlisted',
};

export const generateApplicationTrackerPDF = (applications: Application[]) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header
  doc.setFillColor(79, 70, 229); // indigo-600
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text('Application Tracker Report', 14, 25);
  doc.setFontSize(10);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 35);
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  
  // Summary Stats
  const stats = {
    total: applications.length,
    submitted: applications.filter(a => ['submitted', 'admitted', 'rejected', 'waitlisted'].includes(a.status)).length,
    admitted: applications.filter(a => a.status === 'admitted').length,
    pending: applications.filter(a => ['not_started', 'in_progress'].includes(a.status)).length,
  };
  
  doc.setFontSize(14);
  doc.text('Summary', 14, 55);
  
  doc.setFontSize(10);
  doc.text(`Total Applications: ${stats.total}`, 14, 65);
  doc.text(`Submitted: ${stats.submitted}`, 14, 72);
  doc.text(`Admitted: ${stats.admitted}`, 80, 65);
  doc.text(`Pending: ${stats.pending}`, 80, 72);
  
  // Applications Table
  const tableData = applications.map(app => [
    app.university,
    app.country,
    app.program,
    new Date(app.deadline).toLocaleDateString(),
    statusLabels[app.status] || app.status,
  ]);
  
  autoTable(doc, {
    startY: 85,
    head: [['University', 'Country', 'Program', 'Deadline', 'Status']],
    body: tableData,
    headStyles: {
      fillColor: [79, 70, 229],
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 243, 255],
    },
    styles: {
      fontSize: 9,
      cellPadding: 4,
    },
    columnStyles: {
      0: { cellWidth: 45 },
      1: { cellWidth: 25 },
      2: { cellWidth: 50 },
      3: { cellWidth: 30 },
      4: { cellWidth: 30 },
    },
  });
  
  // Footer
  const pageCount = doc.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Page ${i} of ${pageCount} | Horizons AI Guide - Study Abroad Tracker`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }
  
  doc.save('application-tracker-report.pdf');
};

export const generateScholarshipsPDF = (scholarships: Scholarship[], title: string = 'Scholarships Report') => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header
  doc.setFillColor(217, 119, 6); // amber-600
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text(title, 14, 25);
  doc.setFontSize(10);
  doc.text(`${scholarships.length} scholarships | ${new Date().toLocaleDateString()}`, 14, 35);
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  
  // Scholarships Table
  const tableData = scholarships.map(s => [
    s.name,
    s.country,
    s.amount,
    s.deadline,
    s.eligibility,
  ]);
  
  autoTable(doc, {
    startY: 50,
    head: [['Scholarship Name', 'Country', 'Amount', 'Deadline', 'Eligibility']],
    body: tableData,
    headStyles: {
      fillColor: [217, 119, 6],
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [255, 251, 235],
    },
    styles: {
      fontSize: 9,
      cellPadding: 4,
    },
    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 25 },
      2: { cellWidth: 30 },
      3: { cellWidth: 25 },
      4: { cellWidth: 60 },
    },
  });
  
  // Tips section
  const finalY = (doc as any).lastAutoTable.finalY || 150;
  
  if (finalY < 240) {
    doc.setFillColor(255, 251, 235);
    doc.roundedRect(14, finalY + 10, pageWidth - 28, 40, 3, 3, 'F');
    
    doc.setFontSize(11);
    doc.setTextColor(146, 64, 14);
    doc.text('Pro Tip', 20, finalY + 22);
    
    doc.setFontSize(9);
    doc.text('Apply to multiple scholarships to increase your chances.', 20, finalY + 32);
    doc.text('Most successful students apply to 10+ scholarships!', 20, finalY + 40);
  }
  
  // Footer
  const pageCount = doc.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Page ${i} of ${pageCount} | Horizons AI Guide - Scholarship Finder`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }
  
  doc.save('scholarships-report.pdf');
};

export const generateCountryComparisonPDF = (countries: CountryData[]) => {
  const doc = new jsPDF('landscape');
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header
  doc.setFillColor(99, 102, 241); // indigo-500
  doc.rect(0, 0, pageWidth, 35, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text('Country Comparison Report', 14, 22);
  doc.setFontSize(10);
  doc.text(`Comparing ${countries.length} countries | ${new Date().toLocaleDateString()}`, 14, 30);
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  
  // Comparison Table
  const tableData = countries.map(c => [
    `${c.flag} ${c.name}`,
    c.avgTuition,
    c.avgLiving,
    c.workHours,
    c.prDuration,
    c.popularCourses.slice(0, 3).join(', '),
  ]);
  
  autoTable(doc, {
    startY: 45,
    head: [['Country', 'Tuition/Year', 'Living Cost/Year', 'Work Hours', 'PR Path', 'Top Courses']],
    body: tableData,
    headStyles: {
      fillColor: [99, 102, 241],
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [238, 242, 255],
    },
    styles: {
      fontSize: 9,
      cellPadding: 4,
    },
  });
  
  // Top Universities Section
  const finalY = (doc as any).lastAutoTable.finalY || 100;
  
  doc.setFontSize(14);
  doc.text('Top Universities by Country', 14, finalY + 15);
  
  let yOffset = finalY + 25;
  countries.forEach((country) => {
    if (yOffset > 180) return;
    
    doc.setFontSize(10);
    doc.setTextColor(79, 70, 229);
    doc.text(`${country.flag} ${country.name}:`, 14, yOffset);
    doc.setTextColor(0, 0, 0);
    doc.text(country.topUniversities.join(', '), 60, yOffset);
    yOffset += 8;
  });
  
  // Footer
  const pageCount = doc.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Page ${i} of ${pageCount} | Horizons AI Guide - Study Abroad`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }
  
  doc.save('country-comparison-report.pdf');
};

export const generateDocumentChecklistPDF = (
  country: string,
  checkedItems: Record<string, boolean>,
  commonDocs: Array<{ id: string; name: string; description: string }>,
  countryDocs: Array<{ id: string; name: string; description: string }>
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header
  doc.setFillColor(16, 185, 129); // emerald-500
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text('Document Checklist', 14, 25);
  doc.setFontSize(10);
  doc.text(`${country} | ${new Date().toLocaleDateString()}`, 14, 35);
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  
  // Progress
  const allDocs = [...commonDocs, ...countryDocs];
  const completedCount = allDocs.filter(d => checkedItems[d.id]).length;
  const progress = Math.round((completedCount / allDocs.length) * 100);
  
  doc.setFontSize(12);
  doc.text(`Progress: ${completedCount}/${allDocs.length} documents (${progress}%)`, 14, 55);
  
  // Common Documents
  doc.setFontSize(14);
  doc.text('Common Documents', 14, 70);
  
  const commonTableData = commonDocs.map(d => [
    checkedItems[d.id] ? '✓' : '○',
    d.name,
    d.description,
  ]);
  
  autoTable(doc, {
    startY: 75,
    head: [['Status', 'Document', 'Description']],
    body: commonTableData,
    headStyles: {
      fillColor: [16, 185, 129],
      textColor: 255,
      fontStyle: 'bold',
    },
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    columnStyles: {
      0: { cellWidth: 15, halign: 'center' },
      1: { cellWidth: 50 },
      2: { cellWidth: 115 },
    },
  });
  
  // Country-specific Documents
  const y1 = (doc as any).lastAutoTable.finalY || 130;
  
  if (countryDocs.length > 0) {
    doc.setFontSize(14);
    doc.text(`${country}-Specific Documents`, 14, y1 + 15);
    
    const countryTableData = countryDocs.map(d => [
      checkedItems[d.id] ? '✓' : '○',
      d.name,
      d.description,
    ]);
    
    autoTable(doc, {
      startY: y1 + 20,
      head: [['Status', 'Document', 'Description']],
      body: countryTableData,
      headStyles: {
        fillColor: [16, 185, 129],
        textColor: 255,
        fontStyle: 'bold',
      },
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
      columnStyles: {
        0: { cellWidth: 15, halign: 'center' },
        1: { cellWidth: 50 },
        2: { cellWidth: 115 },
      },
    });
  }
  
  // Footer
  const pageCount = doc.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Page ${i} of ${pageCount} | Horizons AI Guide - Document Checklist`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }
  
  doc.save(`document-checklist-${country.toLowerCase()}.pdf`);
};
