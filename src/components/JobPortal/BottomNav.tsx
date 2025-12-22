import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart, Bell, User } from 'lucide-react';

const tabs = [
  { id: 'home', label: 'Home', icon: Home, path: '/jobs' },
  { id: 'search', label: 'Search', icon: Search, path: '/jobs/search' },
  { id: 'saved', label: 'Saved', icon: Heart, path: '/jobs/saved' },
  { id: 'alerts', label: 'Alerts', icon: Bell, path: '/jobs/alerts' },
  { id: 'profile', label: 'Profile', icon: User, path: '/jobs/profile' },
];

export const BottomNav = () => {
  const location = useLocation();
  
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/jobs' || path === '/jobs/') return 'home';
    if (path.includes('/jobs/search')) return 'search';
    if (path.includes('/jobs/saved')) return 'saved';
    if (path.includes('/jobs/alerts')) return 'alerts';
    if (path.includes('/jobs/profile')) return 'profile';
    return 'home';
  };

  const activeTab = getActiveTab();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-lg z-50 md:hidden">
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Link
              key={tab.id}
              to={tab.path}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all ${
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className={`w-5 h-5 mb-1 ${isActive ? 'scale-110' : ''} transition-transform`} />
              <span className="text-[10px] font-medium">{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-1 w-1 h-1 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
