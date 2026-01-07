import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { supabase } from '@/integrations/supabase/client';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  ArrowLeft,
  Send,
  Mic,
  MicOff,
  Trash2,
  GraduationCap,
  Building2,
  Compass,
  Loader2,
  Bot,
  User,
  Volume2,
  VolumeX,
  Target,
  TrendingUp,
  BookOpen,
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileText,
  MessageSquare,
  BriefcaseBusiness,
  DollarSign,
  Clock,
  Star,
  Zap,
  MapPin,
  School,
  FlaskConical,
  Award,
  Route,
  Lightbulb,
  Languages,
  StopCircle,
  HelpCircle,
  Calendar,
  IndianRupee,
  Heart,
  Users
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Career options for skill gap analyzer
const CAREER_OPTIONS = [
  'Software Developer',
  'Data Scientist',
  'Web Developer',
  'Mobile App Developer',
  'DevOps Engineer',
  'Cloud Architect',
  'Machine Learning Engineer',
  'UI/UX Designer',
  'Product Manager',
  'Business Analyst',
  'Cybersecurity Analyst',
  'Database Administrator',
  'Network Engineer',
  'Full Stack Developer',
  'AI Engineer',
  'Blockchain Developer',
  'Game Developer',
  'Quality Assurance Engineer',
  'Technical Writer',
  'IT Project Manager'
];

// Common skills for selection
const COMMON_SKILLS = [
  'Python', 'JavaScript', 'Java', 'C++', 'SQL', 'HTML/CSS',
  'React', 'Node.js', 'TypeScript', 'Git', 'Docker', 'AWS',
  'Machine Learning', 'Data Analysis', 'Excel', 'Communication',
  'Problem Solving', 'Teamwork', 'Leadership', 'Critical Thinking',
  'Agile/Scrum', 'REST APIs', 'MongoDB', 'PostgreSQL', 'Linux',
  'Figma', 'Adobe XD', 'Photoshop', 'Project Management', 'Testing'
];

// 12th Student Streams
const STUDENT_STREAMS = [
  { value: 'pcm', label: 'Science (PCM) - Physics, Chemistry, Math' },
  { value: 'pcb', label: 'Science (PCB) - Physics, Chemistry, Biology' },
  { value: 'pcmb', label: 'Science (PCMB) - All Sciences' },
  { value: 'commerce', label: 'Commerce with Maths' },
  { value: 'commerce-no-math', label: 'Commerce without Maths' },
  { value: 'arts', label: 'Arts / Humanities' }
];

// Entrance Exams
const ENTRANCE_EXAMS = [
  { value: 'jee-main', label: 'JEE Main (Engineering)' },
  { value: 'jee-advanced', label: 'JEE Advanced (IITs)' },
  { value: 'neet', label: 'NEET (Medical)' },
  { value: 'bitsat', label: 'BITSAT (BITS Pilani)' },
  { value: 'viteee', label: 'VITEEE (VIT)' },
  { value: 'srmjeee', label: 'SRMJEEE (SRM)' },
  { value: 'cuet', label: 'CUET (Central Universities)' },
  { value: 'clat', label: 'CLAT (Law)' },
  { value: 'nda', label: 'NDA (Defence)' },
  { value: 'ca-foundation', label: 'CA Foundation' },
  { value: 'nid-dat', label: 'NID DAT (Design)' },
  { value: 'nift', label: 'NIFT (Fashion)' }
];

// Career Categories for 12th students
const CAREER_CATEGORIES_12TH = [
  'Engineering & Technology',
  'Medical & Healthcare',
  'Business & Management',
  'Law & Legal Studies',
  'Arts & Design',
  'Pure Sciences',
  'Commerce & Finance',
  'Government Jobs',
  'Defence Services',
  'Media & Journalism',
  'Hospitality & Tourism',
  'Agriculture & Food Tech'
];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/jkkn-chat`;

const CareerChat = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isTtsEnabled, setIsTtsEnabled] = useState(false);
  const [isTamilVoice, setIsTamilVoice] = useState(true); // Default to Tamil for 12th students
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Skill Gap Analyzer state
  const [skillGapOpen, setSkillGapOpen] = useState(false);
  const [targetCareer, setTargetCareer] = useState('');
  const [currentSkills, setCurrentSkills] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Resume Review state
  const [resumeReviewOpen, setResumeReviewOpen] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState('');
  
  // Mock Interview state
  const [mockInterviewOpen, setMockInterviewOpen] = useState(false);
  const [interviewRole, setInterviewRole] = useState('');
  const [interviewLevel, setInterviewLevel] = useState('');
  const [interviewType, setInterviewType] = useState('');
  
  // Salary Insights state
  const [salaryInsightsOpen, setSalaryInsightsOpen] = useState(false);
  const [salaryRole, setSalaryRole] = useState('');
  const [salaryLocation, setSalaryLocation] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  
  // 12th Student Features state
  const [collegeGuidanceOpen, setCollegeGuidanceOpen] = useState(false);
  const [studentStream, setStudentStream] = useState('');
  const [marksPercentage, setMarksPercentage] = useState('');
  const [preferredState, setPreferredState] = useState('');
  
  const [streamHelpOpen, setStreamHelpOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [favoriteSubjects, setFavoriteSubjects] = useState<string[]>([]);
  
  const [examPrepOpen, setExamPrepOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState('');
  const [prepMonths, setPrepMonths] = useState('');
  const [currentPrep, setCurrentPrep] = useState('');
  
  const [careerExplorerOpen, setCareerExplorerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [explorerStream, setExplorerStream] = useState('');
  
  // New 12th Student Features
  const [doubtSolverOpen, setDoubtSolverOpen] = useState(false);
  const [doubtSubject, setDoubtSubject] = useState('');
  const [doubtTopic, setDoubtTopic] = useState('');
  const [doubtQuestion, setDoubtQuestion] = useState('');
  
  const [studyPlannerOpen, setStudyPlannerOpen] = useState(false);
  const [studyHoursPerDay, setStudyHoursPerDay] = useState('');
  const [weakSubjects, setWeakSubjects] = useState<string[]>([]);
  const [studyGoal, setStudyGoal] = useState('');
  
  const [scholarshipFinderOpen, setScholarshipFinderOpen] = useState(false);
  const [familyIncome, setFamilyIncome] = useState('');
  const [scholarshipCategory, setScholarshipCategory] = useState('');
  const [scholarshipStream, setScholarshipStream] = useState('');
  
  const [parentTalkOpen, setParentTalkOpen] = useState(false);
  const [desiredCareer, setDesiredCareer] = useState('');
  const [parentConcern, setParentConcern] = useState('');
  const [currentSituation, setCurrentSituation] = useState('');

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load chat history
  useEffect(() => {
    const loadHistory = async () => {
      if (!user) return;

      const { data } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (data && data.length > 0) {
        setMessages(
          data.map((m) => ({
            role: m.role as 'user' | 'assistant',
            content: m.content,
            timestamp: new Date(m.created_at)
          }))
        );
      }
    };

    loadHistory();
  }, [user]);

  // Initialize speech recognition
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      recognition.onstart = () => setIsListening(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = Array.from({ length: event.results.length })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((_, i) => (event.results[i] as any)[0].transcript)
          .join('');
        setInput(transcript);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
    }
  }, []);

  const saveMessage = useCallback(
    async (message: Message) => {
      if (!user) return;
      await supabase.from('chat_messages').insert({
        user_id: user.id,
        role: message.role,
        content: message.content
      });
    },
    [user]
  );

  const speakText = useCallback((text: string) => {
    if (!isTtsEnabled) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Check if text contains Tamil characters or user prefers Tamil
    const hasTamilText = text.match(/[\u0B80-\u0BFF]/);
    
    if (isTamilVoice || hasTamilText) {
      utterance.lang = 'ta-IN';
      // Try to find a Tamil voice
      const voices = window.speechSynthesis.getVoices();
      const tamilVoice = voices.find(v => v.lang.includes('ta') || v.lang.includes('Tamil'));
      if (tamilVoice) {
        utterance.voice = tamilVoice;
      }
    } else {
      utterance.lang = 'en-IN';
    }
    
    utterance.rate = 0.9; // Slightly slower for better comprehension
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  }, [isTtsEnabled, isTamilVoice]);

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      toast({
        title: 'Voice not supported',
        description: 'Your browser does not support voice input.',
        variant: 'destructive'
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const streamChat = async (userMessages: Message[]) => {
    setIsLoading(true);

    try {
      // Get the current session for authentication
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        throw new Error('Please sign in to use the chat');
      }
      
      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          messages: userMessages.map((m) => ({ role: m.role, content: m.content }))
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 401) {
          throw new Error('Please sign in to use the chat');
        } else if (response.status === 429) {
          throw new Error(errorData.error || 'Rate limit exceeded. Please try again later.');
        }
        throw new Error(errorData.error || 'Chat failed');
      }
      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      // Add placeholder assistant message
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '', timestamp: new Date() }
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ') && line.trim() !== 'data: [DONE]') {
            try {
              const json = JSON.parse(line.slice(6));
              const delta = json.choices?.[0]?.delta?.content;
              if (delta) {
                assistantContent += delta;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: 'assistant',
                    content: assistantContent,
                    timestamp: new Date()
                  };
                  return updated;
                });
              }
            } catch {
              // Skip malformed JSON
            }
          }
        }
      }

      // Save assistant message
      const assistantMessage: Message = {
        role: 'assistant',
        content: assistantContent,
        timestamp: new Date()
      };
      await saveMessage(assistantMessage);
      speakText(assistantContent);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get response. Please try again.',
        variant: 'destructive'
      });
      // Remove placeholder
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    await saveMessage(userMessage);
    await streamChat([...messages, userMessage]);
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
  };

  const clearChat = async () => {
    if (!user) return;

    await supabase.from('chat_messages').delete().eq('user_id', user.id);
    setMessages([]);
    toast({ title: 'Chat cleared', description: 'Your conversation history has been deleted.' });
  };

  const toggleSkill = (skill: string) => {
    setCurrentSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const analyzeSkillGap = async () => {
    if (!targetCareer || currentSkills.length === 0) {
      toast({
        title: 'Missing Information',
        description: 'Please select a target career and at least one skill.',
        variant: 'destructive'
      });
      return;
    }

    setIsAnalyzing(true);
    setSkillGapOpen(false);

    const analysisPrompt = `Perform a detailed SKILL GAP ANALYSIS for the following:

