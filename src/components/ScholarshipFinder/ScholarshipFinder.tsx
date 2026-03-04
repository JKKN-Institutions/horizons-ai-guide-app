import { useState, useEffect, useMemo } from 'react';
import { Search, X, ChevronDown, ChevronUp, Star, Download, ClipboardList, Sparkles, ArrowRight, Check, Calendar, ExternalLink, Filter as FilterIcon } from 'lucide-react';
import { scholarships as allScholarships } from './scholarshipData';
import { Scholarship, educationLevels, categories as categoryOptions, incomeRanges } from './types';
import { EligibilityChecker } from './EligibilityChecker';
import { ApplicationTracker } from './ApplicationTracker';
import { generateScholarshipPDF } from './generateScholarshipPDF';
import { ScholarshipDetailModal } from './ScholarshipDetailModal';

/* ═══════════════════════════════════════════════════════════════
   FONT LOADER
   ═══════════════════════════════════════════════════════════════ */
const useFonts = () => {
  useEffect(() => {
    if (!document.querySelector('link[data-sf-fonts]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&family=Outfit:wght@300;400;500;600;700&display=swap';
      link.setAttribute('data-sf-fonts', 'true');
      document.head.appendChild(link);
    }
  }, []);
};

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS & HELPERS
   ═══════════════════════════════════════════════════════════════ */
const CATEGORY_CONFIG: Record<string, { icon: string; color: string; bg: string; label: string; desc: string }> = {
  government: { icon: '🏛️', color: '#E67E22', bg: '#FFF3E0', label: 'Government', desc: 'Tamil Nadu & Central Govt.' },
  corporate:  { icon: '🏢', color: '#2980B9', bg: '#E3F2FD', label: 'Corporate', desc: 'Industry-sponsored' },
  ngo:        { icon: '💚', color: '#27AE60', bg: '#E8F5E9', label: 'NGO / Trust', desc: 'Non-profit initiatives' },
  sports:     { icon: '🏆', color: '#E74C3C', bg: '#FFEBEE', label: 'Sports', desc: 'Athletic excellence' },
};

const TAG_STYLES: Record<string, { bg: string; text: string }> = {
  popular:       { bg: '#E8F5E9', text: '#2E7D32' },
  'high-value':  { bg: '#FFF8E1', text: '#F57F17' },
  women:         { bg: '#FCE4EC', text: '#C2185B' },
  institutional: { bg: '#E3F2FD', text: '#1565C0' },
};

const getScholarshipTag = (s: Scholarship): { label: string; key: string } | null => {
  const name = s.name.toLowerCase();
  if (s.id === 'jkkn-sports') return { label: '⭐ Institutional', key: 'institutional' };
  if (name.includes('girl') || name.includes('women') || name.includes('single girl') || s.gender === 'female' || name.includes('pragati') || name.includes('kanya') || name.includes('moovalur') || name.includes('glow') || name.includes('kotak kanya') || name.includes('pudhumai'))
    return { label: '👩 Women', key: 'women' };
  // Parse amount for high-value detection
  let amt = 0;
  const lakhMatch = s.amount.match(/₹?\s*([\d.]+)\s*(?:Lakh|lakhs?)/i);
  if (lakhMatch) { amt = (parseFloat(lakhMatch[1]) || 0) * 100000; }
  else { const numMatch = s.amount.match(/₹\s*([\d,]+)/); if (numMatch) amt = parseInt(numMatch[1].replace(/,/g, ''), 10) || 0; }
  if (amt >= 50000 || name.includes('full tuition') || name.includes('full fee') || s.amount.toLowerCase().includes('full'))
    return { label: '💎 High Value', key: 'high-value' };
  if (s.deadlineStatus === 'always-open' || name.includes('post matric') || name.includes('e-grantz') || name.includes('free education'))
    return { label: '🔥 Popular', key: 'popular' };
  return null;
};

/* ═══════════════════════════════════════════════════════════════
   FILTER SECTION (Accordion)
   ═══════════════════════════════════════════════════════════════ */
const FilterSection = ({ title, icon, children, defaultOpen = true }: {
  title: string; icon: string; children: React.ReactNode; defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: '1px solid #EEE8D5' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 px-1 text-left"
        style={{ fontFamily: 'Outfit, sans-serif' }}
      >
        <span className="flex items-center gap-2 font-semibold text-sm" style={{ color: '#1B5E20' }}>
          <span>{icon}</span> {title}
        </span>
        {open ? <ChevronUp size={16} color="#8B7355" /> : <ChevronDown size={16} color="#8B7355" />}
      </button>
      {open && <div className="pb-3 px-1">{children}</div>}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   GOLD CHECKBOX
   ═══════════════════════════════════════════════════════════════ */
const GoldCheckbox = ({ checked, onChange, label, count }: {
  checked: boolean; onChange: () => void; label: string; count?: number;
}) => (
  <label className="flex items-center gap-2.5 py-1 cursor-pointer group" style={{ fontFamily: 'Outfit, sans-serif' }}>
    <div
      className="flex items-center justify-center transition-all"
      style={{
        width: 18, height: 18, borderRadius: 5,
        border: `2px solid ${checked ? '#DAA520' : '#D1C7B7'}`,
        backgroundColor: checked ? '#DAA520' : 'transparent',
      }}
    >
      {checked && <Check size={12} color="white" strokeWidth={3} />}
    </div>
    <span className="text-sm group-hover:text-green-800 transition-colors flex-1" style={{ color: '#2C2C2C' }}>
      {label}
    </span>
    {count !== undefined && (
      <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: '#F5F0E8', color: '#8B7355' }}>
        {count}
      </span>
    )}
  </label>
);

/* ═══════════════════════════════════════════════════════════════
   GOLD RADIO
   ═══════════════════════════════════════════════════════════════ */
const GoldRadio = ({ checked, onChange, label }: {
  checked: boolean; onChange: () => void; label: string;
}) => (
  <label className="flex items-center gap-2.5 py-1 cursor-pointer" style={{ fontFamily: 'Outfit, sans-serif' }}>
    <div
      className="flex items-center justify-center transition-all"
      style={{
        width: 18, height: 18, borderRadius: '50%',
        border: `2px solid ${checked ? '#DAA520' : '#D1C7B7'}`,
      }}
    >
      {checked && <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#DAA520' }} />}
    </div>
    <span className="text-sm" style={{ color: '#2C2C2C' }}>{label}</span>
  </label>
);

/* ═══════════════════════════════════════════════════════════════
   SCHOLARSHIP CARD
   ═══════════════════════════════════════════════════════════════ */
const ScholarshipCardNew = ({ scholarship, onView, isSaved, onToggleSave }: {
  scholarship: Scholarship; onView: () => void; isSaved: boolean; onToggleSave: () => void;
}) => {
  const catConfig = CATEGORY_CONFIG[scholarship.type] || CATEGORY_CONFIG.government;
  const tag = getScholarshipTag(scholarship);

  return (
    <div
      className="bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group cursor-pointer"
      style={{ border: '1px solid #EEE8D5', fontFamily: 'Outfit, sans-serif' }}
      onClick={onView}
    >
      <div className="flex">
        {/* Left accent bar */}
        <div
          className="w-1 group-hover:w-1.5 transition-all duration-300"
          style={{ backgroundColor: catConfig.color, opacity: 0.7 }}
        />
        <div className="flex-1 p-4">
          {/* Top row */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 flex-wrap">
              {tag && (
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: TAG_STYLES[tag.key]?.bg || '#F5F0E8',
                    color: TAG_STYLES[tag.key]?.text || '#8B7355',
                  }}
                >
                  {tag.label}
                </span>
              )}
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ backgroundColor: catConfig.bg, color: catConfig.color }}
              >
                {catConfig.icon} {catConfig.label}
              </span>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onToggleSave(); }}
              className="p-1.5 rounded-full transition-all hover:scale-110"
              style={{ backgroundColor: isSaved ? '#FFF8E1' : 'transparent' }}
              title={isSaved ? 'Remove from saved' : 'Save scholarship'}
            >
              <Star size={16} fill={isSaved ? '#DAA520' : 'none'} color={isSaved ? '#DAA520' : '#B8A88A'} />
            </button>
          </div>

          {/* Name */}
          <h3
            className="font-bold text-base mb-1 leading-tight group-hover:text-green-800 transition-colors"
            style={{ color: '#2C2C2C', fontFamily: 'Playfair Display, serif' }}
          >
            {scholarship.name}
          </h3>

          {/* Provider */}
          <p className="text-xs mb-3" style={{ color: '#8B7355' }}>{scholarship.provider}</p>

          {/* Amount + Deadline */}
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-lg" style={{ color: '#27AE60' }}>
              {scholarship.amount}
            </span>
            <span className="text-xs flex items-center gap-1" style={{ color: '#2C2C2C' }}>
              <Calendar size={12} /> {scholarship.deadline}
            </span>
          </div>

          {/* Eligibility */}
          <div className="pt-2 mt-1" style={{ borderTop: '1px solid #F5F0E8' }}>
            <p className="text-xs leading-relaxed" style={{ color: '#8B7355', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {scholarship.eligibility.slice(0, 3).join(' • ')}
            </p>
          </div>

          {/* CTA */}
          <button
            className="mt-3 w-full py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5 transition-all hover:opacity-100"
            style={{
              background: 'linear-gradient(135deg, #DAA520, #B8860B)',
              color: 'white', opacity: 0.9,
            }}
            onClick={(e) => { e.stopPropagation(); onView(); }}
          >
            View Details <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   AI ELIGIBILITY WIZARD (3-Step Modal)
   ═══════════════════════════════════════════════════════════════ */
const AIEligibilityWizard = ({ open, onClose, scholarships }: {
  open: boolean; onClose: () => void; scholarships: Scholarship[];
}) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ institution: '', category: '', income: '' });
  const [matchCount, setMatchCount] = useState(0);

  const steps = [
    { question: 'What type of institution are you enrolled in?', icon: '🎓', options: ['Engineering College', 'Arts & Science College', 'Medical College', 'Polytechnic or ITI', 'School (Class 8–12)'], key: 'institution' },
    { question: 'What is your community category?', icon: '👥', options: ['SC / ST', 'BC / MBC / DNC', 'OC / General', 'Minority (Religious)'], key: 'category' },
    { question: 'What is your annual family income?', icon: '💰', options: ['Below ₹1 Lakh', '₹1 – 2.5 Lakhs', '₹2.5 – 5 Lakhs', 'Above ₹5 Lakhs'], key: 'income' },
  ];

  useEffect(() => {
    if (step === 3) {
      let count = 0;
      scholarships.forEach(s => {
        let score = 0;
        const elig = s.eligibility.join(' ').toLowerCase() + ' ' + (s.category || []).join(' ').toLowerCase();
        const cat = answers.category.toLowerCase();
        if (cat.includes('sc') && (elig.includes('sc') || s.category?.some(c => c === 'sc' || c === 'st'))) score++;
        if ((cat.includes('bc') || cat.includes('mbc')) && (elig.includes('bc') || s.category?.some(c => c === 'bc-mbc' || c === 'obc'))) score++;
        if (cat.includes('general') || cat.includes('oc')) score += 0.5;
        if (cat.includes('minority') && (elig.includes('minority') || s.category?.some(c => c === 'minority'))) score++;
        if (answers.income.includes('Below') || answers.income.includes('1 –')) score++;
        if (s.gender === 'all') score += 0.3;
        if (score > 0) count++;
      });
      setMatchCount(Math.max(count, 12));
    }
  }, [step, answers, scholarships]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
        style={{ animation: 'sfFadeInUp 0.3s ease-out' }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
          <X size={18} color="#666" />
        </button>

        {step < 3 ? (
          <div className="p-6 pt-8">
            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: i === step ? 32 : 12,
                    backgroundColor: i < step ? '#27AE60' : i === step ? '#DAA520' : '#E0E0E0',
                  }}
                />
              ))}
            </div>

            <div className="text-center mb-6">
              <span className="text-4xl mb-3 block">{steps[step].icon}</span>
              <h3 className="text-lg font-bold" style={{ color: '#1B5E20', fontFamily: 'Playfair Display, serif' }}>
                Step {step + 1} of 3
              </h3>
              <p className="text-sm mt-1" style={{ color: '#2C2C2C' }}>{steps[step].question}</p>
            </div>

            <div className="space-y-2.5">
              {steps[step].options.map(opt => {
                const isSelected = answers[steps[step].key as keyof typeof answers] === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => {
                      setAnswers(prev => ({ ...prev, [steps[step].key]: opt }));
                      setTimeout(() => setStep(step + 1), 300);
                    }}
                    className="w-full p-3.5 rounded-xl text-left text-sm font-medium transition-all border-2"
                    style={{
                      borderColor: isSelected ? '#DAA520' : '#EEE8D5',
                      backgroundColor: isSelected ? '#FFF8E1' : 'white',
                      color: '#2C2C2C',
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="mt-4 text-sm underline" style={{ color: '#8B7355' }}>
                ← Go back
              </button>
            )}
          </div>
        ) : (
          <div className="p-6 pt-8 text-center">
            <div className="text-6xl mb-4" style={{ animation: 'sfBounce 0.6s ease-out' }}>🎉</div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: '#1B5E20', fontFamily: 'Playfair Display, serif' }}>
              Great News!
            </h3>
            <p className="text-base mb-1" style={{ color: '#2C2C2C' }}>You may be eligible for</p>
            <p className="text-4xl font-bold mb-4" style={{ color: '#DAA520', fontFamily: 'Playfair Display, serif' }}>
              {matchCount}+ Scholarships
            </p>
            <p className="text-sm mb-6" style={{ color: '#8B7355' }}>
              Based on: {answers.institution} • {answers.category} • {answers.income}
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl font-bold text-base transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #DAA520, #B8860B)', color: 'white' }}
            >
              Browse My Matches →
            </button>
            <button
              onClick={() => { setStep(0); setAnswers({ institution: '', category: '', income: '' }); }}
              className="mt-3 text-sm underline block mx-auto"
              style={{ color: '#8B7355' }}
            >
              Retake Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MOBILE FILTER DRAWER
   ═══════════════════════════════════════════════════════════════ */
