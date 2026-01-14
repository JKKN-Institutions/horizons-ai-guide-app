import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { FileText, CheckCircle, AlertCircle, Lightbulb, Download } from 'lucide-react';
import { documentChecklist, countries } from './data';

export const DocumentChecklist = () => {
  const [selectedCountry, setSelectedCountry] = useState('usa');
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const countryDocs = documentChecklist[selectedCountry as keyof typeof documentChecklist] || [];
  const allDocs = [...documentChecklist.common, ...countryDocs];
  
  const requiredDocs = allDocs.filter(d => d.required);
  const completedRequired = requiredDocs.filter(d => checkedItems.has(d.id)).length;
  const progress = (completedRequired / requiredDocs.length) * 100;

  const toggleItem = (id: string) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const country = countries.find(c => c.id === selectedCountry);

  return (
    <Card className="border-2 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-purple-500" />
          Document Checklist
        </CardTitle>
        <CardDescription>Track your application documents</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Country Selector */}
        <div className="flex items-center gap-4">
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {countries.map(c => (
                <SelectItem key={c.id} value={c.id}>
                  {c.flag} {c.name.en}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex-1">
            <div className="flex items-center justify-between text-sm mb-1">
              <span>Progress</span>
              <span className="font-semibold">{completedRequired}/{requiredDocs.length} Required</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Common Documents */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Common Documents
          </h4>
          <div className="grid md:grid-cols-2 gap-3">
            {documentChecklist.common.map(doc => (
              <div 
                key={doc.id}
                className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                  checkedItems.has(doc.id) 
                    ? 'bg-green-50 border-green-300' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => toggleItem(doc.id)}
              >
                <div className="flex items-start gap-3">
                  <Checkbox checked={checkedItems.has(doc.id)} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{doc.name}</span>
                      {doc.required && (
                        <Badge variant="destructive" className="text-xs">Required</Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{doc.description}</p>
                    <div className="flex items-start gap-1 mt-2 text-xs text-amber-600 bg-amber-50 p-2 rounded">
                      <Lightbulb className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <span>{doc.tips}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Country-Specific Documents */}
        {countryDocs.length > 0 && (
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <span className="text-xl">{country?.flag}</span>
              {country?.name.en} Specific Documents
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              {countryDocs.map(doc => (
                <div 
                  key={doc.id}
                  className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                    checkedItems.has(doc.id) 
                      ? 'bg-green-50 border-green-300' 
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleItem(doc.id)}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox checked={checkedItems.has(doc.id)} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{doc.name}</span>
                        {doc.required && (
                          <Badge variant="destructive" className="text-xs">Required</Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{doc.description}</p>
                      <div className="flex items-start gap-1 mt-2 text-xs text-amber-600 bg-amber-50 p-2 rounded">
                        <Lightbulb className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <span>{doc.tips}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {progress === 100 && (
          <div className="bg-green-100 border-2 border-green-300 rounded-xl p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h4 className="font-bold text-green-800">All Required Documents Ready!</h4>
            <p className="text-sm text-green-600">You're ready to apply to universities in {country?.name.en}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
