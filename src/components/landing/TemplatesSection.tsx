import { motion } from "framer-motion";
import { templates } from "@/lib/templates";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Crown } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 },
};

export function TemplatesSection() {
  // Featured: only templates that ship with full background images so the
  // preview card can mirror the actual mobile invitation preview.
  const featuredTemplates = templates
    .filter((t) => !!t.defaultBackgrounds)
    .slice(0, 6);
  
  return (
    <section id="template" className="py-12 bg-background">
      <div className="container px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Template <span className="text-gradient">Premium</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Desain profesional yang siap digunakan untuk acara spesial Anda
          </p>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5"
        >
          {featuredTemplates.map((template) => {
            const dbg = template.defaultBackgrounds!;
            const sections: Array<{ key: string; src?: string; label: string }> = [
              { key: "cover", src: dbg.cover || dbg.names, label: "Pembuka" },
              { key: "names", src: dbg.names || dbg.cover, label: template.name },
              { key: "countdown", src: dbg.countdown || dbg.datetime || dbg.cover, label: "Hitung Mundur" },
              { key: "datetime", src: dbg.datetime || dbg.countdown || dbg.cover, label: "Waktu & Tempat" },
              { key: "location", src: dbg.location || dbg.datetime || dbg.cover, label: "Lokasi" },
              { key: "gallery", src: dbg.gallery || dbg.location || dbg.cover, label: "Galeri" },
              { key: "rsvp", src: dbg.rsvp || dbg.guestbook || dbg.cover, label: "RSVP" },
              { key: "guestbook", src: dbg.guestbook || dbg.rsvp || dbg.cover, label: "Buku Tamu" },
              { key: "envelope", src: dbg.envelope || dbg.gallery || dbg.cover, label: "Amplop Digital" },
              { key: "closing", src: dbg.closing || dbg.envelope || dbg.cover, label: "Penutup" },
            ];
            return (
              <motion.div
                key={template.id}
                variants={item}
                className="card-interactive group overflow-hidden relative"
              >
                {/* Scrollable mobile-like preview */}
                <div
                  className="aspect-[3/4] relative overflow-y-auto overscroll-contain scrollbar-thin"
                  style={{ backgroundColor: template.colorScheme.background }}
                >
                  <div className="flex flex-col">
                    {sections.map((s) => (
                      <div
                        key={s.key}
                        className="relative w-full bg-center bg-cover"
                        style={{
                          height: "180px",
                          backgroundImage: s.src ? `url(${s.src})` : undefined,
                        }}
                      >
                        <div className="absolute inset-x-0 bottom-0 px-2 py-1 bg-gradient-to-t from-black/60 to-transparent">
                          <p className="text-[10px] text-white/90 text-center font-medium drop-shadow line-clamp-1">
                            {s.label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Sticky title bar at top */}
                  <div className="sticky top-0 inset-x-0 z-10 px-3 py-2 bg-gradient-to-b from-black/70 via-black/40 to-transparent pointer-events-none">
                    <h3 className="font-serif text-sm font-semibold text-white text-center drop-shadow line-clamp-1">
                      {template.name}
                    </h3>
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute top-3 right-3 z-20">
                  {template.isPremium ? (
                    <Badge className="bg-primary text-primary-foreground shadow-lg">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-background/90 text-primary border-primary">
                      Gratis
                    </Badge>
                  )}
                </div>

                {/* Template Info */}
                <div className="p-4 bg-card">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="font-semibold truncate">{template.name}</h4>
                      <p className="text-sm text-muted-foreground capitalize truncate">
                        {template.eventTypes[0]}
                      </p>
                    </div>
                    <Badge variant="secondary" className="capitalize shrink-0">
                      {template.isPremium && <Crown className="w-3 h-3 mr-1" />}
                      {template.style}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-2 italic">
                    Geser ke bawah untuk lihat preview penuh
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" className="btn-hero">
            <Link to="/register">
              Lihat Semua Template
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
