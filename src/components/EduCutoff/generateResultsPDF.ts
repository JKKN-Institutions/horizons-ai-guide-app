 import jsPDF from 'jspdf';
 import { StudentGroup, CutoffResult, getGroupCategory, isEligibleForTNEA } from './types';
 import { groupCategories } from './GroupSelector';
 
 const getGroupName = (groupCode: StudentGroup): string => {
   for (const cat of groupCategories) {
     const group = cat.groups.find(g => g.id === groupCode);
     if (group) {
       return `Group ${group.code} - ${group.subjects.join(', ')}`;
     }
   }
   return `Group ${groupCode}`;
 };
 
 const getEligibleCoursesForGroup = (groupCode: StudentGroup): string[] => {
   const category = getGroupCategory(groupCode);
   
   switch (category) {
     case 'science_maths':
       if (groupCode === '103' || groupCode === '104') {
         return [
           'B.E / B.Tech (Engineering)',
           'MBBS / BDS (with NEET)',
           'B.Pharm (Pharmacy)',
           'B.Sc Nursing',
           'B.Sc Physics / Chemistry / Mathematics',
           'BCA (Computer Applications)',
           'B.Arch (Architecture)',
         ];
       }
       return [
         'B.E / B.Tech (Engineering)',
         'B.Sc Physics / Chemistry / Mathematics',
         'BCA (Computer Applications)',
         'B.Arch (Architecture)',
         'Pilot Training (CPL)',
         'NDA (National Defence Academy)',
         'Merchant Navy',
       ];
     case 'science_bio':
       return [
         'MBBS (Medicine)',
         'BDS (Dental)',
         'B.Pharm / Pharm.D (Pharmacy)',
         'B.Sc Nursing',
         'Physiotherapy',
         'MLT (Medical Lab Technology)',
         'BAMS / BHMS (Ayurveda / Homeopathy)',
         'B.Sc Agriculture',
       ];
     case 'commerce':
       return [
         'B.Com (General / Honours)',
         'BBA (Business Administration)',
         'BCA (Computer Applications)',
         'CA Foundation',
         'CS (Company Secretary)',
         'CMA (Cost Management)',
         'B.Sc Banking & Finance',
         'Hotel Management (BHM)',
       ];
     case 'arts':
       return [
         'BA (English / History / Economics / Political Science)',
         'BA LLB (Law)',
         'B.A Journalism / Mass Communication',
         'B.Ed (Education)',
         'BSW (Social Work)',
         'Public Administration',
         'Library Science',
       ];
     default:
       return [];
   }
 };
 
 export const generateResultsPDF = (
   result: CutoffResult,
   group: StudentGroup,
   marks: Record<string, number | null>,
   category?: string
 ) => {
   const doc = new jsPDF();
   const pageWidth = doc.internal.pageSize.getWidth();
   let yPos = 20;
 
   // Header
   doc.setFillColor(139, 92, 246);
   doc.rect(0, 0, pageWidth, 40, 'F');
   
   doc.setTextColor(255, 255, 255);
   doc.setFontSize(22);
   doc.setFont('helvetica', 'bold');
   doc.text('EduCutoff - Eligibility Report', pageWidth / 2, 18, { align: 'center' });
   
   doc.setFontSize(12);
   doc.setFont('helvetica', 'normal');
   doc.text('TN State Board - Official Group Codes', pageWidth / 2, 28, { align: 'center' });
   
   doc.setFontSize(10);
   doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN', { 
     day: 'numeric', 
     month: 'long', 
     year: 'numeric' 
   })}`, pageWidth / 2, 36, { align: 'center' });
 
   yPos = 55;
 
   // Student Group Section
   doc.setTextColor(88, 28, 135);
   doc.setFontSize(14);
   doc.setFont('helvetica', 'bold');
   doc.text('Student Profile', 14, yPos);
   
   yPos += 10;
   doc.setDrawColor(139, 92, 246);
   doc.setLineWidth(0.5);
   doc.line(14, yPos, pageWidth - 14, yPos);
   
   yPos += 10;
   doc.setTextColor(0, 0, 0);
   doc.setFontSize(11);
   doc.setFont('helvetica', 'normal');
   doc.text(`12th Group: ${getGroupName(group)}`, 14, yPos);
   
   if (category) {
     yPos += 7;
     doc.text(`Category: ${category}`, 14, yPos);
   }
 
   // Marks Section
   yPos += 20;
   doc.setTextColor(88, 28, 135);
   doc.setFontSize(14);
   doc.setFont('helvetica', 'bold');
   doc.text('Marks Entered', 14, yPos);
   
   yPos += 10;
   doc.setDrawColor(139, 92, 246);
   doc.line(14, yPos, pageWidth - 14, yPos);
   
   yPos += 10;
   doc.setTextColor(0, 0, 0);
   doc.setFontSize(11);
   doc.setFont('helvetica', 'normal');
 
   const validMarks = Object.entries(marks).filter(([_, val]) => val !== null);
   validMarks.forEach(([subject, mark], index) => {
     const col = index % 2 === 0 ? 14 : pageWidth / 2;
     if (index % 2 === 0 && index !== 0) yPos += 7;
     doc.text(`${subject}: ${mark}/100`, col, yPos);
   });
 
   // Results Section
   yPos += 25;
   doc.setTextColor(88, 28, 135);
   doc.setFontSize(14);
   doc.setFont('helvetica', 'bold');
   doc.text('Calculated Results', 14, yPos);
   
   yPos += 10;
   doc.setDrawColor(139, 92, 246);
   doc.line(14, yPos, pageWidth - 14, yPos);
   
   yPos += 15;
 
   // Result boxes
   const boxWidth = 55;
   const boxHeight = 35;
   const startX = 14;
   const gap = 5;
 
   // TNEA Cutoff (for Science Maths groups)
   const showTNEA = isEligibleForTNEA(group);
   if (showTNEA && result.tneaCutoff) {
     doc.setFillColor(219, 234, 254);
     doc.roundedRect(startX, yPos, boxWidth, boxHeight, 3, 3, 'F');
     doc.setTextColor(29, 78, 216);
     doc.setFontSize(10);
     doc.setFont('helvetica', 'bold');
     doc.text('TNEA Cutoff', startX + boxWidth / 2, yPos + 10, { align: 'center' });
     doc.setFontSize(18);
     doc.text(`${result.tneaCutoff}`, startX + boxWidth / 2, yPos + 24, { align: 'center' });
     doc.setFontSize(8);
     doc.setFont('helvetica', 'normal');
     doc.text('out of 200', startX + boxWidth / 2, yPos + 31, { align: 'center' });
   }
 
   // Overall Percentage
   const percentX = showTNEA ? startX + boxWidth + gap : startX;
   doc.setFillColor(220, 252, 231);
   doc.roundedRect(percentX, yPos, boxWidth, boxHeight, 3, 3, 'F');
   doc.setTextColor(21, 128, 61);
   doc.setFontSize(10);
   doc.setFont('helvetica', 'bold');
   doc.text('Overall %', percentX + boxWidth / 2, yPos + 10, { align: 'center' });
   doc.setFontSize(18);
   doc.text(`${result.overallPercentage}%`, percentX + boxWidth / 2, yPos + 24, { align: 'center' });
 
   // Percentile
   const percentileX = percentX + boxWidth + gap;
   doc.setFillColor(243, 232, 255);
   doc.roundedRect(percentileX, yPos, boxWidth, boxHeight, 3, 3, 'F');
   doc.setTextColor(126, 34, 206);
   doc.setFontSize(10);
   doc.setFont('helvetica', 'bold');
   doc.text('Percentile', percentileX + boxWidth / 2, yPos + 10, { align: 'center' });
   doc.setFontSize(18);
   doc.text(`${result.percentile}th`, percentileX + boxWidth / 2, yPos + 24, { align: 'center' });
   doc.setFontSize(8);
   doc.setFont('helvetica', 'normal');
   doc.text('(Estimated)', percentileX + boxWidth / 2, yPos + 31, { align: 'center' });
 
   // Eligible Courses Section
   yPos += boxHeight + 20;
   doc.setTextColor(88, 28, 135);
   doc.setFontSize(14);
   doc.setFont('helvetica', 'bold');
   doc.text('Eligible Courses', 14, yPos);
   
   yPos += 10;
   doc.setDrawColor(139, 92, 246);
   doc.line(14, yPos, pageWidth - 14, yPos);
   
   yPos += 10;
   doc.setTextColor(0, 0, 0);
   doc.setFontSize(10);
   doc.setFont('helvetica', 'normal');
 
   const eligibleCourses = getEligibleCoursesForGroup(group);
   eligibleCourses.forEach((course) => {
     if (yPos > 270) {
       doc.addPage();
       yPos = 20;
     }
     doc.setFillColor(34, 197, 94);
     doc.circle(18, yPos - 1, 1.5, 'F');
     doc.text(course, 24, yPos);
     yPos += 7;
   });
 
   // Footer
   const footerY = doc.internal.pageSize.getHeight() - 15;
   doc.setFillColor(139, 92, 246);
   doc.rect(0, footerY - 5, pageWidth, 20, 'F');
   
   doc.setTextColor(255, 255, 255);
   doc.setFontSize(9);
   doc.text('VAZHIKATTI - Career Guidance Platform', pageWidth / 2, footerY + 3, { align: 'center' });
   doc.setFontSize(8);
   doc.text('www.vazhikatti.com', pageWidth / 2, footerY + 9, { align: 'center' });
 
   // Save PDF
   const filename = `EduCutoff_Report_Group_${group}_${new Date().toISOString().split('T')[0]}.pdf`;
   doc.save(filename);
 };