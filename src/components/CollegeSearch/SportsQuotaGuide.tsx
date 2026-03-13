import { useState, useMemo } from 'react';
import { Trophy, ChevronDown, ExternalLink, Search, X, Shield, MapPin, Hash, Filter, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { tneaSportsQuotaColleges, getTotalColleges, getDistrictCount, getGovtCount, TNEASportsCollege } from './sportsQuotaData';

const GOLD = '#c9a84c';

const typeConfig: Record<string, { label: string; bg: string; text: string; border: string; dot: string }> = {
  'Govt': { label: 'Government', bg: 'bg-emerald-900/60', text: 'text-emerald-300', border: 'border-emerald-600', dot: 'bg-emerald-400' },
  'Govt-Aided': { label: 'Govt-Aided', bg: 'bg-sky-900/60', text: 'text-sky-300', border: 'border-sky-600', dot: 'bg-sky-400' },
  'Central Govt': { label: 'Central Govt', bg: 'bg-emerald-900/60', text: 'text-emerald-300', border: 'border-emerald-600', dot: 'bg-emerald-400' },
  'Govt Deemed': { label: 'Govt Deemed', bg: 'bg-sky-900/60', text: 'text-sky-300', border: 'border-sky-600', dot: 'bg-sky-400' },
  'Private': { label: 'Private', bg: 'bg-orange-900/40', text: 'text-orange-300', border: 'border-orange-700', dot: 'bg-orange-400' },
};

const getTypeStyle = (type: string) => typeConfig[type] || typeConfig['Private'];

// Flatten all colleges with district info
interface FlatCollege extends TNEASportsCollege {
  district: string;
  districtTamil: string;
}

const allColleges: FlatCollege[] = tneaSportsQuotaColleges.flatMap(d =>
  d.colleges.map(c => ({ ...c, district: d.district, districtTamil: d.districtTamil }))
);

const allDistricts = tneaSportsQuotaColleges.map(d => d.district).sort();
const allTypes = ['All', 'Govt', 'Govt-Aided', 'Central Govt', 'Govt Deemed', 'Private'];

export const SportsQuotaGuide = () => {
  const [search, setSearch] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [verifyCollege, setVerifyCollege] = useState<FlatCollege | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const filtered = useMemo(() => {
    let result = allColleges;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.code.includes(q) ||
        c.district.toLowerCase().includes(q)
      );
    }
    if (selectedDistrict !== 'All') {
      result = result.filter(c => c.district === selectedDistrict);
    }
    if (selectedType !== 'All') {
      result = result.filter(c => c.type === selectedType);
    }
    return result;
  }, [search, selectedDistrict, selectedType]);

  // Group by district for display
  const grouped = useMemo(() => {
    const map: Record<string, FlatCollege[]> = {};
    filtered.forEach(c => {
      if (!map[c.district]) map[c.district] = [];
      map[c.district].push(c);
    });
    return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filtered]);

  const govtInResults = filtered.filter(c => c.type !== 'Private').length;

  return (
    <>
      <div className="rounded-2xl overflow-hidden" style={{ background: '#0f0f14' }}>

        {/* ═══ HEADER ═══ */}
        <div className="relative overflow-hidden p-5 pb-4" style={{ background: 'linear-gradient(135deg, #1a1a24 0%, #0f0f14 50%, #1a1510 100%)' }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #c9a84c 0%, transparent 50%)' }} />
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #c9a84c, #a68a3a)' }}>
                <Trophy className="w-6 h-6 text-black" />
              </div>
              <div>
                <h2 className="text-lg font-black text-white tracking-tight">Sports Quota Directory</h2>
                <p className="text-xs" style={{ color: '#c9a84c' }}>விளையாட்டு ஒதுக்கீட்டு கல்லூரிகள் — TNEA</p>
              </div>
            </div>
            {/* Stats */}
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg" style={{ background: 'rgba(201,168,76,0.15)', color: GOLD }}>{getTotalColleges()} Colleges</span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-900/50 text-emerald-300">{getGovtCount()} Govt/Aided</span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white/5 text-gray-400">{getDistrictCount()} Districts</span>
            </div>
          </div>
        </div>

        {/* ═══ INFO TOGGLE ═══ */}
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="w-full flex items-center justify-between px-4 py-2.5 text-left border-b"
          style={{ background: '#16161e', borderColor: '#2a2a35' }}
        >
          <span className="text-xs font-bold flex items-center gap-1.5" style={{ color: GOLD }}>
            <Info className="w-3.5 h-3.5" /> How Sports Quota Works + Certificate Levels
          </span>
          <ChevronDown className={cn("w-4 h-4 transition-transform", showInfo && "rotate-180")} style={{ color: GOLD }} />
        </button>
        {showInfo && (
          <div className="px-4 py-3 space-y-3" style={{ background: '#111118', borderBottom: '1px solid #2a2a35' }}>
            <div className="rounded-xl p-3" style={{ background: '#1a1a24', border: '1px solid #2a2a35' }}>
              <p className="text-xs font-bold text-white mb-2">TN Sports Quota Rules:</p>
              <div className="space-y-1 text-xs text-gray-400">
                <p>• <span className="text-emerald-400 font-bold">5% seats</span> in all TNEA colleges reserved for sports achievers</p>
                <p>• Separate sports counselling after general TNEA rounds</p>
                <p>• Certificate must be from <span className="text-amber-400 font-bold">last 2 years</span></p>
                <p>• Issued by: District Sports Authority / State Association / SAI</p>
              </div>
            </div>
            <div className="rounded-xl p-3" style={{ background: '#1a1a24', border: '1px solid #2a2a35' }}>
              <p className="text-xs font-bold text-white mb-2">Certificate Priority:</p>
              <div className="space-y-1.5">
                {[
                  { e: '🥇', l: 'International', d: 'Direct admission + full scholarship' },
                  { e: '🥈', l: 'National', d: 'Guaranteed seat in most colleges' },
                  { e: '🥉', l: 'State', d: 'Eligible for most sports quotas' },
                  { e: '🏅', l: 'District', d: 'University & private colleges' },
                  { e: '📜', l: 'School level', d: '❌ NOT accepted for sports quota' },
                ].map(c => (
                  <div key={c.l} className="flex items-center gap-2 text-xs">
                    <span>{c.e}</span>
                    <span className="font-bold text-white w-20">{c.l}</span>
                    <span className="text-gray-500">→ {c.d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ SEARCH ═══ */}
        <div className="p-3" style={{ background: '#111118', borderBottom: '1px solid #1f1f2a' }}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search college name, TNEA code, or district..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 rounded-xl text-sm text-white placeholder-gray-500 outline-none"
              style={{ background: '#1a1a24', border: '1px solid #2a2a35' }}
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-gray-500 hover:text-white" />
              </button>
            )}
          </div>
        </div>

        {/* ═══ FILTERS ═══ */}
        <div className="px-3 py-2.5 flex gap-2" style={{ background: '#0f0f14', borderBottom: '1px solid #1f1f2a' }}>
          {/* District Filter */}
          <div className="relative flex-1">
            <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
            <select
              value={selectedDistrict}
              onChange={e => setSelectedDistrict(e.target.value)}
              className="w-full pl-8 pr-2 py-2 rounded-lg text-xs font-bold text-white appearance-none cursor-pointer outline-none"
              style={{ background: '#1a1a24', border: '1px solid #2a2a35' }}
            >
              <option value="All">All Districts</option>
              {allDistricts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          {/* Type Filter */}
          <div className="relative flex-1">
            <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="w-full pl-8 pr-2 py-2 rounded-lg text-xs font-bold text-white appearance-none cursor-pointer outline-none"
              style={{ background: '#1a1a24', border: '1px solid #2a2a35' }}
            >
              {allTypes.map(t => (
                <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ═══ RESULT STATS ═══ */}
        <div className="px-4 py-2 flex items-center justify-between" style={{ background: '#111118', borderBottom: '1px solid #1f1f2a' }}>
          <span className="text-xs text-gray-500">{filtered.length} colleges found</span>
          <span className="text-xs text-emerald-400 font-bold">{govtInResults} Govt/Aided</span>
        </div>

        {/* ═══ COLLEGE LIST ═══ */}
        <div className="max-h-[500px] overflow-y-auto" style={{ background: '#0f0f14' }}>
          {grouped.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-2xl mb-2">🔍</p>
              <p className="text-sm text-gray-500">No colleges found</p>
            </div>
          ) : (
            grouped.map(([district, colleges]) => (
              <div key={district}>
                {/* District Header */}
                <div className="sticky top-0 z-10 px-4 py-2 flex items-center justify-between" style={{ background: '#16161e', borderBottom: '1px solid #2a2a35' }}>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" style={{ color: GOLD }} />
                    <span className="text-xs font-black text-white">{district}</span>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md" style={{ background: 'rgba(201,168,76,0.15)', color: GOLD }}>{colleges.length}</span>
                </div>

                {/* College Cards */}
                {colleges.map(college => {
                  const style = getTypeStyle(college.type);
                  return (
                    <div
                      key={college.code}
                      className="px-4 py-3 flex items-center gap-3"
                      style={{ borderBottom: '1px solid #1a1a24' }}
                    >
                      {/* TNEA Code */}
                      <div className="w-12 h-12 rounded-lg flex flex-col items-center justify-center flex-shrink-0" style={{ background: '#1a1a24', border: '1px solid #2a2a35' }}>
                        <Hash className="w-3 h-3 text-gray-600 -mb-0.5" />
                        <span className="text-xs font-black" style={{ color: GOLD }}>{college.code}</span>
                      </div>

                      {/* College Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white leading-tight truncate">{college.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={cn("text-xs font-bold px-1.5 py-0.5 rounded border", style.bg, style.text, style.border)}>
                            <span className={cn("inline-block w-1.5 h-1.5 rounded-full mr-1", style.dot)} />{style.label}
                          </span>
                        </div>
                      </div>

                      {/* Verify Button */}
                      <button
                        onClick={() => setVerifyCollege(college)}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold flex-shrink-0 transition-all active:scale-95"
                        style={{ background: 'rgba(201,168,76,0.15)', color: GOLD, border: `1px solid rgba(201,168,76,0.3)` }}
                      >
                        <Shield className="w-3 h-3" /> Verify
                      </button>
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* ═══ FOOTER ═══ */}
        <div className="px-4 py-3 text-center" style={{ background: '#111118', borderTop: '1px solid #2a2a35' }}>
          <p className="text-xs text-gray-600">Source: Official TNEA Portal · All colleges eligible for 5% Sports Quota</p>
          <p className="text-xs text-gray-600">Verify at <span style={{ color: GOLD }}>tneaonline.org</span> before applying</p>
        </div>
      </div>

      {/* ═══ VERIFICATION MODAL ═══ */}
      {verifyCollege && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setVerifyCollege(null)}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <div
            className="relative w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl overflow-hidden"
            style={{ background: '#16161e', border: '1px solid #2a2a35' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 text-center" style={{ background: 'linear-gradient(135deg, #1a1a24, #1a1510)', borderBottom: '1px solid #2a2a35' }}>
              <div className="w-14 h-14 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #c9a84c, #a68a3a)' }}>
                <Shield className="w-7 h-7 text-black" />
              </div>
              <h3 className="text-base font-black text-white">Verify College</h3>
              <p className="text-sm font-bold mt-1" style={{ color: GOLD }}>{verifyCollege.name}</p>
              <div className="flex items-center justify-center gap-3 mt-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md" style={{ background: 'rgba(201,168,76,0.2)', color: GOLD }}>
                  TNEA Code: {verifyCollege.code}
                </span>
                <span className={cn("text-xs font-bold px-2 py-0.5 rounded border", getTypeStyle(verifyCollege.type).bg, getTypeStyle(verifyCollege.type).text, getTypeStyle(verifyCollege.type).border)}>
                  {getTypeStyle(verifyCollege.type).label}
                </span>
              </div>
            </div>

            {/* Warning */}
            <div className="mx-4 mt-4 p-3 rounded-xl flex items-start gap-2" style={{ background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.2)' }}>
              <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-yellow-400 leading-relaxed">
                Search for TNEA code <strong style={{ color: GOLD }}>{verifyCollege.code}</strong> in the Sports Allotment PDF to confirm this college is listed for sports quota in the current year.
              </p>
            </div>

            {/* Verification Links */}
            <div className="p-4 space-y-2">
              <p className="text-xs font-bold text-gray-400 mb-2">Official Verification Links:</p>
              {[
                { icon: '📄', label: 'TNEA Sports Allotment PDF', desc: 'Check if college code is listed', url: 'https://static.tneaonline.org/docs/Sports_Allotment_List.pdf' },
                { icon: '🌐', label: 'TNEA Official Portal', desc: 'Registration & counselling', url: 'https://www.tneaonline.org' },
                { icon: '✅', label: 'AICTE Approval Check', desc: 'Verify AICTE approval status', url: 'https://facilities.aicte-india.org/dashboard/pages/angulardashboard.php' },
                { icon: '🏛️', label: 'DOTE Official Website', desc: 'Directorate of Technical Education', url: 'https://dte.tn.gov.in' },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl transition-all active:scale-[0.98]"
                  style={{ background: '#1a1a24', border: '1px solid #2a2a35' }}
                >
                  <span className="text-lg flex-shrink-0">{link.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white">{link.label}</p>
                    <p className="text-xs text-gray-500">{link.desc}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-600 flex-shrink-0" />
                </a>
              ))}
            </div>

            {/* Close */}
            <div className="p-4 pt-0">
              <button
                onClick={() => setVerifyCollege(null)}
                className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-[0.98]"
                style={{ background: '#2a2a35' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
