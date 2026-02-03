import jsPDF from 'jspdf';

interface CourseMatch {
  id: string;
  name: string;
  description?: string;
  duration: string;
  feesRange: string;
  entranceExam: string;
  eligibility: string;
  category: string;
  matchScore: number;
  matchReasons: string[];
  careerProspects?: string[];
  topColleges?: string[];
}

interface FormData {
  stream: string;
  percentage: string;
  interests: string[];
  priorities: string[];
  budget: string;
  duration: string;
}

const streamLabels: Record<string, string> = {
  pcm: 'Science (PCM)',
  pcb: 'Science (PCB)',
  pcmb: 'Science (PCMB)',
  commerce_math: 'Commerce (with Math)',
  commerce: 'Commerce',
  arts: 'Arts / Humanities',
};

const percentageLabels: Record<string, string> = {
  above90: 'Above 90%',
  '80to90': '80-90%',
  '70to80': '70-80%',
  '60to70': '60-70%',
  '50to60': '50-60%',
  below50: 'Below 50%',
};

export const generateCareerPredictorPDF = (
  recommendations: CourseMatch[],
  formData: FormData
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPos = 20;

  // Header
  doc.setFillColor(59, 130, 246); // Blue
  doc.rect(0, 0, pageWidth, 45, 'F');

  // Gradient effect with purple
  doc.setFillColor(139, 92, 246);
  doc.rect(pageWidth / 2, 0, pageWidth / 2, 45, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('AI Career Predictor', pageWidth / 2, 22, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Personalized Course Recommendations', pageWidth / 2, 32, { align: 'center' });

  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN')}`, pageWidth / 2, 40, { align: 'center' });

  yPos = 55;

  // Student Profile Section
  doc.setTextColor(59, 130, 246);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Your Profile', 14, yPos);
  yPos += 8;

  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  const profileData = [
    ['Stream:', streamLabels[formData.stream] || formData.stream],
    ['Percentage:', percentageLabels[formData.percentage] || formData.percentage],
    ['Interests:', formData.interests.join(', ')],
    ['Priorities:', formData.priorities.join(', ')],
  ];

  profileData.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold');
    doc.text(label, 14, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(value, 50, yPos);
    yPos += 6;
  });

  yPos += 10;

  // Recommendations Section
  doc.setTextColor(59, 130, 246);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Recommended Courses', 14, yPos);
  yPos += 10;

  recommendations.forEach((course, index) => {
    // Check if we need a new page
    if (yPos > pageHeight - 60) {
      doc.addPage();
      yPos = 20;
    }

    // Course card background
    const cardHeight = 45;
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(10, yPos - 5, pageWidth - 20, cardHeight, 3, 3, 'F');

    // Match score badge
    const matchColor = course.matchScore >= 80 
      ? [16, 185, 129] // Green
      : course.matchScore >= 60 
        ? [245, 158, 11] // Orange
        : [59, 130, 246]; // Blue

    doc.setFillColor(matchColor[0], matchColor[1], matchColor[2]);
    doc.roundedRect(pageWidth - 35, yPos - 2, 22, 10, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text(`${course.matchScore}%`, pageWidth - 24, yPos + 5, { align: 'center' });

    // Course number and name
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${course.name}`, 14, yPos + 5);

    // Course details
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    
    const details = `Duration: ${course.duration} | Fees: ${course.feesRange} | Exam: ${course.entranceExam}`;
    doc.text(details, 14, yPos + 13);

    // Description (truncated)
    const description = (course.description || 'Professional course with excellent career prospects').length > 100 
      ? (course.description || 'Professional course with excellent career prospects').substring(0, 100) + '...'
      : (course.description || 'Professional course with excellent career prospects');
    doc.text(description, 14, yPos + 21, { maxWidth: pageWidth - 30 });

    // Match reasons
    if (course.matchReasons.length > 0) {
      doc.setTextColor(16, 185, 129);
      doc.setFontSize(8);
      doc.text(`✓ ${course.matchReasons.slice(0, 2).join(' • ')}`, 14, yPos + 35);
    }

    yPos += cardHeight + 8;
  });

  // Footer
  yPos = pageHeight - 15;
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(8);
  doc.text('VAZHIKATTI - Your Career Partner', pageWidth / 2, yPos, { align: 'center' });

  // Save
  doc.save('career-predictor-results.pdf');
};
