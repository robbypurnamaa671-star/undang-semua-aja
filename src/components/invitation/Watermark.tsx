import { motion } from "framer-motion";
import { useState } from "react";
import { useSubscription } from "@/hooks/use-subscription";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface WatermarkProps {
  templateColors?: {
    primary: string;
    background: string;
  };
}

export function Watermark({ templateColors }: WatermarkProps) {
  const { user } = useAuth();
  const { createPayment } = useSubscription();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      window.location.href = "/login";
      return;
    }
    setIsProcessing(true);
    try {
      const paymentUrl = await createPayment();
      if (paymentUrl) {
        window.open(paymentUrl, "_blank");
      } else {
        toast.error("Gagal membuat pembayaran");
      }
    } catch (err) {
      console.error(err);
      toast.error("Gagal memproses pembayaran");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-30 pointer-events-none overflow-hidden">
      {/* Diagonal repeating watermark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="relative w-[200%] h-[200%] -rotate-30"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(6, 1fr)",
            gap: "1.5rem",
          }}
        >
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-center opacity-[0.18]"
              style={{ color: templateColors?.primary || "hsl(var(--primary))" }}
            >
              <span className="text-3xl sm:text-4xl font-extrabold whitespace-nowrap tracking-widest uppercase"
                style={{ textShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
              >
                UNDANGANLINK
              </span>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Bottom banner */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-0 left-0 right-0 py-3 px-4 text-center pointer-events-auto"
        style={{ 
          backgroundColor: templateColors?.primary || "hsl(var(--primary))",
          color: templateColors?.background || "hsl(var(--background))",
        }}
      >
        <p className="text-sm font-medium">
          🔒 Ini adalah preview. Mulai berlangganan untuk menghapus watermark.{" "}
          <a
            href="#"
            onClick={handleSubscribe}
            className="underline font-bold hover:opacity-80 transition-opacity"
            style={{ color: templateColors?.background || "hsl(var(--background))" }}
          >
            {isProcessing ? "Memproses..." : "Berlangganan sekarang →"}
          </a>
        </p>
      </motion.div>
    </div>
  );
}
