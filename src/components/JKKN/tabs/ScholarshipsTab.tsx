import { useState, useEffect } from 'react';
import { GraduationCap, Calendar, IndianRupee, ExternalLink, Award } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface Scholarship {
  id: string;
  title: string;
  provider: string;
  description: string | null;
  amount: string | null;
  type: string | null;
  eligibility: string | null;
  deadline: string | null;
  apply_link: string | null;
}

const typeFilters = ['All', 'Merit', 'Need-based', 'Tech'];

export function ScholarshipsTab() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      const { data, error } = await supabase
        .from('jkkn_scholarships')
        .select('*')
        .order('deadline', { ascending: true });

      if (error) throw error;
      setScholarships(data || []);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredScholarships = scholarships.filter((scholarship) => {
    return activeFilter === 'All' || scholarship.type?.toLowerCase().includes(activeFilter.toLowerCase());
  });

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
            <div className="space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">Scholarships</h2>
        <p className="text-sm text-gray-500 mt-1">Financial support for your education</p>
      </div>

      {/* Type Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {typeFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeFilter === filter
                ? 'bg-[#2E7D32] text-white'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Scholarship Cards */}
      <div className="space-y-4">
        {filteredScholarships.map((scholarship) => (
          <div
            key={scholarship.id}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="w-12 h-12 bg-gradient-to-br from-[#FFD54F] to-[#F59E0B] rounded-xl flex items-center justify-center text-white flex-shrink-0">
                <Award className="w-6 h-6" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm text-[#2E7D32] font-medium">{scholarship.provider}</p>
                    <h3 className="font-semibold text-gray-900 mt-0.5">{scholarship.title}</h3>
                  </div>
                  {scholarship.type && (
                    <Badge variant="secondary" className="bg-[#E8F5E9] text-[#2E7D32] flex-shrink-0">
                      {scholarship.type}
                    </Badge>
                  )}
                </div>

                {scholarship.description && (
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{scholarship.description}</p>
                )}

                <div className="flex flex-wrap gap-4 mt-3">
                  {scholarship.amount && (
                    <span className="flex items-center gap-1 text-sm font-semibold text-[#2E7D32]">
                      <IndianRupee className="w-4 h-4" />
                      {scholarship.amount}
                    </span>
                  )}
                  {scholarship.deadline && (
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {scholarship.eligibility && (
                  <p className="text-xs text-gray-500 mt-2">
                    <span className="font-medium">Eligibility:</span> {scholarship.eligibility}
                  </p>
                )}

                <Button
                  className="mt-4 bg-[#F59E0B] hover:bg-[#D97706] text-white"
                  onClick={() => scholarship.apply_link && window.open(scholarship.apply_link, '_blank')}
                >
                  Apply Now
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredScholarships.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No scholarships found</p>
        </div>
      )}
    </div>
  );
}
