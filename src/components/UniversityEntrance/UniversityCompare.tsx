import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, Check, IndianRupee, Clock, FileText, GraduationCap, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { universities, University, Course } from '@/data/university-entrance-data';

export const UniversityCompare = () => {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const addUniversity = (id: string) => {
    if (!selectedIds.includes(id) && selectedIds.length < 4) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const removeUniversity = (id: string) => {
    setSelectedIds(selectedIds.filter(i => i !== id));
  };

  const selectedUniversities = universities.filter(u => selectedIds.includes(u.id));
  const availableUniversities = universities.filter(u => !selectedIds.includes(u.id));

  const getTotalCourses = (uni: University) => uni.courses.length;
  const getTotalPYQs = (uni: University) => uni.courses.reduce((acc, c) => acc + c.previousQuestions.length, 0);
  const getExamModes = (uni: University) => [...new Set(uni.courses.map(c => c.examPattern.mode))].join(', ');
  const getCourseTypes = (uni: University) => [...new Set(uni.courses.map(c => c.type))];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/career-assessment/colleges')}
          className="gap-2 -ml-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center justify-center gap-2">
            <Scale className="h-7 w-7 text-emerald-600" />
            Compare TN Universities
          </h1>
          <p className="text-muted-foreground font-tamil mt-1">
            பல்கலைக்கழகங்களை ஒப்பிடுக
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Compare fees, exam patterns, and courses side-by-side (max 4)
          </p>
        </div>

        {/* University Selector */}
        <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">Add University:</span>
              <Select onValueChange={addUniversity} value="">
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select university to compare" />
                </SelectTrigger>
                <SelectContent>
                  {availableUniversities.map(uni => (
                    <SelectItem key={uni.id} value={uni.id}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-sm flex items-center justify-center text-white text-[8px] font-bold"
                          style={{ backgroundColor: uni.logoColor }}
                        >
                          {uni.name.charAt(0)}
                        </div>
                        {uni.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Selected badges */}
              <div className="flex flex-wrap gap-2">
                {selectedUniversities.map(uni => (
                  <Badge 
                    key={uni.id}
                    className="px-3 py-1.5 text-white gap-2"
                    style={{ backgroundColor: uni.logoColor }}
                  >
                    {uni.name.split(' ').slice(0, 2).join(' ')}
                    <button 
                      onClick={() => removeUniversity(uni.id)}
                      className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comparison Table */}
        {selectedUniversities.length > 0 ? (
          <ScrollArea className="w-full">
            <div className="min-w-[600px]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800">
                    <th className="p-4 text-left font-semibold text-muted-foreground w-[180px] sticky left-0 bg-slate-50 dark:bg-slate-800 z-10">
                      Criteria
                    </th>
                    {selectedUniversities.map(uni => (
                      <th key={uni.id} className="p-4 text-center min-w-[200px]">
                        <div className="flex flex-col items-center gap-2">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                            style={{ backgroundColor: uni.logoColor }}
                          >
                            {uni.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                          </div>
                          <span className="font-semibold text-foreground text-sm">{uni.name}</span>
                          <span className="text-xs text-muted-foreground font-tamil">{uni.nameTamil}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Location */}
                  <tr className="border-b border-slate-100 dark:border-slate-700">
                    <td className="p-4 font-medium text-muted-foreground sticky left-0 bg-white dark:bg-slate-900">
                      📍 Location
                    </td>
                    {selectedUniversities.map(uni => (
                      <td key={uni.id} className="p-4 text-center text-foreground">
                        {uni.location}
                      </td>
                    ))}
                  </tr>

                  {/* Exam Name */}
                  <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                    <td className="p-4 font-medium text-muted-foreground sticky left-0 bg-slate-50/50 dark:bg-slate-800/50">
                      📝 Entrance Exam
                    </td>
                    {selectedUniversities.map(uni => (
                      <td key={uni.id} className="p-4 text-center">
                        <Badge className="bg-[#6a0dad] text-white">{uni.examName}</Badge>
                      </td>
                    ))}
                  </tr>

                  {/* Application Fee */}
                  <tr className="border-b border-slate-100 dark:border-slate-700">
                    <td className="p-4 font-medium text-muted-foreground sticky left-0 bg-white dark:bg-slate-900">
                      <div className="flex items-center gap-2">
                        <IndianRupee className="h-4 w-4" />
                        Application Fee (General)
                      </div>
                    </td>
                    {selectedUniversities.map(uni => (
                      <td key={uni.id} className="p-4 text-center">
                        <span className="text-xl font-bold text-amber-600">₹{uni.fee.general}</span>
                      </td>
                    ))}
                  </tr>

                  {/* SC/ST Fee */}
                  <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                    <td className="p-4 font-medium text-muted-foreground sticky left-0 bg-slate-50/50 dark:bg-slate-800/50">
                      <div className="flex items-center gap-2">
                        <IndianRupee className="h-4 w-4" />
                        Application Fee (SC/ST)
                      </div>
                    </td>
                    {selectedUniversities.map(uni => (
                      <td key={uni.id} className="p-4 text-center">
                        <span className="text-xl font-bold text-green-600">₹{uni.fee.scst}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Courses Available */}
                  <tr className="border-b border-slate-100 dark:border-slate-700">
                    <td className="p-4 font-medium text-muted-foreground sticky left-0 bg-white dark:bg-slate-900">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        Courses Available
                      </div>
                    </td>
                    {selectedUniversities.map(uni => (
                      <td key={uni.id} className="p-4 text-center">
                        <span className="text-2xl font-bold text-foreground">{getTotalCourses(uni)}</span>
                        <div className="flex justify-center gap-1 mt-1">
                          {getCourseTypes(uni).map(type => (
                            <Badge key={type} variant="outline" className="text-xs">{type}</Badge>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Courses List */}
                  <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                    <td className="p-4 font-medium text-muted-foreground sticky left-0 bg-slate-50/50 dark:bg-slate-800/50">
                      📚 Courses
                    </td>
                    {selectedUniversities.map(uni => (
                      <td key={uni.id} className="p-4">
                        <div className="flex flex-wrap justify-center gap-1">
                          {uni.courses.map(course => (
                            <Badge 
                              key={course.id} 
                              variant="secondary" 
                              className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                              onClick={() => navigate(`/tn-university-entrance/${uni.id}/${course.id}`)}
                            >
                              {course.name}
                            </Badge>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Exam Mode */}
                  <tr className="border-b border-slate-100 dark:border-slate-700">
                    <td className="p-4 font-medium text-muted-foreground sticky left-0 bg-white dark:bg-slate-900">
                      💻 Exam Mode
                    </td>
                    {selectedUniversities.map(uni => (
                      <td key={uni.id} className="p-4 text-center text-sm text-foreground">
                        {getExamModes(uni)}
                      </td>
                    ))}
                  </tr>

                  {/* Duration */}
                  <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                    <td className="p-4 font-medium text-muted-foreground sticky left-0 bg-slate-50/50 dark:bg-slate-800/50">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Duration
                      </div>
                    </td>
                    {selectedUniversities.map(uni => (
                      <td key={uni.id} className="p-4 text-center text-foreground">
                        {uni.courses[0]?.examPattern.duration || 'Varies'}
                      </td>
                    ))}
                  </tr>

                  {/* Negative Marking */}
                  <tr className="border-b border-slate-100 dark:border-slate-700">
                    <td className="p-4 font-medium text-muted-foreground sticky left-0 bg-white dark:bg-slate-900">
                      ❌ Negative Marking
                    </td>
                    {selectedUniversities.map(uni => {
                      const hasNegative = uni.courses.some(c => c.examPattern.negativeMarking);
                      return (
                        <td key={uni.id} className="p-4 text-center">
                          {hasNegative ? (
                            <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                              Yes
                            </Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                              No
                            </Badge>
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Total PYQs */}
                  <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                    <td className="p-4 font-medium text-muted-foreground sticky left-0 bg-slate-50/50 dark:bg-slate-800/50">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        PYQs Available
                      </div>
                    </td>
                    {selectedUniversities.map(uni => (
                      <td key={uni.id} className="p-4 text-center">
                        <span className="text-xl font-bold text-blue-600">{getTotalPYQs(uni)}</span>
                        <p className="text-xs text-muted-foreground">questions</p>
                      </td>
                    ))}
                  </tr>

                  {/* Website */}
                  <tr className="border-b border-slate-100 dark:border-slate-700">
                    <td className="p-4 font-medium text-muted-foreground sticky left-0 bg-white dark:bg-slate-900">
                      🌐 Website
                    </td>
                    {selectedUniversities.map(uni => (
                      <td key={uni.id} className="p-4 text-center">
                        <a 
                          href={`https://${uni.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm"
                        >
                          {uni.website}
                        </a>
                      </td>
                    ))}
                  </tr>

                  {/* Next Important Date */}
                  <tr className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
                    <td className="p-4 font-medium text-muted-foreground sticky left-0 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
                      📅 Next Important Date
                    </td>
                    {selectedUniversities.map(uni => {
                      const upcomingDate = uni.importantDates.find(d => d.status === 'upcoming');
                      return (
                        <td key={uni.id} className="p-4 text-center">
                          {upcomingDate ? (
                            <div>
                              <p className="font-semibold text-foreground">{upcomingDate.event}</p>
                              <p className="text-sm text-muted-foreground">{upcomingDate.date}</p>
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-sm">Check website</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  {/* View Details */}
                  <tr>
                    <td className="p-4 sticky left-0 bg-white dark:bg-slate-900"></td>
                    {selectedUniversities.map(uni => (
                      <td key={uni.id} className="p-4 text-center">
                        <Button
                          onClick={() => navigate(`/tn-university-entrance/${uni.id}`)}
                          className="bg-[#6a0dad] hover:bg-[#5a0b9d] text-white"
                        >
                          View Details
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <Card className="bg-slate-50 dark:bg-slate-800/50 border-dashed border-2 rounded-2xl">
            <CardContent className="p-12 text-center">
              <Plus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Universities Selected</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Select up to 4 universities from the dropdown above to compare
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {universities.slice(0, 3).map(uni => (
                  <Button
                    key={uni.id}
                    variant="outline"
                    size="sm"
                    onClick={() => addUniversity(uni.id)}
                    className="gap-2"
                  >
                    <div 
                      className="w-4 h-4 rounded-sm"
                      style={{ backgroundColor: uni.logoColor }}
                    />
                    {uni.name.split(' ').slice(0, 2).join(' ')}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Compare Cards for Mobile */}
        {selectedUniversities.length > 0 && (
          <div className="md:hidden space-y-4">
            <h3 className="font-semibold text-foreground">Quick Overview</h3>
            {selectedUniversities.map(uni => (
              <Card 
                key={uni.id}
                className="border rounded-2xl overflow-hidden"
                style={{ borderLeftColor: uni.logoColor, borderLeftWidth: '4px' }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: uni.logoColor }}
                    >
                      {uni.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{uni.name}</h4>
                      <p className="text-xs text-muted-foreground">{uni.location}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Exam</p>
                      <p className="font-medium text-foreground">{uni.examName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Fee</p>
                      <p className="font-medium text-amber-600">₹{uni.fee.general}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Courses</p>
                      <p className="font-medium text-foreground">{getTotalCourses(uni)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">PYQs</p>
                      <p className="font-medium text-blue-600">{getTotalPYQs(uni)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
