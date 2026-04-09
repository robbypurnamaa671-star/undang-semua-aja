import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { EventTypesSection } from "@/components/landing/EventTypesSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { TemplatesSection } from "@/components/landing/TemplatesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { DoneForYouSection } from "@/components/landing/DoneForYouSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { SEO } from "@/components/SEO";
import {
  softwareApplicationSchema,
  productSchema,
  organizationSchema,
  homepageFaqItems,
  buildFaqSchema,
} from "@/lib/seo-schemas";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Undangan Digital Pernikahan & Acara Spesial | Buat Undangan Online"
        description="Buat undangan digital pernikahan, khitanan, ulang tahun modern dalam 5 menit. Tersedia RSVP, buku tamu digital, galeri foto, dan template elegan. Bagikan via WhatsApp."
        canonical="/"
        jsonLd={[
          softwareApplicationSchema,
          productSchema,
          organizationSchema,
          buildFaqSchema(homepageFaqItems),
        ]}
      />
      <Navbar />
      <HeroSection />
      <EventTypesSection />
      <FeaturesSection />
      <TemplatesSection />
      <HowItWorksSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
