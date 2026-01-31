import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, GraduationCap, Users, ArrowLeft, Building2, Landmark, Award, MapPin, X, Layers, FileText } from 'lucide-react';
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

// Institution types for Central Government institutions
const institutionTypes = [
  {
    id: 'central-universities',
    label: 'Central Universities',
    labelTamil: 'மத்திய பல்கலைக்கழகங்கள்',
    entrance: 'CUET',
    patterns: ['Central University', 'University of Delhi', 'University of Hyderabad', 'JNU', 'Jawaharlal Nehru University', 'BHU', 'Banaras Hindu University', 'AMU', 'Aligarh Muslim University', 'Jamia Millia', 'Visva-Bharati', 'Pondicherry University', 'Tezpur University', 'Assam University', 'NEHU', 'Manipur University', 'Mizoram University', 'Nagaland University', 'Tripura University', 'Sikkim University', 'Rajiv Gandhi University'],
  },
  {
    id: 'iits',
    label: 'IITs',
    labelTamil: 'இந்திய தொழில்நுட்பக் கழகங்கள்',
    entrance: 'JEE Advanced',
    patterns: ['IIT ', 'Indian Institute of Technology'],
  },
  {
    id: 'nits',
    label: 'NITs',
    labelTamil: 'தேசிய தொழில்நுட்ப நிறுவனங்கள்',
    entrance: 'JEE Main',
    patterns: ['NIT ', 'National Institute of Technology', 'MNNIT', 'MNIT', 'VNIT', 'SVNIT'],
  },
  {
    id: 'aiims',
    label: 'AIIMS',
    labelTamil: 'அகில இந்திய மருத்துவ அறிவியல் நிறுவனங்கள்',
    entrance: 'NEET UG',
    patterns: ['AIIMS', 'JIPMER'],
  },
  {
    id: 'iims',
    label: 'IIMs',
    labelTamil: 'இந்திய மேலாண்மை நிறுவனங்கள்',
    entrance: 'CAT',
    patterns: ['IIM ', 'Indian Institute of Management'],
  },
  {
    id: 'iisers',
    label: 'IISERs',
    labelTamil: 'இந்திய அறிவியல் கல்வி ஆராய்ச்சி நிறுவனங்கள்',
    entrance: 'IAT / JEE Advanced',
    patterns: ['IISER', 'Indian Institute of Science Education'],
  },
  {
    id: 'iiits',
    label: 'IIITs',
    labelTamil: 'இந்திய தகவல் தொழில்நுட்ப நிறுவனங்கள்',
    entrance: 'JEE Main',
    patterns: ['IIIT', 'Indian Institute of Information Technology'],
  },
];

// Entrance exam types for Central Government institutions
const entranceExams = [
  {
    id: 'cuet',
    label: 'CUET',
    labelTamil: 'மத்திய பல்கலை நுழைவுத் தேர்வு',
    fullName: 'Central University Entrance Test',
    examMonth: 'May-June',
    tamilAvailable: true,
    patterns: ['CUET', 'Central University'],
  },
  {
    id: 'jee-main',
    label: 'JEE Main',
    labelTamil: 'ஜேஇஇ மெயின்',
    fullName: 'Joint Entrance Examination Main',
    examMonth: 'January & April',
    tamilAvailable: false,
    patterns: ['JEE Main', 'NIT ', 'IIIT', 'GFTI'],
  },
  {
    id: 'jee-advanced',
    label: 'JEE Advanced',
    labelTamil: 'ஜேஇஇ அட்வான்ஸ்டு',
    fullName: 'Joint Entrance Examination Advanced',
    examMonth: 'May-June',
    tamilAvailable: false,
    patterns: ['JEE Advanced', 'IIT '],
  },
  {
    id: 'neet-ug',
    label: 'NEET UG',
    labelTamil: 'நீட் யூஜி',
    fullName: 'National Eligibility cum Entrance Test',
    examMonth: 'May',
    tamilAvailable: true,
    patterns: ['NEET', 'AIIMS', 'JIPMER', 'Medical'],
  },
  {
    id: 'cat',
    label: 'CAT',
    labelTamil: 'கேட்',
    fullName: 'Common Admission Test',
    examMonth: 'November',
    tamilAvailable: false,
    patterns: ['CAT', 'IIM '],
  },
  {
    id: 'iat',
    label: 'IAT',
    labelTamil: 'ஐஏடி',
    fullName: 'IISER Aptitude Test',
    examMonth: 'June',
    tamilAvailable: false,
    patterns: ['IAT', 'IISER'],
  },
  {
    id: 'gate',
    label: 'GATE',
    labelTamil: 'கேட்',
    fullName: 'Graduate Aptitude Test in Engineering',
    examMonth: 'February',
    tamilAvailable: false,
    patterns: ['GATE', 'M.Tech', 'MTech'],
  },
  {
    id: 'direct',
    label: 'Direct Admission',
    labelTamil: 'நேரடி சேர்க்கை',
    fullName: 'Based on 12th Marks / Interview',
    examMonth: 'Varies',
    tamilAvailable: true,
    patterns: ['Direct', 'Merit', '12th Marks', 'Interview'],
  },
];

