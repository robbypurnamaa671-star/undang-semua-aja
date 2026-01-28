import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { EventTypesSection } from "@/components/landing/EventTypesSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { TemplatesSection } from "@/components/landing/TemplatesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <EventTypesSection />
      <FeaturesSection />
      <TemplatesSection />
      <HowItWorksSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
