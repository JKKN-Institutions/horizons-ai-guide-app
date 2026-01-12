import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { governmentExamCategories } from '@/data/government-exams-data';

const GovernmentExams = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">
                {language === 'ta' ? 'அரசு தேர்வுகள்' : 'Government Exams'}
              </h1>
              <p className="text-white/80 text-sm">
                {language === 'ta' ? '12ஆம் வகுப்பு தேர்ச்சி பெற்றவர்களுக்கான வாய்ப்புகள்' : 'Opportunities for 12th Pass Students'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 -mt-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: BookOpen, label: language === 'ta' ? 'வகைகள்' : 'Categories', value: '6' },
            { icon: Users, label: language === 'ta' ? 'தேர்வுகள்' : 'Exams', value: '20+' },
            { icon: TrendingUp, label: language === 'ta' ? 'PYQ' : 'PYQs', value: '500+' }
          ].map((stat, idx) => (
            <Card key={idx} className="bg-white dark:bg-slate-800 shadow-lg border-0">
              <CardContent className="p-4 text-center">
                <stat.icon className="h-6 w-6 mx-auto text-indigo-600 mb-1" />
                <div className="text-xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">
          {language === 'ta' ? 'வகையைத் தேர்ந்தெடுக்கவும்' : 'Select a Category'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {governmentExamCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`cursor-pointer hover:shadow-xl transition-all duration-300 border-2 ${category.borderColor} ${category.bgColor} dark:bg-slate-800/50 hover:scale-[1.02]`}
                onClick={() => navigate(`/government-exams/${category.id}`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`text-4xl p-3 rounded-xl bg-gradient-to-br ${category.color} text-white shadow-lg`}>
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-foreground">
                        {language === 'ta' ? category.nameTamil : category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {category.exams.length} {language === 'ta' ? 'தேர்வுகள்' : 'Exams'}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {category.exams.slice(0, 2).map(exam => (
                          <span key={exam.id} className="text-xs px-2 py-0.5 rounded-full bg-white/80 dark:bg-slate-700 text-muted-foreground">
                            {exam.name.split('(')[0].trim()}
                          </span>
                        ))}
                        {category.exams.length > 2 && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-white/80 dark:bg-slate-700 text-muted-foreground">
                            +{category.exams.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
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

export default GovernmentExams;
