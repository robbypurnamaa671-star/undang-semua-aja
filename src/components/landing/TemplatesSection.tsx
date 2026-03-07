import { motion } from "framer-motion";
import { templates } from "@/lib/templates";
import { getTemplateCulturalStyle } from "@/lib/template-styles";
import { CulturalMotifLine } from "@/components/invitation/TemplateDecorations";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Crown, Lock } from "lucide-react";

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
  // Show 8 featured templates (mix of free and premium)
  const featuredTemplates = templates.slice(0, 8);
  
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
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {featuredTemplates.map((template) => (
            <motion.div 
              key={template.id} 
              variants={item}
              className="card-interactive group overflow-hidden relative"
            >
              {/* Template Preview */}
              {(() => {
                const cs = getTemplateCulturalStyle(template.id);
                const eventIcon = template.eventTypes.includes('wedding') ? '💒' :
                  template.eventTypes.includes('khitanan') ? '🎉' :
                  template.eventTypes.includes('birthday') ? '🎂' :
                  template.eventTypes.includes('hajatan') ? '🙏' : '👨‍👩‍👧‍👦';
                return (
                  <div 
                    className="aspect-[3/4] relative overflow-hidden"
                    style={{ 
                      backgroundColor: template.colorScheme.background,
                      ...(cs.backgroundPattern ? { backgroundImage: cs.backgroundPattern } : {}),
                    }}
                  >
                    {/* Corner ornaments */}
                    {cs.cornerMotif !== 'none' && (
                      <>
                        <span className="absolute top-2 left-3 text-sm opacity-20 select-none" style={{ color: template.colorScheme.primary }}>{cs.culturalMotifs[0]}</span>
                        <span className="absolute top-2 right-3 text-sm opacity-20 select-none" style={{ color: template.colorScheme.primary, transform: 'scaleX(-1)' }}>{cs.culturalMotifs[0]}</span>
                        <span className="absolute bottom-14 left-3 text-sm opacity-20 select-none" style={{ color: template.colorScheme.primary, transform: 'scaleY(-1)' }}>{cs.culturalMotifs[0]}</span>
                        <span className="absolute bottom-14 right-3 text-sm opacity-20 select-none" style={{ color: template.colorScheme.primary, transform: 'scale(-1,-1)' }}>{cs.culturalMotifs[0]}</span>
                      </>
                    )}

                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                      {/* Greeting snippet */}
                      <p className="text-[8px] text-center opacity-40 mb-2 px-3 line-clamp-1" style={{ color: template.colorScheme.primary }}>
                        {cs.greeting.split('\n')[0]}
                      </p>

                      <div 
                        className="w-14 h-14 rounded-full mb-3 flex items-center justify-center"
                        style={{ backgroundColor: template.colorScheme.primary + '15' }}
                      >
                        <span className="text-2xl">{eventIcon}</span>
                      </div>
                      <h4 
                        className="font-serif text-lg font-semibold text-center mb-1"
                        style={{ color: template.colorScheme.text }}
                      >
                        {template.name}
                      </h4>
                      <p 
                        className="text-xs text-center opacity-70 px-2 line-clamp-2"
                        style={{ color: template.colorScheme.text }}
                      >
                        {template.description}
                      </p>
                      
                      <CulturalMotifLine style={cs} primaryColor={template.colorScheme.primary} />
                      
                      <div className="flex gap-2 mt-3">
                        <div 
                          className="w-5 h-5 rounded-full border-2 border-white shadow"
                          style={{ backgroundColor: template.colorScheme.primary }}
                        />
                        <div 
                          className="w-5 h-5 rounded-full border-2 border-white shadow"
                          style={{ backgroundColor: template.colorScheme.secondary }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Premium Lock Overlay */}
              {template.isPremium && (
                <div className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 z-10">
                  <div className="w-14 h-14 rounded-full bg-background/90 flex items-center justify-center shadow-lg">
                    <Lock className="w-7 h-7 text-primary" />
                  </div>
                  <Badge className="bg-primary text-primary-foreground shadow-lg">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                </div>
              )}
              
              {/* Free Badge */}
              {!template.isPremium && (
                <div className="absolute top-3 right-3 z-10">
                  <Badge variant="outline" className="bg-background/90 text-primary border-primary">
                    Gratis
                  </Badge>
                </div>
              )}
              
              {/* Hover Overlay */}
              {!template.isPremium && (
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 z-10" />
              )}
              
              {/* Template Info */}
              <div className="p-4 bg-card">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{template.name}</h4>
                    <p className="text-sm text-muted-foreground capitalize">
                      {template.eventTypes[0]}
                    </p>
                  </div>
                  {template.isPremium ? (
                    <Badge variant="secondary" className="capitalize">
                      <Lock className="w-3 h-3 mr-1" />
                      Terkunci
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="capitalize">
                      {template.style}
                    </Badge>
                  )}
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
