import { motion } from "framer-motion";
import { templates } from "@/lib/templates";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { TemplatePreviewCard } from "./TemplatePreviewCard";

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
  const featuredTemplates = templates.filter((t) => !!t.defaultBackgrounds).slice(0, 6);
  
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
          className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 sm:gap-x-8 md:gap-x-10 md:gap-y-10 max-w-5xl mx-auto px-2"
        >
          {featuredTemplates.map((template) => (
            <motion.div key={template.id} variants={item}>
              <TemplatePreviewCard template={template} />
            </motion.div>
          ))}
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
