import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/use-subscription";
import { toast } from "sonner";

export function PricingSection() {
  const { user } = useAuth();
  const { isPremium, createPayment } = useSubscription();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    if (!user) {
      navigate("/register");
      return;
    }

    if (isPremium) {
      toast.info("Anda sudah berlangganan premium!");
      return;
    }

    setIsProcessing(true);
    try {
      const paymentUrl = await createPayment();
      if (paymentUrl) {
        window.open(paymentUrl, "_blank");
        toast.success("Halaman pembayaran telah dibuka", {
          description: "Selesaikan pembayaran di tab baru.",
        });
      } else {
        toast.error("Gagal membuat pembayaran");
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Gagal memproses pembayaran");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section id="harga" className="py-20 bg-background">
      <div className="container px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Harga <span className="text-gradient">Terjangkau</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Langganan bulanan dengan harga terjangkau untuk semua fitur premium
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-lg mx-auto"
        >
          <div className="card-elevated overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-wedding p-8 text-center text-primary-foreground">
              <h3 className="font-serif text-2xl font-bold mb-2">Premium</h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-sm opacity-80">Rp</span>
                <span className="font-serif text-5xl font-bold">12.000</span>
              </div>
              <p className="mt-2 opacity-80">per bulan</p>
            </div>
            
            {/* Features */}
            <div className="p-8">
              <ul className="space-y-4">
                {[
                  "Akses semua template premium",
                  "Undangan unlimited",
                  "Tamu unlimited",
                  "Customisasi warna & foto",
                  "Link undangan permanen",
                  "Tanpa watermark",
                  "Optimized untuk mobile",
                  "Dibagikan via WhatsApp",
                  "Dukungan pelanggan prioritas",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-hajatan/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-hajatan" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 space-y-3">
                <Button 
                  onClick={handleSubscribe} 
                  disabled={isProcessing || isPremium}
                  size="lg" 
                  className="w-full btn-hero"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Memproses...
                    </>
                  ) : isPremium ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Sudah Premium
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Mulai Berlangganan
                    </>
                  )}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Gratis buat dan preview. Berlangganan untuk menghapus watermark.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
