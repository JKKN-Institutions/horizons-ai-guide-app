import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
  Play, BookOpen, ChevronDown, Target, Filter, X, Check, Sparkles
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { CategoryType } from './types';
import { categoryInfo } from './governmentExamsData';

// Syllabus structure for each category
export interface Topic {
  id: string;
  name: string;
  nameTamil: string;
  subtopics?: { name: string; nameTamil: string }[];
  questionCount?: number;
  importance?: 'high' | 'medium' | 'low';
}

export interface Subject {
  id: string;
  name: string;
  nameTamil: string;
  topics: Topic[];
  totalQuestions?: number;
}

export interface CategorySyllabus {
  category: CategoryType;
  subjects: Subject[];
  totalQuestions?: number;
}

// Comprehensive syllabus data with subtopics and question counts
export const govtExamSyllabus: CategorySyllabus[] = [
  {
    category: 'defence',
    totalQuestions: 100,
    subjects: [
      {
        id: 'gk',
        name: 'General Knowledge',
        nameTamil: 'பொது அறிவு',
        totalQuestions: 25,
        topics: [
          { 
            id: 'current-affairs', 
            name: 'Current Affairs', 
            nameTamil: 'நடப்பு நிகழ்வுகள்',
            questionCount: 8,
            importance: 'high',
            subtopics: [
              { name: 'National News', nameTamil: 'தேசிய செய்திகள்' },
              { name: 'International Events', nameTamil: 'சர்வதேச நிகழ்வுகள்' },
              { name: 'Sports & Awards', nameTamil: 'விளையாட்டு & விருதுகள்' },
              { name: 'Government Schemes', nameTamil: 'அரசு திட்டங்கள்' },
            ]
          },
          { 
            id: 'indian-history', 
            name: 'Indian History', 
            nameTamil: 'இந்திய வரலாறு',
            questionCount: 6,
            importance: 'high',
            subtopics: [
              { name: 'Ancient India', nameTamil: 'பண்டைய இந்தியா' },
              { name: 'Medieval India', nameTamil: 'இடைக்கால இந்தியா' },
              { name: 'Modern India', nameTamil: 'நவீன இந்தியா' },
              { name: 'Freedom Struggle', nameTamil: 'சுதந்திர போராட்டம்' },
              { name: 'Post-Independence', nameTamil: 'சுதந்திரத்திற்குப் பின்' },
            ]
          },
          { 
            id: 'geography', 
            name: 'Geography', 
            nameTamil: 'புவியியல்',
            questionCount: 4,
            importance: 'medium',
            subtopics: [
              { name: 'Physical Geography', nameTamil: 'இயற்கை புவியியல்' },
              { name: 'Indian Geography', nameTamil: 'இந்திய புவியியல்' },
              { name: 'World Geography', nameTamil: 'உலக புவியியல்' },
              { name: 'Climate & Weather', nameTamil: 'காலநிலை & வானிலை' },
            ]
          },
          { 
            id: 'indian-polity', 
            name: 'Indian Polity', 
            nameTamil: 'இந்திய அரசியல்',
            questionCount: 4,
            importance: 'medium',
            subtopics: [
              { name: 'Constitution', nameTamil: 'அரசியலமைப்பு' },
              { name: 'Parliament', nameTamil: 'நாடாளுமன்றம்' },
              { name: 'Judiciary', nameTamil: 'நீதித்துறை' },
              { name: 'Fundamental Rights', nameTamil: 'அடிப்படை உரிமைகள்' },
            ]
          },
          { 
            id: 'defence-forces', 
            name: 'Defence Forces', 
            nameTamil: 'பாதுகாப்புப் படைகள்',
            questionCount: 3,
            importance: 'high',
            subtopics: [
              { name: 'Indian Army', nameTamil: 'இந்திய ராணுவம்' },
              { name: 'Indian Navy', nameTamil: 'இந்திய கடற்படை' },
              { name: 'Indian Air Force', nameTamil: 'இந்திய விமானப்படை' },
              { name: 'Defence Equipment', nameTamil: 'பாதுகாப்பு உபகரணங்கள்' },
              { name: 'Wars & Operations', nameTamil: 'போர்கள் & நடவடிக்கைகள்' },
            ]
          },
        ],
      },
      {
        id: 'math',
        name: 'Mathematics',
        nameTamil: 'கணிதம்',
        totalQuestions: 30,
        topics: [
          { 
            id: 'arithmetic', 
            name: 'Arithmetic', 
            nameTamil: 'எண்கணிதம்',
            questionCount: 10,
            importance: 'high',
            subtopics: [
              { name: 'Number System', nameTamil: 'எண் முறை' },
              { name: 'HCF & LCM', nameTamil: 'மீப்பெரு பொது வகுத்தி & மீச்சிறு பொது மடங்கு' },
              { name: 'Percentage', nameTamil: 'சதவீதம்' },
              { name: 'Profit & Loss', nameTamil: 'லாபம் & நஷ்டம்' },
              { name: 'Simple & Compound Interest', nameTamil: 'தனி & கூட்டு வட்டி' },
              { name: 'Ratio & Proportion', nameTamil: 'விகிதம் & விகிதாசாரம்' },
              { name: 'Average', nameTamil: 'சராசரி' },
            ]
          },
          { 
            id: 'algebra', 
            name: 'Algebra', 
            nameTamil: 'இயற்கணிதம்',
            questionCount: 8,
            importance: 'medium',
            subtopics: [
              { name: 'Linear Equations', nameTamil: 'நேரிய சமன்பாடுகள்' },
              { name: 'Quadratic Equations', nameTamil: 'இருபடி சமன்பாடுகள்' },
              { name: 'Polynomials', nameTamil: 'பல்லுறுப்புக்கோவைகள்' },
              { name: 'Factorization', nameTamil: 'காரணிப்படுத்தல்' },
            ]
          },
          { 
            id: 'geometry', 
            name: 'Geometry', 
            nameTamil: 'வடிவியல்',
            questionCount: 7,
            importance: 'medium',
            subtopics: [
              { name: 'Lines & Angles', nameTamil: 'கோடுகள் & கோணங்கள்' },
              { name: 'Triangles', nameTamil: 'முக்கோணங்கள்' },
              { name: 'Circles', nameTamil: 'வட்டங்கள்' },
              { name: 'Quadrilaterals', nameTamil: 'நாற்கரங்கள்' },
              { name: 'Area & Perimeter', nameTamil: 'பரப்பு & சுற்றளவு' },
            ]
          },
          { 
            id: 'trigonometry', 
            name: 'Trigonometry', 
            nameTamil: 'முக்கோணவியல்',
            questionCount: 5,
            importance: 'medium',
            subtopics: [
              { name: 'Trigonometric Ratios', nameTamil: 'முக்கோணவியல் விகிதங்கள்' },
              { name: 'Heights & Distances', nameTamil: 'உயரங்கள் & தூரங்கள்' },
              { name: 'Identities', nameTamil: 'சர்வசமன்பாடுகள்' },
            ]
          },
        ],
      },
      {
        id: 'reasoning',
        name: 'Reasoning',
        nameTamil: 'தர்க்கம்',
        totalQuestions: 25,
        topics: [
          { 
            id: 'verbal-reasoning', 
            name: 'Verbal Reasoning', 
            nameTamil: 'சொல் தர்க்கம்',
            questionCount: 12,
            importance: 'high',
            subtopics: [
              { name: 'Analogies', nameTamil: 'ஒப்புமைகள்' },
              { name: 'Classification', nameTamil: 'வகைப்படுத்தல்' },
              { name: 'Series Completion', nameTamil: 'தொடர் நிறைவு' },
              { name: 'Coding-Decoding', nameTamil: 'குறியாக்கம்-குறிவிலக்கம்' },
              { name: 'Blood Relations', nameTamil: 'இரத்த உறவுகள்' },
              { name: 'Direction Sense', nameTamil: 'திசை உணர்வு' },
            ]
          },
          { 
            id: 'non-verbal', 
            name: 'Non-Verbal Reasoning', 
            nameTamil: 'சொல்லாத தர்க்கம்',
            questionCount: 13,
            importance: 'high',
            subtopics: [
              { name: 'Figure Series', nameTamil: 'உரு தொடர்' },
              { name: 'Mirror Images', nameTamil: 'கண்ணாடி படங்கள்' },
              { name: 'Water Images', nameTamil: 'நீர் படங்கள்' },
              { name: 'Paper Folding', nameTamil: 'காகித மடிப்பு' },
              { name: 'Embedded Figures', nameTamil: 'உட்பொதிந்த உருவங்கள்' },
              { name: 'Pattern Completion', nameTamil: 'வடிவ நிறைவு' },
            ]
          },
        ],
      },
      {
        id: 'english',
        name: 'English',
        nameTamil: 'ஆங்கிலம்',
        totalQuestions: 20,
        topics: [
          { 
            id: 'grammar', 
            name: 'Grammar', 
            nameTamil: 'இலக்கணம்',
            questionCount: 10,
            importance: 'high',
            subtopics: [
              { name: 'Tenses', nameTamil: 'காலங்கள்' },
              { name: 'Articles', nameTamil: 'கட்டுரைச் சொற்கள்' },
              { name: 'Prepositions', nameTamil: 'முன்னிடைச் சொற்கள்' },
              { name: 'Voice', nameTamil: 'வினைமுறை' },
              { name: 'Narration', nameTamil: 'கூற்று' },
            ]
          },
          { 
            id: 'vocabulary', 
            name: 'Vocabulary', 
            nameTamil: 'சொற்களஞ்சியம்',
            questionCount: 10,
            importance: 'medium',
            subtopics: [
              { name: 'Synonyms', nameTamil: 'ஒத்த சொற்கள்' },
              { name: 'Antonyms', nameTamil: 'எதிர்ச் சொற்கள்' },
              { name: 'One Word Substitution', nameTamil: 'ஒரு சொல் மாற்று' },
              { name: 'Idioms & Phrases', nameTamil: 'வழக்குகள் & சொற்றொடர்கள்' },
            ]
          },
        ],
      },
    ],
  },
  {
    category: 'railway',
    totalQuestions: 100,
    subjects: [
      {
        id: 'gk',
        name: 'General Awareness',
        nameTamil: 'பொது விழிப்புணர்வு',
        totalQuestions: 25,
        topics: [
          { 
            id: 'current-affairs', 
            name: 'Current Affairs', 
            nameTamil: 'நடப்பு நிகழ்வுகள்',
            questionCount: 7,
            importance: 'high',
            subtopics: [
              { name: 'National Events', nameTamil: 'தேசிய நிகழ்வுகள்' },
              { name: 'International Events', nameTamil: 'சர்வதேச நிகழ்வுகள்' },
              { name: 'Sports Updates', nameTamil: 'விளையாட்டு செய்திகள்' },
              { name: 'Awards & Honours', nameTamil: 'விருதுகள் & கௌரவங்கள்' },
            ]
          },
          { 
            id: 'indian-railways', 
            name: 'Indian Railways', 
            nameTamil: 'இந்திய ரயில்வே',
            questionCount: 6,
            importance: 'high',
            subtopics: [
              { name: 'Railway History', nameTamil: 'ரயில்வே வரலாறு' },
              { name: 'Railway Zones', nameTamil: 'ரயில்வே மண்டலங்கள்' },
              { name: 'Railway Budget', nameTamil: 'ரயில்வே பட்ஜெட்' },
              { name: 'Train Types', nameTamil: 'ரயில் வகைகள்' },
              { name: 'Railway Stations', nameTamil: 'ரயில் நிலையங்கள்' },
              { name: 'New Projects', nameTamil: 'புதிய திட்டங்கள்' },
            ]
          },
          { 
            id: 'indian-history', 
            name: 'Indian History', 
            nameTamil: 'இந்திய வரலாறு',
            questionCount: 5,
            importance: 'medium',
            subtopics: [
              { name: 'Ancient India', nameTamil: 'பண்டைய இந்தியா' },
              { name: 'Medieval India', nameTamil: 'இடைக்கால இந்தியா' },
              { name: 'Freedom Movement', nameTamil: 'சுதந்திர இயக்கம்' },
            ]
          },
          { 
            id: 'geography', 
            name: 'Geography', 
            nameTamil: 'புவியியல்',
            questionCount: 4,
            importance: 'medium',
            subtopics: [
              { name: 'Indian Rivers', nameTamil: 'இந்திய ஆறுகள்' },
              { name: 'Mountains', nameTamil: 'மலைகள்' },
              { name: 'States & Capitals', nameTamil: 'மாநிலங்கள் & தலைநகரங்கள்' },
            ]
          },
          { 
            id: 'science', 
            name: 'General Science', 
            nameTamil: 'பொது அறிவியல்',
            questionCount: 3,
            importance: 'medium',
            subtopics: [
              { name: 'Physics Basics', nameTamil: 'இயற்பியல் அடிப்படைகள்' },
              { name: 'Chemistry Basics', nameTamil: 'வேதியியல் அடிப்படைகள்' },
              { name: 'Biology Basics', nameTamil: 'உயிரியல் அடிப்படைகள்' },
            ]
          },
        ],
      },
      {
        id: 'math',
        name: 'Mathematics',
        nameTamil: 'கணிதம்',
        totalQuestions: 30,
        topics: [
          { 
            id: 'number-system', 
            name: 'Number System', 
            nameTamil: 'எண் முறை',
            questionCount: 6,
            importance: 'high',
            subtopics: [
              { name: 'Divisibility Rules', nameTamil: 'வகுபடும் விதிகள்' },
              { name: 'Fractions & Decimals', nameTamil: 'பின்னங்கள் & தசமங்கள்' },
              { name: 'Simplification', nameTamil: 'எளிமைப்படுத்தல்' },
            ]
          },
          { 
            id: 'percentage', 
            name: 'Percentage', 
            nameTamil: 'சதவீதம்',
            questionCount: 5,
            importance: 'high',
            subtopics: [
              { name: 'Basic Percentage', nameTamil: 'அடிப்படை சதவீதம்' },
              { name: 'Percentage Change', nameTamil: 'சதவீத மாற்றம்' },
              { name: 'Successive Percentage', nameTamil: 'தொடர் சதவீதம்' },
            ]
          },
          { 
            id: 'time-work', 
            name: 'Time & Work', 
            nameTamil: 'நேரம் & வேலை',
            questionCount: 5,
            importance: 'high',
            subtopics: [
              { name: 'Work Efficiency', nameTamil: 'வேலை திறன்' },
              { name: 'Pipes & Cisterns', nameTamil: 'குழாய்கள் & தொட்டிகள்' },
              { name: 'Men-Days Work', nameTamil: 'ஆள்-நாள் வேலை' },
            ]
          },
          { 
            id: 'ratio-proportion', 
            name: 'Ratio & Proportion', 
            nameTamil: 'விகிதம் & விகிதாசாரம்',
            questionCount: 4,
            importance: 'medium',
            subtopics: [
              { name: 'Simple Ratio', nameTamil: 'தனி விகிதம்' },
              { name: 'Compound Ratio', nameTamil: 'கூட்டு விகிதம்' },
              { name: 'Partnership', nameTamil: 'கூட்டாண்மை' },
            ]
          },
          { 
            id: 'speed-time-distance', 
            name: 'Speed, Time & Distance', 
            nameTamil: 'வேகம், நேரம் & தூரம்',
            questionCount: 5,
            importance: 'high',
            subtopics: [
              { name: 'Train Problems', nameTamil: 'ரயில் கணக்குகள்' },
              { name: 'Boats & Streams', nameTamil: 'படகுகள் & நீரோடை' },
              { name: 'Relative Speed', nameTamil: 'ஒப்பீட்டு வேகம்' },
            ]
          },
          { 
            id: 'profit-loss', 
            name: 'Profit & Loss', 
            nameTamil: 'லாபம் & நஷ்டம்',
            questionCount: 5,
            importance: 'high',
            subtopics: [
              { name: 'Basic P&L', nameTamil: 'அடிப்படை லா&ந' },
              { name: 'Discount', nameTamil: 'தள்ளுபடி' },
              { name: 'Marked Price', nameTamil: 'குறிக்கப்பட்ட விலை' },
            ]
          },
        ],
      },
      {
        id: 'reasoning',
        name: 'General Intelligence & Reasoning',
        nameTamil: 'பொது புத்திசாலித்தனம் & தர்க்கம்',
        totalQuestions: 30,
        topics: [
          { 
            id: 'analogies', 
            name: 'Analogies', 
            nameTamil: 'ஒப்புமைகள்',
            questionCount: 5,
            importance: 'high',
            subtopics: [
              { name: 'Word Analogies', nameTamil: 'சொல் ஒப்புமைகள்' },
              { name: 'Number Analogies', nameTamil: 'எண் ஒப்புமைகள்' },
              { name: 'Letter Analogies', nameTamil: 'எழுத்து ஒப்புமைகள்' },
            ]
          },
          { 
            id: 'coding-decoding', 
            name: 'Coding-Decoding', 
            nameTamil: 'குறியாக்கம்-குறிவிலக்கம்',
            questionCount: 5,
            importance: 'high',
            subtopics: [
              { name: 'Letter Coding', nameTamil: 'எழுத்து குறியாக்கம்' },
              { name: 'Number Coding', nameTamil: 'எண் குறியாக்கம்' },
              { name: 'Mixed Coding', nameTamil: 'கலப்பு குறியாக்கம்' },
            ]
          },
          { 
            id: 'series', 
            name: 'Series', 
            nameTamil: 'தொடர்',
            questionCount: 5,
            importance: 'high',
            subtopics: [
              { name: 'Number Series', nameTamil: 'எண் தொடர்' },
              { name: 'Alphabet Series', nameTamil: 'எழுத்து தொடர்' },
              { name: 'Mixed Series', nameTamil: 'கலப்பு தொடர்' },
            ]
          },
          { 
            id: 'classification', 
            name: 'Classification', 
            nameTamil: 'வகைப்படுத்தல்',
            questionCount: 5,
            importance: 'medium',
            subtopics: [
              { name: 'Odd One Out', nameTamil: 'மாறுபட்டது' },
              { name: 'Group Classification', nameTamil: 'குழு வகைப்படுத்தல்' },
            ]
          },
          { 
            id: 'blood-relations', 
            name: 'Blood Relations', 
            nameTamil: 'இரத்த உறவுகள்',
            questionCount: 5,
            importance: 'medium',
            subtopics: [
              { name: 'Family Tree', nameTamil: 'குடும்ப மரம்' },
              { name: 'Coded Relations', nameTamil: 'குறியீட்டு உறவுகள்' },
            ]
          },
          { 
            id: 'direction-test', 
            name: 'Direction Test', 
            nameTamil: 'திசை சோதனை',
            questionCount: 5,
            importance: 'medium',
            subtopics: [
              { name: 'Simple Directions', nameTamil: 'எளிய திசைகள்' },
              { name: 'Shadow Based', nameTamil: 'நிழல் அடிப்படை' },
            ]
          },
        ],
      },
      {
        id: 'english',
        name: 'General English',
        nameTamil: 'பொது ஆங்கிலம்',
        totalQuestions: 15,
        topics: [
          { 
            id: 'grammar', 
            name: 'Grammar', 
            nameTamil: 'இலக்கணம்',
            questionCount: 8,
            importance: 'high',
            subtopics: [
              { name: 'Error Correction', nameTamil: 'பிழை திருத்தம்' },
              { name: 'Fill in the Blanks', nameTamil: 'வெற்றிடம் நிரப்புக' },
              { name: 'Sentence Improvement', nameTamil: 'வாக்கிய மேம்பாடு' },
            ]
          },
          { 
            id: 'vocabulary', 
            name: 'Vocabulary', 
            nameTamil: 'சொற்களஞ்சியம்',
            questionCount: 7,
            importance: 'medium',
            subtopics: [
              { name: 'Synonyms & Antonyms', nameTamil: 'ஒத்த & எதிர் சொற்கள்' },
              { name: 'Idioms', nameTamil: 'வழக்குகள்' },
              { name: 'Spellings', nameTamil: 'எழுத்துப்பிழைகள்' },
            ]
          },
        ],
      },
    ],
  },
  {
    category: 'ssc',
    totalQuestions: 100,
    subjects: [
      {
        id: 'gk',
        name: 'General Awareness',
        nameTamil: 'பொது விழிப்புணர்வு',
        totalQuestions: 25,
        topics: [
          { 
            id: 'current-affairs', 
            name: 'Current Affairs', 
            nameTamil: 'நடப்பு நிகழ்வுகள்',
            questionCount: 6,
            importance: 'high',
            subtopics: [
              { name: 'National News', nameTamil: 'தேசிய செய்திகள்' },
              { name: 'International News', nameTamil: 'சர்வதேச செய்திகள்' },
              { name: 'Economy Updates', nameTamil: 'பொருளாதார செய்திகள்' },
            ]
          },
          { 
            id: 'indian-polity', 
            name: 'Indian Polity', 
            nameTamil: 'இந்திய அரசியல்',
            questionCount: 5,
            importance: 'high',
            subtopics: [
              { name: 'Constitution of India', nameTamil: 'இந்திய அரசியலமைப்பு' },
              { name: 'Amendments', nameTamil: 'திருத்தங்கள்' },
              { name: 'Political System', nameTamil: 'அரசியல் அமைப்பு' },
              { name: 'Panchayati Raj', nameTamil: 'பஞ்சாயத்து ராஜ்' },
            ]
          },
          { 
            id: 'economics', 
            name: 'Economics', 
            nameTamil: 'பொருளாதாரம்',
            questionCount: 5,
            importance: 'high',
            subtopics: [
              { name: 'Indian Economy', nameTamil: 'இந்திய பொருளாதாரம்' },
              { name: 'Banking System', nameTamil: 'வங்கி அமைப்பு' },
              { name: 'Budget & Planning', nameTamil: 'பட்ஜெட் & திட்டமிடல்' },
              { name: 'Taxation', nameTamil: 'வரிவிதிப்பு' },
            ]
          },
          { 
            id: 'science', 
            name: 'General Science', 
            nameTamil: 'பொது அறிவியல்',
            questionCount: 5,
            importance: 'medium',
            subtopics: [
              { name: 'Physics', nameTamil: 'இயற்பியல்' },
              { name: 'Chemistry', nameTamil: 'வேதியியல்' },
              { name: 'Biology', nameTamil: 'உயிரியல்' },
              { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்' },
            ]
          },
          { 
            id: 'static-gk', 
            name: 'Static GK', 
            nameTamil: 'நிலையான பொது அறிவு',
            questionCount: 4,
            importance: 'medium',
            subtopics: [
              { name: 'Books & Authors', nameTamil: 'புத்தகங்கள் & ஆசிரியர்கள்' },
              { name: 'Important Days', nameTamil: 'முக்கிய நாட்கள்' },
              { name: 'Headquarters', nameTamil: 'தலைமையகங்கள்' },
            ]
          },
        ],
      },
      {
        id: 'english',
        name: 'English Language',
        nameTamil: 'ஆங்கில மொழி',
        totalQuestions: 25,
        topics: [
          { 
            id: 'grammar', 
            name: 'Grammar', 
            nameTamil: 'இலக்கணம்',
            questionCount: 10,
            importance: 'high',
            subtopics: [
              { name: 'Spot the Error', nameTamil: 'பிழை கண்டறி' },
              { name: 'Sentence Correction', nameTamil: 'வாக்கிய திருத்தம்' },
              { name: 'Fill in Blanks', nameTamil: 'வெற்றிடம் நிரப்பு' },
              { name: 'Active/Passive Voice', nameTamil: 'செயல்/செயப்படு வாக்கியம்' },
              { name: 'Direct/Indirect Speech', nameTamil: 'நேரடி/மறை கூற்று' },
            ]
          },
          { 
            id: 'vocabulary', 
            name: 'Vocabulary', 
            nameTamil: 'சொற்களஞ்சியம்',
            questionCount: 8,
            importance: 'high',
            subtopics: [
              { name: 'Synonyms', nameTamil: 'ஒத்த சொற்கள்' },
              { name: 'Antonyms', nameTamil: 'எதிர்ச் சொற்கள்' },
              { name: 'Homonyms', nameTamil: 'ஒரே ஒலி சொற்கள்' },
              { name: 'One Word Substitution', nameTamil: 'ஒரு சொல் மாற்று' },
            ]
          },
          { 
            id: 'comprehension', 
            name: 'Comprehension', 
            nameTamil: 'படிப்பறிவு',
            questionCount: 7,
            importance: 'medium',
            subtopics: [
              { name: 'Reading Passages', nameTamil: 'வாசிப்பு பத்திகள்' },
              { name: 'Cloze Test', nameTamil: 'இடைவெளி சோதனை' },
              { name: 'Para Jumbles', nameTamil: 'பத்தி வரிசை' },
            ]
          },
        ],
      },
      {
        id: 'math',
        name: 'Quantitative Aptitude',
        nameTamil: 'அளவு திறன்',
        totalQuestions: 25,
        topics: [
          { 
            id: 'arithmetic', 
            name: 'Arithmetic', 
            nameTamil: 'எண்கணிதம்',
            questionCount: 10,
            importance: 'high',
            subtopics: [
              { name: 'Number System', nameTamil: 'எண் முறை' },
              { name: 'Percentage', nameTamil: 'சதவீதம்' },
              { name: 'Ratio & Proportion', nameTamil: 'விகிதம் & விகிதாசாரம்' },
              { name: 'Average', nameTamil: 'சராசரி' },
              { name: 'Problems on Ages', nameTamil: 'வயது கணக்குகள்' },
            ]
          },
          { 
            id: 'data-interpretation', 
            name: 'Data Interpretation', 
            nameTamil: 'தரவு விளக்கம்',
            questionCount: 8,
            importance: 'high',
            subtopics: [
              { name: 'Tables', nameTamil: 'அட்டவணைகள்' },
              { name: 'Bar Graphs', nameTamil: 'பட்டை வரைபடங்கள்' },
              { name: 'Pie Charts', nameTamil: 'வட்ட வரைபடங்கள்' },
              { name: 'Line Graphs', nameTamil: 'கோட்டு வரைபடங்கள்' },
            ]
          },
          { 
            id: 'algebra', 
            name: 'Algebra & Geometry', 
            nameTamil: 'இயற்கணிதம் & வடிவியல்',
            questionCount: 7,
            importance: 'medium',
            subtopics: [
              { name: 'Basic Algebra', nameTamil: 'அடிப்படை இயற்கணிதம்' },
              { name: 'Mensuration', nameTamil: 'அளவீடு' },
              { name: 'Trigonometry', nameTamil: 'முக்கோணவியல்' },
            ]
          },
        ],
      },
      {
        id: 'reasoning',
        name: 'General Intelligence & Reasoning',
        nameTamil: 'பொது புத்திசாலித்தனம் & தர்க்கம்',
        totalQuestions: 25,
        topics: [
          { 
            id: 'verbal-reasoning', 
            name: 'Verbal Reasoning', 
            nameTamil: 'சொல் தர்க்கம்',
            questionCount: 12,
            importance: 'high',
            subtopics: [
              { name: 'Analogy', nameTamil: 'ஒப்புமை' },
              { name: 'Classification', nameTamil: 'வகைப்படுத்தல்' },
              { name: 'Series', nameTamil: 'தொடர்' },
              { name: 'Coding-Decoding', nameTamil: 'குறியாக்கம்' },
              { name: 'Syllogism', nameTamil: 'தருக்க முடிவு' },
              { name: 'Statement & Conclusion', nameTamil: 'கூற்று & முடிவு' },
            ]
          },
          { 
            id: 'non-verbal', 
            name: 'Non-Verbal Reasoning', 
            nameTamil: 'சொல்லாத தர்க்கம்',
            questionCount: 13,
            importance: 'high',
            subtopics: [
              { name: 'Figure Series', nameTamil: 'உரு தொடர்' },
              { name: 'Pattern Completion', nameTamil: 'வடிவ நிறைவு' },
              { name: 'Mirror/Water Images', nameTamil: 'கண்ணாடி/நீர் படங்கள்' },
              { name: 'Paper Cutting & Folding', nameTamil: 'காகித வெட்டுதல் & மடிப்பு' },
              { name: 'Cubes & Dice', nameTamil: 'சதுரங்கள் & பகடை' },
            ]
          },
        ],
      },
    ],
  },
  {
    category: 'banking',
    totalQuestions: 100,
    subjects: [
      {
        id: 'gk',
        name: 'General/Banking Awareness',
        nameTamil: 'பொது/வங்கி விழிப்புணர்வு',
        totalQuestions: 40,
        topics: [
          { 
            id: 'banking-terms', 
            name: 'Banking Terminology', 
            nameTamil: 'வங்கி சொற்கள்',
            questionCount: 10,
            importance: 'high',
            subtopics: [
              { name: 'Types of Accounts', nameTamil: 'கணக்கு வகைகள்' },
              { name: 'Loans & Credit', nameTamil: 'கடன்கள்' },
              { name: 'Banking Services', nameTamil: 'வங்கி சேவைகள்' },
              { name: 'Digital Banking', nameTamil: 'டிஜிட்டல் வங்கி' },
            ]
          },
          { 
            id: 'rbi', 
            name: 'RBI & Monetary Policy', 
            nameTamil: 'RBI & நாணயக் கொள்கை',
            questionCount: 10,
            importance: 'high',
            subtopics: [
              { name: 'RBI Functions', nameTamil: 'RBI செயல்பாடுகள்' },
              { name: 'Monetary Policy Tools', nameTamil: 'நாணயக் கொள்கை கருவிகள்' },
              { name: 'Interest Rates', nameTamil: 'வட்டி விகிதங்கள்' },
              { name: 'Currency Management', nameTamil: 'நாணய மேலாண்மை' },
            ]
          },
          { 
            id: 'current-affairs', 
            name: 'Current Affairs', 
            nameTamil: 'நடப்பு நிகழ்வுகள்',
            questionCount: 10,
            importance: 'high',
            subtopics: [
              { name: 'Banking News', nameTamil: 'வங்கி செய்திகள்' },
              { name: 'Economic News', nameTamil: 'பொருளாதார செய்திகள்' },
              { name: 'Government Schemes', nameTamil: 'அரசு திட்டங்கள்' },
              { name: 'Appointments', nameTamil: 'நியமனங்கள்' },
            ]
          },
          { 
            id: 'financial-awareness', 
            name: 'Financial Awareness', 
            nameTamil: 'நிதி விழிப்புணர்வு',
            questionCount: 10,
            importance: 'medium',
            subtopics: [
              { name: 'Stock Market', nameTamil: 'பங்குச் சந்தை' },
              { name: 'Insurance', nameTamil: 'காப்பீடு' },
              { name: 'Mutual Funds', nameTamil: 'பரஸ்பர நிதிகள்' },
              { name: 'Budget & Fiscal Policy', nameTamil: 'பட்ஜெட் & நிதிக் கொள்கை' },
            ]
          },
        ],
      },
      {
        id: 'english',
        name: 'English Language',
        nameTamil: 'ஆங்கில மொழி',
        totalQuestions: 30,
        topics: [
          { 
            id: 'reading-comprehension', 
            name: 'Reading Comprehension', 
            nameTamil: 'படிப்பறிவு',
            questionCount: 10,
            importance: 'high',
            subtopics: [
              { name: 'Long Passages', nameTamil: 'நீண்ட பத்திகள்' },
              { name: 'Short Passages', nameTamil: 'குறுகிய பத்திகள்' },
              { name: 'Inference Questions', nameTamil: 'அனுமான கேள்விகள்' },
            ]
          },
          { 
            id: 'cloze-test', 
            name: 'Cloze Test', 
            nameTamil: 'இடைவெளி சோதனை',
            questionCount: 8,
            importance: 'high',
            subtopics: [
              { name: 'Single Blank', nameTamil: 'ஒற்றை வெற்றிடம்' },
              { name: 'Double Blank', nameTamil: 'இரட்டை வெற்றிடம்' },
              { name: 'Sentence Completion', nameTamil: 'வாக்கிய நிறைவு' },
            ]
          },
          { 
            id: 'error-spotting', 
            name: 'Error Spotting', 
            nameTamil: 'பிழை கண்டறிதல்',
            questionCount: 7,
            importance: 'high',
            subtopics: [
              { name: 'Grammar Errors', nameTamil: 'இலக்கணப் பிழைகள்' },
              { name: 'Word Usage Errors', nameTamil: 'சொல் பயன்பாட்டுப் பிழைகள்' },
            ]
          },
          { 
            id: 'para-jumbles', 
            name: 'Para Jumbles', 
            nameTamil: 'பத்தி வரிசை',
            questionCount: 5,
            importance: 'medium',
            subtopics: [
              { name: 'Sentence Rearrangement', nameTamil: 'வாக்கிய மறுவரிசை' },
              { name: 'Paragraph Ordering', nameTamil: 'பத்தி வரிசைப்படுத்தல்' },
            ]
          },
        ],
      },
      {
        id: 'quant',
        name: 'Quantitative Aptitude',
        nameTamil: 'அளவு திறன்',
        totalQuestions: 35,
        topics: [
          { 
            id: 'simplification', 
            name: 'Simplification & Approximation', 
            nameTamil: 'எளிமைப்படுத்தல் & தோராயம்',
            questionCount: 8,
            importance: 'high',
            subtopics: [
              { name: 'BODMAS', nameTamil: 'BODMAS' },
              { name: 'Square Roots', nameTamil: 'வர்க்கமூலங்கள்' },
              { name: 'Approximation', nameTamil: 'தோராயம்' },
            ]
          },
          { 
            id: 'number-series', 
            name: 'Number Series', 
            nameTamil: 'எண் தொடர்',
            questionCount: 7,
            importance: 'high',
            subtopics: [
              { name: 'Missing Number', nameTamil: 'விடுபட்ட எண்' },
              { name: 'Wrong Number', nameTamil: 'தவறான எண்' },
              { name: 'Pattern Recognition', nameTamil: 'வடிவ அங்கீகாரம்' },
            ]
          },
          { 
            id: 'data-interpretation', 
            name: 'Data Interpretation', 
            nameTamil: 'தரவு விளக்கம்',
            questionCount: 10,
            importance: 'high',
            subtopics: [
              { name: 'Tables', nameTamil: 'அட்டவணைகள்' },
              { name: 'Bar Graphs', nameTamil: 'பட்டை வரைபடங்கள்' },
              { name: 'Line Graphs', nameTamil: 'கோட்டு வரைபடங்கள்' },
              { name: 'Pie Charts', nameTamil: 'வட்ட வரைபடங்கள்' },
              { name: 'Mixed DI', nameTamil: 'கலப்பு DI' },
            ]
          },
          { 
            id: 'quadratic-equations', 
            name: 'Quadratic Equations', 
            nameTamil: 'இருபடி சமன்பாடுகள்',
            questionCount: 5,
            importance: 'medium',
            subtopics: [
              { name: 'Finding Roots', nameTamil: 'மூலங்கள் கண்டறிதல்' },
              { name: 'Comparing Roots', nameTamil: 'மூலங்கள் ஒப்பீடு' },
            ]
          },
          { 
            id: 'miscellaneous', 
            name: 'Miscellaneous', 
            nameTamil: 'இதர',
            questionCount: 5,
            importance: 'medium',
            subtopics: [
              { name: 'Probability', nameTamil: 'நிகழ்தகவு' },
              { name: 'Permutation & Combination', nameTamil: 'வரிசை & சேர்வு' },
            ]
          },
        ],
      },
      {
        id: 'reasoning',
        name: 'Reasoning Ability',
        nameTamil: 'தர்க்க திறன்',
        totalQuestions: 35,
        topics: [
          { 
            id: 'puzzles', 
            name: 'Puzzles', 
            nameTamil: 'புதிர்கள்',
            questionCount: 10,
            importance: 'high',
            subtopics: [
              { name: 'Linear Arrangement', nameTamil: 'நேர் வரிசை' },
              { name: 'Circular Arrangement', nameTamil: 'வட்ட வரிசை' },
              { name: 'Floor Based', nameTamil: 'தளம் அடிப்படை' },
              { name: 'Box Based', nameTamil: 'பெட்டி அடிப்படை' },
            ]
          },
          { 
            id: 'seating-arrangement', 
            name: 'Seating Arrangement', 
            nameTamil: 'இருக்கை ஏற்பாடு',
            questionCount: 10,
            importance: 'high',
            subtopics: [
              { name: 'Linear Seating', nameTamil: 'நேர் இருக்கை' },
              { name: 'Circular Seating', nameTamil: 'வட்ட இருக்கை' },
              { name: 'Square/Rectangular', nameTamil: 'சதுர/செவ்வக' },
            ]
          },
          { 
            id: 'syllogism', 
            name: 'Syllogism', 
            nameTamil: 'தருக்க முடிவு',
            questionCount: 5,
            importance: 'high',
            subtopics: [
              { name: 'All/Some/No', nameTamil: 'அனைத்தும்/சில/இல்லை' },
              { name: 'Possibility Cases', nameTamil: 'சாத்தியக்கூறு நிகழ்வுகள்' },
            ]
          },
          { 
            id: 'blood-relations', 
            name: 'Blood Relations', 
            nameTamil: 'இரத்த உறவுகள்',
            questionCount: 5,
            importance: 'medium',
            subtopics: [
              { name: 'Family Tree', nameTamil: 'குடும்ப மரம்' },
              { name: 'Coded Relations', nameTamil: 'குறியீட்டு உறவுகள்' },
            ]
          },
          { 
            id: 'coding-inequality', 
            name: 'Coding & Inequality', 
            nameTamil: 'குறியாக்கம் & சமனின்மை',
            questionCount: 5,
            importance: 'medium',
            subtopics: [
              { name: 'Coded Inequality', nameTamil: 'குறியீட்டு சமனின்மை' },
              { name: 'Direct Inequality', nameTamil: 'நேரடி சமனின்மை' },
            ]
          },
        ],
      },
    ],
  },
  {
    category: 'state',
    totalQuestions: 200,
    subjects: [
      {
        id: 'gk',
        name: 'General Knowledge',
        nameTamil: 'பொது அறிவு',
        totalQuestions: 75,
        topics: [
          { 
            id: 'tn-history', 
            name: 'Tamil Nadu History', 
            nameTamil: 'தமிழ்நாடு வரலாறு',
            questionCount: 15,
            importance: 'high',
            subtopics: [
              { name: 'Chola Dynasty', nameTamil: 'சோழ வம்சம்' },
              { name: 'Pandya Dynasty', nameTamil: 'பாண்டிய வம்சம்' },
              { name: 'Chera Dynasty', nameTamil: 'சேர வம்சம்' },
              { name: 'Pallava Dynasty', nameTamil: 'பல்லவ வம்சம்' },
              { name: 'Nayak Period', nameTamil: 'நாயக்க காலம்' },
              { name: 'Freedom Fighters of TN', nameTamil: 'தமிழ்நாடு சுதந்திர போராளிகள்' },
            ]
          },
          { 
            id: 'tn-geography', 
            name: 'Tamil Nadu Geography', 
            nameTamil: 'தமிழ்நாடு புவியியல்',
            questionCount: 12,
            importance: 'high',
            subtopics: [
              { name: 'Rivers of TN', nameTamil: 'தமிழ்நாடு ஆறுகள்' },
              { name: 'Districts', nameTamil: 'மாவட்டங்கள்' },
              { name: 'Wildlife Sanctuaries', nameTamil: 'வனவிலங்கு சரணாலயங்கள்' },
              { name: 'Climate & Agriculture', nameTamil: 'காலநிலை & விவசாயம்' },
            ]
          },
          { 
            id: 'current-affairs', 
            name: 'Current Affairs', 
            nameTamil: 'நடப்பு நிகழ்வுகள்',
            questionCount: 15,
            importance: 'high',
            subtopics: [
              { name: 'TN Government Schemes', nameTamil: 'தமிழ்நாடு அரசு திட்டங்கள்' },
              { name: 'State Awards', nameTamil: 'மாநில விருதுகள்' },
              { name: 'Recent Developments', nameTamil: 'சமீபத்திய முன்னேற்றங்கள்' },
              { name: 'Sports News', nameTamil: 'விளையாட்டு செய்திகள்' },
            ]
          },
          { 
            id: 'tn-polity', 
            name: 'TN Administration', 
            nameTamil: 'தமிழ்நாடு நிர்வாகம்',
            questionCount: 10,
            importance: 'high',
            subtopics: [
              { name: 'State Legislature', nameTamil: 'மாநில சட்டமன்றம்' },
              { name: 'District Administration', nameTamil: 'மாவட்ட நிர்வாகம்' },
              { name: 'Local Bodies', nameTamil: 'உள்ளாட்சி அமைப்புகள்' },
              { name: 'State Policies', nameTamil: 'மாநில கொள்கைகள்' },
            ]
          },
          { 
            id: 'tn-culture', 
            name: 'TN Art & Culture', 
            nameTamil: 'தமிழ்நாடு கலை & கலாச்சாரம்',
            questionCount: 10,
            importance: 'medium',
            subtopics: [
              { name: 'Classical Dance', nameTamil: 'பாரம்பரிய நடனம்' },
              { name: 'Music', nameTamil: 'இசை' },
              { name: 'Temples', nameTamil: 'கோயில்கள்' },
              { name: 'Festivals', nameTamil: 'திருவிழாக்கள்' },
            ]
          },
          { 
            id: 'indian-polity', 
            name: 'Indian Polity', 
            nameTamil: 'இந்திய அரசியல்',
            questionCount: 8,
            importance: 'medium',
            subtopics: [
              { name: 'Constitution', nameTamil: 'அரசியலமைப்பு' },
              { name: 'Parliament', nameTamil: 'நாடாளுமன்றம்' },
              { name: 'Judiciary', nameTamil: 'நீதித்துறை' },
            ]
          },
          { 
            id: 'science', 
            name: 'General Science', 
            nameTamil: 'பொது அறிவியல்',
            questionCount: 5,
            importance: 'low',
            subtopics: [
              { name: 'Physics', nameTamil: 'இயற்பியல்' },
              { name: 'Chemistry', nameTamil: 'வேதியியல்' },
              { name: 'Biology', nameTamil: 'உயிரியல்' },
            ]
          },
        ],
      },
      {
        id: 'tamil',
        name: 'Tamil Language',
        nameTamil: 'தமிழ் மொழி',
        totalQuestions: 50,
        topics: [
          { 
            id: 'grammar', 
            name: 'Tamil Grammar', 
            nameTamil: 'தமிழ் இலக்கணம்',
            questionCount: 20,
            importance: 'high',
            subtopics: [
              { name: 'Ezhuthu (Letters)', nameTamil: 'எழுத்து' },
              { name: 'Sol (Words)', nameTamil: 'சொல்' },
              { name: 'Porul (Meaning)', nameTamil: 'பொருள்' },
              { name: 'Yaapu (Prosody)', nameTamil: 'யாப்பு' },
              { name: 'Ani (Figures of Speech)', nameTamil: 'அணி' },
            ]
          },
          { 
            id: 'literature', 
            name: 'Tamil Literature', 
            nameTamil: 'தமிழ் இலக்கியம்',
            questionCount: 20,
            importance: 'high',
            subtopics: [
              { name: 'Sangam Literature', nameTamil: 'சங்க இலக்கியம்' },
              { name: 'Thirukural', nameTamil: 'திருக்குறள்' },
              { name: 'Epic Literature', nameTamil: 'காப்பிய இலக்கியம்' },
              { name: 'Modern Tamil Literature', nameTamil: 'நவீன தமிழ் இலக்கியம்' },
              { name: 'Devotional Literature', nameTamil: 'பக்தி இலக்கியம்' },
            ]
          },
          { 
            id: 'comprehension', 
            name: 'Comprehension', 
            nameTamil: 'படிப்பறிவு',
            questionCount: 10,
            importance: 'medium',
            subtopics: [
              { name: 'Prose Passages', nameTamil: 'உரைநடை பத்திகள்' },
              { name: 'Poetry Understanding', nameTamil: 'கவிதை புரிதல்' },
            ]
          },
        ],
      },
      {
        id: 'aptitude',
        name: 'Aptitude & Reasoning',
        nameTamil: 'திறன் & தர்க்கம்',
        totalQuestions: 50,
        topics: [
          { 
            id: 'mental-ability', 
            name: 'Mental Ability', 
            nameTamil: 'மன திறன்',
            questionCount: 25,
            importance: 'high',
            subtopics: [
              { name: 'Logical Reasoning', nameTamil: 'தருக்க தர்க்கம்' },
              { name: 'Analytical Reasoning', nameTamil: 'பகுப்பாய்வு தர்க்கம்' },
              { name: 'Puzzles', nameTamil: 'புதிர்கள்' },
              { name: 'Pattern Recognition', nameTamil: 'வடிவ அங்கீகாரம்' },
            ]
          },
          { 
            id: 'quantitative', 
            name: 'Quantitative Aptitude', 
            nameTamil: 'அளவு திறன்',
            questionCount: 25,
            importance: 'high',
            subtopics: [
              { name: 'Number System', nameTamil: 'எண் முறை' },
              { name: 'Percentage', nameTamil: 'சதவீதம்' },
              { name: 'Ratio & Proportion', nameTamil: 'விகிதம் & விகிதாசாரம்' },
              { name: 'Time & Work', nameTamil: 'நேரம் & வேலை' },
              { name: 'Data Interpretation', nameTamil: 'தரவு விளக்கம்' },
            ]
          },
        ],
      },
      {
        id: 'english',
        name: 'General English',
        nameTamil: 'பொது ஆங்கிலம்',
        totalQuestions: 25,
        topics: [
          { 
            id: 'grammar', 
            name: 'Grammar', 
            nameTamil: 'இலக்கணம்',
            questionCount: 15,
            importance: 'high',
            subtopics: [
              { name: 'Tenses', nameTamil: 'காலங்கள்' },
              { name: 'Subject-Verb Agreement', nameTamil: 'எழுவாய்-வினை ஒப்பந்தம்' },
              { name: 'Articles & Prepositions', nameTamil: 'கட்டுரைகள் & முன்னிடைச் சொற்கள்' },
            ]
          },
          { 
            id: 'vocabulary', 
            name: 'Vocabulary', 
            nameTamil: 'சொற்களஞ்சியம்',
            questionCount: 10,
            importance: 'medium',
            subtopics: [
              { name: 'Synonyms & Antonyms', nameTamil: 'ஒத்த & எதிர் சொற்கள்' },
              { name: 'One Word Substitution', nameTamil: 'ஒரு சொல் மாற்று' },
            ]
          },
        ],
      },
    ],
  },
  {
    category: 'central',
    totalQuestions: 100,
    subjects: [
      {
        id: 'gk',
        name: 'General Knowledge',
        nameTamil: 'பொது அறிவு',
        totalQuestions: 25,
        topics: [
          { 
            id: 'current-affairs', 
            name: 'Current Affairs', 
            nameTamil: 'நடப்பு நிகழ்வுகள்',
            questionCount: 8,
            importance: 'high',
            subtopics: [
              { name: 'National News', nameTamil: 'தேசிய செய்திகள்' },
              { name: 'International News', nameTamil: 'சர்வதேச செய்திகள்' },
              { name: 'Sports & Awards', nameTamil: 'விளையாட்டு & விருதுகள்' },
              { name: 'Summits & Conferences', nameTamil: 'உச்சி மாநாடுகள்' },
            ]
          },
          { 
            id: 'indian-polity', 
            name: 'Indian Polity', 
            nameTamil: 'இந்திய அரசியல்',
            questionCount: 6,
            importance: 'high',
            subtopics: [
              { name: 'Constitutional Bodies', nameTamil: 'அரசியலமைப்பு அமைப்புகள்' },
              { name: 'Election System', nameTamil: 'தேர்தல் முறை' },
              { name: 'Emergency Provisions', nameTamil: 'அவசர நிலை விதிகள்' },
              { name: 'Fundamental Duties', nameTamil: 'அடிப்படை கடமைகள்' },
            ]
          },
          { 
            id: 'indian-history', 
            name: 'Indian History', 
            nameTamil: 'இந்திய வரலாறு',
            questionCount: 5,
            importance: 'medium',
            subtopics: [
              { name: 'Ancient India', nameTamil: 'பண்டைய இந்தியா' },
              { name: 'Medieval India', nameTamil: 'இடைக்கால இந்தியா' },
              { name: 'Modern India', nameTamil: 'நவீன இந்தியா' },
            ]
          },
          { 
            id: 'science', 
            name: 'General Science', 
            nameTamil: 'பொது அறிவியல்',
            questionCount: 6,
            importance: 'medium',
            subtopics: [
              { name: 'Physics', nameTamil: 'இயற்பியல்' },
              { name: 'Chemistry', nameTamil: 'வேதியியல்' },
              { name: 'Biology', nameTamil: 'உயிரியல்' },
              { name: 'Space & Technology', nameTamil: 'விண்வெளி & தொழில்நுட்பம்' },
            ]
          },
        ],
      },
      {
        id: 'reasoning',
        name: 'General Intelligence & Reasoning',
        nameTamil: 'பொது புத்திசாலித்தனம் & தர்க்கம்',
        totalQuestions: 25,
        topics: [
          { 
            id: 'verbal', 
            name: 'Verbal Reasoning', 
            nameTamil: 'சொல் தர்க்கம்',
            questionCount: 12,
            importance: 'high',
            subtopics: [
              { name: 'Analogy', nameTamil: 'ஒப்புமை' },
              { name: 'Classification', nameTamil: 'வகைப்படுத்தல்' },
              { name: 'Series', nameTamil: 'தொடர்' },
              { name: 'Coding-Decoding', nameTamil: 'குறியாக்கம்-குறிவிலக்கம்' },
              { name: 'Syllogism', nameTamil: 'தருக்க முடிவு' },
            ]
          },
          { 
            id: 'non-verbal', 
            name: 'Non-Verbal Reasoning', 
            nameTamil: 'சொல்லாத தர்க்கம்',
            questionCount: 13,
            importance: 'high',
            subtopics: [
              { name: 'Figure Series', nameTamil: 'உரு தொடர்' },
              { name: 'Mirror & Water Images', nameTamil: 'கண்ணாடி & நீர் படங்கள்' },
              { name: 'Paper Folding', nameTamil: 'காகித மடிப்பு' },
              { name: 'Embedded Figures', nameTamil: 'உட்பொதிந்த உருவங்கள்' },
            ]
          },
        ],
      },
      {
        id: 'english',
        name: 'English Language',
        nameTamil: 'ஆங்கில மொழி',
        totalQuestions: 25,
        topics: [
          { 
            id: 'grammar', 
            name: 'Grammar', 
            nameTamil: 'இலக்கணம்',
            questionCount: 12,
            importance: 'high',
            subtopics: [
              { name: 'Error Detection', nameTamil: 'பிழை கண்டறிதல்' },
              { name: 'Sentence Improvement', nameTamil: 'வாக்கிய மேம்பாடு' },
              { name: 'Active/Passive Voice', nameTamil: 'செயல்/செயப்படு வாக்கியம்' },
              { name: 'Direct/Indirect Speech', nameTamil: 'நேரடி/மறை கூற்று' },
            ]
          },
          { 
            id: 'vocabulary', 
            name: 'Vocabulary', 
            nameTamil: 'சொற்களஞ்சியம்',
            questionCount: 8,
            importance: 'medium',
            subtopics: [
              { name: 'Synonyms', nameTamil: 'ஒத்த சொற்கள்' },
              { name: 'Antonyms', nameTamil: 'எதிர்ச் சொற்கள்' },
              { name: 'Idioms & Phrases', nameTamil: 'வழக்குகள் & சொற்றொடர்கள்' },
            ]
          },
          { 
            id: 'comprehension', 
            name: 'Comprehension', 
            nameTamil: 'படிப்பறிவு',
            questionCount: 5,
            importance: 'medium',
            subtopics: [
              { name: 'Reading Passages', nameTamil: 'வாசிப்பு பத்திகள்' },
              { name: 'Cloze Test', nameTamil: 'இடைவெளி சோதனை' },
            ]
          },
        ],
      },
      {
        id: 'math',
        name: 'Quantitative Aptitude',
        nameTamil: 'அளவு திறன்',
        totalQuestions: 25,
        topics: [
          { 
            id: 'arithmetic', 
            name: 'Arithmetic', 
            nameTamil: 'எண்கணிதம்',
            questionCount: 15,
            importance: 'high',
            subtopics: [
              { name: 'Number System', nameTamil: 'எண் முறை' },
              { name: 'Percentage', nameTamil: 'சதவீதம்' },
              { name: 'Profit & Loss', nameTamil: 'லாபம் & நஷ்டம்' },
              { name: 'Simple & Compound Interest', nameTamil: 'தனி & கூட்டு வட்டி' },
              { name: 'Time & Work', nameTamil: 'நேரம் & வேலை' },
              { name: 'Speed, Time & Distance', nameTamil: 'வேகம், நேரம் & தூரம்' },
            ]
          },
          { 
            id: 'geometry', 
            name: 'Geometry & Mensuration', 
            nameTamil: 'வடிவியல் & அளவீடு',
            questionCount: 10,
            importance: 'medium',
            subtopics: [
              { name: 'Triangles', nameTamil: 'முக்கோணங்கள்' },
              { name: 'Circles', nameTamil: 'வட்டங்கள்' },
              { name: 'Area & Volume', nameTamil: 'பரப்பு & கன அளவு' },
              { name: 'Coordinate Geometry', nameTamil: 'ஆள்கூறு வடிவியல்' },
            ]
          },
        ],
      },
    ],
  },
];

interface GovtMockTestConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: CategoryType | null;
  useAI: boolean;
  onStartTest: (selectedSubjects: string[], selectedTopics: string[]) => void;
}

