import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, Loader2, Shield, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPaymentSuccess: () => void;
  onPublishFree?: () => void;
  invitationTitle: string;
  createPayment: () => Promise<string | null>;
}

export function PaymentDialog({
  open,
  onOpenChange,
  onPaymentSuccess,
  onPublishFree,
  invitationTitle,
  createPayment,
}: PaymentDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      const paymentUrl = await createPayment();

      if (paymentUrl) {
        // Open DOKU checkout page in new tab
        window.open(paymentUrl, "_blank");
        toast.success("Halaman pembayaran DOKU telah dibuka", {
          description:
            "Selesaikan pembayaran di tab baru. Status akan diperbarui otomatis.",
        });
        onOpenChange(false);
      } else {
        toast.error("Gagal membuat pembayaran");
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Gagal memproses pembayaran", {
        description:
          err instanceof Error ? err.message : "Terjadi kesalahan",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = (newOpen: boolean) => {
    if (!isProcessing) {
      onOpenChange(newOpen);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">
            Publikasikan Undangan
          </DialogTitle>
          <DialogDescription>
            Berlangganan premium untuk mempublikasikan &quot;
            {invitationTitle || "Undangan Anda"}&quot; tanpa watermark
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Price Card */}
          <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-6 text-center">
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="text-sm text-muted-foreground">Rp</span>
              <span className="font-serif text-4xl font-bold text-primary">
                12.000
              </span>
              <span className="text-sm text-muted-foreground">/bulan</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Langganan bulanan, bisa berhenti kapan saja
            </p>
          </div>

          {/* Features */}
          <ul className="space-y-3">
            {[
              "Semua template premium",
              "Undangan & tamu unlimited",
              "Tanpa watermark",
              "Share unlimited ke WhatsApp",
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <div className="w-5 h-5 rounded-full bg-hajatan/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-hajatan" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* Payment methods info */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>VA, QRIS, E-Wallet — powered by DOKU</span>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full btn-hero py-6 text-lg"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Bayar Rp 12.000/bulan
                </>
              )}
            </Button>

            <Button
              variant="ghost"
              onClick={() => {
                if (onPublishFree) {
                  onPublishFree();
                } else {
                  onOpenChange(false);
                }
              }}
              disabled={isProcessing}
              className="text-muted-foreground"
            >
              Publikasikan dengan Watermark (Gratis)
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            <Sparkles className="w-3 h-3 inline mr-1" />
            Berlangganan kapan saja untuk menghapus watermark
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
