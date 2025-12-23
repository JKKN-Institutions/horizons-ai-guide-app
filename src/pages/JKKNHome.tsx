import { Link } from 'react-router-dom';
import { 
  Users, Briefcase, BookOpen, Code, Map, Trophy, 
  Award, GraduationCap, ArrowRight, Star, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JKKNNavbar } from '@/components/JKKN/JKKNNavbar';

const features = [
  {
    icon: Users,
    title: 'Learners Directory',
    description: 'Connect with JKKN students from all colleges',
    link: '/jkkn/learners',
    color: 'bg-blue-500',
  },
  {
    icon: Briefcase,
    title: 'Jobs & Internships',
    description: 'Find opportunities from top companies',
    link: '/jkkn/jobs',
    color: 'bg-fresh-green-medium',
  },
  {
    icon: BookOpen,
    title: 'Free Courses',
    description: 'Learn from YouTube, Coursera & more',
    link: '/jkkn/courses',
    color: 'bg-purple-500',
  },
  {
    icon: Code,
    title: 'Coding Practice',
    description: 'DSA problems with solutions',
    link: '/jkkn/coding',
    color: 'bg-orange-500',
  },
  {
    icon: Map,
    title: 'Career Roadmaps',
    description: 'Step-by-step guides to your dream career',
    link: '/jkkn/roadmaps',
    color: 'bg-teal-500',
  },
  {
    icon: Trophy,
    title: 'Hackathons',
    description: 'Participate in coding competitions',
    link: '/jkkn/hackathons',
    color: 'bg-pink-500',
  },
  {
    icon: Award,
    title: 'Scholarships',
    description: 'Financial aid opportunities',
    link: '/jkkn/scholarships',
    color: 'bg-amber-500',
  },
  {
    icon: GraduationCap,
    title: 'Mentors',
    description: 'Get guidance from industry experts',
    link: '/jkkn/mentors',
    color: 'bg-indigo-500',
  },
];

const stats = [
  { value: '2,500+', label: 'Registered Learners' },
  { value: '150+', label: 'Active Jobs' },
  { value: '50+', label: 'Free Courses' },
  { value: '100+', label: 'Coding Problems' },
];

export default function JKKNHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-fresh-green-bg via-white to-fresh-gold-light">
      <JKKNNavbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-fresh-green-dark via-fresh-green-medium to-fresh-green-dark opacity-95" />
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-fresh-gold-dark/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6">
              <Sparkles className="w-4 h-4 text-fresh-gold-medium" />
              JKKN Group of Institutions
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              JKKN Career Hub
            </h1>
            <p className="text-xl md:text-2xl text-fresh-gold-medium font-tamil mb-6">
              ஜேகேகேஎன் தொழில் மையம்
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              One platform for all JKKN students to find jobs, learn skills, 
              practice coding, and build their career. No login required!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/jkkn/register">
                <Button size="lg" className="btn-fresh-primary text-lg px-8 py-6 w-full sm:w-auto">
                  <Star className="w-5 h-5 mr-2" />
                  Register as JKKN Learner
                </Button>
              </Link>
              <Link to="/jkkn/learners">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6 w-full sm:w-auto"
                >
                  <Users className="w-5 h-5 mr-2" />
                  View Learners
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 text-center shadow-lg border-b-4 border-fresh-green-medium"
              >
                <div className="text-3xl md:text-4xl font-bold text-fresh-green-dark">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="fresh-section-heading text-center mx-auto w-fit mb-12">
            Explore Career Resources
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link 
                  key={index}
                  to={feature.link}
                  className="fresh-card group cursor-pointer"
                >
                  <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-fresh-green-medium font-medium text-sm">
                    Explore
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-fresh-green-dark to-fresh-green-medium rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-fresh-gold-dark/20 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Join 2,500+ JKKN Students
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Register now and appear at the top of the learners directory. 
                Get discovered by recruiters and connect with peers.
              </p>
              <Link to="/jkkn/register">
                <Button size="lg" className="btn-fresh-primary text-lg px-10">
                  <Star className="w-5 h-5 mr-2" />
                  Register Now - It's Free!
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-fresh-green-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-fresh-green-dark" />
            </div>
            <span className="font-bold text-xl">JKKN Career Hub</span>
          </div>
          <p className="text-white/70 mb-4">
            Empowering JKKN students for successful careers
          </p>
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} JKKN Group of Institutions. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
