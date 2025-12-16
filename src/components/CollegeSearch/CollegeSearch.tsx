import { useState, useEffect, useMemo } from 'react';
import { Building2, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { DistrictSelector } from './DistrictSelector';
import { CollegeFilters } from './CollegeFilters';
import { CollegeList } from './CollegeList';
import { College, CollegeCategory, COLLEGE_TYPE_INFO, JKKN_COLLEGES } from './types';

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

      // For Namakkal, add JKKN colleges at the start of each category
      if (district === 'Namakkal') {
        const jkknCollegesList = Object.values(JKKN_COLLEGES).filter(Boolean) as College[];
        
        // Remove any duplicates (in case AI returned JKKN colleges)
        fetchedColleges = fetchedColleges.filter(c => 
          !c.name.toLowerCase().includes('jkkn')
        );
        
        // Add JKKN colleges
        fetchedColleges = [...jkknCollegesList, ...fetchedColleges];
      }

      setColleges(fetchedColleges);
    } catch (error) {
      console.error('Error fetching colleges:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch colleges. Please try again.',
        variant: 'destructive',
      });
      
      // If API fails for Namakkal, at least show JKKN colleges
      if (district === 'Namakkal') {
        setColleges(Object.values(JKKN_COLLEGES).filter(Boolean) as College[]);
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
                <Badge variant="secondary" className="text-sm py-1">
                  Total: {totalColleges}
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
          </CardContent>
        </Card>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-[#0A2E1F]" />
          <span className="ml-3 text-lg">Fetching colleges in {selectedDistrict}...</span>
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