export const GovtMockTestConfigDialog = ({
  open,
  onOpenChange,
  category,
  useAI,
  onStartTest,
}: GovtMockTestConfigDialogProps) => {
  const { language } = useLanguage();
  const [selectedSubjects, setSelectedSubjects] = useState<Set<string>>(new Set());
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set());
  const [difficulty, setDifficulty] = useState<string>('all');
  const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(new Set());

  const syllabus = useMemo(() => {
    return govtExamSyllabus.find(s => s.category === category);
  }, [category]);

  const info = category ? categoryInfo[category] : null;

  const toggleSubject = (subjectId: string) => {
    const newSelected = new Set(selectedSubjects);
    if (newSelected.has(subjectId)) {
      newSelected.delete(subjectId);
      // Also remove all topics from this subject
      const subject = syllabus?.subjects.find(s => s.id === subjectId);
      if (subject) {
        const newTopics = new Set(selectedTopics);
        subject.topics.forEach(t => newTopics.delete(t.id));
        setSelectedTopics(newTopics);
      }
    } else {
      newSelected.add(subjectId);
    }
    setSelectedSubjects(newSelected);
  };

  const toggleTopic = (topicId: string, subjectId: string) => {
    const newTopics = new Set(selectedTopics);
    if (newTopics.has(topicId)) {
      newTopics.delete(topicId);
    } else {
      newTopics.add(topicId);
      // Auto-select the parent subject
      if (!selectedSubjects.has(subjectId)) {
        setSelectedSubjects(prev => new Set(prev).add(subjectId));
      }
    }
    setSelectedTopics(newTopics);
  };

  const toggleExpandSubject = (subjectId: string) => {
    const newExpanded = new Set(expandedSubjects);
    if (newExpanded.has(subjectId)) {
      newExpanded.delete(subjectId);
    } else {
      newExpanded.add(subjectId);
    }
    setExpandedSubjects(newExpanded);
  };

  const selectAll = () => {
    if (!syllabus) return;
    const allSubjects = new Set(syllabus.subjects.map(s => s.id));
    const allTopics = new Set(syllabus.subjects.flatMap(s => s.topics.map(t => t.id)));
    setSelectedSubjects(allSubjects);
    setSelectedTopics(allTopics);
  };

  const clearAll = () => {
    setSelectedSubjects(new Set());
    setSelectedTopics(new Set());
  };

  const handleStartTest = () => {
    onStartTest(Array.from(selectedSubjects), Array.from(selectedTopics));
    onOpenChange(false);
  };

  const hasSelection = selectedSubjects.size > 0 || selectedTopics.size > 0;

  if (!category || !syllabus) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] flex flex-col bg-background">
        <DialogHeader className="pb-2">
          <DialogTitle className="flex items-center gap-3 text-lg">
            <div className={`p-2 rounded-lg ${info?.bgColor}`}>
              <BookOpen className="h-5 w-5" style={{ color: info?.borderColor?.replace('border-', '') }} />
            </div>
            <div>
              <span>{info?.label}</span>
              {useAI && (
                <Badge className="ml-2 bg-purple-100 text-purple-700 border-purple-200">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI
                </Badge>
              )}
            </div>
          </DialogTitle>
          <DialogDescription>
            {language === 'ta' 
              ? 'நீங்கள் பயிற்சி செய்ய விரும்பும் பாடங்களையும் தலைப்புகளையும் தேர்ந்தெடுக்கவும்'
              : 'Select the subjects and topics you want to practice'}
          </DialogDescription>
        </DialogHeader>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 py-2 border-b">
          <Button variant="outline" size="sm" onClick={selectAll} className="gap-1.5 text-xs">
            <Check className="h-3 w-3" />
            {language === 'ta' ? 'அனைத்தும்' : 'Select All'}
          </Button>
          {hasSelection && (
            <Button variant="ghost" size="sm" onClick={clearAll} className="gap-1.5 text-xs text-muted-foreground">
              <X className="h-3 w-3" />
              {language === 'ta' ? 'அழி' : 'Clear'}
            </Button>
          )}
          <div className="ml-auto flex items-center gap-2">
            <Label className="text-xs text-muted-foreground">
              {language === 'ta' ? 'கடினம்:' : 'Difficulty:'}
            </Label>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="w-[100px] h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-lg z-50">
                <SelectItem value="all">{language === 'ta' ? 'அனைத்தும்' : 'All'}</SelectItem>
                <SelectItem value="easy">{language === 'ta' ? 'எளிது' : 'Easy'}</SelectItem>
                <SelectItem value="medium">{language === 'ta' ? 'நடுத்தரம்' : 'Medium'}</SelectItem>
                <SelectItem value="hard">{language === 'ta' ? 'கடினம்' : 'Hard'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Subject & Topic Selection */}
        <ScrollArea className="flex-1 pr-4 -mr-4">
          <div className="space-y-3 py-3">
            {syllabus.subjects.map((subject) => (
              <Collapsible
                key={subject.id}
                open={expandedSubjects.has(subject.id)}
                onOpenChange={() => toggleExpandSubject(subject.id)}
              >
                <div className={`rounded-lg border transition-colors ${
                  selectedSubjects.has(subject.id) 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-muted-foreground/30'
                }`}>
                  <div className="flex items-center gap-3 p-3">
                    <Checkbox
                      id={subject.id}
                      checked={selectedSubjects.has(subject.id)}
                      onCheckedChange={() => toggleSubject(subject.id)}
                      className="data-[state=checked]:bg-primary"
                    />
                    <Label 
                      htmlFor={subject.id} 
                      className="flex-1 font-medium cursor-pointer"
                    >
                      {language === 'ta' ? subject.nameTamil : subject.name}
                    </Label>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <ChevronDown className={`h-4 w-4 transition-transform ${
                          expandedSubjects.has(subject.id) ? 'rotate-180' : ''
                        }`} />
                      </Button>
                    </CollapsibleTrigger>
                  </div>

                  <CollapsibleContent>
                    <div className="px-3 pb-3 pt-1 border-t border-border/50">
                      <div className="grid grid-cols-2 gap-2">
                        {subject.topics.map((topic) => (
                          <motion.label
                            key={topic.id}
                            whileTap={{ scale: 0.98 }}
                            className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors ${
                              selectedTopics.has(topic.id)
                                ? 'bg-primary/10 text-primary'
                                : 'hover:bg-muted'
                            }`}
                          >
                            <Checkbox
                              checked={selectedTopics.has(topic.id)}
                              onCheckedChange={() => toggleTopic(topic.id, subject.id)}
                              className="h-4 w-4 data-[state=checked]:bg-primary"
                            />
                            <span className="text-sm">
                              {language === 'ta' ? topic.nameTamil : topic.name}
                            </span>
                          </motion.label>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ))}
          </div>
        </ScrollArea>

        {/* Selection Summary & Start Button */}
        <div className="pt-3 border-t space-y-3">
          {hasSelection && (
            <div className="flex flex-wrap gap-1.5">
              {Array.from(selectedSubjects).slice(0, 3).map(id => {
                const subject = syllabus.subjects.find(s => s.id === id);
                return (
                  <Badge key={id} variant="secondary" className="gap-1 text-xs">
                    {language === 'ta' ? subject?.nameTamil : subject?.name}
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-destructive" 
                      onClick={() => toggleSubject(id)}
                    />
                  </Badge>
                );
              })}
              {selectedSubjects.size > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{selectedSubjects.size - 3} {language === 'ta' ? 'மேலும்' : 'more'}
                </Badge>
              )}
            </div>
          )}

          <Button 
            onClick={handleStartTest} 
            className="w-full gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            disabled={!hasSelection}
          >
            <Play className="h-4 w-4" />
            {language === 'ta' 
              ? `மாக் டெஸ்ட் தொடங்கு${hasSelection ? ` (${selectedSubjects.size} பாடங்கள்)` : ''}`
              : `Start Mock Test${hasSelection ? ` (${selectedSubjects.size} subjects)` : ''}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
