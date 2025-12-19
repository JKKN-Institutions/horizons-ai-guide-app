import TopBar from "@/components/TopBar";
import NavigationBar from "@/components/NavigationBar";
import NewsTicker from "@/components/NewsTicker";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import ServicesSection from "@/components/ServicesSection";
import TwelfthLearnersSection from "@/components/TwelfthLearnersSection";
import JobsSection from "@/components/JobsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PartnersSection from "@/components/PartnersSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FloatingChatButton from "@/components/FloatingChatButton";
import { ChatModalProvider } from "@/hooks/useChatModal";

const Index = () => {
  return (
    <ChatModalProvider>
      <div className="min-h-screen bg-background">
        <TopBar />
        <NavigationBar />
        <NewsTicker />
        <HeroSection />
        <StatsBar />
        <ServicesSection />
        <TwelfthLearnersSection />
        <JobsSection />
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
