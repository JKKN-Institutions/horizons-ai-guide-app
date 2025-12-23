import { useState } from 'react';
import { Users, Briefcase, BookOpen, Code, MoreHorizontal, Trophy, Lightbulb, GraduationCap, UserCheck } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'learners', label: 'Learners', icon: Users },
  { id: 'jobs', label: 'Jobs', icon: Briefcase },
  { id: 'learn', label: 'Learn', icon: BookOpen },
  { id: 'practice', label: 'Practice', icon: Code },
];

const moreItems = [
  { id: 'hackathons', label: 'Hackathons', icon: Trophy },
  { id: 'tips', label: 'Tips', icon: Lightbulb },
  { id: 'scholarships', label: 'Scholarships', icon: GraduationCap },
  { id: 'mentors', label: 'Mentors', icon: UserCheck },
];

export function JKKNBottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  
  const isMoreActive = moreItems.some(item => item.id === activeTab);

  const handleMoreItemClick = (tabId: string) => {
    onTabChange(tabId);
    setSheetOpen(false);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive 
                  ? 'text-[#2E7D32]' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all ${
                isActive ? 'bg-[#E8F5E9]' : ''
              }`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
              </div>
              <span className={`text-[10px] mt-0.5 ${isActive ? 'font-semibold' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
        
        {/* More Button */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <button
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isMoreActive 
                  ? 'text-[#2E7D32]' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all ${
                isMoreActive ? 'bg-[#E8F5E9]' : ''
              }`}>
                <MoreHorizontal className={`w-5 h-5 ${isMoreActive ? 'stroke-[2.5]' : ''}`} />
              </div>
              <span className={`text-[10px] mt-0.5 ${isMoreActive ? 'font-semibold' : 'font-medium'}`}>
                More
              </span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-2xl pb-8">
            <SheetHeader className="pb-4">
              <SheetTitle className="text-left">More Options</SheetTitle>
            </SheetHeader>
            <div className="grid grid-cols-4 gap-4">
              {moreItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMoreItemClick(item.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-[#E8F5E9] text-[#2E7D32]' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mb-2 ${isActive ? 'stroke-[2.5]' : ''}`} />
                    <span className={`text-xs ${isActive ? 'font-semibold' : 'font-medium'}`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
      {/* Safe area padding for devices with home indicator */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
