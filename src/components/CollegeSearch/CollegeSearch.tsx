import { useState, useEffect, useMemo } from 'react';
import { Building2, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { DistrictSelector } from './DistrictSelector';
import { CollegeFilters } from './CollegeFilters';
import { CollegeList } from './CollegeList';
import { College, CollegeCategory, COLLEGE_TYPE_INFO, NAMAKKAL_FEATURED_COLLEGES, ERODE_FEATURED_COLLEGES, SALEM_FEATURED_COLLEGES, COIMBATORE_FEATURED_COLLEGES, TIRUPUR_FEATURED_COLLEGES, KARUR_FEATURED_COLLEGES, ARIYALUR_FEATURED_COLLEGES, CHENGALPATTU_FEATURED_COLLEGES, CHENNAI_FEATURED_COLLEGES, CUDDALORE_FEATURED_COLLEGES, DHARMAPURI_FEATURED_COLLEGES, DINDIGUL_FEATURED_COLLEGES, KALLAKURICHI_FEATURED_COLLEGES, KANCHIPURAM_FEATURED_COLLEGES } from './types';

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

  // Fetch colleges when district changes
  useEffect(() => {
    if (selectedDistrict) {
      fetchColleges(selectedDistrict);
    } else {
      setColleges([]);
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
            description: `College data for ${district} district is being updated. Try Ariyalur, Chennai, Chengalpattu, Coimbatore, Cuddalore, Dharmapuri, Dindigul, Erode, Kallakurichi, Kanchipuram, Karur, Namakkal, Salem, or Tirupur.`,
          });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // Calculate type counts
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {
      government: 0,
      'government-aided': 0,
      private: 0,
      autonomous: 0,
    };
    colleges.forEach(c => {
      if (counts[c.type] !== undefined) {
        counts[c.type]++;
      }
    });
    return counts;
  }, [colleges]);

  const totalColleges = colleges.length;

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
      />
    </div>
  );
};
