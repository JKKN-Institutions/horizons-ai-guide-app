import TopBar from "@/components/TopBar";
import NavigationBar from "@/components/NavigationBar";
import NewsTicker from "@/components/NewsTicker";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import ServicesSection from "@/components/ServicesSection";



import TwelfthLearnersSection from "@/components/TwelfthLearnersSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import AISmartStudyPlanner from "@/components/AISmartStudyPlanner";
import AIAdmissionPredictor from "@/components/AIAdmissionPredictor";
import StudyStreakGamification from "@/components/StudyStreakGamification";
import LiveExamCountdown from "@/components/LiveExamCountdown";
import InteractiveCareerFlowchart from "@/components/InteractiveCareerFlowchart";
import FloatingChatButton from "@/components/FloatingChatButton";
import { ChatModalProvider } from "@/hooks/useChatModal";

const Index = () => {
  return (
    <ChatModalProvider>
      <div className="min-h-screen bg-background page-transition">
        <TopBar />
        <NavigationBar />
        <NewsTicker />
        <HeroSection />
        <StatsBar />
        <ServicesSection />
        <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
          <AISmartStudyPlanner />
        </section>
        <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Smart Tools for Your Success</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <AIAdmissionPredictor />
            <StudyStreakGamification />
            <LiveExamCountdown />
            <InteractiveCareerFlowchart />
          </div>
        </section>
        
        
        
        <TwelfthLearnersSection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
        <FloatingChatButton />
      </div>
    </ChatModalProvider>
  );
};

export default Index;
