import { Template } from "@/lib/templates";
import { InvitationData } from "@/lib/invitation";
import { getEventTypeConfig } from "@/lib/event-types";
import { getTemplateCulturalStyle } from "@/lib/template-styles";
import { 
  CornerOrnaments, 
  Divider, 
  GreetingText, 
  ClosingText, 
  SectionWrapper, 
  PatternOverlay,
} from "@/components/invitation/TemplateDecorations";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { MapPin, Calendar, Clock } from "lucide-react";

interface InvitationPreviewProps {
  template: Template;
  invitation: InvitationData;
}

export function InvitationPreview({ template, invitation }: InvitationPreviewProps) {
  const eventConfig = getEventTypeConfig(invitation.eventType);
  const culturalStyle = getTemplateCulturalStyle(template.id);
  
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
    if (invitation.eventType === "wedding") {
      const name1 = invitation.names[0] || "Nama Mempelai Pria";
      const name2 = invitation.names[1] || "Nama Mempelai Wanita";
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
      {/* Background Pattern */}
      <PatternOverlay style={culturalStyle} />

      {/* Cover Section */}
      <section 
        className="min-h-[420px] flex flex-col items-center justify-center text-center p-6 relative overflow-hidden"
        style={{ 
          background: invitation.coverImage 
            ? undefined 
            : `linear-gradient(180deg, ${template.colorScheme.secondary}40 0%, ${template.colorScheme.background} 100%)` 
        }}
      >
        {/* Cover Image Background */}
        {invitation.coverImage && (
          <>
            <img 
              src={invitation.coverImage} 
              alt="Cover" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div 
              className="absolute inset-0"
              style={{ 
                background: `linear-gradient(180deg, ${template.colorScheme.background}80 0%, ${template.colorScheme.background}f0 100%)` 
              }}
            />
          </>
        )}
        
        {/* Corner Ornaments */}
        <CornerOrnaments {...decorProps} />
        
        {/* Content */}
        <div className="relative z-10 max-w-full">
          {/* Cultural Greeting */}
          <GreetingText {...decorProps} />

          {/* Cultural Divider */}
          <Divider {...decorProps} />
          
          {/* Event Icon */}
          <span className="text-5xl mb-3 block">{eventConfig.icon}</span>
        
          {/* Title */}
          <h2 
            className="text-xs uppercase tracking-[0.25em] mb-2 opacity-70"
            style={{ color: template.colorScheme.primary }}
          >
            {eventConfig.defaultLabels.title}
          </h2>
          
          {/* Names */}
          <h1 
            className="font-serif text-2xl font-bold leading-tight px-2"
            style={{ color: template.colorScheme.text }}
          >
            {displayNames()}
          </h1>
          
          {/* Cultural Divider */}
          <Divider {...decorProps} />
          
          {/* Save the Date */}
          <p 
            className="text-sm"
            style={{ color: template.colorScheme.primary }}
          >
            {formatDate(invitation.eventDate)}
          </p>
        </div>
      </section>
      
      {/* Event Details Section */}
      <section className="p-6 space-y-6 relative z-10">
        {/* Date & Time */}
        <SectionWrapper {...decorProps} className="p-5 text-center">
          <h3 
            className="font-serif text-lg font-semibold mb-4"
            style={{ color: template.colorScheme.primary }}
          >
            {eventConfig.defaultLabels.dateLabel}
          </h3>
          
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar className="w-4 h-4" style={{ color: template.colorScheme.primary }} />
            <span className="text-sm">{formatDate(invitation.eventDate)}</span>
          </div>
          
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" style={{ color: template.colorScheme.primary }} />
            <span className="text-sm">{formatTime(invitation.eventTime)} WIB</span>
          </div>
        </SectionWrapper>
        
        {/* Location */}
        <SectionWrapper {...decorProps} className="p-5 text-center">
          <h3 
            className="font-serif text-lg font-semibold mb-4"
            style={{ color: template.colorScheme.primary }}
          >
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
              style={{ 
                backgroundColor: template.colorScheme.primary,
                color: template.colorScheme.background,
                borderRadius: culturalStyle.sectionRadius,
              }}
            >
              Buka di Google Maps
            </a>
          )}
        </SectionWrapper>
      </section>
      
      {/* Gallery Section */}
      {invitation.galleryImages.length > 0 && (
        <section className="p-6 pt-0 relative z-10">
          <Divider {...decorProps} />
          <h3 
            className="font-serif text-lg font-semibold mb-4 text-center"
            style={{ color: template.colorScheme.primary }}
          >
            Galeri Foto
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {invitation.galleryImages.map((url, index) => (
              <div 
                key={url} 
                className="aspect-square overflow-hidden"
                style={{ borderRadius: culturalStyle.sectionRadius }}
              >
                <img 
                  src={url} 
                  alt={`Gallery ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Message Section */}
      {invitation.message && (
        <section className="p-6 pt-0 relative z-10">
          <Divider {...decorProps} />
          <SectionWrapper {...decorProps} className="p-5 text-center">
            <p className="italic text-sm leading-relaxed">"{invitation.message}"</p>
          </SectionWrapper>
        </section>
      )}
      
      {/* Closing & Footer */}
      <section className="p-6 text-center relative z-10">
        <ClosingText {...decorProps} />
        <Divider {...decorProps} />
        <p className="text-xs opacity-40 mt-2">
          Undangan digital oleh UndanganKu
        </p>
      </section>
    </div>
  );
}
