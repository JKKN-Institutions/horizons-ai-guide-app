import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Banknote, GraduationCap, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage';
import { getCategoryById } from '@/data/government-exams-data';

const GovernmentExamCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const category = getCategoryById(categoryId || '');

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Category not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className={`bg-gradient-to-r ${category.color} text-white`}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/government-exams')} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{category.icon}</span>
              <div>
                <h1 className="text-xl font-bold">
                  {language === 'ta' ? category.nameTamil : category.name}
                </h1>
                <p className="text-white/80 text-sm">
                  {category.exams.length} {language === 'ta' ? 'தேர்வுகள் கிடைக்கின்றன' : 'Exams Available'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exams List */}
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-4">
          {category.exams.map((exam, index) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`cursor-pointer hover:shadow-lg transition-all border-l-4 ${category.borderColor} bg-white dark:bg-slate-800`}
                onClick={() => navigate(`/government-exams/${categoryId}/${exam.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground">
                        {language === 'ta' ? exam.nameTamil : exam.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs gap-1">
                          <GraduationCap className="h-3 w-3" />
                          {language === 'ta' ? exam.qualificationTamil : exam.qualification}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {exam.age}
                        </span>
                        <span className="flex items-center gap-1">
                          <Banknote className="h-4 w-4" />
                          {exam.salary}
                        </span>
                      </div>
                      {exam.posts && exam.posts.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {(language === 'ta' ? exam.postsTamil || exam.posts : exam.posts).slice(0, 3).map((post, idx) => (
                            <span key={idx} className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                              {post}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GovernmentExamCategory;
