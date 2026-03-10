import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, Loader2, X } from "lucide-react";
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

  const comparisonFeatures = [
    { feature: "Akses semua template", free: true, premium: true },
    { feature: "Customisasi warna & foto", free: true, premium: true },
    { feature: "RSVP & Buku Tamu", free: true, premium: true },
    { feature: "Galeri Foto", free: true, premium: true },
    { feature: "Bagikan via WhatsApp", free: true, premium: true },
    { feature: "Optimized untuk mobile", free: true, premium: true },
    { feature: "Jumlah undangan", free: "Unlimited", premium: "Unlimited" },
    { feature: "Jumlah tamu per undangan", free: "Maks 20", premium: "Unlimited" },
    { feature: "Watermark", free: "Ada", premium: "Tanpa watermark" },
    { feature: "Amplop digital", free: false, premium: true },
    { feature: "Link undangan permanen", free: false, premium: true },
    { feature: "Dukungan prioritas", free: false, premium: true },
  ];

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

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="card-elevated overflow-hidden rounded-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-semibold text-foreground">Fitur</th>
                    <th className="text-center p-4 min-w-[100px]">
                      <span className="font-semibold text-muted-foreground">Gratis</span>
                      <div className="text-xs text-muted-foreground mt-1">Rp 0</div>
                    </th>
                    <th className="text-center p-4 min-w-[100px] bg-primary/5">
                      <span className="font-semibold text-primary">Premium</span>
                      <div className="text-xs text-primary mt-1">Rp 12.000/bln</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((item, index) => (
                    <tr key={index} className="border-b border-border/50 last:border-0">
                      <td className="p-4 text-foreground">{item.feature}</td>
                      <td className="p-4 text-center">
                        {item.free === true ? (
                          <Check className="w-5 h-5 text-hajatan mx-auto" />
                        ) : item.free === false ? (
                          <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                        ) : (
                          <span className="text-xs text-muted-foreground">{item.free}</span>
                        )}
                      </td>
                      <td className="p-4 text-center bg-primary/5">
                        {item.premium === true ? (
                          <Check className="w-5 h-5 text-hajatan mx-auto" />
                        ) : (
                          <span className="text-xs font-medium text-primary">{item.premium}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
        
        {/* Premium CTA Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <div className="card-elevated overflow-hidden rounded-2xl">
            <div className="bg-gradient-to-r from-primary to-wedding p-8 text-center text-primary-foreground">
              <h3 className="font-serif text-2xl font-bold mb-2">Premium</h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-sm opacity-80">Rp</span>
                <span className="font-serif text-5xl font-bold">12.000</span>
              </div>
              <p className="mt-2 opacity-80">per bulan</p>
            </div>
            
            <div className="p-8">
              <div className="space-y-3">
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
