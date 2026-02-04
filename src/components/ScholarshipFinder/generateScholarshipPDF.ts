import jsPDF from 'jspdf';
import { Scholarship } from './types';

export const generateScholarshipPDF = (scholarships: Scholarship[]) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let yPos = margin;

  // Helper function to add new page if needed
  const checkPageBreak = (requiredSpace: number) => {
    if (yPos + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPos = margin;
      return true;
    }
    return false;
  };

  // Helper function to wrap text
  const addWrappedText = (text: string, x: number, maxWidth: number, fontSize: number = 10) => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, maxWidth);
    lines.forEach((line: string) => {
      checkPageBreak(6);
      doc.text(line, x, yPos);
      yPos += fontSize * 0.4;
    });
  };

  // Title Page
  doc.setFillColor(10, 46, 31); // Dark green
  doc.rect(0, 0, pageWidth, 60, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Scholarship Brochure', pageWidth / 2, 30, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('JKKN Institutions', pageWidth / 2, 42, { align: 'center' });
  doc.text(`Generated on ${new Date().toLocaleDateString('en-IN')}`, pageWidth / 2, 52, { align: 'center' });

  yPos = 75;
  doc.setTextColor(0, 0, 0);

  // Summary Section
  doc.setFillColor(255, 107, 53); // Orange
  doc.rect(margin, yPos, pageWidth - margin * 2, 25, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Summary', margin + 5, yPos + 10);
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`Total Scholarships: ${scholarships.length}`, margin + 5, yPos + 20);
  
  const govtCount = scholarships.filter(s => s.type === 'government').length;
  const corpCount = scholarships.filter(s => s.type === 'corporate').length;
  const ngoCount = scholarships.filter(s => s.type === 'ngo').length;
  const sportsCount = scholarships.filter(s => s.type === 'sports').length;
  
  doc.text(`Govt: ${govtCount} | Corporate: ${corpCount} | NGO: ${ngoCount} | Sports: ${sportsCount}`, pageWidth / 2, yPos + 20, { align: 'center' });

  yPos += 40;
  doc.setTextColor(0, 0, 0);

  // Scholarship Details
  scholarships.forEach((scholarship, index) => {
    checkPageBreak(80);

    // Scholarship header
    const typeColors: Record<string, [number, number, number]> = {
      government: [37, 99, 235],
      corporate: [124, 58, 237],
      ngo: [236, 72, 153],
      sports: [229, 57, 53]
    };
    
    const color = typeColors[scholarship.type] || [100, 100, 100];
    doc.setFillColor(color[0], color[1], color[2]);
    doc.rect(margin, yPos, pageWidth - margin * 2, 12, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${scholarship.name}`, margin + 3, yPos + 8);
    
    const typeLabel = scholarship.type === 'government' ? 'Government' :
                      scholarship.type === 'corporate' ? 'Corporate' :
                      scholarship.type === 'sports' ? 'Sports' : 'NGO/Trust';
    doc.setFontSize(9);
    doc.text(typeLabel, pageWidth - margin - 3, yPos + 8, { align: 'right' });

    yPos += 16;
    doc.setTextColor(0, 0, 0);

    // Provider and Amount
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Provider:', margin, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(scholarship.provider, margin + 25, yPos);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Amount:', pageWidth / 2, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(scholarship.amount, pageWidth / 2 + 22, yPos);
    yPos += 6;

    // Deadline
    doc.setFont('helvetica', 'bold');
    doc.text('Deadline:', margin, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(scholarship.deadline, margin + 25, yPos);
    yPos += 8;

    // Description
    doc.setFont('helvetica', 'bold');
    doc.text('Description:', margin, yPos);
    yPos += 5;
    doc.setFont('helvetica', 'normal');
    addWrappedText(scholarship.description, margin, pageWidth - margin * 2, 9);
    yPos += 3;

    // Eligibility
    checkPageBreak(20);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Eligibility Criteria:', margin, yPos);
    yPos += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    scholarship.eligibility.forEach((criteria) => {
      checkPageBreak(5);
      doc.text(`• ${criteria}`, margin + 3, yPos);
      yPos += 4;
    });
    yPos += 3;

    // Documents Required
    checkPageBreak(20);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Documents Required:', margin, yPos);
    yPos += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    scholarship.documents.forEach((docItem) => {
      checkPageBreak(5);
      doc.text(`• ${docItem}`, margin + 3, yPos);
      yPos += 4;
    });
    yPos += 3;

    // How to Apply
    checkPageBreak(25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('How to Apply:', margin, yPos);
    yPos += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    scholarship.howToApply.forEach((step, idx) => {
      checkPageBreak(5);
      doc.text(`${idx + 1}. ${step}`, margin + 3, yPos);
      yPos += 4;
    });
    yPos += 3;

    // Benefits
    if (scholarship.benefits && scholarship.benefits.length > 0) {
      checkPageBreak(15);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('Benefits:', margin, yPos);
      yPos += 5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      scholarship.benefits.forEach((benefit) => {
        checkPageBreak(5);
        doc.text(`• ${benefit.label}: ${benefit.value}`, margin + 3, yPos);
        yPos += 4;
      });
      yPos += 3;
    }

    // Contact Info
    checkPageBreak(15);
    doc.setFillColor(245, 245, 245);
    doc.rect(margin, yPos, pageWidth - margin * 2, 12, 'F');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Apply:', margin + 3, yPos + 5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(37, 99, 235);
    doc.text(scholarship.applicationUrl, margin + 20, yPos + 5);
    doc.setTextColor(0, 0, 0);
    if (scholarship.helpline) {
      doc.setFont('helvetica', 'bold');
      doc.text('Helpline:', margin + 3, yPos + 10);
      doc.setFont('helvetica', 'normal');
      doc.text(scholarship.helpline, margin + 28, yPos + 10);
    }

    yPos += 20;

    // Separator
    if (index < scholarships.length - 1) {
      checkPageBreak(10);
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 8;
    }
  });

  // Footer on last page
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Page ${i} of ${totalPages} | VAZHIKATTI | www.vazhikatti.com`,
      pageWidth / 2,
      pageHeight - 8,
      { align: 'center' }
    );
  }

  // Save the PDF
  const fileName = `JKKN_Scholarship_Brochure_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};
