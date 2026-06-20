import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Loader2, Film } from "lucide-react";
import { cn } from "@/lib/utils";

const BUCKET = "invitation-images";
const MAX_BYTES = 30 * 1024 * 1024; // 30MB

interface VideoUploadProps {
  label: string;
  value?: string;
  onChange: (url: string | undefined) => void;
  helper?: string;
  className?: string;
}

export function VideoUpload({ label, value, onChange, helper, className }: VideoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const validateVertical = (file: File): Promise<boolean> =>
    new Promise((resolve) => {
      const v = document.createElement("video");
      v.preload = "metadata";
      v.muted = true;
      v.onloadedmetadata = () => {
        const ok = v.videoHeight > v.videoWidth; // portrait/vertical
        URL.revokeObjectURL(v.src);
        resolve(ok);
      };
      v.onerror = () => resolve(true); // don't block on read error
      v.src = URL.createObjectURL(file);
    });

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("video/")) {
      toast({ title: "Format tidak didukung", description: "Mohon unggah file MP4 / video.", variant: "destructive" });
      return;
    }
    if (file.size > MAX_BYTES) {
      toast({ title: "File terlalu besar", description: "Maksimal 30MB untuk opening video.", variant: "destructive" });
      return;
    }
    const vertical = await validateVertical(file);
    if (!vertical) {
      toast({
        title: "Orientasi video",
        description: "Mohon gunakan video vertikal (9:16) agar tampil ideal di scene pembuka.",
        variant: "destructive",
      });
      return;
    }
    try {
      setIsUploading(true);
      const ext = (file.name.split(".").pop() || "mp4").toLowerCase();
      const path = `videos/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { data, error } = await supabase.storage.from(BUCKET).upload(path, file, { cacheControl: "3600", upsert: false, contentType: file.type });
      if (error) {
        console.error("Video upload error:", error);
        toast({ title: "Gagal mengunggah video", description: "Pastikan Anda sudah login dan koneksi stabil.", variant: "destructive" });
        return;
      }
      const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(data.path);
      onChange(urlData.publicUrl);
      toast({ title: "Berhasil!", description: "Opening video berhasil diunggah." });
    } catch (err) {
      console.error("Video upload exception:", err);
      toast({ title: "Gagal mengunggah", description: "Terjadi kesalahan tak terduga.", variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    // We intentionally don't delete the storage object here to keep this simple
    // and avoid orphaning edits; storage cleanup is non-critical for premium users.
    onChange(undefined);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>
      <input
        ref={inputRef}
        type="file"
        accept="video/mp4,video/*"
        className="hidden"
        disabled={isUploading}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = "";
        }}
      />
      {value ? (
        <div className="relative rounded-lg overflow-hidden border border-border aspect-[9/16] max-w-[220px] bg-black">
          <video src={value} className="w-full h-full object-cover" muted playsInline controls />
          <div className="absolute top-2 right-2 flex gap-1">
            <Button size="sm" variant="secondary" onClick={() => inputRef.current?.click()} disabled={isUploading}>
              {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            </Button>
            <Button size="sm" variant="destructive" onClick={handleRemove} disabled={isUploading}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className={cn(
            "border-2 border-dashed rounded-lg cursor-pointer transition-colors flex flex-col items-center justify-center gap-2 p-6 aspect-[9/16] max-w-[220px]",
            "hover:border-primary/50 hover:bg-muted/50",
            isUploading && "pointer-events-none opacity-50"
          )}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-7 h-7 text-primary animate-spin" />
              <p className="text-xs text-muted-foreground">Mengunggah video...</p>
            </>
          ) : (
            <>
              <Film className="w-8 h-8 text-muted-foreground" />
              <p className="text-sm font-medium text-center">Unggah Opening Video</p>
              <p className="text-xs text-muted-foreground text-center">MP4 vertikal (9:16) • Maks 30MB</p>
            </>
          )}
        </div>
      )}
      {helper && <p className="text-xs text-muted-foreground">{helper}</p>}
    </div>
  );
}