// Helper to check if university matches institution type
const matchesInstitutionType = (uniName: string, patterns: string[]): boolean => {
  const nameLower = uniName.toLowerCase();
  return patterns.some(pattern => nameLower.includes(pattern.toLowerCase()));
};

// Helper to check if university matches entrance exam
const matchesEntranceExam = (examName: string, uniName: string, patterns: string[]): boolean => {
  const examLower = examName.toLowerCase();
  const nameLower = uniName.toLowerCase();
  return patterns.some(pattern => 
    examLower.includes(pattern.toLowerCase()) || 
    nameLower.includes(pattern.toLowerCase())
  );
};

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
  const [selectedInstitutionType, setSelectedInstitutionType] = useState<string | null>(null);
  const [selectedEntranceExam, setSelectedEntranceExam] = useState<string | null>(null);

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
      
      // Institution type filter only applies to Central Government
      let matchesInstType = true;
      if (selectedType === 'Central Government' && selectedInstitutionType) {
        const instType = institutionTypes.find(t => t.id === selectedInstitutionType);
        if (instType) {
          matchesInstType = matchesInstitutionType(uni.name, instType.patterns);
        }
      }
      
      // Entrance exam filter only applies to Central Government
      let matchesExam = true;
      if (selectedType === 'Central Government' && selectedEntranceExam) {
        const exam = entranceExams.find(e => e.id === selectedEntranceExam);
        if (exam) {
          matchesExam = matchesEntranceExam(uni.examName, uni.name, exam.patterns);
        }
      }
      
      return matchesSearch && matchesType && matchesLocation && matchesInstType && matchesExam;
    });
  }, [searchQuery, selectedType, selectedLocation, selectedInstitutionType, selectedEntranceExam]);

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

  // Count institutions per type for Central Government
  const institutionTypeCounts = useMemo(() => {
    const centralUnis = universities.filter(u => u.type === 'Central Government');
    const counts: Record<string, number> = {};
    
    institutionTypes.forEach(instType => {
      counts[instType.id] = centralUnis.filter(uni => 
        matchesInstitutionType(uni.name, instType.patterns)
      ).length;
    });
    
    return counts;
  }, []);

  // Count institutions per entrance exam for Central Government
  const entranceExamCounts = useMemo(() => {
    const centralUnis = universities.filter(u => u.type === 'Central Government');
    const counts: Record<string, number> = {};
    
    entranceExams.forEach(exam => {
      counts[exam.id] = centralUnis.filter(uni => 
        matchesEntranceExam(uni.examName, uni.name, exam.patterns)
      ).length;
    });
    
    return counts;
  }, []);

  // Reset filters when switching away from Central Government
  const handleTypeChange = (type: UniversityType) => {
    setSelectedType(type);
    if (type !== 'Central Government') {
      setSelectedLocation(null);
      setSelectedInstitutionType(null);
      setSelectedEntranceExam(null);
    }
  };

  const hasActiveFilters = selectedLocation || selectedInstitutionType || selectedEntranceExam;

  const clearAllFilters = () => {
    setSelectedLocation(null);
    setSelectedInstitutionType(null);
    setSelectedEntranceExam(null);
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

        {/* Filters - Only for Central Government */}
        {selectedType === 'Central Government' && (
          <div className="space-y-4 p-4 bg-muted/30 rounded-lg border">
            {/* Clear All Filters */}
            {hasActiveFilters && (
              <div className="flex justify-end">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearAllFilters}
                  className="text-xs h-7 text-destructive hover:text-destructive"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Institution Type Filter */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Layers className="h-4 w-4" />
                <span>Filter by Type</span>
                <span className="font-tamil text-xs">/ நிறுவன வகை வாரியாக வடிகட்டு</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {institutionTypes.map((instType) => (
                  <Badge
                    key={instType.id}
                    variant={selectedInstitutionType === instType.id ? "default" : "outline"}
                    className={`cursor-pointer transition-all py-1.5 px-3 ${
                      selectedInstitutionType === instType.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => setSelectedInstitutionType(selectedInstitutionType === instType.id ? null : instType.id)}
                  >
                    <span className="mr-1">{instType.label}</span>
                    <span className="text-[10px] opacity-70">({institutionTypeCounts[instType.id] || 0})</span>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Entrance Exam Filter */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>Filter by Entrance Exam</span>
                <span className="font-tamil text-xs">/ நுழைவுத் தேர்வு வாரியாக வடிகட்டு</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {entranceExams.map((exam) => (
                  <Badge
                    key={exam.id}
                    variant={selectedEntranceExam === exam.id ? "default" : "outline"}
                    className={`cursor-pointer transition-all py-1.5 px-3 ${
                      selectedEntranceExam === exam.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => setSelectedEntranceExam(selectedEntranceExam === exam.id ? null : exam.id)}
                  >
                    <span className="mr-1">{exam.label}</span>
                    {exam.tamilAvailable && <span className="text-[10px] mr-1">✅</span>}
                    <span className="text-[10px] opacity-70">({entranceExamCounts[exam.id] || 0})</span>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Location Filter */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Filter by Location</span>
                <span className="font-tamil text-xs">/ இடம் வாரியாக வடிகட்டு</span>
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
