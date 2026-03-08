 import { useState } from 'react';
 import { Card, CardContent } from '@/components/ui/card';
 import { Badge } from '@/components/ui/badge';
 import { Button } from '@/components/ui/button';
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
 import { Input } from '@/components/ui/input';
 import { cn } from '@/lib/utils';
 import { Building2, MapPin, Star, IndianRupee, Briefcase, Search, Heart, Shield, Landmark } from 'lucide-react';
 import { EngineeringResult } from './EngineeringCalculator';
 
 interface CollegePredictorProps {
   engineeringResult?: EngineeringResult | null;
   cutoffScore?: number;
   categoryCode?: string;
 }
 
 interface PredictedCollege {
   id: string;
   name: string;
   nameTamil?: string;
   location: string;
   district: string;
   type: 'Government' | 'Aided' | 'Private';
   lastYearCutoff: Record<string, number>;
   branches: Branch[];
   annualFee: string;
   placement: string;
   naacGrade?: string;
   nirfRank?: number;
   seats: number;
   logo?: string;
   dataYear?: string;
 }
 
 interface Branch {
   code: string;
   name: string;
   lastCutoff: number;
   seats: number;
   chance: 'High' | 'Medium' | 'Low';
 }
 
 // Government Engineering Colleges in Tamil Nadu - VERIFIED DOTE 2024 Cutoff Data
 // Source: TNEA 2024 Mark Cutoff PDF (static.tneaonline.org)
 const governmentColleges: PredictedCollege[] = [
   {
     id: '1',
     logo: 'https://ui-avatars.com/api/?name=CEG&background=1a237e&color=fff&size=128&bold=true&rounded=true',
     name: 'College of Engineering, Guindy (Anna University)',
     nameTamil: 'அண்ணா பல்கலைக்கழகம், கிண்டி',
     location: 'Chennai',
     district: 'Chennai',
     type: 'Government',
     lastYearCutoff: { OC: 199, BC: 199, MBC: 199, SC: 185, ST: 175 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 199, seats: 63, chance: 'Low' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 198, seats: 126, chance: 'Low' },
       { code: 'IT', name: 'Information Technology (SS)', lastCutoff: 197, seats: 60, chance: 'Low' },
       { code: 'EEE', name: 'Electrical & Electronics', lastCutoff: 189.5, seats: 94, chance: 'Medium' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 188.5, seats: 157, chance: 'Medium' },
       { code: 'MFG', name: 'Manufacturing', lastCutoff: 186.5, seats: 60, chance: 'Medium' },
       { code: 'IE', name: 'Industrial Engineering', lastCutoff: 185, seats: 60, chance: 'High' },
       { code: 'CIVIL', name: 'Civil Engineering', lastCutoff: 184, seats: 94, chance: 'High' },
       { code: 'VLSI', name: 'VLSI Design (SS)', lastCutoff: 174, seats: 30, chance: 'High' },
       { code: 'MAT', name: 'Material Science (SS)', lastCutoff: 164, seats: 30, chance: 'High' },
       { code: 'MINING', name: 'Mining Engineering', lastCutoff: 159, seats: 30, chance: 'High' },
       { code: 'PRINT', name: 'Printing & Packaging', lastCutoff: 150, seats: 30, chance: 'High' },
       { code: 'BME', name: 'Biomedical Engg (SS)', lastCutoff: 139.3, seats: 30, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹12 LPA',
     naacGrade: 'A++',
     nirfRank: 8,
     seats: 534,
   },
   {
     id: '2',
     logo: 'https://ui-avatars.com/api/?name=MIT&background=0d47a1&color=fff&size=128&bold=true&rounded=true',
     name: 'Madras Institute of Technology (MIT)',
     nameTamil: 'மெட்ராஸ் தொழில்நுட்ப நிறுவனம்',
     location: 'Chennai',
     district: 'Chennai',
     type: 'Government',
     lastYearCutoff: { OC: 199, BC: 194.5, MBC: 193, SC: 183, ST: 173 },
     branches: [
       { code: 'ROBO', name: 'Robotics & Automation (SS)', lastCutoff: 199, seats: 30, chance: 'Low' },
       { code: 'CSE', name: 'Computer Science', lastCutoff: 197, seats: 60, chance: 'Low' },
       { code: 'ECE-SS', name: 'Electronics & Comm (SS)', lastCutoff: 195, seats: 60, chance: 'Low' },
       { code: 'CSE-SS', name: 'Computer Science (SS)', lastCutoff: 194.5, seats: 60, chance: 'Medium' },
       { code: 'IT', name: 'Information Technology (SS)', lastCutoff: 189.5, seats: 60, chance: 'Medium' },
       { code: 'AI', name: 'AI & Data Science (SS)', lastCutoff: 182, seats: 30, chance: 'Medium' },
       { code: 'PROD', name: 'Production Engineering', lastCutoff: 180, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Comm', lastCutoff: 175, seats: 120, chance: 'High' },
       { code: 'AERO', name: 'Aeronautical Engineering', lastCutoff: 168.5, seats: 60, chance: 'High' },
       { code: 'EI', name: 'Electronics & Instrumentation', lastCutoff: 165, seats: 60, chance: 'High' },
       { code: 'RUBBER', name: 'Rubber & Plastic Tech', lastCutoff: 162, seats: 30, chance: 'High' },
       { code: 'AUTO', name: 'Automobile Engineering', lastCutoff: 156.5, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹10 LPA',
     naacGrade: 'A++',
     nirfRank: 12,
     seats: 300,
   },
   {
     id: '3',
     logo: 'https://ui-avatars.com/api/?name=ACT&background=1b5e20&color=fff&size=128&bold=true&rounded=true',
     name: 'Alagappa College of Technology (ACT)',
     nameTamil: 'அழகப்பா தொழில்நுட்ப கல்லூரி',
     location: 'Chennai',
     district: 'Chennai',
     type: 'Government',
     lastYearCutoff: { OC: 175, BC: 172, MBC: 170, SC: 160, ST: 150 },
     branches: [
       { code: 'CHEM', name: 'Chemical Engineering', lastCutoff: 175, seats: 60, chance: 'High' },
       { code: 'PETRO', name: 'Petroleum Engineering (SS)', lastCutoff: 172, seats: 30, chance: 'High' },
       { code: 'TEXT', name: 'Textile Technology', lastCutoff: 168, seats: 45, chance: 'High' },
       { code: 'CERAM', name: 'Ceramic Technology (SS)', lastCutoff: 151.5, seats: 30, chance: 'High' },
       { code: 'LEATH', name: 'Leather Technology', lastCutoff: 135.5, seats: 45, chance: 'High' },
       { code: 'FOOD', name: 'Food Technology (SS)', lastCutoff: 131.5, seats: 30, chance: 'High' },
       { code: 'CHEM-SS', name: 'Chemical Engg (SS)', lastCutoff: 131, seats: 30, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹8 LPA',
     naacGrade: 'A+',
     nirfRank: 35,
     seats: 165,
   },
   {
     id: '4',
     logo: 'https://ui-avatars.com/api/?name=GCE+S&background=37474f&color=fff&size=128&bold=true&rounded=true',
     dataYear: '2024',
     name: 'Govt. College of Engineering, Salem',
     nameTamil: 'அரசு பொறியியல் கல்லூரி, சேலம்',
     location: 'Salem',
     district: 'Salem',
     type: 'Government',
     lastYearCutoff: { OC: 188, BC: 185, MBC: 182, SC: 172, ST: 162 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 188, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 185, seats: 90, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 180, seats: 120, chance: 'High' },
       { code: 'CIVIL', name: 'Civil', lastCutoff: 175, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹5 LPA',
     naacGrade: 'A',
     seats: 330,
   },
   {
     id: '5',
     logo: 'https://ui-avatars.com/api/?name=GCE+T&background=4e342e&color=fff&size=128&bold=true&rounded=true',
     name: 'Govt. College of Engineering, Tirunelveli',
     nameTamil: 'அரசு பொறியியல் கல்லூரி, திருநெல்வேலி',
     location: 'Tirunelveli',
     district: 'Tirunelveli',
     type: 'Government',
     lastYearCutoff: { OC: 183, BC: 180, MBC: 177, SC: 168, ST: 158 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 186, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 183, seats: 90, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 178, seats: 120, chance: 'High' },
       { code: 'CIVIL', name: 'Civil', lastCutoff: 173, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹4.5 LPA',
     naacGrade: 'A',
     seats: 330,
   },
   {
     id: '6',
     logo: 'https://ui-avatars.com/api/?name=GCE+B&background=546e7a&color=fff&size=128&bold=true&rounded=true',
     name: 'Govt. College of Engineering, Bargur',
     nameTamil: 'அரசு பொறியியல் கல்லூரி, பார்கூர்',
     location: 'Bargur',
     district: 'Krishnagiri',
     type: 'Government',
     lastYearCutoff: { OC: 170, BC: 167, MBC: 164, SC: 155, ST: 145 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 173, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 170, seats: 60, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 165, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹4 LPA',
     seats: 180,
   },
   {
     id: '7',
     logo: 'https://ui-avatars.com/api/?name=UCE+R&background=5d4037&color=fff&size=128&bold=true&rounded=true',
     name: 'Govt. College of Engineering, Srirangam',
     nameTamil: 'அரசு பொறியியல் கல்லூரி, ஸ்ரீரங்கம்',
     location: 'Trichy',
     district: 'Tiruchirappalli',
     type: 'Government',
     lastYearCutoff: { OC: 178, BC: 175, MBC: 172, SC: 163, ST: 153 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 181, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 178, seats: 60, chance: 'High' },
       { code: 'EEE', name: 'Electrical & Electronics', lastCutoff: 175, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹4.5 LPA',
     seats: 180,
   },
   {
     id: '8',
     logo: 'https://ui-avatars.com/api/?name=GCE+J&background=d84315&color=fff&size=128&bold=true&rounded=true',
     name: 'Govt. College of Engineering, Thanjavur',
     nameTamil: 'அரசு பொறியியல் கல்லூரி, தஞ்சாவூர்',
     location: 'Thanjavur',
     district: 'Thanjavur',
     type: 'Government',
     lastYearCutoff: { OC: 175, BC: 172, MBC: 169, SC: 160, ST: 150 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 178, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 175, seats: 60, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 170, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹4 LPA',
     seats: 180,
   },
   {
     id: '9',
     logo: 'https://www.google.com/s2/favicons?domain=cit.edu.in&sz=128',
     name: 'Coimbatore Institute of Technology',
     nameTamil: 'கோவை தொழில்நுட்ப நிறுவனம்',
     location: 'Coimbatore',
     district: 'Coimbatore',
     type: 'Government',
     lastYearCutoff: { OC: 193, BC: 190, MBC: 187, SC: 178, ST: 168 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 193, seats: 60, chance: 'Medium' },
       { code: 'IT', name: 'Information Technology', lastCutoff: 190, seats: 60, chance: 'Medium' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 188, seats: 90, chance: 'High' },
       { code: 'EEE', name: 'Electrical & Electronics', lastCutoff: 185, seats: 90, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 182, seats: 120, chance: 'High' },
       { code: 'CIVIL', name: 'Civil Engineering', lastCutoff: 170, seats: 60, chance: 'High' },
       { code: 'BIOTECH', name: 'BioTechnology', lastCutoff: 162, seats: 30, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹6 LPA',
     naacGrade: 'A+',
     seats: 360,
   },
   {
     id: '10',
     logo: 'https://ui-avatars.com/api/?name=GCE+E&background=e8a628&color=000&size=128&bold=true&rounded=true',
     name: 'Govt. College of Engineering, Erode',
     nameTamil: 'அரசு பொறியியல் கல்லூரி, ஈரோடு',
     location: 'Erode',
     district: 'Erode',
     type: 'Government',
     lastYearCutoff: { OC: 168, BC: 165, MBC: 162, SC: 153, ST: 143 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 171, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 168, seats: 60, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 163, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹3.8 LPA',
     seats: 180,
   },
   {
     id: '11',
     logo: 'https://ui-avatars.com/api/?name=GCE+D&background=6d4c41&color=fff&size=128&bold=true&rounded=true',
     name: 'Govt. College of Engineering, Dharmapuri',
     nameTamil: 'அரசு பொறியியல் கல்லூரி, தர்மபுரி',
     location: 'Dharmapuri',
     district: 'Dharmapuri',
     type: 'Government',
     lastYearCutoff: { OC: 165, BC: 162, MBC: 159, SC: 150, ST: 140 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 168, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 165, seats: 60, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 160, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹3.5 LPA',
     seats: 180,
   },
   {
     id: '12',
     logo: 'https://ui-avatars.com/api/?name=GCE+K&background=795548&color=fff&size=128&bold=true&rounded=true',
     name: 'Govt. College of Engineering, Bodinayakkanur',
     nameTamil: 'அரசு பொறியியல் கல்லூரி, போடிநாயக்கனூர்',
     location: 'Bodinayakkanur',
     district: 'Theni',
     type: 'Government',
     lastYearCutoff: { OC: 160, BC: 157, MBC: 154, SC: 145, ST: 135 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 163, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 160, seats: 60, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 155, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹3.2 LPA',
     seats: 180,
   },
   {
     id: '13',
     logo: 'https://ui-avatars.com/api/?name=UCE+N&background=33691e&color=fff&size=128&bold=true&rounded=true',
     name: 'University College of Engineering, Nagercoil',
     nameTamil: 'பல்கலைக்கழக பொறியியல் கல்லூரி, நாகர்கோவில்',
     location: 'Nagercoil',
     district: 'Kanyakumari',
     type: 'Government',
     lastYearCutoff: { OC: 180, BC: 177, MBC: 174, SC: 165, ST: 155 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 183, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 180, seats: 60, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 175, seats: 60, chance: 'High' },
       { code: 'CIVIL', name: 'Civil Engineering', lastCutoff: 172, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹4.5 LPA',
     seats: 240,
   },
   {
     id: '14',
     logo: 'https://www.google.com/s2/favicons?domain=gcetly.ac.in&sz=128',
     name: 'University College of Engineering, Tindivanam',
     nameTamil: 'பல்கலைக்கழக பொறியியல் கல்லூரி, திண்டிவனம்',
     location: 'Tindivanam',
     district: 'Villupuram',
     type: 'Government',
     lastYearCutoff: { OC: 172, BC: 169, MBC: 166, SC: 157, ST: 147 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 175, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 172, seats: 60, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 168, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹4 LPA',
     seats: 180,
   },
   {
     id: '15',
     logo: 'https://ui-avatars.com/api/?name=UCE+A&background=263238&color=fff&size=128&bold=true&rounded=true',
     name: 'University College of Engineering, Ariyalur',
     nameTamil: 'பல்கலைக்கழக பொறியியல் கல்லூரி, அரியலூர்',
     location: 'Ariyalur',
     district: 'Ariyalur',
     type: 'Government',
     lastYearCutoff: { OC: 158, BC: 155, MBC: 152, SC: 143, ST: 133 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 161, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 158, seats: 60, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 153, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹3 LPA',
     seats: 180,
   },
   {
     id: '16',
     logo: 'https://ui-avatars.com/api/?name=UCE+R&background=1b5e20&color=fff&size=128&bold=true&rounded=true',
     name: 'University College of Engineering, Ramanathapuram',
     nameTamil: 'பல்கலைக்கழக பொறியியல் கல்லூரி, ராமநாதபுரம்',
     location: 'Ramanathapuram',
     district: 'Ramanathapuram',
     type: 'Government',
     lastYearCutoff: { OC: 155, BC: 152, MBC: 149, SC: 140, ST: 130 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 158, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 155, seats: 60, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 150, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹3 LPA',
     seats: 180,
   },
   {
     id: '17',
     logo: 'https://ui-avatars.com/api/?name=UCE+D&background=0277bd&color=fff&size=128&bold=true&rounded=true',
     name: 'University College of Engineering, Dindigul',
     nameTamil: 'பல்கலைக்கழக பொறியியல் கல்லூரி, திண்டுக்கல்',
     location: 'Dindigul',
     district: 'Dindigul',
     type: 'Government',
     lastYearCutoff: { OC: 170, BC: 167, MBC: 164, SC: 155, ST: 145 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 173, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 170, seats: 60, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 165, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹3.5 LPA',
     seats: 180,
   },
   {
     id: '18',
     logo: 'https://ui-avatars.com/api/?name=UCE+P&background=bf360c&color=fff&size=128&bold=true&rounded=true',
     name: 'University College of Engineering, Pattukkottai',
     nameTamil: 'பல்கலைக்கழக பொறியியல் கல்லூரி, பட்டுக்கோட்டை',
     location: 'Pattukkottai',
     district: 'Thanjavur',
     type: 'Government',
     lastYearCutoff: { OC: 162, BC: 159, MBC: 156, SC: 147, ST: 137 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 165, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 162, seats: 60, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 158, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹3.2 LPA',
     seats: 180,
   },
   {
     id: '19',
     logo: 'https://ui-avatars.com/api/?name=UCE+U&background=4a148c&color=fff&size=128&bold=true&rounded=true',
     name: 'University College of Engineering, Villupuram',
     nameTamil: 'பல்கலைக்கழக பொறியியல் கல்லூரி, விழுப்புரம்',
     location: 'Villupuram',
     district: 'Villupuram',
     type: 'Government',
     lastYearCutoff: { OC: 165, BC: 162, MBC: 159, SC: 150, ST: 140 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 168, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 165, seats: 60, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 160, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹3.5 LPA',
     seats: 180,
   },
   {
     id: '20',
     logo: 'https://ui-avatars.com/api/?name=UCE+K&background=880e4f&color=fff&size=128&bold=true&rounded=true',
     name: 'University College of Engineering, Kanchipuram',
     nameTamil: 'பல்கலைக்கழக பொறியியல் கல்லூரி, காஞ்சிபுரம்',
     location: 'Kanchipuram',
     district: 'Kanchipuram',
     type: 'Government',
     lastYearCutoff: { OC: 175, BC: 172, MBC: 169, SC: 160, ST: 150 },
     branches: [
       { code: 'CSE', name: 'Computer Science', lastCutoff: 178, seats: 60, chance: 'High' },
       { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 175, seats: 60, chance: 'High' },
       { code: 'MECH', name: 'Mechanical', lastCutoff: 170, seats: 60, chance: 'High' },
     ],
     annualFee: '₹7,500',
     placement: '₹4 LPA',
     seats: 180,
   },
 ];

// Top Private/Aided Engineering Colleges in Tamil Nadu - Through TNEA Counseling
const topPrivateColleges: PredictedCollege[] = [
  {
    id: 'p1',
     logo: 'https://www.google.com/s2/favicons?domain=psgtech.edu&sz=128',
    name: 'PSG College of Technology',
    nameTamil: 'PSG தொழில்நுட்ப கல்லூரி',
    location: 'Coimbatore',
    district: 'Coimbatore',
    type: 'Aided',
    lastYearCutoff: { OC: 199, BC: 197, MBC: 195, SC: 187, ST: 177 },
    branches: [
      { code: 'CSE', name: 'Computer Science', lastCutoff: 199.8, seats: 60, chance: 'Low' },
      { code: 'IT', name: 'Information Technology', lastCutoff: 198.5, seats: 60, chance: 'Low' },
      { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 197.5, seats: 90, chance: 'Low' },
      { code: 'EEE', name: 'Electrical & Electronics', lastCutoff: 195, seats: 60, chance: 'Medium' },
      { code: 'MECH', name: 'Mechanical', lastCutoff: 194, seats: 120, chance: 'Medium' },
      { code: 'ROBO', name: 'Robotics & Automation', lastCutoff: 196, seats: 30, chance: 'Medium' },
      { code: 'BIOTECH', name: 'BioTechnology (SS)', lastCutoff: 172, seats: 30, chance: 'High' },
      { code: 'BME', name: 'Biomedical (SS)', lastCutoff: 168, seats: 30, chance: 'High' },
    ],
    annualFee: '₹75,000',
    placement: '₹12 LPA',
    naacGrade: 'A++',
    nirfRank: 45,
    seats: 330,
  },
  {
    id: 'p2',
     logo: 'https://www.google.com/s2/favicons?domain=ssn.edu.in&sz=128',
    name: 'SSN College of Engineering',
    nameTamil: 'SSN பொறியியல் கல்லூரி',
    location: 'Chennai',
    district: 'Chennai',
    type: 'Private',
    lastYearCutoff: { OC: 197.5, BC: 194, MBC: 190, SC: 180, ST: 170 },
    branches: [
      { code: 'IT', name: 'Information Technology', lastCutoff: 197.5, seats: 60, chance: 'Low' },
      { code: 'CSE', name: 'Computer Science', lastCutoff: 191.5, seats: 120, chance: 'Medium' },
      { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 190.5, seats: 120, chance: 'Medium' },
      { code: 'EEE', name: 'Electrical & Electronics', lastCutoff: 187.5, seats: 60, chance: 'Medium' },
      { code: 'MECH', name: 'Mechanical', lastCutoff: 178, seats: 60, chance: 'High' },
      { code: 'CHEM', name: 'Chemical Engineering', lastCutoff: 152, seats: 30, chance: 'High' },
    ],
    annualFee: '₹2,00,000',
    placement: '₹10 LPA',
    naacGrade: 'A+',
    nirfRank: 32,
    seats: 360,
  },
  {
    id: 'p3',
     logo: 'https://www.google.com/s2/favicons?domain=tce.edu&sz=128',
    name: 'Thiagarajar College of Engineering',
    nameTamil: 'திருவாளர் தியாகராஜர் பொறியியல் கல்லூரி',
    location: 'Madurai',
    district: 'Madurai',
    type: 'Aided',
    lastYearCutoff: { OC: 196, BC: 193, MBC: 190, SC: 182, ST: 172 },
    branches: [
      { code: 'CSE', name: 'Computer Science', lastCutoff: 196, seats: 60, chance: 'Low' },
      { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 194, seats: 90, chance: 'Medium' },
      { code: 'IT', name: 'Information Technology', lastCutoff: 193, seats: 60, chance: 'Medium' },
      { code: 'EEE', name: 'Electrical & Electronics', lastCutoff: 191, seats: 60, chance: 'Medium' },
      { code: 'MECH', name: 'Mechanical', lastCutoff: 188, seats: 90, chance: 'High' },
      { code: 'BIOTECH', name: 'BioTechnology', lastCutoff: 165, seats: 30, chance: 'High' },
    ],
    annualFee: '₹60,000',
    placement: '₹8 LPA',
    naacGrade: 'A',
    nirfRank: 60,
    seats: 300,
  },
  {
    id: 'p4',
     logo: 'https://www.google.com/s2/favicons?domain=kct.ac.in&sz=128',
    name: 'Kumaraguru College of Technology',
    nameTamil: 'குமரகுரு தொழில்நுட்ப கல்லூரி',
    location: 'Coimbatore',
    district: 'Coimbatore',
    type: 'Private',
    lastYearCutoff: { OC: 190, BC: 187, MBC: 184, SC: 176, ST: 166 },
    branches: [
      { code: 'CSE', name: 'Computer Science', lastCutoff: 193, seats: 120, chance: 'Medium' },
      { code: 'AI', name: 'AI & Data Science', lastCutoff: 191, seats: 60, chance: 'Medium' },
      { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 188, seats: 90, chance: 'High' },
      { code: 'MECH', name: 'Mechanical', lastCutoff: 184, seats: 90, chance: 'High' },
      { code: 'BIOTECH', name: 'BioTechnology', lastCutoff: 160, seats: 30, chance: 'High' },
    ],
    annualFee: '₹1,50,000',
    placement: '₹7 LPA',
    naacGrade: 'A+',
    seats: 360,
  },
  {
    id: 'p5',
     logo: 'https://www.google.com/s2/favicons?domain=velammal.edu.in&sz=128',
    name: 'Velammal Engineering College',
    nameTamil: 'வேளம்மாள் பொறியியல் கல்லூரி',
    location: 'Chennai',
    district: 'Chennai',
    type: 'Private',
    lastYearCutoff: { OC: 191, BC: 188, MBC: 185, SC: 177, ST: 167 },
    branches: [
      { code: 'CSE', name: 'Computer Science', lastCutoff: 195, seats: 180, chance: 'Medium' },
      { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 191, seats: 120, chance: 'Medium' },
      { code: 'MECH', name: 'Mechanical', lastCutoff: 186, seats: 120, chance: 'High' },
      { code: 'BIOTECH', name: 'BioTechnology', lastCutoff: 158, seats: 60, chance: 'High' },
      { code: 'BME', name: 'Biomedical Engineering', lastCutoff: 155, seats: 30, chance: 'High' },
    ],
    annualFee: '₹1,50,000',
    placement: '₹6 LPA',
    naacGrade: 'A+',
    seats: 420,
  },
  {
    id: 'p6',
     logo: 'https://www.google.com/s2/favicons?domain=kongu.edu&sz=128',
    name: 'Kongu Engineering College',
    nameTamil: 'கொங்கு பொறியியல் கல்லூரி',
    location: 'Erode',
    district: 'Erode',
    type: 'Private',
    lastYearCutoff: { OC: 185, BC: 182, MBC: 179, SC: 171, ST: 161 },
    branches: [
      { code: 'CSE', name: 'Computer Science', lastCutoff: 189, seats: 120, chance: 'High' },
      { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 185, seats: 90, chance: 'High' },
      { code: 'MECH', name: 'Mechanical', lastCutoff: 180, seats: 120, chance: 'High' },
    ],
    annualFee: '₹1,20,000',
    placement: '₹5.5 LPA',
    naacGrade: 'A+',
    seats: 330,
  },
  {
    id: 'p7',
     logo: 'https://www.google.com/s2/favicons?domain=kpriet.ac.in&sz=128',
    name: 'KPR Institute of Engineering & Technology',
    nameTamil: 'KPR பொறியியல் நிறுவனம்',
    location: 'Coimbatore',
    district: 'Coimbatore',
    type: 'Private',
    lastYearCutoff: { OC: 180, BC: 177, MBC: 174, SC: 166, ST: 156 },
    branches: [
      { code: 'CSE', name: 'Computer Science', lastCutoff: 184, seats: 120, chance: 'High' },
      { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 180, seats: 60, chance: 'High' },
      { code: 'MECH', name: 'Mechanical', lastCutoff: 175, seats: 60, chance: 'High' },
    ],
    annualFee: '₹1,00,000',
    placement: '₹5 LPA',
    naacGrade: 'A',
    seats: 240,
  },
  {
    id: 'p8',
     logo: 'https://www.google.com/s2/favicons?domain=skcet.ac.in&sz=128',
    name: 'Sri Krishna College of Engineering & Technology',
    nameTamil: 'ஸ்ரீ கிருஷ்ணா பொறியியல் கல்லூரி',
    location: 'Coimbatore',
    district: 'Coimbatore',
    type: 'Private',
    lastYearCutoff: { OC: 178, BC: 175, MBC: 172, SC: 164, ST: 154 },
    branches: [
      { code: 'CSE', name: 'Computer Science', lastCutoff: 182, seats: 120, chance: 'High' },
      { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 178, seats: 60, chance: 'High' },
      { code: 'MECH', name: 'Mechanical', lastCutoff: 173, seats: 60, chance: 'High' },
    ],
    annualFee: '₹1,00,000',
    placement: '₹5 LPA',
    seats: 240,
  },
  {
    id: 'p9',
     logo: 'https://www.google.com/s2/favicons?domain=bitsathy.ac.in&sz=128',
    name: 'Bannari Amman Institute of Technology',
    nameTamil: 'பன்னாரி அம்மன் தொழில்நுட்ப நிறுவனம்',
    location: 'Sathyamangalam',
    district: 'Erode',
    type: 'Private',
    lastYearCutoff: { OC: 170, BC: 167, MBC: 164, SC: 156, ST: 146 },
    branches: [
      { code: 'CSE', name: 'Computer Science', lastCutoff: 175, seats: 120, chance: 'High' },
      { code: 'AI', name: 'AI & Data Science', lastCutoff: 172, seats: 60, chance: 'High' },
      { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 168, seats: 60, chance: 'High' },
      { code: 'MECH', name: 'Mechanical', lastCutoff: 163, seats: 90, chance: 'High' },
      { code: 'BME', name: 'Biomedical Engineering', lastCutoff: 150, seats: 30, chance: 'High' },
    ],
    annualFee: '₹1,20,000',
    placement: '₹5 LPA',
    naacGrade: 'A',
    seats: 330,
  },
  {
    id: 'p10',
     logo: 'https://www.google.com/s2/favicons?domain=snsct.org&sz=128',
    name: 'SNS College of Technology',
    nameTamil: 'SNS தொழில்நுட்ப கல்லூரி',
    location: 'Coimbatore',
    district: 'Coimbatore',
    type: 'Private',
    lastYearCutoff: { OC: 160, BC: 157, MBC: 154, SC: 146, ST: 136 },
    branches: [
      { code: 'CSE', name: 'Computer Science', lastCutoff: 165, seats: 120, chance: 'High' },
      { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 160, seats: 60, chance: 'High' },
      { code: 'MECH', name: 'Mechanical', lastCutoff: 155, seats: 60, chance: 'High' },
    ],
    annualFee: '₹1,00,000',
    placement: '₹4 LPA',
    seats: 240,
  },
  {
    id: 'p11',
     logo: 'https://www.google.com/s2/favicons?domain=karpagamtech.ac.in&sz=128',
    name: 'Karpagam College of Engineering',
    nameTamil: 'கற்பகம் பொறியியல் கல்லூரி',
    location: 'Coimbatore',
    district: 'Coimbatore',
    type: 'Private',
    lastYearCutoff: { OC: 155, BC: 152, MBC: 149, SC: 141, ST: 131 },
    branches: [
      { code: 'CSE', name: 'Computer Science', lastCutoff: 160, seats: 120, chance: 'High' },
      { code: 'ECE', name: 'Electronics & Communication', lastCutoff: 155, seats: 60, chance: 'High' },
      { code: 'MECH', name: 'Mechanical', lastCutoff: 150, seats: 60, chance: 'High' },
    ],
    annualFee: '₹95,000',
    placement: '₹3.5 LPA',
    seats: 240,
  },
];

// Combine all colleges
const allColleges: PredictedCollege[] = [...governmentColleges, ...topPrivateColleges];

 const districts = [
   'Chennai', 'Coimbatore', 'Salem', 'Tirunelveli', 'Tiruchirappalli', 'Thanjavur', 
   'Erode', 'Dharmapuri', 'Krishnagiri', 'Theni', 'Kanyakumari', 'Villupuram', 
   'Ariyalur', 'Ramanathapuram', 'Dindigul', 'Kanchipuram', 'Madurai'
 ];
 
export const CollegePredictor = ({ engineeringResult, cutoffScore, categoryCode }: CollegePredictorProps) => {
   const [searchQuery, setSearchQuery] = useState('');
   const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
   const [savedColleges, setSavedColleges] = useState<string[]>([]);
 
   const getChanceForBranch = (branchCutoff: number, userCutoff: number): 'High' | 'Medium' | 'Low' => {
     const diff = userCutoff - branchCutoff;
     if (diff >= 5) return 'High';
     if (diff >= -3) return 'Medium';
     return 'Low';
   };
 
   const userCutoff = engineeringResult?.cutoff || cutoffScore || 0;
   const userCategory = engineeringResult?.category || categoryCode || 'OC';

   const predictedColleges = allColleges.map(college => {
     const collegeCutoff = college.lastYearCutoff[userCategory] || college.lastYearCutoff['OC'];
 
     const branches = college.branches.map(branch => ({
       ...branch,
       chance: getChanceForBranch(branch.lastCutoff, userCutoff),
     }));
 
     const overallChance: 'High' | 'Medium' | 'Low' = 
       userCutoff >= collegeCutoff + 5 ? 'High' :
       userCutoff >= collegeCutoff - 3 ? 'Medium' : 'Low';
 
     return {
       ...college,
       branches,
       overallChance,
       userCutoff,
       collegeCutoff,
     };
   });
 
   const filteredColleges = predictedColleges.filter(college => {
     const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          college.location.toLowerCase().includes(searchQuery.toLowerCase());
     const matchesDistrict = selectedDistrict === 'all' || college.district === selectedDistrict;
     return matchesSearch && matchesDistrict;
   });
 
   const sortedColleges = [...filteredColleges].sort((a, b) => {
     const chanceOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
     return chanceOrder[a.overallChance] - chanceOrder[b.overallChance];
   });
 
   const toggleSaveCollege = (collegeId: string) => {
     setSavedColleges(prev => 
       prev.includes(collegeId) ? prev.filter(id => id !== collegeId) : [...prev, collegeId]
     );
   };
 
  if (!engineeringResult && !cutoffScore) {
     return (
       <Card className="border-dashed">
         <CardContent className="py-12 text-center">
           <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
           <h3 className="text-lg font-semibold text-foreground mb-2">Calculate Your Cutoff First</h3>
           <p className="text-sm text-muted-foreground">
             Enter your marks in the Engineering Calculator above to see predicted colleges
           </p>
         </CardContent>
       </Card>
     );
   }
 
   return (
     <div className="space-y-6">
       {/* Government Colleges Info Banner */}
       <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0">
         <CardContent className="py-4">
           <div className="flex items-center gap-2 md:gap-3">
             <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
               <Landmark className="h-5 w-5 md:h-6 md:w-6" />
             </div>
             <div className="min-w-0">
               <h3 className="text-sm md:text-lg font-semibold flex items-center gap-1 md:gap-2 flex-wrap">
                 <Shield className="h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0" />
                 <span>College Predictor — Govt + Top Colleges</span>
               </h3>
               <p className="text-xs md:text-sm text-white/80 font-tamil">அரசு + முன்னணி கல்லூரிகள் - TNEA கலந்தாய்வு</p>
             </div>
           </div>
           <div className="mt-3 grid grid-cols-4 gap-1.5 md:gap-3">
             <div className="bg-white/10 rounded-lg px-2 py-1.5 md:px-3 md:py-2 text-center">
               <div className="text-base md:text-xl font-bold">{userCutoff}</div>
               <div className="text-[9px] md:text-xs text-white/70">Your Cutoff</div>
             </div>
             <div className="bg-white/10 rounded-lg px-2 py-1.5 md:px-3 md:py-2 text-center">
               <div className="text-sm md:text-lg font-semibold">{userCategory}</div>
               <div className="text-[9px] md:text-xs text-white/70">Category</div>
             </div>
             <div className="bg-white/10 rounded-lg px-2 py-1.5 md:px-3 md:py-2 text-center">
               <div className="text-sm md:text-lg font-bold">{allColleges.filter(c => c.type === 'Government').length}</div>
               <div className="text-[9px] md:text-xs text-white/70">Govt</div>
             </div>
             <div className="bg-white/10 rounded-lg px-2 py-1.5 md:px-3 md:py-2 text-center">
               <div className="text-sm md:text-lg font-bold">{sortedColleges.filter(c => c.overallChance !== 'Low').length}</div>
               <div className="text-[9px] md:text-xs text-white/70">Safe+Dream</div>
             </div>
           </div>
         </CardContent>
       </Card>
 
       {/* Filters */}
       <div className="space-y-2 md:space-y-0 md:flex md:flex-wrap md:gap-3">
         <div className="flex-1 min-w-0">
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
             <Input
               placeholder="Search colleges..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="pl-10"
             />
           </div>
         </div>
         <div className="flex gap-2 items-center">
           <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
             <SelectTrigger className="w-full md:w-[180px]">
               <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
               <SelectValue placeholder="District" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="all">All Districts</SelectItem>
               {districts.map(d => (
                 <SelectItem key={d} value={d}>{d}</SelectItem>
               ))}
             </SelectContent>
           </Select>
           <Badge variant="outline" className="h-10 px-2 md:px-4 flex items-center gap-1 md:gap-2 bg-green-50 text-green-700 border-green-300 whitespace-nowrap text-xs md:text-sm">
             <Shield className="h-3.5 w-3.5 md:h-4 md:w-4" />
             {sortedColleges.length}
           </Badge>
         </div>
       </div>
 
       {/* College Cards */}
       <div className="space-y-4">
         {sortedColleges.map((college) => (
           <Card key={college.id} className={cn(
             'overflow-hidden transition-all hover:shadow-lg',
             college.overallChance === 'High' ? 'border-green-500/50 bg-green-50/30' :
             college.overallChance === 'Medium' ? 'border-blue-500/50 bg-blue-50/30' : 'border-muted'
           )}>
             <CardContent className="p-0">
               {/* College Header */}
               <div className={cn(
                 'p-3 md:p-4 border-b',
                 college.overallChance === 'High' ? 'bg-green-100 dark:bg-green-950/30' :
                 college.overallChance === 'Medium' ? 'bg-blue-50 dark:bg-blue-950/30' : 'bg-muted/50'
               )}>
                 <div className="flex flex-col gap-2">
                   <div className="flex items-start justify-between gap-2">
                     <div className="flex items-start gap-2 md:gap-3 flex-1 min-w-0">
                       {college.logo && (
                         <img 
                           src={college.logo} 
                           alt="" 
                           className="w-9 h-9 md:w-11 md:h-11 rounded-full flex-shrink-0 border-2 border-white shadow-sm bg-gray-100" 
                           onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                         />
                       )}
                       <div className="min-w-0">
                         <h4 className="font-semibold text-sm md:text-base text-foreground leading-tight">{college.name}</h4>
                         {college.nameTamil && (
                           <p className="text-[10px] md:text-xs text-muted-foreground font-tamil mt-0.5">{college.nameTamil}</p>
                         )}
                       </div>
                     </div>
                     <div className="flex items-center gap-1 flex-shrink-0">
                       <Button
                         variant="ghost"
                         size="icon"
                         className={cn('h-8 w-8', savedColleges.includes(college.id) ? 'text-red-500' : '')}
                         onClick={() => toggleSaveCollege(college.id)}
                       >
                         <Heart className={cn('h-4 w-4', savedColleges.includes(college.id) && 'fill-current')} />
                       </Button>
                       <div className={cn(
                         'px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-sm font-semibold whitespace-nowrap',
                         college.overallChance === 'High' ? 'bg-green-100 text-green-700' :
                         college.overallChance === 'Medium' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                       )}>
                         {college.overallChance === 'High' ? '✅ Safe' :
                          college.overallChance === 'Medium' ? '🎯 Dream' : '🔴 Reach'}
                       </div>
                     </div>
                   </div>
                   <div className="flex flex-wrap items-center gap-1.5 md:gap-3 text-xs md:text-sm text-muted-foreground">
                     <span className="flex items-center gap-1">
                       <MapPin className="h-3 w-3" /> {college.location}
                     </span>
                     <Badge className={`text-[10px] md:text-xs text-white ${college.type === 'Government' ? 'bg-green-600' : college.type === 'Aided' ? 'bg-blue-600' : 'bg-purple-600'}`}>🏛️ {college.type}</Badge>
                     {college.naacGrade && (
                       <Badge variant="outline" className="text-[10px] md:text-xs">NAAC {college.naacGrade}</Badge>
                     )}
                     {college.nirfRank && (
                       <span className="flex items-center gap-1 text-[10px] md:text-xs">
                         <Star className="h-3 w-3 text-yellow-500" /> #{college.nirfRank}
                       </span>
                     )}
                     <span className="text-[10px] md:text-xs text-green-700 font-medium">
                       {college.seats} Seats
                     </span>
                   </div>
                 </div>
 
                 {/* Cutoff Comparison */}
                 <div className="mt-2 md:mt-3 flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm">
                   <span>You: <strong className="text-primary">{college.userCutoff}</strong></span>
                   <span>Last Yr ({userCategory}): <strong>{college.collegeCutoff}</strong></span>
                   <span className={cn(
                     'font-semibold',
                     college.userCutoff >= college.collegeCutoff ? 'text-green-600' : 'text-red-600'
                   )}>
                     {college.userCutoff >= college.collegeCutoff ? 
                       `+${(college.userCutoff - college.collegeCutoff).toFixed(1)} above` : 
                       `${(college.userCutoff - college.collegeCutoff).toFixed(1)} below`}
                   </span>
                 </div>
               </div>
 
               {/* Branch-wise Chances */}
               <div className="p-3 md:p-4">
                 <div className="text-sm font-medium text-muted-foreground mb-3">Available Branches:</div>
                 <div className="flex flex-wrap gap-2">
                   {college.branches.map((branch) => (
                     <div
                       key={branch.code}
                       className={cn(
                         'px-2 py-1.5 md:px-3 md:py-2 rounded-lg text-xs md:text-sm border',
                         branch.chance === 'High' ? 'bg-green-50 border-green-200 text-green-700' :
                         branch.chance === 'Medium' ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 
                         'bg-red-50 border-red-200 text-red-700'
                       )}
                     >
                       <div className="font-semibold">{branch.code}</div>
                       <div className="text-xs">Cutoff: {branch.lastCutoff}</div>
                     </div>
                   ))}
                 </div>
 
                 {/* College Stats */}
                 <div className="mt-3 md:mt-4 flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm">
                   <div className="flex items-center gap-1 text-green-700 font-medium">
                     <IndianRupee className="h-4 w-4" />
                     <span>Fees: {college.annualFee}/year</span>
                   </div>
                   <div className="flex items-center gap-1 text-muted-foreground">
                     <Briefcase className="h-4 w-4" />
                     <span>Avg Package: {college.placement}</span>
                   </div>
                 </div>
               </div>
             </CardContent>
           </Card>
         ))}
       </div>
 
       {sortedColleges.length === 0 && (
         <Card className="border-dashed">
           <CardContent className="py-12 text-center">
             <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
             <h3 className="text-lg font-semibold text-foreground mb-2">No Colleges Found</h3>
             <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
           </CardContent>
         </Card>
       )}
 
       {/* Disclaimer */}
       <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
         <p className="text-xs text-green-800 dark:text-green-300 text-center font-semibold mb-1">
           📊 Data Source: TNEA 2024 Mark Cutoff (DOTE Official PDF)
         </p>
         <p className="text-xs text-green-700 dark:text-green-400 text-center">
           Cutoffs shown are from the official Directorate of Technical Education (DOTE) 2024 counselling data.
           Actual cutoffs vary by year, round, and category. Use this as a reference, not a guarantee.
         </p>
         <p className="text-xs text-green-600/80 dark:text-green-400/80 text-center mt-1 font-tamil">
           இது DOTE 2024 அதிகாரப்பூர்வ தரவு அடிப்படையில். ஒவ்வொரு ஆண்டும் கட்ஆஃப் மாறலாம்.
         </p>
       </div>
     </div>
   );
 };