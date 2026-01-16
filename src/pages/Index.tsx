import TopBar from "@/components/TopBar";
import NavigationBar from "@/components/NavigationBar";
import NewsTicker from "@/components/NewsTicker";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import ServicesSection from "@/components/ServicesSection";
import SalaryGrowthTimeline from "@/components/SalaryGrowthTimeline";
import SalaryCalculator from "@/components/SalaryCalculator";
import SkillPremiumCalculator from "@/components/SkillPremiumCalculator";
import TwelfthLearnersSection from "@/components/TwelfthLearnersSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PartnersSection from "@/components/PartnersSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import AISmartStudyPlanner from "@/components/AISmartStudyPlanner";
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
        <SkillPremiumCalculator />
        <SalaryGrowthTimeline />
        <SalaryCalculator />
        <TwelfthLearnersSection />
        <TestimonialsSection />
        <PartnersSection />
        <CTASection />
        <Footer />
        <FloatingChatButton />
      </div>
    </ChatModalProvider>
  );
};

export default Index;
