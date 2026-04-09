import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, CheckCircle } from "lucide-react";

export function DoneForYouSection() {
  const phone = "6288991509163";
  const message = encodeURIComponent("Halo Undanganlink, saya ingin dibuatkan undangan digital. Bisa bantu?");
  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <section className="py-12 bg-muted/50">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
            <CheckCircle className="w-7 h-7 text-primary" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-3 text-foreground">
            Bingung Cara Buatnya?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-2">
            Kami bisa buatkan, kamu terima jadi! ✨
          </p>
          <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
            Cukup kirimkan detail acara kamu via WhatsApp, tim kami akan membuatkan undangan digital yang cantik dan siap dibagikan.
          </p>
          <Button asChild size="lg" className="px-6 py-5 bg-[#25D366] hover:bg-[#1da851] text-white shadow-elevated hover:scale-105 transition-transform">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 w-5 h-5" />
              Hubungi Kami di WhatsApp
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
