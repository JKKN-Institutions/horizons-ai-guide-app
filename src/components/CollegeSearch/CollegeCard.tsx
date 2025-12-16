import { useState } from 'react';
import { Phone, Globe, MapPin, Calendar, GraduationCap, Award, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { College, COLLEGE_TYPE_INFO, COLLEGE_CATEGORIES } from './types';

interface CollegeCardProps {
  college: College;
}

export const CollegeCard = ({ college }: CollegeCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const typeInfo = COLLEGE_TYPE_INFO[college.type];
  const categoryInfo = COLLEGE_CATEGORIES.find(c => c.id === college.category);

  return (
    <Card className={`border-l-4 transition-all hover:shadow-md ${
      college.isJKKN 
        ? 'border-l-[#FFB800] bg-gradient-to-r from-yellow-50/50 to-transparent' 
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
              <Badge variant="outline" className="text-xs">
                {typeInfo.badge} {typeInfo.label}
              </Badge>
              {college.naacGrade && college.naacGrade !== 'null' && (
                <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-800">
                  NAAC {college.naacGrade}
                </Badge>
              )}
            </div>
            <h3 className="font-semibold text-lg leading-tight">{college.name}</h3>
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
                href={college.website.startsWith('http') ? college.website : `https://${college.website}`}
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
                    View More Details
                  </>
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 pt-3 border-t space-y-3">
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

              {college.facilities && college.facilities.length > 0 && (
                <div>
                  <span className="text-sm font-medium">🏫 Facilities:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {college.facilities.map((facility, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 mt-3">
                <Button size="sm" className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white">
                  Apply Now
                </Button>
                <Button size="sm" variant="outline">
                  Enquiry
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
    </Card>
  );
};
