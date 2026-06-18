import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "./ImageUpload";
import type { CinematicConfig, CinematicJourneyCard } from "@/lib/invitation";
import { Film, Sparkles, MapPin, Camera } from "lucide-react";

interface Props {
  value: CinematicConfig | undefined;
  onChange: (next: CinematicConfig) => void;
}

const EMPTY_CARDS: CinematicJourneyCard[] = [
  { year: "", title: "", text: "" },
  { year: "", title: "", text: "" },
  { year: "", title: "", text: "" },
];

export function CinematicEditor({ value, onChange }: Props) {
  const v: CinematicConfig = value || {};
  const set = <K extends keyof CinematicConfig>(k: K, val: CinematicConfig[K]) =>
    onChange({ ...v, [k]: val });

  const cards = (v.journeyCards && v.journeyCards.length > 0 ? v.journeyCards : EMPTY_CARDS).slice(0, 3);
  const updateCard = (i: number, patch: Partial<CinematicJourneyCard>) => {
    const next = [...cards];
    next[i] = { ...next[i], ...patch };
    set("journeyCards", next);
  };

  return (
    <div className="space-y-6 pt-4 border-t border-border">
      <div className="flex items-center gap-2">
        <Film className="w-5 h-5 text-primary" />
        <h3 className="font-serif text-lg font-semibold">Konten Cinematic Scroll Story</h3>
      </div>
      <p className="text-xs text-muted-foreground -mt-3">
        Template ini punya 10 scene sinematik. Isi field di bawah agar setiap scene tampil sesuai kisah Anda.
      </p>

      {/* Hero tagline */}
      <div className="space-y-2">
        <Label className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> Tagline Hero (Scene 1)</Label>
        <Input
          maxLength={80}
          placeholder="A Love Story Written By Destiny"
          value={v.heroTagline || ""}
          onChange={(e) => set("heroTagline", e.target.value)}
        />
        <p className="text-xs text-muted-foreground">Kalimat pendek bergaya film yang muncul di scene pembuka.</p>
      </div>

      {/* First Meeting */}
      <div className="rounded-lg border border-border p-4 space-y-3 bg-muted/30">
        <div className="text-sm font-semibold">Scene 2 — Kisah Pertemuan</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Tahun</Label>
            <Input maxLength={4} placeholder="2018" value={v.firstMeetingYear || ""} onChange={(e) => set("firstMeetingYear", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Judul</Label>
            <Input maxLength={40} placeholder="Pertama Kali Bertemu" value={v.firstMeetingTitle || ""} onChange={(e) => set("firstMeetingTitle", e.target.value)} />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Narasi</Label>
          <Textarea
            rows={3}
            maxLength={240}
            placeholder="Sebuah pertemuan sederhana di kafe kecil di sudut kota..."
            value={v.firstMeetingStory || ""}
            onChange={(e) => set("firstMeetingStory", e.target.value)}
          />
        </div>
        <ImageUpload
          label="Foto Pertemuan (rasio 3:4 disarankan)"
          value={v.firstMeetingImage}
          onChange={(url) => set("firstMeetingImage", url)}
          folder="cinematic"
          aspectRatio="portrait"
        />
      </div>

      {/* Journey cards */}
      <div className="rounded-lg border border-border p-4 space-y-4 bg-muted/30">
        <div className="text-sm font-semibold flex items-center gap-1.5"><Camera className="w-4 h-4" /> Scene 3 — Timeline Cinta (3 kartu)</div>
        {cards.map((c, i) => (
          <div key={i} className="rounded-md border border-border p-3 space-y-2 bg-background">
            <div className="text-xs font-medium text-muted-foreground">Kartu #{i + 1}</div>
            <div className="grid grid-cols-2 gap-2">
              <Input maxLength={4} placeholder="Tahun" value={c.year} onChange={(e) => updateCard(i, { year: e.target.value })} />
              <Input maxLength={40} placeholder="Judul (mis. First Date)" value={c.title} onChange={(e) => updateCard(i, { title: e.target.value })} />
            </div>
            <Textarea
              rows={2}
              maxLength={160}
              placeholder="Deskripsi singkat momen ini..."
              value={c.text}
              onChange={(e) => updateCard(i, { text: e.target.value })}
            />
            <ImageUpload
              label="Foto Kartu"
              value={c.image}
              onChange={(url) => updateCard(i, { image: url })}
              folder="cinematic"
              aspectRatio="landscape"
            />
          </div>
        ))}
      </div>

      {/* Proposal */}
      <div className="space-y-2">
        <Label>Headline Lamaran (Scene 4)</Label>
        <Input
          maxLength={40}
          placeholder="Will You Marry Me?"
          value={v.proposalHeadline || ""}
          onChange={(e) => set("proposalHeadline", e.target.value)}
        />
      </div>

      {/* Venue hero */}
      <ImageUpload
        label="Foto Hero Venue (Scene 6, lanskap)"
        value={v.venueHeroImage}
        onChange={(url) => set("venueHeroImage", url)}
        folder="cinematic"
        aspectRatio="landscape"
      />

      {/* Closing */}
      <div className="space-y-2">
        <Label className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Tagline Penutup (Scene 10)</Label>
        <Input
          maxLength={100}
          placeholder="We Look Forward To Celebrating With You"
          value={v.closingTagline || ""}
          onChange={(e) => set("closingTagline", e.target.value)}
        />
      </div>
    </div>
  );
}