import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FileText, CheckCircle, XCircle, Lightbulb, BookOpen, ArrowRight } from 'lucide-react';
import { sopTips } from './data';

export const SOPReviewTool = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <Card className="border-2 border-pink-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-pink-500" />
          SOP Writing Guide
        </CardTitle>
        <CardDescription>Create a compelling Statement of Purpose</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Word Count Guidelines */}
        <div className="bg-pink-50 rounded-xl p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-pink-500" />
            SOP Essentials
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div className="bg-white rounded-lg p-3">
              <div className="text-2xl font-bold text-pink-600">500-1000</div>
              <div className="text-xs text-gray-500">Words</div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="text-2xl font-bold text-pink-600">5-6</div>
              <div className="text-xs text-gray-500">Paragraphs</div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="text-2xl font-bold text-pink-600">1-2</div>
              <div className="text-xs text-gray-500">Pages</div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="text-2xl font-bold text-pink-600">Unique</div>
              <div className="text-xs text-gray-500">Per University</div>
            </div>
          </div>
        </div>

        {/* Section-by-Section Guide */}
        <Accordion type="single" collapsible className="w-full">
          {sopTips.map((section, index) => (
            <AccordionItem key={index} value={`section-${index}`}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold">
                    {index + 1}
                  </div>
                  <span className="font-semibold">{section.section}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-11">
                <div className="space-y-4">
                  <div className="flex items-start gap-2 bg-blue-50 p-3 rounded-lg">
                    <Lightbulb className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{section.tip}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-sm text-green-700 mb-2 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Do's
                      </h5>
                      <ul className="space-y-1">
                        {section.dos.map((item, i) => (
                          <li key={i} className="text-sm flex items-center gap-2 text-gray-600">
                            <ArrowRight className="w-3 h-3 text-green-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm text-red-700 mb-2 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Don'ts
                      </h5>
                      <ul className="space-y-1">
                        {section.donts.map((item, i) => (
                          <li key={i} className="text-sm flex items-center gap-2 text-gray-600">
                            <XCircle className="w-3 h-3 text-red-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Quick Tips */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4">
          <h4 className="font-semibold mb-3">✨ Quick Tips</h4>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="flex items-start gap-2 text-sm">
              <Badge variant="outline" className="mt-0.5">1</Badge>
              <span>Start writing 2-3 months before deadlines</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <Badge variant="outline" className="mt-0.5">2</Badge>
              <span>Get feedback from professors and peers</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <Badge variant="outline" className="mt-0.5">3</Badge>
              <span>Customize for each university (mention faculty, labs)</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <Badge variant="outline" className="mt-0.5">4</Badge>
              <span>Proofread multiple times for grammar errors</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
