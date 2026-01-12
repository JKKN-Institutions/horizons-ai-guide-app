import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, FileText, ClipboardList, Play, ChevronDown, ChevronUp, Check, X, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useLanguage } from '@/hooks/useLanguage';
import { getCategoryById, getExamById, Question } from '@/data/government-exams-data';

const GovernmentExamDetail = () => {
  const { categoryId, examId } = useParams<{ categoryId: string; examId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(new Set());

  const category = getCategoryById(categoryId || '');
  const exam = getExamById(categoryId || '', examId || '');

  if (!category || !exam) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Exam not found</p>
      </div>
    );
  }

  const toggleSection = (id: string) => {
    const newSet = new Set(expandedSections);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedSections(newSet);
  };

  const handleAnswer = (questionId: string, answerIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answerIdx }));
  };

  const toggleReveal = (questionId: string) => {
    const newSet = new Set(revealedAnswers);
    if (newSet.has(questionId)) newSet.delete(questionId);
    else newSet.add(questionId);
    setRevealedAnswers(newSet);
  };

  const pyqBySubject = exam.pyq.reduce((acc, q) => {
    if (!acc[q.subject]) acc[q.subject] = [];
    acc[q.subject].push(q);
    return acc;
  }, {} as Record<string, Question[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pb-20">
      {/* Header */}
      <div className={`bg-gradient-to-r ${category.color} text-white`}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold">{language === 'ta' ? exam.nameTamil : exam.name}</h1>
              <p className="text-white/80 text-sm">{exam.salary}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="overview" className="text-xs">
              {language === 'ta' ? 'கண்ணோட்டம்' : 'Overview'}
            </TabsTrigger>
            <TabsTrigger value="syllabus" className="text-xs">
              {language === 'ta' ? 'பாடத்திட்டம்' : 'Syllabus'}
            </TabsTrigger>
            <TabsTrigger value="pyq" className="text-xs">PYQ</TabsTrigger>
            <TabsTrigger value="pattern" className="text-xs">
              {language === 'ta' ? 'வடிவம்' : 'Pattern'}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{language === 'ta' ? 'தகுதி' : 'Qualification'}</span>
                    <span className="font-medium text-foreground">{language === 'ta' ? exam.qualificationTamil : exam.qualification}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{language === 'ta' ? 'வயது' : 'Age Limit'}</span>
                    <span className="font-medium text-foreground">{exam.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{language === 'ta' ? 'சம்பளம்' : 'Salary'}</span>
                    <span className="font-medium text-emerald-600">{exam.salary}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{language === 'ta' ? 'தேர்வு செயல்முறை' : 'Selection Process'}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">{language === 'ta' ? exam.selectionProcessTamil : exam.selectionProcess}</p>
                </CardContent>
              </Card>

              {exam.posts && exam.posts.length > 0 && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{language === 'ta' ? 'பதவிகள்' : 'Posts Available'}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex flex-wrap gap-2">
                      {(language === 'ta' ? exam.postsTamil || exam.posts : exam.posts).map((post, idx) => (
                        <Badge key={idx} variant="outline">{post}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Button className="w-full" onClick={() => navigate(`/career-assessment/colleges`)}>
                <Play className="h-4 w-4 mr-2" />
                {language === 'ta' ? 'மாக் டெஸ்ட் தொடங்கு' : 'Start Mock Test'}
              </Button>
            </div>
          </TabsContent>

          {/* Syllabus Tab */}
          <TabsContent value="syllabus">
            <div className="space-y-3">
              {Object.entries(exam.syllabus).map(([key, sections]) => (
                sections.map((section, sIdx) => (
                  <Card key={`${key}-${sIdx}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{language === 'ta' ? section.nameTamil : section.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-2">
                      {section.topics.map((topic, tIdx) => (
                        <Collapsible key={tIdx} open={expandedSections.has(`${key}-${sIdx}-${tIdx}`)}>
                          <CollapsibleTrigger
                            onClick={() => toggleSection(`${key}-${sIdx}-${tIdx}`)}
                            className="flex items-center justify-between w-full p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                          >
                            <span className="font-medium text-sm text-foreground">{language === 'ta' ? topic.nameTamil : topic.name}</span>
                            {expandedSections.has(`${key}-${sIdx}-${tIdx}`) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </CollapsibleTrigger>
                          <CollapsibleContent className="pt-2 pl-4">
                            <ul className="space-y-1">
                              {topic.subtopics.map((sub, subIdx) => (
                                <li key={subIdx} className="text-sm text-muted-foreground flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                  {sub}
                                </li>
                              ))}
                            </ul>
                          </CollapsibleContent>
                        </Collapsible>
                      ))}
                    </CardContent>
                  </Card>
                ))
              ))}
            </div>
          </TabsContent>

          {/* PYQ Tab */}
          <TabsContent value="pyq">
            {exam.pyq.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  {language === 'ta' ? 'விரைவில் கேள்விகள் சேர்க்கப்படும்' : 'Questions coming soon'}
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {Object.entries(pyqBySubject).map(([subject, questions]) => (
                  <div key={subject}>
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      {subject} ({questions.length})
                    </h3>
                    <div className="space-y-3">
                      {questions.map((q, qIdx) => {
                        const isRevealed = revealedAnswers.has(q.id);
                        const selected = selectedAnswers[q.id];
                        const isCorrect = selected === q.answer;

                        return (
                          <motion.div key={q.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: qIdx * 0.05 }}>
                            <Card className={isRevealed ? (isCorrect ? 'border-emerald-300 bg-emerald-50/50 dark:bg-emerald-900/20' : 'border-red-300 bg-red-50/50 dark:bg-red-900/20') : ''}>
                              <CardContent className="p-4">
                                <p className="font-medium text-sm text-foreground mb-3">
                                  Q{qIdx + 1}. {language === 'ta' && q.questionTamil ? q.questionTamil : q.question}
                                </p>
                                <div className="space-y-2">
                                  {q.options.map((opt, oIdx) => {
                                    const isSelected = selected === oIdx;
                                    const isAnswer = q.answer === oIdx;
                                    let optClass = 'border-muted bg-muted/30';
                                    if (isRevealed) {
                                      if (isAnswer) optClass = 'border-emerald-500 bg-emerald-100 dark:bg-emerald-900/50';
                                      else if (isSelected && !isAnswer) optClass = 'border-red-500 bg-red-100 dark:bg-red-900/50';
                                    } else if (isSelected) {
                                      optClass = 'border-primary bg-primary/10';
                                    }

                                    return (
                                      <button
                                        key={oIdx}
                                        onClick={() => !isRevealed && handleAnswer(q.id, oIdx)}
                                        disabled={isRevealed}
                                        className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${optClass} flex items-center gap-2`}
                                      >
                                        <span className="w-6 h-6 rounded-full border flex items-center justify-center text-xs font-medium">
                                          {String.fromCharCode(65 + oIdx)}
                                        </span>
                                        <span className="flex-1 text-foreground">{opt}</span>
                                        {isRevealed && isAnswer && <Check className="h-4 w-4 text-emerald-600" />}
                                        {isRevealed && isSelected && !isAnswer && <X className="h-4 w-4 text-red-600" />}
                                      </button>
                                    );
                                  })}
                                </div>
                                <div className="flex items-center justify-between mt-3">
                                  <Badge variant="outline" className="text-xs">{q.difficulty}</Badge>
                                  <Button size="sm" variant="ghost" onClick={() => toggleReveal(q.id)} className="text-xs gap-1">
                                    {isRevealed ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                                    {isRevealed ? (language === 'ta' ? 'மறை' : 'Hide') : (language === 'ta' ? 'விடை காண்' : 'Show Answer')}
                                  </Button>
                                </div>
                                {isRevealed && (
                                  <div className="mt-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-sm text-blue-800 dark:text-blue-200">
                                    <strong>{language === 'ta' ? 'விளக்கம்:' : 'Explanation:'}</strong> {q.explanation}
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Pattern Tab */}
          <TabsContent value="pattern">
            {exam.examPattern && exam.examPattern.length > 0 ? (
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {exam.examPattern.map((pattern, idx) => (
                      <div key={idx} className="p-4 rounded-lg bg-muted/50">
                        <h4 className="font-semibold text-foreground">{language === 'ta' ? pattern.paperTamil : pattern.paper}</h4>
                        <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">{language === 'ta' ? 'மதிப்பெண்கள்' : 'Marks'}</span>
                            <p className="font-medium text-foreground">{pattern.marks}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">{language === 'ta' ? 'நேரம்' : 'Duration'}</span>
                            <p className="font-medium text-foreground">{pattern.duration}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">{language === 'ta' ? 'கேள்விகள்' : 'Questions'}</span>
                            <p className="font-medium text-foreground">{pattern.questions}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  {language === 'ta' ? 'தேர்வு வடிவம் விரைவில்' : 'Exam pattern coming soon'}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GovernmentExamDetail;