const MobileFilterDrawer = ({ open, onClose, children }: {
  open: boolean; onClose: () => void; children: React.ReactNode;
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 md:hidden" style={{ fontFamily: 'Outfit, sans-serif' }}>
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl overflow-y-auto"
        style={{ animation: 'sfSlideIn 0.3s ease-out' }}
      >
        <div className="flex items-center justify-between p-4" style={{ borderBottom: '1px solid #EEE8D5' }}>
          <h3 className="font-bold text-lg" style={{ color: '#1B5E20', fontFamily: 'Playfair Display, serif' }}>
            Filters
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200">
            <X size={18} color="#666" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};


/* ═══════════════════════════════════════════════════════════════
   ███  MAIN COMPONENT  ███
   ═══════════════════════════════════════════════════════════════ */
export const ScholarshipFinder = () => {
  useFonts();

  // ─── State ──────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedEduLevels, setSelectedEduLevels] = useState<string[]>([]);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedIncome, setSelectedIncome] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [showAIWizard, setShowAIWizard] = useState(false);
  const [showEligibility, setShowEligibility] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Reset to page 1 when filters change
  const filteredLen = filtered.length;
  useEffect(() => { setCurrentPage(1); }, [filteredLen, selectedCategory, selectedTypes.length, selectedEduLevels.length, selectedCats.length, selectedIncome, searchQuery, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedScholarships = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // ─── Type counts ────────────────────────────────────────
  const typeCounts = useMemo(() => {
    const c: Record<string, number> = {};
    allScholarships.forEach(s => { c[s.type] = (c[s.type] || 0) + 1; });
    return c;
  }, []);

  // ─── Filtering ──────────────────────────────────────────
  const filtered = useMemo(() => {
    let result = [...allScholarships];
    if (selectedCategory) result = result.filter(s => s.type === selectedCategory);
    if (selectedTypes.length) result = result.filter(s => selectedTypes.includes(s.type));
    if (selectedEduLevels.length) result = result.filter(s => s.educationLevel.some(e => selectedEduLevels.includes(e)));
    if (selectedCats.length) result = result.filter(s => s.category.some(c => selectedCats.includes(c)));
    if (selectedIncome) {
      result = result.filter(s => {
        if (!s.incomeLimit) return true; // No income restriction = all qualify
        const limit = parseFloat(s.incomeLimit);
        switch (selectedIncome) {
          case 'below-1': return limit >= 1;
          case '1-2.5': return limit >= 2.5;
          case '2.5-5': return limit >= 5;
          case '5-8': return limit >= 8;
          case 'above-8': return true;
          default: return true;
        }
      });
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s =>
        s.name.toLowerCase().includes(q) || s.provider.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      );
    }
    if (sortBy === 'highest') {
      result.sort((a, b) => {
        const getAmt = (s: Scholarship) => parseScholarshipAmount(s.amount);
        return getAmt(b) - getAmt(a);
      });
    }
    return result;
  }, [searchQuery, selectedCategory, selectedTypes, selectedEduLevels, selectedCats, selectedIncome, sortBy]);

  // ─── Amount parser (handles ₹1,25,000 and ₹30 Lakh formats) ─
  const parseScholarshipAmount = (amount: string): number => {
    let max = 0;
    // Handle "₹X Lakh" / "₹X.XX Lakh" patterns
    const lakhPattern = /₹?\s*([\d.]+)\s*(?:Lakh|lakhs?)/gi;
    let lm;
    while ((lm = lakhPattern.exec(amount)) !== null) {
      const val = (parseFloat(lm[1]) || 0) * 100000;
      if (val > max) max = val;
    }
    // Handle "₹1,25,000" style numbers
    const numPattern = /₹\s*([\d,]+)/g;
    let nm;
    while ((nm = numPattern.exec(amount)) !== null) {
      const n = parseInt(nm[1].replace(/,/g, ''), 10) || 0;
      if (n > max && n < 100000000) max = n;
    }
    return max;
  };

  // ─── Highest value ──────────────────────────────────────
  const highestVal = useMemo(() => {
    let max = 0;
    allScholarships.forEach(s => {
      const n = parseScholarshipAmount(s.amount);
      if (n > max) max = n;
    });
    return max >= 100000 ? `₹${(max / 100000).toFixed(1)}L` : `₹${max.toLocaleString()}`;
  }, []);

  // ─── Helpers ────────────────────────────────────────────
  const toggleSaved = (id: string) => {
    setSavedIds(prev => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  };
  const toggleArr = (arr: string[], val: string, setter: (a: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);
  };
  const clearFilters = () => {
    setSelectedTypes([]); setSelectedEduLevels([]); setSelectedCats([]);
    setSelectedIncome(''); setSearchQuery(''); setSelectedCategory(null);
  };
  const hasFilters = selectedTypes.length > 0 || selectedEduLevels.length > 0 || selectedCats.length > 0 || selectedIncome !== '';

  // ─── Filter Panel Content (shared desktop + mobile) ─────
  const filterContent = (
    <div className="space-y-1">
      {hasFilters && (
        <button onClick={clearFilters} className="text-xs font-semibold underline mb-2 block" style={{ color: '#E74C3C' }}>
          ✕ Clear All Filters
        </button>
      )}
      <FilterSection title="Scholarship Type" icon="📁">
        <div className="space-y-1">
          {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => (
            <GoldCheckbox
              key={key}
              checked={selectedTypes.includes(key)}
              onChange={() => toggleArr(selectedTypes, key, setSelectedTypes)}
              label={`${cfg.icon} ${cfg.label}`}
              count={typeCounts[key] || 0}
            />
          ))}
        </div>
      </FilterSection>
      <FilterSection title="Education Level" icon="🎓">
        <div className="space-y-1">
          {educationLevels.map(el => (
            <GoldCheckbox
              key={el.id}
              checked={selectedEduLevels.includes(el.id)}
              onChange={() => toggleArr(selectedEduLevels, el.id, setSelectedEduLevels)}
              label={el.label}
            />
          ))}
        </div>
      </FilterSection>
      <FilterSection title="Community Category" icon="👥">
        <div className="space-y-1">
          {categoryOptions.map(co => (
            <GoldCheckbox
              key={co.id}
              checked={selectedCats.includes(co.id)}
              onChange={() => toggleArr(selectedCats, co.id, setSelectedCats)}
              label={co.label}
            />
          ))}
        </div>
      </FilterSection>
      <FilterSection title="Family Annual Income" icon="💰" defaultOpen={false}>
        <div className="space-y-1">
          {incomeRanges.map(ir => (
            <GoldRadio
              key={ir.id}
              checked={selectedIncome === ir.id}
              onChange={() => setSelectedIncome(selectedIncome === ir.id ? '' : ir.id)}
              label={ir.label}
            />
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <div className="relative rounded-2xl" style={{ fontFamily: 'Outfit, sans-serif', background: 'linear-gradient(180deg, #E8F5E9 0%, #F1F8E9 40%, #E8F5E9 100%)', minHeight: '80vh', padding: '1.5rem 0' }}>
      {/* ─── GLOBAL STYLES ──────────────────────────────────── */}
      <style>{`
        @keyframes sfFadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes sfBounce { 0% { transform: scale(0.3); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
        @keyframes sfSlideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes sfSlideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .sf-stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(0,0,0,0.1); }
        .sf-cat-btn:hover { transform: translateY(-4px); box-shadow: 0 8px 25px rgba(0,0,0,0.12); }
        .sf-cards-scroll::-webkit-scrollbar { width: 6px; }
        .sf-cards-scroll::-webkit-scrollbar-track { background: #F5F0E8; border-radius: 3px; }
        .sf-cards-scroll::-webkit-scrollbar-thumb { background: #C8E6C9; border-radius: 3px; }
        .sf-cards-scroll::-webkit-scrollbar-thumb:hover { background: #A5D6A7; }
      `}</style>

      {/* ─── Content ────────────────────────────────────────── */}
      <div className="relative z-10">

        {/* ═══ COMPACT ACTION BAR ═══ */}
        <div className="max-w-5xl mx-auto px-4 mb-6">
          <div
            className="rounded-2xl overflow-hidden shadow-md"
            style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #388E3C 100%)', border: '1px solid #1B5E20' }}
          >
            <div className="relative px-5 py-5">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🎓</div>
                  <div>
                    <h2
                      className="text-xl md:text-2xl font-bold"
                      style={{ fontFamily: 'Playfair Display, serif', color: 'white' }}
                    >
                      Scholarship <span style={{ color: '#FFD54F' }}>Finder</span>
                    </h2>
                    <p className="text-xs" style={{ color: '#A5D6A7', fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
                      உதவித்தொகை கண்டுபிடிப்பான் — {allScholarships.length} scholarships across 4 categories
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setShowAIWizard(true)}
                    className="px-4 py-2.5 rounded-full font-semibold text-xs shadow-md hover:shadow-lg transition-all hover:scale-105 flex items-center gap-1.5"
                    style={{ background: 'linear-gradient(135deg, #DAA520, #B8860B)', color: 'white' }}
                  >
                    <Sparkles size={14} /> Check Eligibility (AI)
                  </button>
                  <button
                    onClick={() => setShowApplications(true)}
                    className="px-4 py-2.5 rounded-full font-semibold text-xs border-2 bg-white/10 hover:bg-white/20 transition-all flex items-center gap-1.5"
                    style={{ borderColor: '#A5D6A7', color: 'white' }}
                  >
                    <ClipboardList size={14} /> My Applications ({savedIds.size})
                  </button>
                  <button
                    onClick={() => generateScholarshipPDF(filtered)}
                    className="px-4 py-2.5 rounded-full font-semibold text-xs border-2 bg-white/10 hover:bg-white/20 transition-all flex items-center gap-1.5"
                    style={{ borderColor: '#FFD54F', color: '#FFD54F' }}
                  >
                    <Download size={14} /> PDF ({filtered.length})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ STATS ROW ═══ */}
        <div className="max-w-5xl mx-auto px-4 mb-6 relative z-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: '📋', value: `${allScholarships.length}+`, label: 'Total Scholarships' },
              { icon: '💰', value: highestVal, label: 'Highest Value' },
              { icon: '🏛️', value: `${typeCounts.government || 0}+`, label: 'Govt. Schemes' },
              { icon: '✨', value: '24/7', label: 'AI Eligibility Check' },
            ].map((stat, i) => (
              <div
                key={i}
                className="sf-stat-card bg-white rounded-xl p-4 text-center shadow-md transition-all duration-300 cursor-default"
                style={{ border: '1px solid #EEE8D5' }}
              >
                <span className="text-2xl block mb-1">{stat.icon}</span>
                <p
                  className="text-xl md:text-2xl font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #DAA520, #B8860B)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    fontFamily: 'Playfair Display, serif',
                  }}
                >
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-wider font-medium mt-0.5" style={{ color: '#8B7355' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ CATEGORY NAVIGATION ═══ */}
        <div className="max-w-5xl mx-auto px-4 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => {
              const isActive = selectedCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(isActive ? null : key)}
                  className="sf-cat-btn rounded-xl text-left transition-all duration-300 overflow-hidden relative"
                  style={{
                    border: `2px solid ${isActive ? cfg.color : cfg.color + '40'}`,
                    boxShadow: isActive
                      ? `0 6px 20px ${cfg.color}30, 0 0 0 1px ${cfg.color}20`
                      : `0 2px 8px rgba(0,0,0,0.06)`,
                    background: isActive
                      ? `linear-gradient(135deg, ${cfg.bg}, white)`
                      : 'white',
                  }}
                >
                  {/* Colored top accent bar */}
                  <div
                    className="h-1 w-full"
                    style={{ background: `linear-gradient(90deg, ${cfg.color}, ${cfg.color}80)` }}
                  />
                  <div className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-sm"
                        style={{
                          background: `linear-gradient(135deg, ${cfg.bg}, ${cfg.color}15)`,
                          border: `1.5px solid ${cfg.color}30`,
                        }}
                      >
                        {cfg.icon}
                      </div>
                      <div>
                        <p className="font-bold text-sm" style={{ color: isActive ? cfg.color : '#1B5E20' }}>
                          {cfg.label}
                        </p>
                        <p className="text-xs" style={{ color: '#8B7355' }}>{cfg.desc}</p>
                      </div>
                    </div>
                    <div className="mt-2.5 flex items-center justify-between">
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: isActive ? cfg.color : cfg.bg,
                          color: isActive ? 'white' : cfg.color,
                        }}
                      >
                        {typeCounts[key] || 0} Scholarships
                      </span>
                      {isActive && (
                        <span className="text-xs font-semibold" style={{ color: cfg.color }}>✓ Active</span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ═══ SEARCH + SORT BAR ═══ */}
        <div className="max-w-5xl mx-auto px-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Mobile filter button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="md:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm bg-white transition-all"
              style={{ border: '1px solid #EEE8D5', color: '#1B5E20' }}
            >
              <FilterIcon size={16} /> Filters {hasFilters && <span className="w-2 h-2 rounded-full bg-yellow-500" />}
            </button>

            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2" color="#B8A88A" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search scholarships by name or provider..."
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white transition-all outline-none"
                style={{
                  border: '1px solid #EEE8D5',
                  fontFamily: 'Outfit, sans-serif',
                  color: '#2C2C2C',
                }}
                onFocus={(e) => e.target.style.borderColor = '#DAA520'}
                onBlur={(e) => e.target.style.borderColor = '#EEE8D5'}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100">
                  <X size={14} color="#8B7355" />
                </button>
              )}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 rounded-xl text-sm bg-white cursor-pointer outline-none"
              style={{ border: '1px solid #EEE8D5', fontFamily: 'Outfit, sans-serif', color: '#2C2C2C', minWidth: 160 }}
            >
              <option value="relevance">Sort: Relevance</option>
              <option value="highest">Sort: Highest Value</option>
            </select>
          </div>
        </div>

        {/* ═══ MAIN CONTENT (Filters + Cards) ═══ */}
        <div className="max-w-5xl mx-auto px-4 pb-16">
          <div className="flex gap-6">

            {/* LEFT: Filter Sidebar (Desktop) */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <div
                className="bg-white rounded-xl p-4 sticky top-4 sf-cards-scroll overflow-y-auto"
                style={{ border: '1px solid #EEE8D5', maxHeight: '75vh' }}
              >
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: '#1B5E20', fontFamily: 'Playfair Display, serif' }}>
                  <FilterIcon size={14} /> Refine Results
                </h3>
                {filterContent}
                <div className="mt-4 pt-3" style={{ borderTop: '1px solid #EEE8D5' }}>
                  <button
                    onClick={() => setShowEligibility(true)}
                    className="w-full py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #2E7D32, #1B5E20)', color: 'white' }}
                  >
                    <Sparkles size={13} /> Deep Eligibility Analysis
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: Scholarship Cards */}
            <div className="flex-1 min-w-0">
              {/* Results count + page info */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm" style={{ color: '#8B7355' }}>
                  Showing <strong style={{ color: '#1B5E20' }}>{(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</strong> of <strong style={{ color: '#1B5E20' }}>{filtered.length}</strong> scholarship{filtered.length !== 1 ? 's' : ''}
                  {selectedCategory && (
                    <span> in <strong style={{ color: CATEGORY_CONFIG[selectedCategory]?.color }}>
                      {CATEGORY_CONFIG[selectedCategory]?.label}
                    </strong></span>
                  )}
                  {hasFilters && (
                    <button onClick={clearFilters} className="ml-2 text-xs underline" style={{ color: '#E74C3C' }}>Clear filters</button>
                  )}
                </p>
              </div>

              {/* Scrollable Cards Area */}
              {filtered.length > 0 ? (
                <div>
                  <div
                    id="sf-cards-scroll"
                    className="sf-cards-scroll overflow-y-auto pr-1"
                    style={{ maxHeight: '65vh', scrollBehavior: 'smooth' }}
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      {paginatedScholarships.map(s => (
                        <ScholarshipCardNew
                          key={s.id}
                          scholarship={s}
                          onView={() => setSelectedScholarship(s)}
                          isSaved={savedIds.has(s.id)}
                          onToggleSave={() => toggleSaved(s.id)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
                      <button
                        onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); document.getElementById('sf-cards-scroll')?.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        disabled={currentPage === 1}
                        className="px-3 py-2 rounded-lg text-sm font-semibold transition-all"
                        style={{
                          border: '1px solid #EEE8D5',
                          color: currentPage === 1 ? '#D1C7B7' : '#1B5E20',
                          backgroundColor: 'white',
                          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                        }}
                      >
                        ← Prev
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                        .reduce((acc: (number | string)[], p, idx, arr) => {
                          if (idx > 0 && typeof arr[idx - 1] === 'number' && (p as number) - (arr[idx - 1] as number) > 1) acc.push('...');
                          acc.push(p);
                          return acc;
                        }, [])
                        .map((p, idx) =>
                          p === '...' ? (
                            <span key={`dot-${idx}`} className="px-1 text-sm" style={{ color: '#8B7355' }}>…</span>
                          ) : (
                            <button
                              key={p}
                              onClick={() => { setCurrentPage(p as number); document.getElementById('sf-cards-scroll')?.scrollTo({ top: 0, behavior: 'smooth' }); }}
                              className="w-9 h-9 rounded-lg text-sm font-bold transition-all"
                              style={{
                                backgroundColor: currentPage === p ? '#1B5E20' : 'white',
                                color: currentPage === p ? 'white' : '#1B5E20',
                                border: currentPage === p ? '1px solid #1B5E20' : '1px solid #EEE8D5',
                              }}
                            >
                              {p}
                            </button>
                          )
                        )}

                      <button
                        onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); document.getElementById('sf-cards-scroll')?.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 rounded-lg text-sm font-semibold transition-all"
                        style={{
                          border: '1px solid #EEE8D5',
                          color: currentPage === totalPages ? '#D1C7B7' : '#1B5E20',
                          backgroundColor: 'white',
                          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                        }}
                      >
                        Next →
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-xl" style={{ border: '1px solid #EEE8D5' }}>
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#1B5E20', fontFamily: 'Playfair Display, serif' }}>
                    No scholarships found
                  </h3>
                  <p className="text-sm mb-4" style={{ color: '#8B7355' }}>
                    Try adjusting your filters or search query
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-5 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #DAA520, #B8860B)', color: 'white' }}
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

              {/* Saved scholarships count */}
              {savedIds.size > 0 && (
                <div
                  className="mt-6 bg-white rounded-xl p-4 flex items-center justify-between"
                  style={{ border: '1px solid #EEE8D5' }}
                >
                  <div className="flex items-center gap-3">
                    <Star size={20} fill="#DAA520" color="#DAA520" />
                    <div>
                      <p className="font-semibold text-sm" style={{ color: '#2C2C2C' }}>
                        {savedIds.size} Scholarship{savedIds.size !== 1 ? 's' : ''} Saved
                      </p>
                      <p className="text-xs" style={{ color: '#8B7355' }}>
                        Download as PDF to review later
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const savedScholarships = allScholarships.filter(s => savedIds.has(s.id));
                      generateScholarshipPDF(savedScholarships);
                    }}
                    className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #DAA520, #B8860B)', color: 'white' }}
                  >
                    <Download size={14} className="inline mr-1" /> Download Saved
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ MODALS ═══ */}
      <AIEligibilityWizard
        open={showAIWizard}
        onClose={() => setShowAIWizard(false)}
        scholarships={allScholarships}
      />

      <EligibilityChecker
        open={showEligibility}
        onOpenChange={setShowEligibility}
        scholarships={allScholarships}
      />

      {/* Application Tracker Full-Screen Panel */}
      {showApplications && (
        <div className="fixed inset-0 z-[60]" style={{ fontFamily: 'Outfit, sans-serif' }}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowApplications(false)} />
          <div
            className="absolute right-0 top-0 bottom-0 w-full max-w-2xl bg-white shadow-2xl overflow-y-auto"
            style={{ animation: 'sfSlideInRight 0.3s ease-out', backgroundColor: '#FFFDF7' }}
          >
            <div
              className="sticky top-0 z-10 px-6 py-4 flex items-center justify-between"
              style={{ background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)', borderBottom: '1px solid #C8E6C9' }}
            >
              <div>
                <h2 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#1B5E20' }}>
                  📋 My Applications
                </h2>
                <p className="text-xs mt-0.5" style={{ color: '#2E7D32' }}>
                  {savedIds.size} scholarship{savedIds.size !== 1 ? 's' : ''} saved
                </p>
              </div>
              <button
                onClick={() => setShowApplications(false)}
                className="p-2 rounded-full hover:bg-white/50 transition-all"
              >
                <X size={20} color="#1B5E20" />
              </button>
            </div>
            <div className="p-6">
              {savedIds.size > 0 ? (
                <div className="space-y-4">
                  {allScholarships.filter(s => savedIds.has(s.id)).map(s => {
                    const catConfig = CATEGORY_CONFIG[s.type] || CATEGORY_CONFIG.government;
                    const tag = getScholarshipTag(s);
                    return (
                      <div
                        key={s.id}
                        className="bg-white rounded-xl p-4 transition-all hover:shadow-md"
                        style={{ border: '1px solid #EEE8D5' }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              {tag && (
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                                  style={{ backgroundColor: TAG_STYLES[tag.key]?.bg || '#F5F0E8', color: TAG_STYLES[tag.key]?.text || '#8B7355' }}>
                                  {tag.label}
                                </span>
                              )}
                              <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                                style={{ backgroundColor: catConfig.bg, color: catConfig.color }}>
                                {catConfig.icon} {catConfig.label}
                              </span>
                            </div>
                            <h4 className="font-bold text-sm" style={{ color: '#2C2C2C', fontFamily: 'Playfair Display, serif' }}>
                              {s.name}
                            </h4>
                            <p className="text-xs mt-0.5" style={{ color: '#8B7355' }}>{s.provider}</p>
                          </div>
                          <button
                            onClick={() => toggleSaved(s.id)}
                            className="p-1.5 rounded-full hover:bg-red-50 transition-all"
                            title="Remove"
                          >
                            <X size={14} color="#E74C3C" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-2" style={{ borderTop: '1px solid #F5F0E8' }}>
                          <span className="font-bold text-sm" style={{ color: '#27AE60' }}>{s.amount}</span>
                          <span className="text-xs flex items-center gap-1" style={{ color: '#2C2C2C' }}>
                            <Calendar size={11} /> {s.deadline}
                          </span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <a
                            href={s.applicationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2 rounded-lg text-xs font-semibold text-center text-white transition-all hover:opacity-90"
                            style={{ background: 'linear-gradient(135deg, #DAA520, #B8860B)' }}
                          >
                            Apply Now <ExternalLink size={11} className="inline ml-1" />
                          </a>
                          <button
                            onClick={() => { setSelectedScholarship(s); setShowApplications(false); }}
                            className="flex-1 py-2 rounded-lg text-xs font-semibold text-center transition-all"
                            style={{ border: '1px solid #EEE8D5', color: '#1B5E20' }}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  {/* Download saved PDF */}
                  <button
                    onClick={() => {
                      const savedScholarships = allScholarships.filter(s => savedIds.has(s.id));
                      generateScholarshipPDF(savedScholarships);
                    }}
                    className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #DAA520, #B8860B)', color: 'white' }}
                  >
                    <Download size={16} /> Download All Saved as PDF
                  </button>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-5xl mb-4">⭐</div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#1B5E20', fontFamily: 'Playfair Display, serif' }}>
                    No Scholarships Saved Yet
                  </h3>
                  <p className="text-sm mb-4" style={{ color: '#8B7355' }}>
                    Click the ⭐ star icon on any scholarship card to save it here for easy tracking
                  </p>
                  <button
                    onClick={() => setShowApplications(false)}
                    className="px-6 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #DAA520, #B8860B)', color: 'white' }}
                  >
                    Browse Scholarships
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <ScholarshipDetailModal
        scholarship={selectedScholarship}
        open={!!selectedScholarship}
        onOpenChange={(open) => { if (!open) setSelectedScholarship(null); }}
      />

      <MobileFilterDrawer open={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)}>
        {filterContent}
      </MobileFilterDrawer>
    </div>
  );
};
