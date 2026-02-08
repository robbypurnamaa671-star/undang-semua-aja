import { useState } from "react";
import { BankAccount } from "@/lib/invitation";
import { Copy, Check, Gift } from "lucide-react";
import { toast } from "sonner";

interface DigitalEnvelopeProps {
  bankAccounts: BankAccount[];
  primaryColor: string;
  backgroundColor: string;
  secondaryColor: string;
}

export function DigitalEnvelope({ bankAccounts, primaryColor, backgroundColor, secondaryColor }: DigitalEnvelopeProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!bankAccounts || bankAccounts.length === 0) return null;

  const handleCopy = async (accountNumber: string, index: number) => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopiedIndex(index);
      toast.success("Nomor rekening berhasil disalin!");
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      toast.error("Gagal menyalin. Silakan salin manual.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <Gift className="w-8 h-8 mx-auto mb-2" style={{ color: primaryColor }} />
        <p className="text-sm opacity-70">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberikan tanda kasih, kami menyediakan amplop digital berikut:
        </p>
      </div>

      {bankAccounts.map((account, index) => (
        <div
          key={index}
          className="rounded-xl p-5 text-center"
          style={{ backgroundColor: secondaryColor + '40', border: `1px solid ${primaryColor}15` }}
        >
          <p className="text-xs font-medium uppercase tracking-wider mb-2 opacity-60">
            {account.bankName}
          </p>
          <p className="font-mono text-lg font-semibold tracking-wider mb-1" style={{ color: primaryColor }}>
            {account.accountNumber}
          </p>
          <p className="text-sm opacity-70 mb-3">
            a.n. {account.accountHolder}
          </p>
          <button
            onClick={() => handleCopy(account.accountNumber, index)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:opacity-80"
            style={{ backgroundColor: primaryColor, color: backgroundColor }}
          >
            {copiedIndex === index ? (
              <>
                <Check className="w-4 h-4" />
                Tersalin!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Salin Nomor
              </>
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
