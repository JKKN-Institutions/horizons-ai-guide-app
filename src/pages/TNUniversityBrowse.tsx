import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, GraduationCap, Users, ArrowLeft, Building2, Landmark, Award, MapPin, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { universities } from '@/data/university-entrance-data';
import { UniversityCard } from '@/components/UniversityEntrance/UniversityCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import GlobalLanguageSelector from '@/components/GlobalLanguageSelector';

type UniversityType = 'State Government' | 'Central Government' | 'Deemed University (Central Govt Funded)';

// Location regions for Central Government institutions
const locationRegions = [
  {
    id: 'tamil-nadu-puducherry',
    label: 'Tamil Nadu & Puducherry',
    labelTamil: 'தமிழ்நாடு & புதுச்சேரி',
    states: ['Tamil Nadu', 'Puducherry'],
  },
  {
    id: 'neighbouring',
    label: 'Neighbouring States',
    labelTamil: 'அண்டை மாநிலங்கள்',
    states: ['Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana'],
  },
  {
    id: 'north',
    label: 'North India',
    labelTamil: 'வட இந்தியா',
    states: ['Delhi', 'Uttar Pradesh', 'Rajasthan', 'Haryana', 'Punjab', 'Himachal Pradesh', 'Uttarakhand', 'Jammu & Kashmir', 'J&K'],
  },
  {
    id: 'west',
    label: 'West India',
    labelTamil: 'மேற்கு இந்தியா',
    states: ['Maharashtra', 'Gujarat', 'Goa', 'Madhya Pradesh'],
  },
  {
    id: 'east',
    label: 'East India',
    labelTamil: 'கிழக்கு இந்தியா',
    states: ['West Bengal', 'Bihar', 'Jharkhand', 'Odisha', 'Chhattisgarh'],
  },
  {
    id: 'northeast',
    label: 'North-East India',
    labelTamil: 'வடகிழக்கு இந்தியா',
    states: ['Assam', 'Meghalaya', 'Manipur', 'Mizoram', 'Nagaland', 'Tripura', 'Sikkim', 'Arunachal Pradesh'],
  },
];

// Helper to extract state from location string
const extractState = (location: string): string => {
  const parts = location.split(',').map(p => p.trim());
  return parts[parts.length - 1] || parts[0];
};

const universityTypeTabs: { value: UniversityType; label: string; labelTamil: string; icon: React.ElementType }[] = [
  { value: 'State Government', label: 'State Universities', labelTamil: 'மாநில பல்கலைக்கழகங்கள்', icon: Landmark },
  { value: 'Central Government', label: 'Central Universities', labelTamil: 'மத்திய பல்கலைக்கழகங்கள்', icon: Building2 },
  { value: 'Deemed University (Central Govt Funded)', label: 'Deemed Universities', labelTamil: 'கருதப்படும் பல்கலைக்கழகங்கள்', icon: Award },
];

const TNUniversityBrowse = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<UniversityType>('State Government');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const filteredUniversities = useMemo(() => {
    return universities.filter(uni => {
      const matchesSearch = 
        uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.nameTamil.includes(searchQuery) ||
        uni.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.examName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = uni.type === selectedType;
      
      // Location filter only applies to Central Government
      let matchesLocation = true;
      if (selectedType === 'Central Government' && selectedLocation) {
        const region = locationRegions.find(r => r.id === selectedLocation);
        if (region) {
          const uniState = extractState(uni.location);
          matchesLocation = region.states.some(state => 
            uniState.toLowerCase().includes(state.toLowerCase()) ||
            state.toLowerCase().includes(uniState.toLowerCase())
          );
        }
      }
      
      return matchesSearch && matchesType && matchesLocation;
    });
  }, [searchQuery, selectedType, selectedLocation]);

  const typeCounts = useMemo(() => {
    return {
      'State Government': universities.filter(u => u.type === 'State Government').length,
      'Central Government': universities.filter(u => u.type === 'Central Government').length,
      'Deemed University (Central Govt Funded)': universities.filter(u => u.type === 'Deemed University (Central Govt Funded)').length,
    };
  }, []);

  // Count institutions per region for Central Government
  const regionCounts = useMemo(() => {
    const centralUnis = universities.filter(u => u.type === 'Central Government');
    const counts: Record<string, number> = {};
    
    locationRegions.forEach(region => {
      counts[region.id] = centralUnis.filter(uni => {
        const uniState = extractState(uni.location);
        return region.states.some(state => 
          uniState.toLowerCase().includes(state.toLowerCase()) ||
          state.toLowerCase().includes(uniState.toLowerCase())
        );
      }).length;
    });
    
    return counts;
  }, []);

  // Reset location filter when switching away from Central Government
  const handleTypeChange = (type: UniversityType) => {
    setSelectedType(type);
    if (type !== 'Central Government') {
      setSelectedLocation(null);
    }
  };

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

        {/* University Type Tabs */}
        <Tabs value={selectedType} onValueChange={(v) => handleTypeChange(v as UniversityType)} className="w-full">
          <TabsList className="w-full flex flex-wrap h-auto gap-2 bg-muted/50 p-2 rounded-lg">
            {universityTypeTabs.map((tab) => {
              const Icon = tab.icon;
              const count = typeCounts[tab.value];
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex-1 min-w-[140px] flex items-center gap-2 py-2.5 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden text-xs">{tab.label.split(' ')[0]}</span>
                  <span className="ml-auto bg-background/20 text-xs px-1.5 py-0.5 rounded-full">{count}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        {/* Location Filter - Only for Central Government */}
        {selectedType === 'Central Government' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Filter by Location</span>
                <span className="font-tamil text-xs">/ இடம் வாரியாக வடிகட்டு</span>
              </div>
              {selectedLocation && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedLocation(null)}
                  className="text-xs h-7"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {locationRegions.map((region) => (
                <Badge
                  key={region.id}
                  variant={selectedLocation === region.id ? "default" : "outline"}
                  className={`cursor-pointer transition-all py-1.5 px-3 ${
                    selectedLocation === region.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setSelectedLocation(selectedLocation === region.id ? null : region.id)}
                >
                  <span className="mr-1">{region.label}</span>
                  <span className="text-[10px] opacity-70">({regionCounts[region.id] || 0})</span>
                </Badge>
              ))}
            </div>
          </div>
        )}

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
            <p className="text-sm">Try a different search term or category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TNUniversityBrowse;
