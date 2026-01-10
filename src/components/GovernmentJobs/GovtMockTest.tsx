import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from '@/components/ui/dialog';
import {
  Play, Clock, CheckCircle2, XCircle, Trophy, Target,
  ChevronRight, ChevronLeft, Flag, RotateCcw, BookOpen,
  Shield, Train, FileText, Landmark, MapPin, Building2,
  Zap, Award, BarChart3, Flame, Download, Sparkles, Loader2
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { categoryInfo } from './governmentExamsData';
import { CategoryType } from './types';
import { useGovtMockTestScores } from '@/hooks/useGovtMockTestScores';
import { useStudyStreak } from '@/hooks/useStudyStreak';
import { GovtMockTestProgress } from './GovtMockTestProgress';
import { StudyStreakDisplay } from './StudyStreakDisplay';
import { generateMockTestPDF } from './generateMockTestPDF';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface Question {
  id: string;
  question: string;
  questionTamil: string;
  options: { en: string; ta: string }[];
  correctAnswer: number;
  explanation: string;
  explanationTamil: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface CategoryQuestions {
  category: CategoryType;
  questions: Question[];
}

// Mock Test Questions Database
const mockTestQuestions: CategoryQuestions[] = [
  {
    category: 'defence',
    questions: [
      {
        id: 'def1',
        question: 'Who is the Supreme Commander of the Indian Armed Forces?',
        questionTamil: 'இந்திய ஆயுதப் படைகளின் உச்ச தளபதி யார்?',
        options: [
          { en: 'Prime Minister', ta: 'பிரதமர்' },
          { en: 'President', ta: 'குடியரசுத் தலைவர்' },
          { en: 'Defence Minister', ta: 'பாதுகாப்பு அமைச்சர்' },
          { en: 'Chief of Defence Staff', ta: 'பாதுகாப்புத் தலைமை அதிகாரி' },
        ],
        correctAnswer: 1,
        explanation: 'The President of India is the Supreme Commander of the Indian Armed Forces.',
        explanationTamil: 'இந்தியக் குடியரசுத் தலைவர் இந்திய ஆயுதப் படைகளின் உச்ச தளபதி ஆவார்.',
        subject: 'General Knowledge',
        difficulty: 'easy',
      },
      {
        id: 'def2',
        question: 'What is the motto of the Indian Army?',
        questionTamil: 'இந்திய ராணுவத்தின் குறிக்கோள் என்ன?',
        options: [
          { en: 'Jai Hind', ta: 'ஜெய் ஹிந்த்' },
          { en: 'Service Before Self', ta: 'சேவை முதல்' },
          { en: 'Satyamev Jayate', ta: 'சத்யமேவ ஜெயதே' },
          { en: 'Vande Mataram', ta: 'வந்தே மாதரம்' },
        ],
        correctAnswer: 1,
        explanation: 'The motto of the Indian Army is "Service Before Self".',
        explanationTamil: '"சேவை முதல்" என்பது இந்திய ராணுவத்தின் குறிக்கோள் ஆகும்.',
        subject: 'General Knowledge',
        difficulty: 'easy',
      },
      {
        id: 'def3',
        question: 'Which is the oldest regiment of the Indian Army?',
        questionTamil: 'இந்திய ராணுவத்தின் மிகப் பழமையான படைப்பிரிவு எது?',
        options: [
          { en: 'Rajputana Rifles', ta: 'ராஜ்புதானா ரைபிள்ஸ்' },
          { en: 'Madras Regiment', ta: 'மெட்ராஸ் ரெஜிமெண்ட்' },
          { en: 'Punjab Regiment', ta: 'பஞ்சாப் ரெஜிமெண்ட்' },
          { en: 'Gorkha Regiment', ta: 'கோர்க்கா ரெஜிமெண்ட்' },
        ],
        correctAnswer: 1,
        explanation: 'The Madras Regiment, raised in 1758, is the oldest regiment of the Indian Army.',
        explanationTamil: '1758 இல் உருவாக்கப்பட்ட மெட்ராஸ் ரெஜிமெண்ட் இந்திய ராணுவத்தின் மிகப் பழமையான படைப்பிரிவு ஆகும்.',
        subject: 'General Knowledge',
        difficulty: 'medium',
      },
      {
        id: 'def4',
        question: 'What is the full form of NDA?',
        questionTamil: 'NDA என்பதன் முழு வடிவம் என்ன?',
        options: [
          { en: 'National Defence Academy', ta: 'தேசிய பாதுகாப்பு அகாடமி' },
          { en: 'National Defence Authority', ta: 'தேசிய பாதுகாப்பு ஆணையம்' },
          { en: 'Naval Defence Academy', ta: 'கடற்படை பாதுகாப்பு அகாடமி' },
          { en: 'National Development Academy', ta: 'தேசிய மேம்பாட்டு அகாடமி' },
        ],
        correctAnswer: 0,
        explanation: 'NDA stands for National Defence Academy, located in Khadakwasla, Pune.',
        explanationTamil: 'NDA என்பது புனேவில் உள்ள காதக்வாஸ்லாவில் அமைந்துள்ள தேசிய பாதுகாப்பு அகாடமி ஆகும்.',
        subject: 'General Knowledge',
        difficulty: 'easy',
      },
      {
        id: 'def5',
        question: 'The Siachen Glacier dispute is between India and which country?',
        questionTamil: 'சியாச்சின் பனிப்பாறை தகராறு இந்தியாவுக்கும் எந்த நாட்டுக்கும் இடையே உள்ளது?',
        options: [
          { en: 'China', ta: 'சீனா' },
          { en: 'Nepal', ta: 'நேபாளம்' },
          { en: 'Pakistan', ta: 'பாகிஸ்தான்' },
          { en: 'Bangladesh', ta: 'வங்காளதேசம்' },
        ],
        correctAnswer: 2,
        explanation: 'The Siachen Glacier dispute is between India and Pakistan.',
        explanationTamil: 'சியாச்சின் பனிப்பாறை தகராறு இந்தியாவுக்கும் பாகிஸ்தானுக்கும் இடையே உள்ளது.',
        subject: 'Geography',
        difficulty: 'medium',
      },
    ],
  },
  {
    category: 'railway',
    questions: [
      {
        id: 'rly1',
        question: 'When was the first railway line opened in India?',
        questionTamil: 'இந்தியாவில் முதல் ரயில் பாதை எப்போது திறக்கப்பட்டது?',
        options: [
          { en: '1853', ta: '1853' },
          { en: '1857', ta: '1857' },
          { en: '1947', ta: '1947' },
          { en: '1875', ta: '1875' },
        ],
        correctAnswer: 0,
        explanation: 'The first railway in India ran between Mumbai and Thane on 16 April 1853.',
        explanationTamil: 'இந்தியாவின் முதல் ரயில் 1853 ஏப்ரல் 16 அன்று மும்பைக்கும் தானேக்கும் இடையே ஓடியது.',
        subject: 'General Knowledge',
        difficulty: 'easy',
      },
      {
        id: 'rly2',
        question: 'What is the headquarters of Indian Railways?',
        questionTamil: 'இந்திய ரயில்வேயின் தலைமையகம் எங்கே உள்ளது?',
        options: [
          { en: 'Mumbai', ta: 'மும்பை' },
          { en: 'New Delhi', ta: 'புது டெல்லி' },
          { en: 'Kolkata', ta: 'கொல்கத்தா' },
          { en: 'Chennai', ta: 'சென்னை' },
        ],
        correctAnswer: 1,
        explanation: 'The headquarters of Indian Railways is in New Delhi.',
        explanationTamil: 'இந்திய ரயில்வேயின் தலைமையகம் புது டெல்லியில் உள்ளது.',
        subject: 'General Knowledge',
        difficulty: 'easy',
      },
      {
        id: 'rly3',
        question: 'Which is the longest railway platform in India?',
        questionTamil: 'இந்தியாவின் நீளமான ரயில் பிளாட்பார்ம் எது?',
        options: [
          { en: 'Kharagpur', ta: 'கரக்பூர்' },
          { en: 'Gorakhpur', ta: 'கோரக்பூர்' },
          { en: 'Kollam', ta: 'கொல்லம்' },
          { en: 'Hubli', ta: 'ஹுப்ளி' },
        ],
        correctAnswer: 1,
        explanation: 'Gorakhpur Junction has the longest railway platform in India (1,366.33 meters).',
        explanationTamil: 'கோரக்பூர் சந்திப்பு இந்தியாவின் நீளமான ரயில் பிளாட்பார்மைக் (1,366.33 மீட்டர்) கொண்டுள்ளது.',
        subject: 'General Knowledge',
        difficulty: 'medium',
      },
      {
        id: 'rly4',
        question: 'How many railway zones are there in India?',
        questionTamil: 'இந்தியாவில் எத்தனை ரயில்வே மண்டலங்கள் உள்ளன?',
        options: [
          { en: '16', ta: '16' },
          { en: '17', ta: '17' },
          { en: '18', ta: '18' },
          { en: '19', ta: '19' },
        ],
        correctAnswer: 2,
        explanation: 'There are 18 railway zones in Indian Railways.',
        explanationTamil: 'இந்திய ரயில்வேயில் 18 ரயில்வே மண்டலங்கள் உள்ளன.',
        subject: 'General Knowledge',
        difficulty: 'medium',
      },
      {
        id: 'rly5',
        question: 'Which train is known as the "King of Indian Railways"?',
        questionTamil: '"இந்திய ரயில்வேயின் அரசன்" என அழைக்கப்படும் ரயில் எது?',
        options: [
          { en: 'Shatabdi Express', ta: 'சதாப்தி எக்ஸ்பிரஸ்' },
          { en: 'Rajdhani Express', ta: 'ராஜதானி எக்ஸ்பிரஸ்' },
          { en: 'Vande Bharat Express', ta: 'வந்தே பாரத் எக்ஸ்பிரஸ்' },
          { en: 'Duronto Express', ta: 'துரோண்டோ எக்ஸ்பிரஸ்' },
        ],
        correctAnswer: 1,
        explanation: 'Rajdhani Express is known as the "King of Indian Railways".',
        explanationTamil: 'ராஜதானி எக்ஸ்பிரஸ் "இந்திய ரயில்வேயின் அரசன்" என அழைக்கப்படுகிறது.',
        subject: 'General Knowledge',
        difficulty: 'easy',
      },
    ],
  },
  {
    category: 'ssc',
    questions: [
      {
        id: 'ssc1',
        question: 'Which article of the Indian Constitution deals with Right to Equality?',
        questionTamil: 'இந்திய அரசியலமைப்பின் எந்த பிரிவு சமத்துவ உரிமையை பற்றியது?',
        options: [
          { en: 'Article 14-18', ta: 'பிரிவு 14-18' },
          { en: 'Article 19-22', ta: 'பிரிவு 19-22' },
          { en: 'Article 23-24', ta: 'பிரிவு 23-24' },
          { en: 'Article 25-28', ta: 'பிரிவு 25-28' },
        ],
        correctAnswer: 0,
        explanation: 'Articles 14-18 deal with the Right to Equality in the Indian Constitution.',
        explanationTamil: 'பிரிவுகள் 14-18 இந்திய அரசியலமைப்பில் சமத்துவ உரிமையைப் பற்றியது.',
        subject: 'Polity',
        difficulty: 'medium',
      },
      {
        id: 'ssc2',
        question: 'Who appoints the Chief Election Commissioner of India?',
        questionTamil: 'இந்தியாவின் தலைமை தேர்தல் ஆணையரை யார் நியமிக்கிறார்?',
        options: [
          { en: 'Prime Minister', ta: 'பிரதமர்' },
          { en: 'President', ta: 'குடியரசுத் தலைவர்' },
          { en: 'Chief Justice', ta: 'தலைமை நீதிபதி' },
          { en: 'Parliament', ta: 'நாடாளுமன்றம்' },
        ],
        correctAnswer: 1,
        explanation: 'The Chief Election Commissioner is appointed by the President of India.',
        explanationTamil: 'தலைமை தேர்தல் ஆணையர் இந்தியக் குடியரசுத் தலைவரால் நியமிக்கப்படுகிறார்.',
        subject: 'Polity',
        difficulty: 'easy',
      },
      {
        id: 'ssc3',
        question: 'The term "Zero Hour" is associated with:',
        questionTamil: '"ஜீரோ ஹவர்" என்ற சொல் எதனுடன் தொடர்புடையது?',
        options: [
          { en: 'Question Hour', ta: 'கேள்வி நேரம்' },
          { en: 'Parliamentary Proceedings', ta: 'நாடாளுமன்ற நடவடிக்கைகள்' },
          { en: 'Midnight Sessions', ta: 'நள்ளிரவு அமர்வுகள்' },
          { en: 'Joint Sessions', ta: 'கூட்டு அமர்வுகள்' },
        ],
        correctAnswer: 1,
        explanation: 'Zero Hour is an informal device in Parliamentary Proceedings starting at 12 noon.',
        explanationTamil: 'ஜீரோ ஹவர் என்பது நாடாளுமன்ற நடவடிக்கைகளில் நண்பகல் 12 மணிக்கு தொடங்கும் ஒரு முறைசாரா சாதனம்.',
        subject: 'Polity',
        difficulty: 'medium',
      },
      {
        id: 'ssc4',
        question: 'Which is the highest civilian award in India?',
        questionTamil: 'இந்தியாவின் உயரிய குடிமக்கள் விருது எது?',
        options: [
          { en: 'Padma Shri', ta: 'பத்ம ஸ்ரீ' },
          { en: 'Padma Bhushan', ta: 'பத்ம பூஷண்' },
          { en: 'Padma Vibhushan', ta: 'பத்ம விபூஷண்' },
          { en: 'Bharat Ratna', ta: 'பாரத ரத்னா' },
        ],
        correctAnswer: 3,
        explanation: 'Bharat Ratna is the highest civilian award in India.',
        explanationTamil: 'பாரத ரத்னா இந்தியாவின் உயரிய குடிமக்கள் விருது ஆகும்.',
        subject: 'General Knowledge',
        difficulty: 'easy',
      },
      {
        id: 'ssc5',
        question: 'What is the SI unit of Electric Current?',
        questionTamil: 'மின்னோட்டத்தின் SI அலகு என்ன?',
        options: [
          { en: 'Volt', ta: 'வோல்ட்' },
          { en: 'Ampere', ta: 'ஆம்பியர்' },
          { en: 'Ohm', ta: 'ஓம்' },
          { en: 'Watt', ta: 'வாட்' },
        ],
        correctAnswer: 1,
        explanation: 'The SI unit of Electric Current is Ampere.',
        explanationTamil: 'மின்னோட்டத்தின் SI அலகு ஆம்பியர் ஆகும்.',
        subject: 'Physics',
        difficulty: 'easy',
      },
    ],
  },
  {
    category: 'banking',
    questions: [
      {
        id: 'bnk1',
        question: 'Which is the central bank of India?',
        questionTamil: 'இந்தியாவின் மத்திய வங்கி எது?',
        options: [
          { en: 'State Bank of India', ta: 'ஸ்டேட் பாங்க் ஆஃப் இந்தியா' },
          { en: 'Reserve Bank of India', ta: 'ரிசர்வ் பாங்க் ஆஃப் இந்தியா' },
          { en: 'Punjab National Bank', ta: 'பஞ்சாப் நேஷனல் பாங்க்' },
          { en: 'Bank of India', ta: 'பாங்க் ஆஃப் இந்தியா' },
        ],
        correctAnswer: 1,
        explanation: 'Reserve Bank of India (RBI) is the central bank of India, established in 1935.',
        explanationTamil: 'ரிசர்வ் பாங்க் ஆஃப் இந்தியா (RBI) 1935 இல் நிறுவப்பட்ட இந்தியாவின் மத்திய வங்கி ஆகும்.',
        subject: 'Banking',
        difficulty: 'easy',
      },
      {
        id: 'bnk2',
        question: 'What is the full form of NEFT?',
        questionTamil: 'NEFT என்பதன் முழு வடிவம் என்ன?',
        options: [
          { en: 'National Electronic Funds Transfer', ta: 'தேசிய மின்னணு நிதி பரிமாற்றம்' },
          { en: 'National Electronic Finance Transfer', ta: 'தேசிய மின்னணு நிதி பரிமாற்றம்' },
          { en: 'New Electronic Funds Transfer', ta: 'புதிய மின்னணு நிதி பரிமாற்றம்' },
          { en: 'National Easy Funds Transfer', ta: 'தேசிய எளிய நிதி பரிமாற்றம்' },
        ],
        correctAnswer: 0,
        explanation: 'NEFT stands for National Electronic Funds Transfer.',
        explanationTamil: 'NEFT என்பது தேசிய மின்னணு நிதி பரிமாற்றம் என்பதைக் குறிக்கும்.',
        subject: 'Banking',
        difficulty: 'easy',
      },
      {
        id: 'bnk3',
        question: 'What is the repo rate?',
        questionTamil: 'ரெப்போ விகிதம் என்றால் என்ன?',
        options: [
          { en: 'Rate at which banks lend to RBI', ta: 'வங்கிகள் RBI க்கு கடன் கொடுக்கும் விகிதம்' },
          { en: 'Rate at which RBI lends to banks', ta: 'RBI வங்கிகளுக்கு கடன் கொடுக்கும் விகிதம்' },
          { en: 'Interest rate on savings', ta: 'சேமிப்பு மீதான வட்டி விகிதம்' },
          { en: 'Tax rate on deposits', ta: 'வைப்புத்தொகை மீதான வரி விகிதம்' },
        ],
        correctAnswer: 1,
        explanation: 'Repo rate is the rate at which RBI lends money to commercial banks.',
        explanationTamil: 'ரெப்போ விகிதம் என்பது RBI வணிக வங்கிகளுக்கு பணம் கடன் கொடுக்கும் விகிதம் ஆகும்.',
        subject: 'Banking',
        difficulty: 'medium',
      },
      {
        id: 'bnk4',
        question: 'PMJDY stands for:',
        questionTamil: 'PMJDY என்பது:',
        options: [
          { en: 'Pradhan Mantri Jan Dhan Yojana', ta: 'பிரதான் மந்திரி ஜன் தன் யோஜனா' },
          { en: 'Pradhan Mantri Jeevan Dhan Yojana', ta: 'பிரதான் மந்திரி ஜீவன் தன் யோஜனா' },
          { en: 'Prime Minister Jan Dhan Yojana', ta: 'பிரைம் மினிஸ்டர் ஜன் தன் யோஜனா' },
          { en: 'Pradhan Mantri Jan Dhana Yogya', ta: 'பிரதான் மந்திரி ஜன் தன யோக்யா' },
        ],
        correctAnswer: 0,
        explanation: 'PMJDY stands for Pradhan Mantri Jan Dhan Yojana, launched in 2014.',
        explanationTamil: 'PMJDY என்பது 2014 இல் தொடங்கப்பட்ட பிரதான் மந்திரி ஜன் தன் யோஜனா ஆகும்.',
        subject: 'Banking',
        difficulty: 'easy',
      },
      {
        id: 'bnk5',
        question: 'What is the minimum balance required for a regular savings account in most banks?',
        questionTamil: 'பெரும்பாலான வங்கிகளில் வழக்கமான சேமிப்பு கணக்கிற்கு தேவையான குறைந்தபட்ச இருப்பு என்ன?',
        options: [
          { en: 'Rs. 100', ta: 'ரூ. 100' },
          { en: 'Rs. 500', ta: 'ரூ. 500' },
          { en: 'Rs. 1000', ta: 'ரூ. 1000' },
          { en: 'Varies by bank', ta: 'வங்கிக்கு வங்கி மாறுபடும்' },
        ],
        correctAnswer: 3,
        explanation: 'Minimum balance requirements vary by bank and account type.',
        explanationTamil: 'குறைந்தபட்ச இருப்புத் தேவைகள் வங்கி மற்றும் கணக்கு வகையைப் பொறுத்து மாறுபடும்.',
        subject: 'Banking',
        difficulty: 'easy',
      },
    ],
  },
  {
    category: 'state',
    questions: [
      {
        id: 'tn1',
        question: 'What is the official language of Tamil Nadu?',
        questionTamil: 'தமிழ்நாட்டின் அதிகாரப்பூர்வ மொழி எது?',
        options: [
          { en: 'Hindi', ta: 'இந்தி' },
          { en: 'English', ta: 'ஆங்கிலம்' },
          { en: 'Tamil', ta: 'தமிழ்' },
          { en: 'Telugu', ta: 'தெலுங்கு' },
        ],
        correctAnswer: 2,
        explanation: 'Tamil is the official language of Tamil Nadu.',
        explanationTamil: 'தமிழ் என்பது தமிழ்நாட்டின் அதிகாரப்பூர்வ மொழி ஆகும்.',
        subject: 'General Knowledge',
        difficulty: 'easy',
      },
      {
        id: 'tn2',
        question: 'Which is the largest district in Tamil Nadu by area?',
        questionTamil: 'பரப்பளவில் தமிழ்நாட்டின் மிகப்பெரிய மாவட்டம் எது?',
        options: [
          { en: 'Chennai', ta: 'சென்னை' },
          { en: 'Villupuram', ta: 'விழுப்புரம்' },
          { en: 'Tiruvannamalai', ta: 'திருவண்ணாமலை' },
          { en: 'Dindigul', ta: 'திண்டுக்கல்' },
        ],
        correctAnswer: 1,
        explanation: 'Villupuram is the largest district in Tamil Nadu by area.',
        explanationTamil: 'விழுப்புரம் பரப்பளவில் தமிழ்நாட்டின் மிகப்பெரிய மாவட்டம் ஆகும்.',
        subject: 'Geography',
        difficulty: 'medium',
      },
      {
        id: 'tn3',
        question: 'When was TNPSC established?',
        questionTamil: 'TNPSC எப்போது நிறுவப்பட்டது?',
        options: [
          { en: '1923', ta: '1923' },
          { en: '1929', ta: '1929' },
          { en: '1947', ta: '1947' },
          { en: '1950', ta: '1950' },
        ],
        correctAnswer: 1,
        explanation: 'Tamil Nadu Public Service Commission was established in 1929.',
        explanationTamil: 'தமிழ்நாடு அரசுப் பணியாளர் தேர்வாணையம் 1929 இல் நிறுவப்பட்டது.',
        subject: 'General Knowledge',
        difficulty: 'hard',
      },
      {
        id: 'tn4',
        question: 'Which river is known as the "Ganges of the South"?',
        questionTamil: '"தெற்கின் கங்கை" என அழைக்கப்படும் நதி எது?',
        options: [
          { en: 'Krishna', ta: 'கிருஷ்ணா' },
          { en: 'Godavari', ta: 'கோதாவரி' },
          { en: 'Kaveri', ta: 'காவிரி' },
          { en: 'Tungabhadra', ta: 'துங்கபத்ரா' },
        ],
        correctAnswer: 2,
        explanation: 'River Kaveri is known as the "Ganges of the South".',
        explanationTamil: 'காவிரி நதி "தெற்கின் கங்கை" என அழைக்கப்படுகிறது.',
        subject: 'Geography',
        difficulty: 'easy',
      },
      {
        id: 'tn5',
        question: 'What is the state animal of Tamil Nadu?',
        questionTamil: 'தமிழ்நாட்டின் மாநில விலங்கு எது?',
        options: [
          { en: 'Tiger', ta: 'புலி' },
          { en: 'Elephant', ta: 'யானை' },
          { en: 'Nilgiri Tahr', ta: 'நீலகிரி வரையாடு' },
          { en: 'Lion', ta: 'சிங்கம்' },
        ],
        correctAnswer: 2,
        explanation: 'Nilgiri Tahr is the state animal of Tamil Nadu.',
        explanationTamil: 'நீலகிரி வரையாடு தமிழ்நாட்டின் மாநில விலங்கு ஆகும்.',
        subject: 'General Knowledge',
        difficulty: 'medium',
      },
    ],
  },
  {
    category: 'central',
    questions: [
      {
        id: 'cen1',
        question: 'Which ministry is responsible for conducting census in India?',
        questionTamil: 'இந்தியாவில் மக்கள்தொகை கணக்கெடுப்பு நடத்துவதற்கு எந்த அமைச்சகம் பொறுப்பு?',
        options: [
          { en: 'Ministry of Statistics', ta: 'புள்ளியியல் அமைச்சகம்' },
          { en: 'Ministry of Home Affairs', ta: 'உள்துறை அமைச்சகம்' },
          { en: 'Ministry of Finance', ta: 'நிதி அமைச்சகம்' },
          { en: 'Ministry of Planning', ta: 'திட்டமிடல் அமைச்சகம்' },
        ],
        correctAnswer: 1,
        explanation: 'Ministry of Home Affairs is responsible for conducting census in India.',
        explanationTamil: 'உள்துறை அமைச்சகம் இந்தியாவில் மக்கள்தொகை கணக்கெடுப்பு நடத்துவதற்கு பொறுப்பாகும்.',
        subject: 'Polity',
        difficulty: 'medium',
      },
      {
        id: 'cen2',
        question: 'What is the full form of FCI?',
        questionTamil: 'FCI என்பதன் முழு வடிவம் என்ன?',
        options: [
          { en: 'Food Corporation of India', ta: 'இந்திய உணவுக் கழகம்' },
          { en: 'Finance Corporation of India', ta: 'இந்திய நிதிக் கழகம்' },
          { en: 'Federal Corporation of India', ta: 'இந்திய கூட்டாட்சி கழகம்' },
          { en: 'Fertilizer Corporation of India', ta: 'இந்திய உர கழகம்' },
        ],
        correctAnswer: 0,
        explanation: 'FCI stands for Food Corporation of India, established in 1965.',
        explanationTamil: 'FCI என்பது 1965 இல் நிறுவப்பட்ட இந்திய உணவுக் கழகம் ஆகும்.',
        subject: 'General Knowledge',
        difficulty: 'easy',
      },
      {
        id: 'cen3',
        question: 'NVS stands for:',
        questionTamil: 'NVS என்பது:',
        options: [
          { en: 'National Vocational Schools', ta: 'தேசிய தொழில் பள்ளிகள்' },
          { en: 'Navodaya Vidyalaya Samiti', ta: 'நவோதயா வித்யாலயா சமிதி' },
          { en: 'National Village Schools', ta: 'தேசிய கிராம பள்ளிகள்' },
          { en: 'New Vision Schools', ta: 'புதிய பார்வை பள்ளிகள்' },
        ],
        correctAnswer: 1,
        explanation: 'NVS stands for Navodaya Vidyalaya Samiti.',
        explanationTamil: 'NVS என்பது நவோதயா வித்யாலயா சமிதி ஆகும்.',
        subject: 'General Knowledge',
        difficulty: 'easy',
      },
      {
        id: 'cen4',
        question: 'What is the retirement age for Central Government employees?',
        questionTamil: 'மத்திய அரசு ஊழியர்களின் ஓய்வு வயது என்ன?',
        options: [
          { en: '58 years', ta: '58 ஆண்டுகள்' },
          { en: '60 years', ta: '60 ஆண்டுகள்' },
          { en: '62 years', ta: '62 ஆண்டுகள்' },
          { en: '65 years', ta: '65 ஆண்டுகள்' },
        ],
        correctAnswer: 1,
        explanation: 'The retirement age for Central Government employees is 60 years.',
        explanationTamil: 'மத்திய அரசு ஊழியர்களின் ஓய்வு வயது 60 ஆண்டுகள் ஆகும்.',
        subject: 'General Knowledge',
        difficulty: 'easy',
      },
      {
        id: 'cen5',
        question: 'Which is the nodal agency for conducting examinations for Group B & C posts?',
        questionTamil: 'குரூப் B & C பதவிகளுக்கான தேர்வுகளை நடத்தும் முக்கிய நிறுவனம் எது?',
        options: [
          { en: 'UPSC', ta: 'UPSC' },
          { en: 'SSC', ta: 'SSC' },
          { en: 'IBPS', ta: 'IBPS' },
          { en: 'RRB', ta: 'RRB' },
        ],
        correctAnswer: 1,
        explanation: 'Staff Selection Commission (SSC) conducts examinations for Group B & C posts.',
        explanationTamil: 'பணியாளர் தேர்வு ஆணையம் (SSC) குரூப் B & C பதவிகளுக்கான தேர்வுகளை நடத்துகிறது.',
        subject: 'General Knowledge',
        difficulty: 'medium',
      },
    ],
  },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'defence': return Shield;
    case 'railway': return Train;
    case 'ssc': return FileText;
    case 'banking': return Landmark;
    case 'state': return MapPin;
    case 'central': return Building2;
    default: return BookOpen;
  }
};

export const GovtMockTest = () => {
  const { language } = useLanguage();
  const { addScore, totalAttempts } = useGovtMockTestScores();
  const { currentStreak, recordPractice, newAchievements, clearNewAchievements } = useStudyStreak();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [isTestActive, setIsTestActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
  const [showProgress, setShowProgress] = useState(false);
  const [showStreak, setShowStreak] = useState(false);
  const [useAI, setUseAI] = useState(false);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiQuestions, setAiQuestions] = useState<Question[]>([]);
  const startTimeRef = useRef<number>(0);
  const totalTimeRef = useRef<number>(0);

  // Function to fetch AI-generated questions
  const fetchAIQuestions = useCallback(async (category: CategoryType) => {
    setIsLoadingAI(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-govt-questions', {
        body: { category, count: 10 }
      });

      if (error) {
        console.error('AI Question generation error:', error);
        toast.error(language === 'ta' 
          ? 'AI கேள்விகளை உருவாக்க முடியவில்லை. நிலையான கேள்விகளைப் பயன்படுத்துகிறோம்.'
          : 'Failed to generate AI questions. Using standard questions.');
        return null;
      }

      if (data?.questions && Array.isArray(data.questions)) {
        toast.success(language === 'ta'
          ? `${data.questions.length} AI கேள்விகள் உருவாக்கப்பட்டன!`
          : `${data.questions.length} AI questions generated!`);
        return data.questions as Question[];
      }
      
      return null;
    } catch (err) {
      console.error('AI fetch error:', err);
      toast.error(language === 'ta'
        ? 'AI சேவை கிடைக்கவில்லை.'
        : 'AI service unavailable.');
      return null;
    } finally {
      setIsLoadingAI(false);
    }
  }, [language]);

  const currentQuestions = useMemo(() => {
    if (!selectedCategory) return [];
    
    // Use AI questions if available and AI mode is active
    if (useAI && aiQuestions.length > 0) {
      return aiQuestions;
    }
    
    return mockTestQuestions.find(c => c.category === selectedCategory)?.questions || [];
  }, [selectedCategory, useAI, aiQuestions]);

  const currentQuestion = currentQuestions[currentQuestionIndex];

  // Timer
  useEffect(() => {
    if (!isTestActive || showResults) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setShowResults(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTestActive, showResults]);

  const startTest = useCallback(async (category: CategoryType) => {
    setSelectedCategory(category);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setFlaggedQuestions(new Set());
    setShowProgress(false);
    
    // If AI mode is enabled, fetch AI questions first
    if (useAI) {
      const questions = await fetchAIQuestions(category);
      if (questions) {
        setAiQuestions(questions);
      } else {
        // Fallback to static questions if AI fails
        setAiQuestions([]);
      }
    } else {
      setAiQuestions([]);
    }
    
    setIsTestActive(true);
    const testTime = 5 * 60; // 5 minutes
    setTimeLeft(testTime);
    startTimeRef.current = Date.now();
    totalTimeRef.current = testTime;
  }, [useAI, fetchAIQuestions]);

  const handleAnswer = (questionId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const toggleFlag = (questionId: string) => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const submitTest = async () => {
    setShowResults(true);
    const timeTaken = Math.floor((Date.now() - startTimeRef.current) / 1000);
    
    // Record practice for streak tracking
    recordPractice();
    
    // Calculate detailed results
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;
    const subjectWise: Record<string, { total: number; correct: number }> = {};
    const difficultyWise: Record<string, { total: number; correct: number }> = {};

    currentQuestions.forEach(q => {
      // Subject tracking
      if (!subjectWise[q.subject]) {
        subjectWise[q.subject] = { total: 0, correct: 0 };
      }
      subjectWise[q.subject].total++;

      // Difficulty tracking
      if (!difficultyWise[q.difficulty]) {
        difficultyWise[q.difficulty] = { total: 0, correct: 0 };
      }
      difficultyWise[q.difficulty].total++;

      // Answer tracking
      if (selectedAnswers[q.id] === undefined) {
        unattempted++;
      } else if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
        subjectWise[q.subject].correct++;
        difficultyWise[q.difficulty].correct++;
      } else {
        incorrect++;
      }
    });

    const percentage = Math.round((correct / currentQuestions.length) * 100);

    // Save score to localStorage
    addScore({
      category: selectedCategory!,
      categoryLabel: categoryInfo[selectedCategory!]?.label || selectedCategory!,
      totalQuestions: currentQuestions.length,
      correct,
      incorrect,
      unattempted,
      percentage,
      timeTaken,
      timeAllotted: totalTimeRef.current,
      subjectWise,
      difficultyWise,
    });

    // Save score to leaderboard database
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Get display name from profile or use anonymous
      let displayName = 'Anonymous';
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('display_name')
          .eq('user_id', user.id)
          .single();
        
        if (profile?.display_name) {
          displayName = profile.display_name;
        }
      }
      
      const { error } = await supabase
        .from('govt_mock_test_scores')
        .insert({
          user_id: user?.id || null,
          display_name: displayName,
          category: selectedCategory!,
          score: correct,
          total_questions: currentQuestions.length,
          accuracy: percentage,
          time_taken: timeTaken,
        });

      if (error) {
        console.error('Error saving score to leaderboard:', error);
      } else {
        toast.success(
          language === 'ta' 
            ? 'உங்கள் மதிப்பெண் லீடர்போர்டில் சேர்க்கப்பட்டது!' 
            : 'Your score has been added to the leaderboard!'
        );
      }
    } catch (err) {
      console.error('Error saving to leaderboard:', err);
    }
    
    if (correct === currentQuestions.length) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const resetTest = () => {
    setIsTestActive(false);
    setSelectedCategory(null);
    setShowResults(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setFlaggedQuestions(new Set());
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const score = useMemo(() => {
    return currentQuestions.reduce((acc, q) => {
      return acc + (selectedAnswers[q.id] === q.correctAnswer ? 1 : 0);
    }, 0);
  }, [currentQuestions, selectedAnswers]);

  const percentage = currentQuestions.length > 0 ? Math.round((score / currentQuestions.length) * 100) : 0;

  if (!isTestActive) {
    if (showProgress) {
      return (
        <div className="space-y-4">
          <Button 
            variant="outline" 
            onClick={() => setShowProgress(false)}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            {language === 'ta' ? 'திரும்பு' : 'Back to Tests'}
          </Button>
          <GovtMockTestProgress />
        </div>
      );
    }

    if (showStreak) {
      return (
        <div className="space-y-4">
          <Button 
            variant="outline" 
            onClick={() => setShowStreak(false)}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            {language === 'ta' ? 'திரும்பு' : 'Back to Tests'}
          </Button>
          <StudyStreakDisplay />
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {/* Streak Banner */}
        <Card 
          className="border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 cursor-pointer hover:shadow-sm transition-shadow"
          onClick={() => setShowStreak(true)}
        >
          <CardContent className="py-3 px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${currentStreak > 0 ? 'bg-orange-100' : 'bg-gray-100'}`}>
                  <Flame className={`h-5 w-5 ${currentStreak > 0 ? 'text-orange-500' : 'text-gray-400'}`} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {currentStreak} {language === 'ta' ? 'நாள் தொடர்' : 'Day Streak'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {language === 'ta' ? 'சாதனைகளைப் பார்க்க தட்டவும்' : 'Tap to view achievements'}
                  </p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-violet-200 bg-gradient-to-br from-violet-50/50 to-purple-50/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                {language === 'ta' ? 'அரசு தேர்வு மாக் டெஸ்ட்' : 'Government Exam Mock Test'}
              </CardTitle>
              {totalAttempts > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowProgress(true)}
                  className="gap-2 bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100"
                >
                  <BarChart3 className="h-4 w-4" />
                  {language === 'ta' ? 'முன்னேற்றம்' : 'Progress'}
                  <Badge variant="secondary" className="ml-1 bg-indigo-100 text-indigo-600">
                    {totalAttempts}
                  </Badge>
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              {language === 'ta' 
                ? 'வகை வாரியான பயிற்சி கேள்விகளுடன் அரசு தேர்வுகளுக்கு தயாராகுங்கள்'
                : 'Prepare for government exams with category-wise practice questions'}
            </p>

            {/* AI Toggle */}
            <div className="flex items-center justify-between p-4 mb-6 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <Label htmlFor="ai-mode" className="font-semibold text-gray-800 cursor-pointer">
                    {language === 'ta' ? 'AI கேள்விகள்' : 'AI Questions'}
                  </Label>
                  <p className="text-xs text-gray-500">
                    {language === 'ta' 
                      ? 'AI மூலம் புதிய கேள்விகளை உருவாக்கவும்'
                      : 'Generate fresh questions using AI'}
                  </p>
                </div>
              </div>
              <Switch
                id="ai-mode"
                checked={useAI}
                onCheckedChange={setUseAI}
                className="data-[state=checked]:bg-purple-600"
              />
            </div>

            {isLoadingAI && (
              <div className="flex items-center justify-center gap-3 p-6 mb-6 rounded-xl bg-purple-50 border border-purple-200">
                <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
                <span className="text-purple-700 font-medium">
                  {language === 'ta' 
                    ? 'AI கேள்விகளை உருவாக்குகிறது...'
                    : 'Generating AI questions...'}
                </span>
              </div>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {mockTestQuestions.map((cat) => {
                const Icon = getCategoryIcon(cat.category);
                const info = categoryInfo[cat.category];
                return (
                  <motion.button
                    key={cat.category}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => startTest(cat.category)}
                    disabled={isLoadingAI}
                    className={`p-4 rounded-xl border-2 ${info?.bgColor} ${info?.borderColor} hover:shadow-lg transition-all text-left ${isLoadingAI ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-5 w-5" style={{ color: info?.borderColor?.replace('border-', '') }} />
                      <span className="text-xl">{info?.emoji}</span>
                      {useAI && (
                        <Sparkles className="h-3 w-3 text-purple-500" />
                      )}
                    </div>
                    <h4 className="font-semibold text-gray-800 text-sm">
                      {info?.label}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {useAI 
                        ? (language === 'ta' ? '10 AI கேள்விகள்' : '10 AI Questions')
                        : `${cat.questions.length} ${language === 'ta' ? 'கேள்விகள்' : 'Questions'}`
                      }
                    </p>
                    <div className="mt-2 flex items-center gap-1">
                      <Play className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">
                        {language === 'ta' ? 'தொடங்கு' : 'Start'}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults) {
    return (
      <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50/50 to-green-50/50">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4">
            {percentage >= 80 ? (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
                <Trophy className="h-10 w-10 text-white" />
              </div>
            ) : percentage >= 50 ? (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                <Award className="h-10 w-10 text-white" />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                <Target className="h-10 w-10 text-white" />
              </div>
            )}
          </div>
          <CardTitle className="text-2xl">
            {language === 'ta' ? 'டெஸ்ட் முடிவுகள்' : 'Test Results'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-gray-800">{score}/{currentQuestions.length}</div>
            <div className="text-xl text-gray-600 mt-1">{percentage}%</div>
            <div className="mt-2">
              {percentage >= 80 ? (
                <Badge className="bg-yellow-100 text-yellow-700">🏆 {language === 'ta' ? 'சிறப்பு!' : 'Excellent!'}</Badge>
              ) : percentage >= 50 ? (
                <Badge className="bg-green-100 text-green-700">✅ {language === 'ta' ? 'நல்லது!' : 'Good!'}</Badge>
              ) : (
                <Badge className="bg-blue-100 text-blue-700">📚 {language === 'ta' ? 'மேலும் பயிற்சி செய்' : 'Keep Practicing!'}</Badge>
              )}
            </div>
          </div>

          <ScrollArea className="h-80 pr-4">
            <div className="space-y-4">
              {currentQuestions.map((q, index) => {
                const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
                const userAnswer = selectedAnswers[q.id];
                
                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border-2 ${
                      isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isCorrect ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {isCorrect ? (
                          <CheckCircle2 className="h-5 w-5 text-white" />
                        ) : (
                          <XCircle className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-sm">
                          Q{index + 1}. {language === 'ta' ? q.questionTamil : q.question}
                        </h4>
                        <div className="mt-2 space-y-1 text-sm">
                          {userAnswer !== undefined && userAnswer !== q.correctAnswer && (
                            <p className="text-red-600">
                              {language === 'ta' ? 'உங்கள் பதில்' : 'Your answer'}: {q.options[userAnswer]?.[language === 'ta' ? 'ta' : 'en']}
                            </p>
                          )}
                          <p className="text-green-600 font-medium">
                            {language === 'ta' ? 'சரியான பதில்' : 'Correct'}: {q.options[q.correctAnswer][language === 'ta' ? 'ta' : 'en']}
                          </p>
                          <p className="text-gray-600 text-xs mt-2 italic">
                            💡 {language === 'ta' ? q.explanationTamil : q.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          <div className="flex gap-3 mt-6">
            <Button onClick={resetTest} variant="outline" className="flex-1 gap-2">
              <RotateCcw className="h-4 w-4" />
              {language === 'ta' ? 'புதிய தேர்வு' : 'New Test'}
            </Button>
            <Button 
              onClick={() => generateMockTestPDF({
                category: selectedCategory!,
                questions: currentQuestions,
                selectedAnswers,
                score,
                totalQuestions: currentQuestions.length,
                timeTaken: 300 - timeLeft,
                language
              })}
              variant="outline" 
              className="flex-1 gap-2"
            >
              <Download className="h-4 w-4" />
              {language === 'ta' ? 'PDF பதிவிறக்கம்' : 'Download PDF'}
            </Button>
            <Button onClick={() => startTest(selectedCategory!)} className="flex-1 gap-2">
              <Zap className="h-4 w-4" />
              {language === 'ta' ? 'மீண்டும் முயற்சி' : 'Retry'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-blue-200">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <span>{categoryInfo[selectedCategory!]?.emoji}</span>
            {categoryInfo[selectedCategory!]?.label}
          </CardTitle>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
            timeLeft <= 60 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
          }`}>
            <Clock className="h-4 w-4" />
            <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
          </div>
        </div>
        <Progress 
          value={(currentQuestionIndex + 1) / currentQuestions.length * 100} 
          className="h-2 mt-2" 
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{language === 'ta' ? 'கேள்வி' : 'Question'} {currentQuestionIndex + 1}/{currentQuestions.length}</span>
          <span>{Object.keys(selectedAnswers).length} {language === 'ta' ? 'பதிலளிக்கப்பட்டது' : 'answered'}</span>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        {currentQuestion && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold text-gray-800">
                  {language === 'ta' ? currentQuestion.questionTamil : currentQuestion.question}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFlag(currentQuestion.id)}
                  className={flaggedQuestions.has(currentQuestion.id) ? 'text-amber-500' : 'text-gray-400'}
                >
                  <Flag className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswers[currentQuestion.id] === index;
                  return (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(currentQuestion.id, index)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className={isSelected ? 'text-blue-700' : 'text-gray-700'}>
                          {language === 'ta' ? option.ta : option.en}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  📚 {currentQuestion.subject}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    currentQuestion.difficulty === 'easy' ? 'text-green-600' :
                    currentQuestion.difficulty === 'medium' ? 'text-amber-600' : 'text-red-600'
                  }`}
                >
                  {currentQuestion.difficulty === 'easy' ? '🟢' : currentQuestion.difficulty === 'medium' ? '🟡' : '🔴'} 
                  {currentQuestion.difficulty}
                </Badge>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            {language === 'ta' ? 'முந்தைய' : 'Previous'}
          </Button>
          
          {currentQuestionIndex < currentQuestions.length - 1 ? (
            <Button
              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
              className="flex-1 gap-2"
            >
              {language === 'ta' ? 'அடுத்து' : 'Next'}
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={submitTest}
              className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle2 className="h-4 w-4" />
              {language === 'ta' ? 'சமர்ப்பி' : 'Submit Test'}
            </Button>
          )}
        </div>

        {/* Question Navigation */}
        <div className="mt-6 pt-4 border-t">
          <p className="text-xs text-gray-500 mb-2">{language === 'ta' ? 'விரைவு வழிசெலுத்தல்' : 'Quick Navigation'}</p>
          <div className="flex flex-wrap gap-2">
            {currentQuestions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                  index === currentQuestionIndex
                    ? 'bg-blue-600 text-white'
                    : selectedAnswers[q.id] !== undefined
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : flaggedQuestions.has(q.id)
                    ? 'bg-amber-100 text-amber-700 border border-amber-300'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
