import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Send, MessageCircle } from "lucide-react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

interface GuestMessage {
  id: string;
  guest_name: string;
  message: string;
  created_at: string;
}

interface GuestBookProps {
  invitationId: string;
  primaryColor: string;
  backgroundColor: string;
  secondaryColor: string;
  guestName?: string;
}

export function GuestBook({ invitationId, primaryColor, backgroundColor, secondaryColor, guestName }: GuestBookProps) {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [name, setName] = useState(guestName || "");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, [invitationId]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("guest_messages")
        .select("id, guest_name, message, created_at")
        .eq("invitation_id", invitationId)
        .eq("is_approved", true)
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      setMessages(data || []);
    } catch {
      // silently fail
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error("Mohon isi nama dan ucapan Anda");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from("guest_messages")
        .insert({
          invitation_id: invitationId,
          guest_name: name.trim().slice(0, 100),
          message: message.trim().slice(0, 500),
        })
        .select("id, guest_name, message, created_at")
        .single();

      if (error) throw error;
      
      if (data) {
        setMessages((prev) => [data, ...prev]);
      }
      setMessage("");
      toast.success("Ucapan Anda telah dikirim!");
    } catch {
      toast.error("Gagal mengirim ucapan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama Anda"
          maxLength={100}
          required
          className="border-opacity-30"
          style={{ borderColor: primaryColor + '40', backgroundColor: backgroundColor }}
        />
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tulis ucapan & doa untuk kedua mempelai..."
          maxLength={500}
          rows={3}
          required
          className="border-opacity-30"
          style={{ borderColor: primaryColor + '40', backgroundColor: backgroundColor }}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl font-medium transition-all hover:opacity-90"
          style={{ backgroundColor: primaryColor, color: backgroundColor }}
        >
          {isSubmitting ? "Mengirim..." : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Kirim Ucapan
            </>
          )}
        </Button>
      </form>

      {/* Messages list */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {isLoading ? (
          <p className="text-center text-sm opacity-50">Memuat ucapan...</p>
        ) : messages.length === 0 ? (
          <div className="text-center py-6">
            <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-30" style={{ color: primaryColor }} />
            <p className="text-sm opacity-50">Jadilah yang pertama mengirim ucapan!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="rounded-xl p-4"
              style={{ backgroundColor: secondaryColor + '40' }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm" style={{ color: primaryColor }}>
                  {msg.guest_name}
                </span>
                <span className="text-[10px] opacity-40">
                  {format(new Date(msg.created_at), "d MMM yyyy", { locale: idLocale })}
                </span>
              </div>
              <p className="text-sm leading-relaxed opacity-80">{msg.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
