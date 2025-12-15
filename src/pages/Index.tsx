import TopBar from "@/components/TopBar";
import NavigationBar from "@/components/NavigationBar";
import NewsTicker from "@/components/NewsTicker";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import ServicesSection from "@/components/ServicesSection";
import TwelfthLearnersSection from "@/components/TwelfthLearnersSection";
import JobsSection from "@/components/JobsSection";
import EventsAndAISection from "@/components/EventsAndAISection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PartnersSection from "@/components/PartnersSection";
import Footer from "@/components/Footer";
import FloatingChatButton from "@/components/FloatingChatButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <NavigationBar />
      <NewsTicker />
      <HeroSection />
      <StatsBar />
      <ServicesSection />
      <TwelfthLearnersSection />
      <JobsSection />
      <EventsAndAISection />
      <TestimonialsSection />
      <PartnersSection />
      <Footer />
      <FloatingChatButton />
    </div>
  );
};

export default Index;
