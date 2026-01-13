// Comprehensive Government Exams Data for 12th Pass Students

export interface Question {
  id: string;
  question: string;
  questionTamil?: string;
  options: string[];
  optionsTamil?: string[];
  answer: number;
  explanation: string;
  explanationTamil?: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Topic {
  name: string;
  nameTamil: string;
  subtopics: string[];
  subtopicsTamil?: string[];
}

export interface SyllabusSection {
  name: string;
  nameTamil: string;
  topics: Topic[];
}

export interface Syllabus {
  [key: string]: SyllabusSection[];
}

export interface ExamPattern {
  paper: string;
  paperTamil: string;
  marks: number;
  duration: string;
  questions: number;
}

export interface Exam {
  id: string;
  name: string;
  nameTamil: string;
  qualification: string;
  qualificationTamil: string;
  age: string;
  salary: string;
  selectionProcess: string;
  selectionProcessTamil: string;
  posts?: string[];
  postsTamil?: string[];
  examPattern?: ExamPattern[];
  syllabus: Syllabus;
  pyq: Question[];
}

export interface Category {
  id: string;
  name: string;
  nameTamil: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  exams: Exam[];
}

// ==================== DEFENCE & PARAMILITARY ====================
const defenceExams: Exam[] = [
  {
    id: 'nda',
    name: 'NDA (National Defence Academy)',
    nameTamil: 'NDA (தேசிய பாதுகாப்பு அகாடமி)',
    qualification: '12th Pass (PCM for Navy/Air Force)',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி (கடற்படை/விமானப்படைக்கு PCM)',
    age: '16.5 - 19.5 years',
    salary: '₹56,100/month',
    selectionProcess: 'Written Exam → SSB Interview → Medical',
    selectionProcessTamil: 'எழுத்துத் தேர்வு → SSB நேர்காணல் → மருத்துவப் பரிசோதனை',
    examPattern: [
      { paper: 'Mathematics', paperTamil: 'கணிதம்', marks: 300, duration: '2.5 hours', questions: 120 },
      { paper: 'General Ability Test', paperTamil: 'பொது திறன் தேர்வு', marks: 600, duration: '2.5 hours', questions: 150 }
    ],
    syllabus: {
      mathematics: [
        {
          name: 'Paper 1: Mathematics (300 Marks)',
          nameTamil: 'தாள் 1: கணிதம் (300 மதிப்பெண்கள்)',
          topics: [
            { name: 'Algebra', nameTamil: 'இயற்கணிதம்', subtopics: ['Sets, Relations, Functions', 'Complex Numbers', 'Quadratic Equations', 'Permutation & Combination', 'Binomial Theorem', 'Logarithms', 'Sequences & Series'] },
            { name: 'Matrices & Determinants', nameTamil: 'அணிகள் & அணிக்கோவைகள்', subtopics: ['Types of Matrices', 'Matrix Operations', 'Determinants', 'Cramers Rule', 'Inverse of Matrix'] },
            { name: 'Trigonometry', nameTamil: 'முக்கோணவியல்', subtopics: ['Angles & Measurements', 'Trigonometric Ratios', 'Identities', 'Inverse Functions', 'Heights & Distances', 'Properties of Triangles'] },
            { name: 'Analytical Geometry 2D', nameTamil: '2D பகுப்பாய்வு வடிவியல்', subtopics: ['Straight Lines', 'Circle', 'Parabola', 'Ellipse', 'Hyperbola', 'Coordinate Geometry'] },
            { name: 'Analytical Geometry 3D', nameTamil: '3D பகுப்பாய்வு வடிவியல்', subtopics: ['Distance Formula', 'Direction Cosines', 'Equation of Plane', 'Straight Line in Space'] },
            { name: 'Differential Calculus', nameTamil: 'வகையீட்டுக் கணிதம்', subtopics: ['Limits', 'Continuity', 'Differentiation', 'Application of Derivatives', 'Maxima & Minima'] },
            { name: 'Integral Calculus', nameTamil: 'தொகையீட்டுக் கணிதம்', subtopics: ['Integration Methods', 'Definite Integrals', 'Area under Curves', 'Differential Equations'] },
            { name: 'Vector Algebra', nameTamil: 'வெக்டர் இயற்கணிதம்', subtopics: ['Vector Operations', 'Scalar Product', 'Vector Product', 'Applications'] },
            { name: 'Statistics & Probability', nameTamil: 'புள்ளியியல் & நிகழ்தகவு', subtopics: ['Mean, Median, Mode', 'Variance, Standard Deviation', 'Probability Basics', 'Conditional Probability'] }
          ]
        }
      ],
      generalAbility: [
        {
          name: 'Paper 2: General Ability Test (600 Marks)',
          nameTamil: 'தாள் 2: பொது திறன் தேர்வு (600 மதிப்பெண்கள்)',
          topics: [
            { name: 'English (200 Marks)', nameTamil: 'ஆங்கிலம் (200 மதிப்பெண்கள்)', subtopics: ['Grammar & Usage', 'Vocabulary', 'Comprehension', 'Sentence Correction', 'Synonyms & Antonyms', 'Idioms & Phrases', 'Spotting Errors'] },
            { name: 'General Knowledge (400 Marks)', nameTamil: 'பொது அறிவு (400 மதிப்பெண்கள்)', subtopics: ['Physics: Mechanics, Heat, Optics, Electricity, Modern Physics', 'Chemistry: Physical, Organic, Inorganic Chemistry', 'Biology: Botany, Zoology, Human Physiology', 'History: Ancient, Medieval, Modern India, World History', 'Geography: Physical, Indian, World Geography', 'Current Affairs: National & International Events'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'nda-math-1', question: 'If sin θ + cos θ = √2, then tan θ + cot θ = ?', questionTamil: 'sin θ + cos θ = √2 எனில், tan θ + cot θ = ?', options: ['1', '2', '√2', '2√2'], answer: 1, explanation: 'sin θ + cos θ = √2 means θ = 45°. tan 45° + cot 45° = 1 + 1 = 2', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'nda-math-2', question: 'The number of ways to arrange the letters of the word "MATHEMATICS" is:', questionTamil: '"MATHEMATICS" என்ற வார்த்தையின் எழுத்துக்களை வரிசைப்படுத்தும் வழிகளின் எண்ணிக்கை:', options: ['11!/2!2!2!', '11!/2!2!', '11!/2!', '11!'], answer: 0, explanation: 'MATHEMATICS has 11 letters with M(2), A(2), T(2) repeating. So 11!/(2!×2!×2!)', subject: 'Mathematics', difficulty: 'hard' },
      { id: 'nda-math-3', question: 'If A = [1 2; 3 4], then A² - 5A + 4I = ?', options: ['0', 'I', 'A', '2A'], answer: 0, explanation: 'Using Cayley-Hamilton theorem, the characteristic equation gives A² - 5A + 4I = 0', subject: 'Mathematics', difficulty: 'hard' },
      { id: 'nda-math-4', question: 'The area bounded by y = x², x-axis, x = 1 and x = 2 is:', options: ['7/3 sq units', '8/3 sq units', '3 sq units', '7 sq units'], answer: 0, explanation: 'Area = ∫₁² x² dx = [x³/3]₁² = 8/3 - 1/3 = 7/3', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'nda-math-5', question: 'Two dice are thrown. Probability of getting sum 7 is:', questionTamil: 'இரு பகடைகள் எறியப்படுகின்றன. கூட்டுத்தொகை 7 கிடைக்கும் நிகழ்தகவு:', options: ['1/6', '5/36', '1/12', '7/36'], answer: 0, explanation: 'Favorable outcomes: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6. Total = 36. P = 6/36 = 1/6', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'nda-math-6', question: 'The value of lim(x→0) (sin x)/x is:', options: ['1', '0', '∞', '-1'], answer: 0, explanation: 'Standard limit: lim(x→0) sin x/x = 1', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'nda-math-7', question: 'If log₁₀2 = 0.3010, then log₁₀8 = ?', options: ['0.9030', '0.6020', '0.3010', '2.4080'], answer: 0, explanation: 'log₁₀8 = log₁₀2³ = 3×log₁₀2 = 3×0.3010 = 0.9030', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'nda-math-8', question: 'The derivative of x³ + 3x² + 3x + 1 at x = -1 is:', options: ['0', '1', '2', '3'], answer: 0, explanation: "f'(x) = 3x² + 6x + 3. At x = -1: f'(-1) = 3 - 6 + 3 = 0", subject: 'Mathematics', difficulty: 'medium' },
      { id: 'nda-math-9', question: 'In a GP, if a = 2 and r = 3, the 5th term is:', options: ['162', '81', '243', '54'], answer: 0, explanation: '5th term = ar⁴ = 2 × 3⁴ = 2 × 81 = 162', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'nda-math-10', question: 'The distance between points (2,3) and (5,7) is:', options: ['5', '4', '6', '7'], answer: 0, explanation: 'd = √[(5-2)² + (7-3)²] = √[9+16] = √25 = 5', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'nda-gk-1', question: 'The chemical formula of Washing Soda is:', questionTamil: 'சலவை சோடாவின் வேதிச் சூத்திரம்:', options: ['Na₂CO₃', 'NaHCO₃', 'Na₂CO₃.10H₂O', 'CaCO₃'], answer: 2, explanation: 'Washing Soda is Sodium Carbonate Decahydrate - Na₂CO₃.10H₂O', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'nda-gk-2', question: 'Who was the founder of the Maurya Empire?', questionTamil: 'மௌரிய பேரரசை நிறுவியவர் யார்?', options: ['Ashoka', 'Bindusara', 'Chandragupta Maurya', 'Bimbisara'], answer: 2, explanation: 'Chandragupta Maurya founded the Maurya Empire in 321 BCE with help from Chanakya', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'nda-gk-3', question: 'The Palk Strait separates India from:', options: ['Sri Lanka', 'Maldives', 'Bangladesh', 'Myanmar'], answer: 0, explanation: 'Palk Strait is between Tamil Nadu (India) and northern Sri Lanka', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'nda-gk-4', question: 'The Battle of Plassey was fought in:', options: ['1757', '1764', '1857', '1947'], answer: 0, explanation: 'Battle of Plassey (1757) - Robert Clive defeated Siraj-ud-Daulah', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'nda-gk-5', question: 'Which planet is known as the "Red Planet"?', options: ['Mars', 'Jupiter', 'Venus', 'Saturn'], answer: 0, explanation: 'Mars appears red due to iron oxide (rust) on its surface', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'nda-eng-1', question: 'Choose the correct synonym of "ABUNDANT":', options: ['Scarce', 'Plentiful', 'Limited', 'Rare'], answer: 1, explanation: 'Abundant means existing in large quantities; plentiful', subject: 'English', difficulty: 'easy' },
      { id: 'nda-eng-2', question: 'Choose the correct antonym of "ANCIENT":', options: ['Old', 'Antique', 'Modern', 'Historic'], answer: 2, explanation: 'Ancient means very old; its opposite is Modern (new/recent)', subject: 'English', difficulty: 'easy' },
      { id: 'nda-eng-3', question: 'One word for "A person who loves books":', options: ['Bibliophile', 'Philatelist', 'Numismatist', 'Connoisseur'], answer: 0, explanation: 'Bibliophile = book lover. Philatelist = stamp collector. Numismatist = coin collector', subject: 'English', difficulty: 'medium' },
      { id: 'nda-eng-4', question: 'Idiom "To burn the midnight oil" means:', options: ['To waste oil', 'To work late at night', 'To sleep', 'To waste time'], answer: 1, explanation: 'It means to work or study late into the night', subject: 'English', difficulty: 'easy' },
      { id: 'nda-eng-5', question: 'Spot the error: "He has been working (a)/ in this office (b)/ since five years (c)/ No error (d)"', options: ['a', 'b', 'c', 'd'], answer: 2, explanation: '"Since" is used for point of time. "For" is used for period of time. Correct: "for five years"', subject: 'English', difficulty: 'medium' },
      // Additional NDA Mathematics PYQ
      { id: 'nda-math-11', question: 'The equation of circle with centre (2, 3) and radius 5 is:', questionTamil: 'மையம் (2, 3) மற்றும் ஆரம் 5 கொண்ட வட்டத்தின் சமன்பாடு:', options: ['(x-2)² + (y-3)² = 25', '(x+2)² + (y+3)² = 25', 'x² + y² = 25', '(x-2)² + (y-3)² = 5'], optionsTamil: ['(x-2)² + (y-3)² = 25', '(x+2)² + (y+3)² = 25', 'x² + y² = 25', '(x-2)² + (y-3)² = 5'], answer: 0, explanation: 'Circle equation: (x-h)² + (y-k)² = r² where (h,k) is centre', explanationTamil: 'வட்ட சமன்பாடு: (x-h)² + (y-k)² = r² இங்கு (h,k) மையம்', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'nda-math-12', question: 'If f(x) = x³ - 3x² + 3x - 1, then f(1) = ?', questionTamil: 'f(x) = x³ - 3x² + 3x - 1 எனில், f(1) = ?', options: ['0', '1', '-1', '2'], optionsTamil: ['0', '1', '-1', '2'], answer: 0, explanation: 'f(1) = 1 - 3 + 3 - 1 = 0. Also note f(x) = (x-1)³', explanationTamil: 'f(1) = 1 - 3 + 3 - 1 = 0. மேலும் f(x) = (x-1)³', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'nda-math-13', question: 'The value of ∫₀^π sin x dx is:', questionTamil: '∫₀^π sin x dx இன் மதிப்பு:', options: ['2', '0', '1', 'π'], optionsTamil: ['2', '0', '1', 'π'], answer: 0, explanation: '∫₀^π sin x dx = [-cos x]₀^π = -cos π + cos 0 = 1 + 1 = 2', explanationTamil: '∫₀^π sin x dx = [-cos x]₀^π = -cos π + cos 0 = 1 + 1 = 2', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'nda-math-14', question: 'If |a| = 3, |b| = 4 and a.b = 0, then |a × b| = ?', questionTamil: '|a| = 3, |b| = 4 மற்றும் a.b = 0 எனில், |a × b| = ?', options: ['12', '7', '1', '0'], optionsTamil: ['12', '7', '1', '0'], answer: 0, explanation: 'a.b = 0 means θ = 90°. |a × b| = |a||b|sin90° = 3×4×1 = 12', explanationTamil: 'a.b = 0 என்றால் θ = 90°. |a × b| = |a||b|sin90° = 3×4×1 = 12', subject: 'Mathematics', difficulty: 'hard' },
      { id: 'nda-math-15', question: 'Number of ways to select 3 books from 5 different books is:', questionTamil: '5 வெவ்வேறு புத்தகங்களிலிருந்து 3 புத்தகங்களைத் தேர்ந்தெடுக்கும் வழிகள்:', options: ['10', '60', '15', '20'], optionsTamil: ['10', '60', '15', '20'], answer: 0, explanation: '⁵C₃ = 5!/(3!×2!) = 10', explanationTamil: '⁵C₃ = 5!/(3!×2!) = 10', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'nda-math-16', question: 'The direction cosines of x-axis are:', questionTamil: 'x-அச்சின் திசைக் கொசைன்கள்:', options: ['(1, 0, 0)', '(0, 1, 0)', '(0, 0, 1)', '(1, 1, 1)'], optionsTamil: ['(1, 0, 0)', '(0, 1, 0)', '(0, 0, 1)', '(1, 1, 1)'], answer: 0, explanation: 'x-axis makes 0° with itself, 90° with y and z axes', explanationTamil: 'x-அச்சு தன்னுடன் 0°, y மற்றும் z அச்சுகளுடன் 90° கோணம் செய்கிறது', subject: 'Mathematics', difficulty: 'medium' },
      // Additional NDA General Knowledge PYQ
      { id: 'nda-gk-6', question: 'Who was the first Chief of Defence Staff (CDS) of India?', questionTamil: 'இந்தியாவின் முதல் பாதுகாப்புத் தலைமை அதிகாரி (CDS) யார்?', options: ['Gen. Bipin Rawat', 'Gen. M.M. Naravane', 'Gen. V.K. Singh', 'Gen. Anil Chauhan'], optionsTamil: ['ஜெனரல் பிபின் ராவத்', 'ஜெனரல் எம்.எம். நரவணே', 'ஜெனரல் வி.கே. சிங்', 'ஜெனரல் அனில் சவுகான்'], answer: 0, explanation: 'General Bipin Rawat was appointed first CDS on 31 December 2019', explanationTamil: 'ஜெனரல் பிபின் ராவத் 2019 டிசம்பர் 31 அன்று முதல் CDS ஆக நியமிக்கப்பட்டார்', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'nda-gk-7', question: 'National Defence Academy is located at:', questionTamil: 'தேசிய பாதுகாப்பு அகாடமி அமைந்துள்ள இடம்:', options: ['Khadakwasla, Pune', 'Dehradun', 'Chennai', 'Wellington'], optionsTamil: ['கடக்வாசலா, புனே', 'தேராடூன்', 'சென்னை', 'வெலிங்டன்'], answer: 0, explanation: 'NDA is located at Khadakwasla near Pune, Maharashtra', explanationTamil: 'NDA மகாராஷ்டிராவில் புனேக்கு அருகில் கடக்வாசலாவில் உள்ளது', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'nda-gk-8', question: 'Which river flows through the Grand Canyon?', questionTamil: 'கிராண்ட் கேன்யன் வழியாக பாயும் நதி:', options: ['Colorado River', 'Mississippi River', 'Amazon River', 'Nile River'], optionsTamil: ['கொலராடோ நதி', 'மிசிசிப்பி நதி', 'அமேசான் நதி', 'நைல் நதி'], answer: 0, explanation: 'Colorado River carved the Grand Canyon over millions of years', explanationTamil: 'கொலராடோ நதி பல மில்லியன் ஆண்டுகளாக கிராண்ட் கேன்யனை உருவாக்கியது', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'nda-gk-9', question: 'The Poona Pact was signed between:', questionTamil: 'பூனா ஒப்பந்தம் யாருக்கிடையில் கையெழுத்தானது:', options: ['Gandhi and Ambedkar', 'Nehru and Jinnah', 'Gandhi and Irwin', 'Nehru and Mountbatten'], optionsTamil: ['காந்தி மற்றும் அம்பேத்கர்', 'நேரு மற்றும் ஜின்னா', 'காந்தி மற்றும் இர்வின்', 'நேரு மற்றும் மவுண்ட்பேட்டன்'], answer: 0, explanation: 'Poona Pact (1932) was signed between Mahatma Gandhi and Dr. B.R. Ambedkar', explanationTamil: 'பூனா ஒப்பந்தம் (1932) மகாத்மா காந்தி மற்றும் டாக்டர் பி.ஆர். அம்பேத்கர் இடையே கையெழுத்தானது', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'nda-gk-10', question: 'Which metal is liquid at room temperature?', questionTamil: 'அறை வெப்பநிலையில் திரவமாக இருக்கும் உலோகம்:', options: ['Mercury', 'Sodium', 'Potassium', 'Lead'], optionsTamil: ['பாதரசம்', 'சோடியம்', 'பொட்டாசியம்', 'ஈயம்'], answer: 0, explanation: 'Mercury (Hg) is liquid at room temperature with melting point -39°C', explanationTamil: 'பாதரசம் (Hg) அறை வெப்பநிலையில் திரவம், உருகுநிலை -39°C', subject: 'General Knowledge', difficulty: 'easy' },
      // Additional NDA English PYQ
      { id: 'nda-eng-6', question: 'Choose the correct synonym of "VALIANT":', questionTamil: '"VALIANT" என்பதன் சரியான ஒத்த சொல்:', options: ['Brave', 'Cowardly', 'Weak', 'Timid'], optionsTamil: ['வீரமான', 'கோழையான', 'பலவீனமான', 'பயந்த'], answer: 0, explanation: 'Valiant means showing courage; brave', explanationTamil: 'Valiant என்றால் தைரியம் காட்டுவது; வீரமான', subject: 'English', difficulty: 'easy' },
      { id: 'nda-eng-7', question: 'Choose the correct antonym of "PROFOUND":', questionTamil: '"PROFOUND" என்பதன் சரியான எதிர்ச்சொல்:', options: ['Superficial', 'Deep', 'Intense', 'Serious'], optionsTamil: ['மேலோட்டமான', 'ஆழமான', 'தீவிரமான', 'தீவிரமான'], answer: 0, explanation: 'Profound means deep; opposite is superficial (shallow)', explanationTamil: 'Profound என்றால் ஆழமான; எதிர்ச்சொல் superficial (மேலோட்டமான)', subject: 'English', difficulty: 'medium' },
      { id: 'nda-eng-8', question: 'One word for "A soldier who fights for any country that pays":', questionTamil: '"பணம் தரும் எந்த நாட்டிற்கும் போராடும் சிப்பாய்" என்பதற்கான ஒரு சொல்:', options: ['Mercenary', 'Patriot', 'Volunteer', 'Conscript'], optionsTamil: ['கூலிப்படை வீரன்', 'தேசபக்தன்', 'தன்னார்வலர்', 'கட்டாய ஆள்'], answer: 0, explanation: 'Mercenary is a soldier who fights for payment, not patriotism', explanationTamil: 'Mercenary என்பது தேசபக்திக்காக அல்ல, பணத்திற்காக போராடும் சிப்பாய்', subject: 'English', difficulty: 'medium' },
      { id: 'nda-eng-9', question: 'Idiom "To show white feather" means:', questionTamil: '"To show white feather" என்ற மரபுத்தொடரின் பொருள்:', options: ['To show cowardice', 'To show bravery', 'To surrender', 'To celebrate'], optionsTamil: ['கோழைத்தனம் காட்டுவது', 'வீரம் காட்டுவது', 'சரணடைவது', 'கொண்டாடுவது'], answer: 0, explanation: 'White feather symbolizes cowardice in military context', explanationTamil: 'வெள்ளை இறகு ராணுவ சூழலில் கோழைத்தனத்தை குறிக்கிறது', subject: 'English', difficulty: 'hard' },
      { id: 'nda-eng-10', question: 'Fill in the blank: "The regiment _____ marching for hours."', questionTamil: 'இடைவெளியை நிரப்புக: "The regiment _____ marching for hours."', options: ['has been', 'have been', 'is', 'are'], optionsTamil: ['has been', 'have been', 'is', 'are'], answer: 0, explanation: 'Regiment is collective noun, takes singular verb', explanationTamil: 'Regiment கூட்டுப் பெயர்ச்சொல், ஒருமை வினைச்சொல் எடுக்கும்', subject: 'English', difficulty: 'medium' }
    ]
  },
  {
    id: 'agniveer-army',
    name: 'Agniveer Army',
    nameTamil: 'அக்னிவீர் ராணுவம்',
    qualification: '12th Pass (50%)',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி (50%)',
    age: '17.5 - 23 years',
    salary: '₹30,000/month',
    selectionProcess: 'CEE → Physical → Medical',
    selectionProcessTamil: 'CEE → உடற்தகுதி → மருத்துவம்',
    syllabus: {
      generalDuty: [
        {
          name: 'Agniveer General Duty Syllabus',
          nameTamil: 'அக்னிவீர் பொது கடமை பாடத்திட்டம்',
          topics: [
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', subtopics: ['Indian History', 'Geography', 'Indian Polity', 'Economy Basics', 'Current Affairs', 'Sports & Awards', 'Important Days', 'Books & Authors'] },
            { name: 'General Science', nameTamil: 'பொது அறிவியல்', subtopics: ['Physics: Motion, Force, Energy, Light, Sound, Electricity', 'Chemistry: Elements, Compounds, Acids & Bases, Metals', 'Biology: Human Body, Diseases, Nutrition, Environment'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', subtopics: ['Number System', 'HCF & LCM', 'Percentage', 'Average', 'Ratio & Proportion', 'Simple & Compound Interest', 'Time & Work', 'Time & Distance', 'Profit & Loss'] },
            { name: 'Reasoning', nameTamil: 'தர்க்கம்', subtopics: ['Coding-Decoding', 'Analogy', 'Series Completion', 'Blood Relations', 'Direction Sense', 'Alphabet Test', 'Classification'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'agni-1', question: 'Which is the longest river in India?', questionTamil: 'இந்தியாவின் மிக நீளமான ஆறு எது?', options: ['Ganga', 'Godavari', 'Brahmaputra', 'Yamuna'], answer: 0, explanation: 'Ganga is the longest river in India (2525 km)', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'agni-2', question: 'If 15% of x = 45, then x = ?', options: ['300', '250', '200', '350'], answer: 0, explanation: '15% of x = 45 → x = 45 × 100/15 = 300', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'agni-3', question: 'Find the next term: 2, 6, 12, 20, 30, ?', options: ['40', '42', '44', '46'], answer: 1, explanation: 'Differences: 4, 6, 8, 10, 12. Next: 30 + 12 = 42', subject: 'Reasoning', difficulty: 'medium' },
      { id: 'agni-4', question: 'The chemical symbol of Gold is:', questionTamil: 'தங்கத்தின் வேதியியல் குறியீடு:', options: ['Go', 'Gd', 'Au', 'Ag'], answer: 2, explanation: 'Au (from Latin "Aurum") is Gold. Ag is Silver', subject: 'General Science', difficulty: 'easy' },
      { id: 'agni-5', question: 'Who is known as "Father of Indian Constitution"?', questionTamil: '"இந்திய அரசியலமைப்பின் தந்தை" என்று அறியப்படுபவர்?', options: ['Jawaharlal Nehru', 'B.R. Ambedkar', 'Mahatma Gandhi', 'Sardar Patel'], answer: 1, explanation: 'Dr. B.R. Ambedkar was the Chairman of Drafting Committee', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'agni-6', question: 'The capital of Arunachal Pradesh is:', options: ['Itanagar', 'Imphal', 'Shillong', 'Kohima'], answer: 0, explanation: 'Itanagar is the capital of Arunachal Pradesh', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'agni-7', question: 'Which gas is released during photosynthesis?', questionTamil: 'ஒளிச்சேர்க்கையின் போது எந்த வாயு வெளியிடப்படுகிறது?', options: ['Carbon Dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'], answer: 1, explanation: 'Plants release Oxygen during photosynthesis', subject: 'General Science', difficulty: 'easy' },
      { id: 'agni-8', question: 'COMPUTER is coded as RFUVQNPC, then PRINTER is:', options: ['QSJOUFQ', 'QSJOUFS', 'OQJOUFS', 'SFUOJQR'], answer: 1, explanation: 'Each letter is replaced by +1, -1, +1, -1... pattern', subject: 'Reasoning', difficulty: 'medium' },
      { id: 'agni-9', question: 'A train 200m long passes a pole in 20 seconds. Find speed in km/hr:', options: ['36 km/hr', '40 km/hr', '45 km/hr', '50 km/hr'], answer: 0, explanation: 'Speed = 200/20 = 10 m/s = 10 × 18/5 = 36 km/hr', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'agni-10', question: 'The Quit India movement was started by Mahatma Gandhi in:', questionTamil: 'வெள்ளையனே வெளியேறு இயக்கம் தொடங்கப்பட்ட ஆண்டு:', options: ['1940', '1942', '1944', '1946'], answer: 1, explanation: 'Quit India Movement started on 8th August 1942', subject: 'General Knowledge', difficulty: 'easy' }
    ]
  },
  {
    id: 'agniveer-navy',
    name: 'Agniveer Navy',
    nameTamil: 'அக்னிவீர் கடற்படை',
    qualification: '12th Pass (PCM - 50%)',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி (PCM - 50%)',
    age: '17.5 - 23 years',
    salary: '₹30,000/month',
    selectionProcess: 'Written → Physical → Medical',
    selectionProcessTamil: 'எழுத்துத் தேர்வு → உடற்தகுதி → மருத்துவம்',
    syllabus: {
      main: [
        {
          name: 'Agniveer Navy Syllabus',
          nameTamil: 'அக்னிவீர் கடற்படை பாடத்திட்டம்',
          topics: [
            { name: 'Science', nameTamil: 'அறிவியல்', subtopics: ['Physics', 'Chemistry', 'Mathematics'] },
            { name: 'English', nameTamil: 'ஆங்கிலம்', subtopics: ['Grammar', 'Vocabulary', 'Comprehension'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', subtopics: ['Current Affairs', 'Geography', 'History'] }
          ]
        }
      ]
    },
    pyq: []
  },
  {
    id: 'agniveer-airforce',
    name: 'Agniveer Air Force',
    nameTamil: 'அக்னிவீர் விமானப்படை',
    qualification: '12th Pass (PCM - 50%)',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி (PCM - 50%)',
    age: '17.5 - 23 years',
    salary: '₹30,000/month',
    selectionProcess: 'Written → Physical → Medical',
    selectionProcessTamil: 'எழுத்துத் தேர்வு → உடற்தகுதி → மருத்துவம்',
    syllabus: {
      main: [
        {
          name: 'Agniveer Air Force Syllabus',
          nameTamil: 'அக்னிவீர் விமானப்படை பாடத்திட்டம்',
          topics: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', subtopics: ['Mechanics', 'Thermodynamics', 'Optics', 'Electricity'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', subtopics: ['Algebra', 'Trigonometry', 'Calculus', 'Geometry'] },
            { name: 'English', nameTamil: 'ஆங்கிலம்', subtopics: ['Grammar', 'Vocabulary', 'Comprehension'] },
            { name: 'Reasoning', nameTamil: 'தர்க்கம்', subtopics: ['Verbal', 'Non-Verbal', 'Spatial'] }
          ]
        }
      ]
    },
    pyq: []
  },
  {
    id: 'coastguard',
    name: 'Indian Coast Guard Navik',
    nameTamil: 'இந்திய கடலோர காவல் நாவிக்',
    qualification: '12th Pass (PCM)',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி (PCM)',
    age: '18 - 22 years',
    salary: '₹29,200/month',
    selectionProcess: 'Written → Physical → Medical',
    selectionProcessTamil: 'எழுத்துத் தேர்வு → உடற்தகுதி → மருத்துவம்',
    syllabus: {
      main: [
        {
          name: 'Coast Guard Syllabus',
          nameTamil: 'கடலோர காவல் பாடத்திட்டம்',
          topics: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', subtopics: ['Algebra', 'Trigonometry', 'Geometry', 'Mensuration'] },
            { name: 'Physics', nameTamil: 'இயற்பியல்', subtopics: ['Mechanics', 'Heat', 'Light', 'Electricity'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', subtopics: ['Elements', 'Compounds', 'Reactions'] },
            { name: 'English', nameTamil: 'ஆங்கிலம்', subtopics: ['Grammar', 'Vocabulary'] }
          ]
        }
      ]
    },
    pyq: [
      // Coast Guard Mathematics PYQ
      { id: 'cg-math-1', question: 'If sin θ = 3/5, then cos θ = ?', questionTamil: 'sin θ = 3/5 எனில், cos θ = ?', options: ['4/5', '3/4', '5/4', '5/3'], optionsTamil: ['4/5', '3/4', '5/4', '5/3'], answer: 0, explanation: 'Using sin²θ + cos²θ = 1: cos²θ = 1 - 9/25 = 16/25, so cos θ = 4/5', explanationTamil: 'sin²θ + cos²θ = 1 பயன்படுத்தி: cos²θ = 1 - 9/25 = 16/25, எனவே cos θ = 4/5', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'cg-math-2', question: 'The value of tan 45° + cot 45° is:', questionTamil: 'tan 45° + cot 45° இன் மதிப்பு:', options: ['2', '1', '0', '√2'], optionsTamil: ['2', '1', '0', '√2'], answer: 0, explanation: 'tan 45° = 1, cot 45° = 1. So tan 45° + cot 45° = 1 + 1 = 2', explanationTamil: 'tan 45° = 1, cot 45° = 1. எனவே tan 45° + cot 45° = 1 + 1 = 2', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'cg-math-3', question: 'Area of a circle with radius 7 cm is:', questionTamil: '7 செமீ ஆரம் கொண்ட வட்டத்தின் பரப்பளவு:', options: ['154 cm²', '144 cm²', '148 cm²', '152 cm²'], optionsTamil: ['154 செமீ²', '144 செமீ²', '148 செமீ²', '152 செமீ²'], answer: 0, explanation: 'Area = πr² = 22/7 × 7 × 7 = 154 cm²', explanationTamil: 'பரப்பளவு = πr² = 22/7 × 7 × 7 = 154 செமீ²', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'cg-math-4', question: 'If x + 1/x = 5, then x² + 1/x² = ?', questionTamil: 'x + 1/x = 5 எனில், x² + 1/x² = ?', options: ['23', '25', '27', '21'], optionsTamil: ['23', '25', '27', '21'], answer: 0, explanation: '(x + 1/x)² = x² + 2 + 1/x². So 25 = x² + 1/x² + 2, x² + 1/x² = 23', explanationTamil: '(x + 1/x)² = x² + 2 + 1/x². எனவே 25 = x² + 1/x² + 2, x² + 1/x² = 23', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'cg-math-5', question: 'The HCF of 24, 36 and 48 is:', questionTamil: '24, 36 மற்றும் 48 இன் மீப்பெரு பொது வகுத்தி:', options: ['12', '6', '8', '4'], optionsTamil: ['12', '6', '8', '4'], answer: 0, explanation: '24 = 2³×3, 36 = 2²×3², 48 = 2⁴×3. HCF = 2²×3 = 12', explanationTamil: '24 = 2³×3, 36 = 2²×3², 48 = 2⁴×3. மீப்பெரு பொது வகுத்தி = 2²×3 = 12', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'cg-math-6', question: 'Volume of a cube with side 5 cm is:', questionTamil: '5 செமீ பக்கம் கொண்ட கனசதுரத்தின் கனஅளவு:', options: ['125 cm³', '100 cm³', '150 cm³', '75 cm³'], optionsTamil: ['125 செமீ³', '100 செமீ³', '150 செமீ³', '75 செமீ³'], answer: 0, explanation: 'Volume of cube = side³ = 5³ = 125 cm³', explanationTamil: 'கனசதுரத்தின் கனஅளவு = பக்கம்³ = 5³ = 125 செமீ³', subject: 'Mathematics', difficulty: 'easy' },
      // Coast Guard Physics PYQ
      { id: 'cg-phy-1', question: 'SI unit of Force is:', questionTamil: 'விசையின் SI அலகு:', options: ['Newton', 'Joule', 'Watt', 'Pascal'], optionsTamil: ['நியூட்டன்', 'ஜூல்', 'வாட்', 'பாஸ்கல்'], answer: 0, explanation: 'Newton (N) is the SI unit of Force. 1 N = 1 kg⋅m/s²', explanationTamil: 'நியூட்டன் (N) விசையின் SI அலகு. 1 N = 1 kg⋅m/s²', subject: 'Physics', difficulty: 'easy' },
      { id: 'cg-phy-2', question: 'Which mirror is used as rear view mirror in vehicles?', questionTamil: 'வாகனங்களில் பின்பார்வை கண்ணாடியாக எந்த கண்ணாடி பயன்படுத்தப்படுகிறது?', options: ['Convex mirror', 'Concave mirror', 'Plane mirror', 'Spherical mirror'], optionsTamil: ['குவி கண்ணாடி', 'குழி கண்ணாடி', 'சமதள கண்ணாடி', 'கோள கண்ணாடி'], answer: 0, explanation: 'Convex mirror gives wide field of view and erect diminished image', explanationTamil: 'குவி கண்ணாடி பரந்த பார்வைப் புலத்தையும் நேரான சிறிய பிம்பத்தையும் தருகிறது', subject: 'Physics', difficulty: 'easy' },
      { id: 'cg-phy-3', question: 'Speed of sound in air at room temperature is approximately:', questionTamil: 'அறை வெப்பநிலையில் காற்றில் ஒலியின் வேகம் தோராயமாக:', options: ['340 m/s', '300 m/s', '400 m/s', '250 m/s'], optionsTamil: ['340 மீ/வி', '300 மீ/வி', '400 மீ/வி', '250 மீ/வி'], answer: 0, explanation: 'Speed of sound in air at 20°C is about 340 m/s', explanationTamil: '20°C இல் காற்றில் ஒலியின் வேகம் சுமார் 340 மீ/வி', subject: 'Physics', difficulty: 'easy' },
      { id: 'cg-phy-4', question: 'The phenomenon of light bending when passing from one medium to another is called:', questionTamil: 'ஒரு ஊடகத்திலிருந்து மற்றொரு ஊடகத்திற்கு செல்லும்போது ஒளி வளைவது:', options: ['Refraction', 'Reflection', 'Diffraction', 'Dispersion'], optionsTamil: ['ஒளி விலகல்', 'ஒளி எதிரொளிப்பு', 'ஒளி வளைவு', 'ஒளி பிரிகை'], answer: 0, explanation: 'Refraction is bending of light when it passes from one medium to another', explanationTamil: 'ஒளி விலகல் என்பது ஒளி ஒரு ஊடகத்திலிருந்து மற்றொன்றுக்கு செல்லும்போது வளைவது', subject: 'Physics', difficulty: 'easy' },
      { id: 'cg-phy-5', question: 'Specific heat capacity of water is:', questionTamil: 'நீரின் தனி வெப்ப ஏற்புத்திறன்:', options: ['4.2 J/g°C', '2.4 J/g°C', '1.0 J/g°C', '3.5 J/g°C'], optionsTamil: ['4.2 J/g°C', '2.4 J/g°C', '1.0 J/g°C', '3.5 J/g°C'], answer: 0, explanation: 'Specific heat capacity of water is 4.2 J/g°C or 4200 J/kg°C', explanationTamil: 'நீரின் தனி வெப்ப ஏற்புத்திறன் 4.2 J/g°C அல்லது 4200 J/kg°C', subject: 'Physics', difficulty: 'easy' },
      // Coast Guard Chemistry PYQ
      { id: 'cg-chem-1', question: 'pH value of pure water is:', questionTamil: 'தூய நீரின் pH மதிப்பு:', options: ['7', '0', '14', '1'], optionsTamil: ['7', '0', '14', '1'], answer: 0, explanation: 'Pure water is neutral with pH 7', explanationTamil: 'தூய நீர் நடுநிலையானது, pH 7', subject: 'Chemistry', difficulty: 'easy' },
      { id: 'cg-chem-2', question: 'Which gas is used in fire extinguisher?', questionTamil: 'தீ அணைப்பானில் எந்த வாயு பயன்படுத்தப்படுகிறது?', options: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'], optionsTamil: ['கார்பன் டை ஆக்சைடு', 'ஆக்சிஜன்', 'நைட்ரஜன்', 'ஹைட்ரஜன்'], answer: 0, explanation: 'CO₂ is used as it does not support combustion and is heavier than air', explanationTamil: 'CO₂ பயன்படுத்தப்படுகிறது, ஏனெனில் இது எரிவதை ஆதரிக்காது மற்றும் காற்றை விட கனமானது', subject: 'Chemistry', difficulty: 'easy' },
      { id: 'cg-chem-3', question: 'Atomic number of Sodium is:', questionTamil: 'சோடியத்தின் அணு எண்:', options: ['11', '12', '23', '10'], optionsTamil: ['11', '12', '23', '10'], answer: 0, explanation: 'Sodium (Na) has atomic number 11 and mass number 23', explanationTamil: 'சோடியம் (Na) அணு எண் 11 மற்றும் நிறை எண் 23', subject: 'Chemistry', difficulty: 'easy' },
      { id: 'cg-chem-4', question: 'Rusting of iron is an example of:', questionTamil: 'இரும்பு துருப்பிடித்தல் இதற்கு ஒரு எடுத்துக்காட்டு:', options: ['Oxidation', 'Reduction', 'Neutralization', 'Decomposition'], optionsTamil: ['ஆக்சிகரணம்', 'ஒடுக்கம்', 'நடுநிலையாக்கம்', 'சிதைவு'], answer: 0, explanation: 'Rusting is oxidation: 4Fe + 3O₂ → 2Fe₂O₃', explanationTamil: 'துருப்பிடித்தல் ஆக்சிகரணம்: 4Fe + 3O₂ → 2Fe₂O₃', subject: 'Chemistry', difficulty: 'easy' },
      { id: 'cg-chem-5', question: 'Which is the most abundant element in Earth\'s crust?', questionTamil: 'பூமியின் மேலோட்டில் மிகவும் அதிகமான தனிமம் எது?', options: ['Oxygen', 'Silicon', 'Aluminum', 'Iron'], optionsTamil: ['ஆக்சிஜன்', 'சிலிக்கான்', 'அலுமினியம்', 'இரும்பு'], answer: 0, explanation: 'Oxygen (46%) is most abundant, followed by Silicon (28%)', explanationTamil: 'ஆக்சிஜன் (46%) மிகவும் அதிகம், அடுத்து சிலிக்கான் (28%)', subject: 'Chemistry', difficulty: 'easy' },
      // Coast Guard English PYQ
      { id: 'cg-eng-1', question: 'Choose the correct synonym of "MARITIME":', questionTamil: '"MARITIME" என்பதன் சரியான ஒத்த சொல்:', options: ['Naval', 'Aerial', 'Terrestrial', 'Underground'], optionsTamil: ['கடல் சார்ந்த', 'வான் சார்ந்த', 'நிலம் சார்ந்த', 'நிலத்தடி'], answer: 0, explanation: 'Maritime means relating to the sea or navigation', explanationTamil: 'Maritime என்பது கடல் அல்லது கப்பல் பயணம் தொடர்பானது', subject: 'English', difficulty: 'easy' },
      { id: 'cg-eng-2', question: 'Choose the correct antonym of "SHALLOW":', questionTamil: '"SHALLOW" என்பதன் சரியான எதிர்ச்சொல்:', options: ['Deep', 'Wide', 'Narrow', 'High'], optionsTamil: ['ஆழமான', 'அகலமான', 'குறுகிய', 'உயரமான'], answer: 0, explanation: 'Shallow means not deep; opposite is Deep', explanationTamil: 'Shallow என்பது ஆழமற்றது; எதிர்ச்சொல் Deep (ஆழமான)', subject: 'English', difficulty: 'easy' },
      { id: 'cg-eng-3', question: 'Fill in the blank: "The ship _____ at the port yesterday."', questionTamil: 'இடைவெளியை நிரப்புக: "The ship _____ at the port yesterday."', options: ['arrived', 'arrives', 'arriving', 'arrive'], optionsTamil: ['arrived', 'arrives', 'arriving', 'arrive'], answer: 0, explanation: 'Past tense is used with "yesterday"', explanationTamil: '"yesterday" உடன் இறந்தகாலம் பயன்படுத்தப்படுகிறது', subject: 'English', difficulty: 'easy' },
      { id: 'cg-eng-4', question: 'One word for "A person who works on a ship":', questionTamil: '"கப்பலில் பணிபுரிபவர்" என்பதற்கான ஒரு சொல்:', options: ['Sailor', 'Pilot', 'Driver', 'Captain'], optionsTamil: ['மாலுமி', 'விமானி', 'ஓட்டுநர்', 'கேப்டன்'], answer: 0, explanation: 'Sailor is a person who works on a ship', explanationTamil: 'Sailor (மாலுமி) என்பது கப்பலில் பணிபுரிபவர்', subject: 'English', difficulty: 'easy' },
      { id: 'cg-eng-5', question: 'Spot the error: "The ocean are (a)/ very deep (b)/ in some places (c)/ No error (d)"', questionTamil: 'பிழையைக் கண்டறி: "The ocean are (a)/ very deep (b)/ in some places (c)/ No error (d)"', options: ['a', 'b', 'c', 'd'], optionsTamil: ['a', 'b', 'c', 'd'], answer: 0, explanation: '"Ocean" is singular, so verb should be "is" not "are"', explanationTamil: '"Ocean" ஒருமை, எனவே வினைச்சொல் "is" ஆக இருக்க வேண்டும், "are" அல்ல', subject: 'English', difficulty: 'easy' },
      // Coast Guard General Knowledge PYQ
      { id: 'cg-gk-1', question: 'Indian Coast Guard was established in:', questionTamil: 'இந்திய கடலோர காவல் நிறுவப்பட்ட ஆண்டு:', options: ['1978', '1965', '1947', '1990'], optionsTamil: ['1978', '1965', '1947', '1990'], answer: 0, explanation: 'Indian Coast Guard was established on 18th August 1978', explanationTamil: 'இந்திய கடலோர காவல் 1978 ஆகஸ்ட் 18 அன்று நிறுவப்பட்டது', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'cg-gk-2', question: 'Headquarters of Indian Coast Guard is located at:', questionTamil: 'இந்திய கடலோர காவலின் தலைமையகம் அமைந்துள்ள இடம்:', options: ['New Delhi', 'Mumbai', 'Chennai', 'Kochi'], optionsTamil: ['புது தில்லி', 'மும்பை', 'சென்னை', 'கொச்சி'], answer: 0, explanation: 'ICG Headquarters is at Coast Guard Bhawan, New Delhi', explanationTamil: 'ICG தலைமையகம் கடலோர காவல் பவன், புது தில்லியில் உள்ளது', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'cg-gk-3', question: 'The motto of Indian Coast Guard is:', questionTamil: 'இந்திய கடலோர காவலின் குறிக்கோள்:', options: ['Vayam Rakshamah', 'Satyameva Jayate', 'Service Before Self', 'Jai Hind'], optionsTamil: ['வயம் ரக்ஷாமஹ்', 'சத்யமேவ ஜயதே', 'சேவை முதலில்', 'ஜெய் ஹிந்த்'], answer: 0, explanation: '"Vayam Rakshamah" means "We Protect"', explanationTamil: '"வயம் ரக்ஷாமஹ்" என்றால் "நாங்கள் பாதுகாக்கிறோம்"', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'cg-gk-4', question: 'How many Regional Headquarters does Indian Coast Guard have?', questionTamil: 'இந்திய கடலோர காவலுக்கு எத்தனை மண்டல தலைமையகங்கள் உள்ளன?', options: ['5', '3', '7', '4'], optionsTamil: ['5', '3', '7', '4'], answer: 0, explanation: 'ICG has 5 Regional HQs: North-West, West, East, North-East, Andaman & Nicobar', explanationTamil: 'ICG 5 மண்டல தலைமையகங்களைக் கொண்டுள்ளது', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'cg-gk-5', question: 'Indian Coast Guard works under which ministry?', questionTamil: 'இந்திய கடலோர காவல் எந்த அமைச்சகத்தின் கீழ் செயல்படுகிறது?', options: ['Ministry of Defence', 'Ministry of Home Affairs', 'Ministry of Shipping', 'Ministry of External Affairs'], optionsTamil: ['பாதுகாப்பு அமைச்சகம்', 'உள்துறை அமைச்சகம்', 'கப்பல் அமைச்சகம்', 'வெளியுறவு அமைச்சகம்'], answer: 0, explanation: 'Indian Coast Guard functions under Ministry of Defence', explanationTamil: 'இந்திய கடலோர காவல் பாதுகாப்பு அமைச்சகத்தின் கீழ் செயல்படுகிறது', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'cg-gk-6', question: 'What is the length of India\'s coastline?', questionTamil: 'இந்தியாவின் கடற்கரை நீளம் என்ன?', options: ['7516 km', '6100 km', '8500 km', '5000 km'], optionsTamil: ['7516 கிமீ', '6100 கிமீ', '8500 கிமீ', '5000 கிமீ'], answer: 0, explanation: 'India has 7516 km coastline covering 9 states and 4 union territories', explanationTamil: 'இந்தியாவின் கடற்கரை நீளம் 7516 கிமீ, 9 மாநிலங்கள் மற்றும் 4 யூனியன் பிரதேசங்களை உள்ளடக்கியது', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'cg-gk-7', question: 'Which is the largest port in India?', questionTamil: 'இந்தியாவின் மிகப்பெரிய துறைமுகம் எது?', options: ['Jawaharlal Nehru Port (Mumbai)', 'Chennai Port', 'Visakhapatnam Port', 'Kandla Port'], optionsTamil: ['ஜவஹர்லால் நேரு துறைமுகம் (மும்பை)', 'சென்னை துறைமுகம்', 'விசாகப்பட்டினம் துறைமுகம்', 'காண்ட்லா துறைமுகம்'], answer: 0, explanation: 'JNPT Mumbai is the largest container port in India', explanationTamil: 'JNPT மும்பை இந்தியாவின் மிகப்பெரிய கொள்கலன் துறைமுகம்', subject: 'General Knowledge', difficulty: 'medium' }
    ]
  },
  {
    id: 'bsf-constable',
    name: 'BSF/CRPF/CISF Constable',
    nameTamil: 'BSF/CRPF/CISF காவலர்',
    qualification: '12th Pass',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 23 years',
    salary: '₹23,527/month',
    selectionProcess: 'Written → Physical → Medical',
    selectionProcessTamil: 'எழுத்துத் தேர்வு → உடற்தகுதி → மருத்துவம்',
    syllabus: {
      main: [
        {
          name: 'Constable Exam Syllabus',
          nameTamil: 'காவலர் தேர்வு பாடத்திட்டம்',
          topics: [
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', subtopics: ['History', 'Geography', 'Polity', 'Current Affairs'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', subtopics: ['Number System', 'Arithmetic', 'Algebra'] },
            { name: 'Reasoning', nameTamil: 'தர்க்கம்', subtopics: ['Verbal', 'Non-Verbal', 'Analytical'] },
            { name: 'English/Hindi', nameTamil: 'ஆங்கிலம்/இந்தி', subtopics: ['Grammar', 'Vocabulary', 'Comprehension'] }
          ]
        }
      ]
    },
    pyq: [
      // BSF Constable PYQ
      { id: 'bsf-gk-1', question: 'BSF stands for:', questionTamil: 'BSF என்பதன் விரிவாக்கம்:', options: ['Border Security Force', 'Border Safety Force', 'Boundary Security Force', 'Border Soldier Force'], optionsTamil: ['எல்லைப் பாதுகாப்புப் படை', 'எல்லை பாதுகாப்பு படை', 'எல்லை பாதுகாப்பு படை', 'எல்லை சிப்பாய் படை'], answer: 0, explanation: 'BSF = Border Security Force, established on 1st December 1965', explanationTamil: 'BSF = எல்லைப் பாதுகாப்புப் படை, 1965 டிசம்பர் 1 அன்று நிறுவப்பட்டது', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'bsf-gk-2', question: 'When was BSF established?', questionTamil: 'BSF எப்போது நிறுவப்பட்டது?', options: ['1st December 1965', '15th August 1947', '26th January 1950', '1st December 1960'], optionsTamil: ['1965 டிசம்பர் 1', '1947 ஆகஸ்ட் 15', '1950 ஜனவரி 26', '1960 டிசம்பர் 1'], answer: 0, explanation: 'BSF was raised on 1st December 1965 after Indo-Pak war', explanationTamil: 'இந்தியா-பாக் போருக்குப் பிறகு 1965 டிசம்பர் 1 அன்று BSF உருவாக்கப்பட்டது', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'bsf-gk-3', question: 'BSF headquarters is located in:', questionTamil: 'BSF தலைமையகம் எங்கே உள்ளது?', options: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai'], optionsTamil: ['புது தில்லி', 'மும்பை', 'கொல்கத்தா', 'சென்னை'], answer: 0, explanation: 'BSF headquarters is in New Delhi', explanationTamil: 'BSF தலைமையகம் புது தில்லியில் உள்ளது', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'bsf-gk-4', question: 'BSF guards which border of India?', questionTamil: 'BSF இந்தியாவின் எந்த எல்லையைப் பாதுகாக்கிறது?', options: ['India-Pakistan & India-Bangladesh', 'India-China', 'India-Nepal', 'India-Bhutan'], optionsTamil: ['இந்தியா-பாகிஸ்தான் & இந்தியா-வங்கதேசம்', 'இந்தியா-சீனா', 'இந்தியா-நேபாளம்', 'இந்தியா-பூடான்'], answer: 0, explanation: 'BSF guards India-Pakistan and India-Bangladesh borders', explanationTamil: 'BSF இந்தியா-பாகிஸ்தான் மற்றும் இந்தியா-வங்கதேச எல்லைகளைப் பாதுகாக்கிறது', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'bsf-gk-5', question: 'Who is the Director General of BSF (as of 2024)?', questionTamil: 'BSF இன் தலைமை இயக்குனர் (2024 நிலவரப்படி) யார்?', options: ['Daljit Singh Chaudhary', 'Pankaj Singh', 'Nitin Agarwal', 'Rakesh Asthana'], optionsTamil: ['தல்ஜித் சிங் சௌத்ரி', 'பங்கஜ் சிங்', 'நிதின் அகர்வால்', 'ராகேஷ் அஸ்தானா'], answer: 0, explanation: 'Daljit Singh Chaudhary is the current DG of BSF', explanationTamil: 'தல்ஜித் சிங் சௌத்ரி தற்போதைய BSF DG ஆவார்', subject: 'General Knowledge', difficulty: 'hard' },
      { id: 'bsf-math-1', question: 'If a soldier walks 8 km East and then 6 km North, how far is he from the starting point?', questionTamil: 'ஒரு சிப்பாய் 8 கி.மீ கிழக்கே நடந்து பின் 6 கி.மீ வடக்கே நடந்தால், அவர் தொடக்கப் புள்ளியிலிருந்து எவ்வளவு தொலைவில் இருக்கிறார்?', options: ['10 km', '14 km', '12 km', '8 km'], optionsTamil: ['10 கி.மீ', '14 கி.மீ', '12 கி.மீ', '8 கி.மீ'], answer: 0, explanation: 'Using Pythagoras: √(8² + 6²) = √(64+36) = √100 = 10 km', explanationTamil: 'பைதாகரஸ் பயன்படுத்தி: √(8² + 6²) = √(64+36) = √100 = 10 கி.மீ', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'bsf-math-2', question: 'A patrol team covers 120 km in 4 hours. What is the speed in km/hr?', questionTamil: 'ஒரு ரோந்து குழு 4 மணி நேரத்தில் 120 கி.மீ தூரம் கடக்கிறது. வேகம் என்ன (கி.மீ/மணி)?', options: ['30 km/hr', '35 km/hr', '25 km/hr', '40 km/hr'], optionsTamil: ['30 கி.மீ/மணி', '35 கி.மீ/மணி', '25 கி.மீ/மணி', '40 கி.மீ/மணி'], answer: 0, explanation: 'Speed = Distance/Time = 120/4 = 30 km/hr', explanationTamil: 'வேகம் = தூரம்/நேரம் = 120/4 = 30 கி.மீ/மணி', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'bsf-math-3', question: 'If the ratio of BSF jawans to officers is 15:1, and there are 45 officers, how many jawans are there?', questionTamil: 'BSF ஜவான்கள் மற்றும் அதிகாரிகளின் விகிதம் 15:1 என்றால், 45 அதிகாரிகள் இருந்தால் எத்தனை ஜவான்கள் உள்ளனர்?', options: ['675', '600', '700', '750'], optionsTamil: ['675', '600', '700', '750'], answer: 0, explanation: 'Jawans = 15 × 45 = 675', explanationTamil: 'ஜவான்கள் = 15 × 45 = 675', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'bsf-reason-1', question: 'If BORDER is coded as CPSEFSF, how is PATROL coded?', questionTamil: 'BORDER என்பது CPSEFSF என குறியிடப்பட்டால், PATROL எவ்வாறு குறியிடப்படும்?', options: ['QBUSPM', 'QBUROM', 'QBTSPM', 'RBUSPN'], optionsTamil: ['QBUSPM', 'QBUROM', 'QBTSPM', 'RBUSPN'], answer: 0, explanation: 'Each letter is replaced by next letter: P→Q, A→B, T→U, R→S, O→P, L→M', explanationTamil: 'ஒவ்வொரு எழுத்தும் அடுத்த எழுத்தால் மாற்றப்படுகிறது: P→Q, A→B, T→U, R→S, O→P, L→M', subject: 'Reasoning', difficulty: 'medium' },
      { id: 'bsf-reason-2', question: 'Complete the series: 3, 9, 27, 81, ?', questionTamil: 'தொடரை முடிக்கவும்: 3, 9, 27, 81, ?', options: ['243', '162', '243', '324'], optionsTamil: ['243', '162', '243', '324'], answer: 0, explanation: 'Pattern: Each number × 3 = 81 × 3 = 243', explanationTamil: 'முறை: ஒவ்வொரு எண்ணும் × 3 = 81 × 3 = 243', subject: 'Reasoning', difficulty: 'easy' },

      // CRPF Constable PYQ
      { id: 'crpf-gk-1', question: 'CRPF stands for:', questionTamil: 'CRPF என்பதன் விரிவாக்கம்:', options: ['Central Reserve Police Force', 'Central Rapid Police Force', 'Central Reserve Patrol Force', 'Central Region Police Force'], optionsTamil: ['மத்திய ரிசர்வ் காவல் படை', 'மத்திய விரைவு காவல் படை', 'மத்திய ரிசர்வ் ரோந்து படை', 'மத்திய பிராந்திய காவல் படை'], answer: 0, explanation: 'CRPF = Central Reserve Police Force, largest paramilitary force in India', explanationTamil: 'CRPF = மத்திய ரிசர்வ் காவல் படை, இந்தியாவின் மிகப்பெரிய துணை ராணுவப் படை', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'crpf-gk-2', question: 'When was CRPF raised?', questionTamil: 'CRPF எப்போது உருவாக்கப்பட்டது?', options: ['27th July 1939', '15th August 1947', '26th January 1950', '1st December 1965'], optionsTamil: ['1939 ஜூலை 27', '1947 ஆகஸ்ட் 15', '1950 ஜனவரி 26', '1965 டிசம்பர் 1'], answer: 0, explanation: 'CRPF was raised on 27th July 1939 as Crown Representative Police', explanationTamil: 'CRPF 1939 ஜூலை 27 அன்று Crown Representative Police ஆக உருவாக்கப்பட்டது', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'crpf-gk-3', question: 'CRPF Day is celebrated on:', questionTamil: 'CRPF தினம் எப்போது கொண்டாடப்படுகிறது?', options: ['19th March', '27th July', '15th August', '26th January'], optionsTamil: ['மார்ச் 19', 'ஜூலை 27', 'ஆகஸ்ட் 15', 'ஜனவரி 26'], answer: 0, explanation: 'CRPF Day - 19th March (Battle of Pampore, 1965)', explanationTamil: 'CRPF தினம் - மார்ச் 19 (பம்போர் போர், 1965)', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'crpf-gk-4', question: 'The motto of CRPF is:', questionTamil: 'CRPF இன் குறிக்கோள்:', options: ['Service and Loyalty', 'Duty Unto Death', 'Jai Hind', 'Satyamev Jayate'], optionsTamil: ['சேவையும் விசுவாசமும்', 'மரணம் வரை கடமை', 'ஜெய் ஹிந்த்', 'சத்தியமேவ ஜயதே'], answer: 0, explanation: 'CRPF motto: "Service and Loyalty"', explanationTamil: 'CRPF குறிக்கோள்: "சேவையும் விசுவாசமும்"', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'crpf-math-1', question: 'A CRPF battalion has 800 jawans. If 15% are on leave, how many are present?', questionTamil: 'ஒரு CRPF பட்டாலியனில் 800 ஜவான்கள் உள்ளனர். 15% விடுப்பில் இருந்தால், எத்தனை பேர் இருக்கிறார்கள்?', options: ['680', '700', '720', '650'], optionsTamil: ['680', '700', '720', '650'], answer: 0, explanation: 'On leave = 15% of 800 = 120. Present = 800 - 120 = 680', explanationTamil: 'விடுப்பில் = 800 இன் 15% = 120. இருப்பவர்கள் = 800 - 120 = 680', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'crpf-reason-1', question: 'In a row of CRPF jawans, Ram is 15th from left and 20th from right. How many jawans in total?', questionTamil: 'CRPF ஜவான்கள் வரிசையில், ராம் இடமிருந்து 15வது மற்றும் வலமிருந்து 20வது. மொத்தம் எத்தனை ஜவான்கள்?', options: ['34', '35', '33', '36'], optionsTamil: ['34', '35', '33', '36'], answer: 0, explanation: 'Total = 15 + 20 - 1 = 34', explanationTamil: 'மொத்தம் = 15 + 20 - 1 = 34', subject: 'Reasoning', difficulty: 'easy' },

      // CISF Constable PYQ
      { id: 'cisf-gk-1', question: 'CISF stands for:', questionTamil: 'CISF என்பதன் விரிவாக்கம்:', options: ['Central Industrial Security Force', 'Central Investigation Security Force', 'Central Infrastructure Security Force', 'Central Intelligence Security Force'], optionsTamil: ['மத்திய தொழில்துறை பாதுகாப்புப் படை', 'மத்திய விசாரணை பாதுகாப்புப் படை', 'மத்திய உள்கட்டமைப்பு பாதுகாப்புப் படை', 'மத்திய புலனாய்வு பாதுகாப்புப் படை'], answer: 0, explanation: 'CISF = Central Industrial Security Force', explanationTamil: 'CISF = மத்திய தொழில்துறை பாதுகாப்புப் படை', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'cisf-gk-2', question: 'When was CISF established?', questionTamil: 'CISF எப்போது நிறுவப்பட்டது?', options: ['10th March 1969', '15th August 1947', '26th January 1950', '1st December 1965'], optionsTamil: ['1969 மார்ச் 10', '1947 ஆகஸ்ட் 15', '1950 ஜனவரி 26', '1965 டிசம்பர் 1'], answer: 0, explanation: 'CISF was raised on 10th March 1969', explanationTamil: 'CISF 1969 மார்ச் 10 அன்று நிறுவப்பட்டது', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'cisf-gk-3', question: 'CISF provides security to:', questionTamil: 'CISF எதற்கு பாதுகாப்பு வழங்குகிறது?', options: ['Airports, Metro, PSUs', 'Border areas', 'VIPs only', 'Army camps'], optionsTamil: ['விமான நிலையங்கள், மெட்ரோ, பொதுத்துறை நிறுவனங்கள்', 'எல்லைப் பகுதிகள்', 'VIPக்கள் மட்டும்', 'இராணுவ முகாம்கள்'], answer: 0, explanation: 'CISF secures airports, Delhi Metro, and Public Sector Undertakings', explanationTamil: 'CISF விமான நிலையங்கள், தில்லி மெட்ரோ மற்றும் பொதுத்துறை நிறுவனங்களுக்கு பாதுகாப்பு வழங்குகிறது', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'cisf-gk-4', question: 'The motto of CISF is:', questionTamil: 'CISF இன் குறிக்கோள்:', options: ['Protection and Security', 'Service and Loyalty', 'Duty Unto Death', 'Jai Hind'], optionsTamil: ['பாதுகாப்பு மற்றும் காவல்', 'சேவையும் விசுவாசமும்', 'மரணம் வரை கடமை', 'ஜெய் ஹிந்த்'], answer: 0, explanation: 'CISF motto: "Protection and Security"', explanationTamil: 'CISF குறிக்கோள்: "பாதுகாப்பு மற்றும் காவல்"', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'cisf-gk-5', question: 'CISF HQ is located in:', questionTamil: 'CISF தலைமையகம் எங்குள்ளது?', options: ['New Delhi', 'Mumbai', 'Kolkata', 'Bengaluru'], optionsTamil: ['புது தில்லி', 'மும்பை', 'கொல்கத்தா', 'பெங்களூரு'], answer: 0, explanation: 'CISF headquarters is in New Delhi', explanationTamil: 'CISF தலைமையகம் புது தில்லியில் உள்ளது', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'cisf-math-1', question: 'CISF guards 350 installations. If 20% are airports, how many airports?', questionTamil: 'CISF 350 நிறுவனங்களைப் பாதுகாக்கிறது. 20% விமான நிலையங்கள் என்றால், எத்தனை விமான நிலையங்கள்?', options: ['70', '75', '60', '80'], optionsTamil: ['70', '75', '60', '80'], answer: 0, explanation: '20% of 350 = 350 × 20/100 = 70', explanationTamil: '350 இன் 20% = 350 × 20/100 = 70', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'cisf-reason-1', question: 'SECURITY : YTIRRUCES :: AIRPORT : ?', questionTamil: 'SECURITY : YTIRRUCES :: AIRPORT : ?', options: ['TROPRIA', 'TROPIRA', 'TRORPIA', 'TROPIARA'], optionsTamil: ['TROPRIA', 'TROPIRA', 'TRORPIA', 'TROPIARA'], answer: 0, explanation: 'Reverse of AIRPORT = TROPRIA', explanationTamil: 'AIRPORT இன் தலைகீழ் = TROPRIA', subject: 'Reasoning', difficulty: 'easy' },

      // ITBP Constable PYQ
      { id: 'itbp-gk-1', question: 'ITBP stands for:', questionTamil: 'ITBP என்பதன் விரிவாக்கம்:', options: ['Indo-Tibetan Border Police', 'Indian Territorial Border Police', 'Indo-Tibetan Border Patrol', 'Indian-Tibet Border Police'], optionsTamil: ['இந்தோ-திபெத்திய எல்லைக் காவல்', 'இந்திய எல்லை காவல்', 'இந்தோ-திபெத்திய எல்லை ரோந்து', 'இந்திய-திபெத் எல்லை காவல்'], answer: 0, explanation: 'ITBP = Indo-Tibetan Border Police', explanationTamil: 'ITBP = இந்தோ-திபெத்திய எல்லைக் காவல்', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'itbp-gk-2', question: 'ITBP was raised on:', questionTamil: 'ITBP எப்போது நிறுவப்பட்டது?', options: ['24th October 1962', '15th August 1947', '26th January 1950', '1st December 1965'], optionsTamil: ['1962 அக்டோபர் 24', '1947 ஆகஸ்ட் 15', '1950 ஜனவரி 26', '1965 டிசம்பர் 1'], answer: 0, explanation: 'ITBP was raised on 24th October 1962 during Indo-China war', explanationTamil: 'ITBP 1962 அக்டோபர் 24 அன்று இந்தியா-சீன போரின்போது நிறுவப்பட்டது', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'itbp-gk-3', question: 'ITBP guards which border of India?', questionTamil: 'ITBP இந்தியாவின் எந்த எல்லையைப் பாதுகாக்கிறது?', options: ['India-China (Tibet)', 'India-Pakistan', 'India-Bangladesh', 'India-Nepal'], optionsTamil: ['இந்தியா-சீனா (திபெத்)', 'இந்தியா-பாகிஸ்தான்', 'இந்தியா-வங்கதேசம்', 'இந்தியா-நேபாளம்'], answer: 0, explanation: 'ITBP guards India-China (Tibet) border', explanationTamil: 'ITBP இந்தியா-சீனா (திபெத்) எல்லையைப் பாதுகாக்கிறது', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'itbp-gk-4', question: 'The motto of ITBP is:', questionTamil: 'ITBP இன் குறிக்கோள்:', options: ['Shaurya-Dridhta-Karma Nishtha', 'Service and Loyalty', 'Protection and Security', 'Jai Hind'], optionsTamil: ['வீரம்-உறுதி-கடமையுணர்வு', 'சேவையும் விசுவாசமும்', 'பாதுகாப்பு மற்றும் காவல்', 'ஜெய் ஹிந்த்'], answer: 0, explanation: 'ITBP motto: Shaurya-Dridhta-Karma Nishtha (Valour-Determination-Devotion to Duty)', explanationTamil: 'ITBP குறிக்கோள்: வீரம்-உறுதி-கடமையுணர்வு', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'itbp-gk-5', question: 'ITBP headquarters is in:', questionTamil: 'ITBP தலைமையகம் எங்குள்ளது?', options: ['New Delhi', 'Chandigarh', 'Dehradun', 'Shimla'], optionsTamil: ['புது தில்லி', 'சண்டிகர்', 'டேராடூன்', 'சிம்லா'], answer: 0, explanation: 'ITBP headquarters is in New Delhi', explanationTamil: 'ITBP தலைமையகம் புது தில்லியில் உள்ளது', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'itbp-math-1', question: 'ITBP patrols at an altitude of 18000 feet. Convert to meters (1 foot = 0.3048 m):', questionTamil: 'ITBP 18000 அடி உயரத்தில் ரோந்து செல்கிறது. மீட்டரில் மாற்றவும் (1 அடி = 0.3048 மீ):', options: ['5486.4 m', '5000 m', '6000 m', '4500 m'], optionsTamil: ['5486.4 மீ', '5000 மீ', '6000 மீ', '4500 மீ'], answer: 0, explanation: '18000 × 0.3048 = 5486.4 meters', explanationTamil: '18000 × 0.3048 = 5486.4 மீட்டர்', subject: 'Mathematics', difficulty: 'medium' },

      // SSB Constable PYQ
      { id: 'ssb-gk-1', question: 'SSB stands for:', questionTamil: 'SSB என்பதன் விரிவாக்கம்:', options: ['Sashastra Seema Bal', 'Special Security Bureau', 'State Security Board', 'Special Service Battalion'], optionsTamil: ['சஷஸ்த்ர சீமா பல்', 'சிறப்பு பாதுகாப்பு அலுவலகம்', 'மாநில பாதுகாப்பு வாரியம்', 'சிறப்பு சேவை பட்டாலியன்'], answer: 0, explanation: 'SSB = Sashastra Seema Bal (Armed Border Force)', explanationTamil: 'SSB = சஷஸ்த்ர சீமா பல் (ஆயுதமேந்திய எல்லைப் படை)', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'ssb-gk-2', question: 'SSB guards which borders?', questionTamil: 'SSB எந்த எல்லைகளைப் பாதுகாக்கிறது?', options: ['India-Nepal & India-Bhutan', 'India-Pakistan', 'India-China', 'India-Bangladesh'], optionsTamil: ['இந்தியா-நேபாளம் & இந்தியா-பூடான்', 'இந்தியா-பாகிஸ்தான்', 'இந்தியா-சீனா', 'இந்தியா-வங்கதேசம்'], answer: 0, explanation: 'SSB guards India-Nepal and India-Bhutan borders', explanationTamil: 'SSB இந்தியா-நேபாளம் மற்றும் இந்தியா-பூடான் எல்லைகளைப் பாதுகாக்கிறது', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'ssb-gk-3', question: 'SSB was raised as SSB (Special Service Bureau) in:', questionTamil: 'SSB (சிறப்பு சேவை அலுவலகம்) எப்போது நிறுவப்பட்டது?', options: ['1963', '1965', '1947', '1950'], optionsTamil: ['1963', '1965', '1947', '1950'], answer: 0, explanation: 'SSB was established in 1963', explanationTamil: 'SSB 1963 இல் நிறுவப்பட்டது', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'ssb-gk-4', question: 'The motto of SSB is:', questionTamil: 'SSB இன் குறிக்கோள்:', options: ['Service Security Brotherhood', 'Seva, Suraksha, Bandhutva', 'Safety and Security', 'Strength and Service'], optionsTamil: ['சேவை பாதுகாப்பு சகோதரத்துவம்', 'சேவா, சுரக்ஷா, பந்துத்வா', 'பாதுகாப்பு மற்றும் காவல்', 'வலிமை மற்றும் சேவை'], answer: 0, explanation: 'SSB motto: Service, Security, Brotherhood', explanationTamil: 'SSB குறிக்கோள்: சேவை, பாதுகாப்பு, சகோதரத்துவம்', subject: 'General Knowledge', difficulty: 'medium' },

      // Assam Rifles PYQ
      { id: 'ar-gk-1', question: 'Assam Rifles is the oldest paramilitary force of India. When was it raised?', questionTamil: 'அசாம் ரைபிள்ஸ் இந்தியாவின் மிகப் பழமையான துணை ராணுவப் படை. இது எப்போது நிறுவப்பட்டது?', options: ['1835', '1857', '1947', '1962'], optionsTamil: ['1835', '1857', '1947', '1962'], answer: 0, explanation: 'Assam Rifles was raised in 1835 as Cachar Levy', explanationTamil: 'அசாம் ரைபிள்ஸ் 1835 இல் கச்சார் லெவி என்ற பெயரில் நிறுவப்பட்டது', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'ar-gk-2', question: 'Assam Rifles guards which border?', questionTamil: 'அசாம் ரைபிள்ஸ் எந்த எல்லையைப் பாதுகாக்கிறது?', options: ['India-Myanmar', 'India-Pakistan', 'India-China', 'India-Bangladesh'], optionsTamil: ['இந்தியா-மியான்மர்', 'இந்தியா-பாகிஸ்தான்', 'இந்தியா-சீனா', 'இந்தியா-வங்கதேசம்'], answer: 0, explanation: 'Assam Rifles guards India-Myanmar border', explanationTamil: 'அசாம் ரைபிள்ஸ் இந்தியா-மியான்மர் எல்லையைப் பாதுகாக்கிறது', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'ar-gk-3', question: 'Assam Rifles is known as:', questionTamil: 'அசாம் ரைபிள்ஸ் எவ்வாறு அழைக்கப்படுகிறது?', options: ['Sentinels of the Northeast', 'Guardians of the Himalayas', 'Protectors of the East', 'Warriors of the Border'], optionsTamil: ['வடகிழக்கின் காவலர்கள்', 'இமயமலையின் பாதுகாவலர்கள்', 'கிழக்கின் பாதுகாவலர்கள்', 'எல்லையின் போர்வீரர்கள்'], answer: 0, explanation: 'Assam Rifles is called Sentinels of the Northeast', explanationTamil: 'அசாம் ரைபிள்ஸ் வடகிழக்கின் காவலர்கள் என்று அழைக்கப்படுகிறது', subject: 'General Knowledge', difficulty: 'easy' },

      // General Paramilitary Knowledge PYQ
      { id: 'para-gk-1', question: 'Which is the largest paramilitary force in India?', questionTamil: 'இந்தியாவின் மிகப்பெரிய துணை ராணுவப் படை எது?', options: ['CRPF', 'BSF', 'CISF', 'ITBP'], optionsTamil: ['CRPF', 'BSF', 'CISF', 'ITBP'], answer: 0, explanation: 'CRPF is the largest paramilitary force with over 3.5 lakh personnel', explanationTamil: 'CRPF 3.5 லட்சத்திற்கும் மேற்பட்ட பணியாளர்களுடன் மிகப்பெரிய துணை ராணுவப் படை ஆகும்', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'para-gk-2', question: 'All paramilitary forces come under which Ministry?', questionTamil: 'அனைத்து துணை ராணுவப் படைகளும் எந்த அமைச்சகத்தின் கீழ் வருகின்றன?', options: ['Ministry of Home Affairs', 'Ministry of Defence', 'Ministry of External Affairs', 'Prime Minister Office'], optionsTamil: ['உள்துறை அமைச்சகம்', 'பாதுகாப்பு அமைச்சகம்', 'வெளியுறவு அமைச்சகம்', 'பிரதமர் அலுவலகம்'], answer: 0, explanation: 'All Central Armed Police Forces (CAPFs) come under Ministry of Home Affairs', explanationTamil: 'அனைத்து மத்திய ஆயுதமேந்திய காவல் படைகளும் உள்துறை அமைச்சகத்தின் கீழ் வருகின்றன', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'para-gk-3', question: 'Which paramilitary force is responsible for VIP security?', questionTamil: 'VIP பாதுகாப்புக்கு எந்த துணை ராணுவப் படை பொறுப்பு?', options: ['NSG', 'CRPF', 'BSF', 'ITBP'], optionsTamil: ['NSG', 'CRPF', 'BSF', 'ITBP'], answer: 0, explanation: 'NSG (National Security Guard) - Black Cat Commandos provide VIP security', explanationTamil: 'NSG (தேசிய பாதுகாப்பு பாதுகாவலர்) - பிளாக் கேட் கமாண்டோக்கள் VIP பாதுகாப்பு வழங்குகின்றனர்', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'para-gk-4', question: 'NSG was raised in which year?', questionTamil: 'NSG எந்த ஆண்டு நிறுவப்பட்டது?', options: ['1984', '1986', '1990', '1992'], optionsTamil: ['1984', '1986', '1990', '1992'], answer: 0, explanation: 'NSG was raised in 1984 after Operation Blue Star', explanationTamil: 'NSG 1984 இல் ஆபரேஷன் ப்ளூ ஸ்டாருக்குப் பிறகு நிறுவப்பட்டது', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'para-gk-5', question: 'Which force guards Indian Parliament?', questionTamil: 'இந்திய நாடாளுமன்றத்தைப் பாதுகாப்பது எந்த படை?', options: ['CRPF', 'BSF', 'CISF', 'Delhi Police'], optionsTamil: ['CRPF', 'BSF', 'CISF', 'தில்லி காவல்'], answer: 0, explanation: 'CRPF guards Indian Parliament building', explanationTamil: 'CRPF இந்திய நாடாளுமன்ற கட்டிடத்தைப் பாதுகாக்கிறது', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'para-math-1', question: 'If a patrol post is changed every 6 hours, how many times in a week?', questionTamil: 'ஒரு ரோந்து பதவி ஒவ்வொரு 6 மணி நேரத்திற்கும் மாற்றப்பட்டால், ஒரு வாரத்தில் எத்தனை முறை?', options: ['28', '24', '30', '32'], optionsTamil: ['28', '24', '30', '32'], answer: 0, explanation: '24 hours/day ÷ 6 = 4 times/day × 7 days = 28 times', explanationTamil: '24 மணி/நாள் ÷ 6 = 4 முறை/நாள் × 7 நாட்கள் = 28 முறை', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'para-math-2', question: 'A convoy of 15 vehicles travels 360 km. If each vehicle uses 30 liters of fuel, total fuel used is:', questionTamil: '15 வாகனங்கள் கொண்ட வாகன அணி 360 கி.மீ பயணிக்கிறது. ஒவ்வொரு வாகனமும் 30 லிட்டர் எரிபொருள் பயன்படுத்தினால், மொத்த எரிபொருள்:', options: ['450 liters', '400 liters', '500 liters', '350 liters'], optionsTamil: ['450 லிட்டர்', '400 லிட்டர்', '500 லிட்டர்', '350 லிட்டர்'], answer: 0, explanation: '15 × 30 = 450 liters', explanationTamil: '15 × 30 = 450 லிட்டர்', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'para-reason-1', question: 'Arrange in correct order: 1. Patrol 2. Report 3. Alert 4. Action', questionTamil: 'சரியான வரிசையில் வரிசைப்படுத்தவும்: 1. ரோந்து 2. அறிக்கை 3. எச்சரிக்கை 4. நடவடிக்கை', options: ['1-3-4-2', '1-2-3-4', '3-1-4-2', '1-4-3-2'], optionsTamil: ['1-3-4-2', '1-2-3-4', '3-1-4-2', '1-4-3-2'], answer: 0, explanation: 'Logical sequence: Patrol → Alert → Action → Report', explanationTamil: 'தர்க்கரீதியான வரிசை: ரோந்து → எச்சரிக்கை → நடவடிக்கை → அறிக்கை', subject: 'Reasoning', difficulty: 'easy' },
      { id: 'para-reason-2', question: 'Find odd one: CRPF, BSF, CISF, IPS, ITBP', questionTamil: 'வித்தியாசமானதைக் கண்டுபிடிக்கவும்: CRPF, BSF, CISF, IPS, ITBP', options: ['IPS', 'CRPF', 'BSF', 'CISF'], optionsTamil: ['IPS', 'CRPF', 'BSF', 'CISF'], answer: 0, explanation: 'IPS is a police service, others are paramilitary forces', explanationTamil: 'IPS ஒரு காவல் சேவை, மற்றவை துணை ராணுவப் படைகள்', subject: 'Reasoning', difficulty: 'easy' },
      { id: 'para-english-1', question: 'Choose correct spelling:', questionTamil: 'சரியான எழுத்துப்பிழையைத் தேர்ந்தெடுக்கவும்:', options: ['Surveillance', 'Surveilance', 'Survaillance', 'Survelance'], optionsTamil: ['Surveillance', 'Surveilance', 'Survaillance', 'Survelance'], answer: 0, explanation: 'Surveillance is the correct spelling (meaning: close observation)', explanationTamil: 'Surveillance சரியான எழுத்துப்பிழை (பொருள்: நெருக்கமான கண்காணிப்பு)', subject: 'English', difficulty: 'medium' },
      { id: 'para-english-2', question: '"To be on guard" means:', questionTamil: '"To be on guard" என்பதன் பொருள்:', options: ['To be alert and watchful', 'To sleep', 'To relax', 'To run away'], optionsTamil: ['விழிப்பாகவும் கவனமாகவும் இருப்பது', 'தூங்குவது', 'ஓய்வெடுப்பது', 'ஓடிவிடுவது'], answer: 0, explanation: 'To be on guard = to be alert and watchful for danger', explanationTamil: 'To be on guard = ஆபத்துக்கு விழிப்பாகவும் கவனமாகவும் இருப்பது', subject: 'English', difficulty: 'easy' }
    ]
  }
];

// ==================== RAILWAY JOBS ====================
const railwayExams: Exam[] = [
  {
    id: 'rrb-ntpc',
    name: 'RRB NTPC (Non-Technical Popular Categories)',
    nameTamil: 'RRB NTPC (தொழில்நுட்பமற்ற பிரபலமான பிரிவுகள்)',
    qualification: '12th Pass',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 33 years',
    salary: '₹19,900 - ₹35,400/month',
    selectionProcess: 'CBT 1 → CBT 2 → Typing Test → Document Verification',
    selectionProcessTamil: 'CBT 1 → CBT 2 → தட்டச்சு சோதனை → ஆவண சரிபார்ப்பு',
    posts: ['Commercial Cum Ticket Clerk', 'Accounts Clerk', 'Junior Clerk', 'Trains Clerk'],
    postsTamil: ['வணிக மற்றும் டிக்கெட் எழுத்தர்', 'கணக்கு எழுத்தர்', 'இளநிலை எழுத்தர்', 'ரயில் எழுத்தர்'],
    examPattern: [
      { paper: 'CBT Stage 1', paperTamil: 'CBT நிலை 1', marks: 100, duration: '90 mins', questions: 100 },
      { paper: 'CBT Stage 2', paperTamil: 'CBT நிலை 2', marks: 120, duration: '90 mins', questions: 120 }
    ],
    syllabus: {
      cbt1: [
        {
          name: 'CBT Stage 1 (100 Questions, 90 Minutes)',
          nameTamil: 'CBT நிலை 1 (100 கேள்விகள், 90 நிமிடங்கள்)',
          topics: [
            { name: 'General Awareness (40 Questions)', nameTamil: 'பொது விழிப்புணர்வு (40 கேள்விகள்)', subtopics: ['Current Affairs - National & International', 'Indian History - Ancient, Medieval, Modern', 'Indian Geography - Physical, Economic', 'Indian Polity - Constitution, Governance', 'Indian Economy - Banking, Budget', 'General Science - Physics, Chemistry, Biology', 'Sports & Games', 'Art & Culture', 'Important Days & Dates', 'Awards & Honours'] },
            { name: 'Mathematics (30 Questions)', nameTamil: 'கணிதம் (30 கேள்விகள்)', subtopics: ['Number System, BODMAS', 'Decimals, Fractions', 'LCM, HCF', 'Ratio & Proportion', 'Percentage', 'Mensuration', 'Time & Work', 'Time & Distance', 'Simple & Compound Interest', 'Profit & Loss', 'Elementary Algebra', 'Geometry & Trigonometry', 'Elementary Statistics'] },
            { name: 'General Intelligence & Reasoning (30 Questions)', nameTamil: 'பொது புத்திசாலித்தனம் & தர்க்கம் (30 கேள்விகள்)', subtopics: ['Analogies', 'Coding-Decoding', 'Syllogism', 'Puzzles', 'Data Sufficiency', 'Statement-Conclusion', 'Blood Relations', 'Venn Diagrams', 'Alphabet & Number Series', 'Mathematical Operations', 'Similarities & Differences', 'Analytical Reasoning', 'Classification', 'Directions', 'Decision Making'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'rrb-ga-1', question: 'Who is known as the "Iron Man of India"?', questionTamil: '"இந்தியாவின் இரும்பு மனிதர்" என்று அறியப்படுபவர்?', options: ['Jawaharlal Nehru', 'Sardar Vallabhbhai Patel', 'Subhash Chandra Bose', 'Mahatma Gandhi'], answer: 1, explanation: 'Sardar Vallabhbhai Patel is called Iron Man for unifying 562 princely states', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'rrb-ga-2', question: 'Which is the largest gland in human body?', options: ['Thyroid', 'Liver', 'Pancreas', 'Pituitary'], answer: 1, explanation: 'Liver is the largest gland (weighs about 1.5 kg)', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'rrb-ga-3', question: 'The headquarters of ISRO is located in:', options: ['Chennai', 'Mumbai', 'Bengaluru', 'Hyderabad'], answer: 2, explanation: 'ISRO HQ is in Bengaluru, Karnataka', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'rrb-ga-4', question: 'Which Article of Constitution abolishes untouchability?', questionTamil: 'தீண்டாமையை ஒழிக்கும் அரசியலமைப்பு சட்டப்பிரிவு எது?', options: ['Article 14', 'Article 15', 'Article 17', 'Article 21'], answer: 2, explanation: 'Article 17 abolishes untouchability and makes it punishable', subject: 'General Awareness', difficulty: 'medium' },
      { id: 'rrb-ga-5', question: 'Who invented the telephone?', options: ['Thomas Edison', 'Alexander Graham Bell', 'Marconi', 'Wright Brothers'], answer: 1, explanation: 'Alexander Graham Bell invented telephone in 1876', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'rrb-ga-6', question: 'Which river is called "Sorrow of Bengal"?', questionTamil: '"வங்காளத்தின் துக்கம்" என்று அழைக்கப்படும் ஆறு எது?', options: ['Ganga', 'Brahmaputra', 'Damodar', 'Hooghly'], answer: 2, explanation: 'Damodar river caused frequent floods in Bengal', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'rrb-ga-7', question: 'First woman President of Indian National Congress was:', options: ['Sarojini Naidu', 'Annie Besant', 'Indira Gandhi', 'Vijaya Lakshmi Pandit'], answer: 1, explanation: 'Annie Besant (1917) was first woman president of INC', subject: 'General Awareness', difficulty: 'medium' },
      { id: 'rrb-ga-8', question: 'The chemical name of Vitamin C is:', questionTamil: 'வைட்டமின் C இன் வேதியியல் பெயர்:', options: ['Retinol', 'Thiamine', 'Ascorbic Acid', 'Calciferol'], answer: 2, explanation: 'Vitamin C = Ascorbic Acid (found in citrus fruits)', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'rrb-ga-9', question: 'Which country has the longest coastline in the world?', options: ['USA', 'Australia', 'Canada', 'Russia'], answer: 2, explanation: 'Canada has the longest coastline (202,080 km)', subject: 'General Awareness', difficulty: 'medium' },
      { id: 'rrb-ga-10', question: 'The Quit India Movement was launched in:', questionTamil: 'வெள்ளையனே வெளியேறு இயக்கம் தொடங்கப்பட்ட ஆண்டு:', options: ['1940', '1942', '1944', '1946'], answer: 1, explanation: 'Quit India Movement - 8 August 1942 (Do or Die)', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'rrb-math-1', question: 'A train 150m long passes a pole in 15 seconds. Find its speed in km/hr.', options: ['36 km/hr', '40 km/hr', '45 km/hr', '50 km/hr'], answer: 0, explanation: 'Speed = 150/15 = 10 m/s = 10 × 18/5 = 36 km/hr', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'rrb-math-2', question: 'The average of 5 consecutive odd numbers is 27. Find the largest number.', options: ['29', '31', '33', '35'], answer: 1, explanation: 'If average is 27, middle number is 27. So: 23, 25, 27, 29, 31. Largest = 31', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'rrb-math-3', question: 'A sum becomes ₹6050 in 2 years at 10% compound interest. Find the sum.', options: ['₹5000', '₹4500', '₹5500', '₹4000'], answer: 0, explanation: 'P(1+10/100)² = 6050 → P × 1.21 = 6050 → P = 5000', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'rrb-math-4', question: 'If x + 1/x = 5, then x² + 1/x² = ?', questionTamil: 'x + 1/x = 5 எனில், x² + 1/x² = ?', options: ['23', '25', '27', '21'], answer: 0, explanation: '(x + 1/x)² = x² + 1/x² + 2. So 25 = x² + 1/x² + 2 → x² + 1/x² = 23', subject: 'Mathematics', difficulty: 'hard' },
      { id: 'rrb-math-5', question: 'Perimeter of rectangle is 40 cm. If length is 12 cm, find the area.', options: ['96 cm²', '80 cm²', '84 cm²', '90 cm²'], answer: 0, explanation: '2(L+B) = 40, L = 12. So B = 8. Area = 12 × 8 = 96 cm²', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'rrb-math-6', question: 'A can do work in 12 days, B in 15 days. Together in how many days?', options: ['6 days', '6⅔ days', '7 days', '8 days'], answer: 1, explanation: 'Combined rate = 1/12 + 1/15 = 9/60 = 3/20. Days = 20/3 = 6⅔', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'rrb-math-7', question: 'Find the simple interest on ₹5000 at 8% for 3 years:', options: ['₹1200', '₹1000', '₹1400', '₹1100'], answer: 0, explanation: 'SI = PRT/100 = 5000 × 8 × 3/100 = ₹1200', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'rrb-math-8', question: 'If 3:5 = x:25, find x:', options: ['15', '12', '18', '20'], answer: 0, explanation: '3/5 = x/25 → x = 3 × 25/5 = 15', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'rrb-math-9', question: 'The cost price of 15 articles equals selling price of 12 articles. Profit % is:', options: ['20%', '25%', '30%', '15%'], answer: 1, explanation: 'CP of 15 = SP of 12. Profit = 3 articles. Profit% = 3/12 × 100 = 25%', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'rrb-math-10', question: 'Area of circle with diameter 14 cm is:', options: ['154 cm²', '144 cm²', '164 cm²', '616 cm²'], answer: 0, explanation: 'r = 7 cm. Area = πr² = 22/7 × 49 = 154 cm²', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'rrb-reason-1', question: 'APPLE : ELPPA :: MANGO : ?', options: ['OGNAM', 'OGANM', 'MANOG', 'NAGOM'], answer: 0, explanation: 'Reverse of MANGO = OGNAM', subject: 'Reasoning', difficulty: 'easy' },
      { id: 'rrb-reason-2', question: 'Find the odd one out: 8, 27, 64, 100, 125', options: ['27', '64', '100', '125'], answer: 2, explanation: '8=2³, 27=3³, 64=4³, 125=5³. 100 is not a perfect cube', subject: 'Reasoning', difficulty: 'medium' },
      { id: 'rrb-reason-3', question: 'A is B\'s brother. C is A\'s mother. D is C\'s father. What is B to D?', options: ['Grandfather', 'Grandson/Granddaughter', 'Son', 'Father'], answer: 1, explanation: 'D is grandfather of A and B. So B is grandchild of D', subject: 'Reasoning', difficulty: 'medium' },
      { id: 'rrb-reason-4', question: 'Complete the series: 2, 5, 10, 17, 26, ?', options: ['35', '37', '39', '41'], answer: 1, explanation: 'Pattern: +3, +5, +7, +9, +11. Next: 26 + 11 = 37', subject: 'Reasoning', difficulty: 'medium' },
      { id: 'rrb-reason-5', question: 'Pointing to a man, a woman said, "His mother is the only daughter of my mother." How is the woman related to the man?', options: ['Aunt', 'Mother', 'Sister', 'Grandmother'], answer: 1, explanation: 'Only daughter of my mother = myself. So woman is man\'s mother', subject: 'Reasoning', difficulty: 'medium' },
      { id: 'rrb-reason-6', question: 'Which number will replace the question mark? 3, 6, 18, 72, ?', options: ['144', '216', '288', '360'], answer: 3, explanation: 'Pattern: ×2, ×3, ×4, ×5. 72 × 5 = 360', subject: 'Reasoning', difficulty: 'hard' },
      { id: 'rrb-reason-7', question: 'If South-East becomes North, then North-East becomes:', questionTamil: 'தென்கிழக்கு வடக்கு ஆனால், வடகிழக்கு என்னவாகும்?', options: ['South', 'North-West', 'West', 'South-West'], optionsTamil: ['தெற்கு', 'வடமேற்கு', 'மேற்கு', 'தென்மேற்கு'], answer: 2, explanation: 'Rotating 135° anticlockwise: NE becomes West', explanationTamil: '135° எதிர்கடிகார திசையில் சுழற்றும்போது: வடகிழக்கு மேற்காக மாறும்', subject: 'Reasoning', difficulty: 'hard' },
      { id: 'rrb-reason-8', question: 'Find missing number: 4, 9, 25, 49, 121, ?', questionTamil: 'விடுபட்ட எண்ணைக் கண்டுபிடிக்கவும்: 4, 9, 25, 49, 121, ?', options: ['144', '169', '196', '225'], answer: 1, explanation: 'Squares of primes: 2², 3², 5², 7², 11², 13² = 169', explanationTamil: 'பகா எண்களின் வர்க்கங்கள்: 2², 3², 5², 7², 11², 13² = 169', subject: 'Reasoning', difficulty: 'hard' },
      // New Railway PYQ additions
      { id: 'rrb-ga-11', question: 'Which railway zone has the longest route length?', questionTamil: 'எந்த ரயில்வே மண்டலம் மிக நீளமான பாதை நீளத்தைக் கொண்டுள்ளது?', options: ['Northern Railway', 'Western Railway', 'Southern Railway', 'Eastern Railway'], optionsTamil: ['வடக்கு ரயில்வே', 'மேற்கு ரயில்வே', 'தெற்கு ரயில்வே', 'கிழக்கு ரயில்வே'], answer: 0, explanation: 'Northern Railway has the longest route length among all railway zones', explanationTamil: 'வடக்கு ரயில்வே அனைத்து ரயில்வே மண்டலங்களிலும் மிக நீளமான பாதை நீளத்தைக் கொண்டுள்ளது', subject: 'General Awareness', difficulty: 'medium' },
      { id: 'rrb-ga-12', question: 'What is the full form of IRCTC?', questionTamil: 'IRCTC இன் முழு வடிவம் என்ன?', options: ['Indian Railway Catering and Tourism Corporation', 'Indian Railway Commercial and Transport Corporation', 'Indian Rail Central Transport Company', 'Indian Railway Control and Traffic Corporation'], optionsTamil: ['இந்திய ரயில்வே உணவு மற்றும் சுற்றுலா கழகம்', 'இந்திய ரயில்வே வணிக மற்றும் போக்குவரத்து கழகம்', 'இந்திய ரயில் மத்திய போக்குவரத்து நிறுவனம்', 'இந்திய ரயில்வே கட்டுப்பாட்டு மற்றும் போக்குவரத்து கழகம்'], answer: 0, explanation: 'IRCTC = Indian Railway Catering and Tourism Corporation, established in 1999', explanationTamil: 'IRCTC = இந்திய ரயில்வே உணவு மற்றும் சுற்றுலா கழகம், 1999 இல் நிறுவப்பட்டது', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'rrb-ga-13', question: 'Which is the fastest train in India?', questionTamil: 'இந்தியாவின் வேகமான ரயில் எது?', options: ['Rajdhani Express', 'Shatabdi Express', 'Vande Bharat Express', 'Duronto Express'], optionsTamil: ['ராஜ்தானி எக்ஸ்பிரஸ்', 'சதாப்தி எக்ஸ்பிரஸ்', 'வந்தே பாரத் எக்ஸ்பிரஸ்', 'துரந்தோ எக்ஸ்பிரஸ்'], answer: 2, explanation: 'Vande Bharat Express is the fastest train in India with speed up to 180 km/hr', explanationTamil: 'வந்தே பாரத் எக்ஸ்பிரஸ் இந்தியாவின் வேகமான ரயில், 180 கி.மீ/மணி வேகம் வரை செல்லும்', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'rrb-ga-14', question: 'Where is the Rail Museum located?', questionTamil: 'ரயில் அருங்காட்சியகம் எங்கு அமைந்துள்ளது?', options: ['Mumbai', 'New Delhi', 'Kolkata', 'Chennai'], optionsTamil: ['மும்பை', 'புது டெல்லி', 'கொல்கத்தா', 'சென்னை'], answer: 1, explanation: 'National Rail Museum is located in New Delhi, established in 1977', explanationTamil: 'தேசிய ரயில் அருங்காட்சியகம் புது டெல்லியில் உள்ளது, 1977 இல் நிறுவப்பட்டது', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'rrb-ga-15', question: 'What is the Railway Budget merged with?', questionTamil: 'ரயில்வே பட்ஜெட் எதனுடன் இணைக்கப்பட்டது?', options: ['State Budget', 'Union Budget', 'Defense Budget', 'Agriculture Budget'], optionsTamil: ['மாநில பட்ஜெட்', 'யூனியன் பட்ஜெட்', 'பாதுகாப்பு பட்ஜெட்', 'விவசாய பட்ஜெட்'], answer: 1, explanation: 'Railway Budget was merged with Union Budget from 2017', explanationTamil: 'ரயில்வே பட்ஜெட் 2017 முதல் யூனியன் பட்ஜெட்டுடன் இணைக்கப்பட்டது', subject: 'General Awareness', difficulty: 'medium' },
      { id: 'rrb-math-11', question: 'Two trains of equal length pass a pole in 10 and 15 seconds respectively. If they travel in the same direction, how long will they take to cross each other?', questionTamil: 'சம நீளமுள்ள இரு ரயில்கள் ஒரு கம்பத்தை முறையே 10 மற்றும் 15 வினாடிகளில் கடக்கின்றன. அவை ஒரே திசையில் சென்றால், ஒன்றை மற்றொன்று கடக்க எவ்வளவு நேரம் ஆகும்?', options: ['30 sec', '45 sec', '60 sec', '50 sec'], optionsTamil: ['30 வினாடி', '45 வினாடி', '60 வினாடி', '50 வினாடி'], answer: 2, explanation: 'Speed ratio = 3:2. To cross = (L+L)/(3x-2x) = 2L/x = 2×30 = 60 sec', explanationTamil: 'வேக விகிதம் = 3:2. கடக்க = (L+L)/(3x-2x) = 2L/x = 2×30 = 60 வினாடி', subject: 'Mathematics', difficulty: 'hard' },
      { id: 'rrb-math-12', question: 'A man invested ₹8000 at 5% per annum. After how many years will it become ₹9261?', questionTamil: 'ஒரு மனிதன் ₹8000 ஐ வருடத்திற்கு 5% வட்டியில் முதலீடு செய்தான். எத்தனை வருடங்களில் அது ₹9261 ஆகும்?', options: ['2 years', '3 years', '4 years', '5 years'], optionsTamil: ['2 வருடங்கள்', '3 வருடங்கள்', '4 வருடங்கள்', '5 வருடங்கள்'], answer: 1, explanation: '8000(1.05)^n = 9261. (1.05)^3 = 1.157625. n = 3 years', explanationTamil: '8000(1.05)^n = 9261. (1.05)^3 = 1.157625. n = 3 வருடங்கள்', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'rrb-math-13', question: 'If the selling price is doubled, the profit triples. What is the profit percentage?', questionTamil: 'விற்பனை விலை இரு மடங்காக்கப்பட்டால், லாபம் மூன்று மடங்காகிறது. லாப சதவீதம் என்ன?', options: ['50%', '100%', '75%', '66.67%'], optionsTamil: ['50%', '100%', '75%', '66.67%'], answer: 1, explanation: 'Let SP=x, CP=c, P=x-c. New: 2x-c=3(x-c). Solving: x=2c. Profit=100%', explanationTamil: 'SP=x, CP=c, P=x-c என்க. புதிய: 2x-c=3(x-c). தீர்வு: x=2c. லாபம்=100%', subject: 'Mathematics', difficulty: 'hard' },
      { id: 'rrb-math-14', question: 'The average of 11 numbers is 36. If the average of first 6 numbers is 32 and last 6 numbers is 37, find the 6th number.', questionTamil: '11 எண்களின் சராசரி 36. முதல் 6 எண்களின் சராசரி 32, கடைசி 6 எண்களின் சராசரி 37 எனில், 6வது எண்ணைக் கண்டுபிடிக்கவும்.', options: ['17', '18', '19', '20'], optionsTamil: ['17', '18', '19', '20'], answer: 0, explanation: 'Total=396, First 6=192, Last 6=222. 6th = 192+222-396 = 18. Check: 17', explanationTamil: 'மொத்தம்=396, முதல் 6=192, கடைசி 6=222. 6வது = 192+222-396 = 17', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'rrb-reason-9', question: 'Statement: All trains are fast. Some fast things are red. Conclusion: I. Some trains are red. II. Some red things are trains.', questionTamil: 'கூற்று: அனைத்து ரயில்களும் வேகமானவை. சில வேகமானவை சிவப்பு. முடிவு: I. சில ரயில்கள் சிவப்பு. II. சில சிவப்பு பொருட்கள் ரயில்கள்.', options: ['Only I follows', 'Only II follows', 'Both follow', 'Neither follows'], optionsTamil: ['I மட்டும் பின்பற்றுகிறது', 'II மட்டும் பின்பற்றுகிறது', 'இரண்டும் பின்பற்றுகின்றன', 'எதுவும் பின்பற்றவில்லை'], answer: 3, explanation: 'Neither conclusion follows as there is no direct link between trains and red', explanationTamil: 'ரயில்களுக்கும் சிவப்புக்கும் இடையே நேரடி தொடர்பு இல்லாததால் எந்த முடிவும் பின்பற்றவில்லை', subject: 'Reasoning', difficulty: 'hard' },
      { id: 'rrb-reason-10', question: 'If A is coded as Z, B as Y, then RAILWAY is coded as:', questionTamil: 'A ஐ Z என்றும், B ஐ Y என்றும் குறியீடு செய்தால், RAILWAY எவ்வாறு குறியீடு செய்யப்படும்?', options: ['IZROZDZ', 'IROZDZA', 'IZROADZ', 'IRZOZDA'], optionsTamil: ['IZROZDZ', 'IROZDZA', 'IZROADZ', 'IRZOZDA'], answer: 0, explanation: 'R→I, A→Z, I→R, L→O, W→D, A→Z, Y→B. RAILWAY = IZROZDZ', explanationTamil: 'R→I, A→Z, I→R, L→O, W→D, A→Z, Y→B. RAILWAY = IZROZDZ', subject: 'Reasoning', difficulty: 'medium' },
      { id: 'rrb-sci-1', question: 'What is the unit of electric current?', questionTamil: 'மின்னோட்டத்தின் அலகு என்ன?', options: ['Volt', 'Ampere', 'Ohm', 'Watt'], optionsTamil: ['வோல்ட்', 'ஆம்பியர்', 'ஓம்', 'வாட்'], answer: 1, explanation: 'Ampere (A) is the SI unit of electric current', explanationTamil: 'ஆம்பியர் (A) மின்னோட்டத்தின் SI அலகு ஆகும்', subject: 'General Science', difficulty: 'easy' },
      { id: 'rrb-sci-2', question: 'Which gas is used in refrigerators?', questionTamil: 'குளிர்சாதன பெட்டிகளில் எந்த வாயு பயன்படுத்தப்படுகிறது?', options: ['Oxygen', 'Nitrogen', 'Freon', 'Helium'], optionsTamil: ['ஆக்சிஜன்', 'நைட்ரஜன்', 'ஃப்ரியான்', 'ஹீலியம்'], answer: 2, explanation: 'Freon (CFCs or HFCs) is used as refrigerant in refrigerators', explanationTamil: 'ஃப்ரியான் (CFCs அல்லது HFCs) குளிர்சாதன பெட்டிகளில் குளிர்பதனியாக பயன்படுத்தப்படுகிறது', subject: 'General Science', difficulty: 'easy' },
      { id: 'rrb-sci-3', question: 'Which planet has the most moons?', questionTamil: 'எந்த கோளுக்கு அதிக நிலவுகள் உள்ளன?', options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'], optionsTamil: ['வியாழன்', 'சனி', 'யுரேனஸ்', 'நெப்டியூன்'], answer: 1, explanation: 'Saturn has the most moons (146 confirmed as of 2023)', explanationTamil: 'சனிக்கு அதிக நிலவுகள் உள்ளன (2023 நிலவரப்படி 146 உறுதிப்படுத்தப்பட்டவை)', subject: 'General Science', difficulty: 'medium' }
    ]
  },
  {
    id: 'rrb-group-d',
    name: 'RRB Group D',
    nameTamil: 'RRB குழு D',
    qualification: '10th Pass + ITI OR 12th Pass',
    qualificationTamil: '10ஆம் வகுப்பு + ITI அல்லது 12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 33 years',
    salary: '₹18,000/month',
    selectionProcess: 'CBT → PET → Document Verification',
    selectionProcessTamil: 'CBT → உடற்தகுதி → ஆவண சரிபார்ப்பு',
    posts: ['Track Maintainer', 'Helper', 'Porter', 'Pointsman'],
    postsTamil: ['பாதை பராமரிப்பாளர்', 'உதவியாளர்', 'போர்ட்டர்', 'பாயின்ட்ஸ்மேன்'],
    syllabus: {
      main: [
        {
          name: 'RRB Group D Syllabus',
          nameTamil: 'RRB குழு D பாடத்திட்டம்',
          topics: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', subtopics: ['Number System', 'BODMAS', 'Percentage', 'Ratio & Proportion', 'Time & Work', 'Time & Distance', 'Simple Interest', 'Profit & Loss', 'Geometry', 'Mensuration'] },
            { name: 'General Intelligence & Reasoning', nameTamil: 'பொது புத்திசாலித்தனம் & தர்க்கம்', subtopics: ['Analogies', 'Classification', 'Coding-Decoding', 'Series', 'Blood Relations', 'Directions', 'Syllogism'] },
            { name: 'General Science', nameTamil: 'பொது அறிவியல்', subtopics: ['Physics', 'Chemistry', 'Biology'] },
            { name: 'General Awareness', nameTamil: 'பொது விழிப்புணர்வு', subtopics: ['Current Affairs', 'History', 'Geography', 'Polity', 'Economy'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'grpd-math-1', question: 'What is the LCM of 12 and 18?', questionTamil: '12 மற்றும் 18 இன் மீ.பொ.ம என்ன?', options: ['36', '24', '72', '54'], answer: 0, explanation: 'LCM of 12 and 18 = 36', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'grpd-math-2', question: 'A shopkeeper sells an article for ₹450 at 10% profit. What is the cost price?', options: ['₹400', '₹405', '₹410', '₹409'], answer: 3, explanation: 'CP = SP/(1+P/100) = 450/1.1 = ₹409 (approx)', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'grpd-sci-1', question: 'Which vitamin is produced by sunlight?', questionTamil: 'சூரிய ஒளியால் எந்த வைட்டமின் உற்பத்தி செய்யப்படுகிறது?', options: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D'], answer: 3, explanation: 'Vitamin D is synthesized in skin when exposed to sunlight', subject: 'General Science', difficulty: 'easy' },
      { id: 'grpd-sci-2', question: 'What is the chemical formula of common salt?', options: ['NaCl', 'KCl', 'CaCl2', 'MgCl2'], answer: 0, explanation: 'Common salt is Sodium Chloride - NaCl', subject: 'General Science', difficulty: 'easy' },
      { id: 'grpd-ga-1', question: 'First Railway line in India was between:', questionTamil: 'இந்தியாவில் முதல் ரயில் பாதை எந்த இடங்களுக்கு இடையே அமைந்தது?', options: ['Delhi-Agra', 'Mumbai-Thane', 'Kolkata-Delhi', 'Chennai-Bangalore'], answer: 1, explanation: 'First railway line: Mumbai (Bori Bunder) to Thane in 1853', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'grpd-ga-2', question: 'Who is known as the Father of Indian Railways?', options: ['Lord Dalhousie', 'Lord Curzon', 'Lord Mountbatten', 'Lord Ripon'], answer: 0, explanation: 'Lord Dalhousie introduced railways in India in 1853', subject: 'General Awareness', difficulty: 'medium' },
      { id: 'grpd-reason-1', question: 'If CAT = 24, then DOG = ?', questionTamil: 'CAT = 24 எனில், DOG = ?', options: ['26', '27', '28', '25'], answer: 0, explanation: 'C=3, A=1, T=20 → 3+1+20=24. D=4, O=15, G=7 → 4+15+7=26', explanationTamil: 'C=3, A=1, T=20 → 3+1+20=24. D=4, O=15, G=7 → 4+15+7=26', subject: 'Reasoning', difficulty: 'medium' },
      { id: 'grpd-reason-2', question: 'Find the next term: A, C, F, J, ?', questionTamil: 'அடுத்த உறுப்பைக் கண்டுபிடிக்கவும்: A, C, F, J, ?', options: ['M', 'N', 'O', 'P'], answer: 2, explanation: 'Pattern: +2, +3, +4, +5. J + 5 = O', explanationTamil: 'அமைப்பு: +2, +3, +4, +5. J + 5 = O', subject: 'Reasoning', difficulty: 'medium' },
      // New Group D PYQ additions
      { id: 'grpd-math-3', question: 'A man walks 6 km North, then 4 km East. How far is he from the starting point?', questionTamil: 'ஒரு மனிதன் 6 கி.மீ வடக்கே நடக்கிறான், பின்னர் 4 கி.மீ கிழக்கே நடக்கிறான். தொடக்கப் புள்ளியிலிருந்து அவன் எவ்வளவு தொலைவில் இருக்கிறான்?', options: ['10 km', '7.21 km', '8 km', '5 km'], optionsTamil: ['10 கி.மீ', '7.21 கி.மீ', '8 கி.மீ', '5 கி.மீ'], answer: 1, explanation: 'Distance = √(6² + 4²) = √(36+16) = √52 ≈ 7.21 km', explanationTamil: 'தூரம் = √(6² + 4²) = √(36+16) = √52 ≈ 7.21 கி.மீ', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'grpd-math-4', question: 'If 40% of a number is 80, what is 60% of the same number?', questionTamil: 'ஒரு எண்ணின் 40% 80 எனில், அதே எண்ணின் 60% என்ன?', options: ['100', '120', '140', '160'], optionsTamil: ['100', '120', '140', '160'], answer: 1, explanation: 'Number = 80 × 100/40 = 200. 60% of 200 = 120', explanationTamil: 'எண் = 80 × 100/40 = 200. 200 இன் 60% = 120', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'grpd-math-5', question: 'The sum of three consecutive even numbers is 72. Find the largest.', questionTamil: 'மூன்று தொடர்ச்சியான இரட்டை எண்களின் கூட்டுத்தொகை 72. பெரியதைக் கண்டுபிடிக்கவும்.', options: ['22', '24', '26', '28'], optionsTamil: ['22', '24', '26', '28'], answer: 2, explanation: 'Let numbers be x, x+2, x+4. 3x+6=72. x=22. Largest = 26', explanationTamil: 'எண்கள் x, x+2, x+4 என்க. 3x+6=72. x=22. பெரியது = 26', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'grpd-sci-3', question: 'What is the powerhouse of the cell?', questionTamil: 'செல்லின் மின்சக்தி நிலையம் எது?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi Body'], optionsTamil: ['உட்கரு', 'ரைபோசோம்', 'மைட்டோகாண்ட்ரியா', 'கோல்கி உடல்'], answer: 2, explanation: 'Mitochondria produces ATP (energy) and is called the powerhouse of cell', explanationTamil: 'மைட்டோகாண்ட்ரியா ATP (ஆற்றல்) உற்பத்தி செய்வதால் செல்லின் மின்சக்தி நிலையம் என்று அழைக்கப்படுகிறது', subject: 'General Science', difficulty: 'easy' },
      { id: 'grpd-sci-4', question: 'Bronze is an alloy of:', questionTamil: 'வெண்கலம் ஒரு கலவை உலோகம்:', options: ['Copper and Zinc', 'Copper and Tin', 'Iron and Carbon', 'Lead and Tin'], optionsTamil: ['தாமிரம் மற்றும் துத்தநாகம்', 'தாமிரம் மற்றும் தகரம்', 'இரும்பு மற்றும் கார்பன்', 'ஈயம் மற்றும் தகரம்'], answer: 1, explanation: 'Bronze = Copper + Tin. Brass = Copper + Zinc', explanationTamil: 'வெண்கலம் = தாமிரம் + தகரம். பித்தளை = தாமிரம் + துத்தநாகம்', subject: 'General Science', difficulty: 'easy' },
      { id: 'grpd-sci-5', question: 'Which vitamin deficiency causes Scurvy?', questionTamil: 'ஸ்கர்வி நோய் எந்த வைட்டமின் குறைபாட்டால் ஏற்படுகிறது?', options: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin K'], optionsTamil: ['வைட்டமின் A', 'வைட்டமின் B', 'வைட்டமின் C', 'வைட்டமின் K'], answer: 2, explanation: 'Vitamin C deficiency causes Scurvy (bleeding gums, weakness)', explanationTamil: 'வைட்டமின் C குறைபாடு ஸ்கர்வி நோயை ஏற்படுத்துகிறது (ஈறு இரத்தப்போக்கு, பலவீனம்)', subject: 'General Science', difficulty: 'easy' },
      { id: 'grpd-ga-3', question: 'Who was the first Railway Minister of independent India?', questionTamil: 'சுதந்திர இந்தியாவின் முதல் ரயில்வே அமைச்சர் யார்?', options: ['Jawaharlal Nehru', 'John Mathai', 'Lal Bahadur Shastri', 'C. Rajagopalachari'], optionsTamil: ['ஜவஹர்லால் நேரு', 'ஜான் மத்தாய்', 'லால் பகதூர் சாஸ்திரி', 'சி. ராஜகோபாலாச்சாரி'], answer: 1, explanation: 'John Mathai was the first Railway Minister of India (1947-1948)', explanationTamil: 'ஜான் மத்தாய் இந்தியாவின் முதல் ரயில்வே அமைச்சர் (1947-1948)', subject: 'General Awareness', difficulty: 'medium' },
      { id: 'grpd-ga-4', question: 'What is the name of India\'s first bullet train project?', questionTamil: 'இந்தியாவின் முதல் புல்லட் ரயில் திட்டத்தின் பெயர் என்ன?', options: ['Mumbai-Ahmedabad High Speed Rail', 'Delhi-Mumbai Express', 'Chennai-Bangalore Speed Rail', 'Kolkata-Varanasi Express'], optionsTamil: ['மும்பை-அகமதாபாத் அதிவேக ரயில்', 'டெல்லி-மும்பை எக்ஸ்பிரஸ்', 'சென்னை-பெங்களூரு வேக ரயில்', 'கொல்கத்தா-வாரணாசி எக்ஸ்பிரஸ்'], answer: 0, explanation: 'Mumbai-Ahmedabad High Speed Rail is India\'s first bullet train project with Japanese assistance', explanationTamil: 'மும்பை-அகமதாபாத் அதிவேக ரயில் ஜப்பான் உதவியுடன் இந்தியாவின் முதல் புல்லட் ரயில் திட்டமாகும்', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'grpd-reason-3', question: 'Which number will come next? 7, 14, 28, 56, ?', questionTamil: 'அடுத்து என்ன எண் வரும்? 7, 14, 28, 56, ?', options: ['112', '102', '98', '84'], optionsTamil: ['112', '102', '98', '84'], answer: 0, explanation: 'Each number is doubled: 7×2=14, 14×2=28, 28×2=56, 56×2=112', explanationTamil: 'ஒவ்வொரு எண்ணும் இரு மடங்காகிறது: 7×2=14, 14×2=28, 28×2=56, 56×2=112', subject: 'Reasoning', difficulty: 'easy' },
      { id: 'grpd-reason-4', question: 'Mirror image: If you stand facing North and turn 90° clockwise, which direction are you facing?', questionTamil: 'நீங்கள் வடக்கு நோக்கி நின்று 90° கடிகார திசையில் திரும்பினால், எந்த திசையை நோக்கி நிற்கிறீர்கள்?', options: ['South', 'East', 'West', 'North-East'], optionsTamil: ['தெற்கு', 'கிழக்கு', 'மேற்கு', 'வடகிழக்கு'], answer: 1, explanation: '90° clockwise from North = East', explanationTamil: 'வடக்கிலிருந்து 90° கடிகார திசை = கிழக்கு', subject: 'Reasoning', difficulty: 'easy' }
    ]
  },
  {
    id: 'rpf-constable',
    name: 'RPF Constable',
    nameTamil: 'RPF காவலர்',
    qualification: '12th Pass',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 25 years',
    salary: '₹21,700/month',
    selectionProcess: 'CBT → PET/PMT → Document Verification',
    selectionProcessTamil: 'CBT → உடற்தகுதி → ஆவண சரிபார்ப்பு',
    syllabus: {
      main: [
        {
          name: 'RPF Constable Syllabus',
          nameTamil: 'RPF காவலர் பாடத்திட்டம்',
          topics: [
            { name: 'General Awareness', nameTamil: 'பொது விழிப்புணர்வு', subtopics: ['Current Affairs', 'History', 'Geography', 'Polity', 'Science'] },
            { name: 'Arithmetic', nameTamil: 'எண்கணிதம்', subtopics: ['Number System', 'Percentage', 'Ratio', 'Time & Work', 'Time & Distance'] },
            { name: 'General Intelligence & Reasoning', nameTamil: 'பொது புத்திசாலித்தனம் & தர்க்கம்', subtopics: ['Analogies', 'Classification', 'Coding-Decoding', 'Series'] }
          ]
        }
      ]
    },
    pyq: [
      // General Awareness
      { id: 'rpf-ga-1', question: 'When was the Railway Protection Force (RPF) established?', questionTamil: 'ரயில்வே பாதுகாப்புப் படை (RPF) எப்போது நிறுவப்பட்டது?', options: ['1957', '1966', '1972', '1985'], optionsTamil: ['1957', '1966', '1972', '1985'], answer: 0, explanation: 'RPF was established in 1957 under RPF Act', explanationTamil: 'RPF 1957 இல் RPF சட்டத்தின் கீழ் நிறுவப்பட்டது', subject: 'General Awareness', difficulty: 'medium' },
      { id: 'rpf-ga-2', question: 'What is the motto of RPF?', questionTamil: 'RPF இன் குறிக்கோள் என்ன?', options: ['Service and Loyalty', 'Duty First', 'Sewa, Safety, Security', 'Always Alert'], optionsTamil: ['சேவையும் விசுவாசமும்', 'கடமை முதலில்', 'சேவை, பாதுகாப்பு, காப்பு', 'எப்போதும் விழிப்புடன்'], answer: 2, explanation: 'RPF motto is "Sewa, Safety, Security"', explanationTamil: 'RPF குறிக்கோள் "சேவை, பாதுகாப்பு, காப்பு"', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'rpf-ga-3', question: 'Who is the administrative head of Indian Railways?', questionTamil: 'இந்திய ரயில்வேயின் நிர்வாகத் தலைவர் யார்?', options: ['Railway Minister', 'Railway Board Chairman', 'General Manager', 'Prime Minister'], optionsTamil: ['ரயில்வே அமைச்சர்', 'ரயில்வே வாரியத் தலைவர்', 'பொது மேலாளர்', 'பிரதமர்'], answer: 1, explanation: 'Railway Board Chairman is the administrative head of Indian Railways', explanationTamil: 'ரயில்வே வாரியத் தலைவர் இந்திய ரயில்வேயின் நிர்வாகத் தலைவர்', subject: 'General Awareness', difficulty: 'medium' },
      { id: 'rpf-ga-4', question: 'The first railway line in India was opened between which two stations?', questionTamil: 'இந்தியாவில் முதல் ரயில் பாதை எந்த இரு நிலையங்களுக்கு இடையே திறக்கப்பட்டது?', options: ['Delhi to Agra', 'Mumbai to Thane', 'Chennai to Bangalore', 'Kolkata to Delhi'], optionsTamil: ['டெல்லி முதல் ஆக்ரா', 'மும்பை முதல் தானே', 'சென்னை முதல் பெங்களூர்', 'கொல்கத்தா முதல் டெல்லி'], answer: 1, explanation: 'First railway line opened between Mumbai (Bombay) and Thane on 16 April 1853', explanationTamil: 'முதல் ரயில் பாதை 16 ஏப்ரல் 1853 அன்று மும்பை (பம்பாய்) மற்றும் தானே இடையே திறக்கப்பட்டது', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'rpf-ga-5', question: 'How many railway zones are there in India?', questionTamil: 'இந்தியாவில் எத்தனை ரயில்வே மண்டலங்கள் உள்ளன?', options: ['16', '17', '18', '19'], optionsTamil: ['16', '17', '18', '19'], answer: 2, explanation: 'There are 18 railway zones in India', explanationTamil: 'இந்தியாவில் 18 ரயில்வே மண்டலங்கள் உள்ளன', subject: 'General Awareness', difficulty: 'medium' },
      { id: 'rpf-ga-6', question: 'Which is the longest railway platform in India?', questionTamil: 'இந்தியாவின் மிக நீளமான ரயில் பிளாட்பாரம் எது?', options: ['Gorakhpur', 'Kharagpur', 'Kollam', 'Bilaspur'], optionsTamil: ['கோரக்பூர்', 'காரக்பூர்', 'கொல்லம்', 'பிலாஸ்பூர்'], answer: 0, explanation: 'Gorakhpur Junction has the longest railway platform (1,366.33 m)', explanationTamil: 'கோரக்பூர் சந்திப்பு மிக நீளமான ரயில் பிளாட்பாரம் (1,366.33 மீ)', subject: 'General Awareness', difficulty: 'medium' },
      { id: 'rpf-ga-7', question: 'The headquarters of Southern Railway is located at:', questionTamil: 'தெற்கு ரயில்வேயின் தலைமையகம் அமைந்துள்ள இடம்:', options: ['Mumbai', 'Chennai', 'Bangalore', 'Hyderabad'], optionsTamil: ['மும்பை', 'சென்னை', 'பெங்களூர்', 'ஹைதராபாத்'], answer: 1, explanation: 'Southern Railway headquarters is in Chennai', explanationTamil: 'தெற்கு ரயில்வே தலைமையகம் சென்னையில் உள்ளது', subject: 'General Awareness', difficulty: 'easy' },
      // Arithmetic
      { id: 'rpf-math-1', question: 'A train 150m long passes a pole in 15 seconds. Find its speed in km/hr.', questionTamil: '150 மீ நீளமுள்ள ஒரு ரயில் 15 வினாடிகளில் ஒரு தூணைக் கடக்கிறது. அதன் வேகத்தை கி.மீ/மணி இல் கண்டறியவும்.', options: ['36 km/hr', '40 km/hr', '45 km/hr', '50 km/hr'], optionsTamil: ['36 கி.மீ/மணி', '40 கி.மீ/மணி', '45 கி.மீ/மணி', '50 கி.மீ/மணி'], answer: 0, explanation: 'Speed = 150/15 = 10 m/s = 10 × 18/5 = 36 km/hr', explanationTamil: 'வேகம் = 150/15 = 10 மீ/வி = 10 × 18/5 = 36 கி.மீ/மணி', subject: 'Arithmetic', difficulty: 'easy' },
      { id: 'rpf-math-2', question: 'If 20% of a number is 50, what is 40% of that number?', questionTamil: 'ஒரு எண்ணின் 20% 50 எனில், அந்த எண்ணின் 40% என்ன?', options: ['100', '150', '75', '200'], optionsTamil: ['100', '150', '75', '200'], answer: 0, explanation: '20% = 50, so number = 250. 40% of 250 = 100', explanationTamil: '20% = 50, எனவே எண் = 250. 250 இன் 40% = 100', subject: 'Arithmetic', difficulty: 'easy' },
      { id: 'rpf-math-3', question: 'The ratio 3:5 expressed as percentage is:', questionTamil: '3:5 என்ற விகிதம் சதவீதமாக:', options: ['60%', '62.5%', '75%', '80%'], optionsTamil: ['60%', '62.5%', '75%', '80%'], answer: 0, explanation: '3/5 × 100 = 60%', explanationTamil: '3/5 × 100 = 60%', subject: 'Arithmetic', difficulty: 'easy' },
      { id: 'rpf-math-4', question: 'A man buys an article for ₹800 and sells it for ₹920. Find profit percentage.', questionTamil: 'ஒரு மனிதர் ₹800 க்கு ஒரு பொருளை வாங்கி ₹920 க்கு விற்கிறார். லாப சதவீதத்தைக் கண்டறியவும்.', options: ['12%', '15%', '18%', '20%'], optionsTamil: ['12%', '15%', '18%', '20%'], answer: 1, explanation: 'Profit = 920-800 = 120. Profit% = 120/800 × 100 = 15%', explanationTamil: 'லாபம் = 920-800 = 120. லாப% = 120/800 × 100 = 15%', subject: 'Arithmetic', difficulty: 'easy' },
      { id: 'rpf-math-5', question: 'Simple Interest on ₹5000 at 8% per annum for 3 years is:', questionTamil: '₹5000 க்கு ஆண்டுக்கு 8% வட்டியில் 3 ஆண்டுகளுக்கான எளிய வட்டி:', options: ['₹1200', '₹1000', '₹1500', '₹1800'], optionsTamil: ['₹1200', '₹1000', '₹1500', '₹1800'], answer: 0, explanation: 'SI = PRT/100 = 5000×8×3/100 = ₹1200', explanationTamil: 'எ.வ = PRT/100 = 5000×8×3/100 = ₹1200', subject: 'Arithmetic', difficulty: 'easy' },
      { id: 'rpf-math-6', question: 'Two trains running in opposite directions cross each other in 12 sec. If their speeds are 40 km/hr and 32 km/hr and one train is 150m long, find length of other train.', questionTamil: 'எதிர் திசைகளில் இயங்கும் இரு ரயில்கள் 12 வினாடிகளில் ஒன்றையொன்று கடக்கின்றன. அவற்றின் வேகங்கள் 40 கி.மீ/மணி மற்றும் 32 கி.மீ/மணி, ஒரு ரயில் 150 மீ நீளம் எனில், மற்ற ரயிலின் நீளத்தைக் கண்டறியவும்.', options: ['90m', '100m', '110m', '120m'], optionsTamil: ['90 மீ', '100 மீ', '110 மீ', '120 மீ'], answer: 2, explanation: 'Relative speed = 40+32 = 72 km/hr = 20 m/s. Total length = 20×12 = 240m. Other train = 240-150 = 90m', explanationTamil: 'உறவு வேகம் = 40+32 = 72 கி.மீ/மணி = 20 மீ/வி. மொத்த நீளம் = 20×12 = 240 மீ. மற்ற ரயில் = 240-150 = 90 மீ', subject: 'Arithmetic', difficulty: 'hard' },
      // General Intelligence & Reasoning
      { id: 'rpf-reason-1', question: 'Complete the series: 2, 6, 12, 20, 30, ?', questionTamil: 'தொடரை நிறைவு செய்க: 2, 6, 12, 20, 30, ?', options: ['40', '42', '44', '46'], optionsTamil: ['40', '42', '44', '46'], answer: 1, explanation: 'Differences: 4, 6, 8, 10, 12. Next = 30 + 12 = 42', explanationTamil: 'வேறுபாடுகள்: 4, 6, 8, 10, 12. அடுத்தது = 30 + 12 = 42', subject: 'General Intelligence & Reasoning', difficulty: 'medium' },
      { id: 'rpf-reason-2', question: 'If TRAIN is coded as USBJO, then PLATFORM is coded as:', questionTamil: 'TRAIN ஐ USBJO என குறியீடு செய்தால், PLATFORM எவ்வாறு குறியீடு செய்யப்படும்:', options: ['QMBUGOQN', 'QMBUGPSN', 'RMBUGPSN', 'QMBUGORN'], optionsTamil: ['QMBUGOQN', 'QMBUGPSN', 'RMBUGPSN', 'QMBUGORN'], answer: 0, explanation: 'Each letter +1: P→Q, L→M, A→B, T→U, F→G, O→O, R→S, M→N', explanationTamil: 'ஒவ்வொரு எழுத்தும் +1: P→Q, L→M, A→B, T→U, F→G, O→O, R→S, M→N', subject: 'General Intelligence & Reasoning', difficulty: 'medium' },
      { id: 'rpf-reason-3', question: 'In a row of boys, Ram is 15th from the left and Shyam is 7th from the right. If they interchange, Ram becomes 25th from left. How many boys are there?', questionTamil: 'ஒரு சிறுவர்கள் வரிசையில், ராம் இடமிருந்து 15வது, சியாம் வலமிருந்து 7வது. அவர்கள் மாறினால், ராம் இடமிருந்து 25வது ஆகிறார். எத்தனை சிறுவர்கள் உள்ளனர்?', options: ['28', '30', '31', '32'], optionsTamil: ['28', '30', '31', '32'], answer: 2, explanation: 'After interchange, Ram is at Shyam position = 25th from left. Shyam was 7th from right. Total = 25 + 7 - 1 = 31', explanationTamil: 'மாற்றத்திற்குப் பிறகு, ராம் சியாம் நிலையில் = இடமிருந்து 25வது. சியாம் வலமிருந்து 7வது. மொத்தம் = 25 + 7 - 1 = 31', subject: 'General Intelligence & Reasoning', difficulty: 'hard' },
      { id: 'rpf-reason-4', question: 'Find the odd one out: Apple, Mango, Banana, Carrot', questionTamil: 'விவித்தியாசமானதைக் கண்டறியவும்: ஆப்பிள், மாம்பழம், வாழைப்பழம், கேரட்', options: ['Apple', 'Mango', 'Banana', 'Carrot'], optionsTamil: ['ஆப்பிள்', 'மாம்பழம்', 'வாழைப்பழம்', 'கேரட்'], answer: 3, explanation: 'Carrot is a vegetable; others are fruits', explanationTamil: 'கேரட் ஒரு காய்கறி; மற்றவை பழங்கள்', subject: 'General Intelligence & Reasoning', difficulty: 'easy' },
      { id: 'rpf-reason-5', question: 'If A = 1, B = 2, C = 3, then CAB = ?', questionTamil: 'A = 1, B = 2, C = 3 எனில், CAB = ?', options: ['6', '7', '8', '312'], optionsTamil: ['6', '7', '8', '312'], answer: 0, explanation: 'CAB = C+A+B = 3+1+2 = 6', explanationTamil: 'CAB = C+A+B = 3+1+2 = 6', subject: 'General Intelligence & Reasoning', difficulty: 'easy' },
      { id: 'rpf-reason-6', question: 'Statement: All trains are vehicles. All vehicles have wheels. Conclusion: All trains have wheels.', questionTamil: 'கூற்று: எல்லா ரயில்களும் வாகனங்கள். எல்லா வாகனங்களுக்கும் சக்கரங்கள் உள்ளன. முடிவு: எல்லா ரயில்களுக்கும் சக்கரங்கள் உள்ளன.', options: ['True', 'False', 'Cannot be determined', 'Partially true'], optionsTamil: ['உண்மை', 'பொய்', 'தீர்மானிக்க முடியாது', 'ஓரளவு உண்மை'], answer: 0, explanation: 'The conclusion logically follows from both statements', explanationTamil: 'முடிவு இரண்டு கூற்றுகளிலிருந்து தர்க்கரீதியாக பின்தொடர்கிறது', subject: 'General Intelligence & Reasoning', difficulty: 'medium' }
    ]
  },
  {
    id: 'railway-apprentice',
    name: 'Railway Apprentice',
    nameTamil: 'ரயில்வே பயிற்சியாளர்',
    qualification: '10th/12th Pass',
    qualificationTamil: '10/12ஆம் வகுப்பு தேர்ச்சி',
    age: '15 - 24 years',
    salary: '₹8,000 Stipend',
    selectionProcess: 'Merit Based',
    selectionProcessTamil: 'தகுதி அடிப்படையில்',
    syllabus: {
      main: [
        {
          name: 'Railway Apprentice Selection',
          nameTamil: 'ரயில்வே பயிற்சியாளர் தேர்வு',
          topics: [
            { name: 'Selection Criteria', nameTamil: 'தேர்வு அளவுகோல்', subtopics: ['Based on 10th/12th marks', 'ITI qualification preferred', 'No written exam'] }
          ]
        }
      ]
    },
    pyq: []
  }
];

// ==================== SSC ====================
const sscExams: Exam[] = [
  {
    id: 'ssc-chsl',
    name: 'SSC CHSL (Combined Higher Secondary Level)',
    nameTamil: 'SSC CHSL (ஒருங்கிணைந்த மேல்நிலை தேர்வு)',
    qualification: '12th Pass',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 27 years',
    salary: '₹25,500 - ₹81,100/month',
    selectionProcess: 'Tier 1 (CBT) → Tier 2 (Descriptive) → Typing Test',
    selectionProcessTamil: 'நிலை 1 (CBT) → நிலை 2 (விளக்க) → தட்டச்சு சோதனை',
    posts: ['LDC (Lower Division Clerk)', 'DEO (Data Entry Operator)', 'PA (Postal Assistant)', 'SA (Sorting Assistant)'],
    postsTamil: ['கீழ் பிரிவு எழுத்தர்', 'தரவு உள்ளீட்டு ஆபரேட்டர்', 'தபால் உதவியாளர்', 'வரிசைப்படுத்தும் உதவியாளர்'],
    examPattern: [
      { paper: 'Tier 1 - CBT', paperTamil: 'நிலை 1 - CBT', marks: 200, duration: '60 mins', questions: 100 },
      { paper: 'Tier 2 - Descriptive', paperTamil: 'நிலை 2 - விளக்க', marks: 200, duration: '60 mins', questions: 2 }
    ],
    syllabus: {
      tier1: [
        {
          name: 'Tier 1 - Computer Based Test (100 Questions, 60 Minutes)',
          nameTamil: 'நிலை 1 - கணினி அடிப்படை தேர்வு (100 கேள்விகள், 60 நிமிடங்கள்)',
          topics: [
            { name: 'General Intelligence (25 Questions)', nameTamil: 'பொது புத்திசாலித்தனம் (25 கேள்விகள்)', subtopics: ['Semantic Analogy', 'Symbolic/Number Analogy', 'Semantic Classification', 'Symbolic/Number Classification', 'Figural Classification', 'Semantic Series', 'Number Series', 'Figural Series', 'Problem Solving', 'Word Building', 'Coding & Decoding', 'Numerical Operations', 'Venn Diagrams', 'Figural Pattern', 'Embedded Figures', 'Critical Thinking'] },
            { name: 'English Language (25 Questions)', nameTamil: 'ஆங்கில மொழி (25 கேள்விகள்)', subtopics: ['Spot the Error', 'Fill in the Blanks', 'Synonyms', 'Antonyms', 'Spelling/Detecting Misspelt Words', 'Idioms & Phrases', 'One Word Substitution', 'Improvement of Sentences', 'Active/Passive Voice', 'Direct/Indirect Speech', 'Shuffling of Sentence Parts', 'Cloze Passage', 'Comprehension Passage'] },
            { name: 'Quantitative Aptitude (25 Questions)', nameTamil: 'அளவு திறன் (25 கேள்விகள்)', subtopics: ['Number Systems', 'Fundamental Operations', 'Percentages', 'Ratio & Proportion', 'Square Roots', 'Averages', 'Interest', 'Profit & Loss', 'Discount', 'Partnership', 'Mixture & Alligation', 'Time & Distance', 'Time & Work', 'Geometry', 'Mensuration', 'Trigonometry', 'Data Interpretation'] },
            { name: 'General Awareness (25 Questions)', nameTamil: 'பொது விழிப்புணர்வு (25 கேள்விகள்)', subtopics: ['India & its Neighbours', 'History', 'Culture', 'Geography', 'Economic Scene', 'General Polity', 'Indian Constitution', 'Scientific Research', 'Current Affairs'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'ssc-gi-1', question: 'Select the related word: Doctor : Hospital :: Teacher : ?', questionTamil: 'தொடர்புடைய வார்த்தையைத் தேர்ந்தெடுக்கவும்: மருத்துவர் : மருத்துவமனை :: ஆசிரியர் : ?', options: ['School', 'Student', 'Books', 'Education'], optionsTamil: ['பள்ளி', 'மாணவர்', 'புத்தகங்கள்', 'கல்வி'], answer: 0, explanation: 'Doctor works in Hospital, Teacher works in School', explanationTamil: 'மருத்துவர் மருத்துவமனையில் பணிபுரிகிறார், ஆசிரியர் பள்ளியில் பணிபுரிகிறார்', subject: 'General Intelligence', difficulty: 'easy' },
      { id: 'ssc-gi-2', question: 'Arrange in meaningful order: 1.Sentence 2.Word 3.Paragraph 4.Letter 5.Chapter', questionTamil: 'அர்த்தமுள்ள வரிசையில் அமைக்கவும்: 1.வாக்கியம் 2.சொல் 3.பத்தி 4.எழுத்து 5.அத்தியாயம்', options: ['4-2-1-3-5', '4-2-3-1-5', '4-1-2-3-5', '2-4-1-3-5'], optionsTamil: ['4-2-1-3-5', '4-2-3-1-5', '4-1-2-3-5', '2-4-1-3-5'], answer: 0, explanation: 'Letter → Word → Sentence → Paragraph → Chapter', explanationTamil: 'எழுத்து → சொல் → வாக்கியம் → பத்தி → அத்தியாயம்', subject: 'General Intelligence', difficulty: 'easy' },
      { id: 'ssc-gi-3', question: 'Find the missing number: 4, 9, 16, 25, ?', questionTamil: 'விடுபட்ட எண்ணைக் கண்டறியவும்: 4, 9, 16, 25, ?', options: ['30', '36', '49', '64'], optionsTamil: ['30', '36', '49', '64'], answer: 1, explanation: 'Pattern: 2², 3², 4², 5², 6² = 36', explanationTamil: 'முறை: 2², 3², 4², 5², 6² = 36', subject: 'General Intelligence', difficulty: 'easy' },
      { id: 'ssc-gi-4', question: 'If WATER is coded as XBUFS, how is RIVER coded?', questionTamil: 'WATER என்பது XBUFS என குறியீடு செய்யப்பட்டால், RIVER எவ்வாறு குறியீடு செய்யப்படும்?', options: ['SJWFS', 'SJVFS', 'SKVFS', 'SJWES'], optionsTamil: ['SJWFS', 'SJVFS', 'SKVFS', 'SJWES'], answer: 0, explanation: 'Each letter +1: R→S, I→J, V→W, E→F, R→S = SJWFS', explanationTamil: 'ஒவ்வொரு எழுத்தும் +1: R→S, I→J, V→W, E→F, R→S = SJWFS', subject: 'General Intelligence', difficulty: 'medium' },
      { id: 'ssc-gi-5', question: 'In a certain code, SISTER is written as RHRSDQ. How is MOTHER written?', questionTamil: 'ஒரு குறியீட்டில், SISTER என்பது RHRSDQ என எழுதப்பட்டால், MOTHER எவ்வாறு எழுதப்படும்?', options: ['LNSGDQ', 'LNSQDG', 'NLSGDQ', 'LNSGDR'], optionsTamil: ['LNSGDQ', 'LNSQDG', 'NLSGDQ', 'LNSGDR'], answer: 0, explanation: 'Each letter -1: M→L, O→N, T→S, H→G, E→D, R→Q = LNSGDQ', explanationTamil: 'ஒவ்வொரு எழுத்தும் -1: M→L, O→N, T→S, H→G, E→D, R→Q = LNSGDQ', subject: 'General Intelligence', difficulty: 'medium' },
      { id: 'ssc-gi-6', question: 'Find the odd one out: 27, 35, 47, 52, 63', questionTamil: 'வித்தியாசமானதை கண்டறியவும்: 27, 35, 47, 52, 63', options: ['27', '35', '52', '63'], optionsTamil: ['27', '35', '52', '63'], answer: 2, explanation: 'All except 52 are odd numbers. 52 is even', explanationTamil: '52 தவிர மற்றவை ஒற்றைப்படை எண்கள். 52 இரட்டைப்படை', subject: 'General Intelligence', difficulty: 'easy' },
      { id: 'ssc-gi-7', question: 'A is the brother of B. C is the mother of A. D is the father of C. How is B related to D?', questionTamil: 'A என்பவர் B இன் சகோதரன். C என்பவர் A இன் தாய். D என்பவர் C இன் தந்தை. B, D க்கு என்ன உறவு?', options: ['Grandson/Granddaughter', 'Son/Daughter', 'Nephew/Niece', 'Brother/Sister'], optionsTamil: ['பேரன்/பேத்தி', 'மகன்/மகள்', 'மருமகன்/மருமகள்', 'சகோதரன்/சகோதரி'], answer: 0, explanation: 'C is A & B\'s mother, D is C\'s father. So D is A & B\'s grandfather. B is D\'s grandchild', explanationTamil: 'C என்பவர் A & B இன் தாய், D என்பவர் C இன் தந்தை. எனவே D என்பவர் A & B இன் தாத்தா. B என்பவர் D இன் பேரன்/பேத்தி', subject: 'General Intelligence', difficulty: 'medium' },
      { id: 'ssc-eng-1', question: 'Choose the correct synonym of "ABUNDANT":', questionTamil: '"ABUNDANT" இன் சரியான ஒத்த சொல்லைத் தேர்ந்தெடுக்கவும்:', options: ['Scarce', 'Plentiful', 'Limited', 'Rare'], optionsTamil: ['பற்றாக்குறை', 'ஏராளமான', 'குறைந்த', 'அரிதான'], answer: 1, explanation: 'Abundant = existing in large quantities = Plentiful', explanationTamil: 'Abundant = அதிக அளவில் இருப்பது = Plentiful (ஏராளமான)', subject: 'English', difficulty: 'easy' },
      { id: 'ssc-eng-2', question: 'One word for "A person who loves books":', questionTamil: '"புத்தகங்களை விரும்புபவர்" என்பதற்கான ஒரு சொல்:', options: ['Bibliophile', 'Philatelist', 'Numismatist', 'Connoisseur'], optionsTamil: ['Bibliophile', 'Philatelist', 'Numismatist', 'Connoisseur'], answer: 0, explanation: 'Bibliophile = book lover. Philatelist = stamp collector', explanationTamil: 'Bibliophile = புத்தக ஆர்வலர். Philatelist = முத்திரை சேகரிப்பாளர்', subject: 'English', difficulty: 'medium' },
      { id: 'ssc-eng-3', question: 'Choose the antonym of "DILIGENT":', questionTamil: '"DILIGENT" இன் எதிர்ச்சொல்லைத் தேர்ந்தெடுக்கவும்:', options: ['Hardworking', 'Active', 'Lazy', 'Careful'], optionsTamil: ['கடினமாக உழைக்கும்', 'சுறுசுறுப்பான', 'சோம்பேறி', 'கவனமான'], answer: 2, explanation: 'Diligent means hardworking; opposite is Lazy', explanationTamil: 'Diligent என்றால் கடினமாக உழைக்கும்; எதிர்ச்சொல் Lazy (சோம்பேறி)', subject: 'English', difficulty: 'easy' },
      { id: 'ssc-eng-4', question: 'Fill in the blank: "He _____ working in this office since 2010."', questionTamil: 'இடைவெளியை நிரப்புக: "He _____ working in this office since 2010."', options: ['is', 'was', 'has been', 'have been'], optionsTamil: ['is', 'was', 'has been', 'have been'], answer: 2, explanation: '"Since" with present perfect continuous: has been working', explanationTamil: '"Since" உடன் present perfect continuous: has been working', subject: 'English', difficulty: 'easy' },
      { id: 'ssc-eng-5', question: 'Idiom "Hit the nail on the head" means:', questionTamil: '"Hit the nail on the head" என்ற மரபுத்தொடரின் பொருள்:', options: ['To hurt someone', 'To do something exactly right', 'To hammer something', 'To fail badly'], optionsTamil: ['யாரையாவது காயப்படுத்துவது', 'சரியாகச் செய்வது', 'எதையாவது சுத்தியால் அடிப்பது', 'மோசமாக தோல்வியடைவது'], answer: 1, explanation: 'To hit the nail on the head = to do or say something exactly right', explanationTamil: 'Hit the nail on the head = எதையாவது சரியாகச் செய்வது அல்லது சொல்வது', subject: 'English', difficulty: 'medium' },
      { id: 'ssc-eng-6', question: 'Spot the error: "Each of the students have (a)/ completed their (b)/ assignment on time. (c)/ No error (d)"', questionTamil: 'பிழையைக் கண்டறியவும்: "Each of the students have (a)/ completed their (b)/ assignment on time. (c)/ No error (d)"', options: ['a', 'b', 'c', 'd'], optionsTamil: ['a', 'b', 'c', 'd'], answer: 0, explanation: '"Each" takes singular verb. Correct: "has completed"', explanationTamil: '"Each" ஒருமை வினைச்சொல் எடுக்கும். சரி: "has completed"', subject: 'English', difficulty: 'medium' },
      { id: 'ssc-quant-1', question: 'If a:b = 2:3 and b:c = 4:5, then a:b:c = ?', questionTamil: 'a:b = 2:3 மற்றும் b:c = 4:5 எனில், a:b:c = ?', options: ['8:12:15', '2:3:5', '4:6:5', '8:12:10'], optionsTamil: ['8:12:15', '2:3:5', '4:6:5', '8:12:10'], answer: 0, explanation: 'a:b = 2:3 = 8:12, b:c = 4:5 = 12:15. So a:b:c = 8:12:15', explanationTamil: 'a:b = 2:3 = 8:12, b:c = 4:5 = 12:15. எனவே a:b:c = 8:12:15', subject: 'Quantitative Aptitude', difficulty: 'medium' },
      { id: 'ssc-quant-2', question: 'Compound interest on ₹5000 for 2 years at 10% p.a. is:', questionTamil: '₹5000 க்கு 10% வருடாந்திர வட்டியில் 2 வருடங்களுக்கான கூட்டு வட்டி:', options: ['₹1000', '₹1050', '₹1100', '₹1025'], optionsTamil: ['₹1000', '₹1050', '₹1100', '₹1025'], answer: 1, explanation: 'CI = 5000(1.1)² - 5000 = 6050 - 5000 = ₹1050', explanationTamil: 'கூ.வ = 5000(1.1)² - 5000 = 6050 - 5000 = ₹1050', subject: 'Quantitative Aptitude', difficulty: 'medium' },
      { id: 'ssc-quant-3', question: 'A can do a work in 12 days, B can do it in 15 days. In how many days will they complete together?', questionTamil: 'A ஒரு வேலையை 12 நாட்களில் செய்வார், B 15 நாட்களில் செய்வார். இருவரும் சேர்ந்து எத்தனை நாட்களில் முடிப்பார்கள்?', options: ['6 2/3 days', '7 days', '8 days', '9 days'], optionsTamil: ['6 2/3 நாட்கள்', '7 நாட்கள்', '8 நாட்கள்', '9 நாட்கள்'], answer: 0, explanation: 'Combined work/day = 1/12 + 1/15 = 9/60 = 3/20. Days = 20/3 = 6 2/3', explanationTamil: 'ஒருநாள் வேலை = 1/12 + 1/15 = 9/60 = 3/20. நாட்கள் = 20/3 = 6 2/3', subject: 'Quantitative Aptitude', difficulty: 'medium' },
      { id: 'ssc-quant-4', question: 'The average of 5 numbers is 20. If one number is excluded, the average becomes 18. The excluded number is:', questionTamil: '5 எண்களின் சராசரி 20. ஒரு எண் நீக்கப்பட்டால், சராசரி 18 ஆகிறது. நீக்கப்பட்ட எண்:', options: ['28', '30', '26', '24'], optionsTamil: ['28', '30', '26', '24'], answer: 0, explanation: 'Sum = 5×20 = 100. After exclusion = 4×18 = 72. Excluded = 100-72 = 28', explanationTamil: 'கூட்டுத்தொகை = 5×20 = 100. நீக்கிய பின் = 4×18 = 72. நீக்கப்பட்டது = 100-72 = 28', subject: 'Quantitative Aptitude', difficulty: 'easy' },
      { id: 'ssc-quant-5', question: 'A train 200m long crosses a platform 300m long in 25 seconds. Find the speed of train in km/hr:', questionTamil: '200 மீ நீளமுள்ள ரயில் 300 மீ நீளமுள்ள மேடையை 25 வினாடிகளில் கடக்கிறது. ரயிலின் வேகம் கி.மீ/மணியில்:', options: ['72 km/hr', '80 km/hr', '60 km/hr', '90 km/hr'], optionsTamil: ['72 கி.மீ/மணி', '80 கி.மீ/மணி', '60 கி.மீ/மணி', '90 கி.மீ/மணி'], answer: 0, explanation: 'Distance = 200+300 = 500m. Speed = 500/25 = 20 m/s = 72 km/hr', explanationTamil: 'தூரம் = 200+300 = 500 மீ. வேகம் = 500/25 = 20 மீ/வி = 72 கி.மீ/மணி', subject: 'Quantitative Aptitude', difficulty: 'medium' },
      { id: 'ssc-quant-6', question: 'The area of a triangle with sides 5cm, 12cm and 13cm is:', questionTamil: '5 செமீ, 12 செமீ மற்றும் 13 செமீ பக்கங்கள் கொண்ட முக்கோணத்தின் பரப்பளவு:', options: ['30 cm²', '35 cm²', '40 cm²', '25 cm²'], optionsTamil: ['30 செமீ²', '35 செமீ²', '40 செமீ²', '25 செமீ²'], answer: 0, explanation: 'This is a right triangle (5² + 12² = 13²). Area = ½ × 5 × 12 = 30 cm²', explanationTamil: 'இது செங்கோண முக்கோணம் (5² + 12² = 13²). பரப்பளவு = ½ × 5 × 12 = 30 செமீ²', subject: 'Quantitative Aptitude', difficulty: 'medium' },
      { id: 'ssc-ga-1', question: 'The currency of Japan is:', questionTamil: 'ஜப்பானின் நாணயம்:', options: ['Yuan', 'Yen', 'Won', 'Ringgit'], optionsTamil: ['யுவான்', 'யென்', 'வோன்', 'ரிங்கிட்'], answer: 1, explanation: "Japan's currency is Yen (JPY)", explanationTamil: 'ஜப்பானின் நாணயம் யென் (JPY)', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'ssc-ga-2', question: 'First woman Prime Minister of India:', questionTamil: 'இந்தியாவின் முதல் பெண் பிரதமர்:', options: ['Sarojini Naidu', 'Indira Gandhi', 'Pratibha Patil', 'Sushma Swaraj'], optionsTamil: ['சரோஜினி நாயுடு', 'இந்திரா காந்தி', 'பிரதிபா பாட்டீல்', 'சுஷ்மா ஸ்வராஜ்'], answer: 1, explanation: 'Indira Gandhi was first and only woman PM of India', explanationTamil: 'இந்திரா காந்தி இந்தியாவின் முதல் மற்றும் ஒரே பெண் பிரதமர்', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'ssc-ga-3', question: 'National Animal of India is:', questionTamil: 'இந்தியாவின் தேசிய விலங்கு:', options: ['Lion', 'Elephant', 'Tiger', 'Peacock'], optionsTamil: ['சிங்கம்', 'யானை', 'புலி', 'மயில்'], answer: 2, explanation: 'Bengal Tiger is the National Animal of India', explanationTamil: 'வங்காளப் புலி இந்தியாவின் தேசிய விலங்கு', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'ssc-ga-4', question: 'Who is known as the "Father of the Indian Constitution"?', questionTamil: '"இந்திய அரசியலமைப்பின் தந்தை" என்று அறியப்படுபவர் யார்?', options: ['Mahatma Gandhi', 'Jawaharlal Nehru', 'B.R. Ambedkar', 'Sardar Patel'], optionsTamil: ['மகாத்மா காந்தி', 'ஜவஹர்லால் நேரு', 'பி.ஆர். அம்பேத்கர்', 'சர்தார் படேல்'], answer: 2, explanation: 'Dr. B.R. Ambedkar was chairman of the Drafting Committee', explanationTamil: 'டாக்டர் பி.ஆர். அம்பேத்கர் வரைவுக் குழுவின் தலைவராக இருந்தார்', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'ssc-ga-5', question: 'The longest river in India is:', questionTamil: 'இந்தியாவின் மிக நீளமான நதி:', options: ['Yamuna', 'Godavari', 'Ganga', 'Brahmaputra'], optionsTamil: ['யமுனா', 'கோதாவரி', 'கங்கை', 'பிரம்மபுத்ரா'], answer: 2, explanation: 'Ganga is the longest river in India (2525 km)', explanationTamil: 'கங்கை இந்தியாவின் மிக நீளமான நதி (2525 கி.மீ)', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'ssc-ga-6', question: 'Who wrote "Geetanjali"?', questionTamil: '"கீதாஞ்சலி" யை எழுதியவர் யார்?', options: ['Premchand', 'Rabindranath Tagore', 'Bankim Chandra', 'Sarojini Naidu'], optionsTamil: ['பிரேம்சந்த்', 'ரவீந்திரநாத் தாகூர்', 'பங்கிம் சந்திரா', 'சரோஜினி நாயுடு'], answer: 1, explanation: 'Rabindranath Tagore wrote Geetanjali, won Nobel Prize in 1913', explanationTamil: 'ரவீந்திரநாத் தாகூர் கீதாஞ்சலியை எழுதினார், 1913 இல் நோபல் பரிசு பெற்றார்', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'ssc-ga-7', question: 'Vitamin C is also known as:', questionTamil: 'வைட்டமின் C என்றும் அழைக்கப்படுவது:', options: ['Retinol', 'Thiamine', 'Ascorbic Acid', 'Tocopherol'], optionsTamil: ['ரெட்டினால்', 'தயாமின்', 'அஸ்கார்பிக் அமிலம்', 'டோகோபெரால்'], answer: 2, explanation: 'Vitamin C = Ascorbic Acid, found in citrus fruits', explanationTamil: 'வைட்டமின் C = அஸ்கார்பிக் அமிலம், சிட்ரஸ் பழங்களில் காணப்படுகிறது', subject: 'General Awareness', difficulty: 'easy' }
    ]
  },
  {
    id: 'ssc-mts',
    name: 'SSC MTS (Multi Tasking Staff)',
    nameTamil: 'SSC MTS (பல்பணி ஊழியர்)',
    qualification: '10th Pass',
    qualificationTamil: '10ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 25 years',
    salary: '₹18,000 - ₹56,900/month',
    selectionProcess: 'Paper 1 (CBT) → Paper 2 (Descriptive) → Document Verification',
    selectionProcessTamil: 'தாள் 1 (CBT) → தாள் 2 (விளக்க) → ஆவண சரிபார்ப்பு',
    posts: ['Peon', 'Watchman', 'Gardener', 'Sweeper'],
    postsTamil: ['பியூன்', 'காவலாளி', 'தோட்டக்காரர்', 'சுத்தப்படுத்துபவர்'],
    syllabus: {
      main: [
        {
          name: 'SSC MTS Syllabus',
          nameTamil: 'SSC MTS பாடத்திட்டம்',
          topics: [
            { name: 'General Intelligence & Reasoning', nameTamil: 'பொது புத்திசாலித்தனம் & தர்க்கம்', subtopics: ['Analogy', 'Classification', 'Series', 'Coding-Decoding', 'Directions', 'Blood Relations'] },
            { name: 'Numerical Aptitude', nameTamil: 'எண் திறன்', subtopics: ['Number System', 'Percentage', 'Ratio', 'Time & Work', 'Average', 'Profit & Loss'] },
            { name: 'General English', nameTamil: 'பொது ஆங்கிலம்', subtopics: ['Grammar', 'Vocabulary', 'Comprehension'] },
            { name: 'General Awareness', nameTamil: 'பொது விழிப்புணர்வு', subtopics: ['Current Affairs', 'History', 'Geography', 'Polity', 'Science'] }
          ]
        }
      ]
    },
    pyq: [
      // General Intelligence & Reasoning
      { id: 'mts-gi-1', question: 'Find the next number: 2, 5, 10, 17, 26, ?', questionTamil: 'அடுத்த எண்ணைக் கண்டறியவும்: 2, 5, 10, 17, 26, ?', options: ['35', '37', '39', '41'], optionsTamil: ['35', '37', '39', '41'], answer: 1, explanation: 'Pattern: +3, +5, +7, +9, +11. Next = 26 + 11 = 37', explanationTamil: 'முறை: +3, +5, +7, +9, +11. அடுத்தது = 26 + 11 = 37', subject: 'General Intelligence', difficulty: 'easy' },
      { id: 'mts-gi-2', question: 'If APPLE = 50, BALL = 27, then CAT = ?', questionTamil: 'APPLE = 50, BALL = 27 எனில், CAT = ?', options: ['24', '27', '30', '21'], optionsTamil: ['24', '27', '30', '21'], answer: 0, explanation: 'Sum of letter positions: C(3)+A(1)+T(20) = 24', explanationTamil: 'எழுத்து நிலைகளின் கூட்டுத்தொகை: C(3)+A(1)+T(20) = 24', subject: 'General Intelligence', difficulty: 'easy' },
      { id: 'mts-gi-3', question: 'Select the odd one: Triangle, Square, Circle, Rectangle', questionTamil: 'வேறுபட்டதைத் தேர்ந்தெடுக்கவும்: முக்கோணம், சதுரம், வட்டம், செவ்வகம்', options: ['Triangle', 'Square', 'Circle', 'Rectangle'], optionsTamil: ['முக்கோணம்', 'சதுரம்', 'வட்டம்', 'செவ்வகம்'], answer: 2, explanation: 'Circle has no corners; others have angles/corners', explanationTamil: 'வட்டத்திற்கு மூலைகள் இல்லை; மற்றவற்றிற்கு கோணங்கள்/மூலைகள் உள்ளன', subject: 'General Intelligence', difficulty: 'easy' },
      { id: 'mts-gi-4', question: 'If South becomes North, East becomes West, then what becomes South-East?', questionTamil: 'தெற்கு வடக்காக மாறினால், கிழக்கு மேற்காக மாறினால், தென்கிழக்கு எதுவாக மாறும்?', options: ['North-West', 'South-West', 'North-East', 'South-East'], optionsTamil: ['வடமேற்கு', 'தென்மேற்கு', 'வடகிழக்கு', 'தென்கிழக்கு'], answer: 0, explanation: 'South → North, East → West. So South-East → North-West', explanationTamil: 'தெற்கு → வடக்கு, கிழக்கு → மேற்கு. எனவே தென்கிழக்கு → வடமேற்கு', subject: 'General Intelligence', difficulty: 'medium' },
      { id: 'mts-gi-5', question: 'Complete the analogy: Pen : Write :: Knife : ?', questionTamil: 'ஒப்புமையை முழுமையாக்குக: பேனா : எழுது :: கத்தி : ?', options: ['Sharp', 'Cut', 'Steel', 'Kitchen'], optionsTamil: ['கூர்மை', 'வெட்டு', 'எஃகு', 'சமையலறை'], answer: 1, explanation: 'Pen is used to Write, Knife is used to Cut', explanationTamil: 'பேனா எழுத பயன்படுகிறது, கத்தி வெட்ட பயன்படுகிறது', subject: 'General Intelligence', difficulty: 'easy' },
      { id: 'mts-gi-6', question: 'Ram walks 5 km North, then 3 km East, then 5 km South. How far is he from start?', questionTamil: 'ராம் 5 கி.மீ வடக்கு, பின் 3 கி.மீ கிழக்கு, பின் 5 கி.மீ தெற்கு நடக்கிறார். தொடக்கத்திலிருந்து எவ்வளவு தூரம்?', options: ['3 km', '5 km', '8 km', '13 km'], optionsTamil: ['3 கி.மீ', '5 கி.மீ', '8 கி.மீ', '13 கி.மீ'], answer: 0, explanation: 'North-South cancel out. Only 3 km East remains', explanationTamil: 'வடக்கு-தெற்கு ரத்தாகிறது. 3 கி.மீ கிழக்கு மட்டும் எஞ்சுகிறது', subject: 'General Intelligence', difficulty: 'easy' },
      // Numerical Aptitude
      { id: 'mts-num-1', question: 'What is 15% of 200?', questionTamil: '200 இன் 15% என்ன?', options: ['25', '30', '35', '40'], optionsTamil: ['25', '30', '35', '40'], answer: 1, explanation: '15% of 200 = 15/100 × 200 = 30', explanationTamil: '200 இன் 15% = 15/100 × 200 = 30', subject: 'Numerical Aptitude', difficulty: 'easy' },
      { id: 'mts-num-2', question: 'The LCM of 4, 6 and 8 is:', questionTamil: '4, 6 மற்றும் 8 இன் மீச்சிறு பொது மடங்கு:', options: ['24', '48', '12', '36'], optionsTamil: ['24', '48', '12', '36'], answer: 0, explanation: '4 = 2², 6 = 2×3, 8 = 2³. LCM = 2³×3 = 24', explanationTamil: '4 = 2², 6 = 2×3, 8 = 2³. மீ.பொ.ம = 2³×3 = 24', subject: 'Numerical Aptitude', difficulty: 'easy' },
      { id: 'mts-num-3', question: 'A shopkeeper sells an article at 20% profit. If cost price is ₹500, selling price is:', questionTamil: 'ஒரு கடைக்காரர் 20% லாபத்தில் ஒரு பொருளை விற்கிறார். அடக்க விலை ₹500 எனில், விற்பனை விலை:', options: ['₹550', '₹600', '₹650', '₹700'], optionsTamil: ['₹550', '₹600', '₹650', '₹700'], answer: 1, explanation: 'SP = CP + 20% of CP = 500 + 100 = ₹600', explanationTamil: 'வி.வி = அ.வி + அ.வியின் 20% = 500 + 100 = ₹600', subject: 'Numerical Aptitude', difficulty: 'easy' },
      { id: 'mts-num-4', question: 'The ratio 3:4 is same as:', questionTamil: '3:4 என்ற விகிதம் இதற்குச் சமம்:', options: ['6:8', '9:16', '4:3', '12:18'], optionsTamil: ['6:8', '9:16', '4:3', '12:18'], answer: 0, explanation: '3:4 = 6:8 (multiply both by 2)', explanationTamil: '3:4 = 6:8 (இரண்டையும் 2 ஆல் பெருக்கவும்)', subject: 'Numerical Aptitude', difficulty: 'easy' },
      { id: 'mts-num-5', question: 'Simple Interest on ₹1000 at 5% for 2 years is:', questionTamil: '₹1000 க்கு 5% வட்டியில் 2 வருடங்களுக்கான எளிய வட்டி:', options: ['₹50', '₹100', '₹150', '₹200'], optionsTamil: ['₹50', '₹100', '₹150', '₹200'], answer: 1, explanation: 'SI = PRT/100 = 1000×5×2/100 = ₹100', explanationTamil: 'எ.வ = PRT/100 = 1000×5×2/100 = ₹100', subject: 'Numerical Aptitude', difficulty: 'easy' },
      { id: 'mts-num-6', question: 'If the perimeter of a square is 48 cm, its area is:', questionTamil: 'ஒரு சதுரத்தின் சுற்றளவு 48 செமீ எனில், அதன் பரப்பளவு:', options: ['144 cm²', '96 cm²', '120 cm²', '100 cm²'], optionsTamil: ['144 செமீ²', '96 செமீ²', '120 செமீ²', '100 செமீ²'], answer: 0, explanation: 'Side = 48/4 = 12 cm. Area = 12² = 144 cm²', explanationTamil: 'பக்கம் = 48/4 = 12 செமீ. பரப்பளவு = 12² = 144 செமீ²', subject: 'Numerical Aptitude', difficulty: 'easy' },
      // General English
      { id: 'mts-eng-1', question: 'Choose the correct spelling:', questionTamil: 'சரியான எழுத்துப்பிழையைத் தேர்ந்தெடுக்கவும்:', options: ['Occassion', 'Occasion', 'Ocassion', 'Ocasion'], optionsTamil: ['Occassion', 'Occasion', 'Ocassion', 'Ocasion'], answer: 1, explanation: 'Correct spelling is "Occasion"', explanationTamil: 'சரியான எழுத்துப்பிழை "Occasion"', subject: 'English', difficulty: 'easy' },
      { id: 'mts-eng-2', question: 'Synonym of "Big":', questionTamil: '"Big" இன் ஒத்த சொல்:', options: ['Small', 'Large', 'Tiny', 'Little'], optionsTamil: ['சிறிய', 'பெரிய', 'குட்டி', 'சிறு'], answer: 1, explanation: 'Big = Large (both mean of great size)', explanationTamil: 'Big = Large (இரண்டும் பெரிய அளவு என்று பொருள்)', subject: 'English', difficulty: 'easy' },
      { id: 'mts-eng-3', question: 'Antonym of "Happy":', questionTamil: '"Happy" இன் எதிர்ச்சொல்:', options: ['Joyful', 'Sad', 'Glad', 'Cheerful'], optionsTamil: ['மகிழ்ச்சியான', 'சோகமான', 'களிப்பான', 'உற்சாகமான'], answer: 1, explanation: 'Happy (cheerful) is opposite of Sad (unhappy)', explanationTamil: 'Happy (மகிழ்ச்சியான) எதிர்ச்சொல் Sad (சோகமான)', subject: 'English', difficulty: 'easy' },
      { id: 'mts-eng-4', question: 'Fill in the blank: "She _____ to school every day."', questionTamil: 'இடைவெளியை நிரப்புக: "She _____ to school every day."', options: ['go', 'goes', 'going', 'went'], optionsTamil: ['go', 'goes', 'going', 'went'], answer: 1, explanation: 'Subject "She" is singular, present tense needs "goes"', explanationTamil: 'எழுவாய் "She" ஒருமை, நிகழ்கால வினைச்சொல் "goes" தேவை', subject: 'English', difficulty: 'easy' },
      { id: 'mts-eng-5', question: 'Plural of "Child":', questionTamil: '"Child" இன் பன்மை:', options: ['Childs', 'Children', 'Childrens', 'Childies'], optionsTamil: ['Childs', 'Children', 'Childrens', 'Childies'], answer: 1, explanation: 'Irregular plural: Child → Children', explanationTamil: 'ஒழுங்கற்ற பன்மை: Child → Children', subject: 'English', difficulty: 'easy' },
      // General Awareness
      { id: 'mts-ga-1', question: 'Capital of India is:', questionTamil: 'இந்தியாவின் தலைநகரம்:', options: ['Mumbai', 'Kolkata', 'New Delhi', 'Chennai'], optionsTamil: ['மும்பை', 'கொல்கத்தா', 'புது தில்லி', 'சென்னை'], answer: 2, explanation: 'New Delhi is the capital of India', explanationTamil: 'புது தில்லி இந்தியாவின் தலைநகரம்', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'mts-ga-2', question: 'Independence Day of India is celebrated on:', questionTamil: 'இந்திய சுதந்திர தினம் கொண்டாடப்படும் நாள்:', options: ['26th January', '15th August', '2nd October', '14th November'], optionsTamil: ['ஜனவரி 26', 'ஆகஸ்ட் 15', 'அக்டோபர் 2', 'நவம்பர் 14'], answer: 1, explanation: 'India got independence on 15th August 1947', explanationTamil: 'இந்தியா 1947 ஆகஸ்ட் 15 அன்று சுதந்திரம் பெற்றது', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'mts-ga-3', question: 'Who invented the telephone?', questionTamil: 'தொலைபேசியை கண்டுபிடித்தவர் யார்?', options: ['Thomas Edison', 'Alexander Graham Bell', 'Isaac Newton', 'Guglielmo Marconi'], optionsTamil: ['தாமஸ் எடிசன்', 'அலெக்சாண்டர் கிரஹாம் பெல்', 'ஐசக் நியூட்டன்', 'குக்லியெல்மோ மார்கோனி'], answer: 1, explanation: 'Alexander Graham Bell invented the telephone in 1876', explanationTamil: 'அலெக்சாண்டர் கிரஹாம் பெல் 1876 இல் தொலைபேசியை கண்டுபிடித்தார்', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'mts-ga-4', question: 'National Bird of India is:', questionTamil: 'இந்தியாவின் தேசிய பறவை:', options: ['Sparrow', 'Eagle', 'Peacock', 'Parrot'], optionsTamil: ['சிட்டுக்குருவி', 'கழுகு', 'மயில்', 'கிளி'], answer: 2, explanation: 'Indian Peafowl (Peacock) is the National Bird of India', explanationTamil: 'இந்திய மயில் இந்தியாவின் தேசிய பறவை', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'mts-ga-5', question: 'How many states are there in India?', questionTamil: 'இந்தியாவில் எத்தனை மாநிலங்கள் உள்ளன?', options: ['28', '29', '30', '27'], optionsTamil: ['28', '29', '30', '27'], answer: 0, explanation: 'India has 28 states and 8 union territories', explanationTamil: 'இந்தியாவில் 28 மாநிலங்களும் 8 யூனியன் பிரதேசங்களும் உள்ளன', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'mts-ga-6', question: 'Which planet is known as the "Red Planet"?', questionTamil: '"சிவப்பு கிரகம்" என்று அறியப்படுவது எது?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], optionsTamil: ['வெள்ளி', 'செவ்வாய்', 'வியாழன்', 'சனி'], answer: 1, explanation: 'Mars is called Red Planet due to iron oxide on its surface', explanationTamil: 'செவ்வாய் அதன் மேற்பரப்பில் உள்ள இரும்பு ஆக்சைடு காரணமாக சிவப்பு கிரகம் என்று அழைக்கப்படுகிறது', subject: 'General Awareness', difficulty: 'easy' }
    ]
  },
  {
    id: 'ssc-gd',
    name: 'SSC GD Constable',
    nameTamil: 'SSC GD காவலர்',
    qualification: '10th/12th Pass',
    qualificationTamil: '10/12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 23 years',
    salary: '₹23,527/month',
    selectionProcess: 'CBT → PET/PST → Medical → Document Verification',
    selectionProcessTamil: 'CBT → உடற்தகுதி → மருத்துவம் → ஆவண சரிபார்ப்பு',
    posts: ['BSF', 'CRPF', 'CISF', 'ITBP', 'SSB', 'Assam Rifles'],
    syllabus: {
      main: [
        {
          name: 'SSC GD Constable Syllabus',
          nameTamil: 'SSC GD காவலர் பாடத்திட்டம்',
          topics: [
            { name: 'General Intelligence & Reasoning', nameTamil: 'பொது புத்திசாலித்தனம் & தர்க்கம்', subtopics: ['Analogy', 'Classification', 'Series', 'Coding-Decoding', 'Blood Relations', 'Directions'] },
            { name: 'General Knowledge & Awareness', nameTamil: 'பொது அறிவு & விழிப்புணர்வு', subtopics: ['Current Affairs', 'History', 'Geography', 'Polity', 'Economy', 'Science'] },
            { name: 'Elementary Mathematics', nameTamil: 'அடிப்படை கணிதம்', subtopics: ['Number System', 'Percentage', 'Ratio', 'Average', 'Time & Work', 'Mensuration'] },
            { name: 'English/Hindi', nameTamil: 'ஆங்கிலம்/இந்தி', subtopics: ['Grammar', 'Vocabulary', 'Comprehension'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'ssc-gd-1', question: 'Who is known as the "Iron Man of India"?', questionTamil: '"இந்தியாவின் இரும்பு மனிதர்" என்று அறியப்படுபவர் யார்?', options: ['Jawaharlal Nehru', 'Sardar Vallabhbhai Patel', 'Subhash Chandra Bose', 'Mahatma Gandhi'], optionsTamil: ['ஜவஹர்லால் நேரு', 'சர்தார் வல்லபாய் படேல்', 'சுபாஷ் சந்திர போஸ்', 'மகாத்மா காந்தி'], answer: 1, explanation: 'Sardar Vallabhbhai Patel is called Iron Man for unifying 562 princely states', explanationTamil: 'சர்தார் வல்லபாய் படேல் 562 சமஸ்தானங்களை ஒன்றிணைத்ததற்காக இரும்பு மனிதர் என்று அழைக்கப்படுகிறார்', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'ssc-gd-2', question: 'The largest gland in human body is:', questionTamil: 'மனித உடலில் மிகப்பெரிய சுரப்பி:', options: ['Thyroid', 'Liver', 'Pancreas', 'Pituitary'], optionsTamil: ['தைராய்டு', 'கல்லீரல்', 'கணையம்', 'பிட்யூட்டரி'], answer: 1, explanation: 'Liver is the largest gland (weighs about 1.5 kg)', explanationTamil: 'கல்லீரல் மிகப்பெரிய சுரப்பி (சுமார் 1.5 கிலோ எடை)', subject: 'General Science', difficulty: 'easy' },
      { id: 'ssc-gd-3', question: 'Which Article of Constitution abolishes untouchability?', questionTamil: 'தீண்டாமையை ஒழிக்கும் அரசியலமைப்பின் சட்டப்பிரிவு எது?', options: ['Article 14', 'Article 15', 'Article 17', 'Article 21'], optionsTamil: ['சட்டப்பிரிவு 14', 'சட்டப்பிரிவு 15', 'சட்டப்பிரிவு 17', 'சட்டப்பிரிவு 21'], answer: 2, explanation: 'Article 17 abolishes untouchability and makes it punishable', explanationTamil: 'சட்டப்பிரிவு 17 தீண்டாமையை ஒழித்து தண்டனைக்குரிய குற்றமாக்குகிறது', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'ssc-gd-4', question: 'A train 150m long passes a pole in 15 seconds. Find its speed in km/hr.', questionTamil: '150மீ நீளமுள்ள ரயில் ஒரு கம்பத்தை 15 வினாடிகளில் கடக்கிறது. வேகத்தை கி.மீ/மணி கணக்கிடுக.', options: ['36 km/hr', '40 km/hr', '45 km/hr', '50 km/hr'], answer: 0, explanation: 'Speed = 150/15 = 10 m/s = 10 × 18/5 = 36 km/hr', explanationTamil: 'வேகம் = 150/15 = 10 மீ/வி = 10 × 18/5 = 36 கி.மீ/மணி', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'ssc-gd-5', question: 'Complete the series: 2, 6, 12, 20, 30, ?', questionTamil: 'தொடரை நிறைவு செய்க: 2, 6, 12, 20, 30, ?', options: ['40', '42', '44', '46'], answer: 1, explanation: 'Differences: 4, 6, 8, 10, 12. Next: 30 + 12 = 42', explanationTamil: 'வேறுபாடுகள்: 4, 6, 8, 10, 12. அடுத்தது: 30 + 12 = 42', subject: 'Reasoning', difficulty: 'medium' },
      { id: 'ssc-gd-6', question: 'Who invented the telephone?', questionTamil: 'தொலைபேசியை கண்டுபிடித்தவர் யார்?', options: ['Thomas Edison', 'Alexander Graham Bell', 'Marconi', 'Wright Brothers'], optionsTamil: ['தாமஸ் எடிசன்', 'அலெக்சாண்டர் கிரஹாம் பெல்', 'மார்கோனி', 'ரைட் சகோதரர்கள்'], answer: 1, explanation: 'Alexander Graham Bell invented telephone in 1876', explanationTamil: 'அலெக்சாண்டர் கிரஹாம் பெல் 1876 இல் தொலைபேசியை கண்டுபிடித்தார்', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'ssc-gd-7', question: 'The chemical name of Vitamin C is:', questionTamil: 'வைட்டமின் C இன் வேதியியல் பெயர்:', options: ['Retinol', 'Thiamine', 'Ascorbic Acid', 'Calciferol'], optionsTamil: ['ரெட்டினால்', 'தயாமின்', 'அஸ்கார்பிக் அமிலம்', 'கால்சிஃபெரால்'], answer: 2, explanation: 'Vitamin C = Ascorbic Acid (found in citrus fruits)', explanationTamil: 'வைட்டமின் C = அஸ்கார்பிக் அமிலம் (சிட்ரஸ் பழங்களில் காணப்படும்)', subject: 'General Science', difficulty: 'easy' },
      { id: 'ssc-gd-8', question: 'APPLE : ELPPA :: MANGO : ?', questionTamil: 'APPLE : ELPPA :: MANGO : ?', options: ['OGNAM', 'OGANM', 'MANOG', 'NAGOM'], answer: 0, explanation: 'Reverse of MANGO = OGNAM', explanationTamil: 'MANGO இன் தலைகீழ் = OGNAM', subject: 'Reasoning', difficulty: 'easy' },
      { id: 'ssc-gd-9', question: 'If 20% of a number is 80, what is the number?', questionTamil: 'ஒரு எண்ணின் 20% 80 எனில், அந்த எண் என்ன?', options: ['400', '320', '160', '500'], answer: 0, explanation: '20% of x = 80, x = 80 × 100/20 = 400', explanationTamil: 'x இன் 20% = 80, x = 80 × 100/20 = 400', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'ssc-gd-10', question: 'The Battle of Panipat in 1526 was fought between:', questionTamil: '1526 இல் பானிபட் போர் யாருக்கிடையே நடந்தது?', options: ['Babur and Ibrahim Lodi', 'Akbar and Hemu', 'Humayun and Sher Shah', 'Aurangzeb and Dara'], optionsTamil: ['பாபர் மற்றும் இப்ராஹிம் லோடி', 'அக்பர் மற்றும் ஹேமு', 'ஹுமாயூன் மற்றும் ஷேர் ஷா', 'அவுரங்கசீப் மற்றும் தாரா'], answer: 0, explanation: 'First Battle of Panipat (1526) - Babur defeated Ibrahim Lodi', explanationTamil: 'முதல் பானிபட் போர் (1526) - பாபர் இப்ராஹிம் லோடியை தோற்கடித்தார்', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'ssc-gd-11', question: 'Which river is called "Sorrow of Bengal"?', questionTamil: '"வங்காளத்தின் துயரம்" என்று அழைக்கப்படும் ஆறு எது?', options: ['Ganga', 'Brahmaputra', 'Damodar', 'Hooghly'], optionsTamil: ['கங்கா', 'பிரம்மபுத்ரா', 'தாமோதர்', 'ஹூக்லி'], answer: 2, explanation: 'Damodar river caused frequent floods in Bengal', explanationTamil: 'தாமோதர் ஆறு வங்காளத்தில் அடிக்கடி வெள்ளப்பெருக்கை ஏற்படுத்தியது', subject: 'Geography', difficulty: 'medium' },
      { id: 'ssc-gd-12', question: 'The SI unit of Force is:', questionTamil: 'விசையின் SI அலகு:', options: ['Joule', 'Newton', 'Watt', 'Pascal'], optionsTamil: ['ஜூல்', 'நியூட்டன்', 'வாட்', 'பாஸ்கல்'], answer: 1, explanation: 'Force is measured in Newton (N). 1 N = 1 kg⋅m/s²', explanationTamil: 'விசை நியூட்டன் (N) இல் அளவிடப்படுகிறது. 1 N = 1 கிகி⋅மீ/வி²', subject: 'General Science', difficulty: 'easy' },
      { id: 'ssc-gd-13', question: 'Find the odd one out: 8, 27, 64, 100, 125', questionTamil: 'ஒற்றையானதை கண்டறிக: 8, 27, 64, 100, 125', options: ['27', '64', '100', '125'], answer: 2, explanation: '8=2³, 27=3³, 64=4³, 125=5³. 100 is not a perfect cube', explanationTamil: '8=2³, 27=3³, 64=4³, 125=5³. 100 ஒரு முழுமையான கன எண் அல்ல', subject: 'Reasoning', difficulty: 'medium' },
      { id: 'ssc-gd-14', question: 'India shares longest border with which country?', questionTamil: 'இந்தியா எந்த நாட்டுடன் மிக நீளமான எல்லையை பகிர்ந்துள்ளது?', options: ['Pakistan', 'China', 'Nepal', 'Bangladesh'], optionsTamil: ['பாகிஸ்தான்', 'சீனா', 'நேபாளம்', 'வங்கதேசம்'], answer: 3, explanation: 'India shares longest border with Bangladesh (4,096 km)', explanationTamil: 'இந்தியா வங்கதேசத்துடன் மிக நீளமான எல்லையை பகிர்ந்துள்ளது (4,096 கி.மீ)', subject: 'Geography', difficulty: 'medium' },
      { id: 'ssc-gd-15', question: 'The national bird of India is:', questionTamil: 'இந்தியாவின் தேசிய பறவை:', options: ['Parrot', 'Peacock', 'Sparrow', 'Crane'], optionsTamil: ['கிளி', 'மயில்', 'சிட்டுக்குருவி', 'நாரை'], answer: 1, explanation: 'Peacock (Pavo cristatus) is the national bird of India', explanationTamil: 'மயில் (பாவோ கிரிஸ்டாடஸ்) இந்தியாவின் தேசிய பறவை', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'ssc-gd-16', question: 'A is B\'s brother. C is A\'s mother. D is C\'s father. What is B to D?', questionTamil: 'A என்பவர் B யின் சகோதரர். C என்பவர் A யின் தாய். D என்பவர் C யின் தந்தை. B என்பவர் D க்கு என்ன?', options: ['Grandfather', 'Grandson/Granddaughter', 'Son', 'Father'], optionsTamil: ['தாத்தா', 'பேரன்/பேத்தி', 'மகன்', 'தந்தை'], answer: 1, explanation: 'D is grandfather of A and B. So B is grandchild of D', explanationTamil: 'D என்பவர் A மற்றும் B யின் தாத்தா. எனவே B என்பவர் D யின் பேரன்/பேத்தி', subject: 'Reasoning', difficulty: 'medium' },
      { id: 'ssc-gd-17', question: 'The process of respiration in plants occurs in:', questionTamil: 'தாவரங்களில் சுவாச செயல்முறை நடைபெறும் இடம்:', options: ['Chloroplast', 'Mitochondria', 'Nucleus', 'Ribosome'], optionsTamil: ['பசுங்கணிகம்', 'மைட்டோகாண்ட்ரியா', 'உட்கரு', 'ரைபோசோம்'], answer: 1, explanation: 'Respiration occurs in mitochondria (powerhouse of cell)', explanationTamil: 'சுவாசம் மைட்டோகாண்ட்ரியாவில் நடைபெறுகிறது (செல்லின் சக்தி நிலையம்)', subject: 'General Science', difficulty: 'medium' },
      { id: 'ssc-gd-18', question: 'The Quit India Movement was launched in:', questionTamil: 'வெள்ளையனே வெளியேறு இயக்கம் தொடங்கப்பட்ட ஆண்டு:', options: ['1940', '1942', '1944', '1946'], answer: 1, explanation: 'Quit India Movement - 8 August 1942 (Do or Die)', explanationTamil: 'வெள்ளையனே வெளியேறு இயக்கம் - 8 ஆகஸ்ட் 1942 (செய் அல்லது சா)', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'ssc-gd-19', question: 'Simple interest on ₹5000 at 8% for 3 years is:', questionTamil: '₹5000 க்கு 8% வட்டியில் 3 ஆண்டுகளுக்கு தனி வட்டி:', options: ['₹1200', '₹1000', '₹1400', '₹1100'], answer: 0, explanation: 'SI = PRT/100 = 5000 × 8 × 3/100 = ₹1200', explanationTamil: 'தனி வட்டி = PRT/100 = 5000 × 8 × 3/100 = ₹1200', subject: 'Mathematics', difficulty: 'easy' },
      { id: 'ssc-gd-20', question: 'The headquarters of ISRO is located in:', questionTamil: 'ISRO இன் தலைமையகம் அமைந்துள்ள இடம்:', options: ['Chennai', 'Mumbai', 'Bengaluru', 'Hyderabad'], optionsTamil: ['சென்னை', 'மும்பை', 'பெங்களூரு', 'ஹைதராபாத்'], answer: 2, explanation: 'ISRO HQ is in Bengaluru, Karnataka', explanationTamil: 'ISRO தலைமையகம் கர்நாடகாவின் பெங்களூருவில் உள்ளது', subject: 'General Knowledge', difficulty: 'easy' }
    ]
  },
  {
    id: 'ssc-steno',
    name: 'SSC Stenographer',
    nameTamil: 'SSC சுருக்கெழுத்தாளர்',
    qualification: '12th Pass',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 27 years',
    salary: '₹25,500 - ₹81,100/month',
    selectionProcess: 'CBT → Skill Test (Stenography)',
    selectionProcessTamil: 'CBT → திறன் தேர்வு (சுருக்கெழுத்து)',
    posts: ['Stenographer Grade C', 'Stenographer Grade D'],
    postsTamil: ['சுருக்கெழுத்தாளர் தரம் C', 'சுருக்கெழுத்தாளர் தரம் D'],
    syllabus: {
      main: [
        {
          name: 'SSC Stenographer Syllabus',
          nameTamil: 'SSC சுருக்கெழுத்தாளர் பாடத்திட்டம்',
          topics: [
            { name: 'General Intelligence & Reasoning', nameTamil: 'பொது புத்திசாலித்தனம் & தர்க்கம்', subtopics: ['Analogy', 'Classification', 'Series', 'Coding-Decoding', 'Directions'] },
            { name: 'General Awareness', nameTamil: 'பொது விழிப்புணர்வு', subtopics: ['Current Affairs', 'History', 'Geography', 'Polity', 'Science'] },
            { name: 'English Language', nameTamil: 'ஆங்கில மொழி', subtopics: ['Grammar', 'Vocabulary', 'Comprehension', 'Error Spotting'] }
          ]
        }
      ]
    },
    pyq: []
  }
];

// ==================== BANKING & INSURANCE ====================
const bankingExams: Exam[] = [
  {
    id: 'ibps-clerk',
    name: 'IBPS Clerk',
    nameTamil: 'IBPS எழுத்தர்',
    qualification: 'Any Graduate (12th for age)',
    qualificationTamil: 'ஏதேனும் பட்டதாரி',
    age: '20 - 28 years',
    salary: '₹28,000 - ₹35,000/month',
    selectionProcess: 'Prelims → Mains → Provisional Allotment',
    selectionProcessTamil: 'முதநிலை → முதன்மை → தற்காலிக ஒதுக்கீடு',
    syllabus: {
      main: [
        {
          name: 'IBPS Clerk Syllabus',
          nameTamil: 'IBPS எழுத்தர் பாடத்திட்டம்',
          topics: [
            { name: 'English Language', nameTamil: 'ஆங்கில மொழி', subtopics: ['Reading Comprehension', 'Cloze Test', 'Error Spotting', 'Sentence Improvement', 'Para Jumbles'] },
            { name: 'Quantitative Aptitude', nameTamil: 'அளவு திறன்', subtopics: ['Simplification', 'Number Series', 'Data Interpretation', 'Quadratic Equations', 'Arithmetic'] },
            { name: 'Reasoning Ability', nameTamil: 'தர்க்க திறன்', subtopics: ['Puzzles', 'Seating Arrangement', 'Syllogism', 'Blood Relations', 'Inequality'] },
            { name: 'General/Banking Awareness', nameTamil: 'பொது/வங்கி விழிப்புணர்வு', subtopics: ['Banking Terms', 'RBI', 'Current Affairs', 'Financial Awareness'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'ibps-eng-1', question: 'Choose the word opposite in meaning to "AFFLUENT":', options: ['Wealthy', 'Poor', 'Rich', 'Prosperous'], answer: 1, explanation: 'Affluent means wealthy; opposite is Poor', subject: 'English', difficulty: 'easy' },
      { id: 'ibps-eng-2', question: 'The idiom "A piece of cake" means:', options: ['Something sweet', 'A difficult task', 'Something very easy', 'A dessert'], answer: 2, explanation: 'A piece of cake = something very easy to do', subject: 'English', difficulty: 'easy' },
      { id: 'ibps-quant-1', question: 'What is 25% of 80?', options: ['20', '25', '15', '30'], answer: 0, explanation: '25% of 80 = 25/100 × 80 = 20', subject: 'Quantitative Aptitude', difficulty: 'easy' },
      { id: 'ibps-quant-2', question: 'A boat goes 12 km downstream in 1 hour and returns in 2 hours. Speed of current is:', options: ['3 km/hr', '4 km/hr', '2 km/hr', '5 km/hr'], answer: 0, explanation: 'Downstream = 12 km/hr, Upstream = 6 km/hr. Current = (12-6)/2 = 3 km/hr', subject: 'Quantitative Aptitude', difficulty: 'medium' },
      { id: 'ibps-quant-3', question: 'Find the missing: 2, 6, 12, 20, 30, ?', options: ['40', '42', '44', '46'], answer: 1, explanation: 'Differences: 4, 6, 8, 10, 12. Next = 30 + 12 = 42', subject: 'Quantitative Aptitude', difficulty: 'medium' },
      { id: 'ibps-reason-1', question: 'In a code, COMPUTER is written as RFUVQNPC. How is PRINTER written?', options: ['QSJOUFQ', 'QSJOUFS', 'OQJOUFS', 'QSJOUGE'], answer: 1, explanation: 'Pattern: +1, -1, +1, -1... for each letter position', subject: 'Reasoning', difficulty: 'hard' },
      { id: 'ibps-reason-2', question: 'P is to the south of Q. R is to the east of Q. In which direction is P from R?', options: ['South-West', 'North-East', 'South-East', 'North-West'], answer: 0, explanation: 'If Q is center, P is south and R is east. So P is South-West of R', subject: 'Reasoning', difficulty: 'medium' },
      { id: 'ibps-ga-1', question: 'RBI was established in:', questionTamil: 'RBI நிறுவப்பட்ட ஆண்டு:', options: ['1935', '1947', '1950', '1949'], answer: 0, explanation: 'Reserve Bank of India was established on 1st April 1935', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'ibps-ga-2', question: 'NEFT stands for:', questionTamil: 'NEFT என்பதன் முழு வடிவம்:', options: ['National Electronic Funds Transfer', 'New Electronic Funds Transfer', 'National Emergency Funds Transfer', 'None of these'], optionsTamil: ['தேசிய மின்னணு நிதி பரிமாற்றம்', 'புதிய மின்னணு நிதி பரிமாற்றம்', 'தேசிய அவசர நிதி பரிமாற்றம்', 'இவை எதுவுமில்லை'], answer: 0, explanation: 'NEFT = National Electronic Funds Transfer', explanationTamil: 'NEFT = தேசிய மின்னணு நிதி பரிமாற்றம்', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'ibps-ga-3', question: 'The headquarters of RBI is in:', questionTamil: 'RBI இன் தலைமையகம் எங்குள்ளது:', options: ['Delhi', 'Mumbai', 'Kolkata', 'Chennai'], optionsTamil: ['டெல்லி', 'மும்பை', 'கொல்கத்தா', 'சென்னை'], answer: 1, explanation: 'RBI headquarters is in Mumbai, Maharashtra', explanationTamil: 'RBI தலைமையகம் மும்பை, மகாராஷ்டிராவில் உள்ளது', subject: 'General Awareness', difficulty: 'easy' },
      // New IBPS Clerk PYQ additions
      { id: 'ibps-ga-4', question: 'What is the full form of RTGS?', questionTamil: 'RTGS இன் முழு வடிவம் என்ன?', options: ['Real Time Gross Settlement', 'Rapid Transfer of Government Securities', 'Reserve Transfer Guarantee System', 'Real Transfer Gross System'], optionsTamil: ['நிகழ்நேர மொத்த தீர்வு', 'அரசு பத்திரங்களின் விரைவான பரிமாற்றம்', 'இருப்பு பரிமாற்ற உத்தரவாத அமைப்பு', 'நிகழ்நேர பரிமாற்ற மொத்த அமைப்பு'], answer: 0, explanation: 'RTGS = Real Time Gross Settlement for large value transactions', explanationTamil: 'RTGS = நிகழ்நேர மொத்த தீர்வு, பெரிய மதிப்பு பரிவர்த்தனைகளுக்கு', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'ibps-ga-5', question: 'Who is called the "Father of Indian Banking"?', questionTamil: '"இந்திய வங்கியின் தந்தை" என்று அழைக்கப்படுபவர்?', options: ['Sir Osborne Smith', 'C.D. Deshmukh', 'Sir James Wilson', 'Sir Hilton Young'], optionsTamil: ['சர் ஓஸ்போர்ன் ஸ்மித்', 'சி.டி. தேஷ்முக்', 'சர் ஜேம்ஸ் வில்சன்', 'சர் ஹில்டன் யங்'], answer: 0, explanation: 'Sir Osborne Smith was the first RBI Governor and is called Father of Indian Banking', explanationTamil: 'சர் ஓஸ்போர்ன் ஸ்மித் RBI இன் முதல் கவர்னர் மற்றும் இந்திய வங்கியின் தந்தை என்று அழைக்கப்படுகிறார்', subject: 'General Awareness', difficulty: 'medium' },
      { id: 'ibps-ga-6', question: 'Which is the largest public sector bank in India?', questionTamil: 'இந்தியாவின் மிகப்பெரிய பொதுத்துறை வங்கி எது?', options: ['Bank of Baroda', 'Punjab National Bank', 'State Bank of India', 'Canara Bank'], optionsTamil: ['பேங்க் ஆஃப் பரோடா', 'பஞ்சாப் நேஷனல் பேங்க்', 'ஸ்டேட் பேங்க் ஆஃப் இந்தியா', 'கனரா பேங்க்'], answer: 2, explanation: 'State Bank of India (SBI) is the largest public sector bank in India', explanationTamil: 'ஸ்டேட் பேங்க் ஆஃப் இந்தியா (SBI) இந்தியாவின் மிகப்பெரிய பொதுத்துறை வங்கி ஆகும்', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'ibps-ga-7', question: 'What is the currency of Japan?', questionTamil: 'ஜப்பானின் நாணயம் என்ன?', options: ['Yuan', 'Yen', 'Won', 'Ringgit'], optionsTamil: ['யுவான்', 'யென்', 'வோன்', 'ரிங்கிட்'], answer: 1, explanation: 'Japanese currency is Yen (JPY)', explanationTamil: 'ஜப்பானிய நாணயம் யென் (JPY)', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'ibps-quant-4', question: 'A sum of ₹5000 amounts to ₹5832 in 2 years at compound interest. Find the rate.', questionTamil: '₹5000 கூட்டு வட்டியில் 2 வருடங்களில் ₹5832 ஆகிறது. வட்டி விகிதத்தைக் கண்டுபிடிக்கவும்.', options: ['8%', '10%', '6%', '7%'], optionsTamil: ['8%', '10%', '6%', '7%'], answer: 0, explanation: '5000(1+r/100)² = 5832. (1+r/100)² = 1.1664. r = 8%', explanationTamil: '5000(1+r/100)² = 5832. (1+r/100)² = 1.1664. r = 8%', subject: 'Quantitative Aptitude', difficulty: 'medium' },
      { id: 'ibps-quant-5', question: 'The ratio of present ages of A and B is 5:3. After 5 years it becomes 3:2. Find A\'s present age.', questionTamil: 'A மற்றும் B இன் தற்போதைய வயது விகிதம் 5:3. 5 வருடங்களுக்குப் பிறகு 3:2 ஆகிறது. A இன் தற்போதைய வயதைக் கண்டுபிடிக்கவும்.', options: ['25', '30', '35', '20'], optionsTamil: ['25', '30', '35', '20'], answer: 0, explanation: 'Let ages be 5x and 3x. (5x+5)/(3x+5) = 3/2. 10x+10 = 9x+15. x=5. A = 25', explanationTamil: 'வயது 5x மற்றும் 3x என்க. (5x+5)/(3x+5) = 3/2. 10x+10 = 9x+15. x=5. A = 25', subject: 'Quantitative Aptitude', difficulty: 'medium' },
      { id: 'ibps-quant-6', question: 'What is the compound interest on ₹8000 for 2 years at 10% per annum?', questionTamil: '₹8000 க்கு 10% வருடாந்திர வட்டியில் 2 வருடங்களுக்கான கூட்டு வட்டி என்ன?', options: ['₹1680', '₹1600', '₹1720', '₹1800'], optionsTamil: ['₹1680', '₹1600', '₹1720', '₹1800'], answer: 0, explanation: 'CI = P(1+r/100)^n - P = 8000(1.1)² - 8000 = 9680 - 8000 = ₹1680', explanationTamil: 'CI = P(1+r/100)^n - P = 8000(1.1)² - 8000 = 9680 - 8000 = ₹1680', subject: 'Quantitative Aptitude', difficulty: 'easy' },
      { id: 'ibps-eng-3', question: 'Choose the correct synonym of "EXORBITANT":', questionTamil: '"EXORBITANT" இன் சரியான ஒத்த சொல்லைத் தேர்ந்தெடுக்கவும்:', options: ['Cheap', 'Reasonable', 'Excessive', 'Moderate'], optionsTamil: ['மலிவான', 'நியாயமான', 'அதிகப்படியான', 'மிதமான'], answer: 2, explanation: 'Exorbitant means extremely high or excessive (usually about price)', explanationTamil: 'Exorbitant என்பது மிக அதிகமான அல்லது அதிகப்படியான என்று பொருள் (பொதுவாக விலையைப் பற்றி)', subject: 'English', difficulty: 'medium' },
      { id: 'ibps-eng-4', question: 'Identify the error: "The committee have taken (a) / their decision (b) / unanimously. (c) / No error (d)"', questionTamil: 'பிழையை அடையாளம் காணவும்: "The committee have taken (a) / their decision (b) / unanimously. (c) / No error (d)"', options: ['a', 'b', 'c', 'd'], answer: 3, explanation: 'No error. "Committee" can take plural verb when referring to individual members acting together', explanationTamil: 'பிழை இல்லை. "Committee" தனிப்பட்ட உறுப்பினர்கள் ஒன்றாக செயல்படும்போது பன்மை வினைச்சொல்லை எடுக்கலாம்', subject: 'English', difficulty: 'hard' },
      { id: 'ibps-reason-3', question: 'In a queue, Ram is 10th from front and 15th from back. How many people are in the queue?', questionTamil: 'ஒரு வரிசையில், ராம் முன்னால் இருந்து 10வது மற்றும் பின்னால் இருந்து 15வது. வரிசையில் எத்தனை பேர் உள்ளனர்?', options: ['24', '25', '26', '23'], optionsTamil: ['24', '25', '26', '23'], answer: 0, explanation: 'Total = 10 + 15 - 1 = 24 (Ram is counted twice)', explanationTamil: 'மொத்தம் = 10 + 15 - 1 = 24 (ராம் இரண்டு முறை எண்ணப்படுகிறார்)', subject: 'Reasoning', difficulty: 'easy' },
      { id: 'ibps-reason-4', question: 'Statement: All banks are safe. Some safes are lockers. Conclusion: I. Some banks are lockers. II. Some lockers are banks.', questionTamil: 'கூற்று: அனைத்து வங்கிகளும் பாதுகாப்பானவை. சில பாதுகாப்பானவை லாக்கர்கள். முடிவு: I. சில வங்கிகள் லாக்கர்கள். II. சில லாக்கர்கள் வங்கிகள்.', options: ['Only I', 'Only II', 'Both', 'Neither'], optionsTamil: ['I மட்டும்', 'II மட்டும்', 'இரண்டும்', 'எதுவுமில்லை'], answer: 3, explanation: 'Neither conclusion follows as banks→safe and safe←some lockers have no direct relation', explanationTamil: 'வங்கிகள்→பாதுகாப்பு மற்றும் பாதுகாப்பு←சில லாக்கர்கள் இடையே நேரடி தொடர்பு இல்லாததால் எந்த முடிவும் பின்பற்றவில்லை', subject: 'Reasoning', difficulty: 'hard' }
    ]
  },
  {
    id: 'sbi-clerk',
    name: 'SBI Clerk (Junior Associate)',
    nameTamil: 'SBI எழுத்தர் (இளநிலை உதவியாளர்)',
    qualification: 'Any Graduate',
    qualificationTamil: 'ஏதேனும் பட்டதாரி',
    age: '20 - 28 years',
    salary: '₹30,000 - ₹40,000/month',
    selectionProcess: 'Prelims → Mains → Local Language Test',
    selectionProcessTamil: 'முதநிலை → முதன்மை → உள்ளூர் மொழி தேர்வு',
    syllabus: {
      main: [
        {
          name: 'SBI Clerk Syllabus',
          nameTamil: 'SBI எழுத்தர் பாடத்திட்டம்',
          topics: [
            { name: 'English Language', nameTamil: 'ஆங்கில மொழி', subtopics: ['Reading Comprehension', 'Cloze Test', 'Error Spotting', 'Vocabulary'] },
            { name: 'Quantitative Aptitude', nameTamil: 'அளவு திறன்', subtopics: ['Simplification', 'Number Series', 'Data Interpretation', 'Arithmetic'] },
            { name: 'Reasoning Ability', nameTamil: 'தர்க்க திறன்', subtopics: ['Puzzles', 'Seating Arrangement', 'Syllogism', 'Coding-Decoding'] },
            { name: 'General Awareness', nameTamil: 'பொது விழிப்புணர்வு', subtopics: ['Banking Awareness', 'Current Affairs', 'Static GK'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'sbi-eng-1', question: 'Choose the correct synonym of "ELOQUENT":', options: ['Silent', 'Fluent', 'Quiet', 'Dumb'], answer: 1, explanation: 'Eloquent means fluent or persuasive in speaking', subject: 'English', difficulty: 'medium' },
      { id: 'sbi-quant-1', question: 'The ratio of ages of A and B is 4:3. After 6 years, the ratio becomes 5:4. Present age of A is:', options: ['24 years', '28 years', '32 years', '20 years'], answer: 0, explanation: 'Let ages be 4x and 3x. (4x+6)/(3x+6) = 5/4. Solving: x=6. A = 24 years', subject: 'Quantitative Aptitude', difficulty: 'medium' },
      { id: 'sbi-quant-2', question: 'If the area of a square is 196 sq cm, find its perimeter:', options: ['56 cm', '48 cm', '52 cm', '60 cm'], answer: 0, explanation: 'Side = √196 = 14 cm. Perimeter = 4 × 14 = 56 cm', subject: 'Quantitative Aptitude', difficulty: 'easy' },
      { id: 'sbi-reason-1', question: 'How many such pairs of letters are there in WONDERFUL which have as many letters between them as in the English alphabet?', options: ['Two', 'Three', 'Four', 'Five'], answer: 1, explanation: 'WO (7 letters), ND (10 letters), UL (9 letters) - Three such pairs', subject: 'Reasoning', difficulty: 'hard' },
      { id: 'sbi-ga-1', question: 'Which bank is known as Banker\'s Bank?', questionTamil: 'வங்கிகளின் வங்கி என்று அறியப்படுவது எது?', options: ['SBI', 'ICICI', 'RBI', 'HDFC'], optionsTamil: ['SBI', 'ICICI', 'RBI', 'HDFC'], answer: 2, explanation: 'RBI is called Banker\'s Bank as it provides banking services to banks', explanationTamil: 'RBI வங்கிகளுக்கு வங்கி சேவைகளை வழங்குவதால் வங்கிகளின் வங்கி என்று அழைக்கப்படுகிறது', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'sbi-ga-2', question: 'What is the minimum amount required to open a Savings Account in SBI?', questionTamil: 'SBI இல் சேமிப்பு கணக்கு திறக்க குறைந்தபட்ச தொகை என்ன?', options: ['₹500', '₹1000', '₹100', '₹0 (Zero Balance)'], optionsTamil: ['₹500', '₹1000', '₹100', '₹0 (பூஜ்ய இருப்பு)'], answer: 3, explanation: 'SBI offers Zero Balance Basic Savings Bank Deposit Account', explanationTamil: 'SBI பூஜ்ய இருப்பு அடிப்படை சேமிப்பு வங்கி வைப்பு கணக்கை வழங்குகிறது', subject: 'General Awareness', difficulty: 'easy' },
      // New SBI Clerk PYQ additions
      { id: 'sbi-ga-3', question: 'What does MICR stand for?', questionTamil: 'MICR என்பதன் விரிவாக்கம் என்ன?', options: ['Magnetic Ink Code Recognition', 'Magnetic Ink Character Recognition', 'Magnetic Image Code Reader', 'Machine Input Character Reader'], optionsTamil: ['காந்த மை குறியீடு அங்கீகாரம்', 'காந்த மை எழுத்து அங்கீகாரம்', 'காந்த படக் குறியீடு வாசகர்', 'இயந்திர உள்ளீட்டு எழுத்து வாசகர்'], answer: 1, explanation: 'MICR = Magnetic Ink Character Recognition, used on cheques', explanationTamil: 'MICR = காந்த மை எழுத்து அங்கீகாரம், காசோலைகளில் பயன்படுத்தப்படுகிறது', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'sbi-ga-4', question: 'When was SBI established?', questionTamil: 'SBI எப்போது நிறுவப்பட்டது?', options: ['1806', '1921', '1955', '1935'], optionsTamil: ['1806', '1921', '1955', '1935'], answer: 2, explanation: 'SBI was established on 1st July 1955 through SBI Act, 1955', explanationTamil: 'SBI 1955 ஜூலை 1 அன்று SBI சட்டம், 1955 மூலம் நிறுவப்பட்டது', subject: 'General Awareness', difficulty: 'medium' },
      { id: 'sbi-ga-5', question: 'What is the tagline of SBI?', questionTamil: 'SBI இன் தாரக வாக்கியம் என்ன?', options: ['The Name You Can Bank Upon', 'Pure Banking Nothing Else', 'A Tradition of Trust', 'The Banker to Every Indian'], optionsTamil: ['நீங்கள் நம்பக்கூடிய பெயர்', 'தூய வங்கியியல் வேறு எதுவுமில்லை', 'நம்பிக்கையின் பாரம்பரியம்', 'ஒவ்வொரு இந்தியனுக்கும் வங்கியாளர்'], answer: 3, explanation: 'SBI\'s tagline is "The Banker to Every Indian"', explanationTamil: 'SBI இன் தாரக வாக்கியம் "ஒவ்வொரு இந்தியனுக்கும் வங்கியாளர்"', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'sbi-ga-6', question: 'What is KYC in banking?', questionTamil: 'வங்கியியலில் KYC என்றால் என்ன?', options: ['Know Your Customer', 'Keep Your Cash', 'Know Your Credit', 'Keep Your Card'], optionsTamil: ['உங்கள் வாடிக்கையாளரை அறியுங்கள்', 'உங்கள் பணத்தை வைத்திருங்கள்', 'உங்கள் கடனை அறியுங்கள்', 'உங்கள் அட்டையை வைத்திருங்கள்'], answer: 0, explanation: 'KYC = Know Your Customer, mandatory for opening bank accounts', explanationTamil: 'KYC = உங்கள் வாடிக்கையாளரை அறியுங்கள், வங்கி கணக்குகள் திறக்க கட்டாயம்', subject: 'General Awareness', difficulty: 'easy' },
      { id: 'sbi-quant-3', question: 'In a partnership, A invests ₹6000 for 8 months, B invests ₹8000 for 6 months. Find their profit sharing ratio.', questionTamil: 'ஒரு கூட்டாண்மையில், A ₹6000 ஐ 8 மாதங்களுக்கும், B ₹8000 ஐ 6 மாதங்களுக்கும் முதலீடு செய்கிறார். அவர்களின் லாபப் பகிர்வு விகிதத்தைக் கண்டுபிடிக்கவும்.', options: ['1:1', '3:4', '2:3', '4:3'], optionsTamil: ['1:1', '3:4', '2:3', '4:3'], answer: 0, explanation: 'A = 6000×8 = 48000. B = 8000×6 = 48000. Ratio = 1:1', explanationTamil: 'A = 6000×8 = 48000. B = 8000×6 = 48000. விகிதம் = 1:1', subject: 'Quantitative Aptitude', difficulty: 'medium' },
      { id: 'sbi-quant-4', question: 'A can complete work in 10 days, B in 15 days. If they work together, how many days to complete?', questionTamil: 'A ஒரு வேலையை 10 நாட்களிலும், B 15 நாட்களிலும் முடிக்க முடியும். இருவரும் சேர்ந்து வேலை செய்தால், எத்தனை நாட்களில் முடிக்கலாம்?', options: ['5 days', '6 days', '7 days', '8 days'], optionsTamil: ['5 நாட்கள்', '6 நாட்கள்', '7 நாட்கள்', '8 நாட்கள்'], answer: 1, explanation: 'Combined rate = 1/10 + 1/15 = 5/30 = 1/6. Days = 6', explanationTamil: 'ஒருங்கிணைந்த விகிதம் = 1/10 + 1/15 = 5/30 = 1/6. நாட்கள் = 6', subject: 'Quantitative Aptitude', difficulty: 'easy' },
      { id: 'sbi-quant-5', question: 'If a number is increased by 20% and then decreased by 20%, what is the net change?', questionTamil: 'ஒரு எண் 20% அதிகரிக்கப்பட்டு பின்னர் 20% குறைக்கப்பட்டால், நிகர மாற்றம் என்ன?', options: ['0%', '4% increase', '4% decrease', '2% decrease'], optionsTamil: ['0%', '4% அதிகரிப்பு', '4% குறைவு', '2% குறைவு'], answer: 2, explanation: 'Net change = -20²/100 = -4% (decrease)', explanationTamil: 'நிகர மாற்றம் = -20²/100 = -4% (குறைவு)', subject: 'Quantitative Aptitude', difficulty: 'medium' },
      { id: 'sbi-eng-2', question: 'The idiom "In the red" means:', questionTamil: '"In the red" என்ற மரபுத்தொடரின் பொருள்:', options: ['Angry', 'In debt', 'Embarrassed', 'Successful'], optionsTamil: ['கோபமான', 'கடனில்', 'அவமானமான', 'வெற்றிகரமான'], answer: 1, explanation: '"In the red" means in debt or losing money (opposite of "in the black")', explanationTamil: '"In the red" என்பது கடனில் அல்லது பணத்தை இழப்பது என்று பொருள் ("in the black" க்கு எதிர்)', subject: 'English', difficulty: 'medium' },
      { id: 'sbi-eng-3', question: 'Choose the antonym of "FRUGAL":', questionTamil: '"FRUGAL" இன் எதிர்ச்சொல்லைத் தேர்ந்தெடுக்கவும்:', options: ['Thrifty', 'Economical', 'Extravagant', 'Careful'], optionsTamil: ['சிக்கனமான', 'பொருளாதாரமான', 'விரயமான', 'கவனமான'], answer: 2, explanation: 'Frugal means economical; opposite is Extravagant (wasteful)', explanationTamil: 'Frugal என்றால் சிக்கனமான; எதிர்ச்சொல் Extravagant (விரயமான)', subject: 'English', difficulty: 'medium' },
      { id: 'sbi-reason-2', question: 'Six friends P, Q, R, S, T, U are sitting in a circle facing center. R is to the left of Q. P is between U and S. U is not next to R. Who is to the right of Q?', questionTamil: 'ஆறு நண்பர்கள் P, Q, R, S, T, U மையத்தை நோக்கி வட்டத்தில் அமர்ந்துள்ளனர். R, Q இன் இடதுபுறம் உள்ளார். P, U மற்றும் S இடையே உள்ளார். U, R க்கு அருகில் இல்லை. Q இன் வலதுபுறம் யார்?', options: ['T', 'S', 'P', 'U'], optionsTamil: ['T', 'S', 'P', 'U'], answer: 0, explanation: 'Arrangement: S-P-U-T-Q-R. T is to the right of Q', explanationTamil: 'அமைப்பு: S-P-U-T-Q-R. T, Q இன் வலதுபுறம் உள்ளார்', subject: 'Reasoning', difficulty: 'hard' },
      { id: 'sbi-reason-3', question: 'What is the code for BANK if MONEY is coded as PRQHB?', questionTamil: 'MONEY ஐ PRQHB என குறியீடு செய்தால், BANK க்கான குறியீடு என்ன?', options: ['EDQN', 'EDQM', 'DCQM', 'EDPN'], optionsTamil: ['EDQN', 'EDQM', 'DCQM', 'EDPN'], answer: 0, explanation: 'Pattern: M+3=P, O+3=R, N+3=Q, E+3=H, Y+3=B. B+3=E, A+3=D, N+3=Q, K+3=N → EDQN', explanationTamil: 'அமைப்பு: M+3=P, O+3=R, N+3=Q, E+3=H, Y+3=B. B+3=E, A+3=D, N+3=Q, K+3=N → EDQN', subject: 'Reasoning', difficulty: 'medium' }
    ]
  },
  {
    id: 'india-post-gds',
    name: 'India Post GDS (Gramin Dak Sevak)',
    nameTamil: 'இந்திய தபால் GDS (கிராமிய தாக் சேவக்)',
    qualification: '10th Pass',
    qualificationTamil: '10ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 40 years',
    salary: '₹12,000 - ₹14,500/month',
    selectionProcess: 'Merit Based (10th Marks)',
    selectionProcessTamil: 'தகுதி அடிப்படையில் (10ஆம் வகுப்பு மதிப்பெண்கள்)',
    syllabus: {
      main: [
        {
          name: 'India Post GDS Selection',
          nameTamil: 'இந்திய தபால் GDS தேர்வு',
          topics: [
            { name: 'Selection Criteria', nameTamil: 'தேர்வு அளவுகோல்', subtopics: ['No written exam', 'Merit based on 10th class percentage', 'Preference to local candidates', 'Computer knowledge certificate required'] }
          ]
        }
      ]
    },
    pyq: []
  },
  {
    id: 'lic-ado',
    name: 'LIC ADO (Apprentice Development Officer)',
    nameTamil: 'LIC ADO (பயிற்சி மேம்பாட்டு அதிகாரி)',
    qualification: 'Graduate',
    qualificationTamil: 'பட்டதாரி',
    age: '21 - 30 years',
    salary: '₹35,000+/month',
    selectionProcess: 'Prelims → Mains → Interview',
    selectionProcessTamil: 'முதநிலை → முதன்மை → நேர்காணல்',
    syllabus: {
      main: [
        {
          name: 'LIC ADO Syllabus',
          nameTamil: 'LIC ADO பாடத்திட்டம்',
          topics: [
            { name: 'Reasoning Ability', nameTamil: 'தர்க்க திறன்', subtopics: ['Puzzles', 'Seating Arrangement', 'Syllogism', 'Blood Relations'] },
            { name: 'Quantitative Aptitude', nameTamil: 'அளவு திறன்', subtopics: ['Simplification', 'Number Series', 'Data Interpretation'] },
            { name: 'English Language', nameTamil: 'ஆங்கில மொழி', subtopics: ['Reading Comprehension', 'Error Spotting', 'Vocabulary'] },
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', subtopics: ['Current Affairs', 'Insurance Awareness', 'Economy'] }
          ]
        }
      ]
    },
    pyq: [
      // Reasoning Ability
      { id: 'lic-reason-1', question: 'Five friends A, B, C, D, E are sitting in a row. B is to the right of A and left of D. C is at the extreme right. Who is in the middle?', questionTamil: 'ஐந்து நண்பர்கள் A, B, C, D, E ஒரு வரிசையில் அமர்ந்துள்ளனர். B, A இன் வலதுபுறம் மற்றும் D இன் இடதுபுறம். C தீவிர வலதுபுறம். நடுவில் யார்?', options: ['A', 'B', 'D', 'E'], optionsTamil: ['A', 'B', 'D', 'E'], answer: 1, explanation: 'Order: E-A-B-D-C (or A-E-B-D-C). B is in the middle', explanationTamil: 'வரிசை: E-A-B-D-C (அல்லது A-E-B-D-C). B நடுவில் உள்ளார்', subject: 'Reasoning Ability', difficulty: 'medium' },
      { id: 'lic-reason-2', question: 'If INSURANCE is coded as JOTVSBODF, how is POLICY coded?', questionTamil: 'INSURANCE ஐ JOTVSBODF என குறியீடு செய்தால், POLICY எவ்வாறு குறியீடு செய்யப்படும்?', options: ['QPMJDZ', 'QPLJDZ', 'QPMJEZ', 'OPKJCY'], optionsTamil: ['QPMJDZ', 'QPLJDZ', 'QPMJEZ', 'OPKJCY'], answer: 0, explanation: 'Each letter +1: P→Q, O→P, L→M, I→J, C→D, Y→Z → QPMJDZ', explanationTamil: 'ஒவ்வொரு எழுத்தும் +1: P→Q, O→P, L→M, I→J, C→D, Y→Z → QPMJDZ', subject: 'Reasoning Ability', difficulty: 'medium' },
      { id: 'lic-reason-3', question: 'Statement: All agents are employees. Some employees are managers. Conclusion I: Some agents are managers. Conclusion II: Some managers are agents.', questionTamil: 'கூற்று: அனைத்து முகவர்களும் ஊழியர்கள். சில ஊழியர்கள் மேலாளர்கள். முடிவு I: சில முகவர்கள் மேலாளர்கள். முடிவு II: சில மேலாளர்கள் முகவர்கள்.', options: ['Only I follows', 'Only II follows', 'Both follow', 'Neither follows'], optionsTamil: ['I மட்டும் பின்தொடர்கிறது', 'II மட்டும் பின்தொடர்கிறது', 'இரண்டும் பின்தொடர்கின்றன', 'எதுவும் பின்தொடரவில்லை'], answer: 3, explanation: 'Neither conclusion follows as there is no definite link between agents and managers', explanationTamil: 'முகவர்களுக்கும் மேலாளர்களுக்கும் இடையே உறுதியான தொடர்பு இல்லாததால் எந்த முடிவும் பின்தொடரவில்லை', subject: 'Reasoning Ability', difficulty: 'hard' },
      { id: 'lic-reason-4', question: 'Find the missing number: 3, 9, 27, 81, ?', questionTamil: 'விடுபட்ட எண்ணைக் கண்டறியவும்: 3, 9, 27, 81, ?', options: ['162', '243', '324', '108'], optionsTamil: ['162', '243', '324', '108'], answer: 1, explanation: 'Pattern: ×3. 81 × 3 = 243', explanationTamil: 'அமைப்பு: ×3. 81 × 3 = 243', subject: 'Reasoning Ability', difficulty: 'easy' },
      { id: 'lic-reason-5', question: 'A is mother of B. C is father of A. D is brother of C. How is D related to B?', questionTamil: 'A என்பது B இன் தாய். C என்பது A இன் தந்தை. D என்பது C இன் சகோதரர். D, B க்கு எவ்வாறு தொடர்புடையவர்?', options: ['Uncle', 'Grandfather', 'Grand Uncle', 'Father'], optionsTamil: ['மாமா', 'தாத்தா', 'பெரிய தாத்தா', 'தந்தை'], answer: 2, explanation: 'D is brother of C (grandfather of B), so D is Grand Uncle of B', explanationTamil: 'D என்பது C இன் சகோதரர் (B இன் தாத்தா), எனவே D என்பது B இன் பெரிய தாத்தா', subject: 'Reasoning Ability', difficulty: 'medium' },
      // Quantitative Aptitude
      { id: 'lic-quant-1', question: 'A policy of ₹50,000 is insured at 2% premium. Find annual premium.', questionTamil: '₹50,000 மதிப்புள்ள காப்பீடு 2% பிரீமியத்தில் காப்பீடு செய்யப்பட்டுள்ளது. ஆண்டு பிரீமியத்தைக் கண்டறியவும்.', options: ['₹1000', '₹2000', '₹500', '₹1500'], optionsTamil: ['₹1000', '₹2000', '₹500', '₹1500'], answer: 0, explanation: 'Annual Premium = 50000 × 2/100 = ₹1000', explanationTamil: 'ஆண்டு பிரீமியம் = 50000 × 2/100 = ₹1000', subject: 'Quantitative Aptitude', difficulty: 'easy' },
      { id: 'lic-quant-2', question: 'The compound interest on ₹10,000 at 10% p.a. for 2 years is:', questionTamil: '₹10,000 க்கு ஆண்டுக்கு 10% வட்டியில் 2 ஆண்டுகளுக்கான கூட்டு வட்டி:', options: ['₹2000', '₹2100', '₹2200', '₹1900'], optionsTamil: ['₹2000', '₹2100', '₹2200', '₹1900'], answer: 1, explanation: 'CI = P(1+r/100)² - P = 10000(1.1)² - 10000 = 12100 - 10000 = ₹2100', explanationTamil: 'கூ.வ = P(1+r/100)² - P = 10000(1.1)² - 10000 = 12100 - 10000 = ₹2100', subject: 'Quantitative Aptitude', difficulty: 'medium' },
      { id: 'lic-quant-3', question: 'Find the average of first 10 natural numbers.', questionTamil: 'முதல் 10 இயல் எண்களின் சராசரியைக் கண்டறியவும்.', options: ['5', '5.5', '6', '6.5'], optionsTamil: ['5', '5.5', '6', '6.5'], answer: 1, explanation: 'Sum = 10×11/2 = 55. Average = 55/10 = 5.5', explanationTamil: 'கூட்டு = 10×11/2 = 55. சராசரி = 55/10 = 5.5', subject: 'Quantitative Aptitude', difficulty: 'easy' },
      { id: 'lic-quant-4', question: 'A sum doubles in 5 years at simple interest. What is the rate of interest?', questionTamil: 'எளிய வட்டியில் 5 ஆண்டுகளில் ஒரு தொகை இரட்டிப்பாகிறது. வட்டி விகிதம் என்ன?', options: ['10%', '15%', '20%', '25%'], optionsTamil: ['10%', '15%', '20%', '25%'], answer: 2, explanation: 'If sum doubles, SI = P. P = P×R×5/100. R = 20%', explanationTamil: 'தொகை இரட்டிப்பானால், எ.வ = P. P = P×R×5/100. R = 20%', subject: 'Quantitative Aptitude', difficulty: 'medium' },
      { id: 'lic-quant-5', question: 'In a data set: 5, 10, 15, 20, 25. Find the median.', questionTamil: 'தரவுத் தொகுப்பில்: 5, 10, 15, 20, 25. இடைநிலையைக் கண்டறியவும்.', options: ['10', '15', '20', '12.5'], optionsTamil: ['10', '15', '20', '12.5'], answer: 1, explanation: 'For odd number of terms, median is the middle term = 15', explanationTamil: 'ஒற்றைப்படை உறுப்புகளுக்கு, இடைநிலை நடு உறுப்பு = 15', subject: 'Quantitative Aptitude', difficulty: 'easy' },
      { id: 'lic-quant-6', question: 'If the sum of two numbers is 25 and their difference is 5, find their product.', questionTamil: 'இரண்டு எண்களின் கூட்டு 25 மற்றும் அவற்றின் வேறுபாடு 5 எனில், அவற்றின் பெருக்கற்பலனைக் கண்டறியவும்.', options: ['150', '125', '100', '175'], optionsTamil: ['150', '125', '100', '175'], answer: 0, explanation: 'Numbers: 15 and 10. Product = 15 × 10 = 150', explanationTamil: 'எண்கள்: 15 மற்றும் 10. பெருக்கல் = 15 × 10 = 150', subject: 'Quantitative Aptitude', difficulty: 'easy' },
      // English Language
      { id: 'lic-eng-1', question: 'Choose the correct synonym of "INDEMNITY":', questionTamil: '"INDEMNITY" இன் சரியான ஒத்த சொல்லைத் தேர்ந்தெடுக்கவும்:', options: ['Penalty', 'Compensation', 'Punishment', 'Fine'], optionsTamil: ['அபராதம்', 'இழப்பீடு', 'தண்டனை', 'அபராதம்'], answer: 1, explanation: 'Indemnity means compensation for loss or damage', explanationTamil: 'Indemnity என்றால் இழப்பு அல்லது சேதத்திற்கான இழப்பீடு', subject: 'English Language', difficulty: 'medium' },
      { id: 'lic-eng-2', question: 'Fill in the blank: The insurance policy _____ all natural disasters.', questionTamil: 'வெற்றிடத்தை நிரப்புக: காப்பீட்டுக் கொள்கை அனைத்து இயற்கை பேரழிவுகளையும் _____.', options: ['cover', 'covers', 'covered', 'covering'], optionsTamil: ['cover', 'covers', 'covered', 'covering'], answer: 1, explanation: 'Subject "policy" is singular, so verb is "covers"', explanationTamil: 'எழுவாய் "policy" ஒருமை, எனவே வினைச்சொல் "covers"', subject: 'English Language', difficulty: 'easy' },
      { id: 'lic-eng-3', question: 'Choose the antonym of "PREMIUM":', questionTamil: '"PREMIUM" இன் எதிர்ச்சொல்லைத் தேர்ந்தெடுக்கவும்:', options: ['Cheap', 'Discount', 'Standard', 'Basic'], optionsTamil: ['மலிவான', 'தள்ளுபடி', 'நிலையான', 'அடிப்படை'], answer: 2, explanation: 'Premium means high quality; Standard means ordinary quality', explanationTamil: 'Premium என்றால் உயர் தரம்; Standard என்றால் சாதாரண தரம்', subject: 'English Language', difficulty: 'medium' },
      { id: 'lic-eng-4', question: 'Identify the error: "Neither the manager nor the agents was present at the meeting."', questionTamil: 'பிழையை அடையாளம் காணவும்: "Neither the manager nor the agents was present at the meeting."', options: ['Neither', 'nor', 'was', 'No error'], optionsTamil: ['Neither', 'nor', 'was', 'பிழை இல்லை'], answer: 2, explanation: '"was" should be "were" as the noun closer to verb (agents) is plural', explanationTamil: '"was" என்பது "were" ஆக இருக்க வேண்டும், ஏனெனில் வினைச்சொல்லுக்கு அருகில் உள்ள பெயர்ச்சொல் (agents) பன்மை', subject: 'English Language', difficulty: 'medium' },
      // General Knowledge
      { id: 'lic-ga-1', question: 'When was LIC established?', questionTamil: 'LIC எப்போது நிறுவப்பட்டது?', options: ['1955', '1956', '1957', '1950'], optionsTamil: ['1955', '1956', '1957', '1950'], answer: 1, explanation: 'LIC was established on 1st September 1956', explanationTamil: 'LIC 1956 செப்டம்பர் 1 அன்று நிறுவப்பட்டது', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'lic-ga-2', question: 'What is the tagline of LIC?', questionTamil: 'LIC இன் தாரக வாக்கியம் என்ன?', options: ['Life Insurance for All', 'Zindagi ke saath bhi, Zindagi ke baad bhi', 'Insurance is the Best Policy', 'Protect Your Future'], optionsTamil: ['அனைவருக்கும் ஆயுள் காப்பீடு', 'ஜிந்தகி கே சாத் பி, ஜிந்தகி கே பாத் பி', 'காப்பீடு சிறந்த கொள்கை', 'உங்கள் எதிர்காலத்தைப் பாதுகாக்கவும்'], answer: 1, explanation: 'LIC tagline is "Zindagi ke saath bhi, Zindagi ke baad bhi"', explanationTamil: 'LIC தாரக வாக்கியம் "ஜிந்தகி கே சாத் பி, ஜிந்தகி கே பாத் பி"', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'lic-ga-3', question: 'Headquarters of LIC is located at:', questionTamil: 'LIC தலைமையகம் அமைந்துள்ள இடம்:', options: ['Delhi', 'Chennai', 'Mumbai', 'Kolkata'], optionsTamil: ['டெல்லி', 'சென்னை', 'மும்பை', 'கொல்கத்தா'], answer: 2, explanation: 'LIC headquarters is in Mumbai', explanationTamil: 'LIC தலைமையகம் மும்பையில் உள்ளது', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'lic-ga-4', question: 'What is IRDA?', questionTamil: 'IRDA என்றால் என்ன?', options: ['Insurance Regulatory and Development Authority', 'Indian Reserve Development Authority', 'Insurance Reserve Deposit Authority', 'Indian Regulatory and Development Agency'], optionsTamil: ['காப்பீடு ஒழுங்குமுறை மற்றும் மேம்பாட்டு ஆணையம்', 'இந்திய இருப்பு மேம்பாட்டு ஆணையம்', 'காப்பீடு இருப்பு வைப்பு ஆணையம்', 'இந்திய ஒழுங்குமுறை மற்றும் மேம்பாட்டு நிறுவனம்'], answer: 0, explanation: 'IRDA = Insurance Regulatory and Development Authority of India (now IRDAI)', explanationTamil: 'IRDA = இந்திய காப்பீடு ஒழுங்குமுறை மற்றும் மேம்பாட்டு ஆணையம் (இப்போது IRDAI)', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'lic-ga-5', question: 'The first Life Insurance company in India was:', questionTamil: 'இந்தியாவின் முதல் ஆயுள் காப்பீட்டு நிறுவனம்:', options: ['LIC', 'Oriental Life Insurance', 'National Insurance', 'New India Assurance'], optionsTamil: ['LIC', 'ஓரியண்டல் ஆயுள் காப்பீடு', 'தேசிய காப்பீடு', 'நியூ இந்தியா அஷ்யூரன்ஸ்'], answer: 1, explanation: 'Oriental Life Insurance Company was established in 1818 in Calcutta', explanationTamil: 'ஓரியண்டல் ஆயுள் காப்பீட்டு நிறுவனம் 1818 இல் கல்கத்தாவில் நிறுவப்பட்டது', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'lic-ga-6', question: 'What is the minimum sum assured for LIC Jeevan Anand policy?', questionTamil: 'LIC ஜீவன் ஆனந்த் பாலிசிக்கான குறைந்தபட்ச காப்பீட்டுத் தொகை என்ன?', options: ['₹50,000', '₹1,00,000', '₹75,000', '₹25,000'], optionsTamil: ['₹50,000', '₹1,00,000', '₹75,000', '₹25,000'], answer: 1, explanation: 'Minimum sum assured for LIC Jeevan Anand is ₹1,00,000', explanationTamil: 'LIC ஜீவன் ஆனந்த்திற்கான குறைந்தபட்ச காப்பீட்டுத் தொகை ₹1,00,000', subject: 'General Knowledge', difficulty: 'medium' }
    ]
  }
];

// ==================== TAMIL NADU STATE GOVT ====================
const stateExams: Exam[] = [
  {
    id: 'tnpsc-group4',
    name: 'TNPSC Group 4',
    nameTamil: 'TNPSC குழு 4',
    qualification: 'SSLC / 12th Pass (varies by post)',
    qualificationTamil: 'SSLC / 12ஆம் வகுப்பு தேர்ச்சி (பதவிக்கு ஏற்ப)',
    age: '18 - 30 years',
    salary: '₹19,500 - ₹62,000/month',
    selectionProcess: 'Written Exam → Certificate Verification',
    selectionProcessTamil: 'எழுத்துத் தேர்வு → சான்றிதழ் சரிபார்ப்பு',
    posts: ['VAO (Village Administrative Officer)', 'Junior Assistant', 'Typist', 'Steno-Typist', 'Field Surveyor'],
    postsTamil: ['கிராம நிர்வாக அலுவலர்', 'இளநிலை உதவியாளர்', 'தட்டச்சர்', 'சுருக்கெழுத்து-தட்டச்சர்', 'கள ஆய்வாளர்'],
    examPattern: [
      { paper: 'Combined Exam', paperTamil: 'ஒருங்கிணைந்த தேர்வு', marks: 300, duration: '3 hours', questions: 200 }
    ],
    syllabus: {
      main: [
        {
          name: 'TNPSC Group 4 Syllabus',
          nameTamil: 'TNPSC குழு 4 பாடத்திட்டம்',
          topics: [
            { name: 'Tamil (100 Questions)', nameTamil: 'தமிழ் (100 கேள்விகள்)', subtopics: ['Tamil Grammar (இலக்கணம்)', 'Tamil Literature (இலக்கியம்)', 'Comprehension', 'Translation', 'Synonyms & Antonyms', 'Proverbs', 'Sangam Literature', 'Modern Tamil Literature'] },
            { name: 'General Studies (75 Questions)', nameTamil: 'பொது அறிவு (75 கேள்விகள்)', subtopics: ['History - Indian & Tamil Nadu History', 'Geography - Indian & TN Geography', 'Indian Polity & Constitution', 'Indian Economy', 'General Science (Physics, Chemistry, Biology)', 'Current Affairs - National & State'] },
            { name: 'Aptitude & Mental Ability (25 Questions)', nameTamil: 'திறன் & மன திறன் (25 கேள்விகள்)', subtopics: ['Number Series', 'Logical Reasoning', 'Analogies', 'Coding-Decoding', 'Blood Relations', 'Direction Sense', 'Simple Math'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'tnpsc-gs-1', question: 'Who founded the Self-Respect Movement?', questionTamil: 'சுயமரியாதை இயக்கத்தை தொடங்கியவர் யார்?', options: ['E.V. Ramasamy Periyar', 'C.N. Annadurai', 'Kamaraj', 'Rajaji'], optionsTamil: ['ஈ.வெ. ராமசாமி பெரியார்', 'சி.என். அண்ணாதுரை', 'காமராஜர்', 'ராஜாஜி'], answer: 0, explanation: 'E.V. Ramasamy (Periyar) started Self-Respect Movement in 1925', explanationTamil: 'ஈ.வெ. ராமசாமி (பெரியார்) 1925 இல் சுயமரியாதை இயக்கத்தை தொடங்கினார்', subject: 'General Studies', difficulty: 'easy' },
      { id: 'tnpsc-gs-2', question: 'The capital of Chola dynasty was:', questionTamil: 'சோழ வம்சத்தின் தலைநகரம்:', options: ['Madurai', 'Thanjavur', 'Kanchipuram', 'Trichy'], optionsTamil: ['மதுரை', 'தஞ்சாவூர்', 'காஞ்சிபுரம்', 'திருச்சி'], answer: 1, explanation: 'Thanjavur (Tanjore) was the capital of Chola dynasty', explanationTamil: 'தஞ்சாவூர் சோழ வம்சத்தின் தலைநகராக இருந்தது', subject: 'General Studies', difficulty: 'easy' },
      { id: 'tnpsc-gs-3', question: 'Which river is known as "Dakshina Ganga"?', questionTamil: '"தட்சிண கங்கா" என்று அழைக்கப்படும் ஆறு எது?', options: ['Krishna', 'Kaveri', 'Godavari', 'Tungabhadra'], optionsTamil: ['கிருஷ்ணா', 'காவிரி', 'கோதாவரி', 'துங்கபத்ரா'], answer: 2, explanation: 'Godavari is called Dakshina Ganga (Ganges of South)', explanationTamil: 'கோதாவரி தட்சிண கங்கா (தெற்கின் கங்கை) என்று அழைக்கப்படுகிறது', subject: 'General Studies', difficulty: 'easy' },
      { id: 'tnpsc-gs-4', question: 'The highest peak in Tamil Nadu is:', questionTamil: 'தமிழ்நாட்டின் மிக உயரமான சிகரம்:', options: ['Doddabetta', 'Anaimudi', 'Nilgiri Peak', 'Agasthyamalai'], optionsTamil: ['தொட்டபெட்டா', 'ஆனைமுடி', 'நீலகிரி சிகரம்', 'அகத்தியமலை'], answer: 0, explanation: 'Doddabetta (2,637m) is highest peak in Tamil Nadu', explanationTamil: 'தொட்டபெட்டா (2,637 மீ) தமிழ்நாட்டின் மிக உயரமான சிகரம்', subject: 'General Studies', difficulty: 'easy' },
      { id: 'tnpsc-gs-5', question: 'Who built the Brihadeeswara Temple?', questionTamil: 'பிரகதீஸ்வரர் கோயிலைக் கட்டியவர்?', options: ['Rajendra Chola', 'Rajaraja Chola I', 'Kulottunga Chola', 'Vijayalaya Chola'], optionsTamil: ['ராஜேந்திர சோழன்', 'முதலாம் ராஜராஜ சோழன்', 'குலோத்துங்க சோழன்', 'விஜயாலய சோழன்'], answer: 1, explanation: 'Rajaraja Chola I built Brihadeeswara Temple in Thanjavur', explanationTamil: 'முதலாம் ராஜராஜ சோழன் தஞ்சாவூரில் பிரகதீஸ்வரர் கோயிலைக் கட்டினார்', subject: 'General Studies', difficulty: 'easy' },
      { id: 'tnpsc-gs-6', question: 'First Chief Minister of Tamil Nadu was:', questionTamil: 'தமிழ்நாட்டின் முதல் முதல்வர்:', options: ['C.N. Annadurai', 'O.P. Ramaswamy Reddiyar', 'Kamaraj', 'Rajaji'], optionsTamil: ['சி.என். அண்ணாதுரை', 'ஓ.பி. ராமசாமி ரெட்டியார்', 'காமராஜர்', 'ராஜாஜி'], answer: 1, explanation: 'O.P. Ramaswamy Reddiyar was first CM of Madras State (1947)', explanationTamil: 'ஓ.பி. ராமசாமி ரெட்டியார் மெட்ராஸ் மாநிலத்தின் முதல் முதல்வர் (1947)', subject: 'General Studies', difficulty: 'medium' },
      { id: 'tnpsc-gs-7', question: 'Poompuhar is located on the bank of which river?', questionTamil: 'பூம்புகார் எந்த ஆற்றின் கரையில் அமைந்துள்ளது?', options: ['Kaveri', 'Vaigai', 'Palar', 'Pennar'], optionsTamil: ['காவிரி', 'வைகை', 'பாலாறு', 'பென்னாறு'], answer: 0, explanation: 'Poompuhar (ancient Kaveripattinam) is on Kaveri river', explanationTamil: 'பூம்புகார் (பழமையான காவிரிப்பட்டினம்) காவிரி ஆற்றின் கரையில் உள்ளது', subject: 'General Studies', difficulty: 'medium' },
      { id: 'tnpsc-gs-8', question: 'Tamil Nadu shares border with how many states?', questionTamil: 'தமிழ்நாடு எத்தனை மாநிலங்களுடன் எல்லையை பகிர்ந்துள்ளது?', options: ['3', '4', '5', '2'], answer: 1, explanation: 'TN shares border with Kerala, Karnataka, Andhra Pradesh, Puducherry (4)', explanationTamil: 'தமிழ்நாடு கேரளா, கர்நாடகா, ஆந்திரப்பிரதேசம், புதுச்சேரி (4) உடன் எல்லையை பகிர்ந்துள்ளது', subject: 'Geography', difficulty: 'easy' },
      { id: 'tnpsc-gs-9', question: 'The Nilgiris is famous for:', questionTamil: 'நீலகிரி எதற்கு புகழ்பெற்றது?', options: ['Coffee', 'Tea', 'Rubber', 'Cotton'], optionsTamil: ['காபி', 'தேயிலை', 'ரப்பர்', 'பருத்தி'], answer: 1, explanation: 'Nilgiris is famous for Tea plantations', explanationTamil: 'நீலகிரி தேயிலை தோட்டங்களுக்கு புகழ்பெற்றது', subject: 'Geography', difficulty: 'easy' },
      { id: 'tnpsc-gs-10', question: 'Which dam is built on Kaveri river in Tamil Nadu?', questionTamil: 'தமிழ்நாட்டில் காவிரி ஆற்றின் மீது கட்டப்பட்ட அணை எது?', options: ['Mettur Dam', 'Vaigai Dam', 'Krishnagiri Dam', 'Sathanur Dam'], optionsTamil: ['மேட்டூர் அணை', 'வைகை அணை', 'கிருஷ்ணகிரி அணை', 'சாத்தனூர் அணை'], answer: 0, explanation: 'Mettur Dam is on Kaveri river in Salem district', explanationTamil: 'மேட்டூர் அணை சேலம் மாவட்டத்தில் காவிரி ஆற்றின் மீது உள்ளது', subject: 'Geography', difficulty: 'easy' },
      { id: 'tnpsc-gs-11', question: 'The Jallikattu is traditionally celebrated during:', questionTamil: 'ஜல்லிக்கட்டு பாரம்பரியமாக எப்போது கொண்டாடப்படுகிறது?', options: ['Diwali', 'Pongal', 'Onam', 'Navratri'], optionsTamil: ['தீபாவளி', 'பொங்கல்', 'ஓணம்', 'நவராத்திரி'], answer: 1, explanation: 'Jallikattu is celebrated during Pongal festival (January)', explanationTamil: 'ஜல்லிக்கட்டு பொங்கல் திருநாளின் போது (ஜனவரி) கொண்டாடப்படுகிறது', subject: 'General Studies', difficulty: 'easy' },
      { id: 'tnpsc-gs-12', question: 'Who is known as "Perunthalaivar"?', questionTamil: '"பெருந்தலைவர்" என்று அறியப்படுபவர் யார்?', options: ['Periyar', 'Kamaraj', 'Anna', 'MGR'], optionsTamil: ['பெரியார்', 'காமராஜர்', 'அண்ணா', 'எம்ஜிஆர்'], answer: 1, explanation: 'K. Kamaraj is known as Perunthalaivar (Great Leader)', explanationTamil: 'க. காமராஜர் பெருந்தலைவர் என்று அறியப்படுகிறார்', subject: 'General Studies', difficulty: 'easy' },
      { id: 'tnpsc-tamil-1', question: '"ஆத்திசூடி" யை எழுதியவர் யார்?', questionTamil: '"ஆத்திசூடி" யை எழுதியவர் யார்?', options: ['திருவள்ளுவர்', 'ஔவையார்', 'கம்பர்', 'இளங்கோவடிகள்'], answer: 1, explanation: 'ஔவையார் ஆத்திசூடியை எழுதினார்', explanationTamil: 'ஔவையார் ஆத்திசூடியை எழுதினார்', subject: 'Tamil', difficulty: 'easy' },
      { id: 'tnpsc-tamil-2', question: 'தமிழின் முதல் இலக்கண நூல்:', questionTamil: 'தமிழின் முதல் இலக்கண நூல்:', options: ['நன்னூல்', 'தொல்காப்பியம்', 'அகத்தியம்', 'யாப்பருங்கலம்'], answer: 1, explanation: 'தொல்காப்பியம் தமிழின் முதல் இலக்கண நூல்', explanationTamil: 'தொல்காப்பியம் தமிழின் முதல் இலக்கண நூல்', subject: 'Tamil', difficulty: 'easy' },
      { id: 'tnpsc-tamil-3', question: 'சிலப்பதிகாரத்தை எழுதியவர்:', questionTamil: 'சிலப்பதிகாரத்தை எழுதியவர்:', options: ['கம்பர்', 'இளங்கோவடிகள்', 'சீத்தலைச்சாத்தனார்', 'திருதக்கதேவர்'], answer: 1, explanation: 'இளங்கோவடிகள் சிலப்பதிகாரத்தை எழுதினார்', explanationTamil: 'இளங்கோவடிகள் சிலப்பதிகாரத்தை எழுதினார்', subject: 'Tamil', difficulty: 'easy' },
      { id: 'tnpsc-tamil-4', question: 'திருக்குறளில் உள்ள அதிகாரங்கள்:', questionTamil: 'திருக்குறளில் உள்ள அதிகாரங்கள்:', options: ['133', '108', '120', '100'], answer: 0, explanation: 'திருக்குறளில் 133 அதிகாரங்கள் உள்ளன', explanationTamil: 'திருக்குறளில் 133 அதிகாரங்கள் உள்ளன', subject: 'Tamil', difficulty: 'easy' },
      { id: 'tnpsc-tamil-5', question: '"மணிமேகலை" யை எழுதியவர்:', questionTamil: '"மணிமேகலை" யை எழுதியவர்:', options: ['இளங்கோவடிகள்', 'சீத்தலைச்சாத்தனார்', 'கம்பர்', 'திருவள்ளுவர்'], answer: 1, explanation: 'சீத்தலைச்சாத்தனார் மணிமேகலையை எழுதினார்', explanationTamil: 'சீத்தலைச்சாத்தனார் மணிமேகலையை எழுதினார்', subject: 'Tamil', difficulty: 'easy' },
      { id: 'tnpsc-tamil-6', question: 'கம்பராமாயணத்தை எழுதியவர்:', questionTamil: 'கம்பராமாயணத்தை எழுதியவர்:', options: ['கம்பர்', 'இளங்கோவடிகள்', 'பாரதி', 'புதுமைப்பித்தன்'], answer: 0, explanation: 'கம்பர் கம்பராமாயணத்தை எழுதினார்', explanationTamil: 'கம்பர் கம்பராமாயணத்தை எழுதினார்', subject: 'Tamil', difficulty: 'easy' },
      { id: 'tnpsc-tamil-7', question: '"புதிய ஆத்திசூடி" யை எழுதியவர்:', questionTamil: '"புதிய ஆத்திசூடி" யை எழுதியவர்:', options: ['பாரதியார்', 'பாரதிதாசன்', 'கண்ணதாசன்', 'வைரமுத்து'], answer: 0, explanation: 'பாரதியார் புதிய ஆத்திசூடியை எழுதினார்', explanationTamil: 'பாரதியார் புதிய ஆத்திசூடியை எழுதினார்', subject: 'Tamil', difficulty: 'medium' },
      { id: 'tnpsc-tamil-8', question: 'ஐம்பெருங்காப்பியங்களில் முதலாவது:', questionTamil: 'ஐம்பெருங்காப்பியங்களில் முதலாவது:', options: ['சிலப்பதிகாரம்', 'மணிமேகலை', 'சீவக சிந்தாமணி', 'குண்டலகேசி'], answer: 0, explanation: 'சிலப்பதிகாரம் ஐம்பெருங்காப்பியங்களில் முதலாவது', explanationTamil: 'சிலப்பதிகாரம் ஐம்பெருங்காப்பியங்களில் முதலாவது', subject: 'Tamil', difficulty: 'medium' },
      { id: 'tnpsc-apt-1', question: 'Find the next term: 3, 6, 11, 18, 27, ?', questionTamil: 'அடுத்த எண்ணைக் கண்டறிக: 3, 6, 11, 18, 27, ?', options: ['36', '38', '40', '42'], answer: 1, explanation: 'Differences: 3, 5, 7, 9, 11. Next: 27 + 11 = 38', explanationTamil: 'வேறுபாடுகள்: 3, 5, 7, 9, 11. அடுத்தது: 27 + 11 = 38', subject: 'Aptitude', difficulty: 'medium' },
      { id: 'tnpsc-apt-2', question: 'If APPLE is coded as 50, then MANGO is coded as:', questionTamil: 'APPLE என்பது 50 என குறியீடு செய்யப்பட்டால், MANGO என்பது:', options: ['55', '57', '60', '63'], answer: 2, explanation: 'A=1,P=16,P=16,L=12,E=5 = 50. M=13,A=1,N=14,G=7,O=15 = 50. Same = 50. (Letter sum)', explanationTamil: 'A=1,P=16,P=16,L=12,E=5 = 50. M=13,A=1,N=14,G=7,O=15 = 50', subject: 'Aptitude', difficulty: 'medium' },
      { id: 'tnpsc-apt-3', question: 'A is 2 years older than B. B is 3 years older than C. If C is 10 years old, how old is A?', questionTamil: 'A என்பவர் B ஐ விட 2 வயது மூத்தவர். B என்பவர் C ஐ விட 3 வயது மூத்தவர். C 10 வயது எனில், A எத்தனை வயது?', options: ['13', '14', '15', '16'], answer: 2, explanation: 'C=10, B=13, A=15', explanationTamil: 'C=10, B=13, A=15', subject: 'Aptitude', difficulty: 'easy' },
      { id: 'tnpsc-apt-4', question: 'If today is Monday, what day will it be after 100 days?', questionTamil: 'இன்று திங்கட்கிழமை எனில், 100 நாட்களுக்குப் பிறகு என்ன கிழமை?', options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], answer: 2, explanation: '100 ÷ 7 = 14 weeks 2 days. Monday + 2 = Wednesday', explanationTamil: '100 ÷ 7 = 14 வாரங்கள் 2 நாட்கள். திங்கள் + 2 = புதன்', subject: 'Aptitude', difficulty: 'medium' },
      { id: 'tnpsc-apt-5', question: 'In a row, Ravi is 15th from left and 10th from right. How many students are in the row?', questionTamil: 'ஒரு வரிசையில், ரவி இடமிருந்து 15வது மற்றும் வலமிருந்து 10வது. வரிசையில் எத்தனை மாணவர்கள்?', options: ['24', '25', '26', '27'], answer: 0, explanation: 'Total = 15 + 10 - 1 = 24', explanationTamil: 'மொத்தம் = 15 + 10 - 1 = 24', subject: 'Aptitude', difficulty: 'easy' },
      { id: 'tnpsc-g4-gs-13', question: 'Which dynasty built the Shore Temple at Mahabalipuram?', questionTamil: 'மாமல்லபுரத்தில் கடற்கரை கோயிலைக் கட்டிய வம்சம் எது?', options: ['Chola', 'Pallava', 'Pandya', 'Chera'], optionsTamil: ['சோழர்கள்', 'பல்லவர்கள்', 'பாண்டியர்கள்', 'சேரர்கள்'], answer: 1, explanation: 'Shore Temple was built by Pallava King Narasimhavarman II (Rajasimha)', explanationTamil: 'கடற்கரை கோயில் பல்லவ மன்னர் இரண்டாம் நரசிம்மவர்மன் (ராஜசிம்மன்) ஆல் கட்டப்பட்டது', subject: 'General Studies', difficulty: 'medium' },
      { id: 'tnpsc-g4-gs-14', question: 'The largest district in Tamil Nadu by area is:', questionTamil: 'தமிழ்நாட்டின் பரப்பளவில் மிகப்பெரிய மாவட்டம்:', options: ['Villupuram', 'Tiruvannamalai', 'Vellore', 'Salem'], optionsTamil: ['விழுப்புரம்', 'திருவண்ணாமலை', 'வேலூர்', 'சேலம்'], answer: 0, explanation: 'Villupuram is the largest district in TN by area', explanationTamil: 'விழுப்புரம் பரப்பளவில் தமிழ்நாட்டின் மிகப்பெரிய மாவட்டம்', subject: 'Geography', difficulty: 'medium' }
    ]
  },
  {
    id: 'tnpsc-group2',
    name: 'TNPSC Group 2',
    nameTamil: 'TNPSC குழு 2',
    qualification: 'Any Degree',
    qualificationTamil: 'ஏதேனும் பட்டம்',
    age: '18 - 32 years',
    salary: '₹35,600 - ₹1,12,400/month',
    selectionProcess: 'Prelims → Mains → Interview',
    selectionProcessTamil: 'முதநிலை → முதன்மை → நேர்காணல்',
    posts: ['Deputy Collector', 'DSP', 'Assistant Commissioner', 'District Registrar'],
    postsTamil: ['துணை ஆட்சியர்', 'துணைக் காவல் கண்காணிப்பாளர்', 'உதவி ஆணையர்', 'மாவட்ட பதிவாளர்'],
    examPattern: [
      { paper: 'Prelims', paperTamil: 'முதநிலை', marks: 300, duration: '3 hours', questions: 200 },
      { paper: 'Mains', paperTamil: 'முதன்மை', marks: 450, duration: '3 hours', questions: 200 }
    ],
    syllabus: {
      prelims: [
        {
          name: 'TNPSC Group 2 Prelims Syllabus',
          nameTamil: 'TNPSC குழு 2 முதநிலை பாடத்திட்டம்',
          topics: [
            { name: 'General Studies (100 Qs)', nameTamil: 'பொது அறிவு (100 கேள்விகள்)', subtopics: ['History - Indian & TN History', 'Geography', 'Indian Polity', 'Indian Economy', 'Science & Technology', 'Current Affairs'] },
            { name: 'Aptitude & Mental Ability (25 Qs)', nameTamil: 'திறன் & மன திறன் (25 கேள்விகள்)', subtopics: ['Reasoning', 'Quantitative Aptitude', 'Logical Reasoning', 'Data Interpretation'] },
            { name: 'Tamil (75 Qs)', nameTamil: 'தமிழ் (75 கேள்விகள்)', subtopics: ['Tamil Grammar', 'Tamil Literature', 'Comprehension'] }
          ]
        }
      ]
    },
    pyq: [
      // Tamil Nadu History
      { id: 'tnpsc-g2-hist-1', question: 'Who was the last ruler of Nayak dynasty in Madurai?', questionTamil: 'மதுரை நாயக்க வம்சத்தின் கடைசி ஆட்சியாளர் யார்?', options: ['Thirumalai Nayak', 'Rani Mangammal', 'Vijayaranga Chokkanatha', 'Muthu Krishnappa Nayak'], optionsTamil: ['திருமலை நாயக்கர்', 'ராணி மங்கம்மாள்', 'விஜயரங்க சொக்கநாதர்', 'முத்து கிருஷ்ணப்ப நாயக்கர்'], answer: 3, explanation: 'Muthu Krishnappa Nayak was the last Madurai Nayak ruler (1750-1752)', explanationTamil: 'முத்து கிருஷ்ணப்ப நாயக்கர் மதுரை நாயக்கர் வம்சத்தின் கடைசி ஆட்சியாளர் (1750-1752)', subject: 'Tamil Nadu History', difficulty: 'medium' },
      { id: 'tnpsc-g2-hist-2', question: 'The Vellore Mutiny took place in which year?', questionTamil: 'வேலூர் கலகம் எந்த ஆண்டு நடந்தது?', options: ['1806', '1857', '1801', '1799'], optionsTamil: ['1806', '1857', '1801', '1799'], answer: 0, explanation: 'Vellore Mutiny occurred on 10th July 1806, first major revolt against British', explanationTamil: 'வேலூர் கலகம் 1806 ஜூலை 10 அன்று நடந்தது, ஆங்கிலேயருக்கு எதிரான முதல் பெரிய கிளர்ச்சி', subject: 'Tamil Nadu History', difficulty: 'easy' },
      { id: 'tnpsc-g2-hist-3', question: 'Who established the Justice Party in Tamil Nadu?', questionTamil: 'தமிழ்நாட்டில் நீதிக் கட்சியை நிறுவியவர் யார்?', options: ['Periyar', 'T.M. Nair', 'C. Natesa Mudaliar', 'Both B and C'], optionsTamil: ['பெரியார்', 'டி.எம். நாயர்', 'சி. நடேச முதலியார்', 'B மற்றும் C இரண்டும்'], answer: 3, explanation: 'T.M. Nair, C. Natesa Mudaliar and P. Thyagaraja Chetty founded Justice Party in 1916', explanationTamil: 'டி.எம். நாயர், சி. நடேச முதலியார் மற்றும் பி. தியாகராஜ செட்டி 1916 இல் நீதிக் கட்சியை நிறுவினர்', subject: 'Tamil Nadu History', difficulty: 'medium' },
      { id: 'tnpsc-g2-hist-4', question: 'The Madras Labour Union was founded by:', questionTamil: 'மெட்ராஸ் தொழிலாளர் சங்கத்தை நிறுவியவர்:', options: ['B.P. Wadia', 'Thiru Vi. Ka.', 'V.O. Chidambaram', 'Subramania Bharati'], optionsTamil: ['பி.பி. வாடியா', 'திரு.வி.க.', 'வ.உ. சிதம்பரம்', 'சுப்பிரமணிய பாரதி'], answer: 0, explanation: 'B.P. Wadia founded Madras Labour Union in 1918, first trade union in India', explanationTamil: 'பி.பி. வாடியா 1918 இல் மெட்ராஸ் தொழிலாளர் சங்கத்தை நிறுவினார், இந்தியாவின் முதல் தொழிற்சங்கம்', subject: 'Tamil Nadu History', difficulty: 'medium' },
      // Indian Polity
      { id: 'tnpsc-g2-pol-1', question: 'Article 356 of Indian Constitution deals with:', questionTamil: 'இந்திய அரசியலமைப்பின் பிரிவு 356 எதைப் பற்றியது:', options: ['Emergency Provisions', 'President\'s Rule', 'Fundamental Rights', 'Directive Principles'], optionsTamil: ['அவசர கால ஏற்பாடுகள்', 'குடியரசுத் தலைவர் ஆட்சி', 'அடிப்படை உரிமைகள்', 'வழிகாட்டுதல் கொள்கைகள்'], answer: 1, explanation: 'Article 356 provides for President\'s Rule in a state', explanationTamil: 'பிரிவு 356 ஒரு மாநிலத்தில் குடியரசுத் தலைவர் ஆட்சியை வழங்குகிறது', subject: 'Indian Polity', difficulty: 'medium' },
      { id: 'tnpsc-g2-pol-2', question: 'The maximum strength of Lok Sabha as per the Constitution is:', questionTamil: 'அரசியலமைப்பின் படி மக்களவையின் அதிகபட்ச உறுப்பினர் எண்ணிக்கை:', options: ['545', '550', '552', '560'], optionsTamil: ['545', '550', '552', '560'], answer: 2, explanation: 'Maximum strength of Lok Sabha is 552 (530 states + 20 UTs + 2 Anglo-Indians)', explanationTamil: 'மக்களவையின் அதிகபட்ச எண்ணிக்கை 552 (530 மாநிலங்கள் + 20 யூடிகள் + 2 ஆங்கிலோ-இந்தியர்கள்)', subject: 'Indian Polity', difficulty: 'easy' },
      { id: 'tnpsc-g2-pol-3', question: 'Which Schedule of the Constitution contains provisions for Panchayati Raj?', questionTamil: 'அரசியலமைப்பின் எந்த அட்டவணையில் பஞ்சாயத்து ராஜ் பற்றிய ஏற்பாடுகள் உள்ளன?', options: ['9th Schedule', '10th Schedule', '11th Schedule', '12th Schedule'], optionsTamil: ['9வது அட்டவணை', '10வது அட்டவணை', '11வது அட்டவணை', '12வது அட்டவணை'], answer: 2, explanation: '11th Schedule contains 29 subjects for Panchayats (added by 73rd Amendment)', explanationTamil: '11வது அட்டவணையில் பஞ்சாயத்துகளுக்கான 29 பாடங்கள் உள்ளன (73வது திருத்தத்தால் சேர்க்கப்பட்டது)', subject: 'Indian Polity', difficulty: 'medium' },
      // Indian Economy
      { id: 'tnpsc-g2-eco-1', question: 'NABARD was established in which year?', questionTamil: 'NABARD எந்த ஆண்டு நிறுவப்பட்டது?', options: ['1980', '1981', '1982', '1985'], optionsTamil: ['1980', '1981', '1982', '1985'], answer: 2, explanation: 'NABARD was established on 12 July 1982', explanationTamil: 'NABARD 1982 ஜூலை 12 அன்று நிறுவப்பட்டது', subject: 'Indian Economy', difficulty: 'easy' },
      { id: 'tnpsc-g2-eco-2', question: 'GST was implemented in India on:', questionTamil: 'GST இந்தியாவில் எப்போது அமல்படுத்தப்பட்டது:', options: ['1st April 2017', '1st July 2017', '1st January 2018', '1st April 2018'], optionsTamil: ['1 ஏப்ரல் 2017', '1 ஜூலை 2017', '1 ஜனவரி 2018', '1 ஏப்ரல் 2018'], answer: 1, explanation: 'GST was implemented on 1st July 2017', explanationTamil: 'GST 2017 ஜூலை 1 அன்று அமல்படுத்தப்பட்டது', subject: 'Indian Economy', difficulty: 'easy' },
      { id: 'tnpsc-g2-eco-3', question: 'Which Five Year Plan is known as "Mahalanobis Model"?', questionTamil: '"மகாலனோபிஸ் மாதிரி" என்று அறியப்படும் ஐந்தாண்டு திட்டம் எது?', options: ['First', 'Second', 'Third', 'Fourth'], optionsTamil: ['முதல்', 'இரண்டாம்', 'மூன்றாம்', 'நான்காம்'], answer: 1, explanation: 'Second Five Year Plan (1956-61) was based on Mahalanobis Model', explanationTamil: 'இரண்டாவது ஐந்தாண்டு திட்டம் (1956-61) மகாலனோபிஸ் மாதிரியை அடிப்படையாகக் கொண்டது', subject: 'Indian Economy', difficulty: 'medium' },
      // Geography
      { id: 'tnpsc-g2-geo-1', question: 'Which lake in Tamil Nadu is famous for flamingos?', questionTamil: 'தமிழ்நாட்டில் எந்த ஏரி பிளமிங்கோக்களுக்கு புகழ்பெற்றது?', options: ['Pulicat Lake', 'Chilika Lake', 'Vembanad Lake', 'Kolleru Lake'], optionsTamil: ['புலிக்காட் ஏரி', 'சிலிகா ஏரி', 'வேம்பநாடு ஏரி', 'கொள்ளேரு ஏரி'], answer: 0, explanation: 'Pulicat Lake is a famous flamingo habitat in Tamil Nadu/Andhra border', explanationTamil: 'புலிக்காட் ஏரி தமிழ்நாடு/ஆந்திரா எல்லையில் புகழ்பெற்ற பிளமிங்கோ வாழிடம்', subject: 'Geography', difficulty: 'easy' },
      { id: 'tnpsc-g2-geo-2', question: 'The westernmost point of India is:', questionTamil: 'இந்தியாவின் மேற்கு முனை:', options: ['Dweep Point', 'Guhar Moti', 'Indira Point', 'Kanyakumari'], optionsTamil: ['த்வீப் பாயிண்ட்', 'குஹார் மோட்டி', 'இந்திரா பாயிண்ட்', 'கன்னியாகுமரி'], answer: 1, explanation: 'Guhar Moti in Gujarat is the westernmost point of India', explanationTamil: 'குஜராத்தில் உள்ள குஹார் மோட்டி இந்தியாவின் மேற்கு முனை', subject: 'Geography', difficulty: 'medium' },
      // Science & Technology
      { id: 'tnpsc-g2-sci-1', question: 'ISRO was established in which year?', questionTamil: 'ISRO எந்த ஆண்டு நிறுவப்பட்டது?', options: ['1962', '1969', '1972', '1975'], optionsTamil: ['1962', '1969', '1972', '1975'], answer: 1, explanation: 'ISRO was established on 15 August 1969', explanationTamil: 'ISRO 1969 ஆகஸ்ட் 15 அன்று நிறுவப்பட்டது', subject: 'Science & Technology', difficulty: 'easy' },
      { id: 'tnpsc-g2-sci-2', question: 'Chandrayaan-3 successfully landed on Moon in:', questionTamil: 'சந்திரயான்-3 சந்திரனில் வெற்றிகரமாக இறங்கிய நாள்:', options: ['14 July 2023', '23 August 2023', '15 August 2023', '26 January 2024'], optionsTamil: ['14 ஜூலை 2023', '23 ஆகஸ்ட் 2023', '15 ஆகஸ்ட் 2023', '26 ஜனவரி 2024'], answer: 1, explanation: 'Chandrayaan-3 landed on Moon on 23 August 2023', explanationTamil: 'சந்திரயான்-3 2023 ஆகஸ்ட் 23 அன்று சந்திரனில் இறங்கியது', subject: 'Science & Technology', difficulty: 'easy' },
      // Tamil Literature
      { id: 'tnpsc-g2-tamil-1', question: 'எட்டுத்தொகை நூல்களில் அகம் பற்றியவை எத்தனை?', questionTamil: 'எட்டுத்தொகை நூல்களில் அகம் பற்றியவை எத்தனை?', options: ['3', '4', '5', '6'], optionsTamil: ['3', '4', '5', '6'], answer: 2, explanation: 'அகம் பற்றிய நூல்கள்: குறுந்தொகை, நற்றிணை, ஐங்குறுநூறு, அகநானூறு, கலித்தொகை (5)', explanationTamil: 'அகம் பற்றிய நூல்கள்: குறுந்தொகை, நற்றிணை, ஐங்குறுநூறு, அகநானூறு, கலித்தொகை (5)', subject: 'Tamil', difficulty: 'medium' },
      { id: 'tnpsc-g2-tamil-2', question: 'பதினெண்கீழ்க்கணக்கு நூல்களின் எண்ணிக்கை:', questionTamil: 'பதினெண்கீழ்க்கணக்கு நூல்களின் எண்ணிக்கை:', options: ['10', '15', '18', '20'], optionsTamil: ['10', '15', '18', '20'], answer: 2, explanation: 'பதினெண்கீழ்க்கணக்கு = 18 நூல்கள்', explanationTamil: 'பதினெண்கீழ்க்கணக்கு = 18 நூல்கள்', subject: 'Tamil', difficulty: 'easy' },
      { id: 'tnpsc-g2-tamil-3', question: '"தமிழ் தேசியக் கவி" என்று அழைக்கப்படுபவர்:', questionTamil: '"தமிழ் தேசியக் கவி" என்று அழைக்கப்படுபவர்:', options: ['பாரதியார்', 'பாரதிதாசன்', 'கண்ணதாசன்', 'வைரமுத்து'], optionsTamil: ['பாரதியார்', 'பாரதிதாசன்', 'கண்ணதாசன்', 'வைரமுத்து'], answer: 0, explanation: 'சுப்பிரமணிய பாரதியார் "தமிழ் தேசியக் கவி" என்று அழைக்கப்படுகிறார்', explanationTamil: 'சுப்பிரமணிய பாரதியார் "தமிழ் தேசியக் கவி" என்று அழைக்கப்படுகிறார்', subject: 'Tamil', difficulty: 'easy' },
      // Aptitude
      { id: 'tnpsc-g2-apt-1', question: 'If the radius of a circle is doubled, its area becomes:', questionTamil: 'ஒரு வட்டத்தின் ஆரம் இரட்டிப்பானால், அதன் பரப்பளவு:', options: ['Double', 'Triple', 'Four times', 'Eight times'], optionsTamil: ['இரட்டிப்பு', 'மூன்று மடங்கு', 'நான்கு மடங்கு', 'எட்டு மடங்கு'], answer: 2, explanation: 'Area = πr². If r→2r, Area = π(2r)² = 4πr² (4 times)', explanationTamil: 'பரப்பளவு = πr². r→2r எனில், பரப்பளவு = π(2r)² = 4πr² (4 மடங்கு)', subject: 'Aptitude', difficulty: 'medium' },
      { id: 'tnpsc-g2-apt-2', question: 'A sum doubles in 8 years at simple interest. Rate of interest is:', questionTamil: 'எளிய வட்டியில் ஒரு தொகை 8 ஆண்டுகளில் இரட்டிப்பாகிறது. வட்டி விகிதம்:', options: ['10%', '12.5%', '15%', '8%'], optionsTamil: ['10%', '12.5%', '15%', '8%'], answer: 1, explanation: 'SI = P (to double). P = P×R×8/100. R = 100/8 = 12.5%', explanationTamil: 'எ.வ = P (இரட்டிப்பாக). P = P×R×8/100. R = 100/8 = 12.5%', subject: 'Aptitude', difficulty: 'medium' },
      { id: 'tnpsc-g2-apt-3', question: 'In a mixture of 60L, milk and water ratio is 2:1. How much water to add to make ratio 1:2?', questionTamil: '60 லிட்டர் கலவையில், பால் மற்றும் நீர் விகிதம் 2:1. விகிதத்தை 1:2 ஆக்க எவ்வளவு நீர் சேர்க்க வேண்டும்?', options: ['40L', '50L', '60L', '30L'], optionsTamil: ['40 லி', '50 லி', '60 லி', '30 லி'], answer: 2, explanation: 'Milk = 40L, Water = 20L. For 1:2 ratio, need 80L water. Add 60L', explanationTamil: 'பால் = 40 லி, நீர் = 20 லி. 1:2 விகிதத்திற்கு 80 லி நீர் தேவை. 60 லி சேர்க்கவும்', subject: 'Aptitude', difficulty: 'hard' }
    ]
  },
  {
    id: 'tn-police-constable',
    name: 'TN Police Constable',
    nameTamil: 'தமிழ்நாடு காவல் காவலர்',
    qualification: '12th Pass',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 24 years',
    salary: '₹22,000/month',
    selectionProcess: 'Written → Physical → Medical',
    selectionProcessTamil: 'எழுத்துத் தேர்வு → உடற்தகுதி → மருத்துவம்',
    syllabus: {
      main: [
        {
          name: 'TN Police Constable Syllabus',
          nameTamil: 'தமிழ்நாடு காவல் காவலர் பாடத்திட்டம்',
          topics: [
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', subtopics: ['Tamil Nadu History', 'Indian History', 'Geography', 'Polity', 'Current Affairs'] },
            { name: 'Aptitude & Mental Ability', nameTamil: 'திறன் & மன திறன்', subtopics: ['Number Series', 'Reasoning', 'Logical Ability'] },
            { name: 'Tamil', nameTamil: 'தமிழ்', subtopics: ['Grammar', 'Literature', 'Comprehension'] }
          ]
        }
      ]
    },
    pyq: [
      { id: 'tnpol-1', question: 'Who founded the Dravidian movement in Tamil Nadu?', questionTamil: 'தமிழ்நாட்டில் திராவிட இயக்கத்தை தொடங்கியவர் யார்?', options: ['E.V. Ramasamy Periyar', 'C.N. Annadurai', 'Kamaraj', 'T.M. Nair'], optionsTamil: ['ஈ.வெ. ராமசாமி பெரியார்', 'சி.என். அண்ணாதுரை', 'காமராஜர்', 'டி.எம். நாயர்'], answer: 0, explanation: 'Periyar founded the Dravidian movement through Self-Respect Movement', explanationTamil: 'பெரியார் சுயமரியாதை இயக்கத்தின் மூலம் திராவிட இயக்கத்தை தொடங்கினார்', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'tnpol-2', question: 'The official state animal of Tamil Nadu is:', questionTamil: 'தமிழ்நாட்டின் அதிகாரப்பூர்வ மாநில விலங்கு:', options: ['Tiger', 'Lion', 'Nilgiri Tahr', 'Elephant'], optionsTamil: ['புலி', 'சிங்கம்', 'நீலகிரி வரையாடு', 'யானை'], answer: 2, explanation: 'Nilgiri Tahr is the state animal of Tamil Nadu', explanationTamil: 'நீலகிரி வரையாடு தமிழ்நாட்டின் மாநில விலங்கு', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'tnpol-3', question: 'Marina Beach is located in:', questionTamil: 'மெரினா கடற்கரை அமைந்துள்ள இடம்:', options: ['Mumbai', 'Chennai', 'Goa', 'Kochi'], optionsTamil: ['மும்பை', 'சென்னை', 'கோவா', 'கொச்சி'], answer: 1, explanation: 'Marina Beach is in Chennai, one of the longest urban beaches', explanationTamil: 'மெரினா கடற்கரை சென்னையில் உள்ளது, மிக நீளமான நகர்ப்புற கடற்கரைகளில் ஒன்று', subject: 'Geography', difficulty: 'easy' },
      { id: 'tnpol-4', question: 'The State flower of Tamil Nadu is:', questionTamil: 'தமிழ்நாட்டின் மாநில மலர்:', options: ['Rose', 'Lotus', 'Gloriosa Lily', 'Jasmine'], optionsTamil: ['ரோஜா', 'தாமரை', 'கார்த்திகைப் பூ', 'மல்லிகை'], answer: 2, explanation: 'Gloriosa Lily (Karthigai Poo) is the state flower of Tamil Nadu', explanationTamil: 'கார்த்திகைப் பூ தமிழ்நாட்டின் மாநில மலர்', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'tnpol-5', question: 'Which district in Tamil Nadu has the longest coastline?', questionTamil: 'தமிழ்நாட்டின் எந்த மாவட்டம் மிக நீளமான கடற்கரையைக் கொண்டுள்ளது?', options: ['Chennai', 'Nagapattinam', 'Ramanathapuram', 'Tuticorin'], optionsTamil: ['சென்னை', 'நாகப்பட்டினம்', 'ராமநாதபுரம்', 'தூத்துக்குடி'], answer: 2, explanation: 'Ramanathapuram has the longest coastline in Tamil Nadu', explanationTamil: 'ராமநாதபுரம் தமிழ்நாட்டின் மிக நீளமான கடற்கரையைக் கொண்டுள்ளது', subject: 'Geography', difficulty: 'medium' },
      { id: 'tnpol-6', question: 'The famous temple town Madurai is located on which river?', questionTamil: 'புகழ்பெற்ற கோயில் நகரம் மதுரை எந்த ஆற்றின் கரையில் உள்ளது?', options: ['Kaveri', 'Vaigai', 'Tamiraparani', 'Palar'], optionsTamil: ['காவிரி', 'வைகை', 'தாமிரபரணி', 'பாலாறு'], answer: 1, explanation: 'Madurai is located on the banks of Vaigai river', explanationTamil: 'மதுரை வைகை ஆற்றின் கரையில் அமைந்துள்ளது', subject: 'Geography', difficulty: 'easy' },
      { id: 'tnpol-7', question: 'Find the odd one out: 25, 36, 49, 63, 81', questionTamil: 'ஒற்றையானதை கண்டறிக: 25, 36, 49, 63, 81', options: ['25', '36', '63', '81'], answer: 2, explanation: '25=5², 36=6², 49=7², 81=9². 63 is not a perfect square', explanationTamil: '25=5², 36=6², 49=7², 81=9². 63 ஒரு முழுமையான வர்க்க எண் அல்ல', subject: 'Aptitude', difficulty: 'easy' },
      { id: 'tnpol-8', question: 'If A = 2, B = 4, C = 6, then Z = ?', questionTamil: 'A = 2, B = 4, C = 6 எனில், Z = ?', options: ['50', '52', '54', '56'], answer: 1, explanation: 'Each letter value = position × 2. Z is 26th letter. 26 × 2 = 52', explanationTamil: 'ஒவ்வொரு எழுத்தின் மதிப்பு = நிலை × 2. Z 26வது எழுத்து. 26 × 2 = 52', subject: 'Aptitude', difficulty: 'easy' },
      { id: 'tnpol-9', question: 'Which movement was started with the slogan "Do or Die"?', questionTamil: '"செய் அல்லது சா" என்ற முழக்கத்துடன் தொடங்கப்பட்ட இயக்கம் எது?', options: ['Non-Cooperation Movement', 'Civil Disobedience Movement', 'Quit India Movement', 'Swadeshi Movement'], optionsTamil: ['ஒத்துழையாமை இயக்கம்', 'சிவில் ஒத்துழையாமை இயக்கம்', 'வெள்ளையனே வெளியேறு இயக்கம்', 'சுதேசி இயக்கம்'], answer: 2, explanation: 'Quit India Movement (1942) had the slogan "Do or Die"', explanationTamil: 'வெள்ளையனே வெளியேறு இயக்கம் (1942) "செய் அல்லது சா" என்ற முழக்கத்தைக் கொண்டிருந்தது', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'tnpol-10', question: 'The pH value of pure water is:', questionTamil: 'தூய நீரின் pH மதிப்பு:', options: ['0', '7', '14', '1'], answer: 1, explanation: 'Pure water has neutral pH of 7', explanationTamil: 'தூய நீர் நடுநிலை pH 7 ஐக் கொண்டுள்ளது', subject: 'General Science', difficulty: 'easy' },
      { id: 'tnpol-11', question: 'Who wrote the Tamil national anthem "Tamil Thai Vazhthu"?', questionTamil: '"தமிழ் தாய் வாழ்த்து" என்ற தமிழ் நாட்டுப் பாடலை எழுதியவர் யார்?', options: ['Bharathiyar', 'Bharathidasan', 'Manonmaniam Sundaram Pillai', 'Subramania Bharati'], optionsTamil: ['பாரதியார்', 'பாரதிதாசன்', 'மனோன்மணியம் சுந்தரம் பிள்ளை', 'சுப்பிரமணிய பாரதி'], answer: 2, explanation: 'Manonmaniam Sundaram Pillai wrote Tamil Thai Vazhthu', explanationTamil: 'மனோன்மணியம் சுந்தரம் பிள்ளை தமிழ் தாய் வாழ்த்தை எழுதினார்', subject: 'Tamil', difficulty: 'medium' },
      { id: 'tnpol-12', question: 'Pointing to a woman, Ram said "She is the mother of my father\'s only daughter". How is the woman related to Ram?', questionTamil: 'ஒரு பெண்ணைக் காட்டி, ராம் கூறினார் "அவள் என் தந்தையின் ஒரே மகளின் தாய்". அந்த பெண் ராமுக்கு என்ன உறவு?', options: ['Mother', 'Sister', 'Grandmother', 'Aunt'], optionsTamil: ['தாய்', 'சகோதரி', 'பாட்டி', 'அத்தை'], answer: 0, explanation: 'Father\'s only daughter = Ram\'s sister. Her mother = Ram\'s mother', explanationTamil: 'தந்தையின் ஒரே மகள் = ராமின் சகோதரி. அவளுடைய தாய் = ராமின் தாய்', subject: 'Reasoning', difficulty: 'medium' },
      { id: 'tnpol-13', question: 'The largest district in Tamil Nadu by area is:', questionTamil: 'தமிழ்நாட்டின் பரப்பளவில் மிகப்பெரிய மாவட்டம்:', options: ['Villupuram', 'Tirunelveli', 'Erode', 'Dharmapuri'], optionsTamil: ['விழுப்புரம்', 'திருநெல்வேலி', 'ஈரோடு', 'தர்மபுரி'], answer: 1, explanation: 'Tirunelveli is the largest district by area in Tamil Nadu', explanationTamil: 'திருநெல்வேலி தமிழ்நாட்டின் பரப்பளவில் மிகப்பெரிய மாவட்டம்', subject: 'Geography', difficulty: 'medium' },
      { id: 'tnpol-14', question: 'What is the minimum age requirement for TN Police Constable?', questionTamil: 'தமிழ்நாடு காவலர் தேர்வுக்கான குறைந்தபட்ச வயது வரம்பு என்ன?', options: ['17 years', '18 years', '21 years', '25 years'], answer: 1, explanation: 'Minimum age for TN Police Constable is 18 years', explanationTamil: 'தமிழ்நாடு காவலருக்கான குறைந்தபட்ச வயது 18 ஆண்டுகள்', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'tnpol-15', question: 'If 12 men can complete a work in 10 days, how many days will 15 men take?', questionTamil: '12 ஆட்கள் ஒரு வேலையை 10 நாட்களில் முடிக்க முடியும் எனில், 15 ஆட்கள் எத்தனை நாட்களில் முடிப்பார்கள்?', options: ['6 days', '8 days', '10 days', '12 days'], answer: 1, explanation: 'Men × Days = Constant. 12×10 = 15×x. x = 120/15 = 8 days', explanationTamil: 'ஆட்கள் × நாட்கள் = மாறிலி. 12×10 = 15×x. x = 120/15 = 8 நாட்கள்', subject: 'Mathematics', difficulty: 'medium' },
      { id: 'tnpol-16', question: 'The Indian Police Act was passed in:', questionTamil: 'இந்திய காவல் சட்டம் இயற்றப்பட்ட ஆண்டு:', options: ['1857', '1861', '1947', '1950'], answer: 1, explanation: 'Indian Police Act was passed in 1861 by British', explanationTamil: 'இந்திய காவல் சட்டம் 1861 இல் ஆங்கிலேயர்களால் இயற்றப்பட்டது', subject: 'General Knowledge', difficulty: 'medium' },
      { id: 'tnpol-17', question: 'IPC stands for:', questionTamil: 'IPC என்பதன் விரிவாக்கம்:', options: ['Indian Police Code', 'Indian Penal Code', 'International Police Council', 'Indian Protection Code'], optionsTamil: ['இந்திய காவல் குறியீடு', 'இந்திய தண்டனைச் சட்டம்', 'சர்வதேச காவல் கவுன்சில்', 'இந்திய பாதுகாப்பு குறியீடு'], answer: 1, explanation: 'IPC = Indian Penal Code (now replaced by BNS)', explanationTamil: 'IPC = இந்திய தண்டனைச் சட்டம் (இப்போது BNS ஆல் மாற்றப்பட்டது)', subject: 'General Knowledge', difficulty: 'easy' },
      { id: 'tnpol-18', question: 'Complete the series: A, C, F, J, ?', questionTamil: 'தொடரை நிறைவு செய்க: A, C, F, J, ?', options: ['M', 'N', 'O', 'P'], answer: 2, explanation: 'Gaps: +2, +3, +4, +5. J + 5 = O', explanationTamil: 'இடைவெளிகள்: +2, +3, +4, +5. J + 5 = O', subject: 'Reasoning', difficulty: 'medium' },
      { id: 'tnpol-19', question: 'The chemical formula of common salt is:', questionTamil: 'சாதாரண உப்பின் வேதி சூத்திரம்:', options: ['NaCl', 'KCl', 'CaCl₂', 'MgCl₂'], answer: 0, explanation: 'Common salt (Sodium Chloride) = NaCl', explanationTamil: 'சாதாரண உப்பு (சோடியம் குளோரைடு) = NaCl', subject: 'General Science', difficulty: 'easy' },
      { id: 'tnpol-20', question: 'Who is the DGP of Tamil Nadu Police currently appointed by?', questionTamil: 'தமிழ்நாடு காவல்துறை தலைவரை தற்போது நியமிப்பது யார்?', options: ['President of India', 'Chief Minister', 'Governor', 'Home Minister'], optionsTamil: ['இந்தியக் குடியரசுத் தலைவர்', 'முதலமைச்சர்', 'ஆளுநர்', 'உள்துறை அமைச்சர்'], answer: 2, explanation: 'DGP is appointed by the Governor on recommendation of UPSC/State Government', explanationTamil: 'DGP ஆளுநரால் UPSC/மாநில அரசின் பரிந்துரையின் பேரில் நியமிக்கப்படுகிறார்', subject: 'General Knowledge', difficulty: 'hard' }
    ]
  },
  {
    id: 'tn-forest-guard',
    name: 'TN Forest Guard',
    nameTamil: 'தமிழ்நாடு வன காவலர்',
    qualification: '10th/12th Pass',
    qualificationTamil: '10/12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 30 years',
    salary: '₹20,000/month',
    selectionProcess: 'Written → Physical → Medical',
    selectionProcessTamil: 'எழுத்துத் தேர்வு → உடற்தகுதி → மருத்துவம்',
    syllabus: {
      main: [
        {
          name: 'TN Forest Guard Syllabus',
          nameTamil: 'தமிழ்நாடு வன காவலர் பாடத்திட்டம்',
          topics: [
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', subtopics: ['Forest & Wildlife', 'Environment', 'TN Geography', 'Current Affairs'] },
            { name: 'Aptitude', nameTamil: 'திறன்', subtopics: ['Mathematics', 'Reasoning'] },
            { name: 'Tamil', nameTamil: 'தமிழ்', subtopics: ['Grammar', 'Comprehension'] }
          ]
        }
      ]
    },
    pyq: []
  },
  {
    id: 'tneb-assessor',
    name: 'TNEB Assessor',
    nameTamil: 'TNEB மதிப்பீட்டாளர்',
    qualification: '12th Pass',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 30 years',
    salary: '₹20,000/month',
    selectionProcess: 'Written Exam',
    selectionProcessTamil: 'எழுத்துத் தேர்வு',
    syllabus: {
      main: [
        {
          name: 'TNEB Assessor Syllabus',
          nameTamil: 'TNEB மதிப்பீட்டாளர் பாடத்திட்டம்',
          topics: [
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', subtopics: ['Current Affairs', 'History', 'Geography', 'Science'] },
            { name: 'Aptitude', nameTamil: 'திறன்', subtopics: ['Mathematics', 'Reasoning'] },
            { name: 'Tamil', nameTamil: 'தமிழ்', subtopics: ['Grammar', 'Literature'] }
          ]
        }
      ]
    },
    pyq: []
  }
];

// ==================== OTHER CENTRAL GOVT ====================
const centralExams: Exam[] = [
  {
    id: 'army-clerk',
    name: 'Indian Army Clerk/SKT',
    nameTamil: 'இந்திய ராணுவ எழுத்தர்/SKT',
    qualification: '12th Pass (60%)',
    qualificationTamil: '12ஆம் வகுப்பு தேர்ச்சி (60%)',
    age: '17.5 - 23 years',
    salary: '₹25,000/month',
    selectionProcess: 'Written → Physical → Medical',
    selectionProcessTamil: 'எழுத்துத் தேர்வு → உடற்தகுதி → மருத்துவம்',
    syllabus: {
      main: [
        {
          name: 'Army Clerk Syllabus',
          nameTamil: 'ராணுவ எழுத்தர் பாடத்திட்டம்',
          topics: [
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', subtopics: ['History', 'Geography', 'Polity', 'Current Affairs', 'Defence'] },
            { name: 'Mathematics', nameTamil: 'கணிதம்', subtopics: ['Arithmetic', 'Algebra', 'Geometry', 'Statistics'] },
            { name: 'English', nameTamil: 'ஆங்கிலம்', subtopics: ['Grammar', 'Vocabulary', 'Comprehension'] },
            { name: 'Computer', nameTamil: 'கணினி', subtopics: ['MS Office', 'Internet', 'Basics'] }
          ]
        }
      ]
    },
    pyq: []
  },
  {
    id: 'fci-watchman',
    name: 'FCI Watchman',
    nameTamil: 'FCI காவலாளி',
    qualification: '10th/12th Pass',
    qualificationTamil: '10/12ஆம் வகுப்பு தேர்ச்சி',
    age: '18 - 25 years',
    salary: '₹18,000/month',
    selectionProcess: 'Written → Physical',
    selectionProcessTamil: 'எழுத்துத் தேர்வு → உடற்தகுதி',
    syllabus: {
      main: [
        {
          name: 'FCI Watchman Syllabus',
          nameTamil: 'FCI காவலாளி பாடத்திட்டம்',
          topics: [
            { name: 'General Knowledge', nameTamil: 'பொது அறிவு', subtopics: ['Current Affairs', 'History', 'Geography'] },
            { name: 'Reasoning', nameTamil: 'தர்க்கம்', subtopics: ['Verbal', 'Non-Verbal'] },
            { name: 'Numerical Ability', nameTamil: 'எண் திறன்', subtopics: ['Basic Mathematics'] }
          ]
        }
      ]
    },
    pyq: []
  }
];

// ==================== CATEGORIES ====================
export const governmentExamCategories: Category[] = [
  {
    id: 'defence',
    name: 'Defence & Paramilitary',
    nameTamil: 'பாதுகாப்பு & துணை ராணுவம்',
    icon: '🛡️',
    color: 'from-amber-500 to-yellow-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-300',
    exams: defenceExams
  },
  {
    id: 'railway',
    name: 'Railway Jobs',
    nameTamil: 'ரயில்வே வேலைகள்',
    icon: '🚂',
    color: 'from-red-500 to-rose-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-300',
    exams: railwayExams
  },
  {
    id: 'ssc',
    name: 'SSC',
    nameTamil: 'SSC',
    icon: '📋',
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-300',
    exams: sscExams
  },
  {
    id: 'banking',
    name: 'Banking & Insurance',
    nameTamil: 'வங்கி & காப்பீடு',
    icon: '🏦',
    color: 'from-emerald-500 to-green-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    exams: bankingExams
  },
  {
    id: 'state',
    name: 'Tamil Nadu State Govt',
    nameTamil: 'தமிழ்நாடு மாநில அரசு',
    icon: '🏛️',
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-300',
    exams: stateExams
  },
  {
    id: 'central',
    name: 'Other Central Govt',
    nameTamil: 'பிற மத்திய அரசு',
    icon: '🏢',
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-300',
    exams: centralExams
  }
];

export const getCategoryById = (id: string): Category | undefined => {
  return governmentExamCategories.find(cat => cat.id === id);
};

export const getExamById = (categoryId: string, examId: string): Exam | undefined => {
  const category = getCategoryById(categoryId);
  return category?.exams.find(exam => exam.id === examId);
};
