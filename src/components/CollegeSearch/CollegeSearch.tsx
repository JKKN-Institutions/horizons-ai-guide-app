import { useState, useEffect, useMemo } from 'react';
import { Building2, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { DistrictSelector } from './DistrictSelector';
import { CollegeFilters } from './CollegeFilters';
import { CollegeList } from './CollegeList';
import { FacilityChecklist } from './FacilityChecklist';
import { SportsQuotaGuide } from './SportsQuotaGuide';
import { College, CollegeCategory, COLLEGE_TYPE_INFO, isAutonomousCollege, NAMAKKAL_FEATURED_COLLEGES, ERODE_FEATURED_COLLEGES, SALEM_FEATURED_COLLEGES, COIMBATORE_FEATURED_COLLEGES, TIRUPUR_FEATURED_COLLEGES, KARUR_FEATURED_COLLEGES, ARIYALUR_FEATURED_COLLEGES, CHENGALPATTU_FEATURED_COLLEGES, CHENNAI_FEATURED_COLLEGES, CUDDALORE_FEATURED_COLLEGES, DHARMAPURI_FEATURED_COLLEGES, DINDIGUL_FEATURED_COLLEGES, KALLAKURICHI_FEATURED_COLLEGES, KANCHIPURAM_FEATURED_COLLEGES, KANYAKUMARI_FEATURED_COLLEGES, KRISHNAGIRI_FEATURED_COLLEGES, MADURAI_FEATURED_COLLEGES, MAYILADUTHURAI_FEATURED_COLLEGES, NAGAPATTINAM_FEATURED_COLLEGES, NILGIRIS_FEATURED_COLLEGES, PERAMBALUR_FEATURED_COLLEGES, PUDUKKOTTAI_FEATURED_COLLEGES, RAMANATHAPURAM_FEATURED_COLLEGES, RANIPET_FEATURED_COLLEGES, SIVAGANGA_FEATURED_COLLEGES, TENKASI_FEATURED_COLLEGES, THANJAVUR_FEATURED_COLLEGES, THENI_FEATURED_COLLEGES, THOOTHUKUDI_FEATURED_COLLEGES, TIRUCHIRAPPALLI_FEATURED_COLLEGES, TIRUNELVELI_FEATURED_COLLEGES, TIRUPATHUR_FEATURED_COLLEGES, TIRUVALLUR_FEATURED_COLLEGES, TIRUVANNAMALAI_FEATURED_COLLEGES, TIRUVARUR_FEATURED_COLLEGES, VELLORE_FEATURED_COLLEGES, VILUPPURAM_FEATURED_COLLEGES, VIRUDHUNAGAR_FEATURED_COLLEGES } from './types';

// Helper function to normalize college name for comparison
const normalizeCollegeName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' ')        // Normalize spaces
    .replace(/\b(college|institute|institution|of|and|the|for|government|govt|hospital)\b/g, '') // Remove common words
    .replace(/\s+/g, '')         // Remove all spaces for comparison
    .trim();
};

// Helper function to remove duplicate colleges
const removeDuplicates = (colleges: College[]): College[] => {
  const seen = new Map<string, College>();
  const seenByCategoryLocation = new Map<string, College>();
  
  for (const college of colleges) {
    const normalizedName = normalizeCollegeName(college.name);
    
    // Create a category+location key for detecting same institutions with different names
    const categoryLocationKey = `${college.category}_${(college.address || '').toLowerCase().replace(/[^a-z]/g, '')}`;
    
    // Check if we've seen a similar college by name
    let isDuplicate = false;
    for (const [existingName, existingCollege] of seen) {
      if (normalizedName === existingName || 
          normalizedName.includes(existingName) || 
          existingName.includes(normalizedName)) {
        if (college.isJKKN && !existingCollege.isJKKN) {
          seen.set(existingName, college);
        }
        isDuplicate = true;
        break;
      }
    }
    
    // Also check by category + location (catches "Govt Medical College" vs "Namakkal Medical College")
    if (!isDuplicate && college.category === 'medical' && seenByCategoryLocation.has(categoryLocationKey)) {
      isDuplicate = true;
    }
    
    if (!isDuplicate) {
      seen.set(normalizedName, college);
      if (college.category === 'medical') {
        seenByCategoryLocation.set(categoryLocationKey, college);
      }
    }
  }
  
  return Array.from(seen.values());
};

