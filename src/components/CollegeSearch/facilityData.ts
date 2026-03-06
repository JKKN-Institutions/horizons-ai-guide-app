import { College, CollegeCategory } from './types';

export interface Facility {
  id: string;
  label: string;
  icon: string;
  color: string;    // text color
  bg: string;       // background
  available: boolean;
}

// Smart facility generator based on college type + category
export const getCollegeFacilities = (college: College): Facility[] => {
  const t = college.type;    // government, government-aided, private, autonomous
  const c = college.category as CollegeCategory;
  const isGovt = t === 'government' || t === 'government-aided';
  const isPrivate = t === 'private';
  const isAutonom = t === 'autonomous';
  const isEng = c === 'engineering';
  const isMed = c === 'medical' || c === 'dental' || c === 'nursing' || c === 'allied_health' || c === 'pharmacy';
  const isArts = c === 'arts_science';
  const isPoly = c === 'polytechnic';
  const isLaw = c === 'law';
  const isEdu = c === 'education';
  const isHotel = c === 'hotel_management';
  const isAgri = c === 'agricultural';

  return [
    {
      id: 'hostel_boys',
      label: 'Boys Hostel',
      icon: '🏠',
      color: 'text-blue-700',
      bg: 'bg-blue-50 border-blue-200',
      available: !isPoly,
    },
    {
      id: 'hostel_girls',
      label: 'Girls Hostel',
      icon: '🏡',
      color: 'text-pink-700',
      bg: 'bg-pink-50 border-pink-200',
      available: !isPoly,
    },
    {
      id: 'transport',
      label: 'College Bus',
      icon: '🚌',
      color: 'text-amber-700',
      bg: 'bg-amber-50 border-amber-200',
      available: true,
    },
    {
      id: 'library',
      label: 'Library',
      icon: '📚',
      color: 'text-emerald-700',
      bg: 'bg-emerald-50 border-emerald-200',
      available: true,
    },
    {
      id: 'labs',
      label: isEng ? 'Tech Labs' : isMed ? 'Medical Labs' : isHotel ? 'Kitchen Lab' : 'Science Labs',
      icon: '🔬',
      color: 'text-violet-700',
      bg: 'bg-violet-50 border-violet-200',
      available: isEng || isMed || isArts || isAgri || isHotel,
    },
    {
      id: 'sports',
      label: 'Sports Ground',
      icon: '🏟️',
      color: 'text-green-700',
      bg: 'bg-green-50 border-green-200',
      available: true,
    },
    {
      id: 'culturals',
      label: 'Cultural Events',
      icon: '🎭',
      color: 'text-orange-700',
      bg: 'bg-orange-50 border-orange-200',
      available: !isPoly,
    },
    {
      id: 'hackathons',
      label: 'Hackathons/Tech Fests',
      icon: '💻',
      color: 'text-cyan-700',
      bg: 'bg-cyan-50 border-cyan-200',
      available: isEng || (isArts && (isPrivate || isAutonom)),
    },
    {
      id: 'nss_ncc',
      label: 'NSS / NCC',
      icon: '🏅',
      color: 'text-red-700',
      bg: 'bg-red-50 border-red-200',
      available: isGovt || t === 'autonomous',
    },
    {
      id: 'wifi',
      label: 'WiFi Campus',
      icon: '📶',
      color: 'text-indigo-700',
      bg: 'bg-indigo-50 border-indigo-200',
      available: isPrivate || isAutonom,
    },
    {
      id: 'ac_class',
      label: 'AC Classrooms',
      icon: '❄️',
      color: 'text-sky-700',
      bg: 'bg-sky-50 border-sky-200',
      available: isPrivate,
    },
    {
      id: 'canteen',
      label: 'Canteen',
      icon: '🍽️',
      color: 'text-yellow-700',
      bg: 'bg-yellow-50 border-yellow-200',
      available: true,
    },
    {
      id: 'gym',
      label: 'Gym / Fitness',
      icon: '🏋️',
      color: 'text-rose-700',
      bg: 'bg-rose-50 border-rose-200',
      available: isPrivate || isAutonom,
    },
    {
      id: 'placement',
      label: 'Placement Cell',
      icon: '💼',
      color: 'text-teal-700',
      bg: 'bg-teal-50 border-teal-200',
      available: isEng || isMed || isHotel || isLaw || (isArts && (isPrivate || isAutonom)),
    },
    {
      id: 'scholarship',
      label: 'Scholarships',
      icon: '🎓',
      color: 'text-purple-700',
      bg: 'bg-purple-50 border-purple-200',
      available: isGovt,
    },
    {
      id: 'antiragging',
      label: 'Anti-Ragging Cell',
      icon: '🛡️',
      color: 'text-gray-700',
      bg: 'bg-gray-50 border-gray-200',
      available: true,
    },
    {
      id: 'hospital',
      label: 'Hospital Attached',
      icon: '🏥',
      color: 'text-red-700',
      bg: 'bg-red-50 border-red-200',
      available: isMed,
    },
    {
      id: 'farm',
      label: 'Research Farm',
      icon: '🌾',
      color: 'text-lime-700',
      bg: 'bg-lime-50 border-lime-200',
      available: isAgri,
    },
  ];
};
