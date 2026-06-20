import { Template } from "@/lib/templates";
import { InvitationData } from "@/lib/invitation";
import { getEventTypeConfig } from "@/lib/event-types";
import { getTemplateCulturalStyle } from "@/lib/template-styles";
import { CinematicScrollStory } from "@/components/invitation/CinematicScrollStory";
import { RoyalJavaneseScrollStory } from "@/components/invitation/RoyalJavaneseScrollStory";
import { 
  CornerOrnaments, 
  Divider, 
  GreetingText, 
  ClosingText, 
  SectionWrapper, 
  PatternOverlay,
} from "@/components/invitation/TemplateDecorations";
import { CulturalIconsOverlay } from "@/components/invitation/CulturalIconsOverlay";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { MapPin, Calendar, Clock, Gift } from "lucide-react";

interface InvitationPreviewProps {
  template: Template;
  invitation: InvitationData;
}

export function InvitationPreview({ template, invitation }: InvitationPreviewProps) {
  // Bespoke template — fully replaces the default invitation layout.
  if (template.isCinematic) {
    return (
      <div className="w-full h-full overflow-y-auto">
        <CinematicScrollStory invitation={invitation} />
      </div>
    );
  }
  if (template.isRoyalJavanese) {
    return (
      <div className="w-full h-full overflow-y-auto">
        <RoyalJavaneseScrollStory invitation={invitation} />
      </div>
    );
  }
  const eventConfig = getEventTypeConfig(invitation.eventType);
  const culturalStyle = getTemplateCulturalStyle(template.id);
  const isWedding = invitation.eventType === "wedding";
  const isLamaran = invitation.eventType === "lamaran";
  const hasTwoNames = isWedding || isLamaran;
  const features = eventConfig.features;
  // Merge user backgrounds over template defaults so the editor preview matches
  // the public invitation behavior across every section.
  const mergedBg = {
    ...(template.defaultBackgrounds || {}),
    ...(invitation.customBackgrounds || {}),
  };
  const templateCoverBg = invitation.coverImage || mergedBg.cover;
  // Single background applied to the whole preview (all 5 built-in templates ship
  // with the same image per section, so a single root layer covers all sections).
  const rootBg = mergedBg.cover || mergedBg.names;
  
  const decorProps = {
    style: culturalStyle,
    primaryColor: template.colorScheme.primary,
    secondaryColor: template.colorScheme.secondary,
    textColor: template.colorScheme.text,
  };
  
  const formatDate = (dateString: string) => {
    if (!dateString) return "Tanggal belum diisi";
    try {
      return format(new Date(dateString), "EEEE, d MMMM yyyy", { locale: idLocale });
    } catch {
      return dateString;
    }
  };
  
  const formatTime = (timeString: string) => {
    if (!timeString) return "Waktu belum diisi";
    return timeString;
  };
  
  const displayNames = () => {
    if (hasTwoNames) {
      const name1 = invitation.names[0] || (isWedding ? "Nama Mempelai Pria" : "Nama Pria");
      const name2 = invitation.names[1] || (isWedding ? "Nama Mempelai Wanita" : "Nama Wanita");
      return `${name1} & ${name2}`;
    }
    return invitation.names[0] || "Nama belum diisi";
  };
  
  return (
    <div 
      className="min-h-full relative"
      style={{ 
        backgroundColor: template.colorScheme.background,
        color: template.colorScheme.text,
        fontFamily: culturalStyle.fontAccent === 'serif' 
          ? '"Playfair Display", "Plus Jakarta Sans", serif' 
          : '"Plus Jakarta Sans", sans-serif',
      }}
    >
      {/* Built-in template background — covers ALL sections (top to bottom) */}
      {rootBg && (
        <>
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url(${rootBg})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'repeat-y',
              backgroundPosition: 'center top',
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(180deg, ${template.colorScheme.background}80 0%, ${template.colorScheme.background}b0 50%, ${template.colorScheme.background}80 100%)`,
            }}
          />
        </>
      )}

      {/* Background Pattern */}
      <PatternOverlay style={culturalStyle} />
      <CulturalIconsOverlay style={culturalStyle} primaryColor={template.colorScheme.primary} templateId={template.id} />

      {/* Cover Section */}
      <section 
        className="min-h-[420px] flex flex-col items-center justify-center text-center p-6 relative overflow-hidden"
        style={{ 
          background: (invitation.coverImage || templateCoverBg)
            ? undefined 
            : `linear-gradient(180deg, ${template.colorScheme.secondary}40 0%, ${template.colorScheme.background} 100%)` 
        }}
      >
        {(invitation.coverImage || templateCoverBg) && (
          <>
            <img src={invitation.coverImage || templateCoverBg} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${template.colorScheme.background}80 0%, ${template.colorScheme.background}f0 100%)` }} />
          </>
        )}
        
        <CornerOrnaments {...decorProps} />
        
        <div className="relative z-10 max-w-full">
          <GreetingText {...decorProps} />
          <Divider {...decorProps} />
          <img
            src={eventConfig.icon}
            alt={eventConfig.nameIndonesian}
            loading="lazy"
            className="w-16 h-16 mx-auto mb-3 object-contain"
          />
          <h2 className="text-xs uppercase tracking-[0.25em] mb-2 opacity-70" style={{ color: template.colorScheme.primary }}>
            {eventConfig.defaultLabels.title}
          </h2>
          <h1 className="font-serif text-2xl font-bold leading-tight px-2" style={{ color: template.colorScheme.text }}>
            {displayNames()}
          </h1>
          <Divider {...decorProps} />
          <p className="text-sm" style={{ color: template.colorScheme.primary }}>
            {formatDate(invitation.eventDate)}
          </p>
        </div>
      </section>

      {/* Message / Sambutan */}
      {invitation.message && (
        <section className="p-6 pt-0 relative z-10">
          <Divider {...decorProps} />
          <SectionWrapper {...decorProps} className="p-5 text-center">
            <p className="italic text-sm leading-relaxed">"{invitation.message}"</p>
          </SectionWrapper>
        </section>
      )}
      
      {/* Event Sessions */}
      {invitation.events.length > 0 && invitation.events.some(e => e.name) && (
        <section className="p-6 space-y-3 relative z-10">
          <Divider {...decorProps} />
          <h3 className="font-serif text-lg font-semibold text-center mb-4" style={{ color: template.colorScheme.primary }}>
            Rangkaian Acara
          </h3>
          {invitation.events.filter(e => e.name).map((session, index) => (
            <SectionWrapper key={index} {...decorProps} className="p-4 text-center">
              <h4 className="font-serif font-semibold text-sm mb-2" style={{ color: template.colorScheme.primary }}>
                {session.name}
              </h4>
              {session.date && (
                <div className="flex items-center justify-center gap-2 text-xs mb-1">
                  <Calendar className="w-3 h-3" style={{ color: template.colorScheme.primary }} />
                  <span>{formatDate(session.date)}</span>
                </div>
              )}
              {session.time && (
                <div className="flex items-center justify-center gap-2 text-xs mb-1">
                  <Clock className="w-3 h-3" style={{ color: template.colorScheme.primary }} />
                  <span>{session.time}{session.endTime ? ` - ${session.endTime}` : ''} {invitation.timezone}</span>
                </div>
              )}
              {session.location && (
                <div className="flex items-center justify-center gap-2 text-xs">
                  <MapPin className="w-3 h-3" style={{ color: template.colorScheme.primary }} />
                  <span>{session.location}</span>
                </div>
              )}
            </SectionWrapper>
          ))}
        </section>
      )}
      
      {/* Date & Time + Location */}
      <section className="p-6 space-y-6 relative z-10">
        <SectionWrapper {...decorProps} className="p-5 text-center">
          <h3 className="font-serif text-lg font-semibold mb-4" style={{ color: template.colorScheme.primary }}>
            {eventConfig.defaultLabels.dateLabel}
          </h3>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar className="w-4 h-4" style={{ color: template.colorScheme.primary }} />
            <span className="text-sm">{formatDate(invitation.eventDate)}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" style={{ color: template.colorScheme.primary }} />
            <span className="text-sm">{formatTime(invitation.eventTime)} {invitation.timezone}</span>
          </div>
        </SectionWrapper>
        
        <SectionWrapper {...decorProps} className="p-5 text-center">
          <h3 className="font-serif text-lg font-semibold mb-4" style={{ color: template.colorScheme.primary }}>
            {eventConfig.defaultLabels.locationLabel}
          </h3>
          <div className="flex items-start justify-center gap-2">
            <MapPin className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: template.colorScheme.primary }} />
            <div>
              <p className="font-medium text-sm">{invitation.locationName || "Lokasi belum diisi"}</p>
              <p className="text-xs opacity-70 mt-1">{invitation.locationAddress || ""}</p>
            </div>
          </div>
          {invitation.locationMapUrl && (
            <a 
              href={invitation.locationMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80"
              style={{ backgroundColor: template.colorScheme.primary, color: template.colorScheme.background, borderRadius: culturalStyle.sectionRadius }}
            >
              Buka di Google Maps
            </a>
          )}
        </SectionWrapper>
      </section>
      
      {/* Gallery */}
      {invitation.galleryImages.length > 0 && (
        <section className="p-6 pt-0 relative z-10">
          <Divider {...decorProps} />
          <h3 className="font-serif text-lg font-semibold mb-4 text-center" style={{ color: template.colorScheme.primary }}>
            Galeri Foto
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {invitation.galleryImages.map((url, index) => (
              <div key={url} className="aspect-square overflow-hidden" style={{ borderRadius: culturalStyle.sectionRadius }}>
                <img src={url} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Digital Envelope Preview */}
      {features.hasDigitalEnvelope && invitation.bankAccounts.length > 0 && invitation.bankAccounts.some(a => a.bankName) && (
        <section className="p-6 pt-0 relative z-10">
          <Divider {...decorProps} />
          <h3 className="font-serif text-lg font-semibold mb-4 text-center" style={{ color: template.colorScheme.primary }}>
            <Gift className="w-5 h-5 inline mr-2" />
            Amplop Digital
          </h3>
          {invitation.bankAccounts.filter(a => a.bankName).map((account, i) => (
            <SectionWrapper key={i} {...decorProps} className="p-4 text-center mb-2">
              <p className="text-xs font-medium uppercase tracking-wider opacity-60">{account.bankName}</p>
              <p className="font-mono text-sm font-semibold tracking-wider mt-1" style={{ color: template.colorScheme.primary }}>
                {account.accountNumber || "–"}
              </p>
              <p className="text-xs opacity-70 mt-1">a.n. {account.accountHolder || "–"}</p>
            </SectionWrapper>
          ))}
        </section>
      )}

      {/* RSVP & Guest Book Preview */}
      {features.hasRSVP && (
        <section className="p-6 pt-0 relative z-10">
          <Divider {...decorProps} />
          <SectionWrapper {...decorProps} className="p-5 text-center">
            <p className="text-xs uppercase tracking-widest mb-2 opacity-60" style={{ color: template.colorScheme.primary }}>
              Konfirmasi Kehadiran {features.hasGuestBook ? '& Ucapan' : ''}
            </p>
            <p className="text-sm opacity-70">Tersedia di halaman undangan publik</p>
          </SectionWrapper>
        </section>
      )}
      
      {/* Closing */}
      <section className="p-6 text-center relative z-10">
        {invitation.closingMessage && (
          <div className="mb-4">
            <p className="text-sm leading-relaxed opacity-80">{invitation.closingMessage}</p>
          </div>
        )}
        {invitation.closingPrayer && (
          <div className="mb-4">
            <SectionWrapper {...decorProps} className="p-4">
              <p className="italic text-xs leading-relaxed opacity-70">{invitation.closingPrayer}</p>
            </SectionWrapper>
          </div>
        )}
        <ClosingText {...decorProps} />
        <Divider {...decorProps} />
        <p className="text-xs opacity-40 mt-2">
          Undangan digital oleh Undanganlink
        </p>
      </section>
    </div>
  );
}
