import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, GraduationCap, ArrowDown, CheckCircle2, AlertCircle, School, Trophy, BookOpen, Target } from 'lucide-react';

export const JeeTneaGuide = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white rounded-2xl overflow-hidden mb-6 shadow-sm">
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left"
      >
        <div className="p-4 md:p-5 flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-md">
            <Target className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base md:text-lg text-gray-800">
              JEE vs TNEA — Which Path is Right for You?
            </h3>
            <p className="text-xs md:text-sm text-gray-500 mt-0.5">
              ஜேஇஇ vs டிஎன்இஏ — எது சரி? • Complete guide for TN 12th students
            </p>
          </div>
          <div className="flex-shrink-0">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <Badge className="bg-blue-100 text-blue-700 text-xs border-0">Read Guide</Badge>
            )}
          </div>
        </div>
      </button>

      {/* Expandable Content */}
      {isExpanded && (
        <CardContent className="px-4 md:px-5 pb-5 pt-0 space-y-5">
          {/* What is JEE */}
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-3">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              What is JEE? (ஜேஇஇ என்றால் என்ன?)
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              JEE is a national-level engineering entrance exam for admission into India's top colleges — IITs, NITs, and IIITs. Students who studied Physics, Chemistry, and Mathematics (PCM) in 12th can apply.
            </p>

            {/* Two types */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                <div className="font-semibold text-orange-800 text-sm mb-1">1️⃣ JEE Main</div>
                <p className="text-xs text-orange-700">First level exam. For NIT, IIIT, CFTI admission. Also qualifies you for JEE Advanced.</p>
                <div className="mt-2 text-xs text-orange-600">
                  • 2 times/year (Jan & Apr) • CBT mode • 10–12 lakh students write this
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                <div className="font-semibold text-purple-800 text-sm mb-1">2️⃣ JEE Advanced</div>
                <p className="text-xs text-purple-700">Second level exam. Only for IIT admission. Much harder than JEE Main.</p>
                <div className="mt-2 text-xs text-purple-600">
                  • Once/year • Only top 2.5 lakh from Main can write • 23 IITs in India
                </div>
              </div>
            </div>
          </div>

          {/* Simple Flow */}
          <div className="bg-gradient-to-b from-emerald-50 to-white rounded-xl p-4 border border-emerald-100">
            <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-3">
              <ArrowDown className="w-4 h-4 text-emerald-600" />
              Simple Flow for a TN 12th Student
            </h4>
            <div className="flex flex-col items-center gap-1">
              {[
                { step: 'Step 1', text: 'Write JEE Main', color: 'bg-blue-500' },
                { step: 'Step 2', text: 'Good rank? → Eligible for JEE Advanced', color: 'bg-orange-500' },
                { step: 'Step 3', text: 'Write JEE Advanced', color: 'bg-purple-500' },
                { step: 'Step 4', text: 'Get admission in IIT! 🎉', color: 'bg-emerald-500' },
              ].map((item, i) => (
                <div key={i} className="w-full">
                  <div className={`${item.color} text-white rounded-lg px-4 py-2.5 text-center text-sm font-medium`}>
                    <span className="font-bold">{item.step}:</span> {item.text}
                  </div>
                  {i < 3 && <div className="text-center text-gray-300 text-lg">⬇</div>}
                </div>
              ))}
            </div>
          </div>

          {/* JEE vs TNEA Comparison */}
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              JEE vs TNEA — Comparison (ஒப்பீடு)
            </h4>
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-2.5 font-semibold text-gray-700 rounded-tl-lg">Feature</th>
                    <th className="text-center p-2.5 font-semibold text-blue-700 bg-blue-50">JEE</th>
                    <th className="text-center p-2.5 font-semibold text-emerald-700 bg-emerald-50 rounded-tr-lg">TNEA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { feature: 'Full Form', jee: 'Joint Entrance Examination', tnea: 'Tamil Nadu Engineering Admissions' },
                    { feature: 'Level', jee: 'National 🇮🇳', tnea: 'Tamil Nadu State' },
                    { feature: 'Entrance Exam?', jee: 'Yes (Written test)', tnea: 'No exam needed! ✅' },
                    { feature: 'Admission Based On', jee: 'JEE Score', tnea: '12th PCM Cutoff Marks' },
                    { feature: 'Colleges', jee: 'IIT, NIT, IIIT', tnea: 'Anna Univ affiliated colleges' },
                    { feature: 'Difficulty', jee: 'Very High 🔴', tnea: 'Moderate 🟡' },
                    { feature: 'No. of Students', jee: '10+ lakh write', tnea: '2+ lakh apply' },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? '' : 'bg-gray-50/50'}>
                      <td className="p-2.5 font-medium text-gray-700 text-xs">{row.feature}</td>
                      <td className="p-2.5 text-center text-xs text-blue-800 bg-blue-50/30">{row.jee}</td>
                      <td className="p-2.5 text-center text-xs text-emerald-800 bg-emerald-50/30">{row.tnea}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* TN Eligibility & Cutoff */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Eligibility */}
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
              <h4 className="font-bold text-gray-800 text-sm flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                JEE Eligibility for TN Students
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-700">
                <li className="flex items-start gap-1.5"><span className="text-emerald-500 mt-0.5">✅</span> Must complete 12th (HSC)</li>
                <li className="flex items-start gap-1.5"><span className="text-emerald-500 mt-0.5">✅</span> Must study PCM (Physics, Chemistry, Maths)</li>
                <li className="flex items-start gap-1.5"><span className="text-emerald-500 mt-0.5">✅</span> General: 75% minimum in 12th</li>
                <li className="flex items-start gap-1.5"><span className="text-emerald-500 mt-0.5">✅</span> SC/ST: 65% minimum in 12th</li>
                <li className="flex items-start gap-1.5"><span className="text-emerald-500 mt-0.5">✅</span> Can attempt for 3 years after 12th</li>
              </ul>
            </div>

            {/* JEE Main Cutoff Percentile */}
            <div className="bg-rose-50 rounded-xl p-4 border border-rose-100">
              <h4 className="font-bold text-gray-800 text-sm flex items-center gap-2 mb-2">
                <Trophy className="w-4 h-4 text-rose-600" />
                JEE Main Qualifying Cutoff
              </h4>
              <div className="space-y-1.5">
                {[
                  { cat: 'General', pct: '~90', color: 'text-red-700' },
                  { cat: 'EWS', pct: '~75', color: 'text-orange-700' },
                  { cat: 'OBC', pct: '~73', color: 'text-amber-700' },
                  { cat: 'SC', pct: '~51', color: 'text-blue-700' },
                  { cat: 'ST', pct: '~37', color: 'text-emerald-700' },
                ].map((row) => (
                  <div key={row.cat} className="flex justify-between items-center text-xs">
                    <span className="text-gray-700">{row.cat}</span>
                    <span className={`font-bold ${row.color}`}>{row.pct} percentile</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 mt-2">Only students above this cutoff can write JEE Advanced</p>
            </div>
          </div>

          {/* Top Colleges */}
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-3">
              <School className="w-4 h-4 text-violet-600" />
              Top Colleges You Can Get
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <div className="text-xs font-semibold text-purple-700 mb-1.5">Through JEE Advanced → IITs</div>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>🏛️ IIT Madras, Chennai (#1 in India)</li>
                  <li>🏛️ IIT Delhi</li>
                  <li>🏛️ IIT Bombay</li>
                  <li>🏛️ IIT Kanpur</li>
                  <li>🏛️ IIT Kharagpur</li>
                </ul>
              </div>
              <div>
                <div className="text-xs font-semibold text-blue-700 mb-1.5">Through JEE Main → NITs</div>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>🎓 NIT Tiruchirappalli (Top NIT)</li>
                  <li>🎓 NIT Surathkal</li>
                  <li>🎓 NIT Warangal</li>
                  <li>🎓 IIIT Hyderabad</li>
                  <li>🎓 IIIT Tiruchirappalli</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Real Example */}
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4 border border-emerald-200">
            <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-emerald-600" />
              Example: A 12th Student from Tamil Nadu
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              Suppose you finish 12th with PCM. You have <strong>two paths</strong>:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3 border border-blue-100">
                <div className="text-xs font-bold text-blue-700 mb-1">Option 1: JEE Path 🚀</div>
                <p className="text-xs text-gray-600">Write JEE Main → Score well → JEE Advanced → Get into IIT Madras, NIT Trichy</p>
                <div className="mt-1 text-[10px] text-blue-500">Best for: Students aiming for India's top colleges</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-emerald-100">
                <div className="text-xs font-bold text-emerald-700 mb-1">Option 2: TNEA Path 🎯</div>
                <p className="text-xs text-gray-600">Apply through TNEA → Based on 12th cutoff marks → PSG Tech, CIT, CEG, Kumaraguru</p>
                <div className="mt-1 text-[10px] text-emerald-500">Best for: Students who want TN colleges without entrance exam</div>
              </div>
            </div>
            <div className="mt-3 bg-amber-50 rounded-lg p-2.5 border border-amber-200">
              <p className="text-xs text-amber-800 font-medium">
                💡 Pro Tip: You can apply for BOTH! Write JEE and also register for TNEA. Keep both options open.
              </p>
            </div>
          </div>

          {/* Quick Summary */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 bg-blue-100 rounded-lg p-3 text-center">
              <div className="text-sm font-bold text-blue-800">JEE →</div>
              <div className="text-xs text-blue-600">India level top colleges (IIT / NIT)</div>
            </div>
            <div className="flex-1 bg-emerald-100 rounded-lg p-3 text-center">
              <div className="text-sm font-bold text-emerald-800">TNEA →</div>
              <div className="text-xs text-emerald-600">Tamil Nadu engineering colleges</div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
