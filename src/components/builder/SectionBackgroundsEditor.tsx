import { Label } from "@/components/ui/label";
import { ImageUpload } from "./ImageUpload";
import { CustomBackgrounds } from "@/lib/invitation";
import { Image } from "lucide-react";

interface SectionBackgroundsEditorProps {
  value: CustomBackgrounds;
  onChange: (backgrounds: CustomBackgrounds) => void;
}

const SECTIONS = [
  { key: "cover", label: "Cover / Pembuka", size: "1080 × 1920 px", desc: "Background layar pembuka undangan" },
  { key: "names", label: "Hero / Nama", size: "1080 × 1920 px", desc: "Background bagian nama & tanggal" },
  { key: "countdown", label: "Countdown", size: "1080 × 800 px", desc: "Background hitung mundur" },
  { key: "datetime", label: "Tanggal & Lokasi", size: "1080 × 1200 px", desc: "Background detail acara" },
  { key: "gallery", label: "Galeri", size: "1080 × 800 px", desc: "Background bagian galeri foto" },
  { key: "rsvp", label: "RSVP", size: "1080 × 800 px", desc: "Background konfirmasi kehadiran" },
  { key: "guestbook", label: "Ucapan & Doa", size: "1080 × 800 px", desc: "Background buku tamu" },
  { key: "envelope", label: "Amplop Digital", size: "1080 × 800 px", desc: "Background amplop digital" },
  { key: "closing", label: "Penutup", size: "1080 × 1200 px", desc: "Background bagian penutup" },
] as const;

export function SectionBackgroundsEditor({ value, onChange }: SectionBackgroundsEditorProps) {
  const updateSection = (key: string, url: string | undefined) => {
    onChange({ ...value, [key]: url });
  };

  return (
    <div className="space-y-4 pt-4 border-t border-border">
      <div className="flex items-center gap-2 mb-2">
        <Image className="w-5 h-5 text-primary" />
        <h3 className="font-serif text-lg font-semibold">Background Setiap Bagian</h3>
      </div>
      <p className="text-sm text-muted-foreground">
        Upload gambar background untuk setiap bagian undangan. Gunakan gambar berkualitas tinggi agar hasilnya menakjubkan.
      </p>

      <div className="space-y-5">
        {SECTIONS.map((section) => (
          <div key={section.key} className="rounded-lg border border-border p-4 space-y-2">
            <Label className="font-medium">{section.label}</Label>
            <p className="text-xs text-muted-foreground">{section.desc} • Ukuran ideal: {section.size}</p>
            <ImageUpload
              label=""
              value={(value as any)?.[section.key]}
              onChange={(url) => updateSection(section.key, url)}
              folder="custom-backgrounds"
              aspectRatio={section.key === "cover" || section.key === "names" ? "portrait" : "landscape"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
