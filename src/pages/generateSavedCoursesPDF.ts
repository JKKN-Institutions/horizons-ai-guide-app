import jsPDF from 'jspdf';
import { Course } from '@/data/courseDatabase';

interface SavedCourseWithNote extends Course {
  note?: string;
}

const streamLabels: Record<string, string> = {
  pcm: 'Science (PCM)',
  pcb: 'Science (PCB)',
  pcmb: 'Science (PCMB)',
  commerce_math: 'Commerce (with Math)',
  commerce: 'Commerce',
  arts: 'Arts / Humanities',
};

export const generateSavedCoursesPDF = (
  courses: SavedCourseWithNote[]
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);
  let yPos = 20;

  const checkPageBreak = (requiredHeight: number) => {
    if (yPos + requiredHeight > pageHeight - 20) {
      doc.addPage();
      yPos = 20;
      return true;
    }
    return false;
  };

  // Header
  doc.setFillColor(239, 68, 68); // Red-500 for saved/heart theme
  doc.rect(0, 0, pageWidth, 45, 'F');

  // Gradient effect
  doc.setFillColor(220, 38, 38); // Red-600
  doc.rect(pageWidth / 2, 0, pageWidth / 2, 45, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('My Saved Courses', pageWidth / 2, 22, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`${courses.length} courses saved`, pageWidth / 2, 32, { align: 'center' });

  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN')}`, pageWidth / 2, 40, { align: 'center' });

  yPos = 55;

  // Summary Stats
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  
  const streams = [...new Set(courses.map(c => c.stream))];
  const categories = [...new Set(courses.map(c => c.category))];
  const withNotes = courses.filter(c => c.note).length;
  
  doc.text(`Streams: ${streams.map(s => streamLabels[s] || s).join(', ')}`, margin, yPos);
  yPos += 6;
  doc.text(`Categories: ${categories.slice(0, 5).join(', ')}${categories.length > 5 ? '...' : ''}`, margin, yPos);
  yPos += 6;
  doc.text(`Courses with notes: ${withNotes}`, margin, yPos);
  yPos += 12;

  // Divider
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;

  // Courses
  courses.forEach((course, index) => {
    // Estimate height needed for this course
    const hasNote = course.note && course.note.trim();
    const noteLines = hasNote ? doc.splitTextToSize(course.note!, contentWidth - 10) : [];
    const estimatedHeight = 55 + (hasNote ? (noteLines.length * 5) + 15 : 0);
    
    checkPageBreak(estimatedHeight);

    // Course number badge
    doc.setFillColor(59, 130, 246);
    doc.roundedRect(margin, yPos - 4, 20, 10, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text(`#${index + 1}`, margin + 10, yPos + 2, { align: 'center' });

    // Stream badge
    const streamLabel = streamLabels[course.stream] || course.stream;
    doc.setFillColor(229, 231, 235);
    const streamBadgeWidth = doc.getTextWidth(streamLabel) + 8;
    doc.roundedRect(margin + 25, yPos - 4, streamBadgeWidth, 10, 2, 2, 'F');
    doc.setTextColor(75, 85, 99);
    doc.text(streamLabel, margin + 29, yPos + 2);

    yPos += 12;

    // Course name
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(course.name, margin, yPos);
    yPos += 7;

    // Category
    doc.setTextColor(107, 114, 128);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Category: ${course.category}`, margin, yPos);
    yPos += 6;

    // Details row
    doc.setFontSize(9);
    doc.setTextColor(75, 85, 99);
    const details = [
      `Duration: ${course.duration}`,
      `Fees: ${course.feesRange}`,
      `Exam: ${course.entranceExam}`
    ];
    doc.text(details.join('  |  '), margin, yPos);
    yPos += 6;

    // Eligibility
    doc.text(`Eligibility: ${course.eligibility}`, margin, yPos);
    yPos += 6;

    // Description (if available)
    if (course.description) {
      doc.setTextColor(107, 114, 128);
      doc.setFontSize(9);
      const descLines = doc.splitTextToSize(course.description, contentWidth);
      doc.text(descLines.slice(0, 2), margin, yPos);
      yPos += descLines.slice(0, 2).length * 4 + 2;
    }

    // Personal Note (if available)
    if (hasNote) {
      yPos += 2;
      doc.setFillColor(254, 249, 195); // Yellow-100
      doc.setDrawColor(250, 204, 21); // Yellow-400
      
      const noteBoxHeight = (noteLines.length * 5) + 10;
      doc.roundedRect(margin, yPos - 3, contentWidth, noteBoxHeight, 2, 2, 'FD');
      
      doc.setTextColor(113, 63, 18); // Yellow-900
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text('Personal Note:', margin + 4, yPos + 3);
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text(noteLines, margin + 4, yPos + 9);
      
      yPos += noteBoxHeight + 3;
    }

    // Career Prospects (if available)
    if (course.careerProspects && course.careerProspects.length > 0) {
      doc.setTextColor(22, 163, 74); // Green-600
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text('Career Prospects: ', margin, yPos);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(75, 85, 99);
      const prospectsText = course.careerProspects.slice(0, 4).join(', ');
      doc.text(prospectsText, margin + doc.getTextWidth('Career Prospects: '), yPos);
      yPos += 6;
    }

    // Top Colleges (if available)
    if (course.topColleges && course.topColleges.length > 0) {
      doc.setTextColor(37, 99, 235); // Blue-600
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text('Top Colleges: ', margin, yPos);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(75, 85, 99);
      const collegesText = course.topColleges.slice(0, 4).join(', ');
      doc.text(collegesText, margin + doc.getTextWidth('Top Colleges: '), yPos);
      yPos += 6;
    }

    yPos += 8;

    // Separator line
    doc.setDrawColor(229, 231, 235);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;
  });

  // Footer on last page
  const footerY = pageHeight - 15;
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
  
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(8);
  doc.text('Generated by JKKN AI Career Predictor', pageWidth / 2, footerY, { align: 'center' });
  doc.text('www.jkkn.ac.in', pageWidth / 2, footerY + 4, { align: 'center' });

  // Save the PDF
  doc.save('my-saved-courses.pdf');
};
