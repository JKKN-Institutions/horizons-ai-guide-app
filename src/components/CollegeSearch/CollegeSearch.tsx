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
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-white border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl text-white">
            <Building2 className="h-8 w-8" />
            College Search by District
          </CardTitle>
          <p className="text-[#FFD54F]">
            Find all colleges in any Tamil Nadu district with complete details
          </p>
        </CardHeader>
        <CardContent>
          <DistrictSelector
            selectedDistrict={selectedDistrict}
            onDistrictSelect={setSelectedDistrict}
          />
        </CardContent>
      </Card>

      {/* Summary Stats */}
      {selectedDistrict && !loading && colleges.length > 0 && (
        <Card className="bg-white border border-[#C8E6C9] shadow-md">
          <CardContent className="pt-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="text-sm text-[#6B7280]">Colleges in</p>
                    <p className="font-semibold text-[#1F2937]">{selectedDistrict} District</p>
                  </div>
                </div>
                <div className="h-10 w-px bg-[#C8E6C9] hidden sm:block" />
                <div className="flex flex-wrap gap-2">
                  <Badge className="text-sm py-1 font-semibold bg-[#2E7D32] text-white">
                    Total: {totalColleges} Colleges
                  </Badge>
                  {Object.entries(COLLEGE_TYPE_INFO).map(([type, info]) => (
                    typeCounts[type] > 0 && (
                      <Badge key={type} variant="outline" className="text-sm py-1 border-[#C8E6C9] text-[#374151]">
                        {info.badge} {info.label}: {typeCounts[type]}
                      </Badge>
                    )
                  ))}
                </div>
              </div>
            </div>
            {/* Autonomous Colleges - Prominent Toggle Button */}
            {autonomousCount > 0 && (
              <div className="mt-4 pt-3 border-t border-[#C8E6C9]">
                <button
                  onClick={() => setAutonomousFilter(!autonomousFilter)}
                  className={`w-full sm:w-auto flex items-center justify-center gap-3 px-5 py-3 rounded-xl font-semibold text-base transition-all duration-200 shadow-md hover:shadow-lg ${
                    autonomousFilter
                      ? 'bg-gradient-to-r from-[#7B1FA2] to-[#6A1B9A] text-white ring-2 ring-[#CE93D8] ring-offset-2'
                      : 'bg-gradient-to-r from-[#F3E5F5] to-[#E1BEE7] text-[#6A1B9A] hover:from-[#E1BEE7] hover:to-[#CE93D8] border border-[#CE93D8]'
                  }`}
                >
                  <span className="text-2xl">🏅</span>
                  <span>
                    {autonomousFilter ? '✓ Showing' : 'View'} Autonomous Colleges
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-sm font-bold ${
                    autonomousFilter
                      ? 'bg-white/20 text-white'
                      : 'bg-[#7B1FA2] text-white'
                  }`}>
                    {autonomousCount}
                  </span>
                </button>
                {autonomousFilter && (
                  <p className="text-sm text-[#7B1FA2] mt-2 flex items-center gap-1.5">
                    <span>🟣</span>
                    Showing {autonomousCount} Autonomous / Deemed institutions in {selectedDistrict}.
                    <button onClick={() => setAutonomousFilter(false)} className="underline font-medium ml-1 hover:text-[#4A148C]">Show all</button>
                  </p>
                )}
              </div>
            )}
            {totalColleges < 30 && (
              <p className="text-sm text-[#F59E0B] mt-3 flex items-center gap-2">
                <span>⚠️</span>
                Showing {totalColleges} colleges. Some colleges may not be listed yet. 
                We're continuously updating our database.
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-white rounded-xl border border-[#C8E6C9] shadow-md">
          <Loader2 className="h-12 w-12 animate-spin text-[#2E7D32] mb-4" />
          <h3 className="text-lg font-semibold mb-2 text-[#1B5E20]">
            Searching all colleges in {selectedDistrict}...
          </h3>
          <p className="text-[#4B5563] max-w-md">
            Fetching comprehensive data from government records, university affiliations, 
            and accreditation databases. This may take a moment for complete results.
          </p>
        </div>
      )}

      {/* Filters */}
      {selectedDistrict && !loading && colleges.length > 0 && (
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

      {/* Facility Checklist Guide — shown when viewing colleges */}
      {selectedDistrict && <FacilityChecklist />}

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

      {/* Sports Quota Admission Guide */}
      <SportsQuotaGuide />
    </div>
  );
};
