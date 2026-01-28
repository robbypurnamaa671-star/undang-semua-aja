import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Template, getTemplateById } from "@/lib/templates";
import { InvitationData } from "@/lib/invitation";
import { getEventTypeConfig } from "@/lib/event-types";
import { format, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { MapPin, Calendar, Clock, Music, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock invitation data - would come from database
const mockInvitation: InvitationData = {
  id: "1",
  slug: "ahmad-siti",
  eventType: "wedding",
  templateId: "wedding-classic-gold",
  status: "published",
  isPaid: true,
  title: "Undangan Pernikahan",
  names: ["Ahmad Fadillah", "Siti Aisyah"],
  eventDate: "2024-03-15",
  eventTime: "10:00",
  locationName: "Gedung Serbaguna Mawar",
  locationAddress: "Jl. Mawar No. 123, Jakarta Selatan",
  locationMapUrl: "https://maps.google.com/?q=-6.2088,106.8456",
  message: "Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami. Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.",
  galleryImages: [],
};

export default function PublicInvitation() {
  const { slug } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  // In real app, fetch invitation by slug
  const invitation = mockInvitation;
  const template = getTemplateById(invitation.templateId) as Template;
  const eventConfig = getEventTypeConfig(invitation.eventType);
  
  // Countdown timer
  useEffect(() => {
    if (!invitation.eventDate) return;
    
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
  }, [invitation.eventDate, invitation.eventTime]);
  
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "EEEE, d MMMM yyyy", { locale: idLocale });
    } catch {
      return dateString;
    }
  };
  
  const displayNames = () => {
    if (invitation.eventType === "wedding") {
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
  
  if (!invitation || !template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p>Undangan tidak ditemukan</p>
      </div>
    );
  }
  
  return (
    <div 
      className="min-h-screen"
      style={{ 
        backgroundColor: template.colorScheme.background,
        color: template.colorScheme.text,
      }}
    >
      {/* Cover / Opening */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6"
            style={{ 
              background: `linear-gradient(180deg, ${template.colorScheme.secondary}60 0%, ${template.colorScheme.background} 50%, ${template.colorScheme.secondary}60 100%)` 
            }}
          >
            {/* Decorative elements */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center"
            >
              <span className="text-6xl mb-6 block">{eventConfig.icon}</span>
              
              <p 
                className="text-sm uppercase tracking-widest mb-4"
                style={{ color: template.colorScheme.primary }}
              >
                {eventConfig.defaultLabels.title}
              </p>
              
              <h1 
                className="font-serif text-3xl font-bold mb-6 leading-tight"
                style={{ color: template.colorScheme.text }}
              >
                {displayNames()}
              </h1>
              
              <div 
                className="w-24 h-0.5 mx-auto mb-6 rounded-full"
                style={{ backgroundColor: template.colorScheme.primary }}
              />
              
              <p className="text-sm mb-8" style={{ color: template.colorScheme.primary }}>
                {formatDate(invitation.eventDate)}
              </p>
              
              <Button
                onClick={() => setIsOpen(true)}
                className="px-8 py-6 text-lg rounded-full shadow-lg"
                style={{ 
                  backgroundColor: template.colorScheme.primary,
                  color: template.colorScheme.background,
                }}
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
      >
        {/* Music Toggle */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
          style={{ 
            backgroundColor: template.colorScheme.primary,
            color: template.colorScheme.background,
          }}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
        
        {/* Hero Section */}
        <section 
          className="min-h-screen flex flex-col items-center justify-center text-center p-6 relative"
          style={{ 
            background: `linear-gradient(180deg, ${template.colorScheme.secondary}40 0%, ${template.colorScheme.background} 100%)` 
          }}
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <span className="text-5xl mb-4 block">{eventConfig.icon}</span>
            
            <p 
              className="text-xs uppercase tracking-widest mb-4"
              style={{ color: template.colorScheme.primary }}
            >
              {eventConfig.defaultLabels.title}
            </p>
            
            <h1 
              className="font-serif text-3xl font-bold leading-tight mb-6"
              style={{ color: template.colorScheme.text }}
            >
              {displayNames()}
            </h1>
            
            <div 
              className="w-24 h-0.5 mx-auto mb-6 rounded-full"
              style={{ backgroundColor: template.colorScheme.primary }}
            />
            
            <p style={{ color: template.colorScheme.primary }}>
              {formatDate(invitation.eventDate)}
            </p>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute bottom-8"
          >
            <div 
              className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-2"
              style={{ borderColor: template.colorScheme.primary + '50' }}
            >
              <div 
                className="w-1 h-2 rounded-full"
                style={{ backgroundColor: template.colorScheme.primary }}
              />
            </div>
          </motion.div>
        </section>
        
        {/* Countdown Section */}
        <section className="py-12 px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto text-center"
          >
            <h2 
              className="font-serif text-xl font-semibold mb-6"
              style={{ color: template.colorScheme.primary }}
            >
              Menghitung Hari
            </h2>
            
            <div className="grid grid-cols-4 gap-2">
              {[
                { value: countdown.days, label: "Hari" },
                { value: countdown.hours, label: "Jam" },
                { value: countdown.minutes, label: "Menit" },
                { value: countdown.seconds, label: "Detik" },
              ].map((item, i) => (
                <div 
                  key={i}
                  className="rounded-xl py-4"
                  style={{ backgroundColor: template.colorScheme.secondary + '50' }}
                >
                  <div 
                    className="font-serif text-2xl font-bold"
                    style={{ color: template.colorScheme.primary }}
                  >
                    {item.value}
                  </div>
                  <div className="text-xs opacity-70">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
        
        {/* Event Details */}
        <section className="py-12 px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto space-y-6"
          >
            {/* Date & Time */}
            <div 
              className="rounded-2xl p-6 text-center"
              style={{ backgroundColor: template.colorScheme.secondary + '40' }}
            >
              <h3 
                className="font-serif text-lg font-semibold mb-4"
                style={{ color: template.colorScheme.primary }}
              >
                {eventConfig.defaultLabels.dateLabel}
              </h3>
              
              <div className="flex items-center justify-center gap-3 mb-3">
                <Calendar className="w-5 h-5" style={{ color: template.colorScheme.primary }} />
                <span className="font-medium">{formatDate(invitation.eventDate)}</span>
              </div>
              
              <div className="flex items-center justify-center gap-3">
                <Clock className="w-5 h-5" style={{ color: template.colorScheme.primary }} />
                <span className="font-medium">{invitation.eventTime} WIB - Selesai</span>
              </div>
            </div>
            
            {/* Location */}
            <div 
              className="rounded-2xl p-6 text-center"
              style={{ backgroundColor: template.colorScheme.secondary + '40' }}
            >
              <h3 
                className="font-serif text-lg font-semibold mb-4"
                style={{ color: template.colorScheme.primary }}
              >
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
                  style={{ 
                    backgroundColor: template.colorScheme.primary,
                    color: template.colorScheme.background,
                  }}
                >
                  <MapPin className="w-4 h-4" />
                  Buka Google Maps
                </a>
              )}
            </div>
          </motion.div>
        </section>
        
        {/* Message Section */}
        {invitation.message && (
          <section className="py-12 px-6">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-md mx-auto text-center"
            >
              <div 
                className="rounded-2xl p-6"
                style={{ backgroundColor: template.colorScheme.secondary + '40' }}
              >
                <div 
                  className="text-4xl mb-4"
                  style={{ color: template.colorScheme.primary }}
                >
                  "
                </div>
                <p className="italic leading-relaxed">{invitation.message}</p>
                <div 
                  className="text-4xl mt-4"
                  style={{ color: template.colorScheme.primary }}
                >
                  "
                </div>
              </div>
            </motion.div>
          </section>
        )}
        
        {/* Footer */}
        <section className="py-12 px-6 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <div 
              className="w-16 h-0.5 mx-auto mb-6 rounded-full"
              style={{ backgroundColor: template.colorScheme.primary }}
            />
            
            <p className="font-serif text-lg mb-2" style={{ color: template.colorScheme.primary }}>
              Terima Kasih
            </p>
            <p className="text-sm opacity-70">
              Atas kehadiran dan doa restu Anda
            </p>
            
            <div className="mt-8 pt-8 border-t border-border/20">
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