TARGET CAREER: ${targetCareer}
CURRENT SKILLS: ${currentSkills.join(', ')}

Please provide:
1. **Skills Match Analysis** - Which of my current skills are relevant for ${targetCareer} and how well they match
2. **Missing Critical Skills** - List the essential skills I'm missing with priority levels (High/Medium/Low)
3. **Learning Roadmap** - A 3-6 month action plan to bridge the gap
4. **Recommended Resources** - Specific courses, certifications, or projects for each missing skill
5. **Career Readiness Score** - Rate my current readiness from 0-100%
6. **Quick Wins** - Skills I can acquire in under 2 weeks that would boost my profile

Format the response clearly with headers and bullet points.`;

    const userMessage: Message = {
      role: 'user',
      content: analysisPrompt,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    await saveMessage(userMessage);
    await streamChat([...messages, userMessage]);
    setIsAnalyzing(false);
    
    // Reset form
    setTargetCareer('');
    setCurrentSkills([]);
  };

  // Resume Review function
  const analyzeResume = async () => {
    if (!resumeText.trim()) {
      toast({
        title: 'Missing Resume',
        description: 'Please paste your resume content.',
        variant: 'destructive'
      });
      return;
    }

    setIsAnalyzing(true);
    setResumeReviewOpen(false);

    const resumePrompt = `Perform a comprehensive RESUME REVIEW for a ${targetRole || 'general'} position:

RESUME CONTENT:
${resumeText}

Please provide:
1. **Overall Score** - Rate the resume from 0-100%
2. **ATS Compatibility** - How well will this pass Applicant Tracking Systems?
3. **Strengths** - What's working well in this resume
4. **Areas for Improvement** - Specific sections that need enhancement
5. **Missing Elements** - Key sections or information that should be added
6. **Keyword Suggestions** - Industry keywords to include for better visibility
7. **Formatting Tips** - Layout and structure recommendations
8. **Action Verb Suggestions** - Stronger alternatives for weak phrases
9. **Quantification Opportunities** - Where to add metrics and numbers
10. **Rewritten Summary** - An improved professional summary

Be specific and actionable in your feedback.`;

    const userMessage: Message = {
      role: 'user',
      content: resumePrompt,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    await saveMessage(userMessage);
    await streamChat([...messages, userMessage]);
    setIsAnalyzing(false);
    
    setResumeText('');
    setTargetRole('');
  };

  // Mock Interview function
  const startMockInterview = async () => {
    if (!interviewRole) {
      toast({
        title: 'Missing Role',
        description: 'Please select a role for the interview.',
        variant: 'destructive'
      });
      return;
    }

    setIsAnalyzing(true);
    setMockInterviewOpen(false);

    const interviewPrompt = `Start a MOCK INTERVIEW session for the following:

ROLE: ${interviewRole}
EXPERIENCE LEVEL: ${interviewLevel || 'Entry Level'}
INTERVIEW TYPE: ${interviewType || 'Technical + Behavioral'}

Please:
1. Act as an interviewer from a top company
2. Ask me 5-7 interview questions one by one
3. Start with an introduction question, then mix technical and behavioral questions
4. After I answer each question, provide:
   - Score (1-10)
   - What was good
   - What could be improved
   - A sample ideal answer

Start with the first question now. Make it realistic and challenging but appropriate for the experience level.`;

    const userMessage: Message = {
      role: 'user',
      content: interviewPrompt,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    await saveMessage(userMessage);
    await streamChat([...messages, userMessage]);
    setIsAnalyzing(false);
    
    setInterviewRole('');
    setInterviewLevel('');
    setInterviewType('');
  };

  // Salary Insights function
  const getSalaryInsights = async () => {
    if (!salaryRole) {
      toast({
        title: 'Missing Role',
        description: 'Please select a role for salary insights.',
        variant: 'destructive'
      });
      return;
    }

    setIsAnalyzing(true);
    setSalaryInsightsOpen(false);

    const salaryPrompt = `Provide detailed SALARY INSIGHTS for:

ROLE: ${salaryRole}
LOCATION: ${salaryLocation || 'India (Major Cities)'}
EXPERIENCE: ${experienceYears || '0-2'} years

Please provide:
1. **Salary Range** - Minimum, Average, Maximum (in INR LPA)
2. **Salary by Company Type** - Startups vs MNCs vs Indian IT Companies
3. **City-wise Comparison** - Bangalore, Mumbai, Delhi, Hyderabad, Chennai, Pune
4. **Factors Affecting Salary** - Skills, certifications, education that boost pay
5. **Career Progression** - Expected salary at 2, 5, 10 years
6. **Negotiation Tips** - How to negotiate for better compensation
7. **Benefits to Expect** - Typical perks beyond base salary
8. **Market Trends** - Is demand increasing or decreasing?
9. **Top Paying Companies** - Companies known for best compensation
10. **Salary Boosting Skills** - Learn these to increase earning potential

Be specific with numbers and provide actionable insights.`;

    const userMessage: Message = {
      role: 'user',
      content: salaryPrompt,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    await saveMessage(userMessage);
    await streamChat([...messages, userMessage]);
    setIsAnalyzing(false);
    
    setSalaryRole('');
    setSalaryLocation('');
    setExperienceYears('');
  };

  // 12th Student Feature: College Admission Guidance
  const getCollegeGuidance = async () => {
    if (!studentStream) {
      toast({
        title: 'Missing Stream',
        description: 'Please select your academic stream.',
        variant: 'destructive'
      });
      return;
    }

    setIsAnalyzing(true);
    setCollegeGuidanceOpen(false);

    const collegePrompt = `Provide comprehensive COLLEGE ADMISSION GUIDANCE for a 12th standard student:

STREAM: ${STUDENT_STREAMS.find(s => s.value === studentStream)?.label || studentStream}
MARKS: ${marksPercentage || 'Not specified'}%
PREFERRED STATE: ${preferredState || 'Any state in India'}

Please provide:
1. **Top Colleges** - Best colleges I can target with my marks (government & private)
2. **Entrance Exams** - Which exams I should prepare for based on my stream
3. **Admission Process** - Step-by-step admission timeline and important dates
4. **Counselling Tips** - How to maximize chances in counselling process
5. **Cutoff Trends** - Expected cutoffs based on last 3 years
6. **Backup Options** - Alternative colleges and courses if main goals aren't met
7. **Scholarship Opportunities** - Merit and need-based scholarships available
8. **Documents Needed** - Complete checklist for admission
9. **State vs Central** - Comparison of state quota vs all-India seats
10. **Action Plan** - What I should do RIGHT NOW

Focus on Tamil Nadu and India context. Be specific and practical.`;

    const userMessage: Message = {
      role: 'user',
      content: collegePrompt,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    await saveMessage(userMessage);
    await streamChat([...messages, userMessage]);
    setIsAnalyzing(false);
    
    setStudentStream('');
    setMarksPercentage('');
    setPreferredState('');
  };

  // 12th Student Feature: Stream Selection Help
  const getStreamHelp = async () => {
    if (interests.length === 0 && favoriteSubjects.length === 0) {
      toast({
        title: 'Missing Information',
        description: 'Please select at least one interest or favorite subject.',
        variant: 'destructive'
      });
      return;
    }

    setIsAnalyzing(true);
    setStreamHelpOpen(false);

    const streamPrompt = `Help me choose the RIGHT STREAM for 11th/12th based on:

CURRENT CLASS: ${currentClass || '10th Standard'}
MY INTERESTS: ${interests.join(', ') || 'Not specified'}
FAVORITE SUBJECTS: ${favoriteSubjects.join(', ') || 'Not specified'}

Please analyze and provide:
1. **Best Stream Recommendation** - Which stream suits me best (Science PCM/PCB/PCMB, Commerce, Arts)
2. **Why This Stream** - How it aligns with my interests and strengths
3. **Career Paths** - Top 10 careers possible with recommended stream
4. **Subject Breakdown** - What I'll study in 11th and 12th
5. **Entrance Exams** - Major exams I should prepare for
6. **Alternative Streams** - Other options if I change my mind
7. **Common Mistakes** - What students typically regret about stream selection
8. **Success Stories** - Examples of successful people from this stream
9. **Future-Proof Analysis** - Which fields will grow in next 10 years
10. **Immediate Next Steps** - What should I do now to prepare

Be encouraging but realistic. Consider Indian education system and job market.`;

    const userMessage: Message = {
      role: 'user',
      content: streamPrompt,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    await saveMessage(userMessage);
    await streamChat([...messages, userMessage]);
    setIsAnalyzing(false);
    
    setCurrentClass('');
    setInterests([]);
    setFavoriteSubjects([]);
  };

  // 12th Student Feature: Entrance Exam Prep
  const getExamPrepPlan = async () => {
    if (!selectedExam) {
      toast({
        title: 'Missing Exam',
        description: 'Please select an entrance exam.',
        variant: 'destructive'
      });
      return;
    }

    setIsAnalyzing(true);
    setExamPrepOpen(false);

    const examPrompt = `Create a comprehensive ENTRANCE EXAM PREPARATION PLAN for:

EXAM: ${ENTRANCE_EXAMS.find(e => e.value === selectedExam)?.label || selectedExam}
TIME AVAILABLE: ${prepMonths || '6'} months
CURRENT PREPARATION: ${currentPrep || 'Just starting'}

Please provide:
1. **Exam Overview** - Pattern, syllabus, marking scheme, duration
2. **Month-wise Study Plan** - Detailed schedule for ${prepMonths || '6'} months
3. **Subject-wise Strategy** - How to approach each subject/section
4. **Daily Routine** - Ideal timetable with study hours
5. **Best Books & Resources** - Top books, YouTube channels, apps
6. **Mock Test Strategy** - When and how to practice mock tests
7. **Previous Year Analysis** - Important topics based on past papers
8. **Revision Technique** - How to revise effectively
9. **Exam Day Tips** - Time management and stress handling
10. **Backup Exams** - Other similar exams I should apply for
11. **Coaching vs Self-Study** - What's better for this exam
12. **Expected Cutoffs** - Target score for top colleges

