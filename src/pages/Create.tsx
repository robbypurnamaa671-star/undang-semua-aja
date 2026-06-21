import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Crown, Sparkles, Gamepad2, Palette, Film } from "lucide-react";
import { eventTypes, EventType } from "@/lib/event-types";
import { getTemplatesByEventType, Template, templates as allTemplates } from "@/lib/templates";
import logo from "@/assets/logo.svg";
import { getTemplateCulturalStyle } from "@/lib/template-styles";
import { SEO } from "@/components/SEO";
import { CulturalMotifLine } from "@/components/invitation/TemplateDecorations";
import { toast } from "sonner";
import { InvitationData, createDefaultInvitation } from "@/lib/invitation";
import { InvitationBuilder } from "@/components/builder/InvitationBuilder";
import { PaymentDialog } from "@/components/builder/PaymentDialog";
import { useAuth } from "@/contexts/AuthContext";
import { useInvitations, dbToInvitation, DbInvitation } from "@/hooks/use-invitations";
import { useSubscription } from "@/hooks/use-subscription";
import { supabase } from "@/integrations/supabase/client";

type Step = "event" | "category" | "template" | "builder";
type TemplateCategory = "suku" | "premium" | "video" | "game";

const SUKU_KEYWORDS = [
  "jawa","sunda","madura","batak","minang","betawi","bugis","banten","banjar",
  "bali","sasak","aceh","dayak","makassar","melayu","toraja","ambon","papua",
  "tionghoa","lampung","jogja","nusantara","adat",
];

function getTemplateCategory(t: Template): TemplateCategory {
  if (t.gameType) return "game";
  if (t.isCinematic || t.isRoyalJavanese) return "video";
  const hay = `${t.id} ${t.name} ${t.description}`.toLowerCase();
  if (SUKU_KEYWORDS.some((k) => hay.includes(k))) return "suku";
  return "premium";
}

const CATEGORY_META: Record<TemplateCategory, { label: string; description: string; icon: typeof Sparkles; gradient: string }> = {
  suku: {
    label: "Tema Suku & Adat",
    description: "Nuansa kearifan lokal Nusantara — Jawa, Sunda, Bali, Batak, Minang, dan lainnya",
    icon: Palette,
    gradient: "from-amber-500/15 to-rose-500/15",
  },
  premium: {
    label: "Premium & Modern",
    description: "Desain elegan, minimalis, dan kontemporer untuk tampilan eksklusif",
    icon: Sparkles,
    gradient: "from-primary/15 to-fuchsia-500/15",
  },
  video: {
    label: "Template Video",
    description: "Undangan sinematik scroll-driven dengan opening video premium, cocok untuk pernikahan mewah",
    icon: Film,
    gradient: "from-amber-500/15 to-rose-500/15",
  },
  game: {
    label: "Game Interaktif",
    description: "Undangan interaktif berupa mini game yang seru sebelum tamu membuka detail acara",
    icon: Gamepad2,
    gradient: "from-emerald-500/15 to-sky-500/15",
  },
};

