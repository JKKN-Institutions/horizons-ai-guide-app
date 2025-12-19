import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { EntranceExam } from './types';
import { entranceExams, examCategories } from './examData';
import { 
  X, 
  Scale, 
  Calendar, 
  IndianRupee, 
  Users, 
  Clock,
  Building2,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ExamCompareProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExamCompare = ({ isOpen, onClose }: ExamCompareProps) => {
  const [selectedExams, setSelectedExams] = useState<string[]>([]);

  const toggleExam = (examId: string) => {
    if (selectedExams.includes(examId)) {
      setSelectedExams(selectedExams.filter(id => id !== examId));
    } else if (selectedExams.length < 4) {
      setSelectedExams([...selectedExams, examId]);
    }
  };

  const selectedExamData = entranceExams.filter(exam => selectedExams.includes(exam.id));
  const getCategoryInfo = (category: string) => examCategories.find(c => c.id === category);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden bg-white">
        <CardHeader className="bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] text-white flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <Scale className="h-6 w-6" />
            <CardTitle className="text-xl">Compare Entrance Exams</CardTitle>
            <Badge className="bg-white/20 text-white">
              {selectedExams.length}/4 selected
            </Badge>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>

        <CardContent className="p-0">
          <div className="flex h-[calc(90vh-80px)]">
            {/* Exam Selection Panel */}
            <div className="w-72 border-r border-[#E8F5E9] bg-[#F9FBF9]">
              <div className="p-4 border-b border-[#E8F5E9]">
                <p className="text-sm font-semibold text-[#1B5E20]">Select up to 4 exams to compare</p>
              </div>
              <ScrollArea className="h-[calc(90vh-140px)]">
                <div className="p-3 space-y-2">
                  {entranceExams.map(exam => {
                    const isSelected = selectedExams.includes(exam.id);
                    const catInfo = getCategoryInfo(exam.category);
                    return (
                      <div
                        key={exam.id}
                        onClick={() => toggleExam(exam.id)}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border",
                          isSelected 
                            ? "bg-[#E8F5E9] border-[#2E7D32]" 
                            : "bg-white border-[#E8F5E9] hover:border-[#C8E6C9]"
                        )}
                      >
                        <Checkbox checked={isSelected} className="border-[#2E7D32] data-[state=checked]:bg-[#2E7D32]" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-[#1F2937] truncate">{exam.name}</p>
                          <Badge className={cn("text-[10px] mt-1", catInfo?.bgColor, catInfo?.color)}>
                            {catInfo?.icon} {catInfo?.label}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>

            {/* Comparison Table */}
            <div className="flex-1 overflow-auto">
              {selectedExamData.length === 0 ? (
                <div className="flex items-center justify-center h-full text-center p-8">
                  <div>
                    <Scale className="h-16 w-16 mx-auto text-[#C8E6C9] mb-4" />
                    <p className="text-lg font-semibold text-[#1B5E20]">Select exams to compare</p>
                    <p className="text-sm text-[#6B7280] mt-2">Choose up to 4 exams from the left panel</p>
                  </div>
                </div>
              ) : (
                <div className="p-4">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-[#E8F5E9]">
                          <th className="p-3 text-left text-sm font-semibold text-[#1B5E20] w-40 sticky left-0 bg-[#E8F5E9]">
                            Criteria
                          </th>
                          {selectedExamData.map(exam => (
                            <th key={exam.id} className="p-3 text-center min-w-52">
                              <div className="flex flex-col items-center gap-2">
                                <span className="font-bold text-[#1B5E20]">{exam.name}</span>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 text-xs text-[#D32F2F] hover:bg-[#FFEBEE]"
                                  onClick={() => toggleExam(exam.id)}
                                >
                                  <X className="h-3 w-3 mr-1" /> Remove
                                </Button>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8F5E9]">
                        {/* Full Form */}
                        <tr className="hover:bg-[#F9FBF9]">
                          <td className="p-3 font-medium text-sm text-[#374151] sticky left-0 bg-white">
                            <FileText className="h-4 w-4 inline mr-2 text-[#2E7D32]" />
                            Full Form
                          </td>
                          {selectedExamData.map(exam => (
                            <td key={exam.id} className="p-3 text-center text-sm text-[#4B5563]">
                              {exam.fullForm}
                            </td>
                          ))}
                        </tr>

                        {/* Conducting Body */}
                        <tr className="hover:bg-[#F9FBF9]">
                          <td className="p-3 font-medium text-sm text-[#374151] sticky left-0 bg-white">
                            <Building2 className="h-4 w-4 inline mr-2 text-[#2E7D32]" />
                            Conducting Body
                          </td>
                          {selectedExamData.map(exam => (
                            <td key={exam.id} className="p-3 text-center text-sm text-[#4B5563]">
                              {exam.conductingBody}
                            </td>
                          ))}
                        </tr>

                        {/* Exam Mode */}
                        <tr className="hover:bg-[#F9FBF9]">
                          <td className="p-3 font-medium text-sm text-[#374151] sticky left-0 bg-white">
                            <FileText className="h-4 w-4 inline mr-2 text-[#1976D2]" />
                            Exam Mode
                          </td>
                          {selectedExamData.map(exam => (
                            <td key={exam.id} className="p-3 text-center text-sm text-[#4B5563]">
                              {exam.examMode}
                            </td>
                          ))}
                        </tr>

                        {/* Duration */}
                        <tr className="hover:bg-[#F9FBF9]">
                          <td className="p-3 font-medium text-sm text-[#374151] sticky left-0 bg-white">
                            <Clock className="h-4 w-4 inline mr-2 text-[#F59E0B]" />
                            Duration
                          </td>
                          {selectedExamData.map(exam => (
                            <td key={exam.id} className="p-3 text-center text-sm font-medium text-[#1F2937]">
                              {exam.duration}
                            </td>
                          ))}
                        </tr>

                        {/* Eligibility */}
                        <tr className="hover:bg-[#F9FBF9]">
                          <td className="p-3 font-medium text-sm text-[#374151] sticky left-0 bg-white">
                            <Users className="h-4 w-4 inline mr-2 text-[#7B1FA2]" />
                            Eligibility
                          </td>
                          {selectedExamData.map(exam => (
                            <td key={exam.id} className="p-3 text-center">
                              <ul className="text-xs text-[#4B5563] space-y-1">
                                {exam.eligibility.map((e, i) => (
                                  <li key={i} className="flex items-start gap-1 text-left">
                                    <span className="text-[#2E7D32]">✓</span> {e}
                                  </li>
                                ))}
                              </ul>
                            </td>
                          ))}
                        </tr>

                        {/* Registration Date */}
                        <tr className="hover:bg-[#F9FBF9]">
                          <td className="p-3 font-medium text-sm text-[#374151] sticky left-0 bg-white">
                            <Calendar className="h-4 w-4 inline mr-2 text-[#1976D2]" />
                            Registration
                          </td>
                          {selectedExamData.map(exam => (
                            <td key={exam.id} className="p-3 text-center text-sm font-medium text-[#1976D2]">
                              {exam.importantDates.registration}
                            </td>
                          ))}
                        </tr>

                        {/* Exam Date */}
                        <tr className="hover:bg-[#F9FBF9]">
                          <td className="p-3 font-medium text-sm text-[#374151] sticky left-0 bg-white">
                            <Calendar className="h-4 w-4 inline mr-2 text-[#D32F2F]" />
                            Exam Date
                          </td>
                          {selectedExamData.map(exam => (
                            <td key={exam.id} className="p-3 text-center text-sm font-medium text-[#D32F2F]">
                              {exam.importantDates.examDate}
                            </td>
                          ))}
                        </tr>

                        {/* Result Date */}
                        <tr className="hover:bg-[#F9FBF9]">
                          <td className="p-3 font-medium text-sm text-[#374151] sticky left-0 bg-white">
                            <Calendar className="h-4 w-4 inline mr-2 text-[#2E7D32]" />
                            Result Date
                          </td>
                          {selectedExamData.map(exam => (
                            <td key={exam.id} className="p-3 text-center text-sm font-medium text-[#2E7D32]">
                              {exam.importantDates.resultDate}
                            </td>
                          ))}
                        </tr>

                        {/* Application Fee */}
                        <tr className="hover:bg-[#F9FBF9]">
                          <td className="p-3 font-medium text-sm text-[#374151] sticky left-0 bg-white">
                            <IndianRupee className="h-4 w-4 inline mr-2 text-[#7B1FA2]" />
                            Fee (General)
                          </td>
                          {selectedExamData.map(exam => (
                            <td key={exam.id} className="p-3 text-center text-sm font-bold text-[#7B1FA2]">
                              {exam.applicationFee.general}
                            </td>
                          ))}
                        </tr>

                        {/* SC/ST Fee */}
                        <tr className="hover:bg-[#F9FBF9]">
                          <td className="p-3 font-medium text-sm text-[#374151] sticky left-0 bg-white">
                            <IndianRupee className="h-4 w-4 inline mr-2 text-[#2E7D32]" />
                            Fee (SC/ST)
                          </td>
                          {selectedExamData.map(exam => (
                            <td key={exam.id} className="p-3 text-center text-sm font-bold text-[#2E7D32]">
                              {exam.applicationFee.scst}
                            </td>
                          ))}
                        </tr>

                        {/* Colleges */}
                        <tr className="hover:bg-[#F9FBF9]">
                          <td className="p-3 font-medium text-sm text-[#374151] sticky left-0 bg-white">
                            <Building2 className="h-4 w-4 inline mr-2 text-[#1B5E20]" />
                            Colleges Accepting
                          </td>
                          {selectedExamData.map(exam => (
                            <td key={exam.id} className="p-3 text-center">
                              <div className="flex flex-wrap gap-1 justify-center">
                                {exam.collegesAccepting.slice(0, 3).map((c, i) => (
                                  <Badge key={i} variant="outline" className="text-[10px] bg-[#E8F5E9] text-[#2E7D32]">
                                    {c}
                                  </Badge>
                                ))}
                                {exam.collegesAccepting.length > 3 && (
                                  <Badge variant="outline" className="text-[10px] bg-white text-[#2E7D32]">
                                    +{exam.collegesAccepting.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
