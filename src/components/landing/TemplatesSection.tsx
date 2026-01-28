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
  // Show 6 featured templates
  const featuredTemplates = templates.slice(0, 6);
  
  return (
    <section id="template" className="py-20 bg-background">
      <div className="container px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
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
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {featuredTemplates.map((template) => (
            <motion.div 
              key={template.id} 
              variants={item}
              className="card-interactive group overflow-hidden"
            >
              {/* Template Preview */}
              <div 
                className="aspect-[3/4] relative overflow-hidden"
                style={{ backgroundColor: template.colorScheme.background }}
              >
                {/* Template Preview Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <div 
                    className="w-16 h-16 rounded-full mb-4 flex items-center justify-center"
                    style={{ backgroundColor: template.colorScheme.primary + '20' }}
                  >
                    <span className="text-3xl">
                      {template.eventTypes.includes('wedding') ? '💒' :
                       template.eventTypes.includes('khitanan') ? '🎉' :
                       template.eventTypes.includes('birthday') ? '🎂' :
                       template.eventTypes.includes('hajatan') ? '🙏' : '👨‍👩‍👧‍👦'}
                    </span>
                  </div>
                  <h4 
                    className="font-serif text-xl font-semibold text-center mb-2"
                    style={{ color: template.colorScheme.text }}
                  >
                    {template.name}
                  </h4>
                  <p 
                    className="text-sm text-center opacity-80"
                    style={{ color: template.colorScheme.text }}
                  >
                    {template.description}
                  </p>
                  
                  {/* Color Scheme Preview */}
                  <div className="flex gap-2 mt-4">
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-white shadow"
                      style={{ backgroundColor: template.colorScheme.primary }}
                    />
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-white shadow"
                      style={{ backgroundColor: template.colorScheme.secondary }}
                    />
                  </div>
                </div>
                
                {/* Premium Badge */}
                {template.isPremium && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary text-primary-foreground">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  </div>
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
              </div>
              
              {/* Template Info */}
              <div className="p-4 bg-card">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{template.name}</h4>
                    <p className="text-sm text-muted-foreground capitalize">
                      {template.eventTypes[0]}
                    </p>
                  </div>
                  <Badge variant="secondary" className="capitalize">
                    {template.style}
                  </Badge>
                </div>
              </div>
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
