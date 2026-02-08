import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Send, UserCheck, UserX, Users } from "lucide-react";

interface RSVPFormProps {
  invitationId: string;
  primaryColor: string;
  backgroundColor: string;
  secondaryColor: string;
  guestName?: string;
}

export function RSVPForm({ invitationId, primaryColor, backgroundColor, secondaryColor, guestName }: RSVPFormProps) {
  const [name, setName] = useState(guestName || "");
  const [attendance, setAttendance] = useState<"hadir" | "tidak">("hadir");
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Mohon isi nama Anda");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("rsvp_responses").insert({
        invitation_id: invitationId,
        guest_name: name.trim().slice(0, 100),
        attendance,
        guest_count: attendance === "hadir" ? Math.min(Math.max(guestCount, 1), 10) : 0,
        message: message.trim().slice(0, 500) || null,
      });

      if (error) throw error;
      setIsSubmitted(true);
      toast.success("Terima kasih atas konfirmasi Anda!");
    } catch (err: any) {
      toast.error("Gagal mengirim RSVP. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">{attendance === "hadir" ? "🎉" : "🙏"}</div>
        <h3 className="font-serif text-lg font-semibold mb-2" style={{ color: primaryColor }}>
          {attendance === "hadir" ? "Sampai Jumpa!" : "Terima Kasih"}
        </h3>
        <p className="text-sm opacity-70">
          {attendance === "hadir" 
            ? "Kami menantikan kehadiran Anda di hari bahagia kami."
            : "Doa dan restu Anda sangat berarti bagi kami."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="text-sm font-medium mb-1.5 block" style={{ color: primaryColor }}>
          Nama Tamu
        </label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Masukkan nama Anda"
          maxLength={100}
          required
          className="border-opacity-30"
          style={{ borderColor: primaryColor + '40', backgroundColor: backgroundColor }}
        />
      </div>

      {/* Attendance */}
      <div>
        <label className="text-sm font-medium mb-2 block" style={{ color: primaryColor }}>
          Konfirmasi Kehadiran
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setAttendance("hadir")}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all"
            style={{
              backgroundColor: attendance === "hadir" ? primaryColor : secondaryColor + '60',
              color: attendance === "hadir" ? backgroundColor : primaryColor,
              border: `1px solid ${primaryColor}30`,
            }}
          >
            <UserCheck className="w-4 h-4" />
            Hadir
          </button>
          <button
            type="button"
            onClick={() => setAttendance("tidak")}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all"
            style={{
              backgroundColor: attendance === "tidak" ? primaryColor : secondaryColor + '60',
              color: attendance === "tidak" ? backgroundColor : primaryColor,
              border: `1px solid ${primaryColor}30`,
            }}
          >
            <UserX className="w-4 h-4" />
            Tidak Hadir
          </button>
        </div>
      </div>

      {/* Guest Count */}
      {attendance === "hadir" && (
        <div>
          <label className="text-sm font-medium mb-1.5 flex items-center gap-2" style={{ color: primaryColor }}>
            <Users className="w-4 h-4" />
            Jumlah Tamu
          </label>
          <Input
            type="number"
            min={1}
            max={10}
            value={guestCount}
            onChange={(e) => setGuestCount(parseInt(e.target.value) || 1)}
            className="border-opacity-30"
            style={{ borderColor: primaryColor + '40', backgroundColor: backgroundColor }}
          />
        </div>
      )}

      {/* Message */}
      <div>
        <label className="text-sm font-medium mb-1.5 block" style={{ color: primaryColor }}>
          Pesan Singkat (opsional)
        </label>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tulis ucapan atau pesan Anda..."
          maxLength={500}
          rows={3}
          className="border-opacity-30"
          style={{ borderColor: primaryColor + '40', backgroundColor: backgroundColor }}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 rounded-xl font-medium transition-all hover:opacity-90"
        style={{ backgroundColor: primaryColor, color: backgroundColor }}
      >
        {isSubmitting ? (
          "Mengirim..."
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Kirim Konfirmasi
          </>
        )}
      </Button>
    </form>
  );
}
