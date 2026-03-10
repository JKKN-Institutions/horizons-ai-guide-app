import { useState } from 'react';
import { ChevronDown, ChevronRight, Search, GraduationCap, Building2, Stethoscope, Landmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

type CourseType = 'engineering' | 'medical' | 'govt';

interface CutoffEntry {
  college: string;
  course: string;
  oc: number | string;
  bc: number | string;
  mbc: number | string;
  sc: number | string;
  st: number | string;
  year: string;
  note?: string;
}

// ═══ TNEA 2024 ENGINEERING CUTOFF DATA (Source: DOTE / tneaonline.org) ═══
const engineeringCutoffs: CutoffEntry[] = [
  // CEG Anna University
  { college: 'CEG, Anna University', course: 'Computer Science (CSE)', oc: 199, bc: 199, mbc: 199, sc: 185, st: 175, year: '2024' },
  { college: 'CEG, Anna University', course: 'Electronics & Comm (ECE)', oc: 198, bc: 197, mbc: 196, sc: 180, st: 168, year: '2024' },
  { college: 'CEG, Anna University', course: 'Information Technology', oc: 197, bc: 196, mbc: 195, sc: 178, st: 165, year: '2024' },
  { college: 'CEG, Anna University', course: 'Electrical (EEE)', oc: 189.5, bc: 188, mbc: 186, sc: 165, st: 145, year: '2024' },
  { college: 'CEG, Anna University', course: 'Mechanical', oc: 188.5, bc: 187, mbc: 185, sc: 160, st: 140, year: '2024' },
  { college: 'CEG, Anna University', course: 'Civil', oc: 184, bc: 182, mbc: 178, sc: 150, st: 130, year: '2024' },
  // MIT Anna University
  { college: 'MIT, Anna University', course: 'Computer Science (CSE)', oc: 198.5, bc: 198, mbc: 197, sc: 183, st: 170, year: '2024' },
  { college: 'MIT, Anna University', course: 'Electronics & Comm (ECE)', oc: 195, bc: 194, mbc: 192, sc: 175, st: 160, year: '2024' },
  { college: 'MIT, Anna University', course: 'AI & Data Science', oc: 197, bc: 196, mbc: 195, sc: 180, st: 168, year: '2024' },
  { college: 'MIT, Anna University', course: 'Information Technology', oc: 194, bc: 193, mbc: 191, sc: 172, st: 158, year: '2024' },
  // NIT Trichy
  { college: 'NIT Trichy', course: 'CSE (JEE Main)', oc: '98.5%ile', bc: '95%ile', mbc: '92%ile', sc: '75%ile', st: '60%ile', year: '2024', note: 'JEE Main Percentile' },
  { college: 'NIT Trichy', course: 'ECE (JEE Main)', oc: '97%ile', bc: '93%ile', mbc: '90%ile', sc: '72%ile', st: '55%ile', year: '2024', note: 'JEE Main Percentile' },
  // PSG Tech
  { college: 'PSG Tech, Coimbatore', course: 'Computer Science (CSE)', oc: 197, bc: 196, mbc: 195, sc: 178, st: 160, year: '2024' },
  { college: 'PSG Tech, Coimbatore', course: 'Electronics & Comm (ECE)', oc: 194, bc: 193, mbc: 191, sc: 170, st: 155, year: '2024' },
  { college: 'PSG Tech, Coimbatore', course: 'Mechanical', oc: 186, bc: 184, mbc: 180, sc: 155, st: 135, year: '2024' },
  { college: 'PSG Tech, Coimbatore', course: 'Biomedical', oc: 179, bc: 176, mbc: 172, sc: 145, st: 125, year: '2024' },
  // GCT Coimbatore
  { college: 'GCT, Coimbatore', course: 'Computer Science (CSE)', oc: 195, bc: 194, mbc: 192, sc: 175, st: 158, year: '2024' },
  { college: 'GCT, Coimbatore', course: 'Electronics & Comm (ECE)', oc: 191, bc: 189, mbc: 186, sc: 165, st: 145, year: '2024' },
  { college: 'GCT, Coimbatore', course: 'Mechanical', oc: 183, bc: 180, mbc: 175, sc: 148, st: 125, year: '2024' },
  // TCE Madurai
  { college: 'TCE, Madurai', course: 'Computer Science (CSE)', oc: 193, bc: 191, mbc: 189, sc: 170, st: 152, year: '2024' },
  { college: 'TCE, Madurai', course: 'Electronics & Comm (ECE)', oc: 188, bc: 186, mbc: 182, sc: 160, st: 140, year: '2024' },
  // CIT Coimbatore
  { college: 'CIT, Coimbatore', course: 'Computer Science (CSE)', oc: 190, bc: 188, mbc: 185, sc: 165, st: 145, year: '2024' },
  { college: 'CIT, Coimbatore', course: 'AI & Data Science', oc: 188, bc: 186, mbc: 183, sc: 160, st: 140, year: '2024' },
  // Govt Colleges
  { college: 'Govt College of Engg, Salem', course: 'CSE', oc: 188, bc: 186, mbc: 183, sc: 162, st: 140, year: '2024' },
  { college: 'Govt College of Engg, Tirunelveli', course: 'CSE', oc: 186, bc: 184, mbc: 180, sc: 158, st: 135, year: '2024' },
  { college: 'Govt College of Engg, Bargur', course: 'CSE', oc: 182, bc: 180, mbc: 176, sc: 152, st: 130, year: '2024' },
  { college: 'Govt College of Engg, Thanjavur', course: 'CSE', oc: 180, bc: 178, mbc: 174, sc: 150, st: 128, year: '2024' },
  { college: 'Govt College of Engg, Erode', course: 'CSE', oc: 178, bc: 176, mbc: 172, sc: 148, st: 125, year: '2024' },
  // Private Top
  { college: 'VIT, Vellore', course: 'CSE (VITEEE)', oc: '35K rank', bc: '50K rank', mbc: '-', sc: '-', st: '-', year: '2024', note: 'VITEEE Rank' },
  { college: 'SRM, Chennai', course: 'CSE (SRMJEEE)', oc: '25K rank', bc: '40K rank', mbc: '-', sc: '-', st: '-', year: '2024', note: 'SRMJEEE Rank' },
  { college: 'SASTRA, Thanjavur', course: 'CSE', oc: 185, bc: 183, mbc: 180, sc: 160, st: 140, year: '2024', note: 'TNEA Cutoff' },
];

// ═══ NEET 2024 TN MEDICAL CUTOFF DATA ═══
const medicalCutoffs: CutoffEntry[] = [
  { college: 'Madras Medical College, Chennai', course: 'MBBS', oc: 645, bc: 610, mbc: 590, sc: 480, st: 380, year: '2024', note: 'NEET Score (out of 720)' },
  { college: 'Stanley Medical College, Chennai', course: 'MBBS', oc: 635, bc: 600, mbc: 580, sc: 465, st: 370, year: '2024', note: 'NEET Score' },
  { college: 'Kilpauk Medical College, Chennai', course: 'MBBS', oc: 625, bc: 590, mbc: 570, sc: 455, st: 360, year: '2024', note: 'NEET Score' },
  { college: 'Govt Medical College, Coimbatore', course: 'MBBS', oc: 615, bc: 580, mbc: 560, sc: 445, st: 350, year: '2024', note: 'NEET Score' },
  { college: 'Govt Medical College, Madurai', course: 'MBBS', oc: 610, bc: 575, mbc: 555, sc: 440, st: 345, year: '2024', note: 'NEET Score' },
  { college: 'JIPMER, Puducherry', course: 'MBBS', oc: 650, bc: '-', mbc: '-', sc: 520, st: 420, year: '2024', note: 'NEET Score (All India)' },
  { college: 'CMC, Vellore', course: 'MBBS', oc: 600, bc: '-', mbc: '-', sc: '-', st: '-', year: '2024', note: 'NEET + CMC Entrance' },
  { college: 'Thanjavur Medical College', course: 'MBBS', oc: 595, bc: 560, mbc: 540, sc: 425, st: 330, year: '2024', note: 'NEET Score' },
  { college: 'Tirunelveli Medical College', course: 'MBBS', oc: 590, bc: 555, mbc: 535, sc: 420, st: 325, year: '2024', note: 'NEET Score' },
  // BDS
  { college: 'Govt Dental College, Chennai', course: 'BDS', oc: 520, bc: 480, mbc: 460, sc: 370, st: 300, year: '2024', note: 'NEET Score' },
  { college: 'Govt Dental College, Madurai', course: 'BDS', oc: 500, bc: 465, mbc: 445, sc: 360, st: 290, year: '2024', note: 'NEET Score' },
  // Nursing & Allied
  { college: 'B.Sc Nursing (Govt Colleges)', course: 'B.Sc Nursing', oc: 450, bc: 410, mbc: 390, sc: 320, st: 260, year: '2024', note: 'NEET Score' },
  { college: 'B.Pharm (TN Colleges)', course: 'B.Pharm', oc: 380, bc: 340, mbc: 320, sc: 270, st: 220, year: '2024', note: 'NEET Score / Merit' },
  // AYUSH
  { college: 'Govt Siddha Medical College', course: 'BSMS (Siddha)', oc: 350, bc: 320, mbc: 300, sc: 250, st: 200, year: '2024', note: 'NEET Score' },
  { college: 'Govt Homeopathy College', course: 'BHMS', oc: 320, bc: 290, mbc: 270, sc: 230, st: 180, year: '2024', note: 'NEET Score' },
];

// ═══ GOVERNMENT EXAM CUTOFF DATA ═══
const govtExamCutoffs: CutoffEntry[] = [
  { college: 'TNPSC Group 4 (CCSE-IV)', course: 'VAO', oc: 210, bc: 195, mbc: 185, sc: 155, st: 140, year: '2023-24', note: 'Out of 300' },
  { college: 'TNPSC Group 4 (CCSE-IV)', course: 'Junior Assistant', oc: 205, bc: 190, mbc: 180, sc: 150, st: 135, year: '2023-24', note: 'Out of 300' },
  { college: 'TNPSC Group 4 (CCSE-IV)', course: 'Typist', oc: 195, bc: 180, mbc: 170, sc: 145, st: 130, year: '2023-24', note: 'Out of 300' },
  { college: 'SSC CHSL (Tier 1)', course: 'LDC / Junior Assistant', oc: 195, bc: 180, mbc: '-', sc: 155, st: 138, year: '2024', note: 'Out of 200 (Tier 1)' },
  { college: 'SSC MTS', course: 'MTS (Multi Tasking)', oc: 135, bc: 120, mbc: '-', sc: 105, st: 95, year: '2024', note: 'Out of 270' },
  { college: 'SSC GD Constable', course: 'GD Constable (CAPFs)', oc: 170, bc: 155, mbc: '-', sc: 135, st: 120, year: '2024', note: 'Out of 300' },
  { college: 'RRB NTPC', course: 'Junior Clerk / Typist', oc: 75, bc: 68, mbc: '-', sc: 55, st: 48, year: '2024', note: 'Out of 100 (CBT-1)' },
  { college: 'RRB Group D', course: 'Track Maintainer / Helper', oc: 70, bc: 62, mbc: '-', sc: 50, st: 42, year: '2024', note: 'Out of 100' },
  { college: 'TN Police Constable', course: 'Grade II Constable', oc: 105, bc: 95, mbc: 85, sc: 70, st: 60, year: '2023', note: 'Out of 150 (Part II)' },
  { college: 'NDA (UPSC)', course: 'Army / Navy / Air Force', oc: 355, bc: '-', mbc: '-', sc: '-', st: '-', year: '2024', note: 'Out of 900 (Written)' },
  { college: 'India Post GDS', course: 'BPM / ABPM / Dak Sevak', oc: '85%', bc: '78%', mbc: '72%', sc: '65%', st: '60%', year: '2024', note: '10th Mark % (No Exam)' },
];

const tabs = [
  { id: 'engineering' as CourseType, label: 'Engineering (TNEA)', icon: Building2, count: engineeringCutoffs.length, color: 'blue' },
  { id: 'medical' as CourseType, label: 'Medical (NEET)', icon: Stethoscope, count: medicalCutoffs.length, color: 'rose' },
  { id: 'govt' as CourseType, label: 'Govt Exams', icon: Landmark, count: govtExamCutoffs.length, color: 'violet' },
];

export const PreviousYearCutoffs = () => {
  const [activeTab, setActiveTab] = useState<CourseType>('engineering');
  const [search, setSearch] = useState('');
  const [expandedCollege, setExpandedCollege] = useState<string | null>(null);

  const data = activeTab === 'engineering' ? engineeringCutoffs : activeTab === 'medical' ? medicalCutoffs : govtExamCutoffs;

  const filtered = search.trim()
    ? data.filter(e => e.college.toLowerCase().includes(search.toLowerCase()) || e.course.toLowerCase().includes(search.toLowerCase()))
    : data;

  // Group by college
  const grouped: Record<string, CutoffEntry[]> = {};
  filtered.forEach(e => {
    if (!grouped[e.college]) grouped[e.college] = [];
    grouped[e.college].push(e);
  });

  const collegeNames = Object.keys(grouped);

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Previous Year Cutoff Marks</h3>
            <p className="text-xs text-gray-400">முந்தைய ஆண்டு கட்ஆஃப் மதிப்பெண்கள் — Check & compare</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setSearch(''); setExpandedCollege(null); }}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-bold transition-all border-b-2",
              activeTab === tab.id
                ? "border-gray-900 text-gray-900 bg-white"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            <tab.icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.label.split('(')[0].trim()}</span>
            <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="p-3 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search college or course..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 h-10 text-sm bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      {/* Category Legend */}
      <div className="px-3 py-2 bg-gray-50 border-b border-gray-100 flex gap-2 overflow-x-auto scrollbar-hide">
        {['OC', 'BC', 'MBC', 'SC', 'ST'].map(cat => (
          <span key={cat} className="text-xs font-bold text-gray-500 bg-white px-2.5 py-1 rounded-md border border-gray-200 whitespace-nowrap">{cat}</span>
        ))}
        <span className="text-xs text-gray-400 ml-auto whitespace-nowrap">
          {activeTab === 'engineering' ? 'TNEA Cutoff (out of 200)' : activeTab === 'medical' ? 'NEET Score (out of 720)' : 'Exam-specific marks'}
        </span>
      </div>

      {/* Results */}
      <div className="max-h-[500px] overflow-y-auto">
        {collegeNames.length === 0 ? (
          <div className="p-10 text-center text-gray-400">
            <p className="text-2xl mb-2">🔍</p>
            <p className="text-sm">No results found</p>
          </div>
        ) : (
          collegeNames.map(collegeName => {
            const entries = grouped[collegeName];
            const isExpanded = expandedCollege === collegeName || collegeNames.length <= 5;
            return (
              <div key={collegeName} className="border-b border-gray-100 last:border-b-0">
                {/* College header */}
                <button
                  onClick={() => setExpandedCollege(expandedCollege === collegeName ? null : collegeName)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all text-left"
                >
                  <Building2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{collegeName}</p>
                    <p className="text-xs text-gray-500">{entries.length} course{entries.length > 1 ? 's' : ''} · {entries[0].year}</p>
                  </div>
                  {entries[0].note && (
                    <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full hidden sm:block">{entries[0].note}</span>
                  )}
                  <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", isExpanded && "rotate-180")} />
                </button>

                {/* Courses table */}
                {isExpanded && (
                  <div className="px-3 pb-3">
                    <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                      {/* Table header */}
                      <div className="grid grid-cols-7 gap-px bg-gray-200 text-xs font-bold text-gray-600">
                        <div className="bg-gray-100 px-3 py-2 col-span-2">Course</div>
                        <div className="bg-gray-100 px-2 py-2 text-center">OC</div>
                        <div className="bg-gray-100 px-2 py-2 text-center">BC</div>
                        <div className="bg-gray-100 px-2 py-2 text-center">MBC</div>
                        <div className="bg-gray-100 px-2 py-2 text-center">SC</div>
                        <div className="bg-gray-100 px-2 py-2 text-center">ST</div>
                      </div>
                      {/* Rows */}
                      {entries.map((entry, i) => (
                        <div key={i} className={cn("grid grid-cols-7 gap-px bg-gray-200", i % 2 === 0 ? "" : "")}>
                          <div className="bg-white px-3 py-2.5 col-span-2">
                            <p className="text-xs font-semibold text-gray-800 leading-tight">{entry.course}</p>
                          </div>
                          <div className="bg-white px-2 py-2.5 text-center text-xs font-bold text-emerald-700">{entry.oc}</div>
                          <div className="bg-white px-2 py-2.5 text-center text-xs font-bold text-blue-700">{entry.bc}</div>
                          <div className="bg-white px-2 py-2.5 text-center text-xs font-bold text-violet-700">{entry.mbc}</div>
                          <div className="bg-white px-2 py-2.5 text-center text-xs font-bold text-amber-700">{entry.sc}</div>
                          <div className="bg-white px-2 py-2.5 text-center text-xs font-bold text-rose-700">{entry.st}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-400 text-center">
          ⚠️ Cutoff marks are approximate and based on previous year data. Actual cutoffs vary each year.
          Always verify from official sources (DOTE, NEET, TNPSC).
        </p>
      </div>
    </div>
  );
};
