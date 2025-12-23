import { useState, useEffect } from 'react';
import { GraduationCap, Calendar, IndianRupee, ExternalLink, Award, Bookmark, BookmarkCheck, Star, Users, FileCheck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

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

const typeConfig: Record<string, { gradient: string; color: string; bgColor: string }> = {
  'Merit': { gradient: 'from-blue-500 to-indigo-600', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  'Need-based': { gradient: 'from-emerald-500 to-teal-600', color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
  'Tech': { gradient: 'from-purple-500 to-pink-600', color: 'text-purple-600', bgColor: 'bg-purple-100' },
  'Government': { gradient: 'from-orange-500 to-red-600', color: 'text-orange-600', bgColor: 'bg-orange-100' },
};

const sampleScholarships: Scholarship[] = [
  { id: '1', title: 'Merit Scholarship for Engineering Students', provider: 'AICTE', description: 'Financial assistance for meritorious engineering students with 75% and above', amount: '₹50,000/year', type: 'Merit', eligibility: 'B.E/B.Tech students with 75%+ marks', deadline: '2025-02-15', apply_link: '#' },
  { id: '2', title: 'Central Sector Scholarship', provider: 'Ministry of Education', description: 'Scholarship for students belonging to economically weaker sections', amount: '₹20,000/year', type: 'Need-based', eligibility: 'Family income below 8 LPA, 80%+ in 12th', deadline: '2025-01-31', apply_link: '#' },
  { id: '3', title: 'Google India Scholarship', provider: 'Google', description: 'For students pursuing computer science and related fields', amount: '₹75,000', type: 'Tech', eligibility: 'CS/IT students with strong academic record', deadline: '2025-03-01', apply_link: '#' },
  { id: '4', title: 'Tata Scholarship for B.Tech Students', provider: 'Tata Trusts', description: 'Support for first-generation college students in engineering', amount: '₹60,000/year', type: 'Need-based', eligibility: 'First-generation engineering students', deadline: '2025-02-28', apply_link: '#' },
  { id: '5', title: 'AWS AI/ML Scholarship', provider: 'Amazon Web Services', description: 'For students interested in artificial intelligence and machine learning', amount: '₹1,00,000', type: 'Tech', eligibility: 'Students pursuing AI/ML related courses', deadline: '2025-01-20', apply_link: '#' },
  { id: '6', title: 'Post Matric Scholarship for SC/ST', provider: 'State Government', description: 'Educational support for SC/ST students', amount: 'Full tuition fees', type: 'Government', eligibility: 'SC/ST students in recognized institutions', deadline: '2025-03-15', apply_link: '#' },
];

const typeFilters = [
  { name: 'All', icon: Award, gradient: 'from-amber-500 to-yellow-600' },
  { name: 'Merit', icon: Star, gradient: 'from-blue-500 to-indigo-600' },
  { name: 'Need-based', icon: Users, gradient: 'from-emerald-500 to-teal-600' },
  { name: 'Tech', icon: GraduationCap, gradient: 'from-purple-500 to-pink-600' },
  { name: 'Government', icon: FileCheck, gradient: 'from-orange-500 to-red-600' },
];

export function ScholarshipsTab() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [savedScholarships, setSavedScholarships] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchScholarships();
    const saved = localStorage.getItem('saved_scholarships');
    if (saved) {
      setSavedScholarships(new Set(JSON.parse(saved)));
    }
  }, []);

  const fetchScholarships = async () => {
    try {
      const { data, error } = await supabase
        .from('jkkn_scholarships')
        .select('*')
        .order('deadline', { ascending: true });

      if (error) throw error;
      setScholarships(data && data.length > 0 ? data : sampleScholarships);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
      setScholarships(sampleScholarships);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSave = (id: string, title: string) => {
    setSavedScholarships(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
        toast.success('Removed from saved');
      } else {
        newSet.add(id);
        toast.success(`"${title}" saved!`);
      }
      localStorage.setItem('saved_scholarships', JSON.stringify([...newSet]));
      return newSet;
    });
  };

  const getTypeConfig = (type: string | null) => {
    return typeConfig[type || ''] || { gradient: 'from-amber-500 to-yellow-600', color: 'text-amber-600', bgColor: 'bg-amber-100' };
  };

  const filteredScholarships = scholarships.filter((scholarship) => {
    return activeFilter === 'All' || scholarship.type?.toLowerCase().includes(activeFilter.toLowerCase());
  });

  if (isLoading) {
    return (
      <div className="p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <Skeleton className="h-32 w-full rounded-2xl" />
        <div className="flex gap-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="w-24 h-10 rounded-full flex-shrink-0" />
          ))}
        </div>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-48 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-5 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Colorful Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 p-5 text-white shadow-lg">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-6 h-6" />
            <span className="text-sm font-medium text-white/80">Financial Aid</span>
          </div>
          <h2 className="text-2xl font-bold">Scholarships</h2>
          <p className="text-sm text-white/80 mt-1">Financial support for your education</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-3 text-white text-center shadow-md">
          <p className="text-2xl font-bold">{scholarships.length}</p>
          <p className="text-xs text-amber-100">Available</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-3 text-white text-center shadow-md">
          <p className="text-2xl font-bold">{typeFilters.length - 1}</p>
          <p className="text-xs text-orange-100">Categories</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-3 text-white text-center shadow-md">
          <p className="text-2xl font-bold">{savedScholarships.size}</p>
          <p className="text-xs text-yellow-100">Saved</p>
        </div>
      </div>

      {/* Colorful Type Filters */}
      <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {typeFilters.map((filter) => {
          const IconComponent = filter.icon;
          const isActive = activeFilter === filter.name;
          return (
            <button
              key={filter.name}
              onClick={() => setActiveFilter(filter.name)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all shadow-sm ${
                isActive
                  ? `bg-gradient-to-r ${filter.gradient} text-white shadow-md scale-105`
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              {filter.name}
            </button>
          );
        })}
      </div>

      {/* Scholarship Cards */}
      <div className="space-y-4">
        {filteredScholarships.map((scholarship) => {
          const config = getTypeConfig(scholarship.type);
          const isSaved = savedScholarships.has(scholarship.id);
          
          return (
            <div
              key={scholarship.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              {/* Colorful Top Banner */}
              <div className={`h-2 bg-gradient-to-r ${config.gradient}`} />
              
              <div className="p-5">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 bg-gradient-to-br ${config.gradient} rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-md`}>
                    <Award className="w-7 h-7" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={`text-sm font-semibold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
                          {scholarship.provider}
                        </p>
                        <h3 className="font-bold text-gray-900 mt-0.5 text-lg">{scholarship.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        {scholarship.type && (
                          <Badge className={`${config.bgColor} ${config.color} font-medium`}>
                            {scholarship.type}
                          </Badge>
                        )}
                        <button
                          onClick={() => toggleSave(scholarship.id, scholarship.title)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          {isSaved ? (
                            <BookmarkCheck className="w-5 h-5 text-amber-600" />
                          ) : (
                            <Bookmark className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    {scholarship.description && (
                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">{scholarship.description}</p>
                    )}

                    <div className="flex flex-wrap gap-3 mt-4">
                      {scholarship.amount && (
                        <span className={`flex items-center gap-1 text-sm font-bold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
                          <IndianRupee className="w-4 h-4 text-amber-600" />
                          {scholarship.amount}
                        </span>
                      )}
                      {scholarship.deadline && (
                        <span className="flex items-center gap-1 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          <Calendar className="w-4 h-4" />
                          Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    {scholarship.eligibility && (
                      <p className="text-xs text-gray-500 mt-3 bg-gray-50 px-3 py-2 rounded-lg">
                        <span className="font-semibold text-gray-700">Eligibility:</span> {scholarship.eligibility}
                      </p>
                    )}

                    <Button
                      className={`mt-4 bg-gradient-to-r ${config.gradient} hover:opacity-90 text-white shadow-md`}
                      onClick={() => scholarship.apply_link && window.open(scholarship.apply_link, '_blank')}
                    >
                      Apply Now
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredScholarships.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <GraduationCap className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-500 font-medium">No scholarships found</p>
          <p className="text-gray-400 text-sm mt-1">Try a different category</p>
        </div>
      )}
    </div>
  );
}
