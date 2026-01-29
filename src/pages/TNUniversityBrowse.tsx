import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, GraduationCap, Users, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { universities } from '@/data/university-entrance-data';
import { UniversityCard } from '@/components/UniversityEntrance/UniversityCard';

import GlobalLanguageSelector from '@/components/GlobalLanguageSelector';

const TNUniversityBrowse = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUniversities = universities.filter(uni =>
    uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    uni.nameTamil.includes(searchQuery) ||
    uni.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    uni.examName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/tn-university-entrance')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-bold text-lg">Browse Universities</h1>
              <p className="text-xs text-muted-foreground font-tamil">பல்கலைக்கழகங்களை ஆராய</p>
            </div>
          </div>
          <GlobalLanguageSelector />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search universities... (பல்கலைக்கழகங்களைத் தேடுங்கள்)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Stats Bar */}
        <div className="flex items-center justify-between px-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {filteredUniversities.length} Universities
          </span>
          <span>
            {filteredUniversities.reduce((acc, uni) => acc + uni.courses.length, 0)} Courses
          </span>
        </div>

        {/* Universities Grid */}
        {filteredUniversities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUniversities.map((university) => (
              <UniversityCard 
                key={university.id} 
                university={university} 
                onClick={() => navigate(`/tn-university-entrance/${university.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No universities found</p>
            <p className="text-sm">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TNUniversityBrowse;
