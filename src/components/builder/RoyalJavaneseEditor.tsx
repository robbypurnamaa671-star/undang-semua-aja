import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "./ImageUpload";
import { GalleryUpload } from "./GalleryUpload";
import { VideoUpload } from "./VideoUpload";
import type { RoyalJavaneseConfig, RoyalJavaneseMilestone, RoyalJavaneseEventDetail } from "@/lib/invitation";
import { ROYAL_JAVANESE_MUSIC } from "@/lib/royal-javanese-music";
import { Crown, Film, Quote, BookHeart, Images, Calendar, MessageSquare, Gift, Music, AlertTriangle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Props {
  value: RoyalJavaneseConfig | undefined;
  onChange: (next: RoyalJavaneseConfig) => void;
}

const EMPTY_MILESTONES: RoyalJavaneseMilestone[] = [
  { title: "Pertama Bertemu", year: "", description: "" },
  { title: "Mulai Dekat", year: "", description: "" },
  { title: "Janji Sehidup", year: "", description: "" },
  { title: "Menuju Pelaminan", year: "", description: "" },
];

function SceneCard({ index, icon: Icon, title, subtitle, children }: { index: number; icon: any; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-amber-50/50 to-transparent border-b border-border">
        <div className="w-9 h-9 rounded-full bg-amber-600/10 text-amber-700 flex items-center justify-center text-xs font-bold">{index}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-sm font-semibold">
            <Icon className="w-4 h-4" />
            <span>{title}</span>
          </div>
          <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
        </div>
      </div>
      <div className="p-4 space-y-3">{children}</div>
    </div>
  );
}

export function RoyalJavaneseEditor({ value, onChange }: Props) {
  const v: RoyalJavaneseConfig = value || {};
  const set = <K extends keyof RoyalJavaneseConfig>(k: K, val: RoyalJavaneseConfig[K]) => onChange({ ...v, [k]: val });

  const milestones = (v.milestones && v.milestones.length === 4 ? v.milestones : EMPTY_MILESTONES);
  const updateMs = (i: number, patch: Partial<RoyalJavaneseMilestone>) => {
    const next = [...milestones];
    next[i] = { ...next[i], ...patch };
    set("milestones", next);
  };

  const akad = v.akad || {};
  const resepsi = v.resepsi || {};
  const setAkad = (patch: Partial<RoyalJavaneseEventDetail>) => set("akad", { ...akad, ...patch });
  const setResepsi = (patch: Partial<RoyalJavaneseEventDetail>) => set("resepsi", { ...resepsi, ...patch });

  const gift = v.gift || {};
  const setGift = (patch: Partial<typeof gift>) => set("gift", { ...gift, ...patch });

  const quoteLen = (v.openingQuote || "").length;
  const galleryCount = v.gallery?.length || 0;

  // Validation summary
  const issues: string[] = [];
  if (!v.groomFullName) issues.push("Nama lengkap mempelai pria belum diisi");
  if (!v.brideFullName) issues.push("Nama lengkap mempelai wanita belum diisi");
  if (!v.openingVideoUrl) issues.push("Opening video (Scene 1) belum diunggah");
  if (!v.openingQuote) issues.push("Opening quote (Scene 2) belum diisi");
  milestones.forEach((m, i) => {
    if (!m.title || !m.year || !m.description) issues.push(`Milestone #${i + 1} belum lengkap (judul / tahun / deskripsi)`);
  });
  if (galleryCount < 5) issues.push(`Galeri foto minimal 5 (sekarang ${galleryCount})`);
  if (!akad.date || !akad.time || !akad.location) issues.push("Detail Akad (tanggal, waktu, lokasi) belum lengkap");

  return (
    <div className="space-y-5 pt-4 border-t border-border">
      <div className="flex items-center gap-2">
        <Crown className="w-5 h-5 text-amber-600" />
        <h3 className="font-serif text-lg font-semibold">Royal Javanese Wedding Story</h3>
      </div>
      <p className="text-xs text-muted-foreground -mt-3">
        Template ini punya 7 scene sinematik. Setiap kartu di bawah memetakan langsung ke scene yang akan dilihat tamu Anda saat scroll undangan.
      </p>

      {issues.length > 0 && (
        <div className="rounded-md border border-amber-500/40 bg-amber-50 text-amber-900 p-3 text-xs">
          <div className="flex items-center gap-1.5 font-semibold mb-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            Belum bisa dipublikasikan — lengkapi dulu:
          </div>
          <ul className="list-disc pl-5 space-y-0.5">
            {issues.slice(0, 6).map((i) => <li key={i}>{i}</li>)}
            {issues.length > 6 && <li>… dan {issues.length - 6} item lainnya</li>}
          </ul>
        </div>
      )}

      {/* Scene 1 */}
      <SceneCard index={1} icon={Film} title="Scene 1 — Opening" subtitle="Identitas mempelai + opening video vertikal">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Nama Lengkap Pria *</Label>
            <Input value={v.groomFullName || ""} onChange={(e) => set("groomFullName", e.target.value)} placeholder="Raden Mas ..." />
          </div>
          <div className="space-y-1.5">
            <Label>Nama Lengkap Wanita *</Label>
            <Input value={v.brideFullName || ""} onChange={(e) => set("brideFullName", e.target.value)} placeholder="Raden Ayu ..." />
          </div>
          <div className="space-y-1.5">
            <Label>Panggilan Pria</Label>
            <Input value={v.groomNickname || ""} onChange={(e) => set("groomNickname", e.target.value)} placeholder="Aji" />
          </div>
          <div className="space-y-1.5">
            <Label>Panggilan Wanita</Label>
            <Input value={v.brideNickname || ""} onChange={(e) => set("brideNickname", e.target.value)} placeholder="Ayu" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Wedding Hashtag</Label>
          <Input value={v.hashtag || ""} onChange={(e) => set("hashtag", e.target.value)} placeholder="#AjiAyu2026" maxLength={40} />
        </div>
        <VideoUpload
          label="Opening Video *"
          value={v.openingVideoUrl}
          onChange={(url) => set("openingVideoUrl", url || "")}
          helper="MP4 vertikal (9:16), maksimal 30MB. Hanya digunakan di Scene 1."
        />
      </SceneCard>

      {/* Scene 2 */}
      <SceneCard index={2} icon={Quote} title="Scene 2 — Opening Quote" subtitle="Kalimat pembuka romantis (maks 150 karakter)">
        <Textarea
          rows={2}
          maxLength={150}
          value={v.openingQuote || ""}
          onChange={(e) => set("openingQuote", e.target.value)}
          placeholder="Sebuah kisah cinta yang ditulis oleh takdir."
        />
        <p className="text-xs text-muted-foreground text-right">{quoteLen}/150</p>
      </SceneCard>

      {/* Scene 3 */}
      <SceneCard index={3} icon={BookHeart} title="Scene 3 — Royal Love Story" subtitle="4 milestone penting kisah cinta Anda">
        {milestones.map((m, i) => (
          <div key={i} className="rounded-md border border-border p-3 space-y-2 bg-background">
            <div className="text-xs font-medium text-amber-700">Milestone #{i + 1}</div>
            <div className="grid grid-cols-2 gap-2">
              <Input maxLength={40} placeholder="Judul (mis. Pertama Bertemu)" value={m.title} onChange={(e) => updateMs(i, { title: e.target.value })} />
              <Input maxLength={4} placeholder="Tahun (mis. 2019)" value={m.year} onChange={(e) => updateMs(i, { year: e.target.value })} />
            </div>
            <Textarea
              rows={2}
              maxLength={200}
              placeholder="Cerita singkat tentang momen ini..."
              value={m.description}
              onChange={(e) => updateMs(i, { description: e.target.value })}
            />
            <ImageUpload
              label="Foto (opsional)"
              value={m.photo}
              onChange={(url) => updateMs(i, { photo: url })}
              folder="royal-javanese"
              aspectRatio="landscape"
            />
          </div>
        ))}
      </SceneCard>

      {/* Scene 4 */}
      <SceneCard index={4} icon={Images} title="Scene 4 — Photo Gallery" subtitle={`5–20 foto, portrait & landscape (sekarang ${galleryCount})`}>
        <GalleryUpload
          label="Galeri Foto"
          value={v.gallery || []}
          onChange={(urls) => set("gallery", urls)}
          maxImages={20}
        />
        {galleryCount > 0 && galleryCount < 5 && (
          <p className="text-xs text-amber-700">Minimal 5 foto untuk publikasi.</p>
        )}
      </SceneCard>

      {/* Scene 5 */}
      <SceneCard index={5} icon={Calendar} title="Scene 5 — Wedding Details" subtitle="Akad (wajib) & Resepsi (opsional)">
        <div className="rounded-md border border-amber-200 p-3 space-y-2 bg-amber-50/30">
          <div className="text-xs font-semibold text-amber-800">Akad Nikah *</div>
          <div className="grid grid-cols-2 gap-2">
            <Input type="date" value={akad.date || ""} onChange={(e) => setAkad({ date: e.target.value })} />
            <Input type="time" value={akad.time || ""} onChange={(e) => setAkad({ time: e.target.value })} />
          </div>
          <Input placeholder="Lokasi akad" value={akad.location || ""} onChange={(e) => setAkad({ location: e.target.value })} />
          <Input placeholder="Link Google Maps (opsional)" value={akad.mapsUrl || ""} onChange={(e) => setAkad({ mapsUrl: e.target.value })} />
        </div>
        <div className="rounded-md border border-border p-3 space-y-2 bg-background">
          <div className="text-xs font-semibold text-muted-foreground">Resepsi (opsional)</div>
          <div className="grid grid-cols-2 gap-2">
            <Input type="date" value={resepsi.date || ""} onChange={(e) => setResepsi({ date: e.target.value })} />
            <Input type="time" value={resepsi.time || ""} onChange={(e) => setResepsi({ time: e.target.value })} />
          </div>
          <Input placeholder="Lokasi resepsi" value={resepsi.location || ""} onChange={(e) => setResepsi({ location: e.target.value })} />
          <Input placeholder="Link Google Maps (opsional)" value={resepsi.mapsUrl || ""} onChange={(e) => setResepsi({ mapsUrl: e.target.value })} />
        </div>
      </SceneCard>

      {/* Scene 6 — RSVP */}
      <SceneCard index={6} icon={MessageSquare} title="Scene 6 — RSVP" subtitle="Konfirmasi kehadiran & ucapan tamu">
        <div className="flex items-center justify-between rounded-md border border-border bg-background p-3">
          <div>
            <Label className="text-sm">Aktifkan RSVP</Label>
            <p className="text-xs text-muted-foreground">Tamu bisa konfirmasi kehadiran dan kirim ucapan.</p>
          </div>
          <Switch checked={v.rsvpEnabled !== false} onCheckedChange={(c) => set("rsvpEnabled", c)} />
        </div>
        <p className="text-xs text-muted-foreground">Field tamu: Nama • Status Kehadiran • Pesan / Ucapan.</p>
      </SceneCard>

      {/* Scene 7 — Gift */}
      <SceneCard index={7} icon={Gift} title="Scene 7 — Wedding Gift" subtitle="Amplop digital & QRIS (opsional)">
        <div className="grid grid-cols-2 gap-2">
          <Input placeholder="Nama Bank" value={gift.bankName || ""} onChange={(e) => setGift({ bankName: e.target.value })} />
          <Input placeholder="Nomor Rekening" value={gift.accountNumber || ""} onChange={(e) => setGift({ accountNumber: e.target.value })} />
        </div>
        <Input placeholder="Nama Pemilik Rekening" value={gift.accountHolder || ""} onChange={(e) => setGift({ accountHolder: e.target.value })} />
        <ImageUpload
          label="QRIS (opsional)"
          value={gift.qrisImage}
          onChange={(url) => setGift({ qrisImage: url })}
          folder="royal-javanese"
          aspectRatio="square"
        />
      </SceneCard>

      {/* Scene 8 — Music */}
      <SceneCard index={8} icon={Music} title="Music — Background" subtitle="Pilih dari pustaka atau unggah MP3 sendiri">
        <RadioGroup
          value={v.musicUrl ? "upload" : v.musicLibraryId || ""}
          onValueChange={(val) => {
            if (val === "upload") return; // upload handled separately
            set("musicLibraryId", val);
            set("musicUrl", "");
          }}
          className="space-y-2"
        >
          {ROYAL_JAVANESE_MUSIC.map((t) => (
            <label key={t.id} className="flex items-start gap-3 rounded-md border border-border bg-background p-3 cursor-pointer hover:border-amber-400">
              <RadioGroupItem value={t.id} id={`m-${t.id}`} className="mt-1" />
              <div className="flex-1">
                <div className="text-sm font-medium">{t.name}</div>
                <p className="text-xs text-muted-foreground">{t.description}</p>
                <audio src={t.url} controls preload="none" className="mt-2 w-full h-8" />
              </div>
            </label>
          ))}
        </RadioGroup>
        <div className="space-y-1.5 pt-2 border-t border-border">
          <Label>Atau paste URL MP3 sendiri</Label>
          <Input
            placeholder="https://.../song.mp3"
            value={v.musicUrl || ""}
            onChange={(e) => {
              set("musicUrl", e.target.value);
              if (e.target.value) set("musicLibraryId", "");
            }}
          />
        </div>
      </SceneCard>
    </div>
  );
}