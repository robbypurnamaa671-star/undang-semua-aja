import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Crown, Lock } from "lucide-react";
import { eventTypes, EventType } from "@/lib/event-types";
import { getTemplatesByEventType, Template, templates as allTemplates } from "@/lib/templates";
import logo from "@/assets/logo.png";
import { getTemplateCulturalStyle } from "@/lib/template-styles";
import { CulturalMotifLine } from "@/components/invitation/TemplateDecorations";
import { toast } from "sonner";
import { InvitationData, createDefaultInvitation } from "@/lib/invitation";
import { InvitationBuilder } from "@/components/builder/InvitationBuilder";
import { PaymentDialog } from "@/components/builder/PaymentDialog";
import { useAuth } from "@/contexts/AuthContext";
import { useInvitations, dbToInvitation, DbInvitation } from "@/hooks/use-invitations";
import { supabase } from "@/integrations/supabase/client";

type Step = "event" | "template" | "builder";

export default function Create() {
  const [searchParams] = useSearchParams();
  const preselectedEvent = searchParams.get("event") as EventType | null;
  const editId = searchParams.get("edit");
  
  const [step, setStep] = useState<Step>(preselectedEvent ? "template" : "event");
  const [selectedEventType, setSelectedEventType] = useState<EventType | null>(preselectedEvent);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(!!editId);
  
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const { createInvitation, updateInvitation, publishInvitation } = useInvitations();

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
    setStep("template");
  };
  
  const handleTemplateSelect = (template: Template) => {
    if (template.isPremium) {
      toast.error("Template Premium 🔒", {
        description: "Template ini hanya tersedia untuk pengguna premium. Silakan pilih template gratis atau upgrade ke premium.",
      });
      return;
    }
    setSelectedTemplate(template);
    if (selectedEventType) {
      setInvitation(createDefaultInvitation(selectedEventType, template.id));
    }
    setStep("builder");
  };
  
  const handleBack = () => {
    if (step === "template") {
      setStep("event");
      setSelectedEventType(null);
    } else if (step === "builder") {
      setStep("template");
      setSelectedTemplate(null);
      setInvitation(null);
    }
  };

  const handleSaveDraft = async () => {
    if (!invitation) return;
    
    setIsSaving(true);
    
    if (invitation.id) {
      // Update existing
      await updateInvitation(invitation.id, invitation);
    } else {
      // Create new
      const id = await createInvitation(invitation);
      if (id) {
        setInvitation({ ...invitation, id });
      }
    }
    
    setIsSaving(false);
  };

  const handlePublish = async () => {
    if (!invitation) return;
    setShowPaymentDialog(true);
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
  
  const templates = selectedEventType ? getTemplatesByEventType(selectedEventType) : [];

  if (authLoading || isLoadingEdit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }
  
  return (
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
              <img src={logo} alt="Undanganlink" className="h-8 w-8" />
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
              step === "template" ? "bg-primary text-primary-foreground" : 
              step === "builder" ? "bg-hajatan text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              {step === "builder" ? <Check className="w-4 h-4" /> : "2"}
            </div>
            <div className="w-8 h-0.5 bg-border" />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === "builder" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              3
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
                    <span className="text-4xl mb-3 block">{eventType.icon}</span>
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
          {step === "template" && selectedEventType && (
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
                  Pilih <span className="text-gradient">Template</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                  Pilih desain yang sesuai dengan selera Anda
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <motion.button
                    key={template.id}
                    whileHover={{ scale: template.isPremium ? 1 : 1.02 }}
                    whileTap={{ scale: template.isPremium ? 1 : 0.98 }}
                    onClick={() => handleTemplateSelect(template)}
                    className={`card-interactive text-left overflow-hidden relative ${
                      template.isPremium ? 'opacity-80 cursor-not-allowed' : ''
                    }`}
                  >
                    {/* Template Preview */}
                    {(() => {
                      const cs = getTemplateCulturalStyle(template.id);
                      return (
                        <div 
                          className="aspect-[3/4] relative flex flex-col items-center justify-center p-6 overflow-hidden"
                          style={{ 
                            backgroundColor: template.colorScheme.background,
                            ...(cs.backgroundPattern ? { backgroundImage: cs.backgroundPattern } : {}),
                          }}
                        >
                          {/* Corner ornaments */}
                          {cs.cornerMotif !== 'none' && (
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
                          <p className="text-[9px] text-center opacity-50 mb-2 px-4 line-clamp-2" style={{ color: template.colorScheme.primary }}>
                            {cs.greeting.split('\n')[0]}
                          </p>

                          <div 
                            className="w-14 h-14 rounded-full mb-3 flex items-center justify-center"
                            style={{ backgroundColor: template.colorScheme.primary + '15' }}
                          >
                            <span className="text-2xl">
                              {eventTypes.find(e => e.id === selectedEventType)?.icon}
                            </span>
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
                          
                          {/* Cultural motif line */}
                          <CulturalMotifLine style={cs} primaryColor={template.colorScheme.primary} />
                          
                          {/* Color preview */}
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
                          
                          {/* Premium Lock Overlay */}
                          {template.isPremium && (
                            <div className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3">
                              <div className="w-14 h-14 rounded-full bg-background/90 flex items-center justify-center shadow-lg">
                                <Lock className="w-7 h-7 text-primary" />
                              </div>
                              <Badge className="bg-primary text-primary-foreground shadow-lg">
                                <Crown className="w-3 h-3 mr-1" />
                                Premium
                              </Badge>
                            </div>
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
                            <Lock className="w-3 h-3 mr-1" />
                            Terkunci
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
        />
      </main>
    </div>
  );
}
