import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Users, X, Link, Crown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GuestListEditorProps {
  guestList: string[];
  onChange: (guestList: string[]) => void;
  isPaid: boolean;
  slug?: string;
}

const FREE_GUEST_LIMIT = 20;

export function GuestListEditor({ guestList, onChange, isPaid, slug }: GuestListEditorProps) {
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  const addGuests = () => {
    const newNames = inputValue
      .split(",")
      .map((n) => n.trim())
      .filter((n) => n.length > 0);

    if (newNames.length === 0) return;

    const existingSet = new Set(guestList.map((g) => g.toLowerCase()));
    const uniqueNew = newNames.filter((n) => !existingSet.has(n.toLowerCase()));

    if (!isPaid && guestList.length + uniqueNew.length > FREE_GUEST_LIMIT) {
      const allowed = FREE_GUEST_LIMIT - guestList.length;
      toast({
        title: "Batas tamu tercapai",
        description: `Akun gratis hanya bisa menambahkan ${FREE_GUEST_LIMIT} tamu. Upgrade ke premium untuk unlimited.`,
        variant: "destructive",
      });
      if (allowed <= 0) return;
      onChange([...guestList, ...uniqueNew.slice(0, allowed)]);
    } else {
      onChange([...guestList, ...uniqueNew]);
    }
    setInputValue("");
  };

  const removeGuest = (index: number) => {
    onChange(guestList.filter((_, i) => i !== index));
  };

  const getGuestLink = (name: string) => {
    if (!slug) return "";
    return `${baseUrl}/invite/${slug}?to=${encodeURIComponent(name)}`;
  };

  const copyLink = (name: string) => {
    const link = getGuestLink(name);
    navigator.clipboard.writeText(link);
    toast({ title: "Link disalin!", description: `Link untuk ${name} berhasil disalin.` });
  };

  const copyAllLinks = () => {
    if (!slug || guestList.length === 0) return;
    const allLinks = guestList.map((name) => `${name}: ${getGuestLink(name)}`).join("\n");
    navigator.clipboard.writeText(allLinks);
    toast({ title: "Semua link disalin!", description: `${guestList.length} link berhasil disalin.` });
  };

  const remaining = isPaid ? "∞" : `${Math.max(0, FREE_GUEST_LIMIT - guestList.length)}`;

  return (
    <div className="space-y-4 border border-border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          <Label className="text-base font-semibold">Daftar Tamu</Label>
        </div>
        <Badge variant="secondary" className="text-xs">
          {guestList.length} tamu {!isPaid && `• sisa ${remaining}`}
        </Badge>
      </div>

      <p className="text-xs text-muted-foreground">
        Tambahkan nama tamu untuk membuat link undangan personal. Pisahkan dengan koma untuk menambahkan beberapa sekaligus.
      </p>

      {!isPaid && guestList.length >= FREE_GUEST_LIMIT && (
        <div className="flex items-center gap-2 p-3 rounded-md bg-muted border border-border">
          <Crown className="w-4 h-4 text-primary flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            Batas {FREE_GUEST_LIMIT} tamu tercapai. Upgrade ke premium untuk unlimited tamu.
          </p>
        </div>
      )}

      <div className="flex gap-2">
        <Textarea
          placeholder="Andi, Budi, Siti, Dewi..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          rows={2}
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              addGuests();
            }
          }}
        />
        <Button
          type="button"
          onClick={addGuests}
          size="sm"
          className="self-end"
          disabled={!isPaid && guestList.length >= FREE_GUEST_LIMIT}
        >
          Tambah
        </Button>
      </div>

      {guestList.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              {slug ? "Klik ikon link untuk menyalin" : "Simpan & publikasikan untuk mendapat link"}
            </span>
            {slug && guestList.length > 1 && (
              <Button variant="ghost" size="sm" onClick={copyAllLinks} className="text-xs h-7">
                <Copy className="w-3 h-3 mr-1" />
                Salin Semua
              </Button>
            )}
          </div>

          <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1">
            {guestList.map((name, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-2 px-3 py-2 rounded-md bg-muted/50"
              >
                <span className="text-sm truncate flex-1">{name}</span>
                <div className="flex items-center gap-1">
                  {slug && (
                    <button
                      onClick={() => copyLink(name)}
                      className="p-1.5 rounded-md hover:bg-primary/10 transition-colors"
                      title={`Salin link untuk ${name}`}
                    >
                      <Link className="w-3.5 h-3.5 text-primary" />
                    </button>
                  )}
                  <button
                    onClick={() => removeGuest(index)}
                    className="p-1.5 rounded-md hover:bg-destructive/10 transition-colors"
                    title="Hapus"
                  >
                    <X className="w-3.5 h-3.5 text-destructive" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
