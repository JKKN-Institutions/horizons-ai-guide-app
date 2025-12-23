import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Users, Briefcase, BookOpen, Code, Map, Trophy, Lightbulb, GraduationCap, UserCheck, Menu, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LearnersTab } from '@/components/JKKN/tabs/LearnersTab';
import { JobsTab } from '@/components/JKKN/tabs/JobsTab';
import { LearnTab } from '@/components/JKKN/tabs/LearnTab';
import { PracticeTab } from '@/components/JKKN/tabs/PracticeTab';
import { RoadmapsTab } from '@/components/JKKN/tabs/RoadmapsTab';
import { HackathonsTab } from '@/components/JKKN/tabs/HackathonsTab';
import { TipsTab } from '@/components/JKKN/tabs/TipsTab';
import { ScholarshipsTab } from '@/components/JKKN/tabs/ScholarshipsTab';
import { MentorsTab } from '@/components/JKKN/tabs/MentorsTab';

const tabs = [
  { id: 'learners', label: 'Learners', icon: Users },
  { id: 'jobs', label: 'Jobs', icon: Briefcase },
  { id: 'learn', label: 'Learn', icon: BookOpen },
  { id: 'practice', label: 'Practice', icon: Code },
  { id: 'roadmaps', label: 'Roadmaps', icon: Map },
  { id: 'hackathons', label: 'Hackathons', icon: Trophy },
  { id: 'tips', label: 'Tips', icon: Lightbulb },
  { id: 'scholarships', label: 'Scholarships', icon: GraduationCap },
  { id: 'mentors', label: 'Mentors', icon: UserCheck },
];

export default function JKKNCareerHub() {
  const [activeTab, setActiveTab] = useState('learners');
  const tabsRef = useRef<HTMLDivElement>(null);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'learners':
        return <LearnersTab />;
      case 'jobs':
        return <JobsTab />;
      case 'learn':
        return <LearnTab />;
      case 'practice':
        return <PracticeTab />;
      case 'roadmaps':
        return <RoadmapsTab />;
      case 'hackathons':
        return <HackathonsTab />;
      case 'tips':
        return <TipsTab />;
      case 'scholarships':
        return <ScholarshipsTab />;
      case 'mentors':
        return <MentorsTab />;
      default:
        return <LearnersTab />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="bg-[#2E7D32] text-white sticky top-0 z-50 shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">JKKN CareerHub</h1>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#FFD54F] rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Register Button */}
      <div className="px-4 py-4 bg-white border-b border-gray-100">
        <Link to="/jkkn/register">
          <Button className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
            <Users className="w-5 h-5 mr-2" />
            👥 Register as JKKN Learner
          </Button>
        </Link>
      </div>

      {/* Horizontal Scrollable Tabs */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div
          ref={tabsRef}
          className="flex overflow-x-auto scrollbar-hide gap-1 px-3 py-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap font-medium text-sm transition-all flex-shrink-0 ${
                  isActive
                    ? 'bg-[#2E7D32] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <main className="pb-20">
        {renderTabContent()}
      </main>
    </div>
  );
}
