import { useState } from 'react';
import { Phone, Globe, MapPin, Calendar, GraduationCap, Award, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { College, COLLEGE_TYPE_INFO, COLLEGE_CATEGORIES, isAutonomousCollege } from './types';
import { getCollegeFacilities } from './facilityData';

interface CollegeCardProps {
  college: College;
}

// Helper to get the college URL
const getCollegeUrl = (college: College, suffix: string = '') => {
  if (college.website) {
    return college.website.startsWith('http') ? college.website : `https://${college.website}`;
  }
  return `https://www.google.com/search?q=${encodeURIComponent(college.name + ' official website' + suffix)}`;
};

export const CollegeCard = ({ college }: CollegeCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const typeInfo = COLLEGE_TYPE_INFO[college.type];
  const categoryInfo = COLLEGE_CATEGORIES.find(c => c.id === college.category);
  const collegeUrl = getCollegeUrl(college);
  const isAutonom = isAutonomousCollege(college);

  return (
    <Card className={`border-l-4 transition-all hover:shadow-md ${
      college.isJKKN 
        ? 'border-l-[#FFB800] bg-gradient-to-r from-yellow-50/50 to-transparent' 
        : isAutonom
          ? 'border-l-[#7B1FA2] bg-gradient-to-r from-purple-50/40 to-transparent'
          : 'border-l-[#0A2E1F]'
    }`}>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              {college.isJKKN && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold">
                  ⭐ JKKN Group
                </Badge>
              )}
              {isAutonom && !college.isJKKN && (
                <Badge className="bg-gradient-to-r from-[#9C27B0] to-[#7B1FA2] text-white font-semibold text-xs">
                  🏅 Autonomous
                </Badge>
              )}
              <Badge variant="outline" className="text-xs">
                {typeInfo.badge} {typeInfo.label}
              </Badge>
              {college.naacGrade && college.naacGrade !== 'null' && (
                <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-800">
                  NAAC {college.naacGrade}
                </Badge>
              )}
            </div>
            <a 
              href={collegeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-lg leading-tight cursor-pointer hover:text-emerald-700 hover:underline transition-colors block"
            >
              {college.name}
            </a>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Quick Info */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            {college.establishedYear && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Est. {college.establishedYear}
              </span>
            )}
            {college.accreditation && (
              <span className="flex items-center gap-1">
                <Award className="h-3 w-3" />
                {college.accreditation}
              </span>
            )}
          </div>

          {/* Courses */}
          <div className="flex items-start gap-2">
            <GraduationCap className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
            <p className="text-sm">{college.courses}</p>
          </div>

          {/* Fee Range */}
          {college.feeRange && (
            <p className="text-sm text-muted-foreground">
              💰 Fee Range: {college.feeRange}
            </p>
          )}

          {/* Contact Info */}
          <div className="flex flex-wrap gap-3 text-sm">
            {college.contact && (
              <a 
                href={`tel:${college.contact}`}
                className="flex items-center gap-1 text-[#0A2E1F] hover:underline"
              >
                <Phone className="h-3 w-3" />
                {college.contact}
              </a>
            )}
            {college.website && (
              <a 
                href={collegeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#0A2E1F] hover:underline"
              >
                <Globe className="h-3 w-3" />
                Website
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>


          {/* Quick Facility Preview — visible without expanding */}
          <div className="flex flex-wrap gap-1 mt-1">
            {getCollegeFacilities(college)
              .filter(f => f.available)
              .slice(0, 6)
              .map((f) => (
                <span
                  key={f.id}
                  className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] md:text-[10px] font-medium border ${f.bg} ${f.color}`}
                  title={f.label}
                >
                  {f.icon}
                  <span className="hidden md:inline">{f.label}</span>
                </span>
              ))}
            <span className="text-[9px] md:text-[10px] text-gray-400 self-center">
              +more
            </span>
          </div>
          {/* Apply Now & Enquiry - ALWAYS VISIBLE, using <a> tags for reliable redirect */}
          <div className="flex gap-2 mt-2">
            <a
              href={collegeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 px-4 py-2 rounded-md text-sm font-medium bg-[#FF6B35] hover:bg-[#e55a2a] text-white transition-colors no-underline"
            >
              <ExternalLink className="h-3 w-3" />
              Apply Now
            </a>
            <a
              href={getCollegeUrl(college, ' contact enquiry')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 px-4 py-2 rounded-md text-sm font-medium border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 transition-colors no-underline"
            >
              <Globe className="h-3 w-3" />
              Enquiry
            </a>
          </div>

          {/* Expandable Details */}
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full mt-2">
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-2" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-2" />
                    View Facilities & Details
                  </>
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 pt-3 border-t space-y-4">
              {college.address && (
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                  <p>{college.address}</p>
                </div>
              )}
              
              {college.placementStats && (
                <div className="text-sm">
                  <span className="font-medium">📊 Placements:</span> {college.placementStats}
                </div>
              )}

              {/* ═══ FACILITIES GRID ═══ */}
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-2">🏫 Campus Facilities</p>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-1.5">
                  {getCollegeFacilities(college)
                    .filter(f => f.available)
                    .map((facility) => (
                      <div
                        key={facility.id}
                        className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg border text-left ${facility.bg}`}
                      >
                        <span className="text-sm flex-shrink-0">{facility.icon}</span>
                        <span className={`text-[10px] md:text-xs font-medium leading-tight ${facility.color}`}>
                          {facility.label}
                        </span>
                      </div>
                    ))}
                </div>
                <p className="text-[9px] md:text-[10px] text-gray-400 mt-2 italic">
                  * Facilities shown are based on college type. Please verify with the college directly.
                </p>
              </div>

              {/* Not Available */}
              {getCollegeFacilities(college).some(f => !f.available) && (
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Not typically available:</p>
                  <div className="flex flex-wrap gap-1">
                    {getCollegeFacilities(college)
                      .filter(f => !f.available)
                      .map((facility) => (
                        <span
                          key={facility.id}
                          className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-400 line-through"
                        >
                          {facility.icon} {facility.label}
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
    </Card>
  );
};
