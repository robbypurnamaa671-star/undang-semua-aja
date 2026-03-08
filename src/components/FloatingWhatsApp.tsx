import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  const phone = "6288991509163";
  const message = encodeURIComponent("Halo Undanganlink, saya ingin bertanya tentang undangan digital.");
  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi kami via WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 shadow-gold hover:scale-105 transition-transform duration-300"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="text-sm font-semibold hidden sm:inline">Hubungi Kami</span>
    </a>
  );
}
