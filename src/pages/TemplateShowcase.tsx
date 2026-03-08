import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Crown } from "lucide-react";
import { templates } from "@/lib/templates";
import { getTemplateCulturalStyle } from "@/lib/template-styles";
import { CulturalMotifLine } from "@/components/invitation/TemplateDecorations";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { InternalLinks } from "@/components/content/ContentComponents";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 },
};

export default function TemplateShowcase() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Template Undangan Digital Premium | Desain Elegan & Modern"
        description="Jelajahi koleksi lengkap template undangan digital premium untuk pernikahan, khitanan, ulang tahun. Desain elegan, modern, dan tradisional Indonesia. Gratis dan premium."
        canonical="/templates"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Template Undangan Digital",
          description: "Koleksi template undangan digital premium Indonesia",
          url: "https://undanganku.app/templates",
          numberOfItems: templates.length,
        }}
      />
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Template <span className="text-gradient">Undangan Digital</span> Premium
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Pilih dari {templates.length}+ desain undangan digital profesional untuk pernikahan, khitanan, ulang tahun, dan acara spesial lainnya
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {templates.map((template) => {
              const cs = getTemplateCulturalStyle(template.id);
              const eventIcon = template.eventTypes.includes("wedding") ? "💒"
                : template.eventTypes.includes("khitanan") ? "🎉"
                : template.eventTypes.includes("birthday") ? "🎂"
                : template.eventTypes.includes("hajatan") ? "🙏" : "👨‍👩‍👧‍👦";

              return (
                <motion.div key={template.id} variants={item}>
                  <Link
                    to={`/register?template=${template.id}`}
                    className="card-interactive block overflow-hidden rounded-xl relative group"
                  >
                    <div
                      className="aspect-[3/4] relative overflow-hidden"
                      style={{
                        backgroundColor: template.colorScheme.background,
                        ...(cs.backgroundPattern ? { backgroundImage: cs.backgroundPattern } : {}),
                      }}
                    >
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                        <div
                          className="w-14 h-14 rounded-full mb-3 flex items-center justify-center"
                          style={{ backgroundColor: template.colorScheme.primary + "15" }}
                        >
                          <span className="text-2xl">{eventIcon}</span>
                        </div>
                        <h2
                          className="font-serif text-lg font-semibold text-center mb-1"
                          style={{ color: template.colorScheme.text }}
                        >
                          {template.name}
                        </h2>
                        <p
                          className="text-xs text-center opacity-70 px-2 line-clamp-2"
                          style={{ color: template.colorScheme.text }}
                        >
                          {template.description}
                        </p>
                        <CulturalMotifLine style={cs} primaryColor={template.colorScheme.primary} />
                      </div>
                    </div>

                    <div className="absolute top-3 right-3 z-10">
                      {template.isPremium ? (
                        <Badge className="bg-primary text-primary-foreground shadow-lg">
                          <Crown className="w-3 h-3 mr-1" /> Premium
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-background/90 text-primary border-primary">
                          Gratis
                        </Badge>
                      )}
                    </div>

                    <div className="p-4 bg-card">
                      <h3 className="font-semibold">{template.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">{template.eventTypes.join(", ")}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="btn-hero">
              <Link to="/register">
                Buat Undangan Sekarang
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>

          <div className="max-w-xl mx-auto mt-8">
            <InternalLinks />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
