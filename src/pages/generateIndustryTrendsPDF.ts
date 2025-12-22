import jsPDF from 'jspdf';

interface Sector {
  id: string;
  icon: string;
  title: string;
  tamilTitle: string;
  subSectors: string[];
  salaryRange: string;
  topCompanies: string[];
  courses: string[];
  colleges: string[];
  careerPaths: string[];
  whyGrowing?: string[];
}

interface StreamRoadmap {
  title: string;
  bestPaths: string[];
  courses: string[];
  skills: string[];
}

interface SalaryData {
  industry: string;
  entry: string;
  experienced: string;
}

export const generateIndustryTrendsPDF = (
  sectors: Sector[],
  streamRoadmaps: Record<string, StreamRoadmap>,
  salaryData: SalaryData[],
  selectedStream?: string
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 20;

  // Header
  doc.setFillColor(22, 101, 52); // Green
  doc.rect(0, 0, pageWidth, 45, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text("India's Job Market 2026 - Career Trends", pageWidth / 2, 18, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Industry Insights & Career Roadmap', pageWidth / 2, 30, { align: 'center' });
  
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })}`, pageWidth / 2, 40, { align: 'center' });

  yPos = 60;

  // Section 1: High Growth Sectors
  doc.setTextColor(22, 101, 52);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('High Growth Sectors in India 2026', 14, yPos);
  
  yPos += 8;
  doc.setDrawColor(22, 101, 52);
  doc.setLineWidth(0.5);
  doc.line(14, yPos, pageWidth - 14, yPos);
  yPos += 10;

  sectors.forEach((sector, index) => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    // Sector title
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${sector.title}`, 14, yPos);
    
    yPos += 6;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(`Salary Range: ${sector.salaryRange}`, 20, yPos);
    
    yPos += 5;
    doc.text(`Sub-sectors: ${sector.subSectors.slice(0, 3).join(', ')}`, 20, yPos);
    
    yPos += 5;
    doc.text(`Top Companies: ${sector.topCompanies.slice(0, 4).join(', ')}`, 20, yPos);
    
    yPos += 8;
  });

  // Section 2: Salary Insights
  doc.addPage();
  yPos = 20;
  
  doc.setTextColor(22, 101, 52);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Expected Salaries by Industry (2026)', 14, yPos);
  
  yPos += 8;
  doc.setDrawColor(22, 101, 52);
  doc.line(14, yPos, pageWidth - 14, yPos);
  yPos += 15;

  // Table header
  doc.setFillColor(240, 240, 240);
  doc.rect(14, yPos - 5, pageWidth - 28, 10, 'F');
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Industry', 20, yPos);
  doc.text('Entry Level', 90, yPos);
  doc.text('5 Years Exp', 140, yPos);
  
  yPos += 10;

  salaryData.forEach((row) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    // Remove emoji from industry name for PDF
    const cleanIndustry = row.industry.replace(/[^\x00-\x7F]/g, '').trim();
    doc.text(cleanIndustry, 20, yPos);
    doc.text(row.entry, 90, yPos);
    doc.setTextColor(22, 101, 52);
    doc.setFont('helvetica', 'bold');
    doc.text(row.experienced, 140, yPos);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    yPos += 8;
  });

  // Section 3: Career Roadmap
  yPos += 15;
  
  doc.setTextColor(22, 101, 52);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Skill Roadmap by 12th Stream', 14, yPos);
  
  yPos += 8;
  doc.setDrawColor(22, 101, 52);
  doc.line(14, yPos, pageWidth - 14, yPos);
  yPos += 10;

  Object.entries(streamRoadmaps).forEach(([key, roadmap]) => {
    if (selectedStream && key !== selectedStream) return;
    
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(roadmap.title, 14, yPos);
    
    yPos += 7;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text(`Best Paths: ${roadmap.bestPaths.join(', ')}`, 20, yPos);
    
    yPos += 5;
    doc.text(`Recommended Courses: ${roadmap.courses.join(', ')}`, 20, yPos);
    
    yPos += 7;
    doc.setFont('helvetica', 'italic');
    doc.text('Skills Roadmap:', 20, yPos);
    yPos += 5;
    
    roadmap.skills.forEach((skill) => {
      doc.setFont('helvetica', 'normal');
      doc.text(`• ${skill}`, 25, yPos);
      yPos += 5;
    });
    
    yPos += 8;
  });

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 15;
  doc.setFillColor(22, 101, 52);
  doc.rect(0, footerY - 5, pageWidth, 20, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text('JKKN AI Horizons - Career Guidance Platform', pageWidth / 2, footerY + 3, { align: 'center' });
  doc.setFontSize(8);
  doc.text('www.jkknaihorizons.com', pageWidth / 2, footerY + 9, { align: 'center' });

  // Save PDF
  const filename = `Industry_Trends_2026_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
};
