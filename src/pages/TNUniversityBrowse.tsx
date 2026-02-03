import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, GraduationCap, Users, ArrowLeft, Building2, Landmark, Award, MapPin, X, Layers, IndianRupee } from 'lucide-react';
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
    id: 'tamil-nadu',
    label: 'Tamil Nadu',
    labelTamil: 'தமிழ்நாடு',
    states: ['Tamil Nadu'],
  },
  {
    id: 'puducherry',
    label: 'Puducherry',
    labelTamil: 'புதுச்சேரி',
    states: ['Puducherry'],
  },
  {
    id: 'other-states',
    label: 'Other States',
    labelTamil: 'பிற மாநிலங்கள்',
    states: ['Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana', 'Delhi', 'Uttar Pradesh', 'Rajasthan', 'Haryana', 'Punjab', 'Himachal Pradesh', 'Uttarakhand', 'Jammu & Kashmir', 'J&K', 'Maharashtra', 'Gujarat', 'Goa', 'Madhya Pradesh', 'West Bengal', 'Bihar', 'Jharkhand', 'Odisha', 'Chhattisgarh', 'Assam', 'Meghalaya', 'Manipur', 'Mizoram', 'Nagaland', 'Tripura', 'Sikkim', 'Arunachal Pradesh'],
  },
];

