import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, ChevronDown, ChevronUp, MessageCircle, Calendar, Star } from 'lucide-react';
import { founderStories, mentorProfiles } from './data/founderStoriesData';

export const FounderStories = () => {
  const [expandedStory, setExpandedStory] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Founder Stories */}
      <div>
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2 mb-3">
          <Star className="w-4 h-4 text-amber-600" /> Founder Stories Library
        </h3>
        <div className="space-y-2">
          {founderStories.map((story) => {
            const isOpen = expandedStory === story.id;
            return (
              <Card key={story.id} className="border-emerald-100/60 overflow-hidden hover:shadow-sm transition-all">
                <button
                  className="w-full text-left p-3 flex items-center gap-3"
                  onClick={() => setExpandedStory(isOpen ? null : story.id)}
                >
                  <span className="text-2xl">{story.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{story.name}</p>
                    <p className="text-[10px] text-muted-foreground">{story.company} • Started at {story.startAge} • {story.currentValuation}</p>
                  </div>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </button>
                {isOpen && (
                  <CardContent className="pt-0 pb-3 px-3 space-y-3">
                    <div className="bg-gradient-to-r from-amber-50/80 to-orange-50/50 rounded-lg p-2 border border-amber-200/40">
                      <p className="text-xs font-semibold text-amber-700">🎯 Key Lesson</p>
                      <p className="text-xs text-foreground mt-0.5">{story.keyLesson}</p>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{story.story}</p>
                    <div className="flex flex-wrap gap-1">
                      <span className="text-[10px] text-muted-foreground mr-1">Frameworks:</span>
                      {story.frameworks.map(f => (
                        <Badge key={f} variant="secondary" className="text-[10px]">{f}</Badge>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-muted/50 rounded p-1.5">
                        <p className="text-[10px] text-muted-foreground">Industry</p>
                        <p className="text-xs font-medium text-foreground">{story.industry}</p>
                      </div>
                      <div className="bg-muted/50 rounded p-1.5">
                        <p className="text-[10px] text-muted-foreground">Location</p>
                        <p className="text-xs font-medium text-foreground">{story.location}</p>
                      </div>
                      <div className="bg-muted/50 rounded p-1.5">
                        <p className="text-[10px] text-muted-foreground">Initial ₹</p>
                        <p className="text-xs font-medium text-foreground">{story.initialInvestment}</p>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Mentors */}
      <div>
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-teal-600" /> Mentor Network
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {mentorProfiles.map((mentor) => (
            <Card key={mentor.id} className="border-teal-100/60 hover:border-teal-200/60 hover:shadow-sm transition-all">
              <CardContent className="p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{mentor.avatar}</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{mentor.name}</p>
                    <p className="text-[10px] text-muted-foreground">{mentor.role}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{mentor.bio}</p>
                <div className="flex flex-wrap gap-1">
                  {mentor.expertise.map(e => (
                    <Badge key={e} variant="secondary" className="text-[10px]">{e}</Badge>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-medium">
                  <Calendar className="w-3 h-3" /> {mentor.availability}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
