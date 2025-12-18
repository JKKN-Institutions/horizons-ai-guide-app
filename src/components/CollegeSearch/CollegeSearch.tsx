import { useState, useEffect, useMemo } from 'react';
import { Building2, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { DistrictSelector } from './DistrictSelector';
import { CollegeFilters } from './CollegeFilters';
import { CollegeList } from './CollegeList';
import { College, CollegeCategory, COLLEGE_TYPE_INFO, NAMAKKAL_FEATURED_COLLEGES } from './types';

// Helper function to normalize college name for comparison
const normalizeCollegeName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' ')        // Normalize spaces
    .replace(/\b(college|institute|institution|of|and|the|for)\b/g, '') // Remove common words
    .replace(/\s+/g, '')         // Remove all spaces for comparison
    .trim();
};

// Helper function to remove duplicate colleges
const removeDuplicates = (colleges: College[]): College[] => {
  const seen = new Map<string, College>();
  
  for (const college of colleges) {
    const normalizedName = normalizeCollegeName(college.name);
    
    // Check if we've seen a similar college
    let isDuplicate = false;
    for (const [existingName, existingCollege] of seen) {
      // Check for exact match or high similarity
      if (normalizedName === existingName || 
          normalizedName.includes(existingName) || 
          existingName.includes(normalizedName)) {
        // Keep the one with more info (prefer isJKKN, then by data completeness)
        if (college.isJKKN && !existingCollege.isJKKN) {
          seen.set(existingName, college);
        }
        isDuplicate = true;
        break;
      }
    }
    
    if (!isDuplicate) {
      seen.set(normalizedName, college);
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
      const { data, error } = await supabase.functions.invoke('college-search', {
        body: { district }
      });

      if (error) throw error;

      let fetchedColleges: College[] = data.colleges || [];

      // For Namakkal, add featured colleges (JKKN and aided colleges) at the start
      if (district === 'Namakkal') {
        // Remove any JKKN-related colleges from AI results to avoid duplicates
        fetchedColleges = fetchedColleges.filter(c => 
          !c.name.toLowerCase().includes('jkkn') && 
          !c.name.toLowerCase().includes('j.k.k.') &&
          !c.name.toLowerCase().includes('jkk ')
        );
        
        // Add featured Namakkal colleges first
        fetchedColleges = [...NAMAKKAL_FEATURED_COLLEGES, ...fetchedColleges];
      }

      // Remove duplicates from all results
      fetchedColleges = removeDuplicates(fetchedColleges);

      setColleges(fetchedColleges);
    } catch (error) {
      console.error('Error fetching colleges:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch colleges. Please try again.',
        variant: 'destructive',
      });
      
      // If API fails for Namakkal, at least show featured colleges
      if (district === 'Namakkal') {
        setColleges(NAMAKKAL_FEATURED_COLLEGES);
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
      <Card className="bg-gradient-to-r from-[#0A2E1F] to-[#0A2E1F]/90 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Building2 className="h-8 w-8" />
            College Search by District
          </CardTitle>
          <p className="text-white/80">
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
        <Card>
          <CardContent className="pt-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="text-sm text-muted-foreground">Colleges in</p>
                    <p className="font-semibold">{selectedDistrict} District</p>
                  </div>
                </div>
                <div className="h-10 w-px bg-border hidden sm:block" />
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-sm py-1 font-semibold">
                    Total: {totalColleges} Colleges
                  </Badge>
                  {Object.entries(COLLEGE_TYPE_INFO).map(([type, info]) => (
                    typeCounts[type] > 0 && (
                      <Badge key={type} variant="outline" className="text-sm py-1">
                        {info.badge} {info.label}: {typeCounts[type]}
                      </Badge>
                    )
                  ))}
                </div>
              </div>
            </div>
            {totalColleges < 30 && (
              <p className="text-sm text-amber-600 mt-3 flex items-center gap-2">
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
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-orange-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2 text-white">
            Searching all colleges in {selectedDistrict}...
          </h3>
          <p className="text-slate-300 max-w-md">
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
