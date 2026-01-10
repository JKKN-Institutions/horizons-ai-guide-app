import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { governmentExams, categoryInfo } from './governmentExamsData';
import { useLanguage } from '@/hooks/useLanguage';
import { IndianRupee, TrendingUp, Award, Building2 } from 'lucide-react';

const categoryColors: Record<string, string> = {
  defence: '#dc2626',
  railway: '#2563eb',
  ssc: '#7c3aed',
  banking: '#059669',
  state: '#ea580c',
  central: '#0891b2',
};

const categoryLabels: Record<string, { en: string; ta: string }> = {
  defence: { en: 'Defence', ta: 'பாதுகாப்பு' },
  railway: { en: 'Railway', ta: 'ரயில்வே' },
  ssc: { en: 'SSC', ta: 'SSC' },
  banking: { en: 'Banking', ta: 'வங்கி' },
  state: { en: 'State TN', ta: 'தமிழ்நாடு' },
  central: { en: 'Central', ta: 'மத்திய' },
};

export const SalaryComparisonChart = () => {
  const { language } = useLanguage();

  const salaryData = useMemo(() => {
    const categoryData: Record<string, { min: number; max: number; avg: number; count: number }> = {};

    governmentExams.forEach(exam => {
      if (!categoryData[exam.category]) {
        categoryData[exam.category] = { min: Infinity, max: 0, avg: 0, count: 0 };
      }
      const cat = categoryData[exam.category];
      cat.min = Math.min(cat.min, exam.salaryMin);
      cat.max = Math.max(cat.max, exam.salaryMax);
      cat.avg += (exam.salaryMin + exam.salaryMax) / 2;
      cat.count++;
    });

    return Object.entries(categoryData).map(([category, data]) => ({
      category,
      categoryLabel: language === 'ta' ? categoryLabels[category]?.ta : categoryLabels[category]?.en,
      minSalary: Math.round(data.min / 1000),
      maxSalary: Math.round(data.max / 1000),
      avgSalary: Math.round(data.avg / data.count / 1000),
      color: categoryColors[category],
      emoji: categoryInfo[category]?.emoji || '📋',
    })).sort((a, b) => b.maxSalary - a.maxSalary);
  }, [language]);

  const topPayingJobs = useMemo(() => {
    return [...governmentExams]
      .sort((a, b) => b.salaryMax - a.salaryMax)
      .slice(0, 5);
  }, []);

  const formatSalary = (value: number) => `₹${value}K`;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-bold text-gray-800 flex items-center gap-2">
            <span>{data.emoji}</span> {data.categoryLabel}
          </p>
          <div className="mt-2 space-y-1 text-sm">
            <p className="text-green-600">
              {language === 'ta' ? 'குறைந்தபட்சம்' : 'Minimum'}: ₹{data.minSalary}K
            </p>
            <p className="text-blue-600">
              {language === 'ta' ? 'சராசரி' : 'Average'}: ₹{data.avgSalary}K
            </p>
            <p className="text-purple-600">
              {language === 'ta' ? 'அதிகபட்சம்' : 'Maximum'}: ₹{data.maxSalary}K
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Main Chart */}
      <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50/50 to-teal-50/50">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-3 text-lg">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
              <IndianRupee className="h-5 w-5 text-white" />
            </div>
            {language === 'ta' ? 'வகை வாரியான சம்பள ஒப்பீடு' : 'Salary Comparison by Category'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={salaryData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  type="number" 
                  tickFormatter={formatSalary}
                  tick={{ fontSize: 12 }}
                  domain={[0, 'dataMax + 20']}
                />
                <YAxis 
                  type="category" 
                  dataKey="categoryLabel" 
                  tick={{ fontSize: 12 }}
                  width={80}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  dataKey="minSalary" 
                  name={language === 'ta' ? 'குறைந்தபட்சம் (₹K)' : 'Minimum (₹K)'}
                  radius={[0, 4, 4, 0]}
                >
                  {salaryData.map((entry, index) => (
                    <Cell key={index} fill={`${entry.color}80`} />
                  ))}
                </Bar>
                <Bar 
                  dataKey="maxSalary" 
                  name={language === 'ta' ? 'அதிகபட்சம் (₹K)' : 'Maximum (₹K)'}
                  radius={[0, 4, 4, 0]}
                >
                  {salaryData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {salaryData.map((cat) => (
          <div
            key={cat.category}
            className="p-4 rounded-xl border-2 bg-white shadow-sm hover:shadow-md transition-shadow"
            style={{ borderColor: `${cat.color}40` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{cat.emoji}</span>
              <span className="font-semibold text-gray-800 text-sm">{cat.categoryLabel}</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">{language === 'ta' ? 'வரம்பு' : 'Range'}</span>
                <span className="font-medium" style={{ color: cat.color }}>
                  ₹{cat.minSalary}K - ₹{cat.maxSalary}K
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">{language === 'ta' ? 'சராசரி' : 'Avg'}</span>
                <span className="font-bold text-gray-700">₹{cat.avgSalary}K</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Paying Jobs */}
      <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50/50 to-yellow-50/50">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-3 text-lg">
            <div className="p-2 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-lg">
              <Award className="h-5 w-5 text-white" />
            </div>
            {language === 'ta' ? 'அதிக சம்பளம் பெறும் வேலைகள்' : 'Highest Paying Jobs'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topPayingJobs.map((job, index) => (
              <div
                key={job.id}
                className="flex items-center gap-4 p-3 rounded-lg bg-white border hover:shadow-md transition-shadow"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: categoryColors[job.category] }}
                >
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 text-sm truncate">
                    {language === 'ta' ? job.nameTamil : job.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {categoryInfo[job.category]?.emoji} {categoryLabels[job.category]?.[language === 'ta' ? 'ta' : 'en']}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600 text-sm">
                    ₹{Math.round(job.salaryMax / 1000)}K
                  </div>
                  <div className="text-xs text-gray-400">
                    {language === 'ta' ? 'அதிகபட்சம்' : 'max'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