// Institution types for Central Government institutions
const institutionTypes = [
  {
    id: 'jnu',
    label: 'JNU',
    labelTamil: 'ஜவஹர்லால் நேரு பல்கலைக்கழகம்',
    entrance: 'CUET',
    patterns: ['JNU', 'Jawaharlal Nehru University'],
  },
  {
    id: 'du',
    label: 'Delhi University',
    labelTamil: 'டெல்லி பல்கலைக்கழகம்',
    entrance: 'CUET',
    patterns: ['University of Delhi', 'Delhi University'],
  },
  {
    id: 'bhu',
    label: 'BHU',
    labelTamil: 'பனாரஸ் இந்து பல்கலைக்கழகம்',
    entrance: 'CUET',
    patterns: ['BHU', 'Banaras Hindu University'],
  },
  {
    id: 'amu',
    label: 'AMU',
    labelTamil: 'அலிகர் முஸ்லிம் பல்கலைக்கழகம்',
    entrance: 'CUET',
    patterns: ['AMU', 'Aligarh Muslim University'],
  },
  {
    id: 'jamia',
    label: 'Jamia Millia',
    labelTamil: 'ஜாமியா மில்லியா இஸ்லாமியா',
    entrance: 'CUET',
    patterns: ['Jamia Millia', 'Jamia'],
  },
  {
    id: 'pondicherry-uni',
    label: 'Pondicherry University',
    labelTamil: 'புதுச்சேரி பல்கலைக்கழகம்',
    entrance: 'CUET',
    patterns: ['Pondicherry University'],
  },
  {
    id: 'cutn',
    label: 'CUTN',
    labelTamil: 'மத்திய பல்கலைக்கழகம் தமிழ்நாடு',
    entrance: 'CUET',
    patterns: ['Central University of Tamil Nadu', 'CUTN'],
  },
  {
    id: 'other-central-unis',
    label: 'Other Central Unis',
    labelTamil: 'பிற மத்திய பல்கலைக்கழகங்கள்',
    entrance: 'CUET',
    patterns: ['Central University', 'University of Hyderabad', 'Visva-Bharati', 'Tezpur University', 'Assam University', 'NEHU', 'Manipur University', 'Mizoram University', 'Nagaland University', 'Tripura University', 'Sikkim University', 'Rajiv Gandhi University', 'Mahatma Gandhi', 'Hemvati Nandan', 'Babasaheb'],
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

// Fee range categories for Central Government institutions
const feeRanges = [
  {
    id: 'almost-free',
    label: 'Almost Free',
    labelTamil: 'கிட்டத்தட்ட இலவசம்',
    range: '₹0 - ₹10,000/year',
    min: 0,
    max: 10000,
    patterns: ['AIIMS', 'JIPMER', 'JNU', 'Jawaharlal Nehru University'],
  },
  {
    id: 'very-low',
    label: 'Very Low Fee',
    labelTamil: 'மிகக் குறைந்த கட்டணம்',
    range: '₹10,000 - ₹50,000/year',
    min: 10000,
    max: 50000,
    patterns: ['Central University', 'Pondicherry University', 'Visva-Bharati', 'Tezpur University', 'Assam University', 'NEHU', 'Manipur University', 'Mizoram University', 'Nagaland University', 'Tripura University', 'Sikkim University', 'Rajiv Gandhi University'],
  },
  {
    id: 'low',
    label: 'Low Fee',
    labelTamil: 'குறைந்த கட்டணம்',
    range: '₹50,000 - ₹1,00,000/year',
    min: 50000,
    max: 100000,
    patterns: ['University of Delhi', 'BHU', 'Banaras Hindu University', 'AMU', 'Aligarh Muslim University', 'Jamia Millia'],
  },
  {
    id: 'moderate',
    label: 'Moderate Fee',
    labelTamil: 'மிதமான கட்டணம்',
    range: '₹1,00,000 - ₹2,00,000/year',
    min: 100000,
    max: 200000,
    patterns: ['NIT ', 'National Institute of Technology', 'MNNIT', 'MNIT', 'VNIT', 'SVNIT', 'IIIT', 'Indian Institute of Information Technology'],
  },
  {
    id: 'standard',
    label: 'Standard Fee',
    labelTamil: 'நிலையான கட்டணம்',
    range: '₹2,00,000 - ₹3,00,000/year',
    min: 200000,
    max: 300000,
    patterns: ['IIT ', 'Indian Institute of Technology', 'IISER', 'Indian Institute of Science Education'],
  },
  {
    id: 'higher',
    label: 'Higher Fee',
    labelTamil: 'அதிக கட்டணம்',
    range: '₹3,00,000+/year',
    min: 300000,
    max: Infinity,
    patterns: ['IIM ', 'Indian Institute of Management'],
  },
];


// Helper to check if university matches institution type
const matchesInstitutionType = (uniName: string, patterns: string[]): boolean => {
  const nameLower = uniName.toLowerCase();
  return patterns.some(pattern => nameLower.includes(pattern.toLowerCase()));
};


// Helper to check if university matches fee range
const matchesFeeRange = (uniName: string, patterns: string[]): boolean => {
  const nameLower = uniName.toLowerCase();
  return patterns.some(pattern => nameLower.includes(pattern.toLowerCase()));
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
  const [selectedLocationInstitution, setSelectedLocationInstitution] = useState<string | null>(null);
  const [selectedFeeRange, setSelectedFeeRange] = useState<string | null>(null);

  // De-dupe universities by id to prevent any repeated cards (e.g. if datasets are merged twice).
  const uniqueUniversities = useMemo(() => {
    const map = new Map<string, (typeof universities)[number]>();
    for (const uni of universities) {
      if (!map.has(uni.id)) map.set(uni.id, uni);
    }
    return Array.from(map.values());
  }, [universities]);

  const filteredUniversities = useMemo(() => {
    return uniqueUniversities.filter(uni => {
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
      
      // Specific institution filter within location
      let matchesLocationInstitution = true;
      if (selectedType === 'Central Government' && selectedLocationInstitution) {
        matchesLocationInstitution = uni.id === selectedLocationInstitution;
      }
      
      // Institution type filter only applies to Central Government
      let matchesInstType = true;
      if (selectedType === 'Central Government' && selectedInstitutionType) {
        const instType = institutionTypes.find(t => t.id === selectedInstitutionType);
        if (instType) {
          matchesInstType = matchesInstitutionType(uni.name, instType.patterns);
        }
      }
      
      // Fee range filter only applies to Central Government
      let matchesFee = true;
      if (selectedType === 'Central Government' && selectedFeeRange) {
        const feeRange = feeRanges.find(f => f.id === selectedFeeRange);
        if (feeRange) {
          matchesFee = matchesFeeRange(uni.name, feeRange.patterns);
        }
      }
      
      return matchesSearch && matchesType && matchesLocation && matchesLocationInstitution && matchesInstType && matchesFee;
    });
  }, [uniqueUniversities, searchQuery, selectedType, selectedLocation, selectedLocationInstitution, selectedInstitutionType, selectedFeeRange]);

  const typeCounts = useMemo(() => {
    return {
      'State Government': uniqueUniversities.filter(u => u.type === 'State Government').length,
      'Central Government': uniqueUniversities.filter(u => u.type === 'Central Government').length,
      'Deemed University (Central Govt Funded)': uniqueUniversities.filter(u => u.type === 'Deemed University (Central Govt Funded)').length,
    };
  }, [uniqueUniversities]);

  // Count institutions per region for Central Government
  const regionCounts = useMemo(() => {
    const centralUnis = uniqueUniversities.filter(u => u.type === 'Central Government');
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
  }, [uniqueUniversities]);

  // Count institutions per type for Central Government (filtered by selected location)
  const institutionTypeCounts = useMemo(() => {
    let centralUnis = uniqueUniversities.filter(u => u.type === 'Central Government');
    
    // If a location is selected, filter to only that location
    if (selectedLocation) {
      const region = locationRegions.find(r => r.id === selectedLocation);
      if (region) {
        centralUnis = centralUnis.filter(uni => {
          const uniState = extractState(uni.location);
          return region.states.some(state => 
            uniState.toLowerCase().includes(state.toLowerCase()) ||
            state.toLowerCase().includes(uniState.toLowerCase())
          );
        });
      }
    }
    
    const counts: Record<string, number> = {};
    
    institutionTypes.forEach(instType => {
      counts[instType.id] = centralUnis.filter(uni => 
        matchesInstitutionType(uni.name, instType.patterns)
      ).length;
    });
    
    return counts;
  }, [uniqueUniversities, selectedLocation]);

  // Count institutions per fee range for Central Government (filtered by selected location)
  const feeRangeCounts = useMemo(() => {
    let centralUnis = uniqueUniversities.filter(u => u.type === 'Central Government');
    
    // If a location is selected, filter to only that location
    if (selectedLocation) {
      const region = locationRegions.find(r => r.id === selectedLocation);
      if (region) {
        centralUnis = centralUnis.filter(uni => {
          const uniState = extractState(uni.location);
          return region.states.some(state => 
            uniState.toLowerCase().includes(state.toLowerCase()) ||
            state.toLowerCase().includes(uniState.toLowerCase())
          );
        });
      }
    }
    
    const counts: Record<string, number> = {};
    
    feeRanges.forEach(feeRange => {
      counts[feeRange.id] = centralUnis.filter(uni => 
        matchesFeeRange(uni.name, feeRange.patterns)
      ).length;
    });
    
    return counts;
  }, [uniqueUniversities, selectedLocation]);

  // Get institutions within the selected location for sub-filtering
  const institutionsInSelectedLocation = useMemo(() => {
    if (!selectedLocation) return [];
    
    const centralUnis = uniqueUniversities.filter(u => u.type === 'Central Government');
    const region = locationRegions.find(r => r.id === selectedLocation);
    if (!region) return [];
    
    const unisInRegion = centralUnis.filter(uni => {
      const uniState = extractState(uni.location);
      return region.states.some(state => 
        uniState.toLowerCase().includes(state.toLowerCase()) ||
        state.toLowerCase().includes(uniState.toLowerCase())
      );
    });
    
    // Group by institution type and return unique institution names
    const institutions: { id: string; name: string; shortName: string; count: number }[] = [];
    
    unisInRegion.forEach(uni => {
      // Determine short name based on patterns
      let shortName = uni.name;
      if (uni.name.includes('IIT ') || uni.name.includes('Indian Institute of Technology')) {
        shortName = uni.name.replace('Indian Institute of Technology', 'IIT').trim();
      } else if (uni.name.includes('NIT ') || uni.name.includes('National Institute of Technology')) {
        shortName = uni.name.replace('National Institute of Technology', 'NIT').trim();
      } else if (uni.name.includes('IIM ') || uni.name.includes('Indian Institute of Management')) {
        shortName = uni.name.replace('Indian Institute of Management', 'IIM').trim();
      } else if (uni.name.includes('IIIT') || uni.name.includes('Indian Institute of Information Technology')) {
        shortName = uni.name.replace('Indian Institute of Information Technology', 'IIIT').trim();
      } else if (uni.name.includes('IISER') || uni.name.includes('Indian Institute of Science Education')) {
        shortName = uni.name.replace('Indian Institute of Science Education and Research', 'IISER').trim();
      } else if (uni.name.includes('AIIMS') || uni.name.includes('All India Institute of Medical')) {
        shortName = uni.name.replace('All India Institute of Medical Sciences', 'AIIMS').trim();
      }
      
      // Use university ID as unique identifier
      if (!institutions.find(i => i.id === uni.id)) {
        institutions.push({
          id: uni.id,
          name: uni.name,
          shortName: shortName.length > 40 ? shortName.substring(0, 37) + '...' : shortName,
          count: 1
        });
      }
    });
    
    return institutions.sort((a, b) => a.shortName.localeCompare(b.shortName));
  }, [selectedLocation, uniqueUniversities]);

  // Reset filters when switching away from Central Government
  const handleTypeChange = (type: UniversityType) => {
    setSelectedType(type);
    if (type !== 'Central Government') {
      setSelectedLocation(null);
      setSelectedInstitutionType(null);
      setSelectedLocationInstitution(null);
      setSelectedFeeRange(null);
    }
  };

  // Reset location institution when location changes
  const handleLocationChange = (locationId: string | null) => {
    setSelectedLocation(locationId);
    setSelectedLocationInstitution(null);
  };

  const hasActiveFilters = selectedLocation || selectedInstitutionType || selectedFeeRange || selectedLocationInstitution;

  const clearAllFilters = () => {
    setSelectedLocation(null);
    setSelectedInstitutionType(null);
    setSelectedLocationInstitution(null);
    setSelectedFeeRange(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-background to-teal-50/30 dark:from-emerald-950/20 dark:via-background dark:to-teal-950/10">
      {/* Header with glass effect */}
      <header className="sticky top-0 z-50 bg-white/70 dark:bg-background/70 backdrop-blur-xl border-b border-white/20 dark:border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/tn-university-entrance')} className="hover:bg-emerald-100/50 dark:hover:bg-emerald-900/30">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-bold text-lg bg-gradient-to-r from-emerald-700 to-teal-600 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">Browse Universities</h1>
              <p className="text-xs text-muted-foreground font-tamil">பல்கலைக்கழகங்களை ஆராய</p>
            </div>
          </div>
          <GlobalLanguageSelector />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

        {/* University Type Tabs with glass effect */}
        <Tabs value={selectedType} onValueChange={(v) => handleTypeChange(v as UniversityType)} className="w-full">
          <TabsList className="w-full flex flex-wrap h-auto gap-2 bg-white/60 dark:bg-white/5 backdrop-blur-lg p-2.5 rounded-xl border border-white/30 dark:border-white/10 shadow-lg shadow-emerald-500/5">
            {universityTypeTabs.map((tab) => {
              const Icon = tab.icon;
              const count = typeCounts[tab.value];
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex-1 min-w-[140px] flex items-center gap-2 py-3 px-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-emerald-500/25 rounded-lg transition-all duration-300 hover:bg-white/50 dark:hover:bg-white/10"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline font-medium">{tab.label}</span>
                  <span className="sm:hidden text-xs font-medium">{tab.label.split(' ')[0]}</span>
                  <span className="ml-auto bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs font-semibold px-2 py-0.5 rounded-full">{count}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        {/* Filters - Only for Central Government with glass effect */}
        {selectedType === 'Central Government' && (
          <div className="space-y-5 p-5 bg-white/50 dark:bg-white/5 backdrop-blur-lg rounded-2xl border border-white/40 dark:border-white/10 shadow-xl shadow-emerald-500/5">
            {/* Clear All Filters */}
            {hasActiveFilters && (
              <div className="flex justify-end">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearAllFilters}
                  className="text-xs h-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 gap-1.5"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Institution Type Filter */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-foreground">
                <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30">
                  <Layers className="h-4 w-4 text-white" />
                </div>
                <span className="text-foreground">Filter by Type</span>
                <span className="font-tamil text-xs text-muted-foreground">/ நிறுவன வகை வாரியாக வடிகட்டு</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {institutionTypes
                  .filter(instType => !selectedLocation || (institutionTypeCounts[instType.id] || 0) > 0)
                  .map((instType) => (
                  <Badge
                    key={instType.id}
                    variant={selectedInstitutionType === instType.id ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 py-2 px-3.5 font-medium ${
                      selectedInstitutionType === instType.id
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0 shadow-md shadow-emerald-500/25'
                        : 'bg-white/70 dark:bg-white/10 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 border-emerald-200/50 dark:border-emerald-800/30 hover:border-emerald-300 dark:hover:border-emerald-700'
                    }`}
                    onClick={() => setSelectedInstitutionType(selectedInstitutionType === instType.id ? null : instType.id)}
                  >
                    <span className="mr-1.5">{instType.label}</span>
                    <span className={`text-[10px] font-semibold ${selectedInstitutionType === instType.id ? 'text-white/80' : 'text-emerald-600 dark:text-emerald-400'}`}>({institutionTypeCounts[instType.id] || 0})</span>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Location Filter */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-foreground">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <span className="text-foreground">Filter by Location</span>
                <span className="font-tamil text-xs text-muted-foreground">/ இடம் வாரியாக வடிகட்டு</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {locationRegions.map((region) => (
                  <Badge
                    key={region.id}
                    variant={selectedLocation === region.id ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 py-2 px-3.5 font-medium ${
                      selectedLocation === region.id
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-md shadow-blue-500/25'
                        : 'bg-white/70 dark:bg-white/10 hover:bg-blue-50 dark:hover:bg-blue-900/30 border-blue-200/50 dark:border-blue-800/30 hover:border-blue-300 dark:hover:border-blue-700'
                    }`}
                    onClick={() => handleLocationChange(selectedLocation === region.id ? null : region.id)}
                  >
                    <span className="mr-1.5">{region.label}</span>
                    <span className={`text-[10px] font-semibold ${selectedLocation === region.id ? 'text-white/80' : 'text-blue-600 dark:text-blue-400'}`}>({regionCounts[region.id] || 0})</span>
                  </Badge>
                ))}
              </div>
              
              {/* Sub-filter: Institutions in selected location */}
              {selectedLocation && institutionsInSelectedLocation.length > 0 && (
                <div className="mt-3 p-3 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl border border-blue-200/30 dark:border-blue-800/30">
                  <p className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-2.5 flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5" />
                    Institutions in {locationRegions.find(r => r.id === selectedLocation)?.label}:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {institutionsInSelectedLocation.map((inst) => (
                      <Badge
                        key={inst.id}
                        variant={selectedLocationInstitution === inst.id ? "default" : "outline"}
                        className={`cursor-pointer transition-all duration-200 py-1.5 px-2.5 text-xs font-medium ${
                          selectedLocationInstitution === inst.id
                            ? 'bg-blue-600 text-white border-0 shadow-sm'
                            : 'bg-white dark:bg-white/10 hover:bg-blue-100 dark:hover:bg-blue-900/40 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300'
                        }`}
                        onClick={() => setSelectedLocationInstitution(selectedLocationInstitution === inst.id ? null : inst.id)}
                        title={inst.name}
                      >
                        {inst.shortName}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Fee Range Filter */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-foreground">
                <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30">
                  <IndianRupee className="h-4 w-4 text-white" />
                </div>
                <span className="text-foreground">Filter by Fee</span>
                <span className="font-tamil text-xs text-muted-foreground">/ கட்டணம் வாரியாக வடிகட்டு</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {feeRanges
                  .filter(feeRange => !selectedLocation || (feeRangeCounts[feeRange.id] || 0) > 0)
                  .map((feeRange) => (
                  <Badge
                    key={feeRange.id}
                    variant={selectedFeeRange === feeRange.id ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 py-2 px-3.5 font-medium ${
                      selectedFeeRange === feeRange.id
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-md shadow-amber-500/25'
                        : 'bg-white/70 dark:bg-white/10 hover:bg-amber-50 dark:hover:bg-amber-900/30 border-amber-200/50 dark:border-amber-800/30 hover:border-amber-300 dark:hover:border-amber-700'
                    }`}
                    onClick={() => setSelectedFeeRange(selectedFeeRange === feeRange.id ? null : feeRange.id)}
                  >
                    <span className="mr-1.5">{feeRange.label}</span>
                    <span className={`text-[10px] font-semibold ${selectedFeeRange === feeRange.id ? 'text-white/80' : 'text-amber-600 dark:text-amber-400'}`}>({feeRangeCounts[feeRange.id] || 0})</span>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search Bar with glass effect */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600/60 dark:text-emerald-400/60" />
          <Input
            placeholder="Search universities... (பல்கலைக்கழகங்களைத் தேடுங்கள்)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 py-5 bg-white/60 dark:bg-white/5 backdrop-blur-md border-white/40 dark:border-white/10 rounded-xl focus:border-emerald-400 focus:ring-emerald-400/20 shadow-sm"
          />
        </div>

        {/* Stats Bar with glass effect */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-xl border border-white/30 dark:border-white/10">
          <span className="flex items-center gap-2 text-sm font-medium text-foreground/80">
            <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/40">
              <Users className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-emerald-700 dark:text-emerald-300 font-semibold">{filteredUniversities.length}</span> Universities
          </span>
          <span className="flex items-center gap-2 text-sm font-medium text-foreground/80">
            <span className="text-teal-700 dark:text-teal-300 font-semibold">{filteredUniversities.reduce((acc, uni) => acc + uni.courses.length, 0)}</span> Courses
          </span>
        </div>

        {/* Universities Grid */}
        {filteredUniversities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredUniversities.map((university) => (
              <UniversityCard 
                key={university.id} 
                university={university} 
                onClick={() => navigate(`/tn-university-entrance/${university.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-2xl border border-white/30 dark:border-white/10">
            <div className="p-4 rounded-full bg-emerald-100 dark:bg-emerald-900/40 w-fit mx-auto mb-4">
              <GraduationCap className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-lg font-semibold text-foreground/80">No universities found</p>
            <p className="text-sm text-muted-foreground mt-1">Try a different search term or category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TNUniversityBrowse;
