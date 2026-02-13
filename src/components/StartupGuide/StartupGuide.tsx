import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Rocket, Lightbulb, Users, TrendingUp, BookOpen, Target, DollarSign, Award, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

interface StartupResource {
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  tags: string[];
  link?: string;
  steps?: string[];
}

const startupResources: StartupResource[] = [
  {
    title: 'Validate Your Idea',
    description: 'Learn how to test your startup idea before investing time and money. Use lean validation techniques to find product-market fit.',
    category: 'Ideation',
    icon: <Lightbulb className="w-5 h-5" />,
    tags: ['Beginner', 'Free'],
    steps: ['Identify a real problem', 'Talk to 50+ potential users', 'Build a landing page MVP', 'Measure interest & signups', 'Iterate based on feedback'],
  },
  {
    title: 'Government Startup Schemes',
    description: 'Explore Indian government schemes like Startup India, MSME support, Stand-Up India, and state-level incubation programs.',
    category: 'Funding',
    icon: <DollarSign className="w-5 h-5" />,
    tags: ['Funding', 'India'],
    steps: ['Register on Startup India portal', 'Get DPIIT recognition', 'Apply for Seed Fund Scheme', 'Explore state-level grants', 'Apply for tax exemptions'],
  },
  {
    title: 'Build Your Team',
    description: 'Tips on finding co-founders, hiring your first employees, and building a culture that attracts top talent.',
    category: 'Team',
    icon: <Users className="w-5 h-5" />,
    tags: ['Team', 'Culture'],
    steps: ['Define roles you need', 'Network at startup events', 'Use equity to attract co-founders', 'Hire for attitude, train for skills', 'Set clear expectations early'],
  },
  {
    title: 'Pitch Deck Essentials',
    description: 'Create a compelling pitch deck that captures investor attention. Learn the 10-slide framework used by successful startups.',
    category: 'Fundraising',
    icon: <Target className="w-5 h-5" />,
    tags: ['Investors', 'Essential'],
    steps: ['Problem slide with data', 'Your unique solution', 'Market size (TAM/SAM/SOM)', 'Business model & revenue', 'Traction & milestones', 'Team & ask'],
  },
  {
    title: 'Incubators & Accelerators',
    description: 'Top incubators in India — IIT incubators, T-Hub, NASSCOM 10K, Atal Incubation Centers, and more.',
    category: 'Support',
    icon: <Award className="w-5 h-5" />,
    tags: ['Mentorship', 'Networking'],
    steps: ['Research programs that fit your stage', 'Prepare application materials', 'Apply to 5-10 programs', 'Leverage alumni networks', 'Make the most of demo day'],
  },
  {
    title: 'Growth & Marketing',
    description: 'Low-cost growth strategies for early-stage startups. Digital marketing, content strategy, and community building.',
    category: 'Growth',
    icon: <TrendingUp className="w-5 h-5" />,
    tags: ['Marketing', 'Growth Hacking'],
    steps: ['Define your ICP (Ideal Customer Profile)', 'Choose 2-3 acquisition channels', 'Create valuable content', 'Build community around your product', 'Track metrics that matter'],
  },
];

const categoryColors: Record<string, string> = {
  Ideation: 'from-amber-500 to-orange-500',
  Funding: 'from-emerald-500 to-green-600',
  Team: 'from-blue-500 to-indigo-600',
  Fundraising: 'from-purple-500 to-violet-600',
  Support: 'from-rose-500 to-pink-600',
  Growth: 'from-cyan-500 to-teal-600',
};

export const StartupGuide = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
          <Rocket className="w-4 h-4" />
          Startup Launchpad
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          From Idea to IPO — Your Startup Journey Starts Here
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Everything you need to launch, fund, and scale your startup. Curated resources for student entrepreneurs and first-time founders.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Govt Schemes', value: '50+', icon: <DollarSign className="w-4 h-4" /> },
          { label: 'Incubators', value: '200+', icon: <Award className="w-4 h-4" /> },
          { label: 'Resources', value: '100+', icon: <BookOpen className="w-4 h-4" /> },
          { label: 'Success Stories', value: '30+', icon: <TrendingUp className="w-4 h-4" /> },
        ].map((stat, i) => (
          <Card key={i} className="text-center p-3 border-border/50 bg-card/80 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 text-primary mb-1">
              {stat.icon}
              <span className="text-xl font-bold">{stat.value}</span>
            </div>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {startupResources.map((resource, index) => {
          const isExpanded = expandedCard === index;
          return (
            <Card 
              key={index} 
              className="overflow-hidden border-border/50 hover:shadow-lg transition-all duration-300 bg-card"
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${categoryColors[resource.category]} text-white shadow-md`}>
                      {resource.icon}
                    </div>
                    <div>
                      <CardTitle className="text-base">{resource.title}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-0.5">{resource.category}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">{resource.description}</p>
                
                <div className="flex flex-wrap gap-1.5">
                  {resource.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>

                {resource.steps && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between text-xs"
                      onClick={() => setExpandedCard(isExpanded ? null : index)}
                    >
                      {isExpanded ? 'Hide Steps' : 'View Roadmap Steps'}
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </Button>
                    
                    {isExpanded && (
                      <div className="space-y-2 pt-1">
                        {resource.steps.map((step, si) => (
                          <div key={si} className="flex items-start gap-2">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold mt-0.5">
                              {si + 1}
                            </span>
                            <span className="text-sm text-foreground">{step}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* CTA */}
      <Card className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 border-pink-200 dark:border-pink-800">
        <CardContent className="p-6 text-center space-y-3">
          <Rocket className="w-8 h-8 text-pink-600 mx-auto" />
          <h3 className="text-lg font-bold text-foreground">Ready to Launch?</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Register on Startup India to get DPIIT recognition, tax benefits, and access to government funding.
          </p>
          <Button 
            className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white"
            onClick={() => window.open('https://www.startupindia.gov.in/', '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Visit Startup India
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
