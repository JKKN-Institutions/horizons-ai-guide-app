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
  // Engineering branches
  cse: [
    { name: 'Anna University CEG', location: 'Chennai', type: 'Government', rating: 'NAAC A++', fee: '₹50,000/year' },
    { name: 'PSG College of Technology', location: 'Coimbatore', type: 'Autonomous', rating: 'NAAC A++', fee: '₹1,20,000/year' },
    { name: 'SSN College of Engineering', location: 'Chennai', type: 'Autonomous', rating: 'NAAC A++', fee: '₹1,50,000/year' },
    { name: 'JKKN College of Engineering', location: 'Namakkal', type: 'Private', rating: 'NAAC A', fee: '₹85,000/year' },
    { name: 'Kongu Engineering College', location: 'Erode', type: 'Autonomous', rating: 'NAAC A++', fee: '₹1,10,000/year' },
    { name: 'Sri Krishna College of Engineering', location: 'Coimbatore', type: 'Autonomous', rating: 'NAAC A+', fee: '₹95,000/year' },
    { name: 'Thiagarajar College of Engineering', location: 'Madurai', type: 'Autonomous', rating: 'NAAC A+', fee: '₹90,000/year' },
    { name: 'VIT Chennai', location: 'Chennai', type: 'Private', rating: 'NAAC A++', fee: '₹2,00,000/year' },
    { name: 'SRM Institute of Science', location: 'Chennai', type: 'Private', rating: 'NAAC A++', fee: '₹2,50,000/year' },
    { name: 'Saveetha Engineering College', location: 'Chennai', type: 'Autonomous', rating: 'NAAC A+', fee: '₹1,20,000/year' },
  ],
  ece: [
    { name: 'Anna University MIT', location: 'Chennai', type: 'Government', rating: 'NAAC A++', fee: '₹50,000/year' },
    { name: 'PSG College of Technology', location: 'Coimbatore', type: 'Autonomous', rating: 'NAAC A++', fee: '₹1,20,000/year' },
    { name: 'SSN College of Engineering', location: 'Chennai', type: 'Autonomous', rating: 'NAAC A++', fee: '₹1,50,000/year' },
    { name: 'Kongu Engineering College', location: 'Erode', type: 'Autonomous', rating: 'NAAC A++', fee: '₹1,10,000/year' },
    { name: 'JKKN College of Engineering', location: 'Namakkal', type: 'Private', rating: 'NAAC A', fee: '₹80,000/year' },
    { name: 'Government College of Technology', location: 'Coimbatore', type: 'Government', rating: 'NAAC A', fee: '₹45,000/year' },
    { name: 'Thiagarajar College of Engineering', location: 'Madurai', type: 'Autonomous', rating: 'NAAC A+', fee: '₹90,000/year' },
    { name: 'Sri Ramakrishna Engineering College', location: 'Coimbatore', type: 'Autonomous', rating: 'NAAC A+', fee: '₹95,000/year' },
  ],
  mechanical: [
    { name: 'Anna University CEG', location: 'Chennai', type: 'Government', rating: 'NAAC A++', fee: '₹50,000/year' },
    { name: 'PSG College of Technology', location: 'Coimbatore', type: 'Autonomous', rating: 'NAAC A++', fee: '₹1,20,000/year' },
    { name: 'Coimbatore Institute of Technology', location: 'Coimbatore', type: 'Government', rating: 'NAAC A+', fee: '₹45,000/year' },
    { name: 'Government College of Engineering, Salem', location: 'Salem', type: 'Government', rating: 'NAAC A', fee: '₹40,000/year' },
    { name: 'JKKN College of Engineering', location: 'Namakkal', type: 'Private', rating: 'NAAC A', fee: '₹75,000/year' },
    { name: 'Kongu Engineering College', location: 'Erode', type: 'Autonomous', rating: 'NAAC A++', fee: '₹1,00,000/year' },
    { name: 'Bannari Amman Institute', location: 'Erode', type: 'Autonomous', rating: 'NAAC A+', fee: '₹95,000/year' },
    { name: 'Thiagarajar College of Engineering', location: 'Madurai', type: 'Autonomous', rating: 'NAAC A+', fee: '₹90,000/year' },
    { name: 'Mepco Schlenk Engineering', location: 'Sivakasi', type: 'Autonomous', rating: 'NAAC A+', fee: '₹85,000/year' },
    { name: 'Velammal Engineering College', location: 'Chennai', type: 'Autonomous', rating: 'NAAC A+', fee: '₹1,00,000/year' },
  ],
  civil: [
    { name: 'Anna University CEG', location: 'Chennai', type: 'Government', rating: 'NAAC A++', fee: '₹50,000/year' },
    { name: 'Coimbatore Institute of Technology', location: 'Coimbatore', type: 'Government', rating: 'NAAC A+', fee: '₹45,000/year' },
    { name: 'PSG College of Technology', location: 'Coimbatore', type: 'Autonomous', rating: 'NAAC A++', fee: '₹1,20,000/year' },
    { name: 'Government College of Engineering, Tirunelveli', location: 'Tirunelveli', type: 'Government', rating: 'NAAC A', fee: '₹40,000/year' },
    { name: 'JKKN College of Engineering', location: 'Namakkal', type: 'Private', rating: 'NAAC A', fee: '₹70,000/year' },
    { name: 'Mepco Schlenk Engineering', location: 'Sivakasi', type: 'Autonomous', rating: 'NAAC A+', fee: '₹80,000/year' },
    { name: 'Thiagarajar College of Engineering', location: 'Madurai', type: 'Autonomous', rating: 'NAAC A+', fee: '₹85,000/year' },
    { name: 'Sona College of Technology', location: 'Salem', type: 'Autonomous', rating: 'NAAC A+', fee: '₹85,000/year' },
  ],
  data_science: [
    { name: 'Anna University', location: 'Chennai', type: 'Government', rating: 'NAAC A++', fee: '₹60,000/year' },
    { name: 'PSG College of Technology', location: 'Coimbatore', type: 'Autonomous', rating: 'NAAC A++', fee: '₹1,40,000/year' },
    { name: 'SSN College of Engineering', location: 'Chennai', type: 'Autonomous', rating: 'NAAC A++', fee: '₹1,80,000/year' },
    { name: 'VIT Chennai', location: 'Chennai', type: 'Private', rating: 'NAAC A++', fee: '₹2,50,000/year' },
    { name: 'SRM Institute', location: 'Chennai', type: 'Private', rating: 'NAAC A++', fee: '₹3,00,000/year' },
    { name: 'Kongu Engineering College', location: 'Erode', type: 'Autonomous', rating: 'NAAC A++', fee: '₹1,30,000/year' },
    { name: 'Sri Krishna College of Engineering', location: 'Coimbatore', type: 'Autonomous', rating: 'NAAC A+', fee: '₹1,20,000/year' },
    { name: 'JKKN College of Engineering', location: 'Namakkal', type: 'Private', rating: 'NAAC A', fee: '₹90,000/year' },
  ],
  cyber_security: [
    { name: 'Anna University', location: 'Chennai', type: 'Government', rating: 'NAAC A++', fee: '₹55,000/year' },
    { name: 'VIT Chennai', location: 'Chennai', type: 'Private', rating: 'NAAC A++', fee: '₹2,20,000/year' },
    { name: 'SRM Institute', location: 'Chennai', type: 'Private', rating: 'NAAC A++', fee: '₹2,50,000/year' },
    { name: 'PSG College of Technology', location: 'Coimbatore', type: 'Autonomous', rating: 'NAAC A++', fee: '₹1,30,000/year' },
    { name: 'SRMIST Ramapuram', location: 'Chennai', type: 'Private', rating: 'NAAC A+', fee: '₹1,80,000/year' },
    { name: 'Sathyabama Institute', location: 'Chennai', type: 'Private', rating: 'NAAC A', fee: '₹1,50,000/year' },
  ],
  aerospace: [
    { name: 'Madras Institute of Technology', location: 'Chennai', type: 'Government', rating: 'NAAC A++', fee: '₹50,000/year' },
    { name: 'SRM Institute', location: 'Chennai', type: 'Private', rating: 'NAAC A++', fee: '₹2,80,000/year' },
    { name: 'Sathyabama Institute', location: 'Chennai', type: 'Private', rating: 'NAAC A', fee: '₹1,80,000/year' },
    { name: 'Hindustan Institute', location: 'Chennai', type: 'Private', rating: 'NAAC A', fee: '₹2,00,000/year' },
    { name: 'VIT Chennai', location: 'Chennai', type: 'Private', rating: 'NAAC A++', fee: '₹2,50,000/year' },
  ],
  biomedical: [
    { name: 'Anna University CEG', location: 'Chennai', type: 'Government', rating: 'NAAC A++', fee: '₹50,000/year' },
    { name: 'PSG College of Technology', location: 'Coimbatore', type: 'Autonomous', rating: 'NAAC A++', fee: '₹1,25,000/year' },
    { name: 'VIT Vellore', location: 'Vellore', type: 'Private', rating: 'NAAC A++', fee: '₹2,00,000/year' },
    { name: 'SRM Institute', location: 'Chennai', type: 'Private', rating: 'NAAC A++', fee: '₹2,50,000/year' },
    { name: 'SSN College of Engineering', location: 'Chennai', type: 'Autonomous', rating: 'NAAC A++', fee: '₹1,60,000/year' },
    { name: 'Sathyabama Institute', location: 'Chennai', type: 'Private', rating: 'NAAC A', fee: '₹1,50,000/year' },
    { name: 'Sri Ramakrishna Engineering', location: 'Coimbatore', type: 'Autonomous', rating: 'NAAC A+', fee: '₹1,00,000/year' },
    { name: 'Saveetha Engineering College', location: 'Chennai', type: 'Autonomous', rating: 'NAAC A+', fee: '₹1,20,000/year' },
  ],
  chemical: [
    { name: 'Anna University ACT', location: 'Chennai', type: 'Government', rating: 'NAAC A++', fee: '₹50,000/year' },
    { name: 'Coimbatore Institute of Technology', location: 'Coimbatore', type: 'Government', rating: 'NAAC A+', fee: '₹45,000/year' },
    { name: 'Government College of Technology', location: 'Coimbatore', type: 'Government', rating: 'NAAC A', fee: '₹40,000/year' },
    { name: 'SRM Institute', location: 'Chennai', type: 'Private', rating: 'NAAC A++', fee: '₹2,00,000/year' },
    { name: 'PSG College of Technology', location: 'Coimbatore', type: 'Autonomous', rating: 'NAAC A++', fee: '₹1,20,000/year' },
    { name: 'Annamalai University', location: 'Chidambaram', type: 'Government', rating: 'NAAC A+', fee: '₹60,000/year' },
  ],
  robotics: [
    { name: 'PSG College of Technology', location: 'Coimbatore', type: 'Autonomous', rating: 'NAAC A++', fee: '₹1,40,000/year' },
    { name: 'VIT Vellore', location: 'Vellore', type: 'Private', rating: 'NAAC A++', fee: '₹2,30,000/year' },
    { name: 'SRM Institute', location: 'Chennai', type: 'Private', rating: 'NAAC A++', fee: '₹2,80,000/year' },
    { name: 'Anna University', location: 'Chennai', type: 'Government', rating: 'NAAC A++', fee: '₹55,000/year' },
    { name: 'Kongu Engineering College', location: 'Erode', type: 'Autonomous', rating: 'NAAC A++', fee: '₹1,20,000/year' },
    { name: 'Kumaraguru College', location: 'Coimbatore', type: 'Autonomous', rating: 'NAAC A++', fee: '₹1,30,000/year' },
  ],
  gaming: [
    { name: 'VIT Vellore', location: 'Vellore', type: 'Private', rating: 'NAAC A++', fee: '₹2,00,000/year' },
    { name: 'SRM Institute', location: 'Chennai', type: 'Private', rating: 'NAAC A++', fee: '₹2,50,000/year' },
    { name: 'Sathyabama Institute', location: 'Chennai', type: 'Private', rating: 'NAAC A', fee: '₹1,60,000/year' },
    { name: 'Arena Animation', location: 'Chennai', type: 'Private', fee: '₹80,000/year' },
    { name: 'MAAC', location: 'Chennai', type: 'Private', fee: '₹1,00,000/year' },
  ],
  textile: [
    { name: 'PSG College of Technology', location: 'Coimbatore', type: 'Autonomous', rating: 'NAAC A++', fee: '₹1,00,000/year' },
    { name: 'Kumaraguru College', location: 'Coimbatore', type: 'Autonomous', rating: 'NAAC A++', fee: '₹95,000/year' },
    { name: 'Government College of Technology', location: 'Coimbatore', type: 'Government', rating: 'NAAC A', fee: '₹35,000/year' },
    { name: 'Anna University MIT', location: 'Chennai', type: 'Government', rating: 'NAAC A++', fee: '₹45,000/year' },
    { name: 'NIFT TEA College', location: 'Tirupur', type: 'Aided', rating: 'AICTE Approved', fee: '₹60,000/year' },
  ],
  mining: [
    { name: 'Anna University CEG', location: 'Chennai', type: 'Government', rating: 'NAAC A++', fee: '₹50,000/year' },
    { name: 'Bharathidasan University', location: 'Trichy', type: 'Government', rating: 'NAAC A+', fee: '₹25,000/year' },
    { name: 'Annamalai University', location: 'Chidambaram', type: 'Government', rating: 'NAAC A+', fee: '₹45,000/year' },
  ],
  food_tech: [
    { name: 'NIFTEM Thanjavur', location: 'Thanjavur', type: 'Government', rating: 'Central Govt', fee: '₹80,000/year' },
    { name: 'Anna University', location: 'Chennai', type: 'Government', rating: 'NAAC A++', fee: '₹50,000/year' },
    { name: 'Periyar University', location: 'Salem', type: 'Government', rating: 'NAAC A++', fee: '₹15,000/year' },
    { name: 'SRM Institute', location: 'Chennai', type: 'Private', rating: 'NAAC A++', fee: '₹1,80,000/year' },
    { name: 'TNAU', location: 'Coimbatore', type: 'Government', rating: 'ICAR', fee: '₹20,000/year' },
  ],
  printing: [
    { name: 'Anna University MIT', location: 'Chennai', type: 'Government', rating: 'NAAC A++', fee: '₹50,000/year' },
    { name: 'SRM Institute', location: 'Chennai', type: 'Private', rating: 'NAAC A++', fee: '₹1,50,000/year' },
    { name: 'SIPET', location: 'Chennai', type: 'Government', fee: '₹30,000/year' },
  ],
  bsc_cs: [
    { name: 'Loyola College', location: 'Chennai', type: 'Aided', rating: 'NAAC A++', fee: '₹35,000/year' },
    { name: 'Presidency College', location: 'Chennai', type: 'Government', rating: 'NAAC A+', fee: '₹8,000/year' },
    { name: 'PSG College of Arts & Science', location: 'Coimbatore', type: 'Aided', rating: 'NAAC A++', fee: '₹55,000/year' },
    { name: 'JKKN College of Arts and Science', location: 'Namakkal', type: 'Private', rating: 'NAAC A', fee: '₹45,000/year' },
    { name: 'Bishop Heber College', location: 'Trichy', type: 'Aided', rating: 'NAAC A++', fee: '₹40,000/year' },
    { name: 'Madras Christian College', location: 'Chennai', type: 'Aided', rating: 'NAAC A++', fee: '₹45,000/year' },
    { name: 'American College', location: 'Madurai', type: 'Aided', rating: 'NAAC A++', fee: '₹42,000/year' },
  ],
  statistics: [
    { name: 'Loyola College', location: 'Chennai', type: 'Aided', rating: 'NAAC A++', fee: '₹35,000/year' },
    { name: 'Presidency College', location: 'Chennai', type: 'Government', rating: 'NAAC A+', fee: '₹8,000/year' },
    { name: 'Madras Christian College', location: 'Chennai', type: 'Aided', rating: 'NAAC A++', fee: '₹40,000/year' },
    { name: 'PSG College of Arts & Science', location: 'Coimbatore', type: 'Aided', rating: 'NAAC A++', fee: '₹50,000/year' },
    { name: 'Bharathiar University', location: 'Coimbatore', type: 'Government', rating: 'NAAC A++', fee: '₹15,000/year' },
  ],
  aviation: [
    { name: 'IGRUA', location: 'Rae Bareli', type: 'Government', rating: 'DGCA Approved', fee: '₹30,00,000 (total)' },
    { name: 'Rajiv Gandhi Academy', location: 'Hyderabad', type: 'Private', rating: 'DGCA Approved', fee: '₹25,00,000 (total)' },
    { name: 'Hindustan Aviation Academy', location: 'Bangalore', type: 'Private', rating: 'DGCA Approved', fee: '₹20,00,000 (total)' },
    { name: 'CAE', location: 'Gondia', type: 'Private', rating: 'DGCA Approved', fee: '₹28,00,000 (total)' },
  ],
  merchant_navy: [
    { name: 'IMU Chennai', location: 'Chennai', type: 'Government', rating: 'DG Shipping', fee: '₹3,50,000/year' },
    { name: 'AMET University', location: 'Chennai', type: 'Private', rating: 'DG Shipping', fee: '₹2,80,000/year' },
    { name: 'Vels University - Maritime', location: 'Chennai', type: 'Private', rating: 'DG Shipping', fee: '₹2,50,000/year' },
    { name: 'Coimbatore Marine College', location: 'Coimbatore', type: 'Private', rating: 'DG Shipping', fee: '₹2,00,000/year' },
  ],
  // Medical & Health Sciences
  dental: [
    { name: 'Tamil Nadu Govt Dental College', location: 'Chennai', type: 'Government', rating: 'DCI Approved', fee: '₹50,000/year' },
    { name: 'JKKN Dental College', location: 'Namakkal', type: 'Private', rating: 'DCI Approved', fee: '₹4,00,000/year' },
    { name: 'SRM Dental College', location: 'Chennai', type: 'Private', rating: 'DCI Approved', fee: '₹6,00,000/year' },
    { name: 'Saveetha Dental College', location: 'Chennai', type: 'Private', rating: 'DCI Approved', fee: '₹6,50,000/year' },
    { name: 'Meenakshi Dental College', location: 'Chennai', type: 'Private', rating: 'DCI Approved', fee: '₹5,00,000/year' },
    { name: 'Ragas Dental College', location: 'Chennai', type: 'Private', rating: 'DCI Approved', fee: '₹5,50,000/year' },
  ],
  ayush: [
    { name: 'Govt. Siddha Medical College', location: 'Chennai', type: 'Government', fee: '₹20,000/year' },
    { name: 'National Institute of Siddha', location: 'Chennai', type: 'Government', rating: 'Central Govt', fee: '₹30,000/year' },
    { name: 'Sri Sairam Homoeopathy', location: 'Chennai', type: 'Private', rating: 'CCH Approved', fee: '₹1,50,000/year' },
    { name: 'Govt. Homeopathy Medical College', location: 'Tirumangalam', type: 'Government', fee: '₹15,000/year' },
    { name: 'Sri Jayendra Saraswathi Ayurveda', location: 'Nazarathpet', type: 'Private', rating: 'CCIM', fee: '₹2,00,000/year' },
  ],
  physiotherapy: [
    { name: 'SRM College of Physiotherapy', location: 'Chennai', type: 'Private', rating: 'IAP Approved', fee: '₹1,50,000/year' },
    { name: 'JKKN Physiotherapy', location: 'Namakkal', type: 'Private', rating: 'IAP Approved', fee: '₹80,000/year' },
    { name: 'Saveetha College of Physiotherapy', location: 'Chennai', type: 'Private', rating: 'IAP Approved', fee: '₹1,80,000/year' },
    { name: 'PSG College of Physiotherapy', location: 'Coimbatore', type: 'Private', rating: 'IAP Approved', fee: '₹1,20,000/year' },
    { name: 'CMC Vellore - Physiotherapy', location: 'Vellore', type: 'Aided', rating: 'NAAC A++', fee: '₹80,000/year' },
  ],
  optometry: [
    { name: 'Sankara Nethralaya', location: 'Chennai', type: 'Private', rating: 'Top Ranked', fee: '₹1,50,000/year' },
    { name: 'LVPEI School of Optometry', location: 'Hyderabad', type: 'Private', rating: 'Top Ranked', fee: '₹1,20,000/year' },
    { name: 'SRM College of Optometry', location: 'Chennai', type: 'Private', fee: '₹1,00,000/year' },
    { name: 'Aravind Eye Hospital - Optometry', location: 'Madurai', type: 'Private', rating: 'Top Ranked', fee: '₹80,000/year' },
  ],
  gnm_anm: [
    { name: 'JKKN School of Nursing', location: 'Namakkal', type: 'Private', rating: 'INC Approved', fee: '₹40,000/year' },
    { name: 'Madras Medical College - GNM', location: 'Chennai', type: 'Government', rating: 'INC Approved', fee: '₹8,000/year' },
    { name: 'Government Hospital GNM', location: 'Coimbatore', type: 'Government', fee: '₹10,000/year' },
    { name: 'Apollo School of Nursing', location: 'Chennai', type: 'Private', fee: '₹60,000/year' },
    { name: 'CMC Vellore - GNM', location: 'Vellore', type: 'Aided', fee: '₹50,000/year' },
  ],
  mlt: [
    { name: 'Madras Medical College - MLT', location: 'Chennai', type: 'Government', fee: '₹15,000/year' },
    { name: 'CMC Vellore - MLT', location: 'Vellore', type: 'Aided', rating: 'NAAC A++', fee: '₹60,000/year' },
    { name: 'JKKN Allied Health Sciences', location: 'Namakkal', type: 'Private', fee: '₹50,000/year' },
    { name: 'SRM MLT', location: 'Chennai', type: 'Private', fee: '₹80,000/year' },
    { name: 'PSG Allied Health Sciences', location: 'Coimbatore', type: 'Private', fee: '₹70,000/year' },
  ],
  radiology: [
    { name: 'CMC Vellore - Radiology Tech', location: 'Vellore', type: 'Aided', rating: 'NAAC A++', fee: '₹70,000/year' },
    { name: 'Madras Medical College', location: 'Chennai', type: 'Government', fee: '₹18,000/year' },
    { name: 'JKKN Allied Health', location: 'Namakkal', type: 'Private', fee: '₹55,000/year' },
    { name: 'SRM Radiology Tech', location: 'Chennai', type: 'Private', fee: '₹90,000/year' },
  ],
  veterinary: [
    { name: 'TANUVAS', location: 'Chennai', type: 'Government', rating: 'VCI Approved', fee: '₹40,000/year' },
    { name: 'Veterinary College, Namakkal', location: 'Namakkal', type: 'Government', rating: 'VCI Approved', fee: '₹35,000/year' },
    { name: 'Madras Veterinary College', location: 'Chennai', type: 'Government', rating: 'VCI Approved', fee: '₹40,000/year' },
  ],
  fisheries: [
    { name: 'Tamil Nadu Dr. J. Jayalalithaa Fisheries University', location: 'Nagapattinam', type: 'Government', rating: 'ICAR', fee: '₹20,000/year' },
    { name: 'Fisheries College, Thoothukudi', location: 'Thoothukudi', type: 'Government', rating: 'ICAR', fee: '₹18,000/year' },
  ],
  psychology: [
    { name: 'University of Madras', location: 'Chennai', type: 'Government', rating: 'NAAC A++', fee: '₹12,000/year' },
    { name: 'Loyola College', location: 'Chennai', type: 'Aided', rating: 'NAAC A++', fee: '₹35,000/year' },
    { name: 'Stella Maris College', location: 'Chennai', type: 'Aided', rating: 'NAAC A++', fee: '₹40,000/year' },
    { name: 'PSG College of Arts & Science', location: 'Coimbatore', type: 'Aided', rating: 'NAAC A++', fee: '₹50,000/year' },
    { name: 'Christ University', location: 'Bangalore', type: 'Private', rating: 'NAAC A++', fee: '₹1,20,000/year' },
  ],
  home_science: [
    { name: 'Avinashilingam University', location: 'Coimbatore', type: 'Aided', rating: 'NAAC A++', fee: '₹30,000/year' },
    { name: "Women's Christian College", location: 'Chennai', type: 'Aided', rating: 'NAAC A+', fee: '₹28,000/year' },
    { name: 'Ethiraj College', location: 'Chennai', type: 'Aided', rating: 'NAAC A++', fee: '₹32,000/year' },
    { name: "Mother Teresa Women's University", location: 'Kodaikanal', type: 'Government', fee: '₹15,000/year' },
  ],
  // Arts & Professional
  education: [
    { name: 'Lady Willingdon Teacher Training', location: 'Chennai', type: 'Aided', rating: 'NCTE', fee: '₹20,000/year' },
    { name: 'JKKN College of Education', location: 'Namakkal', type: 'Private', rating: 'NCTE', fee: '₹50,000/year' },
    { name: 'Alagappa University', location: 'Karaikudi', type: 'Government', rating: 'NAAC A++', fee: '₹15,000/year' },
    { name: 'Tamil Nadu Teachers Education', location: 'Chennai', type: 'Government', rating: 'NCTE', fee: '₹10,000/year' },
    { name: 'Stella Maris College', location: 'Chennai', type: 'Aided', rating: 'NAAC A++', fee: '₹35,000/year' },
  ],
  law: [
    { name: 'Dr. Ambedkar Law University', location: 'Chennai', type: 'Government', rating: 'BCI Approved', fee: '₹25,000/year' },
    { name: 'SASTRA - School of Law', location: 'Thanjavur', type: 'Private', rating: 'BCI Approved', fee: '₹1,20,000/year' },
    { name: 'VIT School of Law', location: 'Chennai', type: 'Private', rating: 'BCI Approved', fee: '₹1,50,000/year' },
    { name: 'SRM School of Law', location: 'Chennai', type: 'Private', rating: 'BCI Approved', fee: '₹1,80,000/year' },
    { name: 'Government Law College', location: 'Chennai', type: 'Government', rating: 'BCI Approved', fee: '₹12,000/year' },
    { name: 'Madras Law College', location: 'Chennai', type: 'Government', rating: 'BCI Approved', fee: '₹15,000/year' },
  ],
  design: [
    { name: 'NID', location: 'Ahmedabad', type: 'Government', rating: 'Top Ranked', fee: '₹3,00,000/year' },
    { name: 'NIFT Chennai', location: 'Chennai', type: 'Government', rating: 'Top Ranked', fee: '₹2,00,000/year' },
    { name: 'Srishti Manipal', location: 'Bangalore', type: 'Private', rating: 'NAAC A', fee: '₹4,00,000/year' },
    { name: 'Pearl Academy', location: 'Chennai', type: 'Private', fee: '₹3,50,000/year' },
    { name: 'VIT School of Design', location: 'Vellore', type: 'Private', rating: 'NAAC A++', fee: '₹2,50,000/year' },
  ],
  fine_arts: [
    { name: 'Government College of Fine Arts', location: 'Chennai', type: 'Government', fee: '₹10,000/year' },
    { name: 'Stella Maris - Fine Arts', location: 'Chennai', type: 'Aided', rating: 'NAAC A++', fee: '₹40,000/year' },
    { name: 'Kalakshetra', location: 'Chennai', type: 'Government', rating: 'Heritage', fee: '₹25,000/year' },
    { name: 'Chitrakala Parishath', location: 'Bangalore', type: 'Aided', fee: '₹30,000/year' },
  ],
  music_dance: [
    { name: 'Tamil Nadu Music & Fine Arts University', location: 'Chennai', type: 'Government', fee: '₹8,000/year' },
    { name: 'Kalakshetra Foundation', location: 'Chennai', type: 'Government', rating: 'Heritage', fee: '₹20,000/year' },
    { name: 'University of Madras - Music', location: 'Chennai', type: 'Government', rating: 'NAAC A++', fee: '₹12,000/year' },
    { name: 'Annamalai University - Music', location: 'Chidambaram', type: 'Government', rating: 'NAAC A+', fee: '₹15,000/year' },
  ],
  library_science: [
    { name: 'University of Madras', location: 'Chennai', type: 'Government', rating: 'NAAC A++', fee: '₹10,000/year' },
    { name: 'Alagappa University', location: 'Karaikudi', type: 'Government', rating: 'NAAC A++', fee: '₹12,000/year' },
    { name: 'Annamalai University', location: 'Chidambaram', type: 'Government', rating: 'NAAC A+', fee: '₹15,000/year' },
  ],
  fashion: [
    { name: 'NIFT Chennai', location: 'Chennai', type: 'Government', rating: 'Top Ranked', fee: '₹2,00,000/year' },
    { name: 'Pearl Academy', location: 'Chennai', type: 'Private', fee: '₹3,50,000/year' },
    { name: 'JD Institute', location: 'Chennai', type: 'Private', fee: '₹1,50,000/year' },
    { name: 'NIFD', location: 'Chennai', type: 'Private', fee: '₹1,20,000/year' },
  ],
  interior: [
    { name: 'School of Architecture, Anna University', location: 'Chennai', type: 'Government', fee: '₹50,000/year' },
    { name: 'Pearl Academy', location: 'Chennai', type: 'Private', fee: '₹3,00,000/year' },
    { name: 'JD Institute', location: 'Chennai', type: 'Private', fee: '₹1,20,000/year' },
    { name: 'MAEER MIT Institute of Design', location: 'Pune', type: 'Private', fee: '₹2,50,000/year' },
  ],
  sports: [
    { name: 'Tamil Nadu Physical Education University', location: 'Chennai', type: 'Government', fee: '₹15,000/year' },
    { name: 'Alagappa University - Physical Education', location: 'Karaikudi', type: 'Government', fee: '₹12,000/year' },
    { name: 'LNIPE', location: 'Gwalior', type: 'Government', rating: 'Central Govt', fee: '₹25,000/year' },
  ],
  film: [
    { name: 'LV Prasad Film & TV Academy', location: 'Chennai', type: 'Private', rating: 'Top Ranked', fee: '₹2,50,000/year' },
    { name: 'FTII Pune', location: 'Pune', type: 'Government', rating: 'Central Govt', fee: '₹1,50,000/year' },
    { name: 'Satyajit Ray Film & TV', location: 'Kolkata', type: 'Government', rating: 'Central Govt', fee: '₹1,00,000/year' },
    { name: 'Asian Academy of Film & TV', location: 'Noida', type: 'Private', fee: '₹2,00,000/year' },
  ],
  criminology: [
    { name: 'University of Madras', location: 'Chennai', type: 'Government', rating: 'NAAC A++', fee: '₹15,000/year' },
    { name: 'Madurai Kamaraj University', location: 'Madurai', type: 'Government', rating: 'NAAC A++', fee: '₹12,000/year' },
  ],
  // Vocational
  iti: [
    { name: 'Govt ITI Chennai', location: 'Chennai', type: 'Government', fee: '₹2,000/year' },
    { name: 'Govt ITI Coimbatore', location: 'Coimbatore', type: 'Government', fee: '₹2,000/year' },
    { name: 'Govt ITI Madurai', location: 'Madurai', type: 'Government', fee: '₹2,000/year' },
    { name: 'Govt ITI Salem', location: 'Salem', type: 'Government', fee: '₹2,000/year' },
    { name: 'Govt ITI Trichy', location: 'Trichy', type: 'Government', fee: '₹2,000/year' },
  ],
  polytechnic: [
    { name: 'Government Polytechnic College, Chennai', location: 'Chennai', type: 'Government', fee: '₹5,000/year' },
    { name: 'Thiagarajar Polytechnic College', location: 'Salem', type: 'Aided', fee: '₹15,000/year' },
    { name: 'PSG Polytechnic College', location: 'Coimbatore', type: 'Aided', fee: '₹25,000/year' },
    { name: 'Central Polytechnic College', location: 'Chennai', type: 'Government', fee: '₹5,000/year' },
    { name: 'Kongu Polytechnic College', location: 'Erode', type: 'Private', fee: '₹20,000/year' },
    { name: 'Government Polytechnic, Coimbatore', location: 'Coimbatore', type: 'Government', fee: '₹5,000/year' },
    { name: 'SSM Polytechnic', location: 'Komarapalayam', type: 'Private', fee: '₹18,000/year' },
    { name: 'Nachimuthu Polytechnic', location: 'Pollachi', type: 'Aided', fee: '₹12,000/year' },
  ],
  bvoc: [
    { name: 'University of Madras', location: 'Chennai', type: 'Government', rating: 'NAAC A++', fee: '₹15,000/year' },
    { name: 'Bharathiar University', location: 'Coimbatore', type: 'Government', rating: 'NAAC A++', fee: '₹12,000/year' },
    { name: 'Alagappa University', location: 'Karaikudi', type: 'Government', rating: 'NAAC A++', fee: '₹12,000/year' },
    { name: 'Madurai Kamaraj University', location: 'Madurai', type: 'Government', rating: 'NAAC A++', fee: '₹10,000/year' },
  ],
  ca_cma: [
    { name: 'ICAI Chennai', location: 'Chennai', type: 'Private', rating: 'ICAI', fee: '₹Varies' },
    { name: 'ICMAI Chennai', location: 'Chennai', type: 'Private', rating: 'ICMAI', fee: '₹Varies' },
    { name: 'Loyola - CA Foundation', location: 'Chennai', type: 'Aided', rating: 'NAAC A++', fee: '₹40,000/year' },
  ],
  cs: [
    { name: 'ICSI Chennai', location: 'Chennai', type: 'Private', rating: 'ICSI', fee: '₹Varies' },
    { name: 'Various affiliated centers', location: 'Tamil Nadu', type: 'Private', fee: '₹Varies' },
  ],
  banking: [
    { name: 'Indian Institute of Banking & Finance', location: 'Chennai', type: 'Private', fee: '₹25,000' },
    { name: 'Various coaching centers', location: 'Tamil Nadu', type: 'Private', fee: '₹15,000-50,000' },
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
        { id: 'engineering', name: 'ENGINEERING', fullName: 'B.E / B.Tech - All Branches', icon: '⚙️', collegeCount: 450, eligibilityStatus: cutoff >= 100 ? 'eligible' : cutoff >= 80 ? 'borderline' : 'not_eligible', cutoffRequired: 100, userCutoff: cutoff, note: 'CSE, ECE, Mech, Civil, EEE' },
        { id: 'cse', name: 'CSE / IT', fullName: 'Computer Science, Information Technology', icon: '💻', collegeCount: 400, eligibilityStatus: cutoff >= 120 ? 'eligible' : cutoff >= 100 ? 'borderline' : 'not_eligible', note: 'High Demand Branch' },
        { id: 'ece', name: 'ECE / EEE', fullName: 'Electronics, Electrical Engineering', icon: '📡', collegeCount: 380, eligibilityStatus: cutoff >= 100 ? 'eligible' : cutoff >= 80 ? 'borderline' : 'not_eligible' },
        { id: 'mechanical', name: 'MECHANICAL', fullName: 'Mechanical, Automobile, Manufacturing', icon: '🔩', collegeCount: 420, eligibilityStatus: cutoff >= 75 ? 'eligible' : 'borderline' },
        { id: 'civil', name: 'CIVIL ENGINEERING', fullName: 'Civil, Construction, Infrastructure', icon: '🏗️', collegeCount: 350, eligibilityStatus: cutoff >= 70 ? 'eligible' : 'borderline' },
        { id: 'data_science', name: 'DATA SCIENCE / AI', fullName: 'B.Tech AI, ML, Data Science', icon: '🤖', collegeCount: 200, eligibilityStatus: cutoff >= 130 ? 'eligible' : 'borderline', note: 'Emerging Field' },
        { id: 'cyber_security', name: 'CYBER SECURITY', fullName: 'B.Tech Cyber Security, InfoSec', icon: '🔐', collegeCount: 100, eligibilityStatus: cutoff >= 110 ? 'eligible' : 'borderline' },
        { id: 'aerospace', name: 'AEROSPACE', fullName: 'Aerospace, Aeronautical Engineering', icon: '🛰️', collegeCount: 40, eligibilityStatus: cutoff >= 150 ? 'eligible' : 'borderline', note: 'Limited Seats' },
        { id: 'biomedical', name: 'BIOMEDICAL ENGG', fullName: 'Biomedical, Medical Electronics', icon: '🏥', collegeCount: 50, eligibilityStatus: cutoff >= 90 ? 'eligible' : 'borderline' },
        { id: 'chemical', name: 'CHEMICAL ENGG', fullName: 'Chemical, Petrochemical Engineering', icon: '🧪', collegeCount: 60, eligibilityStatus: cutoff >= 85 ? 'eligible' : 'borderline' },
        { id: 'architecture', name: 'ARCHITECTURE', fullName: 'B.Arch, B.Planning, Urban Design', icon: '📐', collegeCount: 50, eligibilityStatus: 'eligible', entranceExam: 'NATA Required' },
        { id: 'bca', name: 'BCA', fullName: 'Bachelor of Computer Applications', icon: '🖥️', collegeCount: 300, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'bsc_cs', name: 'B.Sc COMPUTER SCIENCE', fullName: 'B.Sc CS, IT, Software Systems', icon: '💾', collegeCount: 280, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'pure_science', name: 'B.Sc PHYSICS/MATHS', fullName: 'B.Sc Physics, Chemistry, Maths', icon: '🔬', collegeCount: 200, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'statistics', name: 'STATISTICS', fullName: 'B.Sc Statistics, Actuarial Science', icon: '📈', collegeCount: 100, eligibilityStatus: percentage >= 55 ? 'eligible' : 'not_eligible' },
        { id: 'aviation', name: 'AVIATION / DEFENCE', fullName: 'Pilot Training, NDA, IAF', icon: '✈️', collegeCount: 30, eligibilityStatus: 'eligible', note: 'Physical Fitness Required' },
        { id: 'merchant_navy', name: 'MERCHANT NAVY', fullName: 'B.Sc Nautical, Marine Engineering', icon: '🚢', collegeCount: 25, eligibilityStatus: 'eligible' },
        { id: 'robotics', name: 'ROBOTICS / IOT', fullName: 'B.Tech Robotics, IoT, Automation', icon: '🤖', collegeCount: 80, eligibilityStatus: cutoff >= 100 ? 'eligible' : 'borderline' },
        { id: 'gaming', name: 'GAME DEVELOPMENT', fullName: 'B.Tech Game Dev, AR/VR', icon: '🎮', collegeCount: 45, eligibilityStatus: percentage >= 55 ? 'eligible' : 'borderline' },
        { id: 'textile', name: 'TEXTILE ENGG', fullName: 'Textile, Apparel Technology', icon: '🧵', collegeCount: 35, eligibilityStatus: cutoff >= 60 ? 'eligible' : 'borderline' },
        { id: 'mining', name: 'MINING ENGG', fullName: 'Mining, Petroleum Engineering', icon: '⛏️', collegeCount: 20, eligibilityStatus: 'eligible' },
        { id: 'food_tech', name: 'FOOD TECHNOLOGY', fullName: 'B.Tech Food Science, Processing', icon: '🍽️', collegeCount: 45, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'printing', name: 'PRINTING TECH', fullName: 'Printing, Packaging Technology', icon: '🖨️', collegeCount: 15, eligibilityStatus: 'eligible' },
      ];
    case 'pcb':
      return [
        { id: 'mbbs', name: 'MBBS / BDS', fullName: 'Medicine & Dental', icon: '🏥', collegeCount: 50, eligibilityStatus: neet && neet >= 500 ? 'eligible' : neet && neet >= 400 ? 'borderline' : 'not_eligible', entranceExam: 'NEET Required', note: neet ? `Your NEET: ${neet}` : 'Enter NEET Score' },
        { id: 'bds', name: 'BDS (DENTAL)', fullName: 'Bachelor of Dental Surgery', icon: '🦷', collegeCount: 30, eligibilityStatus: neet && neet >= 450 ? 'eligible' : 'borderline', entranceExam: 'NEET Required' },
        { id: 'pharmacy', name: 'PHARMACY', fullName: 'B.Pharm, Pharm.D', icon: '💊', collegeCount: 150, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'd_pharm', name: 'D.PHARM', fullName: 'Diploma in Pharmacy', icon: '💉', collegeCount: 200, eligibilityStatus: percentage >= 45 ? 'eligible' : 'not_eligible' },
        { id: 'nursing', name: 'B.Sc NURSING', fullName: 'B.Sc Nursing (4 Years)', icon: '🩺', collegeCount: 200, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'gnm', name: 'GNM NURSING', fullName: 'General Nursing & Midwifery', icon: '👩‍⚕️', collegeCount: 180, eligibilityStatus: percentage >= 45 ? 'eligible' : 'not_eligible' },
        { id: 'anm', name: 'ANM', fullName: 'Auxiliary Nurse Midwife', icon: '🏥', collegeCount: 150, eligibilityStatus: percentage >= 40 ? 'eligible' : 'not_eligible' },
        { id: 'physiotherapy', name: 'PHYSIOTHERAPY', fullName: 'BPT - Bachelor of Physiotherapy', icon: '🏃', collegeCount: 100, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'mlt', name: 'MLT / DMLT', fullName: 'Medical Lab Technology', icon: '🔬', collegeCount: 120, eligibilityStatus: percentage >= 45 ? 'eligible' : 'not_eligible' },
        { id: 'radiology', name: 'RADIOLOGY', fullName: 'B.Sc Radiology, Imaging Tech', icon: '📷', collegeCount: 80, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'optometry', name: 'OPTOMETRY', fullName: 'B.Sc Optometry, Vision Science', icon: '👁️', collegeCount: 60, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'cardiac_tech', name: 'CARDIAC TECH', fullName: 'B.Sc Cardiac Technology', icon: '❤️', collegeCount: 50, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'dialysis_tech', name: 'DIALYSIS TECH', fullName: 'B.Sc Dialysis Technology', icon: '🩸', collegeCount: 45, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'respiratory', name: 'RESPIRATORY CARE', fullName: 'B.Sc Respiratory Therapy', icon: '🌬️', collegeCount: 40, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'ot_tech', name: 'OT TECHNICIAN', fullName: 'B.Sc Operation Theatre Tech', icon: '🩺', collegeCount: 55, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'ayush', name: 'AYUSH', fullName: 'BAMS, BHMS, BUMS, BNYS', icon: '🌿', collegeCount: 30, eligibilityStatus: 'borderline', entranceExam: 'NEET Required' },
        { id: 'bams', name: 'BAMS (AYURVEDA)', fullName: 'Ayurvedic Medicine & Surgery', icon: '🍃', collegeCount: 25, eligibilityStatus: 'borderline', entranceExam: 'NEET Required' },
        { id: 'bhms', name: 'BHMS (HOMEOPATHY)', fullName: 'Homeopathy Medicine & Surgery', icon: '💊', collegeCount: 20, eligibilityStatus: 'borderline', entranceExam: 'NEET Required' },
        { id: 'agriculture', name: 'B.Sc AGRICULTURE', fullName: 'B.Sc Agriculture (4 Years)', icon: '🌾', collegeCount: 80, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'veterinary', name: 'VETERINARY (BVSc)', fullName: 'Bachelor of Veterinary Science', icon: '🐾', collegeCount: 15, eligibilityStatus: 'borderline', entranceExam: 'NEET Required' },
        { id: 'horticulture', name: 'HORTICULTURE', fullName: 'B.Sc Horticulture, Floriculture', icon: '🌻', collegeCount: 40, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'forestry', name: 'FORESTRY', fullName: 'B.Sc Forestry, Environmental Science', icon: '🌲', collegeCount: 25, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'fisheries', name: 'FISHERIES', fullName: 'B.F.Sc Fisheries Science', icon: '🐟', collegeCount: 20, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'biotechnology', name: 'BIOTECHNOLOGY', fullName: 'B.Sc/B.Tech Biotechnology', icon: '🧬', collegeCount: 100, eligibilityStatus: percentage >= 55 ? 'eligible' : 'not_eligible' },
        { id: 'microbiology', name: 'MICROBIOLOGY', fullName: 'B.Sc Microbiology, Biochemistry', icon: '🔬', collegeCount: 120, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'genetics', name: 'GENETICS', fullName: 'B.Sc Genetics, Molecular Biology', icon: '🧫', collegeCount: 60, eligibilityStatus: percentage >= 55 ? 'eligible' : 'not_eligible' },
        { id: 'zoology', name: 'B.Sc ZOOLOGY', fullName: 'B.Sc Zoology, Animal Science', icon: '🦎', collegeCount: 150, eligibilityStatus: percentage >= 45 ? 'eligible' : 'not_eligible' },
        { id: 'botany', name: 'B.Sc BOTANY', fullName: 'B.Sc Botany, Plant Science', icon: '🌱', collegeCount: 150, eligibilityStatus: percentage >= 45 ? 'eligible' : 'not_eligible' },
        { id: 'food_tech', name: 'FOOD TECHNOLOGY', fullName: 'B.Tech Food Tech, Dairy Tech', icon: '🍽️', collegeCount: 60, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'nutrition', name: 'NUTRITION / DIETETICS', fullName: 'B.Sc Nutrition, Clinical Dietetics', icon: '🥗', collegeCount: 80, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'occupational_therapy', name: 'OCCUPATIONAL THERAPY', fullName: 'BOT - Bachelor of Occupational Therapy', icon: '🤝', collegeCount: 40, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'speech_therapy', name: 'SPEECH THERAPY', fullName: 'BASLP - Audiology & Speech', icon: '🗣️', collegeCount: 35, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'psychology', name: 'B.Sc PSYCHOLOGY', fullName: 'B.Sc Psychology, Clinical Psychology', icon: '🧠', collegeCount: 120, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
      ];
    case 'pcmb':
      return [
        { id: 'engineering', name: 'ENGINEERING', fullName: 'B.E / B.Tech', icon: '⚙️', collegeCount: 450, eligibilityStatus: cutoff >= 100 ? 'eligible' : cutoff >= 80 ? 'borderline' : 'not_eligible', cutoffRequired: 100, userCutoff: cutoff },
        { id: 'mbbs', name: 'MBBS / BDS', fullName: 'Medicine & Dental', icon: '🏥', collegeCount: 50, eligibilityStatus: neet && neet >= 500 ? 'eligible' : 'borderline', entranceExam: 'NEET Required' },
        { id: 'pharmacy', name: 'PHARMACY', fullName: 'B.Pharm, Pharm.D', icon: '💊', collegeCount: 150, eligibilityStatus: 'eligible' },
        { id: 'nursing', name: 'B.Sc NURSING', fullName: 'B.Sc Nursing, GNM', icon: '🩺', collegeCount: 200, eligibilityStatus: 'eligible' },
        { id: 'physiotherapy', name: 'PHYSIOTHERAPY', fullName: 'BPT - Physiotherapy', icon: '🏃', collegeCount: 100, eligibilityStatus: 'eligible' },
        { id: 'allied_health', name: 'ALLIED HEALTH', fullName: 'MLT, Radiology, Optometry', icon: '🧪', collegeCount: 100, eligibilityStatus: 'eligible' },
        { id: 'biotechnology', name: 'BIOTECHNOLOGY', fullName: 'B.Sc/B.Tech Biotech', icon: '🧬', collegeCount: 100, eligibilityStatus: 'eligible' },
        { id: 'microbiology', name: 'MICROBIOLOGY', fullName: 'B.Sc Microbiology, Biochemistry', icon: '🔬', collegeCount: 120, eligibilityStatus: 'eligible' },
        { id: 'agriculture', name: 'B.Sc AGRICULTURE', fullName: 'Agriculture, Horticulture', icon: '🌾', collegeCount: 80, eligibilityStatus: 'eligible' },
        { id: 'food_tech', name: 'FOOD TECHNOLOGY', fullName: 'B.Tech Food Science', icon: '🍽️', collegeCount: 60, eligibilityStatus: 'eligible' },
        { id: 'pure_science', name: 'PURE SCIENCE', fullName: 'B.Sc Physics/Chemistry/Maths/Biology', icon: '🔬', collegeCount: 200, eligibilityStatus: 'eligible' },
        { id: 'research', name: 'RESEARCH', fullName: 'Integrated M.Sc, BS-MS', icon: '📚', collegeCount: 50, eligibilityStatus: 'eligible', entranceExam: 'IISER/NISER Exams' },
        { id: 'computer_it', name: 'COMPUTER SCIENCE', fullName: 'B.Sc CS, BCA, B.Tech CS', icon: '💻', collegeCount: 300, eligibilityStatus: 'eligible' },
        { id: 'data_science', name: 'DATA SCIENCE / AI', fullName: 'B.Sc Data Science, AI/ML', icon: '🤖', collegeCount: 150, eligibilityStatus: 'eligible' },
        { id: 'ayush', name: 'AYUSH', fullName: 'BAMS, BHMS, BUMS, BNYS', icon: '🌿', collegeCount: 30, eligibilityStatus: 'borderline', entranceExam: 'NEET Required' },
        { id: 'veterinary', name: 'VETERINARY', fullName: 'BVSc - Veterinary Science', icon: '🐾', collegeCount: 15, eligibilityStatus: 'borderline', entranceExam: 'NEET Required' },
        { id: 'nutrition', name: 'NUTRITION', fullName: 'B.Sc Nutrition, Dietetics', icon: '🥗', collegeCount: 80, eligibilityStatus: 'eligible' },
        { id: 'psychology', name: 'PSYCHOLOGY', fullName: 'B.Sc Psychology', icon: '🧠', collegeCount: 120, eligibilityStatus: 'eligible' },
      ];
    case 'commerce':
      return [
        { id: 'bcom', name: 'B.COM (GENERAL)', fullName: 'B.Com General, Honours', icon: '📊', collegeCount: 400, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'bcom_ca', name: 'B.COM (COMPUTER)', fullName: 'B.Com Computer Applications', icon: '💻', collegeCount: 350, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'bcom_corp', name: 'B.COM (CORPORATE)', fullName: 'B.Com Corporate Secretaryship', icon: '🏢', collegeCount: 200, eligibilityStatus: percentage >= 55 ? 'eligible' : 'not_eligible' },
        { id: 'bcom_banking', name: 'B.COM (BANKING)', fullName: 'B.Com Banking & Insurance', icon: '🏦', collegeCount: 180, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'bcom_taxation', name: 'B.COM (TAXATION)', fullName: 'B.Com Taxation, Tax Procedures', icon: '📋', collegeCount: 150, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'bcom_acct', name: 'B.COM (ACCOUNTING)', fullName: 'B.Com Accounting & Finance', icon: '🧮', collegeCount: 300, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'bba', name: 'BBA (GENERAL)', fullName: 'Bachelor of Business Admin', icon: '👔', collegeCount: 200, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'bba_aviation', name: 'BBA (AVIATION)', fullName: 'BBA Aviation Management', icon: '✈️', collegeCount: 40, eligibilityStatus: percentage >= 55 ? 'eligible' : 'not_eligible' },
        { id: 'bba_hospital', name: 'BBA (HOSPITAL MGMT)', fullName: 'BBA Hospital Administration', icon: '🏥', collegeCount: 60, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'bba_retail', name: 'BBA (RETAIL MGMT)', fullName: 'BBA Retail Management', icon: '🛒', collegeCount: 50, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'bca', name: 'BCA', fullName: 'Bachelor of Computer Apps', icon: '💻', collegeCount: 250, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'ca_cs', name: 'CA / CS / CMA', fullName: 'Chartered Accountant, Company Secretary', icon: '📜', collegeCount: 0, eligibilityStatus: 'eligible', entranceExam: 'Entrance Exams' },
        { id: 'cfa', name: 'CFA / FRM', fullName: 'Chartered Financial Analyst', icon: '💰', collegeCount: 0, eligibilityStatus: 'eligible', entranceExam: 'International Certification' },
        { id: 'economics', name: 'BA ECONOMICS', fullName: 'BA/B.Sc Economics Honours', icon: '📈', collegeCount: 150, eligibilityStatus: percentage >= 55 ? 'eligible' : 'not_eligible' },
        { id: 'banking', name: 'BANKING & FINANCE', fullName: 'B.Sc Banking, Finance', icon: '💳', collegeCount: 100, eligibilityStatus: 'eligible' },
        { id: 'insurance', name: 'INSURANCE', fullName: 'B.Com Insurance, Risk Mgmt', icon: '🛡️', collegeCount: 50, eligibilityStatus: 'eligible' },
        { id: 'logistics', name: 'LOGISTICS / SCM', fullName: 'BBA Logistics, Supply Chain', icon: '🚚', collegeCount: 40, eligibilityStatus: 'eligible' },
        { id: 'hotel', name: 'HOTEL MGMT', fullName: 'BHM, BHMCT, Hospitality', icon: '🏨', collegeCount: 80, eligibilityStatus: 'eligible' },
        { id: 'travel', name: 'TRAVEL & TOURISM', fullName: 'BBA Travel, Tourism Management', icon: '🌍', collegeCount: 60, eligibilityStatus: 'eligible' },
        { id: 'event_mgmt', name: 'EVENT MANAGEMENT', fullName: 'BBA Event Mgmt, PR', icon: '🎪', collegeCount: 35, eligibilityStatus: 'eligible' },
        { id: 'hr_mgmt', name: 'HR MANAGEMENT', fullName: 'BBA Human Resource Management', icon: '👥', collegeCount: 80, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'marketing', name: 'MARKETING', fullName: 'BBA Marketing Management', icon: '📣', collegeCount: 90, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'intl_business', name: 'INTERNATIONAL BUSINESS', fullName: 'BBA International Business', icon: '🌐', collegeCount: 45, eligibilityStatus: percentage >= 55 ? 'eligible' : 'not_eligible' },
        { id: 'entrepreneurship', name: 'ENTREPRENEURSHIP', fullName: 'BBA Entrepreneurship Development', icon: '🚀', collegeCount: 40, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'real_estate', name: 'REAL ESTATE', fullName: 'BBA Real Estate Management', icon: '🏠', collegeCount: 25, eligibilityStatus: 'eligible' },
        { id: 'sports_mgmt', name: 'SPORTS MANAGEMENT', fullName: 'BBA Sports Management', icon: '🏆', collegeCount: 30, eligibilityStatus: 'eligible' },
        { id: 'e_commerce', name: 'E-COMMERCE', fullName: 'B.Com E-Commerce, Digital Business', icon: '🛍️', collegeCount: 70, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
      ];
    case 'arts':
      return [
        { id: 'ba_english', name: 'BA ENGLISH', fullName: 'BA English Literature', icon: '📚', collegeCount: 400, eligibilityStatus: percentage >= 45 ? 'eligible' : 'not_eligible' },
        { id: 'ba_tamil', name: 'BA TAMIL', fullName: 'BA Tamil Literature', icon: '📜', collegeCount: 300, eligibilityStatus: percentage >= 45 ? 'eligible' : 'not_eligible' },
        { id: 'ba_history', name: 'BA HISTORY', fullName: 'BA History, Heritage Studies', icon: '🏛️', collegeCount: 350, eligibilityStatus: percentage >= 45 ? 'eligible' : 'not_eligible' },
        { id: 'ba_economics', name: 'BA ECONOMICS', fullName: 'BA Economics, Development Studies', icon: '📈', collegeCount: 300, eligibilityStatus: percentage >= 50 ? 'eligible' : 'not_eligible' },
        { id: 'ba_pol_sci', name: 'BA POLITICAL SCIENCE', fullName: 'BA Political Science, Public Admin', icon: '🏛️', collegeCount: 280, eligibilityStatus: percentage >= 45 ? 'eligible' : 'not_eligible' },
        { id: 'ba_sociology', name: 'BA SOCIOLOGY', fullName: 'BA Sociology, Social Work', icon: '👥', collegeCount: 250, eligibilityStatus: percentage >= 45 ? 'eligible' : 'not_eligible' },
        { id: 'ba_philosophy', name: 'BA PHILOSOPHY', fullName: 'BA Philosophy, Logic', icon: '🤔', collegeCount: 100, eligibilityStatus: percentage >= 45 ? 'eligible' : 'not_eligible' },
        { id: 'ba_geography', name: 'BA GEOGRAPHY', fullName: 'BA Geography, Geoinformatics', icon: '🌍', collegeCount: 150, eligibilityStatus: percentage >= 45 ? 'eligible' : 'not_eligible' },
        { id: 'law', name: 'LAW (LLB)', fullName: 'BA LLB, BBA LLB, LLB', icon: '⚖️', collegeCount: 50, eligibilityStatus: 'borderline', entranceExam: 'CLAT/LSAT Required' },
        { id: 'law_3yr', name: 'LLB (3 YEAR)', fullName: 'LLB after Graduation', icon: '⚖️', collegeCount: 60, eligibilityStatus: 'borderline', note: 'After UG Degree' },
        { id: 'journalism', name: 'JOURNALISM', fullName: 'BA Journalism, BMM, Mass Comm', icon: '📰', collegeCount: 100, eligibilityStatus: 'eligible' },
        { id: 'mass_comm', name: 'MASS COMMUNICATION', fullName: 'BA/B.Sc Mass Communication', icon: '📺', collegeCount: 80, eligibilityStatus: 'eligible' },
        { id: 'advertising', name: 'ADVERTISING / PR', fullName: 'BA Advertising, Public Relations', icon: '📣', collegeCount: 50, eligibilityStatus: 'eligible' },
        { id: 'bed', name: 'B.ED', fullName: 'Bachelor of Education', icon: '🎓', collegeCount: 250, eligibilityStatus: 'borderline', note: 'After UG Degree' },
        { id: 'bped', name: 'B.P.ED', fullName: 'Bachelor of Physical Education', icon: '🏃', collegeCount: 100, eligibilityStatus: percentage >= 45 ? 'eligible' : 'not_eligible' },
        { id: 'bsw', name: 'BSW', fullName: 'Bachelor of Social Work', icon: '👥', collegeCount: 150, eligibilityStatus: 'eligible' },
        { id: 'civil_services', name: 'CIVIL SERVICES', fullName: 'UPSC/TNPSC Preparation', icon: '🌍', collegeCount: 0, eligibilityStatus: 'borderline', note: 'After Degree' },
        { id: 'psychology', name: 'PSYCHOLOGY', fullName: 'BA/B.Sc Psychology', icon: '🧠', collegeCount: 120, eligibilityStatus: 'eligible' },
        { id: 'counselling', name: 'COUNSELLING', fullName: 'BA Counselling Psychology', icon: '💬', collegeCount: 60, eligibilityStatus: 'eligible' },
        { id: 'fine_arts', name: 'FINE ARTS', fullName: 'BFA, Visual Arts, Design', icon: '🎨', collegeCount: 60, eligibilityStatus: 'eligible' },
        { id: 'painting', name: 'PAINTING', fullName: 'BFA Painting, Drawing', icon: '🖌️', collegeCount: 40, eligibilityStatus: 'eligible', entranceExam: 'Aptitude Test' },
        { id: 'sculpture', name: 'SCULPTURE', fullName: 'BFA Sculpture, Ceramics', icon: '🗿', collegeCount: 25, eligibilityStatus: 'eligible', entranceExam: 'Aptitude Test' },
        { id: 'applied_arts', name: 'APPLIED ARTS', fullName: 'BFA Applied Arts, Commercial Art', icon: '🎭', collegeCount: 35, eligibilityStatus: 'eligible' },
        { id: 'music', name: 'MUSIC', fullName: 'BA Music, Carnatic/Hindustani', icon: '🎵', collegeCount: 80, eligibilityStatus: 'eligible', entranceExam: 'Audition' },
        { id: 'dance', name: 'DANCE', fullName: 'BA Dance, Bharatanatyam', icon: '💃', collegeCount: 60, eligibilityStatus: 'eligible', entranceExam: 'Audition' },
        { id: 'theatre', name: 'THEATRE ARTS', fullName: 'BA Theatre, Drama', icon: '🎭', collegeCount: 30, eligibilityStatus: 'eligible' },
        { id: 'library_science', name: 'LIBRARY SCIENCE', fullName: 'B.Lib, Information Science', icon: '📖', collegeCount: 40, eligibilityStatus: 'eligible' },
        { id: 'tourism', name: 'TOURISM', fullName: 'BTA, Travel & Tourism Mgmt', icon: '✈️', collegeCount: 50, eligibilityStatus: 'eligible' },
        { id: 'hotel', name: 'HOTEL MANAGEMENT', fullName: 'BHM, Hospitality Studies', icon: '🏨', collegeCount: 70, eligibilityStatus: 'eligible' },
        { id: 'languages', name: 'FOREIGN LANGUAGES', fullName: 'BA French, German, Japanese', icon: '🗣️', collegeCount: 100, eligibilityStatus: 'eligible' },
        { id: 'hindi', name: 'BA HINDI', fullName: 'BA Hindi Literature', icon: '📝', collegeCount: 150, eligibilityStatus: percentage >= 45 ? 'eligible' : 'not_eligible' },
        { id: 'sanskrit', name: 'BA SANSKRIT', fullName: 'BA Sanskrit, Vedic Studies', icon: '📿', collegeCount: 50, eligibilityStatus: 'eligible' },
        { id: 'fashion', name: 'FASHION DESIGN', fullName: 'B.Des Fashion, Textile Design', icon: '👗', collegeCount: 60, eligibilityStatus: 'eligible', entranceExam: 'NIFT/NID' },
        { id: 'interior', name: 'INTERIOR DESIGN', fullName: 'B.Des Interior Design', icon: '🏠', collegeCount: 50, eligibilityStatus: 'eligible' },
        { id: 'graphic', name: 'GRAPHIC DESIGN', fullName: 'B.Des Graphic, UI/UX Design', icon: '🎨', collegeCount: 70, eligibilityStatus: 'eligible' },
        { id: 'animation', name: 'ANIMATION / VFX', fullName: 'B.Sc Animation, Gaming', icon: '🎬', collegeCount: 80, eligibilityStatus: 'eligible' },
        { id: 'film_studies', name: 'FILM STUDIES', fullName: 'BA Film Making, Direction', icon: '🎥', collegeCount: 40, eligibilityStatus: 'eligible' },
        { id: 'photography', name: 'PHOTOGRAPHY', fullName: 'BA Photography, Videography', icon: '📷', collegeCount: 35, eligibilityStatus: 'eligible' },
        { id: 'criminology', name: 'CRIMINOLOGY', fullName: 'BA Criminology, Forensics', icon: '🔍', collegeCount: 30, eligibilityStatus: 'eligible' },
        { id: 'defense', name: 'DEFENSE STUDIES', fullName: 'BA Defense Studies, NCC', icon: '🎖️', collegeCount: 40, eligibilityStatus: 'eligible' },
        { id: 'anthropology', name: 'ANTHROPOLOGY', fullName: 'BA Anthropology, Archaeology', icon: '🦴', collegeCount: 35, eligibilityStatus: 'eligible' },
        { id: 'home_science', name: 'HOME SCIENCE', fullName: 'B.Sc Home Science, Nutrition', icon: '🏡', collegeCount: 100, eligibilityStatus: 'eligible' },
      ];
    case 'vocational':
      return [
        { id: 'diploma_mech', name: 'DIPLOMA MECHANICAL', fullName: 'Diploma Mechanical Engineering', icon: '🔧', collegeCount: 400, eligibilityStatus: 'eligible' },
        { id: 'diploma_civil', name: 'DIPLOMA CIVIL', fullName: 'Diploma Civil Engineering', icon: '🏗️', collegeCount: 350, eligibilityStatus: 'eligible' },
        { id: 'diploma_ece', name: 'DIPLOMA ECE', fullName: 'Diploma Electronics & Comm', icon: '📡', collegeCount: 320, eligibilityStatus: 'eligible' },
        { id: 'diploma_eee', name: 'DIPLOMA EEE', fullName: 'Diploma Electrical Engineering', icon: '⚡', collegeCount: 300, eligibilityStatus: 'eligible' },
        { id: 'diploma_cs', name: 'DIPLOMA COMPUTER', fullName: 'Diploma Computer Engineering', icon: '💻', collegeCount: 380, eligibilityStatus: 'eligible' },
        { id: 'diploma_auto', name: 'DIPLOMA AUTOMOBILE', fullName: 'Diploma Automobile Engineering', icon: '🚗', collegeCount: 150, eligibilityStatus: 'eligible' },
        { id: 'diploma_textile', name: 'DIPLOMA TEXTILE', fullName: 'Diploma Textile Technology', icon: '🧵', collegeCount: 80, eligibilityStatus: 'eligible' },
        { id: 'diploma_printing', name: 'DIPLOMA PRINTING', fullName: 'Diploma Printing Technology', icon: '🖨️', collegeCount: 40, eligibilityStatus: 'eligible' },
        { id: 'iti_fitter', name: 'ITI FITTER', fullName: 'ITI Fitter Trade', icon: '🔩', collegeCount: 250, eligibilityStatus: 'eligible' },
        { id: 'iti_electrician', name: 'ITI ELECTRICIAN', fullName: 'ITI Electrician Trade', icon: '⚡', collegeCount: 280, eligibilityStatus: 'eligible' },
        { id: 'iti_welder', name: 'ITI WELDER', fullName: 'ITI Welder Trade', icon: '🔥', collegeCount: 200, eligibilityStatus: 'eligible' },
        { id: 'iti_turner', name: 'ITI TURNER', fullName: 'ITI Turner Trade', icon: '🔧', collegeCount: 180, eligibilityStatus: 'eligible' },
        { id: 'iti_copa', name: 'ITI COPA', fullName: 'Computer Operator & Programming', icon: '🖥️', collegeCount: 300, eligibilityStatus: 'eligible' },
        { id: 'iti_mechanic', name: 'ITI MECHANIC', fullName: 'Motor Vehicle Mechanic', icon: '🚘', collegeCount: 200, eligibilityStatus: 'eligible' },
        { id: 'iti_plumber', name: 'ITI PLUMBER', fullName: 'ITI Plumber Trade', icon: '🚿', collegeCount: 150, eligibilityStatus: 'eligible' },
        { id: 'iti_carpenter', name: 'ITI CARPENTER', fullName: 'ITI Carpenter Trade', icon: '🪵', collegeCount: 120, eligibilityStatus: 'eligible' },
        { id: 'lateral', name: 'LATERAL ENTRY', fullName: 'Direct B.E 2nd Year', icon: '🎓', collegeCount: 0, eligibilityStatus: 'borderline', note: 'After Diploma' },
        { id: 'apprenticeship', name: 'APPRENTICESHIP', fullName: 'Earn While You Learn', icon: '🏭', collegeCount: 0, eligibilityStatus: 'eligible', note: 'Stipend: ₹5000-15000' },
        { id: 'bvoc', name: 'B.VOC', fullName: 'Retail, Fashion, Tourism, Healthcare', icon: '📚', collegeCount: 100, eligibilityStatus: 'eligible' },
        { id: 'bvoc_retail', name: 'B.VOC RETAIL', fullName: 'B.Voc Retail Management', icon: '🛒', collegeCount: 50, eligibilityStatus: 'eligible' },
        { id: 'bvoc_fashion', name: 'B.VOC FASHION', fullName: 'B.Voc Fashion Design', icon: '👗', collegeCount: 40, eligibilityStatus: 'eligible' },
        { id: 'bvoc_software', name: 'B.VOC SOFTWARE', fullName: 'B.Voc Software Development', icon: '💾', collegeCount: 80, eligibilityStatus: 'eligible' },
        { id: 'animation', name: 'ANIMATION / VFX', fullName: 'Diploma in Animation, Gaming', icon: '🎬', collegeCount: 80, eligibilityStatus: 'eligible' },
        { id: 'automobile', name: 'AUTOMOBILE / EV', fullName: 'Diploma Automobile, EV Tech', icon: '🚗', collegeCount: 60, eligibilityStatus: 'eligible' },
        { id: 'fashion', name: 'FASHION DESIGN', fullName: 'Diploma Fashion, Textile', icon: '👗', collegeCount: 50, eligibilityStatus: 'eligible' },
        { id: 'hotel_catering', name: 'HOTEL / CATERING', fullName: 'Diploma Hotel Management', icon: '🏨', collegeCount: 70, eligibilityStatus: 'eligible' },
        { id: 'beauty', name: 'BEAUTY / WELLNESS', fullName: 'Diploma Beauty, Cosmetology', icon: '💅', collegeCount: 100, eligibilityStatus: 'eligible' },
        { id: 'food_prod', name: 'FOOD PRODUCTION', fullName: 'Diploma Culinary Arts', icon: '👨‍🍳', collegeCount: 60, eligibilityStatus: 'eligible' },
        { id: 'photography', name: 'PHOTOGRAPHY', fullName: 'Diploma Photography, Videography', icon: '📷', collegeCount: 50, eligibilityStatus: 'eligible' },
        { id: 'ac_ref', name: 'AC / REFRIGERATION', fullName: 'ITI AC & Refrigeration', icon: '❄️', collegeCount: 120, eligibilityStatus: 'eligible' },
        { id: 'medical_lab', name: 'DMLT', fullName: 'Diploma Medical Lab Tech', icon: '🔬', collegeCount: 100, eligibilityStatus: 'eligible' },
        { id: 'pharmacy_tech', name: 'D.PHARM', fullName: 'Diploma in Pharmacy', icon: '💊', collegeCount: 150, eligibilityStatus: 'eligible' },
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
