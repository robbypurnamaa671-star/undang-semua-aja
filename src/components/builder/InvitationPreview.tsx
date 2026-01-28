import { Template } from "@/lib/templates";
import { InvitationData } from "@/lib/invitation";
import { getEventTypeConfig } from "@/lib/event-types";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { MapPin, Calendar, Clock } from "lucide-react";

interface InvitationPreviewProps {
  template: Template;
  invitation: InvitationData;
}

export function InvitationPreview({ template, invitation }: InvitationPreviewProps) {
  const eventConfig = getEventTypeConfig(invitation.eventType);
  
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
      className="min-h-full"
      style={{ 
        backgroundColor: template.colorScheme.background,
        color: template.colorScheme.text,
        fontFamily: '"Plus Jakarta Sans", sans-serif',
      }}
    >
      {/* Cover Section */}
      <section 
        className="min-h-[400px] flex flex-col items-center justify-center text-center p-6 relative"
        style={{ 
          background: `linear-gradient(180deg, ${template.colorScheme.secondary}40 0%, ${template.colorScheme.background} 100%)` 
        }}
      >
        {/* Decorative Top */}
        <div 
          className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full"
          style={{ backgroundColor: template.colorScheme.primary }}
        />
        
        {/* Event Icon */}
        <span className="text-5xl mb-4">{eventConfig.icon}</span>
        
        {/* Title */}
        <h2 
          className="text-sm uppercase tracking-widest mb-2 opacity-70"
          style={{ color: template.colorScheme.primary }}
        >
          {eventConfig.defaultLabels.title}
        </h2>
        
        {/* Names */}
        <h1 
          className="font-serif text-2xl font-bold leading-tight"
          style={{ color: template.colorScheme.text }}
        >
          {displayNames()}
        </h1>
        
        {/* Ornament */}
        <div 
          className="w-24 h-0.5 my-6 rounded-full"
          style={{ backgroundColor: template.colorScheme.primary }}
        />
        
        {/* Save the Date */}
        <p 
          className="text-sm"
          style={{ color: template.colorScheme.primary }}
        >
          {formatDate(invitation.eventDate)}
        </p>
      </section>
      
      {/* Event Details Section */}
      <section className="p-6 space-y-6">
        {/* Date & Time */}
        <div 
          className="rounded-xl p-5 text-center"
          style={{ backgroundColor: template.colorScheme.secondary + '40' }}
        >
          <h3 
            className="font-serif text-lg font-semibold mb-4"
            style={{ color: template.colorScheme.primary }}
          >
            {eventConfig.defaultLabels.dateLabel}
          </h3>
          
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar className="w-4 h-4" style={{ color: template.colorScheme.primary }} />
            <span>{formatDate(invitation.eventDate)}</span>
          </div>
          
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" style={{ color: template.colorScheme.primary }} />
            <span>{formatTime(invitation.eventTime)} WIB</span>
          </div>
        </div>
        
        {/* Location */}
        <div 
          className="rounded-xl p-5 text-center"
          style={{ backgroundColor: template.colorScheme.secondary + '40' }}
        >
          <h3 
            className="font-serif text-lg font-semibold mb-4"
            style={{ color: template.colorScheme.primary }}
          >
            {eventConfig.defaultLabels.locationLabel}
          </h3>
          
          <div className="flex items-start justify-center gap-2">
            <MapPin className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: template.colorScheme.primary }} />
            <div>
              <p className="font-medium">{invitation.locationName || "Lokasi belum diisi"}</p>
              <p className="text-sm opacity-70 mt-1">{invitation.locationAddress || ""}</p>
            </div>
          </div>
          
          {invitation.locationMapUrl && (
            <a 
              href={invitation.locationMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-4 py-2 rounded-full text-sm font-medium"
              style={{ 
                backgroundColor: template.colorScheme.primary,
                color: template.colorScheme.background,
              }}
            >
              Buka di Google Maps
            </a>
          )}
        </div>
      </section>
      
      {/* Message Section */}
      {invitation.message && (
        <section className="p-6 pt-0">
          <div 
            className="rounded-xl p-5 text-center"
            style={{ backgroundColor: template.colorScheme.secondary + '40' }}
          >
            <p className="italic text-sm leading-relaxed">"{invitation.message}"</p>
          </div>
        </section>
      )}
      
      {/* Footer */}
      <section className="p-6 text-center">
        <div 
          className="h-px w-16 mx-auto mb-4 rounded-full"
          style={{ backgroundColor: template.colorScheme.primary }}
        />
        <p className="text-xs opacity-50">
          Undangan digital oleh UndanganKu
        </p>
      </section>
    </div>
  );
}