Provide practical, actionable advice with specific resources.`;

    const userMessage: Message = {
      role: 'user',
      content: examPrompt,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    await saveMessage(userMessage);
    await streamChat([...messages, userMessage]);
    setIsAnalyzing(false);
    
    setSelectedExam('');
    setPrepMonths('');
    setCurrentPrep('');
  };

  // 12th Student Feature: Career Explorer
  const exploreCareer = async () => {
    if (!selectedCategory && !explorerStream) {
      toast({
        title: 'Missing Selection',
        description: 'Please select a career category or stream.',
        variant: 'destructive'
      });
      return;
    }

    setIsAnalyzing(true);
    setCareerExplorerOpen(false);

    const explorerPrompt = `Explore CAREER OPTIONS for a 12th student:

CAREER CATEGORY: ${selectedCategory || 'Any'}
ACADEMIC STREAM: ${STUDENT_STREAMS.find(s => s.value === explorerStream)?.label || explorerStream || 'Any'}

Please provide comprehensive career exploration:
1. **Top 10 Careers** - Best careers in this category with description
2. **Required Education** - Degree/diploma needed for each career
3. **Top Colleges** - Best institutions in India for these careers
4. **Entrance Exams** - Which exams to give for each career
5. **Salary Range** - Starting and experienced salary (in LPA)
6. **Growth Prospects** - Job demand and future outlook
7. **Day in the Life** - What professionals actually do daily
8. **Skills Needed** - Technical and soft skills required
9. **Industry Leaders** - Famous people in these careers (Indian examples)
10. **Alternative Paths** - Unconventional routes to same career
11. **Emerging Roles** - New careers in this field
12. **First Steps** - What to do RIGHT NOW as a 12th student

Focus on realistic Indian context with specific examples and numbers.`;

    const userMessage: Message = {
      role: 'user',
      content: explorerPrompt,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    await saveMessage(userMessage);
    await streamChat([...messages, userMessage]);
    setIsAnalyzing(false);
    
    setSelectedCategory('');
    setExplorerStream('');
  };

  // NEW: Subject Doubt Solver
  const solveDoubt = async () => {
    if (!doubtSubject || !doubtQuestion.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please select a subject and enter your doubt.',
        variant: 'destructive'
      });
      return;
    }

    setIsAnalyzing(true);
    setDoubtSolverOpen(false);

    const doubtPrompt = `Act as an expert ${doubtSubject} teacher for a 12th standard student in India.

SUBJECT: ${doubtSubject}
TOPIC: ${doubtTopic || 'General'}
STUDENT'S DOUBT: ${doubtQuestion}

Please explain this concept clearly:
1. **Simple Explanation** - Explain like I'm a beginner
2. **Step-by-Step Solution** - If it's a problem, solve it step by step
3. **Key Formulas/Concepts** - Important formulas or rules related to this
4. **Common Mistakes** - What students usually get wrong
5. **Memory Tips** - Tricks to remember this concept
6. **Related Questions** - 2-3 similar questions for practice
7. **Exam Tips** - How this is asked in board/entrance exams

Make it easy to understand with examples from daily life where possible.`;

    const userMessage: Message = {
      role: 'user',
      content: doubtPrompt,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    await saveMessage(userMessage);
    await streamChat([...messages, userMessage]);
    setIsAnalyzing(false);
    
    setDoubtSubject('');
    setDoubtTopic('');
    setDoubtQuestion('');
  };

  // NEW: Study Planner
  const createStudyPlan = async () => {
    if (!studyGoal || !studyHoursPerDay) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in your study goal and hours.',
        variant: 'destructive'
      });
      return;
    }

    setIsAnalyzing(true);
    setStudyPlannerOpen(false);

    const studyPrompt = `Create a DETAILED DAILY STUDY PLAN for a 12th standard student:

STUDY GOAL: ${studyGoal}
HOURS AVAILABLE PER DAY: ${studyHoursPerDay} hours
WEAK SUBJECTS: ${weakSubjects.length > 0 ? weakSubjects.join(', ') : 'None specified'}

Please provide:
1. **Daily Timetable** - Hour-by-hour breakdown with breaks
2. **Subject Rotation** - How to balance all subjects in a week
3. **Weak Subject Strategy** - Extra focus plan for weak areas
4. **Revision Schedule** - When and how to revise
5. **Practice Test Plan** - Mock test schedule
6. **Break Activities** - Healthy break suggestions
7. **Weekend Plan** - How to use weekends effectively
8. **One Month Calendar** - Week-by-week goals
9. **Motivation Tips** - How to stay consistent
10. **Exam Week Strategy** - Special plan before exams

Format as an actionable, easy-to-follow schedule with Tamil encouragements!`;

    const userMessage: Message = {
      role: 'user',
      content: studyPrompt,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    await saveMessage(userMessage);
    await streamChat([...messages, userMessage]);
    setIsAnalyzing(false);
    
    setStudyHoursPerDay('');
    setWeakSubjects([]);
    setStudyGoal('');
  };

  // NEW: Scholarship Finder
  const findScholarships = async () => {
    setIsAnalyzing(true);
    setScholarshipFinderOpen(false);

    const scholarshipPrompt = `Find SCHOLARSHIPS for a 12th standard student in India:

FAMILY INCOME: ${familyIncome || 'Not specified'}
CATEGORY: ${scholarshipCategory || 'General'}
ACADEMIC STREAM: ${STUDENT_STREAMS.find(s => s.value === scholarshipStream)?.label || scholarshipStream || 'Any'}

Please provide comprehensive scholarship information:
1. **Government Scholarships** - Central and State government schemes
2. **Merit-Based Scholarships** - For academic excellence
3. **Need-Based Scholarships** - For economically weaker students
4. **Category-Specific** - SC/ST/OBC/Minority scholarships
5. **Private Scholarships** - From companies and NGOs
6. **College-Specific** - Scholarships offered by top colleges
7. **Exam-Based** - Scholarships through competitive exams
8. **Application Process** - Step-by-step guide for each
9. **Important Deadlines** - When to apply
10. **Required Documents** - What papers to prepare
11. **Scholarship Amount** - How much you can get
12. **Tips to Increase Chances** - How to write good applications

Focus on scholarships available in Tamil Nadu and India for 2024-25.`;

    const userMessage: Message = {
      role: 'user',
      content: scholarshipPrompt,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    await saveMessage(userMessage);
    await streamChat([...messages, userMessage]);
    setIsAnalyzing(false);
    
    setFamilyIncome('');
    setScholarshipCategory('');
    setScholarshipStream('');
  };

  // NEW: Parent Talk Helper
  const getParentTalkHelp = async () => {
    if (!desiredCareer) {
      toast({
        title: 'Missing Information',
        description: 'Please enter your desired career.',
        variant: 'destructive'
      });
      return;
    }

    setIsAnalyzing(true);
    setParentTalkOpen(false);

    const parentPrompt = `Help a 12th student convince their parents about their career choice:

DESIRED CAREER: ${desiredCareer}
PARENT'S CONCERN: ${parentConcern || 'General doubts about the career'}
CURRENT SITUATION: ${currentSituation || 'Parents want me to choose a different career'}

Please provide a comprehensive guide:
1. **Understanding Parents** - Why parents might have concerns
2. **Research Points** - Facts and data about this career to share
3. **Success Stories** - Famous Indians who succeeded in this field
4. **Salary Information** - Realistic earning potential
5. **Job Security** - Employment stability and demand
6. **How to Start the Conversation** - Tips for approaching parents
7. **Addressing Specific Concerns** - Responses to common parent worries
8. **Compromise Options** - Middle-ground solutions
9. **Backup Plan** - How to show you have alternatives
10. **Timeline** - When to have this discussion
11. **Sample Dialogue** - What to say in Tamil and English
12. **If They Still Say No** - What to do next

