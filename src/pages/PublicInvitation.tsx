import { useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Template, getTemplateById } from "@/lib/templates";
import { getEventTypeConfig } from "@/lib/event-types";
import { getTemplateCulturalStyle } from "@/lib/template-styles";
import { usePublicInvitation } from "@/hooks/use-invitations";
import { 
  CornerOrnaments, 
  Divider, 
  GreetingText, 
  ClosingText, 
  SectionWrapper, 
  PatternOverlay,
} from "@/components/invitation/TemplateDecorations";
import { RSVPForm } from "@/components/invitation/RSVPForm";
import { GuestBook } from "@/components/invitation/GuestBook";
import { DigitalEnvelope } from "@/components/invitation/DigitalEnvelope";
import { CalendarButtons } from "@/components/invitation/CalendarButtons";
import { format, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { MapPin, Calendar, Clock, Volume2, VolumeX, Loader2, Gift, Heart, MessageCircle, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Watermark } from "@/components/invitation/Watermark";

export default function PublicInvitation() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const guestName = searchParams.get("to") || undefined;
  
  const { invitation, isLoading, error } = usePublicInvitation(slug || "");
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const template = invitation ? getTemplateById(invitation.templateId) as Template : null;
  const eventConfig = invitation ? getEventTypeConfig(invitation.eventType) : null;
  const culturalStyle = template ? getTemplateCulturalStyle(template.id) : null;
  const isWedding = invitation?.eventType === "wedding";
  
  // Audio control
  useEffect(() => {
    if (invitation?.musicUrl) {
      audioRef.current = new Audio(invitation.musicUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [invitation?.musicUrl]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
  }, [isMuted]);
  
  // Countdown timer
  useEffect(() => {
    if (!invitation?.eventDate) return;
    
    const eventDateTime = new Date(`${invitation.eventDate}T${invitation.eventTime || "00:00"}`);
    
    const updateCountdown = () => {
      const now = new Date();
      const days = Math.max(0, differenceInDays(eventDateTime, now));
      const hours = Math.max(0, differenceInHours(eventDateTime, now) % 24);
      const minutes = Math.max(0, differenceInMinutes(eventDateTime, now) % 60);
      const seconds = Math.max(0, differenceInSeconds(eventDateTime, now) % 60);
      setCountdown({ days, hours, minutes, seconds });
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [invitation?.eventDate, invitation?.eventTime]);
  
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "EEEE, d MMMM yyyy", { locale: idLocale });
    } catch {
      return dateString;
    }
  };
  
  const displayNames = () => {
    if (!invitation) return null;
    if (isWedding) {
      return (
        <>
          <span>{invitation.names[0]}</span>
          <span className="block text-lg font-normal my-2">&</span>
          <span>{invitation.names[1]}</span>
        </>
      );
    }
    return invitation.names[0];
  };

  const displayNamesText = () => {
    if (!invitation) return "";
    if (isWedding) return `${invitation.names[0]} & ${invitation.names[1]}`;
    return invitation.names[0];
  };
  
  const generateWhatsAppMessage = () => {
    if (!invitation || !eventConfig) return "";
    const namesText = displayNamesText();
    const dateText = invitation.eventDate ? formatDate(invitation.eventDate) : "";
    const timeText = invitation.eventTime ? `${invitation.eventTime} ${invitation.timezone}` : "";
    const locationText = invitation.locationName || "";
    const invitationUrl = window.location.href;
    
    const message = `🎉 *${eventConfig.defaultLabels.title}*

Dengan penuh sukacita, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara:

👤 *${namesText}*

📅 ${dateText}
🕐 ${timeText}
📍 ${locationText}

Untuk informasi lengkap, silakan buka undangan digital kami:
${invitationUrl}

Merupakan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir. Terima kasih 🙏`;
    
    return encodeURIComponent(message);
  };
  
  const handleWhatsAppShare = () => {
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !invitation || !template || !eventConfig || !culturalStyle) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
        <span className="text-6xl mb-4">📭</span>
        <h1 className="font-serif text-2xl font-bold mb-2">Undangan Tidak Ditemukan</h1>
        <p className="text-muted-foreground">
          Undangan yang Anda cari tidak ada atau belum dipublikasikan.
        </p>
      </div>
    );
  }

  const decorProps = {
    style: culturalStyle,
    primaryColor: template.colorScheme.primary,
    secondaryColor: template.colorScheme.secondary,
    textColor: template.colorScheme.text,
  };
  
  return (
    <div 
      className="min-h-screen"
      style={{ 
        backgroundColor: template.colorScheme.background,
        color: template.colorScheme.text,
        fontFamily: culturalStyle.fontAccent === 'serif' 
          ? '"Playfair Display", "Plus Jakarta Sans", serif' 
          : '"Plus Jakarta Sans", sans-serif',
      }}
    >
      {/* Background Pattern */}
      <PatternOverlay style={culturalStyle} />

      {/* Watermark for unpaid invitations */}
      {!invitation.isPaid && (
        <Watermark templateColors={{ primary: template.colorScheme.primary, background: template.colorScheme.background }} />
      )}

      {/* Cover / Opening */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 overflow-hidden"
            style={{ background: invitation.coverImage ? undefined : `linear-gradient(180deg, ${template.colorScheme.secondary}60 0%, ${template.colorScheme.background} 50%, ${template.colorScheme.secondary}60 100%)` }}
          >
            {invitation.coverImage && (
              <>
                <img src={invitation.coverImage} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${template.colorScheme.background}90 0%, ${template.colorScheme.background}70 50%, ${template.colorScheme.background}90 100%)` }} />
              </>
            )}
            
            <CornerOrnaments {...decorProps} />
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center relative z-10"
            >
              <GreetingText {...decorProps} />
              <span className="text-6xl mb-6 block">{eventConfig.icon}</span>
              <p className="text-sm uppercase tracking-widest mb-4" style={{ color: template.colorScheme.primary }}>
                {eventConfig.defaultLabels.title}
              </p>

              {/* Guest name personalization */}
              {guestName && (
                <p className="text-sm mb-3 opacity-70">
                  Kepada Yth. <strong>{decodeURIComponent(guestName)}</strong>
                </p>
              )}
              
              <h1 className="font-serif text-3xl font-bold mb-6 leading-tight" style={{ color: template.colorScheme.text }}>
                {displayNames()}
              </h1>
              
              <Divider {...decorProps} />
              
              <p className="text-sm mb-8" style={{ color: template.colorScheme.primary }}>
                {formatDate(invitation.eventDate)}
              </p>
              
              <Button
                onClick={() => setIsOpen(true)}
                className="px-8 py-6 text-lg rounded-full shadow-lg"
                style={{ backgroundColor: template.colorScheme.primary, color: template.colorScheme.background }}
              >
                Buka Undangan
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative z-10"
      >
        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
          <button
            onClick={handleWhatsAppShare}
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            style={{ backgroundColor: "#25D366", color: "#fff" }}
            aria-label="Bagikan via WhatsApp"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </button>
          
          {invitation.musicUrl && (
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: template.colorScheme.primary, color: template.colorScheme.background }}
              aria-label={isMuted ? "Nyalakan musik" : "Matikan musik"}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          )}
        </div>
        
        {/* Hero Section */}
        <section 
          className="min-h-screen flex flex-col items-center justify-center text-center p-6 relative overflow-hidden"
          style={{ background: invitation.coverImage ? undefined : `linear-gradient(180deg, ${template.colorScheme.secondary}40 0%, ${template.colorScheme.background} 100%)` }}
        >
          {invitation.coverImage && (
            <>
              <img src={invitation.coverImage} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${template.colorScheme.background}80 0%, ${template.colorScheme.background}f0 100%)` }} />
            </>
          )}

          <CornerOrnaments {...decorProps} />
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative z-10"
          >
            <GreetingText {...decorProps} />
            <span className="text-5xl mb-4 block">{eventConfig.icon}</span>
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: template.colorScheme.primary }}>
              {eventConfig.defaultLabels.title}
            </p>

            {guestName && (
              <p className="text-sm mb-3 opacity-70">
                Kepada Yth. <strong>{decodeURIComponent(guestName)}</strong>
              </p>
            )}
            
            <h1 className="font-serif text-3xl font-bold leading-tight mb-6" style={{ color: template.colorScheme.text }}>
              {displayNames()}
            </h1>
            
            <Divider {...decorProps} />
            
            <p style={{ color: template.colorScheme.primary }}>
              {formatDate(invitation.eventDate)}
            </p>
          </motion.div>
          
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute bottom-8"
          >
            <div className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-2" style={{ borderColor: template.colorScheme.primary + '50' }}>
              <div className="w-1 h-2 rounded-full" style={{ backgroundColor: template.colorScheme.primary }} />
            </div>
          </motion.div>
        </section>

        {/* Message / Sambutan */}
        {invitation.message && (
          <section className="py-12 px-6">
            <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="max-w-md mx-auto text-center">
              <SectionWrapper {...decorProps} className="p-6">
                <div className="text-4xl mb-4" style={{ color: template.colorScheme.primary }}>"</div>
                <p className="italic leading-relaxed">{invitation.message}</p>
                <div className="text-4xl mt-4" style={{ color: template.colorScheme.primary }}>"</div>
              </SectionWrapper>
            </motion.div>
          </section>
        )}
        
        {/* Countdown Section */}
        <section className="py-12 px-6">
          <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="max-w-md mx-auto text-center">
            <h2 className="font-serif text-xl font-semibold mb-6" style={{ color: template.colorScheme.primary }}>
              Menghitung Hari
            </h2>
            <div className="grid grid-cols-4 gap-2">
              {[
                { value: countdown.days, label: "Hari" },
                { value: countdown.hours, label: "Jam" },
                { value: countdown.minutes, label: "Menit" },
                { value: countdown.seconds, label: "Detik" },
              ].map((item, i) => (
                <div key={i} className="rounded-xl py-4" style={{ backgroundColor: template.colorScheme.secondary + '50' }}>
                  <div className="font-serif text-2xl font-bold" style={{ color: template.colorScheme.primary }}>{item.value}</div>
                  <div className="text-xs opacity-70">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Event Sessions */}
        {invitation.events.length > 0 && invitation.events.some(e => e.name) && (
          <section className="py-12 px-6">
            <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="max-w-md mx-auto space-y-4">
              <Divider {...decorProps} />
              <h2 className="font-serif text-xl font-semibold text-center mb-6" style={{ color: template.colorScheme.primary }}>
                Rangkaian Acara
              </h2>
              {invitation.events.filter(e => e.name).map((session, index) => (
                <SectionWrapper key={index} {...decorProps} className="p-6 text-center">
                  <h3 className="font-serif text-lg font-semibold mb-3" style={{ color: template.colorScheme.primary }}>
                    {session.name}
                  </h3>
                  {session.date && (
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <Calendar className="w-4 h-4" style={{ color: template.colorScheme.primary }} />
                      <span className="text-sm">{formatDate(session.date)}</span>
                    </div>
                  )}
                  {session.time && (
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <Clock className="w-4 h-4" style={{ color: template.colorScheme.primary }} />
                      <span className="text-sm">{session.time}{session.endTime ? ` - ${session.endTime}` : ''} {invitation.timezone}</span>
                    </div>
                  )}
                  {session.location && (
                    <div className="flex items-center justify-center gap-3">
                      <MapPin className="w-4 h-4" style={{ color: template.colorScheme.primary }} />
                      <span className="text-sm">{session.location}</span>
                    </div>
                  )}
                </SectionWrapper>
              ))}
            </motion.div>
          </section>
        )}
        
        {/* Event Details */}
        <section className="py-12 px-6">
          <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="max-w-md mx-auto space-y-6">
            <SectionWrapper {...decorProps} className="p-6 text-center">
              <h3 className="font-serif text-lg font-semibold mb-4" style={{ color: template.colorScheme.primary }}>
                {eventConfig.defaultLabels.dateLabel}
              </h3>
              <div className="flex items-center justify-center gap-3 mb-3">
                <Calendar className="w-5 h-5" style={{ color: template.colorScheme.primary }} />
                <span className="font-medium">{formatDate(invitation.eventDate)}</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Clock className="w-5 h-5" style={{ color: template.colorScheme.primary }} />
                <span className="font-medium">{invitation.eventTime} {invitation.timezone} - Selesai</span>
              </div>
            </SectionWrapper>
            
            <SectionWrapper {...decorProps} className="p-6 text-center">
              <h3 className="font-serif text-lg font-semibold mb-4" style={{ color: template.colorScheme.primary }}>
                {eventConfig.defaultLabels.locationLabel}
              </h3>
              <div className="flex items-start justify-center gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: template.colorScheme.primary }} />
                <div className="text-left">
                  <p className="font-medium">{invitation.locationName}</p>
                  <p className="text-sm opacity-70 mt-1">{invitation.locationAddress}</p>
                </div>
              </div>
              {invitation.locationMapUrl && (
                <a 
                  href={invitation.locationMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-full text-sm font-medium transition-transform hover:scale-105"
                  style={{ backgroundColor: template.colorScheme.primary, color: template.colorScheme.background }}
                >
                  <MapPin className="w-4 h-4" />
                  Buka Google Maps
                </a>
              )}
            </SectionWrapper>
          </motion.div>
        </section>

        {/* Save to Calendar */}
        <section className="py-8 px-6">
          <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="max-w-md mx-auto text-center">
            <Divider {...decorProps} />
            <h3 className="font-serif text-lg font-semibold mb-4 flex items-center justify-center gap-2" style={{ color: template.colorScheme.primary }}>
              <CalendarPlus className="w-5 h-5" />
              Simpan ke Kalender
            </h3>
            <CalendarButtons
              title={`${eventConfig.defaultLabels.title} - ${displayNamesText()}`}
              description={invitation.message || `${eventConfig.defaultLabels.title} ${displayNamesText()}`}
              date={invitation.eventDate}
              time={invitation.eventTime}
              timezone={invitation.timezone}
              location={`${invitation.locationName} - ${invitation.locationAddress}`}
              primaryColor={template.colorScheme.primary}
              backgroundColor={template.colorScheme.background}
              secondaryColor={template.colorScheme.secondary}
            />
          </motion.div>
        </section>
        
        {/* Gallery Section */}
        {invitation.galleryImages.length > 0 && (
          <section className="py-12 px-6">
            <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="max-w-md mx-auto">
              <Divider {...decorProps} />
              <h2 className="font-serif text-xl font-semibold mb-6 text-center" style={{ color: template.colorScheme.primary }}>
                Galeri Foto
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {invitation.galleryImages.map((url, index) => (
                  <div key={url} className="aspect-square rounded-xl overflow-hidden">
                    <img src={url} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* RSVP Section */}
        {isWedding && invitation.id && (
          <section className="py-12 px-6">
            <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="max-w-md mx-auto">
              <Divider {...decorProps} />
              <h2 className="font-serif text-xl font-semibold mb-6 text-center flex items-center justify-center gap-2" style={{ color: template.colorScheme.primary }}>
                <Heart className="w-5 h-5" />
                Konfirmasi Kehadiran
              </h2>
              <SectionWrapper {...decorProps} className="p-6">
                <RSVPForm
                  invitationId={invitation.id}
                  primaryColor={template.colorScheme.primary}
                  backgroundColor={template.colorScheme.background}
                  secondaryColor={template.colorScheme.secondary}
                  guestName={guestName ? decodeURIComponent(guestName) : undefined}
                />
              </SectionWrapper>
            </motion.div>
          </section>
        )}

        {/* Guest Book */}
        {isWedding && invitation.id && (
          <section className="py-12 px-6">
            <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="max-w-md mx-auto">
              <Divider {...decorProps} />
              <h2 className="font-serif text-xl font-semibold mb-6 text-center flex items-center justify-center gap-2" style={{ color: template.colorScheme.primary }}>
                <MessageCircle className="w-5 h-5" />
                Ucapan & Doa
              </h2>
              <SectionWrapper {...decorProps} className="p-6">
                <GuestBook
                  invitationId={invitation.id}
                  primaryColor={template.colorScheme.primary}
                  backgroundColor={template.colorScheme.background}
                  secondaryColor={template.colorScheme.secondary}
                  guestName={guestName ? decodeURIComponent(guestName) : undefined}
                />
              </SectionWrapper>
            </motion.div>
          </section>
        )}

        {/* Digital Envelope */}
        {isWedding && invitation.bankAccounts.length > 0 && invitation.bankAccounts.some(a => a.bankName) && (
          <section className="py-12 px-6">
            <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="max-w-md mx-auto">
              <Divider {...decorProps} />
              <h2 className="font-serif text-xl font-semibold mb-6 text-center flex items-center justify-center gap-2" style={{ color: template.colorScheme.primary }}>
                <Gift className="w-5 h-5" />
                Amplop Digital
              </h2>
              <DigitalEnvelope
                bankAccounts={invitation.bankAccounts}
                primaryColor={template.colorScheme.primary}
                backgroundColor={template.colorScheme.background}
                secondaryColor={template.colorScheme.secondary}
              />
            </motion.div>
          </section>
        )}
        
        {/* Closing Section */}
        <section className="py-12 px-6 text-center">
          <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="max-w-md mx-auto">
            <Divider {...decorProps} />

            {/* Closing message */}
            {invitation.closingMessage && (
              <p className="text-sm leading-relaxed mb-6 opacity-80">
                {invitation.closingMessage}
              </p>
            )}

            {/* Prayer / Quote */}
            {invitation.closingPrayer && (
              <SectionWrapper {...decorProps} className="p-5 mb-6">
                <p className="italic text-sm leading-relaxed opacity-70">{invitation.closingPrayer}</p>
              </SectionWrapper>
            )}

            {/* Thank you */}
            <ClosingText {...decorProps} />
            
            <Divider {...decorProps} />
            
            <p className="font-serif text-lg mb-2" style={{ color: template.colorScheme.primary }}>
              Terima Kasih
            </p>
            
            {/* Names & family */}
            <p className="font-serif font-semibold mb-1" style={{ color: template.colorScheme.text }}>
              {displayNamesText()}
            </p>
            <p className="text-sm opacity-70 mb-6">
              Beserta keluarga besar
            </p>
            
            <div className="mt-8 pt-8 border-t" style={{ borderColor: template.colorScheme.primary + '15' }}>
              <p className="text-xs opacity-50">
                💌 Dibuat dengan UndanganKu
              </p>
            </div>
          </motion.div>
        </section>
      </motion.div>
    </div>
  );
}
