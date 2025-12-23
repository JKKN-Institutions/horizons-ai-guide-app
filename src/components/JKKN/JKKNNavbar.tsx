import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, Briefcase, BookOpen, Code, Map, Trophy, 
  GraduationCap, Newspaper, Award, Menu, X, UserPlus,
  Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Home', href: '/jkkn', icon: Home },
  { name: 'Learners', href: '/jkkn/learners', icon: Users },
  { name: 'Jobs', href: '/jkkn/jobs', icon: Briefcase },
  { name: 'Courses', href: '/jkkn/courses', icon: BookOpen },
  { name: 'Coding', href: '/jkkn/coding', icon: Code },
  { name: 'Roadmaps', href: '/jkkn/roadmaps', icon: Map },
  { name: 'Hackathons', href: '/jkkn/hackathons', icon: Trophy },
  { name: 'Scholarships', href: '/jkkn/scholarships', icon: Award },
  { name: 'Mentors', href: '/jkkn/mentors', icon: GraduationCap },
  { name: 'Articles', href: '/jkkn/articles', icon: Newspaper },
];

export function JKKNNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-fresh-green-dark via-fresh-green-medium to-fresh-green-dark shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/jkkn" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-fresh-green-dark" />
            </div>
            <span className="text-white font-bold text-xl hidden sm:block">
              JKKN Career Hub
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.slice(0, 7).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Register Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/jkkn/register">
              <Button className="bg-fresh-gold-dark hover:bg-fresh-gold-rich text-white font-semibold gap-2">
                <UserPlus className="w-4 h-4" />
                Register as Learner
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-fresh-green-dark border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
            <Link
              to="/jkkn/register"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium bg-fresh-gold-dark text-white mt-4"
            >
              <UserPlus className="w-5 h-5" />
              Register as Learner
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