Be empathetic and respect Indian family values while helping the student communicate effectively.`;

    const userMessage: Message = {
      role: 'user',
      content: parentPrompt,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    await saveMessage(userMessage);
    await streamChat([...messages, userMessage]);
    setIsAnalyzing(false);
    
    setDesiredCareer('');
    setParentConcern('');
    setCurrentSituation('');
  };

  // Toggle functions for multi-select
  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const toggleSubject = (subject: string) => {
    setFavoriteSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const toggleWeakSubject = (subject: string) => {
    setWeakSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const quickActions = [
    { icon: <GraduationCap className="h-4 w-4" />, label: 'Suggest courses', prompt: 'Suggest some good courses for me based on science stream' },
    { icon: <Building2 className="h-4 w-4" />, label: 'Find colleges', prompt: 'List the best engineering colleges in Tamil Nadu' },
    { icon: <Compass className="h-4 w-4" />, label: 'Career guidance', prompt: 'What are the best career options after 12th science?' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50/50 to-amber-50/30 page-transition">
      {/* Enhanced Header */}
      <header className="bg-gradient-to-r from-emerald-700 via-green-700 to-emerald-800 sticky top-0 z-20 shadow-xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
        <div className="container mx-auto px-4 py-5 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/career-assessment/colleges')}
                className="text-white/90 hover:text-white hover:bg-white/15 rounded-xl transition-all duration-300"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30 animate-pulse">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-serif font-bold text-white tracking-tight">AI Career Counselor</h1>
                  <p className="text-sm text-emerald-100 font-tamil">AI தொழில் ஆலோசகர்</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {/* Stop Speaking Button - only shown when speaking */}
              {isSpeaking && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={stopSpeaking}
                  className="rounded-xl bg-red-500/30 text-red-200 hover:bg-red-500/40 animate-pulse transition-all duration-300"
                  title="Stop speaking"
                >
                  <StopCircle className="h-5 w-5" />
                </Button>
              )}
              
              {/* Tamil Language Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsTamilVoice(!isTamilVoice)}
                className={`rounded-xl transition-all duration-300 gap-1.5 px-3 ${
                  isTamilVoice 
                    ? 'bg-orange-500/30 text-orange-200 hover:bg-orange-500/40' 
                    : 'text-white/80 hover:text-white hover:bg-white/15'
                }`}
                title={isTamilVoice ? 'Switch to English voice' : 'Switch to Tamil voice'}
              >
                <Languages className="h-4 w-4" />
                <span className="text-xs font-medium">{isTamilVoice ? 'தமிழ்' : 'EN'}</span>
              </Button>
              
              {/* Voice Enable/Disable */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsTtsEnabled(!isTtsEnabled)}
                className={`rounded-xl transition-all duration-300 ${
                  isTtsEnabled 
                    ? 'bg-amber-500/30 text-amber-200 hover:bg-amber-500/40' 
                    : 'text-white/80 hover:text-white hover:bg-white/15'
                }`}
                title={isTtsEnabled ? 'Disable voice output' : 'Enable voice output'}
              >
                {isTtsEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              </Button>
              
              {/* Clear Chat */}
              <Button
                variant="ghost"
                size="icon"
                onClick={clearChat}
                className="text-white/80 hover:text-white hover:bg-white/15 rounded-xl transition-all duration-300"
                title="Clear chat"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Enhanced Quick Actions with Skill Gap Analyzer */}
        <div className="flex flex-wrap gap-3 mb-6">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction(action.prompt)}
              className="bg-white/80 backdrop-blur-sm border-2 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 text-emerald-700 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300 gap-2 font-medium"
            >
              <span className="p-1 rounded-full bg-emerald-100">{action.icon}</span>
              {action.label}
            </Button>
          ))}
          
          {/* Skill Gap Analyzer Button */}
          <Sheet open={skillGapOpen} onOpenChange={setSkillGapOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-purple-50 to-violet-50 backdrop-blur-sm border-2 border-purple-300 hover:border-purple-500 hover:from-purple-100 hover:to-violet-100 text-purple-700 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300 gap-2 font-medium"
              >
                <span className="p-1 rounded-full bg-purple-100">
                  <Target className="h-4 w-4" />
                </span>
                Skill Gap Analyzer
                <Sparkles className="h-3 w-3 text-purple-500" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50">
              <SheetHeader className="text-left pb-4 border-b border-purple-100">
                <SheetTitle className="text-2xl font-bold text-purple-900 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  Skill Gap Analyzer
                </SheetTitle>
                <SheetDescription className="text-purple-700">
                  Identify missing skills for your dream career and get a personalized learning roadmap
                </SheetDescription>
              </SheetHeader>
              
              <ScrollArea className="h-[calc(85vh-180px)] mt-6">
                <div className="space-y-6 pr-4">
                  {/* Target Career Selection */}
                  <div className="space-y-3">
                    <Label className="text-purple-900 font-semibold flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Target Career
                    </Label>
                    <Select value={targetCareer} onValueChange={setTargetCareer}>
                      <SelectTrigger className="h-12 bg-white border-2 border-purple-200 focus:border-purple-500 rounded-xl">
                        <SelectValue placeholder="Select your dream career..." />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {CAREER_OPTIONS.map((career) => (
                          <SelectItem key={career} value={career}>
                            {career}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Current Skills Selection */}
                  <div className="space-y-3">
                    <Label className="text-purple-900 font-semibold flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Your Current Skills
                      <Badge variant="secondary" className="ml-2 bg-purple-100 text-purple-700">
                        {currentSkills.length} selected
                      </Badge>
                    </Label>
                    <p className="text-sm text-purple-600">
                      Click to select skills you already have:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {COMMON_SKILLS.map((skill) => (
                        <Badge
                          key={skill}
                          variant={currentSkills.includes(skill) ? "default" : "outline"}
                          className={`cursor-pointer transition-all duration-200 px-3 py-1.5 text-sm ${
                            currentSkills.includes(skill)
                              ? 'bg-gradient-to-r from-purple-500 to-violet-600 text-white border-transparent shadow-md'
                              : 'bg-white border-2 border-purple-200 text-purple-700 hover:border-purple-400 hover:bg-purple-50'
                          }`}
                          onClick={() => toggleSkill(skill)}
                        >
                          {currentSkills.includes(skill) && (
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                          )}
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Selected Skills Summary */}
                  {currentSkills.length > 0 && (
                    <div className="bg-white/80 rounded-xl p-4 border border-purple-100">
                      <p className="text-sm font-medium text-purple-900 mb-2">Selected Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {currentSkills.map((skill) => (
                          <Badge
                            key={skill}
                            className="bg-purple-100 text-purple-700 pr-1"
                          >
                            {skill}
                            <button
                              onClick={() => toggleSkill(skill)}
                              className="ml-1 p-0.5 rounded-full hover:bg-purple-200 transition-colors"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Analysis Preview */}
                  {targetCareer && currentSkills.length > 0 && (
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-emerald-100">
                          <Sparkles className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-medium text-emerald-900">Ready to Analyze!</p>
                          <p className="text-sm text-emerald-700 mt-1">
                            AI will analyze your {currentSkills.length} skills against {targetCareer} requirements
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              {/* Analyze Button */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-purple-50 via-purple-50 to-transparent">
                <Button
                  onClick={analyzeSkillGap}
                  disabled={!targetCareer || currentSkills.length === 0 || isAnalyzing}
                  className="w-full h-14 bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 text-white font-semibold text-lg rounded-xl shadow-lg shadow-purple-200 disabled:opacity-50 transition-all duration-300"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Analyzing Skills...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Analyze My Skill Gap
                    </>
                  )}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          
          {/* Resume Review Button */}
          <Sheet open={resumeReviewOpen} onOpenChange={setResumeReviewOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-blue-50 to-cyan-50 backdrop-blur-sm border-2 border-blue-300 hover:border-blue-500 hover:from-blue-100 hover:to-cyan-100 text-blue-700 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300 gap-2 font-medium"
              >
                <span className="p-1 rounded-full bg-blue-100">
                  <FileText className="h-4 w-4" />
                </span>
                Resume Review
                <Star className="h-3 w-3 text-blue-500" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50">
              <SheetHeader className="text-left pb-4 border-b border-blue-100">
                <SheetTitle className="text-2xl font-bold text-blue-900 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  Resume Review
                </SheetTitle>
                <SheetDescription className="text-blue-700">
                  Get AI-powered feedback on your resume with ATS optimization tips
                </SheetDescription>
              </SheetHeader>
              
              <ScrollArea className="h-[calc(85vh-180px)] mt-6">
                <div className="space-y-6 pr-4">
                  <div className="space-y-3">
                    <Label className="text-blue-900 font-semibold flex items-center gap-2">
                      <BriefcaseBusiness className="h-4 w-4" />
                      Target Role (Optional)
                    </Label>
                    <Select value={targetRole} onValueChange={setTargetRole}>
                      <SelectTrigger className="h-12 bg-white border-2 border-blue-200 focus:border-blue-500 rounded-xl">
                        <SelectValue placeholder="Select target role for tailored feedback..." />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {CAREER_OPTIONS.map((career) => (
                          <SelectItem key={career} value={career}>
                            {career}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-blue-900 font-semibold flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Paste Your Resume
                    </Label>
                    <Textarea
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      placeholder="Paste your resume content here... Include your summary, experience, education, skills, and projects."
                      className="min-h-[250px] bg-white border-2 border-blue-200 focus:border-blue-500 rounded-xl resize-none"
                    />
                    <p className="text-sm text-blue-600">
                      {resumeText.length} characters • Tip: Include all sections for comprehensive feedback
                    </p>
                  </div>
                </div>
              </ScrollArea>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-blue-50 via-blue-50 to-transparent">
                <Button
                  onClick={analyzeResume}
                  disabled={!resumeText.trim() || isAnalyzing}
                  className="w-full h-14 bg-gradient-to-r from-blue-600 to-cyan-700 hover:from-blue-700 hover:to-cyan-800 text-white font-semibold text-lg rounded-xl shadow-lg shadow-blue-200 disabled:opacity-50 transition-all duration-300"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Analyzing Resume...
                    </>
                  ) : (
                    <>
                      <Star className="h-5 w-5 mr-2" />
                      Review My Resume
                    </>
                  )}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          
          {/* Mock Interview Button */}
          <Sheet open={mockInterviewOpen} onOpenChange={setMockInterviewOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-orange-50 to-amber-50 backdrop-blur-sm border-2 border-orange-300 hover:border-orange-500 hover:from-orange-100 hover:to-amber-100 text-orange-700 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300 gap-2 font-medium"
              >
                <span className="p-1 rounded-full bg-orange-100">
                  <MessageSquare className="h-4 w-4" />
                </span>
                Mock Interview
                <Zap className="h-3 w-3 text-orange-500" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
              <SheetHeader className="text-left pb-4 border-b border-orange-100">
                <SheetTitle className="text-2xl font-bold text-orange-900 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  Mock Interview
                </SheetTitle>
                <SheetDescription className="text-orange-700">
                  Practice interview questions with AI feedback and scoring
                </SheetDescription>
              </SheetHeader>
              
              <ScrollArea className="h-[calc(85vh-180px)] mt-6">
                <div className="space-y-6 pr-4">
                  <div className="space-y-3">
                    <Label className="text-orange-900 font-semibold flex items-center gap-2">
                      <BriefcaseBusiness className="h-4 w-4" />
                      Interview Role
                    </Label>
                    <Select value={interviewRole} onValueChange={setInterviewRole}>
                      <SelectTrigger className="h-12 bg-white border-2 border-orange-200 focus:border-orange-500 rounded-xl">
                        <SelectValue placeholder="Select role you're interviewing for..." />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {CAREER_OPTIONS.map((career) => (
                          <SelectItem key={career} value={career}>
                            {career}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-orange-900 font-semibold flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Experience Level
                    </Label>
                    <Select value={interviewLevel} onValueChange={setInterviewLevel}>
                      <SelectTrigger className="h-12 bg-white border-2 border-orange-200 focus:border-orange-500 rounded-xl">
                        <SelectValue placeholder="Select your experience level..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fresher">Fresher (0 years)</SelectItem>
                        <SelectItem value="Entry Level">Entry Level (0-2 years)</SelectItem>
                        <SelectItem value="Mid Level">Mid Level (3-5 years)</SelectItem>
                        <SelectItem value="Senior Level">Senior Level (5+ years)</SelectItem>
                        <SelectItem value="Lead/Manager">Lead/Manager (8+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-orange-900 font-semibold flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Interview Type
                    </Label>
                    <Select value={interviewType} onValueChange={setInterviewType}>
                      <SelectTrigger className="h-12 bg-white border-2 border-orange-200 focus:border-orange-500 rounded-xl">
                        <SelectValue placeholder="Select interview type..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Technical + Behavioral">Technical + Behavioral (Recommended)</SelectItem>
                        <SelectItem value="Technical Only">Technical Only</SelectItem>
                        <SelectItem value="Behavioral Only">Behavioral Only</SelectItem>
                        <SelectItem value="HR Round">HR Round</SelectItem>
                        <SelectItem value="System Design">System Design</SelectItem>
                        <SelectItem value="Coding Round">Coding Round</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {interviewRole && (
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-emerald-100">
                          <Sparkles className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-medium text-emerald-900">Ready to Practice!</p>
                          <p className="text-sm text-emerald-700 mt-1">
                            AI will ask you {interviewLevel || 'Entry Level'} {interviewRole} interview questions
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-orange-50 via-orange-50 to-transparent">
                <Button
                  onClick={startMockInterview}
                  disabled={!interviewRole || isAnalyzing}
                  className="w-full h-14 bg-gradient-to-r from-orange-600 to-amber-700 hover:from-orange-700 hover:to-amber-800 text-white font-semibold text-lg rounded-xl shadow-lg shadow-orange-200 disabled:opacity-50 transition-all duration-300"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Starting Interview...
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5 mr-2" />
                      Start Mock Interview
                    </>
                  )}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          
          {/* Salary Insights Button */}
          <Sheet open={salaryInsightsOpen} onOpenChange={setSalaryInsightsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-green-50 to-emerald-50 backdrop-blur-sm border-2 border-green-300 hover:border-green-500 hover:from-green-100 hover:to-emerald-100 text-green-700 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300 gap-2 font-medium"
              >
                <span className="p-1 rounded-full bg-green-100">
                  <DollarSign className="h-4 w-4" />
                </span>
                Salary Insights
                <TrendingUp className="h-3 w-3 text-green-500" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
              <SheetHeader className="text-left pb-4 border-b border-green-100">
                <SheetTitle className="text-2xl font-bold text-green-900 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  Salary Insights
                </SheetTitle>
                <SheetDescription className="text-green-700">
                  Get detailed salary data, trends, and negotiation tips for your target role
                </SheetDescription>
              </SheetHeader>
              
              <ScrollArea className="h-[calc(85vh-180px)] mt-6">
                <div className="space-y-6 pr-4">
                  <div className="space-y-3">
                    <Label className="text-green-900 font-semibold flex items-center gap-2">
                      <BriefcaseBusiness className="h-4 w-4" />
                      Job Role
                    </Label>
                    <Select value={salaryRole} onValueChange={setSalaryRole}>
                      <SelectTrigger className="h-12 bg-white border-2 border-green-200 focus:border-green-500 rounded-xl">
                        <SelectValue placeholder="Select role for salary insights..." />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {CAREER_OPTIONS.map((career) => (
                          <SelectItem key={career} value={career}>
                            {career}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-green-900 font-semibold flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Location
                    </Label>
                    <Select value={salaryLocation} onValueChange={setSalaryLocation}>
                      <SelectTrigger className="h-12 bg-white border-2 border-green-200 focus:border-green-500 rounded-xl">
                        <SelectValue placeholder="Select location..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="India (Major Cities)">India (Major Cities)</SelectItem>
                        <SelectItem value="Bangalore">Bangalore</SelectItem>
                        <SelectItem value="Mumbai">Mumbai</SelectItem>
                        <SelectItem value="Delhi NCR">Delhi NCR</SelectItem>
                        <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                        <SelectItem value="Chennai">Chennai</SelectItem>
                        <SelectItem value="Pune">Pune</SelectItem>
                        <SelectItem value="Kolkata">Kolkata</SelectItem>
                        <SelectItem value="Tier 2 Cities">Tier 2 Cities</SelectItem>
                        <SelectItem value="Remote/WFH">Remote/WFH</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-green-900 font-semibold flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Years of Experience
                    </Label>
                    <Select value={experienceYears} onValueChange={setExperienceYears}>
                      <SelectTrigger className="h-12 bg-white border-2 border-green-200 focus:border-green-500 rounded-xl">
                        <SelectValue placeholder="Select experience..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-2">0-2 years (Fresher/Entry)</SelectItem>
                        <SelectItem value="2-4">2-4 years (Junior)</SelectItem>
                        <SelectItem value="4-6">4-6 years (Mid-level)</SelectItem>
                        <SelectItem value="6-10">6-10 years (Senior)</SelectItem>
                        <SelectItem value="10+">10+ years (Lead/Principal)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {salaryRole && (
                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 border border-amber-200">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-amber-100">
                          <DollarSign className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium text-amber-900">Ready for Insights!</p>
                          <p className="text-sm text-amber-700 mt-1">
                            Get salary data for {salaryRole} in {salaryLocation || 'India'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-green-50 via-green-50 to-transparent">
                <Button
                  onClick={getSalaryInsights}
                  disabled={!salaryRole || isAnalyzing}
                  className="w-full h-14 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-semibold text-lg rounded-xl shadow-lg shadow-green-200 disabled:opacity-50 transition-all duration-300"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Getting Insights...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Get Salary Insights
                    </>
                  )}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          
          {/* 12th Student Section Header */}
          <div className="w-full flex items-center gap-2 mt-4 mb-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
            <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">🎓 For 12th Students</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
          </div>
          
          {/* College Admission Guidance */}
          <Sheet open={collegeGuidanceOpen} onOpenChange={setCollegeGuidanceOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-rose-50 to-pink-50 backdrop-blur-sm border-2 border-rose-300 hover:border-rose-500 hover:from-rose-100 hover:to-pink-100 text-rose-700 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300 gap-2 font-medium"
              >
                <span className="p-1 rounded-full bg-rose-100">
                  <School className="h-4 w-4" />
                </span>
                College Guidance
                <Award className="h-3 w-3 text-rose-500" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl bg-gradient-to-br from-rose-50 via-pink-50 to-red-50">
              <SheetHeader className="text-left pb-4 border-b border-rose-100">
                <SheetTitle className="text-2xl font-bold text-rose-900 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg">
                    <School className="h-6 w-6 text-white" />
                  </div>
                  College Admission Guidance
                </SheetTitle>
                <SheetDescription className="text-rose-700">
                  Get personalized college recommendations, cutoffs, and admission tips
                </SheetDescription>
              </SheetHeader>
              
              <ScrollArea className="h-[calc(85vh-180px)] mt-6">
                <div className="space-y-6 pr-4">
                  <div className="space-y-3">
                    <Label className="text-rose-900 font-semibold flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Your Academic Stream
                    </Label>
                    <Select value={studentStream} onValueChange={setStudentStream}>
                      <SelectTrigger className="h-12 bg-white border-2 border-rose-200 focus:border-rose-500 rounded-xl">
                        <SelectValue placeholder="Select your stream..." />
                      </SelectTrigger>
                      <SelectContent>
                        {STUDENT_STREAMS.map((stream) => (
                          <SelectItem key={stream.value} value={stream.value}>
                            {stream.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-rose-900 font-semibold flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Expected/Actual Marks (%)
                    </Label>
                    <Select value={marksPercentage} onValueChange={setMarksPercentage}>
                      <SelectTrigger className="h-12 bg-white border-2 border-rose-200 focus:border-rose-500 rounded-xl">
                        <SelectValue placeholder="Select marks range..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="95+">95% and above (Excellent)</SelectItem>
                        <SelectItem value="90-95">90-95% (Very Good)</SelectItem>
                        <SelectItem value="85-90">85-90% (Good)</SelectItem>
                        <SelectItem value="80-85">80-85% (Above Average)</SelectItem>
                        <SelectItem value="75-80">75-80% (Average)</SelectItem>
                        <SelectItem value="70-75">70-75% (Below Average)</SelectItem>
                        <SelectItem value="below-70">Below 70%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-rose-900 font-semibold flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Preferred State/Location
                    </Label>
                    <Select value={preferredState} onValueChange={setPreferredState}>
                      <SelectTrigger className="h-12 bg-white border-2 border-rose-200 focus:border-rose-500 rounded-xl">
                        <SelectValue placeholder="Select preferred location..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                        <SelectItem value="Karnataka">Karnataka</SelectItem>
                        <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="Delhi NCR">Delhi NCR</SelectItem>
                        <SelectItem value="Andhra/Telangana">Andhra Pradesh / Telangana</SelectItem>
                        <SelectItem value="Kerala">Kerala</SelectItem>
                        <SelectItem value="Any">Any State (All India)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {studentStream && (
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-emerald-100">
                          <Sparkles className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-medium text-emerald-900">Ready for Guidance!</p>
                          <p className="text-sm text-emerald-700 mt-1">
                            AI will suggest best colleges for {STUDENT_STREAMS.find(s => s.value === studentStream)?.label}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-rose-50 via-rose-50 to-transparent">
                <Button
                  onClick={getCollegeGuidance}
                  disabled={!studentStream || isAnalyzing}
                  className="w-full h-14 bg-gradient-to-r from-rose-600 to-pink-700 hover:from-rose-700 hover:to-pink-800 text-white font-semibold text-lg rounded-xl shadow-lg shadow-rose-200 disabled:opacity-50 transition-all duration-300"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Finding Colleges...
                    </>
                  ) : (
                    <>
                      <School className="h-5 w-5 mr-2" />
                      Get College Recommendations
                    </>
                  )}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          
          {/* Stream Selection Help */}
          <Sheet open={streamHelpOpen} onOpenChange={setStreamHelpOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-indigo-50 to-violet-50 backdrop-blur-sm border-2 border-indigo-300 hover:border-indigo-500 hover:from-indigo-100 hover:to-violet-100 text-indigo-700 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300 gap-2 font-medium"
              >
                <span className="p-1 rounded-full bg-indigo-100">
                  <Route className="h-4 w-4" />
                </span>
                Stream Selection
                <Lightbulb className="h-3 w-3 text-indigo-500" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50">
              <SheetHeader className="text-left pb-4 border-b border-indigo-100">
                <SheetTitle className="text-2xl font-bold text-indigo-900 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg">
                    <Route className="h-6 w-6 text-white" />
                  </div>
                  Stream Selection Help
                </SheetTitle>
                <SheetDescription className="text-indigo-700">
                  Confused about which stream to choose? Let AI help you decide!
                </SheetDescription>
              </SheetHeader>
              
              <ScrollArea className="h-[calc(85vh-180px)] mt-6">
                <div className="space-y-6 pr-4">
                  <div className="space-y-3">
                    <Label className="text-indigo-900 font-semibold flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Current Class
                    </Label>
                    <Select value={currentClass} onValueChange={setCurrentClass}>
                      <SelectTrigger className="h-12 bg-white border-2 border-indigo-200 focus:border-indigo-500 rounded-xl">
                        <SelectValue placeholder="Select your current class..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9th">9th Standard</SelectItem>
                        <SelectItem value="10th">10th Standard</SelectItem>
                        <SelectItem value="10th-completed">10th Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-indigo-900 font-semibold flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Your Interests
                      <Badge variant="secondary" className="ml-2 bg-indigo-100 text-indigo-700">
                        {interests.length} selected
                      </Badge>
                    </Label>
                    <p className="text-sm text-indigo-600">Click to select what interests you:</p>
                    <div className="flex flex-wrap gap-2">
                      {['Technology', 'Medicine', 'Business', 'Arts', 'Law', 'Science', 'Finance', 'Teaching', 'Research', 'Government Jobs', 'Sports', 'Music/Dance', 'Writing', 'Social Work'].map((interest) => (
                        <Badge
                          key={interest}
                          variant={interests.includes(interest) ? "default" : "outline"}
                          className={`cursor-pointer transition-all duration-200 px-3 py-1.5 text-sm ${
                            interests.includes(interest)
                              ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-transparent shadow-md'
                              : 'bg-white border-2 border-indigo-200 text-indigo-700 hover:border-indigo-400 hover:bg-indigo-50'
                          }`}
                          onClick={() => toggleInterest(interest)}
                        >
                          {interests.includes(interest) && <CheckCircle2 className="h-3 w-3 mr-1" />}
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-indigo-900 font-semibold flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Favorite Subjects
                      <Badge variant="secondary" className="ml-2 bg-indigo-100 text-indigo-700">
                        {favoriteSubjects.length} selected
                      </Badge>
                    </Label>
                    <p className="text-sm text-indigo-600">Select subjects you enjoy:</p>
                    <div className="flex flex-wrap gap-2">
                      {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Geography', 'Economics', 'Accountancy', 'Computer Science', 'Tamil', 'Hindi', 'Social Science'].map((subject) => (
                        <Badge
                          key={subject}
                          variant={favoriteSubjects.includes(subject) ? "default" : "outline"}
                          className={`cursor-pointer transition-all duration-200 px-3 py-1.5 text-sm ${
                            favoriteSubjects.includes(subject)
                              ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-transparent shadow-md'
                              : 'bg-white border-2 border-indigo-200 text-indigo-700 hover:border-indigo-400 hover:bg-indigo-50'
                          }`}
                          onClick={() => toggleSubject(subject)}
                        >
                          {favoriteSubjects.includes(subject) && <CheckCircle2 className="h-3 w-3 mr-1" />}
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {(interests.length > 0 || favoriteSubjects.length > 0) && (
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-emerald-100">
                          <Lightbulb className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-medium text-emerald-900">Ready to Analyze!</p>
                          <p className="text-sm text-emerald-700 mt-1">
                            AI will recommend the best stream based on your {interests.length} interests and {favoriteSubjects.length} favorite subjects
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-indigo-50 via-indigo-50 to-transparent">
                <Button
                  onClick={getStreamHelp}
                  disabled={(interests.length === 0 && favoriteSubjects.length === 0) || isAnalyzing}
                  className="w-full h-14 bg-gradient-to-r from-indigo-600 to-violet-700 hover:from-indigo-700 hover:to-violet-800 text-white font-semibold text-lg rounded-xl shadow-lg shadow-indigo-200 disabled:opacity-50 transition-all duration-300"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Route className="h-5 w-5 mr-2" />
                      Find My Best Stream
                    </>
                  )}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          
          {/* Entrance Exam Prep */}
          <Sheet open={examPrepOpen} onOpenChange={setExamPrepOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-teal-50 to-cyan-50 backdrop-blur-sm border-2 border-teal-300 hover:border-teal-500 hover:from-teal-100 hover:to-cyan-100 text-teal-700 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300 gap-2 font-medium"
              >
                <span className="p-1 rounded-full bg-teal-100">
                  <FlaskConical className="h-4 w-4" />
                </span>
                Exam Prep Plan
                <Target className="h-3 w-3 text-teal-500" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50">
              <SheetHeader className="text-left pb-4 border-b border-teal-100">
                <SheetTitle className="text-2xl font-bold text-teal-900 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 shadow-lg">
                    <FlaskConical className="h-6 w-6 text-white" />
                  </div>
                  Entrance Exam Prep Plan
                </SheetTitle>
                <SheetDescription className="text-teal-700">
                  Get a personalized study plan for your entrance exam
                </SheetDescription>
              </SheetHeader>
              
              <ScrollArea className="h-[calc(85vh-180px)] mt-6">
                <div className="space-y-6 pr-4">
                  <div className="space-y-3">
                    <Label className="text-teal-900 font-semibold flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Target Entrance Exam
                    </Label>
                    <Select value={selectedExam} onValueChange={setSelectedExam}>
                      <SelectTrigger className="h-12 bg-white border-2 border-teal-200 focus:border-teal-500 rounded-xl">
                        <SelectValue placeholder="Select your target exam..." />
                      </SelectTrigger>
                      <SelectContent>
                        {ENTRANCE_EXAMS.map((exam) => (
                          <SelectItem key={exam.value} value={exam.value}>
                            {exam.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-teal-900 font-semibold flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Time Available for Preparation
                    </Label>
                    <Select value={prepMonths} onValueChange={setPrepMonths}>
                      <SelectTrigger className="h-12 bg-white border-2 border-teal-200 focus:border-teal-500 rounded-xl">
                        <SelectValue placeholder="Select preparation time..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2">1-2 months (Crash Course)</SelectItem>
                        <SelectItem value="3-4">3-4 months (Short Term)</SelectItem>
                        <SelectItem value="6">6 months (Recommended)</SelectItem>
                        <SelectItem value="12">12 months (Long Term)</SelectItem>
                        <SelectItem value="18+">18+ months (Comprehensive)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-teal-900 font-semibold flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Current Preparation Level
                    </Label>
                    <Select value={currentPrep} onValueChange={setCurrentPrep}>
                      <SelectTrigger className="h-12 bg-white border-2 border-teal-200 focus:border-teal-500 rounded-xl">
                        <SelectValue placeholder="Select your current level..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Just starting">Just Starting (Beginner)</SelectItem>
                        <SelectItem value="Basics done">Basics Completed</SelectItem>
                        <SelectItem value="Intermediate">Intermediate Level</SelectItem>
                        <SelectItem value="Revision stage">Revision Stage</SelectItem>
                        <SelectItem value="Drop year">Drop Year Student</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedExam && (
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-emerald-100">
                          <Target className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-medium text-emerald-900">Ready to Plan!</p>
                          <p className="text-sm text-emerald-700 mt-1">
                            AI will create a {prepMonths || '6'}-month plan for {ENTRANCE_EXAMS.find(e => e.value === selectedExam)?.label}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-teal-50 via-teal-50 to-transparent">
                <Button
                  onClick={getExamPrepPlan}
                  disabled={!selectedExam || isAnalyzing}
                  className="w-full h-14 bg-gradient-to-r from-teal-600 to-cyan-700 hover:from-teal-700 hover:to-cyan-800 text-white font-semibold text-lg rounded-xl shadow-lg shadow-teal-200 disabled:opacity-50 transition-all duration-300"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Creating Plan...
                    </>
                  ) : (
                    <>
                      <FlaskConical className="h-5 w-5 mr-2" />
                      Generate My Study Plan
                    </>
                  )}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          
          {/* Career Explorer */}
          <Sheet open={careerExplorerOpen} onOpenChange={setCareerExplorerOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-amber-50 to-yellow-50 backdrop-blur-sm border-2 border-amber-300 hover:border-amber-500 hover:from-amber-100 hover:to-yellow-100 text-amber-700 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300 gap-2 font-medium"
              >
                <span className="p-1 rounded-full bg-amber-100">
                  <Compass className="h-4 w-4" />
                </span>
                Career Explorer
                <Sparkles className="h-3 w-3 text-amber-500" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
              <SheetHeader className="text-left pb-4 border-b border-amber-100">
                <SheetTitle className="text-2xl font-bold text-amber-900 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
                    <Compass className="h-6 w-6 text-white" />
                  </div>
                  Career Explorer
                </SheetTitle>
                <SheetDescription className="text-amber-700">
                  Explore careers available after 12th in different fields
                </SheetDescription>
              </SheetHeader>
              
              <ScrollArea className="h-[calc(85vh-180px)] mt-6">
                <div className="space-y-6 pr-4">
                  <div className="space-y-3">
                    <Label className="text-amber-900 font-semibold flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Your Academic Stream
                    </Label>
                    <Select value={explorerStream} onValueChange={setExplorerStream}>
                      <SelectTrigger className="h-12 bg-white border-2 border-amber-200 focus:border-amber-500 rounded-xl">
                        <SelectValue placeholder="Select your stream..." />
                      </SelectTrigger>
                      <SelectContent>
                        {STUDENT_STREAMS.map((stream) => (
                          <SelectItem key={stream.value} value={stream.value}>
                            {stream.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-amber-900 font-semibold flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Career Category of Interest
                    </Label>
                    <p className="text-sm text-amber-600">Select a field you want to explore:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {CAREER_CATEGORIES_12TH.map((category) => (
                        <Badge
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          className={`cursor-pointer transition-all duration-200 px-3 py-2 text-sm text-center justify-center ${
                            selectedCategory === category
                              ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white border-transparent shadow-md'
                              : 'bg-white border-2 border-amber-200 text-amber-700 hover:border-amber-400 hover:bg-amber-50'
                          }`}
                          onClick={() => setSelectedCategory(selectedCategory === category ? '' : category)}
                        >
                          {selectedCategory === category && <CheckCircle2 className="h-3 w-3 mr-1" />}
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {(selectedCategory || explorerStream) && (
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-emerald-100">
                          <Compass className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-medium text-emerald-900">Ready to Explore!</p>
                          <p className="text-sm text-emerald-700 mt-1">
                            AI will show careers in {selectedCategory || 'all fields'} 
                            {explorerStream && ` for ${STUDENT_STREAMS.find(s => s.value === explorerStream)?.label}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-amber-50 via-amber-50 to-transparent">
                <Button
                  onClick={exploreCareer}
                  disabled={(!selectedCategory && !explorerStream) || isAnalyzing}
                  className="w-full h-14 bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white font-semibold text-lg rounded-xl shadow-lg shadow-amber-200 disabled:opacity-50 transition-all duration-300"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Exploring Careers...
                    </>
                  ) : (
                    <>
                      <Compass className="h-5 w-5 mr-2" />
                      Explore Career Options
                    </>
                  )}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          
          {/* Subject Doubt Solver */}
          <Sheet open={doubtSolverOpen} onOpenChange={setDoubtSolverOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-rose-50 to-pink-50 backdrop-blur-sm border-2 border-rose-300 hover:border-rose-500 hover:from-rose-100 hover:to-pink-100 text-rose-700 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300 gap-2 font-medium"
              >
                <span className="p-1 rounded-full bg-rose-100">
                  <HelpCircle className="h-4 w-4" />
                </span>
                Doubt Solver
                <BookOpen className="h-3 w-3 text-rose-500" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl bg-gradient-to-br from-rose-50 via-pink-50 to-red-50">
              <SheetHeader className="text-left pb-4 border-b border-rose-100">
                <SheetTitle className="text-2xl font-bold text-rose-900 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg">
                    <HelpCircle className="h-6 w-6 text-white" />
                  </div>
                  Subject Doubt Solver
                </SheetTitle>
                <SheetDescription className="text-rose-700">
                  Get your Physics, Chemistry, Maths, Biology doubts cleared instantly
                </SheetDescription>
              </SheetHeader>
              
              <ScrollArea className="h-[calc(85vh-180px)] mt-6">
                <div className="space-y-6 pr-4">
                  <div className="space-y-3">
                    <Label className="text-rose-900 font-semibold flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Subject
                    </Label>
                    <Select value={doubtSubject} onValueChange={setDoubtSubject}>
                      <SelectTrigger className="h-12 bg-white border-2 border-rose-200 focus:border-rose-500 rounded-xl">
                        <SelectValue placeholder="Select subject..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Physics">Physics</SelectItem>
                        <SelectItem value="Chemistry">Chemistry</SelectItem>
                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                        <SelectItem value="Biology">Biology</SelectItem>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        <SelectItem value="Accountancy">Accountancy</SelectItem>
                        <SelectItem value="Economics">Economics</SelectItem>
                        <SelectItem value="Business Studies">Business Studies</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-rose-900 font-semibold">Topic (Optional)</Label>
                    <Input
                      value={doubtTopic}
                      onChange={(e) => setDoubtTopic(e.target.value)}
                      placeholder="e.g., Electromagnetism, Organic Chemistry..."
                      className="h-12 bg-white border-2 border-rose-200 focus:border-rose-500 rounded-xl"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-rose-900 font-semibold flex items-center gap-2">
                      <HelpCircle className="h-4 w-4" />
                      Your Doubt / Question
                    </Label>
                    <Textarea
                      value={doubtQuestion}
                      onChange={(e) => setDoubtQuestion(e.target.value)}
                      placeholder="Type your question here... Be as specific as possible for better explanation."
                      className="min-h-[120px] bg-white border-2 border-rose-200 focus:border-rose-500 rounded-xl resize-none"
                    />
                  </div>
                </div>
              </ScrollArea>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-rose-50 via-rose-50 to-transparent">
                <Button
                  onClick={solveDoubt}
                  disabled={!doubtSubject || !doubtQuestion.trim() || isAnalyzing}
                  className="w-full h-14 bg-gradient-to-r from-rose-600 to-pink-700 hover:from-rose-700 hover:to-pink-800 text-white font-semibold text-lg rounded-xl shadow-lg shadow-rose-200 disabled:opacity-50 transition-all duration-300"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Solving...
                    </>
                  ) : (
                    <>
                      <Lightbulb className="h-5 w-5 mr-2" />
                      Explain This Concept
                    </>
                  )}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          
          {/* Study Planner */}
          <Sheet open={studyPlannerOpen} onOpenChange={setStudyPlannerOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-violet-50 to-purple-50 backdrop-blur-sm border-2 border-violet-300 hover:border-violet-500 hover:from-violet-100 hover:to-purple-100 text-violet-700 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300 gap-2 font-medium"
              >
                <span className="p-1 rounded-full bg-violet-100">
                  <Calendar className="h-4 w-4" />
                </span>
                Study Planner
                <Clock className="h-3 w-3 text-violet-500" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
              <SheetHeader className="text-left pb-4 border-b border-violet-100">
                <SheetTitle className="text-2xl font-bold text-violet-900 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  Study Planner
                </SheetTitle>
                <SheetDescription className="text-violet-700">
                  Get a personalized daily study schedule tailored for you
                </SheetDescription>
              </SheetHeader>
              
              <ScrollArea className="h-[calc(85vh-180px)] mt-6">
                <div className="space-y-6 pr-4">
                  <div className="space-y-3">
                    <Label className="text-violet-900 font-semibold flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Your Goal
                    </Label>
                    <Select value={studyGoal} onValueChange={setStudyGoal}>
                      <SelectTrigger className="h-12 bg-white border-2 border-violet-200 focus:border-violet-500 rounded-xl">
                        <SelectValue placeholder="What are you preparing for?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="board-exams">12th Board Exams</SelectItem>
                        <SelectItem value="jee-main">JEE Main</SelectItem>
                        <SelectItem value="jee-advanced">JEE Advanced</SelectItem>
                        <SelectItem value="neet">NEET</SelectItem>
                        <SelectItem value="board-and-jee">Board + JEE Both</SelectItem>
                        <SelectItem value="board-and-neet">Board + NEET Both</SelectItem>
                        <SelectItem value="cuet">CUET</SelectItem>
                        <SelectItem value="ca-foundation">CA Foundation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-violet-900 font-semibold flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Hours Available Per Day
                    </Label>
                    <Select value={studyHoursPerDay} onValueChange={setStudyHoursPerDay}>
                      <SelectTrigger className="h-12 bg-white border-2 border-violet-200 focus:border-violet-500 rounded-xl">
                        <SelectValue placeholder="How many hours can you study?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3-4">3-4 hours</SelectItem>
                        <SelectItem value="5-6">5-6 hours</SelectItem>
                        <SelectItem value="7-8">7-8 hours</SelectItem>
                        <SelectItem value="9-10">9-10 hours</SelectItem>
                        <SelectItem value="10+">10+ hours (Intensive)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-violet-900 font-semibold flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Weak Subjects (Select all that apply)
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English'].map((subject) => (
                        <Badge
                          key={subject}
                          variant={weakSubjects.includes(subject) ? "default" : "outline"}
                          className={`cursor-pointer transition-all duration-200 px-3 py-2 ${
                            weakSubjects.includes(subject)
                              ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white border-transparent'
                              : 'bg-white border-2 border-violet-200 text-violet-700 hover:border-violet-400'
                          }`}
                          onClick={() => toggleWeakSubject(subject)}
                        >
                          {weakSubjects.includes(subject) && <CheckCircle2 className="h-3 w-3 mr-1" />}
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollArea>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-violet-50 via-violet-50 to-transparent">
                <Button
                  onClick={createStudyPlan}
                  disabled={!studyGoal || !studyHoursPerDay || isAnalyzing}
                  className="w-full h-14 bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 text-white font-semibold text-lg rounded-xl shadow-lg shadow-violet-200 disabled:opacity-50 transition-all duration-300"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Creating Plan...
                    </>
                  ) : (
                    <>
                      <Calendar className="h-5 w-5 mr-2" />
                      Create My Study Plan
                    </>
                  )}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          
          {/* Scholarship Finder */}
          <Sheet open={scholarshipFinderOpen} onOpenChange={setScholarshipFinderOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-emerald-50 to-green-50 backdrop-blur-sm border-2 border-emerald-300 hover:border-emerald-500 hover:from-emerald-100 hover:to-green-100 text-emerald-700 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300 gap-2 font-medium"
              >
                <span className="p-1 rounded-full bg-emerald-100">
                  <IndianRupee className="h-4 w-4" />
                </span>
                Scholarship Finder
                <Award className="h-3 w-3 text-emerald-500" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
              <SheetHeader className="text-left pb-4 border-b border-emerald-100">
                <SheetTitle className="text-2xl font-bold text-emerald-900 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg">
                    <IndianRupee className="h-6 w-6 text-white" />
                  </div>
                  Scholarship Finder
                </SheetTitle>
                <SheetDescription className="text-emerald-700">
                  Discover scholarships you are eligible for
                </SheetDescription>
              </SheetHeader>
              
              <ScrollArea className="h-[calc(85vh-180px)] mt-6">
                <div className="space-y-6 pr-4">
                  <div className="space-y-3">
                    <Label className="text-emerald-900 font-semibold flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Your Stream
                    </Label>
                    <Select value={scholarshipStream} onValueChange={setScholarshipStream}>
                      <SelectTrigger className="h-12 bg-white border-2 border-emerald-200 focus:border-emerald-500 rounded-xl">
                        <SelectValue placeholder="Select your stream..." />
                      </SelectTrigger>
                      <SelectContent>
                        {STUDENT_STREAMS.map((stream) => (
                          <SelectItem key={stream.value} value={stream.value}>
                            {stream.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-emerald-900 font-semibold flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Category
                    </Label>
                    <Select value={scholarshipCategory} onValueChange={setScholarshipCategory}>
                      <SelectTrigger className="h-12 bg-white border-2 border-emerald-200 focus:border-emerald-500 rounded-xl">
                        <SelectValue placeholder="Select your category..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="obc">OBC</SelectItem>
                        <SelectItem value="sc">SC</SelectItem>
                        <SelectItem value="st">ST</SelectItem>
                        <SelectItem value="ews">EWS</SelectItem>
                        <SelectItem value="minority">Minority</SelectItem>
                        <SelectItem value="pwd">PwD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-emerald-900 font-semibold flex items-center gap-2">
                      <IndianRupee className="h-4 w-4" />
                      Family Annual Income
                    </Label>
                    <Select value={familyIncome} onValueChange={setFamilyIncome}>
                      <SelectTrigger className="h-12 bg-white border-2 border-emerald-200 focus:border-emerald-500 rounded-xl">
                        <SelectValue placeholder="Select income range..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="below-1-lakh">Below ₹1 Lakh</SelectItem>
                        <SelectItem value="1-2.5-lakh">₹1 - 2.5 Lakh</SelectItem>
                        <SelectItem value="2.5-5-lakh">₹2.5 - 5 Lakh</SelectItem>
                        <SelectItem value="5-8-lakh">₹5 - 8 Lakh</SelectItem>
                        <SelectItem value="above-8-lakh">Above ₹8 Lakh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </ScrollArea>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-emerald-50 via-emerald-50 to-transparent">
                <Button
                  onClick={findScholarships}
                  disabled={isAnalyzing}
                  className="w-full h-14 bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-semibold text-lg rounded-xl shadow-lg shadow-emerald-200 disabled:opacity-50 transition-all duration-300"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Finding Scholarships...
                    </>
                  ) : (
                    <>
                      <Award className="h-5 w-5 mr-2" />
                      Find Scholarships For Me
                    </>
                  )}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          
          {/* Parent Talk Helper */}
          <Sheet open={parentTalkOpen} onOpenChange={setParentTalkOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-sky-50 to-blue-50 backdrop-blur-sm border-2 border-sky-300 hover:border-sky-500 hover:from-sky-100 hover:to-blue-100 text-sky-700 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300 gap-2 font-medium"
              >
                <span className="p-1 rounded-full bg-sky-100">
                  <Heart className="h-4 w-4" />
                </span>
                Parent Talk Helper
                <Users className="h-3 w-3 text-sky-500" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
              <SheetHeader className="text-left pb-4 border-b border-sky-100">
                <SheetTitle className="text-2xl font-bold text-sky-900 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-lg">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  Parent Talk Helper
                </SheetTitle>
                <SheetDescription className="text-sky-700">
                  Get help convincing your parents about your career choice
                </SheetDescription>
              </SheetHeader>
              
              <ScrollArea className="h-[calc(85vh-180px)] mt-6">
                <div className="space-y-6 pr-4">
                  <div className="space-y-3">
                    <Label className="text-sky-900 font-semibold flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Your Desired Career
                    </Label>
                    <Input
                      value={desiredCareer}
                      onChange={(e) => setDesiredCareer(e.target.value)}
                      placeholder="e.g., Game Developer, Photographer, Data Scientist..."
                      className="h-12 bg-white border-2 border-sky-200 focus:border-sky-500 rounded-xl"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-sky-900 font-semibold flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      What are your parents concerned about?
                    </Label>
                    <Select value={parentConcern} onValueChange={setParentConcern}>
                      <SelectTrigger className="h-12 bg-white border-2 border-sky-200 focus:border-sky-500 rounded-xl">
                        <SelectValue placeholder="Select their main concern..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="salary">Low salary / Not enough money</SelectItem>
                        <SelectItem value="job-security">No job security</SelectItem>
                        <SelectItem value="not-respected">Not a respected career</SelectItem>
                        <SelectItem value="different-career">They want me to do something else</SelectItem>
                        <SelectItem value="unknown-field">They dont know about this field</SelectItem>
                        <SelectItem value="risky">Too risky career</SelectItem>
                        <SelectItem value="family-business">Want me to join family business</SelectItem>
                        <SelectItem value="other">Other concerns</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-sky-900 font-semibold">Describe your situation (Optional)</Label>
                    <Textarea
                      value={currentSituation}
                      onChange={(e) => setCurrentSituation(e.target.value)}
                      placeholder="Tell us more about your situation... What have your parents said?"
                      className="min-h-[100px] bg-white border-2 border-sky-200 focus:border-sky-500 rounded-xl resize-none"
                    />
                  </div>
                </div>
              </ScrollArea>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-sky-50 via-sky-50 to-transparent">
                <Button
                  onClick={getParentTalkHelp}
                  disabled={!desiredCareer.trim() || isAnalyzing}
                  className="w-full h-14 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white font-semibold text-lg rounded-xl shadow-lg shadow-sky-200 disabled:opacity-50 transition-all duration-300"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Preparing Tips...
                    </>
                  ) : (
                    <>
                      <Heart className="h-5 w-5 mr-2" />
                      Get Talking Tips
                    </>
                  )}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Enhanced Chat Area */}
        <Card className="bg-white/70 backdrop-blur-xl border-2 border-white/60 shadow-2xl shadow-emerald-900/5 rounded-3xl mb-6 overflow-hidden">
          <CardContent className="p-0">
            <ScrollArea className="h-[55vh]">
              <div className="p-6">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-16">
                    {/* Animated avatar */}
                    <div className="relative mb-6">
                      <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 flex items-center justify-center shadow-2xl shadow-orange-300/50 transform hover:scale-105 transition-transform duration-300">
                        <Bot className="h-12 w-12 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-gray-800 mb-3">
                      {t('chat.welcomeTitle')}
                    </h3>
                    <p className="text-gray-600 max-w-md text-lg leading-relaxed">
                      {t('chat.welcomeDesc')}
                    </p>
                    <p className="text-amber-600/80 font-tamil mt-4 text-lg">
                      {t('chat.welcomeTamil')}
                    </p>
                    
                    {/* Curated Questions for 12th Students */}
                    <div className="mt-8 w-full max-w-2xl">
                      <div className="flex items-center gap-2 justify-center mb-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
                        <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full flex items-center gap-1.5">
                          <Sparkles className="h-3 w-3" />
                          {t('chat.popularQuestions')}
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {/* Career Planning Questions */}
                        {[
                          { questionKey: "chat.q1", icon: "🔬", color: "blue" },
                          { questionKey: "chat.q2", icon: "💰", color: "green" },
                          { questionKey: "chat.q3", icon: "🤔", color: "purple" },
                          { questionKey: "chat.q4", icon: "📈", color: "orange" },
                          { questionKey: "chat.q5", icon: "📝", color: "rose" },
                          { questionKey: "chat.q6", icon: "🏫", color: "indigo" },
                          { questionKey: "chat.q7", icon: "✈️", color: "sky" },
                          { questionKey: "chat.q8", icon: "🎯", color: "amber" },
                        ].map((item) => (
                          <button
                            key={item.questionKey}
                            onClick={() => handleQuickAction(t(item.questionKey))}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                              item.color === "blue" ? "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-800 hover:border-blue-400" :
                              item.color === "green" ? "bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 hover:border-green-400" :
                              item.color === "purple" ? "bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 text-purple-800 hover:border-purple-400" :
                              item.color === "orange" ? "bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 text-orange-800 hover:border-orange-400" :
                              item.color === "rose" ? "bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 text-rose-800 hover:border-rose-400" :
                              item.color === "indigo" ? "bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 text-indigo-800 hover:border-indigo-400" :
                              item.color === "sky" ? "bg-gradient-to-r from-sky-50 to-cyan-50 border border-sky-200 text-sky-800 hover:border-sky-400" :
                              "bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 text-amber-800 hover:border-amber-400"
                            }`}
                          >
                            <span className="text-lg">{item.icon}</span>
                            <span className="text-sm font-medium leading-tight">{t(item.questionKey)}</span>
                          </button>
                        ))}
                      </div>
                      
                      {/* Stream-specific section */}
                      <div className="mt-6">
                        <div className="flex items-center gap-2 justify-center mb-3">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
                          <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                            🎓 {t('chat.streamSpecificQuestions')}
                          </span>
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
                        </div>
                        
                        <div className="flex flex-wrap justify-center gap-2">
                          {[
                            "chat.stream1",
                            "chat.stream2",
                            "chat.stream3",
                            "chat.stream4"
                          ].map((key) => (
                            <button
                              key={key}
                              onClick={() => handleQuickAction(t(key))}
                              className="px-4 py-2 rounded-full bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 text-rose-700 text-sm font-medium hover:border-rose-400 hover:shadow-md transition-all duration-300"
                            >
                              {t(key)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                      >
                        {message.role === 'assistant' && (
                          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-200/50">
                            <Bot className="h-5 w-5 text-white" />
                          </div>
                        )}
                        <div
                          className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-lg ${
                            message.role === 'user'
                              ? 'bg-gradient-to-br from-emerald-600 to-green-700 text-white shadow-emerald-200/50'
                              : 'bg-white border border-gray-100 text-gray-800 shadow-gray-100/50'
                          }`}
                        >
                          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                          <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-emerald-100' : 'text-gray-400'}`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        {message.role === 'user' && (
                          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center flex-shrink-0 shadow-md">
                            <User className="h-5 w-5 text-emerald-700" />
                          </div>
                        )}
                      </div>
                    ))}
                    {isLoading && messages[messages.length - 1]?.content === '' && (
                      <div className="flex gap-3 animate-fade-in">
                        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-200/50">
                          <Bot className="h-5 w-5 text-white" />
                        </div>
                        <div className="bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-lg">
                          <div className="flex gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Enhanced Input Area */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border-2 border-white/60 shadow-xl p-3 flex gap-3 items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleVoiceInput}
            className={`rounded-xl h-12 w-12 transition-all duration-300 ${
              isListening 
                ? 'bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg shadow-red-200 animate-pulse' 
                : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
            }`}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder={t('chat.inputPlaceholder')}
            className="flex-1 border-0 bg-transparent text-gray-800 placeholder:text-gray-400 focus-visible:ring-0 text-base h-12"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSend} 
            disabled={isLoading || !input.trim()} 
            className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg shadow-emerald-200/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </Button>
        </div>

        {isListening && (
          <div className="text-center mt-4 flex items-center justify-center gap-2">
            <span className="inline-flex h-3 w-3 rounded-full bg-red-500 animate-ping" />
            <p className="text-emerald-700 font-medium">Listening... Speak now</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerChat;