export const CollegeSearch = () => {
  const { toast } = useToast();
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<CollegeCategory[]>([]);
  const [selectedNaacGrade, setSelectedNaacGrade] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('name');
  const [autonomousFilter, setAutonomousFilter] = useState(false);

  // Fetch colleges when district changes
  useEffect(() => {
    if (selectedDistrict) {
      fetchColleges(selectedDistrict);
      setAutonomousFilter(false);
    } else {
      setColleges([]);
      setAutonomousFilter(false);
    }
  }, [selectedDistrict]);

  const fetchColleges = async (district: string) => {
    setLoading(true);
    try {
      // Local college data for supported districts
      const localData: Record<string, College[]> = {
        'Namakkal': NAMAKKAL_FEATURED_COLLEGES,
        'Erode': ERODE_FEATURED_COLLEGES,
        'Salem': SALEM_FEATURED_COLLEGES,
        'Coimbatore': COIMBATORE_FEATURED_COLLEGES,
        'Tirupur': TIRUPUR_FEATURED_COLLEGES,
        'Karur': KARUR_FEATURED_COLLEGES,
        'Ariyalur': ARIYALUR_FEATURED_COLLEGES,
        'Chengalpattu': CHENGALPATTU_FEATURED_COLLEGES,
        'Chennai': CHENNAI_FEATURED_COLLEGES,
        'Cuddalore': CUDDALORE_FEATURED_COLLEGES,
        'Dharmapuri': DHARMAPURI_FEATURED_COLLEGES,
        'Dindigul': DINDIGUL_FEATURED_COLLEGES,
        'Kallakurichi': KALLAKURICHI_FEATURED_COLLEGES,
        'Kanchipuram': KANCHIPURAM_FEATURED_COLLEGES,
        'Kanyakumari': KANYAKUMARI_FEATURED_COLLEGES,
        'Krishnagiri': KRISHNAGIRI_FEATURED_COLLEGES,
        'Madurai': MADURAI_FEATURED_COLLEGES,
        'Mayiladuthurai': MAYILADUTHURAI_FEATURED_COLLEGES,
        'Nagapattinam': NAGAPATTINAM_FEATURED_COLLEGES,
        'Nilgiris': NILGIRIS_FEATURED_COLLEGES,
        'Perambalur': PERAMBALUR_FEATURED_COLLEGES,
        'Pudukkottai': PUDUKKOTTAI_FEATURED_COLLEGES,
        'Ramanathapuram': RAMANATHAPURAM_FEATURED_COLLEGES,
        'Ranipet': RANIPET_FEATURED_COLLEGES,
        'Sivaganga': SIVAGANGA_FEATURED_COLLEGES,
        'Tenkasi': TENKASI_FEATURED_COLLEGES,
        'Thanjavur': THANJAVUR_FEATURED_COLLEGES,
        'Theni': THENI_FEATURED_COLLEGES,
        'Thoothukudi': THOOTHUKUDI_FEATURED_COLLEGES,
        'Tiruchirappalli': TIRUCHIRAPPALLI_FEATURED_COLLEGES,
        'Tirunelveli': TIRUNELVELI_FEATURED_COLLEGES,
        'Tirupathur': TIRUPATHUR_FEATURED_COLLEGES,
        'Tiruvallur': TIRUVALLUR_FEATURED_COLLEGES,
        'Tiruvannamalai': TIRUVANNAMALAI_FEATURED_COLLEGES,
        'Tiruvarur': TIRUVARUR_FEATURED_COLLEGES,
        'Vellore': VELLORE_FEATURED_COLLEGES,
        'Viluppuram': VILUPPURAM_FEATURED_COLLEGES,
        'Virudhunagar': VIRUDHUNAGAR_FEATURED_COLLEGES,
      };

      if (localData[district]) {
        // Use local data directly - no API call needed
        setColleges(localData[district]);
      } else {
        // Try Supabase for other districts
        try {
          const { data, error } = await supabase.functions.invoke('college-search', {
            body: { district }
          });

          if (error) throw error;

          let fetchedColleges: College[] = data.colleges || [];
          fetchedColleges = removeDuplicates(fetchedColleges);
          setColleges(fetchedColleges);
        } catch (apiError) {
          console.error('Error fetching colleges:', apiError);
          // Show empty state with helpful message instead of error
          setColleges([]);
          toast({
            title: 'Coming Soon',
            description: `College data for ${district} district is being updated. All 38 Tamil Nadu districts are now available — select from the dropdown to explore.`,
          });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // Calculate type counts - use smart detection for autonomous
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {
      government: 0,
      'government-aided': 0,
      private: 0,
      autonomous: 0,
    };
    colleges.forEach(c => {
      // Smart autonomous detection: check name, accreditation, AND type
      if (isAutonomousCollege(c)) {
        counts['autonomous']++;
      } else if (counts[c.type] !== undefined) {
        counts[c.type]++;
      }
    });
    return counts;
  }, [colleges]);

  const totalColleges = colleges.length;

  // Count autonomous colleges (checks name, accreditation, and type)
  const autonomousCount = useMemo(() => {
    return colleges.filter(isAutonomousCollege).length;
  }, [colleges]);

  return (
    <div className="space-y-4">
      {/* ═══ COMPACT HEADER ═══ */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold">Find Colleges</h2>
            <p className="text-xs text-blue-200">கல்லூரிகளைக் கண்டறியுங்கள் — Tamil Nadu</p>
          </div>
        </div>
        <p className="text-sm text-blue-200 mt-2">Search 1000+ colleges across 38 districts. Filter by type, category, NAAC grade & more.</p>
      </div>

      {/* ═══ DISTRICT SELECTOR ═══ */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-7 h-7 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center">1</span>
          <p className="text-sm font-bold text-gray-900">Select Your District</p>
        </div>
        <DistrictSelector
          selectedDistrict={selectedDistrict}
          onDistrictSelect={setSelectedDistrict}
        />
      </div>

      {/* ═══ FEATURES OVERVIEW — shown when NO district selected ═══ */}
      {!selectedDistrict && (
        <div className="space-y-4">
          {/* Feature Cards */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
            <p className="text-sm font-bold text-gray-900 mb-3">What you can do here:</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
                <span className="text-xl">🟢</span>
                <p className="text-xs font-bold text-green-800 mt-1">Government</p>
                <p className="text-xs text-green-600">Lowest fees</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
                <span className="text-xl">🔵</span>
                <p className="text-xs font-bold text-blue-800 mt-1">Government Aided</p>
                <p className="text-xs text-blue-600">Govt + Private</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-center">
                <span className="text-xl">🟠</span>
                <p className="text-xs font-bold text-orange-800 mt-1">Private</p>
                <p className="text-xs text-orange-600">Self-financed</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-center">
                <span className="text-xl">🟣</span>
                <p className="text-xs font-bold text-purple-800 mt-1">Autonomous</p>
                <p className="text-xs text-purple-600">Own syllabus</p>
              </div>
            </div>
          </div>

          {/* Filter Preview */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
            <p className="text-sm font-bold text-gray-900 mb-3">Filter & find the right college:</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg">
                <span className="text-base">🏛️</span>
                <div>
                  <p className="text-xs font-bold text-gray-800">16 College Categories</p>
                  <p className="text-xs text-gray-500">Engineering, Medical, Arts, Law, Nursing, Pharmacy, B.Ed & more</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg">
                <span className="text-base">⭐</span>
                <div>
                  <p className="text-xs font-bold text-gray-800">NAAC Grade Filter</p>
                  <p className="text-xs text-gray-500">A++, A+, A, B++, B+, B, C — find top-rated colleges</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg">
                <span className="text-base">🔍</span>
                <div>
                  <p className="text-xs font-bold text-gray-800">Search by Name</p>
                  <p className="text-xs text-gray-500">Type any college name to find it instantly</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg">
                <span className="text-base">📊</span>
                <div>
                  <p className="text-xs font-bold text-gray-800">Sort Options</p>
                  <p className="text-xs text-gray-500">Name A-Z, Oldest first, Newest first, NAAC grade</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2.5 bg-orange-50 rounded-lg border border-orange-200">
                <span className="text-base">🏆</span>
                <div>
                  <p className="text-xs font-bold text-orange-800">Sports Quota Guide</p>
                  <p className="text-xs text-orange-600">12 colleges with sports seats, rules & how to apply</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg">
                <span className="text-base">📋</span>
                <div>
                  <p className="text-xs font-bold text-gray-800">College Visit Checklist</p>
                  <p className="text-xs text-gray-500">18 things to check when visiting a college</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center">
            <p className="text-sm font-bold text-blue-800">👆 Select a district above to start exploring colleges</p>
            <p className="text-xs text-blue-600 mt-1">38 districts · 1000+ colleges · Government, Aided & Private</p>
          </div>

          {/* Sports Quota always visible */}
          <SportsQuotaGuide />
        </div>
      )}

      {/* ═══ AFTER DISTRICT SELECTED — Results ═══ */}
      {selectedDistrict && (
        <>
          {/* Summary Stats */}
          {!loading && colleges.length > 0 && (
            <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-lg">📍</span>
                <p className="text-sm font-bold text-gray-900">{selectedDistrict} District</p>
                <Badge className="text-xs font-bold bg-blue-700 text-white">{totalColleges} Colleges</Badge>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(COLLEGE_TYPE_INFO).map(([type, info]) => (
                  typeCounts[type] > 0 && (
                    <Badge key={type} variant="outline" className="text-xs border-gray-300 text-gray-700">
                      {info.badge} {info.label}: {typeCounts[type]}
                    </Badge>
                  )
                ))}
              </div>
              {/* Autonomous Toggle */}
              {autonomousCount > 0 && (
                <button
                  onClick={() => setAutonomousFilter(!autonomousFilter)}
                  className={`mt-3 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    autonomousFilter
                      ? 'bg-purple-700 text-white'
                      : 'bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100'
                  }`}
                >
                  🏅 {autonomousFilter ? `Showing ${autonomousCount}` : `View ${autonomousCount}`} Autonomous Colleges
                </button>
              )}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center py-10 bg-white rounded-xl border-2 border-gray-200">
              <Loader2 className="h-10 w-10 animate-spin text-blue-700 mb-3" />
              <p className="text-sm font-bold text-gray-700">Searching colleges in {selectedDistrict}...</p>
            </div>
          )}

          {/* Filters */}
          {!loading && colleges.length > 0 && (
            <CollegeFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedTypes={selectedTypes}
              onTypeChange={setSelectedTypes}
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
              selectedNaacGrade={selectedNaacGrade}
              onNaacGradeChange={setSelectedNaacGrade}
              sortBy={sortBy}
              onSortChange={setSortBy}
              typeCounts={typeCounts}
            />
          )}

          {/* Facility Checklist */}
          <FacilityChecklist />

          {/* College List */}
          <CollegeList
            colleges={colleges}
            loading={loading}
            selectedDistrict={selectedDistrict}
            searchQuery={searchQuery}
            selectedTypes={selectedTypes}
            selectedCategories={selectedCategories}
            selectedNaacGrade={selectedNaacGrade}
            sortBy={sortBy}
            autonomousFilter={autonomousFilter}
          />

          {/* Sports Quota */}
          <SportsQuotaGuide />
        </>
      )}
    </div>
  );
};