export default function Create() {
  const [searchParams] = useSearchParams();
  const preselectedEvent = searchParams.get("event") as EventType | null;
  const editId = searchParams.get("edit");
  
  const [step, setStep] = useState<Step>(preselectedEvent ? "category" : "event");
  const [selectedEventType, setSelectedEventType] = useState<EventType | null>(preselectedEvent);
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(!!editId);
  
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const { createInvitation, updateInvitation, publishInvitation } = useInvitations();
  const { createPayment, isPremium } = useSubscription();

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  // Load existing invitation for editing
  useEffect(() => {
    if (!editId || !user) return;
    
    const loadInvitation = async () => {
      setIsLoadingEdit(true);
      try {
        const { data, error } = await supabase
          .from("invitations")
          .select("*")
          .eq("id", editId)
          .eq("user_id", user.id)
          .single();

        if (error || !data) {
          toast.error("Undangan tidak ditemukan");
          navigate("/dashboard");
          return;
        }

        const inv = dbToInvitation(data as unknown as DbInvitation);
        const template = allTemplates.find(t => t.id === inv.templateId);
        
        if (!template) {
          toast.error("Template tidak ditemukan");
          navigate("/dashboard");
          return;
        }

        setInvitation(inv);
        setSelectedTemplate(template);
        setSelectedEventType(inv.eventType as EventType);
        setStep("builder");
      } catch (err) {
        toast.error("Gagal memuat undangan");
        navigate("/dashboard");
      } finally {
        setIsLoadingEdit(false);
      }
    };

    loadInvitation();
  }, [editId, user]);
  
  const handleEventSelect = (eventType: EventType) => {
    setSelectedEventType(eventType);
    setStep("category");
  };

  const handleCategorySelect = (category: TemplateCategory) => {
    setSelectedCategory(category);
    setStep("template");
  };
  
  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    if (selectedEventType) {
      setInvitation(createDefaultInvitation(selectedEventType, template.id));
    }
    setStep("builder");
  };
  
  const handleBack = () => {
    if (step === "category") {
      setStep("event");
      setSelectedEventType(null);
    } else if (step === "template") {
      setStep("category");
      setSelectedCategory(null);
    } else if (step === "builder") {
      setStep(selectedCategory ? "template" : "template");
      setSelectedTemplate(null);
      setInvitation(null);
    }
  };

  const handleSaveDraft = async () => {
    if (!invitation) return;
    
    setIsSaving(true);
    
    // Auto-set isPaid for premium users
    const saveData = isPremium ? { ...invitation, isPaid: true } : invitation;
    
    if (saveData.id) {
      await updateInvitation(saveData.id, saveData);
    } else {
      const id = await createInvitation(saveData);
      if (id) {
        setInvitation({ ...saveData, id });
      }
    }
    
    setIsSaving(false);
  };

  const handlePublish = async () => {
    if (!invitation) return;
    if (isPremium) {
      // Premium users publish directly without watermark
      handlePublishWithPayment(true);
    } else {
      setShowPaymentDialog(true);
    }
  };

  const handlePublishWithPayment = async (isPaid: boolean) => {
    if (!invitation) return;
    
    setIsSaving(true);
    setShowPaymentDialog(false);
    
    const publishData = { ...invitation, status: "published" as const, isPaid };
    
    if (invitation.id) {
      // Update and publish existing
      const success = await updateInvitation(invitation.id, { status: "published", isPaid });
      if (success) {
        navigate("/dashboard");
      }
    } else {
      // Create and publish new
      const id = await createInvitation(publishData);
      if (id) {
        navigate("/dashboard");
      }
    }
    
    setIsSaving(false);
  };

  const handlePaymentSuccess = () => {
    handlePublishWithPayment(true);
  };

  const handlePublishFree = () => {
    handlePublishWithPayment(false);
    setShowPaymentDialog(false);
  };
  
  const baseTemplates = selectedEventType ? getTemplatesByEventType(selectedEventType) : [];
  const templates = selectedCategory
    ? baseTemplates.filter((t) => getTemplateCategory(t) === selectedCategory)
    : baseTemplates;
  const categoryCounts = baseTemplates.reduce(
    (acc, t) => {
      const c = getTemplateCategory(t);
      acc[c] = (acc[c] || 0) + 1;
      return acc;
    },
    { suku: 0, premium: 0, game: 0 } as Record<TemplateCategory, number>,
  );

  if (authLoading || isLoadingEdit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }
  
  return (
    <>
      <SEO
        title="Buat Undangan Digital | Pilih Template & Desain"
        description="Buat undangan digital pernikahan, khitanan, atau ulang tahun dengan template premium. Pilih desain, isi detail, dan bagikan lewat WhatsApp."
        canonical="/create"
        noIndex
      />
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {step !== "event" && (
              <Button variant="ghost" size="icon" onClick={handleBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Undanganlink" className="h-8 w-auto object-contain" />
              <span className="font-serif text-xl font-semibold text-gradient hidden sm:block">Undanganlink</span>
            </Link>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === "event" ? "bg-primary text-primary-foreground" : "bg-hajatan text-primary-foreground"
            }`}>
              {step === "event" ? "1" : <Check className="w-4 h-4" />}
            </div>
            <div className="w-8 h-0.5 bg-border" />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === "category" ? "bg-primary text-primary-foreground" :
              step === "template" || step === "builder" ? "bg-hajatan text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              {step === "template" || step === "builder" ? <Check className="w-4 h-4" /> : "2"}
            </div>
            <div className="w-8 h-0.5 bg-border" />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === "template" ? "bg-primary text-primary-foreground" :
              step === "builder" ? "bg-hajatan text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              {step === "builder" ? <Check className="w-4 h-4" /> : "3"}
            </div>
            <div className="w-8 h-0.5 bg-border" />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === "builder" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              4
            </div>
          </div>
          
          <Button variant="ghost" asChild>
            <Link to="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Event Type Selection */}
          {step === "event" && (
            <motion.div
              key="event"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
                  Pilih <span className="text-gradient">Jenis Acara</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                  Apa acara yang ingin Anda buat undangannya?
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {eventTypes.map((eventType) => (
                  <motion.button
                    key={eventType.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleEventSelect(eventType.id)}
                    className={`card-interactive p-6 text-left border-2 event-${eventType.id}`}
                  >
                    <img
                      src={eventType.icon}
                      alt={eventType.nameIndonesian}
                      loading="lazy"
                      className="w-14 h-14 mb-3 object-contain"
                    />
                    <h3 className="font-serif text-xl font-semibold mb-1">{eventType.nameIndonesian}</h3>
                    <p className="text-sm text-muted-foreground">{eventType.description}</p>
                    <div className="mt-4 flex items-center text-primary font-medium">
                      Pilih <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Step 2: Template Selection */}
          {step === "category" && selectedEventType && (
            <motion.div
              key="category"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-12">
                <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
                  Pilih <span className="text-gradient">Kategori Template</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                  Tentukan gaya undangan yang Anda inginkan sebelum memilih desain
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
                {(["suku", "premium", "game"] as TemplateCategory[]).map((cat) => {
                  const meta = CATEGORY_META[cat];
                  const Icon = meta.icon;
                  const count = categoryCounts[cat];
                  const disabled = count === 0;
                  return (
                    <motion.button
                      key={cat}
                      whileHover={!disabled ? { scale: 1.02 } : undefined}
                      whileTap={!disabled ? { scale: 0.98 } : undefined}
                      onClick={() => !disabled && handleCategorySelect(cat)}
                      disabled={disabled}
                      className={`card-interactive p-6 text-left border-2 relative overflow-hidden bg-gradient-to-br ${meta.gradient} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <div className="relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center mb-4 shadow-sm">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-serif text-xl font-semibold mb-1">{meta.label}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{meta.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            {count} template
                          </Badge>
                          {!disabled && (
                            <span className="flex items-center text-primary font-medium text-sm">
                              Lihat <ArrowRight className="w-4 h-4 ml-1" />
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 3: Template Selection */}
          {step === "template" && selectedEventType && selectedCategory && (
            <motion.div
              key="template"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-12">
                <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
                  Pilih <span className="text-gradient">{CATEGORY_META[selectedCategory].label}</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                  {CATEGORY_META[selectedCategory].description}
                </p>
              </div>

              {templates.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  Belum ada template untuk kategori ini pada jenis acara terpilih.
                </div>
              )}
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <motion.button
                    key={template.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleTemplateSelect(template)}
                    className="card-interactive text-left overflow-hidden relative"
                  >
                    {/* Template Preview */}
                    {(() => {
                      const cs = getTemplateCulturalStyle(template.id);
                       const dbg = template.defaultBackgrounds;
                       const templateBackground = dbg?.cover || dbg?.names;
                       // When template has full default backgrounds, render a vertical
                       // stack of section bands so the card looks like the actual
                       // invitation preview from top to bottom.
                       if (dbg) {
                         const sections: Array<{ key: string; src?: string }> = [
                           { key: "cover", src: dbg.cover || dbg.names },
                           { key: "names", src: dbg.names || dbg.cover },
                           { key: "datetime", src: dbg.datetime || dbg.countdown || dbg.cover },
                           { key: "gallery", src: dbg.gallery || dbg.location || dbg.cover },
                           { key: "rsvp", src: dbg.rsvp || dbg.guestbook || dbg.cover },
                           { key: "closing", src: dbg.closing || dbg.envelope || dbg.cover },
                         ];
                         return (
                           <div
                             className="aspect-[3/4] relative overflow-hidden flex flex-col"
                             style={{ backgroundColor: template.colorScheme.background }}
                           >
                             {sections.map((s) => (
                               <div
                                 key={s.key}
                                 className="flex-1 bg-center bg-cover"
                                 style={{ backgroundImage: s.src ? `url(${s.src})` : undefined }}
                               />
                             ))}
                             {/* Title overlay at bottom */}
                             <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                               <h4
                                 className="font-serif text-base font-semibold text-white text-center drop-shadow"
                               >
                                 {template.name}
                               </h4>
                               <div className="flex justify-center gap-2 mt-2">
                                 <div
                                   className="w-4 h-4 rounded-full border-2 border-white shadow"
                                   style={{ backgroundColor: template.colorScheme.primary }}
                                 />
                                 <div
                                   className="w-4 h-4 rounded-full border-2 border-white shadow"
                                   style={{ backgroundColor: template.colorScheme.secondary }}
                                 />
                               </div>
                             </div>
                             {template.isPremium && (
                               <Badge className="absolute top-3 right-3 z-10 bg-primary text-primary-foreground shadow-lg">
                                 <Crown className="w-3 h-3 mr-1" />
                                 Premium
                               </Badge>
                             )}
                           </div>
                         );
                       }
                       return (
                        <div 
                          className="aspect-[3/4] relative flex flex-col items-center justify-center p-6 overflow-hidden"
                          style={{ 
                            backgroundColor: template.colorScheme.background,
                             backgroundImage: templateBackground ? `url(${templateBackground})` : cs.backgroundPattern,
                             backgroundSize: templateBackground ? "cover" : undefined,
                             backgroundPosition: "center",
                          }}
                        >
                           {templateBackground && (
                             <div className="absolute inset-0 bg-background/25" aria-hidden="true" />
                           )}
                          {/* Corner ornaments */}
                           {cs.cornerMotif !== 'none' && !templateBackground && (
                            <>
                              <span className="absolute top-2 left-3 text-base opacity-25 select-none" style={{ color: template.colorScheme.primary }}>
                                {cs.culturalMotifs[0]}
                              </span>
                              <span className="absolute top-2 right-3 text-base opacity-25 select-none" style={{ color: template.colorScheme.primary, transform: 'scaleX(-1)' }}>
                                {cs.culturalMotifs[0]}
                              </span>
                              <span className="absolute bottom-14 left-3 text-base opacity-25 select-none" style={{ color: template.colorScheme.primary, transform: 'scaleY(-1)' }}>
                                {cs.culturalMotifs[0]}
                              </span>
                              <span className="absolute bottom-14 right-3 text-base opacity-25 select-none" style={{ color: template.colorScheme.primary, transform: 'scale(-1,-1)' }}>
                                {cs.culturalMotifs[0]}
                              </span>
                            </>
                          )}

                          {/* Greeting snippet */}
                           <p className="relative z-10 text-[9px] text-center opacity-70 mb-2 px-4 line-clamp-2" style={{ color: template.colorScheme.primary }}>
                            {cs.greeting.split('\n')[0]}
                          </p>

                          <div 
                             className="relative z-10 w-14 h-14 rounded-full mb-3 flex items-center justify-center bg-card/80 backdrop-blur-sm"
                            style={{ backgroundColor: template.colorScheme.primary + '15' }}
                          >
                            {(() => {
                              const ic = eventTypes.find(e => e.id === selectedEventType)?.icon;
                              return ic ? (
                                <img src={ic} alt="" loading="lazy" className="w-9 h-9 object-contain" />
                              ) : null;
                            })()}
                          </div>
                          <h4 
                             className="relative z-10 font-serif text-lg font-semibold text-center mb-1"
                            style={{ color: template.colorScheme.text }}
                          >
                            {template.name}
                          </h4>
                          <p 
                             className="relative z-10 text-xs text-center opacity-80 px-2 line-clamp-2"
                            style={{ color: template.colorScheme.text }}
                          >
                            {template.description}
                          </p>
                          
                          {/* Cultural motif line */}
                           {!templateBackground && <CulturalMotifLine style={cs} primaryColor={template.colorScheme.primary} />}
                          
                          {/* Color preview */}
                           <div className="relative z-10 flex gap-2 mt-3">
                            <div 
                              className="w-5 h-5 rounded-full border-2 border-white shadow"
                              style={{ backgroundColor: template.colorScheme.primary }}
                            />
                            <div 
                              className="w-5 h-5 rounded-full border-2 border-white shadow"
                              style={{ backgroundColor: template.colorScheme.secondary }}
                            />
                          </div>
                          
                          {/* Premium Badge */}
                          {template.isPremium && (
                             <Badge className="absolute top-3 right-3 z-10 bg-primary text-primary-foreground shadow-lg">
                              <Crown className="w-3 h-3 mr-1" />
                              Premium
                            </Badge>
                          )}
                        </div>
                      );
                    })()}
                    
                    <div className="p-4 bg-card">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">{template.name}</span>
                          <p className="text-xs text-muted-foreground capitalize">{template.style}</p>
                        </div>
                        {template.isPremium ? (
                          <Badge variant="secondary" className="text-xs">
                            <Crown className="w-3 h-3 mr-1" />
                            Premium
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs text-primary border-primary">
                            Gratis
                          </Badge>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Step 3: Builder */}
          {step === "builder" && selectedTemplate && invitation && (
            <motion.div
              key="builder"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <InvitationBuilder 
                template={selectedTemplate}
                invitation={invitation}
                onInvitationChange={setInvitation}
                onSaveDraft={handleSaveDraft}
                onPublish={handlePublish}
                isSaving={isSaving}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Payment Dialog */}
        <PaymentDialog
          open={showPaymentDialog}
          onOpenChange={(open) => {
            if (!open) setShowPaymentDialog(false);
          }}
          onPaymentSuccess={handlePaymentSuccess}
          onPublishFree={handlePublishFree}
          invitationTitle={invitation?.title || invitation?.names[0] || ""}
          createPayment={createPayment}
        />
      </main>
    </div>
    </>
  );
}
