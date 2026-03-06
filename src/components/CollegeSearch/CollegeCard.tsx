import { useState } from 'react';
import { Phone, Globe, MapPin, Calendar, GraduationCap, Award, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { College, COLLEGE_TYPE_INFO, COLLEGE_CATEGORIES, isAutonomousCollege } from './types';

interface CollegeCardProps {
  college: College;
}


export const CollegeCard = ({ college }: CollegeCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const typeInfo = COLLEGE_TYPE_INFO[college.type];
  const collegeUrl = (college.website && (college.website.startsWith('http://') || college.website.startsWith('https://')))
    ? college.website
    : college.website
      ? `https://${college.website}`
      : `https://www.google.com/search?btnI=1&q=${encodeURIComponent(college.name + ' official website')}`;
  const isAutonom = isAutonomousCollege(college);

  return (
    <Card className={`border-l-4 transition-all hover:shadow-md ${
      college.isJKKN 
        ? 'border-l-[#FFB800] bg-gradient-to-r from-yellow-50/50 to-transparent' 
        : isAutonom
          ? 'border-l-[#7B1FA2] bg-gradient-to-r from-purple-50/40 to-transparent'
          : 'border-l-[#0A2E1F]'
    }`}>
      <CardHeader className="pb-2 px-3 md:px-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-1.5 flex-wrap mb-1">
              {college.isJKKN && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold text-[10px] md:text-xs">
                  JKKN Group
                </Badge>
              )}
              {isAutonom && !college.isJKKN && (
                <Badge className="bg-gradient-to-r from-[#9C27B0] to-[#7B1FA2] text-white font-semibold text-[10px] md:text-xs">
                  Autonomous
                </Badge>
              )}
              <Badge variant="outline" className="text-[10px] md:text-xs">
                {typeInfo.badge} {typeInfo.label}
              </Badge>
              {college.naacGrade && college.naacGrade !== 'null' && (
                <Badge variant="secondary" className="text-[10px] md:text-xs bg-emerald-100 text-emerald-800">
                  NAAC {college.naacGrade}
                </Badge>
              )}
            </div>
            <a 
              href={collegeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sm md:text-lg leading-tight cursor-pointer hover:text-emerald-700 hover:underline transition-colors block"
            >
              {college.name}
            </a>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 px-3 md:px-6">
        <div className="space-y-2 md:space-y-3">
          {/* Quick Info */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs md:text-sm text-muted-foreground">
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
            <p className="text-xs md:text-sm">{college.courses}</p>
          </div>

          {/* Fee Range */}
          {college.feeRange && (
            <p className="text-xs md:text-sm text-muted-foreground">
              💰 Fee: {college.feeRange}
            </p>
          )}

          {/* Facilities — ONLY if real data exists */}
          {college.facilities && college.facilities.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {college.facilities.map((facility, idx) => (
                <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] md:text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {facility}
                </span>
              ))}
            </div>
          )}

          {/* Contact Info */}
          <div className="flex flex-wrap gap-3 text-xs md:text-sm">
            {college.contact && (
              <a href={`tel:${college.contact}`} className="flex items-center gap-1 text-[#0A2E1F] hover:underline">
                <Phone className="h-3 w-3" /> {college.contact}
              </a>
            )}
            {college.website && (
              <a href={collegeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#0A2E1F] hover:underline">
                <Globe className="h-3 w-3" /> Website <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          {/* Apply, Contact & Facilities */}
          <div className="flex flex-wrap gap-2 mt-1">
            {hasRealWebsite && (
              <a
                href={college.website!}
                className="inline-flex items-center justify-center gap-1 px-3 md:px-4 py-1.5 md:py-2 rounded-md text-xs md:text-sm font-medium bg-[#FF6B35] hover:bg-[#e55a2a] text-white no-underline"
              >
                <ExternalLink className="h-3 w-3" /> Apply
              </a>
            )}
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(college.name + ' admission contact phone')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 px-3 md:px-4 py-1.5 md:py-2 rounded-md text-xs md:text-sm font-medium border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 no-underline"
            >
              <Phone className="h-3 w-3" /> Contact
            </a>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(college.name + ' hostel bus facilities placements')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 px-3 md:px-4 py-1.5 md:py-2 rounded-md text-xs md:text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white no-underline"
            >
              <Globe className="h-3 w-3" /> Facilities
            </a>
          </div>

          {/* Expandable Details */}
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full mt-1">
                {isExpanded ? (
                  <><ChevronUp className="h-4 w-4 mr-2" /> Show Less</>
                ) : (
                  <><ChevronDown className="h-4 w-4 mr-2" /> View More Details</>
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 pt-3 border-t space-y-3">
              {college.address && (
                <div className="flex items-start gap-2 text-xs md:text-sm">
                  <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                  <p>{college.address}</p>
                </div>
              )}
              {college.placementStats && (
                <div className="text-xs md:text-sm">
                  <span className="font-medium">📊 Placements:</span> {college.placementStats}
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
    </Card>
  );
};
