import { useMemo } from 'react';
import { College, COLLEGE_CATEGORIES, CollegeCategory } from './types';
import { CollegeCard } from './CollegeCard';
import { Skeleton } from '@/components/ui/skeleton';

interface CollegeListProps {
  colleges: College[];
  loading: boolean;
  selectedDistrict: string | null;
  searchQuery: string;
  selectedTypes: string[];
  selectedCategories: CollegeCategory[];
  selectedNaacGrade: string | null;
  sortBy: string;
}

export const CollegeList = ({
  colleges,
  loading,
  selectedDistrict,
  searchQuery,
  selectedTypes,
  selectedCategories,
  selectedNaacGrade,
  sortBy,
}: CollegeListProps) => {
  // Filter and sort colleges
  const filteredColleges = useMemo(() => {
    let result = [...colleges];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(query) ||
        c.courses.toLowerCase().includes(query)
      );
    }

    // Apply type filter
    if (selectedTypes.length > 0) {
      result = result.filter(c => selectedTypes.includes(c.type));
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter(c => selectedCategories.includes(c.category));
    }

    // Apply NAAC grade filter
    if (selectedNaacGrade) {
      result = result.filter(c => c.naacGrade === selectedNaacGrade);
    }

    // Apply sorting
    result.sort((a, b) => {
      // JKKN colleges always first for Namakkal
      if (selectedDistrict === 'Namakkal') {
        if (a.isJKKN && !b.isJKKN) return -1;
        if (!a.isJKKN && b.isJKKN) return 1;
      }

      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'name_desc':
          return b.name.localeCompare(a.name);
        case 'established':
          return (a.establishedYear || 9999) - (b.establishedYear || 9999);
        case 'established_desc':
          return (b.establishedYear || 0) - (a.establishedYear || 0);
        case 'naac':
          const gradeOrder = ['A++', 'A+', 'A', 'B++', 'B+', 'B', 'C', ''];
          return gradeOrder.indexOf(a.naacGrade || '') - gradeOrder.indexOf(b.naacGrade || '');
        default:
          return 0;
      }
    });

    return result;
  }, [colleges, searchQuery, selectedTypes, selectedCategories, selectedNaacGrade, sortBy, selectedDistrict]);

  // Group colleges by category
  const collegesByCategory = useMemo(() => {
    const grouped: Record<CollegeCategory, College[]> = {} as any;
    
    COLLEGE_CATEGORIES.forEach(cat => {
      grouped[cat.id] = filteredColleges.filter(c => c.category === cat.id);
    });

    return grouped;
  }, [filteredColleges]);

  if (!selectedDistrict) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🎓</div>
        <h3 className="text-xl font-semibold mb-2">Select a District</h3>
        <p className="text-muted-foreground">
          Choose a district from the dropdown above to explore all colleges in that area
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-8 w-64" />
            <div className="grid md:grid-cols-2 gap-4">
              <Skeleton className="h-48" />
              <Skeleton className="h-48" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredColleges.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold mb-2">No Colleges Found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {COLLEGE_CATEGORIES.map((category) => {
        const categoryColleges = collegesByCategory[category.id];
        if (categoryColleges.length === 0) return null;

        return (
          <div key={category.id}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 sticky top-0 bg-background py-2 z-10 border-b">
              <span className="text-2xl">{category.icon}</span>
              {category.name}
              <span className="text-sm font-normal text-muted-foreground">
                ({categoryColleges.length})
              </span>
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {categoryColleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
