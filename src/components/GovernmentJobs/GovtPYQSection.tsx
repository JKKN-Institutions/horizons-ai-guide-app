import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download, 
  Calendar, 
  ChevronDown, 
  ChevronUp,
  Star,
  BookOpen,
  Shield,
  Train,
  Building2,
  Landmark,
  Users
} from 'lucide-react';

interface QuestionPaper {
  id: string;
  examName: string;
  examNameTa: string;
  year: number;
  shift?: string;
  subjects: string[];
  downloads: number;
  rating: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  pdfUrl?: string;
}

import { Language } from '@/hooks/useLanguage';

interface GovtPYQSectionProps {
  language?: Language;
}

const categoryData: Record<string, { icon: React.ElementType; label: string; labelTa: string }> = {
  defence: { icon: Shield, label: 'Defence', labelTa: 'பாதுகாப்பு' },
  railway: { icon: Train, label: 'Railway', labelTa: 'ரயில்வே' },
  ssc: { icon: Building2, label: 'SSC', labelTa: 'எஸ்எஸ்சி' },
  banking: { icon: Landmark, label: 'Banking', labelTa: 'வங்கி' },
  state: { icon: Users, label: 'State Govt', labelTa: 'மாநில அரசு' }
};

const questionPapers: Record<string, QuestionPaper[]> = {
  defence: [
    { id: 'd1', examName: 'NDA', examNameTa: 'என்டிஏ', year: 2024, shift: 'I', subjects: ['Mathematics', 'GAT'], downloads: 15420, rating: 4.8, difficulty: 'Hard' },
    { id: 'd2', examName: 'NDA', examNameTa: 'என்டிஏ', year: 2024, shift: 'II', subjects: ['Mathematics', 'GAT'], downloads: 12350, rating: 4.7, difficulty: 'Hard' },
    { id: 'd3', examName: 'NDA', examNameTa: 'என்டிஏ', year: 2023, shift: 'I', subjects: ['Mathematics', 'GAT'], downloads: 28540, rating: 4.9, difficulty: 'Medium' },
    { id: 'd4', examName: 'NDA', examNameTa: 'என்டிஏ', year: 2023, shift: 'II', subjects: ['Mathematics', 'GAT'], downloads: 24120, rating: 4.6, difficulty: 'Hard' },
    { id: 'd5', examName: 'CDS', examNameTa: 'சிடிஎஸ்', year: 2024, shift: 'I', subjects: ['English', 'GK', 'Mathematics'], downloads: 18760, rating: 4.5, difficulty: 'Medium' },
    { id: 'd6', examName: 'CDS', examNameTa: 'சிடிஎஸ்', year: 2023, shift: 'I', subjects: ['English', 'GK', 'Mathematics'], downloads: 32150, rating: 4.8, difficulty: 'Medium' },
    { id: 'd7', examName: 'AFCAT', examNameTa: 'ஏஎஃப்கேஏடி', year: 2024, shift: 'I', subjects: ['GK', 'Reasoning', 'English', 'Mathematics'], downloads: 9870, rating: 4.4, difficulty: 'Medium' },
    { id: 'd8', examName: 'AFCAT', examNameTa: 'ஏஎஃப்கேஏடி', year: 2023, shift: 'I', subjects: ['GK', 'Reasoning', 'English', 'Mathematics'], downloads: 14520, rating: 4.6, difficulty: 'Easy' },
  ],
  railway: [
    { id: 'r1', examName: 'RRB NTPC', examNameTa: 'ஆர்ஆர்பி என்டிபிசி', year: 2024, subjects: ['GK', 'Mathematics', 'Reasoning'], downloads: 45620, rating: 4.7, difficulty: 'Medium' },
    { id: 'r2', examName: 'RRB NTPC', examNameTa: 'ஆர்ஆர்பி என்டிபிசி', year: 2023, subjects: ['GK', 'Mathematics', 'Reasoning'], downloads: 68450, rating: 4.8, difficulty: 'Medium' },
    { id: 'r3', examName: 'RRB Group D', examNameTa: 'ஆர்ஆர்பி குரூப் டி', year: 2024, subjects: ['Mathematics', 'GK', 'Reasoning'], downloads: 52340, rating: 4.5, difficulty: 'Easy' },
    { id: 'r4', examName: 'RRB Group D', examNameTa: 'ஆர்ஆர்பி குரூப் டி', year: 2023, subjects: ['Mathematics', 'GK', 'Reasoning'], downloads: 78920, rating: 4.6, difficulty: 'Easy' },
    { id: 'r5', examName: 'RRB JE', examNameTa: 'ஆர்ஆர்பி ஜேஇ', year: 2024, subjects: ['Technical', 'GK', 'Reasoning'], downloads: 23450, rating: 4.4, difficulty: 'Hard' },
    { id: 'r6', examName: 'RRB ALP', examNameTa: 'ஆர்ஆர்பி ஏஎல்பி', year: 2023, subjects: ['Mathematics', 'GK', 'Reasoning', 'Technical'], downloads: 31240, rating: 4.5, difficulty: 'Medium' },
  ],
  ssc: [
    { id: 's1', examName: 'SSC CGL', examNameTa: 'எஸ்எஸ்சி சிஜிஎல்', year: 2024, shift: 'Tier I', subjects: ['Reasoning', 'GK', 'Quantitative', 'English'], downloads: 89540, rating: 4.9, difficulty: 'Medium' },
    { id: 's2', examName: 'SSC CGL', examNameTa: 'எஸ்எஸ்சி சிஜிஎல்', year: 2024, shift: 'Tier II', subjects: ['Quantitative', 'English'], downloads: 67230, rating: 4.8, difficulty: 'Hard' },
    { id: 's3', examName: 'SSC CGL', examNameTa: 'எஸ்எஸ்சி சிஜிஎல்', year: 2023, shift: 'Tier I', subjects: ['Reasoning', 'GK', 'Quantitative', 'English'], downloads: 125780, rating: 4.9, difficulty: 'Medium' },
    { id: 's4', examName: 'SSC CHSL', examNameTa: 'எஸ்எஸ்சி சிஎச்எஸ்எல்', year: 2024, subjects: ['GK', 'Reasoning', 'Quantitative', 'English'], downloads: 56780, rating: 4.6, difficulty: 'Easy' },
    { id: 's5', examName: 'SSC CHSL', examNameTa: 'எஸ்எஸ்சி சிஎச்எஸ்எல்', year: 2023, subjects: ['GK', 'Reasoning', 'Quantitative', 'English'], downloads: 82340, rating: 4.7, difficulty: 'Easy' },
    { id: 's6', examName: 'SSC MTS', examNameTa: 'எஸ்எஸ்சி எம்டிஎஸ்', year: 2024, subjects: ['Reasoning', 'Numerical', 'English', 'GK'], downloads: 43250, rating: 4.4, difficulty: 'Easy' },
    { id: 's7', examName: 'SSC GD', examNameTa: 'எஸ்எஸ்சி ஜிடி', year: 2024, subjects: ['Reasoning', 'GK', 'Mathematics', 'Hindi/English'], downloads: 98760, rating: 4.8, difficulty: 'Easy' },
  ],
  banking: [
    { id: 'b1', examName: 'IBPS PO', examNameTa: 'ஐபிபிஎஸ் பிஓ', year: 2024, shift: 'Prelims', subjects: ['Reasoning', 'Quantitative', 'English'], downloads: 76540, rating: 4.8, difficulty: 'Medium' },
    { id: 'b2', examName: 'IBPS PO', examNameTa: 'ஐபிபிஎஸ் பிஓ', year: 2024, shift: 'Mains', subjects: ['Reasoning', 'GK', 'Quantitative', 'English'], downloads: 54320, rating: 4.9, difficulty: 'Hard' },
    { id: 'b3', examName: 'IBPS Clerk', examNameTa: 'ஐபிபிஎஸ் கிளார்க்', year: 2024, subjects: ['Reasoning', 'English', 'Quantitative'], downloads: 82150, rating: 4.7, difficulty: 'Easy' },
    { id: 'b4', examName: 'SBI PO', examNameTa: 'எஸ்பிஐ பிஓ', year: 2024, shift: 'Prelims', subjects: ['Reasoning', 'Quantitative', 'English'], downloads: 92340, rating: 4.9, difficulty: 'Medium' },
    { id: 'b5', examName: 'SBI Clerk', examNameTa: 'எஸ்பிஐ கிளார்க்', year: 2024, subjects: ['Reasoning', 'English', 'Quantitative'], downloads: 78540, rating: 4.6, difficulty: 'Easy' },
    { id: 'b6', examName: 'RBI Assistant', examNameTa: 'ஆர்பிஐ உதவியாளர்', year: 2024, subjects: ['Reasoning', 'English', 'Quantitative', 'GK'], downloads: 34560, rating: 4.5, difficulty: 'Medium' },
  ],
  state: [
    { id: 'st1', examName: 'TNPSC Group I', examNameTa: 'டிஎன்பிஎஸ்சி குரூப் 1', year: 2024, subjects: ['GK', 'Aptitude', 'Tamil', 'English'], downloads: 45670, rating: 4.9, difficulty: 'Hard' },
    { id: 'st2', examName: 'TNPSC Group II', examNameTa: 'டிஎன்பிஎஸ்சி குரூப் 2', year: 2024, subjects: ['GK', 'Aptitude', 'Tamil'], downloads: 67890, rating: 4.8, difficulty: 'Medium' },
    { id: 'st3', examName: 'TNPSC Group IV', examNameTa: 'டிஎன்பிஎஸ்சி குரூப் 4', year: 2024, subjects: ['GK', 'Aptitude', 'Tamil'], downloads: 89450, rating: 4.7, difficulty: 'Easy' },
    { id: 'st4', examName: 'TNPSC Group IV', examNameTa: 'டிஎன்பிஎஸ்சி குரூப் 4', year: 2023, subjects: ['GK', 'Aptitude', 'Tamil'], downloads: 112340, rating: 4.8, difficulty: 'Easy' },
    { id: 'st5', examName: 'TN TET', examNameTa: 'டிஎன் டெட்', year: 2024, subjects: ['Child Development', 'Tamil', 'English', 'Mathematics'], downloads: 56780, rating: 4.6, difficulty: 'Medium' },
    { id: 'st6', examName: 'TN SI', examNameTa: 'டிஎன் எஸ்ஐ', year: 2024, subjects: ['GK', 'Reasoning', 'Aptitude'], downloads: 43210, rating: 4.5, difficulty: 'Medium' },
  ]
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    case 'Medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'Hard': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export const GovtPYQSection = ({ language = 'en' }: GovtPYQSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState('ssc');
  const [expandedYears, setExpandedYears] = useState<Record<string, boolean>>({});

  const papers = questionPapers[selectedCategory] || [];
  
  // Group papers by year
  const papersByYear = papers.reduce((acc, paper) => {
    if (!acc[paper.year]) acc[paper.year] = [];
    acc[paper.year].push(paper);
    return acc;
  }, {} as Record<number, QuestionPaper[]>);

  const years = Object.keys(papersByYear).map(Number).sort((a, b) => b - a);

  const toggleYear = (year: number) => {
    setExpandedYears(prev => ({ ...prev, [year]: !prev[year] }));
  };

  const handleDownload = (paper: QuestionPaper) => {
    // In a real app, this would download the PDF
    const url = `https://example.com/pyq/${paper.id}.pdf`;
    window.open(url, '_blank');
  };

  const totalPapers = Object.values(questionPapers).flat().length;
  const totalDownloads = Object.values(questionPapers).flat().reduce((sum, p) => sum + p.downloads, 0);

  return (
    <Card className="border-none shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500 rounded-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">
                {language === 'ta' ? 'முந்தைய ஆண்டு வினாத்தாள்கள்' : 'Previous Year Question Papers'}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {language === 'ta' 
                  ? `${totalPapers}+ வினாத்தாள்கள் • ${(totalDownloads / 1000).toFixed(0)}K+ பதிவிறக்கங்கள்`
                  : `${totalPapers}+ Papers • ${(totalDownloads / 1000).toFixed(0)}K+ Downloads`}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid grid-cols-5 h-auto p-1">
            {Object.entries(categoryData).map(([key, { icon: Icon, label, labelTa }]) => (
              <TabsTrigger 
                key={key} 
                value={key}
                className="flex flex-col gap-1 py-2 data-[state=active]:bg-amber-500 data-[state=active]:text-white"
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs">{language === 'ta' ? labelTa : label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.keys(categoryData).map(category => (
            <TabsContent key={category} value={category} className="mt-4">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {years.map(year => (
                    <motion.div
                      key={year}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-between p-4 h-auto bg-white/60 dark:bg-gray-800/60 hover:bg-white dark:hover:bg-gray-800"
                        onClick={() => toggleYear(year)}
                      >
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-amber-600" />
                          <span className="font-semibold text-lg">{year}</span>
                          <Badge variant="secondary" className="ml-2">
                            {papersByYear[year].length} {language === 'ta' ? 'தாள்கள்' : 'Papers'}
                          </Badge>
                        </div>
                        {expandedYears[year] ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </Button>

                      <AnimatePresence>
                        {expandedYears[year] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-2 pt-2 pl-4">
                              {papersByYear[year].map(paper => (
                                <Card key={paper.id} className="p-4 bg-white dark:bg-gray-800">
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <h4 className="font-medium">
                                          {language === 'ta' ? paper.examNameTa : paper.examName}
                                        </h4>
                                        {paper.shift && (
                                          <Badge variant="outline" className="text-xs">
                                            {paper.shift}
                                          </Badge>
                                        )}
                                        <Badge className={getDifficultyColor(paper.difficulty)}>
                                          {paper.difficulty}
                                        </Badge>
                                      </div>
                                      
                                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                          <BookOpen className="h-3 w-3" />
                                          {paper.subjects.slice(0, 3).join(', ')}
                                          {paper.subjects.length > 3 && ` +${paper.subjects.length - 3}`}
                                        </span>
                                        <span className="flex items-center gap-1">
                                          <Download className="h-3 w-3" />
                                          {(paper.downloads / 1000).toFixed(1)}K
                                        </span>
                                        <span className="flex items-center gap-1">
                                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                          {paper.rating}
                                        </span>
                                      </div>
                                    </div>
                                    
                                    <Button
                                      size="sm"
                                      onClick={() => handleDownload(paper)}
                                      className="bg-amber-500 hover:bg-amber-600 text-white"
                                    >
                                      <Download className="h-4 w-4 mr-1" />
                                      {language === 'ta' ? 'பதிவிறக்கம்' : 'Download'}
                                    </Button>
                                  </div>
                                </Card>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t">
          <div className="text-center p-3 rounded-lg bg-white/60 dark:bg-gray-800/60">
            <div className="text-2xl font-bold text-amber-600">{papers.length}</div>
            <div className="text-xs text-muted-foreground">
              {language === 'ta' ? 'வினாத்தாள்கள்' : 'Papers'}
            </div>
          </div>
          <div className="text-center p-3 rounded-lg bg-white/60 dark:bg-gray-800/60">
            <div className="text-2xl font-bold text-amber-600">{years.length}</div>
            <div className="text-xs text-muted-foreground">
              {language === 'ta' ? 'ஆண்டுகள்' : 'Years'}
            </div>
          </div>
          <div className="text-center p-3 rounded-lg bg-white/60 dark:bg-gray-800/60">
            <div className="text-2xl font-bold text-amber-600">
              {(papers.reduce((sum, p) => sum + p.downloads, 0) / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-muted-foreground">
              {language === 'ta' ? 'பதிவிறக்கங்கள்' : 'Downloads'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
