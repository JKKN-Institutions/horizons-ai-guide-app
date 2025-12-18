import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { StudentGroup, EligibleCourse } from './types';
import { CheckCircle2, AlertTriangle, XCircle, Star, MapPin, Phone, Globe, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CollegeInfo {
  name: string;
  location: string;
  type: 'Government' | 'Aided' | 'Private' | 'Autonomous';
  rating?: string;
  fee?: string;
  website?: string;
}

interface CourseColleges {
  [key: string]: CollegeInfo[];
}

const collegeData: CourseColleges = {
  engineering: [
    { name: 'Anna University, Chennai', location: 'Chennai', type: 'Government', rating: 'NAAC A++', fee: '₹50,000/year' },
    { name: 'PSG College of Technology', location: 'Coimbatore', type: 'Autonomous', rating: 'NAAC A++', fee: '₹1,20,000/year' },
    { name: 'Coimbatore Institute of Technology', location: 'Coimbatore', type: 'Government', rating: 'NAAC A+', fee: '₹45,000/year' },
    { name: 'Thiagarajar College of Engineering', location: 'Madurai', type: 'Autonomous', rating: 'NAAC A+', fee: '₹90,000/year' },
    { name: 'Government College of Engineering, Salem', location: 'Salem', type: 'Government', rating: 'NAAC A', fee: '₹40,000/year' },
    { name: 'JKKN College of Engineering & Technology', location: 'Namakkal', type: 'Private', rating: 'NAAC A', fee: '₹75,000/year' },
    { name: 'Kongu Engineering College', location: 'Erode', type: 'Autonomous', rating: 'NAAC A++', fee: '₹1,10,000/year' },
    { name: 'Sri Krishna College of Engineering', location: 'Coimbatore', type: 'Autonomous', rating: 'NAAC A+', fee: '₹95,000/year' },
    { name: 'Bannari Amman Institute of Technology', location: 'Erode', type: 'Autonomous', rating: 'NAAC A+', fee: '₹1,00,000/year' },
    { name: 'Kumaraguru College of Technology', location: 'Coimbatore', type: 'Autonomous', rating: 'NAAC A++', fee: '₹1,15,000/year' },
  ],
  computer_it: [
    { name: 'Loyola College', location: 'Chennai', type: 'Aided', rating: 'NAAC A++', fee: '₹35,000/year' },
    { name: 'Presidency College', location: 'Chennai', type: 'Government', rating: 'NAAC A+', fee: '₹8,000/year' },
    { name: 'PSG College of Arts & Science', location: 'Coimbatore', type: 'Aided', rating: 'NAAC A++', fee: '₹55,000/year' },
    { name: 'JKKN College of Arts and Science', location: 'Namakkal', type: 'Private', rating: 'NAAC A', fee: '₹45,000/year' },
    { name: 'Bishop Heber College', location: 'Trichy', type: 'Aided', rating: 'NAAC A++', fee: '₹40,000/year' },
    { name: 'St. Joseph\'s College', location: 'Trichy', type: 'Aided', rating: 'NAAC A++', fee: '₹38,000/year' },
    { name: 'Madras Christian College', location: 'Chennai', type: 'Aided', rating: 'NAAC A++', fee: '₹45,000/year' },
    { name: 'American College', location: 'Madurai', type: 'Aided', rating: 'NAAC A++', fee: '₹42,000/year' },
  ],
  pharmacy: [
    { name: 'JKKN College of Pharmacy', location: 'Namakkal', type: 'Private', rating: 'PCI Approved', fee: '₹85,000/year' },
    { name: 'JSS College of Pharmacy', location: 'Ooty', type: 'Private', rating: 'NAAC A+', fee: '₹1,50,000/year' },
    { name: 'PSG College of Pharmacy', location: 'Coimbatore', type: 'Private', rating: 'PCI Approved', fee: '₹1,20,000/year' },
    { name: 'Madras Medical College - Pharmacy', location: 'Chennai', type: 'Government', rating: 'PCI Approved', fee: '₹25,000/year' },
    { name: 'Sri Ramachandra Faculty of Pharmacy', location: 'Chennai', type: 'Private', rating: 'NAAC A+', fee: '₹2,00,000/year' },
    { name: 'Annamalai University - Pharmacy', location: 'Chidambaram', type: 'Government', rating: 'PCI Approved', fee: '₹45,000/year' },
    { name: 'Karpagam College of Pharmacy', location: 'Coimbatore', type: 'Private', rating: 'PCI Approved', fee: '₹95,000/year' },
  ],
  nursing: [
    { name: 'JKKN College of Nursing', location: 'Namakkal', type: 'Private', rating: 'INC Approved', fee: '₹60,000/year' },
    { name: 'Madras Medical College - Nursing', location: 'Chennai', type: 'Government', rating: 'INC Approved', fee: '₹15,000/year' },
    { name: 'CMC Vellore - Nursing', location: 'Vellore', type: 'Aided', rating: 'NAAC A++', fee: '₹80,000/year' },
    { name: 'PSG College of Nursing', location: 'Coimbatore', type: 'Private', rating: 'INC Approved', fee: '₹1,00,000/year' },
    { name: 'Sri Ramachandra College of Nursing', location: 'Chennai', type: 'Private', rating: 'INC Approved', fee: '₹1,50,000/year' },
    { name: 'Apollo College of Nursing', location: 'Chennai', type: 'Private', rating: 'INC Approved', fee: '₹1,20,000/year' },
  ],
  bcom: [
    { name: 'Loyola College', location: 'Chennai', type: 'Aided', rating: 'NAAC A++', fee: '₹30,000/year' },
    { name: 'Stella Maris College', location: 'Chennai', type: 'Aided', rating: 'NAAC A++', fee: '₹35,000/year' },
    { name: 'PSG College of Arts & Science', location: 'Coimbatore', type: 'Aided', rating: 'NAAC A++', fee: '₹50,000/year' },
    { name: 'Bishop Heber College', location: 'Trichy', type: 'Aided', rating: 'NAAC A++', fee: '₹38,000/year' },
    { name: 'JKKN College of Arts and Science', location: 'Namakkal', type: 'Private', rating: 'NAAC A', fee: '₹40,000/year' },
    { name: 'Ethiraj College for Women', location: 'Chennai', type: 'Aided', rating: 'NAAC A++', fee: '₹32,000/year' },
    { name: 'Women\'s Christian College', location: 'Chennai', type: 'Aided', rating: 'NAAC A+', fee: '₹28,000/year' },
    { name: 'Nirmala College for Women', location: 'Coimbatore', type: 'Aided', rating: 'NAAC A++', fee: '₹35,000/year' },
  ],
  bba: [
    { name: 'Loyola College', location: 'Chennai', type: 'Aided', rating: 'NAAC A++', fee: '₹45,000/year' },
    { name: 'Christ College', location: 'Bangalore', type: 'Autonomous', rating: 'NAAC A++', fee: '₹1,20,000/year' },
    { name: 'PSG College of Arts & Science', location: 'Coimbatore', type: 'Aided', rating: 'NAAC A++', fee: '₹60,000/year' },
    { name: 'JKKN College of Arts and Science', location: 'Namakkal', type: 'Private', rating: 'NAAC A', fee: '₹50,000/year' },
    { name: 'Bishop Heber College', location: 'Trichy', type: 'Aided', rating: 'NAAC A++', fee: '₹42,000/year' },
    { name: 'Kumaraguru College of Liberal Arts', location: 'Coimbatore', type: 'Private', rating: 'NAAC A+', fee: '₹85,000/year' },
  ],
  ba: [
    { name: 'Madras Christian College', location: 'Chennai', type: 'Aided', rating: 'NAAC A++', fee: '₹25,000/year' },
    { name: 'Loyola College', location: 'Chennai', type: 'Aided', rating: 'NAAC A++', fee: '₹28,000/year' },
    { name: 'Presidency College', location: 'Chennai', type: 'Government', rating: 'NAAC A+', fee: '₹5,000/year' },
    { name: 'Queen Mary\'s College', location: 'Chennai', type: 'Government', rating: 'NAAC A', fee: '₹6,000/year' },
    { name: 'American College', location: 'Madurai', type: 'Aided', rating: 'NAAC A++', fee: '₹30,000/year' },
    { name: 'St. Joseph\'s College', location: 'Trichy', type: 'Aided', rating: 'NAAC A++', fee: '₹28,000/year' },
    { name: 'Pachaiyappa\'s College', location: 'Chennai', type: 'Aided', rating: 'NAAC A', fee: '₹15,000/year' },
  ],
  diploma: [
    { name: 'Government Polytechnic College, Chennai', location: 'Chennai', type: 'Government', fee: '₹5,000/year' },
    { name: 'Thiagarajar Polytechnic College', location: 'Salem', type: 'Aided', fee: '₹15,000/year' },
    { name: 'PSG Polytechnic College', location: 'Coimbatore', type: 'Aided', fee: '₹25,000/year' },
    { name: 'Central Polytechnic College', location: 'Chennai', type: 'Government', fee: '₹5,000/year' },
    { name: 'Kongu Polytechnic College', location: 'Erode', type: 'Private', fee: '₹20,000/year' },
    { name: 'Government Polytechnic, Coimbatore', location: 'Coimbatore', type: 'Government', fee: '₹5,000/year' },
  ],
  allied_health: [
    { name: 'JKKN College of Allied Health Sciences', location: 'Namakkal', type: 'Private', rating: 'Affiliated', fee: '₹55,000/year' },
    { name: 'SRM Institute - Allied Health', location: 'Chennai', type: 'Private', rating: 'NAAC A++', fee: '₹1,20,000/year' },
    { name: 'CMC Vellore - Allied Health', location: 'Vellore', type: 'Aided', rating: 'NAAC A++', fee: '₹75,000/year' },
    { name: 'PSG Institute of Medical Sciences', location: 'Coimbatore', type: 'Private', rating: 'NAAC A+', fee: '₹90,000/year' },
    { name: 'Madras Medical College - Allied', location: 'Chennai', type: 'Government', fee: '₹20,000/year' },
  ],
  pure_science: [
    { name: 'Presidency College', location: 'Chennai', type: 'Government', rating: 'NAAC A+', fee: '₹5,000/year' },
    { name: 'Loyola College', location: 'Chennai', type: 'Aided', rating: 'NAAC A++', fee: '₹32,000/year' },
    { name: 'PSG College of Arts & Science', location: 'Coimbatore', type: 'Aided', rating: 'NAAC A++', fee: '₹48,000/year' },
    { name: 'Madras Christian College', location: 'Chennai', type: 'Aided', rating: 'NAAC A++', fee: '₹35,000/year' },
    { name: 'Bharathiar University', location: 'Coimbatore', type: 'Government', rating: 'NAAC A++', fee: '₹12,000/year' },
    { name: 'JKKN College of Arts and Science', location: 'Namakkal', type: 'Private', rating: 'NAAC A', fee: '₹42,000/year' },
  ],
  agriculture: [
    { name: 'Tamil Nadu Agricultural University', location: 'Coimbatore', type: 'Government', rating: 'ICAR Accredited', fee: '₹20,000/year' },
    { name: 'JKKN College of Agricultural Science', location: 'Namakkal', type: 'Private', rating: 'ICAR Approved', fee: '₹65,000/year' },
    { name: 'Annamalai University - Agriculture', location: 'Chidambaram', type: 'Government', fee: '₹35,000/year' },
    { name: 'AC&RI, Madurai', location: 'Madurai', type: 'Government', fee: '₹18,000/year' },
    { name: 'Anbil Dharmalingam Agricultural College', location: 'Trichy', type: 'Government', fee: '₹15,000/year' },
  ],
  journalism: [
    { name: 'Asian College of Journalism', location: 'Chennai', type: 'Private', rating: 'Top Ranked', fee: '₹3,50,000/year' },
    { name: 'Loyola College - Communication', location: 'Chennai', type: 'Aided', rating: 'NAAC A++', fee: '₹40,000/year' },
    { name: 'Madras Christian College', location: 'Chennai', type: 'Aided', rating: 'NAAC A++', fee: '₹38,000/year' },
    { name: 'PSG College of Arts & Science', location: 'Coimbatore', type: 'Aided', rating: 'NAAC A++', fee: '₹45,000/year' },
    { name: 'Ethiraj College - Journalism', location: 'Chennai', type: 'Aided', rating: 'NAAC A++', fee: '₹35,000/year' },
  ],
  bsw: [
    { name: 'Loyola College', location: 'Chennai', type: 'Aided', rating: 'NAAC A++', fee: '₹30,000/year' },
    { name: 'Madras School of Social Work', location: 'Chennai', type: 'Aided', rating: 'Top Ranked', fee: '₹45,000/year' },
    { name: 'Bishop Heber College', location: 'Trichy', type: 'Aided', rating: 'NAAC A++', fee: '₹35,000/year' },
    { name: 'St. Joseph\'s College', location: 'Trichy', type: 'Aided', rating: 'NAAC A++', fee: '₹32,000/year' },
    { name: 'American College', location: 'Madurai', type: 'Aided', rating: 'NAAC A++', fee: '₹34,000/year' },
  ],
  hotel: [
    { name: 'IHM Chennai', location: 'Chennai', type: 'Government', rating: 'NCHMCT', fee: '₹90,000/year' },
    { name: 'Welcomgroup Graduate School', location: 'Manipal', type: 'Private', rating: 'Top Ranked', fee: '₹2,50,000/year' },
    { name: 'SRM Hotel Management', location: 'Chennai', type: 'Private', rating: 'NAAC A++', fee: '₹1,50,000/year' },
    { name: 'SRMIST - Hotel Management', location: 'Chennai', type: 'Private', fee: '₹1,40,000/year' },
    { name: 'Alagappa University - HM', location: 'Karaikudi', type: 'Government', fee: '₹35,000/year' },
  ],
  bca: [
    { name: 'Loyola College', location: 'Chennai', type: 'Aided', rating: 'NAAC A++', fee: '₹40,000/year' },
    { name: 'PSG College of Arts & Science', location: 'Coimbatore', type: 'Aided', rating: 'NAAC A++', fee: '₹55,000/year' },
    { name: 'JKKN College of Arts and Science', location: 'Namakkal', type: 'Private', rating: 'NAAC A', fee: '₹48,000/year' },
    { name: 'Bishop Heber College', location: 'Trichy', type: 'Aided', rating: 'NAAC A++', fee: '₹42,000/year' },
    { name: 'Madras Christian College', location: 'Chennai', type: 'Aided', rating: 'NAAC A++', fee: '₹45,000/year' },
    { name: 'St. Joseph\'s College', location: 'Trichy', type: 'Aided', rating: 'NAAC A++', fee: '₹40,000/year' },
  ],
  architecture: [
    { name: 'School of Architecture & Planning, Anna University', location: 'Chennai', type: 'Government', rating: 'COA Approved', fee: '₹60,000/year' },
    { name: 'SRM School of Architecture', location: 'Chennai', type: 'Private', rating: 'COA Approved', fee: '₹2,00,000/year' },
    { name: 'Measi Academy of Architecture', location: 'Chennai', type: 'Private', rating: 'COA Approved', fee: '₹1,50,000/year' },
    { name: 'Sathyabama - Architecture', location: 'Chennai', type: 'Private', rating: 'COA Approved', fee: '₹1,80,000/year' },
  ],
  biotechnology: [
    { name: 'VIT Vellore', location: 'Vellore', type: 'Private', rating: 'NAAC A++', fee: '₹1,50,000/year' },
    { name: 'SRM Institute', location: 'Chennai', type: 'Private', rating: 'NAAC A++', fee: '₹1,40,000/year' },
    { name: 'PSG College of Technology', location: 'Coimbatore', type: 'Autonomous', rating: 'NAAC A++', fee: '₹1,20,000/year' },
    { name: 'Bharathiar University', location: 'Coimbatore', type: 'Government', rating: 'NAAC A++', fee: '₹25,000/year' },
    { name: 'Madurai Kamaraj University', location: 'Madurai', type: 'Government', rating: 'NAAC A++', fee: '₹20,000/year' },
  ],
};

interface EligibleCoursesProps {
  group: StudentGroup;
  cutoffScore: number;
  percentage: number;
  neetScore?: number;
}

const getCoursesByGroup = (group: StudentGroup, cutoff: number, percentage: number, neet?: number): EligibleCourse[] => {
  switch (group) {
    case 'pcm':
      return [
        { id: 'engineering', name: 'ENGINEERING', fullName: 'B.E / B.Tech', icon: '⚙️', collegeCount: 450, eligibilityStatus: cutoff >= 100 ? 'eligible' : cutoff >= 80 ? 'borderline' : 'not_eligible', cutoffRequired: 100, userCutoff: cutoff, note: 'CSE, ECE, Mech, Civil, EEE' },
        { id: 'computer_it', name: 'COMPUTER/IT', fullName: 'BCA, B.Sc CS, B.Sc IT', icon: '💻', collegeCount: 300, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible', note: 'Min: 50%' },
        { id: 'architecture', name: 'ARCHITECTURE', fullName: 'B.Arch, B.Planning', icon: '📐', collegeCount: 50, eligibilityStatus: 'eligible', entranceExam: 'NATA Required' },
        { id: 'pure_science', name: 'PURE SCIENCE', fullName: 'B.Sc Physics/Chemistry/Maths', icon: '🔬', collegeCount: 200, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'aviation', name: 'AVIATION/DEFENCE', fullName: 'Pilot Training, NDA, IAF', icon: '✈️', collegeCount: 0, eligibilityStatus: 'eligible', note: 'PCM Required' },
        { id: 'merchant_navy', name: 'MERCHANT NAVY', fullName: 'B.Sc Nautical, Marine Engineer', icon: '🚢', collegeCount: 0, eligibilityStatus: 'eligible' },
        { id: 'bca', name: 'BCA', fullName: 'Bachelor of Computer Applications', icon: '🖥️', collegeCount: 250, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'data_science', name: 'DATA SCIENCE', fullName: 'B.Sc Data Science, AI/ML', icon: '📊', collegeCount: 150, eligibilityStatus: percentage >= 60 ? 'eligible' : 'borderline', note: 'Emerging Field' },
        { id: 'statistics', name: 'STATISTICS', fullName: 'B.Sc Statistics, Actuarial Science', icon: '📈', collegeCount: 100, eligibilityStatus: percentage >= 55 ? 'eligible' : 'not_eligible' },
      ];
    case 'pcb':
      return [
        { id: 'mbbs', name: 'MBBS / BDS', fullName: 'Medicine & Dental', icon: '🏥', collegeCount: 50, eligibilityStatus: neet && neet >= 500 ? 'eligible' : neet && neet >= 400 ? 'borderline' : 'not_eligible', entranceExam: 'NEET Required', note: neet ? `Your NEET: ${neet}` : 'Enter NEET Score' },
        { id: 'pharmacy', name: 'PHARMACY', fullName: 'B.Pharm, Pharm.D', icon: '💊', collegeCount: 150, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'nursing', name: 'NURSING', fullName: 'B.Sc Nursing, GNM, ANM', icon: '🩺', collegeCount: 200, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'allied_health', name: 'ALLIED HEALTH', fullName: 'Physio, MLT, Radiology, Optometry', icon: '🧪', collegeCount: 100, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'ayush', name: 'AYUSH', fullName: 'BAMS, BHMS, BUMS, BNYS', icon: '🌿', collegeCount: 30, eligibilityStatus: 'borderline', entranceExam: 'NEET Required' },
        { id: 'agriculture', name: 'AGRICULTURE', fullName: 'B.Sc Agriculture, Veterinary', icon: '🌾', collegeCount: 80, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible', entranceExam: 'NEET for BVSc' },
        { id: 'biotechnology', name: 'BIOTECHNOLOGY', fullName: 'B.Sc/B.Tech Biotech', icon: '🧬', collegeCount: 100, eligibilityStatus: percentage >= 55 ? 'eligible' : 'not_eligible' },
        { id: 'microbiology', name: 'MICROBIOLOGY', fullName: 'B.Sc Microbiology, Biochemistry', icon: '🔬', collegeCount: 120, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'food_tech', name: 'FOOD TECHNOLOGY', fullName: 'B.Tech Food Tech, Dairy Tech', icon: '🍽️', collegeCount: 60, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'occupational_therapy', name: 'OCCUPATIONAL THERAPY', fullName: 'BOT, Speech Therapy', icon: '🤝', collegeCount: 40, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
      ];
    case 'pcmb':
      return [
        { id: 'engineering', name: 'ENGINEERING', fullName: 'B.E / B.Tech', icon: '⚙️', collegeCount: 450, eligibilityStatus: cutoff >= 100 ? 'eligible' : cutoff >= 80 ? 'borderline' : 'not_eligible', cutoffRequired: 100, userCutoff: cutoff },
        { id: 'mbbs', name: 'MBBS / BDS', fullName: 'Medicine & Dental', icon: '🏥', collegeCount: 50, eligibilityStatus: neet && neet >= 500 ? 'eligible' : 'borderline', entranceExam: 'NEET Required' },
        { id: 'pharmacy', name: 'PHARMACY', fullName: 'B.Pharm, Pharm.D', icon: '💊', collegeCount: 150, eligibilityStatus: 'eligible' },
        { id: 'biotechnology', name: 'BIOTECHNOLOGY', fullName: 'B.Sc/B.Tech Biotech', icon: '🧬', collegeCount: 100, eligibilityStatus: 'eligible' },
        { id: 'pure_science', name: 'RESEARCH', fullName: 'Integrated M.Sc, BS-MS', icon: '🔬', collegeCount: 50, eligibilityStatus: 'eligible' },
        { id: 'agriculture', name: 'AGRICULTURE', fullName: 'B.Sc Agriculture, Food Tech', icon: '🌾', collegeCount: 80, eligibilityStatus: 'eligible' },
        { id: 'nursing', name: 'NURSING', fullName: 'B.Sc Nursing, GNM', icon: '🩺', collegeCount: 200, eligibilityStatus: 'eligible' },
        { id: 'allied_health', name: 'ALLIED HEALTH', fullName: 'Physio, MLT, Radiology', icon: '🧪', collegeCount: 100, eligibilityStatus: 'eligible' },
        { id: 'computer_it', name: 'COMPUTER SCIENCE', fullName: 'B.Sc CS, BCA, B.Tech CS', icon: '💻', collegeCount: 300, eligibilityStatus: 'eligible' },
      ];
    case 'commerce':
      return [
        { id: 'bcom', name: 'B.COM', fullName: 'B.Com General/Honours/Corporate', icon: '📊', collegeCount: 400, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'bba', name: 'BBA', fullName: 'Business Admin, Aviation, Banking', icon: '🏢', collegeCount: 200, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'bca', name: 'BCA', fullName: 'Bachelor of Computer Apps', icon: '💻', collegeCount: 250, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'ca_cs', name: 'CA / CS / CMA', fullName: 'Chartered Accountant, Company Secretary', icon: '📜', collegeCount: 0, eligibilityStatus: 'eligible', entranceExam: 'Entrance Exams' },
        { id: 'banking', name: 'BANKING & FINANCE', fullName: 'B.Sc Banking, Finance', icon: '🏦', collegeCount: 100, eligibilityStatus: 'eligible' },
        { id: 'hotel', name: 'HOTEL MGMT', fullName: 'BHM, BHMCT, Hospitality', icon: '🏨', collegeCount: 80, eligibilityStatus: 'eligible' },
        { id: 'economics', name: 'ECONOMICS', fullName: 'BA/B.Sc Economics Honours', icon: '📈', collegeCount: 150, eligibilityStatus: percentage >= 55 ? 'eligible' : 'not_eligible' },
        { id: 'insurance', name: 'INSURANCE', fullName: 'B.Com Insurance, Risk Mgmt', icon: '🛡️', collegeCount: 50, eligibilityStatus: 'eligible' },
        { id: 'logistics', name: 'LOGISTICS', fullName: 'BBA Logistics, Supply Chain', icon: '🚚', collegeCount: 40, eligibilityStatus: 'eligible' },
        { id: 'event_mgmt', name: 'EVENT MANAGEMENT', fullName: 'BBA Event Mgmt, PR', icon: '🎪', collegeCount: 30, eligibilityStatus: 'eligible' },
      ];
    case 'arts':
      return [
        { id: 'ba', name: 'BA (Various)', fullName: 'English, History, Economics, etc.', icon: '📚', collegeCount: 500, eligibilityStatus: percentage >= 45 ? 'eligible' : 'not_eligible' },
        { id: 'law', name: 'LAW (LLB)', fullName: 'BA LLB, BBA LLB, LLB', icon: '⚖️', collegeCount: 50, eligibilityStatus: 'borderline', entranceExam: 'CLAT/LSAT Required' },
        { id: 'journalism', name: 'JOURNALISM', fullName: 'BA Journalism, BMM, Mass Comm', icon: '📰', collegeCount: 100, eligibilityStatus: 'eligible' },
        { id: 'bed', name: 'B.ED', fullName: 'Bachelor of Education', icon: '🎓', collegeCount: 200, eligibilityStatus: 'borderline', note: 'After UG Degree' },
        { id: 'bsw', name: 'BSW', fullName: 'Bachelor of Social Work', icon: '👥', collegeCount: 150, eligibilityStatus: 'eligible' },
        { id: 'civil_services', name: 'CIVIL SERVICES', fullName: 'UPSC/TNPSC Preparation', icon: '🌍', collegeCount: 0, eligibilityStatus: 'borderline', note: 'After Degree' },
        { id: 'psychology', name: 'PSYCHOLOGY', fullName: 'BA/B.Sc Psychology', icon: '🧠', collegeCount: 120, eligibilityStatus: 'eligible' },
        { id: 'fine_arts', name: 'FINE ARTS', fullName: 'BFA, Visual Arts, Design', icon: '🎨', collegeCount: 60, eligibilityStatus: 'eligible' },
        { id: 'library_science', name: 'LIBRARY SCIENCE', fullName: 'B.Lib, Information Science', icon: '📖', collegeCount: 40, eligibilityStatus: 'eligible' },
        { id: 'tourism', name: 'TOURISM', fullName: 'BTA, Travel & Tourism Mgmt', icon: '✈️', collegeCount: 50, eligibilityStatus: 'eligible' },
        { id: 'languages', name: 'LANGUAGES', fullName: 'BA Tamil, Hindi, French, German', icon: '🗣️', collegeCount: 200, eligibilityStatus: 'eligible' },
      ];
    case 'vocational':
      return [
        { id: 'diploma', name: 'DIPLOMA/POLYTECHNIC', fullName: 'Computer, Mechanical, Civil, etc.', icon: '🔧', collegeCount: 500, eligibilityStatus: 'eligible' },
        { id: 'iti', name: 'ITI COURSES', fullName: 'Fitter, Electrician, Welder, etc.', icon: '📜', collegeCount: 300, eligibilityStatus: 'eligible' },
        { id: 'lateral', name: 'LATERAL ENTRY', fullName: 'Direct B.E 2nd Year', icon: '🎓', collegeCount: 0, eligibilityStatus: 'borderline', note: 'After Diploma' },
        { id: 'apprenticeship', name: 'APPRENTICESHIP', fullName: 'Earn While You Learn', icon: '🏭', collegeCount: 0, eligibilityStatus: 'eligible', note: 'Stipend: ₹5000-15000' },
        { id: 'bvoc', name: 'B.VOC', fullName: 'Retail, Fashion, Tourism, Healthcare', icon: '📚', collegeCount: 100, eligibilityStatus: 'eligible' },
        { id: 'animation', name: 'ANIMATION/VFX', fullName: 'Diploma in Animation, Gaming', icon: '🎬', collegeCount: 80, eligibilityStatus: 'eligible' },
        { id: 'automobile', name: 'AUTOMOBILE', fullName: 'Diploma Automobile, EV Tech', icon: '🚗', collegeCount: 60, eligibilityStatus: 'eligible' },
        { id: 'fashion', name: 'FASHION DESIGN', fullName: 'Diploma Fashion, Textile', icon: '👗', collegeCount: 50, eligibilityStatus: 'eligible' },
      ];
    default:
      return [];
  }
};

const getJKKNCourses = (group: StudentGroup): EligibleCourse[] => {
  const baseCourses: EligibleCourse[] = [];
  
  if (group === 'pcm' || group === 'pcmb') {
    baseCourses.push({
      id: 'jkkn_engineering',
      name: 'JKKN Engineering',
      fullName: 'B.E/B.Tech - CSE, ECE, EEE, Mech',
      icon: '⭐',
      collegeCount: 0,
      eligibilityStatus: 'eligible',
      isJKKN: true,
      fee: '₹75,000/year',
      placement: '95% Placement',
      note: 'Your Cutoff Accepted',
    });
  }

  if (group === 'pcb' || group === 'pcmb') {
    baseCourses.push({
      id: 'jkkn_pharmacy',
      name: 'JKKN Pharmacy',
      fullName: 'B.Pharm, Pharm.D',
      icon: '⭐',
      collegeCount: 0,
      eligibilityStatus: 'eligible',
      isJKKN: true,
      fee: '₹85,000/year',
      placement: '100% Placement',
    });
    baseCourses.push({
      id: 'jkkn_nursing',
      name: 'JKKN Nursing',
      fullName: 'B.Sc Nursing, GNM, ANM',
      icon: '⭐',
      collegeCount: 0,
      eligibilityStatus: 'eligible',
      isJKKN: true,
      fee: '₹60,000/year',
      placement: '100% Jobs',
    });
    baseCourses.push({
      id: 'jkkn_allied',
      name: 'JKKN Allied Health',
      fullName: 'Physio, MLT, Radiology',
      icon: '⭐',
      collegeCount: 0,
      eligibilityStatus: 'eligible',
      isJKKN: true,
      fee: '₹55,000/year',
      placement: '90% Placement',
    });
  }

  if (group === 'commerce' || group === 'arts') {
    baseCourses.push({
      id: 'jkkn_arts_science',
      name: 'JKKN Arts & Science',
      fullName: 'B.Com, BBA, BCA, BA, B.Sc',
      icon: '⭐',
      collegeCount: 0,
      eligibilityStatus: 'eligible',
      isJKKN: true,
      fee: '₹45,000/year',
      placement: '85% Placement',
    });
  }

  if (group === 'pcb' || group === 'pcmb') {
    baseCourses.push({
      id: 'jkkn_agriculture',
      name: 'JKKN Agriculture',
      fullName: 'B.Sc Agriculture, Horticulture',
      icon: '⭐',
      collegeCount: 0,
      eligibilityStatus: 'eligible',
      isJKKN: true,
      fee: '₹65,000/year',
      placement: '80% Placement',
    });
  }

  return baseCourses;
};

export const EligibleCourses = ({ group, cutoffScore, percentage, neetScore }: EligibleCoursesProps) => {
  const navigate = useNavigate();
  const courses = getCoursesByGroup(group, cutoffScore, percentage, neetScore);
  const jkknCourses = getJKKNCourses(group);
  const [selectedCourse, setSelectedCourse] = useState<EligibleCourse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewColleges = (course: EligibleCourse) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const getCollegesForCourse = (courseId: string): CollegeInfo[] => {
    return collegeData[courseId] || [];
  };

  const getStatusBadge = (status: EligibleCourse['eligibilityStatus']) => {
    switch (status) {
      case 'eligible':
        return (
          <span className="inline-flex items-center gap-1 text-green-700 bg-green-100 px-2 py-0.5 rounded text-xs font-medium">
            <CheckCircle2 className="h-3 w-3" /> Eligible
          </span>
        );
      case 'borderline':
        return (
          <span className="inline-flex items-center gap-1 text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded text-xs font-medium">
            <AlertTriangle className="h-3 w-3" /> Borderline
          </span>
        );
      case 'not_eligible':
        return (
          <span className="inline-flex items-center gap-1 text-red-700 bg-red-100 px-2 py-0.5 rounded text-xs font-medium">
            <XCircle className="h-3 w-3" /> Not Eligible
          </span>
        );
    }
  };

  const getGroupIcon = () => {
    switch (group) {
      case 'pcm': return '🏛️';
      case 'pcb': return '🏥';
      case 'pcmb': return '🔬';
      case 'commerce': return '💼';
      case 'arts': return '📖';
      case 'vocational': return '🛠️';
      default: return '🎓';
    }
  };

  return (
    <div className="space-y-6">
      {/* College Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <GraduationCap className="h-6 w-6 text-violet-600" />
              {selectedCourse?.name} - Colleges
            </DialogTitle>
          </DialogHeader>
          
          {selectedCourse && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-4">
                {selectedCourse.fullName} • {selectedCourse.collegeCount > 0 ? `${selectedCourse.collegeCount}+ colleges available` : 'Top institutions'}
              </p>
              
              <div className="space-y-3">
                {getCollegesForCourse(selectedCourse.id).length > 0 ? (
                  getCollegesForCourse(selectedCourse.id).map((college, index) => (
                    <div 
                      key={index}
                      className="p-4 border rounded-lg hover:shadow-md transition-all bg-white"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{college.name}</h4>
                          <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                            <MapPin className="h-3 w-3" />
                            <span>{college.location}</span>
                            <span className={cn(
                              'px-2 py-0.5 rounded text-xs font-medium',
                              college.type === 'Government' ? 'bg-green-100 text-green-700' :
                              college.type === 'Aided' ? 'bg-blue-100 text-blue-700' :
                              college.type === 'Autonomous' ? 'bg-purple-100 text-purple-700' :
                              'bg-gray-100 text-gray-700'
                            )}>
                              {college.type}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            {college.rating && (
                              <span className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                                {college.rating}
                              </span>
                            )}
                            {college.fee && (
                              <span>💰 {college.fee}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <GraduationCap className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>College list coming soon!</p>
                    <p className="text-sm mt-1">Visit the Find Colleges tab for comprehensive search.</p>
                    <Button 
                      className="mt-4 bg-violet-600 hover:bg-violet-700"
                      onClick={() => {
                        setIsModalOpen(false);
                        navigate('/career-assessment/colleges');
                      }}
                    >
                      Go to College Search
                    </Button>
                  </div>
                )}
              </div>

              {getCollegesForCourse(selectedCourse.id).length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <Button 
                    className="w-full bg-violet-600 hover:bg-violet-700"
                    onClick={() => {
                      setIsModalOpen(false);
                      navigate('/career-assessment/colleges');
                    }}
                  >
                    View All {selectedCourse.collegeCount}+ Colleges
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Regular Courses */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            {getGroupIcon()} Courses You're Eligible For
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className={cn(
                'p-4 rounded-xl border-2 transition-all duration-200',
                course.eligibilityStatus === 'eligible' ? 'border-green-200 bg-white hover:border-green-300 hover:shadow-md' :
                course.eligibilityStatus === 'borderline' ? 'border-yellow-200 bg-white hover:border-yellow-300 hover:shadow-md' :
                'border-gray-200 bg-gray-50 opacity-60'
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{course.icon}</span>
                  <div>
                    <h4 className="font-semibold text-sm">{course.name}</h4>
                    <p className="text-xs text-gray-500">{course.fullName}</p>
                  </div>
                </div>
              </div>

              {course.collegeCount > 0 && (
                <p className="text-xs text-gray-500 mb-2">
                  🏛️ {course.collegeCount}+ Colleges
                </p>
              )}

              {course.note && (
                <p className="text-xs text-gray-600 mb-2">{course.note}</p>
              )}

              {course.entranceExam && (
                <p className="text-xs text-blue-600 mb-2">📝 {course.entranceExam}</p>
              )}

              {course.cutoffRequired && course.userCutoff && (
                <p className="text-xs text-gray-600 mb-2">
                  ✅ Your Cutoff: {course.userCutoff}
                </p>
              )}

              <div className="flex items-center justify-between mt-3">
                {getStatusBadge(course.eligibilityStatus)}
                {course.eligibilityStatus !== 'not_eligible' && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs h-7 px-2 text-violet-600 hover:text-violet-700 hover:bg-violet-50"
                    onClick={() => handleViewColleges(course)}
                  >
                    View Colleges →
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* JKKN Recommended Section */}
      {jkknCourses.length > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl shadow-sm border border-amber-200 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
              JKKN Recommended Courses for You
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Based on your marks and eligibility, JKKN colleges offer:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jkknCourses.map((course) => (
              <div
                key={course.id}
                className="p-4 rounded-xl border-2 border-amber-300 bg-white hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{course.icon}</span>
                  <div>
                    <h4 className="font-semibold text-sm text-amber-800">{course.name}</h4>
                    <p className="text-xs text-gray-600">{course.fullName}</p>
                  </div>
                </div>

                {course.fee && (
                  <p className="text-xs text-gray-600 mb-1">💰 Fee: {course.fee}</p>
                )}
                {course.placement && (
                  <p className="text-xs text-gray-600 mb-1">🎓 {course.placement}</p>
                )}
                {course.note && (
                  <p className="text-xs text-green-600 mb-2">✅ {course.note}</p>
                )}

                <Button
                  size="sm"
                  className="w-full mt-2 bg-amber-600 hover:bg-amber-700 text-white"
                >
                  Apply Now →
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cutoff Formulas */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            📚 Cutoff Calculation Formulas
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="font-semibold text-blue-800 mb-1">🔬 TNEA Engineering Cutoff (PCM):</div>
            <div className="text-blue-700">Cutoff = Mathematics + (Physics/2) + (Chemistry/2)</div>
            <div className="text-blue-600 text-xs mt-1">Maximum: 200</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="font-semibold text-green-800 mb-1">🏥 Medical Admission (PCB):</div>
            <div className="text-green-700">Based on NEET Score (Out of 720)</div>
            <div className="text-green-600 text-xs mt-1">12th Marks: Minimum 50% in PCB required</div>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="font-semibold text-orange-800 mb-1">💼 Commerce/Arts:</div>
            <div className="text-orange-700">Based on Overall Percentage</div>
            <div className="text-orange-600 text-xs mt-1">Best of 4/5 Subjects</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-800 mb-1">🛠️ Polytechnic/ITI:</div>
            <div className="text-gray-700">Based on 10th/12th Overall Percentage</div>
          </div>
        </div>
      </div>
    </div>
  );
};
